import { query } from "../_generated/server";
import { v } from "convex/values";

const DAY = 24 * 60 * 60 * 1000;

export const list = query({
  args: {},
  handler: async (ctx) => {
    const referrals = await ctx.db.query("referrals").order("desc").collect();
    const enriched = await Promise.all(
      referrals.map(async (r) => {
        const source = await ctx.db.get(r.sourceId);
        // Get latest status history entry for "days since last change"
        const history = await ctx.db
          .query("referralStatusHistory")
          .filter((q) => q.eq(q.field("referralId"), r._id))
          .order("desc")
          .first();
        return {
          ...r,
          sourceName: source?.name ?? "Unknown",
          sourceOrg: source?.organization ?? "Unknown",
          lastStatusChange: history?.changedAt ?? r.dateReceived,
        };
      })
    );
    return enriched;
  },
});

export const getStale = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const sevenDaysAgo = now - 7 * DAY;

    const referrals = await ctx.db.query("referrals").collect();
    const stale = [];

    for (const r of referrals) {
      if (r.currentStatus === "admitted" || r.currentStatus === "lost") continue;

      const history = await ctx.db
        .query("referralStatusHistory")
        .filter((q) => q.eq(q.field("referralId"), r._id))
        .order("desc")
        .first();

      const lastChange = history?.changedAt ?? r.dateReceived;
      if (lastChange < sevenDaysAgo) {
        const source = await ctx.db.get(r.sourceId);
        stale.push({
          ...r,
          sourceName: source?.name ?? "Unknown",
          sourceOrg: source?.organization ?? "Unknown",
          lastStatusChange: lastChange,
          daysStale: Math.floor((now - lastChange) / DAY),
        });
      }
    }

    return stale;
  },
});

export const getSourceLeaderboard = query({
  args: { days: v.union(v.literal(30), v.literal(60), v.literal(90)) },
  handler: async (ctx, args) => {
    const now = Date.now();
    const cutoff = now - args.days * DAY;

    const sources = await ctx.db.query("referralSources").collect();
    const referrals = await ctx.db.query("referrals").collect();

    const leaderboard = sources
      .map((source) => {
        const count = referrals.filter(
          (r) => r.sourceId === source._id && r.dateReceived >= cutoff
        ).length;
        return {
          ...source,
          count,
        };
      })
      .sort((a, b) => b.count - a.count);

    return leaderboard;
  },
});

export const getColdSources = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const sixtyDaysAgo = now - 60 * DAY;

    const sources = await ctx.db.query("referralSources").collect();
    return sources.filter(
      (s) =>
        !s.lastReferralDate || s.lastReferralDate < sixtyDaysAgo
    );
  },
});
