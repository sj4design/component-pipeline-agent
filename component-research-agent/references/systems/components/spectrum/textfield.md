---
system: Adobe Spectrum
component: TextField / TextArea / SearchField
url: https://spectrum.adobe.com/page/text-field/
last_verified: 2026-03-28
---

# TextField

## Approach
Spectrum takes a separation-of-concerns approach to text input, splitting the concept into three distinct components: TextField for single-line input, TextArea for multi-line input, and SearchField for search-specific patterns. This is a deliberate architectural choice because Adobe's products span creative tools (Photoshop, Lightroom), analytics platforms, and content management -- each with different input needs. Rather than overloading one component with multiline toggles and search icons, Spectrum lets each component own its behavior and accessibility semantics fully. The React Aria layer underneath provides headless hooks (useTextField) that handle all ARIA wiring, letting the styled Spectrum layer focus purely on visual presentation. Spectrum also emphasizes validation as a first-class citizen, integrating with HTML constraint validation while providing custom validation functions and server-side error support through a unified Form component.

## Key Decisions
1. **Three separate components instead of one** (HIGH) — TextField, TextArea, and SearchField each have their own component identity. SearchField gets a dedicated clear button and search semantics (role="search"); TextArea gets resize handles and auto-grow behavior. This means importing the right component gives you the right defaults without configuring away features you don't need. The tradeoff is a larger API surface to learn, but each individual component is simpler.

2. **Quiet style variant for data-dense contexts** (MEDIUM) — Spectrum offers a "quiet" variant that removes the visible border, showing only a bottom underline. This exists specifically for dense layouts like tables and property panels common in Adobe's products, where bordered fields would create too much visual noise. The guidance explicitly warns that quiet fields need surrounding layout structure (vertical stack, table grid) to remain parseable, acknowledging the reduced affordance.

3. **Validation integrated at the Form level** (HIGH) — Instead of each TextField managing its own validation display, Spectrum pushes validation behavior up to a Form wrapper with `validationBehavior="native"`. The FieldError component renders validation messages with custom styling, replacing browser defaults. This architectural choice means validation is consistent across all form fields and errors block submission automatically -- but it requires the Form wrapper to function.

4. **Four size options (S, M, L, XL)** (MEDIUM) — Spectrum provides four sizes rather than the typical three. The extra-large size exists because Adobe's creative tools sometimes need oversized inputs for touch interfaces or accessibility contexts. Size affects the entire field including label and help text proportionally.

## Notable Props
- `isQuiet`: Removes border for data-dense contexts -- a prop that reveals Spectrum's enterprise-density philosophy
- `validationBehavior`: Controls whether validation is "native" (blocks submit) or "aria" (advisory only), giving developers explicit control over validation strictness
- `necessityIndicator`: Toggles between showing "(required)" text or an asterisk -- Spectrum chose to support both because Adobe found different products had different labeling conventions

## A11y Highlights
- **Keyboard**: Standard text input keyboard behavior. SearchField includes Escape to clear. Tab moves between fields in form context.
- **Screen reader**: Label, description (help text), and error messages are all programmatically associated. When an error appears, it is announced via an aria-live region so the user knows validation failed without having to navigate away.
- **ARIA**: Uses aria-label/aria-labelledby for label association. aria-describedby links to both help text and error messages. aria-invalid toggles on validation failure. The Form component handles aria-errormessage distribution automatically.

## Strengths & Gaps
- **Best at**: Validation architecture -- the combination of native HTML constraint validation, custom validation functions, server-side error support, and the FieldError component makes Spectrum the most complete validation story among the six systems researched.
- **Missing**: No built-in prefix/suffix or addon pattern for currency symbols or units, no connected-field concept for combining inputs, and no character counter built into the component.
