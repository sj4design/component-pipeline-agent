---
system: Shopify Polaris
component: RadioButton + ChoiceList
url: https://polaris.shopify.com/components/radio-button
last_verified: 2026-03-28
---

# RadioButton + ChoiceList

## Approach
Polaris takes a two-component approach to radio button groups: `RadioButton` handles the individual control with full layout flexibility, while `ChoiceList` is the recommended high-level wrapper for the common case of a labeled group of radio buttons (or checkboxes). This split exists because Shopify's merchant-facing UI spans a huge range of contexts — admin settings pages, checkout configuration, product forms, discount builders — and different contexts need different levels of layout control. `ChoiceList` is optimized for the 80% case: a labeled group, consistent spacing, group-level error handling, and a clean toggle between single-selection (radio) and multi-selection (checkbox) via the `allowMultiple` prop. `RadioButton` is for the 20% case: custom layouts, inline configurations, or scenarios where the developer needs to manage group state manually. Polaris explicitly recommends having a default option selected whenever possible, which is a deliberate stance rooted in merchant experience research showing that pre-selection reduces decision friction and improves form completion rates. The system also gives clear guidance on when to abandon radio buttons altogether: for long lists of options, use `Select` to avoid overwhelming merchants with scrollable walls of choices.

## Key Decisions
1. **ChoiceList as the preferred group abstraction** (HIGH) — Rather than building RadioGroup as a separate component, Polaris invested in `ChoiceList` as a unified component that handles both radio and checkbox patterns through the `allowMultiple` boolean. The reasoning: in practice, product designers frequently switch between "choose one" and "choose many" during design iterations. Having the same component handle both patterns means changing a single prop rather than swapping components, reducing the chance of forgetting to update grouping semantics, labels, or error handling when the cardinality changes.

2. **`allowMultiple` as the radio/checkbox toggle** (HIGH) — `ChoiceList` defaults to single selection (radio buttons). Adding `allowMultiple` switches it to multi-selection (checkboxes). This is a significant API decision: it means the same `choices` array, `title`, `error`, and `onChange` surface area serves both patterns. The tradeoff is that developers who need fine-grained per-choice styling or interaction differences must drop down to individual `RadioButton` or `Checkbox` components.

3. **Default selection strongly recommended** (MEDIUM) — Polaris documentation actively recommends pre-selecting the most likely option, in contrast to Carbon (which recommends against it) and Spectrum (which is neutral). This reflects Shopify's product reality: merchants making settings changes in the admin are typically adjusting an existing value, not making a fresh choice from scratch. Pre-selecting the current value also serves as visual confirmation of what is already configured.

4. **Group-level error via `ChoiceList`'s `error` prop** (HIGH) — Error handling is attached to the group, not to individual radios. The `error` string or ReactNode renders below the group label. Individual choices can reference the error via `describedByError: true` on the choice object, which wires `aria-describedby` to the error element. This design reflects the principle that radio button validation is always a group outcome — the question "did you select something?" belongs to the group, not to any individual option.

5. **`titleHidden` preserves accessibility while hiding visual label** (MEDIUM) — `ChoiceList` accepts a `title` prop that maps to the visual group label. Adding `titleHidden` removes it visually but keeps it in the DOM for screen readers. This was explicitly built because Polaris layouts sometimes place the group label in an adjacent column or heading, meaning a visible `ChoiceList` title would duplicate information that sighted users can already see, while screen reader users still need the association.

## Notable Props
- `allowMultiple` (on `ChoiceList`): Switches the group from radio (single) to checkbox (multi) behavior — notable because it enables a single component to cover both patterns, reducing API surface area.
- `choices` (on `ChoiceList`): Array of `{ label, value, helpText, disabled, describedByError }` objects — the `describedByError` flag wires individual choices to the group's error message via `aria-describedby`.
- `titleHidden` (on `ChoiceList`): Visually hides the group label while preserving it for screen readers.
- `helpText` (on `RadioButton`): Per-radio descriptive text that appears below the label; useful for explaining the implications of a choice without cluttering the label itself.
- `fill` (on `RadioButton`): `ResponsiveProp<boolean>` — makes the radio button fill its container width at specified breakpoints; designed for responsive admin layouts.
- `error` (on `RadioButton`): Per-radio inline error string with `aria-describedby` wiring; used when `RadioButton` is used standalone (outside `ChoiceList`) and validation is needed.

## A11y Highlights
- **Keyboard**: Tab moves focus to the first (or selected) radio in the group. Arrow Up/Down cycles between options and simultaneously selects them. Tab exits the group. When using bare `RadioButton` components (outside `ChoiceList`), group Tab/arrow behavior depends on the developer wiring native radio groups correctly via matching `name` attributes.
- **Screen reader**: `ChoiceList` announces group title first. Each radio announces its label, checked state, and any associated `helpText`. Error messages linked via `aria-describedby` are announced when focus reaches affected choices.
- **ARIA**: `ChoiceList` renders with `role="group"` and `aria-labelledby` referencing the title. Individual radios use `role="radio"` with `aria-checked`. Error messages linked via `aria-describedby` on choices with `describedByError: true`.

## Strengths & Gaps
- **Best at**: The `ChoiceList` pattern — unified API for single/multi-selection with built-in group labeling, error handling, and accessible description wiring, making it the fastest path to a correct, accessible radio group in a merchant UI.
- **Missing**: No explicit orientation prop on `ChoiceList` — horizontal layouts require custom wrapper styling or dropping down to individual `RadioButton` components, which means losing the group-level error and label abstraction.
