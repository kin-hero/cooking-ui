export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded ${className}`}
      style={{
        animation: "pulse 2s ease-in-out infinite, shimmer 2s linear infinite",
      }}
    />
  );
}
