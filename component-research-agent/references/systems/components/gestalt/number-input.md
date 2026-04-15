---
system: Gestalt (Pinterest)
component: Not available natively
url: N/A
last_verified: 2026-03-29
confidence: high
---

# Number Input

## Approach
Gestalt has no dedicated NumberInput component with stepper controls (increment/decrement buttons). Numeric input on Pinterest is handled via TextField with `inputMode="numeric"` and `type="number"`, which provides the appropriate mobile keyboard type and basic numeric input behavior without stepper affordances. This reflects an honest assessment of Pinterest's numeric input use cases: pin counts, dimensions for ad formats, and budget values in business tools do not benefit meaningfully from stepper buttons. Users entering ad budgets of $500 or image dimensions of 1000x1500px would find +/- steppers impractical for reaching their target value. Direct text input with appropriate validation is more efficient for these large-range numeric values. For constrained numeric choices (e.g., selecting a count from 1–5), Pinterest uses SelectList or a RadioGroup, which are more explicit and mobile-friendly than a stepper pattern.

## Key Decisions
1. **TextField with `inputMode="numeric"` is the recommended pattern** (HIGH) — Pinterest's numeric inputs typically have wide ranges where steppers are impractical (budget: $0–$100,000; dimensions: 1–10,000). Direct input with validation is faster and more accurate than increment/decrement buttons.
2. **No stepper controls** (HIGH) — Stepper buttons are a desktop-oriented pattern that is cumbersome on mobile touch interfaces. Pinterest's mobile-first mandate means patterns that work poorly on touch screens are deprioritized at the component system level.
3. **Mobile numeric keyboard via `inputMode`** (HIGH) — Using `inputMode="numeric"` on TextField triggers the numeric keyboard on iOS and Android, which is the correct mobile affordance for numeric entry without implementing a custom component.
4. **Constrained choices use SelectList or RadioGroup instead** (MEDIUM) — When the numeric range is small and discrete (e.g., 1–10 items per row), Gestalt's SelectList provides a more predictable mobile interaction than a number input with steppers.

## Notable Props
- N/A — No dedicated NumberInput component. Use `<TextField type="number" inputMode="numeric" />` with `min`, `max`, and `step` HTML attributes passed through TextField's `type` prop.

## A11y Highlights
- **Keyboard**: N/A for a dedicated component. TextField with `type="number"` provides browser-native up/down arrow key increment behavior.
- **Screen reader**: N/A for a dedicated component. Standard TextField labeling applies; numeric field role is inferred from `type="number"`.
- **ARIA**: N/A for a dedicated component. `aria-valuemin`, `aria-valuemax`, `aria-valuenow` would need to be added manually by consuming code if a spinner role is desired.

## Strengths & Gaps
- **Best at**: N/A as a dedicated component. TextField handles straightforward numeric input adequately for Pinterest's wide-range use cases.
- **Missing**: No stepper control for use cases that genuinely benefit from fine increment/decrement (e.g., font size, quantity selectors in potential future e-commerce features, zoom level controls); no built-in min/max/step validation with error messaging integrated at the component level; no currency or percentage formatting overlays for budget inputs in ads tools.
