import Image from "next/image";
import Link from "next/link";
import type { RecipeItem } from "@/types/recipe";

interface RecipeCardProps {
  recipe: RecipeItem;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const imageUrl = recipe.imageUrl ?? "/images/placeholder-image.png";
  const isPublished = "isPublished" in recipe ? recipe.isPublished : true;

  return (
    <Link href={`/recipes/${recipe.recipeId}`} className="block group">
      <div className="rounded-3xl overflow-hidden bg-[#f5f1e8] shadow-sm hover:shadow-md transition-all duration-300">
        {/* Recipe Image */}
        <div className="relative w-full h-48 sm:h-60 overflow-hidden">
          <Image
            src={imageUrl}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Draft Badge - Only show if not published */}
          {!isPublished && (
            <div className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              Draft
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-8">
          {/* Recipe Title */}
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">{recipe.title}</h3>

          {/* Author - Conditionally rendered only if authorName exists */}
          {"authorName" in recipe && <p className="text-[#8b6f47] mb-3 sm:mb-4 text-sm sm:text-base">By {recipe.authorName}</p>}

          {/* Time & Servings Info */}
          <p className="text-[#8b6f47] text-sm sm:text-base">
            Prep: {recipe.prepTimeMinutes} min | Cook: {recipe.cookingTimeMinutes} min | Serves: {recipe.servingSize}
          </p>
        </div>
      </div>
    </Link>
  );
}
