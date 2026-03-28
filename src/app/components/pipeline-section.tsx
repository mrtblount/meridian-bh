"use client";

import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import StaleAlerts from "./stale-alerts";
import ReferralTable from "./referral-table";
import SourceLeaderboard from "./source-leaderboard";

export default function PipelineSection() {
  const generateInsights = useAction(
    api.actions.generatePipelineInsights.generatePipelineInsights
  );
  const [insights, setInsights] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerateInsights() {
    setIsGenerating(true);
    try {
      const result = await generateInsights();
      setInsights(result);
    } catch (err) {
      console.error("Failed to generate insights:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-base font-medium text-foreground">
            Referral Pipeline
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Track referrals, monitor source activity, and flag stale leads
          </p>
        </div>
        <button
          onClick={handleGenerateInsights}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {isGenerating ? "Analyzing..." : "AI Insights"}
        </button>
      </div>

      {insights && (
        <div className="bg-pop rounded-lg p-1.5 animate-fade-in">
          <div className="bg-card rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Pipeline Analysis
              </span>
              <button
                onClick={() => setInsights(null)}
                className="text-xs text-muted-foreground hover:text-foreground uppercase"
              >
                Dismiss
              </button>
            </div>
            <div className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed font-mono">
              {insights}
            </div>
          </div>
        </div>
      )}

      <StaleAlerts />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <ReferralTable />
        </div>
        <div>
          <SourceLeaderboard />
        </div>
      </div>
    </div>
  );
}
