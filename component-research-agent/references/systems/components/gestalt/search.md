---
system: Gestalt (Pinterest)
component: SearchField
url: https://gestalt.pinterest.systems/web/searchfield
last_verified: 2026-03-28
confidence: medium
---

# SearchField

## Approach
Gestalt provides a dedicated SearchField component because search is central to Pinterest's UX — searching for pins, boards, people, and ideas. The SearchField has a built-in search icon, clear button, and the specific keyboard behavior expected of a search input. It supports both controlled and uncontrolled modes and can show a cancel button for mobile contexts.

## Key Decisions
1. **Dedicated SearchField** (HIGH) — Pinterest's prominent search experience requires a purpose-built component with search-specific behaviors.
2. **cancelButton** (MEDIUM) — A cancel button that appears alongside the search input on mobile, allowing users to exit the search mode and return to browsing. This is a mobile-specific Pinterest UX pattern.
3. **onChange and onSubmit** (HIGH) — Both events are handled: onChange for live search results, onSubmit for explicit search submission.

## Notable Props
- `value` / `onChange`: controlled search text
- `onSubmit`: search submission callback
- `placeholder`: placeholder text
- `cancelButton`: shows cancel button on mobile
- `accessibilityClearButtonLabel`: clear button accessible label (required when clear button shows)

## A11y Highlights
- **Keyboard**: Enter submits; Escape clears; clear button keyboard accessible
- **Screen reader**: required accessibilityClearButtonLabel enforces accessible clear button; search semantics
- **ARIA**: role="search" on form wrapper; proper labeling enforced

## Strengths & Gaps
- **Best at**: cancelButton for mobile; accessibilityClearButtonLabel enforcement; Pinterest search patterns
- **Missing**: No autocomplete suggestion integration in base component
