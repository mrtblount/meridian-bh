import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const updateStatus = mutation({
  args: {
    referralId: v.id("referrals"),
    status: v.union(
      v.literal("received"),
      v.literal("contacted"),
      v.literal("scheduled"),
      v.literal("admitted"),
      v.literal("lost")
    ),
    lostReason: v.optional(
      v.union(
        v.literal("no_show"),
        v.literal("insurance_issue"),
        v.literal("went_elsewhere"),
        v.literal("other")
      )
    ),
  },
  handler: async (ctx, args) => {
    const referral = await ctx.db.get(args.referralId);
    if (!referral) throw new Error("Referral not found");

    // Update referral status
    await ctx.db.patch(args.referralId, {
      currentStatus: args.status,
      lostReason: args.status === "lost" ? args.lostReason : undefined,
    });

    // Append to status history
    await ctx.db.insert("referralStatusHistory", {
      referralId: args.referralId,
      status: args.status,
      changedAt: Date.now(),
    });

    // If admitted, update source's lastReferralDate
    if (args.status === "admitted") {
      const source = await ctx.db.get(referral.sourceId);
      if (source) {
        await ctx.db.patch(referral.sourceId, {
          lastReferralDate: Date.now(),
        });
      }
    }
  },
});
