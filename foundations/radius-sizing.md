# Foundations — Border Radius & Component Sizing (14 Systems)

> Sections 5.1-5.3, 6.1-6.2 from foundations.md

## 5.1 Radius Scale (consenso)
| Step | px | Uso típico | Token |
|------|-----|-----------|-------|
| none | 0 | Sharp corners | `--radius-0` |
| xs | 2px | Checkboxes, tags | `--radius-050` |
| sm | 4px | Inputs, botones sm | `--radius-100` |
| md | 8px | Cards, botones default | `--radius-200` |
| lg | 12px | Modals, contenedores | `--radius-300` |
| xl | 16px | Paneles grandes | `--radius-400` |
| 2xl | 28px | Floating action buttons | `--radius-700` |
| full | 9999px | Pill buttons, badges | `--radius-full` |

## 5.2 Patrones por Componente
| Componente | Radius típico |
|------------|--------------|
| Button | 6-8px (md) |
| Input | 6-8px (md) |
| Card | 8-12px (md-lg) |
| Modal/Dialog | 12-16px (lg-xl) |
| Chip/Tag | 4-6px o pill (full) |
| Badge | pill (full) |
| Checkbox | 2-4px (xs-sm) |
| Avatar | full (circular) |
| Tooltip | 4-8px (sm-md) |

## 5.3 Approach shadcn (elegante para customización)
```css
--radius: 0.5rem;  /* seed */
--radius-sm: calc(var(--radius) * 0.6);
--radius-md: calc(var(--radius) * 0.8);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) * 1.4);
```
Cambiar un valor → cascada a todo el sistema.

---

## 6.1 Control Heights
| Size | Height | Font Size | Icon Size | Sistemas |
|------|--------|-----------|-----------|----------|
| xs | 24px | 12px | 12-14px | Ant, Spectrum |
| sm | 32px | 12-14px | 16px | Universal |
| md | 40px | 14px | 20px | Universal |
| lg | 48px | 16px | 20-24px | Universal |
| xl | 56px | 18px | 24px | Algunos (Lightning, Dell) |

## 6.2 Icon Sizes
| Step | px | Uso |
|------|-----|-----|
| xs | 12px | Inline, decorativo |
| sm | 16px | Botones sm, inputs |
| md | 20px | Default en componentes |
| lg | 24px | Botones lg, standalone |
| xl | 32px | Empty states, hero |
