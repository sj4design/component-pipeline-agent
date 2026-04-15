---
system: Dell Design System
component: Progress Bar
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Progress Bar

## Approach
Dell Design System's Progress Bar is used for firmware update progress, download status, and configuration deployment progress in enterprise management interfaces. Enterprise IT operations often involve long-running processes where accurate progress feedback is critical.

## Key Decisions
1. **Firmware/update progress** (MEDIUM) — Primary use for long-running enterprise IT operations.
2. **Determinate and indeterminate** (MEDIUM) — Both modes needed — firmware updates have known progress; some operations are indeterminate.
3. **Error state** (MEDIUM) — Progress bar may show error state when an update fails.

## Notable Props
- `value`: Progress percentage
- `label`: Operation description

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Progress value and label announced
- **ARIA**: role="progressbar"; aria-valuenow/min/max

## Strengths & Gaps
- **Best at**: Enterprise operation progress display
- **Missing**: Low confidence — verify before use
