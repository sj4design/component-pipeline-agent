---
component: Modal
tier: 3
last_verified: 2026-03-29
---

# Modal — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Dialog | Headless: Dialog.Title required (console warning enforces it); Dialog.Portal by default; separate Overlay and Content components for independent animation timing; `modal=false` for non-modal dialogs; AlertDialog is a separate primitive. | high |
| Chakra UI | Modal | `scrollBehavior` prop (inside/outside controls where scrolling happens); `size` scale xs–full; `isCentered` for vertical centering; built-in `ModalCloseButton`; token-integrated overlay opacity and surface color. | high |
| GOV.UK | Not available — full-page pattern | Deliberate absence; GOV.UK research found modals cause significant usability issues for diverse populations; full-page confirmation patterns (separate URL, works without JS) are the recommended replacement. | high |
| Base Web | Modal | `role` prop for `dialog` vs. `alertdialog` (Escape disabled on alertdialog); Overrides for all sub-components; built-in header/body/footer layout; `animate` prop to disable animation for accessibility/testing. | medium |
| Fluent 2 | Dialog | `modalType` (modal/non-modal/alert); DialogSurface separates visual container from behavior; Fluent motion system integration; alert type requires explicit button action (no Escape/outside-click dismiss). | high |
| Gestalt | Modal / ModalAlert | Two-component split: Modal for complex content, ModalAlert for simple confirm/dismiss; `accessibilityModalLabel` required prop enforces programmatic labeling; `heading` prop for standardized header typography. | medium |
| Mantine | Modal | Programmatic `modals.open()` API for opening modals from service layers; `fullScreen` mode; configurable transition names for entrance/exit animations; size accepts string names or px numbers. | high |
| Orbit | Modal | Mobile-first with `isMobileFullPage` for full-screen on small viewports; `fixedFooter` pins action buttons during scroll for booking CTAs; Section component inside for multi-section content. | medium |
| Evergreen | Dialog | Built-in `confirmLabel`/`cancelLabel`/`onConfirm`/`onCancel` for the "are you sure?" pattern; `intent` prop colors confirm button (none/success/warning/danger); `isConfirmLoading` for async confirmation state. | medium |
| Nord | Modal (nord-modal) | Web component for clinical confirmations and patient consent dialogs; configurable dismiss behavior for critical confirmations that must not be accidentally closed; clear heading structure required. | low |

## Key Decision Patterns

The most structurally significant divide in T3 modals is alert dialog handling. Base Web's `role="alertdialog"`, Fluent 2's `modalType="alert"`, and Radix's separate AlertDialog primitive all implement the same concept — a dialog that cannot be dismissed with Escape or overlay-click, requiring deliberate button action — but via different APIs. The `alertdialog` pattern exists specifically for destructive or high-stakes confirmations (deleting data, approving critical actions) where accidental dismissal could cause harm. Systems with production products that include destructive actions (Base Web for Uber operations, Fluent 2 for Azure resource deletion) have thought this through explicitly; systems without that use case often miss it.

Radix's enforcement of Dialog.Title via console warning is the only T3 system that actively prevents the most common modal accessibility error: visually obvious but programmatically unlabeled dialogs. In React applications, a developer who forgets to include a title inside a dialog produces a modal with no accessible name — screen reader users hear "dialog" with no context about purpose. Radix's warning at render time catches this during development. Gestalt's required `accessibilityModalLabel` prop is the only other T3 system that enforces this, via required prop validation rather than runtime warning.

Mantine's programmatic modals API (`modals.open()`) is unique in the T3 set and addresses a real React architectural friction: modals that need to open after async operations deep in service or data-fetching layers require either prop-drilling, context, or a global store to trigger the JSX rendering. The `modals.open()` pattern decouples modal invocation from component tree structure, similar to how toast/notification APIs work. This is particularly useful in forms where a successful save might trigger a congratulatory modal, or an error in a background operation needs to surface a blocking dialog.

Orbit's `fixedFooter` and GOV.UK's complete absence of a Modal component are the clearest examples of product domain driving component design. Orbit's travel booking context requires that confirmation buttons remain visible regardless of modal content height — a scrolled booking summary with a hidden "Confirm" button would cause bookings to be abandoned. GOV.UK's research with the UK general public led to eliminating modals entirely, replacing them with separate URL-based confirmation pages that work without JavaScript, are bookmarkable, and have no focus trap complexity.

## A11y Consensus

- The WAI-ARIA dialog pattern requires `role="dialog"` (or `role="alertdialog"`), `aria-labelledby` pointing to the dialog heading, `aria-modal="true"`, and `aria-hidden="true"` applied to background content — all T3 implementations follow this pattern.
- Focus must move to the dialog when it opens (typically to the first focusable element or the dialog itself), and must return to the trigger element when it closes — this is the most commonly broken modal behavior in custom implementations.
- `aria-modal="true"` is required to prevent screen reader virtual cursor from leaving the dialog in browse mode; `aria-hidden` on the background is the complementary approach — both are needed for different AT behaviors.
- `role="alertdialog"` changes keyboard behavior: Escape does not close the dialog, requiring explicit button interaction — use this for irreversible or high-stakes confirmations.
- Dialog.Title (Radix) or equivalent must be present and linked via `aria-labelledby`; a dialog without an accessible name is the most common modal accessibility failure.

## Recommended Use

Reference T3 modal approaches when deciding on alertdialog handling, programmatic modal APIs, and title enforcement. Radix's Dialog is the reference for required title enforcement and AlertDialog separation; Mantine is the reference for programmatic `modals.open()` API for async workflows; Base Web and Fluent 2 are references for `alertdialog` role implementation; Evergreen is the reference for the built-in confirm/cancel pattern with intent-colored buttons; GOV.UK is the reference for the research-backed argument against modals in public-facing services.
