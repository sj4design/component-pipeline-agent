---
system: Atlassian Design System
component: Progress Bar
url: https://atlassian.design/components/progress-bar/usage
last_verified: 2026-03-28
---

# Progress Bar

## Approach
Atlassian's Progress Bar is positioned as a status communication tool within the broader ecosystem of Atlassian's loading and feedback components — sitting alongside Spinner (indeterminate activity) and Skeleton (content placeholder). The component's purpose is narrow and deliberate: show the status of a measurable system process. Atlassian's design system is built for products like Jira, Confluence, and Bitbucket, where progress feedback is frequently needed during operations like bulk issue transitions, file uploads, repository clones, and build pipeline runs. The philosophy favors simplicity in the API and clarity in the visual — the bar should never be ambiguous about what it represents or how close to completion it is.

Atlassian provides three visual variants — standard, success, and transparent — which reflect the three primary contexts in which a progress bar appears in Atlassian products: an ongoing operation (standard blue), a completed operation (success green), and a progress bar placed on a colored or image background where the default track color would not contrast properly (transparent, which removes the track background). The variant system is intentionally limited; Atlassian does not expose raw color customization because the design system prioritizes visual consistency across all Atlassian products over per-team customization. The transparent variant in particular reflects Atlassian's product reality: many Jira boards and Confluence spaces use custom header images and colored panels, and a progress bar placed there needs a variant that works without relying on a visible track.

## Key Decisions
1. **Three visual variants: default, success, transparent** (HIGH) — Rather than exposing a color prop, Atlassian provides three named variants. The `success` variant displays a green fill to signal completion. The `transparent` variant renders with no track background, allowing the bar to float on colored surfaces. The WHY: Atlassian products operate in user-customized environments (themed Jira projects, branded Confluence spaces) where fixed track colors would fail contrast checks or look visually jarring. Named variants express intent clearly and encode the design system's decision about which color combos are accessible.

2. **`isIndeterminate` as a first-class prop** (HIGH) — The component explicitly supports both determinate and indeterminate states via an `isIndeterminate` boolean. The WHY: Atlassian products frequently trigger background jobs (issue indexing, CI/CD pipeline steps, migration tasks) where the total duration cannot be known in advance. Rather than forcing developers to use a Spinner component for every unknown-duration operation, Atlassian made indeterminate a mode of the progress bar itself — this keeps the visual language consistent between known and unknown progress, since both are "a process running in a specific region."

3. **`value` as a 0–1 float** (MEDIUM) — The `value` prop accepts a float between 0 and 1 (not 0–100). The WHY: normalized values integrate more cleanly with async data patterns (dividing `loaded/total` directly yields a 0–1 value with no conversion), and fractional precision is preserved. Developers working with raw byte counts or item counts do the division once; the component handles display formatting.

4. **`ariaLabel` for accessible naming** (HIGH) — The component accepts an `ariaLabel` prop (a string) for providing an accessible name. Unlike Polaris, which requires an external label element referenced by ID, Atlassian allows the label to be passed directly to the component. The WHY: Atlassian products often render progress bars in automated or dynamic contexts (pipeline step rows, background job queues) where a visible label element may not exist in the DOM structure. The inline `ariaLabel` prop ensures accessibility without requiring layout changes.

5. **Companion components: Spinner and Skeleton** (MEDIUM) — Atlassian explicitly positions Progress Bar within a triad of loading feedback components, with documented guidance on when to use each. Progress Bar = measurable process; Spinner = unknown-duration activity; Skeleton = content that will appear in a known layout slot. The WHY: without this guidance, developers default to Spinner for everything. Atlassian's documentation investment in distinguishing these three cases reflects the complexity of Jira and Confluence's async loading patterns, where all three states can appear simultaneously on the same page.

## Notable Props
- `value` (number, 0–1): The normalized progress value. Converts to percentage internally.
- `appearance` ('default' | 'success' | 'inverse'): Named visual variant — drives fill and track color semantics.
- `isIndeterminate` (boolean): Triggers animated indeterminate mode and removes `aria-valuenow` from the DOM.
- `ariaLabel` (string): Inline accessible name string — no external label element required.

## A11y Highlights
- **Keyboard**: Not interactive; never receives focus. No keyboard navigation is relevant.
- **Screen reader**: Uses `role="progressbar"` with `aria-valuenow` set to the percentage equivalent of the `value` float, `aria-valuemin="0"`, and `aria-valuemax="100"`. The `ariaLabel` prop provides the accessible name. When `isIndeterminate` is true, `aria-valuenow` is omitted per ARIA spec — the screen reader announces the label plus "in progress" or similar based on the UA's default progressbar announcement pattern.
- **ARIA**: The `appearance="success"` variant does not automatically add an ARIA state for completion — the visual green fill communicates success but the ARIA output still uses `role="progressbar"`. Communicating completion semantically to screen readers requires the consuming developer to update the `ariaLabel` to "Complete" or similar when the process finishes.

## Strengths & Gaps
- **Best at**: Clear component ecosystem guidance — the explicit three-way split between Progress Bar, Spinner, and Skeleton with documented decision criteria makes it easier for teams to choose the right feedback component for each async scenario.
- **Missing**: No built-in label rendering (the bar itself shows no text) and no numeric value label slot — percentage display must be implemented separately by the developer alongside the component.
