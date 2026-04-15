---
system: Chakra UI
component: Popover
url: https://chakra-ui.com/docs/components/popover
last_verified: 2026-03-28
confidence: high
---

# Popover

## Approach
Chakra UI's Popover is a styled, positioned overlay for interactive content. It provides PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverCloseButton, and PopoverArrow. The built-in header/body/footer structure makes common popover patterns (confirmation, info, form) easy to implement without custom layout.

## Key Decisions
1. **returnFocusOnClose** (HIGH) — `returnFocusOnClose={false}` prevents returning focus to the trigger after close. Sometimes needed when the trigger itself is removed or the next focus target should be different.
2. **initialFocusRef** (HIGH) — Sets initial focus to a specific element inside the popover (not the first focusable). Used when the first actionable element should be a specific button, not a close button or other control.
3. **isLazy** (MEDIUM) — Delays rendering popover content until first open. Performance improvement for popovers with expensive content.

## Notable Props
- `isOpen` / `onOpen` / `onClose`: controlled state
- `initialFocusRef`: focus on open
- `returnFocusOnClose`: focus restoration behavior
- `placement`: position relative to trigger
- `isLazy`: lazy mount

## A11y Highlights
- **Keyboard**: Tab/Shift+Tab within popover; Escape closes; focus returns to trigger
- **Screen reader**: role="dialog"; aria-labelledby from PopoverHeader; PopoverContent aria-describedby
- **ARIA**: Trigger has aria-haspopup="dialog" and aria-expanded; modal behavior optional

## Strengths & Gaps
- **Best at**: initialFocusRef; built-in header/body/footer; returnFocusOnClose; isLazy
- **Missing**: No non-modal mode (all Chakra popovers are modal by default)
