---
system: Fluent 2 (Microsoft)
component: Card
url: https://fluent2.microsoft.design/components/web/react/card/usage
last_verified: 2026-03-28
confidence: high
---

# Card

## Approach
Fluent 2's Card is a surface container following Fluent's elevation and surface token system. It supports interactive variants (clickable cards, selectable cards) and size control. Microsoft uses cards extensively in Teams (chat cards, app cards), SharePoint (web parts), and Viva (employee experience). The card system handles non-interactive display, clickable (link) cards, and selectable (toggle) cards as distinct modes.

## Key Decisions
1. **Interactive modes** (HIGH) — Cards can be non-interactive, clickable (entire card is a link), or selectable (checkbox-like toggle). These three modes are explicitly supported, covering Microsoft's Teams app card, SharePoint link card, and multi-select card patterns.
2. **orientation prop** (MEDIUM) — `"horizontal"` for landscape card layouts (image left, content right) and `"vertical"` for portrait (image top, content below). Teams message extension cards use horizontal layout.
3. **CardHeader, CardPreview, CardFooter slots** (HIGH) — Structured card layout with image preview area, header (icon + title + subtitle), and footer (action buttons). This structure matches Teams card patterns precisely.

## Notable Props
- `appearance`: `"filled" | "filled-alternative" | "outline" | "subtle"`
- `orientation`: `"horizontal" | "vertical"`
- `selected` / `onSelectionChange`: selectable card state
- `onClick`: clickable card mode
- CardHeader: `image`, `header`, `description` slots
- CardPreview: media/image preview area

## A11y Highlights
- **Keyboard**: Clickable cards use button/link keyboard behavior; selectable cards use checkbox behavior
- **Screen reader**: Selectable card announces selection state; clickable card announces link destination
- **ARIA**: aria-checked for selectable; role="link" or "button" for interactive cards

## Strengths & Gaps
- **Best at**: Three interaction modes; orientation support; structured slot system; Teams/SharePoint patterns
- **Missing**: No card group/grid management; no card skeleton state built-in
