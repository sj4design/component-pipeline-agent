---
component: typography
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Typography — Cross-System Research

> **Architecture note:** Typography is unique among all design system components in that most systems treat it as BOTH a token foundation AND a renderable component. This research documents both perspectives honestly. The central architectural debate — tokens-only vs. wrapper component — runs through every decision below and should be resolved before any other typography prop is specified.

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| Material Design 3 | Deliberate tokens-only approach; no `<Typography>` component exists | CSS custom properties (`--md-sys-typescale-*`) applied directly to HTML elements |
| shadcn/ui | BYO typography; provides Tailwind prose classes and a recipe showing raw HTML elements | Tailwind utility classes (`text-lg`, `font-semibold`) or consumer-built `<Typography>` wrapper |
| Atlassian (body text) | `Heading` component exists; body text uses design tokens directly via `@atlaskit/css` rather than a `<Body>` component | `font.body.*` tokens applied via Atlaskit CSS utilities |

---

## How Systems Solve It

### Material Design 3 — Tokens-Only (No Component)

M3 defines the most granular semantic type scale among all 24 systems: 5 roles (Display, Headline, Title, Body, Label) × 3 sizes (Large, Medium, Small) = 15 type tokens. Each token independently specifies font family, weight, size, line height, and letter spacing as separate CSS custom properties. There is no `<Typography>` component — this is a deliberate architectural choice. M3 treats typography as a CSS concern, not a component concern: tokens are applied via CSS to whatever HTML elements are semantically appropriate. This enforces native HTML heading semantics because there is no component intermediary to accidentally render a `<div>` instead of an `<h2>`.

The 5-role taxonomy (Display → Headline → Title → Body → Label) is the most semantically precise in Tier 1. Display and Headline serve hero and editorial contexts; Title handles section and card headings; Body is reading text; Label is UI chrome text. The Label role covers situations that most systems leave to ad-hoc styling: button labels, form field labels, caption text, chip labels. The density system uses Label and Body at compact sizes, Display and Headline at hero sizes — the scale covers all UI contexts without ad-hoc overrides.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Tokens-only, no component | Typography is a CSS concern; component abstraction adds a layer without solving a real problem when native HTML semantics are correct | HIGH | Forces teams to understand HTML heading semantics; prevents "just use the component and it will be right" shortcuts |
| 15 tokens (5 roles × 3 sizes) | Display/Headline/Title/Body/Label × Large/Medium/Small covers all UI contexts; explicit slot for every typography use case | HIGH | Use the 5-role taxonomy as a semantic model even if you ship a component; it prevents ad-hoc "I need something between h3 and body text" tokens |
| Per-token independent font axes | Each token can independently set family, weight, size, line height, tracking — no shared base | MED | Allows optical adjustments per level (display text gets wider tracking; compact body gets tighter line height) |

**Notable API:** CSS custom properties: `--md-sys-typescale-{role}-{size}-font`, `-size`, `-line-height`, `-weight`, `-tracking`. No component props.

**Accessibility:** Heading hierarchy (h1-h6) must be semantic regardless of visual type scale choice. Display and Headline roles do not map to heading levels — developers map visual style to semantic level independently, which is semantically correct but requires discipline.

---

### Spectrum (Adobe) — Separate Components: Heading + Body + Detail

Spectrum splits typography into three purpose-built components rather than one polymorphic component. `Heading` always renders a heading element — it is semantically impossible to use `<Heading>` and get a `<div>`. `Body` handles paragraph and inline text. `Detail` covers small UI text: captions, labels, metadata. Each component accepts a `size` prop that overrides the default visual size without changing the semantic element.

The separation enforces semantic intent at the component API level: a developer choosing `<Heading>` has explicitly declared "this is a heading." Choosing `<Body>` declares "this is paragraph text." The three-component split is the strongest heading-level enforcement of any Tier 1 system — you cannot accidentally render a heading as a `<span>` because there is no way to express that with the Heading component.

The cost is import overhead: teams managing many text elements need three separate imports. The `UNSAFE_className` escape hatch handles cases where the component's built-in styles need overriding, following Spectrum's pattern for all escape hatches.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Three separate components (Heading/Body/Detail) | Semantic intent declared at component selection; `<Heading>` always renders a heading element — semantic enforcement by design | HIGH | Strongest semantic enforcement approach; best when you want to prevent semantic errors at the API level |
| `level` prop on Heading controls both semantics and default size | `level={1}` renders `<h1>` and defaults to the largest heading size — coupled by default, decoupled when `size` is also specified | HIGH | Default coupling is helpful; explicit `size` override allows visual-semantic divergence when needed |
| XXXL size for display/hero text | Optical sizing adjustments at very large sizes are necessary; heading component needs display-scale support | MED | One component covers both UI headings and marketing display text |

**Notable Props:** `Heading`: `level: 1-6`, `size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL"`. `Body`: `size: "XS" | "S" | "M" | "L" | "XL"`. `Detail`: `size: "S" | "M" | "L"`. All: `UNSAFE_className`.

**Accessibility:** `Heading` enforces semantic heading level via the `level` prop. Spectrum documents that heading levels must not skip and warns against using `size` to override level in ways that break visual hierarchy.

---

### Carbon (IBM) — Separate Components + Productive/Expressive Dual Scale

Carbon is the only system across all 24 with two explicitly named type scale philosophies: Productive (fixed px values, optimized for long-form reading in application UIs) and Expressive (fluid CSS clamp() scaling between breakpoints, for marketing and editorial). The Productive scale defines `heading-01` through `heading-07` and `body-01`/`body-02`/`body-compact-01`/`body-compact-02`. The Expressive scale uses `heading-04` through `heading-07` with fluid responsive sizing — no media query jumps, continuous scaling between breakpoint min/max sizes.

The `body-compact-01` and `body-compact-02` variants (tighter line height: 1.29 vs. 1.43) provide explicit density support at the type level — a design system decision that acknowledges IBM's enterprise products need data-dense layouts without sacrificing legibility. Carbon's `<Heading>` component auto-calculates the correct heading level based on nesting context within Carbon's section components, removing the burden of manual heading level management from developers.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Productive vs. Expressive dual scale | IBM products span application UI (Productive) and marketing/editorial (Expressive); one scale cannot serve both optimally | HIGH | Consider a dual scale if your product has both app UI and marketing contexts; Carbon documents when to use each |
| Fluid responsive type in Expressive (CSS clamp) | No media query jumps; type scales continuously between viewport sizes | HIGH | Fluid scaling is superior to discrete breakpoint jumps for editorial text; consider for display and headline sizes |
| Compact body variants (tighter line height) | Data-dense enterprise UI needs denser text without affecting legibility | MED | Add compact variants if your product has data tables or dense information panels |
| Auto heading level via context | Prevents manual heading hierarchy errors in complex page layouts | MED | Auto-heading is a DX improvement but requires understanding how Carbon's section context works |

**Notable Props:** Type tokens: `$heading-01` through `$heading-07`, `$body-01`, `$body-02`, `$body-compact-01`, `$body-compact-02`, `$display-01` through `$display-04`. Components: `<Heading>` (auto level), `<Body>`.

**Accessibility:** Auto heading level from context prevents skipped heading levels. Minimum body text size is 14px (`body-compact-01`), above the WCAG 12px minimum.

---

### Polaris (Shopify) — Single Text Component

