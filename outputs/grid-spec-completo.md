# Grid

## Overview

El Grid es un primitivo de layout de 12 columnas que permite distribuir contenido en estructuras de dos dimensiones. Es el componente más fundamental de la familia de layout — mientras que Stack maneja distribución en una sola dimensión (fila o columna), Grid maneja layouts donde el contenido necesita alinearse tanto horizontal como verticalmente. En la práctica, Grid se usa para: distribuciones de cards en columnas iguales, layouts asimétricos de página (sidebar + contenido principal), dashboards de widgets, y grids de formularios de dos columnas.

La decisión de arquitectura más importante en Grid es la que separa a Carbon de los demás: los tres modos de gutter (`wide`, `narrow`, `condensed`) no son valores numéricos arbitrarios sino decisiones explícitas de densidad de información. Wide (32px) para páginas de marketing con espacio generoso; narrow (16px) para admin estándar; condensed (1px) para dashboards de alta densidad de datos. Esta distinción es un principio de diseño, no solo una configuración técnica.

```
Grid (Columns=12, Gap=md, GutterMode=narrow):
┌──────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────┐   │
│  │                   Header / Nav                   │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌─────────┐  ┌──────────────────────┐  ┌─────────┐   │
│  │         │  │                      │  │         │   │
│  │  Panel  │  │   Contenido principal│  │  Panel  │   │
│  │ ColSpan │  │      ColSpan=6       │  │ ColSpan │   │
│  │   =3    │  │                      │  │   =3    │   │
│  │         │  │                      │  │         │   │
│  └─────────┘  └──────────────────────┘  └─────────┘   │
│  │← gap=16px →│                                        │
│  (GutterMode=narrow)                                    │
└──────────────────────────────────────────────────────────┘

Grid (Columns=3, Gap=lg) — card grid:
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│             │  │             │  │             │
│   Card A    │  │   Card B    │  │   Card C    │
│  ColSpan=1  │  │  ColSpan=1  │  │  ColSpan=1  │
│             │  │             │  │             │
└─────────────┘  └─────────────┘  └─────────────┘
│←   gap=24px   →│

GridItem con RowSpan:
┌─────────────┐  ┌─────────────┐
│             │  │ Item        │
│  Item A     │  │ RowSpan=2   │
│  ColSpan=2  │  │ ColSpan=1   │
│             │  │             │
├─────────────┤  │             │
│  Item B     │  │             │
│  ColSpan=2  │  │             │
└─────────────┘  └─────────────┘
```

El Grid no tiene interactividad propia — es un contenedor de layout. No recibe focus, no tiene estados de hover, no produce ARIA semántico. Todo el contenido semántico y los landmarks (main, nav, aside) viven dentro de los GridItems, no en el Grid mismo.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Grid:
  Columns:    1 | 2 | 3 | 4 | 6 | 12
  Gap:        none | sm | md | lg | xl
  GutterMode: wide | narrow | condensed

GridItem:
  ColSpan:  1 | 2 | 3 | 4 | 6 | 8 | 12
  RowSpan:  1 | 2 | 3
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Grid y GridItem no tienen toggles de booleanos
Son layout primitives — no muestran/ocultan partes
```

### Figma properties panel

```
Grid:
┌─────────────────────────────────────────────┐
│  Grid                                       │
├─────────────────────────────────────────────┤
│  Columns    [ 3 ▼ ]                         │
│               1 / 2 / 4 / 6 / 12           │
├─────────────────────────────────────────────┤
│  Gap        [ md ▼ ]                        │
│               none / sm / lg / xl           │
├─────────────────────────────────────────────┤
│  GutterMode [ narrow ▼ ]                    │
│               wide / condensed              │
└─────────────────────────────────────────────┘

