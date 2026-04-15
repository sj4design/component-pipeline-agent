---
system: Fluent 2 (Microsoft)
component: SegmentedControl (preview)
url: https://react.fluentui.dev/?path=/docs/components-segmentedcontrol--docs
last_verified: 2026-03-29
confidence: medium
---

# Segmented Control

## Approach
Fluent 2 includes SegmentedControl as a preview component — a horizontal group of mutually exclusive options rendered as connected button segments, used for view switching and mode selection. In Microsoft 365, this pattern appears in Teams for switching between "Grid" and "List" views in Files, in modern SharePoint for layout switching, and in various Office web app toolbars for mutually exclusive formatting options. SegmentedControl is semantically distinct from TabList (which controls panel content via ARIA tab pattern) — it is closer to a radio button group with button-group visual styling, appropriate for immediate view/mode toggling without navigating between content panels. Its preview status reflects ongoing API refinement; the core pattern is stable in production Microsoft 365 surfaces, but the React component API may see breaking changes before it reaches stable release.

## Key Decisions
1. **Preview status — intentional API maturation** (HIGH) — SegmentedControl was promoted to preview after shipping in Teams and SharePoint as product-level components; the preview phase allows the Fluent team to align the API based on real usage patterns across multiple Microsoft 365 teams before locking the contract.
2. **Radio group semantics, not tab semantics** (HIGH) — Rendering as `role="radiogroup"` with `role="radio"` items (rather than `role="tablist"`) correctly communicates the mutually exclusive selection pattern to assistive technologies and avoids implying panel ownership — critical for Microsoft's WCAG AA compliance targets.
3. **Icon and text support per segment** (HIGH) — Segments support icon-only, text-only, or icon+text layouts, accommodating the compact icon-toolbar variants used in Teams meeting view controls and the labeled variants used in SharePoint view switchers.
4. **Selected state via filled indicator** (MEDIUM) — The selected segment uses a filled/elevated background (distinct from a simple color change) to communicate selection through shape and contrast rather than color alone, satisfying WCAG 1.4.1 (use of color) in high-contrast mode.
5. **Size variants** (MEDIUM) — `small`, `medium`, and `large` sizes allow SegmentedControl to fit into compact toolbars (Teams top bar) and more spacious settings panels alike without requiring custom sizing CSS.

## Notable Props
- `value`: controlled selected segment value
- `defaultValue`: uncontrolled initial selection
- `onValueChange`: callback fired when selection changes, receiving new value
- `size`: `"small"` | `"medium"` | `"large"`
- `children`: `SegmentedControlItem` elements defining each segment

**On `SegmentedControlItem`:**
- `value`: unique identifier for this segment
- `icon`: icon slot for segment icon
- `disabled`: disables individual segment

## A11y Highlights
- **Keyboard**: Arrow keys (Left/Right) move between segments; selected segment is activated on focus (roving tabindex pattern); Tab moves focus into and out of the group as a single stop; disabled segments are skipped.
- **Screen reader**: `role="radiogroup"` on the container with an `aria-label` describing the group purpose; each segment uses `role="radio"` with `aria-checked` for selected state; segment labels (visible text or `aria-label` for icon-only) provide the option name; state changes announced immediately as users arrow through options.
- **ARIA**: `role="radiogroup"` + `role="radio"` + `aria-checked`; `aria-disabled` on disabled segments; `aria-label` on the group for context; high-contrast mode supported via Fluent tokens — selected segment background maps to `Highlight` system color and text to `HighlightText`.

## Strengths & Gaps
- **Best at**: View switching and mode selection in Teams and SharePoint-style UIs; correct radio group semantics for immediate selection (vs. tab semantics for panel navigation); icon+text segment support; high-contrast mode compatibility via token system.
- **Missing**: Still in preview — API may change; no built-in overflow handling for many segments in narrow containers (segments may wrap or overflow); no vertical orientation variant; no support for "unselected" state (one segment is always selected, no clear/deselect option); animation of the selection indicator between segments is not included by default.
