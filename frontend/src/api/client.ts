export interface ReadyStatus {
  status: string;
  database: string;
  postgis_version: string;
  schemas: string[];
}

export interface ApiErrorPayload {
  error?: {
    code: string;
    message: string;
    request_id: string;
  };
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export async function fetchApiReadiness(signal?: AbortSignal): Promise<ReadyStatus> {
  const response = await fetch(`${API_BASE}/health/ready`, {
    method: "GET",
    credentials: "omit",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    let message = "Serviço temporariamente indisponível.";
    try {
      const payload = (await response.json()) as ApiErrorPayload;
      if (payload.error?.message) {
        message = payload.error.message;
      }
    } catch {
      // Mantém mensagem neutra em português se resposta não for JSON
    }
    throw new Error(message);
  }

  return (await response.json()) as ReadyStatus;
}

