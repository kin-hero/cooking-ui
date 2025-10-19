import { getAllRecipes } from "@/services/recipe-service";
// Components
import Hero from "@/components/features/hero";
import { RecipeCard } from "@/components/features/recipe-card";

export default async function Home() {
  const recipes = await getAllRecipes();
  const { data } = recipes;
  const { recipeData, totalItems, hasMore } = data;

  return (
    <div>
      <Hero />

      {/* Recipe Grid - 3 columns, responsive */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipeData.map((data) => (
            <RecipeCard recipe={data} key={data.recipeId} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      {hasMore && (
        <div className="container mx-auto px-4 pb-8 text-center">
          <p className="text-gray-600">More recipes available - Pagination coming soon...</p>
        </div>
      )}
    </div>
  );
}
