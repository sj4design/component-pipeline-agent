---
component: Date Range Picker
tier: 2
last_verified: 2026-03-31
---

# Date Range Picker — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | No DateRangePicker | No range picker component; two separate DatePicker inputs (native input[type=date]) with application-level coordination | high |
| Salesforce Lightning | lightning-datepicker (range via two instances) | No dedicated range component; two Datepicker instances with cross-validation; Lightning custom calendar popup | high |
| GitHub Primer | Not present | No DatePicker or DateRangePicker in Primer; native input[type=date] via TextInput for simple cases | high |
| shadcn/ui | Calendar (range mode) + DatePickerWithRange | react-day-picker with `mode="range"` wrapped in Popover; full custom range highlighting and hover preview; two-month side-by-side layout | high |
| Playbook | DatePicker (range mode) | Custom calendar supporting range selection with start/end highlighting; dual React/Rails support | medium |
| REI Cedar | No DateRangePicker | No dedicated range picker; single CdrDatePicker only; range requires custom composition | medium |
| Wise Design | DateRangePicker | Transfer scheduling date range selection; financial context with business-day awareness | low |
| Dell Design System | DateRangePicker | Enterprise form range picker for reporting date windows | low |

## Key Decision Patterns

**Dedicated component vs. two singles:** The T2 systems are split. shadcn/ui and Playbook provide explicit range selection modes within their date/calendar components. Paste, Lightning, Primer, and Cedar do not offer a range picker at all — they expect two independent date inputs with cross-validation at the application level. This mirrors the Atlassian (T1) "two pickers" philosophy.

**shadcn/ui as the T2 reference implementation:** shadcn/ui's DatePickerWithRange pattern (react-day-picker `mode="range"` + Popover + two-month calendar) is the most complete T2 range solution. It provides range highlighting, hover preview of tentative range, and a composable architecture where the calendar, popover, and input are separate primitives.

**Preset ranges:** None of the T2 systems provide built-in preset range shortcuts. Wise Design and Dell DS may offer presets in their enterprise contexts but with low documentation confidence. shadcn/ui's composable model makes adding a presets panel straightforward but leaves it to the consumer.

**Range confirmation:** No T2 system documents an explicit "Apply" button pattern for range confirmation. Auto-close on end-date selection is the default behavior in shadcn/ui and Playbook.

## A11y Consensus

- Calendar grid navigation follows the same pattern as single date pickers: arrow keys between days, Page Up/Down for months, Home/End for week boundaries
- `role="grid"` with `role="gridcell"` for calendar days; `aria-selected` marks selected range endpoints
- Range start and end should be distinguishable to screen readers — shadcn/ui announces "Range start: [date], Range end: [date]" via the input value
- When using two separate date inputs (Paste, Lightning approach), each input must have a clear label ("Start date", "End date") and `aria-describedby` linking to validation messages
- No T2 system explicitly documents live-region announcements for range hover preview

## Recommended Use

Use shadcn/ui's DatePickerWithRange as the primary T2 reference for range selection UX and composable architecture. For minimal-JS contexts or mobile-first forms where range selection is not critical, the Paste/Lightning "two separate inputs" approach is simpler and more accessible by default. Playbook is the reference for Rails + React dual-support range selection.
