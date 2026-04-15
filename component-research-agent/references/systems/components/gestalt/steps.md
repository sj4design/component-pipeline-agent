---
system: Gestalt (Pinterest)
component: Not available natively
url: N/A
last_verified: 2026-03-29
confidence: high
---

# Steps (Stepper)

## Approach
Gestalt has no Steps or Stepper component. Pinterest's multi-step flows — pin creation, board setup, business account onboarding, ad campaign creation — are implemented using a series of modal dialogs or Sheet panels with custom navigation logic, not a standard stepper component. This pattern choice is rooted in Pinterest's mobile-first design: stepper components with horizontal step indicators are a desktop pattern that translates poorly to small screens where horizontal space is scarce. On mobile, the sequential nature of multi-step flows is better communicated through full-screen modal transitions with back/next navigation, which is a natural mental model on touch devices. Each step in Pinterest's flows is treated as a self-contained modal screen with its own heading and context, and progress is communicated through step count labels ("Step 2 of 4") in the modal header rather than a persistent visual stepper track.

## Key Decisions
1. **Modal dialogs over persistent step track** (HIGH) — Pinterest's multi-step flows are mobile-first and the modal-per-step pattern creates a clear, full-focus environment for each decision (pin image, title, description, board selection). A horizontal stepper track would compress into unusability on narrow mobile screens.
2. **Progress communicated via "Step X of Y" text** (HIGH) — A simple text label in the modal header ("Step 2 of 4") is universally readable and mobile-friendly, whereas a visual step indicator requires horizontal layout that Pinterest's flows cannot guarantee across all viewport sizes.
3. **Each step is independently accessible** (HIGH) — By modeling each step as an independent modal, focus management, heading structure, and ARIA dialog semantics are handled naturally per step. A complex Stepper component with multiple states to manage simultaneously would increase ARIA implementation complexity.
4. **Flow logic is application-level concern** (MEDIUM) — The branching, skipping, and conditional logic in Pinterest's flows (e.g., pin creation skips some steps for video vs. image) makes a generic linear Stepper component a poor fit. Application-level state machines are better suited to this complexity.

## Notable Props
- N/A — Component does not exist in Gestalt.

## A11y Highlights
- **Keyboard**: N/A for a dedicated component. Modal-based step flows use Sheet/Modal keyboard navigation (focus trap, Escape to go back/close, Tab within step).
- **Screen reader**: N/A for a dedicated component. Each modal step announces its own `role="dialog"` with heading; step count text ("Step 2 of 4") is read as part of the heading or modal label.
- **ARIA**: N/A for a dedicated component.

## Strengths & Gaps
- **Best at**: N/A as a dedicated component. The modal-per-step approach works reliably on mobile and produces clean, focused step interactions.
- **Missing**: No visual step progress indicator component for surfaces where showing the full flow map helps orientation (complex onboarding flows, multi-step settings wizards in the business dashboard); no standard component for linear step navigation, leading teams to each implement their own step counter and back/next navigation patterns, creating inconsistency across Pinterest's various multi-step flows; no component for non-linear processes where seeing all steps simultaneously provides orientation value.
