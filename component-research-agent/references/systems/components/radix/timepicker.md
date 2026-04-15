---
system: Radix UI
component: Not available natively
url: https://www.radix-ui.com/primitives/docs/overview/introduction
last_verified: 2026-03-29
confidence: high
---

# Time Picker

## Approach
Radix Primitives and Radix Themes do not include a TimePicker component. This gap is consistent with Radix's avoidance of complex date/time input components at the primitive level — even a DatePicker is absent from Radix Primitives, with teams commonly pairing Radix Popover with third-party calendar libraries (react-day-picker, react-calendar). A time picker compounds the complexity further with locale-specific time formats (12h vs 24h), AM/PM toggling, and minute/second granularity, all of which are highly product-specific requirements. The practical Radix composition for time picking is either a native `<input type="time">` (which provides browser-native time selection with OS-level accessibility), or a custom UI using two/three Radix `Select` components for hours, minutes, and AM/PM, giving full visual control at the cost of rebuilding the interaction model.

## Key Decisions
1. **No native TimePicker primitive** (HIGH) — Time input is a domain-specific form element with significant locale and format complexity; Radix avoids building components that would need to encode locale handling or time zone logic, keeping the library scope UI-interaction-focused rather than data-formatting-focused.
2. **Native input type="time" is the recommended simple path** (HIGH) — The native time input provides free accessibility (keyboard navigation, screen reader support, mobile OS pickers) without any JavaScript, making it the correct default for standard time entry use cases.
3. **Select composition for custom UI** (MEDIUM) — When design requirements demand a custom time picker UI, composing Radix `Select` components for each time segment (hour, minute, period) is the idiomatic Radix pattern, leveraging existing accessible dropdown semantics.

## Notable Props
- No component exists; no props applicable.

## A11y Highlights
- **Keyboard**: Native `<input type="time">` provides Up/Down arrow key navigation between time segments (hours, minutes, AM/PM); each segment is independently adjustable.
- **Screen reader**: Native time input announces as a time input with current value; custom Select compositions rely on each Select's individual role="combobox" announcement.
- **ARIA**: Native time input carries implicit ARIA semantics; for custom implementations, each segment Select uses `role="combobox"` with `aria-label` identifying the segment (e.g., "Hour", "Minute", "AM/PM").

## Strengths & Gaps
- **Best at**: Deferring to the native browser time input, which provides locale-aware formatting, mobile-optimized pickers, and full accessibility with zero implementation cost.
- **Missing**: No styled time picker UI, no time range selection, no timezone support, no integration with date pickers for combined date-time selection — teams with custom design requirements face significant build effort.
