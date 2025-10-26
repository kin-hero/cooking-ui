"use client";

import { useState, useMemo } from "react";
import { RecipeGrid } from "./recipe-grid";
import type { RecipeDataWithoutAuthor } from "@/types/recipe";

type RecipeFilterStatus = "all" | "published" | "drafts";

type DashboardRecipeListProps = {
  recipes: RecipeDataWithoutAuthor[];
};

export function DashboardRecipeList({ recipes }: DashboardRecipeListProps) {
  const [filterStatus, setFilterStatus] = useState<RecipeFilterStatus>("all");

  const filteredRecipes = useMemo(() => {
    if (filterStatus === "all") {
      return recipes;
    }
    if (filterStatus === "published") {
      return recipes.filter((recipe) => recipe.isPublished === true);
    }
    if (filterStatus === "drafts") {
      return recipes.filter((recipe) => recipe.isPublished === false);
    }
    return recipes;
  }, [recipes, filterStatus]);

  const getButtonClass = (status: RecipeFilterStatus) => {
    const baseClass =
      "px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap";
    if (filterStatus === status) {
      return `${baseClass} bg-[#FF9119] text-white hover:bg-[#FF7A00]`;
    }
    return `${baseClass} text-gray-700 bg-white border border-gray-300 hover:bg-gray-50`;
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Recipes</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button onClick={() => setFilterStatus("all")} className={getButtonClass("all")}>
            All
          </button>
          <button onClick={() => setFilterStatus("published")} className={getButtonClass("published")}>
            Published
          </button>
          <button onClick={() => setFilterStatus("drafts")} className={getButtonClass("drafts")}>
            Drafts
          </button>
        </div>
      </div>
      <RecipeGrid recipes={filteredRecipes} />
    </div>
  );
}
