from __future__ import annotations

import os
from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient

from app.bootstrap import create_app
from app.core.config import Settings


@pytest.fixture
def test_settings() -> Settings:
    return Settings(
        environment="test",
        database_url=os.getenv(
            "TEST_DATABASE_URL",
            "postgresql+psycopg://ecocircuito_migrator:dev_only_change_me_migrator@localhost:5432/ecocircuito",
        ),
        jwt_secret_key="test-only-secret-key-with-at-least-32-chars",
        csrf_secret_key="test-only-csrf-secret-with-at-least-32-chars",
        allowed_origins=["http://localhost:5173"],
    )


@pytest.fixture
def client(test_settings: Settings) -> Iterator[TestClient]:
    app = create_app(test_settings)
    with TestClient(app) as test_client:
        yield test_client