Polaris uses one `Text` component for all typographic needs: headings, body, captions, labels, and any other text. `variant` controls the visual style (selected from the semantic scale); `as` controls the rendered HTML element independently. This explicit decoupling — `variant="headingLg" as="h3"` — is the clearest visual-semantic decoupling in Tier 1. A navigation heading that looks like `headingSm` but is semantically `h2` for correct document outline is expressed directly in the prop combination.

The `tone` prop brings semantic text color into the typography component: `critical`, `caution`, `success`, `subdued`, `text-inverse`. Other systems apply semantic color via utility classes or separate color props on parent containers; Polaris treats semantic text color as a typography-level concern. The `truncate` boolean provides single-line ellipsis truncation; `breakWord` prevents overflow for long unbreakable strings.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Single Text component for all typography | One import for all text needs; minimal API surface; enforces consistent text styling | HIGH | Simplest API approach; visual/semantic decoupling via `variant`/`as` covers most cases |
| `variant` (visual) and `as` (semantic) are independent | Layout demands sometimes require visual style and semantic level to diverge; explicit props make this visible and intentional | HIGH | Universal pattern — consider this as the default API shape for any polymorphic typography component |
| `tone` prop for semantic text color | Semantic color is part of typography intent; separating it to utility classes fragments the text API | MED | Semantic text tones (critical/caution/success/subdued) belong at the typography component level |
| `truncate` boolean (single-line) | Truncation is a very common text handling need; built-in avoids separate utility | MED | Single-line only; multi-line clamping (Chakra/Gestalt/Mantine) requires separate implementation |

**Notable Props:** `variant: "headingXl" | "headingLg" | "headingMd" | "headingSm" | "headingXs" | "bodyLg" | "bodyMd" | "bodySm" | "bodyXs"`, `as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "legend"`, `tone: "critical" | "caution" | "success" | "subdued" | "text-inverse"`, `fontWeight: "regular" | "medium" | "semibold" | "bold"`, `truncate: boolean`, `alignment: "start" | "center" | "end" | "justify"`

**Accessibility:** `as` prop puts semantic responsibility explicitly on the developer. Polaris documentation warns that `variant` does not determine heading level. `breakWord` prevents text overflow for long strings without whitespace.

---

### Atlassian — Heading + Tokens (No Body Component)

Atlassian provides a `Heading` component (visual size + `as` for element override) and design tokens for body text. The distinct absence of a `<Body>` or `<Text>` component means body text styling is applied via tokens directly in CSS rather than through a React component — a hybrid approach that avoids the overhead of a React wrapper for the most common text element while still providing component-level ergonomics for headings.

The shorthand font tokens are distinctive: `font.heading.xlarge` is a single token that bundles family, weight, size, and line height in one CSS shorthand declaration. This reduces the number of token references compared to M3's per-property approach (5 tokens vs. 1 token per text level). Atlassian uses two separate fonts: Charlie Display for headings and Charlie Text for body — a two-font strategy that optimizes readability at each scale extreme.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Shorthand font tokens (one token = family + weight + size + line-height) | Fewer references to manage; one token update cascades all properties | HIGH | Shorthand font tokens are more maintainable than per-property tokens; consider this token architecture for foundational typography |
| No dedicated Body/Text component | Body text is the most common element; React wrapper adds overhead without semantic value | MED | Hybrid approach works but creates a gap in the component API for truncation and alignment at the body level |
| Required `as` prop on Heading | Forces deliberate semantic decisions; no accidental `<h1>` default | HIGH | Requiring `as` prevents the most common heading error (wrong level) from being silently committed |
| Two-font strategy (Charlie Display + Charlie Text) | Each font is optimized for its scale range; display fonts need different optical properties than reading fonts | MED | Relevant for systems with dedicated brand typefaces; not applicable to systems using system fonts |

**Notable Props:** `Heading`: `size: "xxlarge" | "xlarge" | "large" | "medium" | "small" | "xsmall"`, `as: "h1"-"h6" | "div" | "span"`, `color`. Tokens: `font.heading.*`, `font.body.*`, `font.code.*`.

**Accessibility:** `as` prop required on Heading — forces deliberate semantic decisions. Heading hierarchy guidance for dense Jira-like UIs documented explicitly.

---

### Ant Design — Typography Family (Title + Text + Paragraph)

Ant Design's Typography is the most interactive typography implementation across all 24 systems. `Typography.Text` and `Typography.Paragraph` include `editable` (inline edit mode), `copyable` (copy-to-clipboard button), and `ellipsis` (truncation with expand/tooltip). These are interaction patterns built into the typography component, not text styling features. The `ellipsis` API is the most advanced truncation solution in Tier 1: multi-line clamping (`rows: 3`), expandable toggle, suffix text, tooltip for full content, and `onExpand` callback.

The `level` prop on `Typography.Title` directly maps to `<h1>`-`<h5>` elements — straightforward but limited to 5 levels (no h6). The `type` prop provides semantic text color: `secondary`, `success`, `warning`, `danger`. The `code`, `mark`, `keyboard`, `underline`, `delete`, `strong`, `italic` inline style props cover the full range of semantic inline text formatting needs.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `editable` inline edit mode | Admin/dashboard UIs frequently need in-place text editing (record names, descriptions) without a separate edit form | HIGH | Reference this if your product needs inline text editing; Ant Design's implementation is the most production-tested |
| `copyable` copy-to-clipboard | Developer tools, API keys, code snippets need one-click copy without custom implementation | HIGH | Use the copyable prop rather than building a custom copy button for code/key display contexts |
| `ellipsis` with multi-line clamping and expand | Most complex truncation use case: multiple visible lines, expand/collapse toggle, tooltip for full content, onExpand callback | HIGH | Most complete truncation API in T1; reference for any multi-line truncation implementation |
| Comprehensive inline style props (`code`, `mark`, `keyboard`, etc.) | Admin panels need to display diverse content types (API responses, keyboard shortcuts, marked text) with correct semantic HTML | MED | `<kbd>` for keyboard, `<code>` for inline code, `<mark>` for highlighted text — semantic HTML from convenient boolean props |

**Notable Props:** `Typography.Title`: `level: 1-5`. `Typography.Text`: `type` (secondary/success/warning/danger), `disabled`, `keyboard`, `code`, `mark`, `underline`, `delete`, `strong`, `italic`, `editable`, `copyable`, `ellipsis`. `ellipsis: { rows, expandable, suffix, symbol, tooltip, onExpand }`.

**Accessibility:** Title renders semantic heading elements. `editable` mode uses `aria-label` for edit trigger. `ellipsis` with `tooltip` provides accessible full-text reveal for truncated content. `keyboard` style uses `<kbd>` semantic markup.

---

### Twilio Paste — Heading + Paragraph + Display + DetailText

Paste provides separate named components per text role: `Heading` (requires `as` h1-h6 for HTML element, `variant` for visual style heading10-heading60), `Paragraph` for block text, `DisplayHeading` for hero/marketing display text, and `DetailText` for captions and supplementary text. Responsive sizing is manual — developers set variants per breakpoint, no automatic responsive behavior.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Named components per text role | Enforced semantic usage; Heading cannot render a div | HIGH | Strongest semantic enforcement after Spectrum; clear component choice signals clear intent |
| `marginBottom` prop on Heading | Twilio Console layouts need consistent spacing below headings; built-in spacing avoids utility class reliance | MED | Useful DX improvement; typography spacing should be predictable and consistent |

