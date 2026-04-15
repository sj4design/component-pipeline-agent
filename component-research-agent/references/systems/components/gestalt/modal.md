---
system: Gestalt (Pinterest)
component: Modal / Layer
url: https://gestalt.pinterest.systems/web/modal
last_verified: 2026-03-28
confidence: medium
---

# Modal

## Approach
Gestalt's Modal is designed for Pinterest's needs: presenting detailed content (pin details, board settings, user confirmation dialogs) in a focused overlay. The component handles standard modal behavior with Pinterest's visual aesthetic — rounded corners, drop shadow, white surface. Gestalt also provides a ModalAlert component for simpler confirm/dismiss dialogs, keeping the full Modal for complex content and the ModalAlert for one-action confirmations.

## Key Decisions
1. **Modal vs ModalAlert split** (HIGH) — Separating the full-content modal from the simple alert dialog prevents the alert case from requiring complex slot configuration. ModalAlert has a simpler API with just title, message, and action buttons. This reflects Pinterest's product reality: most confirmations are simple, and full modals are for feature-rich workflows.
2. **accessibilityModalLabel required** (HIGH) — Gestalt enforces an `accessibilityModalLabel` prop that provides the `aria-label` for the modal dialog. This ensures all modals have programmatic labels even when the visual heading is not inside the modal structure.
3. **Heading prop for structure** (MEDIUM) — Rather than free-form header content, Gestalt's Modal accepts a `heading` prop that renders a standardized header with consistent typography and spacing. This prevents inconsistent header implementations across Pinterest's many products.

## Notable Props
- `accessibilityModalLabel`: required aria-label for the dialog
- `heading`: modal title string
- `onDismiss`: close callback (required)
- `size`: `"sm" | "md" | "lg"` for different content sizes
- `footer`: footer content slot

## A11y Highlights
- **Keyboard**: Focus trapped inside; Escape closes; Tab/Shift+Tab cycle
- **Screen reader**: `role="dialog"` with required `aria-label`; background content aria-hidden
- **ARIA**: Required `accessibilityModalLabel` ensures no modal is ever unlabeled

## Strengths & Gaps
- **Best at**: Required accessibility label enforcement; ModalAlert separation; consistent heading structure
- **Missing**: Limited size options; no non-modal dialog variant; no inline mode
