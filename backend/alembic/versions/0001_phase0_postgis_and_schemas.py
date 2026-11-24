"""Fase 0: habilita PostGIS e cria schemas lógicos (location, geo e demais módulos).

Revision ID: 0001_phase0_postgis_schemas
Revises:
Create Date: 2026-11-23
"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0001_phase0_postgis_schemas"
down_revision: str | Sequence[str] | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

LOGICAL_SCHEMAS: tuple[str, ...] = (
    "auth",
    "location",
    "geo",
    "registry",
    "education",
    "shared",
)


def upgrade() -> None:
    op.execute(sa.text("CREATE EXTENSION IF NOT EXISTS postgis"))

    conn = op.get_bind()
    version = conn.execute(sa.text("SELECT PostGIS_Version()")).scalar_one_or_none()
    if not version:
        raise RuntimeError(
            "Extensão PostGIS obrigatória não está disponível após CREATE EXTENSION."
        )

    for schema in LOGICAL_SCHEMAS:
        op.execute(sa.text(f'CREATE SCHEMA IF NOT EXISTS "{schema}"'))

    op.execute(
        sa.text(
            """
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = 'ecocircuito_app') THEN
                    GRANT USAGE ON SCHEMA auth, location, geo, registry, education, shared
                        TO ecocircuito_app;
                END IF;
            END
            $$;
            """
        )
    )


def downgrade() -> None:
    for schema in reversed(LOGICAL_SCHEMAS):
        op.execute(sa.text(f'DROP SCHEMA IF EXISTS "{schema}"'))

