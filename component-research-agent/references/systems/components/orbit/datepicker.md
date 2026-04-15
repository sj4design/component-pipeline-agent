---
system: Orbit (Kiwi.com)
component: InputDate / InputDateRange
url: https://orbit.kiwi/components/inputdate/
last_verified: 2026-03-28
confidence: medium
---

# InputDate / InputDateRange

## Approach
Orbit's date input components are heavily influenced by Kiwi.com's core product: flight search. The `InputDate` and `InputDateRange` components are designed for the specific UX flow of selecting departure and return dates — a two-step, sequential process that shows an inline calendar. The calendar is designed for travel use cases: highlighting trip duration, showing day prices (when provided), and marking unavailable dates for flight routes. This makes Orbit's DatePicker one of the most travel-specialized in any design system.

## Key Decisions
1. **Inline calendar display** (HIGH) — Orbit shows the calendar inline rather than in a popover, reflecting the flight search experience where the calendar is the primary interactive element rather than a helper for a text field. This is optimized for touch devices (mobile flight booking).
2. **Price per day support** (HIGH) — The `renderDay` prop allows showing price information inside calendar day cells, a pattern unique to travel booking UIs. This is Orbit's most distinctive DatePicker capability and reflects Kiwi.com's business need.
3. **Sequential range selection for flights** (HIGH) — InputDateRange is specifically designed for departure + return date pairs, with built-in logic to prevent selecting a return date before departure. The visual language (highlighted range, clear start/end markers) is optimized for the flight booking flow.

## Notable Props
- `minDate` / `maxDate`: flight availability windows
- `disabledDates`: unavailable flight dates
- `renderDay`: custom day cell renderer (used for prices)
- `onDateChange`: callback with selected date(s)
- `inputProps`: forwarded to the underlying input for label/placeholder

## A11y Highlights
- **Keyboard**: Arrow navigation on calendar; Escape to close; Enter to select
- **Screen reader**: Date cells announced with date and optional price; disabled dates announced as unavailable
- **ARIA**: Standard calendar grid ARIA; price information included in accessible cell content

## Strengths & Gaps
- **Best at**: Travel booking patterns; inline calendar; per-day price rendering; mobile-optimized touch interaction
- **Missing**: Popover mode for form contexts; limited customization outside of travel patterns; documentation is Kiwi-centric
