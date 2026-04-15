---
system: GitHub Primer
component: Autocomplete / SelectPanel
url: https://primer.style/components/autocomplete
last_verified: 2026-03-28
confidence: high
---

# Combobox (Autocomplete / SelectPanel)

## Approach
GitHub Primer provides two components that fulfill combobox needs: Autocomplete (a filterable dropdown for single value selection with text input) and SelectPanel (a panel-based filterable multi-select component used throughout GitHub for assigning labels, assignees, and reviewers). SelectPanel is particularly prominent in GitHub's issue/PR workflow where users filter and select from potentially long lists of collaborators, labels, or milestones.

## Key Decisions
1. **SelectPanel for multi-select filtering** (HIGH) — SelectPanel provides a dialog/panel-based approach to multi-select filtering, used for assigning multiple labels, reviewers, or project columns to GitHub issues and PRs, making it the most visible combobox pattern in GitHub's UI.
2. **Autocomplete for single-value** (HIGH) — Autocomplete is the standard filterable single-select combobox for text inputs where users type to filter a dropdown list of options.
3. **Async filtering support** (MEDIUM) — Both Autocomplete and SelectPanel support async option loading for large GitHub datasets (repository contributors, organization members).

## Notable Props
- Autocomplete: `items`, `onSelectedChange`, `filterFn`, `loading`
- SelectPanel: `items`, `selected`, `onSelectedChange`, `onFilterChange`, `title`

## A11y Highlights
- **Keyboard**: Autocomplete: Down/Up to navigate; Enter to select; Escape to close. SelectPanel: Tab within panel; Space to toggle selection; Enter to confirm
- **Screen reader**: Autocomplete: role="combobox" pattern; SelectPanel: dialog pattern with listbox inside
- **ARIA**: Autocomplete: role="combobox", aria-expanded, aria-activedescendant; SelectPanel: role="dialog" with role="listbox" inside; aria-multiselectable

## Strengths & Gaps
- **Best at**: GitHub label/assignee/reviewer multi-select (SelectPanel); filterable single-value autocomplete; GitHub collaboration workflow patterns
- **Missing**: SelectPanel's dialog pattern adds extra interaction step compared to inline dropdowns; heavy for simple single-select needs
