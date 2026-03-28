"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const DAY = 24 * 60 * 60 * 1000;

const typeLabels: Record<string, string> = {
  pcp: "PCP",
  er: "ER",
  social_worker: "Social Worker",
  school_counselor: "School Counselor",
  therapist: "Therapist",
  other: "Other",
};

const typeColors: Record<string, string> = {
  pcp: "bg-blue-100 text-blue-700",
  er: "bg-red-100 text-red-700",
  social_worker: "bg-purple-100 text-purple-700",
  school_counselor: "bg-amber-100 text-amber-700",
  therapist: "bg-teal-100 text-teal-700",
  other: "bg-slate-100 text-slate-700",
};

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp));
}

export default function SourceLeaderboard() {
  const leaderboard = useQuery(api.queries.referrals.getSourceLeaderboard, {
    days: 90,
  });
  const coldSources = useQuery(api.queries.referrals.getColdSources);

  if (!leaderboard) return null;

  const coldSourceIds = new Set(coldSources?.map((s) => s._id) ?? []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700">
          Referral Source Leaderboard{" "}
          <span className="text-xs font-normal text-slate-400">
            (Last 90 days)
          </span>
        </h3>
      </div>
      <div className="divide-y divide-slate-100">
        {leaderboard.map((source, index) => {
          const isCold = coldSourceIds.has(source._id);
          const daysSince = source.lastReferralDate
            ? Math.floor((Date.now() - source.lastReferralDate) / DAY)
            : null;

          return (
            <div
              key={source._id}
              className={`flex items-center px-5 py-3 ${
                isCold ? "bg-red-50/30" : ""
              }`}
            >
              <span
                className={`w-6 text-sm font-bold ${
                  index < 3 ? "text-[#1e3a5f]" : "text-slate-400"
                }`}
              >
                {index + 1}
              </span>
              <div className="flex-1 ml-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-900">
                    {source.name}
                  </span>
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${typeColors[source.type]}`}
                  >
                    {typeLabels[source.type]}
                  </span>
                  {isCold && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                      COLD
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">
                  {source.organization}
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-slate-900">
                  {source.count}
                </span>
                <span className="block text-xs text-slate-400">
                  {daysSince !== null
                    ? `Last: ${formatDate(source.lastReferralDate!)}`
                    : "No referrals"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
