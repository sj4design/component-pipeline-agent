---
system: Orbit (Kiwi.com)
component: Checkbox
url: https://orbit.kiwi/components/checkbox/
last_verified: 2026-03-28
confidence: medium
---

# Checkbox

## Approach
Orbit's Checkbox is used in booking forms for add-on selections (checked baggage, seat selection, travel insurance), terms agreement, and passenger preferences. The component is mobile-first with large touch targets appropriate for the travel booking context. Orbit checkboxes follow a clean, minimal style consistent with Kiwi.com's consumer-facing aesthetic.

## Key Decisions
1. **hasError and info states** (MEDIUM) — Orbit checkboxes support `hasError` for validation (required checkbox not checked) and an `info` tooltip for additional context on what the checkbox means. Travel checkboxes often need explanation (what does "flexible booking" actually include?).
2. **disabled state for unavailable options** (MEDIUM) — Travel add-ons may be unavailable for specific routes or fare types. The disabled state communicates this clearly.

## Notable Props
- `checked` / `onChange`: controlled state
- `label`: required accessible label
- `hasError`: boolean for validation error
- `info`: help text for the checkbox
- `disabled`: disabled state

## A11y Highlights
- **Keyboard**: Space toggles; Tab focuses
- **Screen reader**: Label always associated; error state communicated
- **ARIA**: aria-checked; aria-invalid when hasError

## Strengths & Gaps
- **Best at**: info prop for travel option explanations; mobile-first touch targets; booking context use cases
- **Missing**: No indeterminate state; no CheckboxGroup; limited to simple binary selection
