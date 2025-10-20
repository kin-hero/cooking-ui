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

export interface RecipeData {
  success: boolean;
  message: string;
  data: {
    recipeData: RecipeDataForHomePage[];
    totalItems: number;
    hasMore: boolean;
  };
}
