import { Suspense } from "react";
// Components
import Hero from "@/components/features/hero";
import { RecipeSection } from "@/components/features/recipe-section";
import { RecipeGridSkeleton } from "@/components/features/recipe-grid-skeleton";

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  return (
    <div>
      {/* Hero renders immediately */}
      <Hero />
      <Suspense fallback={<RecipeGridSkeleton />}>
        <RecipeSection page={currentPage} />
      </Suspense>
    </div>
  );
}
