---
component: segmented-control
date: 2026-04-17
mode: --max
systems_count: 24
scope: all
---

# Segmented Control — Research Synthesis (--max mode, all 24 systems)

## Sistemas sin componente dedicado

| System | Tier | Approach | Reason |
|--------|------|----------|--------|
| Polaris (Shopify) | 1 | `ButtonGroup variant="segmented"` — visual only, no selection state | Merchant-first philosophy; not a high-priority merchant interaction pattern |
| Atlassian | 1 | ButtonGroup with manual `role="radiogroup"` + `aria-checked` | Acknowledged gap; editor toolbar implementation is internal-only |
| Twilio Paste | 2 | Not present — use Tabs or ButtonGroup | Not in scope |
| Playbook (eBay) | 2 | Not present — use Tabs or Buttons | Not common in eBay merchant flows |
| REI Cedar | 2 | Not present — use RadioGroup with button styling | Outdoor retail context |
| GOV.UK | 3 | Not present — Tabs for view-switching, Radios for filtering | "One thing per page" philosophy; iOS-associated aesthetic excluded |
| Gestalt (Pinterest) | 3 | Not present — Tabs preferred | Too similar to Tabs; mobile narrow-viewport degradation concern |
| Orbit (Kiwi.com) | 3 | Not present — domain-specific flight type toggle | One-way/round-trip toggle is domain-coupled; Tabs for informational switching |
| Nord (Nordhealth) | 3 | Not present — Tabs and RadioGroup preferred | Clinical option selection requires form semantics; consumer toggle aesthetic undersells clinical decision gravity |
| Base Web (Uber) | 3 | ButtonGroup `mode="radio"` — no animated indicator | Radio semantics via ButtonGroup mode prop |

**Systems with dedicated component: M3 (T1), Spectrum ActionGroup (T1), Carbon ContentSwitcher (T1), Ant Design Segmented (T1), GitHub Primer (T2), Salesforce Lightning button group radio (T2), shadcn/ui ToggleGroup (T2), Wise Design (T2), Dell DS (T2), Radix UI Themes (T3), Chakra UI v3 (T3), Fluent 2 preview (T3), Mantine (T3), Evergreen (T3)** — 14 of 24 systems.

---

## How Systems Solve It

### Material Design 3 (Tier 1) — `SegmentedButton`

M3 unifies single-select and multi-select in one component via a `singleSelect` boolean. In single-select mode, the selected segment's icon is replaced by a checkmark — an additional visual signal beyond color/border change that helps color-blind users. Maximum 5 segments is a documented guideline; beyond 5, M3 steers teams to Tabs or Chips. ARIA role adapts: `role="radiogroup"` for single-select, `role="group"` with `role="checkbox"` per segment for multi-select.

**Design Decisions:**
- **Single and multi-select unified via `singleSelect` boolean** — same visual component, different semantic model. _Why:_ the visual appearance of single-select and multi-select segmented buttons is identical; separating them into two components doubles the API surface for one visual pattern. _Impact:_ simpler import; semantic model controlled by one prop. _Para tu caso:_ if your design system only needs single-select, lock `singleSelect={true}` and skip multi-select API complexity.
- **Checkmark replaces leading icon on selection** — selected state communicated by icon change, not only color. _Why:_ color as the sole indicator of selected state fails WCAG 1.4.1; a checkmark provides a redundant non-color cue. _Impact:_ correct by default for color-blind users without any consumer effort. _Para tu caso:_ the strongest built-in selection indicator among all T1 systems.
- **Maximum 5 segments documented** — formal constraint, not just informal guidance. _Why:_ mobile screen width physically constrains horizontal segmented buttons; cognitive load increases with option count; more than 5 options benefit from a more scannable pattern (Tabs, Chips). _Impact:_ prevents a class of design errors before they reach production.

**Notable Props:** `singleSelect: boolean`; per-segment: `icon`, `label`, `selected`, `onClick`; `role="radiogroup"` (single) or `role="group"` with `role="checkbox"` (multi)

