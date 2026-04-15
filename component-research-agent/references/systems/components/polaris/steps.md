---
system: Polaris (Shopify)
component: Not available natively
url: https://polaris.shopify.com/components
last_verified: 2026-03-28
---

# Steps / Stepper (Polaris)

## Approach
Polaris does not include a Steps or Stepper component. Unlike MD3's philosophical stance or Spectrum's prioritization gap, Polaris's absence stems from a product-design principle: Shopify's design team has consistently argued that multi-step wizard flows are a symptom of complex information architecture that should be simplified rather than scaffolded with a stepper component. Polaris's design guidance actively discourages long wizard-style flows in favor of progressive disclosure — revealing complexity as the user needs it rather than requiring them to navigate through a predetermined sequence of steps. Shopify's own admin uses this principle extensively: the product creation flow, for instance, allows merchants to fill in information in any order and save a draft at any time, rather than enforcing a step-by-step sequence. When step-by-step instruction is genuinely needed (onboarding tutorials, setup guides), Polaris uses the `CalloutCard` or a series of `Card` components with clear numbered headings, treating the steps as structured content rather than as a navigation component.

## Key Decisions
1. **Progressive disclosure over wizard flows** (HIGH) — Polaris's design principles document explicitly recommends against multi-step wizards for most Shopify use cases, instead recommending progressive disclosure patterns: show basic options first, reveal advanced options on demand. This principle has been derived from Shopify's merchant research, which found that wizard-style flows have higher abandonment rates among merchants who want to "try something quickly" and come back to configure details later.
2. **Numbered Card layouts as an informal steps pattern** (MEDIUM) — For setup guides and instructional content (which Shopify's home screen uses extensively for new merchant onboarding), Polaris patterns use a series of `Card` components with step numbers in the title text (e.g., "1. Add your products", "2. Customize your theme"). This treats progress as content rather than navigation, which works well for non-blocking optional steps but poorly for required sequential workflows.
3. **No recommended pattern for multi-step forms** (MEDIUM) — For the cases where a sequential multi-step form is genuinely necessary (which Polaris's guidance acknowledges as rare but valid), there is no Polaris-provided pattern or primitive guidance. Teams are left to implement from scratch, leading to inconsistency across Shopify's app ecosystem where multi-step forms appear in partner apps.

## Notable Props
- No dedicated component. Informal patterns use:
  - `Card` with numbered headings for instructional step content.
  - `ProgressBar` for linear completion percentage (does not support labeled steps).
  - Custom implementations using Polaris layout primitives for sequential forms.

## A11y Highlights
- **Keyboard**: No prescribed pattern. Custom sequential form implementations must manage focus movement between steps manually, which is the highest-risk accessibility concern in custom wizard implementations.
- **Screen reader**: The numbered Card pattern announces step headings as heading elements; there is no `aria-current="step"` or progress region unless teams implement it explicitly. Step completion state is not communicated.
- **ARIA**: No prescribed ARIA guidance for step-based flows. The most critical implementation requirement — announcing step changes to screen readers via `aria-live` or focus movement to new step content — is entirely the team's responsibility.

## Strengths & Gaps
- **Best at**: Aligning with Polaris's progressive disclosure philosophy — if the goal is to avoid wizard anti-patterns in commerce UI, Polaris's guidance is the clearest articulation of that position among Tier 1 systems.
- **Missing**: Any formal Steps component, progress indicator with labeled steps, navigation stepper for multi-step forms, and accessibility guidance for wizard-style flows. For the subset of Shopify use cases that genuinely require sequential forms (multi-page checkout customization, complex shipping rule setup), there is no Polaris-provided solution.
