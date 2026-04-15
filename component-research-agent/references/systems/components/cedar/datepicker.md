---
system: REI Cedar
component: DatePicker
url: https://cedar.rei.com/components/date-picker
last_verified: 2026-03-28
confidence: medium
---

# DatePicker

## Approach
REI Cedar's DatePicker is designed with outdoor retail use cases in mind — primarily rental reservation dates, event registrations, and shipping estimates. The component follows Cedar's accessibility-first philosophy and aligns with REI's commitment to WCAG 2.1 AA compliance. Cedar uses a custom calendar popover built on Vue.js (Cedar is Vue-based), with clear visual emphasis on selected date ranges given REI's rental and trip-planning use cases. The system provides both single date and range selection.

## Key Decisions
1. **Vue-based custom calendar** (HIGH) — Cedar is a Vue design system, so the DatePicker is a Vue component with custom calendar implementation, providing full visual control consistent with REI's brand while maintaining accessibility.
2. **Range selection priority** (HIGH) — Date range selection is a first-class pattern given REI's rental reservation workflows (gear rental start/end dates), not an afterthought.
3. **Accessibility compliance emphasis** (HIGH) — Cedar explicitly targets WCAG 2.1 AA, so the calendar includes full keyboard navigation and screen reader support as core requirements rather than enhancements.

## Notable Props
- `minDate` / `maxDate`: Constrains selectable dates for reservation windows
- `disabledDates`: Array of specific dates to disable (unavailable rental slots)
- `rangeSelect`: Boolean to enable range selection mode
- `placeholder`: Placeholder for the trigger input

## A11y Highlights
- **Keyboard**: Arrow key navigation; Page Up/Down for month navigation; Enter to select; Escape to close
- **Screen reader**: Full date announced on each cell; current selection state communicated
- **ARIA**: role="dialog" on popover; role="grid" on calendar; aria-selected; aria-disabled

## Strengths & Gaps
- **Best at**: Range selection for reservation/booking contexts; strong accessibility baseline; REI-specific use cases well served
- **Missing**: Limited knowledge of exact API surface — confidence medium; time selection not included
