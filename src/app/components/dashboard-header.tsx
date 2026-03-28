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
  subtitle,
  trend,
}: {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: { direction: "up" | "down" | "flat"; value: string };
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend.direction === "up"
                ? "text-emerald-600"
                : trend.direction === "down"
                  ? "text-red-600"
                  : "text-slate-500"
            }`}
          >
            {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→"}{" "}
            {trend.value}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function DashboardHeader() {
  const metrics = useQuery(api.queries.dashboard.getMetrics);

  if (!metrics) {
    return (
      <div className="mb-6">
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] rounded-xl p-6 mb-4">
          <h1 className="text-2xl font-bold text-white">
            Meridian Behavioral Health
          </h1>
          <p className="text-blue-200 text-sm mt-1">
            Business Intelligence Dashboard
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-pulse"
            >
              <div className="h-4 w-24 bg-slate-200 rounded mb-2" />
              <div className="h-7 w-16 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const revenueChange =
    metrics.lastWeekRevenue > 0
      ? Math.round(
          ((metrics.weekRevenue - metrics.lastWeekRevenue) /
            metrics.lastWeekRevenue) *
            100
        )
      : 0;

  const revenueTrend: { direction: "up" | "down" | "flat"; value: string } = {
    direction: revenueChange > 0 ? "up" : revenueChange < 0 ? "down" : "flat",
    value: `${Math.abs(revenueChange)}% WoW`,
  };

  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] rounded-xl p-6 mb-4">
        <h1 className="text-2xl font-bold text-white">
          Meridian Behavioral Health
        </h1>
        <p className="text-blue-200 text-sm mt-1">
          Business Intelligence Dashboard
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          label="Active Clients"
          value={metrics.activeClients}
          subtitle="Across both locations"
        />
        <MetricCard
          label="Today's Appointments"
          value={metrics.todayAppointments}
          subtitle={`${metrics.noShows} no-show${metrics.noShows !== 1 ? "s" : ""} yesterday`}
        />
        <MetricCard
          label="This Week Revenue"
          value={formatCurrency(metrics.weekRevenue)}
          trend={revenueTrend}
        />
        <MetricCard
          label="Aging Claims"
          value={metrics.agingClaimsCount}
          subtitle={`${formatCurrency(metrics.agingClaimsAmount)} total`}
          trend={
            metrics.agingClaimsCount > 5
              ? { direction: "up", value: "Needs attention" }
              : undefined
          }
        />
      </div>
    </div>
  );
}
