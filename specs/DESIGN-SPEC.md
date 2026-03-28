# Meridian BH — Design System Port Specification

## Overview
- **Name**: Meridian BH Design System Port
- **One-liner**: Replace the current light-theme UI with the behavioral-health repo's dark, OKLCH-based shadcn/ui design system while preserving all bot functionality.
- **Problem**: Current UI is a basic light-theme with custom Tailwind — doesn't match the polished design system the user has established.
- **Target User**: Same — behavioral health practice owner viewing a demo.
- **Success Metric**: Dashboard renders with the exact design language from the behavioral-health repo — dark theme, OKLCH colors, Space Grotesk + Roboto Mono fonts, double-layer cards, uppercase UI patterns, animated stats.

## Design System Tokens (Source of Truth)

### Color System (OKLCH — Dark Mode)
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `oklch(0.2029 0.0037 345.62)` | Page background (warm dark) |
| `--foreground` | `oklch(0.9851 0 0)` | Primary text |
| `--card` | `oklch(0.2029 0.0037 345.62)` | Card inner background |
| `--pop` | `oklch(0.9851 0 0 / 2.5%)` | Card outer wrapper |
| `--primary` | `oklch(0.4703 0.2364 263.19)` | Vibrant blue/indigo accent |
| `--primary-foreground` | `oklch(0.9851 0 0)` | Text on primary |
| `--secondary` | `oklch(0.269 0 0)` | Secondary surfaces |
| `--muted` | `oklch(0.2393 0 0)` | Muted backgrounds |
| `--muted-foreground` | `oklch(0.708 0 0)` | Muted text |
| `--accent` | `oklch(0.9851 0 0 / 5%)` | Hover/active states |
| `--border` | `oklch(1 0 0 / 10%)` | Borders (10% white) |
| `--input` | `oklch(1 0 0 / 15%)` | Input borders |
| `--ring` | `oklch(0.556 0 0)` | Focus rings |
| `--success` | `oklch(0.7775 0.2447 144.9)` | Green status |
| `--warning` | `oklch(0.769 0.188 70.08)` | Amber status |
| `--destructive` | `oklch(0.5961 0.2006 36.48)` | Red status |
| `--chart-1` | `oklch(0.488 0.243 264.376)` | Chart blue |
| `--chart-2` | `oklch(0.696 0.17 162.48)` | Chart teal |
| `--chart-3` | `oklch(0.769 0.188 70.08)` | Chart amber |
| `--chart-4` | `oklch(0.627 0.265 303.9)` | Chart purple |
| `--chart-5` | `oklch(0.645 0.246 16.439)` | Chart red/pink |
| `--sidebar-*` | Matches main theme | Sidebar-specific tokens |

### Typography
- **Body font**: Roboto Mono (`font-mono`) — monospace, used for all body text
- **Display font**: Space Grotesk (`font-display`) — used for headings, stat numbers, brand
- **Body**: `body { font-mono }` — everything is monospace by default
- **Stats/numbers**: `text-4xl md:text-5xl font-display` with animated number transitions
- **Card titles**: `text-sm font-medium`
- **Labels**: `text-xs md:text-sm font-medium text-muted-foreground`
- **Buttons/nav**: `uppercase font-bold`
- **Text transform**: uppercase used extensively on buttons, menu items, labels, badges

### Spacing & Layout
- `--gap`: 2rem (grid gap)
- `--sides`: 1rem (page padding)
- `--radius`: 0.625rem
- 12-column grid: 2-col sidebar, 7-col main, 3-col right panel

### Component Patterns
- **Double-layer cards**: Outer `bg-pop p-1.5`, inner `bg-card p-3 rounded`
- **Bullet indicators**: Small colored squares (`rounded-[1.5px]`), not circles
- **Buttons**: All `uppercase font-bold rounded-md`
- **Tabs**: `bg-foreground/5` list, active trigger `bg-primary font-bold`
- **Status badges**: `bg-{color}/10 border-{color} text-{color}` outline pattern
- **Animated stats**: Number flow animations, marquee arrows for trends

### Responsive Font Scaling
```css
@media (min-width: 1028px) and (max-width: 1239px) { html { font-size: 0.7em; } }
@media (min-width: 1240px) and (max-width: 1919px) { html { font-size: 0.75em; } }
@media (min-width: 1920px) { html { font-size: 1em; } }
@media (min-width: 2160px) { html { font-size: 1.2em; } }
```

## Core Capabilities (Unchanged)

All three bots and their functionality remain exactly as built:
- C1: Daily BI Briefing Bot (Claude API + Resend email)
- C2: LinkedIn Content Drafting Bot (topic → Claude → draft management)
- C3: Referral Pipeline Monitoring Bot (status tracking, alerts, leaderboard)
- C4: Dashboard (unified view with tabs/sections)

## What Changes

### UI Layer Only
- [ ] Global CSS: Replace all color variables with OKLCH dark theme tokens
- [ ] Fonts: Switch to Roboto Mono (body) + Space Grotesk (display)
- [ ] Dark mode: Hardcode `className="dark"` on html element
- [ ] Layout: Replace current sidebar with design-system sidebar pattern
- [ ] Cards: Implement double-layer card pattern (bg-pop outer, bg-card inner)
- [ ] Typography: All buttons/labels uppercase, stat numbers use font-display
- [ ] Status indicators: Switch from circles to bullet squares
- [ ] Metric cards: Use animated number display with trend arrows
- [ ] Tables: Dark theme styling with border/pop colors
- [ ] Forms: Input styling with --input border color
- [ ] Tabs: bg-foreground/5 list, bg-primary active trigger

### What Does NOT Change
- Convex schema, queries, mutations, actions — zero changes
- Claude API prompts and integration — zero changes
- Resend email integration — zero changes
- Cron job configuration — zero changes
- Any file in `convex/` or `lib/` — zero changes
- Business logic — zero changes

## Invariants
- [ ] `INV-D01`: All colors must use OKLCH color space values from the design system
- [ ] `INV-D02`: Body font must be Roboto Mono (monospace), display font must be Space Grotesk
- [ ] `INV-D03`: Dark mode must be hardcoded (className="dark" on html)
- [ ] `INV-D04`: All buttons must be uppercase and font-bold
- [ ] `INV-D05`: Cards must use double-layer pattern (bg-pop outer, bg-card inner)
- [ ] `INV-D06`: No Convex/backend files may be modified
- [ ] `INV-D07`: All three bot functionalities must work identically after the port
- [ ] `INV-D08`: Responsive font scaling must match the design system breakpoints
