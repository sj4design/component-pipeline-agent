---
component: typography
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Typography (type scale system, not a single component)
**Approach:** M3 defines a structured type scale with 5 roles (Display, Headline, Title, Body, Label) each in 3 sizes (Large, Medium, Small), yielding 15 type tokens. Each token maps to a CSS custom property (`--md-sys-typescale-display-large-*`) controlling font family, weight, size, line height, and letter spacing. M3 does not ship a `<Typography>` component — developers apply type tokens via CSS. The scale is designed for Material's density system, where Label and Body sizes serve compact UI while Display and Headline serve hero sections.
**Key Decisions:**
- [HIGH] 5-role × 3-size matrix: Display/Headline/Title/Body/Label × Large/Medium/Small creates 15 semantic slots that cover all UI contexts without ad-hoc overrides
- [HIGH] No component abstraction: M3 treats typography as tokens applied via CSS, not a renderable component — this is a deliberate architectural choice favoring native HTML semantics
- [MED] Separate font axes for each token: each of the 15 tokens independently specifies family, weight, size, line height, tracking — no shared "base" that tokens modify
**Notable API:** CSS custom properties: `--md-sys-typescale-{role}-{size}-font`, `--md-sys-typescale-{role}-{size}-size`, `--md-sys-typescale-{role}-{size}-line-height`, `--md-sys-typescale-{role}-{size}-weight`, `--md-sys-typescale-{role}-{size}-tracking`. No component props.
**A11y:** M3 documentation emphasizes heading hierarchy (h1-h6) must be semantic regardless of visual type scale choice. Display and Headline roles are not linked to heading levels — developers must map visual style to semantic level independently.
**Best at:** The 5-role taxonomy (Display, Headline, Title, Body, Label) is the most granular semantic type scale in Tier 1, making it clear when to use each level.
**Missing:** No renderable component; no truncation/clamping utilities; no polymorphic `as` prop; no responsive scaling built in.

---

## spectrum
**Component:** Heading + Body + Detail (separate components)
**Approach:** Spectrum splits typography into three purpose-built components rather than one polymorphic component. `Heading` renders semantic headings (h1-h6) with an explicit `level` prop that maps to both visual size and HTML heading level. `Body` handles paragraph and inline text. `Detail` covers small text like captions, labels, and metadata. Each component accepts a `size` prop (XS through XXL) that overrides the default visual size without changing semantic level. Spectrum's type scale is built on Adobe Clean and uses optical sizing for display text.
**Key Decisions:**
- [HIGH] Three separate components (Heading/Body/Detail): enforces semantic intent at the component level — a `<Heading>` always renders a heading element, preventing `<Text variant="h1">` rendering as a `<span>`
- [HIGH] `level` prop on Heading controls both semantics and default size: `level={1}` renders `<h1>` and defaults to the largest heading size — semantic and visual are coupled by default but decoupled when `size` is also specified
- [MED] XXXL size for display text: Heading supports up to XXXL for hero/display use cases, with optical sizing adjustments at large sizes
**Notable API:** `Heading`: `level: 1-6` (semantic + default visual), `size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL"` (visual override). `Body`: `size: "XS" | "S" | "M" | "L" | "XL"`. `Detail`: `size: "S" | "M" | "L"`. All support `UNSAFE_className` for escape hatch styling.
**A11y:** `Heading` enforces semantic heading level via the `level` prop — it is impossible to render a Heading without a semantic heading element. Spectrum documents that heading levels must not skip (no h1 then h3) and warns against using `size` to override level in ways that break the visual hierarchy.
**Best at:** Semantic enforcement through component separation — the strongest heading-level enforcement of any Tier 1 system.
**Missing:** No single unified Text/Typography component (teams managing many text elements need three imports); no truncation/clamping prop; no `as` polymorphic prop on Body.

---

