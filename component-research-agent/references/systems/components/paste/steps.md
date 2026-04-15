---
system: Twilio Paste
component: ProgressSteps
url: https://paste.twilio.design/components/progress-steps
last_verified: 2026-03-28
confidence: high
---

# ProgressSteps (Steps)

## Approach
Twilio Paste's ProgressSteps component guides users through multi-step flows — onboarding wizards, multi-page form sequences, and configuration processes in the Twilio Console. The component shows current progress through a series of named steps with clear completed/current/upcoming states. It's often used alongside multi-step form patterns where each step represents a distinct page or configuration section.

## Key Decisions
1. **Named ProgressSteps component** (HIGH) — Explicit, dedicated step indicator component rather than a generic breadcrumb or tabs component, making the multi-step flow pattern a first-class UI pattern in Paste.
2. **Step state variants** (HIGH) — Steps have explicit complete, current, incomplete, and error states, supporting complex validation flows where earlier steps may need correction while the user is on a later step.
3. **Orientation support** (MEDIUM) — Horizontal (default) and vertical orientations, with vertical being useful for sidebar navigation in wizard flows.

## Notable Props
- `currentStep`: Index of the active step
- `orientation`: "horizontal" | "vertical"
- Children: `ProgressStepComplete`, `ProgressStepCurrent`, `ProgressStepIncomplete`, `ProgressStepError`

## A11y Highlights
- **Keyboard**: Steps may be interactive (navigating back to previous steps); Tab to focus; Enter to activate
- **Screen reader**: nav or ol element with aria-label; current step indicated via aria-current="step"
- **ARIA**: aria-current="step" on active step; step states communicated via text content and icons

## Strengths & Gaps
- **Best at**: Multi-step Twilio Console onboarding; error state on individual steps; clear step naming
- **Missing**: No animated step transitions; vertical orientation less prominent in documentation
