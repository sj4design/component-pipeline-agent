# Container

## Descripción general

Container es el primitivo de contención de página: un wrapper que aplica max-width, centrado horizontal (margin auto) y padding consistente al contenido. Es el componente que responde a "¿qué tan ancho puede ser el contenido de esta página?" — limitando la longitud de línea, centrando el contenido en viewports amplios, y garantizando gutters consistentes. Como building block invisible, no tiene apariencia visual propia: su valor está en restringir el layout.

```
Viewport (ancho completo)
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│      Container (MaxWidth=lg, Padding=md, Centered=yes)                  │
│      ┌────────────────────────────────────────────────┐                 │
│      │  px:24px                            px:24px    │                 │
│  ←───┤                                               ├───→              │
│ auto │         [children — contenido]                │  auto           │
│      │                                               │                 │
│      └────────────────────────────────────────────────┘                 │
│                    max-width: 1312px                                     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

Container no define columnas ni estructura interna — solo pone límites externos al contenido. Para estructura en columnas usar `Grid`. Para spacing entre elementos usar `Stack`.

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
MaxWidth  → sm (672px) | md (1056px) | lg (1312px) | xl (1584px) | full (100%)
Padding   → none | sm (px:16 py:12) | md (px:24 py:16) | lg (px:32 py:24)
Centered  → yes (margin auto) | no (flush left)
```

Toggles (muestran/ocultan partes — NO generan variantes extra):

```
(ninguno — Container no tiene partes opcionales)
```

### Panel de propiedades en Figma

```
┌─────────────────────────────────────────┐
│  Container                              │
│  ─────────────────────────────────────  │
│  MaxWidth   [ lg (1312px)      ▼ ]     │
│  Padding    [ md               ▼ ]     │
│  Centered   [ yes              ▼ ]     │
└─────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito limitar el ancho del contenido de una sección/página?
                    │
                    ▼
       ¿El contenido es fluido o tiene ancho máximo?
       ├── Tiene máximo → Container (MaxWidth=sm/md/lg/xl)
       └── Fluido (full viewport) → Container MaxWidth=full
                    │
                    ▼
       ¿El contenido necesita columnas internas?
       ├── Sí → Container wrapping Grid
       └── No → Container wrapping Stack o contenido directo
                    │
                    ▼
       ¿Es contenido de lectura (artículo, docs)?
       └── MaxWidth=sm (672px) para ~75ch óptimos
```

**Usar Container cuando:**
- Marketing pages con contenido centrado en viewport amplio
- Páginas de documentación con ancho de lectura cómodo
- Admin dashboards con max-width para pantallas ultra-wide
- Secciones hero con contenido centrado dentro de una banda full-width
- Formularios largos que necesitan limitar el ancho de los campos

**NO usar Container cuando:**
- El layout ya tiene un ancho controlado por el parent (sidebar, modal)
- Se necesita estructura de columnas → usar `Grid`
- El contenido debe ser 100% fluido sin restricción alguna
- El componente es decorativo de página completa (hero background, banner)

---

## Variaciones visuales

### MaxWidth

| MaxWidth | Valor  | Uso típico |
|---------|--------|-----------|
| sm      | 672px  | Artículos, documentación, formularios de login (lectura óptima ~75ch) |
| md      | 1056px | Dashboard compacto, páginas de settings, contenido moderado |
| lg      | 1312px | Admin dashboard estándar, páginas de producto |
| xl      | 1584px | Dashboard wide, tablas de datos, vistas complejas |
| full    | 100%   | Contenido completamente fluido — sin restricción |

*Escala basada en los breakpoints de Carbon (sm/md/lg/xl/max = 672/1056/1312/1584px).*

### Padding

| Padding | px    | py    | Uso típico |
|---------|-------|-------|-----------|
| none    | 0px   | 0px   | Container anidado donde el parent ya maneja padding |
| sm      | 16px  | 12px  | Móvil, sidebar estrecho, contextos compactos |
| md      | 24px  | 16px  | Standard — la mayoría de páginas de contenido |
| lg      | 32px  | 24px  | Marketing pages con espacio generoso |

### Centered

| Centered | Comportamiento CSS |
|---------|-------------------|
| yes     | `margin-left: auto; margin-right: auto` — centra en el viewport |
| no      | Flush left — para containers anidados en layouts donde el parent ya centra |

---

## Decisiones de diseño

**1. Container standalone (separado de Grid)** — M3, Spectrum, Polaris y Atlassian no tienen Container standalone — lo resuelven con Grid/Page/Box. Sin embargo, incluir Container como primitive independiente cubre los casos de marketing pages y docs donde Grid es overkill (no se necesita estructura de columnas, solo max-width + centrado). Cedar (REI) y Mantine toman la misma decisión.

**2. MaxWidth scale: 5 valores del Carbon breakpoint scale** — Carbon define 5 max-widths (672/1056/1312/1584px) que son los más estudiados en la industria para aplicaciones enterprise y marketing. Matching estos valores permite alineación consistente con Grid + Page layouts y con las guías de densidad de Carbon.

