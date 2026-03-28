import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

export const store = internalMutation({
  args: {
    content: v.string(),
    metrics: v.object({
      activeClients: v.number(),
      noShows: v.number(),
      weekRevenue: v.number(),
      lastWeekRevenue: v.number(),
      agingClaimsCount: v.number(),
      agingClaimsAmount: v.number(),
    }),
    emailSent: v.boolean(),
    emailId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("briefings", {
      date: Date.now(),
      content: args.content,
      metrics: args.metrics,
      emailSent: args.emailSent,
      emailId: args.emailId,
    });
  },
});
