---
system: GitHub Primer
component: Select
url: https://primer.style/components/select
last_verified: 2026-03-28
confidence: high
---

# Select

## Approach
GitHub Primer's Select is a native HTML select wrapper with Primer design token styling. It's used throughout GitHub for simple selection scenarios (repository visibility, language filter, sort order). Primer's Select is part of the FormControl composition pattern, used alongside FormControl.Label and FormControl.Caption for complete accessible form fields.

## Key Decisions
1. **Native select foundation** (HIGH) — Native HTML select for simplicity and accessibility, consistent with GitHub's pragmatic approach to using platform primitives where they suffice.
2. **FormControl composition** (HIGH) — Select is always composed within FormControl which manages label/caption/error associations via React context, ensuring consistent accessible form patterns.
3. **Size variants** (MEDIUM) — small/medium/large sizes matching GitHub's Button and Input size system for visual consistency within form layouts.

## Notable Props
- `size`: "small" | "medium" | "large"
- `disabled`: Disabled state
- `contrast`: Boolean for elevated contrast variant (used on gray backgrounds)
- `validationStatus`: "error" | "success" | "warning" for form validation states

## A11y Highlights
- **Keyboard**: Native select keyboard behavior; type-to-search in options
- **Screen reader**: Native select semantics with option count; FormControl manages label association
- **ARIA**: aria-required from FormControl.Label when required; aria-describedby for caption/error

## Strengths & Gaps
- **Best at**: FormControl composition for accessible label/error wiring; size system alignment with other Primer inputs
- **Missing**: No custom option rendering; no multi-select visual enhancement
