# EcoCircuito — Registros de Decisão Arquitetural (ADRs)

Resumo das decisões arquiteturais vigentes a partir da **Fase 0**:

- **ADR-001 — Monólito modular, não microsserviços:** FastAPI único com módulos isolados (`auth`, `capacity`, `search`, `registry`, `education`, `shared`) e PostgreSQL único com schemas lógicos.
- **ADR-002 — React SPA substitui SSR Python da UML histórica:** Frontend em React + Vite + TypeScript servindo na mesma origem lógica via proxy `/api`.
- **ADR-003 (v2) — Location DB e GeoDB lógicos separados no mesmo PostgreSQL/PostGIS:** `location` armazena dados oficiais e `geo_position geography(Point,4326)` com índice GiST; `geo` realiza consultas espaciais (`ST_DWithin`/`ST_Distance`) sem duplicação persistente e sem fallback para Haversine/SQLite.
- **ADR-004 — Autenticação web com cookies `HttpOnly` e JWT curto:** JWT de acesso (15 min) em cookie `HttpOnly` + refresh opaco rotativo + CSRF explícito + mesma origem (sem `localStorage`).
- **ADR-005 — RBAC + ownership por recurso (`deny-by-default`):** Somente `POINT_MANAGER` e `ADMIN` no MVP; permissões verificadas no servidor e no banco (`point_managers`).
- **ADR-006 — Estado oficial de capacidade:** Somente gestor dono ou admin altera capacidade; relatos anônimos não alteram `point_capacities`.
- **ADR-007 — Protocolo anônimo:** Descarte sem `user_id` nem vínculo de sessão, status inicial `REPORTED_UNVERIFIED`.
- **ADR-008 — Outbox transacional:** Eventos publicados na mesma transação ACID da capacidade; leitura pública consulta o estado confirmado.
- **ADR-009 — Geolocalização opt-in sem persistência do cidadão:** Busca por coordenadas via `POST` sem salvar/logar lat/lng do usuário; busca manual obrigatória.
- **ADR-010 — Verificação e revisão prévias:** Pontos e conteúdos educativos exigem validação administrativa/técnica antes da publicação.
- **ADR-011 — Sem presunção de dados ausentes:** `ACCEPTED`, `REJECTED` e `NOT_INFORMED` distintos; `FREE`, `PAID` e `NOT_INFORMED` distintos.
- **ADR-012 — Evidência antes de declarar conformidade:** Metas de cobertura, acessibilidade, performance e RPO/RTO exigem medição real.

