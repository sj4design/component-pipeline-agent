---
system: Fluent 2 (Microsoft)
component: Dialog
url: https://fluent2.microsoft.design/components/web/react/dialog/usage
last_verified: 2026-03-28
confidence: high
---

# Dialog (Modal)

## Approach
Fluent 2's Dialog is a sophisticated modal component reflecting Microsoft's experience building dialogs across Teams, Office, and Azure. It provides two sub-components — Dialog (modal) and DialogSurface (the visual container) — with composable slots for header, body, and footer actions. Fluent 2's Dialog supports both modal and non-modal modes, and provides an AlertDialog variant for destructive actions. The component follows Microsoft's Fluent motion guidelines for entrance/exit animations and uses Fluent's elevation tokens for the dialog surface.

## Key Decisions
1. **DialogSurface for visual separation** (HIGH) — The Dialog (handles behavior) and DialogSurface (handles visual presentation) are separated, allowing the visual container to be used independently or replaced. This reflects Fluent's architecture of separating concern layers.
2. **Fluent motion integration** (HIGH) — Dialog animations follow Fluent's motion principles — scale up on enter, fade on exit. The timing curves use Fluent's spring-based motion tokens. This is important for cross-product consistency in the Microsoft ecosystem.
3. **Inline type support** (MEDIUM) — Fluent 2 supports `modalType="modal"`, `"non-modal"`, and `"alert"`. Alert type cannot be dismissed by clicking outside or pressing Escape, requiring explicit button interaction. This is important for Azure's destructive action confirmations.

## Notable Props
- `open` / `onOpenChange`: controlled state
- `modalType`: `"modal" | "non-modal" | "alert"`
- `defaultOpen`: uncontrolled initial state
- `inertTrapFocus`: alternate focus trapping strategy

## A11y Highlights
- **Keyboard**: Focus trapped in modal mode; Tab/Shift+Tab cycle; Escape closes (not for alert type)
- **Screen reader**: `role="dialog"` or `role="alertdialog"`; `aria-labelledby` on DialogTitle; `aria-describedby` for body
- **ARIA**: `aria-modal="true"`; DialogTitle uses heading element for proper document structure

## Strengths & Gaps
- **Best at**: modalType alert for destructive actions; Fluent motion integration; Microsoft-standard dialog patterns
- **Missing**: No built-in size variants (teams use CSS); less visual configuration than Chakra
