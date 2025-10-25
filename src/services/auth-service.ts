import { apiClient } from "./api-client";
import type { RegisterRequestBody, RegisterResponse, VerifyEmailQuery, VerifyEmailResponse, LoginRequestBody, LoginResponse } from "@/types/auth";

export async function registerUser(data: RegisterRequestBody): Promise<RegisterResponse> {
  return apiClient<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyUserEmail(params: VerifyEmailQuery): Promise<VerifyEmailResponse> {
  const queryParams = new URLSearchParams({
    email: params.email,
    token: params.token,
  });

  return apiClient<VerifyEmailResponse>(`/auth/verify-email?${queryParams.toString()}`, {
    method: "GET",
  });
}

export async function loginUser(data: LoginRequestBody): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
