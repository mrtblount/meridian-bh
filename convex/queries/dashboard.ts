import { query } from "../_generated/server";

const DAY = 24 * 60 * 60 * 1000;

export const getMetrics = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Active clients
    const allClients = await ctx.db.query("clients").collect();
    const activeClients = allClients.filter((c) => c.status === "active").length;

    // Today's appointments
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const allAppointments = await ctx.db
      .query("appointments")
      .withIndex("by_date")
      .collect();

    const todayAppointments = allAppointments.filter(
      (a) => a.date >= todayStart.getTime() && a.date <= todayEnd.getTime()
    ).length;

    // This week's revenue (Monday-Sunday)
    const dayOfWeek = new Date(now).getDay();
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekStart = new Date(now);
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(weekStart.getDate() - mondayOffset);

    const lastWeekStart = new Date(weekStart.getTime() - 7 * DAY);

    const allRevenue = await ctx.db
      .query("revenue")
      .withIndex("by_date")
      .collect();

    const weekRevenue = allRevenue
      .filter((r) => r.date >= weekStart.getTime())
      .reduce((sum, r) => sum + r.amount, 0);

    const lastWeekRevenue = allRevenue
      .filter(
        (r) =>
          r.date >= lastWeekStart.getTime() && r.date < weekStart.getTime()
      )
      .reduce((sum, r) => sum + r.amount, 0);

    // Aging claims (submitted/pending older than 30 days)
    const thirtyDaysAgo = now - 30 * DAY;
    const allClaims = await ctx.db
      .query("insuranceClaims")
      .collect();

    const agingClaims = allClaims.filter(
      (c) =>
        (c.status === "submitted" || c.status === "pending") &&
        c.dateSubmitted < thirtyDaysAgo
    );

    const agingClaimsCount = agingClaims.length;
    const agingClaimsAmount = agingClaims.reduce(
      (sum, c) => sum + c.amount,
      0
    );

    // Yesterday's no-shows
    const yesterdayStart = new Date(now - DAY);
    yesterdayStart.setHours(0, 0, 0, 0);
    const yesterdayEnd = new Date(now - DAY);
    yesterdayEnd.setHours(23, 59, 59, 999);

    const noShows = allAppointments.filter(
      (a) =>
        a.status === "no_show" &&
        a.date >= yesterdayStart.getTime() &&
        a.date <= yesterdayEnd.getTime()
    ).length;

    return {
      activeClients,
      todayAppointments,
      weekRevenue,
      lastWeekRevenue,
      agingClaimsCount,
      agingClaimsAmount,
      noShows,
    };
  },
});
