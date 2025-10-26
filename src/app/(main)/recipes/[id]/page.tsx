import { RecipeDetailSection } from "@/components/features/recipe-detail-section";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function RecipeDetailPage({ params }: PageProps) {
  const { id } = await params;

  return <RecipeDetailSection id={id} />;
}
