import { Skeleton } from "@/components/ui/skeleton";

export function RecipeCardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden bg-[#f5f1e8] shadow-sm">
      <Skeleton className="h-72 w-full rounded-none" />

      <div className="p-8 space-y-4">
        <Skeleton className="h-9 w-4/5" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-64" />
      </div>
    </div>
  );
}
