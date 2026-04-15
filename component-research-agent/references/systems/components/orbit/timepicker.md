---
system: Orbit (Kiwi.com)
component: Not available natively
url: https://orbit.kiwi/components/
last_verified: 2026-03-29
confidence: high
---

# Time Picker

## Approach
Orbit does not include a TimePicker component. In Kiwi.com's travel booking interface, time selection is never implemented as a clock-face or hour/minute picker. Departure and arrival time preferences in the flight search are expressed through range sliders — users drag a slider from "00:00" to "23:59" to filter flights by departure window, which is a more intuitive interaction for "I want a morning flight" than typing or spinning through individual hour/minute values. For the small number of non-booking contexts where a specific time might be entered (e.g., ground transportation pickup time in an ancillary product), native browser `<input type="time">` is used directly, as it provides platform-appropriate time entry (clock keyboard on iOS, spinner on Android, text input on desktop) without requiring a custom component. The result is that no use case in Orbit's product surface requires a custom TimePicker widget.

## Key Decisions
1. **Time-range slider for flight filtering** (HIGH) — Filtering flights by departure time window is far more natural as a continuous range interaction than as two discrete time pickers; the slider model better matches how travelers think about time preferences.
2. **Native input for exact time entry** (HIGH) — Where a specific time value is needed, native `<input type="time">` provides the best platform-native experience on each device type, without requiring Orbit to maintain a complex cross-platform time picker.
3. **Ancillary products use external solutions** (LOW) — Products adjacent to the core booking flow (airport transfers, hotel check-in time selection) use vendor-provided UIs rather than Orbit primitives, further reducing the need for a custom TimePicker.

## Notable Props
- N/A — component not present in Orbit.

## A11y Highlights
- **Keyboard**: N/A (no component); native `<input type="time">` has full keyboard support built in.
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: A custom styled TimePicker. Teams needing one outside Orbit's standard use cases should use native `<input type="time">` or a library like react-time-picker, styled with Orbit's design tokens.
