"use client";

import { Doc } from "../../../convex/_generated/dataModel";

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(timestamp));
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export default function BriefingCard({
  briefing,
  featured = false,
}: {
  briefing: Doc<"briefings">;
  featured?: boolean;
}) {
  return (
    <div className={`bg-white rounded-xl border border-zinc-100 overflow-hidden ${featured ? "" : ""}`}>
      <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-700">
            {formatDate(briefing.date)}
          </span>
          {briefing.emailSent && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Delivered
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <span>{briefing.metrics.activeClients} clients</span>
          <span>{formatCurrency(briefing.metrics.weekRevenue)}</span>
          <span>{briefing.metrics.agingClaimsCount} aging claims</span>
        </div>
      </div>
      <div className={`px-6 py-5 ${featured ? "" : "max-h-28 overflow-hidden relative"}`}>
        <div className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed">
          {briefing.content}
        </div>
        {!featured && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
    </div>
  );
}
