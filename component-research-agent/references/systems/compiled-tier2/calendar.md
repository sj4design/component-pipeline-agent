---
component: Calendar
tier: 2
last_verified: 2026-03-28
---

# Calendar — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Calendar (not present) | Not present; DatePicker uses native input[type=date] | high |
| Salesforce Lightning | Calendar | Full calendar with month/week/day views; event display; scheduling | high |
| GitHub Primer | Calendar (not present) | Not present; contribution graph is custom; no general-purpose Calendar | high |
| shadcn/ui | Calendar | react-day-picker based; standalone component; range selection; multiple selection | high |
| Playbook | Calendar | Scheduling and appointment calendar; dual React/Rails | medium |
| REI Cedar | Calendar (not present) | Not present; DatePicker uses custom calendar | medium |
| Wise Design | Calendar (not present) | Not present; transfer date selection in DatePicker | low |
| Dell Design System | Calendar (not present) | Not present; date selection in DatePicker | low |

## Key Decision Patterns

**Date picker calendar vs. scheduling calendar:** Lightning's Calendar is a full scheduling calendar (month/week/day views, events, drag-and-drop) — analogous to Google Calendar embedded in Salesforce. shadcn/ui's Calendar is a date picker calendar — a single/range date selection grid with no event display.

**shadcn/ui Calendar first-class:** Unlike most systems where the calendar grid is internal to a DatePicker, shadcn/ui exposes Calendar as a standalone component that can be used directly in a page (not just inside a Popover), making it versatile for inline date displays.

**Playbook's scheduling focus:** Playbook's calendar is business-scheduling oriented — appointment slots, availability display — appropriate for home remodeling appointment booking.

**react-day-picker:** shadcn/ui's Calendar is a direct wrapper around react-day-picker, inheriting its mode="single"|"multiple"|"range" API and extensive customization via classNames.

## A11y Consensus
- Calendar grid: role="grid"; role="gridcell" for day cells; aria-selected on selected dates
- Navigation: arrow keys between days; Page Up/Down for month navigation; Home/End for week boundaries
- Today: aria-current="date"
- Month/year navigation buttons: labeled with aria-label
- Full scheduling calendar: additional event keyboard interaction patterns required

## Recommended Use
Use shadcn/ui Calendar for standalone inline date selection grids. Use Lightning Calendar for full scheduling/event calendar needs. No dedicated Calendar in Paste/Primer/Cedar — use their DatePicker components which include internal calendar grids.
