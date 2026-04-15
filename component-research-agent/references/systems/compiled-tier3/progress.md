---
component: Progress
tier: 3
last_verified: 2026-03-29
---

# Progress — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Progress | Headless: `value={null}` for indeterminate; CSS custom property `--radix-progress-indicator-transform` for CSS-driven animation; `getValueLabel` for custom `aria-valuetext` strings. | high |
| Chakra UI | Progress / CircularProgress | Two separate components; `CircularProgressLabel` for centered text/icon inside circular ring; `hasStripe` + `isAnimated` for animated striped bars; both support indeterminate. | high |
| GOV.UK | Not available — task list pattern | No progress bar; user research found progress bars mislead users in multi-step government services (step counts change, estimates are wrong); task list pattern shows section states (complete/incomplete) instead. | high |
| Base Web | ProgressBar | `infinite` prop for indeterminate; `successValue` threshold triggers success styling automatically; standard Overrides pattern. | medium |
| Fluent 2 | ProgressBar | `validationState` (success/error/warning) for terminal operation states; `value` is 0–1 decimal (not 0–100); `thickness` (medium/large); Field component integration for label/description. | high |
| Gestalt | ProgressBar | Required `accessibilityLabel` prop; color variants for advertising status (on-target, at-risk, overspent); used for ad campaign budget pacing. | medium |
| Mantine | Progress / RingProgress | Multi-section Progress bar (`sections` array with independent colors) for composition display; RingProgress with center label slot; `animated` prop for smooth transitions. | high |
| Orbit | Loading Bar | Top-of-page thin loading bar for route transitions in booking flow; booking step progress handled by Steps component, not percentage bars. | medium |
| Evergreen | Not available — Spinner preferred | No standalone ProgressBar; Segment's loading states use Spinner; verify at evergreen.segment.com. | medium |
| Nord | Progress Bar (nord-progress-bar) | Web component for healthcare operation progress (data upload, analysis, import); clear completion state communication for clinical staff awaiting process completion. | low |

## Key Decision Patterns

The most structurally significant divide in T3 progress indicators is the multi-section bar, which only Mantine supports. A multi-section Progress bar renders multiple colored segments within a single bar, each representing a different category of the total (budget spent / reserved / available; tasks complete / in-progress / pending). This pattern is distinct from a standard progress bar and requires the component to accept an array of `{value, color}` objects rather than a single numeric value. The use case is common in analytics dashboards and resource management UIs but rare in general application contexts, which explains why only Mantine — targeting SaaS dashboards — implements it as a first-class feature.

Fluent 2's `validationState` for terminal progress states (success/error/warning) addresses a critical gap in most progress component designs: what happens when the operation finishes? The component can display a completion state (green checkmark, red error) without requiring the consuming application to switch to a completely different component. For Azure deployment progress — where the bar reaches 100% and then shows success or error — this is the correct design; teams do not need a ProgressBar-to-Alert swap in their code.

Radix's `getValueLabel` function and the `null` value for indeterminate are the most complete ARIA treatment in the T3 set. `getValueLabel` allows the accessible text announcement to say "Processing 3 of 10 files" instead of "30%" — a critical distinction when the numeric percentage is meaningless to the user but the underlying units (files, steps, MB) are meaningful. Most T3 systems only support a static `aria-label`; Radix's function-based approach generates context-appropriate announcements per value.

GOV.UK's research-backed absence is the strongest T3 argument against progress bars in multi-step forms. Their user research found that step counts change as conditional logic is applied (5 steps becomes 7 when a user selects a complex case), so estimated progress is systematically wrong; users feel more anxious when the bar moves slower than expected; and the bar implies a completion metric that the service cannot reliably provide. The task list pattern (showing which sections are complete/incomplete without a percentage) avoids these problems by removing the quantitative claim entirely.

## A11y Consensus

- `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` is the universal ARIA pattern for determinate progress indicators — all T3 systems that implement progress bars use this pattern.
- Indeterminate progress (unknown duration) must omit `aria-valuenow` from the element; screen readers infer indeterminate state from the absent value — `aria-valuetext="Loading"` or `aria-label` should provide context.
- `aria-valuetext` should provide a human-readable description when the numeric percentage alone is insufficient ("3 of 10 files processed" vs. "30%") — Radix's `getValueLabel` and Gestalt's `accessibilityLabel` are the only T3 systems that address this explicitly.
- Progress bars are non-interactive display elements; they should not receive keyboard focus unless they are part of an interactive pattern (which would be unusual).
- Long-running operations whose progress bar completes should announce completion to screen reader users — this requires either moving focus to a completion message or using an `aria-live="polite"` region, which no T3 system handles automatically.

## Recommended Use

Reference T3 progress approaches when deciding between linear and circular progress, multi-section/composition bars, and terminal state design. Mantine is the reference for multi-section Progress and RingProgress with center label; Fluent 2 is the reference for `validationState` terminal state handling; Radix is the reference for `getValueLabel` for context-aware accessible announcements and correct indeterminate ARIA; GOV.UK is the reference for the research-backed argument against progress bars in multi-step transactional flows.
