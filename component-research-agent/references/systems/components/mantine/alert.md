---
system: Mantine
component: Alert
url: https://mantine.dev/core/alert/
last_verified: 2026-03-29
confidence: high
---

# Alert

## Approach
Mantine's Alert component is a full-featured notification block used to display contextual feedback messages inline within page content. It supports four semantic color variants (info, success, warning, error) driven by the `color` prop, which maps to Mantine's theme color palette. The component includes an optional icon slot, a title, and a body text area, making it suitable for both brief notices and detailed explanations. Alerts can be dismissible via a close button prop. They are styled using Emotion CSS-in-JS and fully respect the active color scheme (light/dark mode).

## Key Decisions
1. **Color-driven semantic variants** (HIGH) — Rather than named variants like "warning" or "error", Mantine uses theme colors (`color="yellow"`, `color="red"`) giving developers full palette access while still conveying semantics through color convention.
2. **Icon slot** (HIGH) — An `icon` prop accepts any React node, keeping the component decoupled from a specific icon library. This flexibility is central to Mantine's philosophy of minimal opinion on external dependencies.
3. **Withclosebutton prop** (MEDIUM) — Dismissibility is opt-in via `withCloseButton` and an `onClose` callback, allowing alerts to be either persistent or transient without needing a separate component.

## Notable Props
- `color`: Theme color key (e.g., `"red"`, `"blue"`) — controls background tint and icon color
- `title`: Optional bold heading above the alert body
- `icon`: React node rendered before the title
- `withCloseButton`: Shows an X button; pair with `onClose` handler
- `variant`: `"filled"` | `"light"` | `"outline"` | `"transparent"` — controls fill style

## A11y Highlights
- **Keyboard**: Close button is focusable and activatable via Enter/Space
- **Screen reader**: Renders as a `div` by default; add `role="alert"` manually for live-region announcements
- **ARIA**: Supports `aria-label` on the close button via `closeButtonLabel` prop

## Strengths & Gaps
- **Best at**: Highly flexible inline feedback with full theme integration and dark mode support out of the box
- **Missing**: No built-in `role="alert"` live region by default — developers must add this manually for screen reader announcement of dynamically inserted alerts
