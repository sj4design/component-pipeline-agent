---
system: Gestalt (Pinterest)
component: Checkbox
url: https://gestalt.pinterest.systems/web/checkbox
last_verified: 2026-03-28
confidence: medium
---

# Checkbox

## Approach
Gestalt's Checkbox is used for multi-select lists in Pinterest's advertising platform and settings screens. The component supports checked, unchecked, and indeterminate states and follows Gestalt's pattern of requiring accessible labels. The checkbox uses Pinterest's brand styling (Pinterest red for the checked state) and integrates with Gestalt's form validation system.

## Key Decisions
1. **Required label** (HIGH) — The `label` prop is required (can be hidden via `labelDisplay="hidden"` for table checkboxes) but always present for accessibility. This mirrors Gestalt's TextField philosophy of mandatory labels.
2. **indeterminate state** (HIGH) — Supported for table/list "select all" patterns used in Pinterest's ad management tables.
3. **size prop** (MEDIUM) — `"sm"` and `"md"` sizes for different density contexts — small for table rows, medium for settings forms.

## Notable Props
- `id`: required for accessibility
- `label`: required accessible label
- `checked` / `onChange`: controlled state
- `indeterminate`: boolean for mixed state
- `size`: `"sm" | "md"`
- `labelDisplay`: `"visible" | "hidden"` — visually hide label while keeping accessible

## A11y Highlights
- **Keyboard**: Space toggles; Tab focuses
- **Screen reader**: Required label ensures accessible name; aria-checked="mixed" for indeterminate
- **ARIA**: labelDisplay="hidden" keeps accessible label without visual clutter in tables

## Strengths & Gaps
- **Best at**: Required label enforcement; labelDisplay for table contexts; size system for density
- **Missing**: No CheckboxGroup component; no tree-selection pattern
