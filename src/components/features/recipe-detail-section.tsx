import { getRecipeById } from "@/services/recipe-service";
import Image from "next/image";
import { FaClock, FaConciergeBell, FaUtensils } from "react-icons/fa";
import Link from "next/link";

export async function RecipeDetailSection({ id }: { id: string }) {
  const recipes = await getRecipeById(id);
  const { data } = recipes;
  const { title, description, prepTimeMinutes, cookingTimeMinutes, servingSize, ingredients, instructions, imageUrl, authorAvatarUrl, authorName, isOwner } = data;

  return (
    <section className="container mx-auto px-4 my-8">
      {/* Hero Image with Title Overlay */}
      <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
        {imageUrl ? (
          <>
            <Image src={imageUrl} alt={title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </>
        ) : null}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">{title}</h1>
        </div>
      </div>

      {/* Author and Description Section */}
      <div className="mt-8 mb-8">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          {authorAvatarUrl ? <Image src={authorAvatarUrl} width={48} height={48} alt={`${authorName}'s avatar`} className="rounded-full object-cover border-2 border-[#FF9119]" /> : null}
          <div>
            <p className="text-sm text-gray-500">Recipe by</p>
            <p className="text-lg font-semibold text-gray-900">{authorName}</p>
          </div>
          {/* Edit Button - Only show if user is owner */}
          {isOwner && (
            <Link href={`/dashboard/edit/${id}`} className="inline-flex items-center gap-2 bg-[#FF9119] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#FF7A00] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Recipe
            </Link>
          )}
        </div>

        {/* Description */}
        <p className="text-[#8A7361] text-lg leading-relaxed italic">{description}</p>
      </div>

      {/* Recipe Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-gradient-to-br from-[#FF9119] to-[#FF7A00] text-white p-5 rounded-xl shadow-lg flex items-center gap-4">
          <FaClock className="text-3xl opacity-90" />
          <div>
            <p className="text-sm opacity-90 font-medium">Prep Time</p>
            <p className="text-2xl font-bold">{prepTimeMinutes} min</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#FF9119] to-[#FF7A00] text-white p-5 rounded-xl shadow-lg flex items-center gap-4">
          <FaConciergeBell className="text-3xl opacity-90" />
          <div>
            <p className="text-sm opacity-90 font-medium">Cook Time</p>
            <p className="text-2xl font-bold">{cookingTimeMinutes} min</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#FF9119] to-[#FF7A00] text-white p-5 rounded-xl shadow-lg flex items-center gap-4">
          <FaUtensils className="text-3xl opacity-90" />
          <div>
            <p className="text-sm opacity-90 font-medium">Servings</p>
            <p className="text-2xl font-bold">{servingSize}</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout for Ingredients and Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Ingredients Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#FF9119]">Ingredients</h2>
            <ul className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF9119]/10 text-[#FF9119] flex items-center justify-center text-sm font-semibold mt-0.5">✓</span>
                  <span className="text-gray-700 leading-relaxed">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#FF9119]">Instructions</h2>
            <ol className="space-y-6">
              {instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9119] to-[#FF7A00] text-white flex items-center justify-center text-lg font-bold shadow-md">
                    {index + 1}
                  </span>
                  <div className="flex-1 pt-1.5">
                    <p className="text-gray-700 leading-relaxed text-lg">{instruction}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
