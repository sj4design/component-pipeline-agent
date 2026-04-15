---
system: REI Cedar
component: Progress Bar
url: https://cedar.rei.com/components/progress-bar
last_verified: 2026-03-28
confidence: medium
---

# Progress Bar

## Approach
REI Cedar's Progress Bar is used for checkout step completion, rewards progress, and upload progress indicators. The e-commerce checkout context means progress bars guide customers through multi-step purchase flows. Cedar's accessibility standards ensure proper ARIA implementation.

## Key Decisions
1. **Checkout progress** (HIGH) — Progress bars guide checkout multi-step flows (cart → shipping → payment → confirmation).
2. **Rewards/loyalty progress** (MEDIUM) — REI Co-op membership rewards progress display.
3. **WCAG 2.1 AA compliance** (HIGH) — Cedar's accessibility commitment means proper role and aria-value implementation.

## Notable Props
- `value`: Progress value
- `label`: Accessible label

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar"; value announced; label provides context
- **ARIA**: aria-valuenow/min/max; aria-label

## Strengths & Gaps
- **Best at**: Checkout and rewards progress visualization
- **Missing**: Medium confidence; circular variant not confirmed
