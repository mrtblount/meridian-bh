"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import NumberFlow from "@number-flow/react";

const DAY = 24 * 60 * 60 * 1000;

const typeLabels: Record<string, string> = {
  pcp: "PCP",
  er: "ER",
  social_worker: "SW",
  school_counselor: "SC",
  therapist: "TH",
  other: "OT",
};

const chartColors = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
];

const bulletColors = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
];

export default function SourceLeaderboard() {
  const leaderboard = useQuery(api.queries.referrals.getSourceLeaderboard, {
    days: 90,
  });
  const coldSources = useQuery(api.queries.referrals.getColdSources);

  if (!leaderboard) return null;

  const coldSourceIds = new Set(coldSources?.map((s) => s._id) ?? []);
  const totalReferrals = leaderboard.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="bg-pop rounded-lg p-1.5">
      <div className="bg-card rounded overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Top Sources
          </h3>
          <span className="text-xs text-muted-foreground font-mono">90d</span>
        </div>

        {/* Big number + progress bar */}
        <div className="px-4 py-4 border-b border-border">
          <div className="font-display text-4xl tracking-tight text-foreground">
            <NumberFlow value={totalReferrals} />
          </div>
          <p className="text-xs text-muted-foreground mt-1 uppercase">total referrals</p>
          <div className="flex gap-0.5 mt-3 h-2 rounded-sm overflow-hidden bg-muted">
            {leaderboard.slice(0, 5).map((source, i) => {
              const pct = totalReferrals > 0 ? (source.count / totalReferrals) * 100 : 0;
              return (
                <div
                  key={source._id}
                  className={`${chartColors[i % chartColors.length]} rounded-sm`}
                  style={{ width: `${pct}%` }}
                />
              );
            })}
          </div>
        </div>

        {/* Source list */}
        <div className="max-h-[400px] overflow-y-auto">
          {leaderboard.map((source, i) => {
            const isCold = coldSourceIds.has(source._id);
            const pct = totalReferrals > 0 ? Math.round((source.count / totalReferrals) * 100) : 0;

            return (
              <div
                key={source._id}
                className={`flex items-center px-4 py-2.5 gap-3 border-b border-border/50 ${
                  isCold ? "bg-destructive/5" : ""
                }`}
              >
                {/* Bullet indicator - square, not circle */}
                <span
                  className={`w-2.5 h-2.5 rounded-[1.5px] shrink-0 ${
                    bulletColors[i % bulletColors.length]
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-foreground truncate font-mono">
                      {source.name}
                    </span>
                    {isCold && (
                      <span className="text-[10px] font-bold uppercase text-destructive bg-destructive/10 border border-destructive px-1.5 py-0.5 rounded">
                        Cold
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground uppercase">
                    {typeLabels[source.type]}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-foreground font-display">{pct}%</span>
                  <span className="block text-xs text-muted-foreground font-mono">
                    {source.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