**Notable Props:** `Heading`: `as` (h1-h6 required), `variant` (heading10-heading60). `Paragraph`: block text. `DisplayHeading`: hero scale. `DetailText`: captions.

**Accessibility:** `Heading` enforces semantic heading level via required `as` prop. Documents heading-level skipping as a violation.

---

### Salesforce Lightning — SLDS Type Ramp + Utility Classes

SLDS defines a type ramp with utility classes (`slds-text-heading_large`, `slds-text-body_regular`) applied directly to HTML elements, plus `lightning-formatted-text` for linkification and sanitization. The utility class approach is class-based like GOV.UK rather than component-based — no React wrapper for text styling. `lightning-formatted-text` handles displaying user-entered text safely with automatic URL linkification.

**Notable Props:** Utility classes: `slds-text-heading_large`, `slds-text-heading_medium`, `slds-text-body_regular`, `slds-text-body_small`. Component: `lightning-formatted-text` for safe user content.

**Accessibility:** Standard heading hierarchy via utility classes; `lightning-formatted-text` sanitizes user content preventing XSS.

---

### GitHub Primer — Heading + Text

Primer's `Heading` component with `as` prop (h1-h6) for the semantic element and `sx` prop for style overrides. `Text` as a general-purpose typography primitive with `fontSize`, `fontWeight`, `color` via the `sx` prop. The `sx` prop supports responsive values via array syntax (`fontSize={[2, 4]}`) for mobile/desktop size differences — the most explicit T2 system for responsive typography. No dedicated type scale components; the scale is expressed via design tokens referenced in `sx`.

**Notable Props:** `Heading`: `as` (h1-h6), `sx` (responsive values). `Text`: `fontSize`, `fontWeight`, `color`, all responsive via `sx` array syntax.

**Accessibility:** `as` prop on Heading provides semantic control; `sx` responsive arrays allow type scale adjustment without duplicating components.

---

### Playbook (eBay/PayPal) — Title + Body + Caption + Detail

Granular named components per text role: `Title` (sizes 1-4 mapping to h1-h4), `Body` for paragraphs, `Caption` and `Detail` for secondary text. `tag` prop on each component overrides the rendered HTML element independently of visual style. Dual React/Rails rendering. The most granular named-component set in T2.

**Notable Props:** `Title` with `tag` override; `Body` with `color`, `dark` props; `Caption`, `Detail` for secondary text.

**Accessibility:** `Title` always renders a heading element; `tag` prop allows semantic override when needed.

---

### REI Cedar — CdrText

Single polymorphic `CdrText` component; `tag` prop controls any valid HTML element. Visual styling via modifier classes or design tokens rather than built-in variants. No built-in type scale variants — relies on Cedar's token-based type ramp applied via CSS. The single-primitive polymorphic alternative to named-component approaches.

**Notable Props:** `tag` prop (any valid HTML element); styling via tokens/modifier classes.

**Accessibility:** `tag` prop puts semantic responsibility on developer; same tradeoff as Polaris `as`.

---

### Radix UI (Themes) — Text + Heading + Em + Strong + Quote + Code

Radix Themes provides styled primitives: `Text`, `Heading`, `Em`, `Strong`, `Quote`, `Code`. `size` scale of 1-9 for Text; `weight`, `color`, polymorphic `as` prop. The `trim` prop (normal/start/end/both) is unique across all 24 systems: it removes extra whitespace above and below text caused by line-height, enabling precise optical vertical alignment to ink bounds rather than line box. Radix Primitives (headless) has no typography at all.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `trim` prop for leading trim | Removes extra whitespace from line-height for precise optical alignment; solves a longstanding CSS pain point for pixel-perfect vertical rhythm | MED | Highly practical for design-system-aligned layouts where text must optically align with icons or borders |

**Notable Props:** `Text`: `size` (1-9), `weight`, `color`, `trim`, `as`. `Heading`: `size`, `weight`, `align`, `trim`. All: `as` polymorphic.

**Accessibility:** Polymorphic `as` prop puts semantic responsibility on developer; Heading component defaults to `<h1>` — developers must override.

---

### Chakra UI — Heading + Text

`Heading` with `as` (h1-h6) and `size` (4xl-xs); `Text` with `fontSize`, `noOfLines` for multi-line clamping, `isTruncated` for single-line ellipsis. Both support responsive values via object syntax (`fontSize={{ base: 'md', md: 'lg' }}`). Color mode aware (light/dark mode). `noOfLines` is the cleanest multi-line clamping API in T3 — a number that limits visible lines with CSS -webkit-line-clamp under the hood.

**Notable Props:** `Heading`: `as`, `size` (4xl-xs). `Text`: `fontSize`, `noOfLines` (multi-line clamp), `isTruncated`, responsive object syntax.

**Accessibility:** `as` prop provides semantic control; `noOfLines` content is still fully read by screen readers (full text accessible even when visually clamped).

---

### GOV.UK — Class-Based Type System

GOV.UK uses `govuk-frontend` utility classes: `govuk-heading-xl`, `govuk-heading-l`, `govuk-body`, `govuk-caption-l`, etc. No React wrapper. Font is GDS Transport (government-mandated). Responsive sizing is fully automatic — `govuk-heading-xl` renders smaller on mobile without developer intervention. The only T3 system with fully automatic responsive type. Strict heading hierarchy enforcement in documentation; skipping levels is documented as a compliance failure.

**Notable Props:** Classes: `govuk-heading-{xl|l|m|s}`, `govuk-body`, `govuk-body-{l|s}`, `govuk-caption-{xl|l|m}`, `govuk-lead`.

**Accessibility:** Fully automatic responsive sizing; strict heading hierarchy enforcement; GDS Transport chosen for legibility at all sizes.

---

### Base Web (Uber) — Named Component Per Ramp Step

The most extreme named-component approach: one component per type ramp step. `HeadingXSmall` through `HeadingXXLarge`, `ParagraphSmall` through `ParagraphLarge`, `LabelSmall` through `LabelLarge`, `DisplayLarge` through `DisplaySmall`, plus mono variants — 20+ typography components total. Each renders the appropriate HTML element by default; no `as` prop. This eliminates invalid prop combinations (cannot set `size="xl"` on a `Caption` because Caption is not a prop-driven component) at the cost of a very large API surface.

**Notable Props:** Component name determines both visual style and semantic element. `color` prop for semantic color tokens. `overrides` for deep customization.

**Accessibility:** Component name determines HTML element — no developer choice needed or possible; prevents semantic errors but also prevents valid visual-semantic divergence.

---

### Fluent 2 (Microsoft) — Text + Named Role Components

`Text` as the base primitive with `size` (100-1000), `weight`, `font`, `align`, `wrap`, `truncate`, `block` props. Specialized role components: `Title1`-`Title3`, `Subtitle1`-`Subtitle2`, `Body1`-`Body2`, `Caption1`-`Caption2`, `LargeTitle`. `as` prop for polymorphic rendering. `Text` renders `<span>` by default (inline); `Body` renders `<p>` (block). The distinction between inline and block rendering is explicitly documented.

