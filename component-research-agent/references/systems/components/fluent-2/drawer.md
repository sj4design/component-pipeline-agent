---
system: Fluent 2 (Microsoft)
component: Drawer
url: https://fluent2.microsoft.design/components/web/react/drawer/
last_verified: 2026-03-28
confidence: high
---

# Drawer

## Approach
Fluent 2's Drawer is a panel that slides in from the left or right edge of the screen. It supports both overlay (modal) and inline (non-modal, pushes content) modes. The component provides DrawerHeader, DrawerHeaderTitle, DrawerHeaderNavigation, DrawerBody, and DrawerFooter sub-components. The inline mode is particularly relevant for Microsoft's complex application layouts (Teams, Office) where side panels co-exist with main content.

## Key Decisions
1. **type="overlay" vs type="inline"** (HIGH) — Overlay drawers float above content with a backdrop; inline drawers push the main content aside. The inline type is unique to Fluent among common design systems and enables persistent side panel patterns like Teams' sidebar or file browser panels.
2. **position prop** (HIGH) — `position="start"` (left in LTR) and `position="end"` (right) support bidirectional layouts. Microsoft's international products require full RTL support.
3. **modalType prop for overlay behavior** (MEDIUM) — `modalType="modal"` traps focus and shows backdrop; `modalType="non-modal"` shows without backdrop and without focus trap; `modalType="alert"` prevents dismissal without explicit action.

## Notable Props
- `type`: `"overlay" | "inline"`
- `position`: `"start" | "end"`
- `open` / `onOpenChange`: controlled state
- `modalType`: `"modal" | "non-modal" | "alert"`
- `DrawerHeader`, `DrawerBody`, `DrawerFooter`: structural sub-components

## A11y Highlights
- **Keyboard**: Focus trapped in modal type; Escape closes modal drawers; inline drawers do not trap
- **Screen reader**: role="dialog" for modal; aria-modal; aria-labelledby from DrawerHeaderTitle
- **ARIA**: Full dialog ARIA for modal; region ARIA for inline

## Strengths & Gaps
- **Best at**: inline type for persistent panels; position for RTL; modalType for different overlay behaviors; structural sub-components
- **Missing**: No snap points; no swipe-to-close gesture
