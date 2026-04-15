---
system: Chakra UI
component: Calendar (via Ark UI)
url: https://ark-ui.com/react/docs/components/calendar
last_verified: 2026-03-28
confidence: medium
---

# Calendar

## Approach
Chakra UI v3, built on Ark UI, has access to the Ark UI Calendar component which provides a full-featured calendar grid. The Calendar is the standalone inline variant of the date selection component (without the input trigger). It supports single date, range, and multiple selection modes. The component uses Zag.js state machines for reliable calendar navigation and selection.

## Key Decisions
1. **Standalone Calendar via Ark UI** (HIGH) — Calendar can be used inline (not just inside a DatePicker popover). This enables dashboard widgets, scheduling views, and booking interfaces that need a visible calendar.
2. **Zag.js state machine** (HIGH) — Calendar navigation state (current month, year view vs month view vs day view) is managed by a robust state machine, preventing edge cases in month/year navigation.

## Notable Props
- `value`: selected date(s)
- `onValueChange`: selection callback
- `view`: `"day" | "month" | "year"` — calendar zoom level
- `min` / `max`: date range constraints
- `locale`: locale for formatting

## A11y Highlights
- **Keyboard**: Arrow keys navigate grid; Page Up/Down change month; Enter selects
- **Screen reader**: role="grid" for calendar; cells have aria-selected, aria-disabled
- **ARIA**: Full ARIA calendar/grid pattern via Zag.js

## Strengths & Gaps
- **Best at**: Zag.js reliability; view modes (day/month/year); standalone inline calendar
- **Missing**: Requires Ark UI dependency; limited documentation in Chakra-specific context
