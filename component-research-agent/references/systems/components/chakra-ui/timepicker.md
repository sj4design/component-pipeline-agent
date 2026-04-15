---
system: Chakra UI
component: Not available natively
url: https://v2.chakra-ui.com/docs/components/input
last_verified: 2026-03-29
confidence: high
---

# TimePicker (Absent)

## Approach
Chakra UI does not include a TimePicker component in either v2 or v3. The recommended approach in the Chakra ecosystem is to use a standard HTML `<input type="time">` wrapped in Chakra's `Input` component styling infrastructure. This exposes the browser's native time picker on platforms that support it (all modern browsers render a native time picker for `<input type="time">`) while applying Chakra's visual styling (border, focus ring, color mode). For teams needing more control — such as a dropdown-style time picker, time zone support, or integration with a date-time combined picker — the recommendation is to use a third-party library like `react-time-picker` or to use `@chakra-ui/autocomplete` with generated time options. Chakra's design philosophy of "do less, compose more" applies here: rather than building a bespoke time picker widget that varies by platform and use case, the library defers to native browser inputs or third-party specialized solutions.

## Key Decisions
1. **Native input[type=time] as the recommended pattern** (HIGH) — The HTML `<input type="time">` provides a native, OS-appropriate time picker that is fully accessible, supports keyboard entry, and works with browser autofill. Chakra wraps this in its `Input` component to apply consistent visual styling. This avoids the maintenance burden of a custom time picker that must handle cross-browser differences, locale-specific time formats, and touch vs. keyboard input modes.
2. **Third-party for complex scenarios** (HIGH) — When native `<input type="time">` is insufficient (e.g., time zones, discrete slots, integration with a date range), teams use third-party solutions. The most common pairings in the Chakra ecosystem are `react-datepicker` (which includes time selection) and custom implementations using Chakra's `Select` component with generated time options.
3. **No official roadmap item** (MEDIUM) — As of v3, TimePicker remains absent from the Chakra roadmap. This is consistent with Chakra's approach of not duplicating well-handled native browser behavior. Unlike the absence of complex components (Combobox was added in v3 because the native select is insufficient), time picking via `<input type="time">` is considered "solved" by the browser.

## Notable Props
- No dedicated component; use `<Input type="time">` from `@chakra-ui/react`
- Standard Input props apply: `size`, `variant`, `isDisabled`, `isInvalid`, `isReadOnly`
- `min` / `max` attributes on the underlying input for time range constraints

## A11y Highlights
- **Keyboard**: Native `<input type="time">` has full keyboard support (arrow keys for hours/minutes/AM-PM, type numbers directly)
- **Screen reader**: Announced as a time input by browsers; native time format communicated to AT by the OS/browser
- **ARIA**: `type="time"` provides implicit `role="textbox"` with time input semantics; aria-label or visible label required

## Strengths & Gaps
- **Best at**: Zero-overhead native time input with Chakra visual styling; works out of the box with browser accessibility and autofill; no JavaScript required
- **Missing**: No custom time picker UI for cases needing discrete slots, time zones, or a stylistically consistent non-native widget; native time picker appearance varies significantly across browsers and operating systems
