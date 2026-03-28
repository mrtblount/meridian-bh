"use client";

import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
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
          <h2 className="text-base font-semibold text-zinc-900">
            Referral Pipeline
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            Track referrals, monitor source activity, and flag stale leads
          </p>
        </div>
        <button
          onClick={handleGenerateInsights}
          disabled={isGenerating}
          className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              AI Insights
            </>
          )}
        </button>
      </div>

      {insights && (
        <div className="bg-white rounded-xl border border-zinc-100 p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <span className="text-sm font-semibold text-zinc-700">
              Pipeline Analysis
            </span>
            <button
              onClick={() => setInsights(null)}
              className="ml-auto text-zinc-300 hover:text-zinc-500 text-xs"
            >
              Dismiss
            </button>
          </div>
          <div className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed">
            {insights}
          </div>
        </div>
      )}

      <StaleAlerts />

      <div className="grid grid-cols-3 gap-6">
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
