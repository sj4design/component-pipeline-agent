---
system: Radix UI (WorkOS)
component: Breadcrumb (no dedicated primitive — see Radix Themes)
url: https://www.radix-ui.com/themes/docs/components/breadcrumb
last_verified: 2026-03-28
confidence: high
---

# Breadcrumb

## Approach
Radix Themes provides a Breadcrumb component. At the primitives level, there is no Breadcrumb primitive. The Themes Breadcrumb provides the semantic HTML structure (`<nav>`, `<ol>`, `<li>`, `<a>`) and correct ARIA attributes. The component uses Radix's token system for link color and separator styling.

## Key Decisions
1. **Semantic HTML structure** (HIGH) — `<nav aria-label="breadcrumb">` containing `<ol>` with `<li>` items. The current page item has `aria-current="page"`. This is the correct, fully accessible breadcrumb pattern.
2. **Automatic separator** (MEDIUM) — Separators between items are CSS-generated (pseudo-elements or a separator component), keeping the DOM clean and ensuring separators are not read by screen readers.

## Notable Props
- Items via composition
- Separator customization
- `aria-label` on nav element

## A11y Highlights
- **Keyboard**: Links are standard keyboard-navigable anchors
- **Screen reader**: `<nav aria-label="breadcrumb">` creates a navigation landmark; `aria-current="page"` on last item identifies current location
- **ARIA**: Separators are hidden from AT (aria-hidden or pseudo-element)

## Strengths & Gaps
- **Best at**: Correct ARIA structure; navigation landmark
- **Missing**: No overflow/truncation for deep breadcrumbs; no collapsible breadcrumb for mobile
