# Meridian BH — Design System Port Tasks

## Summary
- **Total Tasks**: 8
- **Complexity**: 1 LOW, 5 MEDIUM, 2 HIGH
- **All tasks are UI-only — zero backend changes**

## Tasks

### T-D01: Install dependencies and configure fonts
- **Files**: `package.json`, `src/app/layout.tsx`
- **Complexity**: LOW
- Install: `@number-flow/react`, `framer-motion`, `tw-animate-css`
- Rewrite layout.tsx: Import Space Grotesk + Roboto Mono via next/font/google
- Set CSS variables `--font-roboto-mono` and `--font-rebels` (Space Grotesk)
- Hardcode `className="dark"` on html element
- Update metadata title to "Meridian BH"
- **Validation**: `npm run build` succeeds, fonts load in browser

### T-D02: Rewrite globals.css with full OKLCH dark theme
- **Files**: `src/app/globals.css`
- **Complexity**: HIGH
- Port ALL CSS variables from behavioral-health design system (both :root and .dark)
- Include @theme inline block with font-display, font-mono, custom spacing
- Include responsive font-size media queries
- Include radius system variables
- Base layer: `* { border-border outline-ring/50 }`, `body { bg-muted text-foreground font-mono }`
- Include marquee animations (marquee-up, marquee-down, marquee-pulse)
- **Validation**: Page renders with dark background, correct fonts, no CSS errors
- **Invariants**: INV-D01, INV-D03, INV-D08

### T-D03: Rewrite sidebar component
- **Files**: `src/app/components/sidebar.tsx`
- **Complexity**: MEDIUM
- Brand section: "Meridian BH" in font-display text-2xl, tagline uppercase text-xs
- Navigation: 3 items (Business Intelligence, Content Studio, Referral Pipeline)
- Active state: bg-sidebar-accent, text-sidebar-accent-foreground
- All nav labels: uppercase font-bold
- Footer: User avatar with name/email, uses sidebar-* color tokens
- Use lucide-react icons throughout
- **Validation**: Sidebar renders with correct dark styling, nav items clickable
- **Invariants**: INV-D01, INV-D04

### T-D04: Rewrite page layout and dashboard header with animated stats
- **Files**: `src/app/page.tsx`, `src/app/components/dashboard-header.tsx`
- **Complexity**: HIGH
- page.tsx: Implement layout with sidebar offset + main content area
- Top bar: Page title in font-display, tab triggers using design system tab pattern
- dashboard-header.tsx: 4 stat cards using double-layer card pattern
- Stat values: Use NumberFlow from @number-flow/react for animated transitions
- Stat labels: text-xs uppercase text-muted-foreground
- Trend indicators: Colored text (success/destructive) with direction markers
- **Validation**: Stats render with animation, tabs switch, layout correct
- **Invariants**: INV-D01, INV-D04, INV-D05

### T-D05: Rewrite briefing section and cards
- **Files**: `src/app/components/briefing-section.tsx`, `src/app/components/briefing-card.tsx`
- **Complexity**: MEDIUM
- briefing-section: Dark theme, uppercase section headers, primary-colored Generate button
- briefing-card: Double-layer card pattern (bg-pop outer, bg-card inner)
- Status badges: Use outline pattern (bg-success/10 border-success text-success)
- Text: text-foreground on dark bg-card
- **Validation**: Briefing section renders in dark theme, Generate Now works
- **Invariants**: INV-D05, INV-D07

### T-D06: Rewrite LinkedIn section, form, and cards
- **Files**: `src/app/components/linkedin-section.tsx`, `src/app/components/linkedin-form.tsx`, `src/app/components/linkedin-card.tsx`
- **Complexity**: MEDIUM
- Filter tabs: bg-foreground/5 list, bg-primary active trigger, uppercase
- Form input: bg-transparent border-input, dark placeholder text
- Draft cards: Double-layer pattern, status badges using outline pattern
- Approve button: bg-success, Reject: ghost style
- **Validation**: Can generate draft, approve/reject works, dark styling correct
- **Invariants**: INV-D04, INV-D05, INV-D07

### T-D07: Rewrite pipeline section (table, leaderboard, alerts)
- **Files**: `src/app/components/pipeline-section.tsx`, `src/app/components/referral-table.tsx`, `src/app/components/source-leaderboard.tsx`, `src/app/components/stale-alerts.tsx`
- **Complexity**: MEDIUM (4 files but straightforward pattern application)
- Alert cards: Use status card pattern (bg-warning/5 border-warning, bg-destructive/5 border-destructive)
- Referral table: Dark table with border-border, hover bg-accent
- Status dropdowns: Dark select styling
- Leaderboard: Bullet indicators (rounded-[1.5px] squares), progress bar with chart colors
- Stale referrals highlighted with warning/5 background
- **Validation**: Pipeline renders, status changes work, all alerts display correctly
- **Invariants**: INV-D01, INV-D05, INV-D07

### T-D08: Final build verification and visual QA
- **Files**: None (verification only)
- **Complexity**: LOW
- `npm run build` — must pass with zero errors
- Open localhost:3000 in browser
- Verify all 3 tabs render correctly in dark theme
- Test Generate Now (briefing), Generate Draft (LinkedIn), status change (pipeline)
- Verify fonts: Roboto Mono for body, Space Grotesk for display numbers
- Verify OKLCH colors render correctly
- Verify double-layer cards, uppercase buttons, bullet indicators
- **Invariants**: ALL (INV-D01 through INV-D08)

## Execution Order
T-D01 → T-D02 → T-D03 + T-D04 (parallel) → T-D05 + T-D06 + T-D07 (parallel) → T-D08
