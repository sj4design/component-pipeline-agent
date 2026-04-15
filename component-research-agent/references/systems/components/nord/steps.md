---
system: Nord Design System (Nordhealth)
component: Steps
url: https://nordhealth.design/components/steps/
last_verified: 2026-03-29
confidence: high
---

# Steps

## Approach
Nord's `<nord-steps>` Web Component (Steps / Stepper) provides a visual progress indicator for multi-step clinical workflows — one of the most prevalent structural patterns in healthcare software. Clinical processes are inherently sequential and rule-bound: patient registration requires demographics before insurance before consent; prescription workflows require patient selection before medication before dosing before pharmacy; clinical assessments have mandated question sequences for validated scoring instruments (PHQ-9, MMSE, GAD-7). Nord's steps component communicates where a clinician is in a multi-step process, what has been completed, and what remains — providing orientation in complex workflows where losing track of process state could result in incomplete clinical documentation or missed mandatory fields. The component uses `<nord-step>` child elements to compose the step trail, supporting completed, active, and upcoming states with appropriate visual differentiation.

## Key Decisions
1. **Completed / active / upcoming state model** (HIGH) — Clinical workflows have strict state semantics: a completed step is verified and submitted, the active step is in progress, upcoming steps are locked or pending. Nord's three-state model maps directly to these clinical workflow states, preventing UI patterns that suggest non-linear navigation is possible when it is not (e.g., jumping to a later step before completing required clinical documentation).
2. **Non-navigable steps as a configurable option** (HIGH) — Some clinical workflows are strictly linear (you cannot return to Step 1 once Step 2 is complete, because Step 1 data is locked for audit purposes). Nord supports non-interactive steps that display progress without enabling backward navigation, supporting regulatory workflows where clinical data must be finalized before proceeding.
3. **Numbered vs. icon-based step indicators** (MEDIUM) — Clinical process orientation benefits from numbered steps ("You are on step 3 of 6") over icon-only indicators — numbers communicate position in the sequence unambiguously to clinicians who may be interrupted mid-workflow (a common occurrence in clinical environments). Nord provides numbered indicators as the default.
4. **Horizontal and vertical layout support** (MEDIUM) — Complex clinical assessment workflows with many steps render better in vertical layout on clinical tablets and narrow workstation views. The steps component supports both orientations, allowing product teams to choose the layout appropriate for the clinical context and screen real estate.

## Notable Props
- `<nord-steps>`: Container component; wraps individual `<nord-step>` elements
- `<nord-step>`: Individual step; props include:
  - `label`: The step name (e.g., "Patient Demographics", "Medication Selection", "Prescriber Confirmation")
  - `state`: Step state — `"complete"` | `"active"` | `"upcoming"` (or similar variant names per Nord's implementation)
  - `href`: Optional navigation link for steps that support backward navigation in the workflow
- `vertical`: Boolean attribute on `<nord-steps>` for vertical layout orientation

## A11y Highlights
- **Keyboard**: Interactive steps (those with `href` or click handlers for back-navigation) are keyboard accessible; Tab navigates between interactive steps; Enter activates; non-interactive step indicators are not focusable
- **Screen reader**: Each step's state (complete, current, upcoming) is communicated via accessible text or ARIA attributes; the current step receives `aria-current="step"` so screen reader users know their position in the clinical workflow; completed steps are announced as completed
- **ARIA**: `aria-current="step"` on the active step; `role="list"` on the steps container with `role="listitem"` on each step for proper list semantics; step state conveyed via visually hidden text for screen readers (e.g., "Step 1 of 6: Patient Demographics — completed")

## Strengths & Gaps
- **Best at**: Orienting clinicians in complex multi-step clinical workflows (registration, prescription, assessment); strong state communication for sequential and non-linear workflows; proper accessibility for screen reader users navigating complex EHR process flows; both horizontal and vertical layout flexibility
- **Missing**: No built-in error state on individual steps (e.g., a step with validation errors that must be fixed before proceeding — common in clinical documentation with mandatory fields); no optional/skippable step variant for workflows where some steps depend on clinical condition (e.g., the allergy section is skippable if no known allergies); no step progress percentage indicator for long workflows