**Accessibility:** `role="radio"` for single-select (correct single-choice semantics); `role="checkbox"` for multi-select (correct multi-choice semantics). Checkmark icon provides non-color selected state.

---

### Spectrum / Adobe (Tier 1) — `ActionGroup`

Spectrum's ActionGroup is the most flexible segmented control equivalent in Tier 1: three selection modes (`none` for pure action buttons, `single` for radio-like, `multiple` for checkbox-like), all via one `selectionMode` prop. The defining differentiator is overflow handling: when ActionGroup items don't fit in available space, overflow items collapse into a "more" dropdown — no truncation, no horizontal scroll, all actions remain accessible. `density` controls compactness; `isEmphasized` applies accent color to the selected state; `onAction` fires for action mode, `onSelectionChange` fires for selection modes.

**Design Decisions:**
- **Three selection modes in one component** — `selectionMode: "none" | "single" | "multiple"`. _Why:_ toolbars frequently mix pure action buttons with single and multi-select toggles; a unified component reduces the number of different components needed to build a toolbar. _Impact:_ most versatile segmented control API in Tier 1. _Para tu caso:_ use when building mixed-mode toolbars; use dedicated segmented control (Ant/M3) when the selection-only use case is cleaner.
- **Overflow collapse to "more" menu** — items that don't fit are hidden in a dropdown; all remain accessible. _Why:_ truncation silently removes options from users; horizontal scroll is unusable for keyboard/AT users; overflow-to-menu is the only accessible solution for variable-width containers. _Impact:_ the only T1 segmented control that solves overflow accessibly. _Para tu caso:_ critical for responsive toolbars where container width varies.
- **`onAction` vs. `onSelectionChange`** — separate callbacks prevent conflating action (fire and forget) with selection (change state). _Why:_ using a selection-change callback for a button that triggers an action mixes interaction models; the API separation enforces the correct mental model. _Impact:_ cleaner consumer code; prevents state management bugs in mixed-mode toolbars.

**Notable Props:** `selectionMode: "none" | "single" | "multiple"`; `density: "compact" | "regular" | "spacious"`; `isEmphasized: boolean`; `overflowMode: "wrap" | "collapse"`; `onAction`; `onSelectionChange`

**Accessibility:** `role="toolbar"` for action mode; `role="radiogroup"` for single select; `role="group"` with `role="checkbox"` for multiple. Overflow trigger has `aria-label="More..."` with collapsed items in accessible menu.

---

### Carbon / IBM (Tier 1) — `ContentSwitcher`

Carbon makes the most explicit semantic distinction between ContentSwitcher and Tabs of any T1 system: ContentSwitcher changes the view of the *same content type* (viewing chart data as bar vs. line vs. table); Tabs navigates between *unrelated content sections*. This documentation prevents the most common misuse of segmented controls. Three sizes (sm/md/lg). Icon-only segments require a Tooltip for accessible label — enforced as a design guideline. `aria-pressed` toggle semantics on each button (technically a trade-off from the more correct `role="radio"` pattern).

**Design Decisions:**
- **Documented semantic distinction from Tabs** — ContentSwitcher vs. Tabs distinction is first-class documentation. _Why:_ confusing ContentSwitcher (view mode toggle on same data) with Tabs (navigation between content sections) creates incorrect document structure and navigation. _Impact:_ prevents the most common misuse. _Para tu caso:_ use ContentSwitcher for chart-type/view-mode/display-format toggling; use Tabs for content section navigation.
- **Icon-only + Tooltip requirement** — icon-only ContentSwitcher buttons require a Tooltip for accessible labels. _Why:_ icons without text labels lack accessible names; Carbon enforces this as a visible design guideline rather than leaving it to consumer discipline. _Impact:_ prevents accessibility failures in icon-only toolbar implementations. _Para tu caso:_ if icon-only segments are in scope, plan for tooltip integration from the start.
- **`aria-pressed` over `role="radio"` — documented trade-off** — each button uses `aria-pressed` rather than `role="radio"`. _Why:_ a trade-off decision; `role="radio"` would be semantically more correct for single-select exclusive-choice, but Carbon's button-group architecture predates the radio semantics decision. _Impact:_ slightly incorrect semantics but widely used — AT support for `aria-pressed` in button groups is consistent. _Para tu caso:_ prefer `role="radio"` in new implementations.

