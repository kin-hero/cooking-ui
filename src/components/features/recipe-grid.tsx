import { getAllRecipes } from "@/services/recipe-service";
import { RecipeCard } from "@/components/features/recipe-card";

export async function RecipeGrid() {
  const recipes = await getAllRecipes();
  const { data } = recipes;
  const { recipeData } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipeData.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.recipeId} />
      ))}
    </div>
  );
}
