import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

type PageProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const email = params.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-[#FF9119]/10 rounded-full p-6">
              <FaEnvelope className="text-5xl text-[#FF9119]" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900">Check Your Email</h1>

          {/* Email Display */}
          {email && (
            <p className="text-gray-600">
              We&apos;ve sent a verification link to <span className="font-semibold text-gray-900">{email}</span>
            </p>
          )}

          {/* Instructions */}
          <p className="text-gray-600">Please check your inbox and click the verification link to activate your account.</p>

          {/* Help Box */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Didn&apos;t receive the email?</strong>
              <br />
              Check your spam folder or try registering again if needed.
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/" className="inline-block w-full py-3 px-4 bg-[#FF9119] hover:bg-[#FF7A00] text-white font-bold rounded-lg transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
