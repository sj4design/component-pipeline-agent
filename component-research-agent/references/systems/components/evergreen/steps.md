---
system: Evergreen (Segment/Twilio)
component: Not available natively
url: https://evergreen.segment.com/components/
last_verified: 2026-03-29
confidence: high
---

# Steps

## Approach
Evergreen does not include a Steps or Stepper component. Segment's onboarding and setup flows — connecting a source, configuring a destination, creating a computed trait — use custom sequences of Dialog or SideSheet overlays rather than a persistent step indicator. This decision stems from the nature of Segment's setup flows: they are relatively short (2-4 steps), their steps are not always linear (some are optional or context-dependent), and they appear within SideSheets that already have limited vertical space for a step indicator. A reusable Steps component has not been prioritized because each flow's custom step logic (conditional branching, async validation per step, different panel widths) would make a generic stepper API difficult to satisfy without building an overly complex component.

## Key Decisions
1. **Dialog/SideSheet sequences over persistent stepper** (HIGH) — Segment's setup flows use a series of overlays where each "step" is effectively a new SideSheet or Dialog, making a persistent step indicator component architecturally awkward to integrate.
2. **Short and non-linear flows** (HIGH) — With 2-4 steps and frequent conditional logic (e.g., "skip schema step for this source type"), the value of a generic Steps component that handles all cases without bespoke configuration is low.
3. **No repeated production use case** (MEDIUM) — Evergreen's component set tracks production usage at Segment; the absence of a confirmed repeated pattern for a step indicator means the component has not been built.

## Notable Props
- N/A — component not present in Evergreen.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: A Steps/Stepper component. Teams needing a visual step indicator should compose one from Evergreen's `Text`, `Badge`, and layout primitives, or use a standalone stepper library styled with Evergreen tokens.