GridItem:
┌─────────────────────────────────────────────┐
│  GridItem                                   │
├─────────────────────────────────────────────┤
│  ColSpan    [ 1 ▼ ]                         │
│               2 / 3 / 4 / 6 / 8 / 12       │
├─────────────────────────────────────────────┤
│  RowSpan    [ 1 ▼ ]                         │
│               2 / 3                         │
└─────────────────────────────────────────────┘
```

Sub-component panels:

GridItem es el building block que vive dentro del Grid. El slot `content` de cada GridItem acepta cualquier componente — el GridItem solo define cuántas columnas y filas ocupa, no qué pone dentro.

---

## When to use (and when not to)

```
¿El layout necesita distribución en 2 dimensiones?
│
├─ Sí → ¿Los items tienen tamaños iguales o proporcionales?
│        ├─ Sí (cards iguales) → Grid Columns=2/3/4 + Gap=md/lg
│        ├─ No (layout asimétrico) → Grid Columns=12 + ColSpan en cada Item
│        └─ Desconocido hasta runtime → Grid Columns=12 flexible
│
└─ No → ¿Es solo 1 dimensión (fila o columna)?
         ├─ Sí → Stack (más simple, no usar Grid)
         └─ No → ¿Es page layout con sidebar fijo?
                  ├─ Sí → Grid Columns=12 con sidebar ColSpan=3
                  └─ No → Grid igualmente válido
