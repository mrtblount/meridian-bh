import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export const BRIEFING_SYSTEM_PROMPT = `You are a business intelligence analyst for a behavioral health practice called Meridian Behavioral Health. Generate concise, plain-English morning briefings.

Rules:
- Focus on actionable insights, not raw numbers
- Flag anything that needs immediate attention
- Keep it readable in 60 seconds
- Use a professional but warm tone
- Structure with clear sections: Overview, Revenue, Clinical Operations, Billing Alerts, Action Items
- Never include any patient-identifying information
- Compare metrics week-over-week when data is available`;

export const LINKEDIN_SYSTEM_PROMPT = `You are a LinkedIn ghostwriter for the owner of Meridian Behavioral Health, a behavioral health practice. Write posts that position the practice as a thought leader to referral sources.

Target audience: PCPs, ER physicians, social workers, school counselors, and therapists who refer patients.

Rules:
- Professional but approachable tone
- 150-300 words
- Include a compelling hook in the first line
- Include a body with value/insight
- End with a soft call-to-action (not salesy)
- Never include patient-specific or HIPAA-sensitive information
- Use line breaks for readability (LinkedIn style)
- Include 3-5 relevant hashtags at the end`;

export const PIPELINE_SYSTEM_PROMPT = `You are a referral network analyst for Meridian Behavioral Health. Analyze referral pipeline data and surface actionable insights.

Rules:
- Be direct and specific
- Identify which referral sources are most active
- Flag sources that have gone cold (no referrals in 60+ days)
- Highlight referrals that need immediate follow-up (stale 7+ days)
- Suggest specific actions for each insight
- Never include patient-identifying details beyond what's needed for pipeline tracking`;

export function buildBriefingUserPrompt(metrics: {
  activeClients: number;
  noShows: number;
  weekRevenue: number;
  lastWeekRevenue: number;
  agingClaimsCount: number;
  agingClaimsAmount: number;
  todayAppointments: number;
}): string {
  const revenueChange =
    metrics.lastWeekRevenue > 0
      ? (
          ((metrics.weekRevenue - metrics.lastWeekRevenue) /
            metrics.lastWeekRevenue) *
          100
        ).toFixed(1)
      : "N/A";

  return `Generate a morning briefing for today based on these metrics:

- Active Clients: ${metrics.activeClients}
- Today's Scheduled Appointments: ${metrics.todayAppointments}
- Yesterday's No-Shows: ${metrics.noShows}
- This Week's Revenue: $${(metrics.weekRevenue / 100).toFixed(2)}
- Last Week's Revenue: $${(metrics.lastWeekRevenue / 100).toFixed(2)}
- Week-over-Week Revenue Change: ${revenueChange}%
- Insurance Claims Aging Past 30 Days: ${metrics.agingClaimsCount} claims totaling $${(metrics.agingClaimsAmount / 100).toFixed(2)}

Please generate a concise morning briefing.`;
}

export function buildLinkedinUserPrompt(topic: string): string {
  return `Write a LinkedIn post about the following topic for a behavioral health practice owner:

Topic: ${topic}

Remember: Target audience is referral sources (PCPs, ERs, social workers, school counselors). Make it educational and position the practice as a trusted partner in the community.`;
}

export function buildPipelineUserPrompt(data: {
  totalReferrals: number;
  byStatus: Record<string, number>;
  staleCount: number;
  coldSourcesCount: number;
  topSources: Array<{ name: string; org: string; count: number }>;
  coldSources: Array<{ name: string; org: string; daysSince: number }>;
  staleReferrals: Array<{
    patientName: string;
    sourceName: string;
    daysStale: number;
    status: string;
  }>;
}): string {
  return `Analyze this referral pipeline data and provide actionable insights:

Total Active Referrals: ${data.totalReferrals}
By Status: ${JSON.stringify(data.byStatus)}

Stale Referrals (7+ days without status change): ${data.staleCount}
${data.staleReferrals.map((r) => `  - ${r.patientName} from ${r.sourceName}: ${r.status} for ${r.daysStale} days`).join("\n")}

Top Referral Sources (Last 90 Days):
${data.topSources.map((s, i) => `  ${i + 1}. ${s.name} (${s.org}): ${s.count} referrals`).join("\n")}

Cold Sources (60+ days since last referral): ${data.coldSourcesCount}
${data.coldSources.map((s) => `  - ${s.name} (${s.org}): ${s.daysSince} days since last referral`).join("\n")}

Provide a brief pipeline summary with specific action items.`;
}

export async function callClaude(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }
  return textBlock.text;
}
