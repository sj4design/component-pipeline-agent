---
system: Playbook (Power Home Remodeling)
component: Calendar
url: https://playbook.powerapp.cloud/kits/calendar
last_verified: 2026-03-28
confidence: medium
---

# Calendar

## Approach
Playbook's Calendar is a key component given Power Home Remodeling's business — scheduling home improvement appointments is their core workflow. The Calendar is used for appointment scheduling, job timeline visualization, and availability display. Supports both React and ViewComponent implementations.

## Key Decisions
1. **Appointment scheduling** (HIGH) — Calendar is central to Playbook's business — scheduling sales appointments and installation jobs, driving rich calendar interaction requirements.
2. **Event display** (HIGH) — Calendar cells display existing appointments/jobs, making this a schedule visualization component not just a date picker.
3. **Availability indication** (MEDIUM) — Visual indication of available vs booked slots for scheduling context.

## Notable Props
- `date`: Current displayed date
- `events`: Appointment/event data for display
- `onDateSelect`: Date selection callback
- `view`: Month/week/day view modes

## A11y Highlights
- **Keyboard**: Arrow key navigation; Enter to select date
- **Screen reader**: Date cells announced; events within cells
- **ARIA**: role="grid"; aria-selected; event content accessible

## Strengths & Gaps
- **Best at**: Appointment scheduling visualization; home service business calendar workflows
- **Missing**: Medium confidence; some details uncertain
