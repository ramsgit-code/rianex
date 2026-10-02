import { getDashboardStats } from "@/lib/analytics";
import { StatCard } from "@/components/admin/StatCard";

export default async function AdminDashboardPage() {
  let stats = {
    leadsToday: 0,
    leads7d: 0,
    leads30d: 0,
    postsPublished: 0,
    viewsToday: 0,
    views7d: 0,
    conversionRate: 0,
  };

  try {
    stats = await getDashboardStats();
  } catch {
    // DB not configured yet
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Leads hoy" value={stats.leadsToday} />
        <StatCard label="Leads 7 dias" value={stats.leads7d} />
        <StatCard label="Leads 30 dias" value={stats.leads30d} />
        <StatCard label="Posts publicados" value={stats.postsPublished} />
        <StatCard label="Visitas hoy" value={stats.viewsToday} />
        <StatCard label="Visitas 7 dias" value={stats.views7d} />
        <StatCard
          label="Conversion diagnostico"
          value={`${stats.conversionRate}%`}
          hint="Envios / visitas a /diagnostico (30d)"
        />
      </div>
    </div>
  );
}
