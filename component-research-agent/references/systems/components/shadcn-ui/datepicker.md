---
system: shadcn/ui
component: Date Picker
url: https://ui.shadcn.com/docs/components/date-picker
last_verified: 2026-03-28
confidence: high
---

# Date Picker

## Approach
shadcn/ui's Date Picker is a composition example rather than a single packaged component — it combines the Popover primitive with the Calendar component (built on react-day-picker) to create a date selection UI. This reflects shadcn/ui's philosophy of providing patterns and recipes over black-box components. Developers copy the pattern into their codebase and own it fully. The component uses react-day-picker v8 under the hood, which provides robust date logic and localization.

## Key Decisions
1. **Composable recipe pattern** (HIGH) — No single DatePicker component exists; instead shadcn/ui shows how to compose Popover + Calendar, meaning developers own the full implementation and can customize without fighting abstraction layers.
2. **react-day-picker foundation** (HIGH) — Delegates all calendar logic, locale support, and date math to the battle-tested react-day-picker library rather than reimplementing it.
3. **Radix UI Popover base** (HIGH) — Uses Radix's Popover for the trigger/overlay, ensuring focus trap, outside-click dismiss, and positioning are handled accessibly out of the box.

## Notable Props
- `mode` (on Calendar): "single" | "multiple" | "range" — controls selection behavior via react-day-picker
- `selected`: Controlled selected date(s) value
- `onSelect`: Callback when date is selected
- `disabled`: Function or date matcher to disable specific dates
- `defaultMonth`: Controls initial displayed month

## A11y Highlights
- **Keyboard**: Full arrow key navigation in calendar grid; Popover focus trap keeps keyboard within overlay when open
- **Screen reader**: react-day-picker provides aria-label on each day; selected state communicated via aria-selected
- **ARIA**: Popover uses aria-modal; calendar grid role="grid"; button trigger has descriptive aria-label

## Strengths & Gaps
- **Best at**: Maximum flexibility — developers fully own the implementation; range selection, multiple selection available through react-day-picker modes
- **Missing**: Not a turnkey component — requires more assembly than other systems; no built-in form integration wiring
