import { getAllRecipes } from "@/services/recipe-service";
import { RecipeGrid } from "@/components/features/recipe-grid";
import { Pagination } from "@/components/features/pagination";

export async function RecipeSection() {
  // Single fetch for both RecipeGrid and Pagination
  const recipes = await getAllRecipes();
  const { data } = recipes;
  const { recipeData, hasMore } = data;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <RecipeGrid recipes={recipeData} />
      </div>
      <Pagination hasMore={hasMore} />
    </>
  );
}
