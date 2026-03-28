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

const statusDotColors: Record<string, string> = {
  received: "bg-blue-500",
  contacted: "bg-yellow-500",
  scheduled: "bg-purple-500",
  admitted: "bg-emerald-500",
  lost: "bg-red-500",
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
      <div className="bg-white rounded-xl border border-zinc-100 p-6">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-zinc-50 rounded" />
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
    <div className="bg-white rounded-xl border border-zinc-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100">
        <h3 className="text-sm font-semibold text-zinc-900">
          All Referrals
          <span className="text-zinc-400 font-normal ml-2">{referrals.length}</span>
        </h3>
      </div>
      <div className="overflow-y-auto max-h-[600px]">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-zinc-50/90 backdrop-blur-sm">
            <tr>
              <th className="text-left px-6 py-2.5 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Patient
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Source
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {referrals.map((r) => {
              const daysSinceChange = Math.floor((Date.now() - r.lastStatusChange) / DAY);
              const isStale =
                daysSinceChange >= 7 &&
                r.currentStatus !== "admitted" &&
                r.currentStatus !== "lost";

              return (
                <tr key={r._id} className={`hover:bg-zinc-50/50 transition-colors ${isStale ? "bg-amber-50/30" : ""}`}>
                  <td className="px-6 py-3">
                    <span className="font-medium text-zinc-900">{r.patientName}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-zinc-600">{r.sourceName}</span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {formatDate(r.dateReceived)}
                  </td>
                  <td className="px-4 py-3">
                    {showLostReason === r._id ? (
                      <select
                        onChange={(e) => handleLostReason(r._id, e.target.value)}
                        className="text-xs border border-zinc-200 rounded-md px-2 py-1 bg-white text-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-300"
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
                        className="text-xs font-medium rounded-md px-2 py-1 border border-zinc-200 bg-white text-zinc-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-300 appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: "right 4px center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "16px",
                          paddingRight: "24px",
                        }}
                      >
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    )}
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ml-2 ${statusDotColors[r.currentStatus]}`} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
