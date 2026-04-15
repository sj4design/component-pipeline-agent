---
system: GitHub Primer
component: InlineAutocomplete / EditableText (not a dedicated component)
url: https://primer.style/components/inline-autocomplete
last_verified: 2026-03-28
confidence: high
---

# InlineEdit

## Approach
GitHub Primer does not have a dedicated InlineEdit component. GitHub's pattern for editing text inline (issue titles, PR titles, repository descriptions) is custom-implemented at the application level. Primer does provide InlineAutocomplete — a component for inserting @mentions and emoji shortcuts into text inputs — which is adjacent but distinct from inline field editing. Click-to-edit patterns in GitHub are product-specific implementations.

## Key Decisions
1. **No dedicated InlineEdit** (HIGH) — GitHub's inline editing is implemented at the application layer, not as a Primer component.
2. **InlineAutocomplete** (MEDIUM) — Primer's InlineAutocomplete wraps text inputs to provide @ and # suggestion dropdowns, used in issue/PR comment composers.

## Notable Props
- InlineAutocomplete: `triggers`, `suggestions`, `onShowSuggestions`, `onHideSuggestions`

## A11y Highlights
- **Keyboard**: InlineAutocomplete: triggers on @ or # character; arrow keys through suggestions; Enter to select; Escape to dismiss
- **Screen reader**: Suggestions announced via combobox pattern; selection announced
- **ARIA**: role="combobox" pattern for suggestion dropdown; aria-expanded; aria-activedescendant

## Strengths & Gaps
- **Best at**: InlineAutocomplete for @mentions and emoji in text inputs; GitHub comment composer patterns
- **Missing**: No generic click-to-edit inline field component