**Notable Props:** `Text`: `size` (100-1000), `weight`, `font`, `align`, `wrap`, `truncate`, `block`, `as`. Specialized: `Title1`-`Title3`, `Subtitle1`-`Subtitle2`, `Body1`-`Body2`, `Caption1`-`Caption2`.

**Accessibility:** `Text` is inline by default (`<span>`); `block` prop or `Body` component for block context; prevents reading-order issues in block layouts. `as` prop for semantic override.

---

### Gestalt (Pinterest) — Heading + Text

`Heading` with `accessibilityLevel` (1-6, **required**) that controls both semantic HTML and visual size by default. `size` prop (100-600) for visual override. `Text` with `size` (100-600), `weight`, `color` (semantic tokens), `lineClamp` (multi-line truncation), `overflow` (truncation mode). `title` prop on truncated Text automatically surfaces the full text as a native tooltip — the most complete truncation solution across all 24 systems.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `accessibilityLevel` required on Heading | Cannot render a Heading without declaring its semantic level; the strongest a11y enforcement across all 24 systems | HIGH | Consider making the semantic level prop required rather than optional; prevents the most common heading error |
| `lineClamp` + auto-tooltip via `title` prop | Multi-line truncation hides content; auto-tooltip surfaces it — solves the discoverability problem of hidden content | HIGH | Reference this combined approach for any truncation implementation; truncated content must be accessible |
| `color` restricted to semantic tokens | Prevents developers from setting arbitrary low-contrast color values; all colors in the `color` prop pass WCAG AA | MED | Restricting color to semantic tokens is the right default; provide an escape hatch only when needed |

**Notable Props:** `Heading`: `accessibilityLevel` (1-6, required), `size` (100-600). `Text`: `size`, `weight`, `color`, `lineClamp`, `overflow`, `title`.

**Accessibility:** `accessibilityLevel` required — strongest heading enforcement in all 24 systems. `color` restricted to WCAG AA-passing tokens. `lineClamp` content fully read by screen readers; `title` prop provides accessible tooltip for truncated content.

---

### Mantine — Title + Text + Highlight + Mark + Code + Blockquote

`Title` with `order` (1-6) mapping to h1-h6, `size` for visual override. `Text` with `size` (xs-xl or px number), `fw` (font weight), `c` (color), `truncate` (true/end/start), `lineClamp` (multi-line). `Highlight` for text highlighting with custom color. `Mark` for `<mark>` semantic HTML. Responsive props via object syntax. `gradient` prop on Text for gradient text rendering. The broadest typography component family in T3.

**Notable Props:** `Title`: `order` (1-6), `size`. `Text`: `size`, `fw`, `c`, `truncate`, `lineClamp`, `gradient`. `Highlight`: highlight query terms. `Mark`, `Code`, `Blockquote` as semantic wrappers.

**Accessibility:** `order` on Title corresponds directly to heading level; `lineClamp` content fully accessible; responsive props available.

---

### Orbit (Kiwi.com) — Heading + Text

`Heading` with `type` (title1-title6, display, displaySubtitle). `Text` with `type` (primary/secondary), `size` (small/normal/large), `weight`. `as` prop for element override. Travel-domain optimized for mobile legibility. Built-in responsive behavior.

**Notable Props:** `Heading`: `type` (title1-title6/display/displaySubtitle), `as`. `Text`: `type`, `size`, `weight`, `as`.

**Accessibility:** `as` prop for semantic override; built-in responsive sizing.

---

### Evergreen (Segment) — Heading + Text + Paragraph + Strong + Code + Pre + Link

