---
system: Material Design 3
component: No dedicated Form component — form patterns documented as guidelines
url: https://m3.material.io/components/text-fields/guidelines
last_verified: 2026-03-28
---

# Form (Pattern, Not Component)

## Approach

Material Design 3 deliberately does not ship a Form container component. This is an intentional architectural stance, not an oversight. M3's philosophy is that the design system owns the visual language of individual components — text fields, checkboxes, radio buttons, selects — and that form layout, submission logic, and validation orchestration belong to the application or framework layer. The reasoning is platform-agnostic: M3 targets Android, iOS, Flutter, and web simultaneously, and a form container would necessarily encode assumptions about one platform's event model that would not translate cleanly to others. Instead, M3 provides rich per-field components with built-in error states, supporting text, and required indicators, and trusts developers to compose them. This means every team using M3 must design their own form architecture — which creates consistency risk across products but preserves maximum flexibility.

The closest thing M3 offers is the `md-filled-text-field` and `md-outlined-text-field` web components, which integrate natively with browser constraint validation. Fields in a standard HTML `<form>` will validate on submission via `reportValidity()`, or developers can call `textField.reportValidity()` manually. The material-web implementation also supports a manual `error` + `error-text` attribute path for application-managed validation state. What M3 does not provide: cross-field validation, form-level error summaries, required field legends, layout utilities for arranging fields, or a submit handler pattern. All of that is left as an exercise for the implementer.

## Key Decisions

1. **No Form container component** (HIGH) — M3 treats form architecture as application-level concern, not design-system concern. The WHY: M3 serves Android, iOS, Flutter, and Web. A Form component encoding React's synthetic event model or Android's focus traversal would break the cross-platform contract. By defining only field-level components, M3 stays platform-neutral. The cost is that every team builds their own form composition layer.

2. **Field-level error state, not form-level** (HIGH) — Errors live on individual `md-text-field` elements via the `error` boolean and `error-text` attribute. There is no mechanism for a form to collect all field errors and display a summary. The WHY: This matches M3's component-isolation philosophy. It also matches how native HTML form validation works — `reportValidity()` focuses the first invalid field and shows a browser tooltip, which is inherently per-field. Adopting a form-level error summary would require the form container that M3 doesn't ship.

3. **Supporting text swaps to error text on invalid** (MEDIUM) — The `supporting-text` slot and the `error-text` attribute are mutually exclusive in display. When a field is in error state, error text replaces supporting text rather than appearing alongside it. The WHY: This avoids the layout shift that would occur if error text appeared as an additional line. The design system assumes one line of below-field helper/error text is the correct affordance. The tradeoff is that helpful context text (e.g., "Use your work email") disappears precisely when users most need guidance — when they've made an error.

4. **Floating label as required convention** (MEDIUM) — M3 mandates floating labels as the primary labeling pattern. Labels start inline with the input and float above when focused or filled. The WHY: Floating labels preserve vertical space compared to top-aligned static labels, which matters for dense mobile UIs. The tradeoff is well-documented: floating labels create ambiguity about whether the field is filled or not on first glance, and they can cause issues with password managers and autofill.

5. **Required asterisk is developer-supplied** (LOW) — The `required` HTML attribute causes the browser to block submission and show a validation indicator, but the asterisk (*) that sighted users expect next to required field labels is not automatically rendered. The documentation shows it must be manually included in the `supporting-text` attribute (`supporting-text="*required"`). The WHY: M3 leaves the exact convention (asterisk, "(required)" text, or marking optional instead) to the product team. This is flexible but creates inconsistency across M3-based products.

## Notable Props/API

- `error`: Boolean that activates the field's visual error state — important because it decouples visual error display from native browser validation, enabling server-side errors to be shown after form submission without requiring a browser validation failure.
- `error-text`: The error message string displayed below the field when `error` is true. Unlike ARIA-injected error messages, this renders as visible text, so it is inherently screen-reader accessible without additional attributes.
- `supporting-text`: Helper text shown below the field in normal state. Replaced visually by `error-text` when in error state — developers must be aware this disappears.
- `required`: Native HTML attribute; triggers browser constraint validation and adds asterisk to floating label by default (though the asterisk can be suppressed via CSS).
- `reportValidity()`: Imperative method on the custom element to trigger validation programmatically — the primary hook for form-level validation without a submit event.

## A11y Highlights

- **Keyboard**: No form-level keyboard management. Individual fields support standard focus navigation. Tab moves between fields; Enter submits when inside a form element following native browser behavior. No Arrow key navigation between fields.
- **Screen reader**: `error-text` is rendered as visible text in the DOM and will be read by screen readers. However, M3 does not automatically inject `aria-live` for error announcements — errors on other fields that become visible after a partial validation event will not be announced unless the developer adds live regions manually.
- **ARIA**: The `md-text-field` component auto-manages `aria-invalid` in sync with the `error` property. `aria-required` is set from the `required` attribute. The component currently does not support `aria-labelledby` (labeled explicitly in the documentation as unsupported), which limits integration with external label elements and forces use of the built-in `label` attribute.

## Strengths & Gaps

- **Best at**: Per-field visual polish — the floating label, supporting/error text swap, and filled/outlined variants are the most visually refined field states of any Tier 1 system's form components.
- **Missing**: Any form-level architecture whatsoever — no layout utilities, no cross-field validation, no error summary pattern, no required field legend convention, and no submission handling abstraction.
