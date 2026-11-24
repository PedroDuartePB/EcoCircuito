from __future__ import annotations

from dataclasses import dataclass

from sqlalchemy import Engine, create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, sessionmaker

from app.core.errors import ServiceUnavailableError

REQUIRED_SCHEMAS: tuple[str, ...] = (
    "auth",
    "education",
    "geo",
    "location",
    "registry",
    "shared",
)


@dataclass(frozen=True)
class DatabaseReadiness:
    """Resultado consolidado da verificação de prontidão PostgreSQL + PostGIS."""

    postgis_version: str
    schemas: tuple[str, ...]


def create_db_engine(database_url: str) -> Engine:
    """Cria engine SQLAlchemy 2.x com pool_pre_ping e timeout de conexão curto."""
    return create_engine(
        database_url,
        pool_pre_ping=True,
        connect_args={"connect_timeout": 5},
        future=True,
    )


def create_session_factory(engine: Engine) -> sessionmaker[Session]:
    """Cria fábrica de sessões transacionais."""
    return sessionmaker(bind=engine, autoflush=False, autocommit=False, expire_on_commit=False)


def check_database_readiness(engine: Engine) -> DatabaseReadiness:
    """Valida conectividade, extensão PostGIS ativa e schemas lógicos obrigatórios."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
            postgis_version = conn.execute(text("SELECT PostGIS_Version()")).scalar_one_or_none()
            if not postgis_version:
                raise ServiceUnavailableError(
                    message="Extensão PostGIS não está ativa no banco de dados."
                )

            rows = conn.execute(
                text(
                    """
                    SELECT schema_name
                    FROM information_schema.schemata
                    WHERE schema_name = ANY(:required)
                    ORDER BY schema_name
                    """
                ),
                {"required": list(REQUIRED_SCHEMAS)},
            ).scalars()
            found_schemas = tuple(rows)
    except ServiceUnavailableError:
        raise
    except SQLAlchemyError as exc:
        raise ServiceUnavailableError(
            message="Banco de dados ou extensão PostGIS indisponível no momento."
        ) from exc

    missing = set(REQUIRED_SCHEMAS) - set(found_schemas)
    if missing:
        raise ServiceUnavailableError(
            message="Schemas obrigatórios do banco ainda não foram migrados."
        )

    return DatabaseReadiness(postgis_version=str(postgis_version), schemas=found_schemas)

