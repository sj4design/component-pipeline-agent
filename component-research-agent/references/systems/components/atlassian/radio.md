---
system: Atlassian Design System
component: Radio + RadioGroup
url: https://atlassian.design/components/radio
last_verified: 2026-03-28
---

# Radio + RadioGroup

## Approach
Atlassian's radio button system reflects the design needs of productivity and collaboration tools — Jira, Confluence, Bitbucket — where forms appear in modals, side panels, configuration drawers, and settings pages that must be navigable entirely by keyboard by developers and power users. The system separates `Radio` (the atomic single control) from `RadioGroup` (the managed group wrapper) in a way that allows both components to be used independently. An individual `Radio` can exist outside of a `RadioGroup`, which is intentional: Atlassian's forms sometimes need a radio button nested within a complex custom layout where the standard `RadioGroup` wrapper would impose unwanted structural constraints. However, `RadioGroup` is the strongly recommended path for the common case because it handles selection state, keyboard navigation, orientation layout, and screen reader semantics automatically. Atlassian takes a clear position against pre-selecting options by default: users must consciously choose, reflecting a design principle that in productivity software — where choices often affect project configurations, permissions, or workflow states — accidental selections from a pre-populated default carry real consequences. Error and validation handling is group-level, using associated error message elements that are connected to the group container rather than to individual radio items.

## Key Decisions
1. **Radio can be used standalone; RadioGroup is the recommended pattern** (HIGH) — Unlike Spectrum, which enforces RadioGroup as mandatory, Atlassian permits `Radio` to exist alone. This was a deliberate flexibility choice driven by Atlassian's complex product surfaces where standard group wrappers sometimes conflict with custom layouts (e.g., a radio embedded in a table row, a card-based selection UI, or a drag-reorderable list). The tradeoff is that standalone `Radio` usage requires the developer to manually manage `checked` state, `onChange`, and keyboard navigation across the group — discipline the system cannot enforce.

2. **No default selection; explicit user choice required** (HIGH) — Atlassian explicitly recommends against pre-selecting options in radio groups. In Jira and Confluence configurations, selections affect how workflows route, how permissions are applied, and how content is classified. A user who tabs past a pre-selected radio without noticing could submit a form with an incorrect configuration. The system favors transparency over convenience: if nothing is selected, the form should not quietly proceed with an assumed value.

3. **Orientation via layout prop on RadioGroup** (MEDIUM) — `RadioGroup` supports both vertical (default) and horizontal arrangements. The default is vertical because Atlassian's forms are predominantly narrow, sidebar-width panels where horizontal radio groups would either wrap awkwardly or require truncated labels. Horizontal is available for wider settings panels and inline filter contexts where the UI has confirmed sufficient width through layout constraints.

4. **Group-level error handling with associated message** (HIGH) — Validation errors are attached to the `RadioGroup` container, not to individual `Radio` elements. The error message renders below the group and is associated via `aria-describedby` on the group element. This matches Atlassian's Form component's validation pattern, ensuring radio groups integrate seamlessly into the same validation workflow as text inputs, selects, and other field types in the same form.

5. **5–7 option usability ceiling** (MEDIUM) — Atlassian documentation implies that radio groups with more than 5–7 options should be replaced with a Select or Dropdown Menu. While not a hard component limit, this guidance reflects research showing that scanning more than 7 options in a radio list creates cognitive overhead comparable to an open-ended input, at which point a select's collapsible list is a better affordance. This is one of the more explicit quantified thresholds among Tier 1 systems.

## Notable Props
- `isRequired` (on `RadioGroup`): Marks the group as mandatory and communicates this to screen readers; required at the group level, not per-radio.
- `isDisabled` (on `Radio` or `RadioGroup`): Can be applied to the whole group or to individual radios; disabling individual options allows "some options unavailable" scenarios without removing them from visual context.
- `defaultValue` (on `RadioGroup`): Uncontrolled initial selection; provided as an escape hatch for simple forms but not recommended for production configuration UIs where explicit state control is preferred.
- `value` / `onChange` (on `RadioGroup`): Controlled selection pattern; the primary recommended usage for any form that requires validation or server-round-trip submission.
- `label` (on `RadioGroup`): The group label rendered above the options and associated via accessible labeling; not optional in standard usage.

## A11y Highlights
- **Keyboard**: Tab moves focus to the `RadioGroup` as a single stop, landing on the selected radio or the first radio if nothing is selected. Arrow Up/Left moves to and selects the previous option. Arrow Down/Right moves to and selects the next option. Navigation wraps from last to first and first to last. Tab moves focus out of the group.
- **Screen reader**: On entering the group, announces group label and role ("group"). Each radio announces its label and checked state. When selection changes via arrow keys, the new selection is announced immediately. Error messages linked via `aria-describedby` on the group container are announced when focus enters the group in an error state.
- **ARIA**: `role="radiogroup"` on the `RadioGroup` wrapper, `role="radio"` on each `Radio`, `aria-checked` for selection state, `aria-required` on the group, `aria-describedby` linking to error message element.

## Strengths & Gaps
- **Best at**: Balancing flexibility and structure — the Radio/RadioGroup split accommodates both standard form use and custom complex layouts, while the group-level error handling and explicit validation integration make it production-ready for Atlassian's enterprise form contexts.
- **Missing**: No explicit `orientation` prop documentation detailing how horizontal layout handles label wrapping or minimum width constraints, leaving designers without concrete guidance for responsive radio group layouts.
