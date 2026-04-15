---
system: Gestalt (Pinterest)
component: DatePicker
url: https://gestalt.pinterest.systems/web/datepicker
last_verified: 2026-03-28
confidence: medium
---

# DatePicker

## Approach
Gestalt's DatePicker is built to serve Pinterest's advertising and analytics platforms, where date selection is primarily used for campaign date ranges and performance reporting windows. The component is built on top of react-datepicker and integrates with Gestalt's design token system. It supports single date selection and date range selection, with the range mode being particularly polished for the advertiser workflow where users set campaign start/end dates. The component follows Gestalt's overall philosophy of being visually opinionated while providing enough flexibility for different product contexts.

## Key Decisions
1. **Built on react-datepicker** (HIGH) — Gestalt chose to wrap an existing library rather than build calendar logic from scratch. This trades some API flexibility for faster development and proven date arithmetic. The wrapper adds Gestalt styling and accessibility improvements on top.
2. **Range mode for advertiser workflows** (HIGH) — Date range selection is a primary use case because Pinterest's ad platform requires campaign scheduling. The range picker shows two months side by side when selecting a range, which Pinterest found reduces cognitive load in campaign date selection.
3. **Localization via locale prop** (MEDIUM) — Supports date-fns locale objects for international ad markets. Pinterest's global advertiser base requires correct date formatting for different regions.

## Notable Props
- `id`: required for accessibility binding
- `label`: visible label text
- `rangeStartDate` / `rangeEndDate`: range selection state
- `onRangeStartChange` / `onRangeEndChange`: range callbacks
- `minDate` / `maxDate`: constraint dates
- `localeData`: date-fns locale object

## A11y Highlights
- **Keyboard**: Arrow navigation on calendar grid; Enter to select
- **Screen reader**: Labels connected to input via `htmlFor`; calendar grid is labeled
- **ARIA**: Inherits react-datepicker ARIA implementation with Gestalt enhancements

## Strengths & Gaps
- **Best at**: Range selection for reporting/campaign use cases; two-month range view
- **Missing**: react-datepicker dependency is large; limited calendar customization without fighting the wrapper layer
