"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function StaleAlerts() {
  const staleReferrals = useQuery(api.queries.referrals.getStale);
  const coldSources = useQuery(api.queries.referrals.getColdSources);

  if (!staleReferrals || !coldSources) return null;

  if (staleReferrals.length === 0 && coldSources.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
        <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-emerald-700">
          All referrals active, all sources engaged.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {staleReferrals.length > 0 && (
        <div className="bg-white rounded-xl border border-zinc-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-zinc-900">
                {staleReferrals.length} Need Follow-Up
              </span>
              <p className="text-xs text-zinc-400">7+ days without status change</p>
            </div>
          </div>
          <div className="space-y-2">
            {staleReferrals.slice(0, 4).map((r) => (
              <div key={r._id} className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-zinc-700">{r.patientName}</span>
                  <span className="text-zinc-400 text-xs ml-1">via {r.sourceName}</span>
                </div>
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  {r.daysStale}d
                </span>
              </div>
            ))}
            {staleReferrals.length > 4 && (
              <p className="text-xs text-zinc-400">+{staleReferrals.length - 4} more</p>
            )}
          </div>
        </div>
      )}

      {coldSources.length > 0 && (
        <div className="bg-white rounded-xl border border-zinc-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-zinc-900">
                {coldSources.length} Sources Gone Cold
              </span>
              <p className="text-xs text-zinc-400">60+ days since last referral</p>
            </div>
          </div>
          <div className="space-y-2">
            {coldSources.map((s) => {
              const daysSince = s.lastReferralDate
                ? Math.floor((Date.now() - s.lastReferralDate) / (24 * 60 * 60 * 1000))
                : null;
              return (
                <div key={s._id} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-zinc-700">{s.name}</span>
                    <span className="text-zinc-400 text-xs block">{s.organization}</span>
                  </div>
                  <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded">
                    {daysSince ? `${daysSince}d` : "Never"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
