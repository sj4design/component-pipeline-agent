---
system: GOV.UK Design System
component: Table
url: https://design-system.service.gov.uk/components/table/
last_verified: 2026-03-28
confidence: high
---

# Table

## Approach
GOV.UK's Table component focuses on presenting government data clearly and accessibly. It is a semantic HTML table with GOV.UK's styling conventions: clear typography, appropriate spacing, and a design optimized for dense information (tax data, benefit amounts, application statuses). The component provides specific guidance on numeric data alignment (right-align numbers), sorting behavior, and caption usage. The emphasis is on content guidelines alongside the component itself — GOV.UK believes that how you structure your data is as important as how it looks.

## Key Decisions
1. **Caption required in guidance** (HIGH) — GOV.UK's guidance strongly recommends using the caption element for all tables. In government content, tables frequently appear without clear visual context from surrounding text, and screen reader users need the caption to understand what they're navigating into.
2. **Right-align numeric columns** (HIGH) — GOV.UK's guidance specifies that numeric data should be right-aligned for easier scanning and comparison. This is accessibility-informed: right-aligned numbers in tabular figures are significantly faster to scan for users with cognitive disabilities.
3. **No interactive features** (HIGH) — Pure display table. GOV.UK services are designed around simple data presentation — filtering and sorting would require JavaScript and add complexity that isn't justified for government data tables which are typically small and static.

## Notable Props
- No JavaScript component — pure HTML/CSS/Nunjucks macro
- `caption`: table caption text
- `head`: column header array
- `rows`: data rows array
- `firstCellIsHeader`: treats first column as row headers (th elements)

## A11y Highlights
- **Keyboard**: No interactive elements; standard table keyboard navigation
- **Screen reader**: `<caption>` provides table name; `<th scope="col">` for column headers; `<th scope="row">` when firstCellIsHeader
- **ARIA**: Semantic HTML only; no ARIA overlays needed

## Strengths & Gaps
- **Best at**: Caption guidance; numeric alignment conventions; semantic header structure; content guidance alongside component
- **Missing**: No sort, filter, or pagination; no sticky headers; responsive behavior requires custom CSS