**Notable Props:** `selectedIndex: number`; `size: "sm" | "md" | "lg"`; `onChange: ({index, name}) => void`; icon support with required Tooltip for icon-only

**Accessibility:** `aria-pressed` on each button; associated label via `<p>` or `<legend>`; icon-only requires Tooltip.

---

### Ant Design (Tier 1) — `Segmented`

Ant Design's Segmented component has a sliding animated indicator as its defining visual feature — an animated pill that moves from segment to segment on selection. This is the most visually polished segmented control in T1. Single-select only (no multi-select mode). `options` accepts strings, numbers, or objects with custom ReactNode `label` for icon+text, icon-only, or text-only configurations. `block` makes the component fill container width. Correct `role="radiogroup"` + `role="radio"` + `aria-checked` ARIA pattern. Roving tabindex implemented — Arrow keys navigate, Tab exits the group. `prefers-reduced-motion` compliance should be verified.

**Design Decisions:**
- **Sliding animation indicator** — animated pill slides between segments on selection. _Why:_ the animation reinforces the selection change — users see the indicator physically move from the old selection to the new one, providing direct feedback. _Impact:_ most visually distinctive segmented control in any tier; defines the pattern's visual identity. _Para tu caso:_ must respect `prefers-reduced-motion`; implement CSS transition that can be suppressed.
- **`options` accepts ReactNode label** — segments can be icons, text, or composite. _Why:_ icon-only, text-only, and icon+text segments are all valid designs; a uniform `label: string` prop cannot accommodate icon-only without additional configuration. _Impact:_ one `options` array handles all segment content configurations. _Para tu caso:_ define a union type for option shape.
- **Single-select only** — no multi-select mode. _Why:_ Ant Design separates single-choice (Segmented) from multi-choice (Checkbox.Group) rather than unifying them in one component. _Impact:_ cleaner API; no `selectionMode` prop needed; consumer knows immediately it's exclusive-choice.

**Notable Props:** `options: string[] | { label: ReactNode, value, disabled }[]`; `block: boolean`; `size: "large" | "default" | "small"`; `value` / `onChange`; `disabled`

**Accessibility:** `role="radiogroup"` + `role="radio"` + `aria-checked`; roving tabindex implemented. Sliding animation needs `prefers-reduced-motion` handling.

---

### GitHub Primer (Tier 2) — `SegmentedControl`

Primer's SegmentedControl is one of the few T2 systems with a truly dedicated, named component. Supports icon + label, icon-only, and text-only segments. Full-width option. Used primarily for GitHub-style view switching (Code/Issues/Pull Requests view modes). Selection state managed internally or controlled. No animated indicator but clean, minimal implementation appropriate for GitHub's developer tool aesthetic.

---

### Salesforce Lightning (Tier 2) — Button Group radio variant

Lightning uses a radio-group button variant for single-select segmented control semantics. Implements `role="radiogroup"` internally. Used in CRM record page view switching. No animated indicator.

---

### shadcn/ui (Tier 2) — `ToggleGroup`

shadcn/ui's ToggleGroup is built on Radix UI ToggleGroup, supporting `type="single"` (single-select) and `type="multiple"` (multi-select). The most flexible T2 implementation for React apps. Icon-only variants common. No animated indicator in the default style. This is the reference implementation for the Radix-based single+multi selection model.

---

### Radix UI Themes (Tier 3) — `SegmentedControl`

Radix UI's Themes-layer SegmentedControl uses radio group semantics (not tabs) with a CSS animated sliding indicator. `prefers-reduced-motion` is respected — animation is suppressed via CSS media query. `size` and `radius` from Themes tokens. This is the reference implementation for the CSS transform sliding indicator with proper reduced-motion handling.

---

### Chakra UI v3 (Tier 3) — `SegmentedControl`

