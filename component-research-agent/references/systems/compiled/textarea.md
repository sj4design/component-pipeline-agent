---
component: textarea
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** TextField (multiline variant)
**Approach:** M3 does not have a standalone Textarea component. Instead, the TextField component supports a `multiline` configuration that expands the single-line text field into a multi-line input area. Both Filled and Outlined visual styles apply. The text field grows vertically as content increases, with no explicit `rows` or `maxRows` API — growth is content-driven. Character counter is a built-in sub-component positioned below the trailing edge of the field.
**Key Decisions:**
- [HIGH] Unified TextField: single-line and multi-line share one component with identical visual language — no separate Textarea component exists, reducing component count but hiding multiline capability behind configuration
- [MED] Auto-grow only: M3 specifies content-driven vertical expansion with no fixed-height or scroll-after-N-rows mode in the spec — teams must implement scroll constraints themselves
- [MED] Character counter as sub-component: positioned at bottom-right of the field container, formatted as "current/max", and only visible when `maxLength` is set
**Notable API:** `TextField` with `multiline: true`; `singleLine: false` (Compose); `maxLength` for character limit; `supportingText` for helper/error text below the field; `isError` for error state.
**A11y:** `aria-multiline="true"` on the input element. Supporting text linked via `aria-describedby`. Error state communicated via `aria-invalid="true"` and error supporting text. Character count is visually present but not announced dynamically — no `aria-live` guidance in M3 spec.
**Best at:** Visual consistency between single-line and multi-line inputs through the unified TextField model.
**Missing:** No explicit rows/maxRows API, no auto-resize toggle, no native character count live announcement guidance.

---

## spectrum
**Component:** TextArea
**Approach:** Spectrum provides a dedicated TextArea component separate from TextField. It supports a fixed `height` or a `rows` prop for initial sizing, and does not auto-grow by default. The component uses Spectrum's standard field anatomy: label (top or side), help text (description or error message), and a character counter. The `isQuiet` variant removes the visible border for inline editing contexts. Validation is managed through Spectrum's form validation system with `validationState` and `errorMessage`.
**Key Decisions:**
- [HIGH] Dedicated component: TextArea is distinct from TextField — acknowledges that multi-line input has different layout, sizing, and interaction needs than single-line
- [HIGH] No default auto-grow: TextArea has a fixed height determined by `rows` or explicit CSS height; content scrolls when it exceeds the visible area — prevents layout shift in dense form layouts
- [MED] `isQuiet` variant: borderless style for inline editing patterns (e.g., editing a description in a detail panel), distinct from the standard bordered field
**Notable API:** `label`; `description`; `errorMessage`; `isQuiet: boolean`; `isRequired: boolean`; `isDisabled: boolean`; `isReadOnly: boolean`; `maxLength`; `validationState: "valid" | "invalid"`; `rows` (maps to HTML rows attribute).
**A11y:** Label associated via `aria-labelledby`. Description and error message linked via `aria-describedby`. `aria-invalid="true"` when `validationState="invalid"`. `aria-required="true"` when `isRequired`. Character count not dynamically announced — consumer responsibility.
**Best at:** Clean separation of TextArea from TextField with a complete field anatomy (label, description, error, character count) built into the component.
**Missing:** No built-in auto-resize/auto-grow mode; no `maxRows` prop for bounded auto-growth.

---

## carbon
**Component:** TextArea
**Approach:** Carbon provides a standalone TextArea component with explicit `rows` configuration, optional character counter, and helper/warning/error text slots. The component supports `light` variant for use on darker (`$layer-01`) backgrounds. Carbon enforces a minimum height of 40px (matching the text input height) and scrolls content beyond the visible rows. The `enableCounter` prop activates a "current/max" character count display.
**Key Decisions:**
- [HIGH] Explicit rows control: `rows` prop directly maps to the HTML `rows` attribute, giving developers precise control over initial visible height; no auto-grow behavior
- [HIGH] Character counter as opt-in feature: `enableCounter` + `maxCount` props activate the counter display; counter text changes color and shows warning state as limit approaches
- [MED] Light variant: `light` prop renders the field with a lighter background for use on `$layer-01` surfaces — Carbon's layering model requires explicit background variant switching
**Notable API:** `rows: number`; `maxCount: number`; `enableCounter: boolean`; `helperText: string`; `warnText: string`; `invalidText: string`; `invalid: boolean`; `warn: boolean`; `light: boolean`; `hideLabel: boolean`.
**A11y:** Label associated via `htmlFor`/`id`. Helper text, warning text, and invalid text linked via `aria-describedby`. `aria-invalid="true"` when `invalid` is set. `hideLabel` renders the label visually hidden but keeps it accessible. Character counter is visual only — no `aria-live` region.
**Best at:** Character counter implementation with progressive warning states as the user approaches the limit.
**Missing:** No auto-resize capability; no `maxRows` for bounded growth; character counter lacks `aria-live` for screen reader announcement.

---

