"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useState } from "react";

const DAY = 24 * 60 * 60 * 1000;

const statusLabels: Record<string, string> = {
  received: "Received",
  contacted: "Contacted",
  scheduled: "Scheduled",
  admitted: "Admitted",
  lost: "Lost",
};

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp));
}

export default function ReferralTable() {
  const referrals = useQuery(api.queries.referrals.list);
  const updateStatus = useMutation(api.mutations.referrals.updateStatus);
  const [showLostReason, setShowLostReason] = useState<string | null>(null);

  if (!referrals) {
    return (
      <div className="bg-pop rounded-lg p-1.5">
        <div className="bg-card rounded p-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-muted rounded mb-2" />
          ))}
        </div>
      </div>
    );
  }

  async function handleStatusChange(referralId: Id<"referrals">, newStatus: string) {
    if (newStatus === "lost") {
      setShowLostReason(referralId);
      return;
    }
    await updateStatus({
      referralId,
      status: newStatus as "received" | "contacted" | "scheduled" | "admitted" | "lost",
    });
  }

  async function handleLostReason(referralId: Id<"referrals">, reason: string) {
    await updateStatus({
      referralId,
      status: "lost",
      lostReason: reason as "no_show" | "insurance_issue" | "went_elsewhere" | "other",
    });
    setShowLostReason(null);
  }

  return (
    <div className="bg-pop rounded-lg p-1.5">
      <div className="bg-card rounded overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            All Referrals
            <span className="text-foreground ml-2">{referrals.length}</span>
          </h3>
        </div>
        <div className="overflow-y-auto max-h-[600px]">
          <table className="w-full text-sm font-mono">
            <thead className="sticky top-0 bg-card">
              <tr className="border-b border-border">
                <th className="text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Patient
                </th>
                <th className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Source
                </th>
                <th className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Date
                </th>
                <th className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => {
                const daysSinceChange = Math.floor((Date.now() - r.lastStatusChange) / DAY);
                const isStale =
                  daysSinceChange >= 7 &&
                  r.currentStatus !== "admitted" &&
                  r.currentStatus !== "lost";

                return (
                  <tr
                    key={r._id}
                    className={`border-b border-border/50 hover:bg-accent transition-colors ${
                      isStale ? "bg-warning/5" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <span className="font-medium text-foreground">{r.patientName}</span>
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">
                      {r.sourceName}
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">
                      {formatDate(r.dateReceived)}
                    </td>
                    <td className="px-3 py-2.5">
                      {showLostReason === r._id ? (
                        <select
                          onChange={(e) => handleLostReason(r._id, e.target.value)}
                          className="text-xs bg-card border border-input rounded-md px-2 py-1 text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-ring"
                          autoFocus
                          defaultValue=""
                        >
                          <option value="" disabled>Reason...</option>
                          <option value="no_show">No-show</option>
                          <option value="insurance_issue">Insurance</option>
                          <option value="went_elsewhere">Went elsewhere</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <select
                          value={r.currentStatus}
                          onChange={(e) => handleStatusChange(r._id, e.target.value)}
                          className="text-xs bg-card border border-input rounded-md px-2 py-1 text-foreground font-mono cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring"
                        >
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