Not in Chakra v2; added in the v3 rewrite. Radio semantics with an animated indicator. `colorScheme` and `size` props. `v2` workaround was a styled RadioGroup. Less battle-tested than Mantine but provides the expected Chakra props API.

---

### Fluent 2 (Tier 3) — `SegmentedControl` (preview)

Preview status in Fluent 2. Radio group semantics. Icon + text segment support. Used in Teams/SharePoint view switching. Selected state communicated via filled indicator using shape change + contrast (not color alone) — the reference implementation for WCAG 1.4.1-compliant selected state indicator that does not rely on color.

---

### Mantine (Tier 3) — `SegmentedControl`

The most complete segmented control in the T3 set. `orientation` (horizontal and vertical) — vertical useful for sidebar filter panels. `fullWidth` fills container. CSS `transform: translateX()` sliding indicator with `transitionDuration` and `transitionTimingFunction` customization. `data` array API (simpler than `options` with object shape). `prefers-reduced-motion` supported. The reference implementation for vertical orientation and animation customization.

**Design Decisions:**
- **`orientation` supporting vertical** — most other systems only support horizontal. _Why:_ sidebar navigation panels and settings pages use vertical segmented controls. Providing horizontal-only forces teams to build vertical variants manually. _Impact:_ extends the component to sidebar use cases.
- **`transitionDuration` / `transitionTimingFunction` customization** — animation curve and duration are configurable. _Why:_ brand identity often extends to animation timing; standardizing on 200ms ease is not appropriate for all products. _Impact:_ rare level of animation control in a DS component.

**Notable Props:** `data: string[] | { label: ReactNode, value, disabled }[]`; `orientation: "horizontal" | "vertical"`; `fullWidth: boolean`; `transitionDuration: number`; `transitionTimingFunction: string`; `size`; `color`; `radius`

**Accessibility:** `role="radiogroup"` + `role="radio"` + `aria-checked`; roving tabindex; `prefers-reduced-motion` via CSS.

---

### Evergreen / Segment (Tier 3) — `SegmentedControl`

Used for analytics view-mode switching (chart type selection, time range). Data-driven `options` array. Controlled state. Size variants. No icon-only segments. The reference implementation for simple, data-driven view mode switching without animation.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: selection-group** — A row (or column) of connected segments where exactly one is selected at a time (primary case) or multiple can be selected (secondary case). Renders as a visually unified pill or connected button group. NOT a tab list (no content panels). NOT a radio group (no form semantics, no label/fieldset required).

**Rationale:** All T3 implementing systems unanimously chose `role="radiogroup"` semantics over `role="tablist"`. The semantic debate is settled: segmented controls select a value/filter/view-mode; tabs navigate between content sections. The sliding indicator animation (Ant, Radix, Chakra v3, Mantine) is now the expected visual polish; implementation must include `prefers-reduced-motion` suppression.

---

### Slot Consensus Table (systems with component: 14)

| Slot | Description | Systems | Consensus |
|------|-------------|---------|-----------|
| `segment` / `item` | Individual selectable option | All 14 | 14/14 |
| `label` (text) | Text content of segment | All 14 | 14/14 |
| `icon` (leading) | Icon inside segment | M3, Spectrum, Primer, Fluent 2, Ant, Mantine, shadcn | 7/14 |
| `indicator` / `thumb` | Sliding selection indicator | Ant, Radix, Chakra v3, Mantine | 4/14 |

---

### Property Consensus Table

