---
system: Carbon (IBM)
component: Form + FormGroup + FormItem
url: https://carbondesignsystem.com/components/form/usage/
last_verified: 2026-03-28
---

# Form / FormGroup / FormItem

## Approach

Carbon treats the Form layer as infrastructure for layout and grouping, not as a validation controller. This is a deliberate separation of concerns rooted in IBM's enterprise product philosophy: form fields in Carbon products are often highly specialized (data table editors, complex filter panels, configuration forms for technical products), and coupling validation logic to a generic Form container would constrain how those specialized fields could operate. Instead, Carbon's Form component is a structural wrapper that ensures correct spacing, grid alignment, and semantic HTML structure. Validation is handled entirely per-field — each Carbon field component (TextInput, Dropdown, DatePicker) has its own `invalid` and `invalidText` props, and the field itself renders the error message inline below the control.

The FormGroup subcomponent exists specifically to solve a semantic HTML accessibility problem: radio button groups and checkbox groups need a `<fieldset>` and `<legend>` to be properly announced by screen readers. FormGroup provides this wrapping with a `legendText` prop rather than leaving teams to remember to add fieldsets manually. FormItem is a utility wrapper for general layout purposes. This three-component architecture (Form → FormGroup → FormItem) reflects Carbon's grid-first design philosophy — forms are composed within Carbon's 16-column grid, and these components help fields align correctly to grid columns.

## Key Decisions

1. **Validation is per-field, not form-level** (HIGH) — There is no centralized validation controller or `validationErrors` prop on the Form. Each field manages its own invalid state via `invalid={true}` and `invalidText="Error message"`. The WHY: IBM enterprise products need custom validation logic that varies significantly by field type — a password field has different validation than a CIDR range input than a Cloud region selector. A centralized form validator would need to know about all these field types. By pushing validation to the field level, each specialized Carbon component can own its own validation presentation while sharing visual conventions (border, icon, inline error message).

2. **Validation timing: on blur, not on change** (HIGH) — Carbon's documented recommendation is that real-time validation (client-side) should fire when the field loses focus, not on every keystroke. The WHY: Validating on change creates an anxious user experience where users see error states before they've finished typing. Carbon's enterprise audience is entering technical data (IP addresses, API keys, resource identifiers) where partial input is always technically invalid. Waiting for blur means the error appears only after the user signals they're done with that field.

3. **Required vs optional marking: depends on majority** (MEDIUM) — Carbon has a nuanced required-field convention: if most fields are required, mark only the optional fields as "(optional)"; if most fields are optional, mark only the required fields as "(required)". The WHY: The goal is to minimize visual noise while maximizing signal. Marking every required field with an asterisk in a form where 9 of 10 fields are required adds clutter without adding information. This contextual convention requires product teams to make a judgment call per form, which is more cognitively demanding than a universal rule but produces cleaner UIs.

4. **Default layout: top-aligned labels only** (MEDIUM) — Carbon currently only offers top-aligned labels as a standard layout. There is no horizontal/side-label layout option at the Form level. The WHY: Top-aligned labels provide a consistent left edge for scanning, place the label in close visual proximity to its field (reducing cognitive load), and perform better in usability testing for data entry speed. Carbon made this an enforced standard rather than an option to reduce inconsistency across IBM products. Teams needing horizontal labels must implement custom CSS.

5. **Default layout: stacked fluid vs fixed** (MEDIUM) — Carbon forms can use default (fixed-width) inputs aligned to a grid or fluid inputs that stretch to fill their grid column. Fluid forms use the condensed grid and inputs appear flush against each other with 1px separators rather than gaps. The WHY: Dense data-entry forms (configuration panels, filter sets) benefit from fluid layout because it uses vertical space efficiently. Standard forms benefit from fixed-width inputs because they constrain the visual width of the input to what makes sense for the expected input length (e.g., a ZIP code field should not span 8 grid columns).

## Notable Props/API

- `invalid` (on field components, not Form): The per-field error trigger. Set to `true` by the parent component's validation logic. There is no automatic invalid state management — the developer computes validity and passes it down. This is intentional: it puts validation logic in application code, not in the design system component.
- `invalidText` (on field components): The error message string. Rendered as a paragraph below the field with a warning icon. Per Carbon guidelines, this should be specific ("Password must be at least 16 characters") not generic ("Invalid input").
- `legendText` (on FormGroup, required): The accessible label for the fieldset. Mandatory prop because a fieldset without a legend is inaccessible — Carbon enforces the accessibility contract at the component API level by making it required.
- `warn` / `warnText` (on field components): A warning state distinct from invalid — for non-blocking issues. This is notable because most systems only have error states; Carbon adds a warning tier that lets fields signal concern without blocking submission.

## A11y Highlights

- **Keyboard**: Tab traversal follows DOM order; no form-level keyboard management. Forms render as native `<form>` elements. Enter submits from text inputs following native browser behavior. FormGroup wraps in `<fieldset>` ensuring radio/checkbox groups are announced as groups by screen readers.
- **Screen reader**: `invalidText` renders as visible text and is linked to the field via `aria-describedby`. The error icon is hidden from screen readers (`aria-hidden`) to avoid redundant announcements. Helper text below fields is also linked via `aria-describedby`. Carbon documentation specifies that `aria-required` should be added to required fields — this is handled by the individual field components when `required` prop is passed.
- **ARIA**: FormGroup generates `<fieldset>` + `<legend>` — the correct semantic grouping for radio and checkbox groups. Individual fields receive `aria-invalid="true"` when `invalid` prop is set. The `aria-describedby` on each field points to both the helper text ID and the error message ID when both are present.

## Strengths & Gaps

- **Best at**: Grid-aligned form layout and the warn/invalid distinction — Carbon is the only Tier 1 system with a non-blocking warning state on fields, which is valuable in enterprise configuration UIs where values might be unusual but not technically invalid.
- **Missing**: Any form-level validation orchestration — there is no mechanism for a form to collect all invalid states, prevent submission when fields are invalid, or display a summary of errors at the form level. Teams must wire all of this themselves.
