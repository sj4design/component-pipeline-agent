---
system: GitHub Primer
component: Checkbox
url: https://primer.style/components/checkbox
last_verified: 2026-03-28
confidence: high
---

# Checkbox

## Approach
GitHub Primer's Checkbox is a styled native checkbox component used within FormControl for complete accessible form fields. Primer provides CheckboxGroup for related checkbox sets. The component is used throughout GitHub for feature flags, permission selections, notification settings, and repository settings. Primer's checkbox has a clean, minimal visual style consistent with GitHub's UI.

## Key Decisions
1. **FormControl composition** (HIGH) — Checkbox is always composed within FormControl, which provides label, caption, and error associations via React context, enforcing accessible checkbox patterns.
2. **Indeterminate support** (HIGH) — Full indeterminate state support for tree/hierarchy checkboxes used in GitHub's file tree selection and permission matrix patterns.
3. **CheckboxGroup with legend** (HIGH) — CheckboxGroup renders a fieldset with visually styled legend for accessible grouping, supporting GitHub's permission and notification preference panels.

## Notable Props
- `checked` / `defaultChecked`: Controlled/uncontrolled state
- `indeterminate`: Partial-selection state
- `disabled`: Disabled state
- `validationStatus`: "error" | "success" | "warning" (via FormControl)

## A11y Highlights
- **Keyboard**: Space toggles; Tab to focus; FormControl manages label association
- **Screen reader**: Checked/unchecked/mixed announced; FormControl provides group label context
- **ARIA**: aria-checked="mixed" for indeterminate; fieldset/legend via CheckboxGroup; FormControl wires aria-required, aria-invalid, aria-describedby

## Strengths & Gaps
- **Best at**: GitHub permission/settings checkbox patterns; FormControl composition for accessibility; clean visual style
- **Missing**: No button/visual variant; limited to standard checkbox appearance
