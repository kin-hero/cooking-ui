import { UpdateRecipeForm } from "@/components/forms/update-recipe-form";
import { getRecipeById } from "@/services/recipe-service";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

type UpdateRecipePageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Edit Recipe | Cooking Website",
  description: "Edit your recipe",
};

export default async function UpdateRecipePage({ params }: UpdateRecipePageProps) {
  const { id } = await params;

  // Fetch recipe data
  const recipeResponse = await getRecipeById(id);
  const recipe = recipeResponse.data;

  // Check if user is the owner
  if (!recipe.isOwner) {
    redirect("/dashboard?error=unauthorized");
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Edit Recipe</h1>
        <p className="text-gray-600 mb-8">Update your recipe details</p>

        <UpdateRecipeForm recipe={recipe} />
      </div>
    </div>
  );
}
