from __future__ import annotations

import ast
from pathlib import Path

APP_DIR = Path(__file__).resolve().parents[2] / "app"
MODULES_DIR = APP_DIR / "modules"

FORBIDDEN_DOMAIN_IMPORTS = {
    "fastapi",
    "starlette",
    "sqlalchemy",
    "geoalchemy2",
    "psycopg",
    "alembic",
    "pydantic",
    "pydantic_settings",
}


def _iter_imported_roots(py_file: Path) -> set[str]:
    tree = ast.parse(py_file.read_text(encoding="utf-8"), filename=str(py_file))
    roots: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                roots.add(alias.name)
        elif isinstance(node, ast.ImportFrom) and node.module:
            roots.add(node.module)
    return roots


def test_domain_layers_do_not_depend_on_frameworks_or_orm() -> None:
    """Garante que nenhum arquivo em modules/*/domain importe FastAPI, SQLAlchemy ou adapters."""
    domain_files = list(MODULES_DIR.glob("*/domain/**/*.py"))
    assert domain_files, "Os módulos devem manter diretórios domain/."

    for py_file in domain_files:
        imported = _iter_imported_roots(py_file)
        for mod in imported:
            top_level = mod.split(".")[0]
            assert top_level not in FORBIDDEN_DOMAIN_IMPORTS, (
                f"{py_file} importa '{mod}', violando Clean Architecture."
            )
            assert not mod.startswith("app.modules."), (
                f"{py_file} importa '{mod}' de outro módulo dentro da camada domain."
            )


def test_modules_do_not_import_internals_of_other_modules() -> None:
    """Garante que nenhum módulo importe infrastructure ou presentation de outro módulo."""
    for module_dir in MODULES_DIR.iterdir():
        if not module_dir.is_dir() or module_dir.name.startswith("__"):
            continue
        current_module = module_dir.name
        for py_file in module_dir.rglob("*.py"):
            for mod in _iter_imported_roots(py_file):
                if mod.startswith("app.modules."):
                    parts = mod.split(".")
                    if len(parts) >= 3:
                        target_module = parts[2]
                        assert target_module == current_module, (
                            f"{py_file} importa '{mod}' cruzando fronteira de módulo."
                        )

