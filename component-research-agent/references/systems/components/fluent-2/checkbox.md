---
system: Fluent 2 (Microsoft)
component: Checkbox
url: https://fluent2.microsoft.design/components/web/react/checkbox/usage
last_verified: 2026-03-28
confidence: high
---

# Checkbox

## Approach
Fluent 2's Checkbox is a styled checkbox component following Fluent's design language. It supports the standard checked/unchecked/indeterminate states and integrates with Fluent's focus ring, spacing, and color tokens. The checkbox is used extensively in Office lists, settings panels, and Teams for multi-item selection. The shape prop distinguishes circular (radio-like) from square checkboxes — an unusual but Office-informed design choice where some lists use circular checkboxes for visual differentiation.

## Key Decisions
1. **shape prop: square vs circular** (MEDIUM) — `shape="circular"` renders a rounded checkbox, used in some Office contexts for visual variety or when checkboxes are inside lists that visually group them with radio buttons. This is a distinctly Microsoft pattern not found in other systems.
2. **labelPosition** (MEDIUM) — `"before"` or `"after"` for label placement. Before (right-to-left style) is needed for some Office property panels where checkboxes are right-aligned with labels on the left.
3. **Mixed (indeterminate) state with explicit API** (HIGH) — `checked="mixed"` uses the string literal "mixed" (consistent with WAI-ARIA aria-checked="mixed") rather than a separate `isIndeterminate` boolean. This is a more API-accurate approach that directly mirrors the ARIA attribute value.

## Notable Props
- `checked`: `boolean | "mixed"` — includes indeterminate via string literal
- `defaultChecked`: uncontrolled initial state
- `onChange`: change callback
- `shape`: `"square" | "circular"`
- `labelPosition`: `"before" | "after"`
- `label`: label content (text or ReactNode)

## A11y Highlights
- **Keyboard**: Space toggles; Tab focus; native checkbox behavior
- **Screen reader**: aria-checked="mixed" for indeterminate; label associated via labelledby
- **ARIA**: "mixed" string aligns with ARIA spec; shape changes visuals only, semantics unchanged

## Strengths & Gaps
- **Best at**: "mixed" string API matching ARIA spec; circular shape for Office list patterns; labelPosition control
- **Missing**: No CheckboxGroup component in core; no tree-select pattern
