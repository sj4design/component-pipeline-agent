---
system: Playbook (Power Home Remodeling)
component: Toast
url: https://playbook.powerapp.cloud/kits/toast
last_verified: 2026-03-28
confidence: medium
---

# Toast

## Approach
Playbook's Toast provides transient notifications in their CRM and project management applications — confirming record saves, flagging errors, and communicating process completions. Available in React and ViewComponent implementations. Standard variants cover success, error, warning, and info notification types.

## Key Decisions
1. **CRM operation feedback** (HIGH) — Primary use case is confirming CRM operations (saved job record, updated customer info, scheduled appointment), driving the variant and messaging patterns.
2. **Dual React/Rails** (HIGH) — Both implementations ensure consistent notification UX across the application stack.
3. **Auto-dismiss** (MEDIUM) — Configurable auto-dismiss duration with manual dismiss button for user control.

## Notable Props
- `message`: Toast message text
- `variant`: success/error/warning/info
- `onDismiss`: Dismiss callback
- `duration`: Auto-dismiss timing

## A11y Highlights
- **Keyboard**: Dismiss button focusable
- **Screen reader**: Live region announcement on show
- **ARIA**: role="alert" or role="status"; aria-live region

## Strengths & Gaps
- **Best at**: CRM operation notifications; dual framework support
- **Missing**: Medium confidence; advanced queue management details uncertain