**3. Padding separado de MaxWidth** — Atlassian Box separa maxWidth de padding (composición). Combinar ambas en un solo prop limitaría la flexibilidad cuando se necesita cambiar uno sin el otro (ej: padding=none en Container anidado dentro de otro Container con padding). 4 valores de padding × 5 MaxWidth cubre todos los escenarios.

**4. Centered como boolean** — 90% de casos son Centered=yes (marketing, docs, admin). Los casos Centered=no son containers anidados dentro de Grid columns o sidebars donde el parent ya posiciona. Un boolean es más explícito que "agregar margin: auto manualmente".

### Combinaciones excluidas

```
(ninguna — todas las combinaciones de MaxWidth × Padding × Centered son válidas)
```

---

## Comportamiento

### Esencial para diseño

- **Container es invisible** — no tiene borde, fondo ni sombra propia. Solo restringe el layout.
- **MaxWidth=full anula el centrado** — con MaxWidth=full, Centered=yes no tiene efecto visible (100% ya ocupa todo el ancho). Se usa cuando se quiere padding consistente sin restricción de ancho.
- **Padding es px + py** — `px` controla el padding horizontal (gutters laterales); `py` controla el padding vertical. El valor de py mantiene espacio de respiración top/bottom pero es menos crítico que px.
- **Containers anidados** — es válido tener Container dentro de Container (ej: un Container lg wrapping el layout, con un Container sm para una columna de texto dentro). En ese caso, el interior usa Padding=none para no duplicar gutters.
- **Centered=no para layouts asimétricos** — cuando el Container vive dentro de un Grid column o sidebar, centrar sería incorrecto. Se usa Centered=no + MaxWidth para restringir el ancho sin centrar.

### Accesibilidad (ARIA)

| Parte | Role | Atributos | Por qué importa |
|-------|------|-----------|----------------|
| Container | ninguno | `<div>` por default | Solo layout — sin semántica propia |
| Page container | ninguno en Container | Consumer aplica `<main>` o `role="main"` en el hijo | El Container no debe auto-aplicar landmarks — puede estar dentro de `<aside>`, `<nav>`, etc. |
| Sección de contenido | ninguno en Container | Consumer aplica `<section aria-label="...">` si necesario | Container es agnóstico a su contenido |

Container no tiene ARIA. La semántica la aportan los children y el elemento HTML que los engloba.

### Navegación por teclado

Primary interactions (afectan diseño):

```
Container no es focusable ni interactivo — ninguna keyboard interaction.
```

---

## Guía de contenido

Container no contiene texto propio — gestiona la estructura. Las consideraciones de contenido son sobre sus hijos:

**Longitud de línea (WCAG 1.4.8):**
- MaxWidth=sm (672px) mantiene texto a ~75ch con font 16px — lectura óptima para artículos
- MaxWidth=md (1056px) y superior necesitan que el texto sea en columnas (Grid) para no exceder 80ch
- MaxWidth=full sin columnas internas es problemático en viewports muy anchos (texto de pared a pared)

**Cuando usar cada MaxWidth:**
- Contenido de lectura (blog, docs, ayuda): MaxWidth=sm
- Páginas de settings y formularios: MaxWidth=md
- Dashboard con tablas y widgets: MaxWidth=lg o xl
- Full-bleed hero sections: MaxWidth=full con Stack/Grid interno que aplica su propio MaxWidth

---

## Pre-build checklist

```
□ ¿El MaxWidth es apropiado para el tipo de contenido (lectura=sm, dashboard=lg/xl)?
□ ¿Padding=md por defecto en la mayoría de páginas de contenido?
□ ¿Containers anidados usan Padding=none para no duplicar gutters?
□ ¿Centered=no solo en containers dentro de Grid columns o sidebars?
□ ¿MaxWidth=full solo cuando se necesita fluido sin restricción?
□ ¿El consumer aplica el landmark semántico (<main>, <section>) al hijo del Container?
□ ¿Con MaxWidth=md+ el texto está en columnas (no líneas full-width)?
```

---

## Componentes relacionados

