---
system: Base Web (Uber)
component: Not available natively
url: https://baseweb.design/components/input/
last_verified: 2026-03-29
confidence: high
---

# Number Input

## Approach
Base Web does not have a dedicated NumberInput component with increment/decrement stepper buttons. Instead, the standard Input component is used with `type="number"`, relying on the browser's native stepper affordance. This reflects Base Web's design scope: Uber's core product surfaces (ride requests, delivery flows, operational dashboards) rarely require precise numeric steppers — quantities, distances, and prices are either auto-calculated or entered via freeform text. Where a stepper is needed in an internal tool, teams compose a solution using Base Web's Input alongside the Button or icon-button pattern, but no official recipe is provided.

## Key Decisions
1. **Browser-native number input** (HIGH) — Using `<input type="number">` with Base Web's Input styling delegates stepper rendering to the browser, avoiding a custom implementation for a rare use case.
2. **No stepper UI component** (HIGH) — Styled increment/decrement buttons are not part of the system; their absence reduces API surface and maintenance burden for a pattern that appears infrequently in Uber's product contexts.
3. **Input override system as escape hatch** (MEDIUM) — Teams that need custom steppers can use Input's `endEnhancer` slot to inject stepper icons, composing the desired UI from existing primitives.

## Notable Props
- N/A — uses standard `Input` component with `type="number"`.
- `min`, `max`, `step`: passed through to the native input via `inputProps`.

## A11y Highlights
- **Keyboard**: Browser handles Up/Down arrow key increment for `type="number"` inputs.
- **Screen reader**: Native `<input type="number">` is announced with numeric role; `min`/`max` may be read by some readers.
- **ARIA**: Teams building custom steppers must add `role="spinbutton"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.

## Strengths & Gaps
- **Best at**: Simple freeform numeric text entry with Base Web's consistent input styling.
- **Missing**: No stepper buttons, no increment/decrement callbacks, no built-in min/max enforcement UI; custom composing required for full spinner pattern.
