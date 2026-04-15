---
system: Material Design 3
component: Menus (Dropdown Menu, Context Menu, Exposed Dropdown Menu)
url: https://m3.material.io/components/menus
last_verified: 2026-03-28
---

# Menus

## Approach

Material Design 3 treats menus as temporary surfaces that display a list of choices — never as persistent navigation. The core philosophy is that menus exist to reduce visual clutter: rather than spreading every action across the screen permanently, menus surface options on demand and dismiss immediately after a choice is made. This approach reflects Google's broader Material principle of progressive disclosure — show users only what they need, when they need it.

MD3 draws a sharp distinction between its three menu types: a **dropdown menu** is triggered by a button, icon, or action and surfaces commands; a **context menu** is triggered by a long-press (mobile) or right-click (desktop) and reveals actions relevant to whatever was pressed; an **exposed dropdown menu** displays the currently selected value in an always-visible text field anchored to the menu. The exposed dropdown is MD3's direct equivalent of a select — the difference from a standard dropdown is that the current value is always visible in the trigger field, giving users instant feedback on their current state. This three-way split means designers are never guessing which pattern to apply: commands use dropdown menus, contextual actions use context menus, and value selection uses the exposed dropdown.

The system explicitly warns that menus should not serve as primary navigation. This constraint exists because menus are ephemeral by nature — they vanish after interaction and leave no persistent wayfinding landmark — so using them for navigation would disorient users who need a stable sense of where they are in an application.

## Key Decisions

1. **Three distinct menu types instead of one** (HIGH) — MD3 formalizes the dropdown menu, context menu, and exposed dropdown as separate components rather than variants of a single Menu component. The WHY is that each type has a fundamentally different trigger mechanism and communicates a different user intent: deliberate button action vs. contextual right-click vs. value selection. Collapsing all three into one component forces implementors to make trigger decisions in code rather than forcing the right choice at the design/usage level.

2. **Exposed Dropdown is the Select equivalent** (HIGH) — Rather than a native `<select>` element or a separate Select component, MD3 routes all "pick a value" use cases through the Exposed Dropdown Menu. The WHY is consistency: by building selection behavior on top of the same menu infrastructure, the system avoids maintaining two separate overlay and keyboard-navigation implementations. The tradeoff is that the exposed dropdown is heavier than a native select and has known accessibility friction in editable (autocomplete) mode, particularly on Android with TalkBack.

3. **Contextual menu items are dynamic** (MEDIUM) — MD3 explicitly supports removing or disabling menu items based on app state, not just having a static list. This matters because menus surface as many as 12 items; showing irrelevant options forces users to parse noise. Removing items entirely (rather than always disabling them) keeps the surface clean, but the guidance cautions against inconsistency — menus that constantly change shape can disorient users who build muscle memory for item positions.

4. **Dividers as section separators** (MEDIUM) — Menus support divider elements in their anatomy to visually group related items. The WHY is cognitive chunking: a flat list of 8–12 items is harder to scan than two groups of 4–6. Dividers communicate that items within a section share a relationship or category, letting users skip entire groups when scanning for a specific action.

5. **No native keyboard shortcut display** (LOW) — MD3's menu documentation does not specify a built-in slot for showing keyboard shortcuts next to menu items (unlike Carbon, which explicitly supports this). The reasoning appears to be platform focus: MD3 originated as a mobile-first system (Android), where keyboard shortcuts are rare. Web implementations must layer this on top of the base component.

6. **Overflow menu is the canonical 3-dot pattern** (MEDIUM) — The overflow menu is a first-class variant of the dropdown menu, triggered by a three-dot icon button commonly placed in app bars. The WHY is that app bars have finite space, and actions that don't fit must be accessible without abandoning the screen. Rather than forcing designers to invent their own pattern each time, MD3 formalizes the overflow menu as the standard solution, giving users a consistent target across Google products.

## Notable Props

- `type` (dropdown / context / exposed-dropdown): Determines trigger mechanism and interaction model — the most architecturally significant choice when reaching for a menu.
- `elevation`: Defaults to 3dp, reflecting MD3's elevation-as-depth philosophy where menus sit clearly above page content.
- Icon support via `InsetDrawable` (Android): Icons are possible in menu items but require a known workaround in the Android implementation — a signal that icon menus were not a primary design target.

## A11y Highlights

- **Keyboard**: Arrow keys navigate between items; Enter/Space activate; Escape closes. In exposed dropdown menus, the TextField acts as an anchor and focus returns to it on close.
- **Screen reader**: TalkBack on Android reads menu item text automatically. Exposed dropdown menus announce name, role, and value in compliance with WCAG 4.1.2. Helper text and label text on exposed dropdowns are strongly encouraged.
- **ARIA**: The menu container takes `role="menu"`; individual items take `role="menuitem"`. The trigger button should carry `aria-haspopup="true"` and `aria-expanded` to communicate open/closed state. The editable variant of the exposed dropdown has known screen reader friction and is flagged as less accessible than the read-only form.

## Strengths & Gaps

- **Best at**: Formalizing three distinct menu types with clear when-to-use guidance, eliminating the design decision of "which menu pattern do I use here?"
- **Missing**: Native keyboard shortcut display in menu items, explicit guidance on danger/destructive item styling, and submenu depth guidance — all of which Carbon and Spectrum handle more explicitly.
