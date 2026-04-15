---
system: Evergreen (Segment)
component: Checkbox
url: https://evergreen.segment.com/components/checkbox
last_verified: 2026-03-28
confidence: medium
---

# Checkbox

## Approach
Evergreen's Checkbox is clean and minimal, designed for Segment's analytics dashboard forms and filter panels. It supports the standard states (checked, unchecked, indeterminate) and integrates with Evergreen's color token system. The indeterminate state is relevant for Segment's destination configuration panels where some settings are partially applied.

## Key Decisions
1. **appearance prop** (MEDIUM) — Evergreen checkboxes have an appearance prop that follows the system's intent pattern, allowing the checked fill color to carry semantic meaning in some contexts.
2. **indeterminate** (HIGH) — Three-state support for "select all" patterns in Segment's bulk configuration tables.

## Notable Props
- `checked` / `onChange`: controlled state
- `indeterminate`: three-state support
- `label`: visible label
- `disabled`: disabled state
- `isInvalid`: error state

## A11y Highlights
- **Keyboard**: Space toggles; Tab focuses
- **Screen reader**: label association; aria-checked="mixed" for indeterminate
- **ARIA**: Standard checkbox ARIA; isInvalid adds aria-invalid

## Strengths & Gaps
- **Best at**: Clean minimal design for B2B dashboards; indeterminate for bulk selection
- **Missing**: No CheckboxGroup; limited visual customization
