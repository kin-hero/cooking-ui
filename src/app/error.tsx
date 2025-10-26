"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Log the error for debugging
    console.error("Application error:", error);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [error, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
            <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-4">We&apos;re sorry for the inconvenience. An unexpected error occurred.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-[#FF9119] animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-700">
              Redirecting to home in <span className="font-bold text-[#FF9119]">{countdown}</span> seconds...
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => reset()} className="px-6 py-3 border border-[#FF9119] text-[#FF9119] rounded-lg font-bold hover:bg-[#FF9119] hover:text-white transition-colors">
              Try Again
            </button>
            <Link href="/" className="inline-block bg-[#FF9119] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#FF7A00] transition-colors">
              Go Home Now
            </Link>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>If this problem persists, please contact support.</p>
        </div>
      </div>
    </div>
  );
}
