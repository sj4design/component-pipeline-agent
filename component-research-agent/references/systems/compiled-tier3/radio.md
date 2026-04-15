---
component: Radio
tier: 3
last_verified: 2026-03-29
---

# Radio — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | RadioGroup | Headless; roving tabindex pattern (only selected radio in tab order, arrows move between options); `orientation` prop changes arrow key direction; `name` for native form submission. | high |
| Chakra UI | Radio / RadioGroup | Context-based value propagation eliminates per-Radio checked/onChange props; `colorScheme` for selection fill color; `size` scale; Stack layout pattern for orientation. | high |
| GOV.UK | Radios | Conditional reveal (shows additional fields on selection); "or" divider between options; `inline` for short option labels (Yes/No); native `<fieldset>/<legend>` for group semantics. | high |
| Base Web | Radio / RadioGroup | `description` per radio item for supplementary text; `align` (horizontal/vertical); full Overrides for all visual sub-components. | medium |
| Fluent 2 | Radio / RadioGroup | `layout` prop (horizontal/vertical); Field wrapper integration for group label/hint/validation; per-item or whole-group disabled state. | high |
| Gestalt | RadioGroup | Data-array API (`options: [{label, value, subtext?, disabled?}]`); `subtext` per option for advertising strategy descriptions; required `legend` prop for group label. | medium |
| Mantine | Radio / Radio.Group / Radio.Card | Radio.Card creates full-card clickable radio options (plan selection, deployment region); `description` per option; consistent with Mantine's Checkbox.Card pattern. | high |
| Orbit | Radio | `info` prop for contextual tooltip per option (fare rules, ticket class explanations); `hasError` for booking flow validation; no dedicated Radio.Group — grouping managed by consumer. | medium |
| Evergreen | Radio / RadioGroup | Context-based state management; minimal B2B aesthetic; `isRequired` for form validation; no description per option. | medium |
| Nord | Radio (nord-radio) | Web component for healthcare exclusive selection (patient gender, appointment type); large touch targets; label enforcement; framework-portable. | low |

## Key Decision Patterns

Mantine's Radio.Card is the most distinctive feature in the T3 radio set. Rather than a small circular control next to a text label, Radio.Card makes the entire card surface the clickable target for the radio option. This pattern is used for plan selection, deployment region selection, and configuration screens where each option benefits from description, pricing, or feature details displayed within the card itself. Mantine is the only T3 system with this as a first-class component; most systems require custom composition to achieve the card-radio pattern. Notably, Mantine also provides Checkbox.Card with identical design, applying the card-surface pattern to both exclusive (radio) and multi-select (checkbox) scenarios.

GOV.UK's conditional reveal is the most impactful practical feature for government and enterprise form design. When a radio option is selected, additional form fields relevant to that choice appear below it — without requiring a page navigation or JavaScript-heavy conditional rendering in product code. The implementation uses progressive enhancement (works without JS via server-side rendering and form re-submission, enhanced with JS for inline reveal). No other T3 system provides built-in conditional reveal, and it is one of the most common form patterns in complex applications: selecting "Other" reveals a text input, selecting "By post" reveals an address form.

The roving tabindex pattern — implemented correctly by Radix (explicit, with `orientation` prop) and implemented by all other T3 systems — is a critical behavioral distinction from `<input type="radio">` tab behavior. In a group of 5 radio buttons, a user should Tab into the group (landing on the first or selected radio), then use arrow keys to navigate between options, and Tab to leave the group. This reduces the number of tab stops in complex forms significantly. Radix's explicit `orientation` prop (vertical/horizontal) correctly controls which arrow keys (up/down vs. left/right) navigate between options — an often-overlooked detail.

The "description per option" pattern is supported by multiple T3 systems (Base Web, Gestalt, Mantine, Orbit) but with different naming: Mantine calls it `description`, Base Web and Orbit call it `description`, Gestalt calls it `subtext`, and Orbit calls it `info` (via tooltip). The use case is consistent: radio options often benefit from supplementary text explaining what each choice means — fare conditions, plan features, configuration implications. Systems without this (Evergreen, Fluent 2, Chakra in core) require custom layout workarounds.

## A11y Consensus

- The correct semantic structure for radio groups is `<fieldset>` + `<legend>` (or `role="radiogroup"` + `aria-labelledby`); the group label must be programmatically associated with the group, not just visually adjacent — all T3 systems implement this.
- The roving tabindex pattern is the correct keyboard model for radio groups: Tab enters the group, arrow keys navigate between options, Tab exits — this reduces tab stops compared to tabbing through each radio individually.
- Each radio option must have an associated `<label>` that is clickable (increasing the touch target); radio controls with labels only on one side have smaller effective click areas.
- Error states must be communicated at both the group level (via `aria-describedby` on the fieldset/radiogroup linking to an error message) and optionally at the item level — a purely visual red color change is insufficient.
- Conditional reveal triggered by radio selection must update the DOM without removing the selected radio from focus; the revealed content should follow immediately in DOM order after the triggering radio.

## Recommended Use

Reference T3 radio approaches when deciding on card-radio patterns, conditional reveal, and per-option description text. Mantine's Radio.Card is the reference for full-surface-click radio options in configuration screens; GOV.UK is the reference for conditional reveal with progressive enhancement; Radix is the reference for correct roving tabindex with orientation-aware arrow navigation; Gestalt's `subtext` and Base Web's `description` per option are references for radio options with secondary explanatory text.
