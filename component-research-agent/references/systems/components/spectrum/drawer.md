---
system: Spectrum (Adobe)
component: Not available natively (workaround via ModalOverlay + Dialog)
url: https://react-spectrum.adobe.com/react-aria/Modal.html
last_verified: 2026-03-28
---

# Drawer

## Approach

Spectrum does not ship a dedicated Drawer component. This absence is architecturally intentional. Adobe's design philosophy, as evidenced by the React Aria documentation, treats Drawer as a presentation variant of the Modal overlay pattern rather than a distinct component. The reasoning: a Drawer and a Modal share the same fundamental interaction contract — they both trap focus, use a backdrop, require explicit dismissal, and return focus on close. The only difference is the visual presentation (edge-anchored sliding panel vs. centered dialog) and the animation direction. Rather than duplicating the accessibility infrastructure for what is essentially a CSS-level distinction, Spectrum provides ModalOverlay as a composable primitive that can be animated and positioned to replicate drawer behavior.

The React Aria documentation explicitly states: "Together with custom entry and exit animations, you can build other types of overlays beyond traditional modal dialogs such as trays or drawers." This is not a gap in the system — it is a deliberate choice to avoid proliferating components for presentation variants. The tradeoff is that teams who want a drawer must build and maintain their own composed component, which means no consistent Drawer pattern across Adobe products unless product teams standardize independently.

## Key Decisions

1. **Modal = Drawer at the component level** (HIGH) — Adobe collapses Drawer into Modal's behavior model. This is a strong stance: if you need edge-anchored overlay behavior, you use the Modal primitive with edge-anchored CSS animations. The rationale is DRY (don't repeat yourself) at the accessibility layer — focus trap, backdrop, Escape-to-close, and aria-modal are all handled once in ModalOverlay and reused for every overlay variant. This avoids the maintenance cost of two nearly identical accessible overlay implementations.

2. **ModalOverlay as animation target** (HIGH) — The ModalOverlay component accepts custom CSS for both entry and exit animations, allowing slide-in/slide-out from any edge. This provides the Drawer presentation layer while keeping the behavior layer unified. Teams can compose `<ModalOverlay className="drawer-overlay"><Dialog>...</Dialog></ModalOverlay>` with a slide-from-right animation class to achieve standard Drawer behavior.

3. **No Tray/Drawer in the component library** (MEDIUM) — Spectrum's React Spectrum (the higher-level component library built on React Aria) also lacks a Drawer. Spectrum does have a Tray component concept (bottom-sliding overlay for mobile contexts), but it is not publicly documented as a standalone component. This gap is more significant for design-system-on-design-system teams who want an out-of-box Drawer without composition work.

4. **Focus trap and aria-modal are non-negotiable** (HIGH) — Even in the workaround path, any Drawer built on ModalOverlay inherits full focus trap and `aria-modal="true"` behavior. This is actually a strength: teams cannot accidentally build an accessible-looking Drawer with a broken focus model because the behavior is baked into the primitive.

## Notable Props

- `ModalOverlay`: `isOpen`, `onOpenChange`, `isDismissable` (click-outside to close), `isKeyboardDismissDisabled` (prevent Escape close).
- No Drawer-specific props — animation class names are applied via className to ModalOverlay and Dialog.

## A11y Highlights

- **Keyboard**: ModalOverlay enforces focus trap within the overlay. Escape dismisses (unless `isKeyboardDismissDisabled`). Focus returns to the trigger element on close.
- **Screen reader**: `aria-modal="true"` is applied to the overlay, signaling to screen readers that background content is inert. The Dialog inside should have `aria-labelledby` pointing to its heading.
- **ARIA**: The Dialog role is inherited from the Dialog component wrapped within ModalOverlay. `role="dialog"` or `role="alertdialog"` depending on content type.

## Strengths & Gaps

- **Best at**: Accessibility correctness — any Drawer built on ModalOverlay has guaranteed focus trap and screen reader inertness of background content, because those behaviors cannot be opted out of.
- **Missing**: Zero out-of-box Drawer component means every team must build their own, resulting in inconsistent drawer implementations across the Adobe ecosystem unless a separate internal library standardizes the pattern.
