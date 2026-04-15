---
component: Slider
tier: 2
last_verified: 2026-03-28
---

# Slider — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Slider (not present) | Not present; use NumberInput for range input | high |
| Salesforce Lightning | Slider | input[type=range] with Lightning styling; min/max/step; size variants | high |
| GitHub Primer | Slider (not present) | Not present; native input[type=range] without dedicated component | high |
| shadcn/ui | Slider | Radix UI Slider; range slider; step; custom thumb; keyboard navigation | high |
| Playbook | Slider | Range controls; dual React/Rails | medium |
| REI Cedar | Slider (not present) | Not present; use Input for numeric ranges | medium |
| Wise Design | Slider (not present) | Not present; transfer amounts use NumberInput | low |
| Dell Design System | Slider | Enterprise configuration range controls | low |

## Key Decision Patterns

**Native vs. custom:** Lightning uses native input[type=range] with Lightning CSS styling — simpler, keyboard support automatic, but cross-browser visual inconsistency. shadcn/ui (Radix) provides a fully custom slider with consistent cross-browser appearance and multi-thumb range support.

**Range slider (dual thumbs):** Radix/shadcn Slider supports multiple thumbs (e.g., price range min/max). Native input[type=range] is single-value only. This is a major differentiator.

**Step granularity:** All implementations support `step` prop for discrete vs. continuous value selection. Important for price filters (step=10), settings (step=1), or percentage values (step=5).

**Current value display:** Most implementations require developers to add a value display (tooltip on thumb or separate readout). Radix Slider doesn't include a built-in value tooltip; Lightning includes a value display.

## A11y Consensus
- role="slider" (input[type=range] provides this automatically)
- aria-valuemin, aria-valuemax, aria-valuenow, aria-valuetext (when value needs human-readable description, e.g., "$50" not "50")
- Keyboard: Left/Right arrow keys adjust by step; Home/End for min/max; Page Up/Down for larger increments
- Multi-thumb: each thumb is an independent focusable slider with its own aria-valuemin/max constraints

## Recommended Use
Use Radix/shadcn Slider for custom-styled sliders and range (dual-thumb) selection. Use Lightning native Slider for Salesforce pages. Avoid sliders for precise numeric input — pair with a NumberInput text field for exact value entry alongside the slider.
