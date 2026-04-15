---
system: shadcn/ui
component: Calendar
url: https://ui.shadcn.com/docs/components/calendar
last_verified: 2026-03-28
confidence: high
---

# Calendar

## Approach
shadcn/ui's Calendar is a standalone component built on react-day-picker, providing a fully featured calendar grid for inline date display and selection. Unlike many systems where the calendar is only accessible through a DatePicker popover, shadcn/ui exposes Calendar as a first-class standalone component. This enables inline calendar display for scheduling UIs, date range visualizers, and booking interfaces.

## Key Decisions
1. **Standalone first-class component** (HIGH) — Calendar is its own component (not just an internal DatePicker implementation detail), enabling direct use as an inline calendar in scheduling and booking interfaces.
2. **react-day-picker full feature access** (HIGH) — All react-day-picker features are available: single, multiple, range modes; date modifiers for disabled/highlighted/custom styled dates; locale support.
3. **Composable with Popover for DatePicker** (HIGH) — Calendar + Popover = DatePicker recipe shows how the standalone component composes upward, rather than the calendar being locked inside a DatePicker.

## Notable Props
- `mode`: "single" | "multiple" | "range"
- `selected`: Controlled selected date(s)
- `onSelect`: Selection callback
- `disabled`: Date matcher for disabling dates
- `modifiers` / `modifiersClassNames`: Custom date styling
- `numberOfMonths`: Display multiple months side-by-side

## A11y Highlights
- **Keyboard**: Arrow key grid navigation; Enter/Space to select; Page Up/Down for month navigation; Home/End for week boundaries
- **Screen reader**: Full date announced per cell; selection state via aria-selected; disabled dates via aria-disabled
- **ARIA**: react-day-picker provides role="grid"; aria-selected; aria-disabled; navigation buttons labeled

## Strengths & Gaps
- **Best at**: Standalone calendar for scheduling UIs; multiple months display; full react-day-picker feature access; range and multiple mode
- **Missing**: No event/appointment display within calendar cells; not a schedule visualization component
