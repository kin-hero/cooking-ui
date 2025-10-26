import { z } from "zod";

export interface RecipeDataForHomePage {
  recipeId: string;
  title: string;
  prepTimeMinutes: number;
  cookingTimeMinutes: number;
  servingSize: number;
  imageUrl: string | null;
  authorName: string;
  authorAvatarUrl: string | null;
}

export interface RecipeDataResponse {
  success: boolean;
  message: string;
  data: {
    recipeData: RecipeDataForHomePage[];
    totalItems: number;
    hasMore: boolean;
  };
}

// Export the individual recipe type for use in components
export type RecipeDataWithoutAuthor = Omit<RecipeDataForHomePage, "authorName" | "authorAvatarUrl"> & {
  isPublished: boolean;
};

// Union type for RecipeGrid - can accept either recipe type
export type RecipeItem = RecipeDataForHomePage | RecipeDataWithoutAuthor;

export interface RecipeWithoutAuthorData {
  recipeData: RecipeDataWithoutAuthor[];
  totalItems: number;
  draftItems: number;
  hasMore: boolean;
}

export interface RecipeWithoutAuthorResponse {
  success: boolean;
  message: string;
  data: RecipeWithoutAuthorData;
}

export interface RecipeDetailData {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookingTimeMinutes: number;
  servingSize: number;
  imageUrl: string | null;
  recipeUpdatedAt: Date;
  authorName: string;
  authorAvatarUrl: string | null;
  isOwner: boolean;
}

export type RecipeDetailResponse = {
  success: boolean;
  message: string;
  data: RecipeDetailData;
};

export type CreateRecipeFormData = {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookingTimeMinutes: number;
  servingSize: number;
  isPublished: boolean;
  image?: File;
};

export type CreateRecipeResponse = {
  success: boolean;
  message: string;
};

export const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters"),
  ingredients: z.array(z.string().min(1, "Ingredient cannot be empty")).min(1, "At least one ingredient is required"),
  instructions: z.array(z.string().min(1, "Instruction cannot be empty")).min(1, "At least one instruction is required"),
  prepTimeMinutes: z.number().min(0, "Prep time must be at least 0").max(1440, "Prep time cannot exceed 24 hours"),
  cookingTimeMinutes: z.number().min(0, "Cooking time must be at least 0").max(1440, "Cooking time cannot exceed 24 hours"),
  servingSize: z.number().min(1, "Serving size must be at least 1").max(100, "Serving size cannot exceed 100"),
  isPublished: z.boolean(),
});
