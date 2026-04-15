---
system: Mantine
component: Calendar
url: https://mantine.dev/dates/calendar/
last_verified: 2026-03-28
confidence: high
---

# Calendar

## Approach
Mantine's Calendar is a first-class, standalone component from the `@mantine/dates` package. It supports all selection modes (single, range, multiple), view levels (day/month/year), multiple visible months side-by-side, and complete customization via `getDayProps` for per-day customization. This is one of the most versatile standalone calendar components in any design system.

## Key Decisions
1. **getDayProps for per-day customization** (HIGH) — A callback that receives a date and returns props to apply to that day cell. Enables arbitrary day highlighting, coloring, disabling, and labeling without a specific API for every use case.
2. **numberOfColumns for multi-month** (HIGH) — Showing 2+ months side-by-side is built-in, used for range selection to see start and end months simultaneously.
3. **hideWeekdays / hideOutsideDates** (MEDIUM) — Fine-grained control over calendar display. Hiding outside dates (days from previous/next month) creates a cleaner minimal calendar.

## Notable Props
- `type`: `"default" | "range" | "multiple"` — selection mode
- `value` / `onChange`: controlled selection
- `numberOfColumns`: visible months
- `getDayProps`: per-day props callback
- `getMonthControlProps`: per-month in year view
- `hideWeekdays` / `hideOutsideDates`: display control
- `weekendDays`: custom weekend day definition

## A11y Highlights
- **Keyboard**: Full arrow navigation; Page Up/Down; Home/End; Enter to select
- **Screen reader**: role="grid" for calendar; aria-selected, aria-disabled on cells
- **ARIA**: getDayProps can add aria-describedby for day-specific info

## Strengths & Gaps
- **Best at**: getDayProps flexibility; numberOfColumns; multiple selection mode; weekendDays customization
- **Missing**: No time picker inside Calendar (use DateTimePicker instead)
