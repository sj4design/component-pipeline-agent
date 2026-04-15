---
system: Nord (Nordhealth)
component: Progress Bar (nord-progress-bar web component)
url: https://nordhealth.design/components/progress-bar/
last_verified: 2026-03-28
confidence: low
---

# Progress Bar

## Approach
Nord provides a Progress Bar web component for indicating operation completion in healthcare applications — data upload progress, long-running analysis, import operations. Healthcare progress bars must clearly communicate completion state for processes where clinical staff need to know when they can proceed.

## Key Decisions
1. **Web component standard** (HIGH) — Portability requirement.
2. **Clear completion state** (HIGH) — Healthcare staff need to know definitively when a process is complete; ambiguous progress communication is problematic.

## Notable Props
- `value`: progress percentage
- Indeterminate mode
- Verify at nordhealth.design

## A11y Highlights
- role="progressbar"; aria-valuenow, aria-valuemin, aria-valuemax

## Strengths & Gaps
- **Best at**: Healthcare operation progress; web component portability
- **Missing**: Verify exact API
