# Alert Family — Pre-loaded Token Data

> Derived from cross-DS consensus (14 default systems)
> Total: ~30 component tokens

## Family hierarchy

```
Alert (standalone)
  ├── InlineAlert (embedded in page flow)
  └── Toast / Banner (overlay, auto-dismiss)
```

## Prefixes

```
alert- → Alert / InlineAlert
toast- → Toast
```

## Color palette (for artifact)

```
alert: { color:"#DC2626", bg:"#FEF2F2", border:"#FCA5A5" }
```

---

## Alert · 30 tokens

### root (required slot — per status)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--alert-bg-info` | background | default | {color.bg.info-subtle} | Info variant |
| `--alert-border-info` | border-color | default | {color.border.info} | — |
| `--alert-icon-info` | color | default | {color.icon.info} | — |
| `--alert-bg-success` | background | default | {color.bg.success-subtle} | Success variant |
| `--alert-border-success` | border-color | default | {color.border.success} | — |
| `--alert-icon-success` | color | default | {color.icon.success} | — |
| `--alert-bg-warning` | background | default | {color.bg.warning-subtle} | Warning variant |
| `--alert-border-warning` | border-color | default | {color.border.warning} | — |
| `--alert-icon-warning` | color | default | {color.icon.warning} | — |
| `--alert-bg-error` | background | default | {color.bg.danger-subtle} | Error variant |
| `--alert-border-error` | border-color | default | {color.border.danger} | — |
| `--alert-icon-error` | color | default | {color.icon.danger} | — |
| `--alert-radius` | border-radius | default | {radius.md} | — |
| `--alert-border-width` | border-width | default | 1px | Some systems use left-only |

### title (optional slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--alert-title-fg` | color | default | {color.fg.primary} | — |
| `--alert-title-font-weight` | font-weight | default | {font.weight.semibold} | — |

### description (required slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--alert-desc-fg` | color | default | {color.fg.primary} | — |

### dismiss (optional slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--alert-dismiss-fg` | color | default | {color.fg.secondary} | — |
| `--alert-dismiss-fg-hover` | color | hover | {color.fg.primary} | — |
| `--alert-dismiss-ring-focus` | outline-color | focus | {color.border.focus} | WCAG 2.4.7 |

### action (optional slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--alert-action-fg` | color | default | {color.fg.brand} | Link or button |
| `--alert-action-fg-hover` | color | hover | {color.fg.brand-hover} | — |

### spacing tokens

| Token | Value | Notes |
|-------|-------|-------|
| `--alert-padding` | 16px | Internal padding |
| `--alert-gap` | 12px | Between icon, content, actions |
| `--alert-icon-size` | 20px | Status icon |

### Toast-specific tokens

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--toast-bg` | background | default | {color.bg.surface-overlay} | — |
| `--toast-border` | border-color | default | {color.border.default} | — |
| `--toast-shadow` | box-shadow | default | {elevation.3} | Overlay level |
| `--toast-radius` | border-radius | default | {radius.lg} | — |
| `--toast-max-width` | max-width | default | 400px | — |

---
_Pre-loaded data for Token Assignment Agent · Alert Family_
_Source: cross-DS consensus from 14 default systems_
