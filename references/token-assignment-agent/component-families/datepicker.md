# DatePicker Family — Pre-loaded Token Data

> Derived from anatomy.md + variant-matrix.md + interaction-spec.md
> Total: ~66 component tokens across 4 components

## Family hierarchy

```
Calendar ──┬── DatePicker
           └── RangeCalendar ── DateRangePicker
```

## Prefixes

```
cal-  → Calendar
dp-   → DatePicker
rc-   → RangeCalendar
drp-  → DateRangePicker
```

## Color palette (for artifact)

```
calendar:        { color:"#534AB7", bg:"#EEEDFE", border:"#AFA9EC" }
datepicker:      { color:"#0F6E56", bg:"#E1F5EE", border:"#5DCAA5" }
rangecalendar:   { color:"#185FA5", bg:"#E6F1FB", border:"#85B7EB" }
daterangepicker: { color:"#993C1D", bg:"#FAECE7", border:"#F0997B" }
```

---

## Calendar · 25 tokens

### header (required slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--cal-header-bg` | background | default | {color.bg.surface} | — |
| `--cal-header-fg` | color | default | {color.fg.primary} | Month/year title |

### header > nav-control (region — distinct color)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--cal-nav-fg` | color | default | {color.fg.secondary} | Prev/next arrows |
| `--cal-nav-fg-hover` | color | hover | {color.fg.primary} | — |
| `--cal-nav-fg-disabled` | color | disabled | {color.fg.disabled} | No prev/next available |

### grid (required slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--cal-grid-bg` | background | default | {color.bg.primary} | — |

### grid > weekday-labels (region — distinct color)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--cal-weekday-fg` | color | default | {color.fg.tertiary} | Lu, Ma, Mi headers |

### day-cell (required slot — most tokens)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--cal-day-bg` | background | default | {color.bg.primary} | — |
| `--cal-day-fg` | color | default | {color.fg.primary} | — |
| `--cal-day-border` | border-color | default | transparent | — |
| `--cal-day-bg-hover` | background | hover | {color.bg.hover} | — |
| `--cal-day-bg-focus` | background | focus | {color.bg.primary} | Same as default |
| `--cal-day-ring-focus` | outline-color | focus | {color.border.focus} | WCAG 2.4.7 mandatory |
| `--cal-day-ring-width` | outline-width | focus | 2px | Min for WCAG 2.4.13 |
| `--cal-day-bg-pressed` | background | pressed | {color.bg.pressed} | — |
| `--cal-day-bg-selected` | background | selected | {color.bg.brand} | — |
| `--cal-day-fg-selected` | color | selected | {color.fg.on-brand} | — |
| `--cal-day-bg-today` | background | today | transparent | — |
| `--cal-day-ring-today` | outline-color | today | {color.border.strong} | Distinct from selected |
| `--cal-day-fg-disabled` | color | disabled | {color.fg.disabled} | — |
| `--cal-day-opacity-disabled` | opacity | disabled | 0.5 | Alternative to color |
| `--cal-day-bg-selected-focus` | background | selected+focus | {color.bg.brand-hover} | Compound state |
| `--cal-day-fg-outside` | color | outside-month | {color.fg.disabled} | Conditional on EC6 |

---

## DatePicker · 20 tokens (+ inherits Calendar)

### label (optional slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--dp-label-fg` | color | default | {color.fg.primary} | — |
| `--dp-label-fg-disabled` | color | disabled | {color.fg.disabled} | — |
| `--dp-label-fg-error` | color | error | {color.fg.danger} | — |

### input (required slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--dp-input-bg` | background | default | {color.bg.input} | — |
| `--dp-input-fg` | color | default | {color.fg.primary} | — |
| `--dp-input-border` | border-color | default | {color.border.default} | — |
| `--dp-input-bg-hover` | background | hover | {color.bg.input-hover} | — |
| `--dp-input-border-hover` | border-color | hover | {color.border.hover} | — |
| `--dp-input-border-focus` | border-color | focus | {color.border.focus} | — |
| `--dp-input-ring-focus` | outline-color | focus | {color.border.focus} | WCAG mandatory |
| `--dp-input-bg-disabled` | background | disabled | {color.bg.disabled} | — |
| `--dp-input-fg-disabled` | color | disabled | {color.fg.disabled} | — |
| `--dp-input-border-error` | border-color | error | {color.border.danger} | — |
| `--dp-input-fg-placeholder` | color | placeholder | {color.fg.tertiary} | — |

