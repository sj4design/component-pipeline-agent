---
system: Atlassian Design System
component: EmptyState
url: https://atlassian.design/components/empty-state
last_verified: 2026-03-28
---

# Empty State

## Approach

Atlassian's EmptyState is a fully-featured, purpose-built component that covers the broadest range of empty state scenarios among the Tier 1 systems. Atlassian's products (Jira, Confluence, Trello, Bitbucket) encounter empty states in highly varied contexts: new project setup, empty boards, search with no results, permission-restricted content, error states, and blank-slate "try this feature" moments. Rather than restricting EmptyState to one scenario type (like Polaris, which scopes to full-page first-use states), Atlassian built a component that handles all of these with configurable visual and structural elements.

The design philosophy distinguishes between "empty states" (the task list is empty because no tasks have been created) and "blank slates" (a new feature the user hasn't tried yet). Both use the EmptyState component, but the copy guidance differs: blank slates should be welcoming and educational, while empty states should be direct and action-focused. This nuance in the content model — same component, different copy strategy — reflects Atlassian's experience across products where conflating these two conditions led to inappropriate tone and confusing guidance.

The component's two-column responsive layout (image right, content left on medium+ screens; single column on mobile) reflects a specific design judgment: the illustration should accompany the text, not precede it. By placing content on the left (where Western reading begins) and the illustration on the right (as a supporting visual), Atlassian ensures the message lands before the visual, rather than users spending time parsing an illustration before finding the heading.

## Key Decisions

1. **Image slot is optional but recommended** (HIGH) — Unlike Polaris (required) and Spectrum (required via SVG), Atlassian makes the image optional but recommends it for richness. The documentation states "illustrations can help to add a wink to your message." The optionality accommodates error states and permission-denied states where an illustration might feel tonally mismatched. Teams can use illustrations for inviting blank slates and omit them for more serious or functional empty conditions.

2. **Primary and secondary action structure** (HIGH) — EmptyState provides dedicated `primaryAction` and `secondaryAction` slots (plus a `tertiaryAction`). This is more structured than Polaris's action + footerContent pattern but more explicit than Spectrum's "compose it yourself" approach. The three-tier action hierarchy covers the common pattern of: primary CTA ("Create your first issue"), secondary alternative ("Import from Trello"), and tertiary link ("Learn more about Jira boards").

3. **`headingLevel` as a required prop** (HIGH) — The component requires the consumer to specify the heading level (h2, h3, h4, etc.) rather than defaulting to a fixed level. This is explicitly about document accessibility: empty states appear in different positions within page hierarchies, and a hardcoded h2 would break document outline structure if EmptyState appears inside a section that already has an h2. Requiring this prop forces teams to think about document structure.

4. **Two-column responsive layout** (MEDIUM) — The grid-based layout (image right, content left on desktop; single column on mobile) is baked into the component. Teams cannot easily change which side the image appears on or stack them vertically on desktop. This is a trade-off: consistency across Atlassian products vs. layout flexibility for edge cases.

5. **Background color via design tokens** (LOW) — The component uses `--ds-surface-sunken` for its background, giving it a recessed visual appearance that signals "inactive" or "waiting for content." This visual metaphor reinforces the empty state concept: the surface is lower/sunken because it has not yet been filled with content.

## Notable Props

- `header` (required): The empty state heading text.
- `headingLevel` (required): `'h2' | 'h3' | 'h4' | 'h5' | 'h6'` — unusual explicit heading level prop; required for a11y correctness.
- `description`: Body text explaining the condition and/or next steps.
- `imageUrl`: Optional illustration. Atlassian provides an illustration library but allows custom images.
- `primaryAction`, `secondaryAction`, `tertiaryAction`: Three-tier action slot hierarchy.

## A11y Highlights

- **Keyboard**: Action buttons follow standard Atlassian DS button keyboard behavior. Tab order proceeds through primary, secondary, tertiary actions in DOM order.
- **Screen reader**: Images should use empty `alt=""` when decorative (the typical case) or a descriptive `alt` when the illustration conveys meaning not present in the text. The heading provides the semantic anchor for screen reader navigation.
- **ARIA**: The `headingLevel` prop directly controls the HTML heading element used, ensuring the EmptyState heading participates correctly in the page's document outline — the most explicit heading-level accessibility control in any Tier 1 empty state component.

## Strengths & Gaps

- **Best at**: The required `headingLevel` prop and three-tier action hierarchy make Atlassian's EmptyState the most structurally flexible and accessibility-aware empty state component across the Tier 1 systems.
- **Missing**: The baked-in two-column layout cannot be changed, which creates constraints for full-width centered layouts or cases where the illustration should appear above the text for vertical presentation.
