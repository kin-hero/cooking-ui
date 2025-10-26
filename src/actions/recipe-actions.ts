"use server";

import { redirect } from "next/navigation";
import { createRecipe } from "@/services/recipe-service";
import { createRecipeSchema } from "@/types/recipe";
import type { CreateRecipeFormData } from "@/types/recipe";

export type CreateRecipeActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function createRecipeAction(prevState: CreateRecipeActionState, formData: FormData): Promise<CreateRecipeActionState> {
  // 1. Extract form data
  const rawData: CreateRecipeFormData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    ingredients: JSON.parse((formData.get("ingredients") as string) || "[]"),
    instructions: JSON.parse((formData.get("instructions") as string) || "[]"),
    prepTimeMinutes: parseInt(formData.get("prepTimeMinutes") as string),
    cookingTimeMinutes: parseInt(formData.get("cookingTimeMinutes") as string),
    servingSize: parseInt(formData.get("servingSize") as string),
    isPublished: formData.get("isPublished") === "true",
  };

  // 2. Validate with Zod (excluding image file)
  const validation = createRecipeSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // 3. Prepare FormData for backend (multipart)
  const backendFormData = new FormData();
  backendFormData.append("title", validation.data.title);
  backendFormData.append("description", validation.data.description);
  backendFormData.append("ingredients", JSON.stringify(validation.data.ingredients));
  backendFormData.append("instructions", JSON.stringify(validation.data.instructions));
  backendFormData.append("prepTimeMinutes", validation.data.prepTimeMinutes.toString());
  backendFormData.append("cookingTimeMinutes", validation.data.cookingTimeMinutes.toString());
  backendFormData.append("servingSize", validation.data.servingSize.toString());
  backendFormData.append("isPublished", validation.data.isPublished.toString());

  // Add image if provided
  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    backendFormData.append("image", imageFile);
  }

  // 4. Call backend API
  try {
    await createRecipe(backendFormData);

    // 5. Redirect to dashboard on success
    redirect("/dashboard");
  } catch (error) {
    // If it's a redirect, re-throw it (this is expected Next.js behavior)
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create recipe. Please try again.",
    };
  }
}
