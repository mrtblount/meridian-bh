# Meridian BH Automation Suite

AI-powered automation demo for behavioral health practices. Three bots: daily BI briefings, LinkedIn content drafting, and referral pipeline monitoring.

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Backend**: Convex (database, real-time queries, mutations, actions, cron jobs)
- **AI**: Claude API (Sonnet) via @anthropic-ai/sdk
- **Email**: Resend
- **Language**: TypeScript

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npx convex dev` — Start Convex dev mode (watches for changes)
- `npx convex dev --once` — Push Convex functions once
- `npx convex run seed:seedAll` — Seed demo data

## Architecture
- `convex/schema.ts` — All 9 database tables
- `convex/queries/` — Read-only reactive queries
- `convex/mutations/` — Data writes (status updates, draft management)
- `convex/actions/` — Claude API + Resend calls (use `"use node"` directive)
- `convex/crons.ts` — Morning briefing schedule
- `convex/seed.ts` — Demo data generation
- `lib/claude.ts` — Claude API prompts and wrapper
- `lib/resend.ts` — Email delivery wrapper
- `src/app/components/` — All dashboard UI components

## Key Constraints
- All data is fake/demo — no real patient data
- Claude API keys are server-side only (Convex actions)
- Revenue stored in cents (integer math)
- Resend uses `onboarding@resend.dev` sender (no custom domain)

## Development Protocol
This project uses Spec-Driven Development. All new features and non-trivial
changes (3+ files, new data models, new APIs, new pages) MUST use the
/spec-driven-dev skill. Do not start implementing multi-file features without
running SDD first. Bug fixes and small changes (1-2 files) can proceed normally.

@AGENTS.md
