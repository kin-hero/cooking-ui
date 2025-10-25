import { z } from "zod";

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
};

export type RegisterRequestBody = {
  email: string;
  password: string;
  displayName: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    displayName: string;
    verificationToken: string;
  };
};

export const registerSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    displayName: z.string().min(1, "Display name is required").max(100, "Display name must be less than 100 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
