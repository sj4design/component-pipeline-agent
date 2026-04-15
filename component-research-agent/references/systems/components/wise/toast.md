---
system: Wise Design
component: Toast
url: https://wise.design/components/toast
last_verified: 2026-03-28
confidence: low
---

# Toast

## Approach
Wise's Toast provides transient notifications for financial operations — transfer confirmations, payment receipts, error alerts, and account updates. Financial product toasts carry higher stakes than typical app notifications, requiring clear messaging and appropriate urgency signaling for error states. Wise's minimal design applies with clean toast styling.

## Key Decisions
1. **Financial operation feedback** (MEDIUM) — Toast messaging is designed for clear financial operation confirmation, with error states given high visual priority.
2. **Clear success/error distinction** (MEDIUM) — Success and error states are clearly differentiated, important when communicating transfer outcomes.
3. **Appropriate duration** (LOW) — Financial confirmation toasts may have longer duration than typical UI toasts to ensure users see important confirmations.

## Notable Props
- `message`: Toast content
- `variant`: success/error/warning/info

## A11y Highlights
- **Keyboard**: Close accessible
- **Screen reader**: Live region announcement
- **ARIA**: Appropriate live region

## Strengths & Gaps
- **Best at**: Financial operation confirmation notifications
- **Missing**: Low confidence — limited public documentation
