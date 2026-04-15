---
system: Evergreen (Segment)
component: Tooltip
url: https://evergreen.segment.com/components/tooltip
last_verified: 2026-03-28
confidence: medium
---

# Tooltip

## Approach
Evergreen's Tooltip provides clean informational tooltips for Segment's analytics dashboard. Tooltips appear on icon buttons, truncated text, and metric labels where additional context is needed. The component uses Evergreen's Popover infrastructure under the hood and supports both hover and focus triggering.

## Key Decisions
1. **appearance: default vs card** (MEDIUM) — `appearance="card"` renders the tooltip with a card-style surface (white background with border instead of dark background). This is useful for rich tooltip content where the dark background doesn't provide enough contrast for complex content.
2. **statelessProps** (MEDIUM) — Passes additional props to the tooltip popover for positional control.

## Notable Props
- `content`: tooltip text or ReactNode
- `position`: placement
- `appearance`: `"default" | "card"`

## A11y Highlights
- **Keyboard**: Opens on focus
- **Screen reader**: role="tooltip"; aria-describedby on trigger
- **ARIA**: Standard tooltip ARIA

## Strengths & Gaps
- **Best at**: Card appearance for rich content; clean API
- **Missing**: No delay configuration; limited positioning options
