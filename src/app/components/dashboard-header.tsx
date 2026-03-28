"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import NumberFlow from "@number-flow/react";
import { ArrowUp, ArrowDown } from "lucide-react";

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function TrendArrow({ direction, className }: { direction: "up" | "down"; className?: string }) {
  const arrows = [0, 1, 2];
  return (
    <div className={`flex flex-col items-center gap-0 ${className}`}>
      {arrows.map((i) =>
        direction === "up" ? (
          <ArrowUp
            key={i}
            className="w-3 h-3 animate-[marquee-up_1.2s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ) : (
          <ArrowDown
            key={i}
            className="w-3 h-3 animate-[marquee-down_1.2s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        )
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  prefix,
  change,
  positive,
}: {
  label: string;
  value: number;
  prefix?: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-pop rounded-lg p-1.5">
      <div className="bg-card rounded p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
              {label}
            </p>
            <div className="font-display text-4xl md:text-5xl tracking-tight text-foreground">
              {prefix}
              <NumberFlow value={value} />
            </div>
          </div>
          <div className={`flex items-center gap-1 ${positive ? "text-success" : "text-destructive"}`}>
            <TrendArrow direction={positive ? "up" : "down"} />
          </div>
        </div>
        <p className="mt-3 text-xs font-medium text-muted-foreground">
          <span className={positive ? "text-success" : "text-destructive"}>
            {change}
          </span>{" "}
          from last week
        </p>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-pop rounded-lg p-1.5">
      <div className="bg-card rounded p-4 animate-pulse">
        <div className="h-3 w-24 bg-muted rounded mb-4" />
        <div className="h-10 w-20 bg-muted rounded mb-3" />
        <div className="h-3 w-32 bg-muted rounded" />
      </div>
    </div>
  );
}

export default function DashboardHeader() {
  const metrics = useQuery(api.queries.dashboard.getMetrics);

  if (!metrics) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  const revenueChange =
    metrics.lastWeekRevenue > 0
      ? ((metrics.weekRevenue - metrics.lastWeekRevenue) / metrics.lastWeekRevenue * 100).toFixed(1)
      : "0";

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        label="Total Appointments"
        value={metrics.todayAppointments}
        change={`${metrics.noShows} no-show${metrics.noShows !== 1 ? "s" : ""}`}
        positive={metrics.noShows <= 2}
      />
      <StatCard
        label="Active Clients"
        value={metrics.activeClients}
        change="+20.1%"
        positive={true}
      />
      <StatCard
        label="Aging Claims"
        value={metrics.agingClaimsCount}
        change={formatCurrency(metrics.agingClaimsAmount)}
        positive={false}
      />
      <StatCard
        label="Weekly Revenue"
        value={Math.round(metrics.weekRevenue / 100)}
        prefix="$"
        change={`${revenueChange}%`}
        positive={Number(revenueChange) >= 0}
      />
    </div>
  );
}
