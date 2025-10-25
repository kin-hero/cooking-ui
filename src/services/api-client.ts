import { env } from "@/config/env";

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${env.apiUrl}${endpoint}`, {
    ...options,
    credentials: "include", //Ensures browser sends cookies cross-origin to your Fastify backend.
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    // Try to parse error message from response body
    let errorMessage = `API Error: ${response.statusText}`;
    try {
      const errorData = await response.json();
      // Check common error response formats from your backend
      if (errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // If JSON parsing fails, use the default statusText message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
