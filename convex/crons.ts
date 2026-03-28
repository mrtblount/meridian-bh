import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

// Daily briefing at 7:00 AM ET (12:00 UTC)
crons.daily(
  "morning-briefing",
  { hourUTC: 12, minuteUTC: 0 },
  api.actions.generateBriefing.generateBriefing
);

export default crons;
