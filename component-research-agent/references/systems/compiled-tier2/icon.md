---
component: Icon
tier: 2
last_verified: 2026-03-31
---

# Icon — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Icon (per-icon components) | Individual React icon components wrapping SVGs; `decorative` boolean prop as the primary a11y control; size scale (sizeIcon10–sizeIcon110) mapped to spacing tokens; color inherits from `color` prop or parent text. | high |
| Salesforce Lightning | lightning-icon / Icon | Web component `<lightning-icon>` with SLDS icon sprite sheets (standard/utility/action/doctype/custom categories); `variant` for color; `size` (xx-small through large); `alternative-text` for a11y. | high |
| GitHub Primer | Octicons / @primer/octicons-react | Octicons — GitHub's custom icon set (~500 icons); 16px and 24px size-specific SVGs; React components with `aria-label` and `verticalAlign` props; icons designed on a strict pixel grid. | high |
| shadcn/ui | Icon (via Lucide) | No built-in icon component — uses Lucide React icons directly; `size`, `color`, `strokeWidth` props from Lucide; users compose icon + accessibility wrapper as needed. BYO icon library. | high |
| Playbook | Icon | Wraps Font Awesome icons; `icon` prop takes FA icon name; `size` scale (1x–10x plus lg/xs/sm); `rotation` and `spin` props; dual React/Rails implementation. | medium |
| REI Cedar | CdrIcon | SVG sprite system; `use` prop references sprite ID; inline SVG alternative; size tied to Cedar spacing tokens; requires manual `aria-label` or `aria-hidden`. | medium |
| Wise Design | Icon | Purpose-built icon set for financial product UI (transfers, currencies, payment methods); size scale tied to Wise spacing; color via design tokens. | low |
| Dell Design System | Icon | Enterprise icon library; SVG-based; standard size scale; utility/navigation/status categories; follows Dell brand guidelines for stroke weight. | low |

## Key Decision Patterns

**BYO vs. bundled icon library:** The sharpest architectural split in T2 is between systems that bundle their own icon set (Primer/Octicons, Playbook/Font Awesome, Lightning/SLDS sprites) and systems that are icon-library-agnostic (shadcn/ui delegates to Lucide, Cedar accepts any SVG sprite). Bundled libraries ensure visual consistency but lock teams into one icon vocabulary. BYO approaches offer flexibility but risk visual inconsistency across a product.

**Decorative boolean prop:** Paste's `decorative` boolean is the cleanest T2 a11y pattern. When `decorative={true}`, the icon gets `aria-hidden="true"` automatically. When `decorative={false}`, a `title` prop is required or the component throws a runtime error. This binary enforcement eliminates the ambiguity of optional `aria-label` props where developers can accidentally leave icons unlabeled.

**Sprite sheets vs. individual SVG imports:** Lightning uses SLDS sprite sheets (one HTTP request for all icons, referenced via `<use xlink:href>`), while Primer and Paste use individual tree-shakeable SVG component imports. Sprite sheets reduce HTTP requests but ship all icons regardless of usage. Individual imports enable tree-shaking but generate more JS modules. The trend in modern T2 systems is toward individual imports.

**Size-specific SVG optimization:** Primer is the strongest T2 example — every Octicon has a 16px and 24px version with different path data optimized for each pixel grid. This matches Carbon's T1 approach and prevents sub-pixel rendering artifacts. Most other T2 systems scale a single SVG, accepting minor visual degradation at non-native sizes.

## A11y Consensus
- Decorative icons (next to visible text label): `aria-hidden="true"` on the icon; the adjacent text provides the accessible name
- Informative/standalone icons (icon-only buttons, meaningful indicators): `aria-label` or `title` on the icon or its container
- Paste's `decorative` boolean prop is the most enforceable pattern — component errors if non-decorative icon lacks a title
- Icon-only buttons must have an accessible label on the `<button>`, not just on the icon SVG inside it
- Lightning documents that `alternative-text` is required for utility icons used without visible text; omitting it is a documented a11y violation
- Color alone must never be the only differentiator for icon meaning (same as badge/status rules)

## Recommended Use
Reference Paste for the strongest a11y enforcement model (`decorative` prop with required `title`). Reference Primer/Octicons for size-specific SVG optimization at 16/24px. Reference shadcn/ui + Lucide for the BYO icon library pattern where the design system provides composition guidelines but not the icon set itself. Reference Lightning for sprite-based delivery in web component architectures.