### input size tokens

| Token | sm | md | lg |
|-------|:--:|:--:|:--:|
| `--dp-input-padding-[size]` | 8px | 12px | 16px |
| `--dp-input-font-size-[size]` | 14px | 16px | 18px |
| `--dp-input-height-[size]` | 32px | 40px | 48px |

### popover-container (required slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--dp-popover-bg` | background | default | {color.bg.surface-overlay} | — |
| `--dp-popover-border` | border-color | default | {color.border.default} | — |
| `--dp-popover-shadow` | box-shadow | default | {elevation.3} | — |
| `--dp-popover-radius` | border-radius | default | {radius.lg} | — |

### error-message (optional slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--dp-error-fg` | color | default | {color.fg.danger} | — |
| `--dp-error-icon` | color | default | {color.icon.danger} | — |

### motion tokens

| Token | Value | Notes |
|-------|-------|-------|
| `--dp-popover-duration-open` | 200ms | — |
| `--dp-popover-duration-close` | 150ms | — |
| `--dp-popover-easing-open` | ease-out | — |
| `--dp-popover-easing-close` | ease-in | — |

---

## RangeCalendar · 6 tokens (+ inherits Calendar)

### range-fill (required slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--rc-range-bg` | background | default | {color.bg.brand-subtle} | Selected range fill |
| `--rc-range-bg-preview` | background | selecting | {color.bg.brand-subtle-hover} | During selection |
| `--rc-endpoint-bg` | background | default | {color.bg.brand} | Start/end date |
| `--rc-endpoint-fg` | color | default | {color.fg.on-brand} | Start/end text |
| `--rc-endpoint-ring-focus` | outline-color | focus | {color.border.focus} | WCAG mandatory |
| `--rc-range-bg-disabled` | background | disabled | {color.bg.disabled} | Range over disabled |

---

## DateRangePicker · 15 tokens (+ inherits RangeCalendar + DatePicker patterns)

### dual-input (required slot — follows dp-input pattern)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--drp-input-bg` | background | default | {color.bg.input} | Same pattern as dp- |
| `--drp-input-fg` | color | default | {color.fg.primary} | — |
| `--drp-input-border` | border-color | default | {color.border.default} | — |
| `--drp-input-border-focus` | border-color | focus | {color.border.focus} | — |
| `--drp-input-ring-focus` | outline-color | focus | {color.border.focus} | WCAG mandatory |
| `--drp-separator-fg` | color | default | {color.fg.tertiary} | → or — separator |

### preset-panel (optional slot)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--drp-preset-bg` | background | default | {color.bg.surface} | — |
| `--drp-preset-fg` | color | default | {color.fg.primary} | — |
| `--drp-preset-bg-hover` | background | hover | {color.bg.hover} | — |
| `--drp-preset-bg-selected` | background | selected | {color.bg.brand-subtle} | — |
| `--drp-preset-fg-selected` | color | selected | {color.fg.brand} | — |

### apply-footer (optional slot — dep: with-presets)

| Token | Property | State | Semantic ref | Notes |
|-------|----------|-------|-------------|-------|
| `--drp-footer-bg` | background | default | {color.bg.surface} | — |
| `--drp-footer-border-top` | border-color | default | {color.border.default} | — |

### dual-input size tokens (inherits dp- sizes)

Same size tokens as DatePicker input (--dp-input-padding-*, --dp-input-font-size-*, --dp-input-height-*).
DateRangePicker reuses them — no duplication.

### motion tokens (inherits dp- motion)

Same popover motion tokens as DatePicker.

---
_Pre-loaded data for Token Assignment Agent · DatePicker Family_
_Source: anatomy.md + variant-matrix.md + interaction-spec.md_
