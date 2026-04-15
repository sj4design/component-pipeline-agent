---
system: Fluent 2 (Microsoft)
component: Calendar
url: https://fluent2.microsoft.design/components/web/react/calendar/usage
last_verified: 2026-03-28
confidence: high
---

# Calendar

## Approach
Fluent 2 has a standalone Calendar component separate from DatePicker, one of the few systems with this separation. The Calendar is used in Teams scheduling, Outlook calendar views, and Azure scheduling tools as an inline calendar grid. It supports month/year navigation, date range highlighting, and work-week vs. full-week views. This is one of the most fully-featured calendar components in any design system.

## Key Decisions
1. **Standalone Calendar** (HIGH) — Completely independent from DatePicker, enabling inline calendar grids in scheduling UIs without an input trigger.
2. **Work week mode** (HIGH) — Shows only Monday-Friday, reducing visual noise in scheduling applications that don't use weekends. This is Office-specific but solves a real need.
3. **Calendar strings for localization** (HIGH) — Full localization via a strings object, consistent with DatePicker's approach. All month names, day abbreviations, and navigation labels are overridable.

## Notable Props
- `value` / `onSelectDate`: controlled date and callback
- `showGoToToday`: "Go to today" button
- `showWeekNumbers`: week number column display
- `calendarDayProps.showWeekNumbers`: week view configuration
- `strings`: full localization object

## A11y Highlights
- **Keyboard**: Full arrow navigation; Page Up/Down for month; Alt+Page Up/Down for year
- **Screen reader**: role="grid" with full ARIA grid navigation
- **ARIA**: Comprehensive ARIA for date grid; selected/disabled/today states communicated

## Strengths & Gaps
- **Best at**: Work week mode; standalone from DatePicker; full localization; week numbers
- **Missing**: No multi-month view; no year-at-a-glance view
