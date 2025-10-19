/**
 * Base API client configuration
 *
 * Set up your axios instance or fetch wrapper here
 */

// Option 1: Using fetch (built-in)
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
//
// export async function apiClient<T>(
//   endpoint: string,
//   options?: RequestInit
// ): Promise<T> {
//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...options?.headers,
//     },
//     ...options,
//   });
//
//   if (!response.ok) {
//     throw new Error(`API Error: ${response.statusText}`);
//   }
//
//   return response.json();
// }

// Option 2: Using axios (install with: npm install axios)
// import axios from 'axios';
//
// export const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
