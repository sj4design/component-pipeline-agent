---
system: Chakra UI
component: Drawer
url: https://chakra-ui.com/docs/components/drawer
last_verified: 2026-03-28
confidence: high
---

# Drawer

## Approach
Chakra UI provides a dedicated Drawer component separate from Modal. It shares the same Composable sub-components (DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseButton) but adds a `placement` prop for specifying which edge the drawer slides from. This explicit Drawer component is more convenient than composing a Modal with CSS.

## Key Decisions
1. **placement prop** (HIGH) — `"top" | "right" | "bottom" | "left"` specifies which edge the drawer appears from. Right is most common (navigation, detail panels); bottom is common for mobile action sheets.
2. **size variants** (HIGH) — Drawers have size variants (`"xs"` to `"full"`) controlling how much of the viewport they cover. `"full"` creates a full-screen overlay.
3. **Shared infrastructure with Modal** (MEDIUM) — Drawer reuses Modal's focus management, scroll locking, and portal infrastructure, ensuring consistent behavior across both overlay types.

## Notable Props
- `placement`: `"top" | "right" | "bottom" | "left"`
- `size`: width/height control
- Same `isOpen`, `onClose`, focus management props as Modal

## A11y Highlights
- **Keyboard**: Focus trapped; Escape closes; Tab/Shift+Tab cycle
- **Screen reader**: role="dialog" with aria-labelledby from DrawerHeader; background aria-hidden
- **ARIA**: Same dialog ARIA as Modal

## Strengths & Gaps
- **Best at**: Dedicated placement prop; size variants; shared Modal infrastructure
- **Missing**: No swipe-to-close gesture; no snap points for resizable drawers
