---
system: Material Design 3
component: Not available natively
url: https://m3.material.io/styles/typography/overview
last_verified: 2026-03-28
---

# Link (Material Design 3)

## Approach
Material Design 3 does not provide a standalone Link component. Instead, inline text links are treated as a typographic pattern governed by the MD3 typography and color systems. The philosophy is that a "link" is simply body text rendered in the primary color with an underline — the visual affordance comes from the design token system, not a dedicated component. This reflects Google's product reality: most MD3 surfaces (Android, Material Web) handle navigation through dedicated navigation components (NavigationBar, NavigationDrawer, NavigationRail) rather than inline hyperlinks embedded in prose. When links appear in dense informational text, MD3 defers to the host platform's default anchor styling, trusting that `<a>` elements will inherit the color scheme. For web implementations using Material Web (MWC), developers are expected to style anchor tags using `--md-sys-color-primary` tokens directly. This absence is a deliberate product decision — MD3 is optimized for app-like surfaces where navigation is structural, not inline.

## Key Decisions
1. **No standalone component, use typography tokens** (HIGH) — MD3 deliberately omits a Link component because the system's navigation model relies on dedicated nav components. Inline links are edge cases handled by the typography scale. Teams building content-heavy surfaces must define their own link pattern using `--md-sys-color-primary` for default state and `--md-sys-color-primary-container` for visited state.
2. **Underline as the primary affordance** (MEDIUM) — Following WCAG 1.4.1, MD3 guidance implies links in body text must not rely on color alone. The underline convention is inherited from platform defaults rather than prescribed in a component spec, meaning accessibility compliance is the responsibility of the implementing team.
3. **Color token inheritance for states** (MEDIUM) — Hover, active, and visited states are expressed through the color system: primary for default, primary-variant for hover. This ensures dark/light mode adaptation is automatic when tokens are used correctly, which is the main benefit of the non-component approach.

## Notable Props
- No component API — relies on native `<a>` HTML element with MD3 color tokens applied via CSS custom properties.

## A11y Highlights
- **Keyboard**: Standard browser Tab focus; MD3 specifies no custom focus ring treatment for links beyond the system focus indicator (`--md-sys-color-secondary` focus ring).
- **Screen reader**: Relies entirely on native `<a>` element semantics; link text must be descriptive — no additional ARIA guidance provided by MD3.
- **ARIA**: No prescribed ARIA roles; `aria-label` recommended for icon-only links but not documented in MD3 specs. Teams must self-enforce.

## Strengths & Gaps
- **Best at**: Automatic dark/light mode adaptation through the color token system when implemented correctly.
- **Missing**: No documented pattern for external links (target="_blank" + rel="noopener noreferrer"), no visited state guidance, no icon-link pattern, and no explicit Button-vs-Link semantic guidance.
