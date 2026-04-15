---
system: Twilio Paste
component: Button
url: https://paste.twilio.design/components/button
last_verified: 2026-03-28
confidence: high
---

# Button

## Approach
Twilio Paste's Button is one of the most thoroughly documented components in the system, with extensive guidance on when to use each variant. Paste enforces semantic button usage — all buttons must have meaningful labels and the system actively discourages icon-only buttons without accessible labels. The component supports a rich set of variants tied to communication hierarchy (primary, secondary, destructive, link) and includes loading state support critical for async Twilio API operations.

## Key Decisions
1. **Variant hierarchy tied to communication** (HIGH) — primary/secondary/destructive/link variants map to communication hierarchy rather than just visual style, with documentation on correct semantic usage for each.
2. **Loading state as first-class** (HIGH) — `loading` prop with spinner replaces button content while preserving button dimensions, essential for Twilio's API-call-heavy console where operations may take seconds.
3. **Size system** (MEDIUM) — small/default/icon sizes with explicit icon-only size variant, guiding correct usage of icon buttons without text labels.

## Notable Props
- `variant`: "primary" | "secondary" | "destructive" | "destructive_secondary" | "link" | "destructive_link" | "reset"
- `loading`: Boolean — shows spinner, disables interaction, maintains layout
- `size`: "default" | "small" | "icon" | "icon_small" | "rounded_small"
- `as`: Polymorphic rendering — render as anchor, span, or other element

## A11y Highlights
- **Keyboard**: Enter and Space activate; focus ring visible; disabled state prevents activation
- **Screen reader**: Loading state announces "Loading..." to screen readers when spinner is shown
- **ARIA**: aria-disabled for non-interactive states; aria-busy during loading; icon-only buttons require aria-label

## Strengths & Gaps
- **Best at**: Loading state handling; strong documentation on semantic variant usage; polymorphic `as` prop
- **Missing**: No toggle/pressed state button variant; split button pattern not built-in
