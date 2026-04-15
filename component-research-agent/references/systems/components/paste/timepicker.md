---
system: Twilio Paste
component: TimePicker (via Input)
url: https://paste.twilio.design/components/input
last_verified: 2026-03-28
confidence: medium
---

# TimePicker

## Approach
Twilio Paste handles time input via its standard Input component with type="time", using the native HTML time input. Like the DatePicker's native input[type=date] approach, this provides native browser time picking UI (browser time picker) without a custom time selection widget. Native input[type=time] opens a time picker in modern browsers.

## Key Decisions
1. **Native input[type=time]** (HIGH) — Consistent with Paste's native input philosophy; native time picker provides mobile time selection wheels and desktop time input without custom implementation.
2. **Step attribute for granularity** (MEDIUM) — step attribute controls time increment granularity (step=3600 for hour-only selection, step=60 for minute precision).
3. **24h vs 12h format** (MEDIUM) — Browser handles locale-appropriate time format display; Paste doesn't override this.

## Notable Props
- `type="time"` on Input
- `min` / `max`: Time range constraints
- `step`: Time increment in seconds

## A11y Highlights
- **Keyboard**: Native time input keyboard behavior; arrow keys adjust segments; Tab between hour/minute/AM-PM segments
- **Screen reader**: Native time input role; current time value announced
- **ARIA**: Native time input semantics; label via FormField

## Strengths & Gaps
- **Best at**: Native accessibility; no custom ARIA needed; mobile time picker wheels
- **Missing**: No dedicated TimePicker component; native browser time input appearance varies significantly across browsers
