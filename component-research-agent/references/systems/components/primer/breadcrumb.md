---
system: GitHub Primer
component: Breadcrumbs
url: https://primer.style/components/breadcrumbs
last_verified: 2026-03-28
confidence: high
---

# Breadcrumbs

## Approach
GitHub Primer's Breadcrumbs represent GitHub's file path navigation in repository views — the path from repo root to current file (owner/repo/tree/branch/folder/file). This is GitHub's primary breadcrumb use case and drives the component's design toward showing file system path hierarchies. The component uses nav/ol/li with slash separator by default.

## Key Decisions
1. **File path representation** (HIGH) — Designed around GitHub's file path breadcrumb (owner/repo/blob/main/src/components/Button.tsx), with each segment linking to the respective directory/file level.
2. **Slash separator by default** (HIGH) — The "/" separator is GitHub's standard file path delimiter, distinctively different from the ">" chevron used in most other systems, reflecting the file system metaphor.
3. **Responsive wrapping** (MEDIUM) — Breadcrumbs wrap to next line on narrow viewports rather than collapsing to ellipsis, appropriate for code browsing where the full path has value.

## Notable Props
- Breadcrumbs.Item: Each breadcrumb segment
- `href`: Link for each item
- `selected`: Marks the current/selected item (renders without href)

## A11y Highlights
- **Keyboard**: Tab through breadcrumb links; selected item is non-interactive
- **Screen reader**: nav aria-label="breadcrumb"; ol list structure; selected item has aria-current="page"
- **ARIA**: aria-label on nav; aria-current="page" on selected; separator "/" is aria-hidden

## Strengths & Gaps
- **Best at**: File path navigation; slash separator convention; GitHub's unique repository navigation patterns
- **Missing**: No ellipsis truncation; wrap-only responsive behavior; limited to GitHub's slash-separator aesthetic
