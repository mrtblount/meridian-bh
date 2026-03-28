import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  clients: defineTable({
    name: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("discharged")
    ),
    location: v.string(),
    payerType: v.union(v.literal("insurance"), v.literal("self_pay")),
    insuranceProvider: v.optional(v.string()),
    admitDate: v.number(),
  }),

  appointments: defineTable({
    clientId: v.id("clients"),
    date: v.number(),
    status: v.union(
      v.literal("scheduled"),
      v.literal("completed"),
      v.literal("no_show"),
      v.literal("cancelled")
    ),
    location: v.string(),
    provider: v.string(),
  })
    .index("by_date", ["date"])
    .index("by_client", ["clientId"]),

  revenue: defineTable({
    date: v.number(),
    amount: v.number(),
    type: v.union(
      v.literal("insurance_payment"),
      v.literal("self_pay"),
      v.literal("copay")
    ),
    clientId: v.id("clients"),
    claimId: v.optional(v.id("insuranceClaims")),
  }).index("by_date", ["date"]),

  insuranceClaims: defineTable({
    clientId: v.id("clients"),
    insuranceProvider: v.string(),
    amount: v.number(),
    dateSubmitted: v.number(),
    datePaid: v.optional(v.number()),
    status: v.union(
      v.literal("submitted"),
      v.literal("pending"),
      v.literal("paid"),
      v.literal("denied")
    ),
  }).index("by_status", ["status"]),

  referralSources: defineTable({
    name: v.string(),
    organization: v.string(),
    type: v.union(
      v.literal("pcp"),
      v.literal("er"),
      v.literal("social_worker"),
      v.literal("school_counselor"),
      v.literal("therapist"),
      v.literal("other")
    ),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    lastReferralDate: v.optional(v.number()),
  }).index("by_type", ["type"]),

  referrals: defineTable({
    sourceId: v.id("referralSources"),
    patientName: v.string(),
    dateReceived: v.number(),
    currentStatus: v.union(
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
    notes: v.optional(v.string()),
  })
    .index("by_source", ["sourceId"])
    .index("by_status", ["currentStatus"]),

  referralStatusHistory: defineTable({
    referralId: v.id("referrals"),
    status: v.string(),
    changedAt: v.number(),
  }),

  linkedinDrafts: defineTable({
    topic: v.string(),
    content: v.string(),
    status: v.union(
      v.literal("draft"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    generatedAt: v.number(),
    reviewedAt: v.optional(v.number()),
  }).index("by_status", ["status"]),

  briefings: defineTable({
    date: v.number(),
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
  }).index("by_date", ["date"]),
});
