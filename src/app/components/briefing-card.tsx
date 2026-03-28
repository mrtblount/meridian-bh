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
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${
        featured ? "ring-2 ring-[#1e3a5f]/20" : ""
      }`}
    >
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">
            {formatDate(briefing.date)}
          </span>
          {briefing.emailSent && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Email sent
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>{briefing.metrics.activeClients} clients</span>
          <span>{formatCurrency(briefing.metrics.weekRevenue)} revenue</span>
          <span>{briefing.metrics.agingClaimsCount} aging claims</span>
        </div>
      </div>
      <div className={`px-5 py-4 ${featured ? "" : "max-h-32 overflow-hidden relative"}`}>
        <div className="prose prose-sm prose-slate max-w-none whitespace-pre-wrap text-sm leading-relaxed">
          {briefing.content}
        </div>
        {!featured && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
    </div>
  );
}