## polaris
**Component:** TextField (multiline prop)
**Approach:** Polaris does not have a separate Textarea component. The TextField component accepts a `multiline` prop that switches the rendered element from `<input>` to `<textarea>`. When `multiline` is a number, it sets the initial `rows`. When `multiline={true}`, the field auto-grows with content. The `maxHeight` prop constrains auto-growth, creating a bounded auto-resize behavior. Character count is built in via `showCharacterCount` + `maxLength`.
**Key Decisions:**
- [HIGH] Unified TextField with `multiline` prop: mirrors M3's approach of one component for both modes; `multiline={3}` sets initial rows, `multiline={true}` enables unbounded auto-grow
- [HIGH] Bounded auto-resize via `maxHeight`: auto-grow can be capped at a pixel height, after which content scrolls — the only Tier 1 system with built-in bounded auto-grow
- [MED] Character count built in: `showCharacterCount` with `maxLength` displays "X/Y characters used" — includes accessible text for screen readers
**Notable API:** `multiline: boolean | number`; `maxHeight: string`; `showCharacterCount: boolean`; `maxLength: number`; `helpText: string`; `error: string | ReactNode`; `label: string`; `labelHidden: boolean`; `disabled: boolean`; `readOnly: boolean`; `autoComplete: string`.
**A11y:** Label linked via `htmlFor`. Error and help text associated via `aria-describedby`. `aria-invalid="true"` on error. Character count text is screen-reader accessible ("X of Y characters used"). Auto-growing textarea maintains focus position during resize.
**Best at:** Bounded auto-resize (`multiline` + `maxHeight`) — the most complete auto-grow implementation in Tier 1 with both unbounded and bounded modes.
**Missing:** No dedicated Textarea component — developers must know to use TextField with `multiline`, which is discoverable only through documentation.

---

## atlassian
**Component:** TextArea (from @atlaskit/textarea)
**Approach:** Atlassian provides a dedicated `@atlaskit/textarea` package separate from `@atlaskit/textfield`. The component supports automatic resizing via the `resize` prop (`auto`, `vertical`, `horizontal`, `none`, `smart`). The `smart` resize mode auto-grows vertically but never shrinks — preventing the jarring layout shift when users delete text. Appearance options include `standard`, `subtle` (borderless until hover/focus), and `none`.
**Key Decisions:**
- [HIGH] Five resize modes: `auto` (grows and shrinks), `vertical` (user-draggable), `horizontal`, `none` (fixed), and `smart` (grows only, never shrinks) — `smart` is the most user-friendly auto-resize behavior in Tier 1
- [MED] Subtle appearance: borderless field that shows borders only on hover/focus — for inline editing in Jira-style detail views
- [MED] Separate package: `@atlaskit/textarea` is independent from `@atlaskit/textfield`, allowing separate versioning and tree-shaking
**Notable API:** `resize: "auto" | "vertical" | "horizontal" | "none" | "smart"`; `appearance: "standard" | "subtle" | "none"`; `isCompact: boolean`; `isMonospaced: boolean`; `isDisabled: boolean`; `isInvalid: boolean`; `isRequired: boolean`; `minimumRows: number`; `maxHeight: number`.
**A11y:** Standard `<textarea>` element with native HTML attributes. `aria-invalid="true"` when `isInvalid`. Label association handled by consumer (Atlassian's Form component manages this). `isRequired` renders `required` attribute. No built-in character counter.
**Best at:** The `smart` resize mode (grow-only, never shrink) — prevents the frustrating layout bounce that other auto-resize implementations cause when users delete text.
**Missing:** No built-in character counter; no built-in label/help text/error text — relies on Atlassian Form component for field composition.

---

## ant-design
**Component:** Input.TextArea
**Approach:** Ant Design's TextArea is a sub-component of Input (`Input.TextArea`), sharing Input's visual language but rendering a `<textarea>` element. The `autoSize` prop accepts `{ minRows, maxRows }` for bounded auto-resize — the field grows from `minRows` to `maxRows` then scrolls. `showCount` enables a built-in character counter. The component integrates with Ant's Form validation system for error states and messages.
**Key Decisions:**
- [HIGH] `autoSize` with `minRows`/`maxRows`: the most explicit bounded auto-resize API in Tier 1 — developers set exact row boundaries, making layout behavior completely predictable
- [HIGH] Sub-component of Input: `Input.TextArea` shares Input's status system (`status: "error" | "warning"`), prefix/suffix patterns, and Form integration — consistent API surface
- [MED] `showCount` with formatter: character counter supports a custom `formatter` function for localized or custom count displays (e.g., "5/100 words" instead of "25/100 characters")
**Notable API:** `autoSize: boolean | { minRows: number, maxRows: number }`; `showCount: boolean | { formatter: Function }`; `maxLength: number`; `status: "error" | "warning"`; `allowClear: boolean`; `rows: number`; `disabled: boolean`; `readOnly: boolean`; `bordered: boolean`.
**A11y:** Standard `<textarea>` with `aria-valuemax` when `maxLength` set. Character count is rendered as visual text — no `aria-live` region. Error states communicated via Form component's `aria-describedby` linkage. `allowClear` button has `aria-label`.
**Best at:** The `autoSize: { minRows, maxRows }` API — the clearest and most developer-friendly bounded auto-resize configuration in any Tier 1 system.
**Missing:** No native `aria-live` for character count updates; accessibility of the count display depends on Form-level integration rather than the component itself.
