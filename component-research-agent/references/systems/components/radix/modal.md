---
system: Radix UI (WorkOS)
component: Dialog
url: https://www.radix-ui.com/primitives/docs/components/dialog
last_verified: 2026-03-28
confidence: high
---

# Dialog (Modal)

## Approach
Radix's Dialog is one of its most important primitives, handling the full complexity of modal behavior: focus trapping, scroll locking, portal rendering, and the WAI-ARIA dialog pattern. It is composable via Dialog.Root, Dialog.Trigger, Dialog.Portal, Dialog.Overlay, Dialog.Content, Dialog.Title, and Dialog.Close. The headless approach means Radix handles all the interaction and accessibility wiring while the consumer provides all visual design. The separation of Overlay and Content into distinct components is intentional — it allows the overlay and dialog to have independent animation timings and styles.

## Key Decisions
1. **Dialog.Title as required** (HIGH) — Radix enforces (via console warning) that Dialog.Title is present. This ensures all dialogs have a programmatic title for screen readers, addressing the common accessibility failure of visually obvious but unmarked dialog headings.
2. **Portal rendering by default** (HIGH) — Dialog.Portal renders content outside the current DOM tree to avoid z-index and overflow clipping issues. This is optional but default, reflecting the reality that modals frequently break when rendered inside positioned ancestors.
3. **Separate Overlay and Content animation** (MEDIUM) — Because Overlay and Content are separate components, they can animate independently. The overlay can fade while the content scales up, matching modern motion design patterns without requiring a single-container animation hack.

## Notable Props
- `modal`: boolean on Dialog.Root — when false, makes it a non-modal dialog (no focus trap, no scroll lock)
- `onOpenChange`: callback for open state changes
- `onInteractOutside` / `onEscapeKeyDown`: escape hatches to prevent default close behavior
- `forceMount`: keeps Dialog.Content mounted even when closed (for exit animations)

## A11y Highlights
- **Keyboard**: Focus trapped inside dialog; Tab/Shift+Tab cycle through focusable elements; Escape closes dialog
- **Screen reader**: `role="dialog"` with `aria-labelledby` pointing to Dialog.Title; background content has `aria-hidden`
- **ARIA**: `aria-describedby` can reference Dialog.Description; `aria-modal="true"` prevents virtual cursor from leaving dialog

## Strengths & Gaps
- **Best at**: Focus management; required title enforcement; non-modal dialog support; independent overlay/content animation
- **Missing**: No built-in dialog sizes or layout structure (header/body/footer); no alert dialog variant (separate AlertDialog primitive exists)
