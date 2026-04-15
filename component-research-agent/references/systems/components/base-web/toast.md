---
system: Base Web (Uber)
component: Toast / Snackbar
url: https://baseweb.design/components/toast/
last_verified: 2026-03-28
confidence: medium
---

# Toast

## Approach
Base Web provides a Toast component with a `toaster` utility for programmatic notification triggering. It supports multiple notification types (info, positive, warning, negative) mapped to Uber's semantic color system. The toast system uses a `ToasterContainer` for positioning and stacking, with individual toasts auto-dismissing after a configurable duration. Base Web's toast integrates with the Overrides pattern for visual customization.

## Key Decisions
1. **Programmatic toaster API** (HIGH) — `toaster.positive()`, `toaster.negative()`, `toaster.warning()`, `toaster.info()` methods for imperative notification triggering. The method names match Uber's semantic color system (positive = green, negative = red).
2. **autoHideDuration** (MEDIUM) — Per-toast duration control. Negative (error) toasts can be given longer durations than informational toasts since errors require more attention.
3. **closeable** (MEDIUM) — Individual toasts can have an X close button, allowing users to dismiss before auto-hide. Error toasts in Uber's ops tools are often made persistent (`autoHideDuration: 0`) so operators don't miss critical alerts.

## Notable Props
- `toaster.positive(children, config)` / `.negative()` / `.warning()` / `.info()`
- `autoHideDuration`: ms before auto-dismiss (0 = persistent)
- `closeable`: boolean — shows close button
- `key`: for updating existing toast

## A11y Highlights
- **Keyboard**: Close button is keyboard accessible
- **Screen reader**: role="alert" for negative; role="status" for others; content announced via live region
- **ARIA**: Positive/negative semantic maps to appropriate ARIA live region politeness

## Strengths & Gaps
- **Best at**: Semantic method names; persistent toasts via autoHideDuration:0; Overrides for styling
- **Missing**: No swipe-to-dismiss; no toast action button pattern built-in
