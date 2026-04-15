---
system: Dell Design System
component: Select
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Select

## Approach
Dell Design System's Select is used in enterprise configuration forms and e-commerce product configuration (selecting server specs, choosing service plans). The enterprise B2B context means selects appear in complex configuration forms with many interdependent options. Limited public documentation means confidence is low.

## Key Decisions
1. **Form system integration** (MEDIUM) — Integrates with Dell's form field system for consistent label/error/validation patterns.
2. **Configuration context** (MEDIUM) — Designed for configuration scenarios with categorized option groups for product/service selection.
3. **Option groups** (LOW) — Grouped options likely supported for categorized server configurations.

## Notable Props
- `value`: Selected value
- `onChange`: Callback
- `options`: Option array

## A11y Highlights
- **Keyboard**: Standard select keyboard behavior expected
- **Screen reader**: Label/error association expected
- **ARIA**: Standard select/combobox ARIA expected

## Strengths & Gaps
- **Best at**: Enterprise configuration selection; Dell form system integration
- **Missing**: Low confidence — verify before use in research
