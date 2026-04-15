---
system: Polaris (Shopify)
component: Checkbox
url: https://polaris.shopify.com/components/selection-and-input/checkbox
last_verified: 2026-03-28
---

# Checkbox

## Approach

Shopify's Polaris treats the checkbox as a merchant-facing control that must prioritize clarity, positive framing, and operational confidence. The system's philosophy begins with the content layer: labels are required and must use positive language ("Publish store" not "Hide store") because merchants interacting with settings that affect their storefront revenue need unambiguous cause-and-effect understanding. Polaris also explicitly documents that checkboxes are for independent options — they should not imply a relationship between selections unless the indeterminate state is in use, at which point a parent-child selection pattern is being expressed. The component deliberately stays close to native input semantics while augmenting them with Polaris's own state system: the `checked="indeterminate"` string value (rather than a boolean) is a Polaris-specific API that maps to `aria-checked="mixed"` underneath, chosen because it makes the third state explicit in JSX rather than relying on a developer remembering to call `.indeterminate = true` in an effect. The error and helpText props make validation feedback co-located with the control, reducing the cognitive distance between what failed and why.

## Key Decisions

1. **Labels are required and positively framed** (HIGH) — Polaris enforces a `label` prop (not optional) and its content guidelines require positive framing for all checkbox labels. This comes from merchant research showing that double-negatives in settings ("Don't disable notifications") cause misconfiguration errors that directly impact store operations. The `labelHidden` prop exists as a visual-only escape hatch for table/grid contexts while preserving the accessible label.

2. **`checked="indeterminate"` as a string rather than a separate `isIndeterminate` boolean** (MEDIUM) — Polaris uses a single `checked` prop accepting `true | false | "indeterminate"` instead of separate boolean props. This keeps the state model on a single prop and makes JSX scanning unambiguous — you can read the indeterminate state in JSX the same way you read checked/unchecked without knowing to look for a second prop.

3. **Error as a string prop directly on the component** (HIGH) — The `error` prop accepts a string message that appears below the checkbox with error styling. Unlike Carbon which scopes errors to groups, or Spectrum which uses `isInvalid` + a separate error message region, Polaris makes individual checkbox error messages a first-class API. This reflects Shopify's merchant UX context: merchants often need per-checkbox inline guidance (e.g., "You must accept terms to continue") not a group-level error.

4. **`helpText` for persistent contextual guidance** (MEDIUM) — Polaris includes a `helpText` prop that renders a secondary description below the label. In e-commerce settings panels, many options have non-obvious consequences ("This will apply to all sales channels") that require inline explanation. The helpText is always visible, not a tooltip, because hover-dependent patterns fail on touch interfaces used by mobile merchants.

5. **`bleed` spacing props for responsive margin control** (LOW) — Polaris exposes `bleedBlockStart`, `bleedBlockEnd`, `bleedInlineStart`, `bleedInlineEnd` to control negative spacing on each side independently. This exists because Polaris checkboxes are often embedded in card and list components with their own internal padding, and adjusting only one axis of spacing prevents the layout from collapsing unintentionally.

## Notable Props

- `checked`: Accepts `true | false | "indeterminate"` — represents Polaris's choice to model three-state as a unified prop rather than splitting checked and indeterminate into separate concerns.
- `error`: String error message rendered below the checkbox — represents the merchant-oriented design decision to keep validation messaging co-located and per-control, not just per-group.
- `helpText`: Persistent secondary description — acknowledges that merchant-facing settings controls often require inline documentation, not just a label.
- `labelHidden`: Visually hides the label while retaining accessibility — the safety valve for table/grid layouts where column headers provide contextual meaning.
- `onChange(newChecked, id)`: Returns both the new state and the checkbox id — a convenience decision that avoids developers having to maintain separate closure references to the id when handling group logic.

## A11y Highlights

- **Keyboard**: Tab / Shift+Tab for focus movement; Space to toggle. Native `<input type="checkbox">` semantics are preserved, so browser-native keyboard handling is not re-implemented.
- **Screen reader**: `checked="indeterminate"` maps to `aria-checked="mixed"` so screen readers announce the mixed state. The `error` string is linked via `aria-describedby`, so the error message is announced after the checkbox label when the field has focus. `helpText` is also linked via `aria-describedby`.
- **ARIA**: `aria-checked="mixed"` for indeterminate state; `aria-describedby` links both `helpText` and `error` content; `aria-controls` can link a checkbox to the elements it controls (documented for bulk selection use cases); unique `id` is generated if not supplied, ensuring label association is never broken.

## Strengths & Gaps

- **Best at**: Merchant-context UX design — the combination of mandatory positive-framed labels, per-checkbox error messages, and helpText persistent guidance makes this system's checkbox the most complete for settings and consent use cases.
- **Missing**: No size variants — Polaris offers a single size, which is appropriate for its admin UI context but means the component cannot adapt to dense data table environments where a smaller checkbox would reduce visual weight.
