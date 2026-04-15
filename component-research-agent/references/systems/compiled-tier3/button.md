---
component: Button
tier: 3
last_verified: 2026-03-29
---

# Button — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | No dedicated button primitive | Recommends native `<button>`; `asChild` pattern for polymorphic rendering without wrapper DOM nodes; no visual variants at primitive level. | high |
| Chakra UI | Button | `colorScheme` maps to full palette token; built-in `isLoading` with `loadingText`; `IconButton` enforces `aria-label` for icon-only cases. | high |
| GOV.UK | Button | Green primary / red warning hierarchy based on usability research; bottom shadow for click affordance; `preventDoubleClick` default to prevent duplicate submissions. | high |
| Base Web | Button | `kind` prop hierarchy (primary/secondary/tertiary/minimal); `shape` for explicit border-radius control; `isSelected` for toggle button state with `aria-pressed`. | medium |
| Fluent 2 | Button / CompoundButton / MenuButton / SplitButton / ToggleButton | Separate components per structurally-different type; `disabledFocusable` keeps disabled buttons in tab order for tooltip accessibility. | high |
| Gestalt | Button | `color` maps to Pinterest brand colors; `text` prop is required (enforces accessible label); `selected` for filter toggle patterns; icon names as strings from Gestalt's set. | medium |
| Mantine | Button | Gradient as first-class variant; `loaderProps` for loader type customization; `compact` mode for density; `ButtonGroup` for connected layouts. | high |
| Orbit | Button | `type="critical"` for destructive travel actions; `fullWidth` for mobile CTA spanning; loading state for booking confirmation flows. | medium |
| Evergreen | Button | `intent` + `appearance` as independent props (combinations: minimal danger, primary success); minimal aesthetic for B2B analytics dashboards. | medium |
| Nord | nord-button (Button) | Web component; `danger` variant for clinical destructive actions; strong focus ring exceeding standard WCAG minimums; conservative design for clinical context. | low |

## Key Decision Patterns

The most structurally significant T3 button pattern is Fluent 2's decision to make CompoundButton, MenuButton, SplitButton, and ToggleButton separate components rather than variants of one Button. This is the opposite of Chakra's and Mantine's single-component approach with many props. Fluent 2's rationale — structurally different buttons have different APIs and different accessibility requirements — is sound, but it trades discoverability for correctness. Teams unfamiliar with Fluent 2 may not know to look for SplitButton.

Evergreen's `intent` + `appearance` matrix is the most compositionally flexible T3 approach to button hierarchy. Rather than a single `variant` prop that packages visual style and semantic meaning together, Evergreen separates "what action type is this" (`intent`) from "how prominently should it appear" (`appearance`). This gives 3 × 4 = 12 combinations that cover nuanced B2B dashboard cases (e.g., a subtle danger button for a secondary destructive action in a data table).

GOV.UK's `preventDoubleClick` and three-dimensional shadow are research-backed UX decisions absent from all other T3 systems. The shadow specifically addresses older users and people with cognitive disabilities who need strong affordance cues to identify interactive elements. This is the clearest example of user research driving component design decisions in the T3 set.

Radix's "no button primitive" stance is philosophically the most extreme position. It reflects a defensible architectural principle — native elements should not be abstracted when they already work — but in practice, teams using Radix primitives build their own button abstractions immediately, making this a one-step-removed gap rather than a true absence.

## A11y Consensus

- All systems with a Button component use native `<button>` elements (or web component equivalents) to inherit keyboard activation (Enter/Space), focusability, and semantic role without additional ARIA.
- Loading states communicate `aria-busy="true"` and prevent double-submission — universally treated as both a UX and an accessibility requirement.
- Disabled buttons in production-quality systems use `aria-disabled` rather than the HTML `disabled` attribute to keep them focusable, allowing tooltip explanations of why the button is disabled (Fluent 2's `disabledFocusable` is the most explicit implementation).
- Icon-only buttons require `aria-label`; Chakra's `IconButton` and Gestalt's required `text` prop are the strongest enforcement mechanisms.
- Destructive actions (delete, cancel, danger) are uniformly assigned a distinct visual treatment (red/critical) across all systems; this semantic consistency is a cross-system design norm.

## Recommended Use

Reference T3 button approaches when deciding on variant architecture (single component with many props vs. separate components per type), the disabled/aria-disabled tradeoff, and loading state design. GOV.UK is the reference for research-backed affordance decisions; Fluent 2 for the split-component pattern; Evergreen for the intent/appearance matrix; Nord for healthcare context danger variants and focus ring standards.
