---
system: Orbit (Kiwi.com)
component: Radio
url: https://orbit.kiwi/components/radio/
last_verified: 2026-03-28
confidence: medium
---

# Radio

## Approach
Orbit's Radio is used in Kiwi.com's booking forms for mutually exclusive selections: trip type (one-way/return/multi-city), seat type preferences, and ticket class. The component is mobile-first with large touch targets appropriate for travel booking on smartphones.

## Key Decisions
1. **info tooltip per option** (MEDIUM) — Like Orbit's Checkbox, Radio supports an `info` prop for contextual explanations. Travel options like fare rules need explanation.
2. **hasError** (MEDIUM) — Error state for validation, important when a radio selection is required before proceeding in the booking flow.

## Notable Props
- `value`, `checked`, `onChange`
- `label`: visible label
- `info`: supplementary tooltip content
- `hasError`: error state
- `disabled`: disabled option

## A11y Highlights
- **Keyboard**: Arrow navigation within group; roving tabindex
- **Screen reader**: radio role; label associated; error state communicated
- **ARIA**: Standard radio ARIA

## Strengths & Gaps
- **Best at**: info per option; mobile travel booking patterns; error validation
- **Missing**: No Radio.Group component in Orbit's API — must manage grouping manually
