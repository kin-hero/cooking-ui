/**
 * useDebounce hook
 *
 * Debounces a value - useful for search inputs
 */

// import { useState, useEffect } from 'react';
//
// export function useDebounce<T>(value: T, delay: number = 500): T {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);
//
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);
//
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);
//
//   return debouncedValue;
// }

// Usage:
// const searchTerm = useDebounce(inputValue, 500);
