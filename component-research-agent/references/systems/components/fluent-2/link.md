---
system: Fluent 2 (Microsoft)
component: Link
url: https://react.fluentui.dev/?path=/docs/components-link--docs
last_verified: 2026-03-29
confidence: high
---

# Link

## Approach
Fluent 2's Link component is an inline hyperlink element styled to Microsoft's brand colors and interaction states, designed primarily for use embedded within body text — for example, resource links in Teams messages, "Learn more" links in Outlook notifications, and help documentation links throughout Microsoft 365 settings pages. The component renders as a semantic `<a>` element by default, preserving native browser link behavior (right-click context menu, open in new tab, visited state). It applies Fluent's brand color token for the default state and provides hover underline and focus ring states that meet WCAG contrast requirements across all Fluent themes. The Link component is intentionally minimal — it handles the inline text hyperlink pattern and does not double as a navigation button; for button-like navigational elements, Fluent 2's Button with `as="a"` is the recommended approach.

## Key Decisions
1. **Semantic `<a>` element** (HIGH) — Rendering as a native anchor element preserves all browser-native link affordances (history, context menus, keyboard navigation with Tab, activation with Enter) — critical for the diverse user base of Microsoft 365 including users who rely on keyboard-only navigation.
2. **Brand color with underline on hover** (HIGH) — Links use Fluent's `colorBrandForegroundLink` token for the default state (no underline by default) and add underline on hover, following Microsoft's current visual language in Teams and modern Office — balancing clean text presentation with clear hover affordance.
3. **`inline` prop for text flow** (HIGH) — The `inline` prop ensures the link adapts its vertical alignment and baseline to flow correctly within surrounding text content without disrupting line height — essential for links embedded in paragraphs, notifications, and chat messages.
4. **`disabled` state with semantic preservation** (MEDIUM) — Disabled links render with reduced opacity and remove the href, preventing navigation, while maintaining the text in place — important for conditionally available resources in permission-driven Microsoft 365 contexts.
5. **Appearance variants** (MEDIUM) — `subtle` appearance uses a muted foreground color instead of brand blue, supporting secondary or low-emphasis links within complex information hierarchies (e.g., metadata links in SharePoint document libraries).

## Notable Props
- `href`: destination URL (renders native `<a>` behavior)
- `inline`: boolean — adjusts vertical alignment for use within flowing text
- `disabled`: boolean — removes navigation capability and applies disabled styling
- `appearance`: `"default"` | `"subtle"` — controls color/emphasis treatment
- `as`: allows rendering as a different element (e.g., `"button"`) for SPA routing patterns

## A11y Highlights
- **Keyboard**: Tab moves focus to the link; Enter activates navigation; links within text content appear in tab order as expected; no custom keyboard handling required.
- **Screen reader**: Renders as native `<a>` so screen readers announce "link" role automatically; link text should be descriptive (not "click here"); `aria-disabled="true"` is used on disabled links rather than removing from the DOM, preserving discoverability; visited state is conveyed through CSS color change using the `colorBrandForegroundLinkHover`/`colorBrandForegroundLinkVisited` tokens.
- **ARIA**: Native anchor semantics used by default; `aria-disabled="true"` for disabled state; `target="_blank"` links should include `aria-label` or visible indication that they open in a new tab; high-contrast mode supported via Fluent tokens mapping to Windows `LinkText` system color.

## Strengths & Gaps
- **Best at**: Inline hyperlinks within rich text content matching Microsoft 365's visual language; semantic correctness with native anchor behavior; correct behavior in high-contrast mode via token mapping to system link colors.
- **Missing**: No built-in icon slot for "external link" or "opens in new tab" indicators (must be added manually as children); no standalone `visited` styling control for cases where visited state should be suppressed (e.g., within app navigation); no encapsulation for router-aware link patterns (React Router, Next.js) — requires `as` prop composition by the consuming team.
