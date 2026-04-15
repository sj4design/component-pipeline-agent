---
system: shadcn/ui
component: Dialog
url: https://ui.shadcn.com/docs/components/dialog
last_verified: 2026-03-28
confidence: high
---

# Dialog (Modal)

## Approach
shadcn/ui's Dialog is built on Radix UI's Dialog primitive, providing fully accessible modal behavior with focus trap, Escape handling, and overlay click dismiss. The component uses Radix's compound component pattern with Dialog.Root, Dialog.Trigger, Dialog.Content, Dialog.Header, Dialog.Footer, Dialog.Title, and Dialog.Description. The animation uses Tailwind CSS with Radix data-state attributes. AlertDialog is a separate component for destructive confirmations.

## Key Decisions
1. **AlertDialog separation** (HIGH) — Destructive confirmations use a separate AlertDialog component (which cannot be dismissed by Escape or overlay click by default), correctly differentiating between informational dialogs and destructive action confirmations.
2. **Radix compound component pattern** (HIGH) — Fully composable sub-components give developers control over every part of the dialog structure while Radix handles all accessibility wiring.
3. **Radix Portal** (HIGH) — Content automatically renders in a portal, avoiding z-index and stacking context issues without developer configuration.

## Notable Props
- `open` / `defaultOpen`: Controlled/uncontrolled open state
- `onOpenChange`: Callback for open state changes
- `modal`: Boolean controlling whether the dialog is modal (default true)
- `DialogTitle` (required): Provides aria-labelledby; Radix warns if missing

## A11y Highlights
- **Keyboard**: Focus trapped in dialog; Escape closes (unless AlertDialog with destructive action); focus restores to trigger on close
- **Screen reader**: role="dialog" or "alertdialog" (AlertDialog); aria-labelledby DialogTitle; aria-describedby DialogDescription
- **ARIA**: Radix automatically wires aria-labelledby and aria-describedby to Title and Description components

## Strengths & Gaps
- **Best at**: AlertDialog separation for destructive patterns; automatic ARIA wiring; full structural flexibility
- **Missing**: No built-in drawer/sheet (separate Sheet component exists); no wizard/multi-step pattern
