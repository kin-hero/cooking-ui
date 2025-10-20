export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  cdnImageUrl: process.env.NEXT_PUBLIC_CDN_URL || "",
} as const;
