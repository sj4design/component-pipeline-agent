---
system: Spectrum (Adobe)
component: Checkbox / CheckboxGroup
url: https://react-spectrum.adobe.com/react-spectrum/Checkbox.html
last_verified: 2026-03-28
---

# Checkbox

## Approach

Adobe Spectrum approaches the checkbox through the lens of its three-layer architecture: React Spectrum (opinionated components), React Aria (behavior + accessibility primitives), and React Stately (state management). The checkbox is not just a visual component — it is a behavioral contract built on top of `useCheckbox` and `useCheckboxGroup` hooks, which means every accessibility behavior, keyboard interaction, and ARIA attribute is managed separately from the visual styling. This separation exists because Adobe ships products across wildly different surfaces (Creative Cloud desktop, web apps, Acrobat) and needs the same accessibility guarantees regardless of which visual skin is applied. The result is that Spectrum's checkbox is among the most accessibility-hardened in the Tier 1 cohort, with explicit handling of indeterminate state persistence, dual validation modes, and mandatory label requirements enforced at the API level. The `CheckboxGroup` is a separate, first-class component — not a pattern built with raw checkboxes — because grouping carries distinct ARIA semantics that Spectrum refuses to leave to the developer to get right.

## Key Decisions

1. **Indeterminate state is strictly presentational and persists** (HIGH) — Setting `isIndeterminate` renders the mixed visual but does not cause the checkbox to toggle to checked/unchecked when clicked; the indeterminate state persists until the prop is explicitly cleared. This is deliberate: in hierarchical selections, the parent's state must be determined by its children, not by a user click on the parent itself. Allowing a click to resolve indeterminate to checked would corrupt the parent-child relationship.

2. **Dual validation modes: `"aria"` vs `"native"`** (HIGH) — The `validationBehavior` prop lets developers choose between ARIA-based validation (error is announced but does not block form submission — useful for real-time UX) and native HTML5 validation (blocks submission — useful for simple forms). This decision reflects Spectrum's cross-product reality: some surfaces use native form submission, others use fully custom submission pipelines, and neither should compromise the other's UX.

3. **`isEmphasized` for two visual weight tiers** (MEDIUM) — The `isEmphasized` prop switches the checked state from a neutral gray to Adobe blue. The rationale is that not all checkboxes in Adobe products carry the same visual importance — a preference setting checkbox should not compete visually with a high-stakes action confirmation checkbox. The prop provides a deliberate mechanism to signal hierarchy without changing semantics.

4. **`isReadOnly` as distinct from `isDisabled`** (MEDIUM) — A read-only checkbox remains focusable and is included in the tab order, unlike a disabled one which is removed from focus. This matters for screen reader users: a disabled checkbox cannot be discovered without visual inspection, whereas a read-only checkbox can be reached, its current value read, and its non-interactivity understood from the accessible state.

5. **Separate `CheckboxGroup` component** (HIGH) — Rather than leaving developers to wire up `<fieldset>` and `<legend>` manually, Spectrum makes grouping a formal component. This ensures `role="group"` + `aria-labelledby` are always applied correctly, RTL label flipping happens at the group level, and `isRequired` / `isDisabled` / `isInvalid` cascade consistently to all children.

## Notable Props

- `isIndeterminate`: Represents whether a parent checkbox is in mixed-child-state — explicitly scoped to that semantic use case in the docs, discouraging misuse as a simple "partially done" indicator.
- `validationBehavior`: The toggle between `"aria"` and `"native"` validation modes — represents Spectrum's recognition that form architecture varies across Adobe products and the component must not assume a submission model.
- `isEmphasized`: Switches checked-state color from neutral to brand blue — represents Spectrum's two-tier visual hierarchy for selection controls.
- `UNSAFE_className` / `UNSAFE_style`: Escape hatches for custom styling, explicitly prefixed with `UNSAFE_` to signal to developers that bypassing Spectrum's style system carries a maintenance risk and may break across version upgrades.

## A11y Highlights

- **Keyboard**: Space toggles the checkbox; Tab/Shift+Tab moves focus. Within a `CheckboxGroup`, all checkboxes are part of the natural tab sequence (no arrow-key navigation within groups, unlike radio buttons).
- **Screen reader**: The component is built on a native `<input type="checkbox">`, so checked/unchecked state is announced by default. `isInvalid` triggers an error message region linked via `aria-describedby`. Indeterminate state is surfaced as `aria-checked="mixed"`. Groups use `role="group"` with the group label announced before individual checkbox labels.
- **ARIA**: `aria-checked="mixed"` for indeterminate; `aria-invalid="true"` for validation errors; `aria-required` on both individual checkboxes and groups; `aria-labelledby` wired to visible label or enforced `aria-label` fallback. RTL is handled automatically — no `dir` attribute manipulation required by the consumer.

## Strengths & Gaps

- **Best at**: Accessibility completeness and the separation of behavior from visual styling — the `useCheckbox` / `useCheckboxGroup` hooks can be composed into any visual system while guaranteeing WCAG 2.1 AA compliance.
- **Missing**: No size variants — Spectrum's checkbox exists in a single size, which can be limiting in dense data table contexts where a smaller checkbox would reduce visual noise without harming legibility.
