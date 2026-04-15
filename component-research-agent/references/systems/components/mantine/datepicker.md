---
system: Mantine
component: DatePicker / DatePickerInput
url: https://mantine.dev/dates/date-picker-input/
last_verified: 2026-03-28
confidence: high
---

# DatePickerInput

## Approach
Mantine provides one of the most feature-rich date picking ecosystems of any design system. The `@mantine/dates` package includes DatePickerInput, DateTimePicker, DateRangePickerInput, MonthPickerInput, YearPickerInput, and standalone Calendar — all with consistent APIs. Mantine's approach is to solve every date selection scenario as a first-class component rather than requiring composition. The components use the `@mantine/dates` date library utilities and dayjs for date manipulation, providing excellent localization through dayjs locale plugins.

## Key Decisions
1. **Multiple dedicated components per use case** (HIGH) — Rather than a single configurable DatePicker, Mantine provides separate components for date+time, month-only, year-only, week selection, and range selection. This avoids complex prop conditionals and gives each component a clean, focused API. Teams import only what they need.
2. **dayjs-based with locale support** (HIGH) — Mantine chose dayjs over date-fns for its lighter weight and locale plugin system. The `DatesProvider` component at the app root sets locale, timezone, and week start day globally, so individual components don't need these configured per instance.
3. **Popover + inline modes** (MEDIUM) — `DatePickerInput` wraps `DatePicker` (inline calendar) in a Mantine Popover. Both modes exist as separate exports, allowing dashboards to use the inline calendar and forms to use the input-triggered popover with no code duplication.

## Notable Props
- `type`: `"default" | "range" | "multiple"` — controls selection mode within a single component
- `valueFormat`: dayjs format string for display
- `locale`: override locale per-instance (inherits from DatesProvider)
- `minDate` / `maxDate`: date constraints
- `numberOfColumns`: shows multiple calendar months side by side
- `excludeDate`: function to mark specific dates as disabled
- `getDayProps`: per-day customization callback

## A11y Highlights
- **Keyboard**: Arrow keys navigate dates; Page Up/Down for months; Home/End for week; Tab between calendar/navigation controls
- **Screen reader**: Dates announced with full date string; selected/range states communicated
- **ARIA**: Calendar uses `role="grid"`; `aria-selected`, `aria-disabled` per cell; navigation buttons labeled

## Strengths & Gaps
- **Best at**: Most comprehensive date component suite; week/month/year pickers; numberOfColumns for range selection; getDayProps for custom day rendering
- **Missing**: No built-in time zone conversion UI; fiscal calendar support requires manual implementation
