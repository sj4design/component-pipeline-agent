---
system: Mantine
component: Drawer
url: https://mantine.dev/core/drawer/
last_verified: 2026-03-29
confidence: high
---

# Drawer

## Approach
Mantine's Drawer component is a panel that slides in from any edge of the viewport (left, right, top, bottom) over a backdrop overlay. It shares its internal architecture with the `Modal` component, providing consistent behavior for focus trapping, scroll locking, close-on-backdrop-click, and escape key dismissal. The Drawer is composed of sub-components (`Drawer.Root`, `Drawer.Overlay`, `Drawer.Content`, `Drawer.Header`, `Drawer.Title`, `Drawer.CloseButton`, `Drawer.Body`) allowing full layout control. It is portal-rendered to prevent z-index stacking issues and works with Mantine's `useDisclosure` hook for state management.

## Key Decisions
1. **Shared architecture with Modal** (HIGH) — Reusing the Modal infrastructure means focus management, scroll locking, and accessibility behavior are identical, reducing surface area for bugs and inconsistencies across overlay patterns.
2. **Composable sub-components** (HIGH) — The compound component pattern (Drawer.Header, Drawer.Body, etc.) allows developers to restructure the drawer layout — such as adding sticky footers or custom scrollable regions — without fighting the component's internal structure.
3. **Four-directional positioning** (MEDIUM) — The `position` prop supports all four edges. While left and right are the most common, top/bottom drawers are useful for mobile filter panels or action sheets.

## Notable Props
- `opened`: Boolean — controlled visibility
- `onClose`: Callback when drawer closes (backdrop click or Escape)
- `position`: `"left"` | `"right"` | `"top"` | `"bottom"`
- `size`: Drawer width/height — theme size key or CSS value
- `withOverlay`: Show/hide the backdrop
- `lockScroll`: Prevents body scroll when open (default true)
- `trapFocus`: Enables focus trapping (default true)

## A11y Highlights
- **Keyboard**: Focus is trapped within the drawer when open; Escape closes it; focus returns to trigger on close
- **Screen reader**: `role="dialog"` with `aria-modal="true"` and `aria-labelledby` pointing to the title
- **ARIA**: `Drawer.Title` is automatically linked via `aria-labelledby`

## Strengths & Gaps
- **Best at**: Fully accessible side panels with flexible layout composition and consistent behavior with Mantine modals
- **Missing**: No built-in resize handle for adjustable-width drawers; no snap-point behavior for mobile gesture-based drawers
