import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const storeDraft = internalMutation({
  args: {
    topic: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("linkedinDrafts", {
      topic: args.topic,
      content: args.content,
      status: "draft",
      generatedAt: Date.now(),
    });
  },
});

export const updateDraftStatus = mutation({
  args: {
    draftId: v.id("linkedinDrafts"),
    status: v.union(v.literal("approved"), v.literal("rejected")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.draftId, {
      status: args.status,
      reviewedAt: Date.now(),
    });
  },
});
