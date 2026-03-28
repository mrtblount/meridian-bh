"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

const statusStyles = {
  draft: "bg-warning/10 border-warning text-warning",
  approved: "bg-success/10 border-success text-success",
  rejected: "bg-destructive/10 border-destructive text-destructive",
};

export default function LinkedinCard({
  draft,
}: {
  draft: Doc<"linkedinDrafts">;
}) {
  const updateStatus = useMutation(api.mutations.linkedin.updateDraftStatus);

  return (
    <div className="bg-pop rounded-lg p-1.5 animate-fade-in">
      <div className="bg-card rounded overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${statusStyles[draft.status]}`}
            >
              {draft.status}
            </span>
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{draft.topic}</span>
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {formatDate(draft.generatedAt)}
          </span>
        </div>
        <div className="px-4 py-4">
          <div className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed font-mono">
            {draft.content}
          </div>
        </div>
        {draft.status === "draft" && (
          <div className="flex gap-2 px-4 py-3 border-t border-border">
            <button
              onClick={() =>
                updateStatus({ draftId: draft._id, status: "approved" })
              }
              className="px-4 py-1.5 bg-success text-white rounded-md text-sm font-bold uppercase tracking-wide hover:bg-success/90 transition-colors"
            >
              Approve
            </button>
            <button
              onClick={() =>
                updateStatus({ draftId: draft._id, status: "rejected" })
              }
              className="px-4 py-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md text-sm font-bold uppercase tracking-wide transition-colors"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
