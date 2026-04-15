---
system: Base Web (Uber)
component: ProgressSteps
url: https://baseweb.design/components/progress-steps/
last_verified: 2026-03-29
confidence: high
---

# Steps / ProgressSteps

## Approach
Base Web provides a ProgressSteps component that implements the classic vertical stepper pattern with numbered steps, connecting lines, and completion state indicators. The component is designed for multi-step flows like onboarding, checkout, and configuration wizards — use cases common in Uber's internal tools and Uber's B2C product onboarding flows. Steps can be in "completed", "active", or "upcoming" states. The component supports both numbered steps (ProgressSteps) and icon steps with built-in checkmark/error icons. Content for the active step is rendered inline beneath the step header, making it a true wizard container rather than just a navigation indicator.

## Key Decisions
1. **Vertical orientation only** (HIGH) — Base Web's ProgressSteps is vertical. Horizontal steppers, common in desktop checkout flows, are not provided natively. Teams building horizontal steppers must implement them custom or adapt with CSS overrides, as the component's DOM structure is built for vertical layout with connecting lines between steps.
2. **Inline content for active step** (HIGH) — The active step can render children (form fields, content) directly below the step header via the `content` prop. This makes ProgressSteps a self-contained wizard container, not just a progress indicator — the step's content is co-located with the step metadata.
3. **NumberedStep vs Step** (MEDIUM) — Two variants exist: `NumberedStep` shows sequential numbers in the step indicators; `Step` shows a checkmark when completed and an empty circle for upcoming. Teams choose based on whether the sequence number is meaningful to the user or whether the completion state is more important.
4. **No built-in navigation controls** (MEDIUM) — ProgressSteps does not include prev/next buttons. Navigation logic (validating the current step, advancing, going back) is entirely the consumer's responsibility. This keeps the component focused on display while letting teams implement any navigation pattern they need.

## Notable Props
- `current`: index of the active step (controlled)
- `isVertical`: always true for the standard component
- `overrides`: Full styletron override system for all sub-elements (Root, Step, Tail, IconContainer, Content, Title, Description)
- Per-step props: `title`, `description`, `isCompleted`, `isActive`, `isLast`

## A11y Highlights
- **Keyboard**: ProgressSteps itself is not interactive — it's a display component; interactive elements (buttons, inputs) within step content are keyboard accessible normally
- **Screen reader**: Step numbers/icons are visually rendered; teams should use visually-hidden text to communicate step states ("Step 1 of 3, completed") for screen reader users
- **ARIA**: No built-in ARIA on the step container; recommended to add `aria-current="step"` to the active step header; content regions benefit from heading structure

## Strengths & Gaps
- **Best at**: Vertical multi-step wizard display with inline step content; full override customization via Styletron; clean separation of completed/active/upcoming states
- **Missing**: No horizontal variant; no built-in navigation controls; no keyboard-navigable step tabs; accessibility enhancements (aria-current, sr-only labels) must be added manually
