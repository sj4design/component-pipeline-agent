---
system: Gestalt (Pinterest)
component: IllustratedMessage (Empty State equivalent)
url: https://gestalt.pinterest.systems/web/illustratedmessage
last_verified: 2026-03-29
confidence: high
---

# Empty State (IllustratedMessage)

## Approach
Gestalt does not have a component explicitly named "EmptyState." The equivalent is IllustratedMessage — a component designed precisely for empty states, zero-result searches, error states, and no-content scenarios. The naming reflects Pinterest's visual-first philosophy: empty states are not just absence of content, they are opportunities for illustrated, brand-expressive communication. Pinterest uses custom spot illustrations to make empty states feel warm, on-brand, and actionable rather than cold or broken. IllustratedMessage pairs an SVG illustration with a title, body text, and optional CTA button — creating a complete empty state composition. This is especially important on Pinterest's discovery platform, where an empty board or a zero-result search is a key moment to re-engage the user and guide them toward content.

## Key Decisions
1. **Illustration as a required element** (HIGH) — Pinterest's brand and UX philosophy treat illustrations as essential communication tools, not optional decoration. Requiring an illustration in empty states reinforces brand warmth and increases engagement compared to icon-only or text-only fallbacks.
2. **Named IllustratedMessage, not EmptyState** (HIGH) — The broader name reflects that the component handles multiple "empty" scenarios: no results, errors, onboarding placeholders, permission gates. Calling it "EmptyState" would have undersold its range and led to parallel components being created.
3. **CTA action integrated at component level** (HIGH) — Empty states on Pinterest almost always have a suggested next action (e.g., "Create a board," "Try different search terms," "Follow some people"). Embedding CTA support in the component ensures the action path is never missing.
4. **Illustration slot accepts custom SVG** (MEDIUM) — Rather than locking to a fixed icon set, IllustratedMessage accepts custom SVG illustrations, allowing different product areas to use contextually appropriate artwork while sharing the same layout structure.
5. **Centered layout with max-width constraint** (MEDIUM) — The component uses centered alignment with a constrained max-width, ensuring it reads well on both narrow mobile screens and wide desktop viewports without appearing lost on large displays.

## Notable Props
- `title`: Primary heading text for the empty state (required)
- `description`: Body text providing context or guidance
- `button`: A `<Button>` component passed as the primary CTA
- `link`: An optional secondary link action
- `icon`: An SVG illustration component or icon to display above the title

## A11y Highlights
- **Keyboard**: CTA button is fully keyboard accessible via Tab/Enter. No interactive elements beyond the CTA and optional link.
- **Screen reader**: Heading is rendered as an `<h2>` or appropriate heading level based on page context; description text is read in sequence. Illustrations are decorative and should be `aria-hidden="true"`.
- **ARIA**: Illustration SVGs must be marked `aria-hidden="true"` to avoid screen readers announcing decorative graphic content; CTA buttons follow standard button accessibility patterns with explicit labels.

## Strengths & Gaps
- **Best at**: Visually rich, brand-consistent empty states; integrated CTA for immediate re-engagement; flexible illustration slot for contextual artwork; works across zero-result search, empty boards, error states, and onboarding gaps.
- **Missing**: No built-in variant presets for common Pinterest scenarios (e.g., "no boards," "no results," "offline") — each team must supply its own illustration and copy; no loading-to-empty transition handling; no support for secondary action buttons (only one CTA + one link).
