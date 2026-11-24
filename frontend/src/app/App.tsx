import { useEffect, useState } from "react";
import { fetchApiReadiness, type ReadyStatus } from "../api/client";
import { ContrastToggle } from "../shared/accessibility/ContrastToggle";

type HealthState =
  | { kind: "loading" }
  | { kind: "ready"; data: ReadyStatus }
  | { kind: "error"; message: string };

export function App() {
  const [health, setHealth] = useState<HealthState>({ kind: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    fetchApiReadiness(controller.signal)
      .then((data) => setHealth({ kind: "ready", data }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        const message =
          err instanceof Error
            ? err.message
            : "Não foi possível verificar a disponibilidade da API.";
        setHealth({ kind: "error", message });
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo-principal">
        Ir para o conteúdo principal
      </a>

      <header className="app-header">
        <div>
          <h1 className="app-title">EcoCircuito</h1>
          <p>Plataforma de apoio ao descarte responsável de lixo eletrônico</p>
        </div>
        <ContrastToggle />
      </header>

      <main id="conteudo-principal" tabIndex={-1}>
        <section className="card" aria-labelledby="titulo-fundacao">
          <h2 id="titulo-fundacao">Fase 0 — Fundação do Sistema</h2>
          <p>
            Ambiente base configurado com React em mesma origem lógica, API FastAPI modular e
            PostgreSQL com PostGIS habilitado para separação lógica entre Location DB e GeoDB.
          </p>

          <div aria-live="polite">
            {health.kind === "loading" && <p>Verificando prontidão da API e do PostGIS...</p>}
            {health.kind === "ready" && (
              <div>
                <p>
                  Status da API:{" "}
                  <span className="status-badge status-badge--ok">Pronta ({health.data.status})</span>
                </p>
                <p>PostGIS ativo: {health.data.postgis_version}</p>
                <p>Schemas lógicos verificados: {health.data.schemas.join(", ")}</p>
              </div>
            )}
            {health.kind === "error" && (
              <p>
                Status da API:{" "}
                <span className="status-badge status-badge--error">Indisponível</span> —{" "}
                {health.message}
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>EcoCircuito — Projeto Acadêmico Socioambiental (Fase 0: Fundação e Acessibilidade)</p>
      </footer>
    </div>
  );
}

