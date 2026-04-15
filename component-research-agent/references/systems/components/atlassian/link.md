---
system: Atlassian Design System
component: Link
url: https://atlassian.design/components/link
last_verified: 2026-03-28
---

# Link (Atlassian)

## Approach
Atlassian's Link component is notable for having explicit published documentation on the Button vs. Link decision — a guidance section that most design systems leave to informal convention. The Atlassian system treats the Button-vs-Link question as an information architecture decision, not just a visual one: links represent navigational intent (the user is moving to a new context), while buttons represent action intent (something is being triggered in the current context). This distinction matters in Atlassian products like Jira and Confluence because the same visual label might be "Create issue" (action — button) or "View all issues" (navigation — link), and the semantic correctness affects both user expectation setting and keyboard navigation patterns. Atlassian Link integrates with their routing system (similar in philosophy to Spectrum's RouterProvider approach) and is built on top of `@atlaskit/primitives`, meaning it inherits the full design token system for colors, focus rings, and typography. The component is also part of a deliberate "anchor primitives" strategy: Atlassian provides a low-level `Anchor` primitive for product teams who need fine-grained control, while `Link` is the high-level component with all opinions baked in.

## Key Decisions
1. **Explicit Button vs. Link doctrine in documentation** (HIGH) — Atlassian publishes a decision tree: "Does clicking this take the user to a new page or URL? → Link. Does clicking this trigger an operation? → Button." This is unusual because most systems leave this decision implicit. The explicit doctrine exists because Atlassian's cross-functional teams (designers, content, engineering) frequently disagreed on this in Jira's complex issue-management surfaces, and a documented rule resolved the debate.
2. **Two-level abstraction: Anchor primitive + Link component** (MEDIUM) — The `Anchor` primitive gives teams full control (no visual opinions, just routing integration and a11y correctness). The `Link` component wraps `Anchor` with Atlassian's visual conventions. This layering means teams can adopt the a11y and routing benefits without being locked into Atlassian's visual style — useful for white-label products in the Atlassian ecosystem.
3. **Visited state deliberately omitted from Link** (MEDIUM) — Unlike Carbon, Atlassian's Link does not style visited states. The rationale is that Atlassian products are task-management tools, not content browsers — users navigate to "My open issues" every session, and marking it as "visited" would create visual noise rather than useful wayfinding. This is an explicit product decision documented in their guidelines.

## Notable Props
- `href`: Standard navigation target; routing integration is handled by the Anchor primitive underneath.
- `target`: Supported; unlike Polaris, external link detection and rel attributes are not automatically managed — teams must add `rel="noopener noreferrer"` explicitly.
- `testId`: Atlassian standardizes test selectors as a first-class concern in their component API, reflecting their engineering culture's emphasis on automated testing in Jira's complex UI.

## A11y Highlights
- **Keyboard**: Tab and Enter per native anchor conventions. Atlassian's focus ring uses the `color.border.focused` token from their token system, providing a 2px ring with 2px offset.
- **Screen reader**: Announced as "link" via native `<a>` element. Atlassian's documentation explicitly recommends descriptive link text and provides examples of transforming "click here" into contextual labels.
- **ARIA**: No custom ARIA roles on the Link component itself. Atlassian documents that `aria-label` should override non-descriptive link text. The Anchor primitive accepts all ARIA attributes for teams needing custom implementations.

## Strengths & Gaps
- **Best at**: Explicit semantic doctrine — the published Button vs. Link decision tree is the most actionable guidance on this topic across all Tier 1 systems.
- **Missing**: No automatic external link handling (rel attributes, target management), and no visited state, which limits applicability for documentation and help center surfaces within the Atlassian product family.
