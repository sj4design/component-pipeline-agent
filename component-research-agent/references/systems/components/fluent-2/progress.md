---
system: Fluent 2 (Microsoft)
component: ProgressBar
url: https://fluent2.microsoft.design/components/web/react/progressbar/usage
last_verified: 2026-03-28
confidence: high
---

# ProgressBar

## Approach
Fluent 2's ProgressBar covers file upload progress in Teams, operation status in Azure Portal, and workflow completion in Office. It uses Fluent's accent color for the fill and supports error and success states via `validationState`. The ProgressBar integrates with Fluent's Field component for optional label and description.

## Key Decisions
1. **validationState for terminal states** (HIGH) — `validationState: "success" | "error" | "warning"` shows the terminal state of a completed or failed operation. Azure deployment progress can end in success (green) or error (red) without requiring separate indicator components.
2. **thickness** (MEDIUM) — Controls the progress bar height. Azure uses thinner bars; Teams uses thicker, more prominent bars.
3. **Field integration** (MEDIUM) — Field provides label (describing what's progressing) and description (supplementary info), keeping the label/description pattern consistent with all Fluent form components.

## Notable Props
- `value`: 0-1 (percentage as decimal, not 0-100)
- `validationState`: `"success" | "error" | "warning" | "none"`
- `thickness`: `"medium" | "large"`
- Field: `label`, `hint`, `validationMessage`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar"; aria-valuenow, aria-valuemin, aria-valuemax
- **ARIA**: validationState changes aria-label to communicate completion state

## Strengths & Gaps
- **Best at**: validationState for Azure deployment outcomes; 0-1 decimal API (more precise than 0-100); Field integration
- **Missing**: No circular progress; value API (0-1 vs 0-100) is non-standard
