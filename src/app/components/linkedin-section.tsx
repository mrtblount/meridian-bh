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
        <h2 className="font-display text-base font-medium text-foreground">
          LinkedIn Content Drafts
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          AI-generated posts for your referral network audience
        </p>
      </div>

      <LinkedinForm />

      {/* Filter tabs */}
      <div className="bg-foreground/5 rounded-lg p-1 flex gap-0.5 w-fit">
        {(["all", "draft", "approved", "rejected"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 text-sm rounded-md transition-all uppercase ${
              filter === status
                ? "bg-primary text-primary-foreground font-bold"
                : "text-foreground/60 font-medium hover:text-foreground/80"
            }`}
          >
            {status}
            <span className="ml-1 text-xs opacity-60">{counts[status]}</span>
          </button>
        ))}
      </div>

      {filteredDrafts.length === 0 ? (
        <div className="bg-pop rounded-lg p-1.5">
          <div className="bg-card rounded p-12 text-center">
            <p className="text-sm text-muted-foreground">
              {filter === "all"
                ? "No drafts yet. Generate your first LinkedIn post above."
                : `No ${filter} drafts.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDrafts.map((draft) => (
            <LinkedinCard key={draft._id} draft={draft} />
          ))}
        </div>
      )}
    </div>
  );
}
