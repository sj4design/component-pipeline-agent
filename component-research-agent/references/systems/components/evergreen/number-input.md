---
system: Evergreen (Segment/Twilio)
component: Not available natively
url: https://evergreen.segment.com/components/
last_verified: 2026-03-29
confidence: high
---

# Number Input

## Approach
Evergreen does not include a dedicated NumberInput component with increment/decrement stepper buttons. Numeric values in Segment's configuration UI — API call limits, sampling rates, event counts, retry thresholds — are entered via Evergreen's standard `TextInput` with `type="number"`, relying on the browser's native number input behavior (keyboard up/down arrows, scroll-to-increment) rather than providing custom stepper buttons. This decision reflects that Segment's numeric inputs are typically free-form values (often large integers or decimals) where a stepper increment of +1 would be impractical — users type "500000" for an event volume limit rather than clicking a stepper 500,000 times. For the small set of cases where bounded integer selection is needed (e.g., retry count 1-10), `TextInput` with `min`/`max`/`step` props provides sufficient control without requiring a dedicated NumberInput component.

## Key Decisions
1. **Free-form numeric entry over stepper** (HIGH) — Segment's numeric configuration values span wide ranges (rate limits, thresholds, counts) where a stepper widget provides no practical UX benefit over direct keyboard entry.
2. **Native `type="number"` delegation** (HIGH) — Browser-native number inputs handle decimal/integer constraints, min/max validation, and keyboard increment behavior without requiring Evergreen to maintain a custom implementation.
3. **No bounded small-integer use cases at scale** (MEDIUM) — Unlike quantity selectors in e-commerce or timing pickers, Segment's UI has no repeated need for a small-integer stepper that would justify the component investment.

## Notable Props
- N/A — no NumberInput component. Use `TextInput` with `type="number"` and `min`/`max`/`step` attributes.

## A11y Highlights
- **Keyboard**: N/A (no component); native `type="number"` supports arrow key increment/decrement natively.
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: A styled NumberInput with stepper buttons for bounded integer contexts. Teams needing a custom stepper should compose from Evergreen's `TextInput` and `IconButton` components, or use a dedicated library.
