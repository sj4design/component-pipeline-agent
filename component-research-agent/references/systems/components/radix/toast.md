---
system: Radix UI (WorkOS)
component: Toast
url: https://www.radix-ui.com/primitives/docs/components/toast
last_verified: 2026-03-28
confidence: high
---

# Toast

## Approach
Radix Toast is a notification primitive that handles the complex accessibility requirements of toast notifications: announcing content to screen readers without stealing focus, managing a queue of multiple toasts, and providing keyboard access to interactive toast actions. The component uses a `Toast.Provider` at the app root, a `Toast.Viewport` for the visual container placement, and individual `Toast` instances with Title, Description, Action, and Close sub-components.

## Key Decisions
1. **Toast.Viewport placement** (HIGH) — The Viewport is a separate component that defines where toasts appear on screen. This allows the viewport to be in a portal outside the main content flow while maintaining correct focus management. The viewport position (bottom-right, top-center, etc.) is entirely CSS-controlled, giving full layout freedom.
2. **Keyboard focus via F8/hotkey** (HIGH) — Radix Toast implements the WCAG requirement that toast notifications must be keyboard-accessible. Pressing a configurable hotkey (default: F8) moves focus to the toast viewport, allowing keyboard users to interact with toast actions and close buttons.
3. **duration and swipeDirection** (MEDIUM) — Individual toasts have `duration` (auto-dismiss timing, default 5000ms) and the viewport has `swipeDirection` for touch dismiss gesture. These map to the two primary dismiss mechanisms: time-based and gesture-based.

## Notable Props
- `duration`: auto-dismiss time in ms
- `open` / `onOpenChange`: controlled toast visibility
- `Toast.Action > altText`: required text for screen readers to understand the toast action
- `Toast.Viewport > hotkey`: keyboard focus hotkey (default F8)
- `Toast.Provider > swipeDirection`: gesture dismiss direction

## A11y Highlights
- **Keyboard**: F8 (configurable) focuses viewport; Tab/Shift+Tab navigate within toast; Escape dismisses
- **Screen reader**: `role="status"` (polite) for informational toasts; `role="alert"` for critical; `aria-live` region announces content
- **ARIA**: altText on Toast.Action is required — it explains the action in screen reader context where visual context may not be clear

## Strengths & Gaps
- **Best at**: Keyboard access via hotkey; altText requirement for action context; swipe gesture support
- **Missing**: No built-in visual variants (success/error/warning); no toast queue management beyond `duration`; no progress bar variant
