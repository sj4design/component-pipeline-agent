---
system: Wise Design
component: Modal
url: https://wise.design/components/modal
last_verified: 2026-03-28
confidence: low
---

# Modal

## Approach
Wise's Modal is used in financial transfer confirmation flows, identity verification steps, and account settings. The financial product context means modals frequently handle high-stakes confirmations (confirming money transfers) where clear messaging and accessible dismiss controls are critical for user trust and safety. Wise's clean design aesthetic carries into the modal with minimal decoration.

## Key Decisions
1. **Confirmation-first design** (MEDIUM) — Modal design prioritizes clear presentation of financial action confirmations with prominent action buttons and summary information.
2. **Minimal visual treatment** (MEDIUM) — Consistent with Wise's clean design language — modals use white backgrounds with subtle shadow, not heavy overlay treatments.
3. **Close control** (LOW) — Close button and Escape handling standard; some financial confirmation flows may prevent easy dismissal to ensure user acknowledges.

## Notable Props
- `isOpen`: Open state control
- `onClose`: Close callback
- `title`: Modal title

## A11y Highlights
- **Keyboard**: Focus trap and Escape close expected
- **Screen reader**: Dialog role and title association expected
- **ARIA**: Standard dialog ARIA expected

## Strengths & Gaps
- **Best at**: Financial confirmation dialog patterns; clean minimal presentation
- **Missing**: Low confidence — limited public documentation; details require web verification
