---
system: Ant Design
component: Typography.Link
url: https://ant.design/components/typography/
last_verified: 2026-03-28
---

# Link (Ant Design)

## Approach
Ant Design treats links as part of its Typography system rather than as a standalone component, which reflects the system's origin in Alibaba's content-heavy enterprise applications where links appear primarily in the context of text — data table cells, description lists, form help text, and article-like content. The `Typography.Link` component is semantically an `<a>` element styled with Ant Design's token system, but it shares props and composability patterns with `Typography.Text` and `Typography.Paragraph`, allowing teams to apply consistent text styling (size, weight, ellipsis truncation, copyable behavior) to links as easily as to plain text. This compositional approach is uniquely Ant Design's — no other Tier 1 system integrates link styling so deeply with its typography subsystem. The practical benefit is that `Typography.Link` automatically inherits ellipsis truncation behavior, which is critical for Ant Design's primary use case of data-dense enterprise tables where cell content must be clipped to fit column widths while remaining clickable links.

## Key Decisions
1. **Link as Typography variant, not standalone component** (HIGH) — By placing Link inside the Typography namespace, Ant Design makes it clear that link styling is a text concern, not a navigation-system concern. This means Typography.Link can receive all Typography props (`ellipsis`, `strong`, `italic`, `code`) in combination, enabling rich link formatting that would require wrapper elements in other systems. The trade-off is that Typography.Link does not integrate with any routing system — it renders a plain `<a>` element, requiring teams to add their own router wrappers.
2. **`disabled` state on a link** (MEDIUM) — Ant Design's Typography.Link supports a `disabled` prop, which renders a visually muted, non-interactive link. Most systems argue that a disabled link is an antipattern (if the destination doesn't exist, remove the link; if it's temporarily unavailable, explain why). Ant Design includes it because enterprise forms frequently have links that are conditionally active based on user permissions — a common pattern in Alibaba's B2B platforms where user roles gate access to certain views.
3. **`ellipsis` integration for table cells** (MEDIUM) — The `ellipsis` prop truncates link text to a single line with a tooltip revealing the full text on hover. This is designed specifically for data table use cases where link text (typically entity names like product titles or order IDs) must fit fixed-width cells. Ant Design is the only Tier 1 system that solves this truncation-with-tooltip pattern at the Link component level rather than requiring a wrapper Tooltip component.

## Notable Props
- `ellipsis`: Truncates text and shows full value in tooltip — unique among link components for table cell use cases.
- `disabled`: Renders non-interactive muted link for permission-gated navigation — a controversial inclusion that reflects Alibaba enterprise patterns.
- `href`, `target`: Standard anchor props; no automatic rel injection or external link detection.
- `copyable`: Inherited from Typography — adds a copy icon that copies the link text (not the URL) to clipboard, useful for order IDs and reference numbers rendered as links.

## A11y Highlights
- **Keyboard**: Tab to focus, Enter to activate. Focus ring uses Ant Design's `colorPrimary` token with a blue focus outline.
- **Screen reader**: Announced as "link" via native `<a>` element. The `disabled` state uses `aria-disabled="true"` and `pointer-events: none` rather than removing the element from the DOM.
- **ARIA**: No custom ARIA roles. When `ellipsis` is active, the Tooltip that appears on hover is not consistently accessible via keyboard in the current implementation — this is a documented known issue in Ant Design's GitHub tracker.

## Strengths & Gaps
- **Best at**: Typography integration — ellipsis truncation with tooltip and combinability with text formatting props is unique in the Tier 1 design system landscape.
- **Missing**: No router integration, no automatic external link security (rel attributes), and the ellipsis tooltip is not keyboard-accessible, creating an accessibility gap for the exact use case the feature targets.
