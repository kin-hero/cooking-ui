import { Suspense } from "react";
// Components
import Hero from "@/components/features/hero";
import { RecipeGrid } from "@/components/features/recipe-grid";
import { RecipeGridSkeleton } from "@/components/features/recipe-grid-skeleton";
import { Pagination } from "@/components/features/pagination";

export default function Home() {
  return (
    <div>
      {/* Hero renders immediately */}
      <Hero />

      {/* Recipe grid streams in when data is ready */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<RecipeGridSkeleton />}>
          <RecipeGrid />
        </Suspense>
      </div>

      {/* Pagination streams in after recipes load */}
      <Suspense fallback={null}>
        <Pagination />
      </Suspense>
    </div>
  );
}
