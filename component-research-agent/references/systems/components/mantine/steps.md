---
system: Mantine
component: Stepper
url: https://mantine.dev/core/stepper/
last_verified: 2026-03-29
confidence: high
---

# Steps (Stepper)

## Approach
Mantine provides a Stepper component — a multi-step progress indicator that renders steps with icons/numbers, connecting lines, labels, descriptions, and inline step content. The compound architecture uses `Stepper` (root), `Stepper.Step` (individual step), and `Stepper.Completed` (final completion state content). Each step's content (form fields, instructions) is passed as children to `Stepper.Step`, meaning all step content is co-located with the step definition. This makes the Stepper a true wizard container in Mantine, not just a navigation indicator. The component is frequently used in Mantine's documentation examples for multi-step form flows and onboarding sequences.

## Key Decisions
1. **Content inside steps** (HIGH) — Unlike display-only steppers (Material Design 3), Mantine's Stepper renders each step's content inline. `Stepper.active` controls which step's content is visible. This tightly couples navigation and content within a single component, which is convenient for simple wizards but can become complex for multi-step forms with independent validation.
2. **Icon customization per step** (HIGH) — Each `Stepper.Step` can have a custom `icon` prop. When not in a completed/loading state, the default is the step number. When completed, a checkmark icon appears. When loading, a Loader component appears. Teams can override with any icon for non-sequential workflows or status-based steppers.
3. **`allowNextStepsSelect`** (MEDIUM) — By default, users can click on any previously completed step to navigate back. Setting `allowNextStepsSelect={false}` prevents clicking ahead (only completed steps are clickable). This is important for sequential validation flows where later steps may depend on earlier ones.
4. **`Stepper.Completed`** (MEDIUM) — A special final step slot rendered when `active` exceeds the last step index. This enables a clear "all done" state distinct from the last step content, typically showing a success message and CTA to continue.

## Notable Props
- `active`: current active step index (controlled)
- `onStepClick`: callback when a step is clicked for back navigation
- `color`: Mantine color token for completed/active states
- `orientation`: `"horizontal"` | `"vertical"`
- `iconSize`: size of the step indicator icons
- `allowNextStepsSelect`: allow clicking future steps (default false)
- Per-step: `label`, `description`, `icon`, `loading`, `completedIcon`, `color`

## A11y Highlights
- **Keyboard**: Clickable steps (for back navigation) are focusable buttons; Tab navigates between them; step content is in normal document flow below the step indicators
- **Screen reader**: Each step button announces step number/label and state (completed, active, upcoming); `aria-current="step"` on active step indicator
- **ARIA**: Active step indicator: `aria-current="step"`; completed steps: accessible state via visually-hidden "completed" text; step buttons: `aria-label` with step title and state

## Strengths & Gaps
- **Best at**: All-in-one wizard container with inline step content; custom icons per step; loading state per step; Stepper.Completed final state
- **Missing**: No automatic validation before advancing (teams wire this manually in `onStepClick`); horizontal mode can be cramped with many steps and long labels; no skip step functionality
