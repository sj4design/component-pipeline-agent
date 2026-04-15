---
component: Steps
tier: 2
last_verified: 2026-03-28
---

# Steps — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | ProgressSteps | Named ProgressSteps; complete/current/incomplete/error states; horizontal/vertical | high |
| Salesforce Lightning | Progress Indicator | Base + path variants; path for CRM pipeline stages; error/warning per step | high |
| GitHub Primer | Steps (not present) | Not present; multi-step flows use separate pages | high |
| shadcn/ui | Steps (not present) | Not present; community stepper components available | medium |
| Playbook | Stepper | Multi-step sales/service workflow guidance; dual React/Rails | medium |
| REI Cedar | Steps (not present) | Not present in public docs | medium |
| Wise Design | Stepper | Multi-step financial onboarding flows | low |
| Dell Design System | Steps / Stepper | Enterprise IT setup wizard flows | low |

## Key Decision Patterns

**Lightning's Path variant:** Lightning's "path" variant (chevron/arrow chain) is uniquely designed for Salesforce's CRM pipeline stage concept — not a generic wizard step indicator but a stage progression tracker for opportunities, cases, and leads. Most distinctive steps component in the T2 set.

**Error state per step:** Paste and Lightning support individual step error states — critical for multi-step forms where validation errors on a previous step are discovered after progression. Users need to navigate back to the errored step.

**Rare component:** Steps/Stepper is one of the less commonly standardized components. Primer (GitHub) explicitly avoids wizard patterns. shadcn/ui lacks it. Only Paste, Lightning, and Playbook have dedicated step components.

**aria-current="step":** The current active step should have aria-current="step" for screen reader identification. Completed steps should communicate their state via text or visually-hidden labels.

## A11y Consensus
- Step list: `<ol>` (ordered, hierarchy matters); or `<nav aria-label="Progress">` with ordered list
- Current step: aria-current="step"
- Completed steps: aria-label including "completed" or via visually-hidden text
- Interactive steps (navigating back): button or link with appropriate state
- Error step: communicate error state in label, not just visually

## Recommended Use
Use Paste ProgressSteps for Twilio Console wizard flows with error state support. Use Lightning Progress Indicator (path) for CRM stage progression. Build custom with `<ol>` + aria-current="step" for other contexts. Avoid wizard patterns for short (2-3 step) flows — consider full-page sequences instead.
