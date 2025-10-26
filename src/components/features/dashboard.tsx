import { MAX_RECIPES_PER_PAGE } from "@/lib/constants";
import { getRecipePerAuthor } from "@/services/recipe-service";
import { Pagination } from "./pagination";
import { DashboardRecipeList } from "./dashboard-recipe-list";
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
      <DashboardRecipeList recipes={recipeData} />
      <Pagination hasMore={hasMore} currentPage={page} />
    </>
  );
}
