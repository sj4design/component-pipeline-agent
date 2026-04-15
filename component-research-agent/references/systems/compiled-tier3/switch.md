---
component: Switch
tier: 3
last_verified: 2026-03-29
---

# Switch — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Switch | Headless primitive: `Switch` + `Switch.Thumb`; `role="switch"` with `aria-checked`; boolean-only state (no indeterminate); form integration via `name`/`value`; Thumb receives `data-state` for CSS animation. | high |
| Chakra UI | Switch | Hidden native checkbox for form integration; `colorScheme` for active track color; three sizes (sm/md/lg); `role="switch"` semantics; smooth animation defaults. | high |
| GOV.UK | Not available — ambiguity concern | No switch component; immediate-effect UI is problematic in form contexts where actions should take effect on explicit submit; checkbox is the recommended alternative. | high |
| Base Web | Toggle | Named "Toggle" not "Switch"; may use `role="checkbox"` rather than `role="switch"` in some versions — less semantically precise; Overrides pattern for customization. | medium |
| Fluent 2 | Switch | `labelPosition` ("before" | "after") for settings-panel layouts; built-in `label` prop; `role="switch"` correct semantics; Field integration for hint text; used in Teams/Windows settings. | high |
| Gestalt | Switch | Required `id` and label enforced at component level; `switched` prop for controlled state; `role="switch"`; Pinterest brand color for active state. | medium |
| Mantine | Switch | `thumbIcon` prop for icon inside the sliding thumb (sun/moon for dark mode, etc.); `description` prop; `Switch.Group` for multi-switch array state; full size scale; `labelPosition`. | high |
| Orbit | Not available — Checkbox used | Travel booking forms use checkboxes for boolean selections; switch implies immediate effect, which is less appropriate in Kiwi.com's form-heavy booking flow. | medium |
| Evergreen | Not available or limited | Segment analytics dashboards use checkboxes for boolean settings; switch not confirmed as a distinct component. | medium |
| Nord | Toggle (nord-toggle) | Web component for healthcare settings (clinical alert toggles, notification preferences); clear on/off visual state critical for clinical context; `role="switch"` required for clinical clarity; `label` required. | low |

## Key Decision Patterns

The most important semantic distinction in T3 switch components is `role="switch"` versus `role="checkbox"`. Radix, Fluent 2, Chakra, Gestalt, and (claimed) Nord all implement `role="switch"`, which is the WAI-ARIA role that explicitly communicates immediate effect — toggling a switch takes effect right now, without form submission. Base Web's Toggle historically used `role="checkbox"`, which conflates a persistent selection state with an immediate action. The difference matters for screen reader users: `role="switch"` announced as "on" or "off" communicates the control's current state and the immediacy of its effect; `role="checkbox"` announced as "checked" or "unchecked" suggests a form selection that might not take effect until submission. Systems that implement `role="switch"` are enforcing a semantic contract, not just a visual convention.

Mantine's `thumbIcon` prop is the only T3 system that encodes the switch's meaning directly into the visual toggle. The pattern — showing a moon icon in the thumb when dark mode is on, a sun when it's off — removes ambiguity about what the switch controls without requiring users to read the label. Most settings UIs rely entirely on the adjacent label to explain what a switch does; when multiple switches are listed in a dense settings panel, labels at a distance from the thumbs can be misread. Icons inside the thumb create a self-describing control. This pattern is common in consumer mobile OS settings (iOS Control Center, Android Quick Settings) and Mantine is the only T3 system to provide first-class API support for it.

Fluent 2's `labelPosition` prop ("before" | "after") addresses a layout requirement specific to settings panels. Microsoft's settings interfaces — Teams, Windows Settings, Azure portal — use a dense list layout where the label appears on the left edge and the switch appears on the right edge of each row. This is the opposite of most web form conventions (label left, control right, where the control follows the label). Without `labelPosition`, teams either use CSS flexbox overrides to reverse the label and switch, or accept the non-standard layout. Fluent 2 makes this a first-class prop because the reversed layout is not unusual — it is the dominant pattern in every Microsoft settings surface.

GOV.UK and Orbit's absences both identify the same fundamental problem: switches imply immediate effect, but forms imply deferred submission. Placing a toggle switch inside a multi-field form creates a conflict — does the switch take effect immediately, or only after the user clicks "Save"? GOV.UK's research with users who have cognitive disabilities shows this ambiguity is not just a philosophical concern: users with cognitive disabilities frequently misunderstand when their actions have taken effect. Both systems resolve the ambiguity by eliminating the switch in form contexts, defaulting to checkboxes that have unambiguous "takes effect on submit" semantics.

## A11y Consensus

- Switch components must use `role="switch"` rather than `role="checkbox"` — this is the ARIA role that communicates immediate effect semantics to screen readers; `role="checkbox"` implies a form selection that may not apply until submission.
- `aria-checked` must be `"true"` or `"false"` on the switch element — no indeterminate state is defined for `role="switch"`, unlike `role="checkbox"` which supports `aria-checked="mixed"`.
- Every switch must have an accessible label via `<label>`, `aria-label`, or `aria-labelledby` — icon-only switches without labels are not acceptable; the label must describe what the switch controls, not just say "On" or "Off."
- Space bar must toggle the switch when focused — this is the keyboard interaction specified in the WAI-ARIA switch pattern; Enter is not required for switches (unlike buttons).
- Visual state (on/off track color) must not be the only differentiator — focus indicator, ARIA state, and ideally a visible text or icon difference between on/off states provide redundant state communication for color-blind users and those with high-contrast mode active.

## Recommended Use

Reference T3 switch approaches when deciding on `role="switch"` semantics, label positioning for settings panels, and thumb icon patterns. Radix is the reference for the correct `role="switch"` primitive with a composable Thumb element; Fluent 2 is the reference for `labelPosition` in settings-panel layouts and Field integration for hint text; Mantine is the reference for `thumbIcon` encoding the switch's meaning visually; Gestalt is the reference for required label enforcement at the component level; GOV.UK and Orbit are references for the ambiguity argument against switches in form contexts where deferred submission is expected.
