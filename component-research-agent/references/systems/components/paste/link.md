---
system: Twilio Paste
component: Anchor (Link)
url: https://paste.twilio.design/components/anchor
last_verified: 2026-03-28
confidence: high
---

# Anchor (Link)

## Approach
Twilio Paste calls its link component "Anchor," emphasizing the HTML anchor element semantics. Paste provides extensive documentation on when to use Anchor (navigation links) vs Button (actions that don't navigate), preventing the common misuse of links styled as buttons or buttons styled as links. The Anchor supports all standard link behaviors including external link with visual indicator.

## Key Decisions
1. **Anchor naming** (HIGH) — Naming the component "Anchor" rather than "Link" reinforces the semantic distinction between navigation (anchor) and action (button) — a key principle in Paste's accessibility guidance.
2. **External link indicator** (HIGH) — External links automatically show an external link icon (↗) and add sr-only text "opens in a new tab" when target="_blank", communicating the behavior change to all users.
3. **Variant system** (MEDIUM) — default, inverse (for dark backgrounds), and muted variants address the common contexts where links appear in the Twilio console.

## Notable Props
- `href`: Required link destination
- `showExternal`: Boolean to show external indicator (auto-set for target="_blank")
- `variant`: "default" | "inverse" | "muted"
- `i18nExternalLinkLabel`: Customizable external link sr-only label

## A11y Highlights
- **Keyboard**: Enter activates (native anchor behavior); Tab to focus; visible focus ring
- **Screen reader**: Link destination announced; external links announce "opens in a new tab"; accessible name from text content
- **ARIA**: Native anchor semantics; sr-only text for external links; aria-label when link text is ambiguous

## Strengths & Gaps
- **Best at**: Anchor vs Button semantic clarity; automatic external link indicator with sr-only text; inverse variant for dark backgrounds
- **Missing**: No "as" polymorphic pattern for router Link integration without wrapping
