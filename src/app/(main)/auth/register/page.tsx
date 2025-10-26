import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Create your account</h1>
          <p className="mt-2 text-sm text-gray-600">Join Recipify and start sharing your favorite recipes</p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
