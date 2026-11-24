# Linha de Base de Segurança — Fase 0

## Controles já ativos na Fase 0
1. **Segregação de privilégios no PostgreSQL:** usuário `ecocircuito_migrator` executa extensões/schemas/DDL via Alembic; usuário `ecocircuito_app` usado em runtime possui permissões restritas apenas aos schemas necessários (sem `SUPERUSER` e sem `CREATE EXTENSION`).
2. **Validação de configuração segura:** `Settings` rejeita `ENVIRONMENT=production` com segredos padrão/fracos de desenvolvimento ou wildcard `*` em `ALLOWED_ORIGINS`.
3. **Headers HTTP de segurança:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restritiva.
4. **Correlação e sanitização de logs:** cada requisição recebe `X-Request-ID` (`req_<uuid>`); o filtro de logging redacta automaticamente campos como `password`, `token`, `cookie`, `authorization`, `csrf`, `latitude`, `longitude`, `lat`, `lng`, `secret`.
5. **Tratamento padronizado de erros:** respostas JSON com `code`, `message` em português e `request_id`, sem stack traces ou detalhes SQL.
6. **Mesma origem lógica:** Vite proxy `/api` → FastAPI elimina necessidade de CORS permissivo com credenciais em desenvolvimento e prepara o caminho para cookies `__Host-` + CSRF na Fase 1.

