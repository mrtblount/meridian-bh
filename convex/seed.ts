import { internalMutation } from "./_generated/server";

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

const firstNames = [
  "James", "Maria", "Robert", "Linda", "Michael", "Sarah", "David", "Jennifer",
  "William", "Patricia", "Richard", "Elizabeth", "Joseph", "Barbara", "Thomas",
  "Susan", "Christopher", "Jessica", "Daniel", "Karen", "Matthew", "Nancy",
  "Anthony", "Lisa", "Mark", "Betty", "Donald", "Margaret", "Steven", "Sandra",
  "Andrew", "Ashley", "Paul", "Dorothy", "Joshua", "Kimberly", "Kenneth", "Emily",
  "Kevin", "Donna", "Brian", "Michelle", "George", "Carol", "Timothy", "Amanda",
  "Ronald", "Melissa", "Edward", "Deborah",
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
  "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen",
  "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera",
  "Campbell", "Mitchell", "Carter", "Roberts",
];

const providers = [
  "Dr. Rebecca Torres",
  "Dr. Michael Chen",
  "Dr. Angela Foster",
  "Dr. James Patterson",
];

const insuranceProviders = [
  "Blue Cross Blue Shield",
  "Aetna",
  "Cigna",
  "UnitedHealthcare",
  "Medicaid",
];

const locations = ["Main Campus", "East Clinic"];

const referralSourceData = [
  { name: "Dr. Sarah Chen", organization: "Valley Primary Care", type: "pcp" as const, phone: "(555) 234-5678", email: "schen@valleyprimary.com" },
  { name: "Dr. Robert Kim", organization: "Lakeside Family Medicine", type: "pcp" as const, phone: "(555) 345-6789", email: "rkim@lakesidefm.com" },
  { name: "Dr. Maria Gonzalez", organization: "Community Health Partners", type: "pcp" as const, phone: "(555) 456-7890", email: "mgonzalez@chp.org" },
  { name: "Dr. William Park", organization: "Riverside Medical Group", type: "pcp" as const, phone: "(555) 567-8901", email: "wpark@riversidemd.com" },
  { name: "Dr. Amanda Foster", organization: "Westside Internal Medicine", type: "pcp" as const, phone: "(555) 678-9012", email: "afoster@westsideim.com" },
  { name: "Dr. David Reyes", organization: "St. Mary's Emergency Department", type: "er" as const, phone: "(555) 789-0123", email: "dreyes@stmarys.org" },
  { name: "Dr. Jennifer Walsh", organization: "Regional Medical Center ER", type: "er" as const, phone: "(555) 890-1234", email: "jwalsh@regionaler.com" },
  { name: "Dr. Christopher Moore", organization: "Memorial Hospital Emergency", type: "er" as const, phone: "(555) 901-2345", email: "cmoore@memorialhosp.org" },
  { name: "Lisa Thompson, LCSW", organization: "County Social Services", type: "social_worker" as const, phone: "(555) 012-3456", email: "lthompson@countysocial.gov" },
  { name: "Marcus Johnson, MSW", organization: "Family Support Center", type: "social_worker" as const, phone: "(555) 123-4567", email: "mjohnson@familysupport.org" },
  { name: "Rachel Green, LCSW", organization: "United Way Partnership", type: "social_worker" as const, phone: "(555) 234-5679", email: "rgreen@unitedway.org" },
  { name: "Karen Mitchell, M.Ed", organization: "Riverside School District", type: "school_counselor" as const, phone: "(555) 345-6780", email: "kmitchell@riversideschools.edu" },
  { name: "Brian Edwards, M.S.", organization: "Westfield Academy", type: "school_counselor" as const, phone: "(555) 456-7891", email: "bedwards@westfieldacademy.edu" },
  { name: "Dr. Stephanie Barnes", organization: "Healing Horizons Therapy", type: "therapist" as const, phone: "(555) 567-8902", email: "sbarnes@healinghorizons.com" },
];

