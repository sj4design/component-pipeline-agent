---
system: Base Web (Uber)
component: Modal
url: https://baseweb.design/components/modal/
last_verified: 2026-03-28
confidence: medium
---

# Modal

## Approach
Base Web's Modal handles Uber's product range from consumer confirmations to operational dashboard dialogs. It follows the Base Web Overrides pattern for full customization of the overlay, dialog, header, body, footer, and close button. The component supports different animation modes and sizes, and integrates with Uber's focus management utilities. Base Web's Modal is feature-complete with built-in header/body/footer slots, making it practical without requiring consumers to build their own layout.

## Key Decisions
1. **Overrides for complete customization** (HIGH) — Every visual sub-component of the Modal (Root, Dialog, DialogContainer, Backdrop, Close, Header, Body, Footer) can be replaced via overrides. This reflects Uber's need to have the same modal infrastructure serve vastly different visual contexts.
2. **animate prop** (MEDIUM) — Controls whether the modal animates in/out. Useful for reducing motion for accessibility or disabling animation in test environments. Paired with `animateOutTime` for exit animation duration.
3. **Role support: dialog vs alertdialog** (MEDIUM) — Base Web's Modal supports the `role` prop to switch between `"dialog"` and `"alertdialog"`. AlertDialog changes keyboard behavior — Escape key does not close it, forcing explicit user action, which is appropriate for destructive confirmations.

## Notable Props
- `isOpen` / `onClose`: controlled state
- `role`: `"dialog" | "alertdialog"`
- `animate`: boolean — enable/disable animation
- `size`: `SIZE.default | SIZE.full | SIZE.auto | SIZE.mini`
- `closeable`: boolean — shows/hides close button
- `overrides`: deep customization of all sub-components

## A11y Highlights
- **Keyboard**: Focus trapped inside; Escape closes (unless alertdialog role); Tab/Shift+Tab cycle elements
- **Screen reader**: `role="dialog"` or `role="alertdialog"`; `aria-modal="true"`; labeled via header content
- **ARIA**: Background content suppressed from AT; proper labeling via aria-labelledby

## Strengths & Gaps
- **Best at**: alertdialog role for destructive actions; Overrides pattern; animation control
- **Missing**: Documentation could be clearer; size enum is non-standard naming compared to other systems
