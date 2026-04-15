---
system: Material Design 3
component: Tabs
url: https://m3.material.io/components/tabs/guidelines
last_verified: 2026-03-28
---

# Tabs

## Approach
Material Design 3 treats tabs as a hierarchical navigation pattern split into two distinct semantic tiers: Primary and Secondary. Primary tabs sit directly below the top app bar and represent top-level content destinations within a screen, while Secondary tabs live inside a content area to subdivide related information. This two-tier split exists because Google found that a single tab style created ambiguity in complex interfaces where tabs appeared at multiple levels of the page hierarchy -- users could not tell if a tab changed the entire view or just a subsection. M3 also enforces a strict choice between Fixed and Scrollable layouts: Fixed tabs divide available width equally among all items (best for 2-4 tabs of similar label length), while Scrollable tabs allow natural label widths and horizontal overflow (necessary when tab count is dynamic or labels vary in length). This rigid categorization prevents the "mushy middle" where tabs half-scroll and half-squeeze.

## Key Decisions
1. **Two semantic tiers: Primary vs Secondary** (HIGH) — M3 is the only major system that formalizes two distinct tab hierarchies as separate components (PrimaryTabRow, SecondaryTabRow in Compose). Primary tabs get a full-width active indicator bar at the bottom and support icon+label or icon-only configurations. Secondary tabs get a thinner underline and are label-only. The reason: Google's product surfaces (Gmail, Maps, Drive) routinely nest tabs inside tabs, and without visual differentiation users lose track of which level of navigation they are interacting with.

2. **Fixed vs Scrollable as an explicit architectural choice** (MEDIUM) — Rather than auto-detecting overflow, M3 forces designers to choose Fixed or Scrollable up front. Fixed tabs guarantee equal-width distribution, which enforces visual rhythm but breaks with long labels. Scrollable tabs allow variable widths but require edge-fade affordance to signal more content. Google chose explicit declaration because auto-switching between the two modes at a breakpoint would cause jarring layout shifts.

3. **Icon placement flexibility on Primary tabs only** (MEDIUM) — Primary tabs support three configurations: label-only, icon+label (stacked vertically), and icon-only. Secondary tabs are restricted to label-only. The rationale is that secondary tabs are smaller and more numerous, so adding icons would create visual clutter that competes with primary-level navigation. This constraint keeps the secondary tier lightweight.

## Notable Props
- `PrimaryTabRow` / `SecondaryTabRow`: Separate composables in Jetpack Compose enforce the two-tier model at the API level -- you cannot accidentally use a secondary indicator style for top-level navigation.
- `ScrollableTabRow(edgePadding)`: Controls the inset before the first tab in scrollable mode, defaulting to 52dp to leave breathing room, reflecting M3's opinion that tabs should not bleed to screen edge.
- `TabRow(indicator)`: Accepts a custom composable for the active indicator, allowing teams to replace the default bottom bar with custom shapes while keeping the selection logic intact.

## A11y Highlights
- **Keyboard**: Arrow keys move focus between tabs; Tab key moves focus into the active panel. Home/End jump to first/last tab. Active tab has `tabindex="0"`, inactive tabs have `tabindex="-1"`.
- **Screen reader**: Active tab announces "selected" via `aria-selected="true"`. Each tab has `aria-controls` pointing to its panel; each panel has `aria-labelledby` back to the tab.
- **ARIA**: Tablist container uses `role="tablist"`, individual items use `role="tab"`, content areas use `role="tabpanel"`. M3 recommends automatic activation (focus = selection) for faster keyboard interaction.

## Strengths & Gaps
- **Best at**: Providing clear visual hierarchy when tabs exist at multiple levels in the same view, thanks to the Primary/Secondary distinction.
- **Missing**: No built-in overflow/disclosure pattern for when too many tabs exist -- Scrollable mode shows them off-screen but does not surface a count or "more" affordance, which can hide important destinations.
