"use server";

import { redirect } from "next/navigation";
import { createRecipe, updateRecipe, deleteRecipe } from "@/services/recipe-service";
import { createRecipeSchema, updateRecipeSchema } from "@/types/recipe";
import type { CreateRecipeFormData, UpdateRecipeFormData } from "@/types/recipe";

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

    // Handle API errors - show generic message to user, log technical details
    console.error("Create recipe error:", error);
    return {
      success: false,
      message: "Failed to create recipe. Please try again later.",
    };
  }
}

export type UpdateRecipeActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};
export async function updateRecipeAction(prevState: UpdateRecipeActionState, formData: FormData): Promise<UpdateRecipeActionState> {
  // 1. Extract recipe ID
  const recipeId = formData.get("recipeId") as string;

  if (!recipeId) {
    return {
      success: false,
      message: "Recipe ID is required",
    };
  }

  // 2. Extract form data (only fields that were provided)
  const rawData: UpdateRecipeFormData = {};

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const ingredientsJson = formData.get("ingredients") as string;
  const instructionsJson = formData.get("instructions") as string;
  const prepTime = formData.get("prepTimeMinutes") as string;
  const cookTime = formData.get("cookingTimeMinutes") as string;
  const servings = formData.get("servingSize") as string;
  const isPublished = formData.get("isPublished") as string;

  if (title) rawData.title = title;
  if (description) rawData.description = description;
  if (ingredientsJson) rawData.ingredients = JSON.parse(ingredientsJson);
  if (instructionsJson) rawData.instructions = JSON.parse(instructionsJson);
  if (prepTime) rawData.prepTimeMinutes = parseInt(prepTime);
  if (cookTime) rawData.cookingTimeMinutes = parseInt(cookTime);
  if (servings) rawData.servingSize = parseInt(servings);
  if (isPublished !== null) rawData.isPublished = isPublished === "true";

  // 3. Validate with Zod
  const validation = updateRecipeSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // 4. Prepare FormData for backend (multipart)
  const backendFormData = new FormData();

  if (validation.data.title) backendFormData.append("title", validation.data.title);
  if (validation.data.description) backendFormData.append("description", validation.data.description);
  if (validation.data.ingredients) backendFormData.append("ingredients", JSON.stringify(validation.data.ingredients));
  if (validation.data.instructions) backendFormData.append("instructions", JSON.stringify(validation.data.instructions));
  if (validation.data.prepTimeMinutes !== undefined) backendFormData.append("prepTimeMinutes", validation.data.prepTimeMinutes.toString());
  if (validation.data.cookingTimeMinutes !== undefined) backendFormData.append("cookingTimeMinutes", validation.data.cookingTimeMinutes.toString());
  if (validation.data.servingSize !== undefined) backendFormData.append("servingSize", validation.data.servingSize.toString());
  if (validation.data.isPublished !== undefined) backendFormData.append("isPublished", validation.data.isPublished.toString());

  // 5. Call backend API
  try {
    await updateRecipe(recipeId, backendFormData);

    // 6. Redirect to recipe detail page on success
    redirect(`/recipes/${recipeId}`);
  } catch (error) {
    // If it's a redirect, re-throw it (this is expected Next.js behavior)
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    // 7. Handle API errors - show generic message to user, log technical details
    console.error("Update recipe error:", error);
    return {
      success: false,
      message: "Failed to update recipe. Please try again later.",
    };
  }
}

export type DeleteRecipeActionState = {
  success: boolean;
  message?: string;
};

export async function deleteRecipeAction(prevState: DeleteRecipeActionState, formData: FormData): Promise<DeleteRecipeActionState> {
  // 1. Extract recipe ID
  const recipeId = formData.get("recipeId") as string;

  if (!recipeId) {
    return {
      success: false,
      message: "Recipe ID is required",
    };
  }

  // 2. Call backend API
  try {
    await deleteRecipe(recipeId);

    // 3. Redirect to dashboard on success
    redirect("/dashboard");
  } catch (error) {
    // If it's a redirect, re-throw it (this is expected Next.js behavior)
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    // Handle API errors - show generic message to user, log technical details
    console.error("Delete recipe error:", error);
    return {
      success: false,
      message: "Failed to delete recipe. Please try again later.",
    };
  }
}
