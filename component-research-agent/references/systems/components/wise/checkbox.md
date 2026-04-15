---
system: Wise Design
component: Checkbox
url: https://wise.design/components/checkbox
last_verified: 2026-03-28
confidence: low
---

# Checkbox

## Approach
Wise's Checkbox is used for terms acceptance, preference selection, and feature opt-ins in their financial product. Clean visual styling consistent with Wise's minimal aesthetic. Standard checkbox behavior with form integration.

## Key Decisions
1. **Terms/consent use case** (MEDIUM) — Primary use for accepting terms, privacy consent, and feature opt-ins in onboarding flows.
2. **Clean visual** (MEDIUM) — Minimal checkbox styling consistent with Wise's product aesthetic.
3. **Validation state** (LOW) — Error state for unchecked required checkboxes in form submission.

## Notable Props
- `checked`: State
- `onChange`: Callback
- `label`: Label text

## A11y Highlights
- **Keyboard**: Space toggle
- **Screen reader**: State announced
- **ARIA**: Standard checkbox ARIA

## Strengths & Gaps
- **Best at**: Consent and preference checkboxes in financial onboarding
- **Missing**: Low confidence — limited public documentation
