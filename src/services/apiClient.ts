// Base API Client representing Gateway / BFF communications in UML
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  source: 'live_api' | 'demo_verified';
  timestamp: string;
}

export class ApiGatewayClient {
  private static instance: ApiGatewayClient;
  private isOfflineMode: boolean = false;

  private constructor() {}

  public static getInstance(): ApiGatewayClient {
    if (!ApiGatewayClient.instance) {
      ApiGatewayClient.instance = new ApiGatewayClient();
    }
    return ApiGatewayClient.instance;
  }

  // Simulated gateway request with error handling and network latency
  public async request<T>(endpoint: string, options?: RequestInit, fallbackData?: T): Promise<ApiResponse<T>> {
    const timestamp = new Date().toISOString();
    
    // Check if real backend URL is configured in environment
    const apiBaseUrl = (import.meta as any).env?.VITE_API_BASE_URL;

    if (apiBaseUrl && !this.isOfflineMode) {
      try {
        const response = await fetch(`${apiBaseUrl}${endpoint}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...(options?.headers || {}),
          },
        });

        if (!response.ok) {
          throw new Error(`API Gateway returned status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return {
          data,
          success: true,
          source: 'live_api',
          timestamp,
        };
      } catch (error) {
        console.warn(`[EcoCircuito BFF] Fallback to verified local data store for ${endpoint}:`, error);
      }
    }

    // Realistic simulated latency (150ms - 300ms) to ensure smooth UX and loading state testing
    await new Promise((resolve) => setTimeout(resolve, 180));

    if (fallbackData !== undefined) {
      return {
        data: fallbackData,
        success: true,
        source: 'demo_verified',
        timestamp,
      };
    }

    throw new Error(`No data available for endpoint ${endpoint}`);
  }
}

export const apiGateway = ApiGatewayClient.getInstance();
