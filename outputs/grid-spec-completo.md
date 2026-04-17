# Grid

## Descripción general

Grid es el primitivo de layout 2D del sistema de diseño: un sistema de 12 columnas basado en CSS Grid que estructura el contenido en filas y columnas. Es una familia de dos componentes: `Grid` (el contenedor) y `GridItem` (la celda). Grid controla columnas, gaps y gutters; GridItem controla cuántas columnas y filas ocupa cada celda. El patrón de tres GutterMode (wide/narrow/condensed) de Carbon es la decisión arquitectónica más característica — distingue entre marketing pages (espacio generoso), admin dashboards (compacto) y data-dense UIs (casi sin gutter).

```
Grid (Columns=3, Gap=md, GutterMode=narrow):
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ┌──────────┐  16px  ┌──────────┐  16px  ┌──────────┐     │
│  │  Item    │        │  Item    │        │  Item    │     │
│  │ ColSpan=1│        │ ColSpan=1│        │ ColSpan=1│     │
│  └──────────┘        └──────────┘        └──────────┘     │
│                      16px (row gap)                        │
│  ┌────────────────────────────┐          ┌──────────┐     │
│  │  Item ColSpan=2            │          │  Item    │     │
│  └────────────────────────────┘          │ ColSpan=1│     │
│                                          └──────────┘     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Familia:** Grid → GridItem. Build order: GridItem primero (sub-componente), luego Grid (contenedor padre).

**Lo que el diseñador puede configurar:**

Grid:
```
Columns    → 1 | 2 | 3 | 4 | 6 | 12 (columnas iguales automáticas)
Gap        → none (0) | sm (8px) | md (16px) | lg (24px) | xl (32px)
GutterMode → wide (32px) | narrow (16px) | condensed (1px)
```

GridItem:
```
ColSpan    → 1 | 2 | 3 | 4 | 6 | 8 | 12 (de 12 columnas totales)
RowSpan    → 1 | 2 | 3
```

Toggles (muestran/ocultan partes):

```
(ninguno — Grid y GridItem no tienen partes opcionales)
```

### Panel de propiedades en Figma

```
┌─────────────────────────────────────────┐
│  Grid                                   │
│  ─────────────────────────────────────  │
│  Columns     [ 3                ▼ ]     │
│  Gap         [ md (16px)        ▼ ]     │
│  GutterMode  [ narrow           ▼ ]     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  GridItem                               │
│  ─────────────────────────────────────  │
│  ColSpan     [ 1                ▼ ]     │
│  RowSpan     [ 1                ▼ ]     │
└─────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito layout en 2 dimensiones (filas + columnas)?
                    │
                    ▼
       ¿Solo un eje (vertical u horizontal)? → Stack
       ¿Dos ejes?                             → Grid
                    │
                    ▼
       ¿El layout es de card grid igual-width (auto-fit)?
       ├── Sí → Grid Columns=3/4/6 con Gap
       └── No (spans asimétricos) → Grid + GridItem con ColSpan
                    │
                    ▼
       ¿Cuánta densidad necesita?
       ├── Marketing/docs: GutterMode=wide (32px)
       ├── Admin standard: GutterMode=narrow (16px)
       └── Data dashboard: GutterMode=condensed (1px)
