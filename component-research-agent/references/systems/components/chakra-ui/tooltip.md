---
system: Chakra UI
component: Tooltip
url: https://chakra-ui.com/docs/components/tooltip
last_verified: 2026-03-28
confidence: high
---

# Tooltip

## Approach
Chakra UI's Tooltip is a styled, accessible tooltip that wraps any trigger element. It handles hover and focus triggering, configurable delay, arrow display, and placement. The component integrates with Chakra's color scheme tokens — the tooltip surface uses the active theme's dark or light token. Chakra's Tooltip is one of the most practical in the ecosystem: it just works with minimal configuration and looks good out of the box.

## Key Decisions
1. **hasArrow prop** (MEDIUM) — Shows a visual arrow pointing to the trigger. Arrows aid in understanding which element the tooltip belongs to, especially in dense UIs. Chakra makes this a simple boolean.
2. **openDelay / closeDelay** (MEDIUM) — Controls the timing of tooltip appearance and disappearance. These defaults are pre-configured to the commonly accepted values (300ms open, 100ms close) but can be overridden per tooltip.
3. **shouldWrapChildren** (MEDIUM) — If the trigger is a disabled element (which can't receive hover events), wrapping it in a span allows the tooltip to still appear. This is needed for "why is this button disabled?" tooltip patterns.

## Notable Props
- `label`: tooltip content (string or ReactNode)
- `placement`: position relative to trigger
- `hasArrow`: boolean — shows directional arrow
- `openDelay` / `closeDelay`: timing in ms
- `isDisabled`: disables the tooltip
- `shouldWrapChildren`: wraps trigger in span for disabled element support

## A11y Highlights
- **Keyboard**: Opens on focus; Escape closes
- **Screen reader**: `role="tooltip"` with `aria-describedby` connection to trigger
- **ARIA**: Tooltip content announced as description; trigger gains aria-describedby automatically

## Strengths & Gaps
- **Best at**: shouldWrapChildren for disabled button tooltips; hasArrow; token integration
- **Missing**: No rich tooltip with interactive content; no multiline tooltip with title+description layout
