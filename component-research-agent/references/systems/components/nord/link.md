---
system: Nord Design System (Nordhealth)
component: Not available natively (typography/token-level link styles)
url: https://nordhealth.design/typography/
last_verified: 2026-03-29
confidence: high
---

# Link

## Approach
Nord does not provide a `<nord-link>` Web Component — link styling is handled at the typography and design token level, applied to standard HTML `<a>` anchor elements through Nord's global CSS. This approach reflects a foundational principle in Nord's architecture: HTML anchor elements are semantically complete as-is, and wrapping them in a custom element would add complexity without adding value. In healthcare software, links appear in breadcrumb navigation, clinical record cross-references (linking from a prescription to the patient record, from a lab result to the reference range guide), and in-body text of clinical documentation. Nord's token system defines link colors via CSS Custom Properties (consuming `--nord-color-action` for default state and appropriate interaction states) and applies them globally to `<a>` elements, ensuring consistent link appearance throughout an EHR without requiring component-level wrapping. Typography documentation at nordhealth.design/typography/ covers link styling guidelines, color, hover states, and visited state handling.

## Key Decisions
1. **No component wrapper — native `<a>` is sufficient** (HIGH) — HTML anchor elements have complete native semantics (role="link"), keyboard behavior (Enter key activation), browser-level features (right-click → open in new tab, back/forward history), and assistive technology support. A custom element wrapping `<a>` would shadow these native capabilities without adding clinical-specific functionality.
2. **Token-level styling for consistent application** (HIGH) — Applying link styles via CSS Custom Properties on `<a>` elements globally means every link in every Nord-based clinical product is automatically consistent. Developers cannot accidentally create unstyled links by forgetting to use a component — the styling is ambient and universal.
3. **Visited state preservation for clinical navigation** (MEDIUM) — In clinical workflows, knowing which patient records, lab results, or documentation links a clinician has already reviewed is meaningful. Nord's link styles preserve browser-native `:visited` state styling, supporting clinical orientation in large patient record systems.
4. **External link handling at application level** (MEDIUM) — Healthcare applications often link to external clinical resources (drug databases, clinical guidelines, ICD code references). The decision to add `target="_blank"`, `rel="noopener noreferrer"`, and external link indicators is left to application developers rather than enforced by a component, since not all links in a clinical context are external.

## Notable Props
- No `<nord-link>` component exists; no custom props applicable.
- Link appearance controlled by CSS Custom Properties on native `<a>`:
  - `--nord-color-action`: Default link color
  - `--nord-color-action-visited`: Visited link color (where applicable)
  - Typography tokens: `--nord-font-family-*`, `--nord-font-size-*` from the global typography system

## A11y Highlights
- **Keyboard**: Native `<a href="...">` provides full keyboard support — Tab to focus, Enter to activate; no custom keyboard handling required or provided
- **Screen reader**: Native anchor elements are announced as "link" by all screen readers; link text must be descriptive (not "click here") — Nord's guidelines recommend meaningful link text for clinical context (e.g., "View lab results for March 2026" rather than "View results")
- **ARIA**: No ARIA attributes needed for standard navigation links; `aria-current="page"` recommended for active navigation links (used by `<nord-breadcrumb-item>` in breadcrumb context); `aria-label` recommended when link text is insufficient to describe the destination (e.g., icon-only links in clinical toolbars)

## Strengths & Gaps
- **Best at**: Zero-overhead, consistently styled links throughout all Nord-based clinical applications via ambient CSS; full preservation of native anchor semantics and browser features; no component adoption barrier for teams using standard HTML
- **Missing**: No button-styled link variant (a link rendered to look like a button, common in clinical CTAs); no icon+link composite (external link icon, download icon); no explicit guidance on when to use `<a>` vs `<button>` in clinical UI — a common source of semantic errors in EHR interfaces where some "links" trigger actions rather than navigations
