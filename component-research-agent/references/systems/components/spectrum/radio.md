---
system: Adobe Spectrum
component: RadioGroup + Radio
url: https://react-spectrum.adobe.com/react-spectrum/RadioGroup.html
last_verified: 2026-03-28
---

# RadioGroup + Radio

## Approach
Spectrum takes the strongest architectural stance of any Tier 1 system on radio buttons: a Radio cannot exist outside a RadioGroup — full stop. This is an enforced structural rule, not a recommendation. The reasoning is that a lone radio button is semantically meaningless; a radio only makes sense in the context of the mutually exclusive set it belongs to. By making RadioGroup the mandatory parent, Spectrum guarantees that every radio instance has a visible or accessible group label, consistent state management, and proper ARIA grouping — all concerns that other systems leave to developer discipline. This matches Adobe's product philosophy of building guardrails into the component API itself rather than writing documentation asking developers to "remember to wrap." Spectrum also treats accessibility and internationalization as first-class constraints rather than add-ons: RTL layout flips automatically, screen reader strings are locale-aware, and the validation system is designed to integrate with both native HTML forms and custom validation pipelines without extra configuration.

## Key Decisions
1. **Radio is unusable outside RadioGroup** (HIGH) — The component throws if a Radio is rendered without a RadioGroup ancestor. This prevents the common mistake of rendering a standalone radio for a binary yes/no choice (where a checkbox or toggle is semantically more appropriate). The cost is slightly more boilerplate; the benefit is that every usage is structurally sound by construction.

2. **Vertical orientation as default** (MEDIUM) — `orientation="vertical"` is the default, with horizontal as an explicit opt-in. Vertical stacking is the primary use case because it maximizes readability (options are easier to scan top-to-bottom), minimizes accidental selection from mouse proximity, and handles long labels without truncation. Horizontal layouts are legitimately useful in compact filter UIs, but they are the exception, so Spectrum makes them slightly harder to reach.

3. **Two distinct validation modes: native vs. ARIA** (HIGH) — Spectrum supports `validationBehavior="native"` (which blocks form submission using browser constraint validation) and `validationBehavior="aria"` (the default, which uses ARIA attributes for custom error messaging without blocking submission). This dual-mode design reflects that Adobe's products span both traditional multi-page forms (where native validation makes sense) and complex single-page applications (where form submission is handled in JavaScript and native validation would fire at the wrong time).

4. **necessityIndicator controls required state presentation** (MEDIUM) — Rather than always showing a red asterisk, Spectrum lets you choose between showing an icon or the word "required" / "optional". This matters because different locales, audiences, and form contexts have different conventions for how required fields should be communicated. The prop reflects a genuine design decision rather than a superficial styling preference.

5. **isReadOnly as a distinct state from isDisabled** (MEDIUM) — A read-only radio group remains focusable and allows screen readers to navigate through options, while a disabled group is removed from tab order entirely. This distinction matters for review screens, confirmation steps, or locked configurations where users need to read the selection without being able to change it — disabled would make that content inaccessible to keyboard users.

## Notable Props
- `orientation`: Switches between `vertical` (default) and `horizontal` layout; the default signals that vertical is the primary intended use pattern.
- `validationBehavior`: Chooses between `"native"` (HTML5 constraint validation) and `"aria"` (programmatic ARIA-based errors); interesting because it exposes the underlying implementation choice to the consuming developer.
- `necessityIndicator`: Controls whether required state is communicated as `"icon"` or `"label"` — unusual among design systems, which typically hard-code the asterisk convention.
- `isEmphasized`: Applies blue (brand-colored) fill to the selected radio instead of the default gray; used to draw attention to the field or align with specific layout contexts.
- `isReadOnly`: Keeps the group visible and accessible but non-editable; distinct from `isDisabled` which removes the group from interaction entirely.
- `validate`: A callback function `(value) => ValidationError | true | null` enabling custom per-group validation logic with typed return values.

## A11y Highlights
- **Keyboard**: Tab moves focus into the group at the selected radio (or the first if none selected). Arrow Up/Left selects the previous option. Arrow Down/Right selects the next option. Tab again moves focus out of the group. Focus and selection move together within the group.
- **Screen reader**: Announces group label first when focus enters. Each radio announces label and checked state. Error messages are linked via `aria-errormessage` and announced on state change. Locale-aware strings handle international screen reader contexts automatically.
- **ARIA**: `role="radiogroup"` on the wrapper, `role="radio"` on each option, `aria-checked` for selection state, `aria-required` on the group, `aria-errormessage` linking to the error element, `aria-describedby` for description text.

## Strengths & Gaps
- **Best at**: Accessibility completeness and form integration — the combination of enforced structure, dual validation modes, and locale-aware ARIA strings means Spectrum's RadioGroup is the safest choice for complex, internationalized form systems.
- **Missing**: No explicit guidance on maximum option count thresholds, and no built-in sub-grouping for hierarchical option sets (e.g., grouping options by category within one RadioGroup).
