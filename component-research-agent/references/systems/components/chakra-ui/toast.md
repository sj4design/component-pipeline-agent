---
system: Chakra UI
component: Toaster / Toast
url: https://chakra-ui.com/docs/components/toaster
last_verified: 2026-03-28
confidence: high
---

# Toast / Toaster

## Approach
Chakra UI v3 provides a programmatic toast system with a `createToaster` factory and `Toaster` component. Toasts are triggered imperatively via the `toaster.create()` method, not by rendering JSX components. This matches the real-world use case where toasts appear in response to async operations deep in service code. The Toaster component renders the toast container, while individual toast appearance is controlled by the `actionSlot` prop and the toast status type.

## Key Decisions
1. **Programmatic API** (HIGH) — `toaster.create({ title, description, type })` reflects the actual usage pattern where toasts fire after API calls. This is more ergonomic than rendering toast JSX in the component tree.
2. **Status types map to visual variants** (HIGH) — `type: "success" | "error" | "warning" | "info" | "loading"` map to icon and color combinations. The `"loading"` type is particularly useful for showing in-progress state before resolving to success or error.
3. **Placement and stacking** (MEDIUM) — `createToaster({ placement, overlap })` controls where toasts appear and whether they stack or overlap. Multiple placement options (top-end, bottom-end, etc.) serve different product contexts.

## Notable Props
- `toaster.create({ title, description, type, duration, meta })`
- `toaster.dismiss()` / `toaster.dismiss(id)`: remove specific or all toasts
- `toaster.update(id, options)`: update an existing toast (e.g., loading → success)
- `createToaster({ placement, overlap, gap, max })`: configuration

## A11y Highlights
- **Keyboard**: Toasts can be focused and dismissed via keyboard when they contain action buttons
- **Screen reader**: Toast content announced via aria-live region; type determines politeness level (error = assertive, others = polite)
- **ARIA**: `role="status"` or `role="alert"` based on type; aria-live announcements managed by the toaster

## Strengths & Gaps
- **Best at**: Programmatic API; loading→success state transitions via update(); placement configuration
- **Missing**: No keyboard navigation hotkey to toast viewport (unlike Radix); no swipe-to-dismiss on touch