| Property | Values Found | Systems | Consensus |
|----------|-------------|---------|-----------|
| `value` / `selectedIndex` | string/number (controlled) | All 14 | 14/14 |
| `defaultValue` | string/number (uncontrolled) | Ant, Mantine, Primer, shadcn | 4/14 |
| `onChange` / `onSelectionChange` | `(value) => void` | All 14 | 14/14 |
| `options` / `data` | array of strings or {label, value, disabled} | Ant, Mantine, Evergreen, shadcn | 4/14 |
| `disabled` (per segment) | boolean | Ant, Mantine, M3, Spectrum | 4/14 |
| `disabled` (whole component) | boolean | All 14 | ~14/14 |
| `size` | sm/md/lg or equivalent | Carbon, Ant, Mantine, Primer, shadcn | 5/14 |
| `block` / `fullWidth` | boolean | Ant, Mantine | 2/14 |
| `orientation` | `"horizontal" \| "vertical"` | Mantine | 1/14 |
| `selectionMode` | `"single" \| "multiple"` | Spectrum (via selectionMode), M3 (singleSelect), shadcn (type) | 3/14 |
| `transitionDuration` | number | Mantine | 1/14 |
| `density` | `"compact" \| "regular" \| "spacious"` | Spectrum | 1/14 |

---

### Boolean Properties Table

| Property | Default | Systems |
|----------|---------|---------|
| `block` / `fullWidth` | false | Ant, Mantine |
| `disabled` | false | All |
| `singleSelect` | true | M3 |
| `isEmphasized` | false | Spectrum |

---

### State Coverage Table

| State | Systems | Consensus |
|-------|---------|-----------|
| default (one option selected) | All 14 | 14/14 |
| hover | Most | ~12/14 |
| focused (keyboard) | All 14 | 14/14 |
| selected (active) | All 14 | 14/14 |
| disabled (per-segment) | M3, Spectrum, Ant, Mantine | 4/14 |
| disabled (whole) | All | 14/14 |
| animated-transition (sliding) | Ant, Radix, Chakra v3, Mantine | 4/14 |

---

### Exclusion Patterns

- GOV.UK explicitly excludes the pattern: "one thing per page" philosophy and research showing Tabs/Radios are clearer
- Nord explicitly excludes the pattern: clinical decision gravity argument — the pill-toggle aesthetic signals "lightweight preference" not "clinical decision"
- Orbit excludes the pattern: domain-specific flight-type toggle is coupled to form restructuring, not a view-mode toggle
- Gestalt excludes the pattern: too visually similar to Tabs; mobile narrow-viewport degradation
- Multi-select variant: only M3 and Spectrum include it as a first-class feature; most systems are single-select only

---

### Building Block Candidates

- `RadioGroup` — a11y container with `role="radiogroup"` and `aria-label`
- `Radio` (styled as pill button) — individual segment with `role="radio"` and `aria-checked`
- `Indicator` / `Thumb` — absolutely positioned animated sliding indicator
- `ToggleGroup` (Radix) — headless primitive for the single/multiple selection model

---

### Enum / Configuration Properties

| Property | Options | Default |
|----------|---------|---------|
| `size` | `"sm"`, `"md"`, `"lg"` | `"md"` |
| `orientation` | `"horizontal"`, `"vertical"` | `"horizontal"` |
| `selectionMode` | `"single"`, `"multiple"` | `"single"` |

---

### A11y Consensus

