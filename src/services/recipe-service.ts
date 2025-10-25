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

  const { data: responseData } = await apiClient<RecipeData>(url);
  return responseData;
}

export async function getRecipeById(id: string): Promise<RecipeDetailResponse> {
  const { data: responseData } = await apiClient<RecipeDetailResponse>(`/recipes/${id}`);
  return responseData;
}

// export async function searchRecipes(query: string): Promise<Recipe[]> {
//   return apiClient<Recipe[]>(`/recipes/search?q=${query}`);
// }
