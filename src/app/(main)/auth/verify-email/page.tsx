import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { verifyUserEmail } from '@/services/auth-service';

type PageProps = {
  searchParams: Promise<{ email?: string; token?: string }>;
};

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const email = params.email;
  const token = params.token;

  // Check if email and token are provided
  if (!email || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-red-100 rounded-full p-6">
                <FaTimesCircle className="text-5xl text-red-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">Invalid Verification Link</h1>

            <p className="text-gray-600">
              The verification link is invalid or incomplete. Please check your email and try again.
            </p>

            <Link
              href="/"
              className="inline-block w-full py-3 px-4 bg-[#FF9119] hover:bg-[#FF7A00] text-white font-bold rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Call backend to verify email
  let verificationSuccess = false;
  let errorMessage = '';

  try {
    await verifyUserEmail({ email, token });
    verificationSuccess = true;
  } catch (error) {
    verificationSuccess = false;
    errorMessage = error instanceof Error ? error.message : 'Verification failed';
  }

  // Show success or error UI
  if (verificationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="bg-green-100 rounded-full p-6">
                <FaCheckCircle className="text-5xl text-green-600" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-900">Email Verified Successfully!</h1>

            {/* Message */}
            <p className="text-gray-600">
              Your email address has been verified. You can now log in to your account.
            </p>

            {/* CTA Button */}
            <Link
              href="/auth/login"
              className="inline-block w-full py-3 px-4 bg-[#FF9119] hover:bg-[#FF7A00] text-white font-bold rounded-lg transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="bg-red-100 rounded-full p-6">
              <FaTimesCircle className="text-5xl text-red-600" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900">Verification Failed</h1>

          {/* Error Message */}
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-red-800">{errorMessage}</p>
          </div>

          {/* Help Text */}
          <p className="text-gray-600">
            The verification link may have expired or already been used. Please try registering again or contact support.
          </p>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              href="/auth/register"
              className="inline-block w-full py-3 px-4 bg-[#FF9119] hover:bg-[#FF7A00] text-white font-bold rounded-lg transition-colors"
            >
              Register Again
            </Link>
            <Link href="/" className="inline-block w-full py-3 px-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold rounded-lg transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
