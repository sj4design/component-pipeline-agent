---
system: Atlassian Design System
component: Textfield
url: https://atlassian.design/components/textfield/
last_verified: 2026-03-28
---

# Textfield

## Approach
Atlassian's Textfield is designed with inline editing as a core use case, not an afterthought. Jira and Confluence are built around the concept of "click to edit" -- issue titles, field values, page names are all read-view text that transforms into an editable field on interaction. This drove Atlassian to create a Textfield that supports multiple appearance modes: standard (visible border), subtle (transparent until focused), and none (completely invisible). The subtle and none appearances let the Textfield blend seamlessly into read-view layouts, making the transition between reading and editing feel native rather than modal. Atlassian also pairs Textfield with a dedicated InlineEdit wrapper component that manages the read-to-edit transition, confirmation, and cancellation -- a pattern that most other systems don't address at the component library level.

## Key Decisions
1. **Three appearance modes: standard, subtle, none** (HIGH) — Standard shows the typical bordered field. Subtle renders a transparent background that only reveals the field border on hover or focus -- this is critical for Jira's inline-edit patterns where dozens of fields appear on an issue view and bordered inputs for all of them would create visual overload. The "none" appearance removes all field styling entirely, useful when the Textfield is embedded inside another styled container. This three-tier approach means one component serves form contexts, inline-edit contexts, and embedded contexts without separate component variants.

2. **InlineEdit as a dedicated wrapper component** (HIGH) — Rather than baking inline-edit behavior into Textfield itself, Atlassian created InlineEdit as a separate component that wraps any input (Textfield, TextArea, Select). InlineEdit manages the readView/editView transition, shows confirm/cancel buttons, and handles Enter-to-confirm and Escape-to-cancel keyboard shortcuts. This separation means the Textfield stays simple while inline-edit behavior is composable across all input types -- a design that reflects Jira's pervasive inline editing needs.

3. **Compact spacing mode** (MEDIUM) — The `spacing="compact"` prop reduces the Textfield's height for dense layouts. Atlassian chose a single compact option rather than multiple sizes (like Carbon's three) because their products primarily need two densities: standard forms and dense issue-detail views. More granularity would add complexity without serving real Atlassian product needs.

4. **elemBeforeInput / elemAfterInput slots** (MEDIUM) — These render-prop slots allow placing arbitrary elements inside the Textfield boundary, before or after the input. Unlike Polaris's prefix/suffix which are text-only, these accept any React element -- icons, buttons, badges. Atlassian uses this for patterns like search icons, loading spinners inside fields, and status indicators. The slot-based approach is more flexible but less opinionated than dedicated prefix/suffix props.

## Notable Props
- `appearance`: "standard" | "subtle" | "none" -- the three-tier system that enables inline-edit patterns without separate components
- `spacing`: "compact" | "default" -- density control for issue-detail vs. form contexts
- `elemBeforeInput` / `elemAfterInput`: Flexible slots for icons, buttons, or any element inside the field boundary
- `isCompact` (deprecated in favor of `spacing`): Shows the evolution of the API toward more explicit naming

## A11y Highlights
- **Keyboard**: Standard input behavior. When wrapped in InlineEdit: Enter confirms the edit, Escape cancels and returns to read view. Tab moves to the confirm/cancel buttons.
- **Screen reader**: Label association is required. Atlassian's docs explicitly state that a visible label should always be present, and placeholder text should never be used as a substitute for labels. When in InlineEdit mode, the transition from read to edit is announced.
- **ARIA**: Uses standard aria-label/aria-labelledby for labeling. aria-invalid for error states. The subtle/none appearances maintain the same ARIA semantics as the standard appearance, ensuring visual minimalism doesn't compromise accessibility.

## Strengths & Gaps
- **Best at**: Inline-edit workflows -- the combination of subtle/none appearances with the dedicated InlineEdit wrapper creates the most complete inline-editing text field story among all systems researched.
- **Missing**: No built-in validation display (errors must be composed separately), no character counter, no fluid/auto-width mode, no connected-field or prefix/suffix pattern for value+unit inputs, and limited size options (only standard and compact).
