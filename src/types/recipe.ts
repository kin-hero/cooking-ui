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