## carbon
**Component:** Heading + Body (separate components, plus type tokens)
**Approach:** Carbon defines two type scale philosophies — Productive (optimized for long-form reading at standard sizes) and Expressive (fluid type that scales with viewport for marketing/editorial). The Productive scale uses fixed sizes; the Expressive scale uses CSS clamp() for fluid responsive sizing between breakpoints. Carbon provides `heading-01` through `heading-07` tokens and `body-01`/`body-02`/`body-compact-01`/`body-compact-02` for text. Components: `<Heading>` (renders h1-h6 based on context) and `<Body>` for paragraph text. Carbon's scale is IBM Plex-native with specific optical adjustments.
**Key Decisions:**
- [HIGH] Productive vs. Expressive dual scale: Productive for UI/app contexts (fixed px values), Expressive for marketing/editorial (fluid vw-based scaling) — the only Tier 1 system with two explicitly named type philosophies
- [HIGH] Fluid responsive type in Expressive: `heading-04` through `heading-07` in Expressive use CSS clamp() to fluidly scale between breakpoint min/max sizes — no media query jumps
- [MED] Compact body variants: `body-compact-01` and `body-compact-02` use tighter line height (1.29 vs 1.43) for data-dense enterprise UI — explicit density support at the type level
**Notable API:** Type tokens: `$heading-01` through `$heading-07`, `$body-01`, `$body-02`, `$body-compact-01`, `$body-compact-02`, `$display-01` through `$display-04`. Components: `<Heading>` (auto heading level via context), `<Body>` with token application via className.
**A11y:** Carbon's `<Heading>` component automatically calculates the correct heading level based on its nesting context within Carbon's section components — preventing developers from manually managing heading hierarchy. Minimum body text size is 14px (`body-compact-01`), above the WCAG-recommended 12px minimum.
**Best at:** The Productive/Expressive dual scale is unique in Tier 1, and the fluid responsive type in Expressive is the most sophisticated responsive typography approach.
**Missing:** No polymorphic `as` prop; no truncation/clamping utilities; the dual scale can be confusing for teams that only need one approach.

---

## polaris
**Component:** Text
**Approach:** Polaris uses a single `Text` component with `variant` and `as` props to handle all typographic needs. The `variant` prop selects from a semantic scale (headingXl, headingSm, bodyMd, bodySm, etc.) while `as` controls the rendered HTML element independently. This decoupling is intentional — a navigation heading might use `variant="headingSm"` but render as `<h2>` for semantic correctness. Polaris also provides `tone` for semantic color (critical, caution, success, subdued) and `fontWeight` override. The scale is built on Inter.
**Key Decisions:**
- [HIGH] Single Text component for everything: headings, body, captions, and labels all use `<Text>` with different `variant` values — minimal API surface, one import for all typography needs
- [HIGH] `variant` (visual) and `as` (semantic) are independent: `variant="headingLg" as="h3"` lets visual and semantic levels diverge when layout demands it — the most explicit decoupling in Tier 1
- [MED] `tone` prop for semantic color: `critical`, `caution`, `success`, `subdued`, `text-inverse` — semantic color applied at the typography level, not via a separate color utility
- [MED] `truncate` boolean: single-line text truncation with ellipsis — built into the Text component, not a separate utility
**Notable API:** `variant: "headingXl" | "headingLg" | "headingMd" | "headingSm" | "headingXs" | "bodyLg" | "bodyMd" | "bodySm" | "bodyXs"`; `as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "legend"` etc.; `tone: "critical" | "caution" | "success" | "subdued" | "text-inverse"`; `fontWeight: "regular" | "medium" | "semibold" | "bold"`; `truncate: boolean`; `alignment: "start" | "center" | "end" | "justify"`.
**A11y:** The `as` prop puts semantic responsibility on the developer — Polaris documentation explicitly warns that `variant` does not determine heading level and developers must choose `as` correctly. The `breakWord` prop prevents text overflow for long strings without whitespace.
**Best at:** The single-component approach with independent `variant`/`as` props is the most flexible API in Tier 1, and the `tone` prop for semantic text color is a practical addition other systems lack.
**Missing:** No multi-line clamping (only single-line `truncate`); no responsive variant switching; no Expressive/fluid type scale.

---

