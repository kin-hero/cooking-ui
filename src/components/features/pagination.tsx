"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type PaginationProps = {
  hasMore: boolean;
  currentPage: number;
};

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

export function Pagination({ hasMore, currentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  if (!hasMore && currentPage === 1) return null;

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="flex items-center justify-center gap-4">
        {/* Previous Button */}
        <button
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 1 || isPending}
          className="px-6 py-3 bg-[#FF9119] text-white font-bold rounded-lg hover:bg-[#FF7A00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isPending ? <LoadingSpinner /> : "←"}
          Previous
        </button>

        {/* Current Page Indicator */}
        <span className="text-gray-700 font-medium">Page {currentPage}</span>

        {/* Next Button */}
        <button
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={!hasMore || isPending}
          className="px-6 py-3 bg-[#FF9119] text-white font-bold rounded-lg hover:bg-[#FF7A00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          Next
          {isPending ? <LoadingSpinner /> : "→"}
        </button>
      </div>
    </div>
  );
}
