---
system: Ant Design
component: Checkbox
url: https://ant.design/components/checkbox/
last_verified: 2026-03-28
---

# Checkbox

## Approach

Ant Design's checkbox reflects the system's broader "enterprise-grade React" philosophy: a highly composable component with a rich `Checkbox.Group` API, extensive customization through `classNames` and `styles` semantic slot overrides, and a tight integration with Ant Design's `Form` component for validation. Where other systems treat the checkbox as a standalone control with validation built in, Ant Design intentionally delegates error state rendering to the `Form.Item` wrapper — this is a deliberate architectural choice that centralizes validation logic in the form layer rather than scattering it across individual controls. The `indeterminate` prop is specifically documented in the context of "check all" patterns, making its primary documented use case the select-all/deselect-all toggle in data tables and bulk-action interfaces — a reflection of Ant Design's enterprise data management heritage. The system does not provide size variants for the checkbox specifically, which is consistent with Ant Design's convention that checkboxes have a fixed size governed by the global font size token, scaling only with the application's base font size.

## Key Decisions

1. **Error state delegated entirely to `Form.Item`** (HIGH) — Ant Design intentionally does not expose an `isInvalid` or `error` prop on the Checkbox itself. All validation feedback is handled by wrapping the checkbox in a `Form.Item` with `rules` configured. This reflects Ant Design's architectural stance that validation is a form-layer concern: the form has access to the full submission context (which fields are required, what the current values are, async server responses), while an individual checkbox does not. The tradeoff is that standalone checkboxes outside a `Form` context cannot easily show inline errors.

2. **`indeterminate` scoped to "check all" pattern** (HIGH) — The `indeterminate` prop is documented and demoed exclusively in the context of a master checkbox controlling a `Checkbox.Group`. Unlike M3 or Carbon which document indeterminate for hierarchical trees of arbitrary depth, Ant Design scopes the pattern to a flat "select all" + group model. This is a pragmatic decision: the select-all/deselect-all interaction is by far the most common indeterminate use case in the data-table-heavy enterprise apps Ant Design targets.

3. **`Checkbox.Group` as an `options`-array-driven API** (MEDIUM) — `Checkbox.Group` accepts either a flat `options` array (of strings or option objects) or `Checkbox` children directly. The `options` array API exists to make simple group generation declarative and data-driven — developers can map a server response directly to checkboxes without writing JSX for each item. This pattern mirrors Ant Design's Select and Radio.Group APIs, providing a consistent "data → component" model across all selection controls.

4. **`classNames` and `styles` as function or object** (MEDIUM) — Recent Ant Design versions added `classNames` and `styles` props accepting either a static object or a function receiving component props and returning an object. This replaces the previous pattern of overriding global CSS class names. The function form allows conditional styling based on component state (checked, disabled, indeterminate) without requiring external CSS — a reflection of Ant Design's move toward CSS-in-JS and reduced global style side effects.

5. **`valuePropName` bridge for Form integration** (MEDIUM) — Because Ant Design's `Form.Item` binds to `value` by default but the Checkbox uses `checked`, connecting a checkbox to a form requires explicitly setting `valuePropName="checked"` on the `Form.Item`. This is a known friction point that Ant Design documents rather than solves via automatic detection. The decision to keep the mapping explicit preserves the generic Form.Item API without special-casing checkbox semantics at the framework level.

## Notable Props

- `indeterminate`: Boolean — renders the indeterminate visual state for "check all" patterns. Notably does not control `checked`; both props must be managed together by the developer, making the state model explicit.
- `onChange`: Fires with the full event object (`e.target.checked`) — unlike Polaris's `onChange(newChecked, id)`, Ant Design follows standard React event conventions, keeping the API familiar to React developers.
- `classNames` / `styles`: Semantic DOM slot overrides accepting objects or functions — represents Ant Design's shift from global CSS overrides to co-located, state-aware styling.
- `disabled`: Standard boolean — disabling is the only per-checkbox state control; there is no `isReadOnly` or `isInvalid` at the checkbox level, reinforcing the delegation of those concerns to `Form.Item`.

## A11y Highlights

- **Keyboard**: Space to toggle, Tab/Shift+Tab for focus movement. Built on a native `<input type="checkbox">`, so browser-native keyboard handling is inherited without re-implementation.
- **Screen reader**: The `indeterminate` state sets `aria-checked="mixed"` — a fix that was specifically mentioned in Ant Design's changelog as correcting a screen reader regression where indeterminate was announced as "checked." Checked/unchecked state is announced via the native input's accessibility node. Disabled state is exposed via `aria-disabled` or the native `disabled` attribute.
- **ARIA**: `aria-checked="mixed"` for indeterminate; `aria-disabled` for disabled state; `aria-label` / `aria-labelledby` supported for label-less checkboxes in table contexts. Validation errors are rendered by `Form.Item` using `aria-describedby` linking the input to the error message node.

## Strengths & Gaps

- **Best at**: Data-driven `Checkbox.Group` generation and seamless Ant Design `Form` integration — the `options` array API and `Form.Item` `valuePropName` pattern make bulk-selection form groups the easiest to wire up among the Tier 1 systems.
- **Missing**: No per-checkbox error state — the delegation of all validation to `Form.Item` means standalone checkboxes (e.g., a single terms-acceptance checkbox outside a full form) require awkward workarounds to show inline errors.
