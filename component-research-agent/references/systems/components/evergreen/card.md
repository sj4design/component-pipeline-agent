---
system: Evergreen (Segment)
component: Card (via Pane)
url: https://evergreen.segment.com/components/pane
last_verified: 2026-03-28
confidence: medium
---

# Card (via Pane)

## Approach
Evergreen doesn't have a dedicated Card component but the Pane component acts as a surface container for card-like layouts. Pane is a `<div>` with Evergreen's styling system props for elevation, background, border, and padding. Segment's analytics dashboards use Pane with elevation to create card layouts for metrics, charts, and summaries.

## Key Decisions
1. **Pane as card primitive** (MEDIUM) — Pane with `elevation={1}` and padding creates a card-like surface. Simple and flexible.

## Notable Props
- Pane: `elevation` (0-4), `background`, `padding`, `border`

## A11y Highlights
- Standard div element; no ARIA needed for static cards

## Strengths & Gaps
- **Best at**: Flexible composition; elevation system for card depth
- **Missing**: No structured card with header/body/footer; no image slot
