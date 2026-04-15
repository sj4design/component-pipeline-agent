---
component: Calendar
tier: 3
last_verified: 2026-03-29
---

# Calendar — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — use react-day-picker | No calendar grid primitive; calendar complexity deferred to specialized libraries; shadcn/ui fills this gap on top of Radix. | high |
| Chakra UI | Calendar (via Ark UI) | Standalone inline calendar via Ark UI/Zag.js state machines; day/month/year view levels; single, range, and multiple selection modes. | medium |
| GOV.UK | Not available — text date input preferred | Consistent with GOV.UK's avoidance of calendar pickers; no calendar component at system level. | high |
| Base Web | Calendar (embedded in Datepicker) | Calendar grid is part of Datepicker; can be extracted for inline use but not designed as a first-class standalone component. | medium |
| Fluent 2 | Calendar | First-class standalone component; work-week (Mon–Fri) mode; week numbers column; full localization strings; used in Outlook and Teams scheduling. | high |
| Gestalt | Calendar (via DatePicker) | No standalone calendar; two-month range view via DatePicker for ad campaign date selection. | medium |
| Mantine | Calendar | First-class standalone in `@mantine/dates`; `getDayProps` callback for per-day customization; `numberOfColumns` for multi-month; all three selection modes. | high |
| Orbit | Calendar (via InputDate, inline) | Always shown inline in booking flow; `renderDay` prop for price/availability data per cell; travel-specific date range selection. | medium |
| Evergreen | Not available — use third-party library | Consistent with no DatePicker; calendar component entirely absent. | medium |
| Nord | Calendar (via Date Picker, healthcare) | Calendar grid part of Date Picker web component; healthcare appointment scheduling context; verify standalone availability. | low |

## Key Decision Patterns

Only Fluent 2 and Mantine provide a truly first-class standalone Calendar component — one that is designed for use independent of a date input trigger. Every other T3 system either embeds the calendar inside a DatePicker component or omits it entirely. This reflects how rare the standalone calendar use case is: most product UIs only need a calendar as a popover for date input, not as a persistent widget.

Mantine's `getDayProps` callback is the most flexible per-day customization mechanism in the T3 set. Rather than providing specific props for "disabled dates," "highlighted dates," "event markers," etc., it uses a single callback that returns arbitrary props for each day cell. This design elegantly handles an open-ended set of customization needs without a pre-specified API. Orbit's `renderDay` serves a similar purpose but is specific to the travel price/availability use case.

The absence of a standalone calendar from GOV.UK, Radix, and Evergreen is the strongest pattern in this component. The pattern is: systems designed for general application building (Radix), systems with strong text-input preferences (GOV.UK), and systems scoped to a specific SPA product (Evergreen) all defer calendar grid rendering elsewhere. Only systems with explicit scheduling use cases (Fluent 2 for Outlook/Teams, Mantine for SaaS, Orbit for travel booking) invest in their own calendar components.

Fluent 2's work-week mode is the only T3 system addressing the enterprise scheduling reality that weekends are irrelevant for most business calendars. This is a meaningful product-context decision that cascades into layout (5 columns instead of 7) and reduces visual noise in meeting scheduling interfaces.

## A11y Consensus

- Calendar grids use `role="grid"` with `role="gridcell"` for day cells — this is the universal ARIA pattern for calendar date grids.
- Arrow keys navigate between cells within the grid; Page Up/Down moves between months; Home/End move to start/end of week — this keyboard pattern is consistent across all systems that implement a calendar.
- Selected, disabled, and today states are communicated via `aria-selected`, `aria-disabled`, and visible visual indicators — color alone is never sufficient.
- Mantine notes that `getDayProps` can add `aria-describedby` to individual cells for rich per-day accessibility context (e.g., price information, event descriptions).
- GOV.UK's deliberate absence of calendar grids reflects the research finding that text date input is more accessible for the diverse UK public; pure calendar-grid date entry is problematic for users with motor impairments and cognitive disabilities.

## Recommended Use

Reference T3 calendar approaches when deciding whether to build a standalone calendar or embed it in a DatePicker, and when designing per-day customization. Mantine's `getDayProps` is the reference for open-ended per-day customization; Fluent 2 is the reference for enterprise scheduling features (work-week mode, week numbers); Orbit is the reference for domain-data-enriched calendars (prices, availability).
