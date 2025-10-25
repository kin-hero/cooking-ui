"use server";

import { redirect } from "next/navigation";
import { loginUser, registerUser } from "@/services/auth-service";
import { loginSchema, registerSchema } from "@/types/auth";
import { cookies } from "next/headers";

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

    // 4. Redirect to registration success page
    redirect("/auth/registration-success?email=" + encodeURIComponent(email));
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

export type LoginActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function loginUserAction(prevState: LoginActionState, formData: FormData): Promise<LoginActionState> {
  // 1. Extract form data
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // 2. Validate with Zod
  const validation = loginSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // 3. Call backend API
  try {
    const { email, password } = validation.data;
    const { response } = await loginUser({ email, password });

    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieParts = setCookieHeader.split(";");
      const [nameValue] = cookieParts;
      const [name, value] = nameValue.split("=");

      const cookieStore = await cookies();
      cookieStore.set(name.trim(), value.trim(), {
        httpOnly: true,
        path: "/",
        maxAge: 24 * 60 * 60, // 24 hours
        sameSite: "lax",
      });
    }

    // 4. Redirect to registration success page
    redirect("/");
  } catch (error) {
    // If it's a redirect, re-throw it (this is expected Next.js behavior)
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    // 5. Handle API errors
    return {
      success: false,
      message: error instanceof Error ? error.message : "Login failed. Please try again.",
    };
  }
}
