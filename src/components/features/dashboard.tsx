import { MAX_RECIPES_PER_PAGE } from "@/lib/constants";
import { getRecipePerAuthor } from "@/services/recipe-service";
import { Pagination } from "./pagination";
import { RecipeGrid } from "./recipe-grid";
import StatsCard from "@/components/features/stats-card";

type DashboardProps = {
  page: number;
};

export async function DashboardSection({ page }: DashboardProps) {
  const recipes = await getRecipePerAuthor(page, MAX_RECIPES_PER_PAGE);
  const { data } = recipes;
  const { hasMore, totalItems, recipeData, draftItems } = data;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <StatsCard stats={totalItems} label="Total Recipes" />
        <StatsCard stats={draftItems} label="Draft Recipes" />
      </div>
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Recipes</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
              All
            </button>
            <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
              Published
            </button>
            <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
              Drafts
            </button>
          </div>
        </div>
        <RecipeGrid recipes={recipeData} />
      </div>
      <Pagination hasMore={hasMore} currentPage={page} />
    </>
  );
}
