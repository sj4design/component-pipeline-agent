---
system: Dell Design System
component: Checkbox
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Checkbox

## Approach
Dell Design System's Checkbox is used in enterprise configuration forms, product selection, and management workflows. Enterprise IT context means checkboxes appear in configuration option selection and bulk operation selection patterns.

## Key Decisions
1. **Configuration selection** (MEDIUM) — Primary use in enterprise configuration option selection and table row bulk selection.
2. **Indeterminate for bulk select** (LOW) — Likely supports indeterminate state for partial table row selection in management tables.
3. **Form integration** (LOW) — Standard form field integration with label and error.

## Notable Props
- `checked`, `onChange`, `label`, `indeterminate` expected

## A11y Highlights
- **Keyboard**: Space toggle
- **Screen reader**: State announced
- **ARIA**: Standard checkbox ARIA

## Strengths & Gaps
- **Best at**: Enterprise configuration selection; table bulk operations
- **Missing**: Low confidence — verify before use
