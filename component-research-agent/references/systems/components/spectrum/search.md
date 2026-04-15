---
system: Adobe Spectrum
component: SearchField
url: https://react-spectrum.adobe.com/react-spectrum/SearchField.html
last_verified: 2026-03-28
---

# SearchField

## Approach

Spectrum's SearchField is a purpose-built component that inherits from the same field foundation as TextField but is explicitly *not* a TextField with a prop switched on. The distinction is intentional: search interactions have a fundamentally different contract with the user than general text entry. A search field submits (triggers a lookup action), can be cleared in a single gesture, and communicates its purpose semantically via `<input type="search">`. Adobe's broader product ecosystem — Creative Cloud, Experience Platform, Analytics dashboards — requires search inputs in dozens of contexts, from full-page search bars down to table-row filters, and the API needs to work consistently across all of them without the consumer worrying about wiring the right ARIA attributes or managing the clear-button state themselves. The most consequential architectural decision is the separation of `onChange` (fires every keystroke) from `onSubmit` (fires on Enter or form submit), which mirrors the mental model of search as a two-stage interaction: *composing a query* versus *executing a search*. This separation prevents the extremely common bug of triggering expensive search requests on every character typed, and it does so at the component contract level rather than relying on consumer-side debouncing.

## Key Decisions

1. **onChange / onSubmit separation** (HIGH) — Spectrum fires `onSubmit(value)` only on Enter or explicit form submission, while `onChange` fires on every keystroke. The rationale is that in most search scenarios, the user is typing toward an intended query and should not trigger a backend call mid-word. By standardizing this in the component API, Spectrum removes an entire class of performance bugs (unnecessary API calls) and UX issues (jarring mid-type result flashes) from every consumer. Systems that expose only `onChange` force each team to re-implement debouncing or submit-gating independently, with inconsistent results.

2. **Dedicated SearchField component rather than TextField variant** (HIGH) — Adobe could have added a `type="search"` prop to TextField, as many systems do. Instead, they created a separate component because the behavior surface is meaningfully different: SearchField has `onSubmit`, `onClear`, `enterKeyHint`, and a built-in clear button — none of which belong on a general text input. Keeping them separate avoids the "god component" anti-pattern where a single TextField grows to accommodate every input subtype through boolean flags, making the API harder to understand and the component harder to tree-shake.

3. **Required label or explicit aria-label** (HIGH) — Spectrum enforces that either a visible `label` prop is provided, or `aria-label`/`aria-labelledby` must be supplied. This is a hard constraint, not a recommendation. The reasoning is that Adobe ships components to external developers building products used by millions; a missing label is an accessibility violation at production scale, and enforcing it at the component API level prevents it from ever shipping silently broken.

4. **isQuiet variant** (MEDIUM) — The `isQuiet` prop removes the visible border, producing a minimal underline-only appearance. This exists because Adobe's own products (Lightroom, Photoshop) feature search fields embedded in tight toolbar contexts where a full-bordered box competes visually with the content being searched. Quiet mode signals "this is a filter/search affordance, not a primary form field" without requiring a completely separate component.

5. **enterKeyHint prop** (LOW) — Specifying the virtual keyboard action label ("search", "go", "done") for mobile soft keyboards is exposed as a prop because Adobe's products are heavily used on iPad and mobile, where the Enter key label on the on-screen keyboard sets user expectations about what happens when they press it. Setting it to "search" shows a search icon on the keyboard, reinforcing the component's purpose.

## Notable Props

- `onSubmit(value)`: Fires only on Enter/form submit — represents the "execute search" event, distinct from typing.
- `onClear()`: Fires when the built-in clear button is activated — enables consumers to reset state (results list, filters) without parsing the onChange empty-string case.
- `isQuiet`: Minimal visual style for toolbar/embedded contexts — a recognized Spectrum variant shared with other field components for visual consistency.
- `validate(value)`: Custom validation function — interesting because search fields often need query validation (minimum length, disallowed characters) that differs from standard form input validation.
- `validationBehavior`: "native" vs "aria" — controls whether invalid state blocks form submission (native) or only marks the field via ARIA (aria), enabling flexible integration with both traditional forms and single-page app patterns.

## A11y Highlights

- **Keyboard**: Enter triggers `onSubmit`; the clear button is reachable via Tab and activatable via Space/Enter; Escape key behavior for clearing is *not explicitly documented*, which is a notable gap vs. Carbon (which standardizes Escape-to-clear).
- **Screen reader**: `<input type="search">` is used natively, which causes assistive technologies to announce the field as a search input automatically — no custom ARIA role needed. Error messages are linked via `aria-errormessage` and `aria-describedby`.
- **ARIA**: `aria-label` or `aria-labelledby` is enforced when visible label is absent. `aria-invalid` is set automatically when `validationBehavior="native"`. The component does not explicitly apply `role="search"` to a wrapper element — it relies on the semantic `input type="search"` instead.

## Strengths & Gaps

- **Best at**: Accessibility enforcement and the onChange/onSubmit separation — the API design prevents the most common search UX bugs at the component contract level, making it the safest choice for teams without strong search implementation experience.
- **Missing**: No documented loading/async state for indicating that search results are being fetched, no scope/category selector, and no explicit Escape-to-clear behavior — leaving those patterns to consumer implementation.
