---
system: Fluent 2 (Microsoft)
component: Toast / Toaster
url: https://fluent2.microsoft.design/components/web/react/toast/usage
last_verified: 2026-03-28
confidence: high
---

# Toast / Toaster

## Approach
Fluent 2's Toast system is designed for Microsoft's complex product notifications — Office save confirmations, Teams message send status, Azure deployment notifications. The Toaster provides the container and positioning, while individual Toast components have rich structure (title, body, action button, dismiss button). Fluent's Toast follows the pattern of other Fluent notification surfaces and integrates with the motion system for entrance/exit animations.

## Key Decisions
1. **useToastController hook** (HIGH) — A React hook provides `dispatchToast()` and `dismissToast()` methods for programmatic control. This is the standard Fluent pattern for triggering notifications from event handlers and service code.
2. **intent maps to visual treatment** (HIGH) — `intent: "success" | "error" | "warning" | "info"` maps to icon and color combinations in Fluent's semantic color system. The same intents are used in MessageBar, Toast, and other notification surfaces for visual consistency.
3. **politeness prop** (HIGH) — `politeness: "assertive" | "polite"` controls the aria-live announcement behavior. Fluent exposes this directly, allowing teams to correctly classify their notifications (error = assertive, success = polite) based on urgency.

## Notable Props
- `useToastController(toasterId)`: dispatchToast, dismissToast hooks
- `intent`: `"success" | "error" | "warning" | "info"`
- `politeness`: `"assertive" | "polite" | "off"`
- `timeout`: auto-dismiss duration (-1 = persistent)
- `Toaster > position`: viewport position

## A11y Highlights
- **Keyboard**: Toasts with actions are keyboard accessible; keyboard shortcut to focus toast viewport
- **Screen reader**: politeness prop correctly controls announcement urgency; intent adds semantic context
- **ARIA**: aria-live region managed by Toaster; politeness directly maps to aria-live values

## Strengths & Gaps
- **Best at**: Explicit politeness control; intent consistency with other Fluent surfaces; useToastController hook
- **Missing**: No built-in progress indicator toast variant
