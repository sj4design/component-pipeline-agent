---
system: Salesforce Lightning Design System
component: Button Group (Segmented)
url: https://lightningdesignsystem.com/components/button-groups/
last_verified: 2026-03-28
confidence: medium
---

# Segmented Control (Button Group)

## Approach
Lightning's Button Group provides the visual connected-button pattern used as a segmented control. For selection semantics, Lightning's Radio Button Group provides the correct ARIA radio semantics for single-selection segmented controls. Both patterns are available; the choice between them depends on whether the control maintains persistent selection state or triggers one-time actions.

## Key Decisions
1. **Radio Button Group for selection** (HIGH) — When the segmented control represents persistent state (view mode: list/grid), Lightning's Radio Button Group provides correct radio semantics.
2. **Button Group for actions** (HIGH) — When buttons trigger distinct one-time actions (not persistent selection), Button Group without radio semantics is used.
3. **Icon + label combinations** (MEDIUM) — Common in Lightning for view mode toggles (icon + text or icon-only).

## Notable Props
- Radio Button Group: `value`, `onChange`, button variants
- Button Group: Connected button styling

## A11y Highlights
- **Keyboard**: Arrow keys within radio group; Tab for button groups
- **Screen reader**: Radio group semantics for persistent selection; button group semantics for actions
- **ARIA**: radiogroup/radio or button roles based on usage

## Strengths & Gaps
- **Best at**: Both action (button group) and selection (radio button group) variants
- **Missing**: No single "SegmentedControl" component; requires choosing the right component
