---
system: GitHub Primer
component: Calendar (within DatePicker)
url: https://primer.style/components/date-picker
last_verified: 2026-03-28
confidence: medium
---

# Calendar

## Approach
GitHub Primer's DatePicker exposes the calendar grid component as part of its implementation but does not provide a publicly documented standalone Calendar component separate from the DatePicker. The calendar within DatePicker supports single date and range selection. For inline calendar display, Primer's DatePicker can be configured without the popover overlay.

## Key Decisions
1. **Inline mode via DatePicker** (MEDIUM) — DatePicker can be configured for inline display, effectively making the calendar grid available as an inline component for scheduling interfaces.
2. **Range selection calendar** (HIGH) — The calendar grid supports range selection with start/end date highlighting and range fill, used for GitHub's milestone and filter date range selection.
3. **Compact grid design** (MEDIUM) — Calendar grid optimized for GitHub's information-dense interface rather than large touch-friendly day cells.

## Notable Props
See DatePicker props — calendar is exposed through DatePicker's internal API.

## A11y Highlights
- **Keyboard**: Arrow key grid navigation; Enter to select
- **Screen reader**: Full date announced per cell; range selection communicated
- **ARIA**: role="grid"; aria-selected; aria-disabled

## Strengths & Gaps
- **Best at**: Range selection calendar; compact information-dense display
- **Missing**: No fully standalone Calendar API documented separately from DatePicker
