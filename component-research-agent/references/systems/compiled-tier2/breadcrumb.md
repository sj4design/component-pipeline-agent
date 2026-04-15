---
component: Breadcrumb
tier: 2
last_verified: 2026-03-28
---

# Breadcrumb — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Breadcrumb | `<nav aria-label="breadcrumb">`; BreadcrumbItem; last item as current page | high |
| Salesforce Lightning | Breadcrumb | nav + ol; current item truncation on narrow widths | high |
| GitHub Primer | Breadcrumb | Slash "/" separators matching file path convention; GitHub navigation context | high |
| shadcn/ui | Breadcrumb | Radix-based; BreadcrumbSeparator; BreadcrumbEllipsis for truncation | high |
| Playbook | Breadcrumb | Navigation hierarchy; dual React/Rails | medium |
| REI Cedar | CdrBreadcrumb | Vue breadcrumb; truncation for deep hierarchies; WCAG 2.1 AA | medium |
| Wise Design | Breadcrumb | Financial product section navigation | low |
| Dell Design System | Breadcrumb | Enterprise IT section navigation | low |

## Key Decision Patterns

**Separator character:** Primer uses "/" (slash) as the separator — matching GitHub's file path and URL conventions. Other systems use "›" or ">" chevron characters. shadcn/ui uses ChevronRight icon via BreadcrumbSeparator. Separators should be aria-hidden.

**Current page:** The last breadcrumb item (current page) should be `aria-current="page"` and typically not a link (or if it is a link, it should be non-interactive or visually distinct). Paste, Primer, and shadcn/ui handle this explicitly.

**Truncation for deep hierarchies:** Cedar and shadcn/ui (BreadcrumbEllipsis) support collapsing middle items in deep hierarchies (e.g., A > ... > D > Current). Truncation must be accessible — hidden items should be discoverable via a button expand or tooltip.

**Landmark:** All breadcrumbs should be wrapped in `<nav aria-label="Breadcrumb">` (or `<nav aria-label="You are here">`) to provide a navigation landmark with a distinct label from the main navigation.

## A11y Consensus
- `<nav aria-label="Breadcrumb">` wrapping landmark
- `<ol>` list for breadcrumb items (ordered list — the hierarchy order matters)
- Current page: `aria-current="page"` on last item
- Separators: aria-hidden="true" (decorative, not part of the name)
- Truncation: provide accessible way to access hidden items

## Recommended Use
Universal component. Use shadcn/ui Breadcrumb for React apps with truncation support. Use Primer Breadcrumb in GitHub-style interfaces with slash separators. Always wrap in `<nav aria-label="Breadcrumb">` with an ordered list.
