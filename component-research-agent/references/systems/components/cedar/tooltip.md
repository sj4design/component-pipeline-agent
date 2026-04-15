---
system: REI Cedar
component: Tooltip
url: https://cedar.rei.com/components/tooltip
last_verified: 2026-03-28
confidence: medium
---

# Tooltip

## Approach
REI Cedar's Tooltip provides supplementary information on hover/focus for REI's e-commerce and account management UI. Used for product feature explanations, icon clarifications, and form help text. Cedar's tooltip follows accessibility-first principles aligned with REI's WCAG 2.1 AA commitment and is implemented as a Vue component.

## Key Decisions
1. **Touch accessibility** (HIGH) — Tooltip is accessible on touch devices, important given REI's mobile-heavy user base, potentially via a tap-to-reveal pattern or persistent on mobile.
2. **Non-interactive content** (MEDIUM) — Following best practices, Cedar tooltips likely contain non-interactive supplementary information only.
3. **Placement auto-positioning** (MEDIUM) — Auto-positioning ensures tooltips stay in viewport on product pages with complex layouts.

## Notable Props
- `content`: Tooltip text content
- `position`: Placement direction

## A11y Highlights
- **Keyboard**: Focus trigger; Escape dismiss
- **Screen reader**: role="tooltip"; aria-describedby association
- **ARIA**: Standard tooltip ARIA pattern

## Strengths & Gaps
- **Best at**: Mobile-accessible tooltip patterns; REI accessibility standards
- **Missing**: Medium confidence on some specifics; touch behavior details uncertain