```

**Usar Grid cuando:**
- Dashboard con widgets de distintos tamaños (ColSpan variable)
- Galería de cards (Columns=3/4/6, ColSpan=1)
- Layout de página con sidebar + contenido principal (12col; sidebar=3, content=9)
- Formulario en columnas (2-3 fields por fila)
- Cualquier layout donde haya relación fila+columna simultánea

**NO usar Grid cuando:**
- Solo se necesita un eje → usar `Stack`
- Se necesita max-width + centering sin columnas → usar `Container`
- Los ítems tienen altura variable y fluyen libres → CSS Grid auto-fill directo
- El layout es un componente interno simple → usar Stack

---

## Variaciones visuales

### GutterMode — la decisión de densidad

| GutterMode | Gutter (px) | Uso típico |
|-----------|------------|-----------|
| wide      | 32px       | Marketing pages, landing pages, documentación — espacio visual generoso |
| narrow    | 16px       | Admin panels, settings pages, dashboards estándar |
| condensed | 1px        | Data tables embebidas en grid, dashboards ultra-densos |

### Columns (columnas iguales)

| Columns | Splits posibles | Uso típico |
|---------|----------------|-----------|
| 1       | Full-width     | Mobile-first, layouts simples |
| 2       | 50/50          | Comparativas, 2-column forms |
| 3       | 33/33/33       | Card grids, 3-column dashboards |
| 4       | 25×4           | Galería, 4-column stats |
| 6       | 16.7×6         | Grids densos, iconos |
| 12      | Base del sistema | Layouts asimétricos complejos con ColSpan variable |

### ColSpan (de 12 columnas totales)

| ColSpan | Fracción de 12 | Ejemplo |
|--------|---------------|---------|
| 1       | 1/12 (~8%)    | Columna de íconos, indicadores mínimos |
| 2       | 2/12 (16.7%)  | Labels en form, sidebar compacto |
| 3       | 3/12 (25%)    | Sidebar, 4-col card |
| 4       | 4/12 (33.3%)  | 3-col card, panel lateral |
| 6       | 6/12 (50%)    | Two-column layout, split view |
| 8       | 8/12 (66.7%)  | Main content con sidebar |
| 12      | 12/12 (100%)  | Full-width row, header section |

---

## Decisiones de diseño

**1. 12 columnas (estándar Atlassian/Carbon/Spectrum)** — Ant Design usa 24 (más granular, para enterprise chino). 12 es el estándar occidental — permite splits /2, /3, /4, /6 sin fracciones decimales. Mental model más simple. Los 7 ColSpan valores (1,2,3,4,6,8,12) cubren todos los splits útiles sin incluir valores extraños (5,7,9,11).

**2. GutterMode (wide/narrow/condensed) — único de Carbon** — Carbon es el único T1 que eleva el gutter mode a first-class property. 32/16/1px cubre desde marketing hasta dashboards data-densos. Esto evita el anti-patrón de usar valores arbitrarios de gap para ajustar la densidad visual. El gutter mode es una decisión de diseño, no un ajuste de spacing.

**3. Grid + GridItem sin Row (patrón Atlassian)** — Atlassian omite Row; Grid → Grid.Item directamente. Carbon y Ant tienen Grid > Row > Column (más nesting). El modelo plano reduce DOM depth y simplifica el mental model. El Grid container maneja el wrapping automáticamente.

**4. Sin named areas (feature de Spectrum)** — Spectrum tiene `areas` prop para named grid template areas. Elegante para layouts complejos de Adobe (sidebar + toolbar + canvas + properties panel), pero añade complejidad. Se omite para mantener la API simple; casos complejos usan CSS Grid directo o `areas` manual.

**5. ColSpan discretos (no fraccional ni 'auto')** — Valores discretos que dividen 12 limpiamente. Se omiten 5/7/9/10/11 (breaks visual balance, raramente usados). 'auto' no se incluye como prop — es comportamiento CSS por default cuando ColSpan no se especifica.

### Combinaciones excluidas

```
(ninguna — todas las combinaciones de Grid y GridItem son válidas)
```

---

## Comportamiento

### Esencial para diseño

- **12 columnas base, Columns es shorthand** — `Columns=3` es equivalente a 3 columnas iguales de 4 col-units cada una. Con `Columns=12`, cada GridItem declara su ColSpan explícito.
- **ColSpan debe sumar ≤12 por fila** — si la suma de ColSpan en una fila excede 12, el overflow va a la siguiente fila. Si suma <12, queda espacio vacío al final.
- **RowSpan>1 crea "celdas altas"** — un GridItem con RowSpan=2 ocupa dos filas. Los ítems adyacentes fluyen alrededor.
- **GutterMode vs. Gap** — GutterMode es el padding exterior del grid (gutter de página). Gap es el espacio entre celdas internas. Son propiedades independientes.
- **DOM order = visual order** — nunca usar `order` CSS para reordenar visualmente — crearía desincronía entre visual y tab order (WCAG 1.3.2).
- **Responsive en código (no en Figma)** — el Grid en Figma muestra un tamaño/breakpoint fijo. La responsividad (Column counts cambiando por breakpoint) se maneja en desarrollo.

### Accesibilidad (ARIA)

| Parte | Role | Atributos | Por qué importa |
|-------|------|-----------|----------------|
| Grid container | ninguno | `<div>` | Layout puro — sin semántica ARIA de "grid de datos" |
| GridItem | ninguno | `<div>` | Las celdas no son interactivas per se |
| Landmarks en GridItem | `main`, `nav`, `aside`... | Aplicado por consumer al contenido | El grid no tiene landmarks propios — el contenido los declara |

**Nota crítica:** `role="grid"` es para grids de datos interactivos (tablas con navegación por teclado), NO para layouts. Grid de layout = `<div>` sin role.

### Navegación por teclado

Primary interactions (afectan diseño):

```
Grid no es focusable ni interactivo.
El focus sigue el DOM order entre los elementos interactivos dentro de las celdas.
```

---

## Guía de contenido

**Coherencia visual de filas:**
- En un card grid (Columns=3/4), todos los cards en una fila deben tener la misma altura visual — usar `align-items: stretch` para que las cards igualen altura automáticamente.
- Con RowSpan variable, planificar que la fila de referencia (1 row) tenga suficiente altura.

**Asymmetric layouts:**
- El patrón más común: sidebar (ColSpan=3) + main (ColSpan=9).
- Header full-width (ColSpan=12) + body en columnas.
- Stat cards (ColSpan=3 × 4) + chart grande (ColSpan=8) + side panel (ColSpan=4).

**GutterMode y tipo de página:**
- Marketing/docs: wide → más blanco, más legibilidad
- Admin panels: narrow → equilibrio
- Data dashboards: condensed → maximizar densidad de información

---

## Pre-build checklist

```
□ ¿El layout es 2D (filas + columnas)? Si no → Stack
□ ¿El GutterMode es apropiado para la densidad del contexto?
□ ¿Los ColSpan suman ≤12 en cada fila?
□ ¿Columns=12 con ColSpan variable para layouts asimétricos?
□ ¿El DOM order coincide con el visual order (sin reordenamiento CSS)?
□ ¿Los landmarks (main/nav/aside) están en los GridItems, no en Grid?
□ ¿No se usa role="grid" (solo para data grids interactivos)?
□ ¿Los heights de cards en misma fila son consistentes?
```

---

## Componentes relacionados

```
Stack       → layout 1D; Grid es para 2D
Container   → max-width wrapper; Grid vive dentro de Container
Divider     → puede separar secciones de un Grid
Card        → típicamente el contenido de un GridItem
Table       → NO usa Grid — tiene su propio modelo de 2D (thead/tbody/tr/td)
PageLayout  → abstracción de nivel superior con Grid + header/nav/main slots
Dashboard   → patrón de uso de Grid con GutterMode=narrow/condensed
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Columnas | Modelo | GutterMode | Named Areas | Sub-grid | Diferenciador |
|---------|---------|-------|-----------|------------|---------|--------------|
| **Material Design 3** | 4/8/12 (breakpoints) | Layout contract (no component) | margins/gutters por breakpoint | No | No | Cross-platform contract; no React component |
| **Spectrum (Adobe)** | CSS Grid tracks | Grid con `areas` + `columns` strings | No | `areas` prop | No | Named areas declarativas para layouts de Adobe apps |
| **Carbon (IBM)** | 12 | Grid > Row > Column | wide/narrow/condensed (16px/16px/1px) | No | Sí | GutterMode first-class; subgrid support |
| **Polaris (Shopify)** | Variable | Columns + Grid dual | No | No | No | Dual: Columns (simple) + Grid (complejo) |
| **Atlassian** | 12 | Grid > Grid.Item (flat, sin Row) | Token-based gap | No | No | Flat model sin Row; breakpoint props en GridItem |
| **Ant Design** | 24 | Row > Col | `gutter` [H, V] array | No | No | 24 cols; push/pull reordering; array gutter |
| **Twilio Paste** | 12 | Grid + Column | Token-based | No | No | Vertical gutter prop separado |
| **Lightning** | 12 | layout + layout-item | padding props | No | No | Flexbox-based; size prop en items |
| **Primer (GitHub)** | CSS utilities | Box display="grid" | CSS gap | CSS | CSS | No component; PageLayout para sidebar+content |
| **shadcn/ui** | Tailwind | CSS utilities | Tailwind gap-* | CSS | CSS | BYO Tailwind grid; sin abstracción |
| **Radix UI** | CSS Grid | Grid component | CSS gap | CSS | CSS | Minimal wrapper; responsive prop objects |
| **Chakra UI** | Variable | Grid + SimpleGrid | CSS gap | No | No | SimpleGrid con `minChildWidth` (auto-fit por ancho mínimo) |
| **GOV.UK** | 12 | CSS classes | CSS | No | No | Progresivo; sin JS; clases fixas (quarters/thirds/halves) |
| **Base Web** | 12 | FlexGrid + FlexGridItem | Flexbox padding | No | No | Flexbox-based (browser compat); overrides pattern |
| **Fluent 2** | — | Sin componente | — | — | — | CSS makeStyles directo; sin Grid component |
| **Gestalt** | — | Masonry | — | — | — | Variable-height absolute positioning (Pinterest pins) |
| **Mantine** | 12 | Grid + Grid.Col + SimpleGrid | Token gap | No | No | `grow` en Grid.Col; SimpleGrid con cols + breakpoints |
| **Orbit** | Variable | Grid + LayoutColumn | — | No | No | 5 breakpoint props (mediumMobile/tablet/desktop...) |
| **Evergreen** | — | Pane + CSS Grid | — | — | — | Sin Grid; composición manual |
| **Nord** | — | nord-stack + CSS | — | — | — | Healthcare; sin Grid component formal |

