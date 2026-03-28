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
          <h2 className="text-base font-semibold text-zinc-900">
            Daily Intelligence Briefing
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            AI-generated business insights delivered every morning
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              Generate Now
            </>
          )}
        </button>
      </div>

      {latest ? (
        <BriefingCard briefing={latest} featured />
      ) : (
        <div className="bg-white rounded-xl border border-zinc-100 p-12 text-center">
          <p className="text-zinc-400 text-sm">
            No briefings yet. Click &quot;Generate Now&quot; to create your first briefing.
          </p>
        </div>
      )}

      {history && history.length > 1 && (
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-3">
            Previous Briefings
          </h3>
          <div className="space-y-3">
            {history.slice(1, 4).map((briefing) => (
              <BriefingCard key={briefing._id} briefing={briefing} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
