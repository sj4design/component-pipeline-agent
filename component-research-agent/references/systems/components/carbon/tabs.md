---
system: IBM Carbon
component: Tabs
url: https://carbondesignsystem.com/components/tabs/code/
last_verified: 2026-03-28
---

# Tabs

## Approach
Carbon frames tabs as a dual-variant system: Line tabs and Contained tabs, each designed for a specific visual context. Line tabs use a simple bottom border indicator and are the default choice -- they are lightweight and work well in most page layouts. Contained tabs fill a rectangular container with a visible background, making them feel like segmented controls. IBM introduced the Contained variant because enterprise dashboards and data-heavy interfaces needed tabs that visually "held" their content, creating a stronger association between the tab label and the panel below it. Carbon also makes a deliberate distinction between Automatic and Manual activation modes, which is unusual -- most systems default to automatic and do not surface the choice. Carbon exposes this because IBM's products include scenarios where tab panels contain expensive data fetches (reports, analytics), and automatic activation would trigger unnecessary API calls as users arrow through tabs to find the one they want.

## Key Decisions
1. **Line vs Contained as explicit variants** (HIGH) — Line tabs are minimal (underline indicator only), suited for content-heavy pages where the tabs should recede. Contained tabs have a filled background, suited for dashboards or cards where the tab needs to feel physically connected to its panel. Most systems offer only one visual style. Carbon provides both because IBM's product range spans sparse documentation pages (where Line works) and dense operational dashboards (where Contained provides necessary visual anchoring). Designers must choose intentionally.

2. **Manual vs Automatic activation as a first-class choice** (HIGH) — In Automatic mode, arrowing to a tab immediately selects it and loads its panel. In Manual mode, arrowing moves focus without selecting -- the user must press Enter or Space to activate. Carbon surfaces this because IBM's enterprise products routinely have heavy tab panels (data tables, charts, live feeds) where triggering a render on every arrow press wastes resources and creates flicker. The modes are visually identical, so Carbon requires designers to annotate their intent in specs.

3. **Scrollable overflow with arrow buttons** (MEDIUM) — When tabs overflow the container, Carbon adds clickable arrow buttons at the edges of the tablist. These arrows are visible to mouse users but excluded from the keyboard focus order because keyboard users navigate with arrow keys directly. This choice reflects Carbon's enterprise context: users often have many tabs (10+) in data management interfaces, and hiding them in a dropdown (like Spectrum) would make it harder to scan available options.

## Notable Props
- `type="contained"`: Switches the visual treatment from line to contained, a single prop that changes the entire visual model. This simplicity encourages designers to commit to one style per context.
- `activation="manual"`: Decouples focus from selection. This is rare in tab implementations and directly addresses the performance concern of expensive panel rendering.
- `dismissable`: Allows individual tabs to be closed with an X icon, supporting workflows where users open and close dynamic tab items (similar to browser tabs).
- `iconSize`: Controls the size of optional icons inside tabs, reflecting Carbon's grid-based sizing system.

## A11y Highlights
- **Keyboard**: Arrow keys navigate between tabs (wrapping at ends). Tab key moves from tablist into the active panel. In scrollable mode, keyboard users skip the scroll arrows entirely -- arrows keys handle scrolling implicitly.
- **Screen reader**: The tablist takes a single tab stop. Active tab is announced with "selected" state. Panel content is associated via `aria-labelledby`. Automatic mode announces content changes via implicit focus movement.
- **ARIA**: Standard `role="tablist"`, `role="tab"`, `role="tabpanel"`. The scroll arrows have `aria-hidden="true"` because they are redundant for keyboard/screen reader users -- an elegant detail that avoids announcing decorative controls.

## Strengths & Gaps
- **Best at**: Serving enterprise data-heavy interfaces where the Manual activation mode prevents wasteful rendering and the Contained variant provides strong visual anchoring for dense layouts.
- **Missing**: No vertical orientation support -- all Carbon tabs are horizontal-only, which limits use in sidebar or panel-based layouts common in IDE-style tools.
