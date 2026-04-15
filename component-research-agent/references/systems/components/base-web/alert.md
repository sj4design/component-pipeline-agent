---
system: Base Web (Uber)
component: Notification / Toast (Alert equivalent)
url: https://baseweb.design/components/notification/
last_verified: 2026-03-28
confidence: medium
---

# Notification (Alert equivalent)

## Approach
Base Web uses a Notification component for inline alerts (static, embedded in page content) and a separate Toast/Snackbar for transient notifications. The Notification component renders a styled banner with kind variants (info, positive, warning, negative) and supports closeable behavior. It is the closest equivalent to a traditional Alert component.

## Key Decisions
1. **kind prop for semantic variants** (HIGH) — `kind` accepts `KIND.info`, `KIND.positive`, `KIND.warning`, `KIND.negative` — the four standard alert semantic types. Each applies appropriate color from the Base Web theme.
2. **closeable prop** (HIGH) — `closeable={true}` adds a dismiss button, making the notification dismissible. This is a prop rather than a composed sub-component, simplifying the common case.
3. **Overrides for Body, CloseIcon** (MEDIUM) — Internal elements are overridable for custom notification chrome, fitting Base Web's consistent customization pattern.

## Notable Props
- `kind`: KIND enum (info/positive/warning/negative)
- `closeable`: adds dismiss button
- `onClose`: dismiss callback
- `overrides`: Body, CloseIcon, Root

## A11y Highlights
- **Keyboard**: Close button keyboard accessible when closeable
- **Screen reader**: role="alert" for dynamic injection; static inline notifications use appropriate heading
- **ARIA**: Appropriate live region for dynamic notifications

## Strengths & Gaps
- **Best at**: kind variants for semantic differentiation; closeable prop; overrides pattern
- **Missing**: No title/description sub-components; no icon slot (icon is automatic from kind)
