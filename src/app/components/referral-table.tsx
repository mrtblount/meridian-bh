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

const statusColors: Record<string, string> = {
  received: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-purple-100 text-purple-800",
  admitted: "bg-emerald-100 text-emerald-800",
  lost: "bg-red-100 text-red-800",
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
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-slate-100 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (referrals.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
        <p className="text-slate-500">
          No referrals yet. Your pipeline will populate once connected to your
          intake system.
        </p>
      </div>
    );
  }

  async function handleStatusChange(
    referralId: Id<"referrals">,
    newStatus: string
  ) {
    if (newStatus === "lost") {
      setShowLostReason(referralId);
      return;
    }
    await updateStatus({
      referralId,
      status: newStatus as "received" | "contacted" | "scheduled" | "admitted" | "lost",
    });
  }

  async function handleLostReason(
    referralId: Id<"referrals">,
    reason: string
  ) {
    await updateStatus({
      referralId,
      status: "lost",
      lostReason: reason as "no_show" | "insurance_issue" | "went_elsewhere" | "other",
    });
    setShowLostReason(null);
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700">
          All Referrals ({referrals.length})
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 uppercase">
                Patient
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 uppercase">
                Source
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 uppercase">
                Received
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 uppercase">
                Days
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((r) => {
              const daysInPipeline = Math.floor(
                (Date.now() - r.dateReceived) / DAY
              );
              const daysSinceChange = Math.floor(
                (Date.now() - r.lastStatusChange) / DAY
              );
              const isStale =
                daysSinceChange >= 7 &&
                r.currentStatus !== "admitted" &&
                r.currentStatus !== "lost";

              return (
                <tr
                  key={r._id}
                  className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                    isStale ? "bg-amber-50/50" : ""
                  }`}
                >
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      {isStale && (
                        <span className="w-2 h-2 bg-amber-500 rounded-full shrink-0" />
                      )}
                      <span className="font-medium text-slate-900">
                        {r.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div>
                      <span className="text-slate-700">{r.sourceName}</span>
                      <span className="block text-xs text-slate-400">
                        {r.sourceOrg}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">
                    {formatDate(r.dateReceived)}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`text-xs font-medium ${
                        daysInPipeline > 14 ? "text-amber-600" : "text-slate-500"
                      }`}
                    >
                      {daysInPipeline}d
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    {showLostReason === r._id ? (
                      <select
                        onChange={(e) =>
                          handleLostReason(r._id, e.target.value)
                        }
                        className="text-xs border border-red-200 rounded px-2 py-1 bg-red-50 text-red-700 focus:outline-none"
                        autoFocus
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select reason...
                        </option>
                        <option value="no_show">No-show</option>
                        <option value="insurance_issue">Insurance issue</option>
                        <option value="went_elsewhere">Went elsewhere</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <select
                        value={r.currentStatus}
                        onChange={(e) =>
                          handleStatusChange(r._id, e.target.value)
                        }
                        className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 ${statusColors[r.currentStatus]}`}
                      >
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
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
  );
}
