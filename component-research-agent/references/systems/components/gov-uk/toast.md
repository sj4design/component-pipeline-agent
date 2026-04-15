---
system: GOV.UK Design System
component: Notification Banner (replaces toast pattern)
url: https://design-system.service.gov.uk/components/notification-banner/
last_verified: 2026-03-28
confidence: high
---

# Notification Banner (Toast equivalent)

## Approach
GOV.UK does not have a toast/snackbar notification component. Instead, it uses the Notification Banner — a prominent, persistent, page-level banner that appears at the top of the page to communicate important information or success states. The banner is not transient; it stays visible until the user dismisses it or navigates away. This reflects GOV.UK's stance that auto-dismissing notifications risk users missing important information. Government services must communicate status changes reliably.

## Key Decisions
1. **No auto-dismissing notifications** (HIGH) — Toasts that auto-dismiss are inaccessible for users who need more time to read, and risky for government services where a notification might contain a reference number or important action. Persistent banners ensure the information stays available.
2. **Success and neutral types** (HIGH) — The Notification Banner has a neutral (blue) and success (green) variant. The success banner is specifically designed for post-submission confirmation — showing that a form was successfully submitted, which is the most common notification need in government forms.

## Notable Props
- `type`: `"important"` (blue) or `"success"` (green)
- `titleText`: banner heading
- `html`: banner body content
- No JavaScript — static HTML component

## A11y Highlights
- **Keyboard**: No interactive elements; banner is static content
- **Screen reader**: Announced as page content; `role="region"` with heading
- **ARIA**: `role="alert"` for important messages to ensure announcement

## Strengths & Gaps
- **Best at**: Reliable notification that users cannot miss; success confirmation for form submissions
- **Missing**: No transient notification; no programmatic notification triggering; no multi-notification stacking
