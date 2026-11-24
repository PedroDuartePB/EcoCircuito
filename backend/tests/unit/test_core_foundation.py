from __future__ import annotations

import logging

import pytest
from fastapi.testclient import TestClient

from app.core.config import Settings
from app.core.logging import sanitize_value


def test_production_settings_reject_unsafe_defaults() -> None:
    with pytest.raises(ValueError, match="JWT_SECRET_KEY"):
        Settings(
            environment="production",
            database_url="postgresql+psycopg://app:strong_pw@db:5432/ecocircuito",
            jwt_secret_key="dev-only-unsafe-secret-change-in-production-min-32-chars",
            csrf_secret_key="a_very_strong_random_csrf_secret_key_over_32_bytes",
        )


def test_wildcard_origin_rejected() -> None:
    with pytest.raises(ValueError, match="curinga"):
        Settings(allowed_origins="*")


def test_cookie_names_differ_between_dev_and_prod() -> None:
    dev = Settings(environment="development")
    prod = Settings(
        environment="production",
        database_url="postgresql+psycopg://app:strong_pw@db:5432/ecocircuito",
        jwt_secret_key="prod_strong_random_jwt_secret_with_more_than_32_chars",
        csrf_secret_key="prod_strong_random_csrf_secret_with_more_than_32_chars",
    )
    assert dev.access_cookie_name == "ec_access_dev"
    assert prod.access_cookie_name == "__Host-ec_access"
    assert prod.refresh_cookie_name == "__Host-ec_refresh"


def test_log_sanitization_redacts_secrets_and_coordinates() -> None:
    raw = {
        "email": "gestora@example.com",
        "password": "secret-password",
        "latitude": -7.1195,
        "longitude": -34.845,
        "nested": {"x-csrf-token": "abc", "status": "ok"},
    }
    clean = sanitize_value(raw)
    assert clean["password"] == "[REDACTED]"
    assert clean["latitude"] == "[REDACTED]"
    assert clean["longitude"] == "[REDACTED]"
    assert clean["nested"]["x-csrf-token"] == "[REDACTED]"
    assert clean["nested"]["status"] == "ok"


def test_health_live_returns_200_and_security_headers(client: TestClient) -> None:
    response = client.get("/api/v1/health/live")
    assert response.status_code == 200
    assert response.json() == {"status": "live"}
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["X-Request-ID"].startswith("req_")


def test_health_ready_returns_503_without_leaking_connection_details(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.bootstrap import create_app

    settings = Settings(
        environment="test",
        database_url="postgresql+psycopg://user:super_secret_pw@127.0.0.1:59999/unavailable",
        jwt_secret_key="test-only-secret-key-with-at-least-32-chars",
        csrf_secret_key="test-only-csrf-secret-with-at-least-32-chars",
    )
    app = create_app(settings)
    logging.getLogger("ecocircuito").setLevel(logging.CRITICAL)
    with TestClient(app) as c:
        resp = c.get("/api/v1/health/ready")
    assert resp.status_code == 503
    body = resp.json()
    assert body["error"]["code"] == "SERVICE_UNAVAILABLE"
    assert "super_secret_pw" not in resp.text
    assert "59999" not in resp.text

