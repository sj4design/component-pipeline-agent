---
system: Nord (Nordhealth)
component: Tooltip (nord-tooltip web component)
url: https://nordhealth.design/components/tooltip/
last_verified: 2026-03-28
confidence: low
---

# Tooltip

## Approach
Nord provides a Tooltip web component for healthcare application use. Tooltips in healthcare appear on form fields to explain clinical terminology, on icon buttons in clinical dashboards, and on abbreviated data cells to show full values. Healthcare tooltips must be reliably accessible — clinicians using keyboard navigation need tooltip content available via focus, not only hover.

## Key Decisions
1. **Web component portability** (HIGH) — Consistent across clinical systems.
2. **Focus-triggered** (HIGH) — Healthcare users frequently navigate via keyboard; hover-only tooltips are not acceptable in clinical contexts.

## Notable Props
- Trigger slot: the element that shows the tooltip
- Content: the tooltip text
- Likely: `placement` for positioning

## A11y Highlights
- **Keyboard**: Opens on focus (required for healthcare use)
- **Screen reader**: role="tooltip"; aria-describedby connection
- **ARIA**: Shadow DOM implements tooltip ARIA; verify at nordhealth.design

## Strengths & Gaps
- **Best at**: Healthcare context focus-triggered tooltips; web component portability
- **Missing**: Verify exact API at nordhealth.design
