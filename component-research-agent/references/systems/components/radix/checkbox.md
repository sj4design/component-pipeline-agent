---
system: Radix UI (WorkOS)
component: Checkbox
url: https://www.radix-ui.com/primitives/docs/components/checkbox
last_verified: 2026-03-28
confidence: high
---

# Checkbox

## Approach
Radix Checkbox is a headless checkbox primitive that replaces the native `<input type="checkbox">` with a fully styleable custom component while preserving all checkbox semantics. The critical feature beyond styling is the `indeterminate` state support — the three-state checkbox (checked, unchecked, indeterminate) required for "select all" patterns in tables. The component composes as Checkbox and Checkbox.Indicator, where the Indicator renders only when the checkbox is checked or indeterminate, allowing separate icons for each state.

## Key Decisions
1. **Three-state support via checked prop** (HIGH) — `checked` accepts `boolean | "indeterminate"`, explicitly modeling the third state. This is critical for tree-selection patterns and "select all" table controls. Native HTML checkboxes support indeterminate only via JavaScript property assignment (not attribute), which Radix handles correctly.
2. **Checkbox.Indicator renders only in checked/indeterminate states** (HIGH) — The Indicator component conditionally renders, allowing different visual content for checked vs. indeterminate (checkmark icon vs. minus icon). This is cleaner than CSS-only approaches that need to show/hide different icons.
3. **Form integration via name/value** (MEDIUM) — Radix Checkbox behaves as a native form element when `name` and `value` props are set, working with native form submission without requiring a form library.

## Notable Props
- `checked`: `boolean | "indeterminate"` — controlled state
- `defaultChecked`: uncontrolled initial state
- `onCheckedChange`: change callback with `boolean | "indeterminate"` value
- `required`: native form requirement
- `name` / `value`: native form integration

## A11y Highlights
- **Keyboard**: Space toggles checkbox state
- **Screen reader**: `role="checkbox"` with `aria-checked="true" | "false" | "mixed"` for indeterminate; label via `<label>` element or `aria-label`
- **ARIA**: `aria-checked="mixed"` for indeterminate state — correctly communicates partial selection to screen readers

## Strengths & Gaps
- **Best at**: Indeterminate state handling; clean Indicator pattern for different state icons; native form integration
- **Missing**: No built-in label; no group pattern for checkbox lists; must compose with label manually
