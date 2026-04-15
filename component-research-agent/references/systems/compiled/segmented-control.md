---
component: segmented-control
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Segmented buttons (single-select and multi-select)
**Approach:** M3's Segmented buttons handle both single-select and multi-select in one component via the `singleSelect` boolean. In single-select mode, a checkmark icon replaces the leading icon of the selected segment. Maximum 5 segments is a documented guideline — beyond 5, a different pattern (tabs, chips) is recommended. ARIA role adapts between `radio` (single) and `checkbox` (multi).
**Key Decisions:**
- [HIGH] Single and multi-select unified: `singleSelect` boolean controls the semantic model — same visual component, different ARIA role and selection behavior
- [MED] Checkmark replaces leading icon: selected state is communicated by replacing the segment's icon with a checkmark rather than only through color/border — additional visual signal for color-blind users
- [MED] Maximum 5 segments: documented constraint based on mobile screen width and cognitive load — M3 teams that need more options are steered to Tabs or Chips
**Notable API:** `singleSelect: boolean`; each segment supports `icon`, `label`, `selected`, `onClick`; `role="radiogroup"` (single) or `role="group"` with `role="checkbox"` (multi)
**A11y:** `role="radio"` in single-select maps correctly to single-choice semantics; `role="checkbox"` in multi-select maps to multi-choice. Checkmark icon addition provides non-color visual selected state.
**Best at:** Multi-select segmented control — M3 is the only Tier 1 system where multi-select segmented control is a first-class documented variant (not a workaround).
**Missing:** Animation between selected states; overflow behavior for >5 segments.

---

