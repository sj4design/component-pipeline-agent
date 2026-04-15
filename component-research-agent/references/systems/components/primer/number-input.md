---
system: GitHub Primer
component: NumberInput (via TextInput type=number)
url: https://primer.style/components/text-input
last_verified: 2026-03-28
confidence: medium
---

# Number Input

## Approach
GitHub Primer handles numeric input through TextInput with type="number". A dedicated NumberInput component is not confirmed. GitHub's use cases for numeric input include repository count limits, timeout configurations, and CI job concurrency settings — none requiring custom stepper UI.

## Key Decisions
1. **TextInput type="number"** (HIGH) — Standard number input via TextInput's type prop, consistent with Primer's approach of using native input types.
2. **FormControl composition** (HIGH) — Integrates with FormControl for label/caption/error association.
3. **No custom stepper** (MEDIUM) — Native browser spinbutton controls without custom +/- buttons.

## Notable Props
- `type="number"` on TextInput
- `min`, `max`, `step`: Native constraints
- Standard TextInput/FormControl props

## A11y Highlights
- **Keyboard**: Arrow keys for increment/decrement; native spinbutton
- **Screen reader**: Spinbutton announcement; min/max communicated
- **ARIA**: Native spinbutton; FormControl provides label

## Strengths & Gaps
- **Best at**: FormControl integration; GitHub's specific numeric input needs
- **Missing**: No custom stepper buttons; medium confidence on full API
