/**
 * Reusable Input component
 *
 * A base input component for forms
 */

// Example:
// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   error?: string;
// }
//
// export function Input({ label, error, className, ...props }: InputProps) {
//   return (
//     <div className="flex flex-col gap-1">
//       {label && <label className="text-sm font-medium">{label}</label>}
//       <input
//         className={cn(
//           'rounded-lg border px-4 py-2',
//           error && 'border-red-500',
//           className
//         )}
//         {...props}
//       />
//       {error && <span className="text-sm text-red-500">{error}</span>}
//     </div>
//   );
// }
