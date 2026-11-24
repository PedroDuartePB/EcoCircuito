import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "../app/App";

describe("App — Fase 0 Fundação e Acessibilidade", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-contrast");
  });

  it("renderiza marcos semânticos, skip link e status pronto da API", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          status: "ready",
          database: "ok",
          postgis_version: "3.4 USE_GEOS=1",
          schemas: ["auth", "education", "geo", "location", "registry", "shared"],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    render(<App />);

    expect(screen.getByRole("link", { name: /ir para o conteúdo principal/i })).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /EcoCircuito/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Pronta \(ready\)/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/3.4 USE_GEOS=1/i)).toBeInTheDocument();
  });

  it("alterna o modo de alto contraste com atributo acessível", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: { code: "SERVICE_UNAVAILABLE", message: "Indisponível" } }), {
        status: 503,
      })
    );

    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", { name: /ativar alto contraste/i });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement).toHaveAttribute("data-contrast", "high");
    expect(window.localStorage.getItem("ecocircuito_high_contrast")).toBe("true");
  });
});

