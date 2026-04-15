---
component: Steps
tier: 3
last_verified: 2026-03-29
---

# Steps — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — scope boundary | No primitive; stepper has no dedicated WAI-ARIA role; composition from Flex/Text/Badge expected; accessibility pattern is `role="list"` + `aria-current="step"`. | high |
| Chakra UI | Steps (v3 only) | Added in v3: horizontal/vertical; numbered indicators or custom icons; display-only (no inline content panels); `aria-current="step"` on active step; no built-in nav controls. | medium |
| GOV.UK | Step by step navigation | Cross-page journey navigation pattern, not an inline wizard; accordion-style expandable steps; `<ol>` for implicit numbering; `aria-expanded` on step triggers; "Part of" indicator on individual pages. | high |
| Base Web | ProgressSteps | Vertical-only wizard container with inline content (`content` prop); `NumberedStep` vs. `Step` variants; full Overrides customization; no built-in nav controls or horizontal orientation. | high |
| Fluent 2 | Not available — Dialog-based wizard | No component; multi-step flows use Dialog with step-specific content swap; "Step 2 of 4" text in header; research-backed: persistent step indicators increase abandonment in Microsoft's user base. | high |
| Gestalt | Not available — modal-per-step | No component; mobile-first modal/Sheet sequences per step; "Step X of Y" text in modal header; branching logic in complex flows makes a generic stepper a poor fit. | high |
| Mantine | Stepper | Most complete T3 implementation: inline step content via `Stepper.Step` children; `Stepper.Completed` final state; loading icon per step; `allowNextStepsSelect` for back-navigation gating; horizontal and vertical. | high |
| Orbit | Wizard / WizardStep | Named after the domain (travel booking funnel); enforces linear progression; mobile collapses to "Step 3 of 6" text; `<nav aria-label="Booking progress">` wrapper; `aria-current="step"` + `aria-disabled` on pending steps. | high |
| Evergreen | Not available — short/non-linear flows | No component; 2-4 step conditional flows use Dialog/SideSheet sequences; generic stepper API would require too much configuration to handle Segment's conditional step logic. | high |
| Nord | Steps (nord-steps) | Clinical sequential workflows (registration, prescription, assessment); non-navigable locked steps for regulatory audit compliance; numbered indicators default; horizontal and vertical; `aria-current="step"`. | high |

## Key Decision Patterns

The most fundamental divide in T3 steps components is wizard-container versus navigation-indicator-only. Mantine and Base Web's ProgressSteps are wizard containers — step content is rendered as children of each step, making the component the orchestrator of a multi-step form flow. Chakra's Steps (v3), Orbit's Wizard, and Nord's Steps are navigation indicators — they show where the user is in a sequence but render no step content themselves. The container approach co-locates step metadata with step content for simpler setup; the indicator-only approach separates concerns, letting teams render step content independently while the stepper tracks progress. The separation is cleaner architecturally but requires more consumer code to wire the current step index to conditionally rendered content.

GOV.UK's step-by-step navigation is the only T3 system where "steps" are an inter-page journey pattern rather than an intra-page wizard. The component links users through a sequence of separate pages, government services, and external websites — a scale of multi-step process that a single-page wizard component cannot support. The `<ol>` ordered list with expandable steps mirrors GOV.UK's Accordion for progressive disclosure of sub-tasks within each step. This architecture reflects a government-specific constraint: applying for a driving licence involves steps handled by the DVLA, the medical register, the Highways Agency, and payment processors — no single-page component can span these. The GOV.UK pattern is the reference for multi-organizational, multi-URL journey orchestration.

Orbit's naming choice ("Wizard") rather than "Steps" or "Stepper" is the clearest example of domain-driven component naming in the T3 set. Every instance of Orbit's Wizard component in production maps to one specific journey: the flight booking funnel. Its linear enforcement (no step skipping), mobile compact mode (collapsing to "Step 3 of 6"), and `<nav aria-label="Booking progress">` wrapper all reflect that specific context. Nord's Steps faces similar domain pressure in the other direction — clinical workflows with regulatory audit requirements demand non-navigable locked steps that are literally impossible to revisit once submitted. Both Orbit and Nord encode domain constraints into the component API rather than leaving them to application logic.

Fluent 2 and Gestalt's research-backed absences challenge the assumption that a Steps component is universally beneficial. Fluent 2 documents that showing the full step sequence simultaneously increased abandonment in Microsoft's broad user base — a counter-intuitive finding that argues for one-step-at-a-time dialog-based flows over persistent step indicators. Gestalt's mobile-first argument is practical: horizontal step indicators with labels compress into unusability on narrow screens, and modal-per-step creates a cleaner mobile interaction model. Both systems converge on a similar implementation (dialog/modal sequences with step count text) from different starting points.

## A11y Consensus

- The step list container should use `<nav>` with a descriptive `aria-label` (e.g., "Checkout progress," "Booking steps") or `role="list"` with an `aria-label` — this landmark helps screen reader users understand the purpose of the step indicator region.
- The active step must have `aria-current="step"` — this is the ARIA attribute that tells screen readers the user's current position in the sequence; it is distinct from `aria-selected` (tabs) and `aria-pressed` (toggle buttons).
- Completed and upcoming steps must communicate their state via accessible text — not just visual color or icon changes. "Step 1 of 4: Account details — completed" provides orientation that a colored checkmark alone cannot.
- Non-interactive steps (pending or locked) should have `aria-disabled="true"` rather than just being styled as inactive — this prevents screen reader users from attempting to interact with steps that cannot be navigated to.
- Step content transitions (moving from step 2 to step 3) should announce the new step context to screen readers via `aria-live="polite"` or by moving focus to the new step's heading — without this, the visual transition is invisible to assistive technology users.

## Recommended Use

Reference T3 steps approaches when deciding on wizard-container versus indicator-only architecture, linear enforcement, and cross-page journey patterns. Mantine's Stepper is the reference for a full wizard container with inline step content, custom icons, and `Stepper.Completed` final state; Orbit's Wizard is the reference for strict linear enforcement with mobile compact mode and domain-appropriate naming; GOV.UK's step-by-step is the reference for multi-page, multi-organization journey navigation; Nord is the reference for non-navigable locked steps in regulatory audit workflows; Fluent 2 and Gestalt are references for the research-backed arguments against persistent step indicators in favor of sequential dialog/modal patterns.
