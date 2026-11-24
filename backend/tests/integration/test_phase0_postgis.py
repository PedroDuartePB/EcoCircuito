from __future__ import annotations

import os
from pathlib import Path

import pytest
from alembic.config import Config
from fastapi.testclient import TestClient
from sqlalchemy import text

from alembic import command
from app.bootstrap import create_app
from app.core.config import Settings
from app.core.database import REQUIRED_SCHEMAS, create_db_engine

pytestmark = pytest.mark.integration


def _get_test_db_url() -> str:
    url = os.getenv("TEST_DATABASE_URL") or os.getenv("DATABASE_URL")
    if not url:
        pytest.fail("TEST_DATABASE_URL deve estar definida para testes de integração PostGIS.")
    return url


def test_alembic_creates_postgis_and_logical_schemas() -> None:
    db_url = _get_test_db_url()
    backend_dir = Path(__file__).resolve().parents[2]
    alembic_cfg = Config(str(backend_dir / "alembic.ini"))
    alembic_cfg.set_main_option("script_location", str(backend_dir / "alembic"))

    os.environ["MIGRATION_DATABASE_URL"] = db_url
    command.upgrade(alembic_cfg, "head")

    engine = create_db_engine(db_url)
    try:
        with engine.connect() as conn:
            postgis_version = conn.execute(text("SELECT PostGIS_Version()")).scalar_one_or_none()
            assert postgis_version, "PostGIS_Version() deve retornar versão ativa."

            schemas = set(
                conn.execute(
                    text(
                        """
                        SELECT schema_name
                        FROM information_schema.schemata
                        WHERE schema_name = ANY(:req)
                        """
                    ),
                    {"req": list(REQUIRED_SCHEMAS)},
                ).scalars()
            )
            assert schemas == set(REQUIRED_SCHEMAS)

            # Valida suporte real ao tipo geography(Point, 4326) exigido para location/geo.
            distance = conn.execute(
                text(
                    """
                    SELECT ST_Distance(
                        ST_SetSRID(ST_MakePoint(-34.845, -7.1195), 4326)::geography,
                        ST_SetSRID(ST_MakePoint(-34.863, -7.1150), 4326)::geography
                    )
                    """
                )
            ).scalar_one()
            assert distance > 0
    finally:
        engine.dispose()


def test_health_ready_endpoint_reports_postgis_and_schemas() -> None:
    db_url = _get_test_db_url()
    settings = Settings(
        environment="test",
        database_url=db_url,
        jwt_secret_key="test-only-secret-key-with-at-least-32-chars",
        csrf_secret_key="test-only-csrf-secret-with-at-least-32-chars",
    )
    app = create_app(settings)
    with TestClient(app) as client:
        response = client.get("/api/v1/health/ready")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ready"
    assert data["database"] == "ok"
    assert data["postgis_version"]
    assert set(data["schemas"]) == set(REQUIRED_SCHEMAS)

