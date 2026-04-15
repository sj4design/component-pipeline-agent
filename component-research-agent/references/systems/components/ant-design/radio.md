---
system: Ant Design
component: Radio + Radio.Group
url: https://ant.design/components/radio/
last_verified: 2026-03-28
---

# Radio + Radio.Group

## Approach
Ant Design's radio component is one of the most feature-rich among Tier 1 systems, offering not just the standard circular radio button but also a complete button-segment visual variant that makes a radio group look like a button bar or toggle group. This dual visual mode — standard circular radios and button-style radios — serves Ant Design's primary audience: data-intensive enterprise applications built on React in China and globally, where UIs often need to switch between tabular filters, configuration modes, and selection states in tight horizontal space. The `Radio.Group` component accepts an `options` array prop as a shorthand, allowing the entire group to be declared declaratively from data rather than by manually composing `<Radio>` children, which suits the data-driven rendering patterns common in Ant Design admin and dashboard layouts. The system relies heavily on the native browser radio button behavior for keyboard navigation, using the HTML `name` attribute on all inputs within a group to form a true browser-native radiogroup — a low-abstraction approach that leverages what the browser already does well rather than reimplementing keyboard management in JavaScript.

## Key Decisions
1. **Button-style visual variant via `optionType="button"`** (HIGH) — `Radio.Group` can render options as button-style pills or blocks rather than circular radio inputs, controlled by `optionType="button"`. This variant exists because many Ant Design use cases — filter bars, view-mode selectors, period selectors (day/week/month), frequency toggles — need a radio group's single-selection semantics but want a button bar's visual presentation. Building this as a prop variant rather than a separate component keeps the state management and accessibility behavior identical while varying only the visual affordance.

2. **`buttonStyle="solid"` vs. `"outline"` for button variant** (MEDIUM) — When using button-style radios, `buttonStyle` controls whether the selected item has a solid filled background ("solid") or just a highlighted border ("outline"). This two-level customization reflects that different contexts need different visual weight: solid is appropriate for primary actions (like switching a chart's time range), while outline is appropriate for secondary filters where the selection should not draw as much attention.

3. **`options` array prop as declarative shorthand** (HIGH) — `Radio.Group` accepts an `options` prop: an array of strings or `{ label, value, disabled }` objects that renders the full set of radios automatically. This is specifically designed for data-driven UIs where the options come from an API response or config object, making it trivial to render a dynamic radio group without manually mapping over children. The `optionType` prop applies to all options rendered this way, keeping the API surface consistent.

4. **`name` attribute for native browser radiogroup semantics** (HIGH) — Ant Design passes the `name` attribute to all `<input type="radio">` elements within a group, forming a native HTML radiogroup. This means the browser handles arrow-key navigation between options natively, without any custom JavaScript keyboard event management. The tradeoff is that this only works reliably when all radios in the group share the same `name` — a requirement the component handles automatically when `name` is set on `Radio.Group`, but which can break if individual `Radio` components are composed manually without explicit `name` props.

5. **Three sizes: small, middle (default), large** (MEDIUM) — `Radio.Group` accepts a `size` prop that scales the button-variant height. This reflects Ant Design's system-wide sizing scale used across inputs, buttons, and selects. The standard circular radio does not change visual size with this prop — it only affects the button variant. This sizing capability matters for admin UIs where different sections of the same page may require different visual density (a compact filter toolbar vs. a full-width settings form).

## Notable Props
- `optionType`: `"default"` (standard circular radios) or `"button"` (button-bar style) — the defining differentiator of Ant Design's radio component from other systems.
- `buttonStyle`: `"outline"` (default) or `"solid"` — applies only when `optionType="button"`; controls fill vs. border-only appearance for selected state.
- `options`: `string[] | { label, value, disabled }[]` — declarative array-based rendering shorthand; maps to rendered `<Radio>` children automatically.
- `size`: `"small" | "middle" | "large"` — affects button variant height; ties into Ant Design's cross-component sizing system.
- `name`: Passed to all underlying `<input type="radio">` elements; enables native browser keyboard navigation and radiogroup semantics.
- `disabled` (on `Radio.Group`): Disables all options in the group at once; can be overridden per-option with `options[].disabled`.

## A11y Highlights
- **Keyboard**: Arrow Left/Right navigates between options within the group and simultaneously selects them, relying on native browser radio behavior triggered by matching `name` attributes. Tab enters the group at the selected (or first) option and exits after the last. Space selects the focused option when no item is currently checked.
- **Screen reader**: Each radio announces its label and checked state via native `<input type="radio">` semantics. The group is labelled via `aria-label` or a wrapping `<label>` element. Button-style radios announce as radio buttons rather than buttons, preserving the correct semantic role.
- **ARIA**: Native `<input type="radio">` elements use browser-native radio semantics. `role="radiogroup"` is applied to the group container. `aria-checked` reflects checked state. No custom ARIA polyfilling required for standard circular variant.

## Strengths & Gaps
- **Best at**: Visual flexibility — the `optionType` and `buttonStyle` props give Ant Design the widest range of radio button presentation styles among Tier 1 systems, covering everything from classic form radios to segmented button bars without requiring separate components.
- **Missing**: No built-in validation/error state on `Radio.Group` — error handling must be provided by the parent `Form.Item` from Ant Design's Form component, which means standalone `Radio.Group` usage outside of a `Form` has no error display mechanism and must be built manually.
