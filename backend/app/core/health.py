from __future__ import annotations

from fastapi import APIRouter, Request
from pydantic import BaseModel

from app.core.database import check_database_readiness

router = APIRouter(prefix="/api/v1/health", tags=["health"])


class LiveResponse(BaseModel):
    status: str


class ReadyResponse(BaseModel):
    status: str
    database: str
    postgis_version: str
    schemas: list[str]


@router.get("/live", response_model=LiveResponse, summary="Verifica se a API está em execução")
async def health_live() -> LiveResponse:
    return LiveResponse(status="live")


@router.get(
    "/ready",
    response_model=ReadyResponse,
    summary="Verifica PostgreSQL, PostGIS_Version() e schemas lógicos",
)
async def health_ready(request: Request) -> ReadyResponse:
    engine = request.app.state.db_engine
    readiness = check_database_readiness(engine)
    return ReadyResponse(
        status="ready",
        database="ok",
        postgis_version=readiness.postgis_version,
        schemas=list(readiness.schemas),
    )

