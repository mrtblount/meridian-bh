"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const DAY = 24 * 60 * 60 * 1000;

const typeLabels: Record<string, string> = {
  pcp: "PCP",
  er: "ER",
  social_worker: "Social Worker",
  school_counselor: "School",
  therapist: "Therapist",
  other: "Other",
};

const typeDotColors: Record<string, string> = {
  pcp: "bg-blue-500",
  er: "bg-red-500",
  social_worker: "bg-purple-500",
  school_counselor: "bg-amber-500",
  therapist: "bg-teal-500",
  other: "bg-zinc-400",
};

export default function SourceLeaderboard() {
  const leaderboard = useQuery(api.queries.referrals.getSourceLeaderboard, {
    days: 90,
  });
  const coldSources = useQuery(api.queries.referrals.getColdSources);

  if (!leaderboard) return null;

  const coldSourceIds = new Set(coldSources?.map((s) => s._id) ?? []);
  const totalReferrals = leaderboard.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="bg-white rounded-xl border border-zinc-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900">
          Top Sources
        </h3>
        <span className="text-xs text-zinc-400">90 days</span>
      </div>

      <div className="px-6 py-4 border-b border-zinc-100">
        <div className="text-3xl font-semibold tracking-tight text-zinc-900">
          {totalReferrals}
        </div>
        <p className="text-xs text-zinc-400 mt-0.5">total referrals</p>
        <div className="flex gap-0.5 mt-3 h-2 rounded-full overflow-hidden bg-zinc-100">
          {leaderboard.slice(0, 5).map((source) => {
            const pct = totalReferrals > 0 ? (source.count / totalReferrals) * 100 : 0;
            return (
              <div
                key={source._id}
                className={`${typeDotColors[source.type]} rounded-full`}
                style={{ width: `${pct}%` }}
              />
            );
          })}
        </div>
      </div>

      <div className="divide-y divide-zinc-50 max-h-[400px] overflow-y-auto">
        {leaderboard.map((source) => {
          const isCold = coldSourceIds.has(source._id);
          const pct = totalReferrals > 0 ? Math.round((source.count / totalReferrals) * 100) : 0;

          return (
            <div key={source._id} className="flex items-center px-6 py-3 gap-3">
              <span className={`w-2 h-2 rounded-full shrink-0 ${typeDotColors[source.type]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-zinc-800 truncate">
                    {source.name}
                  </span>
                  {isCold && (
                    <span className="text-[10px] text-red-500 font-medium">COLD</span>
                  )}
                </div>
                <span className="text-xs text-zinc-400">{typeLabels[source.type]}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-semibold text-zinc-900">{pct}%</span>
                <span className="block text-xs text-zinc-400">{source.count} referral{source.count !== 1 ? "s" : ""}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
