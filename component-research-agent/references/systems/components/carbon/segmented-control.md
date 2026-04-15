---
system: Carbon (IBM)
component: ContentSwitcher
url: https://carbondesignsystem.com/components/content-switcher/usage/
last_verified: 2026-03-28
---

# Segmented Control (Carbon / ContentSwitcher)

## Approach
Carbon's equivalent of a segmented control is called ContentSwitcher, and the naming choice is the most important thing to understand about it. IBM deliberately named this component for its use case — switching between different views of content on the same page — rather than for its visual form. This distinguishes ContentSwitcher from Tabs in Carbon's taxonomy: Tabs are for navigating between separate sections (and can involve URL changes), while ContentSwitcher is explicitly for in-page view toggling with no URL change and no page navigation. This semantic separation reflects IBM's experience building complex enterprise dashboards (in products like Watson, IBM Cloud, and Maximo) where the same data surface needs multiple representations (table vs. chart vs. map) and developers frequently misused Tabs for this purpose, creating accessibility problems (Tabs' ARIA pattern implies tabpanel content hidden with display:none, while ContentSwitcher uses conditional rendering or visibility toggling). The component is single-select only — there is no multi-select ContentSwitcher because IBM determined that multi-select view switching is a UX antipattern in content-display contexts.

## Key Decisions
1. **ContentSwitcher vs. Tabs is a semantic distinction, not a visual one** (HIGH) — They look similar, but Tabs use `role="tablist"` / `role="tab"` / `role="tabpanel"` ARIA, while ContentSwitcher uses `role="group"` with toggle buttons. This matters because screen readers announce tab panels as associated content regions; ContentSwitcher's content association is implied by context rather than explicit ARIA roles. Carbon's documentation is explicit that using ContentSwitcher when you mean Tabs (or vice versa) is an accessibility violation, not just a style preference.
2. **Icon-only variant with tooltip** (MEDIUM) — ContentSwitcher supports icon-only segments where the label is hidden and replaced by a tooltip on hover/focus. This is designed for toolbars and compact view-switching scenarios in IBM Cloud dashboards where showing "Table view" / "Card view" / "List view" as full text labels would consume too much horizontal space. The tooltip is mandatory when using icon-only mode — Carbon enforces this in documentation.
3. **Size variants aligned to Carbon's density system** (MEDIUM) — ContentSwitcher offers small (32px), medium (40px, default), and large (48px) sizes. The size selection is documented not as a visual preference but as a functional one: small for toolbar contexts, medium for standalone controls, large for primary page-level view switching. IBM's enterprise products have strict density rules per surface type.

## Notable Props
- `onChange`: Fires when selection changes — single selection only, no multi-select event model.
- `selectedIndex`: Controlled selection state; ContentSwitcher is designed to be a controlled component because the content it switches is always managed by the parent.
- `size`: `"sm" | "md" | "lg"` — documented with specific use-case guidance per size.

## A11y Highlights
- **Keyboard**: Arrow keys move between switches; Tab exits the group. This matches the radio group keyboard pattern from the ARIA APG, which is correct for single-select mutually exclusive options.
- **Screen reader**: `role="group"` with `aria-label` on the container; individual switches are `<button>` elements with `aria-pressed` reflecting selection state. This is semantically different from MD3's checkbox/radio ARIA approach — Carbon uses toggle button semantics rather than radio/checkbox.
- **ARIA**: `aria-pressed="true/false"` on each switch button. Carbon's choice of toggle button semantics (vs. radio semantics used by MD3) is a deliberate decision: toggle buttons announce their own state change, whereas radio buttons require the group context to be meaningful.

## Strengths & Gaps
- **Best at**: Semantic clarity — the ContentSwitcher vs. Tabs distinction and the explicit documentation on when to use which is the clearest treatment of the "view switching vs. navigation" question in any Tier 1 system.
- **Missing**: No multi-select variant, no overflow handling, and no responsive behavior for narrow containers — all of which Spectrum's ActionGroup provides.
