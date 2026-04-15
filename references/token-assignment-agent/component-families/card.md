# Card Family — Pre-loaded Token Data

> Derived from cross-DS consensus (14 default systems)
> Total: ~28 component tokens

## Family hierarchy

```
Card (standalone)
  ├── CardHeader (region)
  ├── CardBody (region)
  ├── CardFooter (region)
  └── CardMedia (region)
```

## Prefixes

```
card- → Card (all regions share prefix)
```

## Color palette (for artifact)

```
card: { color:"#0891B2", bg:"#ECFEFF", border:"#67E8F9" }
```

---

## Card · 28 tokens

### root (required slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--card-bg` | background | default | {color.bg.surface} | — |
| `--card-border` | border-color | default | {color.border.default} | — |
| `--card-border-width` | border-width | default | 1px | — |
| `--card-shadow` | box-shadow | default | {elevation.1} | — |
| `--card-radius` | border-radius | default | {radius.lg} | — |
| `--card-bg-hover` | background | hover | {color.bg.surface-hover} | Only if clickable |
| `--card-shadow-hover` | box-shadow | hover | {elevation.2} | Only if clickable |
| `--card-ring-focus` | outline-color | focus | {color.border.focus} | WCAG 2.4.7 if interactive |
| `--card-ring-width` | outline-width | focus | 2px | — |
| `--card-bg-selected` | background | selected | {color.bg.brand-subtle} | If selectable |
| `--card-border-selected` | border-color | selected | {color.border.brand} | — |
| `--card-opacity-disabled` | opacity | disabled | 0.5 | — |

### header (optional region)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--card-header-fg` | color | default | {color.fg.primary} | Title text |
| `--card-header-fg-subtitle` | color | default | {color.fg.secondary} | Subtitle |
| `--card-header-padding` | padding | default | {spacing.4} | — |

### body (required region)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--card-body-fg` | color | default | {color.fg.primary} | — |
| `--card-body-padding` | padding | default | {spacing.4} | — |

### footer (optional region)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--card-footer-bg` | background | default | {color.bg.surface-secondary} | Subtle distinction |
| `--card-footer-border-top` | border-color | default | {color.border.default} | — |
| `--card-footer-padding` | padding | default | {spacing.4} | — |

### media (optional region)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--card-media-bg` | background | default | {color.bg.neutral-subtle} | Placeholder bg |
| `--card-media-radius` | border-radius | default | {radius.lg} {radius.lg} 0 0 | Top corners only |

### spacing tokens

| Token | Compact | Default | Spacious |
|-------|:-------:|:-------:|:--------:|
| `--card-padding-[density]` | 12px | 16px | 24px |
| `--card-gap-[density]` | 8px | 12px | 16px |

### variant tokens (if multiple card styles)

| Token | Property | Semantic ref | Notes |
|-------|----------|-------------|-------|
| `--card-bg-elevated` | background | {color.bg.surface-elevated} | Elevated variant |
| `--card-shadow-elevated` | box-shadow | {elevation.2} | — |
| `--card-bg-outlined` | background | transparent | Outlined variant |
| `--card-border-outlined` | border-color | {color.border.strong} | — |

---
_Pre-loaded data for Token Assignment Agent · Card Family_
_Source: cross-DS consensus from 14 default systems_
