---
system: Carbon (IBM)
component: Progress Bar
url: https://carbondesignsystem.com/components/progress-bar/usage/
last_verified: 2026-03-28
---

# Progress Bar

## Approach
Carbon's Progress Bar is a single-task, linear completion indicator designed for IBM's enterprise and data-heavy product context. It communicates ongoing process status — file uploads, data processing, system scans — with clarity and minimal decoration. Carbon's philosophy here is deterministic feedback: give users the most accurate information available about where a process stands. This is reflected in the component's strong support for helper text that displays numeric values (percentages, fractions, ratios) alongside the visual bar, rather than relying on the visual fill alone. The component is deliberately not decorative — it follows IBM's data-forward design ethos where showing the number is almost always better than hiding it.

It is critical to note what Carbon's Progress Bar is **not**: it is not the same as Carbon's **Progress Indicator**, which is an entirely separate component for multi-step wizard flows (think onboarding wizards, checkout flows, form sequences). The Progress Indicator shows discrete labeled steps with completed/current/upcoming states. The Progress Bar is for continuous single-operation progress. Despite sharing a category name, they solve completely different problems. This distinction matters for designers choosing between them — if you have a multi-step form, you want Progress Indicator; if you have a file upload, you want Progress Bar.

## Key Decisions
1. **Two sizes: big (8px) and small (4px)** (MEDIUM) — Carbon provides exactly two height options rather than a continuous scale or many named sizes. Big (8px) is the default for most contexts; small (4px) is available when the UI is information-dense and visual weight needs to be reduced. The WHY: IBM's enterprise products often place progress bars within data tables, dashboards, or sidebars where a full-height bar would visually dominate. The small variant ensures the component can integrate into tight layouts without redesign.

2. **Explicit success and error states with color + icon** (HIGH) — When a process completes successfully, the bar fills to 100%, turns green, and displays a checkmark icon. When a process fails, the bar jumps to full width, turns red, and displays an error icon. The WHY: Carbon's enterprise context means progress bars often represent critical system operations (deployments, data migrations, backups). Users need unambiguous state feedback — relying solely on color is insufficient (color blindness), so the icon reinforces the state. The "fill to full width on error" decision is intentional: it visually closes the bar rather than leaving it at a partial fill, which could be misread as still-in-progress.

3. **Helper text as the primary numeric label** (HIGH) — Carbon treats the helper text slot (below the bar) as the canonical location for percentage and status text, rather than overlaying text on the bar or placing it to the side. This text is announced via `aria-live="polite"` so screen reader users receive updates as progress changes. The WHY: placing percentage text below the bar keeps it consistently readable at all fill levels (no contrast conflict between text and fill color) and allows the helper text to switch from a percentage ("45%") to a status message ("Upload complete") without layout disruption.

4. **Determinate and indeterminate both supported** (HIGH) — The component supports both modes. Determinate shows actual percentage fill; indeterminate animates a moving segment at constant speed when progress cannot be calculated. The design guidance is explicit that indeterminate should only be used when progress truly cannot be tracked — it's not a lazy default. Helper text for indeterminate cannot show a percentage by definition, so the text should describe the operation ("Processing your request...").

5. **`aria-busy` linking to affected region** (MEDIUM) — Carbon's accessibility guidance recommends setting `aria-busy="true"` and `aria-describedby="[progressbar-id]"` on the content region being loaded. This is an advanced but important pattern: it tells assistive technology not just that progress is happening, but which part of the UI is pending. This is above and beyond basic ARIA progressbar implementation and reflects IBM's deep accessibility expertise.

## Notable Props
- `value` (number, 0–100): The current progress percentage for determinate mode.
- `status` ('active' | 'finished' | 'error'): Drives the color and icon state. Finished = green + checkmark; Error = red + error icon. Separating status from value means you can set `status="finished"` when your async operation resolves, regardless of whether `value` reached 100.
- `size` ('sm' | 'md'): Small (4px) or big (8px) track height.
- `helperText`: Optional text below the bar — the recommended location for percentage labels and status messages.
- `label`: The name of the process being tracked, placed above the bar. Required for accessibility.
- `hideLabel`: Visually hides the label while keeping it accessible to screen readers.

## A11y Highlights
- **Keyboard**: Not interactive; never receives focus.
- **Screen reader**: Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin` (0), and `aria-valuemax` (100). The label is associated via `aria-labelledby`. Helper text is wrapped in an `aria-live="polite"` region so that percentage updates and status changes are announced to screen readers without requiring focus. Error and success SVG icons are `aria-hidden="true"` because the helper text and ARIA state already communicate the state — the icons are purely visual reinforcement.
- **ARIA**: For indeterminate state, `aria-valuenow` is removed. The `aria-busy` pattern (setting `aria-busy="true"` on the region being loaded and referencing the progressbar via `aria-describedby`) is explicitly recommended for contexts where a progress bar represents a loading region rather than a standalone task.

## Strengths & Gaps
- **Best at**: Enterprise-grade status communication — the combination of explicit success/error states with color+icon, `aria-live` helper text, and the `aria-busy` regional loading pattern makes this the most complete real-world loading feedback implementation of all Tier 1 systems.
- **Missing**: No circular/ring variant and no value label positioned to the side or overlaid on the bar — all label content must go in the helper text slot below, which may not suit all layout constraints.
