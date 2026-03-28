"use client";

import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LinkedinForm() {
  const generateDraft = useAction(
    api.actions.generateLinkedinDraft.generateLinkedinDraft
  );
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setError(null);
    try {
      await generateDraft({ topic: topic.trim() });
      setTopic("");
    } catch (err) {
      setError("Failed to generate draft. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-pop rounded-lg p-1.5">
      <div className="bg-card rounded p-4">
        <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
          Topic
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder='e.g., "anxiety in teens", "building referral partnerships"'
            maxLength={500}
            className="flex-1 px-3 py-2.5 bg-transparent border border-input rounded-md text-sm text-foreground font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Draft"
            )}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </div>
    </form>
  );
}
