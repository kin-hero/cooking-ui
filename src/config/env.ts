export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  s3BucketUrl: process.env.NEXT_PUBLIC_S3_BUCKET_URL || "",
} as const;
