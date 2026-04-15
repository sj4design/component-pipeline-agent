---
system: GitHub Primer
component: Divider (via Box / utility)
url: https://primer.style/components/box
last_verified: 2026-03-28
confidence: high
---

# Divider

## Approach
GitHub Primer does not have a dedicated Divider component. Visual separation in GitHub's UI is achieved through Primer's Box component with border utilities, or through HTML `<hr>` elements styled with Primer's CSS. The Primer CSS framework includes styles for `<hr>` that match GitHub's visual language. In React, border props on Box or Stack components create visual separation without a dedicated Divider.

## Key Decisions
1. **Box border utilities** (HIGH) — Primer's Box component with `borderBottomWidth`, `borderColor` props creates horizontal rule-style dividers inline with layout, without a separate Divider component.
2. **Semantic HR** (MEDIUM) — Native `<hr>` with Primer CSS styling is the semantic approach for section-level separation.
3. **No dedicated component** (HIGH) — Consistent with Primer's primitive-first philosophy; layout and spacing utilities are preferred over dedicated simple components.

## Notable Props
- Box: `borderBottomWidth`, `borderColor`, `borderStyle` props for inline dividers
- HTML: `<hr>` with Primer CSS

## A11y Highlights
- **Keyboard**: Not interactive
- **Screen reader**: Semantic HR provides separator role; Box borders are decorative
- **ARIA**: Native HR semantics when using `<hr>`; decorative borders ignored

## Strengths & Gaps
- **Best at**: Flexible border utilities; semantic HR when needed; GitHub's minimalist separation style
- **Missing**: No dedicated component for teams wanting consistent divider usage patterns
