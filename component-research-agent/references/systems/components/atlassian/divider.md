---
system: Atlassian Design System
component: Divider
url: https://atlassian.design/components/divider/examples
last_verified: 2026-03-28
---

# Divider

## Approach
Atlassian Design System provides a Divider component that reflects the system's pragmatic, product-driven design philosophy. The Atlassian Divider is minimal by design — a single horizontal rule with no size variants, no color variants, and no embedded text label support. This simplicity is intentional: Atlassian's products (Jira, Confluence, Trello, Bitbucket) use dividers primarily as structural separators within panel layouts, dropdown menus, and settings pages. In these contexts, a divider is purely a layout tool — it does not need semantic color variations (there is no "critical" or "subdued" state for a separator) and it does not need to carry text content (section headers in Atlassian products are expressed through headings, not titled rules). The component's minimal API surface reflects Atlassian's component design principle: expose only what product teams have demonstrated they need, not every conceivable variation.

## Key Decisions
1. **Single-variant simplicity** (HIGH) — The Atlassian Divider has no configuration props beyond the standard accessibility and styling escape hatches. This contrasts sharply with Polaris's token-based customization. Atlassian's rationale is that visual weight and color variation in dividers creates inconsistency risk: if teams can choose a "subtle" or "strong" divider, different feature teams will make different choices for similar contexts, leading to a fragmented UI. By offering only one visual treatment, the system enforces consistency automatically.
2. **Usage in navigation and menus** (MEDIUM) — Atlassian's documentation specifically addresses Divider usage within dropdown menus and navigation contexts, where it separates logical groups of menu items. This is the most common Divider usage in Jira (separating "Edit", "Clone", "Delete" from "Move to Sprint", "Move to Backlog" in issue action menus). The component is documented with this use case as primary, influencing its compact 1px treatment that sits comfortably within the tight spacing of menu items.
3. **Token integration through design tokens** (MEDIUM) — Atlassian's Divider uses the `color.border` design token, which is part of the new ADS token system. This means the divider's visual treatment automatically responds to ADS's light/dark mode token sets without any configuration. The token system is the mechanism for visual consistency rather than component props, which is consistent with Atlassian's broader token-first approach to theming.
4. **`testId` prop for testing** (LOW) — Like all Atlassian DS components, Divider includes a `testId` prop that adds a `data-testid` attribute to the DOM element. This reflects Atlassian's engineering culture of testability as a first-class concern — the prop exists because Atlassian's product teams write automated UI tests that need to query specific DOM elements.

## Notable Props
- `testId`: Standard Atlassian testing prop — adds `data-testid` to the rendered element for automated testing queries.
- No visual customization props — the component renders a single visual treatment using the `color.border` token.

## A11y Highlights
- **Keyboard**: Non-interactive; no keyboard behavior.
- **Screen reader**: Renders as `<hr>` with native `role="separator"` semantics. Atlassian's implementation correctly uses the semantic HTML element rather than a styled div.
- **ARIA**: The `<hr>` element provides `role="separator"` natively. Atlassian's documentation notes that for decorative dividers (visual-only, carrying no semantic meaning about content structure), developers should add `aria-hidden="true"` — a guidance note that mirrors Polaris's documentation and shows the system's awareness of the semantic vs. decorative distinction.

## Strengths & Gaps
- **Best at**: Absolute visual consistency through a zero-configuration API — because every Atlassian product team uses the same single-treatment Divider, Jira, Confluence, and Bitbucket share identical separator visual language without needing design governance to enforce it.
- **Missing**: Thickness and color variation for contexts where visual hierarchy between dividers is needed (e.g., a major section break vs. a minor item separator within a settings page) — teams needing hierarchical separation must use nested container components or custom styling rather than a Divider variant.
