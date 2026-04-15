---
system: Salesforce Lightning Design System
component: Calendar (within Datepicker)
url: https://lightningdesignsystem.com/components/datepickers/
last_verified: 2026-03-28
confidence: high
---

# Calendar

## Approach
Salesforce Lightning exposes the calendar grid as part of its Datepicker but also provides it as a standalone visual component for scheduling contexts — calendar views in Salesforce Scheduler, event management, and availability display. The standalone calendar provides month/week/day views for schedule visualization, distinct from the date-picking calendar embedded in the Datepicker popup.

## Key Decisions
1. **Schedule visualization context** (HIGH) — Standalone calendar used for Salesforce Scheduler and Service Cloud appointment booking, supporting month/week/day view modes for displaying availability and existing appointments.
2. **Event display within cells** (HIGH) — Calendar cells support displaying event/appointment data within day cells, making it a schedule visualization component rather than just a date picker.
3. **Navigation controls** (MEDIUM) — Previous/next month navigation with month/year selection for quick navigation to any date in schedule browsing.

## Notable Props
- `value`: Currently displayed/selected date
- `minDate` / `maxDate`: Range constraints
- `disabledDates`: Disabled specific dates
- `events`: Event data for schedule display

## A11y Highlights
- **Keyboard**: Arrow keys navigate calendar grid; Page Up/Down for month navigation; Enter to select
- **Screen reader**: Each date cell announced with full date; events within cells announced
- **ARIA**: role="grid"; aria-selected; aria-label on each cell; aria-disabled; navigation buttons labeled

## Strengths & Gaps
- **Best at**: Schedule visualization with event display; Salesforce Scheduler integration; month/week/day views
- **Missing**: Complex event display may have density limitations; limited custom event rendering
