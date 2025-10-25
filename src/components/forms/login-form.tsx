"use client";

import { useActionState } from "react";
import { loginUserAction } from "@/actions/auth-actions";
import Link from "next/link";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUserAction, {
    success: false,
  });

  return (
    <form action={formAction} className="space-y-6 max-w-md mx-auto">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9119] focus:border-transparent"
          aria-describedby={state.errors?.email ? "email-error" : undefined}
        />
        {state.errors?.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9119] focus:border-transparent"
          aria-describedby={state.errors?.password ? "password-error" : undefined}
        />
        {state.errors?.password && (
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      {/* General Error Message */}
      {state.message && !state.success && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{state.message}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-4 bg-[#FF9119] hover:bg-[#FF7A00] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>

      {/* Link to Register */}
      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="font-medium text-[#FF9119] hover:text-[#FF7A00]">
          Create account
        </Link>
      </p>
    </form>
  );
}
