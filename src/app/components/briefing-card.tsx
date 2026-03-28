"use client";

import { Doc } from "../../../convex/_generated/dataModel";
import { Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

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
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
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
        <div className={`px-5 py-5 ${featured ? "" : "max-h-32 overflow-hidden relative"}`}>
          <div className="prose-dark text-[15px] leading-relaxed">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-lg font-display font-semibold text-foreground mt-0 mb-3">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-display font-semibold text-foreground mt-5 mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-display font-medium text-foreground/80 mt-4 mb-1.5">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-[15px] text-foreground/70 mb-3 leading-relaxed">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="text-foreground font-semibold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="text-foreground/60 italic">{children}</em>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 mb-3 text-foreground/70">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1 mb-3 text-foreground/70">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-[15px] leading-relaxed">{children}</li>
                ),
                hr: () => <hr className="border-border my-4" />,
              }}
            >
              {briefing.content}
            </ReactMarkdown>
          </div>
          {!featured && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
          )}
        </div>
      </div>
    </div>
  );
}
