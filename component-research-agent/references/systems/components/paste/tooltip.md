---
system: Twilio Paste
component: Tooltip
url: https://paste.twilio.design/components/tooltip
last_verified: 2026-03-28
confidence: high
---

# Tooltip

## Approach
Twilio Paste's Tooltip provides supplementary non-essential information on hover and focus. Paste is explicit that tooltips should only be used for non-essential supplementary information and should never be the sole means to convey critical information. Built on Reakit's Tooltip primitive for correct ARIA tooltip behavior. Paste also provides a Popover component for interactive content, steering developers away from interactive tooltips.

## Key Decisions
1. **Non-interactive content only** (HIGH) — Paste's tooltip spec explicitly requires tooltip content to be non-interactive (no links, buttons, or form fields) because tooltips disappear on mouse-out making interactive content inaccessible.
2. **Reakit tooltip foundation** (HIGH) — Reakit handles tooltip show/hide on hover/focus, delay, and ARIA role/id wiring automatically, ensuring the tooltip/trigger relationship is correctly established.
3. **Placement prop** (MEDIUM) — Multiple placement options (top, bottom, left, right with auto-flip) using Popper.js positioning to ensure tooltips stay within viewport.

## Notable Props
- `text`: Tooltip content (string only — non-interactive)
- `placement`: "top" | "top-start" | "top-end" | "bottom" | etc.
- `state`: Shared state object from useTooltipState for controlled behavior

## A11y Highlights
- **Keyboard**: Tooltip shows on focus of trigger element; Escape dismisses
- **Screen reader**: role="tooltip" on content; aria-describedby on trigger pointing to tooltip id
- **ARIA**: role="tooltip"; trigger has aria-describedby; tooltip appears on both hover and keyboard focus

## Strengths & Gaps
- **Best at**: Correct non-interactive tooltip semantics; clear guidance on tooltip vs popover use cases
- **Missing**: No rich content tooltips (by design); no delay customization beyond Reakit defaults