## atlassian
**Component:** Heading + Text (separate components, plus typography tokens)
**Approach:** Atlassian provides `Heading` (renders heading elements with visual size) and a general-purpose utility for body text through design tokens. Heading levels are specified via a `size` prop mapping: `size="xxlarge"` through `size="xsmall"` correspond to visual sizes while `as` controls the heading element. Atlassian's token system (`font.heading.xlarge`, `font.body.large`, etc.) provides shorthand font tokens that bundle family, weight, size, and line height into a single token — applied via `@atlaskit/css`. The type scale is built on Charlie Display (headings) and Charlie Text (body).
**Key Decisions:**
- [HIGH] Shorthand font tokens: `font.heading.xlarge` is a single token that sets family, weight, size, and line height in one declaration — fewer tokens to manage compared to M3's per-property approach
- [HIGH] Separate heading fonts: Atlassian uses Charlie Display for headings and Charlie Text for body — a two-font strategy that optimizes each for its use case
- [MED] `size` + `as` on Heading: similar to Polaris, visual size and semantic element are independent — `size="large" as="h3"` is valid
- [MED] `color` prop on Heading: `color="color.text"`, `color="color.text.subtle"`, `color="color.text.inverse"` — semantic text color applied directly
**Notable API:** `Heading`: `size: "xxlarge" | "xlarge" | "large" | "medium" | "small" | "xsmall"`, `as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span"`, `color`. Tokens: `font.heading.*`, `font.body.*`, `font.code.*`. No dedicated Body/Text component in the core package — body text uses tokens directly.
**A11y:** Heading enforces that an `as` prop is required — it will not default to `<h1>` and force developers to make a conscious semantic choice. Atlassian's documentation includes heading hierarchy guidance specifically for Jira-like dense UIs where heading levels must remain correct despite visual compactness.
**Best at:** Shorthand font tokens that bundle all properties into one token, and the required `as` prop on Heading that forces deliberate semantic decisions.
**Missing:** No dedicated Body/Text component (body text uses tokens directly, which lacks component-level API for truncation, alignment, etc.); no responsive type; no truncation utilities.

---

## ant-design
**Component:** Typography (Typography.Title, Typography.Text, Typography.Paragraph)
**Approach:** Ant Design provides a Typography family with three sub-components: `Typography.Title` for headings (h1-h5 via `level` prop), `Typography.Text` for inline text, and `Typography.Paragraph` for block text. The signature feature is built-in interactive capabilities: `editable` (inline edit mode), `copyable` (copy-to-clipboard button), and `ellipsis` (truncation with expand/tooltip). These are practical features for enterprise admin panels where text content is often editable or needs truncation in tables. The type scale has 5 heading levels mapped directly to h1-h5.
**Key Decisions:**
- [HIGH] Interactive text features (editable, copyable, ellipsis): Typography.Text and Typography.Paragraph include inline editing, copy-to-clipboard, and multi-line truncation — these are not text styling features but interaction patterns built into the typography component
- [HIGH] `ellipsis` with multi-line clamping: `ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}` supports multi-line truncation with an expand action — the most advanced truncation API in Tier 1
- [MED] `level` prop maps to heading elements: `Typography.Title level={2}` renders `<h2>` — straightforward mapping but limited to 5 levels (no h6)
- [MED] `type` for semantic color: `type="secondary" | "success" | "warning" | "danger"` — semantic text color at the component level
**Notable API:** `Typography.Title`: `level: 1-5`, `editable`, `copyable`, `ellipsis`. `Typography.Text`: `type: "secondary" | "success" | "warning" | "danger"`, `disabled`, `keyboard`, `code`, `mark`, `underline`, `delete`, `strong`, `italic`, `editable`, `copyable`, `ellipsis`. `Typography.Paragraph`: same as Text plus block semantics. `ellipsis: boolean | { rows, expandable, suffix, symbol, tooltip, onExpand }`.
**A11y:** Typography.Title renders semantic heading elements. The `editable` mode uses `aria-label` for the edit trigger. `ellipsis` with `tooltip` provides accessible full-text reveal for truncated content. `keyboard` style (`<kbd>` element) uses correct semantic markup.
**Best at:** The `ellipsis` API with multi-line clamping, expandable, and tooltip is the most comprehensive truncation solution in Tier 1. The `editable` and `copyable` props make Ant Design's Typography uniquely suited for admin/dashboard UIs.
**Missing:** No responsive type scale; no fluid typography; only 5 heading levels (no h6); no polymorphic `as` prop (element is determined by sub-component choice).