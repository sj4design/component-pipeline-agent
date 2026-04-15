---
system: Chakra UI
component: Modal / Dialog
url: https://chakra-ui.com/docs/components/modal
last_verified: 2026-03-28
confidence: high
---

# Modal

## Approach
Chakra UI's Modal is a feature-complete, styled modal component with sensible defaults for web applications. It provides the full composable structure — Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter — that maps to common dialog layouts. Chakra's Modal integrates with its design token system for overlay opacity, content surface color, and border radius. A key design decision is the built-in `isCentered` prop for vertically centered dialogs, addressing a common pain point where modals appear too high on the screen.

## Key Decisions
1. **Preset size scale** (HIGH) — Chakra Modal has a `size` prop with values from `"xs"` to `"full"`, including `"xl"` and `"2xl"`. This covers the common need for different modal sizes (confirmation dialogs vs. form modals vs. full-screen panels) without requiring width CSS overrides.
2. **scrollBehavior prop** (HIGH) — Controls whether the entire modal window scrolls (`"outside"`) or only the body content scrolls (`"inside"`). This addresses a real layout problem where long modal content either forces the overlay to scroll (jarring) or clips content (broken). Chakra makes this a simple prop choice.
3. **isCentered** (MEDIUM) — Boolean to vertically center the dialog. Default is top-aligned (with scroll for long content), which matches browser native behavior. `isCentered` is used for confirmation dialogs and alerts where the content is short and should feel prominent.

## Notable Props
- `isOpen` / `onClose`: required controlled state
- `size`: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full"`
- `isCentered`: vertically centers the dialog
- `scrollBehavior`: `"inside" | "outside"`
- `closeOnOverlayClick` / `closeOnEsc`: control dismiss behaviors
- `blockScrollOnMount`: scroll lock behavior

## A11y Highlights
- **Keyboard**: Focus trapped inside modal; Escape closes; Tab/Shift+Tab cycle focusable elements
- **Screen reader**: `role="dialog"` with `aria-modal="true"`; ModalHeader is referenced via `aria-labelledby`
- **ARIA**: ModalBody can be referenced via `aria-describedby`; background content gets `aria-hidden`

## Strengths & Gaps
- **Best at**: Size scale; scrollBehavior prop; built-in close button; token integration
- **Missing**: No drawer variant in v3 (separate Drawer component); no built-in alert dialog variant
