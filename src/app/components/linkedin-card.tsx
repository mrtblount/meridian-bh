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
  draft: "bg-zinc-100 text-zinc-600",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-600",
};

export default function LinkedinCard({
  draft,
}: {
  draft: Doc<"linkedinDrafts">;
}) {
  const updateStatus = useMutation(api.mutations.linkedin.updateDraftStatus);

  return (
    <div className="bg-white rounded-xl border border-zinc-100 overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-md ${statusStyles[draft.status]}`}
          >
            {draft.status.charAt(0).toUpperCase() + draft.status.slice(1)}
          </span>
          <span className="text-sm text-zinc-500">
            <span className="font-medium text-zinc-700">{draft.topic}</span>
          </span>
        </div>
        <span className="text-xs text-zinc-400">
          {formatDate(draft.generatedAt)}
        </span>
      </div>
      <div className="px-6 py-5">
        <div className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed">
          {draft.content}
        </div>
      </div>
      {draft.status === "draft" && (
        <div className="flex gap-2 px-6 py-3 border-t border-zinc-100">
          <button
            onClick={() =>
              updateStatus({ draftId: draft._id, status: "approved" })
            }
            className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={() =>
              updateStatus({ draftId: draft._id, status: "rejected" })
            }
            className="px-4 py-1.5 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 rounded-lg text-sm font-medium transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
