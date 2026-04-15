---
system: Salesforce Lightning Design System
component: Divider
url: https://lightningdesignsystem.com/utilities/dividers/
last_verified: 2026-03-28
confidence: high
---

# Divider

## Approach
Salesforce Lightning handles dividers primarily through utility classes rather than a dedicated component, though the Divider concept is documented as part of Lightning's utilities. The `slds-has-divider` utility classes add top/bottom borders to create visual separation between content sections, form groups, and list items in Lightning pages. A semantic HR is also available.

## Key Decisions
1. **Utility class approach** (HIGH) — Lightning uses CSS utility classes (`slds-has-divider_top-space`, `slds-has-divider_bottom-space`) to add dividers to existing elements, rather than a standalone Divider component, providing flexibility in complex layout contexts.
2. **List item dividers** (MEDIUM) — The `slds-has-divider` modifier is commonly used on list items within menus and vertical navigation to separate groups of items.
3. **HR for standalone dividers** (LOW) — Semantic `<hr>` is used for standalone horizontal rules between sections.

## Notable Props
- CSS utilities: `slds-has-divider--top`, `slds-has-divider--bottom`
- No dedicated React component; utility-based

## A11y Highlights
- **Keyboard**: Not interactive
- **Screen reader**: Semantic HR provides separator role; utility-class borders are decorative
- **ARIA**: Native HR semantics; decorative borders are CSS-only

## Strengths & Gaps
- **Best at**: Flexible utility class approach for adding dividers to any element; list item group separation
- **Missing**: No dedicated component with orientation/variant props; purely utility-based
