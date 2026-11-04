import { prisma } from "@/lib/prisma";
import { aiSource } from "@/lib/ai-sources";

export type AnalyticsPeriod = 7 | 30 | 90;

function periodStart(days: AnalyticsPeriod) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

export async function getAnalyticsSummary(days: AnalyticsPeriod = 30) {
  const since = periodStart(days);

  const [pageViews, uniqueSessions, leads, diagnosticoViews] = await Promise.all([
    prisma.pageView.count({ where: { createdAt: { gte: since } } }),
    prisma.pageView.groupBy({
      by: ["sessionId"],
      where: { createdAt: { gte: since } },
    }),
    prisma.leadSubmission.count({ where: { createdAt: { gte: since } } }),
    prisma.pageView.count({
      where: { path: { startsWith: "/diagnostico" }, createdAt: { gte: since } },
    }),
  ]);

  const topPages = await prisma.pageView.groupBy({
    by: ["path"],
    where: { createdAt: { gte: since } },
    _count: { path: true },
    orderBy: { _count: { path: "desc" } },
    take: 10,
  });

  const viewsByDay = await prisma.$queryRaw<
    { day: Date; count: bigint }[]
  >`SELECT DATE_TRUNC('day', "createdAt") as day, COUNT(*)::bigint as count
    FROM "PageView"
    WHERE "createdAt" >= ${since}
    GROUP BY day
    ORDER BY day ASC`;

  // Sesiones que llegan desde un asistente de IA, por asistente.
  const withReferrer = await prisma.pageView.findMany({
    where: { createdAt: { gte: since }, referrer: { not: null } },
    select: { referrer: true, sessionId: true },
    distinct: ["sessionId", "referrer"],
  });
  const aiSessions = new Map<string, Set<string>>();
  for (const v of withReferrer) {
    const name = aiSource(v.referrer);
    if (!name) continue;
    if (!aiSessions.has(name)) aiSessions.set(name, new Set());
    aiSessions.get(name)!.add(v.sessionId);
  }
  const aiReferrals = [...aiSessions.entries()]
    .map(([source, sessions]) => ({ source, sessions: sessions.size }))
    .sort((a, b) => b.sessions - a.sessions);

  const conversionRate =
    diagnosticoViews > 0 ? Math.round((leads / diagnosticoViews) * 100) : 0;

  return {
    period: days,
    pageViews,
    uniqueSessions: uniqueSessions.length,
    leads,
    diagnosticoViews,
    conversionRate,
    topPages: topPages.map((p) => ({ path: p.path, count: p._count.path })),
    aiReferrals,
    viewsByDay: viewsByDay.map((r) => ({
      day: r.day.toISOString().slice(0, 10),
      count: Number(r.count),
    })),
  };
}

export async function getDashboardStats() {
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const start7d = periodStart(7);
  const start30d = periodStart(30);

  const [
    leadsToday,
    leads7d,
    leads30d,
    postsPublished,
    viewsToday,
    views7d,
  ] = await Promise.all([
    prisma.leadSubmission.count({ where: { createdAt: { gte: startToday } } }),
    prisma.leadSubmission.count({ where: { createdAt: { gte: start7d } } }),
    prisma.leadSubmission.count({ where: { createdAt: { gte: start30d } } }),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.pageView.count({ where: { createdAt: { gte: startToday } } }),
    prisma.pageView.count({ where: { createdAt: { gte: start7d } } }),
  ]);

  const analytics30 = await getAnalyticsSummary(30);

  return {
    leadsToday,
    leads7d,
    leads30d,
    postsPublished,
    viewsToday,
    views7d,
    conversionRate: analytics30.conversionRate,
  };
}
