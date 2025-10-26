import { RecipeCard } from "@/components/features/recipe-card";
import type { RecipeItem } from "@/types/recipe";

type RecipeGridProps = {
  recipes: RecipeItem[];
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
