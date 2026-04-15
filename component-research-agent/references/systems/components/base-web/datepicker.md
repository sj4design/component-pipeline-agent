---
system: Base Web (Uber)
component: Datepicker
url: https://baseweb.design/components/datepicker/
last_verified: 2026-03-28
confidence: medium
---

# Datepicker

## Approach
Base Web's Datepicker is a comprehensive date selection component built to handle Uber's global operational needs — multiple timezones, range selection for ride scheduling, and high-density information displays. It ships as a feature-complete component with both popover and inline display modes, range selection, time selection integration, and locale support. The component follows Base Web's "Overrides" pattern, which allows deep customization of any internal sub-component without forking. This makes it one of the most flexible date pickers in the ecosystem.

## Key Decisions
1. **Overrides pattern for customization** (HIGH) — Rather than props for every visual variation, Base Web exposes an `overrides` object that lets consumers replace any internal styled sub-component. This reflects Uber's need to have a single component serve wildly different product surfaces (driver app, rider app, operations dashboard) without maintaining multiple forks.
2. **Range selection built-in** (HIGH) — Single and range modes are first-class features, not afterthoughts. Uber's operations tools frequently need date ranges for reporting and scheduling, so range selection is part of the core API rather than a separate component.
3. **Timezone awareness** (MEDIUM) — The component supports `timezone` prop for displaying and selecting dates in a specific timezone. This addresses a real Uber use case where dispatchers in one timezone manage drivers in another.

## Notable Props
- `value`: single date or `[Date, Date]` array for range
- `range`: boolean — enables range selection mode
- `timeSelectStart` / `timeSelectEnd`: adds time pickers for range endpoints
- `minDate` / `maxDate`: date constraints
- `overrides`: deep customization of any internal element
- `locale`: date-fns locale object for formatting

## A11y Highlights
- **Keyboard**: Arrow keys navigate calendar grid; Page Up/Down change month; Enter selects date
- **Screen reader**: Calendar role="grid" with labeled rows and cells; selected dates announced
- **ARIA**: `aria-selected` on date cells; month/year navigation buttons labeled; range state communicated

## Strengths & Gaps
- **Best at**: Range selection; timezone support; Overrides pattern for deep customization
- **Missing**: Documentation is less detailed than competitors; some edge cases in range + time selection require workarounds
