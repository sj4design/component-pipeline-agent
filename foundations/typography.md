# Foundations — Typography (14 Systems)

> Sections 2.1-2.8 from foundations.md

## 2.1 Body Text (consenso)
| Rol | Size | Line Height | Weight | Letter Spacing |
|-----|------|-------------|--------|----------------|
| Body Default | 14px | 20px (1.43) | 400 | 0 |
| Body Large | 16px | 24px (1.5) | 400 | 0 |
| Body Small / Caption | 12px | 16px (1.33) | 400 | +0.1-0.3px |
| Label Default | 14px | 20px | 500 | 0 |
| Label Small | 12px | 16px | 500 | +0.1px |

**14px** es body default en 10/14 sistemas. **16px** en 4 sistemas (Primer, shadcn, Cedar, Lightning rem-base).

## 2.2 Headings (consenso producto UI)
| Nivel | Size | Line Height | Weight | Letter Spacing |
|-------|------|-------------|--------|----------------|
| H1 / Heading XXL | 32px | 40px (1.25) | 600 | 0 |
| H2 / Heading XL | 28px | 36px (1.29) | 600 | 0 |
| H3 / Heading L | 24px | 32px (1.33) | 600 | 0 |
| H4 / Heading M | 20px | 28px (1.4) | 600 | 0 |
| H5 / Heading S | 16px | 24px (1.5) | 600 | 0 |
| H6 / Heading XS | 14px | 20px (1.43) | 600 | 0 |

## 2.3 Display (marketing/hero, no para UI producto)
| Nivel | Size Range | Line Height | Weight |
|-------|-----------|-------------|--------|
| Display XL | 64-128px | 1.0-1.1 | 400-700 |
| Display L | 48-88px | 1.1-1.15 | 400-600 |
| Display M | 36-57px | 1.15-1.2 | 400-600 |
| Display S | 28-36px | 1.2-1.25 | 400-600 |

## 2.4 Font Weight Usage
| Uso | Weight | Notas |
|-----|--------|-------|
| Body copy | 400 | Universal |
| Labels, emphasis | 500-600 | 500 = medium, 600 = semibold |
| Headings sm-md | 600 | Más común que 700 |
| Headings lg+ | 400 | Muchos DS reducen peso en headings grandes |
| Bold (emphasis) | 700 | Uso moderado (eBay, shadcn) |

## 2.5 Letter Spacing Rules
| Size Range | Spacing | Por qué |
|-----------|---------|---------|
| ≤12px | +0.1 a +0.3px | Mejorar legibilidad a tamaños pequeños |
| 14-16px | 0 | Neutral, tamaño óptimo |
| ≥20px | -0.5 a -3% | Tighten para headings (Wise, Material) |

## 2.6 Line Height Pattern
**Ratio inversamente proporcional al tamaño:**
| Size | Ratio | Valor típico |
|------|-------|-------------|
| 12px | 1.33 | 16px |
| 14px | 1.43 | 20px |
| 16px | 1.5 | 24px |
| 20px | 1.4 | 28px |
| 24px | 1.33 | 32px |
| 28px | 1.29 | 36px |
| 32px | 1.25 | 40px |
| 38px+ | 1.21 | — |

**Todos los valores alineados a grid de 4px.**

## 2.7 Token Naming (patrón más adoptado)
```
--font-size-{step}      → ej: --font-size-350 = 14px
--line-height-{step}    → ej: --line-height-400 = 20px
--font-weight-{name}    → ej: --font-weight-medium = 500
```

## 2.8 Scale Ratios
| Ratio | Nombre | Sistemas |
|-------|--------|----------|
| 1.125 | Major second | Spectrum |
| 1.2 | Minor third | Polaris, Atlassian |
| 1.25 | Major third | Común en práctica |
| Custom | Logarítmico | Ant Design, Carbon |
