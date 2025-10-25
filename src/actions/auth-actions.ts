"use server";

import { redirect } from "next/navigation";
import { registerUser } from "@/services/auth-service";
import { registerSchema } from "@/types/auth";

export type RegisterActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function registerUserAction(prevState: RegisterActionState, formData: FormData): Promise<RegisterActionState> {
  // 1. Extract form data
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    displayName: formData.get("displayName") as string,
  };

  // 2. Validate with Zod
  const validation = registerSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // 3. Call backend API
  try {
    const { email, password, displayName } = validation.data;
    await registerUser({ email, password, displayName });

    // 4. Redirect to verification page on success
    redirect("/auth/verify-email?email=" + encodeURIComponent(email));
  } catch (error) {
    // If it's a redirect, re-throw it (this is expected Next.js behavior)
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    // 5. Handle API errors
    return {
      success: false,
      message: error instanceof Error ? error.message : "Registration failed. Please try again.",
    };
  }
}
