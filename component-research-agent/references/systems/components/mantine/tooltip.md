---
system: Mantine
component: Tooltip
url: https://mantine.dev/core/tooltip/
last_verified: 2026-03-28
confidence: high
---

# Tooltip

## Approach
Mantine's Tooltip is clean, configurable, and integrates with Mantine's transition system for smooth animations. It supports both hover/focus triggering and programmatic control. Mantine provides a `Tooltip.Group` for shared delay state across multiple tooltips (similar to Radix's Provider), and a `Tooltip.Floating` variant that follows the cursor position rather than anchoring to the trigger element.

## Key Decisions
1. **Tooltip.Floating** (HIGH) — A cursor-following tooltip variant useful for data visualization (chart data points, map elements, image interactions) where fixed positioning creates UX friction. This is a distinctive feature not found in most design system tooltips.
2. **Tooltip.Group for delay sharing** (HIGH) — Groups multiple tooltips with shared hover state: once one tooltip is shown, moving to another shows it immediately without delay. This is the same behavior Radix achieves with Provider, but scoped to a specific UI section.
3. **multiline and width** (MEDIUM) — `multiline` enables wrapping for longer tooltip text, with a `width` constraint. Single-line tooltips are the default, but multiline is needed for explanatory content that can't be abbreviated.

## Notable Props
- `label`: tooltip content (string or ReactNode)
- `position`: placement string
- `withArrow`: boolean — directional arrow
- `openDelay` / `closeDelay`: timing in ms
- `multiline`: enables text wrapping
- `width`: max width for multiline
- Tooltip.Floating: follows cursor
- Tooltip.Group: shared delay state

## A11y Highlights
- **Keyboard**: Opens on focus; Escape closes
- **Screen reader**: role="tooltip"; trigger gets aria-describedby
- **ARIA**: Tooltip content announced as supplementary description

## Strengths & Gaps
- **Best at**: Tooltip.Floating for data viz; Tooltip.Group for dense UIs; multiline support
- **Missing**: No relationship="label" option (for icon buttons without visible text, need custom aria-label)
