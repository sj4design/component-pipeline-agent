---
system: GOV.UK Design System
component: Radios
url: https://design-system.service.gov.uk/components/radios/
last_verified: 2026-03-28
confidence: high
---

# Radios

## Approach
GOV.UK Radios are among the most research-backed radio button implementations anywhere. Like checkboxes, they use large touch targets, full-width clickable label rows, and the fieldset/legend pattern for grouping. GOV.UK's radio guidance is extensive: when to use radios vs checkboxes vs selects, how to order options, how to word labels, and when to use inline vs stacked layout. The component supports conditional reveal (showing additional fields when an option is selected) and dividers between options.

## Key Decisions
1. **"Or" divider between options** (HIGH) — Radios support a divider element between options with text like "or". Used in government forms where options are mutually exclusive but semantically distinct (e.g., "By email" / "or" / "By post"). This visual separation improves comprehension for complex choices.
2. **Conditional reveal** (HIGH) — Selecting a radio can reveal additional form fields specific to that choice. This is built into the component and uses progressive enhancement (works with/without JavaScript).
3. **Inline variant** (MEDIUM) — For short option labels (Yes/No, 2-3 options), radios can be displayed side-by-side with the `"inline"` class. GOV.UK's guidance recommends inline only for short labels and when there are just 2-3 options.

## Notable Props
- `items[].text`: option label
- `items[].hint.text`: per-option hint text
- `items[].conditional.html`: content revealed on selection
- `items[].divider`: shows an "or" divider before this item
- `idPrefix`: prefix for option IDs
- `inline`: boolean for horizontal layout

## A11y Highlights
- **Keyboard**: Arrow keys navigate within group; Tab enters/exits; native fieldset/legend pattern
- **Screen reader**: `<fieldset>` + `<legend>` provides group label; each radio has its own `<label>`; conditional reveal section connected via aria-controls
- **ARIA**: Minimal ARIA needed; native radio group semantics are most accessible

## Strengths & Gaps
- **Best at**: Conditional reveal; "or" divider; extensive usage guidance; large touch targets
- **Missing**: No radio card pattern; very conservative visual design compared to commercial systems
