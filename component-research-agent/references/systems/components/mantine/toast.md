---
system: Mantine
component: Notifications (mantine/notifications package)
url: https://mantine.dev/x/notifications/
last_verified: 2026-03-28
confidence: high
---

# Notifications (Toast)

## Approach
Mantine's notification system lives in the `@mantine/notifications` package and provides a full-featured programmatic toast/notification system. The `notifications.show()` / `notifications.update()` / `notifications.hide()` API is ergonomic and matches real usage patterns. Notifications support loading state → success/error transitions (important for async workflows), custom icons, React content in the message, and rich positioning options. The system uses a notification store for state management.

## Key Decisions
1. **notifications.update() for state transitions** (HIGH) — Can update an existing notification's content, color, loading state, and icon. This enables the pattern: show loading notification → resolve → update to success/error. Used extensively in form submission flows.
2. **autoClose per notification** (HIGH) — Each notification can have its own `autoClose` duration, or set to `false` for persistent notifications. Different notification types (success = 4000ms, error = persistent) can coexist in the same notification queue.
3. **limit on queue** (MEDIUM) — `Notifications.js` accepts a `limit` prop that caps the number of visible notifications. When the limit is reached, new notifications queue and appear after current ones dismiss. This prevents notification overflow in high-activity interfaces.

## Notable Props
- `notifications.show({ title, message, color, icon, autoClose, loading, id })`
- `notifications.update(id, { ...same options })`
- `notifications.hide(id)` / `notifications.clean()`
- `Notifications > limit`: max visible at once
- `Notifications > position`: viewport placement

## A11y Highlights
- **Keyboard**: Action buttons in notifications are keyboard accessible
- **Screen reader**: Notifications announced via aria-live region; loading state changes communicated
- **ARIA**: role="alert" for errors; role="status" for others; loading state announced

## Strengths & Gaps
- **Best at**: notifications.update() for async state transitions; per-notification autoClose; limit for queue management
- **Missing**: No swipe-to-dismiss on touch; no notification grouping/deduplication
