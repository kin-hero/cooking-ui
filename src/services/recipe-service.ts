import { apiClient } from "./api-client";
import type { RecipeData, RecipeDetailResponse } from "@/types/recipe";

export async function getAllRecipes(page?: number, limit?: number): Promise<RecipeData> {
  const params = new URLSearchParams();

  if (page !== undefined) {
    params.append("page", page.toString());
  }

  if (limit !== undefined) {
    params.append("limit", limit.toString());
  }

  const queryString = params.toString();
  const url = queryString ? `/recipes?${queryString}` : "/recipes";

  return apiClient<RecipeData>(url);
}

export async function getRecipeById(id: string): Promise<RecipeDetailResponse> {
  return apiClient<RecipeDetailResponse>(`/recipes/${id}`);
}

// export async function searchRecipes(query: string): Promise<Recipe[]> {
//   return apiClient<Recipe[]>(`/recipes/search?q=${query}`);
// }
