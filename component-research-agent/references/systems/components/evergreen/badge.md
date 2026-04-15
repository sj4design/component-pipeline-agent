---
system: Evergreen (Segment)
component: Badge / Pill
url: https://evergreen.segment.com/components/badge
last_verified: 2026-03-28
confidence: medium
---

# Badge / Pill

## Approach
Evergreen provides Badge and Pill — Badge is a rectangular label and Pill is a fully rounded version (matching the visual distinction some teams want between status labels and category chips). Both use Evergreen's color system and support the same color options.

## Key Decisions
1. **Badge vs Pill** (MEDIUM) — The visual distinction between rectangle (Badge) and pill (Pill) is useful for information hierarchy: rectangular badges for status, rounded pills for tags/categories.
2. **Color variants** (HIGH) — Neutral, blue, red, orange, yellow, green, teal, purple — semantic colors matching Evergreen's intent system.

## Notable Props
- `color`: semantic color from Evergreen palette
- `isSolid`: solid background vs soft/outlined fill

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Text content is accessible name
- **ARIA**: No special ARIA needed

## Strengths & Gaps
- **Best at**: Badge vs Pill distinction; semantic color options; analytics dashboard status patterns
- **Missing**: No icon inside badge; no count overflow; no removable variant
