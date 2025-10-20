import Image from "next/image";
import Link from "next/link";
import { RecipeDataForHomePage } from "@/types/recipe";

interface RecipeCardProps {
  recipe: RecipeDataForHomePage;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const imageUrl = recipe.imageUrl ?? "/images/placeholder-image.png";

  return (
    <Link href={`/recipes/${recipe.recipeId}`} className="block group">
      <div className="rounded-3xl overflow-hidden bg-[#f5f1e8] shadow-sm hover:shadow-md transition-all duration-300">
        {/* Recipe Image */}
        <div className="relative w-full h-72 overflow-hidden">
          <Image
            src={imageUrl}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Card Content */}
        <div className="p-8">
          {/* Recipe Title */}
          <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {recipe.title}
          </h3>

          {/* Author */}
          <p className="text-[#8b6f47] mb-4 text-base">
            By {recipe.authorName}
          </p>

          {/* Time & Servings Info */}
          <p className="text-[#8b6f47] text-base">
            Prep: {recipe.prepTimeMinutes} min | Cook: {recipe.cookingTimeMinutes} min | Serves: {recipe.servingSize}
          </p>
        </div>
      </div>
    </Link>
  );
}
