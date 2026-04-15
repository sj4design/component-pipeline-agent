---
system: GitHub Primer
component: SegmentedControl
url: https://primer.style/components/segmented-control
last_verified: 2026-03-28
confidence: high
---

# SegmentedControl

## Approach
GitHub Primer has a dedicated SegmentedControl component — one of the few systems in this set to name it explicitly. Used throughout GitHub for view toggles (code/blame/raw, line/split diff views), and layout mode selection. Primer's SegmentedControl uses the ARIA tablist pattern (not radiogroup) and supports icon-only, text-only, and icon+text button configurations.

## Key Decisions
1. **Dedicated SegmentedControl component** (HIGH) — Named component with explicit semantics, unlike systems that piece together button groups, giving Primer a clearly defined component for this common UI pattern.
2. **ARIA tablist pattern** (HIGH) — Uses role="tablist" with role="tab" on each option, enabling arrow key navigation between options without losing focus — semantically models the "selected view" concept well.
3. **Icon + text + icon-only variants** (HIGH) — SegmentedControl.Button supports leadingVisual (icon), text, and icon-only with aria-label, covering GitHub's use cases from rich labeled to compact icon-only view toggles.

## Notable Props
- `aria-label`: Required label for the control group
- `onChange`: Selection callback with index
- `selectedIndex`: Controlled selection
- SegmentedControl.Button: Each option with `leadingVisual`, text content

## A11y Highlights
- **Keyboard**: Arrow keys navigate options (tablist pattern); Enter/Space selects focused option
- **Screen reader**: role="tablist"; each option role="tab"; aria-selected on selected; group aria-label
- **ARIA**: role="tablist"; role="tab"; aria-selected; aria-label on control group; aria-label on icon-only buttons

## Strengths & Gaps
- **Best at**: Dedicated named component; icon/text/combined variants; tablist keyboard navigation; aria-label enforcement
- **Missing**: No vertical orientation; limited size variants
