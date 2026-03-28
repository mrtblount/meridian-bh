"use client";

import { Doc } from "../../../convex/_generated/dataModel";
import { Check } from "lucide-react";

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
    <div className="bg-pop rounded-lg p-1.5">
      <div className="bg-card rounded overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">
              {formatDate(briefing.date)}
            </span>
            {briefing.emailSent && (
              <span className="inline-flex items-center gap-1 text-xs bg-success/10 border border-success text-success px-2 py-0.5 rounded font-medium">
                <Check className="w-3 h-3" />
                Delivered
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <span>{briefing.metrics.activeClients} clients</span>
            <span>{formatCurrency(briefing.metrics.weekRevenue)}</span>
            <span>{briefing.metrics.agingClaimsCount} aging</span>
          </div>
        </div>
        <div className={`px-4 py-4 ${featured ? "" : "max-h-28 overflow-hidden relative"}`}>
          <div className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed font-mono">
            {briefing.content}
          </div>
          {!featured && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
          )}
        </div>
      </div>
    </div>
  );
}
