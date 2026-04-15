---
component: Date Range Picker
tier: 3
last_verified: 2026-03-31
---

# Date Range Picker — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — compose Popover + third-party calendar | No DateRangePicker primitive; consumer composes Popover for open/close, focus trap, and positioning with a third-party range calendar (e.g., react-day-picker). | high |
| Chakra UI | DatePicker range mode (via Ark UI) | Ark UI DatePicker with Zag.js state machine supports range selection via `selectionMode="range"`; Intl API for locale and calendar system support. | medium |
| GOV.UK | Date Input (two sets of three text fields) | No calendar range picker; range selection uses two groups of three text inputs (Day/Month/Year) for start and end dates; research-proven for known dates; no JavaScript required. | high |
| Base Web | Datepicker (range mode) | `range` prop enables range selection; overrides pattern for deep customization of range highlight styling; `timezone` prop for cross-timezone range selection; date-fns locale. | medium |
| Fluent 2 | DatePicker (no range mode) | No range selection; single DatePicker only with separate Calendar component. Range requires two DatePicker instances with application-level coordination. | high |
| Gestalt | DateRange | Dedicated DateRange component with two-month side-by-side calendar view; built for Pinterest ad campaign scheduling; date-fns locale; wraps react-datepicker. | medium |
| Mantine | DatePickerInput (type="range") / MonthPickerInput (type="range") | `type="range"` prop on DatePickerInput enables range selection; `DatesProvider` for global locale/timezone; `excludeDate` callback; `getDayProps` for per-day customization; `numberOfColumns` for multi-month display. | high |
| Orbit | InputDateRange | Dedicated range component for flight booking; inline dual-month calendar (no popover); `renderDay` for price-per-day in cells; sequential selection preventing return-before-departure; min/max stay constraints. | medium |
| Evergreen | Not available | No DateRangePicker in core; teams use third-party libraries or two TextInputField with `type="date"`. | medium |
| Nord | nord-date-picker (no range mode) | Healthcare web component; single date only; range selection not supported; two instances with cross-validation for range use cases. | low |

## Key Decision Patterns

Mantine's `type="range"` prop on DatePickerInput is the most ergonomic T3 range implementation. The same component serves single, range, and multiple selection modes via a type prop, with `DatesProvider` handling locale and timezone at the app root. The `numberOfColumns` prop controls multi-month display, and `excludeDate` plus `getDayProps` enable unavailability and custom cell rendering. This is the most complete date range API in the T3 set.

Gestalt's dedicated DateRange component is the most domain-specific T3 range picker. Built explicitly for Pinterest's ad campaign scheduling, it provides two-month side-by-side display with range highlighting optimized for selecting campaign start and end dates. The constraint that it wraps react-datepicker means it inherits that library's range behavior and limitations.

Orbit's InputDateRange is the most specialized range picker in any tier. The `renderDay` prop for price-per-day display inside calendar cells addresses the flight booking use case where users need to see cost alongside dates. Sequential selection (departure then return) with min/max stay validation prevents invalid booking ranges at the component level rather than in application code.

Base Web's timezone-aware range selection is unique in the T3 set. The `timezone` prop ensures that a range selected in one timezone is correctly interpreted in another — critical for ride dispatch, delivery scheduling, and multi-region operations.

GOV.UK's anti-pattern for range pickers is notable: for date ranges where users know both dates (e.g., employment history, reporting periods), two sets of three text inputs is faster and more accessible than any calendar picker. This research finding applies to "known date" scenarios and should inform whether a calendar range picker is even the right pattern.

Fluent 2, Radix, Evergreen, and Nord do not provide range selection capabilities, requiring two single-date instances or third-party composition.

## A11y Consensus

- Calendar grids use `role="grid"` with day cells as `role="gridcell"`; `aria-selected` marks range start and end; `aria-disabled` marks unavailable days — universal across all systems with range calendar support.
- Range highlight cells between start and end should have a visual indicator but should NOT all be marked `aria-selected` — only the start and end cells carry selection state; intermediate cells are visually highlighted only.
- Month navigation buttons require descriptive accessible names ("Next month, April 2026") for screen readers.
- GOV.UK's two-group three-input pattern requires `aria-describedby` linking each group to format hints and error messages; `fieldset` with `legend` groups each date's three inputs — simplest and most robust range input accessibility.
- Mantine and Base Web announce range start/end via live regions when selection changes; Orbit announces sequential selection state ("Select departure date" then "Select return date").
- When using two independent date pickers for range, clear labeling ("Start date", "End date") and cross-field validation error messages accessible via `aria-describedby` are mandatory.

## Recommended Use

Reference T3 date range picker approaches when deciding on range selection architecture (Mantine's type="range" vs. Gestalt's dedicated component vs. two singles), domain-specific cell content (Orbit's renderDay for pricing, Mantine's getDayProps for custom markers), timezone handling (Base Web), and whether a calendar picker is even appropriate (GOV.UK's research on text inputs for known dates). Orbit is the reference for travel/booking range UX; Mantine is the reference for general-purpose range selection with maximum configurability.
