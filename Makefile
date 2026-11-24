.PHONY: up down logs migrate test-backend lint-backend typecheck-backend test-frontend lint-frontend build-frontend

up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

migrate:
	docker compose run --rm migrate

lint-backend:
	cd backend && ruff check app tests alembic

typecheck-backend:
	cd backend && mypy app

test-backend:
	cd backend && pytest

lint-frontend:
	cd frontend && npm run lint

test-frontend:
	cd frontend && npm test

build-frontend:
	cd frontend && npm run build

