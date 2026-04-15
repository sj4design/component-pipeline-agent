---
system: Mantine
component: NumberInput
url: https://mantine.dev/core/number-input/
last_verified: 2026-03-29
confidence: high
---

# NumberInput

## Approach
Mantine's NumberInput is one of the most feature-rich numeric input implementations in any design system. It provides increment/decrement stepper buttons, configurable step size, min/max clamping, decimal precision, prefix/suffix, thousands separator formatting, and a custom value parser/formatter. Built entirely without third-party dependencies, the component handles edge cases like decimal entry in progress ("1."), negative values, and large number formatting. In Mantine v7+, NumberInput was rebuilt using the Mantine `@mantine/hooks` primitive for improved performance and to support the cleaner value handling model.

## Key Decisions
1. **String display, number value** (HIGH) — The component stores the display string separately from the numeric value. `onChange` receives `number | string` — a string when the input is in an intermediate state (e.g., "-" before typing a negative number, or "1." before the decimal digit). Teams must handle both types, typically accepting the string for display and only saving the number on form submission.
2. **Steppers on right side** (HIGH) — Both increment and decrement steppers are stacked vertically on the right side of the input (up arrow above, down arrow below). This is the most common stepper layout in desktop UIs (matching browser's native number input and Excel) and is visually compact.
3. **Thousands separator and prefix/suffix** (HIGH) — Built-in formatting: `thousandSeparator=","` formats large numbers; `prefix="$"` and `suffix="%"` add units. This makes NumberInput suitable for financial inputs (currency), measurement inputs (px, rem), and percentage fields without needing a custom input wrapper.
4. **`allowNegative` and `allowDecimal`** (MEDIUM) — Explicit boolean props control whether negative values and decimal entry are allowed. The component enforces these constraints at the input level (blocking the keystrokes) rather than just on blur, providing immediate feedback. Setting `allowDecimal={false}` with `step={1}` creates a pure integer input.

## Notable Props
- `value` / `defaultValue` / `onChange`: controlled/uncontrolled
- `min` / `max`: range constraints
- `step`: increment amount (default 1)
- `decimalScale`: maximum decimal places
- `prefix` / `suffix`: text before/after the number
- `thousandSeparator`: format large numbers
- `allowNegative`: allow negative values (default true)
- `allowDecimal`: allow decimal entry (default true)
- `clampBehavior`: `"blur"` | `"strict"` — when to clamp to min/max
- `hideControls`: hide stepper buttons

## A11y Highlights
- **Keyboard**: Arrow Up/Down for increment/decrement; Page Up/Down for 10× step; Home/End for min/max
- **Screen reader**: `role="spinbutton"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`; stepper buttons have `aria-label`
- **ARIA**: Full spinbutton ARIA pattern; `aria-invalid` when error state; stepper buttons keyboard-accessible

## Strengths & Gaps
- **Best at**: Most complete numeric input in T3 systems; built-in formatting (currency, thousands, units); no dependencies; handles intermediate input states correctly
- **Missing**: No time/date stepping (for time inputs use Mantine TimeInput); no graphical range slider mode (separate Slider component for that)
