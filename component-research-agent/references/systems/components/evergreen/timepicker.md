---
system: Evergreen (Segment/Twilio)
component: Not available natively
url: https://evergreen.segment.com/components/
last_verified: 2026-03-29
confidence: high
---

# Time Picker

## Approach
Evergreen does not include a TimePicker component. Segment's analytics and customer data platform is built around date range selection for querying historical data — users select a date range (last 7 days, last 30 days, custom start/end date) to scope their analytics views. Time-of-day precision is not a user-facing configuration in Segment's core product: queries run over full days, audiences are computed on daily schedules, and event timestamps are stored in UTC and displayed in the user's local timezone without requiring users to specify an hour/minute filter. The absence of a TimePicker reflects the data product's day-granularity query model. Evergreen provides a DatePicker component for date selection, but no time component because the product has no confirmed use case for user-facing time-of-day configuration.

## Key Decisions
1. **Day-granularity analytics model** (HIGH) — Segment's analytics queries operate at day granularity for most use cases (daily active users, weekly funnel completion); sub-day time filtering is not exposed as a user-configurable option in the core product.
2. **UTC-normalized data display** (HIGH) — Event timestamps are stored and queried in UTC; displaying and filtering by wall-clock time-of-day would introduce timezone complexity with no offsetting product benefit for Segment's B2B analytics audience.
3. **DatePicker covers the relevant use case** (MEDIUM) — Evergreen's DatePicker handles date range selection (the only temporal configuration users need); adding TimePicker would extend temporal precision beyond what the data model exposes to users.

## Notable Props
- N/A — component not present in Evergreen.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: A TimePicker. Teams using Evergreen for scheduling tools or sub-day time configuration should use native `<input type="time">` styled with Evergreen tokens, or integrate a dedicated library such as react-time-picker.