| Aspect | Consensus |
|--------|-----------|
| **Role** | `role="radiogroup"` on container; `role="radio"` per segment — NOT `role="tablist"` (unanimous across all implementing T3 systems) |
| **ARIA** | `aria-checked="true"` on selected segment; `aria-checked="false"` on others; `aria-disabled` on disabled segments; group needs `aria-label` or `aria-labelledby` |
| **Keyboard** | Arrow Left/Right for horizontal; Arrow Up/Down for vertical; selection activates immediately on arrow press (roving tabindex); Tab enters and exits the group as a single stop |
| **Focus** | Roving tabindex — only the selected segment is in the tab order; unselected segments are `tabindex="-1"` |
| **Icon-only** | Each icon-only segment needs `aria-label` — Carbon enforces via Tooltip, others must handle explicitly |
| **Selection indicator** | Must use more than color alone — shape change, border change, or fill contrast required (WCAG 1.4.1); Fluent 2's filled/elevated indicator is the reference |
| **Animation** | CSS `prefers-reduced-motion: reduce` must suppress sliding indicator animation; Radix Themes and Mantine handle this automatically |
| **APG Pattern** | Radio Group (https://www.w3.org/WAI/ARIA/apg/patterns/radio/) — not Tabs |

---

## What Everyone Agrees On

1. **`role="radiogroup"` + `role="radio"` is the correct ARIA pattern** — unanimous across all T3 implementing systems; the "tablist vs. radiogroup" debate is settled in favor of radiogroup for value-selection segmented controls.
2. **Roving tabindex** — only the selected segment is in the tab flow; Arrow keys navigate between options; this is the standard keyboard pattern for all implementing systems.
3. **Single-select as the primary mode** — multi-select is a secondary capability (M3, Spectrum only); most systems implement single-select only.
4. **`options` / `data` array API** — configuration-driven segment rendering via a data array is the dominant pattern among newer implementations (Ant, Mantine, Evergreen).
5. **`disabled` per segment** — at least 4 systems support disabling individual segments within an enabled group; this is needed for partially-available option sets.
6. **Selected state must not rely on color alone** — color-only selected state fails WCAG 1.4.1; Fluent 2's shape+contrast approach is the reference.
7. **Maximum segment count guidance (5 or less)** — M3 documents this explicitly; other systems leave it to design guidelines, but the cognitive-load argument is consistent.

---

## Where They Disagree

1. **`role="radiogroup"` (value selection) vs. `role="tablist"` (content switching)?**
   Option A (all T3 implementing systems — Radix, Chakra, Fluent 2, Mantine, Evergreen): `role="radiogroup"` — the component selects a value, not a content panel.
   Option B (Carbon ContentSwitcher): `aria-pressed` on individual buttons — a documented trade-off, not `role="radio"`.
   Note: NO T3 system uses `role="tablist"` for segmented controls. The debate is settled.

2. **Sliding animated indicator: required visual feature or optional enhancement?**
   Option A (Ant, Radix, Chakra v3, Mantine): sliding indicator is the defining visual feature — the component isn't "Segmented" without it.
   Option B (M3, Carbon, Primer, Evergreen, Spectrum): no sliding indicator; selection communicated via checkmark, color, border, or background change.

3. **Single component with `selectionMode` vs. single-select only?**
   Option A (M3, Spectrum, shadcn ToggleGroup): `singleSelect` / `selectionMode: "single" | "multiple"` — one component for both.
   Option B (Ant, Mantine, Carbon, Evergreen): single-select only — multi-select is a separate component or use case.

4. **`options` array API vs. compound children?**
   Option A (Ant, Mantine, Evergreen): `options: Array<{label, value, disabled}>` — data-driven, simpler for dynamic segments.
   Option B (M3, Spectrum, Carbon, Primer): children-based — each segment is a child component (`<Segment label="..." />`); more flexible for custom segment content.

5. **Overflow behavior when too many segments?**
   Option A (Spectrum ActionGroup): collapse overflow to "more" dropdown — the only accessible solution.
   Option B (most others): no overflow handling; consumer must limit segments to 5 or fewer.

6. **Vertical orientation support?**
   Option A (Mantine): `orientation="vertical"` first-class prop.
   Option B (all others): horizontal-only; vertical requires consumer CSS.

---

## Visual Patterns Found

### Standard horizontal 3-segment (most common)

```
┌────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────┐    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │    │
│  │  │  Month   │ ▣│  Week    │  │   Day    │         │    │
│  │  └──────────┘  └──────────┘  └──────────┘         │    │
│  └────────────────────────────────────────────────────┘    │
│             ↑ selected (filled pill / indicator)           │
└────────────────────────────────────────────────────────────┘
```

### With sliding animated indicator (Ant, Mantine, Radix)

```
┌────────────────────────────────────────────────────────────┐
│  ┌────────┬────────┬────────┐                             │
│  │  List  │  Grid  │  Map   │                             │
│  │  ════════════   │        │  ← indicator slides to Grid  │
│  └────────┴────────┴────────┘                             │
└────────────────────────────────────────────────────────────┘
```

### Icon + text segments (M3 checkmark, Primer, Fluent 2)

```
┌────────────────────────────────────────────────────────────┐
│  ┌──────────────┬──────────────┬──────────────┐           │
│  │ ✓ □  Code   │   ○  Issues  │   ○  PRs     │           │
│  └──────────────┴──────────────┴──────────────┘           │
│    ↑ selected (checkmark replaces icon in M3)             │
└────────────────────────────────────────────────────────────┘
```

### Icon-only (requires tooltip/aria-label)

```
┌──────────────────────────────────────────────────────────────┐
│  ┌────┬────┬────┐                                           │
│  │ ≡  │ ▦  │ ─  │                                           │
│  │ ▣  │ ○  │ ○  │  ← selected (filled background)          │
│  └────┴────┴────┘                                           │
│   List Grid  Map                                            │
│   ↑ tooltip/aria-label required per segment                 │
└──────────────────────────────────────────────────────────────┘
```

### Vertical orientation (Mantine)

```
┌────────────────────────────────────────────────────────────┐
│  ┌──────────────┐                                         │
│  │  Day         │  ← selected (indicator)                 │
│  ├──────────────┤                                         │
│  │  Week        │                                         │
│  ├──────────────┤                                         │
│  │  Month       │                                         │
│  ├──────────────┤                                         │
│  │  Year        │                                         │
│  └──────────────┘                                         │
└────────────────────────────────────────────────────────────┘
```

### Overflow with "more" menu (Spectrum ActionGroup)

```
┌────────────────────────────────────────────────────────────┐
│  ┌────────┬────────┬────────┬────────┬──────┐             │
│  │  Item1 │  Item2 │  Item3 │  Item4 │ ▼ 2  │             │
│  └────────┴────────┴────────┴────────┴──────┘             │
│                                         ↑ "more" dropdown  │
└────────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

| Risk | Severity | Notes |
|------|----------|-------|
| Using `role="tablist"` instead of `role="radiogroup"` | HIGH | The most common ARIA mistake for segmented controls. `role="tablist"` implies owned content panels (`role="tabpanel"`); without them, the structure is broken. Segmented controls have no panels — `role="radiogroup"` is correct. All T3 systems confirm this. |
| Sliding indicator animation without `prefers-reduced-motion` | HIGH | CSS sliding indicator animations (transform transitions) will fire for users who have requested reduced motion. Must suppress via `@media (prefers-reduced-motion: reduce)`. Mantine and Radix handle this automatically; custom implementations must add this explicitly. |
| Color-only selected state indicator | HIGH | WCAG 1.4.1 Non-text Contrast (Level AA) prohibits using color as the sole indicator of state. Selected state must have a secondary cue (shape change, border, elevated fill). Fluent 2's shape+contrast approach is the reference implementation. |
| Icon-only segments without accessible names | MEDIUM | Icon-only segments without `aria-label` have no accessible name — the segment is announced as a generic radio button with no context. Carbon requires Tooltip; others require explicit `aria-label` per segment. This is the most common accessibility failure in toolbar segmented controls. |
| No overflow handling for >5 segments | LOW | Without overflow handling (Spectrum's "more" menu), too many segments overflow the container and either wrap (confusing) or clip (inaccessible). Enforce a maximum segment count guideline (5 or fewer) or implement overflow.  |

---

## Next Steps

1. **Lock in `role="radiogroup"` semantics** — make this a code-level decision, not a documentation guideline. The ARIA roles should be baked into the component implementation, not configurable by consumers.
2. **Implement sliding indicator with `prefers-reduced-motion`** — the animated indicator is the visual signature; implement it from the start with `@media (prefers-reduced-motion: reduce)` CSS suppression.
3. **Decide single-select only vs. `selectionMode`** — if multi-select is needed, plan the API before implementation; retrofitting multi-select onto a single-select component requires significant ARIA and state changes.
4. **Choose `options` array vs. compound children API** — `options` array is simpler for dynamic segments; compound children enable richer segment content (icons, badges). Define the segment content model early.
5. **Plan icon-only segment support** — if icon-only segments are in scope, the accessible name strategy (Tooltip, `aria-label`, `title`) must be designed before the component API is finalized.
