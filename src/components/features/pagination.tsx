import { getAllRecipes } from "@/services/recipe-service";

export async function Pagination() {
  const recipes = await getAllRecipes();
  const { data } = recipes;
  const { hasMore } = data;

  if (!hasMore) return null;

  return (
    <div className="container mx-auto px-4 pb-8 text-center">
      <p className="text-gray-600">More recipes available - Pagination coming soon...</p>
    </div>
  );
}
