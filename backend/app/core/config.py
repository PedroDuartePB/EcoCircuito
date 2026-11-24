from __future__ import annotations

from functools import lru_cache
from typing import Literal

from pydantic import Field, field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

EnvironmentType = Literal["development", "test", "production"]

_UNSAFE_DEV_MARKERS: tuple[str, ...] = ("dev-only", "change-me", "unsafe")


class Settings(BaseSettings):
    """Configurações da aplicação carregadas exclusivamente de variáveis de ambiente."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    environment: EnvironmentType = "development"
    app_name: str = "EcoCircuito API"
    app_version: str = "0.1.0"
    log_level: str = "INFO"

    database_url: str = Field(
        default="postgresql+psycopg://ecocircuito_app:dev_only_change_me_app@localhost:5432/ecocircuito"
    )
    migration_database_url: str | None = None

    jwt_secret_key: str = Field(
        default="dev-only-unsafe-secret-change-in-production-min-32-chars"
    )
    jwt_algorithm: Literal["HS256"] = "HS256"
    jwt_issuer: str = "ecocircuito-api"
    jwt_audience: str = "ecocircuito-web"
    jwt_access_ttl_seconds: int = Field(default=900, ge=60, le=3600)
    refresh_token_ttl_seconds: int = Field(default=604800, ge=3600, le=2592000)

    csrf_secret_key: str = Field(
        default="dev-only-unsafe-csrf-secret-change-in-production-32c"
    )

    allowed_origins: list[str] = Field(default_factory=lambda: ["http://localhost:5173"])

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    @model_validator(mode="after")
    def validate_production_security(self) -> Settings:
        if "*" in self.allowed_origins:
            raise ValueError("ALLOWED_ORIGINS não pode conter curinga '*'.")

        if self.environment == "production":
            for field_name, secret in (
                ("JWT_SECRET_KEY", self.jwt_secret_key),
                ("CSRF_SECRET_KEY", self.csrf_secret_key),
            ):
                if len(secret) < 32 or any(m in secret.lower() for m in _UNSAFE_DEV_MARKERS):
                    raise ValueError(
                        f"{field_name} insegura para ENVIRONMENT=production."
                    )
            if "dev_only_change_me" in self.database_url:
                raise ValueError("DATABASE_URL não pode usar senha de exemplo em produção.")

        return self

    @property
    def is_production(self) -> bool:
        return self.environment == "production"

    @property
    def access_cookie_name(self) -> str:
        return "__Host-ec_access" if self.is_production else "ec_access_dev"

    @property
    def refresh_cookie_name(self) -> str:
        return "__Host-ec_refresh" if self.is_production else "ec_refresh_dev"


@lru_cache
def get_settings() -> Settings:
    """Retorna instância cacheada de Settings."""
    return Settings()

