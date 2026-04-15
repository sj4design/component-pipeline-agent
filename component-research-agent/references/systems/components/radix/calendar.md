---
system: Radix UI (WorkOS)
component: Calendar (no dedicated component — use DayPicker or similar)
url: https://www.radix-ui.com/primitives/docs/components/popover
last_verified: 2026-03-28
confidence: high
---

# Calendar

## Approach
Radix UI does not provide a Calendar grid component. As with DatePicker, the team leaves calendar grid rendering to specialized libraries (react-day-picker is the most common pairing). Radix provides the Popover and focus management needed for a date picker overlay, but the calendar grid itself requires an external library. The shadcn/ui component library built on top of Radix does provide a Calendar component using react-day-picker.

## Key Decisions
1. **No calendar primitive** (HIGH) — The complexity of a calendar grid (month navigation, year navigation, date ranges, unavailable dates, locale-aware week starts) is substantial enough that Radix defers to specialized libraries.

## Notable Props
- N/A — component does not exist

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: No calendar grid component; must use third-party (react-day-picker, date-fns)
