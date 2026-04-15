---
system: Chakra UI
component: NumberInput
url: https://v2.chakra-ui.com/docs/components/number-input
last_verified: 2026-03-29
confidence: high
---

# NumberInput

## Approach
Chakra UI provides a NumberInput component with built-in increment/decrement stepper buttons, min/max clamping, precision control, and keyboard stepping. It is one of the most feature-complete components in the Chakra library, present in both v2 and v3. The component uses a compound pattern: `NumberInput` (root, manages value state), `NumberInputField` (the text input), and `NumberInputStepper` containing `NumberIncrementStepper` and `NumberDecrementStepper`. This composability allows teams to omit the stepper buttons entirely (using just `NumberInput` + `NumberInputField`) for a plain numeric text field, or include only one stepper button if needed.

## Key Decisions
1. **Compound stepper architecture** (HIGH) — Stepper buttons are separate child components, not built into the input. This means teams can omit them, reorder them, or style them independently. Most NumberInput implementations in other systems (e.g., Mantine) couple the steppers tightly to the input — Chakra's compound pattern is more flexible.
2. **String-based value** (HIGH) — NumberInput uses string values internally (not numbers) to preserve the exact input string during editing (e.g., "1." or "1.0" before the user finishes typing). The `onChange` callback receives `(valueAsString, valueAsNumber)` — teams typically use `valueAsNumber` for form submission but `valueAsString` for display.
3. **Clamping behavior** (MEDIUM) — The `clampValueOnBlur` prop (default true) clamps the entered value to min/max on blur. Setting `keepWithinRange` to false allows the displayed value to exceed limits during typing, only enforcing on submit. These options cover both strict (financial forms) and lenient (estimation tools) numeric input scenarios.
4. **Step and precision** (MEDIUM) — `step` controls the increment amount for stepper buttons and arrow key presses. `precision` controls decimal places. Both are independent — a step of 0.5 with precision of 1 increments cleanly. This combination is important for currency inputs (step=0.01, precision=2) and percentage sliders (step=5, precision=0).

## Notable Props
- `value` / `defaultValue` / `onChange`: controlled/uncontrolled value
- `min` / `max`: range constraints
- `step`: increment/decrement amount (default 1)
- `precision`: decimal places to display
- `clampValueOnBlur`: boolean — clamp to range on blur (default true)
- `keepWithinRange`: boolean — prevent typing out-of-range values
- `isReadOnly`, `isDisabled`, `isInvalid`: input states
- `format` / `parse`: custom value formatting/parsing

## A11y Highlights
- **Keyboard**: Arrow Up/Down increments/decrements by `step`; Page Up/Down by 10× step; Home goes to min, End goes to max
- **Screen reader**: Input announces current value; stepper buttons have `aria-label="Increment"` / `aria-label="Decrement"`
- **ARIA**: `role="spinbutton"` on the input; `aria-valuemin`, `aria-valuemax`, `aria-valuenow` attributes; `aria-invalid` on error state

## Strengths & Gaps
- **Best at**: Full-featured numeric input with compound architecture; string-based value handling for clean editing; comprehensive keyboard support; custom format/parse functions
- **Missing**: No built-in currency symbol prefix/suffix (requires custom InputGroup wrapper); no range slider variant; no separate integer-only enforcement (teams must handle via `step` + `precision=0`)
