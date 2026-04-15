---
system: REI Cedar
component: Calendar (within DatePicker)
url: https://cedar.rei.com/components/date-picker
last_verified: 2026-03-28
confidence: medium
---

# Calendar

## Approach
REI Cedar's calendar functionality is exposed through its DatePicker component, with the calendar grid available for range selection (rental dates, event registration). A standalone calendar component separate from the DatePicker is not confirmed in Cedar's public documentation.

## Key Decisions
1. **Range-focused calendar** (HIGH) — Calendar grid designed primarily for REI's rental reservation date ranges.
2. **Visual range highlighting** (HIGH) — Start/end date and range fill visual treatment for rental date ranges.
3. **Unavailable date display** (MEDIUM) — Visual indication of unavailable rental slots within the calendar grid.

## Notable Props
See DatePicker component for calendar props.

## A11y Highlights
- **Keyboard**: Arrow key navigation; Enter to select
- **Screen reader**: Date cells announced; range state communicated
- **ARIA**: Grid pattern; aria-selected; aria-disabled for unavailable dates

## Strengths & Gaps
- **Best at**: Rental reservation range display; unavailable slot visualization
- **Missing**: No confirmed standalone calendar; medium confidence
