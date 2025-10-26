import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <Link href="/dashboard">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Dashboard</h1>
              </Link>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Manage and track your recipes</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
                Home
              </Link>
              <Link
                href="/dashboard/create"
                className="flex items-center justify-center gap-2 bg-[#FF9119] hover:bg-[#FF7A00] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-bold transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
              >
                <FaPlus />
                Create New Recipe
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      {children}
      <Footer />
    </div>
  );
}
