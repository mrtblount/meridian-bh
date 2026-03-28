"use client";

import { useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import BriefingCard from "./briefing-card";

export default function BriefingSection() {
  const briefings = useQuery(api.queries.briefings.list);
  const generateBriefing = useAction(api.actions.generateBriefing.generateBriefing);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Auto-expand the most recent briefing
  useEffect(() => {
    if (briefings && briefings.length > 0 && expandedId === null) {
      setExpandedId(briefings[0]._id);
    }
  }, [briefings, expandedId]);

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      await generateBriefing();
      setExpandedId(null); // Reset so useEffect picks up the new one
    } catch (err) {
      console.error("Failed to generate briefing:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleToggle(id: string) {
    setExpandedId(id);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-base font-medium text-foreground">
            Daily Intelligence Briefing
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            AI-generated business insights delivered every morning
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {isGenerating ? "Generating..." : "Generate Now"}
        </button>
      </div>

      {!briefings || briefings.length === 0 ? (
        <div className="bg-pop rounded-lg p-1.5">
          <div className="bg-card rounded p-12 text-center">
            <p className="text-sm text-muted-foreground">
              No briefings yet. Click &quot;Generate Now&quot; to create your first briefing.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {briefings.map((briefing) => (
            <BriefingCard
              key={briefing._id}
              briefing={briefing}
              expanded={expandedId === briefing._id}
              onSelect={() => handleToggle(briefing._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
