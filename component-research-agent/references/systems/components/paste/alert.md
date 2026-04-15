---
system: Twilio Paste
component: Alert
url: https://paste.twilio.design/components/alert
last_verified: 2026-03-28
confidence: high
---

# Alert

## Approach
Twilio Paste's Alert is an inline banner component for contextual status messages — used for system messages, error conditions, warning notices, and informational announcements in the Twilio console. Unlike Toast (transient), Alert is persistent and inline. Paste provides dismissible and non-dismissible variants and uses appropriate ARIA live region roles based on urgency.

## Key Decisions
1. **Persistent vs Toast distinction** (HIGH) — Alert is for persistent inline messages; Toast is for transient floating notifications. Clear documentation guides developers to the appropriate component for each communication pattern.
2. **Urgency-based live region role** (HIGH) — Error/warning alerts use role="alert" (assertive); informational/neutral alerts use role="status" (polite), ensuring screen readers announce at the appropriate urgency level.
3. **Dismissible variant** (MEDIUM) — Alerts can be dismissible (show close × button) or non-dismissible for mandatory system messages that users must acknowledge.

## Notable Props
- `variant`: "neutral" | "success" | "error" | "warning"
- `dismissible`: Boolean to show close button
- `onDismiss`: Dismiss callback
- `title`: Optional alert heading for longer alerts

## A11y Highlights
- **Keyboard**: Dismiss button focusable if present
- **Screen reader**: role="alert" for error/warning (assertive); role="status" for neutral/success (polite); auto-announced on render
- **ARIA**: role="alert" or role="status" based on variant; dismiss button has aria-label

## Strengths & Gaps
- **Best at**: Urgency-based live region role selection; persistent inline messaging; clear Toast vs Alert distinction
- **Missing**: No multi-line/structured content alert layout; limited to simple heading + text content
