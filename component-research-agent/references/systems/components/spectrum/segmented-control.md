---
system: Spectrum (Adobe)
component: ActionGroup
url: https://react-spectrum.adobe.com/react-spectrum/ActionGroup.html
last_verified: 2026-03-28
---

# Segmented Control (Spectrum / ActionGroup)

## Approach
Spectrum does not have a component named "Segmented Control" — the equivalent is ActionGroup, which is a more general-purpose component designed for toolbar-style groupings of actions or selections. This naming reflects Adobe's product reality: in Photoshop, Illustrator, and Experience Platform, these compact button clusters appear as tool selectors, view toggles, and filter groups simultaneously, and the unifying concept is that they are groups of related actions, not just a selection mechanism. ActionGroup therefore supports three distinct behaviors — single selection (like a segmented control), multi-selection, and pure action execution with no persistent selection state — all within the same component. Spectrum's most distinctive contribution in this space is overflow handling: when an ActionGroup has more items than fit in the available space, it automatically collapses excess items into a "more" dropdown menu. This reflects Adobe's panel-heavy UIs where a toolbar might appear in a narrow side panel where 5+ items would overflow. No other Tier 1 system handles ActionGroup overflow at the component level.

## Key Decisions
1. **Overflow collapse to dropdown menu** (HIGH) — When ActionGroup items overflow their container, Spectrum automatically places excess items into a collapsible menu triggered by a "..." button. The threshold is determined by the container width at render time. This is essential for Adobe's responsive panel architecture where the same toolbar might render in a 280px sidebar or a full-width toolbar depending on the view. Teams using MD3 segmented buttons or Carbon ContentSwitcher must implement overflow handling themselves.
2. **Three selection modes: none, single, multiple** (HIGH) — The `selectionMode` prop with values `"none"`, `"single"`, and `"multiple"` makes ActionGroup serve as a pure action toolbar, a radio group, or a checkbox group respectively. Spectrum chose a single component for all three because Adobe's design teams found they frequently needed to switch between modes during product iteration, and having a single API reduces the surface area of change.
3. **Density control with compact and regular sizes** (MEDIUM) — ActionGroup supports `density` prop for compact and regular spacing, tied to Spectrum's overall density system that responds to user preferences. This emerged from Experience Platform's data-dense tables where toolbar buttons needed to match the row density of the surrounding content.

## Notable Props
- `selectionMode`: `"none" | "single" | "multiple"` — the key prop that determines whether ActionGroup behaves as an action toolbar, radio group, or checkbox group.
- `overflowMode`: Controls overflow behavior; `"collapse"` (default) collapses to a menu, `"wrap"` wraps to a new line.
- `isEmphasized`: Applies a more prominent visual treatment to selected items — used when the ActionGroup is the primary control on a surface rather than a secondary toolbar element.
- `onAction`: Callback for no-selection mode; `onSelectionChange` for selection modes — the distinct callbacks make the behavioral contract clear.

## A11y Highlights
- **Keyboard**: Arrow key navigation within group (roving tabindex). Tab moves through groups. In single selection mode, the selected item retains focus on Tab return.
- **Screen reader**: `role="radiogroup"` for single selection, `role="group"` for multi-select. Individual buttons have `role="radio"` or `role="checkbox"` accordingly. The group's `aria-label` is required.
- **ARIA**: Spectrum's implementation follows React Aria's useRadioGroup and useCheckboxGroup hooks under the hood, ensuring the ARIA pattern matches the ARIA Authoring Practices Guide precisely.

## Strengths & Gaps
- **Best at**: Overflow handling — the automatic collapse to a "more" menu is the most sophisticated overflow solution for this component type in any Tier 1 system.
- **Missing**: No visual differentiation between "selection mode" and "action mode" when used as a pure action toolbar — designers must rely on context to communicate that no persistent state is being set.
