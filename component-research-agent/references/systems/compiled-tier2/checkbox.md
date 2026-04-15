---
component: Checkbox
tier: 2
last_verified: 2026-03-28
---

# Checkbox — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Checkbox | Native input[type=checkbox]; CheckboxGroup; indeterminate state | high |
| Salesforce Lightning | Checkbox | Native checkbox; Checkbox Group; Checkbox Button (button-style toggle) | high |
| GitHub Primer | Checkbox | Native input[type=checkbox]; CheckboxGroup with fieldset/legend; FormControl | high |
| shadcn/ui | Checkbox | Radix UI Checkbox; custom visual; indeterminate support; react-hook-form friendly | high |
| Playbook | Checkbox | Form checkboxes; dual React/Rails | medium |
| REI Cedar | CdrCheckbox | Vue checkbox; native input basis; WCAG 2.1 AA | medium |
| Wise Design | Checkbox | Consent and preference forms | low |
| Dell Design System | Checkbox | Enterprise form checkboxes | low |

## Key Decision Patterns

**Native vs. custom:** Paste, Primer, and Cedar wrap native input[type=checkbox] — full browser/OS accessibility. shadcn/ui (Radix) uses a custom-styled checkbox for design control, implementing keyboard behavior custom but correctly.

**Checkbox group semantics:** All systems use fieldset + legend for checkbox groups (or aria-group equivalent). This is the correct ARIA pattern for grouping related checkboxes. Primer and Paste make CheckboxGroup a first-class component that applies fieldset/legend automatically.

**Indeterminate state:** JavaScript-only (no HTML attribute). Paste, Lightning, and shadcn/ui support the indeterminate state for "select all" parent checkboxes where some children are selected. Requires setting `indeterminate` prop or JS `element.indeterminate = true`.

**Button-style checkbox:** Lightning's Checkbox Button provides a toggle-button visual for checkbox semantics — useful for multi-select filter chips without a grid layout.

## A11y Consensus
- input[type=checkbox] with associated label (htmlFor/id or wrapping)
- Groups: fieldset + legend (not just aria-label)
- Indeterminate: aria-checked="mixed"; set element.indeterminate via JS
- Checked state visually communicated by more than color alone
- Required group: aria-required on fieldset (or first item with aria-required="true")

## Recommended Use
Use native checkbox (Paste, Primer) for best OS/browser integration. Use Radix/shadcn Checkbox when custom visual styling is required. Always wrap checkbox groups in fieldset + legend.
