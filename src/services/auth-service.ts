import { apiClient } from "./api-client";
import type { RegisterRequestBody, RegisterResponse } from "@/types/auth";

export async function registerUser(data: RegisterRequestBody): Promise<RegisterResponse> {
  return apiClient<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
