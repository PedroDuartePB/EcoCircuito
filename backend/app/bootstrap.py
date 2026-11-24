from __future__ import annotations

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import Settings, get_settings
from app.core.database import create_db_engine, create_session_factory
from app.core.errors import register_exception_handlers
from app.core.health import router as health_router
from app.core.logging import configure_logging
from app.core.security_headers import RequestIdMiddleware, SecurityHeadersMiddleware


def create_app(settings: Settings | None = None) -> FastAPI:
    """Constrói e conecta a aplicação FastAPI respeitando limites modulares."""
    resolved_settings = settings or get_settings()
    configure_logging(resolved_settings.log_level)

    db_engine = create_db_engine(resolved_settings.database_url)
    session_factory = create_session_factory(db_engine)

    @asynccontextmanager
    async def lifespan(app: FastAPI) -> AsyncIterator[None]:
        app.state.settings = resolved_settings
        app.state.db_engine = db_engine
        app.state.session_factory = session_factory
        try:
            yield
        finally:
            db_engine.dispose()

    docs_url = None if resolved_settings.is_production else "/docs"
    redoc_url = None if resolved_settings.is_production else "/redoc"

    app = FastAPI(
        title=resolved_settings.app_name,
        version=resolved_settings.app_version,
        lifespan=lifespan,
        docs_url=docs_url,
        redoc_url=redoc_url,
    )

    app.state.settings = resolved_settings
    app.state.db_engine = db_engine
    app.state.session_factory = session_factory

    app.add_middleware(SecurityHeadersMiddleware)
    app.add_middleware(RequestIdMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=resolved_settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "X-CSRF-Token", "Idempotency-Key", "X-Request-ID"],
    )

    register_exception_handlers(app)
    app.include_router(health_router)

    return app

