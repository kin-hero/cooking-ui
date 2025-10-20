import { RecipeCard } from "@/components/features/recipe-card";
import type { RecipeDataForHomePage } from "@/types/recipe";

type RecipeGridProps = {
  recipes: RecipeDataForHomePage[];
};

export function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.recipeId} />
      ))}
    </div>
  );
}
