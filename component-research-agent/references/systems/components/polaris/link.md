---
system: Polaris (Shopify)
component: Link
url: https://polaris.shopify.com/components/link
last_verified: 2026-03-28
---

# Link (Polaris)

## Approach
Polaris has the most opinionated Link component of any Tier 1 design system, built around a single governing principle: the `url` prop is for navigation and `onClick` is for actions — and these two must never be conflated. This distinction exists because Shopify's merchant-facing admin UI had a longstanding problem where developers would use `<button>` styled as links for navigation (breaking browser conventions like right-click → open in new tab) or use `<a>` elements with onClick for actions (breaking keyboard navigation and creating ARIA roles mismatches). Polaris enforces the semantics at the component level: if you pass `url`, the component renders a native `<a>` element; if you pass only `onClick`, it renders a `<button>` with appropriate ARIA. This is not just a style guide recommendation — it is encoded in the component's render logic. The result is that Polaris Link has unusually strong semantic correctness across Shopify's product surface, at the cost of being more prescriptive than developers expect.

## Key Decisions
1. **`url` vs `onClick` as semantic enforcement** (HIGH) — This is Polaris's defining Link decision. Passing `url` renders `<a href>`, giving users browser-native link behaviors (right-click, open in new tab, middle-click). Passing only `onClick` renders `<button>`, ensuring keyboard and screen reader users interact with it as an action, not navigation. This binary enforcement has eliminated an entire class of semantic bug from Shopify's codebase and is now documented as a content guideline so that writers and designers understand the distinction when specifying components.
2. **External links handled automatically** (HIGH) — When `url` contains an external domain, Polaris automatically renders `target="_blank"` and `rel="noopener noreferrer"`. This is one of very few design systems that makes this security-and-semantics decision automatic rather than relying on developer diligence. The component determines "external" by comparing the href domain against the app's current domain.
3. **monochrome variant for contextual surfaces** (MEDIUM) — In colored banner components (where the background is, say, a warning-yellow), a blue link creates a color harmony problem. Polaris's `monochrome` prop renders the link in the current text color rather than the link-blue token, maintaining accessibility contrast while fitting into the surface's color context. This emerged from Shopify's notification banner redesign where standard link colors clashed with status-colored backgrounds.

## Notable Props
- `url`: The navigation prop — renders `<a href>` and enables all browser link behaviors. The presence or absence of this prop determines the rendered element type.
- `external`: Can be set explicitly; otherwise auto-detected from the URL. When true, adds target and rel attributes plus the external link icon automatically.
- `monochrome`: Renders in current text color rather than link-blue — useful inside status-colored surfaces.
- `removeUnderline`: Removes underline — intended for navigation lists where underlines create visual clutter, but comes with documented a11y caveats.

## A11y Highlights
- **Keyboard**: Tab to focus, Enter to activate. Because the rendered element (a vs button) is semantically correct, keyboard behavior matches native browser conventions exactly without ARIA overrides.
- **Screen reader**: Announced as "link" when url is provided (native a element) or "button" when only onClick is provided. This is correct semantic behavior and is one of the key reasons Polaris enforces the url/onClick distinction.
- **ARIA**: No custom ARIA needed when the component is used correctly. When external, Polaris recommends but does not automatically inject "(opens in new tab)" into the accessible name — this is listed as a known gap in their documentation.

## Strengths & Gaps
- **Best at**: Semantic correctness enforcement — the url/onClick split is the most effective mechanism any design system uses to prevent Button-vs-Link semantic confusion.
- **Missing**: No automatic screen reader announcement for external links opening in a new tab; the external icon provides a visual cue but nothing equivalent for non-sighted users.
