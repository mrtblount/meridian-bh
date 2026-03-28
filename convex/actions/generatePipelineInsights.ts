"use node";

import { action } from "../_generated/server";
import { api } from "../_generated/api";
import {
  callClaude,
  PIPELINE_SYSTEM_PROMPT,
  buildPipelineUserPrompt,
} from "../../lib/claude";

export const generatePipelineInsights = action({
  args: {},
  handler: async (ctx) => {
    const referrals = await ctx.runQuery(api.queries.referrals.list);
    const staleReferrals = await ctx.runQuery(api.queries.referrals.getStale);
    const coldSources = await ctx.runQuery(api.queries.referrals.getColdSources);
    const leaderboard = await ctx.runQuery(
      api.queries.referrals.getSourceLeaderboard,
      { days: 90 }
    );

    const byStatus: Record<string, number> = {};
    for (const r of referrals) {
      byStatus[r.currentStatus] = (byStatus[r.currentStatus] || 0) + 1;
    }

    const now = Date.now();
    const DAY = 24 * 60 * 60 * 1000;

    const userPrompt = buildPipelineUserPrompt({
      totalReferrals: referrals.length,
      byStatus,
      staleCount: staleReferrals.length,
      coldSourcesCount: coldSources.length,
      topSources: leaderboard.slice(0, 5).map((s) => ({
        name: s.name,
        org: s.organization,
        count: s.count,
      })),
      coldSources: coldSources.map((s) => ({
        name: s.name,
        org: s.organization,
        daysSince: s.lastReferralDate
          ? Math.floor((now - s.lastReferralDate) / DAY)
          : 999,
      })),
      staleReferrals: staleReferrals.map((r) => ({
        patientName: r.patientName,
        sourceName: r.sourceName,
        daysStale: r.daysStale,
        status: r.currentStatus,
      })),
    });

    const insights = await callClaude(PIPELINE_SYSTEM_PROMPT, userPrompt);
    return insights;
  },
});
