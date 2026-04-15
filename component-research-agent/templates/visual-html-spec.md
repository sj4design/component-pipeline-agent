# Visual HTML Report Specification

> Read this ONLY when user requests the visual HTML report.
> This file was extracted from SKILL.md to save ~170 lines of context.

## Before generating: load quality standard

**ALWAYS read `templates/visual-reference-guide.md` before generating any visual output.**
Use `templates/visual-reference-template.html` as the base template.

## const DATA pattern (saves ~60% tokens)

1. Copy `templates/visual-reference-template.html`
2. Replace ONLY the DATA sections:
   - **DATA section 1** (top): `DATA_FAMILY`, `DATA_FAMILY_LOWER`, mini wireframes, questions, variants, large wireframes
   - **DATA section 2** (inside App): researchCards, divergences, consensusItems
3. Do NOT modify any rendering code after the "END OF DATA" separator
4. Do NOT modify any rendering code after "END COMPONENT-SPECIFIC RESEARCH DATA"

Icons are defined as inline SVG components at the top of the template — no external lucide-react CDN needed.

## Technology stack

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

Write logic inside `<script type="text/babel">` — Babel transpiles JSX in-browser. No build step.

## Dark theme (shadcn/ui dark)

```js
tailwind.config = {
  darkMode: 'class',
  theme: { extend: { colors: {
    base: '#06060c', surface: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.06)',
    m3: '#e94560', spectrum: '#4cc9f0', carbon: '#f59e0b',
    polaris: '#22c55e', atlassian: '#3b82f6', antd: '#22c55e',
  }}}
}
```

Text: primary `#e8e8ef`, secondary `rgba(255,255,255,0.55)`, muted `rgba(255,255,255,0.35)`.
Font: `'DM Sans', -apple-system, sans-serif` (Google Fonts CDN).

## Required sections (in order)

| # | Section | Key details |
|---|---------|-------------|
| 1 | Header | Red monospace `RESEARCH AGENT`, mode badge (QUICK=cyan, GUIDED=red, BRIEF=purple), component `<h1>`, dropdown mode switcher with Lucide icons |
| 2 | Phase Nav | Guided/Brief only. Pill bar: Scope → Confirm → Research. Active = mode color |
| 3 | Pattern Tags | Selected patterns as colored pills + counter "X de Y sistemas" |
| 4 | System Cards | Collapsed: name+color+badge+tags+headline+chevron. Expanded: narrative+WIREFRAME+takeaway |
| 5 | Consensus | Green container, CheckCircle2 icons, min 5 items, `border-b border-white/5` |
| 6 | Divergences | React state, question headers, 2-col grid, radio selection, DECIDIDO badge, counter |
| 7 | Next Steps | 5 numbered cards, cycling left-border colors, slash commands |
| 8 | Export Footer | Monospace command, stats, `Exportar Markdown` button (blob download) |
| 9 | Sticky Bar | `fixed bottom-0`, blur backdrop, mode icon+stats left, `Ver siguiente paso` right |

## System colors

| System | Color |
|--------|-------|
| Material Design 3 | `#e94560` |
| Spectrum (Adobe) | `#4cc9f0` |
| Carbon (IBM) | `#f59e0b` |
| Polaris (Shopify) | `#22c55e` |
| Atlassian | `#3b82f6` |
| Ant Design | `#22c55e` |

## Wireframe rules (CRITICAL)

Every system card MUST contain a real HTML/CSS wireframe — NOT bullets, NOT icon+text.

Wireframes ARE: calendar grids, input fields, buttons, phone frames, arrow flows.

Styling:
- Container: `bg: rgba(0,0,0,0.25)`, `border-radius: 10px`, `padding: 16px`
- Cells: `rgba(255,255,255,0.04)`, Borders: `rgba(255,255,255,0.07)`
- Text: `rgba(255,255,255,0.35)` monospace, Accent: system color @ 0.3 opacity
- All elements: `pointer-events: none`

## Self-check before saving

1. ☐ Every system card has a real wireframe (not text description)
2. ☐ Takeaways reference user's scope
3. ☐ Divergences have selectable React state
4. ☐ Consensus items have Lucide icons
5. ☐ Export button generates real `.md` blob
6. ☐ Sticky bar present and fixed
7. ☐ System colors consistent throughout
