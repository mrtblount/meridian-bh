# Meridian Behavioral Health — Automation Demo Specification

## Overview
- **Name**: Meridian BH Automation Suite
- **One-liner**: Three AI-powered bots that automate daily business intelligence, LinkedIn content drafting, and referral pipeline monitoring for behavioral health practices.
- **Problem**: Behavioral health practice owners manually pull reports from practice management systems, struggle to maintain LinkedIn visibility with referral sources, and lose referrals in chaotic intake processes (fax, phone, email, web forms). This costs them revenue and referral relationships.
- **Target User**: Owner/operator of 1-2 behavioral health companies (outpatient mental health clinics, substance abuse treatment centers, therapy practices). Revenue from insurance reimbursements, self-pay clients, and referral networks. Non-technical — wants plain English, not dashboards.
- **Success Metric**: All three bots fire in a single recorded demo under 4 minutes, demonstrating production-ready automation that only needs data source connection.
- **Demo Purpose**: Upwork proposal pitch. Mock company "Meridian Behavioral Health" with Claude-generated seed data. Ends with: "This is already built. I just need to connect it to your actual data sources."

## Core Capabilities

### C1: Daily Business Intelligence Briefing Bot
**User Story**: As a behavioral health practice owner, I want a plain-English morning briefing delivered to my email so that I know how my business is performing without logging into any system.

**Description**: Bot reads operational data from Convex (active clients, no-shows, revenue comparisons, aging insurance claims), sends it through Claude API for analysis and natural language generation, and delivers a formatted briefing via email. Runs on a cron schedule.

**Acceptance Criteria**:
- [ ] Bot queries Convex for: active client count, yesterday's no-shows, this week's revenue vs last week's revenue, insurance claims aging past 30 days
- [ ] Claude API generates a plain-English briefing summarizing the data with actionable insights
- [ ] Briefing is delivered via email (Resend) to a configured recipient
- [ ] Cron job fires automatically on schedule
- [ ] Briefing includes week-over-week revenue trend (up/down/flat with percentage)
- [ ] Briefing flags any insurance claims over 30 days with count and total dollar amount
- [ ] Briefing is readable in under 60 seconds — concise, no jargon

### C2: LinkedIn Content Drafting Bot
**User Story**: As a behavioral health practice owner, I want LinkedIn posts drafted for me based on topics relevant to my referral network so that I stay visible to PCPs, ERs, social workers, and school counselors without spending time writing.

**Description**: Bot takes a topic input (a news story, statistic, or case theme — never patient-specific), generates a LinkedIn post through Claude API in the owner's professional voice, and presents it for review before posting. Targets 3-4 posts per week.

**Acceptance Criteria**:
- [ ] User can input a topic via the dashboard (text field)
- [ ] Claude API generates a LinkedIn post (150-300 words) in a professional, approachable voice
- [ ] Post is tailored for behavioral health referral audience (PCPs, ERs, social workers, school counselors)
- [ ] Generated post includes a hook, body, and call-to-action
- [ ] User can view, edit, and approve/reject drafts from the dashboard
- [ ] Draft history is persisted — user can see all past drafts with status (draft, approved, rejected)
- [ ] No patient data or HIPAA-sensitive content is ever generated

### C3: Referral Pipeline Monitoring Bot
**User Story**: As a behavioral health practice owner, I want to see which referral sources are active, which referrals are stalling, and which sources have gone cold so that I can protect my referral relationships and stop losing patients in the intake process.

**Description**: Bot tracks referrals through their lifecycle (received → contacted → scheduled → admitted → lost), monitors referral source activity, and proactively flags stale referrals and cold sources. Functions as a lightweight CRM layer purpose-built for how behavioral health practices actually receive patients.

