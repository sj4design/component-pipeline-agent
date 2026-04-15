---
system: Spectrum (Adobe)
component: Link
url: https://react-spectrum.adobe.com/react-spectrum/Link.html
last_verified: 2026-03-28
---

# Link (Spectrum)

## Approach
Spectrum's Link component is a first-class citizen in the design system, reflecting Adobe's reality as a company that ships content-rich web applications with dense documentation, help text, and cross-application navigation. The component's most architecturally significant feature is its RouterLink integration pattern: Spectrum Link accepts a router-agnostic `href` prop and delegates actual navigation to a globally registered router provider, meaning the same `<Link>` component works with React Router, Next.js, or any other routing library without per-component configuration. This is a direct response to Adobe's micro-frontend architecture, where multiple product teams share components but use different routers. Spectrum also separates the link's visual variant (standalone vs. inline) cleanly: standalone links are self-contained navigational elements with their own padding and focus ring, while inline links appear naturally in prose. This distinction matters because standalone links in UI panels need larger hit areas, while inline links in help text need to respect the surrounding line height.

## Key Decisions
1. **Router-agnostic via global provider** (HIGH) — The `RouterProvider` pattern means teams never import routing logic into individual components. Instead, one `RouterProvider` at the app root adapts Spectrum's navigation to whatever router the app uses. This makes Spectrum components portable across Adobe's diverse application portfolio without modification, and it means upgrades to React Router do not cascade through every component that renders a link.
2. **Standalone vs. inline visual variant** (MEDIUM) — The `variant` prop distinguishes between standalone links (larger touch target, independent spacing) and inline links (flows within text). Most systems conflate these two use cases into one style; Spectrum's separation avoids the common bug where inline links appear with excessive padding that breaks line rhythm.
3. **isQuiet prop for subdued contexts** (MEDIUM) — In dense UI like file metadata panels or annotation sidebars, Spectrum's `isQuiet` removes the underline decoration to reduce visual noise, relying on color alone in contexts where the entire surface is clearly interactive. This is explicitly tied to specific Adobe product surfaces and comes with an implied a11y warning that quiet links must not be used in prose.

## Notable Props
- `href`: Triggers router-aware navigation via the registered RouterProvider rather than a raw anchor — this is why Spectrum can support client-side routing without React Router imports inside the component.
- `target`: Supported but Spectrum automatically appends `rel="noreferrer"` when `target="_blank"` is set, closing the window.opener security vulnerability without developer intervention.
- `isQuiet`: Removes underline for subdued contexts — interesting because it makes an accessibility trade-off explicit in the API.

## A11y Highlights
- **Keyboard**: Full Tab focus; Enter activates. Spectrum's FocusRing system applies a consistent 2px offset focus ring that meets 3:1 contrast ratio against all background colors in the system.
- **Screen reader**: Announces as "link" with the link text. When `target="_blank"`, Spectrum does not automatically append "(opens in new tab)" — teams must add this to the link text or via `aria-label`.
- **ARIA**: Uses native `<a>` element; no custom ARIA roles. `aria-disabled` is used instead of `disabled` attribute to keep the element in the Tab order when disabled, which Spectrum considers best practice for inline links.

## Strengths & Gaps
- **Best at**: Router-agnostic navigation integration — the RouterProvider pattern is the cleanest solution to the multi-router problem in the industry.
- **Missing**: No automatic "(opens in new tab)" announcement for external links, and no documented visited state styling in the design tokens.
