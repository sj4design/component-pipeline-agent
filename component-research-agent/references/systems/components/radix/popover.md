---
system: Radix UI (WorkOS)
component: Popover
url: https://www.radix-ui.com/primitives/docs/components/popover
last_verified: 2026-03-28
confidence: high
---

# Popover

## Approach
Radix Popover is the interactive overlay primitive for rich content triggered by a button click. It differs from Tooltip (non-interactive, hover) and DropdownMenu (navigation/action list) by being a general-purpose interactive overlay — forms, settings, date pickers, color pickers, or any custom content. It handles focus trapping, portal rendering, and positioning with collision detection.

## Key Decisions
1. **Popover vs Tooltip vs Dialog distinction** (HIGH) — Popover is for interactive content that doesn't need full focus trap of a Dialog. It stays open while user interacts with its content and closes on outside click or Escape. This fills the gap between non-interactive Tooltip and blocking Dialog.
2. **modal prop** (HIGH) — When `modal={true}`, outside interaction is blocked (like a Dialog). When `modal={false}` (default), users can interact with content outside the popover. The false default is appropriate for non-blocking popovers like filter panels.
3. **Anchor positioning** (MEDIUM) — Comprehensive side, align, sideOffset, alignOffset props with collision detection. The popover automatically flips sides when it would overflow.

## Notable Props
- `open` / `onOpenChange`: controlled state
- `modal`: boolean for blocking vs non-blocking mode
- `Popover.Content > side`: `"top" | "right" | "bottom" | "left"`
- `Popover.Content > avoidCollisions`: boolean for auto-flip
- `Popover.Arrow`: optional arrow element pointing to trigger

## A11y Highlights
- **Keyboard**: Trigger activates; Tab/Shift+Tab cycle within content; Escape closes and returns focus to trigger
- **Screen reader**: `role="dialog"` on content with `aria-labelledby` if heading is present
- **ARIA**: `aria-modal` based on modal prop; trigger has `aria-haspopup="dialog"` and `aria-expanded`

## Strengths & Gaps
- **Best at**: Modal vs non-modal mode; comprehensive positioning; rich interactive content; Arrow element
- **Missing**: No built-in header/footer structure; no built-in close button
