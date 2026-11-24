#!/bin/bash
set -euo pipefail

APP_USER="${POSTGRES_APP_USER:-ecocircuito_app}"
APP_PASSWORD="${POSTGRES_APP_PASSWORD:-dev_only_change_me_app}"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${APP_USER}') THEN
            EXECUTE format('CREATE ROLE %I WITH LOGIN PASSWORD %L NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT', '${APP_USER}', '${APP_PASSWORD}');
        END IF;
    END
    \$\$;

    GRANT CONNECT ON DATABASE "${POSTGRES_DB}" TO "${APP_USER}";
    CREATE EXTENSION IF NOT EXISTS postgis;
EOSQL

