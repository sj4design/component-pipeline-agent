---
component: Textarea
tier: 3
last_verified: 2026-03-31
---

# Textarea — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | No dedicated Textarea | Radix provides no Textarea primitive — textarea is considered a native HTML element with no complex interaction patterns needing a headless abstraction; consumers use `<textarea>` directly with Radix Form primitives for validation. | high |
| Chakra UI | Textarea | Dedicated component extending `chakra.textarea`; shares `size`, `variant`, and `colorScheme` props with Input; supports `resize` prop; auto-resize available via `react-textarea-autosize` integration documented in recipes. | high |
| GOV.UK | Textarea (GOV.UK Design System) | Character count is a separate `Character count` component that wraps Textarea; `data-maxlength` or `data-maxwords` attributes drive the counter; explicit guidance on when to use textarea vs. text input (threshold: "more than one line"). | high |
| Base Web (Uber) | Textarea | Overrides-based customization; `size` prop (COMPACT, DEFAULT, LARGE); `resize` control; `error` and `positive` states; no built-in character count — override system allows deep customization of internal elements. | medium |
| Fluent 2 (Microsoft) | Textarea | Dedicated component with `resize: "none" | "vertical" | "horizontal" | "both"`; `size: "small" | "medium" | "large"`; `appearance: "outline" | "filled-darker" | "filled-lighter"`; integrated with Field wrapper for label and validation. | high |
| Gestalt (Pinterest) | TextArea | Dedicated component with `maxLength` and built-in character counter; `helperText` and `errorMessage` slots; `rows` for initial height; `label` and `labelDisplay` for visible/hidden labels; no auto-resize. | high |
| Mantine | Textarea | Extends `InputBase`; `autosize` prop with `minRows`/`maxRows` for bounded auto-resize (mirrors Ant Design's API); `maxLength` with optional character count via `InputWrapper`; all Input props inherited. | high |
| Orbit (Kiwi.com) | Textarea | Travel-context component with `resize: "vertical" | "none"`; `maxLength` with visual counter; `help`, `error`, and `feedback` slots; `spaceAfter` for form spacing; integrates with Orbit's form field layout. | high |
| Evergreen (Segment) | Textarea | Thin component extending native `<textarea>`; `isInvalid` boolean for error state; `required`, `disabled`, `placeholder` passthrough; minimal API — relies on native textarea behavior for resize and sizing. | high |
| Nord (Nordhealth) | nord-textarea | Web component with `expand` attribute for auto-resize; `maxlength` with built-in character counter; `size: "s" | "m" | "l"`; `resize` attribute; healthcare context requires clear character limits for clinical note fields. | high |

## Key Decision Patterns

The Tier 3 landscape reveals a clear split between systems that treat Textarea as a thin wrapper over the native HTML element and systems that add substantial behavior. Radix explicitly opts out of providing a Textarea primitive, judging that `<textarea>` needs no headless abstraction. Evergreen takes a similar minimal approach. On the other end, Mantine and Nord provide full auto-resize with bounded growth, matching the sophistication of Tier 1 systems like Ant Design.

GOV.UK's decision to make character count a separate component (`Character count`) rather than a prop on Textarea is architecturally distinctive. This separation means character counting can be applied to any text input, not just Textarea, and the component owns its own ARIA live region behavior. GOV.UK also uniquely supports `data-maxwords` (word-based limits, not just character-based) — critical for government form contexts where instructions say "answer in 200 words or fewer."

Mantine's `autosize` with `minRows`/`maxRows` directly mirrors Ant Design's API, suggesting this pattern is becoming a de facto standard for bounded auto-resize. Nord's `expand` attribute achieves the same result as a web component attribute. Chakra documents integration with `react-textarea-autosize` rather than building auto-resize in — an honest acknowledgment that auto-resize is complex enough to warrant a dedicated library.

Fluent 2's `appearance` variants (`outline`, `filled-darker`, `filled-lighter`) are the most granular visual options in Tier 3, reflecting Microsoft's need to support textareas across diverse product surfaces (Teams chat, Outlook compose, admin panels) with different background contexts.

## A11y Consensus

- All systems associate labels via `htmlFor`/`id` or `aria-labelledby`; GOV.UK and Nord enforce visible labels as the default (hidden labels require explicit opt-in)
- `aria-describedby` links helper text, error messages, and character count text to the textarea across all systems that provide these features
- `aria-invalid="true"` on error state is universal
- GOV.UK's Character count component is the only Tier 3 system with a documented `aria-live="polite"` region that announces remaining characters as the user types — all other systems render character count as static visual text
- Nord's web component uses shadow DOM with proper ARIA attribute forwarding to the internal `<textarea>` element
- Fluent 2's Field wrapper manages all ARIA associations (label, description, error) centrally, consistent with its other form components

## Recommended Use

Reference Mantine for auto-resize API parity with Ant Design's `minRows`/`maxRows` pattern. Reference GOV.UK for the most accessible character count implementation (separate component with `aria-live` and word-based counting). Reference Nord for healthcare/clinical textarea requirements where character limits and expand behavior are critical. Reference Radix's deliberate omission when evaluating whether a headless textarea abstraction adds value.
