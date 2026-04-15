---
system: Gestalt (Pinterest)
component: Not available natively
url: N/A
last_verified: 2026-03-29
confidence: high
---

# Form

## Approach
Gestalt has no Form container component. Instead, it takes a composition approach: forms are built by assembling individual Gestalt field components — TextField, SelectList, ComboBox, Checkbox, RadioGroup, DatePicker — within a standard HTML `<form>` element managed by the consuming application. This approach reflects Pinterest's engineering philosophy of keeping the design system focused on atomic, reusable primitives rather than opinionated container patterns. Form-level concerns like validation orchestration, submission handling, error summary management, and field layout are treated as application logic that varies significantly across Pinterest's many different form surfaces (account setup, ad campaign creation, business profile, pin editing). A prescriptive Form wrapper component would constrain this diversity without adding sufficient value. Gestalt provides all the building blocks — consistent field spacing conventions are achieved via Box, and form-level error handling uses BannerSlim alongside field-level `errorMessage` props.

## Key Decisions
1. **No wrapper component — composition over convention** (HIGH) — Pinterest's forms range from single-field inline edits to complex multi-section ad campaign builders. A single Form component cannot accommodate this range without becoming overly complex. Composition with Gestalt primitives + HTML `<form>` is more flexible and maintainable.
2. **Field-level validation is the primary pattern** (HIGH) — Each Gestalt field component (TextField, SelectList, etc.) exposes an `errorMessage` prop for inline validation feedback. This field-level approach is more granular and mobile-friendly than form-level error summaries, and maps to Pinterest's validation UX pattern.
3. **Box handles layout and spacing** (MEDIUM) — Consistent vertical spacing between form fields is achieved using Gestalt's Box component with `gap` or `marginBottom` props. This avoids encoding spacing opinions into a Form wrapper that might not fit all contexts.
4. **Submit triggers come from Button component** (MEDIUM) — Submit buttons are standard Gestalt `<Button type="submit">` elements, giving teams full control over placement (inline, in a footer, in a Sheet's footer) without a Form wrapper prescribing button location.
5. **BannerSlim for form-level errors** (LOW) — When a form submission fails at a global level (e.g., server error), BannerSlim placed above the form fields provides a form-level error notification, composing with existing Gestalt components rather than requiring a dedicated Form error slot.

## Notable Props
- N/A — No Form component exists. Relevant props live on individual field components (TextField, SelectList, ComboBox, Checkbox, RadioGroup, DatePicker, etc.).

## A11y Highlights
- **Keyboard**: Standard HTML `<form>` keyboard behavior; each field is independently keyboard accessible per its own component spec; Tab navigates between fields in DOM order.
- **Screen reader**: Native `<form>` element provides implicit form landmark; each field component manages its own label association via `htmlFor`/`id` pairs; `aria-required` is set on individual fields; error messages are associated via `aria-describedby`.
- **ARIA**: `<form>` element can be given `aria-label` or `aria-labelledby` by consuming code to identify the form's purpose as a form landmark; individual field ARIA is handled per component.

## Strengths & Gaps
- **Best at**: Maximum flexibility for Pinterest's diverse form surfaces; each primitive is independently well-tested and accessible; no opinionated form layout constraints; native HTML `<form>` semantics preserved.
- **Missing**: No built-in form-level validation orchestration; no standardized field layout grid or spacing system specific to forms; no form state management utilities; no error summary component for long forms; teams must independently solve form submission patterns, which can lead to inconsistency across Pinterest's many product surfaces.
