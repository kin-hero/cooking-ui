import { apiClient } from "./api-client";
import type { RegisterRequestBody, RegisterResponse, VerifyEmailQuery, VerifyEmailResponse, LoginRequestBody, LoginResponse } from "@/types/auth";

export async function registerUser(data: RegisterRequestBody): Promise<RegisterResponse> {
  const { data: responseData } = await apiClient<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return responseData;
}

export async function verifyUserEmail(params: VerifyEmailQuery): Promise<VerifyEmailResponse> {
  const queryParams = new URLSearchParams({
    email: params.email,
    token: params.token,
  });

  const { data: responseData } = await apiClient<VerifyEmailResponse>(`/auth/verify-email?${queryParams.toString()}`, {
    method: "GET",
  });
  return responseData;
}

export async function loginUser(data: LoginRequestBody): Promise<{ data: LoginResponse; response: Response }> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
