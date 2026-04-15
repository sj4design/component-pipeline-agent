---
component: Typography
tier: 2
last_verified: 2026-03-31
---

# Typography — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Heading, Paragraph, Display, DetailText | Separate semantic components per text role; `Heading` requires `as` prop (h1–h6) for HTML element and `variant` for visual style (heading10–heading60); `Paragraph` and `DisplayHeading` are distinct components; `marginBottom` prop controls spacing; responsive sizing is not automatic — developers set variants per breakpoint manually. | high |
| Salesforce Lightning | lightning-formatted-text, Heading (SLDS) | SLDS defines a type ramp with utility classes (`slds-text-heading_large`, `slds-text-body_regular`); web component `lightning-formatted-text` handles linkification and sanitization rather than pure typographic styling; heading hierarchy via utility classes, not dedicated components. | high |
| GitHub Primer | Heading, Text | `Heading` component with `as` prop (h1–h6) for semantic element and `sx` prop for style overrides; `Text` as the general-purpose typography primitive with `fontSize`, `fontWeight`, `color` props; both support the `sx` style prop for responsive values via array syntax (e.g., `fontSize={[2, 4]}` for mobile/desktop). | high |
| shadcn/ui | — (no dedicated component) | No built-in Typography component — provides Tailwind CSS prose classes and a documentation recipe showing `h1`–`h4`, `p`, `blockquote`, `lead`, `muted` as raw HTML elements with Tailwind utility classes; developers compose their own `<Typography>` wrapper if needed. BYO approach. | high |
| Playbook (eBay) | Title, Body, Caption, Detail | Granular named components per text role; `Title` has sizes 1–4 mapping to h1–h4; `Body` for paragraphs with `color` and `dark` props; `Caption` and `Detail` for secondary text; supports `tag` prop to override rendered HTML element independently of visual style. | medium |
| REI Cedar | CdrText | Single polymorphic `CdrText` component; `tag` prop controls rendered HTML element (any valid tag); visual styling applied via modifier classes or design tokens; no built-in type scale variants — relies on Cedar's token-based type ramp applied via CSS. | medium |
| Wise Design | Typography (Text, Title) | `Text` and `Title` components following Wise's product type scale; size tokens tied to Wise spacing system; limited public documentation on responsive behavior; financial product context drives conservative, legibility-first type choices. | low |
| Dell Design System | Typography (Heading, Body, Caption) | Enterprise type ramp with heading levels and body sizes; follows Dell brand typography guidelines (specific font families); size scale aligned to Dell grid system; supports density-aware sizing for compact enterprise UIs. | low |

## Key Decision Patterns

**Semantic component vs. single primitive:** The sharpest architectural split in T2 is between systems that provide multiple named components per text role (Paste: Heading/Paragraph/Display/DetailText; Playbook: Title/Body/Caption/Detail) and systems that offer a single polymorphic text primitive (Cedar: CdrText; Primer: Text). Named components enforce correct semantic usage by making it impossible to render a heading visually without using the Heading component. Single primitives offer flexibility but rely on developers to pair the right visual style with the right HTML element.

**Polymorphic `as`/`tag` prop:** Every T2 system with dedicated text components supports overriding the rendered HTML element independently of visual style. Paste and Primer use `as`, Playbook and Cedar use `tag`. This decoupling is critical for cases where visual hierarchy and document outline diverge — e.g., a visually large heading that is semantically an h3 due to its position in the page structure. The consensus is universal: the visual style prop controls appearance, the element prop controls HTML output.

**Responsive type scaling:** Primer is the most explicit T2 system for responsive typography, using array syntax in the `sx` prop (`fontSize={[2, 4]}`) to set different sizes per breakpoint. Paste does not provide automatic responsive scaling — developers must conditionally render different `variant` values. shadcn/ui delegates entirely to Tailwind responsive utilities (`text-lg md:text-xl`). No T2 system provides automatic fluid/clamp-based responsive type out of the box.

**Truncation and overflow:** Paste provides a distinct `Truncate` component that wraps any text element to apply single-line truncation with ellipsis. Primer's `Text` supports `sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}` inline. Playbook provides a `truncate` prop directly on Body and Title components. The pattern is consistent: truncation is a single-line ellipsis concern; multi-line clamping is typically left to CSS utility classes rather than built into the typography component.

## A11y Consensus
- Heading level (`h1`–`h6`) must follow document outline order regardless of visual size — all T2 systems enforce or document this via the `as`/`tag` prop that decouples visual appearance from semantic level
- Skipping heading levels (e.g., h1 → h3) is flagged as an accessibility violation across all systems that document it
- Paste and Playbook enforce that `Heading`/`Title` components always render a heading element by default, preventing accidental `<div>` headings
- Color contrast ratios: all systems reference WCAG 2.1 AA minimums (4.5:1 for body text, 3:1 for large text) in their typography documentation
- Text resizing: typography must remain readable when users zoom to 200% — no T2 system uses fixed px sizes for body text; all use relative or token-based units
- `lang` attribute should be set on elements with text in a different language than the page — documented by Lightning/SLDS but generally under-addressed in component APIs

## Recommended Use
Reference Paste for the strongest semantic-component-per-role model (Heading/Paragraph/Display/DetailText) with enforced heading-level semantics. Reference Primer for responsive typography via array-based breakpoint values in `sx`. Reference Playbook for the most granular named-component set with `tag` override. Reference shadcn/ui + Tailwind for the BYO typography pattern where the system provides recipes but not wrapper components. Reference Cedar's `CdrText` as the single-primitive polymorphic alternative.
