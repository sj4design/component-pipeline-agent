---
system: Fluent 2 (Microsoft)
component: Combobox
url: https://react.fluentui.dev/?path=/docs/components-combobox--docs
last_verified: 2026-03-29
confidence: high
---

# Combobox

## Approach
Fluent 2's Combobox implements the ARIA combobox pattern as a text input that reveals a listbox of options, combining free-text entry with suggestion/selection from a list. It is used extensively across Microsoft 365 — for example, the "To" and "Cc" fields in Outlook compose, recipient pickers in Teams, and search-filtered dropdowns in SharePoint. The component supports both single and multi-select modes, making it a versatile replacement for both a simple dropdown (when filtering is needed) and a tag-input field. Option lists can be grouped with headers and can render custom option content beyond plain text labels. Like all Fluent 2 form inputs, Combobox integrates with the Label and Field wrapper components for consistent label, hint, and validation message layout across Microsoft 365 forms.

## Key Decisions
1. **ARIA combobox pattern compliance** (HIGH) — Built strictly to the WAI-ARIA 1.2 combobox pattern, ensuring correct behavior with assistive technologies used across the enterprise — a non-negotiable for Microsoft's accessibility commitments.
2. **Multi-select with tag display** (HIGH) — Selected values in multi-select mode render as dismissible tags inside the input, mirroring the people-picker pattern familiar from Outlook and Teams, reducing training cost for enterprise users.
3. **Grouped options support** (HIGH) — `Option` items can be wrapped in `OptionGroup` with a header label, enabling categorized lists (e.g., "Recent", "Suggested", "All Contacts") common in Office scheduling and search workflows.
4. **Controlled and uncontrolled modes** (MEDIUM) — Both value patterns are supported, allowing simple uncontrolled usage for prototyping and full controlled usage for server-driven filtering (important for large org directory lookups).
5. **Custom option rendering** (MEDIUM) — Options accept arbitrary React children, enabling avatars, status indicators, and secondary text lines in suggestion lists — essential for people pickers with presence/availability data.

## Notable Props
- `value`: controlled input text value
- `selectedOptions`: array of selected option values (controlled multi-select)
- `onOptionSelect`: callback with selected option value and text
- `multiselect`: enables multi-select mode with tag display
- `freeform`: allows input values not present in the option list
- `placeholder`: input placeholder text
- `appearance`: `"outline"` | `"underline"` | `"filled-darker"` | `"filled-lighter"`
- `disabled`: disables the entire combobox
- `size`: `"small"` | `"medium"` | `"large"`
- `listbox`: slot for customizing the dropdown container

## A11y Highlights
- **Keyboard**: Alt+Down/Up or F4 opens/closes the dropdown; Arrow keys navigate options; Enter selects; Escape closes and returns focus to input; Backspace removes last tag in multi-select mode.
- **Screen reader**: Input announces `role="combobox"` with `aria-expanded`, `aria-haspopup="listbox"`, and `aria-autocomplete`; options list uses `role="listbox"`; each option has `role="option"` with `aria-selected`; selected tags include dismiss buttons with accessible labels.
- **ARIA**: Full WAI-ARIA 1.2 combobox pattern; `aria-controls` links input to listbox; `aria-activedescendant` tracks focused option; high-contrast mode supported via Fluent color tokens mapping to Windows system colors.

## Strengths & Gaps
- **Best at**: People-picker and search-as-you-type patterns consistent with Outlook/Teams UX; multi-select with tags; grouped and custom-rendered options; strong ARIA compliance for enterprise a11y requirements.
- **Missing**: No built-in async loading state or skeleton for remote data fetching; no virtualization for very large option lists (thousands of entries); no creatable option (add new value not in list) without freeform mode workarounds; tag overflow/truncation behavior in constrained widths requires custom handling.
