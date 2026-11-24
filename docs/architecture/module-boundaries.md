# EcoCircuito — Limites de Módulos e Arquitetura (Fase 0)

## Estilo Arquitetural
- **Monólito Modular Orientado a Eventos** com organização **Clean Architecture** dentro de cada módulo (`domain`, `application`, `infrastructure`, `presentation`).
- **Banco físico único:** PostgreSQL 16 + extensão **PostGIS 3.4** obrigatória desde a Fase 0.
- **Location DB lógico (`schema location`):** fonte única de verdade para pontos de coleta, `geo_position geography(Point,4326)` com índice GiST, materiais aceitos/recusados, gestores e capacidades.
- **GeoDB lógico (`schema geo`):** views/funções/consultas espaciais (`ST_DWithin`, `ST_Distance`) lendo dados confirmados do schema `location`, **sem duplicar pontos** em outra tabela nem em outro servidor.
- **Demais schemas lógicos:** `auth`, `registry`, `education`, `shared`.

## Regras de Dependência (Verificadas via Teste AST)
1. `domain/` não importa `fastapi`, `starlette`, `sqlalchemy`, `psycopg`, `pydantic` de transporte HTTP ou módulos internos de outro módulo.
2. `presentation/` (rotas FastAPI) delega casos de uso para `application/` e não acessa diretamente modelos ORM de outros módulos.
3. Nenhum módulo importa `infrastructure/` ou `presentation/` de outro módulo.
4. Compartilhar o mesmo PostgreSQL **não autoriza** mutação direta em tabelas de outro schema:
   - Apenas `capacity` escreve em `location.*`.
   - `search` apenas lê `geo.*` / projeções públicas autorizadas de `location.*`.
   - `registry` nunca armazena `user_id`, IP identificável, sessão ou coordenadas do cidadão.

