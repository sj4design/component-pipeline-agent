---
system: Atlassian Design System
component: Select (single, multi, creatable, async, popup, checkbox, radio)
url: https://atlassian.design/components/select/
last_verified: 2026-03-28
---

# Select

## Approach
Atlassian takes a variant-rich, single-component approach built on top of react-select. Rather than splitting selection into separate components, ADS exposes one Select family with specialized sub-types: single select, multi select, creatable select, async select, async-creatable select, checkbox select, popup select, and radio select. This reflects Jira and Confluence's reality -- these products need every selection pattern imaginable (assignee pickers, label creators, remote-loaded project lists) and having them all share one API surface reduces the learning curve for teams moving between variants. The react-select foundation provides battle-tested keyboard navigation and ARIA support while Atlassian layers on their design tokens and visual language. The trade-off is a heavier dependency and less control over internals compared to building from scratch.

## Key Decisions
1. **Built on react-select** (HIGH) -- Rather than building a select from scratch, Atlassian wraps react-select, the most widely-used React select library. This accelerated development and inherited years of community accessibility testing. The cost is tight coupling to an external dependency's API and bundle size, but the benefit is proven reliability across edge cases (keyboard, screen readers, mobile).
2. **Variant sub-types over boolean props** (HIGH) -- Instead of `<Select isCreatable isAsync isMulti>`, ADS provides `<AsyncCreatableSelect>` as a distinct import. This makes the API self-documenting and prevents invalid prop combinations. Each sub-type has focused documentation and examples, reducing cognitive load when choosing the right pattern.
3. **Checkbox and Radio select variants** (MEDIUM) -- ADS uniquely offers checkbox-select (multi-select with visible checkboxes) and radio-select (single-select with radio indicators). These exist because Jira's filter interfaces need to clearly show selection state inline, not just in the trigger. Visible selection indicators reduce user confusion in complex filtering workflows.
4. **Popup select** (MEDIUM) -- A variant that renders the select options in a popup/portal, specifically designed for use inside modals and tight spaces where a standard dropdown would be clipped. This solves a real problem in Jira's heavily-layered UI where modals within modals are common.

## Notable Props
- `isSearchable`: Available across all variants, defaults to true for most sub-types -- reflecting that Atlassian product users typically deal with long option lists
- `isClearable`: Explicit clearability control, important for filters where "no selection" is a valid state distinct from a default value
- `menuPortalTarget`: Renders the dropdown in a React portal, solving z-index and overflow issues in complex layouts like Jira boards
- `formatOptionLabel`: Custom render function for options, enabling rich content (avatars, status badges) that Atlassian products heavily use

## A11y Highlights
- **Keyboard**: Full arrow key navigation, type-ahead search, Enter to select, Backspace to remove in multi-select, Escape to close menu.
- **Screen reader**: Options announced with label and position. Selection changes announced. Multi-select communicates selected count.
- **ARIA**: Uses `role="combobox"` with `aria-autocomplete` when searchable, `role="listbox"` when not. `aria-live` region for dynamic announcements.

## Strengths & Gaps
- **Best at**: Breadth of variants covering virtually every enterprise selection pattern; rich option rendering (avatars, badges); async data loading as a first-class pattern.
- **Missing**: Heavy bundle size from react-select dependency; limited ability to customize menu positioning logic; no built-in virtual scrolling for very large lists; styling customization requires understanding react-select's style system.