## spectrum
**Component:** ActionGroup (segmented control equivalent)
**Approach:** Spectrum's ActionGroup is the segmented control equivalent, supporting three selection modes: `none` (pure action buttons), `single` (radio-like), `multiple` (checkbox-like). Overflow items collapse into a "more" menu when space is insufficient. `density` prop controls compactness. `isEmphasized` applies the selected state with the accent color. `onAction` fires for action mode; `onSelectionChange` fires for select modes.
**Key Decisions:**
- [HIGH] Three selection modes: none/single/multiple in one component; `selectionMode` prop switches the ARIA role and interaction model — most flexible segmented control in Tier 1
- [HIGH] Overflow collapse to "more" menu: when ActionGroup items don't fit, overflow items are hidden in a dropdown — no truncation, no horizontal scroll; all actions remain accessible
- [MED] `onAction` vs. `onSelectionChange`: separate callbacks for action mode vs. selection mode prevents conflating button-group (fire action) with segmented control (change state) semantics
**Notable API:** `selectionMode: "none" | "single" | "multiple"`; `density: "compact" | "regular" | "spacious"`; `isEmphasized: boolean`; `overflowMode: "wrap" | "collapse"`
**A11y:** `role="toolbar"` for action mode; `role="radiogroup"` for single select; individual items are `role="radio"` or `role="checkbox"`. Overflow trigger has `aria-label="More..."` with the collapsed items accessible in the menu.
**Best at:** Overflow collapse to "more" menu — the only Tier 1 segmented control that handles overflow items accessibly without truncation.
**Missing:** Visual sliding indicator animation between selected states (Ant Design's distinctive feature).

---

## carbon
**Component:** ContentSwitcher (semantic distinction from Tabs)
**Approach:** Carbon explicitly distinguishes ContentSwitcher from Tabs: ContentSwitcher changes the view of the same content type (e.g., viewing chart data as bar vs. line vs. table); Tabs navigates between unrelated content sections. Three sizes (sm/md/lg). Icon-only segments require a Tooltip for accessible label. `selectedIndex` controlled. `aria-pressed` toggle semantics on each button.
**Key Decisions:**
- [HIGH] Documented semantic distinction from Tabs: ContentSwitcher is for view mode switching on the same data; Tabs is for distinct content sections — prevents misuse that creates incorrect document structure
- [MED] Icon-only + Tooltip requirement: icon-only ContentSwitcher buttons require a Tooltip for accessible labels — Carbon enforces this as a design guideline for icon-only usage
- [MED] `aria-pressed` on each button: each button in the switcher is an independent toggle button with `aria-pressed` rather than a radio in a group — technically incorrect for single-select (radio semantics would be more appropriate)
**Notable API:** `selectedIndex: number`; `size: "sm" | "md" | "lg"`; `onChange: ({index, name}) => void`; icon support with required tooltip for icon-only
**A11y:** `aria-pressed` on each button (not radio semantics — a documented trade-off); associated label via `<p>` or `<legend>` on the container. Icon-only buttons require Tooltip for accessible names.
**Best at:** Semantic distinction from Tabs in documentation — Carbon's explicit guidance on when to use ContentSwitcher vs. Tabs is the clearest in Tier 1.
**Missing:** Sliding indicator animation; `aria-pressed` toggle semantics are less semantically correct than `role="radio"` for single-select exclusive-choice behavior.

---

## polaris
**Component:** Absent — ButtonGroup variant="segmented" workaround
**Approach:** Polaris has no Segmented Control component. A `ButtonGroup` with `variant="segmented"` renders buttons visually connected into a group, but there is no selection state, no roving tabindex, and no group ARIA. Teams use this as a visual approximation, managing selection state manually and adding ARIA themselves. Acknowledged gap in Polaris.
**Key Decisions:**
- [HIGH] Absent: Polaris's merchant-first philosophy has not identified segmented control as a high-priority merchant interaction pattern
- [MED] ButtonGroup "segmented" visual only: visually connected buttons without built-in selection semantics — the component does not know which button is "selected"
- [MED] No roving tabindex: all buttons remain individually Tab-focusable (rather than using a single tab stop with arrow key navigation) — inconsistent with ARIA radio group patterns
**Notable API:** `ButtonGroup` with `variant="segmented"`; no selection state management; no group ARIA built-in
**A11y:** Teams must add `role="radiogroup"` on the ButtonGroup, `role="radio"` on each button, `aria-checked` on the selected button, and roving tabindex manually.
**Best at:** Nothing for true segmented control — the visual approximation works but requires full consumer ARIA implementation.
**Missing:** Built-in selection state, correct ARIA semantics, roving tabindex, and visual selected state indicator.

---

## atlassian
**Component:** Absent — coverage gap
**Approach:** Atlassian has no Segmented Control component in the current ADS. This is documented as a coverage gap, not a philosophical decision. The Atlassian editor's toolbar uses a segmented control-like button group pattern internally but it is not exposed as a public design system component. Teams use a composed ButtonGroup with manual ARIA.
**Key Decisions:**
- [HIGH] Absent: acknowledged gap in the Atlassian Design System; editor toolbar implementation is internal only
- [MED] ButtonGroup workaround: standard pattern is `@atlaskit/button` components grouped with `role="radiogroup"` and manual selection state management
- [MED] No roving tabindex: ButtonGroup workaround does not implement roving tabindex — all buttons remain in the Tab order individually
**Notable API:** No dedicated component. `@atlaskit/button` group with manual `role="radiogroup"` and `aria-checked`.
**A11y:** No component-level guidance. Teams must implement the full ARIA radio group pattern manually for accessible segmented controls.
**Best at:** Nothing for this pattern — acknowledged gap with no current roadmap entry.
**Missing:** Entire Segmented Control component including selection state, ARIA role, roving tabindex, and visual selected indicator.

---

## ant-design
**Component:** Segmented (with sliding indicator animation)
**Approach:** Ant Design's Segmented component is single-select only. Its defining visual feature is a sliding indicator that animates between selected segments — more visually polished than any other Tier 1 implementation. `options` accepts strings, numbers, or objects with custom ReactNode `label` for custom segment content. `block` makes the component fill its container width. `role="radio"` ARIA is correct for single-select.
**Key Decisions:**
- [HIGH] Sliding animation indicator: the selected state is communicated by an animated pill that slides from segment to segment — the most visually distinctive segmented control in Tier 1
- [MED] `options` accept custom ReactNode label: segments can contain icons, text, or composite content — supports icon-only, text-only, or icon+text segment configurations
- [MED] Single-select only: no multi-select mode — Ant Design separates single-choice segmented control from multi-choice checkbox groups rather than unifying them in one component
**Notable API:** `options: string[] | {label: ReactNode, value, disabled}[]`; `block: boolean` for full-width; `size: "large" | "default" | "small"`; `value`/`onChange` for controlled mode
**A11y:** `role="radiogroup"` on the container; `role="radio"` on each segment; `aria-checked` on the selected segment. Roving tabindex is implemented — Arrow keys navigate between segments, Tab exits the group. The sliding animation should respect `prefers-reduced-motion` (verify in current implementation).
**Best at:** Sliding indicator animation and ReactNode label support for rich segment content — the most polished visual segmented control in Tier 1.
**Missing:** Multi-select mode; overflow handling for too many segments (no collapse to "more" like Spectrum).
