"use client";

import { useActionState, useState } from "react";
import { updateRecipeAction, type UpdateRecipeActionState, deleteRecipeAction, type DeleteRecipeActionState } from "@/actions/recipe-actions";
import Image from "next/image";
import type { RecipeDetailData } from "@/types/recipe";
import { ConfirmModal } from "@/components/ui/confirm-modal";

type UpdateRecipeFormProps = {
  recipe: RecipeDetailData;
};

export function UpdateRecipeForm({ recipe }: UpdateRecipeFormProps) {
  const [state, formAction, isPending] = useActionState<UpdateRecipeActionState, FormData>(updateRecipeAction, {
    success: false,
  });

  // State for dynamic arrays - pre-filled with existing data
  const [ingredients, setIngredients] = useState<string[]>(recipe.ingredients);
  const [instructions, setInstructions] = useState<string[]>(recipe.instructions);

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteState, deleteAction, isDeleting] = useActionState<DeleteRecipeActionState, FormData>(deleteRecipeAction, { success: false });

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    // Submit the hidden delete form
    const deleteForm = document.getElementById("delete-form") as HTMLFormElement;
    if (deleteForm) {
      deleteForm.requestSubmit();
    }
  };

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

  return (
    <>
    <form action={formAction} className="space-y-6 max-w-3xl mx-auto">
      {/* Show global error message */}
      {state.message && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{state.message}</div>}

      {/* Hidden field for recipe ID */}
      <input type="hidden" name="recipeId" value={recipe.id} />

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
          defaultValue={recipe.title}
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
          defaultValue={recipe.description}
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
            defaultValue={recipe.prepTimeMinutes}
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
            defaultValue={recipe.cookingTimeMinutes}
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
            defaultValue={recipe.servingSize}
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

      {/* Current Recipe Image (read-only) */}
      {recipe.imageUrl && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Image</label>
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image src={recipe.imageUrl} alt={recipe.title} fill className="object-cover" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Images cannot be changed after creation</p>
        </div>
      )}

      {/* Publish Status Toggle */}
      <div className="flex items-center gap-2">
        <input
          id="isPublished"
          name="isPublished"
          type="checkbox"
          defaultChecked={recipe.isPublished}
          disabled={isPending}
          value="true"
          className="w-4 h-4 text-[#FF9119] border-gray-300 rounded focus:ring-[#FF9119]"
        />
        <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
          Publish recipe (uncheck to save as draft)
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending || isDeleting}
            className="flex-1 bg-[#FF9119] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#FF7A00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Updating..." : "Update Recipe"}
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            disabled={isPending || isDeleting}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={isPending || isDeleting}
          className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Delete Recipe
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Recipe"
        message="Are you sure you want to delete this recipe? This action cannot be undone and will permanently remove the recipe and all its images."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
        isLoading={isDeleting}
        isDangerous={true}
      />
    </form>

    {/* Hidden delete form */}
    <form id="delete-form" action={deleteAction} className="hidden">
      <input type="hidden" name="recipeId" value={recipe.id} />
    </form>
    </>
  );
}
