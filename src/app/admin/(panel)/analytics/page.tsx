import { getAnalyticsSummary } from "@/lib/analytics";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const { days: daysParam } = await searchParams;
  const days = Number(daysParam ?? 30);
  const period = ([7, 30, 90] as const).includes(days as 7 | 30 | 90) ? (days as 7 | 30 | 90) : 30;

  let data: Awaited<ReturnType<typeof getAnalyticsSummary>> = {
    period: 30,
    pageViews: 0,
    uniqueSessions: 0,
    leads: 0,
    diagnosticoViews: 0,
    conversionRate: 0,
    topPages: [],
    viewsByDay: [],
  };

  try {
    data = await getAnalyticsSummary(period);
  } catch {
    // DB not ready
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Analytics</h1>
      <AnalyticsCharts data={data} period={period} />
    </div>
  );
}
