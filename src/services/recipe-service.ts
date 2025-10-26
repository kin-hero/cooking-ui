import { apiClient, apiMultiFormClient } from "./api-client";
import type { RecipeDataResponse, RecipeDetailResponse, RecipeWithoutAuthorResponse, CreateRecipeResponse, UpdateRecipeResponse } from "@/types/recipe";

export async function getAllRecipes(page?: number, limit?: number): Promise<RecipeDataResponse> {
  const params = new URLSearchParams();

  if (page !== undefined) {
    params.append("page", page.toString());
  }

  if (limit !== undefined) {
    params.append("limit", limit.toString());
  }

  const queryString = params.toString();
  const url = queryString ? `/recipes?${queryString}` : "/recipes";

  const { data: responseData } = await apiClient<RecipeDataResponse>(url);
  return responseData;
}

export async function getRecipeById(id: string): Promise<RecipeDetailResponse> {
  const { data: responseData } = await apiClient<RecipeDetailResponse>(`/recipes/${id}`);
  return responseData;
}

export async function getRecipePerAuthor(page?: number, limit?: number): Promise<RecipeWithoutAuthorResponse> {
  const params = new URLSearchParams();

  if (page !== undefined) {
    params.append("page", page.toString());
  }

  if (limit !== undefined) {
    params.append("limit", limit.toString());
  }

  const queryString = params.toString();
  const url = queryString ? `/recipes/author?${queryString}` : "/recipes/author";
  const { data: responseData } = await apiClient<RecipeWithoutAuthorResponse>(url);
  return responseData;
}

export async function createRecipe(formData: FormData): Promise<CreateRecipeResponse> {
  const { data: responseData } = await apiMultiFormClient<CreateRecipeResponse>("/recipes", formData);
  return responseData;
}

export async function updateRecipe(recipeId: string, formData: FormData): Promise<UpdateRecipeResponse> {
  const { data: responseData } = await apiMultiFormClient<UpdateRecipeResponse>(`/recipes/${recipeId}`, formData, "PUT");

  return responseData;
}
