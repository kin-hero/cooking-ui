"use client";

import { useState, useMemo } from "react";
import { RecipeGrid } from "./recipe-grid";
import type { RecipeDataWithoutAuthor } from "@/types/recipe";
import Link from "next/link";

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
      {filteredRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No recipes created yet</h3>
          <p className="text-gray-600 text-center mb-6 max-w-sm">
            {filterStatus === "published" && "You haven't published any recipes yet."}
            {filterStatus === "drafts" && "You don't have any draft recipes."}
            {filterStatus === "all" && "Start sharing your culinary creations with the world!"}
          </p>
          <Link
            href="/dashboard/create"
            className="inline-flex items-center gap-2 bg-[#FF9119] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#FF7A00] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Your First Recipe
          </Link>
        </div>
      ) : (
        <RecipeGrid recipes={filteredRecipes} />
      )}
    </div>
  );
}
