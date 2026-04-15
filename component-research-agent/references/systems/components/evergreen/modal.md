---
system: Evergreen (Segment)
component: Dialog
url: https://evergreen.segment.com/components/dialog
last_verified: 2026-03-28
confidence: medium
---

# Dialog (Modal)

## Approach
Evergreen's Dialog is a well-structured modal component for Segment's analytics dashboard use cases. It uses a declarative API where the dialog content and trigger are defined together, and the open/close state is managed internally with `isShown` for controlled mode. The component includes built-in header, body, and footer layout with a customizable confirm button. Evergreen Dialogs come in two sizes and support both information and confirmation interaction patterns.

## Key Decisions
1. **Built-in confirm/cancel pattern** (HIGH) — The Dialog provides `confirmLabel`, `cancelLabel`, `onConfirm`, `onCancel` props out of the box, making the common "are you sure?" pattern trivial to implement. This reflects the analytics dashboard reality where many dialogs are simple confirmations.
2. **Intent prop** (HIGH) — `intent` (`"none" | "success" | "warning" | "danger"`) colors the confirm button, making destructive dialogs visually distinct without requiring custom button overrides. This is important for data deletion confirmations in analytics products.
3. **isConfirmLoading prop** (MEDIUM) — The Dialog supports a loading state on the confirm button for async operations (deleting a workspace, exporting data). This prevents double-clicks during API calls — a critical need in data management tools.

## Notable Props
- `isShown` / `onCloseComplete`: controlled state
- `title`: dialog heading
- `intent`: `"none" | "success" | "warning" | "danger"`
- `confirmLabel` / `cancelLabel`: button labels
- `onConfirm` / `onCancel`: action callbacks
- `isConfirmLoading` / `isConfirmDisabled`: confirm button state
- `width`: `"default" | "narrow"` size control

## A11y Highlights
- **Keyboard**: Focus trapped; Escape closes; Tab cycles elements
- **Screen reader**: role="dialog"; title provides aria label; background suppressed
- **ARIA**: Standard dialog ARIA pattern

## Strengths & Gaps
- **Best at**: Built-in confirm/cancel pattern; intent for destructive actions; isConfirmLoading for async
- **Missing**: No fullscreen mode; limited size options; no custom animation
