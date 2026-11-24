from __future__ import annotations

import logging

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.core.logging import request_id_ctx

logger = logging.getLogger("ecocircuito.errors")


class ServiceUnavailableError(Exception):
    """Erro disparado quando dependências críticas (PostgreSQL/PostGIS) estão indisponíveis."""

    def __init__(
        self,
        message: str = "Serviço temporariamente indisponível.",
        code: str = "SERVICE_UNAVAILABLE",
    ) -> None:
        super().__init__(message)
        self.message = message
        self.code = code


def build_error_payload(code: str, message: str) -> dict[str, dict[str, str]]:
    """Constrói payload padronizado de erro em português com request_id."""
    return {
        "error": {
            "code": code,
            "message": message,
            "request_id": request_id_ctx.get(),
        }
    }


def register_exception_handlers(app: FastAPI) -> None:
    """Registra handlers globais sem vazar detalhes internos ou stack traces."""

    @app.exception_handler(ServiceUnavailableError)
    async def handle_service_unavailable(
        _request: Request, exc: ServiceUnavailableError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content=build_error_payload(code=exc.code, message=exc.message),
        )

    @app.exception_handler(RequestValidationError)
    async def handle_validation_error(
        _request: Request, _exc: RequestValidationError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=build_error_payload(
                code="VALIDATION_ERROR",
                message="Os dados enviados são inválidos. Verifique os campos e tente novamente.",
            ),
        )

    @app.exception_handler(HTTPException)
    async def handle_http_exception(_request: Request, exc: HTTPException) -> JSONResponse:
        detail = exc.detail if isinstance(exc.detail, str) else "Erro na requisição."
        return JSONResponse(
            status_code=exc.status_code,
            content=build_error_payload(code=f"HTTP_{exc.status_code}", message=detail),
        )

    @app.exception_handler(Exception)
    async def handle_unexpected_error(_request: Request, exc: Exception) -> JSONResponse:
        logger.exception("Erro interno não tratado: %s", type(exc).__name__)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=build_error_payload(
                code="INTERNAL_ERROR",
                message="Ocorreu um erro interno inesperado. Tente novamente mais tarde.",
            ),
        )

