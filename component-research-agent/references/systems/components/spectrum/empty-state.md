---
system: Spectrum (Adobe)
component: IllustratedMessage
url: https://react-spectrum.adobe.com/react-spectrum/IllustratedMessage.html
last_verified: 2026-03-28
---

# Empty State

## Approach

Spectrum names its empty state component "IllustratedMessage" rather than "EmptyState," and the naming reveals a fundamental design decision: the component's identity is anchored to the illustrated SVG, not to the empty-state use case. This reflects Adobe's product reality — Lightroom, InDesign, Illustrator, and Creative Cloud all have deeply illustration-driven UIs where an empty state without a compelling visual would feel unfinished. By naming the component around its most differentiating element (the illustration), Spectrum signals that visuals are not optional decoration in Adobe products.

The component enforces a three-part structure: SVG illustration, Heading, and Content. This is notably more structured than Polaris's EmptyState (which has a flexible footerContent area) but less opinionated than ContextualHelp (which also enforces an optional Footer link). The SVG-first requirement means teams must produce or select an appropriate illustration for every empty state, which is a higher design investment than systems that allow icons or plain text as alternatives. For Adobe's product teams, this investment is considered worthwhile because illustration quality is part of the brand promise.

Importantly, IllustratedMessage does not include a built-in action button slot. This is a significant design choice: the component is purely communicative, not action-oriented. If a primary action is needed in an empty state, teams compose it separately alongside the IllustratedMessage. This keeps the component's responsibility narrow and prevents the "kitchen sink" empty state pattern where a single component accretes heading, illustration, description, primary button, secondary link, and tutorial video.

## Key Decisions

1. **SVG illustration as a required slot** (HIGH) — Making the illustration a required structural element (not an optional prop) is the most opinionated decision in Spectrum's empty state implementation. Every empty state must have a visual. The rationale: empty states without visuals feel like content failures rather than intentional system states. Adobe's product teams accepted this as a design standard, meaning Spectrum can enforce it at the component level rather than relying on team discipline.

2. **No built-in action button** (HIGH) — IllustratedMessage deliberately excludes a CTA button slot. This is the inverse of Polaris's approach (which enforces a single primary action) and Atlassian's (which provides primary and secondary action props). Spectrum's reasoning appears to be: the component handles communication; orchestration of what action to take is the parent page's concern, not the illustration component's. This produces cleaner component code but requires more assembly work for teams.

3. **Accessibility-first illustration handling** (HIGH) — When an SVG illustration is paired with a Heading, the SVG must have `aria-hidden="true"` and `role="presentation"` to prevent the illustration from being announced redundantly. When there is no Heading, the SVG must carry meaning via `role="img"` and `aria-label`. This dual requirement is explicitly documented and reflects Spectrum's commitment to accessibility as a design constraint, not an afterthought.

4. **Layout composability** (MEDIUM) — IllustratedMessage inherits Spectrum's full layout prop system (flex, grid, margin, width, height, position) and integrates seamlessly into any container. This was a deliberate choice to avoid building layout into the component: the illustration message is just a node in a layout tree, not a full-page takeover component.

## Notable Props

- No `action` prop — actions must be composed externally alongside the component.
- Layout props inherited: `margin`, `width`, `alignSelf`, `justifySelf` — allows precise placement in flex/grid contexts without wrapper divs.
- Children: SVG element (required in practice), `Heading` (required), `Content` (required body text).

## A11y Highlights

- **Keyboard**: No interactive elements in the component itself. Parent-composed action buttons follow standard button keyboard behavior.
- **Screen reader**: SVG with Heading: SVG must have `aria-hidden="true"` and `role="presentation"`. SVG without Heading: SVG must have `role="img"` and `aria-label` containing the meaningful description.
- **ARIA**: The Heading component inside IllustratedMessage determines the heading level in the document outline. Teams must choose the correct heading level (`level` prop) to maintain document hierarchy.

## Strengths & Gaps

- **Best at**: Enforcing visual quality standards — by requiring SVG illustrations, Spectrum ensures that empty states in Adobe products have a consistent, high-quality visual treatment rather than varying between icons, photos, and placeholder rectangles.
- **Missing**: No built-in action slot means teams must compose actions externally, which adds complexity and creates inconsistency in how actions are styled and positioned relative to the illustration across different products.
