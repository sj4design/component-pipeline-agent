---
system: Material Design 3
component: Checkbox
url: https://m3.material.io/components/checkbox/overview
last_verified: 2026-03-28
---

# Checkbox

## Approach

Material Design 3 treats the checkbox as a fundamental selection control built around its dynamic color system and the M3 state-layer model. Rather than relying on native browser inputs, M3 renders a fully custom component so it can express the full M3 color token palette — the checked fill maps to `colorPrimary`, the container outline to `colorOnSurface`, and the checkmark icon to `colorOnPrimary` — ensuring the component shifts coherently when a theme is applied. The design philosophy is that checkboxes should communicate clear hierarchy: a single standalone checkbox communicates a binary on/off truth, while parent-child groupings communicate partial states through the indeterminate visual, reducing the user's need to scan every child. Error state is treated as a first-class citizen rather than a form-layer concern, meaning the checkbox itself carries the error color (`colorError`) so validation feedback is immediate and co-located with the input that failed. The entire component is sized to meet M3's minimum 48×48 dp touch target, even though the visible box is smaller, reflecting M3's philosophy that touch targets must never sacrifice reachability for visual compactness.

## Key Decisions

1. **Custom rendering over native input** (HIGH) — M3 replaces the browser's native checkbox with a custom-rendered component so it can fully participate in M3's dynamic color system. Native checkboxes cannot respond to `colorPrimary` or theme overlays, so custom rendering is the only path to full theme consistency across Android, Web, and Flutter implementations.

2. **Independent error state on the component** (HIGH) — Unlike most systems that delegate error state to a wrapping form field, M3 exposes `app:errorShown` (Android) as a direct attribute on the checkbox. This is intentional: it enables checkboxes used outside of form contexts — such as in data tables or settings panels — to still communicate validation failure without requiring a parent form wrapper.

3. **Three-state model (checked / unchecked / indeterminate)** (HIGH) — The indeterminate state is explicitly documented for parent-child selection hierarchies. M3 fixes a historical accessibility bug where the indeterminate visual rendered while the accessibility tree still reported "checked" — the corrected behavior ensures the mixed state is surfaced in the a11y tree, aligning with the native DOM's `indeterminate` property behavior.

4. **48dp minimum touch target with smaller visual box** (MEDIUM) — The visible checkbox container is intentionally smaller than the 48dp touch target. This separation of concerns lets the design remain compact in dense lists while still meeting WCAG's minimum pointer target guidance, a tradeoff M3 names explicitly in its accessibility foundations.

5. **Token-based theming via `app:buttonTint` / `app:buttonIconTint`** (MEDIUM) — Rather than exposing discrete color props, M3 channels all visual customization through two tint attributes that accept color tokens. This keeps the surface API small and ensures customizations inherit from the theme rather than hardcoding hex values, which would break dynamic color (Material You).

## Notable Props

- `app:errorShown`: Activates the error state directly on the checkbox — represents M3's decision to own validation state at the component level rather than delegating to a form wrapper.
- `app:checkedState`: Accepts `checked`, `unchecked`, or `indeterminate` — exposes the three-state model as a first-class XML attribute rather than requiring programmatic toggling.
- `errorAccessibilityLabel`: Sets the custom string announced by TalkBack in error state — reflects the decision that the error announcement must be author-controlled, since the system cannot infer a meaningful error message from state alone.
- `app:centerIfNoTextEnabled`: When `true` (default), centers an icon-only checkbox in its touch target — acknowledges that label-less checkboxes (used in table rows) are a legitimate pattern that needs explicit layout handling.

## A11y Highlights

- **Keyboard**: Space toggles the checkbox state; Tab advances focus. M3 Web follows native input semantics so browser-native keyboard handling is preserved without re-implementation.
- **Screen reader**: Text labels are automatically surfaced to accessibility services (TalkBack on Android). The error state announcement uses `errorAccessibilityLabel` if set, otherwise falls back to the error color change which is not announced — making `errorAccessibilityLabel` effectively required for accessible error states.
- **ARIA**: The indeterminate state is corrected to surface `aria-checked="mixed"` in the accessibility tree (a historical bug fix). The component uses a native `<input type="checkbox">` on Web, inheriting full browser ARIA semantics. On Android, `MaterialCheckBox` extends `AppCompatCheckBox`, preserving the native accessibility node.

## Strengths & Gaps

- **Best at**: Seamless integration with the M3 dynamic color / Material You theming pipeline — error, checked, and indeterminate states all shift coherently when the user's wallpaper-derived theme changes.
- **Missing**: No built-in CheckboxGroup or label-group component at the M3 spec level — grouping with `<fieldset>`/`<legend>` semantics is left to implementers, creating inconsistency across platforms.
