# Foundations — Color & Elevation (14 Systems)

> Sections 3.1-3.6, 4.1-4.3 from foundations.md

## 3.1 Capas de Token (consenso: 3 capas, 13/14 sistemas)
| Capa | Propósito | Ejemplo |
|------|-----------|---------|
| **Primitive** | Valores raw de paleta | `blue-500: #2563EB` |
| **Semantic** | Roles de UI | `--color-bg-brand: {blue-500}` |
| **Component** | Scoped al componente | `--btn-bg-primary: {color-bg-brand}` |

Solo shadcn/ui usa 2 capas (semantic → component directo).

## 3.2 Semantic Color Roles (mínimos requeridos)
| Rol | Prevalencia | Token Pattern | Uso |
|-----|------------|---------------|-----|
| Background | 14/14 | `bg`, `surface` | Fondos de superficie |
| Foreground/Text | 14/14 | `text`, `fg` | Texto e iconos |
| Border | 14/14 | `border` | Bordes y separadores |
| Brand/Primary | 14/14 | `primary`, `brand` | Acciones principales |
| Interactive | 12/14 | `interactive`, `action` | Links, botones secundarios |
| Error/Danger | 14/14 | `error`, `danger`, `critical` | Errores, destructivo |
| Warning | 14/14 | `warning`, `attention` | Precaución |
| Success | 14/14 | `success`, `positive` | Confirmación |
| Info | 13/14 | `info`, `discovery` | Información neutral |
| Overlay | 10/14 | `overlay`, `blanket` | Backdrops modales |
| Inverse | 8/14 | `inverse` | Texto en fondos bold |

## 3.3 Jerarquía de Background/Surface
| Nivel | Token Pattern | Uso | Sistemas |
|-------|--------------|-----|----------|
| Base | `bg`, `bg-base` | Fondo de app | Universal |
| Surface | `bg-surface`, `surface` | Cards, containers | Polaris, Atlassian, Material |
| Elevated | `bg-elevated` | Popovers, dropdowns | Ant, Paste, Wise |
| Fill | `bg-fill` | Elementos sólidos interactivos | Polaris, Ant |

## 3.4 Estado de Color — Estrategias
| Estrategia | Sistemas | Cómo funciona |
|-----------|----------|---------------|
| **State tokens dedicados** | 11/14 | Sufijo: `-hover`, `-active`, `-focus`, `-disabled` |
| **Opacity overlay** | Material | Capa superpuesta: hover 8%, focus 10%, pressed 10%, disabled 38% |
| **Scale steps** | Primer | Steps de escala neutral para rest/hover/active |

**Consenso: state tokens dedicados.** Pattern: `--color-{element}-{role}-{state}`
```
--color-bg-primary              → default
--color-bg-primary-hover        → hover (+1 step más oscuro)
--color-bg-primary-active       → pressed (+2 steps)
--color-bg-primary-disabled     → disabled (opacity reducida)
```

## 3.4.1 Focus Ring (consenso: 14/14 sistemas)
| Property | Value | Consenso | Sistemas |
|----------|-------|----------|----------|
| **Width** | 2px | 12/14 | Polaris, Atlassian, Ant, Carbon, Primer, Spectrum, Wise, Paste, shadcn, Cedar, Lightning, Playbook |
| **Style** | solid outline / box-shadow | 14/14 | All |
| **Color** | `interactive.default` (brand primary) | 11/14 | Polaris, Atlassian, Ant, Spectrum, Carbon, Primer, Paste, Wise, Cedar, Playbook, Dell |
| **Offset** | 2px | 10/14 | Polaris, Primer, Spectrum, Carbon, shadcn, Wise, Paste, Cedar, Playbook, Dell |
| **Contrast** | ≥ 3:1 against adjacent colors | 14/14 | WCAG 2.4.13 requirement |
| **Technique** | `:focus-visible` (not `:focus`) | 12/14 | All modern systems except Lightning, Playbook |

**Token pattern:**
```
--focus-ring-color: {interactive.default}
--focus-ring-width: 2px
--focus-ring-offset: 2px
--focus-ring-style: solid
```

## 3.4.2 Disabled State (consenso: 14/14)
| Approach | Systems | Value |
|----------|---------|-------|
| **Opacity reduction** | 10/14 | `opacity: 0.38–0.5` (Material: 0.38, most others: 0.5) |
| **Muted colors** | 4/14 | Dedicated `disabled` token (Atlassian, Polaris, Carbon, Paste) |

**Token pattern:**
```
--disabled-opacity: 0.5          → applied to entire component
--color-bg-disabled: {gray-200}  → alternative: dedicated color
--color-text-disabled: {gray-500}
```

## 3.5 Dark Mode
**Universal: token value swap.** Mismo nombre de token, valores diferentes.
| Método | Sistemas |
|--------|----------|
| CSS custom property swap | Polaris, Primer, shadcn, Wise |
| data-attribute toggle | Atlassian (`data-color-mode`), Lightning (`data-slds-theme`) |
| ConfigProvider/Theme | Ant, Material |
| Multiple themes (>2) | Spectrum (4+), Primer (9), Carbon (4) |

## 3.6 Token Naming (consenso)
```
--{prefix}-color-{property}-{role}-{variant}-{state}

Ejemplos:
--p-color-bg-surface-brand-hover          (Polaris)
--md-sys-color-on-surface-variant         (Material)
color.background.brand.bold.hovered       (Atlassian)
$color-background-primary-stronger        (Paste)
--ant-color-primary-hover                 (Ant)
```

---

## 4.1 Niveles de Elevación (consenso: 4-5)
| Nivel | Token | Uso | Shadow |
|-------|-------|-----|--------|
| 0 / Flat | `elevation-0` | Base, inline | none |
| 1 / Raised | `elevation-1` | Cards, tiles | `0 1px 2px rgba(0,0,0,0.1)` + `0 1px 3px rgba(0,0,0,0.08)` |
| 2 / Elevated | `elevation-2` | Dropdowns, popovers | `0 2px 6px rgba(0,0,0,0.1)` + `0 4px 8px rgba(0,0,0,0.08)` |
| 3 / Floating | `elevation-3` | Modals, dialogs | `0 4px 12px rgba(0,0,0,0.12)` + `0 8px 24px rgba(0,0,0,0.08)` |
| 4 / Overlay | `elevation-4` | Notifications, top-level | `0 8px 16px rgba(0,0,0,0.14)` + `0 12px 32px rgba(0,0,0,0.1)` |

**Best practice: dual-layer shadows** (ambient + key light) — patrón Material adoptado ampliamente.

## 4.2 Dark Mode Elevation
- **Surface color shift**: superficies más claras = más elevadas (Atlassian, Material, Paste)
- Shadows menos efectivos en dark mode → combinar con tint de surface

## 4.3 Token Naming
```
--shadow-{level}      → ej: --shadow-200 (Polaris pattern)
--elevation-{level}   → ej: elevation.shadow.raised (Atlassian)
```
