---
system: Base Web (Uber)
component: TimePicker
url: https://baseweb.design/components/timepicker/
last_verified: 2026-03-29
confidence: high
---

# TimePicker

## Approach
Base Web provides a TimePicker component built on top of the Select component, rendering time options as a searchable dropdown list at configurable intervals (default 30 minutes). This approach, rather than a clock face or text field, reflects Uber's primary use case: scheduling pickups, delivery time slots, and business hour configurations where discrete time slots are the meaningful input — a driver dispatch time of "2:43 PM" is less useful than "2:30 PM" as a slot boundary. The TimePicker supports 12-hour and 24-hour format and integrates with the Datepicker for combined date-time selection through the DatetimePicker compound component.

## Key Decisions
1. **Dropdown list, not text field or clock** (HIGH) — Time is presented as a selectable list of options at fixed intervals rather than a free-text input or a graphical clock. This ensures valid time values, prevents formatting errors, and aligns with scheduling workflows where discrete slots matter. Teams needing free-form time entry must use a standard Input with type="time" instead.
2. **Configurable step interval** (HIGH) — The `step` prop (in seconds, default 1800 = 30 min) controls the granularity of time options. This covers the range from "every 15 minutes" (900) to "hourly" (3600) that covers most scheduling use cases at Uber. Very fine-grained time entry requires a different approach.
3. **Built on Select** (MEDIUM) — Because TimePicker wraps Select, it inherits the full Select override system, keyboard navigation, searchability, and theming. This is architecturally efficient but means the component has the visual form of a dropdown, not a traditional time picker widget. Teams with users expecting a clock-style picker for touch/mobile will need a different solution.
4. **DatetimePicker compound** (MEDIUM) — The DatetimePicker combines Datepicker + TimePicker in a single compound component for date-time selection. This avoids teams having to manually synchronize two separate controlled components for combined date-time inputs.

## Notable Props
- `value`: `Date | null` — controlled value
- `onChange`: callback receiving selected Date
- `step`: number (seconds) — interval between time options; default 1800
- `format`: `"12"` or `"24"` — time format
- `creatable`: boolean — allows typing a custom time not in the list
- `disabled`, `error`, `positive`: input states
- `overrides`: inherits all Select overrides

## A11y Highlights
- **Keyboard**: Inherits Select keyboard behavior — Enter/Space opens dropdown, arrow keys navigate options, type-ahead filter; Escape closes
- **Screen reader**: Rendered as a combobox with listbox; selected time announced on selection; options announced as user navigates
- **ARIA**: `role="combobox"` on input, `role="listbox"` on dropdown, `role="option"` on each time slot; `aria-selected` on active option

## Strengths & Gaps
- **Best at**: Discrete time slot selection for scheduling workflows; inherits Select's full feature set (searchable, creatable, overridable); natural DatetimePicker integration
- **Missing**: No clock face / graphical time picker for mobile-native feel; no fine-grained time entry for medical/scientific contexts (seconds precision); step interval cannot be mixed (e.g., 15-min slots only in business hours)
