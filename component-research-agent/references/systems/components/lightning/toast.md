---
system: Salesforce Lightning Design System
component: Toast
url: https://lightningdesignsystem.com/components/toast/
last_verified: 2026-03-28
confidence: high
---

# Toast

## Approach
Salesforce Lightning's Toast provides system-level notifications for CRM operations — record saves, bulk action completions, error notifications, and process updates. Lightning's Toast supports optional action links within the message, which is notable and addresses the common need to provide a "View record" or "Undo" action alongside a notification. The component renders at the top of the page within the Lightning app shell.

## Key Decisions
1. **Action link support** (HIGH) — Toast supports an optional action link/button within the message text, enabling "Record saved. View record." patterns that are standard in CRM success notifications.
2. **Page-level positioning** (HIGH) — Toast renders at the top of the page within the Lightning app shell layout, consistent with Salesforce's fixed notification area that doesn't overlap page content.
3. **Icon + variant system** (MEDIUM) — Four variants (success, error, warning, info) with variant-specific icons and background colors, providing immediate visual scanning of notification type.

## Notable Props
- `variant`: "success" | "error" | "warning" | "info"
- `labels.heading`: Main notification text
- `labels.headingLink`: Optional action link text within the message
- `onClickHeadingLink`: Action link callback
- `duration`: Auto-dismiss duration

## A11y Highlights
- **Keyboard**: Close button focusable; action link focusable within toast
- **Screen reader**: role="alert" with aria-live="assertive" for immediate announcement; heading announced
- **ARIA**: role="alert"; aria-live="assertive"; variant communicated via icon with aria-hidden and sr-only text

## Strengths & Gaps
- **Best at**: Action links within toast; enterprise CRM notification patterns; page-level positioning
- **Missing**: No toast queue management for multiple simultaneous toasts; stacking behavior not well-defined
