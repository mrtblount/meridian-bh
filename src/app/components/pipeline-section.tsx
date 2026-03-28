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
          <h2 className="text-lg font-semibold text-slate-900">
            Referral Pipeline
          </h2>
          <p className="text-sm text-slate-500">
            Track referrals, monitor source activity, and flag stale leads
          </p>
        </div>
        <button
          onClick={handleGenerateInsights}
          disabled={isGenerating}
          className="px-4 py-2 bg-[#5b8a72] text-white rounded-lg text-sm font-medium hover:bg-[#4a7360] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Analyzing...
            </>
          ) : (
            "Generate Pipeline Insights"
          )}
        </button>
      </div>

      {insights && (
        <div className="bg-white rounded-xl border border-[#5b8a72]/30 shadow-sm p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-[#5b8a72]">
              AI Pipeline Analysis
            </span>
            <button
              onClick={() => setInsights(null)}
              className="ml-auto text-slate-400 hover:text-slate-600 text-xs"
            >
              Dismiss
            </button>
          </div>
          <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
            {insights}
          </div>
        </div>
      )}

      <StaleAlerts />

      <ReferralTable />

      <SourceLeaderboard />
    </div>
  );
}
