"use client";

import { useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import BriefingCard from "./briefing-card";

export default function BriefingSection() {
  const latest = useQuery(api.queries.briefings.getLatest);
  const history = useQuery(api.queries.briefings.list);
  const generateBriefing = useAction(api.actions.generateBriefing.generateBriefing);
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      await generateBriefing();
    } catch (err) {
      console.error("Failed to generate briefing:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Daily Intelligence Briefing
          </h2>
          <p className="text-sm text-slate-500">
            AI-generated business insights delivered every morning
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg text-sm font-medium hover:bg-[#2d5a87] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
              Generating...
            </>
          ) : (
            "Generate Now"
          )}
        </button>
      </div>

      {latest ? (
        <div className="animate-fade-in">
          <h3 className="text-sm font-medium text-slate-500 mb-3">
            Latest Briefing
          </h3>
          <BriefingCard briefing={latest} featured />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-500">
            No briefings yet. Click &quot;Generate Now&quot; to create your first
            briefing.
          </p>
        </div>
      )}

      {history && history.length > 1 && (
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-3">
            Briefing History
          </h3>
          <div className="space-y-3">
            {history.slice(1).map((briefing) => (
              <BriefingCard key={briefing._id} briefing={briefing} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
