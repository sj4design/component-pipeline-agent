---
system: REI Cedar
component: Checkbox
url: https://cedar.rei.com/components/checkbox
last_verified: 2026-03-28
confidence: medium
---

# Checkbox

## Approach
REI Cedar's Checkbox is a Vue component used in REI's e-commerce filters, account preferences, and checkout options. The accessibility-first design ensures WCAG 2.1 AA compliance. Cedar provides CheckboxGroup for filter panels (multi-select product attribute filters) which is a key REI e-commerce use case.

## Key Decisions
1. **E-commerce filter use case** (HIGH) — Checkbox and CheckboxGroup are central to REI's faceted product filtering (size, color, brand checkboxes in filter panels).
2. **Mobile touch sizing** (HIGH) — Checkbox size and spacing optimized for touch interaction given REI's mobile commerce audience.
3. **Indeterminate support** (MEDIUM) — For hierarchical category filtering patterns.

## Notable Props
- `checked`: Controlled state
- `disabled`: Disabled state
- `indeterminate`: Partial state

## A11y Highlights
- **Keyboard**: Space toggles; Tab focus
- **Screen reader**: Checked state; group label via fieldset/legend
- **ARIA**: aria-checked; fieldset/legend for group; aria-disabled

## Strengths & Gaps
- **Best at**: E-commerce filter panels; mobile-optimized sizing; Vue implementation
- **Missing**: Medium confidence; advanced feature details uncertain
