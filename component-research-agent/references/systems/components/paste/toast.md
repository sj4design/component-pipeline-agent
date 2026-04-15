---
system: Twilio Paste
component: Toast
url: https://paste.twilio.design/components/toast
last_verified: 2026-03-28
confidence: high
---

# Toast

## Approach
Twilio Paste's Toast component provides transient status notifications for async operations — API call success/failure, configuration saves, and process completions in the Twilio console. Paste uses a ToastContainer and useToastState hook pattern, managing a queue of toasts programmatically. The component provides four variants (success, error, warning, neutral) with appropriate icon indicators and auto-dismiss with configurable duration.

## Key Decisions
1. **useToastState hook + container pattern** (HIGH) — Toasts are managed through a React hook and imperative API (toastNotification.push()) rather than declarative JSX, enabling toast triggering from anywhere in the component tree without prop-drilling or context providers.
2. **Dismissible + auto-dismiss** (HIGH) — All toasts have both a manual dismiss button and auto-dismiss timer (5 seconds default), ensuring users can always dismiss but the UI self-clears for transient messages.
3. **Stacked toast queue** (MEDIUM) — Multiple simultaneous toasts stack vertically with the newest appearing first, managed by the ToastContainer to prevent UI overflow.

## Notable Props
- `variant`: "success" | "error" | "warning" | "neutral"
- `dismissAfter`: Duration in ms before auto-dismiss (0 = no auto-dismiss)
- `onDismiss`: Callback when toast is dismissed
- `setFocus`: Whether to move focus to toast on show (for critical messages)

## A11y Highlights
- **Keyboard**: Dismiss button is focusable; close button accessible via Tab
- **Screen reader**: role="status" (success/neutral) or role="alert" (error/warning); auto-announced when inserted into DOM
- **ARIA**: role="status" for non-urgent; role="alert" for urgent error/warning; aria-live="polite" vs "assertive" depending on variant

## Strengths & Gaps
- **Best at**: Programmatic toast triggering via hook; correct urgency-based ARIA live region selection; dismiss + auto-dismiss combination
- **Missing**: No action button within toast (link to resolution); limited to 4 variants
