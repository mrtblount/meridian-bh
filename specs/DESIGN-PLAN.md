# Meridian BH — Design System Port Plan

## Approach
Pure UI reskin. Copy the design system's CSS variables, fonts, and component patterns into the existing project. Rewrite all frontend components to use the new design tokens. No backend changes.

## Dependencies to Install
```
@number-flow/react    — animated number transitions for stat cards
framer-motion         — animations (marquee arrows, transitions)
lucide-react          — already installed, icon library
tw-animate-css        — Tailwind animation utilities
```
Note: recharts already installed. Space Grotesk + Roboto Mono loaded via next/font/google.

## File Structure (Changes Only)

```
src/app/
├── globals.css              — REWRITE: Full OKLCH dark theme variables
├── layout.tsx               — REWRITE: New fonts, dark class, metadata
├── page.tsx                 — REWRITE: New grid layout matching design system
├── providers.tsx             — NO CHANGE
└── components/
    ├── sidebar.tsx           — REWRITE: Match design system sidebar pattern
    ├── dashboard-header.tsx  — REWRITE: Animated stat cards with number-flow
    ├── briefing-section.tsx  — REWRITE: Dark theme, new card patterns
    ├── briefing-card.tsx     — REWRITE: Double-layer card, dark styling
    ├── linkedin-section.tsx  — REWRITE: Dark theme tabs, card patterns
    ├── linkedin-form.tsx     — REWRITE: Dark input styling
    ├── linkedin-card.tsx     — REWRITE: Dark cards, badge patterns
    ├── pipeline-section.tsx  — REWRITE: Dark theme, layout adjustments
    ├── referral-table.tsx    — REWRITE: Dark table styling
    ├── source-leaderboard.tsx — REWRITE: Dark cards, bullet indicators
    └── stale-alerts.tsx      — REWRITE: Status card pattern (bg-{color}/5)
```

## Key Design Patterns to Implement

### 1. Double-Layer Card
```tsx
// Outer wrapper
<div className="bg-pop rounded-lg p-1.5">
  // Inner content
  <div className="bg-card rounded p-3">
    {children}
  </div>
</div>
```

### 2. Stat Card with Animated Numbers
```tsx
<div className="font-display text-4xl md:text-5xl">
  <NumberFlow value={metricValue} />
</div>
<span className="text-xs text-muted-foreground uppercase">label</span>
// Trend arrow with marquee animation
```

### 3. Status Badge (Outline Pattern)
```tsx
<span className="bg-success/10 border border-success text-success text-xs px-2 py-0.5 rounded">
  Active
</span>
```

### 4. Sidebar Nav Item
```tsx
<button className={`uppercase font-bold h-11 ${
  active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground"
}`}>
  <Icon /> Label
</button>
```

### 5. Button Pattern
```tsx
<button className="uppercase font-bold rounded-md bg-primary text-primary-foreground px-4 py-2">
  Action
</button>
```

### 6. Tab Pattern
```tsx
// List
<div className="bg-foreground/5 rounded-lg p-1">
  // Active trigger
  <button className="bg-primary text-primary-foreground font-bold">Tab</button>
  // Inactive
  <button className="text-foreground/60 font-medium">Tab</button>
</div>
```

## Touchpoints

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | package.json | UPDATE | Add @number-flow/react, framer-motion, tw-animate-css |
| 2 | src/app/globals.css | REWRITE | Full OKLCH dark theme CSS variables |
| 3 | src/app/layout.tsx | REWRITE | Space Grotesk + Roboto Mono fonts, dark class |
| 4 | src/app/page.tsx | REWRITE | 12-col grid layout |
| 5 | src/app/components/sidebar.tsx | REWRITE | Design system sidebar |
| 6 | src/app/components/dashboard-header.tsx | REWRITE | Animated stat cards |
| 7 | src/app/components/briefing-section.tsx | REWRITE | Dark theme |
| 8 | src/app/components/briefing-card.tsx | REWRITE | Double-layer cards |
| 9 | src/app/components/linkedin-section.tsx | REWRITE | Dark tabs |
| 10 | src/app/components/linkedin-form.tsx | REWRITE | Dark inputs |
| 11 | src/app/components/linkedin-card.tsx | REWRITE | Dark cards + badges |
| 12 | src/app/components/pipeline-section.tsx | REWRITE | Dark layout |
| 13 | src/app/components/referral-table.tsx | REWRITE | Dark table |
| 14 | src/app/components/source-leaderboard.tsx | REWRITE | Bullet indicators |
| 15 | src/app/components/stale-alerts.tsx | REWRITE | Status card pattern |