```

**Use Grid when:**
- Distribución de cards, productos o items en columnas iguales (card grid)
- Layout de página con sidebar + contenido principal (asymmetric layout)
- Dashboard con widgets de distintos tamaños (ColSpan y RowSpan variables)
- Formulario de dos columnas para campos paralelos (datos de dirección, fechas)
- Cuando los items deben alinearse tanto horizontalmente como verticalmente
- Cuando el número de columnas necesita cambiar por breakpoint responsivo

**Do NOT use Grid when:**
- Solo se necesita distribución en una dimensión — usar Stack
- El layout es solo el header/footer de un componente — usar Flexbox / auto-layout de Figma
- El contenido es prose (párrafos, texto corrido) — el Grid no es para tipografía
- Se necesita un layout de altura variable tipo masonry (ancho igual, altura variable)
- El layout es el wrapper de toda la página (usar Container para el max-width + centrado)

---

## Visual variations

### Grid por Columns

| Columns | Uso típico | Ejemplo |
|---------|-----------|---------|
| 1 | Stack vertical de items (equivalente a Stack) | Single card full-width |
| 2 | Dos columnas iguales | Feature comparison, before/after |
| 3 | Tres columnas de cards | Product grid, feature cards |
| 4 | Cuatro columnas densas | Thumbnail grid, icon grid |
| 6 | Seis columnas para layouts mixtos | Usado con ColSpan para asimetría |
| 12 | Sistema completo de 12 columnas | Page layout, formularios complejos |

### Grid por Gap

| Gap | Valor | Uso |
|-----|-------|-----|
| none | 0px | Grids sin espacio entre celdas (mosaico) |
| sm | 8px | Grid muy compacto (admin dense) |
| md | 16px | Grid estándar de cards |
| lg | 24px | Grid con espacio respirable |
| xl | 32px | Grid de marketing con espacio generoso |

### Grid por GutterMode (Carbon pattern)

| GutterMode | Gutter | Uso |
|-----------|--------|-----|
| wide | 32px | Páginas de marketing, landing pages, espacio generoso (GutterMode=wide de Carbon) |
| narrow | 16px | Admin estándar, settings, formularios (GutterMode=narrow de Carbon) |
| condensed | 1px | Dashboards de alta densidad, data tables, visualizaciones (GutterMode=condensed de Carbon) |

La diferencia entre `Gap` y `GutterMode` es conceptual: `Gap` controla el espacio entre ítems del grid; `GutterMode` es el modo de densidad de la información — una decisión de diseño de sistema, no solo de número. Usar `GutterMode=condensed` con `Gap=xl` sería conceptualmente contradictorio.

### GridItem por ColSpan

Los valores de ColSpan están limitados a divisores de 12: `1, 2, 3, 4, 6, 8, 12`. Esto garantiza que los grids sean siempre simétricos y alineados. Los valores 5, 7, 9, 10, 11 están excluidos — rompen el balance visual sin un caso de uso justificado en la mayoría de los productos.

| ColSpan | % de 12 cols | Uso típico |
|---------|-------------|-----------|
| 1 | 8.3% | Ícono, badge, celda muy estrecha |
| 2 | 16.7% | Columna angosta, thumbnail |
| 3 | 25% | Sidebar estrecho, 1/4 de página |
| 4 | 33.3% | 1/3 de página, sidebar estándar |
| 6 | 50% | Mitad de página, dos columnas iguales |
| 8 | 66.7% | Contenido principal (2/3) con sidebar 4 |
| 12 | 100% | Full width, header, footer |

### GridItem por RowSpan

| RowSpan | Uso |
|---------|-----|
| 1 | Default — una fila de altura |
| 2 | Card destacada o widget más alto |
| 3 | Feature principal en dashboard |

---

## Design decisions

### 1. Sistema de 12 columnas (estándar Atlassian/Carbon/Spectrum)

**Por qué:** Ant Design usa 24 columnas (más granular, para enterprise chino que frecuentemente necesita splits de 1/3, 1/4, 1/6, 1/8 sin valores fraccionales); 12 es el estándar occidental. 12 permite splits de /2, /3, /4, /6 limpios y es el modelo mental más simple para los equipos. Bootstrap, Grid de 12 columnas de Material Design, y prácticamente todos los sistemas de diseño occidentales usan 12. La familiaridad reduce la curva de aprendizaje para nuevos diseñadores en el equipo.

**Tradeoff:** Con 12 columnas, splits de 1/5 (20%) y 1/8 (12.5%) requieren fracciones o aproximaciones (2.4 cols y 1.5 cols respectivamente). Para Zoom esto es aceptable — los layouts de 5 o 8 columnas iguales son extremadamente raros en los contextos de la plataforma.

### 2. GutterMode (wide/narrow/condensed) — patrón de Carbon

**Por qué:** Carbon distingue tres modos de gutter por densidad de información. 32px / 16px / 1px cubre desde páginas de marketing hasta dashboards de datos. Hacer estos valores "first-class" como decisiones de diseño nombradas — en lugar de valores numéricos arbitrarios — fuerza a los equipos a elegir deliberadamente la densidad de su layout. La diferencia entre `gap=32px` (número técnico) y `GutterMode=wide` (decisión de diseño) es semántica pero important para la alineación de equipos.

**Tradeoff:** Tres modos de GutterMode significa 3× más frames en Figma (90 frames totales para Grid). Es el tradeoff correcto: la consistencia sistémica entre todos los productos de Zoom que usan el mismo modo de gutter justifica el overhead de frames.

### 3. Grid.Item flat (sin Row component) — patrón de Atlassian

**Por qué:** Atlassian omite el componente Row; Grid → Grid.Item se envuelve automáticamente cuando los items exceden las columnas disponibles. Simplifica la API vs. el anidamiento Row > Col de Ant Design. Reduce la profundidad del DOM. El CSS Grid nativo ya gestiona el wrapping automáticamente — añadir un componente Row es una abstracción innecesaria que añade complejidad sin valor.

**Tradeoff:** Sin Row explícito, es más difícil controlar cuándo empieza una "nueva fila" visualmente en Figma. El workaround es usar un GridItem con `ColSpan=12` como separador de filas cuando se necesita un quiebre explícito — lo cual es raro en la práctica.

### 4. Sin named grid areas (feature de Spectrum)

**Por qué:** Spectrum tiene prop `areas` para áreas nombradas de CSS Grid (`areas="'sidebar main'"` es más legible que `grid-column: 1 / 2; grid-row: 1 / 3`). Es elegante pero añade complejidad al API. Para la mayoría de los casos de Zoom, ColSpan y RowSpan son suficientes para expresar el layout. Los casos complejos de application shell (sidebar + toolbar + canvas + panel) pueden manejarse directamente con CSS Grid sin pasar por el componente.

**Tradeoff:** Se pierde la legibilidad de `areas` para layouts complejos. Los diseñadores deben usar combinaciones de ColSpan para expresar lo que `areas` expresaría con nombres. Aceptable para Zoom donde los layouts de application shell ya tienen sus propias convenciones.

### 5. ColSpan values discretos (1, 2, 3, 4, 6, 8, 12)

**Por qué:** Solo valores que dividen 12 de forma limpia. Se omiten 5/7/9/10/11 porque: (1) estos valores crean layouts donde las columnas no se alinean visualmente; (2) no hay casos de uso comunes en los productos de Zoom que requieran estos splits; (3) 7 opciones son suficientes para cubrir todos los layouts útiles. La restricción de valores posibles es una feature, no una limitación — reduce las combinaciones que el diseñador debe considerar.

**Tradeoff:** Un formulario que necesita exactamente 5 columnas iguales no puede expresarse directamente con este Grid. La solución es usar un Grid de 5 columnas directamente en el layout, fuera del sistema de Grid, o usar 4 columnas con ajuste visual. Este es un caso extremadamente raro en la práctica.

### Excluded combinations

```
ColSpan=8 + ColSpan=8 en mismo row (Grid=12)
→ 8+8=16 > 12 columnas disponibles
→ El segundo item haría wrap a la siguiente fila
→ No es una exclusión hard de Figma — es una regla de uso documentada

