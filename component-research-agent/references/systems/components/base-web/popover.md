---
system: Base Web (Uber)
component: Popover
url: https://baseweb.design/components/popover/
last_verified: 2026-03-28
confidence: medium
---

# Popover

## Approach
Base Web's Popover is a positioned overlay that can contain arbitrary content. It supports controlled and uncontrolled usage, multiple trigger types (click, hover, focus), and placement options. The component uses Popper.js for positioning. Base Web distinguishes between Popover (interactive content) and StatefulPopover (manages its own open state).

## Key Decisions
1. **StatefulPopover for common use** (HIGH) — `StatefulPopover` manages open/close state internally, reducing boilerplate for the common case. Controlled `Popover` is available for complex state coordination.
2. **triggerType prop** (HIGH) — `TRIGGER_TYPE.click` vs `TRIGGER_TYPE.hover` changes the interaction model. Hover popovers are useful for tooltips-with-rich-content; click popovers for interactive overlays.
3. **Overrides for Body, Arrow, Inner** (MEDIUM) — All visual sub-elements are overridable, fitting the Base Web model and enabling custom popover chrome.

## Notable Props
- `content`: popover body (render prop or ReactNode)
- `placement`: position relative to trigger (PLACEMENT enum)
- `triggerType`: TRIGGER_TYPE.click | TRIGGER_TYPE.hover
- `isOpen` / `onOpen` / `onClose`: controlled state
- `overrides`: Body, Arrow, Inner, Root

## A11y Highlights
- **Keyboard**: Escape closes; Tab within popover content; focus returns to trigger on close
- **Screen reader**: role="tooltip" or role="dialog" depending on content; trigger has aria-haspopup
- **ARIA**: Appropriate role based on content type

## Strengths & Gaps
- **Best at**: StatefulPopover for uncontrolled use; triggerType flexibility; overrides for customization
- **Missing**: No built-in header/body/footer structure; no initialFocusRef equivalent
