import { prisma } from "@/lib/prisma";
import { LeadsTable } from "@/components/admin/LeadsTable";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier } = await searchParams;
  let leads: Awaited<ReturnType<typeof prisma.leadSubmission.findMany>> = [];

  try {
    leads = await prisma.leadSubmission.findMany({
      where: tier ? { tier } : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    // DB not ready
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Leads del formulario</h1>
      <LeadsTable leads={leads} activeTier={tier} />
    </div>
  );
}
