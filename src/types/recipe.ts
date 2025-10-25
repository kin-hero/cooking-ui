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
