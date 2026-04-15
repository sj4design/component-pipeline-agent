---
system: Atlassian Design System
component: Not available as standalone (color picker exists only in @atlaskit/color-picker — not in core ADS)
url: https://atlassian.design/components
last_verified: 2026-03-28
---

# Color Picker (Status: Atlaskit Package, Not Core ADS Component)

## Approach
Atlassian's design system does not list ColorPicker as a core component in the main Atlassian Design System component library at atlassian.design/components. However, color selection functionality does exist within the Atlaskit package ecosystem as `@atlaskit/color-picker` — a legacy package that predates the current ADS unification effort. This distinction matters: Atlaskit packages represent the older, per-component package model that Atlassian is gradually migrating away from, while the current atlassian.design system represents the curated, governanced component set. The `@atlaskit/color-picker` is a palette-constrained picker — it shows a grid of predefined color swatches from which users select — rather than a freeform HSB or RGB picker. This design reflects Atlassian's primary use case: Jira allows users to pick label colors, project colors, and status category colors, but all from a controlled vocabulary of approximately 12-16 approved colors. Allowing freeform hex input would break the visual consistency of the Jira interface, where color communicates meaning (red = blocking, green = done, yellow = in progress).

## Key Decisions
1. **Palette-constrained picking, not freeform selection** (HIGH) — The @atlaskit/color-picker presents a fixed grid of named, pre-approved colors rather than a hue/saturation gradient or hex input. This is intentional: in Jira, colors on labels, epics, and statuses are semantic — they communicate state and priority. If users could pick any color, two users might pick near-identical shades that convey different meanings in their mental models, breaking team-wide color communication conventions. Constraining to a palette enforces a shared color vocabulary.
2. **Color as metadata, not decoration** (HIGH) — In Atlassian products, color almost always carries semantic meaning rather than purely decorative purpose. Epic colors help teams scan the backlog at a glance. Label colors allow quick categorization. Project avatar colors differentiate workspaces in the sidebar. This semantic use case means a picker must provide named, distinguishable colors, not maximally precise color reproduction. A 12-color grid serves this need better than a full HSB picker.
3. **Migration path uncertainty** (MEDIUM) — The @atlaskit/color-picker package's current maintenance status in the new ADS framework is unclear. Atlassian's documentation guidance is to check whether a given Atlaskit package has been migrated to the new design token-based system. Teams building new Jira-connected products should verify current package status before adopting, as the component may be deprecated or superseded.
4. **No text input for hex values** (MEDIUM) — Unlike Ant Design or Spectrum, the Atlaskit color picker has no hex/RGB text input field. This reinforces the constrained palette philosophy: if users could type arbitrary hex values, the palette constraint would be trivially bypassed. The omission is intentional gatekeeping to maintain the semantic color vocabulary.

## Notable Props
- `selectedColor`: The currently selected color value (hex string from the predefined palette).
- `palette`: Array of color objects with `value` (hex) and `label` (accessible name) — the constrained set. This is the key prop that enforces the vocabulary.
- `onChange`: Fires when a swatch is clicked, receiving the color object.
- `checkMarkColor`: Customizes the checkmark overlay on the selected swatch — a small but notable detail that shows awareness of contrast requirements across light and dark swatches.

## A11y Highlights
- **Keyboard**: Arrow keys navigate between swatches in the grid. Enter or Space selects the focused swatch. The grid follows a row/column navigation model.
- **Screen reader**: Each swatch is announced with its `label` value (e.g., "Red", "Green") rather than its hex code, which is exactly right for non-technical users selecting semantic colors in Jira.
- **ARIA**: The swatch grid uses `role="radiogroup"` with individual swatches as `role="radio"`, which correctly models the single-select behavior and integrates with screen reader selection announcements.

## Strengths & Gaps
- **Best at**: Semantic color selection from a controlled vocabulary with excellent accessibility labeling — the radiogroup/radio ARIA pattern is the most semantically correct model for palette pickers where exactly one color is selected at a time.
- **Missing**: Freeform color selection and format flexibility — for Atlassian products that need to allow true custom branding colors (e.g., a hypothetical Atlassian-hosted white-label product), the constrained palette model would be insufficient.
