# Projeto de Reciclagem de Lixo Eletrônico

### 📖 Descrição do Projeto

O crescimento do consumo de dispositivos eletrônicos aumentou significativamente a quantidade de equipamentos, baterias e cabos descartados. Nossa plataforma busca solucionar esse problema ao aproximar a população dos pontos de coleta e melhorar o fluxo de informações sobre o descarte adequado de lixo eletrônico. Facilitar e incentivar o descarte correto de resíduos eletrônicos, conectando a população aos pontos de coleta. A longo prazo, esperamos que a plataforma contribua para a criação de uma cultura de descarte responsável, tornando mais simples para as pessoas identificar onde e como descartar seus equipamentos, promovendo cidades mais sustentáveis.

O sistema atende a dois públicos principais: os cidadãos, facilitando a localização de locais para descarte, e os responsáveis pelos pontos de coleta, auxiliando-os no acompanhamento do volume de resíduos recebidos para evitar situações de sobrecarga e desorganização.

### ⚙️ Funções e Capacidades Idealizadas

Para garantir a eficiência da solução, a plataforma contará com os seguintes recursos fundamentais:

- **Mapeamento e Localização:** Sistema para os cidadãos encontrarem pontos de coleta disponíveis e consultarem os tipos de resíduos aceitos por cada local.
- **Educação e Conscientização:** Disponibilização de informações e orientações claras sobre como realizar o procedimento de descarte adequado para diferentes equipamentos.
- **Registro de Descarte:** Funcionalidade que permite ao usuário registrar a realização de um descarte na plataforma.
- **Gestão de Capacidade:** Painel de gerenciamento para os responsáveis pelos pontos de coleta, permitindo a visualização da situação e capacidade de recebimento dos locais cadastrados.
- **Otimização do Fluxo:** Diminuição do encaminhamento de resíduos para pontos que estejam indisponíveis ou próximos de sua capacidade máxima.

### Links do Backlog

- Documento de planejamento: [Documento_Visao_de_Produto](https://docs.google.com/document/d/1f__PDKJ6EY8oc-C98-EyopkQSdKQ53_a/edit?usp=sharing&ouid=102241940562202442801&rtpof=true&sd=true)
- Modelos de tela:
- Slides par o Pitch: 

### Integrantes

| Integrante | E-mail | Responsabilidade | Perfil / contato |
| --- | --- | --- | --- |
| Hugo Alexsanderson | [hugo.soares@dcx.ufpb.br](mailto:hugo.soares@dcx.ufpb.br) | A definir | adicionar link |
| João Gilberto | [joao.claudino@dcx.ufpb.br](mailto:joao.claudino@dcx.ufpb.br) | A definir | adicionar link |
| José Vinicius | [jose.moura@dcx.ufpb.br](mailto:jose.moura@dcx.ufpb.br) | A definir | adicionar link |
| Rafael Domingos | [rafael.domingos@dcx.ufpb.br](mailto:rafael.domingos@dcx.ufpb.br) | A definir | adicionar link |
| Pedro Duarte | [pedro.lima@dcx.ufpb.br](mailto:pedro.lima@dcx.ufpb.br) | A definir | adicionar link |

---

## 🛠️ Setup Técnico e Execução (Fase 0 — Fundação)

A arquitetura implementada segue o padrão de **Monólito Modular Orientado a Eventos (Clean Architecture)** com **FastAPI (Python)**, **PostgreSQL + PostGIS** (uma única instância física com schemas lógicos separados: `location` para Location DB, `geo` para GeoDB, além de `auth`, `registry`, `education` e `shared`), e **React + Vite + TypeScript** em mesma origem lógica via proxy `/api`.

> Consulte os detalhes em [docs/architecture/module-boundaries.md](docs/architecture/module-boundaries.md), [docs/architecture/ADRs.md](docs/architecture/ADRs.md) e [docs/security/phase0-baseline.md](docs/security/phase0-baseline.md).

### Execução com Docker Compose (Windows PowerShell e Linux/macOS)

1. Copie o arquivo de variáveis de ambiente de exemplo:
   - **Windows (PowerShell):**
     ```powershell
     Copy-Item .env.example .env
     ```
   - **Linux / macOS:**
     ```bash
     cp .env.example .env
     ```
2. Suba a stack completa (`db` PostGIS, `migrate` Alembic, `api` FastAPI e `web` React/Vite):
   ```bash
   docker compose up --build
   ```
3. Verifique os endpoints e a mesma origem:
   - Frontend (React): `http://localhost:5173/`
   - Health Live via proxy (mesma origem): `http://localhost:5173/api/v1/health/live`
   - Health Ready (PostgreSQL + PostGIS + schemas `location` e `geo`): `http://localhost:5173/api/v1/health/ready`
   - OpenAPI da API (direto): `http://localhost:8000/docs` (habilitado apenas em desenvolvimento)

### Execução Local de Testes e Linters (sem Docker para testes unitários)

- **Backend (Windows PowerShell):**
  ```powershell
  cd backend
  python -m venv .venv
  .\.venv\Scripts\Activate.ps1
  pip install -e ".[dev]"
  ruff check app tests alembic
  mypy app
  pytest -m "not integration"
  ```
- **Backend (Linux / macOS):**
  ```bash
  cd backend
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -e ".[dev]"
  ruff check app tests alembic
  mypy app
  pytest -m "not integration"
  ```
- **Testes de Integração PostGIS (requer banco PostGIS rodando):**
  ```bash
  cd backend
  alembic upgrade head
  pytest -m integration
  ```
- **Frontend (Windows e Linux/macOS):**
  ```bash
  cd frontend
  npm install
  npm run lint
  npm run typecheck
  npm test
  npm run build
  ```

