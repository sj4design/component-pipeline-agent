---
system: Ant Design
component: Divider
url: https://ant.design/components/divider/
last_verified: 2026-03-28
---

# Divider

## Approach
Ant Design's Divider is the most feature-rich divider component among Tier 1 systems, offering horizontal and vertical orientation, a text label embedded in the divider line, configurable text alignment (left, center, right), and visual style variants. This breadth reflects Ant Design's general philosophy of providing a comprehensive set of features out of the box for Chinese enterprise application developers who need to quickly build information-dense admin interfaces. In Chinese B2B software, section-labeled dividers (a horizontal line with text like "Basic Information" or "Advanced Settings" centered within it) are extremely common layout patterns in form-heavy settings pages, configuration panels, and data entry screens. Ant Design invested in this pattern because it appears throughout Alibaba's own product ecosystem and is frequently requested by its large developer community. The result is the only Tier 1 system where a "section header within a rule" is a first-class, zero-composition component feature.

## Key Decisions
1. **Embedded text label in the divider line** (HIGH) — Ant Design's Divider accepts `children` — when present, it renders the text content centered (or left/right-aligned) within the horizontal rule, splitting the line on either side of the text. This is the defining feature that differentiates Ant's Divider from all other Tier 1 implementations. The use case is form section headers in dense enterprise admin UIs, where a full heading-and-margin pattern would consume too much vertical space, and a plain divider without labeling would leave users without visual section orientation. The embedded text label is the pragmatic middle ground.
2. **`orientation` prop for text position within the rule** (MEDIUM) — When a text label is present, the `orientation` prop controls whether it appears at `left`, `center`, or `right` of the line. Left alignment is the most common choice in Ant's own products because it aligns with reading flow and with the pattern of left-aligned form field labels above the divider. Center alignment creates a more formal, symmetrical appearance suited for headings in card or modal contexts. This flexibility reflects Ant's product diversity.
3. **`orientationMargin` for precise text offset from edge** (LOW) — When `orientation` is `left` or `right`, the `orientationMargin` prop controls the pixel or percentage distance between the text and the container edge. This level of fine-tuning control is characteristic of Ant Design's general preference for precision over abstraction — it trusts developers to set values rather than abstracting to tokens.
4. **Vertical orientation for inline separators** (MEDIUM) — Ant Design's Divider supports `type="vertical"` for inline (vertically-oriented) separators within text content and action groups. This is used in patterns like "Edit | Delete | View" action links where a vertical rule separates clickable items. The vertical variant renders as an inline element, naturally participating in text flow, which is architecturally different from how other systems implement vertical separators.
5. **`dashed` style variant** (LOW) — Ant supports a `dashed` boolean prop that renders the divider line as a dashed rule rather than solid. This exists because dashed lines in Chinese enterprise UI conventions are used to indicate "optional" or "expandable" sections in complex forms — a culturally-specific visual convention that Ant Design preserves for its primary user base.

## Notable Props
- `children`: Text content embedded in the divider line — the key differentiating feature.
- `orientation`: `'left' | 'center' | 'right'` — Text position within the rule.
- `orientationMargin`: `string | number` — Fine-grained offset of text from the container edge.
- `type`: `'horizontal' | 'vertical'` — Orientation of the divider.
- `dashed`: `boolean` — Dashed line style for optional/expandable section conventions.
- `plain`: `boolean` — Renders the embedded text with normal font weight rather than the default bold heading style, for less prominent section separations.

## A11y Highlights
- **Keyboard**: Non-interactive; no keyboard behavior for the base Divider. Text labels within the divider are not interactive.
- **Screen reader**: Renders as `<div>` with a `role="separator"` attribute (not `<hr>`). When children are present, the text content within the divider is read by screen readers as part of the separator. Semantically, this means the separator announces both the separation and the label — useful for orientation but potentially verbose in complex forms.
- **ARIA**: `role="separator"` applied to the wrapper element. The text label within the divider does not carry heading semantics (`role="heading"`), which is an accessibility gap — screen reader users navigating by heading will not land on divider labels, reducing the usability of section-labeled dividers for keyboard users relying on heading navigation.

## Strengths & Gaps
- **Best at**: Text-labeled section dividers for dense enterprise form layouts — the built-in children support, orientation control, and `plain` vs. bold text weight options make it uniquely suited to the common Chinese enterprise admin UI pattern of labeled horizontal rules.
- **Missing**: Semantic heading support for embedded labels (divider text should arguably have `role="heading"` with appropriate level for screen reader navigation) and token-based color control — the divider color is not easily themed via design tokens in the same way Polaris's border token approach enables.
