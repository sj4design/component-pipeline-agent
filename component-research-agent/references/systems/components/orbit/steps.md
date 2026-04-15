---
system: Orbit (Kiwi.com)
component: Wizard / WizardStep
url: https://orbit.kiwi/components/navigation/wizard/
last_verified: 2026-03-29
confidence: high
---

# Steps

> **Name mapping**: Orbit calls this component `Wizard` (with child `WizardStep`). It serves the same purpose as a Steps or Stepper component in other systems.

## Approach
Orbit's Wizard component is one of the most strategically important components in the entire system because it directly maps to Kiwi.com's core product flow: Search → Seats → Bags → Extras → Payment → Confirmation. The Wizard provides the persistent progress indicator at the top of the booking funnel, showing users how many steps remain and which step they are on — information that is critical for managing user anxiety during a multi-step, potentially irreversible financial transaction. The component enforces a linear step model (you cannot skip steps) with optional step labeling and handles the visual state transitions (pending, active, completed) that communicate funnel progress. It is one of the few Orbit components where the domain context (travel booking wizard) is explicitly reflected in its name.

## Key Decisions
1. **Named after the domain metaphor** (HIGH) — Calling it "Wizard" (not "Steps" or "Stepper") reflects that in Kiwi.com's booking context, the component always represents a guided, linear, completion-oriented wizard flow, not generic stepwise navigation.
2. **Active/completed/pending states** (HIGH) — Each step is visually distinct in all three states, helping users understand both how far they've come and how much remains — a key trust signal in a payment flow.
3. **Mobile-compact rendering** (HIGH) — On small screens the Wizard collapses to show only the current step label and a progress indicator (e.g., "Step 3 of 6"), conserving vertical space in the header without losing progress context.

## Notable Props
- `activeStep`: index of the currently active step
- `completedSteps`: array of completed step indices
- `children`: `WizardStep` components
- **WizardStep props**:
  - `title`: step label
  - `href`: optional link for back-navigation to a completed step

## A11y Highlights
- **Keyboard**: Completed step links are keyboard-navigable; current and pending steps are not interactive (preventing users from jumping ahead).
- **Screen reader**: Wizard is wrapped in `<nav aria-label="Booking progress">`; current step has `aria-current="step"`; completed steps are visually and programmatically distinguishable.
- **ARIA**: Uses `aria-current`, `aria-disabled` for pending steps, and an ordered list structure to convey sequence.

## Strengths & Gaps
- **Best at**: Linear booking funnel progress with explicit travel-domain naming and strong mobile compact mode; excellent state management for completed/active/pending.
- **Missing**: No non-linear step navigation (branching paths); no step content panels (Wizard is navigation-only, not a content container); no vertical orientation.
