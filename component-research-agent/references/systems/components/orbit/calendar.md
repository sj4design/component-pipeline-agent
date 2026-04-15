---
system: Orbit (Kiwi.com)
component: Calendar (via InputDate — inline calendar)
url: https://orbit.kiwi/components/inputdate/
last_verified: 2026-03-28
confidence: medium
---

# Calendar (via InputDate)

## Approach
Orbit's calendar is embedded in the InputDate/InputDateRange components as an inline display. The travel booking context means the calendar is always shown inline (not in a popover) for date selection. The calendar supports travel-specific features: price-per-day display, highlighted date ranges, and unavailable flight dates. A standalone Calendar component outside of date input is not a primary Orbit pattern.

## Key Decisions
1. **Inline calendar for travel** (HIGH) — Orbit's calendar is always inline because flight date selection is a primary interaction in the booking flow, warranting full visibility.
2. **Travel data rendering** (HIGH) — renderDay prop for price/availability data in calendar cells.

## Notable Props
- Via InputDate/InputDateRange configuration

## A11y Highlights
- Via InputDate implementation

## Strengths & Gaps
- **Best at**: Travel-specific inline calendar; price per day rendering
- **Missing**: Standalone calendar for non-booking contexts