**Patrones clave de la industria:**
1. **12 columnas es el estándar occidental** — solo Ant Design (24) diverge. 12 permite /2, /3, /4, /6 sin decimales. T2 y T3 convergen en 12.
2. **GutterMode como densidad-first** — Carbon es el único que lo formaliza. El concepto (different spacing for different density contexts) es universal pero la implementación con modos named es único a Carbon.
3. **Flat vs. Row-nested** — Polaris, Atlassian, Paste van flat (Grid > Cell sin Row). Carbon y Ant van Row-nested. La tendencia moderna es flat — menos DOM depth.
4. **No Grid component** — Fluent 2, Evergreen, Nord, Primer no tienen Grid component. Argumento: CSS Grid es suficientemente expresivo. Tendencia creciente en sistemas modernos.

---

## Tokens

**12 tokens** · prefijo `grd-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `grd-gap-sm` | `spacing/2` | Gap sm — 8px entre celdas |
| `grd-gap-md` | `spacing/4` | Gap md — 16px entre celdas |
| `grd-gap-lg` | `spacing/6` | Gap lg — 24px entre celdas |
| `grd-gap-xl` | `spacing/8` | Gap xl — 32px entre celdas |
| `grd-gutter-wide` | `spacing/8` | Gutter wide — 32px (marketing) |
| `grd-gutter-narrow` | `spacing/4` | Gutter narrow — 16px (admin standard) |
| `grd-gutter-condensed` | `border/1` | Gutter condensed — 1px (data-dense) |
| `grd-columns` | `layout/12cols` | Base 12-column grid |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────────┐
│  12-column system                                            │
│                                                              │
│  │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │        │
│  ├───────────────────────────────────────────────────────┤  │
│  │      ColSpan=4      │     ColSpan=4      │  ColSpan=4 │  │
│  │      (33.3%)        │      (33.3%)       │  (33.3%)   │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │  ColSpan=3 (25%)    │      ColSpan=9 (75%)            │  │
│  │  [sidebar]          │      [main content]             │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │              ColSpan=12 (100%)                        │  │
│  │              [full-width header/banner]               │  │
│                                                              │
│  GutterMode:                                                 │
│  wide:      ─────────────── 32px ──────────────────────     │
│  narrow:    ─────────────── 16px ──────────────────────     │
│  condensed: ─────────────── 1px  ──────────────────────     │
│                                                              │
│  Grid frames:    Columns(6) × Gap(5) × GutterMode(3) = 90   │
│  GridItem frames: ColSpan(7) × RowSpan(3) = 21              │
└──────────────────────────────────────────────────────────────┘
```
