"use client";

import Link from "next/link";

type AnalyticsData = {
  pageViews: number;
  uniqueSessions: number;
  leads: number;
  diagnosticoViews: number;
  conversionRate: number;
  topPages: { path: string; count: number }[];
  aiReferrals: { source: string; sessions: number }[];
  viewsByDay: { day: string; count: number }[];
};

export function AnalyticsCharts({
  data,
  period,
}: {
  data: AnalyticsData;
  period: number;
}) {
  const maxDay = Math.max(...data.viewsByDay.map((d) => d.count), 1);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2">
        {[7, 30, 90].map((d) => (
          <Link
            key={d}
            href={`/admin/analytics?days=${d}`}
            className={`text-xs px-3 py-1 rounded-md border ${
              period === d
                ? "bg-accent text-black border-accent"
                : "border-border text-muted"
            }`}
          >
            {d} dias
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-xs text-muted">Page views</p>
          <p className="text-2xl font-semibold">{data.pageViews}</p>
        </div>
        <div className="card">
          <p className="text-xs text-muted">Sesiones unicas</p>
          <p className="text-2xl font-semibold">{data.uniqueSessions}</p>
        </div>
        <div className="card">
          <p className="text-xs text-muted">Visitas /diagnostico</p>
          <p className="text-2xl font-semibold">{data.diagnosticoViews}</p>
        </div>
        <div className="card">
          <p className="text-xs text-muted">Conversion</p>
          <p className="text-2xl font-semibold">{data.conversionRate}%</p>
          <p className="text-xs text-muted">{data.leads} envios</p>
        </div>
      </div>

      <div className="card">
        <p className="text-sm font-medium text-foreground mb-4">Visitas por dia</p>
        {data.viewsByDay.length === 0 ? (
          <p className="text-xs text-muted">Sin datos en este periodo.</p>
        ) : (
          <div className="flex items-end gap-1 h-32">
            {data.viewsByDay.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                <div
                  className="w-full bg-accent/80 rounded-t"
                  style={{ height: `${(d.count / maxDay) * 100}%`, minHeight: d.count > 0 ? 4 : 0 }}
                  title={`${d.count} visitas`}
                />
                <span className="text-[9px] text-muted truncate w-full text-center">
                  {d.day.slice(5)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <p className="text-sm font-medium text-foreground mb-1">Visitas desde IA</p>
        <p className="text-xs text-muted mb-4">
          Sesiones que llegan desde ChatGPT, Perplexity, Gemini, Copilot o Claude. Es un minimo:
          algunas apps de IA no pasan el origen y cuentan como directas.
        </p>
        {data.aiReferrals.length === 0 ? (
          <p className="text-xs text-muted">Ninguna en este periodo.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {data.aiReferrals.map((r) => (
              <li key={r.source} className="flex justify-between text-sm">
                <span className="text-foreground-muted">{r.source}</span>
                <span className="text-foreground shrink-0 ml-4">{r.sessions}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <p className="text-sm font-medium text-foreground mb-4">Top paginas</p>
        {data.topPages.length === 0 ? (
          <p className="text-xs text-muted">Sin datos.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {data.topPages.map((p) => (
              <li key={p.path} className="flex justify-between text-sm">
                <span className="text-foreground-muted truncate">{p.path}</span>
                <span className="text-foreground shrink-0 ml-4">{p.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
