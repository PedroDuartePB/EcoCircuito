from __future__ import annotations

import contextvars
import json
import logging
from datetime import UTC, datetime
from typing import Any

request_id_ctx: contextvars.ContextVar[str] = contextvars.ContextVar("request_id", default="-")

SENSITIVE_KEYS: frozenset[str] = frozenset(
    {
        "password",
        "passwd",
        "secret",
        "token",
        "access_token",
        "refresh_token",
        "authorization",
        "cookie",
        "set-cookie",
        "csrf",
        "csrf_token",
        "x-csrf-token",
        "latitude",
        "longitude",
        "lat",
        "lng",
        "lon",
    }
)


def sanitize_value(data: Any) -> Any:
    """Remove ou mascara recursivamente chaves sensíveis e coordenadas precisas."""
    if isinstance(data, dict):
        sanitized: dict[str, Any] = {}
        for key, value in data.items():
            key_lower = str(key).lower()
            if any(sensitive in key_lower for sensitive in SENSITIVE_KEYS):
                sanitized[str(key)] = "[REDACTED]"
            else:
                sanitized[str(key)] = sanitize_value(value)
        return sanitized
    if isinstance(data, list):
        return [sanitize_value(item) for item in data]
    return data


class SanitizingJsonFormatter(logging.Formatter):
    """Formata logs estruturados em JSON garantindo sanitização de campos sensíveis."""

    def format(self, record: logging.LogRecord) -> str:
        payload: dict[str, Any] = {
            "timestamp": datetime.now(UTC).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "request_id": request_id_ctx.get(),
            "message": record.getMessage(),
        }
        extra_data = getattr(record, "extra_data", None)
        if isinstance(extra_data, dict):
            payload["context"] = sanitize_value(extra_data)
        return json.dumps(payload, ensure_ascii=False)


def configure_logging(level: str = "INFO") -> None:
    """Configura handler raiz com formatação JSON sanitizada."""
    root_logger = logging.getLogger()
    root_logger.setLevel(level.upper())
    handler = logging.StreamHandler()
    handler.setFormatter(SanitizingJsonFormatter())
    root_logger.handlers.clear()
    root_logger.addHandler(handler)

