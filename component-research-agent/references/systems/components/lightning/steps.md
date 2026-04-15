---
system: Salesforce Lightning Design System
component: Progress Indicator
url: https://lightningdesignsystem.com/components/progress-indicator/
last_verified: 2026-03-28
confidence: high
---

# Progress Indicator (Steps)

## Approach
Salesforce Lightning's Progress Indicator is used throughout CRM setup wizards, guided selling flows, and multi-step configuration processes. Lightning provides both a linear step indicator (horizontal dots/numbers) and a "path" variant that is commonly used for Salesforce Opportunity stages, Lead conversion paths, and Case resolution workflows — making it uniquely tied to Salesforce's CRM pipeline concepts.

## Key Decisions
1. **Path variant for pipeline stages** (HIGH) — The "path" variant uses a chevron/arrow visual that aligns with Salesforce's sales pipeline stage concept, distinct from a generic step wizard, making it suitable for CRM record status progression.
2. **Step error and warning states** (HIGH) — Individual steps support error and warning states, important for complex setup flows where specific steps may have validation issues that users need to return to.
3. **Vertical variant** (MEDIUM) — Vertical progress indicator variant for sidebar-based wizard navigation in Lightning pages.

## Notable Props
- `currentStep`: Active step value
- `hasError`: Error state on a step
- `completedSteps`: Array of completed step values
- `disabledSteps`: Array of disabled step values
- `variant`: "base" | "path"

## A11y Highlights
- **Keyboard**: Interactive steps focusable via Tab; Enter/Space to activate
- **Screen reader**: ol with listitem roles; current step via aria-current="step"; completion status via aria-label
- **ARIA**: aria-current="step"; aria-disabled on disabled steps; completion communicated via assistive text

## Strengths & Gaps
- **Best at**: CRM pipeline stage progression (path variant); step-level error/warning states; Salesforce guided selling flows
- **Missing**: Less suitable for generic non-CRM wizard contexts; path variant visually opinionated
