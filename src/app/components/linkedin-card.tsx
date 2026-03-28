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

const statusColors = {
  draft: "bg-blue-50 text-blue-700 border-blue-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

export default function LinkedinCard({
  draft,
}: {
  draft: Doc<"linkedinDrafts">;
}) {
  const updateStatus = useMutation(api.mutations.linkedin.updateDraftStatus);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColors[draft.status]}`}
          >
            {draft.status.charAt(0).toUpperCase() + draft.status.slice(1)}
          </span>
          <span className="text-sm text-slate-500">
            Topic: <span className="font-medium text-slate-700">{draft.topic}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            Generated {formatDate(draft.generatedAt)}
          </span>
          {draft.reviewedAt && (
            <span className="text-xs text-slate-400">
              Reviewed {formatDate(draft.reviewedAt)}
            </span>
          )}
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
          {draft.content}
        </div>
      </div>
      {draft.status === "draft" && (
        <div className="flex gap-2 px-5 py-3 bg-slate-50 border-t border-slate-200">
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
            className="px-4 py-1.5 bg-white text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