ColSpan > Columns del Grid padre
→ Ej. ColSpan=6 en un Grid Columns=4
→ El item ocuparía todo el ancho disponible (se expande al máximo)
→ Documentar como comportamiento esperado, no error

GutterMode=condensed + Gap=xl
→ Conceptualmente contradictorio (densidad extrema + espacio máximo)
→ Soft exclusion — documentada, no eliminada en Figma
→ El diseñador puede necesitar esta combinación en casos edge
```

---

## Behavior

### Essential for design

El Grid es un layout primitive sin comportamiento interactivo propio. No tiene estados de hover, focus, error o disabled. Todo comportamiento visible al usuario viene del contenido dentro de los GridItems — cards que tienen hover, botones que tienen focus, etc.

El comportamiento más importante del Grid para el diseñador es entender la diferencia entre `Gap` (espacio entre GridItems) y `GutterMode` (densidad del sistema de columnas). En Figma, ambos son propiedades de la instancia de Grid, pero representan decisiones conceptualmente distintas.

El wrapping automático ocurre cuando la suma de ColSpan de los items en una "fila" excede el número de columnas del Grid padre. En Figma este comportamiento es simulado manualmente — el auto-layout gestiona el wrapping, pero el diseñador debe distribuir los GridItems correctamente en el frame.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Grid container | none (div) | sin role | No usar role="grid" — ese rol es para data grids interactivos, no para layout |
| GridItem | none (div) | sin role | Layout primitive sin semántica propia |
| Contenido del GridItem | (heredado) | landmarks según contenido | Los `<main>`, `<nav>`, `<aside>` van dentro del GridItem, no en el Grid |
| Orden DOM | — | debe coincidir con orden visual | WCAG 1.3.2 — el reordenamiento solo con CSS viola la secuencia lógica |

### Keyboard navigation

Primary interactions (affect design):

```
Grid no es focuseable
GridItem no es focuseable
El foco va directamente al contenido interactivo dentro de cada GridItem
Tab sigue el orden del DOM — que debe coincidir con el orden visual
```

Secondary interactions (dev reference):

```
NUNCA usar CSS order/push/pull para reordenar visualmente sin cambiar el DOM
→ El screen reader navega en DOM order, el usuario visual en order de pantalla
→ Si el layout necesita reordenarse en mobile, cambiar el DOM order también

No usar role="grid" en el Grid de layout
→ role="grid" está reservado para tablas de datos interactivas (data grid)
→ Usar role="grid" en layout confunde a screen readers y usuarios de AT

DOM order = visual order en todos los breakpoints
→ Si en desktop el sidebar está a la izquierda (col 1-3) y el contenido a la derecha (col 4-12),
   el sidebar debe aparecer PRIMERO en el DOM también
```

---

## Content guide

### Slot: items (Grid, requerido)
El Grid acepta N instancias de GridItem como children. El número de items no está limitado por el componente — el Grid gestiona automáticamente el wrapping cuando los items llenan las columnas disponibles.

Reglas de composición:
- Cada GridItem debe tener un ColSpan apropiado para el número de Columns del Grid padre
- La suma de ColSpan en una fila visual debe ser ≤ Columns del Grid (ej. ≤ 12 para un Grid de 12 columnas)
- Los GridItems con RowSpan > 1 "bloquean" esas filas para otros items — planificar el layout cuidadosamente

### Slot: content (GridItem, requerido)
Cualquier componente puede ser el contenido de un GridItem. El GridItem es simplemente un wrapper de posicionamiento. Los casos más comunes:
- Card component
- Section con heading + content
- Form field group
- Widget de dashboard
- Imagen o media

El GridItem no añade padding interno — el padding y el espaciado interno es responsabilidad del componente que va dentro.

---

## Pre-build checklist

```
Frames Grid
[ ] Columns(6) × Gap(5) × GutterMode(3) = 90 frames — verificar que se generaron
[ ] GutterMode=condensed: gap visual de 1px entre columnas (no 0px)
[ ] GutterMode=wide: gap visual de 32px — se ve generoso
[ ] GutterMode=narrow: gap visual de 16px — estándar admin
[ ] Gap=none: sin espacio entre GridItems

