---
component: Datepicker
tier: 3
last_verified: 2026-03-29
---

# Datepicker — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — compose Popover + third-party calendar | No DatePicker primitive; Popover handles open/close and focus trap; consumer owns date logic and calendar grid. | high |
| Chakra UI | DatePicker (via Ark UI, not in core) | Ark UI DatePicker with Zag.js state machines; tokenizable via Chakra v3 recipe system; Intl API for locale/calendar system. | medium |
| GOV.UK | Date Input (three separate text fields) | Deliberately no calendar picker; research-proven three text inputs (Day/Month/Year) for dates users know; field-specific error messages; no JavaScript required. | high |
| Base Web | Datepicker | Overrides pattern for deep customization; first-class range selection; `timezone` prop for multi-timezone dispatching; date-fns locale support. | medium |
| Fluent 2 | DatePicker | Calendar grid is a separate component; `strings` prop for full localization; `showGoToToday`; `calendarAs` to replace the internal calendar. | high |
| Gestalt | DatePicker | Wraps react-datepicker; two-month side-by-side range view for ad campaign scheduling; date-fns locale for international markets. | medium |
| Mantine | DatePickerInput / DateTimePicker / DateRangePickerInput | Full suite of date components (`@mantine/dates`); `DatesProvider` for global locale/timezone; `excludeDate` callback; `getDayProps` for per-day customization. | high |
| Orbit | InputDate / InputDateRange | Inline calendar (no popover) for flight booking; `renderDay` for price-per-day display in cells; sequential range selection preventing return-before-departure. | medium |
| Evergreen | Not available — use native `type="date"` or third-party | No DatePicker in core; TextInputField with `type="date"` as fallback; teams use styled third-party libraries. | medium |
| Nord | nord-date-picker (Date Picker) | Healthcare web component; strong min/max constraint support for appointment/history date rules; inline validation with error messages; ISO date string API. | low |

## Key Decision Patterns

GOV.UK's three-text-input date pattern is the most research-validated approach in the T3 set and directly contradicts the calendar-picker default found in all other systems. The evidence is compelling: for dates users already know (birthdates, document dates), text entry is faster and more accurate than calendar navigation. The implication for product design is that calendar pickers are optimized for "which future date do I want" scenarios and text inputs are optimized for "I know this date" scenarios — and most systems default to the calendar-picker without questioning which scenario they're serving.

Mantine's `DatesProvider` global configuration pattern is the most developer-ergonomic localization approach in the T3 set. Rather than passing `locale`, `timezone`, and `weekStart` to every DatePickerInput instance, DatesProvider sets these once at the app root, cascading to all date components. This is the correct abstraction level for locale concerns — they should be application-wide, not per-component.

Orbit's `renderDay` prop for price-per-day display inside calendar cells is the most domain-specific DatePicker capability in the T3 set. It represents a real design challenge: how do you display supplementary data (price, availability count, event marker) inside a calendar cell that is designed for a date string? Mantine's `getDayProps` is a more general solution to the same problem — returning arbitrary props for each day cell.

Base Web's timezone-aware DatePicker is the only T3 system to explicitly address the operational dispatch use case where the UI operator and the subject (driver, delivery) are in different timezones. This is a non-trivial requirement that most date components ignore.

## A11y Consensus

- Calendar grids use `role="grid"` with day cells as `role="gridcell"`; `aria-selected` marks selected days; `aria-disabled` marks unavailable days — this is universal across all systems with a calendar component.
- The trigger input should have `aria-haspopup="dialog"` when the calendar opens in a modal/dialog, communicating to screen readers that activation opens a dialog.
- Month navigation buttons must have descriptive accessible names (e.g., "Next month, April 2026") not just "<" and ">" icons.
- Month/year changes should be announced to screen readers via a live region — Fluent 2 explicitly implements this; others rely on focus management.
- GOV.UK's three-input pattern requires `aria-describedby` linking each field to a format hint and any associated error message — this is the simplest and most robust date input accessibility pattern.

## Recommended Use

Reference T3 datepicker approaches when deciding between text input vs. calendar picker for your use case (GOV.UK's research rationale), localization strategy (Mantine's DatesProvider vs. Fluent 2's strings object), and per-day customization (Mantine's getDayProps vs. Orbit's renderDay for domain data). Base Web is the reference for timezone-aware date selection; Orbit is the reference for inline travel-booking calendar UX.
