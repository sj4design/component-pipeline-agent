---
system: Mantine
component: TimeInput (@mantine/dates)
url: https://mantine.dev/dates/time-input/
last_verified: 2026-03-29
confidence: high
---

# TimePicker (TimeInput)

## Approach
Mantine provides TimeInput in the `@mantine/dates` package — a text-based time input that renders as a standard Mantine input field with a clock icon. Unlike a dropdown-based time picker, TimeInput uses an `<input type="time">` under the hood, presenting the browser's native time picker on interaction. The component integrates with Mantine's form system (`@mantine/form`), supports min/max time constraints, and has the same visual styling and size variants as other Mantine inputs. The `@mantine/dates` package also includes TimePicker (v7+) — a more advanced custom time picker with separate hour/minute/second scroll wheels for a native-app-style time selection experience.

## Key Decisions
1. **Two time components: TimeInput vs TimePicker** (HIGH) — `TimeInput` wraps native `<input type="time">` for form-style time entry (fast keyboard entry, browser native). `TimePicker` (added in v7) provides a scroll-wheel picker for interfaces where a touch-friendly visual time selector is preferred (scheduling apps, mobile-first UIs). Teams choose based on whether keyboard entry or visual selection is the primary interaction mode.
2. **Separate package from core** (HIGH) — Time components live in `@mantine/dates` alongside DatePicker, Calendar, and DateTimePicker. This keeps the core package lean. The dates package has its own dependencies (dayjs) and must be installed separately: `npm install @mantine/dates dayjs`.
3. **Seconds support** (MEDIUM) — Both TimeInput and TimePicker support seconds precision via the `withSeconds` prop. This is useful for logging tools, stopwatch UIs, and scientific data entry where sub-minute precision matters. Most scheduling UIs use only hours and minutes.
4. **Form integration** (MEDIUM) — Both components work with `form.getInputProps('fieldName')` from `@mantine/form`. TimeInput works directly since it's built on Mantine's Input. TimePicker requires using the `value`/`onChange` pattern explicitly, as its value is a time string in HH:MM(:SS) format.

## Notable Props
TimeInput:
- `value` / `defaultValue` / `onChange`: time string in HH:MM format
- `minTime` / `maxTime`: restrict selectable range
- `withSeconds`: include seconds in the input
- `leftSection`: for the clock icon (default not included — consumer adds)

TimePicker (v7):
- `value` / `onChange`: time string
- `format`: `"12"` | `"24"` — 12 or 24 hour format
- `withSeconds`: include seconds wheel
- `minutesStep`: granularity of minutes wheel

## A11y Highlights
- **Keyboard**: TimeInput: native keyboard time editing (arrow keys for hours/minutes, type numbers); TimePicker: arrow keys scroll wheel values
- **Screen reader**: TimeInput: announced as time input by browser; TimePicker: scroll wheels announced as spinbuttons or listboxes depending on implementation
- **ARIA**: TimeInput: native `<input type="time">` ARIA handled by browser; TimePicker: custom ARIA for scroll wheel interaction

## Strengths & Gaps
- **Best at**: Two-tier approach (keyboard-first TimeInput + visual TimePicker); @mantine/form integration; seconds support; 12/24 hour format; date+time combined via DateTimePicker
- **Missing**: TimeInput's native picker appearance varies by browser/OS; TimePicker requires @mantine/dates package install; no time zone support built in
