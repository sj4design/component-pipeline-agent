---
system: Spectrum (Adobe)
component: Not available natively
url: https://react-spectrum.adobe.com/react-spectrum/
last_verified: 2026-03-28
---

# Steps / Stepper (Spectrum)

## Approach
Spectrum does not include a Steps or Stepper component in its public component library. Adobe's reasoning differs from Google's: rather than a philosophical stance against stepper components, Spectrum's absence appears to be a prioritization decision — Adobe's products (Photoshop, Illustrator, Experience Manager, Analytics) rely heavily on panel-based and dialog-based workflows rather than page-level wizard flows. When multi-step flows do appear in Adobe's products (account setup, Creative Cloud subscription changes, onboarding tours), they are product-specific implementations that have not been generalized into the shared Spectrum library. The Spectrum team has been building out complex form patterns and the React Aria package includes the accessibility primitives needed to build a stepper (focus management between steps, ARIA step indicators), but no assembled Stepper component currently exists in react-spectrum. Spectrum's React Aria package, which provides accessible behavior hooks independent of visual styling, does not include a `useStepList` or equivalent hook — meaning even the behavior foundation for a stepper must be built from scratch by teams using the system.

## Key Decisions
1. **Product-specific flows over shared component** (HIGH) — Adobe's product diversity means a single Stepper component would need to handle drastically different step contents (form fields in Creative Cloud setup vs. asset configuration in Experience Manager vs. payment flow in Adobe Commerce), different step counts, and different navigation patterns. The Spectrum team appears to have decided that the variability is too high to produce a useful shared component and that product teams are better served by the general-purpose building blocks already in the system.
2. **React Aria as the path for custom implementations** (MEDIUM) — Teams building steppers on top of Spectrum are directed toward React Aria's focus management utilities (`useFocusRing`, `useKeyboard`) and the `@react-stately` package for managing multi-step state. This provides the correct behavioral foundation without prescribing visual layout, which aligns with Spectrum's overall architecture of separating behavior from presentation.
3. **No visual progress indicator for steps** (MEDIUM) — Spectrum includes a `ProgressBar` component for loading states, but it is not documented as a stepper progress indicator and does not support labeled step states. Teams needing a visual "Step 1 of 4" progress indicator must build custom UI.

## Notable Props
- No component. Custom implementations using Spectrum primitives:
  - `ProgressBar` for numeric progress display.
  - `Stepper` (number input) exists but is for numeric value input, NOT for wizard step navigation — a naming collision that creates confusion.
  - `Button` with `onPress` for step navigation actions.
  - React Aria `useFocusManagement` for focus handling between steps.

## A11y Highlights
- **Keyboard**: No prescribed pattern. Custom implementations must handle focus movement between step panels, ensuring focus moves to the new step content on step change (not left behind on the navigation trigger).
- **Screen reader**: Recommended custom pattern is a `<nav>` element with `aria-label="Progress"` containing a list of step items; the current step uses `aria-current="step"`. Step completion is communicated via `aria-label` updates on step indicators.
- **ARIA**: React Aria's documentation suggests `role="list"` for the step indicator list and `aria-current="step"` for the active step. No Spectrum-specific ARIA guidance exists for step-based wizards.

## Strengths & Gaps
- **Best at**: Nothing for this specific pattern — Spectrum's React Aria hooks provide the right accessibility primitives, but the assembled component does not exist.
- **Missing**: An assembled Stepper component with step indicators, step states (pending / current / completed / error), navigation between steps, and the associated React Aria hooks that provide correct focus management and ARIA patterns. This is noted as a gap in several Adobe product team discussions on Spectrum's GitHub.
