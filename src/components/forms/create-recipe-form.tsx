"use client";

import { useActionState, useState } from "react";
import { createRecipeAction, type CreateRecipeActionState } from "@/actions/recipe-actions";
import Image from "next/image";

export const CreateRecipeForm = () => {
  const [state, formAction, isPending] = useActionState<CreateRecipeActionState, FormData>(createRecipeAction, {
    success: false,
  });
  // State for dynamic arrays
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handlers for ingredients
  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  // Handlers for instructions
  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index: number) => setInstructions(instructions.filter((_, i) => i !== index));
  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  // Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <form action={formAction} className="space-y-6 max-w-3xl mx-auto">
      {/* Show global error message */}
      {state.message && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{state.message}</div>}

      {/* Hidden fields for arrays */}
      <input type="hidden" name="ingredients" value={JSON.stringify(ingredients.filter((i) => i.trim()))} />
      <input type="hidden" name="instructions" value={JSON.stringify(instructions.filter((i) => i.trim()))} />
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Recipe Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          disabled={isPending}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9119] focus:border-transparent disabled:bg-gray-100"
        />
        {state.errors?.title && <p className="mt-1 text-sm text-red-600">{state.errors.title[0]}</p>}
      </div>
      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          disabled={isPending}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9119] focus:border-transparent disabled:bg-gray-100"
        />
        {state.errors?.description && <p className="mt-1 text-sm text-red-600">{state.errors.description[0]}</p>}
      </div>

      {/* Time and Servings Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="prepTimeMinutes" className="block text-sm font-medium text-gray-700 mb-1">
            Prep Time (min) *
          </label>
          <input
            id="prepTimeMinutes"
            name="prepTimeMinutes"
            type="number"
            min="0"
            required
            disabled={isPending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9119] focus:border-transparent disabled:bg-gray-100"
          />
          {state.errors?.prepTimeMinutes && <p className="mt-1 text-sm text-red-600">{state.errors.prepTimeMinutes[0]}</p>}
        </div>

        <div>
          <label htmlFor="cookingTimeMinutes" className="block text-sm font-medium text-gray-700 mb-1">
            Cook Time (min) *
          </label>
          <input
            id="cookingTimeMinutes"
            name="cookingTimeMinutes"
            type="number"
            min="0"
            required
            disabled={isPending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9119] focus:border-transparent disabled:bg-gray-100"
          />
          {state.errors?.cookingTimeMinutes && <p className="mt-1 text-sm text-red-600">{state.errors.cookingTimeMinutes[0]}</p>}
        </div>
        <div>
          <label htmlFor="servingSize" className="block text-sm font-medium text-gray-700 mb-1">
            Servings *
          </label>
          <input
            id="servingSize"
            name="servingSize"
            type="number"
            min="1"
            required
            disabled={isPending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9119] focus:border-transparent disabled:bg-gray-100"
          />
          {state.errors?.servingSize && <p className="mt-1 text-sm text-red-600">{state.errors.servingSize[0]}</p>}
        </div>
      </div>
      {/* Ingredients Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients *</label>
        <div className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                disabled={isPending}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9119] focus:border-transparent disabled:bg-gray-100"
              />
              {ingredients.length > 1 && (
                <button type="button" onClick={() => removeIngredient(index)} disabled={isPending} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={addIngredient} disabled={isPending} className="mt-2 px-4 py-2 text-sm text-[#FF9119] hover:bg-[#FF9119]/10 rounded-lg transition-colors disabled:opacity-50">
          + Add Ingredient
        </button>
        {state.errors?.ingredients && <p className="mt-1 text-sm text-red-600">{state.errors.ingredients[0]}</p>}
      </div>

      {/* Instructions Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Instructions *</label>
        <div className="space-y-2">
          {instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2">
              <span className="flex-shrink-0 w-8 h-10 flex items-center justify-center text-sm font-semibold text-gray-600">{index + 1}.</span>
              <textarea
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                disabled={isPending}
                rows={2}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9119] focus:border-transparent disabled:bg-gray-100"
              />
              {instructions.length > 1 && (
                <button type="button" onClick={() => removeInstruction(index)} disabled={isPending} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={addInstruction} disabled={isPending} className="mt-2 px-4 py-2 text-sm text-[#FF9119] hover:bg-[#FF9119]/10 rounded-lg transition-colors disabled:opacity-50">
          + Add Step
        </button>
        {state.errors?.instructions && <p className="mt-1 text-sm text-red-600">{state.errors.instructions[0]}</p>}
      </div>
      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Recipe Image (Optional)
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isPending}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9119] focus:border-transparent disabled:bg-gray-100"
        />
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src={imagePreview} alt="Recipe preview" fill className="object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Publish Checkbox */}
      <div className="flex items-center gap-2">
        <input id="isPublished" name="isPublished" type="checkbox" value="true" disabled={isPending} className="w-4 h-4 text-[#FF9119] border-gray-300 rounded focus:ring-[#FF9119]" />
        <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
          Publish recipe immediately (uncheck to save as draft)
        </label>
      </div>
      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-[#FF9119] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#FF7A00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Creating..." : "Create Recipe"}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={isPending}
          className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
