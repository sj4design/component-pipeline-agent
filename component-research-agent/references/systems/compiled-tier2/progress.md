---
component: Progress
tier: 2
last_verified: 2026-03-28
---

# Progress — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | ProgressBar | Horizontal bar; color variants for status; size variants | high |
| Salesforce Lightning | Progress Bar + Progress Ring | Bar (horizontal) + Ring (circular) variants; both role="progressbar" | high |
| GitHub Primer | ProgressBar | Segments; multiple segments for multi-part progress; color per segment | high |
| shadcn/ui | Progress | Radix UI Progress; determinate only; single color; no label | high |
| Playbook | ProgressBar | Project/task progress; dual React/Rails | medium |
| REI Cedar | CdrProgress (not present) | Not present; use custom implementation | medium |
| Wise Design | Progress | Transfer processing progress | low |
| Dell Design System | Progress | Enterprise task/operation progress | low |

## Key Decision Patterns

**Determinate vs. indeterminate:** role="progressbar" supports both. Determinate: aria-valuenow + aria-valuemin + aria-valuemax. Indeterminate (unknown duration): omit aria-valuenow; use animation to communicate activity.

**Progress Ring:** Lightning uniquely provides a circular Progress Ring — useful in record detail pages and dashboards where a donut/circle chart communicates completion percentage. All other T2 systems are horizontal bar only.

**Multi-segment progress:** Primer's ProgressBar supports multiple colored segments — useful for showing breakdown (e.g., "3 passed, 1 failed, 2 pending" in different colors in a single bar). Unique to Primer.

**Accessible labels:** All systems require providing aria-label or aria-labelledby on the progressbar. The value alone (e.g., "75") is not sufficient — screen readers need context ("File upload progress: 75%").

## A11y Consensus
- role="progressbar"
- aria-valuemin (typically 0), aria-valuemax (typically 100), aria-valuenow (current %)
- aria-label or aria-labelledby for context
- Indeterminate: omit aria-valuenow; animate the bar for visual feedback
- aria-valuetext for human-readable values (e.g., "3 of 10 steps completed")

## Recommended Use
Use Lightning Progress Ring for circular/donut progress displays. Use Primer ProgressBar for multi-segment progress breakdowns. Use Radix/shadcn Progress for simple determinate bars. Always include aria-label and aria-valuetext for context.
