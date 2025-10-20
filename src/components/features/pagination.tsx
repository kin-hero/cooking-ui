type PaginationProps = {
  hasMore: boolean;
};

export function Pagination({ hasMore }: PaginationProps) {
  if (!hasMore) return null;

  return (
    <div className="container mx-auto px-4 pb-8 text-center">
      <p className="text-gray-600">More recipes available - Pagination coming soon...</p>
    </div>
  );
}