```
Grid       → layout 2D dentro del Container; Container sets max-width, Grid sets columns
Stack      → layout 1D dentro del Container; children verticales/horizontales
Page       → abstracción de nivel superior con Container + title + actions (si existe)
Section    → puede wrappear Container para añadir padding vertical de sección
Hero       → típicamente un Container full + contenido centrado dentro
Article    → usa Container sm para contenido de lectura
Dashboard  → usa Container lg/xl para vistas de datos amplias
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Tiene Container | MaxWidths | Padding propio | Diferenciador |
|---------|----------------|----------|---------------|--------------|
| **Material Design 3** | No | Grid breakpoints (grid) | Scaffold contentPadding | Containment via Scaffold + grid margins |
| **Spectrum (Adobe)** | No | Provider breakpoints | — | Flex/Grid directo; Provider para contexto |
| **Carbon (IBM)** | No (Grid hace de Container) | sm/md/lg/xl/max (672-1584px) | Gutter modes (condensed/narrow/default) | Grid = Container unificado; fullWidth prop |
| **Polaris (Shopify)** | Page (con max-width) | 998px / 1440px (2 opciones) | Page padding | Page acoplado a title+actions de Shopify |
| **Atlassian** | No (Box + xcss) | Token-constrained | paddingInline tokens | Composición manual con Box; no pre-built |
| **Ant Design** | No (Layout.Content) | Fluid (sin max-width) | — | Full-width enterprise; sin max-width constraint |
| **Twilio Paste** | Box (no Container) | Manual maxWidth | Manual padding | Box con max-width/margin="auto" |
| **Lightning (Salesforce)** | CSS utility | small/medium/large/x-large (480-1280px) | — | slds-container CSS classes; no React component |
| **Primer (GitHub)** | CSS utility | sm/md/lg/xl (544-1280px) | — | `.container-*` CSS classes; Box con sx |
| **shadcn/ui** | No component | Tailwind max-w-* | Tailwind px-* | BYO Tailwind container/max-w utilities |
| **Radix Themes** | Container | 1-4 (448/688/880/1136px) | Via Section parent | Section (py) + Container (maxWidth) separados |
| **Chakra UI** | Container | sm/md/lg/xl o custom | px prop | centerContent boolean; polymorphic `as`; custom maxW |
| **GOV.UK** | CSS class | 960px fijo (único) | — | Una sola width para uniformidad; accesibilidad institucional |
| **Base Web (Uber)** | Block (no Container) | Manual maxWidth + margin | Manual | Block + overrides; sin abstracción |
| **Fluent 2 (Microsoft)** | No component | CSS Grid/makeStyles | — | Sin Container — CSS application patterns |
| **Gestalt (Pinterest)** | Container | 800px fijo (único) | — | Opinativo: 1 solo ancho para lectura; Box para custom widths |
| **Mantine** | Container | xs/sm/md/lg/xl (540-1320px) + custom | px prop + theme | Más completo: fluid mode + theme customization + responsive |
| **Orbit (Kiwi)** | No component | Stack/Grid + CSS | — | Booking flows full-width; sin Container |
| **Evergreen** | Pane (no Container) | Manual maxWidth | Manual | Pane + marginX="auto" para containment |
| **Nord** | nord-layout | max-inline-size (CSS logical) | padding atributo | Web component; clinical app wrapper |

**Patrones clave de la industria:**
1. **Container como componente es minoría** — solo Chakra, Mantine, Gestalt, Radix Themes y Cedar (T2) lo tienen explícito. La mayoría usa Grid, Box, o CSS utilities. La decisión de incluirlo en el DS es pragmática — reduce repetición en marketing/docs.
2. **Una sola width vs. escala** — GOV.UK (960px) y Gestalt (800px) usan un ancho fijo por razones deliberadas (uniformidad institucional, lectura óptima). El resto ofrece escala. La escala de 5 valores de Carbon es el estándar más adoptado.
3. **Padding separado de MaxWidth** — Radix Themes va más lejos: Section controla py, Container controla maxWidth. Separación de responsabilidades limpia pero agrega un componente extra.
4. **WCAG 1.4.8** — Container es el único componente con impacto directo en longitud de línea. MaxWidth=sm (672px) garantiza ~75ch — el rango recomendado para legibilidad.

---

## Tokens

**10 tokens** · prefijo `cnt-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `cnt-sm-maxWidth` | `sizing/672` | MaxWidth sm — 672px |
| `cnt-md-maxWidth` | `sizing/1056` | MaxWidth md — 1056px |
| `cnt-lg-maxWidth` | `sizing/1312` | MaxWidth lg — 1312px |
| `cnt-xl-maxWidth` | `sizing/1584` | MaxWidth xl — 1584px |
| `cnt-full-maxWidth` | `sizing/full` | MaxWidth full — 100% |
| `cnt-padding-sm-px` | `spacing/4` | Padding sm — px: 16px |
| `cnt-padding-md-px` | `spacing/6` | Padding md — px: 24px |
| `cnt-padding-lg-px` | `spacing/8` | Padding lg — px: 32px |
| `cnt-padding-sm-py` | `spacing/3` | Padding sm — py: 12px |
| `cnt-padding-md-py` | `spacing/4` | Padding md — py: 16px |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  MaxWidth scale (Carbon-aligned)                         │
│                                                          │
│  sm:  ████████████████████ 672px  (lectura)              │
│  md:  ██████████████████████████████ 1056px              │
│  lg:  ████████████████████████████████████ 1312px        │
│  xl:  ██████████████████████████████████████████ 1584px  │
│  full: ─────────────── 100% viewport ──────────────      │
│                                                          │
│  Padding horizontal (px):                                │
│  none: 0px  │  sm: 16px  │  md: 24px  │  lg: 32px        │
│                                                          │
│  Padding vertical (py):                                  │
│  none: 0px  │  sm: 12px  │  md: 16px  │  lg: 24px        │
│                                                          │
│  Frames totales: MaxWidth(5) × Padding(4) × Centered(2)  │
│  = 40 frames netos                                       │
└──────────────────────────────────────────────────────────┘
```
