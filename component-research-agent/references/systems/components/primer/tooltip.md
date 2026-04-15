---
system: GitHub Primer
component: Tooltip
url: https://primer.style/components/tooltip
last_verified: 2026-03-28
confidence: high
---

# Tooltip

## Approach
GitHub Primer's Tooltip had a notable accessibility rework — Primer identified that the previous tooltip implementation had accessibility issues (tooltips used as sole labels for icon buttons), and updated the component to properly handle two distinct use cases: label tooltips (providing the accessible name for icon buttons) and description tooltips (supplementary information). This clear type distinction is one of Primer's most careful tooltip implementations in the design system space.

## Key Decisions
1. **type="label" vs type="description"** (HIGH) — Tooltip's `type` prop explicitly distinguishes between a tooltip that IS the accessible name (label, uses aria-label internally) vs one that adds supplementary context (description, uses aria-describedby), preventing common misuse.
2. **Accessible name enforcement** (HIGH) — Primer warns when a tooltip of type="label" is used on an element that already has a visible text label, preventing redundant announcements.
3. **No interactive content** (HIGH) — Like Paste, Primer explicitly disallows interactive content in tooltips, with Overlay components recommended for interactive supplementary content.

## Notable Props
- `text`: Tooltip content string
- `type`: "label" | "description" — determines ARIA relationship (aria-label vs aria-describedby)
- `direction`: Placement direction (n, s, e, w, ne, nw, se, sw)

## A11y Highlights
- **Keyboard**: Shows on focus of trigger; Escape dismisses
- **Screen reader**: type="label" sets aria-label on trigger; type="description" uses role="tooltip" with aria-describedby
- **ARIA**: Two-mode ARIA approach uniquely addresses the dual use case of tooltips as labels vs descriptions

## Strengths & Gaps
- **Best at**: The most thoughtful label vs description tooltip distinction in this set; prevents common ARIA tooltip misuse
- **Missing**: No rich/HTML content tooltips; limited animation control