Frames GridItem
[ ] ColSpan(7) × RowSpan(3) = 21 frames
[ ] ColSpan=12: full width visible
[ ] ColSpan=1: celda muy estrecha (8.3% del Grid de 12 cols)
[ ] RowSpan=3: item visualmente más alto que sus vecinos

Tokens
[ ] grd/gap/sm → spacing/2 verificado (8px)
[ ] grd/gap/md → spacing/4 verificado (16px)
[ ] grd/gap/lg → spacing/6 verificado (24px)
[ ] grd/gap/xl → spacing/8 verificado (32px)
[ ] grd/gutter/wide → spacing/8 verificado (32px)
[ ] grd/gutter/narrow → spacing/4 verificado (16px)
[ ] grd/gutter/condensed → border/1 verificado (1px)

Accesibilidad
[ ] NO role="grid" documentado en component description
[ ] "DOM order = visual order" documentado como requisito de uso
[ ] Nota sobre CSS reordering + WCAG 1.3.2 en documentación
[ ] "Landmarks van dentro del GridItem, no en el Grid" documentado

Uso
[ ] Guía de cuándo usar Grid vs Stack documentada
[ ] ColSpan values válidos (1,2,3,4,6,8,12) documentados
[ ] GutterMode=condensed + Gap=xl soft exclusion documentada
```

---

## Related components

```
Stack       → layout 1D (fila o columna) — usar en lugar de Grid Columns=1
Container   → max-width + centering para page-level layouts
Divider     → separador visual dentro de un GridItem o entre secciones
Card        → el contenido más frecuente de un GridItem
DataGrid    → NO confundir con Grid de layout — DataGrid tiene role="grid" interactivo
Masonry     → layout de altura variable (no cubierto por este Grid)
PageLayout  → layout semántico sidebar+main — usa Grid internamente
```

---

## Reference: how other systems do it

**Carbon Grid** está construido alrededor del sistema 2x Grid (todo el espaciado basado en múltiplos de 8px/16px) y proporciona tres modos de gutter explícitos: Wide (32px), Narrow (16px, contenido al ras del borde de la columna) y Condensed (1px, para dashboards de alta densidad de datos). Estos son variantes de primer orden nombradas, no números arbitrarios — los equipos deben elegir intencionalmente la densidad de información de su layout. El soporte de subgrid permite que los grids anidados se alineen a las líneas de columna del padre — crítico para productos IBM que frecuentemente anidan formularios dentro de paneles dentro de layouts de página.

**Spectrum Grid** usa CSS Grid con el prop `areas` para áreas de plantilla nombradas — haciendo los layouts de aplicación complejos (sidebar + toolbar + canvas + panel de propiedades) declarativos y legibles en lugar de depender de cálculos de column span. Spectrum proporciona orientación explícita sobre la elección Grid vs. Flex: Grid para estructura de página 2D, Flex para alineación de componentes 1D.

**Ant Design Row/Col** usa 24 columnas (vs. el universal 12) — más granular para aplicaciones enterprise chinas que frecuentemente necesitan splits de 1/3, 1/4, 1/6, 1/8 sin valores fraccionales. El prop `gutter` de Row acepta arrays `[horizontal, vertical]` para espaciado horizontal y vertical independiente. Los props `push`/`pull` permiten reordenamiento visual sin cambiar el orden DOM.

**Polaris Columns + Grid** es una estrategia de doble componente que separa el caso común del complejo. `Columns` para el 80% de casos de contenido distribuido uniformemente (API basada en conteo: `{xs: 1, md: 2, lg: 3}`) y `Grid` para layouts asimétricos complejos (CSS Grid con `Grid.Cell` + `columnSpan`). La mayoría de los layouts del admin de Shopify son columnas simples de igual ancho — una API de Grid completa para estos casos sería complejidad innecesaria.

**Chakra UI Grid + SimpleGrid** proporciona dos componentes: `Grid` (control CSS Grid completo) y `SimpleGrid` (columnas iguales auto-responsivas). El `minChildWidth` de `SimpleGrid` es el patrón destacado — en lugar de especificar el número de columnas por breakpoint, especificas el ancho mínimo de cada hijo; el grid calcula automáticamente cuántas columnas caben. Esto elimina la especificación columna-por-breakpoint que todos los demás sistemas requieren.

**GOV.UK grid-row/grid-column** es el más conservador: clases CSS puras, sin JavaScript, sin abstracción de framework, fracciones de columna fijas (one-quarter/one-third/two-thirds/one-half/full-width). El gobierno del Reino Unido prohíbe explícitamente el reordenamiento visual — el contenido siempre debe aparecer en el mismo orden visual que DOM. Sin excepciones.

**Mantine Grid** proporciona layout de 12 columnas con soporte de span/offset/order responsivo en `Grid.Col`. `SimpleGrid` proporciona columnas de igual ancho auto-responsivas via `cols` + `breakpoints`. El prop `grow` llena el espacio restante.

**Gestalt Masonry** es arquitectónicamente único — no es un grid sino un motor de layout que posiciona absolutamente items de altura variable en columnas, recalculando posiciones en resize. Construido específicamente para el layout de pins de Pinterest donde los items tienen alturas desconocidas. Ningún otro sistema intenta este patrón. Representa un modelo de layout fundamentalmente diferente al de grids de column-span.

---

## Tokens

**12 tokens** · prefix `grd-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| grd/gap/none | spacing/0 | Sin gap entre GridItems (0px) |
| grd/gap/sm | spacing/2 | Gap pequeño entre GridItems (8px) |
| grd/gap/md | spacing/4 | Gap estándar entre GridItems (16px) |
| grd/gap/lg | spacing/6 | Gap amplio entre GridItems (24px) |
| grd/gap/xl | spacing/8 | Gap máximo entre GridItems (32px) |
| grd/gutter/wide | spacing/8 | Gutter mode wide — 32px — marketing/whitespace |
| grd/gutter/narrow | spacing/4 | Gutter mode narrow — 16px — admin estándar |
| grd/gutter/condensed | border/1 | Gutter mode condensed — 1px — data dashboards |
| grd/columns | layout/12cols | Sistema base de 12 columnas |
| grd/item/colSpan/default | layout/col-1 | ColSpan base del GridItem |
| grd/item/colGap | (calculado) | Gap entre columnas dentro de un GridItem (heredado del Grid) |
| grd/item/rowGap | (calculado) | Gap entre filas (heredado del Grid Gap) |

