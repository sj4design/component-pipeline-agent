---
system: Nord (Nordhealth)
component: Input (nord-input web component)
url: https://nordhealth.design/components/input/
last_verified: 2026-03-28
confidence: low
---

# Input

## Approach
Nord provides an Input web component for healthcare data entry. Clinical data entry requirements are strict: clear labeling, immediate validation feedback for out-of-range values, and clear distinction between required and optional fields. Healthcare forms enter patient demographics, clinical measurements (blood pressure, weight, height), and appointment data. The component integrates with Nord's form validation pattern across all Nord form components.

## Key Decisions
1. **Web component standard** (HIGH) — Framework portability for diverse healthcare technology stacks.
2. **Clinical validation** (HIGH) — Immediate validation feedback for clinical values (e.g., blood pressure values that are clinically impossible) reduces data entry errors in healthcare records.

## Notable Props
- `value`: input value
- `label`: required visible label
- `type`: HTML input type
- `error`: error message
- `helper-text`: supplementary guidance
- `required`: required indicator
- `disabled` / `readonly`: state props

## A11y Highlights
- **Keyboard**: Native input behavior
- **Screen reader**: Label, helper text, error properly associated
- **ARIA**: aria-invalid, aria-describedby; accessible across screen readers and healthcare AT

## Strengths & Gaps
- **Best at**: Healthcare form patterns; web component portability; accessible label enforcement
- **Missing**: Verify exact API; limited customization compared to React-based systems
