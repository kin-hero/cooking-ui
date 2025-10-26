import { env } from "@/config/env";
import { cookies } from "next/headers";

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<{ data: T; response: Response }> {
  const isServer = typeof window === "undefined";

  // If server-side, get cookies and forward them
  let cookieHeader = "";
  if (isServer) {
    try {
      const cookieStore = await cookies();
      const recipe_token = cookieStore.get("recipe_token_user");
      if (recipe_token) {
        cookieHeader = `recipe_token_user=${recipe_token.value}`;
      }
    } catch {
      // cookies() not available (client-side or edge runtime)
    }
  }

  const response = await fetch(`${env.apiUrl}${endpoint}`, {
    ...options,
    credentials: "include", //Ensures browser sends cookies cross-origin to your Fastify backend.
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader && { Cookie: cookieHeader }),
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

  const data = await response.json();
  return { data, response };
}

export async function apiMultiFormClient<T>(endpoint: string, formData: FormData): Promise<{ data: T; response: Response }> {
  const isServer = typeof window === "undefined";

  // If server-side, get cookies and forward them
  let cookieHeader = "";
  if (isServer) {
    try {
      const cookieStore = await cookies();
      const recipe_token = cookieStore.get("recipe_token_user");
      if (recipe_token) {
        cookieHeader = `recipe_token_user=${recipe_token.value}`;
      }
    } catch {
      // cookies() not available (client-side or edge runtime)
    }
  }

  const response = await fetch(`${env.apiUrl}${endpoint}`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: {
      // Don't set Content-Type - browser will set it with boundary for multipart/form-data
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
  });

  if (!response.ok) {
    let errorMessage = `API Error: ${response.statusText}`;
    try {
      const errorData = await response.json();
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

  const data = await response.json();
  return { data, response };
}
