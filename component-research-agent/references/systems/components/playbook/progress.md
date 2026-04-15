---
system: Playbook (Power Home Remodeling)
component: Progress
url: https://playbook.powerapp.cloud/kits/progress
last_verified: 2026-03-28
confidence: medium
---

# Progress

## Approach
Playbook's Progress component displays job completion status and workflow progress in their CRM — showing how far along a home improvement project is in the pipeline stages. Dual React/Rails support. Linear progress bar with value display.

## Key Decisions
1. **Job pipeline progress** (HIGH) — Primary use case is showing project/job stage completion.
2. **Value display** (MEDIUM) — Percentage or step count alongside bar.
3. **Dual React/Rails** (HIGH) — Cross-stack consistent implementation.

## Notable Props
- `value`: Progress percentage
- `label`: Label text
- `variant`: Style variant

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar"; value announced
- **ARIA**: aria-valuenow/min/max; aria-label

## Strengths & Gaps
- **Best at**: CRM pipeline/job progress display
- **Missing**: Medium confidence; some details uncertain