**Acceptance Criteria**:
- [ ] Dashboard shows all referrals with current status (received, contacted, scheduled, admitted, lost)
- [ ] Each referral record includes: referral source, patient name (demo fake data), date received, current status, days since last status change
- [ ] Bot flags stale referrals: any referral with no status change in 7+ days
- [ ] Bot flags cold referral sources: any source that hasn't sent a referral in 60+ days
- [ ] Dashboard shows referral source leaderboard: sources ranked by volume (last 30/60/90 days)
- [ ] Claude API generates a weekly referral pipeline summary with insights (which sources are hot, which are cooling, which referrals need immediate follow-up)
- [ ] Status updates can be made from the dashboard (dropdown to change referral status)

### C4: Dashboard (Unified View)
**User Story**: As a practice owner, I want one place to see my briefings, manage LinkedIn drafts, and monitor my referral pipeline.

**Description**: React/Next.js dashboard with three main sections corresponding to each bot. Clean, professional UI suitable for a demo video.

**Acceptance Criteria**:
- [ ] Dashboard has three distinct sections/tabs: Intelligence Briefing, LinkedIn Drafts, Referral Pipeline
- [ ] Intelligence Briefing section shows the most recent briefing and a history of past briefings
- [ ] LinkedIn Drafts section shows draft creation form and draft history with status
- [ ] Referral Pipeline section shows referral table, source leaderboard, and alert flags
- [ ] Dashboard displays the company name "Meridian Behavioral Health" prominently
- [ ] UI is clean, professional, and demo-video ready
- [ ] All data is real-time from Convex (reactive updates)

## User Journeys

### J1: Morning Briefing Flow
**Entry Point**: Cron trigger (automated) — owner opens email

1. Cron job fires at configured time
2. System queries Convex for current operational metrics
3. System sends metrics to Claude API with briefing prompt
4. Claude returns structured plain-English briefing
5. System sends briefing via Resend to configured email
6. Owner opens email and reads briefing in under 60 seconds
7. Owner can also view the briefing on the dashboard

**Edge Cases**:
- **No data yet (empty state)**: Briefing states "No operational data available yet. Connect your data sources to start receiving briefings."
- **Revenue is zero**: Briefing notes zero revenue without alarming language — could be a weekend or holiday
- **All claims current**: Briefing positively notes "No aging claims — billing is current"

**Error States**:
- **Claude API unavailable**: System logs error, retries once after 5 minutes. If still fails, sends a fallback email with raw metrics (no AI summary).
- **Email delivery fails**: System logs error. Briefing is still visible on dashboard.

### J2: LinkedIn Draft Creation Flow
**Entry Point**: Owner navigates to LinkedIn Drafts section on dashboard

1. Owner types a topic in the input field (e.g., "anxiety in teens")
2. Owner clicks "Generate Draft"
3. System sends topic + voice prompt to Claude API
4. Claude returns a LinkedIn post draft
5. Draft appears in the editor area
6. Owner reads, optionally edits the text
7. Owner clicks "Approve" or "Reject"
8. Draft is saved with status to Convex
9. Approved drafts appear in the "Ready to Post" list

**Edge Cases**:
- **Empty topic**: UI shows validation message "Please enter a topic"
- **Very long topic**: Truncate to 500 characters, generate normally
- **Duplicate topic**: Generate fresh content — different angle each time

**Error States**:
- **Claude API unavailable**: Show error toast "Unable to generate draft. Please try again."
- **Save fails**: Show error toast, keep draft in editor so user doesn't lose content

### J3: Referral Pipeline Monitoring Flow
**Entry Point**: Owner navigates to Referral Pipeline section on dashboard

1. Owner sees table of all active referrals sorted by most recent
2. Stale referrals (7+ days no change) are highlighted with a warning indicator
3. Owner clicks a referral to see details
4. Owner updates status via dropdown (received → contacted → scheduled → admitted/lost)
5. Status change is saved to Convex with timestamp
6. Owner scrolls to Source Leaderboard to see which sources are sending volume
7. Cold sources (60+ days no referral) are flagged with alert indicator

**Edge Cases**:
- **No referrals**: Dashboard shows "No referrals yet. Your pipeline will populate once connected to your intake system."
- **All sources active**: No cold alerts shown — positive message "All referral sources active"
- **Referral marked lost**: Prompt for optional reason (dropdown: no-show, insurance issue, went elsewhere, other)