Multiple named components: `Heading` (size 100-900), `Text` (size 300-600), `Paragraph` as semantic block wrapper with margin. All accept `is` prop for polymorphic rendering (Evergreen's equivalent of `as`). Minimal API surface.

**Notable Props:** `Heading`: `size` (100-900), `is` polymorphic. `Text`: `size` (300-600). `Paragraph` semantic block. `Strong`, `Code`, `Pre`, `Link` semantic wrappers.

**Accessibility:** `is` prop for semantic control; named semantic wrappers for inline elements.

---

### Nord (Nordhealth) — nord-heading + nord-text (Web Components)

`<nord-heading>` with `level` (h1-h6) controlling both semantics and visual size. `size` for visual override. `<nord-text>` for body text. Healthcare-context type scale optimized for clinical interface legibility. Web components for cross-framework portability in clinical systems.

**Notable Props:** `nord-heading`: `level` (h1-h6), `size`. `nord-text`: body text web component.

**Accessibility:** `level` controls both HTML element and visual size by default; same coupled approach as M3's semantic roles.

---

### Wise Design — Typography (Text + Title)

`Text` and `Title` components following Wise's product type scale. Size tokens tied to Wise spacing system. Financial product context drives conservative, legibility-first type choices. Low confidence — limited public documentation.

---

### Dell Design System — Typography (Heading + Body + Caption)

Enterprise type ramp with heading levels and body sizes. Dell brand typography guidelines (specific font families). Size scale aligned to Dell grid system. Density-aware sizing for compact enterprise UIs. Low confidence — limited public documentation.

---

## Pipeline Hints

### Archetype Recommendation

**Single polymorphic Text component with `variant` + `as` decoupling** (Polaris model) is the recommended archetype for a general-purpose design system typography component.

Rationale: The single-component approach (Polaris, Chakra, Mantine Text, Radix Text) offers the lowest import overhead and the most composable API. The `variant`/`as` decoupling pattern is universally validated — it appears in every serious typography implementation regardless of architecture. Named-component-per-role (Spectrum, Paste, Base Web) offers stronger semantic enforcement but at the cost of multiple imports and a larger API surface. Tokens-only (M3, shadcn/ui) is architecturally cleanest but leaves truncation, alignment, and semantic text color unaddressed at the component level.

Exception: if semantic enforcement is a critical product requirement (preventing `<div>` headings is a must-have, not a nice-to-have), consider the named-component approach (Spectrum/Paste) or required semantic props (Gestalt's required `accessibilityLevel`).

---

### Central Architectural Debate: Tokens-Only vs. Wrapper Component

| Approach | Examples | Pros | Cons |
|----------|---------|------|------|
| Tokens-only (no component) | M3, shadcn/ui, SLDS, Atlassian (body) | Native HTML semantics enforced; no component overhead; maximum flexibility for developers who know CSS | No component-level truncation, alignment, or semantic color; each team re-implements common patterns |
| Named components per role | Spectrum (Heading/Body/Detail), Paste (Heading/Paragraph/Display/DetailText), Base Web (30+ components) | Strongest semantic enforcement; impossible to misuse; clear intent at component selection | Multiple imports; large API surface; over-engineering for simple text needs |
| Single polymorphic component | Polaris (Text), Chakra (Text), Mantine (Text), Radix Themes (Text) | One import; flexible `variant`/`as` decoupling; covers all cases with one API | `as` prop puts semantic responsibility on developer; can be misused (wrong element for visual style) |
| Component + token hybrid | Carbon, Atlassian | Components for headings (most semantic-error-prone); tokens for body text (most common, lowest risk) | Inconsistent API — some text uses components, some uses tokens; onboarding confusion |

**Recommended resolution:** Start with a single polymorphic Text component (`variant` + `as`). Add semantic enforcement via documentation and lint rules rather than API constraints. If semantic heading errors are a systemic problem after launch, consider requiring the semantic element prop.

---

### Slot Consensus Table

| Slot | Systems with it | Notes |
|------|----------------|-------|
| Visual variant/size | 22/24 | All except M3 (tokens only) and SLDS (utility classes) |
| Semantic element control (`as`/`tag`/`level`) | 20/24 | Universal in component approaches; absent only in tokens-only and some named-component systems (Base Web) |
| Font weight override | 18/24 | Most systems; sometimes named (regular/medium/semibold/bold), sometimes numeric |
| Text color (semantic) | 16/24 | Polaris `tone`, Ant Design `type`, Gestalt `color` tokens, Mantine `c`, Fluent 2 `color` |
| Text alignment | 14/24 | Polaris `alignment`, Fluent 2 `align`, Mantine, Chakra, Radix |
| Single-line truncation | 14/24 | Polaris `truncate`, Ant Design `ellipsis`, Chakra `isTruncated`, Mantine `truncate`, Fluent 2 `truncate` |
| Multi-line clamping | 8/24 | Chakra `noOfLines`, Gestalt `lineClamp`, Mantine `lineClamp`, Ant Design `ellipsis.rows` |
| Inline semantic wrappers (`code`, `mark`, `kbd`) | Ant Design, Mantine, Evergreen, Radix | Semantic HTML for inline content types |
| `editable` / `copyable` | Ant Design only | Interactive typography features |
| `trim` (leading trim) | Radix Themes only | Optical alignment to ink bounds |
| Responsive values | Chakra (object syntax), Primer (array syntax), GOV.UK (automatic), Mantine (object syntax) | Not universal; no T1 system has automatic responsive type |

---

### Property Consensus Table

| Property | Values | Systems | Notes |
|----------|--------|---------|-------|
| `variant` / `size` | Named scale values or numbers | All component systems | Visual type scale selection |
| `as` / `tag` / `is` / `level` | HTML element string or heading number | Polaris, Chakra, Spectrum, Paste, Primer, Atlassian, Mantine, Orbit, Evergreen | Semantic element control |
| `fontWeight` / `fw` / `weight` | `"regular" \| "medium" \| "semibold" \| "bold"` or numeric | Most systems | Weight override |
| `color` / `tone` / `type` | Semantic token names | Polaris, Ant Design, Gestalt, Mantine, Fluent 2 | Semantic text color |
| `alignment` / `align` | `"start" \| "center" \| "end" \| "justify"` | Polaris, Fluent 2, Mantine, Radix | Text alignment |
| `truncate` | `boolean` or `"end" \| "start"` | Polaris, Mantine, Fluent 2, Chakra | Single-line truncation |
| `lineClamp` / `noOfLines` | `number` | Chakra, Gestalt, Mantine | Multi-line clamping |
| `ellipsis` | `boolean \| { rows, expandable, suffix, symbol, tooltip, onExpand }` | Ant Design | Most complete truncation API |
| `editable` | `boolean \| { onChange, text, tooltip }` | Ant Design | Inline edit mode |
| `copyable` | `boolean \| { text, onCopy, tooltip }` | Ant Design | Copy-to-clipboard |
| `trim` | `"normal" \| "start" \| "end" \| "both"` | Radix Themes | Leading trim for optical alignment |

---

### Boolean Properties Table

| Property | Default | Effect |
|----------|---------|--------|
| `truncate` | `false` | Single-line ellipsis truncation |
| `breakWord` | `false` | Break long words to prevent overflow (Polaris) |
| `block` | `false` | Render as block element (Fluent 2 Text defaults to `<span>`) |
| `isTruncated` | `false` | Single-line truncation (Chakra, alias of truncate) |
| `highContrast` | `false` | High-contrast mode (Radix) |
| `strong` / `italic` / `underline` / `delete` | `false` | Inline formatting (Ant Design) |
| `code` / `mark` / `keyboard` | `false` | Semantic inline type (Ant Design) |

---

### State Coverage Table

| State | Systems with it | Notes |
|-------|----------------|-------|
| Default (resting) | 24/24 | Standard rendered text |
| Truncated (single-line) | 14/24 | Ellipsis on overflow; `truncate` prop |
| Clamped (multi-line) | 8/24 | `-webkit-line-clamp` under hood; `lineClamp`/`noOfLines` |
| Expanded (after clamp expand) | Ant Design, Gestalt (via tooltip) | Reveal full content after truncation |
| Editable | Ant Design | Inline edit mode; not a visual state |
| Disabled | Ant Design (`disabled`) | Desaturated text |
| Semantic color states | Most systems | Via `tone`/`type`/`color` props |

---

### Exclusion Patterns

- **`variant` does not determine the rendered HTML element** — this is explicitly documented by Polaris and is the most commonly misunderstood typography concept; `variant="headingLg"` does not render an `<h2>` unless `as="h2"` is also set.
- **Display/hero text variants (`headingXXXL`, `display`) are not suitable for body text** — size and optical adjustments are calibrated for large-scale use; do not use display variants for card headings or body text.
- **`lineClamp` / `noOfLines` does not hide content from screen readers** — the full text is still read by AT; this is intentional but must be documented to prevent developers from using clamping as a content suppression mechanism.
- **`editable` and `copyable` are mutually exclusive** on the same element (Ant Design) — a text element cannot be both editable and copyable simultaneously.
- **Inline rendering (`<span>`) for block text contexts** — Fluent 2 explicitly documents that `Text` renders a `<span>` (inline) by default; using it in a block context without `block` prop creates reading-order issues.

---

### Building Block Candidates

| Building block | Used by |
|----------------|---------|
| `<h1>`-`<h6>` for headings | All component systems |
| `<p>` for paragraph text | Carbon, Paste, Ant Design (Paragraph), Evergreen (Paragraph) |
| `<span>` for inline text | Polaris (default), Fluent 2 (default), Radix Text |
| CSS custom properties for token values | M3, Atlassian tokens, Carbon tokens |
| `CSS clamp()` for fluid responsive type | Carbon Expressive scale |
| `-webkit-line-clamp` for multi-line truncation | Chakra, Gestalt, Mantine (under the hood) |
| `text-overflow: ellipsis` for single-line truncation | All systems with `truncate` |
| `overflow: hidden` paired with truncation | All truncation implementations |
| `aria-label` for editable/copyable triggers | Ant Design |
| Leading trim CSS (`text-box: trim-both`) | Radix `trim` prop |

---

### Enum/Configuration Properties

```
// Visual variant scale (Polaris as canonical example)
type TypographyVariant =
  | "headingXl" | "headingLg" | "headingMd" | "headingSm" | "headingXs"
  | "bodyLg" | "bodyMd" | "bodySm" | "bodyXs"
  | "displayLg" | "displayMd"  // display/hero text

// Semantic element (rendered HTML)
type TypographyAs =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "p" | "span" | "div" | "label" | "legend" | "caption"

// Semantic text color (Polaris + Ant Design superset)
type TypographyTone =
  | "critical" | "caution" | "success" | "subdued"
  | "text-inverse" | "secondary" | "warning" | "danger"

// Font weight
type FontWeight = "regular" | "medium" | "semibold" | "bold"

// Text alignment
type TextAlignment = "start" | "center" | "end" | "justify"

// Truncation
type TruncateMode = boolean | "start" | "end"

// Leading trim (Radix)
type TrimMode = "normal" | "start" | "end" | "both"
```

---

### A11y Consensus

| Concern | Consensus | Notes |
|---------|-----------|-------|
| Heading level | Must match document outline regardless of visual size | `as`/`level` prop decouples visual from semantic — developer must choose correct semantic level |
| Heading level enforcement | Required prop (Gestalt `accessibilityLevel`) > required `as` (Atlassian, Paste) > optional `as` (Polaris, Chakra) | Stronger enforcement = fewer errors; required `as` is the practical balance |
| Skipping heading levels | h1 → h3 is a WCAG 2.4.6 violation | All T1-T3 systems document this; no system enforces it automatically except Carbon (auto-context-based level) |
| Multi-line clamping | Full text still read by screen readers (intentional) | Must document this behavior; `title`/tooltip for truncated content (Gestalt) is the best UX |
| Color for semantic meaning | Text tone/type props must not be the sole means of conveying meaning | Error/warning colors must be paired with semantic label text |
| Font size minimum | Body text must remain legible at 200% zoom | No system uses fixed px body text; all use relative or token-based units |
| `lang` attribute | Should be set on text in a different language than the page | Under-documented across all 24 systems; a consistent gap |
| Inline vs. block rendering | `<span>` in block context creates reading-order issues (Fluent 2) | `block` prop or semantic block element required for paragraph-level text |
| APG pattern | No dedicated APG pattern for typography | Follow WCAG SC 1.3.1 (Info and Relationships) and 2.4.6 (Headings and Labels) |

---

## What Everyone Agrees On

1. **Visual size and semantic heading level must be independently controllable** — the `variant`/`as` decoupling pattern is universal. Every serious typography implementation separates what text looks like from what HTML element it renders. This is validated by 20 of 24 systems.
2. **Heading levels must not skip** — h1 → h3 is a WCAG violation. Every system that documents heading usage explicitly calls this out. Carbon's auto-context-based heading level is the most sophisticated solution; requiring the `as` prop is the most practical.
3. **Typography includes a display/hero scale** — almost all systems provide a larger-than-heading display scale for marketing and hero text. M3 Display, Carbon's `display-01`-`display-04`, Polaris `headingXl`, Spectrum XXXL, Base Web `DisplayLarge` — these are not heading levels but a separate scale.
4. **Semantic text color belongs at the typography level** — systems that provide `tone`, `type`, or `color` props on the text component are consistent: critical/warning/success/subdued are typography-level concerns, not color-utility-class concerns.
5. **Single-line truncation is a core typography feature** — 14 of 24 systems include a `truncate` or equivalent prop. This is a sufficiently common need that implementing it as a dedicated class or utility is an acceptable alternative, but the prop should exist.
6. **`code`, `mark`, and `kbd` inline semantics are typography concerns** — Ant Design, Mantine, Evergreen, and Radix all provide semantic wrappers for inline code, highlighted text, and keyboard key text as part of the typography system, not as separate utilities.
7. **Multi-line clamping hides content from visual users but not screen readers** — all T3 systems that implement `lineClamp`/`noOfLines` acknowledge this behavior. The Gestalt `title` auto-tooltip pattern is the best mitigation for hidden content discoverability.

---

## Where They Disagree

### 1. The central debate: tokens-only vs. wrapper component

- **Option A — Tokens-only (M3, shadcn/ui, SLDS):** Typography as a CSS concern; no component abstraction; tokens applied directly to HTML elements.
  - Adopters: M3, shadcn/ui, SLDS, Atlassian (body text)
  - Upside: Forces correct HTML semantics; zero React overhead; maximum CSS flexibility; text renders correctly even without component knowledge
  - Downside: Truncation, alignment, semantic text color, and responsive sizing must be re-implemented per use case; no API-level defaults; more developer knowledge required
  - Para tu caso: Best for systems where developer CSS literacy is high and semantic correctness is non-negotiable; not recommended when the primary audience is less experienced with HTML semantics

- **Option B — Named components per role (Spectrum, Paste, Base Web):** Separate components for Heading, Body, Detail/Caption.
  - Adopters: Spectrum (Heading/Body/Detail), Paste (Heading/Paragraph/DisplayHeading/DetailText), Base Web (20+ components)
  - Upside: Cannot accidentally render a heading visually without making a semantic heading; clearest intent at component selection; impossible to misuse
  - Downside: Multiple imports; large API surface; over-engineering for projects that only need heading + body
  - Para tu caso: Best when semantic correctness enforcement is a critical requirement and team discipline around HTML semantics cannot be assumed

- **Option C — Single polymorphic component (Polaris, Chakra, Mantine, Radix):** One `Text` component with `variant`/`as` decoupling.
  - Adopters: Polaris, Chakra, Mantine, Radix Themes, Cedar
  - Upside: One import; flexible; covers all cases; minimal API surface
  - Downside: Semantic responsibility fully on developer; `as` prop misuse (visual heading style on a `<div>`) is possible and not prevented
  - Para tu caso: Recommended default; add lint rules to enforce `as` correctness rather than API constraints

---

### 2. Semantic enforcement: required prop vs. optional vs. implied

- **Option A — Required semantic prop (Gestalt `accessibilityLevel`, Atlassian required `as`):** Cannot render a Heading without declaring its semantic level.
  - Adopters: Gestalt (required `accessibilityLevel`), Atlassian (required `as`), Paste (required `as`)
  - Upside: Cannot accidentally commit a semantic heading error; zero-effort accessibility for the most common heading mistake
  - Downside: Adds a required prop to every heading usage; DX friction for simple use cases
  - Para tu caso: Strongly recommended for Heading components specifically; the extra prop is worth the semantic guarantee

- **Option B — Optional semantic prop with documentation (Polaris, Chakra, Mantine, Spectrum):** `as`/`level`/`order` is optional; documentation explains correct usage.
  - Adopters: Polaris, Chakra, Mantine, Spectrum
  - Upside: Lower friction for simple cases; developers who know HTML semantics are not blocked
  - Downside: Misuse is possible and not caught by the API; heading level errors may reach production
  - Para tu caso: Acceptable with robust documentation and lint rules; pair with an ESLint rule requiring `as` on Heading

- **Option C — Implied by component selection (Base Web, some named-component systems):** Component name determines HTML element; no `as` prop.
  - Adopters: Base Web (HeadingMedium renders `<h2>`, ParagraphSmall renders `<p>`)
  - Upside: Zero cognitive overhead; correct element is automatic
  - Downside: Cannot override; valid visual-semantic divergence is impossible; must use a different component name
  - Para tu caso: Extreme position; not recommended for a general-purpose system

---

### 3. Responsive type: automatic vs. breakpoint-explicit vs. fluid

- **Option A — Automatic responsive sizing (GOV.UK):** Built-in class handles all breakpoint adjustments; no developer intervention.
  - Adopters: GOV.UK
  - Upside: Always correct at any viewport; zero developer effort; consistent across all instances
  - Downside: No customization; product-specific responsive requirements cannot be expressed
  - Para tu caso: Best for government/regulatory contexts where consistency is paramount; too rigid for most product systems

- **Option B — Explicit breakpoint values (Chakra `{ base, md }`, Primer `[2, 4]`, Mantine responsive props):** Developer specifies different sizes per breakpoint.
  - Adopters: Chakra, Primer, Mantine
  - Upside: Full control; product-specific responsive behavior; type scale decisions are visible in component code
  - Downside: Developer must specify every responsive transition; can lead to inconsistent implementations across the product
  - Para tu caso: Recommended approach; provide sensible defaults in the design system tokens and let developers override when needed

- **Option C — Fluid CSS clamp() (Carbon Expressive scale):** Type scales continuously between viewport sizes without discrete breakpoint jumps.
  - Adopters: Carbon (Expressive scale only)
  - Upside: Smooth, artifact-free scaling at any viewport width; no media query jumps
  - Downside: Less predictable visual outcome; type size at specific viewport widths is computed, not specified; requires careful min/max calibration
  - Para tu caso: Best for display and hero text; not recommended for body text where readability depends on predictable line lengths

---

### 4. Multi-line truncation: built-in prop vs. CSS utility vs. absent

- **Option A — Built-in `lineClamp`/`noOfLines` prop (Chakra, Gestalt, Mantine, Ant Design):** Multi-line truncation as a first-class text component prop.
  - Adopters: Chakra (`noOfLines`), Gestalt (`lineClamp`), Mantine (`lineClamp`), Ant Design (`ellipsis.rows`)
  - Upside: No CSS knowledge required; consistently implemented; accessible (full text still read by SR); API surface for expand/collapse
  - Downside: -webkit-line-clamp has browser compatibility considerations; expandable state requires additional prop surface
  - Para tu caso: Include `lineClamp` as a prop; it is frequently needed and tedious to re-implement correctly

- **Option B — CSS utility class (Carbon, SLDS, GOV.UK):** Teams apply CSS truncation utilities rather than a prop.
  - Adopters: Carbon, SLDS, most tokens-only systems
  - Upside: No component API needed; CSS is the right tool for layout concerns
  - Downside: Re-implemented inconsistently across teams; expand/collapse requires custom implementation; no tooltip for truncated content
  - Para tu caso: Acceptable as a supplement to the component prop; not as a replacement

- **Option C — Absent (most T1 systems for multi-line):** Single-line truncation only; multi-line left to CSS.
  - Adopters: M3, Spectrum, Atlassian, Carbon (body text)
  - Upside: Simpler component API
  - Downside: Multi-line clamping is a sufficiently common pattern that leaving it to consumers leads to inconsistent implementations
  - Para tu caso: Ship `lineClamp` if multi-line clamping appears in your product; do not assume consumers will implement it correctly

---

### 5. Interactive typography features (editable/copyable)

- **Option A — Interactive features as typography props (Ant Design):** `editable` and `copyable` are props on `Typography.Text`.
  - Adopters: Ant Design only
  - Upside: Common admin panel patterns built in; consistent implementation across all usages
  - Downside: Couples rendering concerns (styling) with interaction concerns (editing, copying); typography component becomes a multi-concern component
  - Para tu caso: Consider building `<EditableText>` and `<CopyableText>` as separate wrapper components rather than adding these to the core typography component

- **Option B — No interactive features (all other systems):** Typography components render text; interactions are separate components.
  - Adopters: All other 23 systems
  - Upside: Clean separation of concerns; typography component is purely presentational
  - Downside: Teams re-implement editable text and copy-to-clipboard patterns independently
  - Para tu caso: Default; provide `<EditableText>` as a separate component if the pattern is frequent in your product

---

## Visual Patterns Found

### Pattern Summary Table

| Pattern | Systems | Notes |
|---------|---------|-------|
| 5-role semantic type scale | M3 (Display/Headline/Title/Body/Label) | Most semantically precise taxonomy |
| Productive/Expressive dual scale | Carbon | Only system with two named type philosophies |
| Single polymorphic Text component | Polaris, Chakra, Mantine, Radix | One component, `variant`/`as` decoupling |
| Named components per role | Spectrum, Paste, Base Web | Semantic enforcement by component selection |
| Shorthand font tokens | Atlassian | One token = family + weight + size + line-height |
| Fluid responsive type (CSS clamp) | Carbon Expressive | Continuous scaling, no breakpoint jumps |
| Multi-line clamping with expand | Ant Design (`ellipsis`), Gestalt (`lineClamp` + `title`) | Full truncation API |
| Auto-responsive type | GOV.UK | Zero-config responsive sizing |
| Leading trim (optical alignment) | Radix Themes | Remove line-height whitespace for ink-bound alignment |
| Interactive typography (editable/copyable) | Ant Design | Unique interactive features |

---

### ASCII Wireframes

**M3 Type Scale — 5 roles × 3 sizes**

```
┌───────────────────────────────────────────────────────────────────┐
│  Display Large    (57px / 64px lh)   — Hero sections             │
│  Display Medium   (45px / 52px lh)                                │
│  Display Small    (36px / 44px lh)                                │
│  ─────────────────────────────────────────────                    │
│  Headline Large   (32px / 40px lh)   — Page headings             │
│  Headline Medium  (28px / 36px lh)                                │
│  Headline Small   (24px / 32px lh)                                │
│  ─────────────────────────────────────────────                    │
│  Title Large      (22px / 28px lh)   — Section headings          │
│  Title Medium     (16px / 24px lh)                                │
│  Title Small      (14px / 20px lh)                                │
│  ─────────────────────────────────────────────                    │
│  Body Large       (16px / 24px lh)   — Reading text              │
│  Body Medium      (14px / 20px lh)                                │
│  Body Small       (12px / 16px lh)                                │
│  ─────────────────────────────────────────────                    │
│  Label Large      (14px / 20px lh)   — UI chrome (buttons, etc.) │
│  Label Medium     (12px / 16px lh)                                │
│  Label Small      (11px / 16px lh)                                │
└───────────────────────────────────────────────────────────────────┘
```

**Polaris Text — variant + as decoupling**

```
┌───────────────────────────────────────────────────────────────────┐
│  <Text variant="headingXl" as="h1">                               │
│    Page Title                    ← h1 element, headingXl visual  │
│  </Text>                                                          │
│                                                                   │
│  <Text variant="headingMd" as="h2">                               │
│    Section                       ← h2 element, headingMd visual  │
│  </Text>                                                          │
│                                                                   │
│  <Text variant="headingMd" as="p" tone="subdued">                 │
│    Paragraph styled like heading ← p element, subdued tone       │
│  </Text>                                                          │
│                                                                   │
│  variant = visual style only                                      │
│  as      = semantic HTML element only                             │
│  tone    = semantic text color                                    │
└───────────────────────────────────────────────────────────────────┘
```

**Ant Design Typography — Multi-line ellipsis with expand**

```
┌───────────────────────────────────────────────────────────────────┐
│  <Typography.Paragraph ellipsis={{ rows: 3, expandable: true }}>  │
│                                                                   │
│  This is a long description that continues beyond three lines of  │
│  visible text. When it overflows it gets truncated at exactly    │
│  three lines with an ellipsis and a show more link...             │
│  [Show more ▼]                                                    │
│                                                                   │
│  ─── After expand ───                                             │
│                                                                   │
│  This is a long description that continues beyond three lines of  │
│  visible text. When it overflows it gets truncated at exactly    │
│  three lines with an ellipsis and a show more link below.         │
│  The full text is revealed on expand. And here is the rest.       │
│  [Show less ▲]                                                    │
└───────────────────────────────────────────────────────────────────┘
```

**Carbon Productive vs. Expressive dual scale**

```
┌───────────────────────────────────────────────────────────────────┐
│  PRODUCTIVE (fixed px, for application UI)                        │
│                                                                   │
│  heading-07   28px / 36px lh  — Page-level heading                │
│  heading-06   20px / 28px lh  — Section heading                   │
│  heading-05   16px / 22px lh  — Card heading                      │
│  body-01      14px / 20px lh  — Standard body text               │
│  body-compact-01  14px / 18px lh  — Dense data table text        │
│                                                                   │
│  EXPRESSIVE (fluid clamp(), for marketing/editorial)              │
│                                                                   │
│  heading-07  clamp(32px, 4vw, 54px) — Scales with viewport       │
│  heading-06  clamp(28px, 3vw, 42px)                               │
│  (heading-01 through heading-04 are fixed even in Expressive)     │
└───────────────────────────────────────────────────────────────────┘
```

**Gestalt — Required accessibilityLevel + lineClamp with tooltip**

```
┌───────────────────────────────────────────────────────────────────┐
│  <Heading                                                         │
│    size={500}               ← visual size (100-600 scale)        │
│    accessibilityLevel={2}   ← REQUIRED; renders <h2>             │
│  >                                                                │
│    Section Title            ← visual and semantic can differ     │
│  </Heading>                                                       │
│                                                                   │
│  <Text                                                            │
│    lineClamp={2}            ← multi-line clamp; shows 2 lines    │
│    title="Full text here"   ← auto-tooltip on hover/focus        │
│  >                                                                │
│    Full text here but only two lines visible in the UI...        │
│    rest is hidden visually but accessible to screen readers       │
│  </Text>                                                          │
└───────────────────────────────────────────────────────────────────┘
```

**Radix Themes — leading trim (optical alignment)**

```
┌───────────────────────────────────────────────────────────────────┐
│  WITHOUT trim:                                                    │
│  ┌─────────────────────────────────────────────────────────┐      │
│  │  [icon]                                                  │      │
│  │  [line-box whitespace above]                             │      │
│  │  Heading Text                                            │      │
│  │  [line-box whitespace below]                             │      │
│  └─────────────────────────────────────────────────────────┘      │
│                                                                   │
│  WITH trim="both":                                                │
│  ┌─────────────────────────────────────────────────────────┐      │
│  │  [icon]  Heading Text   ← optically aligned to icon top │      │
│  └─────────────────────────────────────────────────────────┘      │
│                                                                   │
│  trim removes the extra space caused by line-height above/below   │
│  the ink bounds — text aligns to its actual visual bounds         │
└───────────────────────────────────────────────────────────────────┘
```

**Named-component-per-role (Spectrum pattern)**

```
┌───────────────────────────────────────────────────────────────────┐
│  import { Heading, Body, Detail } from '@adobe/react-spectrum'    │
│                                                                   │
│  <Heading level={1}>                                              │
│    Page Title                    ← always renders <h1>           │
│  </Heading>                                                       │
│                                                                   │
│  <Body>                                                           │
│    Paragraph text here.         ← always renders <p>             │
│  </Body>                                                          │
│                                                                   │
│  <Detail size="S">                                                │
│    Caption or metadata          ← small secondary text           │
│  </Detail>                                                        │
│                                                                   │
│  Cannot render <Heading> as a <div>; semantic enforcement         │
│  is built into the component name choice                          │
└───────────────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

### 1. Wrong HTML element for visual heading style (HIGH)
Using `variant="headingLg"` on a `<span>` or `<div>` produces visually correct output but semantically incorrect markup. Screen readers do not identify it as a heading; document outline tools miss it; keyboard navigation via heading shortcuts fails. This is the most common typography component misuse.
**Mitigation:** Make the semantic element prop required (Gestalt/Atlassian approach) or add an ESLint rule that warns when heading variants are used with non-heading `as` values. At minimum, document clearly that `variant` does not determine the HTML element.

### 2. Multi-line clamping hiding meaningful content (HIGH)
`lineClamp={2}` hides content from visual users. If the hidden content contains critical information (pricing, legal text, key features), visual users may miss it and screen reader users receive an inconsistent experience (they hear the full text).
**Mitigation:** Gestalt's `title` auto-tooltip pattern is the best solution — the full text is always accessible via hover/focus. For critical content, warn in documentation that `lineClamp` should only be applied to supplementary text (descriptions, captions) never to primary content.

### 3. Color-only semantic text without accessible meaning (MEDIUM)
Using `tone="critical"` or `type="danger"` to style error messages in red without accompanying text like "Error:" means colorblind users and users in high-contrast mode cannot distinguish the error state from normal text.
**Mitigation:** Semantic text color (`tone`, `type`) is a visual enhancement; the text itself must convey the semantic meaning. An error message should say "Error: [message]" not just display `type="danger"` styling. Document this in the tone/type prop description.

### 4. Inline (`<span>`) rendering in block contexts (MEDIUM)
Fluent 2 explicitly documents this; other systems leave it implicit. Using an inline typography component (`<span>` or `<Text>`) in a block-level container context creates unexpected reading order for screen readers and layout issues.
**Mitigation:** Provide a `block` prop or dedicated block-level component variant. Fluent 2's explicit documentation of `<span>` vs. `<p>` rendering is worth replicating in your component documentation.

### 5. Heading level skipping in dense layouts (MEDIUM)
Complex dashboard layouts with cards, panels, and tables often cause heading levels to skip (h1 for page title, h3 for card title, skipping h2) when visual hierarchy doesn't match the logical document structure. Carbon's auto-context heading level is the most sophisticated solution but requires developer understanding of Carbon's section system.
**Mitigation:** Provide heading level guidance for common layout patterns (page → section → card → list item). Include heading level validation in automated accessibility testing (axe-core catches level skipping). Consider requiring the semantic level prop to force deliberate decisions.

---

## Next Steps

1. **Resolve the tokens-only vs. component debate for body text specifically** — heading text needs a component (semantic level enforcement); body text is the most common element and a React wrapper may add more overhead than value. Consider the hybrid approach (Carbon/Atlassian model: `<Heading>` component + body text via tokens).
2. **Decide the semantic enforcement model** — optional `as` with documentation, required `as` (Atlassian/Gestalt), or named-component-per-role (Spectrum). This is the highest-impact decision in the typography spec.
3. **Define the type scale taxonomy first** — before speccing component props, define the semantic role names (Display/Headline/Title/Body/Label or heading sizes + body sizes). M3's 5-role × 3-size matrix is the most decision-oriented model; Polaris's linear scale is the most approachable for new developers.
4. **Include `lineClamp` from day one** — multi-line clamping appears in nearly every product (card descriptions, table cell content, user bios). Build it into the Text component prop rather than expecting teams to implement CSS `-webkit-line-clamp` correctly.
5. **Add semantic text tone props early** — critical/caution/success/subdued color semantics at the typography level (`tone`/`type` prop) prevent the need for utility color classes on text, which leads to inconsistency. Include in v1.
6. **Document the `variant` ≠ semantic element principle explicitly** in the component overview — this is the most commonly misunderstood aspect of polymorphic typography components and the source of the most frequent semantic heading errors.
7. **Evaluate leading trim (Radix `trim` prop)** — if your design system requires pixel-perfect optical alignment between text and icons/borders, leading trim solves a real CSS pain point. It is a progressive enhancement that does not affect semantics.
