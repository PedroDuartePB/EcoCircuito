import { useEffect, useState } from "react";

const CONTRAST_STORAGE_KEY = "ecocircuito_high_contrast";

export function ContrastToggle() {
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(CONTRAST_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.setAttribute("data-contrast", "high");
    } else {
      root.removeAttribute("data-contrast");
    }
    try {
      window.localStorage.setItem(CONTRAST_STORAGE_KEY, String(highContrast));
    } catch {
      // Ignora falhas de armazenamento local em modo restrito
    }
  }, [highContrast]);

  return (
    <button
      type="button"
      className="contrast-button"
      aria-pressed={highContrast}
      onClick={() => setHighContrast((prev) => !prev)}
    >
      {highContrast ? "Alto contraste: ativado" : "Ativar alto contraste"}
    </button>
  );
}