**Error States**:
- **Status update fails**: Show error toast, revert dropdown to previous status
- **Data load fails**: Show error state with retry button

## Invariants

Rules that must ALWAYS hold. Implementation MUST enforce these. Testing MUST verify these.

- [ ] `INV-001`: No real patient data exists anywhere in the system — all data is Claude-generated seed data for demo purposes
- [ ] `INV-002`: Claude API calls never include actual PHI (Protected Health Information) — even in production design, prompts contain only aggregated metrics, never individual patient details
- [ ] `INV-003`: Every referral has exactly one status at any time from the set: {received, contacted, scheduled, admitted, lost}
- [ ] `INV-004`: Referral status transitions are append-only — status history is preserved, never overwritten
- [ ] `INV-005`: LinkedIn drafts never contain patient-identifying information — Claude prompt includes explicit instruction to avoid any patient-specific content
- [ ] `INV-006`: Revenue figures are always displayed as currency with two decimal places
- [ ] `INV-007`: Stale referral threshold is configurable but defaults to 7 days
- [ ] `INV-008`: Cold source threshold is configurable but defaults to 60 days
- [ ] `INV-009`: Briefing generation always completes — if Claude API fails, a raw-data fallback is sent
- [ ] `INV-010`: All timestamps use UTC internally, display in local timezone on frontend

## Data Model (Seed Data Requirements)

### Entities to Seed
- **Clients**: 45-60 active clients across two practice locations
- **Appointments**: 2 weeks of appointment history with ~15% no-show rate
- **Revenue**: 4 weeks of revenue data, mix of insurance and self-pay, showing slight week-over-week growth
- **Insurance Claims**: 30-40 claims, ~20% aging past 30 days
- **Referral Sources**: 12-15 sources (mix of PCPs, ERs, social workers, school counselors, therapists)
- **Referrals**: 40-50 referrals across all statuses, with realistic date distribution
- **LinkedIn Drafts**: 5-6 pre-seeded drafts in various statuses (draft, approved, rejected)
- **Briefing History**: 5 past briefings to show history

## Scope

### In Scope (v1 — Demo)
- Convex database schema for all entities
- Claude-generated seed data population script
- Daily BI briefing bot (cron + Claude API + email via Resend)
- LinkedIn content drafting bot (topic input + Claude API + draft management)
- Referral pipeline monitoring bot (status tracking + source monitoring + Claude insights)
- React/Next.js dashboard with three sections
- Real-time Convex reactivity on dashboard
- Email delivery of briefings via Resend
- Professional UI suitable for demo video recording

### Explicitly Out of Scope
- Authentication/login — demo has no auth, direct access to dashboard
- EHR integration (SimplePractice/TherapyNotes headless browser automation) — production feature, not demo
- Actual LinkedIn API posting — drafts are created but not posted
- Patient-level clinical data or HIPAA compliance infrastructure — demo uses fake business data only
- Multi-tenant support — single demo company
- Mobile-responsive design — demo is desktop-focused for video recording
- Automated scheduling of LinkedIn posts
- Notification system beyond email briefings

### Assumptions
- User has Convex account and project configured
- User has Anthropic API key for Claude
- User has Resend account and API key for email delivery
- Demo runs locally (localhost) for video recording
- Modern desktop browser (Chrome) for demo
- User will record demo video separately (not automated by this system)

## Non-Functional Requirements

### Performance
- Dashboard initial load under 2 seconds
- Claude API briefing generation under 15 seconds
- LinkedIn draft generation under 10 seconds
- Convex queries resolve in under 500ms

### Security
- API keys stored in environment variables only, never in client code
- Claude API key used server-side only (Convex HTTP actions or Node actions)
- No real patient data at any point in the system

### Visual Quality
- Dashboard must look polished enough for a client-facing demo video
- Clean typography, consistent spacing, professional color scheme
- Behavioral health appropriate branding (calming colors, professional tone)
