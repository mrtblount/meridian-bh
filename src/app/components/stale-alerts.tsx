"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function StaleAlerts() {
  const staleReferrals = useQuery(api.queries.referrals.getStale);
  const coldSources = useQuery(api.queries.referrals.getColdSources);

  if (!staleReferrals || !coldSources) return null;

  if (staleReferrals.length === 0 && coldSources.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
        <svg
          className="w-5 h-5 text-emerald-600 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm text-emerald-800">
          All referrals are active and all sources are engaged. No action needed.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {staleReferrals.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg
              className="w-5 h-5 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span className="text-sm font-semibold text-amber-800">
              {staleReferrals.length} Referral{staleReferrals.length !== 1 ? "s" : ""}{" "}
              Need Follow-Up
            </span>
          </div>
          <ul className="space-y-1.5">
            {staleReferrals.slice(0, 5).map((r) => (
              <li
                key={r._id}
                className="text-xs text-amber-700 flex justify-between"
              >
                <span>
                  {r.patientName}{" "}
                  <span className="text-amber-500">from {r.sourceName}</span>
                </span>
                <span className="font-medium">{r.daysStale}d stale</span>
              </li>
            ))}
            {staleReferrals.length > 5 && (
              <li className="text-xs text-amber-500">
                +{staleReferrals.length - 5} more
              </li>
            )}
          </ul>
        </div>
      )}

      {coldSources.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <span className="text-sm font-semibold text-red-800">
              {coldSources.length} Source{coldSources.length !== 1 ? "s" : ""}{" "}
              Gone Cold
            </span>
          </div>
          <ul className="space-y-1.5">
            {coldSources.map((s) => {
              const daysSince = s.lastReferralDate
                ? Math.floor((Date.now() - s.lastReferralDate) / (24 * 60 * 60 * 1000))
                : "Never";
              return (
                <li
                  key={s._id}
                  className="text-xs text-red-700 flex justify-between"
                >
                  <span>
                    {s.name}{" "}
                    <span className="text-red-500">({s.organization})</span>
                  </span>
                  <span className="font-medium">
                    {typeof daysSince === "number" ? `${daysSince}d ago` : daysSince}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
