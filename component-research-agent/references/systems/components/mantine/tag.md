---
system: Mantine
component: Badge / Chip
url: https://mantine.dev/core/badge/
last_verified: 2026-03-28
confidence: high
---

# Badge / Chip (Tag)

## Approach
Mantine provides two tag-like components: Badge (non-interactive display labels) and Chip (interactive, selectable/removable tags). Badge is for status labels and count indicators. Chip is for filter chips and multi-select tags where users can toggle selection. Chip supports both controlled and uncontrolled selection, with visual active state and optional close button. The separation between display and interactive is architecturally clean.

## Key Decisions
1. **Chip for interactive tags** (HIGH) — Chip handles the interactive tag use case (filter chips, tag selection) with click-to-select behavior, checked state, and variants. Badge handles the display use case. Keeping them separate prevents a sprawling single component.
2. **Chip.Group for multi-select** (HIGH) — Manages multiple Chip selections with single or multi-select mode. Used for filter panels and tag selection interfaces.
3. **Badge gradient** (MEDIUM) — Like Button, Badge supports `variant="gradient"` with custom gradient. This reflects Mantine's "modern visual trends out-of-the-box" philosophy.

## Notable Props
- Badge: `color`, `variant`, `size`, `radius`, `gradient`
- Chip: `checked` / `onChange`, `value`, `color`, `variant`, `disabled`
- Chip.Group: `value`, `onChange`, `multiple`

## A11y Highlights
- **Keyboard**: Chip is keyboard activatable (Space/Enter); Chip.Group manages focus
- **Screen reader**: Badge reads as inline text; Chip announced with selection state
- **ARIA**: Chip uses role="checkbox" or role="radio" based on Chip.Group configuration

## Strengths & Gaps
- **Best at**: Badge/Chip separation; Chip.Group for filter panels; gradient Badge; comprehensive color + variant system
- **Missing**: No removable chip with X button in core Badge; Chip is for toggle selection, not tag input
