import { CreateRecipeForm } from "@/components/forms/create-recipe-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Recipe | Cooking Website",
  description: "Create and share your own recipe",
};

export default function CreateRecipePage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Create New Recipe</h1>
        <p className="text-gray-600 mb-8">Share your culinary creation with the world</p>

        <CreateRecipeForm />
      </div>
    </div>
  );
}
