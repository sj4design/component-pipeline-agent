---
system: Twilio Paste
component: Modal
url: https://paste.twilio.design/components/modal
last_verified: 2026-03-28
confidence: high
---

# Modal

## Approach
Twilio Paste's Modal is built on Reakit's Dialog primitive, providing robust focus management and ARIA dialog semantics. Paste's Modal is opinionated about structure — it requires ModalHeader, ModalBody, and ModalFooter sub-components to enforce consistent layout and ensure accessible labeling. The system provides extensive guidance on appropriate use cases (confirmation dialogs, focused tasks) vs. misuse patterns (putting navigation or complex workflows in modals).

## Key Decisions
1. **Required structural sub-components** (HIGH) — ModalHeader, ModalBody, ModalFooter are required slots, not optional, ensuring every modal has a visible title (for aria-labelledby) and correct semantic structure.
2. **Reakit Dialog foundation** (HIGH) — Delegates focus trap, scroll lock, escape key handling, and ARIA dialog semantics to Reakit, ensuring correct behavior without custom reimplementation.
3. **Size variants for content flexibility** (MEDIUM) — default and wide size variants accommodate the range from simple confirmation dialogs to more complex task flows.

## Notable Props
- `isOpen`: Controlled open state
- `onDismiss`: Callback for close (Escape, overlay click, close button)
- `size`: "default" | "wide"
- `ariaLabelledby`: Points to ModalHeading id (auto-wired when using sub-components)

## A11y Highlights
- **Keyboard**: Focus trapped inside modal when open; Escape closes; Tab cycles through focusable elements
- **Screen reader**: role="dialog" with aria-labelledby pointing to header; aria-modal prevents background content reading
- **ARIA**: aria-modal="true"; aria-labelledby required; aria-describedby for ModalBody content

## Strengths & Gaps
- **Best at**: Accessibility correctness; enforced structural conventions; comprehensive misuse documentation
- **Missing**: No drawer/sheet variant built-in; no multi-step wizard modal pattern
