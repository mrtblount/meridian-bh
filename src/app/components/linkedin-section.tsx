"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import LinkedinForm from "./linkedin-form";
import LinkedinCard from "./linkedin-card";

type FilterStatus = "all" | "draft" | "approved" | "rejected";

export default function LinkedinSection() {
  const drafts = useQuery(api.queries.linkedin.listDrafts, {});
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filteredDrafts =
    drafts?.filter((d) => filter === "all" || d.status === filter) ?? [];

  const counts = {
    all: drafts?.length ?? 0,
    draft: drafts?.filter((d) => d.status === "draft").length ?? 0,
    approved: drafts?.filter((d) => d.status === "approved").length ?? 0,
    rejected: drafts?.filter((d) => d.status === "rejected").length ?? 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-zinc-900">
          LinkedIn Content Drafts
        </h2>
        <p className="text-sm text-zinc-400 mt-0.5">
          AI-generated posts for your referral network audience
        </p>
      </div>

      <LinkedinForm />

      <div className="flex gap-1 border-b border-zinc-100">
        {(["all", "draft", "approved", "rejected"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-2 text-sm font-medium transition-colors relative ${
              filter === status
                ? "text-zinc-900"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-1 text-xs opacity-60">{counts[status]}</span>
            {filter === status && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {filteredDrafts.length === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-100 p-12 text-center">
          <p className="text-zinc-400 text-sm">
            {filter === "all"
              ? "No drafts yet. Generate your first LinkedIn post above."
              : `No ${filter} drafts.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDrafts.map((draft) => (
            <LinkedinCard key={draft._id} draft={draft} />
          ))}
        </div>
      )}
    </div>
  );
}
