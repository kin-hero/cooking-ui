/**
 * useRecipes hook
 *
 * Custom hook for fetching and managing recipe data
 */

// 'use client';
//
// import { useState, useEffect } from 'react';
// import { getAllRecipes } from '@/services/recipe-service';
// import type { Recipe } from '@/types';
//
// export function useRecipes() {
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//
//   useEffect(() => {
//     async function fetchRecipes() {
//       try {
//         const data = await getAllRecipes();
//         setRecipes(data);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     }
//
//     fetchRecipes();
//   }, []);
//
//   return { recipes, loading, error };
// }
