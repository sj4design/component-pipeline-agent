---
system: Orbit (Kiwi.com)
component: TextLink
url: https://orbit.kiwi/components/navigation/textlink/
last_verified: 2026-03-29
confidence: high
---

# Link

> **Name mapping**: Orbit calls this component `TextLink`. It serves the same purpose as a Link component in other systems — a styled inline hyperlink.

## Approach
Orbit's TextLink is the primary inline link component used throughout Kiwi.com's booking interface: terms and conditions links in payment forms, "What's included?" baggage policy links, navigation links in confirmation emails, and "Forgot password?" in the auth flow. The component is intentionally minimal — it applies Orbit's brand color, hover/focus states, and accessible underline behavior to an anchor element without introducing complex variants. Because travel booking copy is dense with legal and informational links that must not visually compete with primary CTAs (Buttons), TextLink's restrained styling ensures clear visual hierarchy between navigation/informational links and action-driving buttons.

## Key Decisions
1. **Distinct from Button** (HIGH) — TextLink's styling deliberately does not resemble a button; in a booking interface cluttered with CTAs, inline links must read as secondary navigation/information, not competing actions.
2. **`type` prop for context** (MEDIUM) — Supports `"primary"`, `"secondary"`, and `"white"` color variants to remain legible on both light backgrounds (booking forms) and dark backgrounds (confirmation banners, footer).
3. **External link behavior** (MEDIUM) — Automatically appends `target="_blank"` and `rel="noopener noreferrer"` when pointing to external domains (e.g., airline websites, insurance providers), protecting users from tab-napping.

## Notable Props
- `href`: destination URL
- `type`: `"primary" | "secondary" | "white"` — color variant
- `external`: boolean; adds `target="_blank"` with appropriate `rel` attributes
- `iconLeft` / `iconRight`: optional icon slots for directional or contextual icons
- `standAlone`: renders the link as a block element rather than inline, for use as a standalone action

## A11y Highlights
- **Keyboard**: Focusable via Tab; activated via Enter; visible focus ring uses Orbit's focus token.
- **Screen reader**: Renders as a native `<a>` element; external links include visually hidden "(opens in new tab)" text when `external` is true.
- **ARIA**: No ARIA overrides needed; relies on native anchor semantics.

## Strengths & Gaps
- **Best at**: Inline informational and legal links within booking copy; clean visual hierarchy that doesn't compete with primary CTAs.
- **Missing**: No router-aware variant (requires manual integration with React Router/Next.js Link); no visited-state styling customization.