### Spacing specs

```
Gap values (espacio entre GridItems):
  none:  0px
  sm:    8px  (spacing/2)
  md:   16px  (spacing/4)
  lg:   24px  (spacing/6)
  xl:   32px  (spacing/8)

GutterMode (margen lateral del sistema de columnas):
  wide:       32px gutter izquierdo + derecho
  narrow:     16px gutter izquierdo + derecho
  condensed:   1px separación entre columnas (data density)

ColSpan widths (en Grid Columns=12, sin gap):
  ColSpan=1:  8.33%  del contenedor
  ColSpan=2:  16.67% del contenedor
  ColSpan=3:  25%    del contenedor
  ColSpan=4:  33.33% del contenedor
  ColSpan=6:  50%    del contenedor
  ColSpan=8:  66.67% del contenedor
  ColSpan=12: 100%   del contenedor

ColSpan widths reales (incluyendo gap=md de 16px en Grid=12):
  Fórmula: (containerWidth - 11 * gap) / 12 * colSpan + (colSpan-1) * gap
  Ejemplo en 1200px container con gap=16px:
    1 col:  (1200 - 176) / 12 * 1 + 0 = 85.3px
    3 cols: 85.3 * 3 + 2 * 16 = 287.9px ≈ 288px
    6 cols: 85.3 * 6 + 5 * 16 = 591.8px ≈ 592px
    12 cols: 1200px (full width)

Frame counts:
  Grid:     Columns(6) × Gap(5) × GutterMode(3) = 90 frames
  GridItem: ColSpan(7) × RowSpan(3) = 21 frames
  Total:    111 frames
```
