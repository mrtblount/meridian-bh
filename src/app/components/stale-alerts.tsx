"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { AlertTriangle, Moon, CheckCircle } from "lucide-react";

export default function StaleAlerts() {
  const staleReferrals = useQuery(api.queries.referrals.getStale);
  const coldSources = useQuery(api.queries.referrals.getColdSources);

  if (!staleReferrals || !coldSources) return null;

  if (staleReferrals.length === 0 && coldSources.length === 0) {
    return (
      <div className="bg-success/5 border border-success rounded-lg p-4 flex items-center gap-3 ring-1 ring-success/10">
        <CheckCircle className="w-5 h-5 text-success shrink-0" />
        <p className="text-sm text-success font-medium">
          All referrals active, all sources engaged.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {staleReferrals.length > 0 && (
        <div className="bg-warning/5 border border-warning rounded-lg p-4 ring-1 ring-warning/10">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-sm font-bold text-warning uppercase tracking-wide">
              {staleReferrals.length} Need Follow-Up
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">7+ days without status change</p>
          <div className="space-y-2">
            {staleReferrals.slice(0, 4).map((r) => (
              <div key={r._id} className="flex justify-between items-center text-sm">
                <div className="font-mono">
                  <span className="text-foreground">{r.patientName}</span>
                  <span className="text-muted-foreground text-xs ml-1">via {r.sourceName}</span>
                </div>
                <span className="text-xs font-bold text-warning bg-warning/10 border border-warning px-2 py-0.5 rounded">
                  {r.daysStale}d
                </span>
              </div>
            ))}
            {staleReferrals.length > 4 && (
              <p className="text-xs text-muted-foreground">+{staleReferrals.length - 4} more</p>
            )}
          </div>
        </div>
      )}

      {coldSources.length > 0 && (
        <div className="bg-destructive/5 border border-destructive rounded-lg p-4 ring-1 ring-destructive/10">
          <div className="flex items-center gap-2 mb-3">
            <Moon className="w-4 h-4 text-destructive" />
            <span className="text-sm font-bold text-destructive uppercase tracking-wide">
              {coldSources.length} Sources Gone Cold
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">60+ days since last referral</p>
          <div className="space-y-2">
            {coldSources.map((s) => {
              const daysSince = s.lastReferralDate
                ? Math.floor((Date.now() - s.lastReferralDate) / (24 * 60 * 60 * 1000))
                : null;
              return (
                <div key={s._id} className="flex justify-between items-center text-sm">
                  <div className="font-mono">
                    <span className="text-foreground">{s.name}</span>
                    <span className="text-muted-foreground text-xs block">{s.organization}</span>
                  </div>
                  <span className="text-xs font-bold text-destructive bg-destructive/10 border border-destructive px-2 py-0.5 rounded">
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
