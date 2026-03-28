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
        <h2 className="text-lg font-semibold text-slate-900">
          LinkedIn Content Drafts
        </h2>
        <p className="text-sm text-slate-500">
          AI-generated posts for your referral network audience
        </p>
      </div>

      <LinkedinForm />

      <div className="flex gap-2">
        {(["all", "draft", "approved", "rejected"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
              filter === status
                ? "bg-[#1e3a5f] text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-1.5 text-xs opacity-70">({counts[status]})</span>
          </button>
        ))}
      </div>

      {filteredDrafts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-500">
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
