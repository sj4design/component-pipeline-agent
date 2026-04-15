---
system: GOV.UK Design System
component: Notification Banner / Warning Text
url: https://design-system.service.gov.uk/components/notification-banner/
last_verified: 2026-03-28
confidence: high
---

# Notification Banner (Alert equivalent)

## Approach
GOV.UK does not have a generic "Alert" component but provides Notification Banner and Warning Text for different alert scenarios. Notification Banner (added in GOV.UK Frontend 3.1) handles system-level messages like success confirmations after form submission or important information before a task. Warning Text uses a bold exclamation icon for critical cautionary content inline with page text.

## Key Decisions
1. **Notification Banner for page-level feedback** (HIGH) — Used for success/confirmation messages after form submission (e.g., "Application submitted") and for important pre-task information. The `type="success"` variant uses green styling for positive outcomes.
2. **Warning Text for inline cautions** (HIGH) — A different component for inline warnings within content, not as a page-level status message. Uses a "!" icon with visually hidden "Warning" text for screen readers.
3. **No role="alert" by default** (MEDIUM) — The notification banner does not use role="alert" for assertive announcement because it is typically present on page load, not dynamically injected. Teams must add live region roles for dynamic injection.

## Notable Props
- `type`: `"default" | "success"` — controls color treatment
- `titleText` / `titleHtml`: heading of the banner
- `html` / `text`: body content
- `disableAutoFocus`: prevent auto-focus to banner on page load

## A11y Highlights
- **Keyboard**: No interactive elements; informational only
- **Screen reader**: Banner heading announced on page load; disableAutoFocus controls focus behavior
- **ARIA**: role="region" with aria-labelledby on the banner title

## Strengths & Gaps
- **Best at**: Success state after form submission; clear separation of notification vs warning patterns
- **Missing**: No error/warning/info/success status variants in one component; no dismiss functionality; no toast-style dynamic notifications
