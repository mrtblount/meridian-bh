import { query } from "../_generated/server";

export const getLatest = query({
  args: {},
  handler: async (ctx) => {
    const briefings = await ctx.db
      .query("briefings")
      .withIndex("by_date")
      .order("desc")
      .first();
    return briefings;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const briefings = await ctx.db
      .query("briefings")
      .withIndex("by_date")
      .order("desc")
      .take(30);
    return briefings;
  },
});
