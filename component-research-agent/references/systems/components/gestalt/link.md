---
system: Gestalt (Pinterest)
component: Link
url: https://gestalt.pinterest.systems/web/link
last_verified: 2026-03-29
confidence: high
---

# Link

## Approach
Gestalt's Link component is a styled hyperlink that wraps content in an `<a>` element, applying Pinterest's typographic and color conventions for interactive inline text. Link is used for navigation within text bodies, supplementary actions that don't warrant a full Button, and external URL references. Pinterest's design philosophy treats Link as a text-integrated navigation affordance — not a button alternative. A key distinction in Gestalt is the strict separation between Link (text-based, inline, semantic `<a>`) and Button (action-based, block or inline-block, semantic `<button>`). This separation prevents the common anti-pattern of using links for non-navigational actions. Link's visual treatment uses Pinterest's primary color (red) for inline links, signaling interactivity within text contexts while maintaining legibility against Pinterest's white and gray backgrounds. Gestalt also provides an `underline` prop to control the underline, typically shown on hover or always shown for accessibility in body copy contexts.

## Key Decisions
1. **Strict semantic Link vs. Button separation** (HIGH) — Pinterest enforces that Link is only used for navigational actions (`href`-driven) and Button is used for state-changing actions. This keeps HTML semantics correct and avoids assistive technology misinterpretation of interactive elements.
2. **Color from Pinterest's primary token** (HIGH) — Link text color uses the `color.text.link` semantic token (Pinterest red), ensuring links are immediately recognizable within Pinterest's visual language and maintain brand consistency across the product.
3. **`externalLinkIcon` prop for external URLs** (HIGH) — Pinterest serves a global audience and links frequently to external domains (advertiser sites, creator resources). The optional external link icon prop gives users a clear signal that clicking will leave Pinterest, which is important for trust and user orientation.
4. **`display` prop controls inline vs. block behavior** (MEDIUM) — By default Link is inline, but `display="block"` is available for wrapping larger interactive areas (e.g., a card title that functions as a link). This prevents misuse of non-semantic wrappers.
5. **`target` and `rel` managed with safety defaults** (MEDIUM) — When `target="_blank"` is used, Gestalt automatically applies `rel="noopener noreferrer"` to prevent security vulnerabilities, a default that is correct for Pinterest's many outbound links to third-party content.

## Notable Props
- `href`: Required URL for the link destination
- `children`: Link text content (required)
- `externalLinkIcon`: `"default"` | `"none"` | custom icon — controls external link indicator
- `target`: `"_blank"` | `"_self"` — controls link target; `rel` safety attributes applied automatically for `_blank`
- `display`: `"inline"` | `"inlineBlock"` | `"block"` — controls CSS display behavior
- `underline`: `"always"` | `"hover"` | `"none"` — controls underline visibility
- `accessibilityLabel`: Override for screen reader text when link text alone is insufficient
- `onClick`: Optional click handler for analytics or SPA navigation

## A11y Highlights
- **Keyboard**: Fully keyboard accessible via Tab to focus and Enter to activate; focus ring visible using Pinterest's focus indicator token.
- **Screen reader**: Rendered as native `<a>` element; screen readers announce link role and text automatically; `accessibilityLabel` overrides visible text for "read more" or icon-only link scenarios; external link icon has its own `aria-label` suffix ("opens in a new tab").
- **ARIA**: `aria-label` via `accessibilityLabel` prop for supplementary context; no additional ARIA roles needed given semantic `<a>` usage; links with `target="_blank"` include screen reader announcement of new tab behavior.

## Strengths & Gaps
- **Best at**: Semantically correct inline hyperlinks; automatic external link safety (`rel` attributes); clear Pinterest brand color treatment; enforces Link/Button separation; strong external link icon handling for Pinterest's many outbound references.
- **Missing**: No built-in visited state color differentiation (some accessibility guidelines recommend distinct visited colors); no "button-styled link" variant (consuming code must compose Button + onClick navigation for button-look navigation elements); limited built-in truncation support for long link text in constrained spaces.
