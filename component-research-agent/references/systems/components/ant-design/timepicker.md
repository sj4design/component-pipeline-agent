---
system: Ant Design
component: TimePicker
url: https://ant.design/components/time-picker/
last_verified: 2026-03-28
---

# Time Picker (Ant Design)

## Approach
Ant Design's TimePicker is the most feature-rich time picker in the Tier 1 landscape. It uses a column-scroll paradigm — three scrollable columns for hours, minutes, and seconds, presented in a dropdown panel triggered by clicking the time input field. This scroll-drum interface is common in Chinese mobile apps (influenced by iOS's UIDatePicker in wheel mode) and reflects Ant Design's Chinese product heritage where this interaction pattern is highly familiar to users. Unlike MD3's dial (spatial-memory based) and Spectrum's segments (keyboard-efficient), the column-scroll approach is optimized for mouse scrolling and touch swiping — it is the fastest paradigm for browsing through time values when the user does not know the exact time they want. Ant Design's TimePicker also provides a unique RangePicker variant (`TimePicker.RangePicker`) that allows selecting a time range with two column-scroll pickers in the same dropdown — used for shift scheduling, store hours, and meeting duration selection in Alibaba's enterprise products. The component integrates with Day.js for value handling (upgraded from Moment.js in v5), making it consistent with Ant Design's DatePicker.

## Key Decisions
1. **Column-scroll (drum picker) interaction model** (HIGH) — The scrollable hour/minute/second columns are optimized for browsing-style selection where the user doesn't have an exact time in mind. This is appropriate for "what time should this meeting start?" but less efficient for "enter 14:37:22" (where Spectrum's segments are superior). The design reflects Alibaba's primary scheduling use case of approximate time selection (selecting a delivery window, setting a reminder) rather than precise timestamp entry.
2. **RangePicker for time ranges** (HIGH) — The `TimePicker.RangePicker` component handles start-and-end time selection in a single interaction surface. No other Tier 1 time picker offers a built-in range variant; others require two separate time pickers. This is driven by Alibaba's logistics and HR scheduling products where selecting shift durations (9:00 AM to 5:00 PM) or service windows in a single interaction reduces the form complexity significantly.
3. **`disabledTime` with granular control** (MEDIUM) — The `disabledTime` prop accepts a function that receives the current value and returns objects specifying which hours, minutes, and seconds are disabled. This granular callback-based approach (vs. simple min/max) enables complex business rules: disabling lunch-hour slots, preventing times in the past, or enforcing available-hours-only selection. This is the most flexible time restriction API in the Tier 1 set.

## Notable Props
- `format`: String format for display (e.g., `"HH:mm"`, `"h:mm a"`, `"HH:mm:ss"`); also controls which columns appear.
- `disabledTime`: Callback returning `{ disabledHours, disabledMinutes, disabledSeconds }` for granular restriction.
- `use12Hours`: Boolean to switch to AM/PM mode — independent of locale, giving explicit developer control.
- `showNow`: Shows a "Now" shortcut button that fills the current time — a productivity feature for time-sensitive form submissions.
- `hourStep` / `minuteStep` / `secondStep`: Integers that skip non-divisible values in columns — e.g., `minuteStep={15}` shows only 0, 15, 30, 45, useful for appointment booking interfaces.

## A11y Highlights
- **Keyboard**: The column-scroll UI is keyboard-accessible via Arrow keys (Up/Down scroll the active column), Tab moves between columns, Enter confirms selection. However, the scroll-drum paradigm is less intuitive for keyboard-only users who are accustomed to either text input or spinner patterns.
- **Screen reader**: The column scroll uses `role="listbox"` for each column with `role="option"` for each time value. The active (highlighted) item is announced via `aria-activedescendant`. Screen reader experience is functional but the column structure is less familiar to AT users than standard time input patterns.
- **ARIA**: `role="combobox"` on the trigger input, `role="listbox"` per column. The three-column layout (hours/minutes/seconds) is announced as three separate listboxes within a composite widget.

## Strengths & Gaps
- **Best at**: Range time selection and granular time restriction — the built-in RangePicker and the `disabledTime` callback API are unique capabilities not found in any other Tier 1 time picker.
- **Missing**: Time zone support (Day.js locale is used for display but no IANA zone-aware value parsing), and the column-scroll paradigm has lower keyboard efficiency for precise time entry compared to Spectrum's segment approach.
