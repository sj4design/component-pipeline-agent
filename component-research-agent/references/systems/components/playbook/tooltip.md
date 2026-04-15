---
system: Playbook (Power Home Remodeling)
component: Tooltip
url: https://playbook.powerapp.cloud/kits/tooltip
last_verified: 2026-03-28
confidence: medium
---

# Tooltip

## Approach
Playbook's Tooltip provides contextual information on hover/focus for their CRM interface elements. Used for icon button labels, truncated text expansion, and form field help text in their React/Rails applications. Follows standard tooltip patterns with hover delay and keyboard focus triggering.

## Key Decisions
1. **Icon label use case** (MEDIUM) — Primary use case is providing text labels for icon buttons in toolbar and action contexts throughout their CRM.
2. **Dual React/Rails** (HIGH) — Available in both React and ViewComponent for cross-stack consistency.
3. **Placement options** (MEDIUM) — Multiple placement directions to ensure tooltips stay in viewport within complex CRM layouts.

## Notable Props
- `content`: Tooltip text
- `placement`: Placement direction
- `delay`: Hover delay

## A11y Highlights
- **Keyboard**: Shows on focus; Escape dismisses
- **Screen reader**: Tooltip association via aria-describedby or aria-label
- **ARIA**: role="tooltip"; aria-describedby on trigger

## Strengths & Gaps
- **Best at**: CRM icon button labeling; dual framework support
- **Missing**: Medium confidence; ARIA type distinction not confirmed
