import { query } from "../_generated/server";
import { v } from "convex/values";

export const listDrafts = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("approved"),
        v.literal("rejected")
      )
    ),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("linkedinDrafts")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    return await ctx.db
      .query("linkedinDrafts")
      .order("desc")
      .collect();
  },
});
