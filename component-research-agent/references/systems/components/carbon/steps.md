---
system: Carbon (IBM)
component: Progress Indicator
url: https://carbondesignsystem.com/components/progress-indicator/usage/
last_verified: 2026-03-28
---

# Steps / Stepper (Carbon / Progress Indicator)

## Approach
Carbon's equivalent of a Steps or Stepper component is called the Progress Indicator, a naming choice that emphasizes its primary function: communicating where the user is in a multi-step process. The name also implies something about the scope: unlike Ant Design's "Steps" (which includes navigation, inline, and vertical layout modes), Carbon's Progress Indicator is focused on the progress-communication aspect rather than the navigation-scaffolding aspect. IBM uses this component extensively in IBM Cloud's complex provisioning workflows (creating a Kubernetes cluster, setting up a data warehouse, configuring security policies) where multi-step processes can have 4-7 steps, each with significant configuration. Carbon's Progress Indicator provides four step states — complete, current, incomplete, and invalid/error — where the "invalid" state is notably absent from most other systems. The error state exists because IBM's enterprise provisioning flows frequently encounter validation errors in earlier steps that block progression, and users need to see at a glance which steps have problems. The component supports both horizontal (default, for page-level progress headers) and vertical orientations (for sidebar step navigation in complex forms).

## Key Decisions
1. **"Invalid" step state for error conditions** (HIGH) — Carbon is the only Tier 1 system that provides a built-in error/invalid state for individual steps in a progress indicator. This state displays an error icon in place of the step number and applies the `$support-error` color token to signal that a completed step now has a validation problem. IBM's cloud provisioning flows require this because backend validation of earlier steps (e.g., network configuration) may fail after the user has proceeded to later steps, requiring them to return and correct the earlier step.
2. **Horizontal and vertical orientation** (MEDIUM) — The `vertical` prop switches the Progress Indicator from a horizontal header-style layout to a vertical sidebar layout. Horizontal works for page-level progress headers (5 or fewer steps); vertical works for left-sidebar navigation in complex multi-panel forms. IBM's long provisioning wizards (7+ steps) use vertical orientation because the step labels become too compressed in horizontal layout beyond 5 steps.
3. **Clickable steps for non-linear navigation** (MEDIUM) — By default, Progress Indicator steps are visual-only (not interactive). The `onChange` prop enables step clicking, turning the indicator into a navigation component that allows users to jump to any previously visited or completed step. Carbon's documentation carefully distinguishes between "progress" use cases (linear, no clicking back) and "wizard navigation" use cases (non-linear, step clicking enabled), providing guidance on when each is appropriate. The default non-interactive state reflects IBM's opinion that users should complete steps in order before jumping around.

## Notable Props
- `currentIndex`: Number controlling the active step — controlled pattern; Progress Indicator does not manage its own state.
- `onChange`: Callback that enables step clicking for non-linear navigation.
- `vertical`: Boolean switching to vertical orientation.
- `spaceEqually`: Boolean that distributes horizontal step widths equally — useful when step labels vary significantly in length.

## A11y Highlights
- **Keyboard**: In non-interactive mode, the progress indicator is non-focusable (it is presentation-only). In interactive mode (with `onChange`), each step is a focusable button; Tab moves between steps, Enter activates.
- **Screen reader**: Steps are announced with their label and state: "Step 1 [label], complete", "Step 2 [label], current", "Step 3 [label], incomplete". The invalid state is announced as "[label], invalid". This per-step state announcement is the most detailed of any Tier 1 system.
- **ARIA**: Steps use `aria-current="step"` for the current step and custom `aria-label` values that include the state in the accessible name. The component wraps in an `<ol>` (ordered list) to communicate the sequential nature of steps.

## Strengths & Gaps
- **Best at**: Error state handling — the invalid step state and detailed per-step screen reader announcements make Carbon's Progress Indicator the best choice for enterprise workflows where individual steps can fail independently.
- **Missing**: No description text per step (Ant Design supports multi-line step descriptions), no inline/compact orientation mode, and no built-in step content panel management — the Progress Indicator is purely a navigation/progress indicator, not a scaffold for the step content itself.
