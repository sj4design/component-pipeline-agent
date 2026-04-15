---
system: Evergreen (Segment)
component: Spinner
url: https://evergreen.segment.com/components/spinner
last_verified: 2026-03-28
confidence: medium
---

# Spinner

## Approach
Evergreen provides a Spinner component for loading states in Segment's analytics platform. It uses SVG animation and adapts to light/dark contexts. The component is used for dashboard loading, async data fetching, and import operations.

## Key Decisions
1. **Simple API** (MEDIUM) — Consistent with Evergreen's minimal approach.
2. **size** (MEDIUM) — Size variants for different usage contexts (inline vs page-level).

## Notable Props
- `size`: spinner size
- `delay`: delay before showing spinner (prevents flash for fast operations)

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Should have aria-label; role="progressbar"
- **ARIA**: delay helps prevent unnecessary AT announcements for fast operations

## Strengths & Gaps
- **Best at**: delay prop to prevent spinner flash; clean minimal design
- **Missing**: No built-in accessible label; no multiple spinner styles
