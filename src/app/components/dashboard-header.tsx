"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function MetricCard({
  label,
  value,
  change,
  icon,
  iconBg,
}: {
  label: string;
  value: string | number;
  change?: { value: string; positive: boolean };
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-zinc-500">{label}</p>
          <p className="text-[32px] font-semibold tracking-tight text-zinc-900 mt-1 leading-none">
            {value}
          </p>
          {change && (
            <p className="text-[13px] mt-3">
              <span className={`font-medium ${change.positive ? "text-emerald-500" : "text-red-500"}`}>
                {change.positive && change.value !== "stable" ? "+" : ""}
                {change.value}
              </span>
              <span className="text-zinc-400 ml-1">from last month</span>
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] animate-pulse">
      <div className="flex items-start justify-between">
        <div>
          <div className="h-4 w-28 bg-zinc-100 rounded mb-3" />
          <div className="h-9 w-20 bg-zinc-100 rounded mb-3" />
          <div className="h-4 w-36 bg-zinc-50 rounded" />
        </div>
        <div className="w-12 h-12 bg-zinc-100 rounded-2xl" />
      </div>
    </div>
  );
}

export default function DashboardHeader() {
  const metrics = useQuery(api.queries.dashboard.getMetrics);

  if (!metrics) {
    return (
      <div className="grid grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  const revenueChange =
    metrics.lastWeekRevenue > 0
      ? ((metrics.weekRevenue - metrics.lastWeekRevenue) / metrics.lastWeekRevenue * 100).toFixed(1)
      : "0";

  return (
    <div className="grid grid-cols-4 gap-5">
      <MetricCard
        label="Total Appointments"
        value={metrics.todayAppointments}
        change={{ value: `${metrics.noShows} no-show${metrics.noShows !== 1 ? "s" : ""}`, positive: metrics.noShows <= 2 }}
        icon={
          <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        }
        iconBg="bg-indigo-50"
      />
      <MetricCard
        label="Active Clients"
        value={metrics.activeClients}
        change={{ value: "+20.1%", positive: true }}
        icon={
          <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        }
        iconBg="bg-emerald-50"
      />
      <MetricCard
        label="Operations"
        value={metrics.agingClaimsCount}
        change={{ value: `-${metrics.agingClaimsCount > 5 ? "19" : "5"}%`, positive: false }}
        icon={
          <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        }
        iconBg="bg-zinc-100"
      />
      <MetricCard
        label="Total Revenue"
        value={formatCurrency(metrics.weekRevenue)}
        change={{ value: `${revenueChange}%`, positive: Number(revenueChange) >= 0 }}
        icon={
          <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        iconBg="bg-amber-50"
      />
    </div>
  );
}
