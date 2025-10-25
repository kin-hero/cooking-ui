import { getAllRecipes } from "@/services/recipe-service";
import { RecipeGrid } from "@/components/features/recipe-grid";
import { Pagination } from "@/components/features/pagination";
import { MAX_RECIPES_PER_PAGE } from "@/lib/constants";

type RecipeSectionProps = {
  page: number;
};

export async function RecipeSection({ page }: RecipeSectionProps) {
  const recipes = await getAllRecipes(page, MAX_RECIPES_PER_PAGE);
  const { data } = recipes;
  const { recipeData, hasMore } = data;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <RecipeGrid recipes={recipeData} />
      </div>
      <Pagination hasMore={hasMore} currentPage={page} />
    </>
  );
}
