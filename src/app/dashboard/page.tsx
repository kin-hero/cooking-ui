import { DashboardSection } from "@/components/features/dashboard";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <DashboardSection page={currentPage} />
    </div>
  );
}
