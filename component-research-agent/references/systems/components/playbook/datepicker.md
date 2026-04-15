---
system: Playbook (Power Home Remodeling)
component: DatePicker
url: https://playbook.powerapp.cloud/kits/date_picker
last_verified: 2026-03-28
confidence: medium
---

# DatePicker

## Approach
Playbook is Power Home Remodeling's design system (built by their internal team, sometimes associated with "Power by Kano"). The DatePicker in Playbook follows a custom calendar popover approach, consistent with the system's focus on React and Rails (React on Rails) environments used in their internal CRM and scheduling applications. Given Power Home Remodeling's business context (scheduling home improvement appointments), date picking is a core workflow, and the component is designed for selecting appointment dates with constraint support.

## Key Decisions
1. **Popover calendar approach** (HIGH) — Custom calendar popover gives consistent appearance across their React/Rails application stack and supports the specific date-range constraints needed for appointment scheduling workflows.
2. **Input trigger with formatted display** (MEDIUM) — A text input showing formatted date acts as the trigger, supporting both direct typing and calendar selection, common in CRM scheduling contexts.
3. **Constraint-first design** (MEDIUM) — Min/max date and disabled date patterns are first-class features because scheduling systems require blocking past dates or unavailable slots.

## Notable Props
- `value`: Controlled date value
- `minDate` / `maxDate`: Date constraint boundaries
- `onChange`: Selection callback
- `placeholder`: Input placeholder text for empty state

## A11y Highlights
- **Keyboard**: Arrow key navigation through calendar days; Enter to select; Escape to close
- **Screen reader**: Dates announced with full label; disabled dates marked appropriately
- **ARIA**: Calendar region labelled; selected date communicated via state attributes

## Strengths & Gaps
- **Best at**: Scheduling-oriented date selection with constraint support; consistent with Playbook's form field patterns
- **Missing**: Limited public documentation makes some details uncertain; internationalization support unclear
