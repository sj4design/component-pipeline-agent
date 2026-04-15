---
system: IBM Carbon
component: Select, Dropdown, ComboBox, MultiSelect
url: https://carbondesignsystem.com/components/dropdown/usage/
last_verified: 2026-03-28
---

# Select / Dropdown / ComboBox / MultiSelect

## Approach
Carbon provides the most granular component hierarchy for selection patterns of any major design system. It maintains four distinct components: **Select** (native `<select>` wrapper), **Dropdown** (custom single-select), **ComboBox** (filterable single-select), and **MultiSelect** (filterable multi-select). This hierarchy exists because IBM's enterprise products span contexts from simple admin forms to complex data-filtering dashboards, and each selection complexity level deserves purpose-built UX. The native Select is preserved intentionally for contexts where OS-level rendering (mobile, embedded) is preferable. Carbon also uniquely offers two input styles -- "default" and "fluid" -- across all variants, acknowledging that information density requirements differ between standalone forms and inline-editing contexts.

## Key Decisions
1. **Four-component hierarchy instead of one configurable select** (HIGH) -- Each component has a focused API surface matching its complexity. Select wraps native behavior. Dropdown adds custom styling without filtering. ComboBox adds filtering. MultiSelect adds multi-selection with filtering. This prevents the "god component" anti-pattern where a single Select accumulates dozens of boolean flags.
2. **Three size options: small, medium, large** (MEDIUM) -- Carbon enforces consistent sizing tokens (32px, 40px, 48px) across all selection components. This matters in enterprise UIs where information density varies dramatically between monitoring dashboards (small) and data-entry forms (large).
3. **Default and Fluid input styles** (MEDIUM) -- Default style has visible borders and works standalone. Fluid style has no outer border and blends into container backgrounds, designed for inline editing and dense data tables. This dual-style system avoids the need for custom overrides in common enterprise layout patterns.
4. **AI-label integration** (MEDIUM) -- Carbon recently stabilized AI label support across all dropdown variants, adding an explainability affordance when AI influences the available options. This reflects IBM's enterprise AI positioning and provides a standardized way to signal AI involvement in form interactions.

## Notable Props
- `titleText` / `helperText` / `warnText`: Structured text slots that enforce consistent form field anatomy across all variants
- `readOnly`: Distinct from `disabled` -- allows focus and copy but prevents changes, critical for audit-trail UIs
- `direction`: Controls whether the menu opens `top` or `bottom`, needed for fixed-position layouts
- `type` (on Dropdown): Toggles between `default` and `inline` presentation without switching components

## A11y Highlights
- **Keyboard**: Space/Enter to open, arrow keys to navigate, type-ahead character matching, Escape to close. ComboBox adds full text editing.
- **Screen reader**: Labels, helper text, and error/warning states are programmatically associated. Option count announced on open.
- **ARIA**: Dropdown uses `role="listbox"`, ComboBox uses `role="combobox"`. State indicators (`aria-invalid`, `aria-disabled`, `aria-readonly`) applied consistently.

## Strengths & Gaps
- **Best at**: Enterprise-grade component hierarchy with clear escalation path from simple to complex; fluid style for dense data UIs; AI-readiness.
- **Missing**: No async/remote data loading built in; no creatable/tagging mode; MultiSelect lacks a "select all" feature natively (long-standing community request).
