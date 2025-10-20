import { Suspense } from "react";
// Components
import Hero from "@/components/features/hero";
import { RecipeSection } from "@/components/features/recipe-section";
import { RecipeGridSkeleton } from "@/components/features/recipe-grid-skeleton";

export default function Home() {
  return (
    <div>
      {/* Hero renders immediately */}
      <Hero />
      <Suspense fallback={<RecipeGridSkeleton />}>
        <RecipeSection />
      </Suspense>
    </div>
  );
}