const linkedinDraftData = [
  {
    topic: "anxiety in teens",
    content: `The teen mental health crisis isn't just a headline — it's in our waiting rooms every day.\n\nAt Meridian Behavioral Health, we've seen a 40% increase in adolescent referrals over the past year. But here's what the data doesn't capture: the parents who waited months before reaching out, hoping things would get better on their own.\n\nEarly intervention matters. When a PCP notices changes in a teen's behavior — declining grades, social withdrawal, sleep disruption — that's the moment a referral can change the trajectory.\n\nWe've built our adolescent program around three principles:\n\n1️⃣ Same-week intake for teen referrals\n2️⃣ Family involvement from day one\n3️⃣ Coordination with the referring provider throughout treatment\n\nIf you're seeing teens struggling in your practice, we're here as a resource — even if it's just a consultation call.\n\n#BehavioralHealth #TeenMentalHealth #EarlyIntervention #PrimaryCare #ReferralPartner`,
    status: "approved" as const,
    generatedAt: now - 5 * DAY,
    reviewedAt: now - 4 * DAY,
  },
  {
    topic: "importance of early intervention in substance abuse",
    content: `"I didn't think it was that bad yet."\n\nWe hear this from patients and families more often than you'd expect. The truth is, substance use disorders don't wait for rock bottom — and neither should treatment.\n\nResearch consistently shows that early intervention leads to better outcomes, shorter treatment duration, and lower relapse rates. Yet the average time between first substance use and first treatment contact is still over 10 years.\n\nAs primary care providers and ER physicians, you're uniquely positioned to change this. A brief screening, a direct conversation, and a warm handoff to treatment can compress that 10-year gap into days.\n\nAt Meridian, we've streamlined our intake process specifically for early-stage referrals:\n\n→ SBIRT-aligned screening support\n→ 48-hour intake guarantee\n→ Direct communication with referring providers\n\nLet's close the gap together.\n\n#SubstanceAbuse #EarlyIntervention #BehavioralHealth #SBIRT #PrimaryCarePartnership`,
    status: "approved" as const,
    generatedAt: now - 8 * DAY,
    reviewedAt: now - 7 * DAY,
  },
  {
    topic: "building referral partnerships",
    content: `The best referral relationships aren't transactional — they're collaborative.\n\nOver the past year, we've been rethinking how Meridian partners with referring providers. Instead of the traditional "send and forget" model, we've built a feedback loop:\n\n✅ Referring providers get status updates at intake, 30 days, and discharge\n✅ We share outcome summaries (with patient consent) so you know the referral made a difference\n✅ Quarterly case conferences for complex patients\n\nThe result? Our referral partners tell us they feel more confident making behavioral health referrals because they know what happens after the handoff.\n\nIf you're a PCP, social worker, or school counselor looking for a behavioral health partner that communicates — let's connect.\n\n#ReferralNetwork #BehavioralHealth #IntegratedCare #HealthcareCollaboration #MentalHealth`,
    status: "draft" as const,
    generatedAt: now - 2 * DAY,
  },
  {
    topic: "reducing ER visits through outpatient behavioral health",
    content: `Emergency departments shouldn't be the front door to mental health care — but for too many patients, they are.\n\nHere's a stat that keeps me up at night: behavioral health-related ER visits have increased 24% nationally since 2020. Many of these visits are for conditions that could be managed in an outpatient setting with proper access and follow-up.\n\nAt Meridian, we're working to change this pattern by:\n\n🏥 Offering same-day crisis assessments\n📞 Maintaining a direct line for ER social workers\n📋 Accepting warm handoffs within 24 hours of discharge\n\nFor our ER partners — when you see a patient who needs behavioral health support but doesn't need inpatient admission, call us first. We'll get them in.\n\n#EmergencyMedicine #BehavioralHealth #MentalHealthAccess #CrisisIntervention #ReduceERVisits`,
    status: "draft" as const,
    generatedAt: now - 1 * DAY,
  },
  {
    topic: "school counselor partnership for student mental health",
    content: `School counselors are the unsung heroes of early mental health detection.\n\nEvery day, counselors see the signs: a student who stops participating, attendance that drops off, behavioral changes that teachers flag. You're often the first to notice — and the first to act.\n\nBut connecting a student to treatment shouldn't be a maze of phone calls and waitlists.\n\nAt Meridian, we've created a dedicated pathway for school referrals:\n\n📱 Direct referral line for school counselors\n📅 Priority scheduling for student referrals\n👨‍👩‍👧 Family engagement support (we help with the parent conversation)\n📊 Progress updates back to the school team (with consent)\n\nWe believe the school-to-treatment pipeline should be as smooth as the school-to-college pipeline. Let's make it happen.\n\n#SchoolCounseling #StudentMentalHealth #BehavioralHealth #YouthWellness #EducationPartnership`,
    status: "rejected" as const,
    generatedAt: now - 10 * DAY,
    reviewedAt: now - 9 * DAY,
  },
  {
    topic: "integrated care model benefits",
    content: `What if behavioral health wasn't a separate referral — but part of the same visit?\n\nThe integrated care model is gaining traction for a reason. When behavioral health professionals work alongside primary care teams, patients are 2-3x more likely to engage in treatment.\n\nAt Meridian, we're not there yet — but we're building toward it:\n\n🤝 Co-located services at two partner clinics\n💻 Shared EHR access with referring practices (coming Q2)\n📞 Same-day teleconsult for PCPs seeing behavioral health presentations\n\nThe goal isn't to replace primary care — it's to extend your reach into the behavioral health space without adding to your workload.\n\nInterested in exploring what integrated care could look like with your practice? Let's talk.\n\n#IntegratedCare #BehavioralHealth #PrimaryCare #CollaborativeCare #HealthcareInnovation`,
    status: "rejected" as const,
    generatedAt: now - 12 * DAY,
    reviewedAt: now - 11 * DAY,
  },
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const seedAll = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existing = await ctx.db.query("clients").first();
    if (existing) {
      console.log("Database already seeded, skipping");
      return;
    }

    // 1. Seed Clients (50)
    const clientIds = [];
    for (let i = 0; i < 50; i++) {
      const status = i < 40 ? "active" : i < 45 ? "inactive" : "discharged";
      const payerType = Math.random() < 0.6 ? "insurance" : "self_pay";
      const id = await ctx.db.insert("clients", {
        name: `${firstNames[i]} ${lastNames[i]}`,
        status: status as "active" | "inactive" | "discharged",
        location: randomItem(locations),
        payerType: payerType as "insurance" | "self_pay",
        insuranceProvider:
          payerType === "insurance" ? randomItem(insuranceProviders) : undefined,
        admitDate: now - randomBetween(30, 180) * DAY,
      });
      clientIds.push(id);
    }

    // 2. Seed Appointments (200) - last 14 days
    for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
      const date = now - dayOffset * DAY;
      const isWeekend = new Date(date).getDay() === 0 || new Date(date).getDay() === 6;
      const appointmentsPerDay = isWeekend ? 2 : randomBetween(10, 14);

      for (let j = 0; j < appointmentsPerDay; j++) {
        const hour = 8 + Math.floor(j * (8 / appointmentsPerDay));
        const appointmentTime =
          new Date(date).setHours(hour, randomBetween(0, 59), 0, 0);

        let status: "scheduled" | "completed" | "no_show" | "cancelled";
        if (dayOffset === 0) {
          status = "scheduled";
        } else {
          const rand = Math.random();
          if (rand < 0.7) status = "completed";
          else if (rand < 0.85) status = "no_show";
          else if (rand < 0.95) status = "cancelled";
          else status = "scheduled";
        }

        await ctx.db.insert("appointments", {
          clientId: randomItem(clientIds),
          date: appointmentTime,
          status,
          location: randomItem(locations),
          provider: randomItem(providers),
        });
      }
    }

    // 3. Seed Revenue (150 entries) - last 28 days
    // Target: this week ~$45,000, last week ~$42,000
    for (let dayOffset = 0; dayOffset < 28; dayOffset++) {
      const date = now - dayOffset * DAY;
      const isWeekend = new Date(date).getDay() === 0 || new Date(date).getDay() === 6;
      const entriesPerDay = isWeekend ? 2 : randomBetween(5, 8);

      for (let j = 0; j < entriesPerDay; j++) {
        const typeRand = Math.random();
        let type: "insurance_payment" | "self_pay" | "copay";
        let amount: number;

        if (typeRand < 0.5) {
          type = "insurance_payment";
          amount = randomBetween(10000, 25000); // $100-$250
        } else if (typeRand < 0.8) {
          type = "self_pay";
          amount = randomBetween(15000, 30000); // $150-$300
        } else {
          type = "copay";
          amount = randomBetween(2000, 5000); // $20-$50
        }

        await ctx.db.insert("revenue", {
          date,
          amount,
          type,
          clientId: randomItem(clientIds),
        });
      }
    }

    // 4. Seed Insurance Claims (35)
    for (let i = 0; i < 35; i++) {
      const client = clientIds[i % clientIds.length];
      const daysBack = randomBetween(5, 60);
      const dateSubmitted = now - daysBack * DAY;

      let status: "submitted" | "pending" | "paid" | "denied";
      let datePaid: number | undefined;

      if (i < 8) {
        // Aging past 30 days
        status = Math.random() < 0.5 ? "submitted" : "pending";
      } else if (i < 25) {
        status = "paid";
        datePaid = dateSubmitted + randomBetween(10, 25) * DAY;
      } else if (i < 30) {
        status = "pending";
      } else {
        status = "denied";
      }

      await ctx.db.insert("insuranceClaims", {
        clientId: client,
        insuranceProvider: randomItem(insuranceProviders),
        amount: randomBetween(10000, 30000), // $100-$300
        dateSubmitted,
        datePaid,
        status,
      });
    }

    // 5. Seed Referral Sources (14)
    const sourceIds = [];
    for (const source of referralSourceData) {
      const id = await ctx.db.insert("referralSources", {
        ...source,
        lastReferralDate: undefined,
      });
      sourceIds.push(id);
    }

    // 6. Seed Referrals (45) with status history
    const statuses = ["received", "contacted", "scheduled", "admitted", "lost"] as const;
    const statusDistribution = [
      ...Array(8).fill("received"),
      ...Array(10).fill("contacted"),
      ...Array(12).fill("scheduled"),
      ...Array(10).fill("admitted"),
      ...Array(5).fill("lost"),
    ];

    for (let i = 0; i < 45; i++) {
      const sourceIndex = i % sourceIds.length;
      const sourceId = sourceIds[sourceIndex];
      const currentStatus = statusDistribution[i] as typeof statuses[number];
      const daysBack = randomBetween(3, 90);
      const dateReceived = now - daysBack * DAY;

      // Make some referrals stale (no status change in 10+ days)
      const isStale = i < 6 && currentStatus !== "admitted" && currentStatus !== "lost";

      const lostReason =
        currentStatus === "lost"
          ? randomItem(["no_show", "insurance_issue", "went_elsewhere", "other"] as const)
          : undefined;

      const referralId = await ctx.db.insert("referrals", {
        sourceId,
        patientName: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
        dateReceived,
        currentStatus,
        lostReason,
        notes: undefined,
      });

      // Create status history
      const statusIndex = statuses.indexOf(currentStatus);
      let historyTime = dateReceived;

      for (let s = 0; s <= statusIndex; s++) {
        if (s === statusIndex && isStale) {
          historyTime = now - randomBetween(10, 20) * DAY;
        } else if (s > 0) {
          historyTime += randomBetween(1, 5) * DAY;
        }

        await ctx.db.insert("referralStatusHistory", {
          referralId,
          status: statuses[s],
          changedAt: historyTime,
        });
      }

      // Update source's lastReferralDate
      if (currentStatus === "admitted" || Math.random() < 0.7) {
        const source = await ctx.db.get(sourceId);
        if (source) {
          const existingDate = source.lastReferralDate ?? 0;
          if (dateReceived > existingDate) {
            await ctx.db.patch(sourceId, { lastReferralDate: dateReceived });
          }
        }
      }
    }

    // Make 3 sources cold (no referrals in 60+ days)
    for (let i = 11; i <= 13; i++) {
      await ctx.db.patch(sourceIds[i], {
        lastReferralDate: now - randomBetween(65, 90) * DAY,
      });
    }

    // 7. Seed LinkedIn Drafts (6)
    for (const draft of linkedinDraftData) {
      await ctx.db.insert("linkedinDrafts", draft);
    }

    // 8. Seed Briefings (5)
    const briefingContents = [
      `## Morning Briefing — ${new Date(now - 1 * DAY).toLocaleDateString()}\n\n### Overview\nGood morning. Meridian Behavioral Health is operating at strong capacity with 40 active clients across both locations.\n\n### Revenue\nThis week's revenue is trending at $44,850 — up 6.8% from last week's $42,000. Self-pay collections are particularly strong.\n\n### Clinical Operations\nYesterday saw 3 no-shows across both locations (15% rate). Dr. Torres had 2 no-shows — worth checking if those clients need outreach.\n\n### Billing Alerts\n⚠️ 8 insurance claims are aging past 30 days, totaling $12,400. Aetna has 3 of these — consider a batch follow-up.\n\n### Action Items\n1. Follow up on yesterday's 3 no-shows\n2. Batch Aetna claims inquiry\n3. East Clinic is running at 90% capacity — consider opening Thursday PM slots`,
      `## Morning Briefing — ${new Date(now - 2 * DAY).toLocaleDateString()}\n\n### Overview\nSolid day ahead. 12 appointments scheduled across both locations.\n\n### Revenue\nWeek-to-date revenue: $38,200. On track to match or exceed last week.\n\n### Clinical Operations\n2 no-shows yesterday. Both were first-time no-shows — standard outreach protocol.\n\n### Billing Alerts\n7 aging claims, down from 9 last week. Two Cigna claims resolved.\n\n### Action Items\n1. Outreach to yesterday's no-shows\n2. Confirm Thursday schedule — 3 new intakes pending`,
      `## Morning Briefing — ${new Date(now - 3 * DAY).toLocaleDateString()}\n\n### Overview\nMonday start. 14 appointments on the books.\n\n### Revenue\nLast week closed at $42,000 — consistent with projections.\n\n### Clinical Operations\nWeekend crisis line had 1 call — handled by on-call. No follow-up needed.\n\n### Billing Alerts\n9 claims aging. UnitedHealthcare batch needs attention.\n\n### Action Items\n1. Monday team huddle at 8:30 AM\n2. UnitedHealthcare claims follow-up\n3. New referral from St. Mary's ER — intake today`,
      `## Morning Briefing — ${new Date(now - 4 * DAY).toLocaleDateString()}\n\n### Overview\nFriday. 10 appointments, lighter than usual.\n\n### Revenue\nWeek revenue at $35,600 with one day remaining. Should close around $42K.\n\n### Clinical Operations\nZero no-shows yesterday — excellent day. All 4 providers had full schedules.\n\n### Billing Alerts\n8 aging claims. No change from yesterday.\n\n### Action Items\n1. Confirm Monday new intakes are prepped\n2. Review next week's schedule capacity`,
      `## Morning Briefing — ${new Date(now - 5 * DAY).toLocaleDateString()}\n\n### Overview\n11 appointments today. 2 new intakes.\n\n### Revenue\nMid-week check: $28,400 so far. Tracking to target.\n\n### Clinical Operations\n1 no-show yesterday (Dr. Chen's 3 PM). Client rescheduled for next week.\n\n### Billing Alerts\n⚠️ 9 aging claims totaling $13,200. Medicaid has 4 — longest at 45 days.\n\n### Action Items\n1. Medicaid claims need phone follow-up\n2. 2 new intakes today — ensure paperwork is ready\n3. Referral from Valley Primary Care — schedule this week`,
    ];

    for (let i = 0; i < 5; i++) {
      await ctx.db.insert("briefings", {
        date: now - (i + 1) * DAY,
        content: briefingContents[i],
        metrics: {
          activeClients: 40 - i,
          noShows: randomBetween(1, 4),
          weekRevenue: 4500000 - i * 200000,
          lastWeekRevenue: 4200000,
          agingClaimsCount: 8 + i,
          agingClaimsAmount: 1240000 + i * 100000,
        },
        emailSent: true,
        emailId: `msg_fake_${i}`,
      });
    }

    console.log("Seed complete!");
  },
});
