---
system: Carbon Design System (IBM)
component: Radio Button + RadioButtonGroup
url: https://carbondesignsystem.com/components/radio-button/usage/
last_verified: 2026-03-28
---

# Radio Button

## Approach
Carbon's radio button design reflects IBM's enterprise product reality: dense forms, data-heavy interfaces, and users who often need to scan and compare options quickly. The system provides both a `RadioButton` (the individual control) and a `RadioButtonGroup` (the required wrapper that manages shared state, group label, and orientation). What makes Carbon stand out is its explicit opinion on orientation: `RadioButtonGroup` defaults to `horizontal` layout — the only major design system to do so — because many IBM product UIs are wide-format dashboards and data tables where horizontal space is available and vertical space is at a premium. Carbon also takes a firm stance on default selection: no option is pre-selected by default, but the system is designed so that the first item always receives focus if no selection exists. This prevents the silent form-submission problem where a user skips a radio group and a pre-selected default gets submitted without their awareness. The accessibility implementation uses native `fieldset` and `legend` elements as the semantic backbone, which means Carbon's radio groups carry proper HTML structure without ARIA retrofitting.

## Key Decisions
1. **RadioButtonGroup defaults to horizontal orientation** (HIGH) — Every other major design system defaults to vertical. Carbon defaults to horizontal because IBM's products — Cloud console, Watson tooling, business analytics platforms — are desktop-first, wide-format environments where horizontal radio groups fit naturally alongside labels, filters, and controls in the same row. Vertical was considered but would have required most IBM form implementations to override the default, which is a signal to flip the default. This is a direct product-context decision baked into the API.

2. **No item pre-selected by default; first item takes focus** (HIGH) — Carbon explicitly does not recommend pre-selecting an option. The rationale is enterprise form integrity: in IBM products, form submissions often trigger real-world actions (provisioning resources, configuring systems, running queries) where a silently defaulted radio button could cause unintended consequences. Making the user consciously choose prevents accidental submissions. The first item receiving focus on Tab (when nothing is selected) is a usability compromise — users can still press Space immediately to select without needing to press an arrow key first.

3. **`defaultSelected` vs. `valueSelected` as separate controlled/uncontrolled props** (MEDIUM) — `defaultSelected` sets the initial value for an uncontrolled group (React does not track it after mount). `valueSelected` is the controlled prop, requiring external state management. This mirrors React's standard controlled/uncontrolled pattern and is explicitly documented as distinct concepts, not just aliases. This matters because developers choosing the wrong one can get confusing behavior where state appears to be lost on re-render.

4. **Keyboard navigation uses arrow keys; single tab stop for the whole group** (HIGH) — The entire `RadioButtonGroup` occupies one tab stop. Arrow keys (up/down and left/right both work) cycle through options within the group and simultaneously select them. This matches the ARIA radiogroup keyboard model and prevents the accessibility anti-pattern of tabbing through every radio item. When no item is pre-selected, Space selects the currently focused (first) item, and arrow keys move to the next.

5. **`legendText` as a required group label prop** (MEDIUM) — The group label is a required prop on `RadioButtonGroup` (via `legendText`), not optional. This enforces accessible labeling at the API level — a developer cannot render a `RadioButtonGroup` without providing a label string, which maps to a semantic `legend` element. The alternative (making it optional) would allow unlabeled groups that are inaccessible to screen readers.

## Notable Props
- `orientation`: `"horizontal"` (default) or `"vertical"` — notable because the default is the inverse of every other major system.
- `defaultSelected`: Sets initial value in uncontrolled usage; React manages state internally after mount.
- `valueSelected`: Controlled value prop; requires external state and `onChange` handler.
- `legendText`: Required group label; maps to `<legend>` in HTML — enforces accessible grouping.
- `readOnly`: Prevents selection changes while maintaining visual and keyboard accessibility; added explicitly because IBM products frequently show locked configuration views.

## A11y Highlights
- **Keyboard**: Tab enters the group at the selected radio or, if nothing is selected, at the first radio. Arrow Up/Left moves to the previous option and selects it. Arrow Down/Right moves to the next option and selects it. Tab exits the group. Space selects the focused option when focus lands on an unselected item.
- **Screen reader**: Group is announced as "group, [legendText]" when focus enters. Each radio announces "[label], radio button, [checked/unchecked], [position] of [total]". Disabled options announce as "unavailable."
- **ARIA**: Uses native `<fieldset role="radiogroup">` and `<legend>` for group semantics. Individual radios use `<input type="radio">` with associated `<label>`. No ARIA polyfilling needed — semantic HTML carries full accessibility meaning.

## Strengths & Gaps
- **Best at**: Enterprise form patterns — the `legendText` enforcement, dual controlled/uncontrolled API, `readOnly` state, and horizontal-default orientation collectively make Carbon the most opinionated and production-hardened radio implementation among Tier 1 systems.
- **Missing**: No built-in group-level error/validation display on `RadioButtonGroup` itself — error handling must be managed externally, which is a notable gap for form validation workflows.
