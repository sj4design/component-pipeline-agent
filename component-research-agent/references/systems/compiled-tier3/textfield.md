---
component: TextField
tier: 3
last_verified: 2026-03-29
---

# TextField — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | TextField (Themes) | Slot-based: `TextField.Slot` for icons/addons inside input border; `variant` (surface/classic/soft); native input wrapping preserves autofill and form behavior; consumer responsible for label and error. | high |
| Chakra UI | Input / InputGroup | `InputGroup` with `InputLeftElement`/`InputRightElement` (overlaid icons) and `InputLeftAddon`/`InputRightAddon` (bordered sections); automatic padding compensation; `Field` in v3 bundles label/error; `flushed` variant for inline editing. | high |
| GOV.UK | Text Input | Width-sizing guidance (width-2 to full-width matches expected answer length); `autocomplete` attribute enforcement; text prefix/suffix for units (not icons); error message above input with red border; research-backed pattern. | high |
| Base Web | Input | `startEnhancer`/`endEnhancer` (accepts any ReactNode); built-in `clearable` prop for clear button; Overrides for all sub-elements; consistent enhancer API across all Base Web form components. | medium |
| Fluent 2 | Input / Field | Input/Field separation: Field wraps any input type for consistent label/validation/hint; `appearance` (outline/underline/filled-darker/filled-lighter) for surface contexts; `contentBefore`/`contentAfter` slots. | high |
| Gestalt | TextField | Required `label` prop prevents unlabeled inputs; `characterCount` prop for content forms; error message replaces helper text (no layout shift); `id` required for explicit label association. | medium |
| Mantine | TextInput | Consistent API across all Mantine inputs; `leftSection`/`rightSection` with auto-padding-compensation; `description` (below label) and `error` (below input) as separate props; `withAsterisk` for visual required indicator. | high |
| Orbit | InputField | Travel-context prefix/suffix icons; immediate inline error feedback; mobile-optimized touch targets; `help` and `error` as separate props (error replaces help). | medium |
| Evergreen | TextInput / TextInputField | Input/Field separation pattern; `appearance="minimal"` for bottom-border-only inline editing; `isInvalid` for error styling without error message; analytics dashboard aesthetic. | medium |
| Nord | Input (nord-input) | Web component for healthcare data entry; required `label`; `helper-text` and `error` props; clinical validation feedback; framework-portable; accessible across healthcare AT. | low |

## Key Decision Patterns

The most structural divide in T3 text field components is bare-input versus bundled-field. Radix provides a bare styled input only, leaving label, error, and helper text to consumer composition. Fluent 2 and Evergreen provide both: a bare Input for complex layouts and a Field/TextInputField wrapper for standard form use. Chakra v3, Gestalt, Mantine, Orbit, and Nord all bundle the label, description, and error message into the component itself as first-class props. The bundle approach reduces boilerplate and prevents common errors (forgetting to link error messages via `aria-describedby`); the separation approach enables more flexible layouts where the label might appear in a different DOM location. The trend across T3 is toward bundled fields — every system that was bare-input-only in earlier versions has added a Field wrapper.

GOV.UK's input width guidance is the only T3 system where visual field width is treated as functional information rather than aesthetic choice. The principle — size the input to the expected answer, not to fill the container — is backed by user research showing that field width creates a subconscious expectation about answer length. A two-character postcode field tells users the answer is short; a full-width name field suggests any length is expected. GOV.UK provides explicit width classes mapped to common government form field types, making this a component-level design decision rather than a case-by-case CSS choice. No other T3 system codifies this guidance into the component API itself.

Mantine's approach to the description/error relationship is the cleanest in the T3 set. Description (helper text) appears below the label and provides proactive guidance about what to enter. Error appears below the input and provides reactive feedback when validation fails. These are semantically distinct: description is always visible guidance, error is conditional feedback. Systems that use a single `helperText` prop that serves double duty (showing guidance before submission, then showing errors after) create an awkward API where the same prop means two different things. Mantine's two-prop approach makes the distinction explicit in the API. Gestalt similarly separates `helperText` and `errorMessage` but makes error replace helper (preserving layout height), while Mantine can show both simultaneously.

The prefix/suffix implementation pattern reveals a meaningful difference in how systems handle input addons. GOV.UK uses visible text before and after the input (rendered as adjacent DOM elements, not overlaid): `£ [input] .00`. Base Web uses `startEnhancer`/`endEnhancer` accepting any ReactNode. Chakra distinguishes between InputElement (overlaid icon inside the input, with auto-padding compensation) and InputAddon (bordered section attached to the input). Radix uses a generic `TextField.Slot`. Mantine uses `leftSection`/`rightSection` with explicit width props for padding compensation. The GOV.UK approach is the most accessible for screen readers (the prefix/suffix text is in DOM order adjacent to the input) but least flexible for interactive addons. The slot/enhancer approaches are more flexible but require padding compensation to prevent addon overlap with input text.

## A11y Consensus

- Every text input must have a visible label associated via `<label for>` or `aria-labelledby` — placeholder text is not a substitute for a label (it disappears when typing begins), and `aria-label` is a lower-quality substitute that sighted users cannot see. Gestalt's required `label` prop and Nord's `label` requirement both enforce this.
- Error messages must be linked to their input via `aria-describedby` pointing to the error message element's ID — this is the ARIA pattern that causes screen readers to announce the error after the input's label and type when the input is focused.
- `aria-invalid="true"` must be set on the input element when it has a validation error — this informs screen readers that the value is invalid before they read the error message; `aria-invalid` alone is not sufficient without an associated error message.
- `autocomplete` attributes should be specified on inputs where browser autofill is applicable (name, email, address, phone) — GOV.UK's guidance on this is the most explicit in the T3 set, but it applies universally; `autocomplete` directly benefits motor-impaired users who rely on autofill.
- Helper text and error messages should both be in `aria-describedby` when both are present — hiding helper text when error text appears (Gestalt's error-replaces-helper pattern) simplifies `aria-describedby` management but prevents users from reading both the guidance and the specific error simultaneously.

## Recommended Use

Reference T3 text field approaches when deciding on bundle versus composition, width sizing, prefix/suffix patterns, and label enforcement. Mantine is the reference for consistent label/description/error API across all input component types with automatic slot padding compensation; GOV.UK is the reference for input width guidance as functional information and `autocomplete` attribute enforcement; Fluent 2 is the reference for Input/Field separation enabling Field to wrap any input type; Gestalt is the reference for required label enforcement and character count for content forms; Chakra is the reference for the InputElement (overlaid) versus InputAddon (bordered) distinction for prefix/suffix addons.
