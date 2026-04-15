---
system: shadcn/ui
component: Drawer / Sheet
url: https://ui.shadcn.com/docs/components/sheet
last_verified: 2026-03-28
confidence: high
---

# Sheet (Drawer)

## Approach
shadcn/ui provides Sheet (a drawer/side panel built on Radix UI's Dialog with custom slide-in animation) and Drawer (built on the Vaul library by Emil Kowalski for the native mobile-style bottom sheet). Sheet slides in from any side (top, bottom, left, right); Drawer is optimized for mobile bottom-sheet interactions with drag-to-dismiss.

## Key Decisions
1. **Sheet for desktop side panels** (HIGH) — Sheet slides from any side with smooth animation, used for filter panels, settings panels, and navigation drawers in desktop web contexts.
2. **Drawer for mobile bottom sheet** (HIGH) — Vaul-based Drawer provides iOS/Android-style bottom sheet with drag handle, snap points, and drag-to-dismiss — the native mobile gesture pattern.
3. **Radix Dialog foundation for Sheet** (HIGH) — Sheet uses Radix Dialog, inheriting full focus trap, Escape dismiss, and ARIA dialog semantics, ensuring the side panel is as accessible as a modal.

## Notable Props
- Sheet: `side` ("top" | "bottom" | "left" | "right")
- Sheet: `open` / `onOpenChange`: Controlled state
- Drawer: `snapPoints`: Array of snap heights for partial open
- Drawer: `dismissible`: Boolean to enable drag-to-dismiss

## A11y Highlights
- **Keyboard**: Focus trapped in Sheet/Drawer; Escape closes; Tab within content
- **Screen reader**: Sheet uses role="dialog" from Radix; SheetTitle provides aria-labelledby; Drawer announced as dialog
- **ARIA**: Radix Dialog ARIA for Sheet; SheetTitle required for aria-labelledby; aria-modal

## Strengths & Gaps
- **Best at**: Mobile bottom-sheet Drawer with snap points; Sheet for desktop side panels from any side; Vaul's native mobile gesture UX
- **Missing**: No docked/push-content mode (Sheet overlays content only); no Drawer from side variants (Vaul is bottom-only)
