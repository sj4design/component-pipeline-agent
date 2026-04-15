---
system: Carbon (IBM)
component: Checkbox
url: https://carbondesignsystem.com/components/checkbox/usage/
last_verified: 2026-03-28
---

# Checkbox

## Approach

IBM Carbon's checkbox philosophy is rooted in information-dense enterprise interfaces where form controls must be highly legible, structurally consistent, and carry robust error signaling without relying on color alone. Carbon treats the checkbox as a group-oriented component first: it expects checkboxes to appear in lists under a group label, with `<fieldset>` and `<legend>` providing semantic structure — not as a pattern developers wire up, but as the default generated markup. This enterprise orientation also explains Carbon's decision to expose error and warning states at the group level with helper text: in complex data-entry forms, a single validation message attached to a group is more actionable than per-checkbox error states. The component follows Carbon's universal size scale (`sm`, `md`, `lg`), which was standardized in v11 to bring all interactive components into a unified density ladder — meaning a checkbox in a dense data table can shrink to `sm` without breaking the grid. Custom rendering replaces native browser checkboxes to ensure pixel-perfect rendering across IBM's supported browsers and to support the Carbon Design Token system for theming.

## Key Decisions

1. **Group-level error and warning states with helper text** (HIGH) — Carbon exposes `invalid`, `warn`, and `helperText` at the group level rather than on individual checkboxes. The rationale is that in enterprise forms, a user failing to make a required selection is a group-level failure — messaging should explain what to do, not mark each individual checkbox as wrong. The helper text slot is replaced by the error/warning message on state change, preventing layout shift.

2. **Label always to the right of the input** (HIGH) — Labels are positioned to the right of their inputs in all cases. Carbon's research for enterprise products found that right-side labels minimize eye-travel in multi-item lists and align with the most common international convention. The click target extends across both the input and the label to maximize the interactive area, an explicit accessibility affordance.

3. **Standardized `sm` / `md` / `lg` size scale** (MEDIUM) — In v11, Carbon standardized the size prop across all form components. Checkboxes at `sm` are 16px, `md` are 20px (default), and `lg` are 24px. This decision exists because IBM products span dense analytics dashboards (where `sm` is appropriate) through accessible consumer-facing forms (where `lg` is appropriate), and having a consistent size vocabulary across all components lets designers and engineers communicate density changes systematically.

4. **Indeterminate for partial child selection** (HIGH) — Carbon documents the indeterminate state specifically for parent-child checkbox trees (e.g., a "Select all" row in a data table). The parent is programmatically set to indeterminate when some but not all children are selected. Carbon explicitly notes that the indeterminate state is programmatic — a user cannot place a checkbox into indeterminate by clicking, only code can. This prevents user confusion about what "clicking an indeterminate checkbox" would mean.

5. **`<fieldset>` / `<legend>` grouping** (HIGH) — Carbon's CheckboxGroup generates a `<fieldset>` wrapping `<legend>` for the group label. This is the semantically correct HTML structure for related checkboxes and is required for screen readers to correctly announce the group name before each individual checkbox label. Carbon generates this structure automatically to prevent the common developer error of using a `<div>` + `<p>` for visual grouping without the semantic relationship.

## Notable Props

- `invalid` / `invalidText`: Group-level error state and message — represents Carbon's enterprise approach of treating checkbox validation as a group concern, not a per-item concern.
- `warn` / `warnText`: Warning state distinct from error — reflects IBM's need for non-blocking feedback (e.g., "this selection affects downstream data") that does not prevent form submission.
- `indeterminate`: Forces the checkbox into the indeterminate visual state — scoped to programmatic use by parent-child tree logic.
- `size`: Accepts `sm`, `md`, `lg` — represents Carbon's standardized density system for adapting components across information-dense vs. accessible-first contexts.
- `hideLabel`: Visually hides the label while keeping it accessible — used in table row contexts where column headers serve as the label context.

## A11y Highlights

- **Keyboard**: Space toggles the focused checkbox. Tab/Shift+Tab moves through checkboxes in DOM order. No arrow-key navigation within groups (each checkbox is individually tabbable), which aligns with ARIA Authoring Practices for checkbox groups.
- **Screen reader**: Groups are wrapped in `<fieldset>`/`<legend>`, so screen readers announce the group label before each checkbox label (e.g., "Shipping options, Express delivery, unchecked"). Indeterminate state sets `aria-checked="mixed"`. Error messages are linked via `aria-describedby` on the group container.
- **ARIA**: `aria-checked="mixed"` for indeterminate; `aria-invalid="true"` on the group when invalid; `aria-describedby` links helper/error/warning text; `aria-disabled` for read-only-like disabled states at the group level.

## Strengths & Gaps

- **Best at**: Enterprise group-level validation UX — the warn/error/helper text pattern with a single message replacing the helper text on state change is the most complete treatment of group feedback among the Tier 1 systems.
- **Missing**: No built-in read-only state for individual checkboxes (as distinct from disabled) — there is no equivalent to Spectrum's `isReadOnly` that keeps the checkbox in the tab order while preventing changes.
