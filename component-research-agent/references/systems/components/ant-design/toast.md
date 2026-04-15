---
system: Ant Design
component: Message / Notification
url: https://ant.design/components/message/
last_verified: 2026-03-28
---

# Message & Notification

## Approach
Ant Design splits toast-like functionality into two distinct components: `message` for lightweight global feedback and `notification` for richer, more persistent alerts. Both historically used static methods (e.g., `message.success()`, `notification.open()`) as their primary API, treating notifications as imperative commands rather than declarative UI. This static-method approach enables fire-and-forget usage from any part of the application without passing props through the component tree. However, Ant Design has acknowledged the limitations of this pattern -- static methods cannot consume React Context (including ConfigProvider theming) -- and now recommends hooks-based alternatives (`useMessage`, `useNotification`) via the App component wrapper.

## Key Decisions
1. **Two components by weight** (HIGH) — `message` is a minimalist single-line toast (centered, no title, auto-dismiss) while `notification` is a rich card with title, description, icon, and configurable placement. This split recognizes that brief confirmations and detailed alerts have fundamentally different spatial and informational requirements, rather than overloading one component with progressive disclosure.
2. **Static methods as primary API** (HIGH) — `message.success("Done")` can be called from anywhere -- event handlers, async callbacks, utility functions -- without component tree access. This imperative pattern was chosen for developer ergonomics in large enterprise applications. The tradeoff is loss of React Context, which led to the newer hooks-based `App.useApp()` pattern.
3. **Six placement options for notification** (MEDIUM) — `top`, `topLeft`, `topRight`, `bottom`, `bottomLeft`, `bottomRight` give full viewport control. Message is always top-center. This placement flexibility reflects Ant Design's enterprise focus where different products have different layout constraints and notification placement conventions.
4. **Stacked notifications with animation** (MEDIUM) — Multiple notifications stack vertically with smooth enter/exit transitions. A recent "stacked notification" feature collapses multiple notifications into a compact stack that expands on hover, addressing notification fatigue in data-heavy enterprise dashboards.

## Notable Props
- `duration`: Default 3s (message) / 4.5s (notification); set to 0 for persistent. Fine-grained ms control unlike M3's fixed tiers
- `placement`: 6 viewport positions for notification; message is fixed top-center
- `type`: `success | error | warning | info | loading` -- the `loading` type is unique, showing a spinner for async operations
- `config()`: Global static method to set defaults (placement, duration, RTL) for all future notifications

## A11y Highlights
- **Keyboard**: Notification close button and actions are focusable; message has no interactive elements
- **Screen reader**: Uses `aria-live` for announcements; notification supports custom ARIA attributes
- **ARIA**: Limited built-in ARIA compared to other systems; relies on consumer implementation for complex scenarios

## Strengths & Gaps
- **Best at**: Developer ergonomics through imperative static methods enabling notifications from anywhere in the codebase, plus the unique `loading` message type for async operation feedback and flexible 6-position placement for enterprise layouts.
- **Missing**: Weaker built-in accessibility compared to Spectrum or Carbon (no enforced minimum durations, limited ARIA defaults); static methods cannot consume React Context for theming; no semantic icon pairing by default (icons are optional); no priority queue for competing notifications.
