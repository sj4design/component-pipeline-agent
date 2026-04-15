---
system: Base Web (Uber)
component: Drawer
url: https://baseweb.design/components/drawer/
last_verified: 2026-03-28
confidence: medium
---

# Drawer

## Approach
Base Web's Drawer component provides a side panel that slides in from an edge of the viewport. It shares infrastructure with the Modal component (focus trapping, scroll locking, portal rendering) and adds an `anchor` prop for placement. The Drawer can contain arbitrary content and is suitable for navigation panels, filters, and detail views.

## Key Decisions
1. **anchor prop for placement** (HIGH) — `anchor` accepts `ANCHOR.left`, `ANCHOR.right`, `ANCHOR.top`, `ANCHOR.bottom` to control which edge the drawer slides from. Right is the default for most panel use cases.
2. **Shared Modal infrastructure** (HIGH) — Drawer reuses Base Web's Modal layer for focus trapping, backdrop, scroll lock, and portal rendering, ensuring consistent overlay behavior.
3. **Overrides for all structural elements** (MEDIUM) — DrawerContainer, DrawerBody, Close, and Backdrop are all overridable, fitting the Base Web customization model for teams needing custom drawer chrome.

## Notable Props
- `isOpen`: controlled open state
- `onClose`: close callback
- `anchor`: ANCHOR enum (left/right/top/bottom)
- `size`: SIZE enum (default, full)
- `overrides`: DrawerContainer, DrawerBody, Close, Backdrop

## A11y Highlights
- **Keyboard**: Focus trapped within drawer; Escape closes; Tab/Shift+Tab cycle
- **Screen reader**: role="dialog" with aria-modal; aria-labelledby from heading inside drawer; background aria-hidden
- **ARIA**: Same dialog ARIA as Modal

## Strengths & Gaps
- **Best at**: anchor prop; shared Modal infrastructure; overrides for all elements
- **Missing**: No snap points; no swipe-to-close; no built-in header/footer sub-components
