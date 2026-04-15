---
component: Typography
tier: 3
last_verified: 2026-03-31
---

# Typography — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | — (no Typography primitive) | No built-in typography component; Radix Themes provides `Text`, `Heading`, `Em`, `Strong`, `Quote`, `Code` as styled primitives with `size` (1–9), `weight`, `color`, `trim` (leading trim), and `as` polymorphic prop; Radix Primitives (headless) has no typography at all. | high |
| Chakra UI | Heading, Text | `Heading` with `as` (h1–h6) and `size` (4xl–xs); `Text` with `fontSize`, `noOfLines` (built-in multi-line clamping), `isTruncated` (single-line ellipsis); both support responsive values via object syntax (`fontSize={{ base: 'md', md: 'lg' }}`); color mode aware. | high |
| GOV.UK | Typography (govuk-frontend) | Class-based type system (`govuk-heading-xl`, `govuk-body`, `govuk-caption-l`); strict heading hierarchy enforcement in documentation; font is GDS Transport (government-mandated); responsive sizing built into classes (sizes decrease on mobile automatically); `govuk-body-s` and `govuk-body-l` for size variants. | high |
| Base Web (Uber) | HeadingXSmall–HeadingXXLarge, ParagraphSmall–ParagraphLarge, LabelSmall–LabelLarge, DisplayLarge–DisplaySmall, MonoDisplayXSmall–MonoDisplayLarge | Highly granular named components — one per type ramp step (e.g., `HeadingMedium`, `ParagraphSmall`, `LabelLarge`); each component renders the appropriate HTML element by default; supports `overrides` for deep style customization; `color` prop for semantic color tokens; no `as` prop — component name determines both style and element. | high |
| Fluent 2 (Microsoft) | Text, Title, Subtitle, Body, Caption, LargeTitle | Named components per type role; `Text` as the base primitive with `size` (100–1000), `weight`, `font`, `align`, `wrap`, `truncate`, `block` props; specialized components (Title1–3, Subtitle1–2, Body1–2, Caption1–2) map to Fluent's type ramp; `as` prop for polymorphic rendering. | high |
| Gestalt (Pinterest) | Heading, Text | `Heading` with `accessibilityLevel` (1–6, required) that controls both semantic HTML and visual size by default; `size` prop (100–600) for override; `Text` with `size` (100–600), `weight`, `color` (semantic tokens), `lineClamp` (multi-line truncation), `overflow` (truncation mode); `title` prop auto-adds tooltip on truncated text. | high |
| Mantine | Title, Text, Highlight, Mark, Code, Blockquote | `Title` with `order` (1–6) mapping to h1–h6 and `size` for visual override; `Text` with `size` (xs–xl or number), `fw` (weight), `c` (color), `truncate` (true/end/start), `lineClamp` (multi-line); `Highlight` for text highlighting; all support responsive props via object syntax; `gradient` prop for gradient text. | high |
| Orbit (Kiwi.com) | Heading, Text | `Heading` with `type` (title1–title6, display, displaySubtitle); `Text` with `type` (primary/secondary), `size` (small/normal/large), `weight`; `as` prop for element override; travel-domain optimized for legibility on mobile booking flows; built-in responsive behavior. | medium |
| Evergreen (Segment) | Heading, Text, Paragraph, Strong, Code, Pre, Link | Multiple named components; `Heading` with `size` (100–900); `Text` with `size` (300–600); `Paragraph` as semantic wrapper with margin; all components accept `is` prop for polymorphic rendering (Evergreen's equivalent of `as`); minimal API surface with `color`, `fontFamily`, `fontSize` overrides. | medium |
| Nord (Nordhealth) | nord-heading, nord-text (web components) | `<nord-heading>` web component with `level` (h1–h6) controlling both semantics and visual size; `size` for visual override; `<nord-text>` for body text; healthcare-context type scale optimized for clinical interface legibility; minimal prop surface. | low |

## Key Decision Patterns

**Multi-line truncation as a first-class prop:** T3 systems lead in built-in multi-line text clamping. Chakra's `noOfLines`, Gestalt's `lineClamp`, and Mantine's `lineClamp` all accept a number to limit visible lines with ellipsis. This is a significant DX improvement over CSS-only `-webkit-line-clamp` hacks. Gestalt goes further: its `title` prop automatically surfaces the full text as a native tooltip when truncation occurs, solving the discoverability problem of hidden content. No T2 system provides this level of built-in truncation support.

**Named-component-per-ramp-step vs. prop-driven scale:** Base Web takes the most extreme position — every type ramp step is a separate component (`HeadingMedium`, `ParagraphSmall`, `LabelLarge`, etc.), totaling 20+ typography components. This eliminates invalid prop combinations (you cannot set `size="xl"` on a `Caption`) but creates a large API surface. Fluent 2 offers a middle ground with role-based components (Title, Subtitle, Body, Caption) plus size sub-variants. Mantine and Chakra go prop-driven with `size` on two core components. The trend among newer T3 systems (Mantine, Radix Themes) favors fewer components with more props.

**Responsive typography approaches:** GOV.UK is the only T3 system where responsive type sizing is fully automatic — the `govuk-heading-xl` class renders at a smaller size on mobile without developer intervention. Chakra and Mantine use responsive object syntax (`fontSize={{ base: 'md', md: 'lg' }}`), giving developers explicit control per breakpoint. Base Web's fixed components have no built-in responsive behavior — developers must conditionally render different components or use CSS media queries. Radix Themes' `size` prop does not support responsive arrays natively.

**Leading trim (optical alignment):** Radix Themes introduces a `trim` prop (normal, start, end, both) that removes extra whitespace above and below text caused by line-height. This enables precise optical vertical alignment in layouts — text aligns to its ink bounds rather than its line box. No other T3 system (or any T1/T2 system) provides this as a built-in prop. It addresses a longstanding CSS pain point for design systems that need pixel-perfect vertical rhythm.

## A11y Consensus
- Gestalt's `accessibilityLevel` prop on `Heading` is the strongest T3 enforcement — it is required (not optional), making it impossible to render a heading without declaring its semantic level
- GOV.UK mandates strict heading hierarchy in all government services; skipping heading levels is a documented compliance failure, not just a recommendation
- All T3 systems support the visual/semantic decoupling pattern: visual size can differ from heading level to allow correct document outline without visual constraints
- Fluent 2 documents that `Text` renders a `<span>` by default (inline), while `Body` renders a `<p>` (block) — incorrect element choice creates reading-order issues for screen readers in block contexts
- Multi-line truncation (lineClamp/noOfLines) hides content from visual users but screen readers still read the full text — Gestalt explicitly documents this behavior; other systems leave it implicit
- Color contrast for secondary/muted text variants: Gestalt and Mantine restrict their `color` prop to semantic tokens that pass WCAG AA, preventing developers from setting arbitrary low-contrast values
- `lang` attribute support for multilingual content is under-documented across all T3 systems, same gap as T2

## Recommended Use
Reference Gestalt for the strongest accessibility enforcement on headings (`accessibilityLevel` required) and the most complete truncation solution (`lineClamp` + auto-tooltip via `title`). Reference Chakra UI for the cleanest responsive typography API via object syntax on `fontSize`. Reference Radix Themes for the `trim` prop (leading trim) that enables optical vertical alignment. Reference GOV.UK for automatic responsive type scaling without developer intervention. Reference Mantine for the broadest built-in typography component family (Title, Text, Highlight, Mark, Code, Blockquote) with gradient text support. Reference Base Web for the named-component-per-ramp-step pattern when invalid prop combinations must be eliminated by API design.
