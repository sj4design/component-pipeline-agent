---
system: Radix UI
component: Not available natively
url: https://www.radix-ui.com/primitives/docs/overview/introduction
last_verified: 2026-03-29
confidence: high
---

# Number Input

## Approach
Radix Primitives does not include a NumberInput component, and Radix Themes does not add one either. A number input with increment/decrement stepper buttons is considered a composed pattern rather than a primitive interaction model in Radix's taxonomy. The WAI-ARIA `spinbutton` role covers the semantics of a number input with stepper controls, but Radix's bar for creating a primitive is whether the accessibility behavior is too complex or non-obvious to implement correctly without library support. Because `<input type="number">` natively implements the `spinbutton` role with arrow key increment/decrement, min/max enforcement, and step behavior, there is minimal ARIA complexity to abstract. Teams using Radix typically use `<input type="number">` directly or compose a custom spinner using two `Button` components from Radix Themes alongside a controlled text input, manually wiring the increment/decrement logic.

## Key Decisions
1. **No native NumberInput primitive** (HIGH) — Native `<input type="number">` already carries `role="spinbutton"`, keyboard increment/decrement (Up/Down arrows), min/max/step attributes, and browser-native validation, making a Radix wrapper redundant from an accessibility standpoint.
2. **Custom stepper button composition is the pattern** (MEDIUM) — When native number input controls are visually unsatisfactory, teams compose a `<input type="text" inputmode="numeric">` with Radix Themes `IconButton` components for +/-, manually managing the value and clamp logic to get full visual control.
3. **No shared clamping or step utilities** (MEDIUM) — Value clamping, step snapping, and precision control are data concerns that Radix intentionally leaves to application logic or external numeric utilities (e.g., imask, react-number-format).

## Notable Props
- No component exists; no props applicable.

## A11y Highlights
- **Keyboard**: Native `<input type="number">` supports Up/Down arrow keys to increment/decrement by the `step` value; Page Up/Down for larger jumps in some browsers; Home/End for min/max.
- **Screen reader**: `role="spinbutton"` is announced natively; `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` are required for custom spinbutton implementations.
- **ARIA**: `role="spinbutton"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-valuetext` for custom implementations; increment/decrement buttons need accessible labels (`aria-label="Increment"` / `aria-label="Decrement"`).

## Strengths & Gaps
- **Best at**: Deferring to native browser number input, which provides the most cross-platform consistent spinbutton behavior and avoids reinventing browser-native functionality.
- **Missing**: No styled stepper UI, no built-in currency/unit formatting, no mouse scroll-to-increment, no precision/decimal control utilities — all common requirements in forms that teams must build or source from other libraries.
