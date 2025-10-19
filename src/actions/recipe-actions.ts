/**
 * Recipe Server Actions
 *
 * Server-side functions for handling recipe mutations (create, update, delete)
 */

// 'use server';
//
// import { revalidatePath } from 'next/cache';
//
// export async function createRecipe(formData: FormData) {
//   // Validate the form data
//   const title = formData.get('title') as string;
//   const description = formData.get('description') as string;
//
//   // Call your external API
//   // const response = await fetch('https://api.example.com/recipes', {
//   //   method: 'POST',
//   //   body: JSON.stringify({ title, description }),
//   // });
//
//   // Revalidate the recipes page to show new data
//   revalidatePath('/recipes');
//
//   return { success: true };
// }

// export async function deleteRecipe(id: string) {
//   // Call your API to delete
//   // await fetch(`https://api.example.com/recipes/${id}`, { method: 'DELETE' });
//
//   revalidatePath('/recipes');
//   return { success: true };
// }
