# Button Family — Pre-loaded Token Data

> Derived from cross-DS consensus (14 default systems)
> Total: ~52 component tokens across 4 components

## Family hierarchy

```
Button ──┬── IconButton
         ├── SplitButton
         └── ButtonGroup
```

## Prefixes

```
btn-   → Button
ibtn-  → IconButton
sbtn-  → SplitButton
bg-    → ButtonGroup
```

## Color palette (for artifact)

```
button:      { color:"#2563EB", bg:"#EFF6FF", border:"#93C5FD" }
iconbutton:  { color:"#7C3AED", bg:"#F5F3FF", border:"#C4B5FD" }
splitbutton: { color:"#059669", bg:"#ECFDF5", border:"#6EE7B7" }
buttongroup: { color:"#D97706", bg:"#FFFBEB", border:"#FCD34D" }
```

---

## Button · 36 tokens

### root (required slot — per variant)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--btn-bg-primary` | background | default | {color.bg.brand} | Primary variant |
| `--btn-fg-primary` | color | default | {color.fg.on-brand} | — |
| `--btn-border-primary` | border-color | default | transparent | — |
| `--btn-bg-primary-hover` | background | hover | {color.bg.brand-hover} | — |
| `--btn-bg-primary-focus` | background | focus | {color.bg.brand} | Same as default |
| `--btn-ring-focus` | outline-color | focus | {color.border.focus} | WCAG 2.4.7 mandatory |
| `--btn-ring-width` | outline-width | focus | 2px | Min WCAG 2.4.13 |
| `--btn-ring-offset` | outline-offset | focus | 2px | Consistent across variants |
| `--btn-bg-primary-pressed` | background | pressed | {color.bg.brand-pressed} | — |
| `--btn-bg-secondary` | background | default | {color.bg.surface} | Secondary variant |
| `--btn-fg-secondary` | color | default | {color.fg.primary} | — |
| `--btn-border-secondary` | border-color | default | {color.border.default} | — |
| `--btn-bg-secondary-hover` | background | hover | {color.bg.hover} | — |
| `--btn-bg-ghost` | background | default | transparent | Ghost variant |
| `--btn-fg-ghost` | color | default | {color.fg.brand} | — |
| `--btn-bg-ghost-hover` | background | hover | {color.bg.hover} | — |
| `--btn-bg-danger` | background | default | {color.bg.danger} | Destructive variant |
| `--btn-fg-danger` | color | default | {color.fg.on-danger} | — |
| `--btn-bg-danger-hover` | background | hover | {color.bg.danger-hover} | — |
| `--btn-bg-disabled` | background | disabled | {color.bg.disabled} | All variants |
| `--btn-fg-disabled` | color | disabled | {color.fg.disabled} | All variants |
| `--btn-border-disabled` | border-color | disabled | {color.border.disabled} | All variants |
| `--btn-opacity-disabled` | opacity | disabled | 0.5 | Alternative to color change |

### label (required slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--btn-label-font-weight` | font-weight | default | {font.weight.semibold} | — |

### icon-leading / icon-trailing (optional slots)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--btn-icon-fg` | color | default | currentColor | Inherits from root fg |

### size tokens

| Token | sm | md | lg |
|-------|:--:|:--:|:--:|
| `--btn-height-[size]` | 32px | 40px | 48px |
| `--btn-padding-x-[size]` | 12px | 16px | 20px |
| `--btn-font-size-[size]` | 12px | 14px | 16px |
| `--btn-icon-size-[size]` | 16px | 20px | 20px |
| `--btn-gap-[size]` | 6px | 8px | 8px |
| `--btn-radius-[size]` | 6px | 8px | 10px |

---

## IconButton · 12 tokens (+ inherits Button variant colors)

### root (required slot)

Inherits `--btn-bg-*`, `--btn-fg-*`, `--btn-ring-*` from Button.

### size tokens (square)

| Token | sm | md | lg |
|-------|:--:|:--:|:--:|
| `--ibtn-size-[size]` | 32px | 40px | 48px |
| `--ibtn-icon-size-[size]` | 16px | 20px | 24px |
| `--ibtn-radius-[size]` | 6px | 8px | 10px |

---

## SplitButton · 4 tokens (+ inherits Button)

### divider (required slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--sbtn-divider-color` | background | default | {color.border.on-brand} | Separator between action + trigger |
| `--sbtn-divider-width` | width | default | 1px | — |
| `--sbtn-trigger-width` | width | default | 36px | Menu trigger area |
| `--sbtn-trigger-width-sm` | width | sm | 28px | — |

---

## ButtonGroup · 0 additional tokens

Uses Button tokens directly. Only layout (gap, border-radius collapse) — handled by CSS, not tokens.

---
_Pre-loaded data for Token Assignment Agent · Button Family_
_Source: cross-DS consensus from 14 default systems_
