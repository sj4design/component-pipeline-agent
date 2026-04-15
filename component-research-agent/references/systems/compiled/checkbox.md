---
component: checkbox
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Checkbox — All Systems Digest

## Material Design 3
**Approach**: Custom rendering for full M3 dynamic color participation (colorPrimary, colorError, etc.). Error state first-class on the component (not delegated to form wrapper). Three-state model corrected to surface aria-checked="mixed" properly. 48dp touch target with smaller visual box.
**Key decisions**:
- Custom rendering (not native); only way to respond to colorPrimary theme overlays across Android/Web/Flutter
- `errorShown` on component itself (not form wrapper); enables error on checkboxes in tables/panels outside forms
- 48dp touch target, smaller visual — separates reachability from visual compactness per WCAG minimum pointer target
**Notable API**: `app:errorShown`; `app:checkedState` (checked|unchecked|indeterminate); `errorAccessibilityLabel` (required for accessible error announcement); `centerIfNoTextEnabled`
**A11y**: aria-checked="mixed" fixed (historical bug corrected); errorAccessibilityLabel effectively required since color change alone isn't announced; native `<input>` on Web preserves browser ARIA.
**Best at**: Dynamic color/Material You theming coherence across error/checked/indeterminate states. **Missing**: No CheckboxGroup with fieldset/legend; grouping left to implementers.

## Spectrum (Adobe)
**Approach**: Built on useCheckbox/useCheckboxGroup hooks (React Aria) — behavior fully decoupled from styling. isIndeterminate is strictly presentational and persists (doesn't toggle on click). CheckboxGroup is a first-class separate component. isReadOnly keeps checkbox focusable (unlike isDisabled).
**Key decisions**:
- Indeterminate persists on click; parent state must be determined by children, not by user clicking parent
- Dual validation modes: `validationBehavior="aria"` (advisory, doesn't block) vs. `"native"` (blocks submission)
- `isEmphasized` switches checked color neutral→brand blue; signals hierarchy without changing semantics
**Notable API**: `isIndeterminate`; `validationBehavior` (aria|native); `isEmphasized`; `isReadOnly` (focusable, distinct from isDisabled); `UNSAFE_className` (escape hatch)
**A11y**: WCAG 2.1 AA compliance via hooks layer; aria-checked="mixed"; aria-invalid + aria-describedby; CheckboxGroup uses role="group"+aria-labelledby; RTL auto-handled.
**Best at**: A11y completeness and behavior/styling separation via hooks layer. **Missing**: No size variants; single size only.

## Carbon (IBM)
**Approach**: Group-first — error/warning at group level, not per-checkbox. Generates fieldset/legend automatically (not left to developer). Three sizes (sm=16px/md=20px/lg=24px) via v11 unified density system. warn state alongside error for "unusual but allowed."
**Key decisions**:
- Error/warning at group level; enterprise form failures are group-level (not per-item) — one actionable message is clearer
- Auto-generated fieldset/legend prevents the common dev error of using div+p for grouping without semantic structure
- sm/md/lg consistent with all Carbon v11 form components; communicates density changes systematically
**Notable API**: `invalid`/`invalidText` and `warn`/`warnText` (group-level); `size` (sm|md|lg); `hideLabel` (visually hides for table context while preserving a11y); `indeterminate`
**A11y**: fieldset/legend: SR announces group name before each checkbox label; aria-checked="mixed" for indeterminate; aria-describedby links group helper/error/warning text.
**Best at**: Enterprise group-level validation UX — warn+error+helper text with stable layout. **Missing**: No isReadOnly on individual checkboxes (distinct from disabled).

## Polaris (Shopify)
**Approach**: Labels required + positive language required (merchant research: double-negatives cause misconfiguration of storefront settings). Per-checkbox `error` string prop (not group-only). `helpText` always visible (not tooltip — touch interfaces). `checked="indeterminate"` as string value.
**Key decisions**:
- Labels required, positive framing required; merchants misconfigure settings when labels have double-negatives
- Per-checkbox `error` string; merchants need per-option inline guidance (e.g., "must accept terms to continue")
- `helpText` always visible (never tooltip); hover-dependent patterns fail on mobile merchants' touch devices
**Notable API**: `checked` (true|false|"indeterminate"); `error` (string, per-checkbox); `helpText` (persistent description); `labelHidden` (visual only); `onChange(newChecked, id)` (returns id for group logic)
**A11y**: aria-checked="mixed" for indeterminate string; aria-describedby links both helpText and error; native `<input>` preserves browser semantics; auto-generated id ensures label association never breaks.
**Best at**: Merchant settings/consent UX — mandatory positive labels, per-checkbox errors, always-visible helpText. **Missing**: No size variants; single size only.

## Atlassian
**Approach**: is* Boolean props mirror ARIA states directly (isChecked→aria-checked, isInvalid→aria-invalid). Recommends isInvalid+error message over isDisabled for unusable options — disabled elements invisible to some SR configurations. isIndeterminate separate from isChecked (mirrors DOM spec). CheckboxSelect variant for 20-100+ option lists.
**Key decisions**:
- `isInvalid` over `isDisabled` for permission-gated options; disabled can be invisible to SR, invalid is always discoverable with reason
- Boolean is* props mirror ARIA vocabulary; reduces mental model overhead for engineers managing both API and accessibility tree
- `isIndeterminate` separate boolean (mirrors DOM) vs. Polaris's string value — more direct DOM model reflection
**Notable API**: `isInvalid`; `isIndeterminate` (separate from isChecked); CheckboxSelect (searchable dropdown variant for large option lists)
**A11y**: 2024-2025 accessibility work resolved 6,000+ issues; aria-checked="mixed"; aria-invalid; role="group"+aria-labelledby for groups; no arrow-key roving tabindex (multi-select semantics don't imply it).
**Best at**: Accessibility-first API design — isInvalid-over-isDisabled stance and ARIA-mirroring prop names. **Missing**: No size variants; single size constrains density adaptation.

## Ant Design
**Approach**: Error state entirely delegated to Form.Item (no isInvalid on Checkbox itself). indeterminate scoped to "check all" pattern specifically. Checkbox.Group supports options array (data-driven from server response). classNames/styles function-form for state-aware conditional styling.
**Key decisions**:
- No per-checkbox error; all validation in Form.Item — architectural stance that validation context belongs to form layer
- `indeterminate` documented for flat "select all" + group (not arbitrary depth trees); reflects data-table-heavy target use cases
- `options` array API for Checkbox.Group; maps server response directly to checkboxes without per-item JSX
**Notable API**: `indeterminate` (boolean, manages separately from `checked`); `classNames`/`styles` (object or function receiving state); `valuePropName="checked"` on Form.Item (explicit bridge, not auto-detected)
**A11y**: aria-checked="mixed" fixed (changelog: corrected SR regression); native `<input>` semantics; Form.Item provides aria-describedby for error linkage; disabled via aria-disabled or native disabled attribute.
**Best at**: Data-driven Checkbox.Group and Form integration. **Missing**: No per-checkbox error state; standalone checkboxes outside Form need manual ARIA wiring for validation.
