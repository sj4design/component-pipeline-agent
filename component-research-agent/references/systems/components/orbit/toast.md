---
system: Orbit (Kiwi.com)
component: Toast (not available — use Alert or Snackbar)
url: https://orbit.kiwi/components/alert/
last_verified: 2026-03-28
confidence: medium
---

# Toast / Notification

## Approach
Orbit does not have a dedicated Toast component. For transient notifications in the travel booking context, Orbit relies on the `Alert` component for inline notifications and context-appropriate banners. Travel booking flows typically communicate status through page-level feedback (success page after booking, error message in the booking form) rather than floating toast notifications that might distract from the booking flow. Mobile flight booking rarely uses toast patterns.

## Key Decisions
1. **No toast component** (HIGH) — Kiwi.com's booking flow design opts for page-level feedback rather than floating toasts. The critical nature of booking status (payment confirmation, error handling) requires visible, persistent feedback that toasts don't provide reliably.
2. **Alert for inline feedback** (HIGH) — Orbit's Alert component provides inline success/info/warning/error messages for the booking form, which is more appropriate than transient toasts for high-stakes travel transactions.

## Notable Props
- N/A — component does not exist

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: Floating notification pattern; programmatic notification API
