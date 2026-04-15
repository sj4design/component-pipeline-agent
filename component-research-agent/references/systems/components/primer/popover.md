---
system: GitHub Primer
component: Popover / AnchoredOverlay
url: https://primer.style/components/anchored-overlay
last_verified: 2026-03-28
confidence: high
---

# Popover / AnchoredOverlay

## Approach
GitHub Primer uses AnchoredOverlay as the underlying primitive for all anchor-positioned overlays including popovers, dropdowns, and date pickers. Popover is a composed component on top of AnchoredOverlay. Primer also has an Overlay component for modal-style overlays. AnchoredOverlay handles positioning logic, focus trap, and dismiss behavior for any anchored floating panel.

## Key Decisions
1. **AnchoredOverlay as shared primitive** (HIGH) — All anchored floating content (ActionMenu, DatePicker, Popover) uses AnchoredOverlay, ensuring consistent positioning behavior, focus trap, and dismiss logic across all overlay types.
2. **Focus trap configuration** (HIGH) — AnchoredOverlay's focusTrapSettings prop allows configuring focus trap behavior — strong trap (for dialogs), weak trap (for menus), or none, enabling appropriate focus behavior per overlay type.
3. **Return focus on close** (HIGH) — AnchoredOverlay manages returning focus to the trigger when the overlay closes, following the standard focus management pattern for interactive overlays.

## Notable Props
- `anchorRef`: Reference to the anchor element
- `open` / `onOpen` / `onClose`: Open state management
- `focusTrapSettings`: Focus trap behavior configuration
- `side`: Preferred side for positioning (top/bottom/left/right)

## A11y Highlights
- **Keyboard**: Opens via trigger; Tab within overlay content; Escape closes and returns focus
- **Screen reader**: role="dialog" or appropriate role on content; focus management communicated
- **ARIA**: aria-haspopup on trigger; focus trap manages focus within overlay

## Strengths & Gaps
- **Best at**: Shared positioning primitive for all overlay types; configurable focus trap; Primer's composable overlay system
- **Missing**: Primer's overlay system requires more assembly than packaged popover components
