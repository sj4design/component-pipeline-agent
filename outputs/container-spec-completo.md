# Container

## Overview

Container es un primitive de layout que controla el ancho máximo del contenido y lo centra horizontalmente en el viewport. Es el componente más silencioso del design system — invisible para el usuario final, esencial para el diseñador: establece la caja de contenido que limita la longitud de línea de texto, alinea el contenido entre páginas y establece los gutters horizontales.

No es una superficie visual (sin fondo, sin borde, sin sombra). No tiene estados interactivos. No tiene semántica ARIA propia — esa responsabilidad es del contenido que envuelve. Es, en esencia, `max-width: [valor]; margin-inline: auto; padding-inline: [gutter]`.

```
Vista de viewport completo:
┌────────────────────────────────────────────────────────────────┐  ← Viewport
│ │←  margen auto  →│←────── max-width (ej. 1312px) ─────────→│ │
│                  │  [px]  ←─ area de contenido ─→  [px]       │
│                  │                                             │
│                  │   ┌─────────────────────────────────────┐  │
│                  │   │   Contenido de la página            │  │
│                  │   │   (grid, texto, cards, etc.)        │  │
│                  │   └─────────────────────────────────────┘  │
│                  │                                             │
└────────────────────────────────────────────────────────────────┘

MaxWidth comparison:
  sm   ←── 672px  ──→    artículos, formularios
  md   ←──────── 1056px ────────→    docs, apps
  lg   ←──────────────── 1312px ────────────────→   admin, marketing
  xl   ←────────────────────────── 1584px ────────────────────────→
  full ←──────────────────── 100% del viewport ────────────────────→

Con Centered=yes:              Con Centered=no:
│  auto │ content │ auto │     │ content │ fill │
│←──── centered ───────→│     │←── left-aligned ──→│
```

El Container convive con otros primitives de layout: vive encima de `Grid` (que gestiona columnas internas), dentro de `Stack` (que gestiona espaciado vertical entre secciones) y dentro de `<main>` o `<section>` (que aportan semántica de landmark).

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
MaxWidth: sm | md | lg | xl | full
Padding:  none | sm | md | lg
Centered: yes | no
```

Toggles (show/hide parts — do NOT generate extra variants):

```
(ninguno — Container no tiene slots visibles adicionales)
```

### Figma properties panel

```
┌─────────────────────────────┐
│  Container                  │
│  ─────────────────────────  │
│  MaxWidth  [lg          ▼]  │
│  Padding   [md          ▼]  │
│  Centered  [yes         ▼]  │
└─────────────────────────────┘
```

---

## When to use (and when not to)

```
¿Necesitas controlar el ancho máximo de contenido en una página?
│
├─ ¿Para todo el ancho de la página (marketing, docs, admin)?
│   └─ Container (MaxWidth sm/md/lg/xl según tipo de página)
│
├─ ¿Para columnas dentro de una página?
│   └─ Grid (no Container — Grid gestiona columnas y gutters)
│
├─ ¿Para un modal / dialog?
│   └─ Dialog tiene su propio width control — no usar Container
│
├─ ¿Para una card con fondo/borde?
│   └─ Card o Box — Container no tiene propiedades visuales
│
└─ ¿Para layout full-width (dashboard, mapa, media)?
    └─ Container con MaxWidth=full o sin Container
```

**Usar Container cuando:**
- Se necesita establecer el ancho máximo del contenido de una página y centrarlo horizontalmente — marketing pages, páginas de documentación, formularios, admin panels.
- Se quiere garantizar que el texto no supere ~80 caracteres por línea (WCAG 1.4.8) usando MaxWidth sm/md.
- Se necesita padding horizontal consistente entre páginas sin copiar valores hardcoded en cada frame.
- Se está creando una sección de una página que debe alinearse horizontalmente con otras secciones de la misma página.

**NO usar Container cuando:**
- El contenido es full-width por definición (dashboard, tabla de datos edge-to-edge, mapa, video) — usar MaxWidth=full o directamente sin Container.
- Se necesita una superficie visual (fondo, borde, sombra) — eso corresponde a Card, Box o Panel, no a Container.
- El layout es column-based con alineación de grid — usar Grid directamente, que ya incluye max-width y gutters.
- Se está dentro de un Dialog o Modal — esos componentes tienen su propio control de ancho.
- Se necesitan múltiples niveles de anidamiento de Containers — considerar si Grid es más apropiado para el layout complejo.

---

## Visual variations

### MaxWidth

| Valor | max-width | Uso típico |
|-------|-----------|------------|
| `sm`  | 672px     | Artículos de blog, formularios de configuración, reading flows |
| `md`  | 1056px    | Documentación, apps de productividad, admin panels medianos |
| `lg`  | 1312px    | Páginas de marketing, admin panels estándar, dashboards |
| `xl`  | 1584px    | Pantallas ultra-wide, layouts de data visualization extensos |
| `full`| 100%      | Edge-to-edge: dashboards full-width, mapas, media |

### Padding (padding-inline horizontal)

| Valor  | padding-inline | padding-block | Uso típico |
|--------|---------------|---------------|------------|
| `none` | 0px           | 0px           | Consumer gestiona padding — contenido toca los bordes del container |
| `sm`   | 16px          | 12px          | Mobile-first, paneles compactos |
| `md`   | 24px          | 16px          | Default — la mayoría de páginas |
| `lg`   | 32px          | 24px          | Páginas de marketing con amplio whitespace |

### Centered

**Centered=yes (default):** `margin-inline: auto`. El container se centra horizontalmente en su parent. Uso: prácticamente todas las páginas públicas y la mayoría de admin.

**Centered=no:** Sin `margin-inline: auto`. El container se alinea a la izquierda de su parent. Uso: containers anidados dentro de layouts de grid (para no competir con el centering del parent), sidebars, contenido left-aligned específico.

---

## Design decisions

### 1. Container standalone (5 de 6 Tier-1 lo omiten)

**Por qué:** Material Design 3, Spectrum, Polaris (usa Page), Atlassian (usa Box con xcss), Ant Design (fluid por defecto) y Carbon (Grid-as-Container) no tienen Container como primitive standalone — lo resuelven con Grid, Page o Box. Sin embargo, REI Cedar (e-commerce), Mantine y Chakra demuestran que un Container standalone es valioso cuando el producto tiene múltiples contextos de página (marketing, docs, admin) que necesitan ancho consistente sin la complejidad de un Grid completo.

**Tradeoff:** Grid es más potente — gestiona columnas, gutters y max-width simultáneamente. Container es más simple — solo gestiona max-width y centering. La elección depende del contexto: para páginas donde el layout es columnar en toda su superficie, Grid. Para páginas donde la mayor parte del contenido es lineal (artículos, formularios, texto) con layout columnar ocasional dentro, Container es más apropiado y menos verboso.

### 2. MaxWidth: sm/md/lg/xl/full (escala Carbon/Mantine)

**Por qué:** Carbon tiene la escala de max-widths más completa y documentada del corpus (5 breakpoints: 320/672/1056/1312/1584px), alineada a su sistema de Grid. Mantine tiene los valores más prácticos para aplicaciones web modernas (540/720/960/1140/1320px). Adoptamos los valores de Carbon (que son más alineables con sistemas de grid) mapeados a nombres de T-shirt size (sm/md/lg/xl/full) para discoverabilidad, con la inclusión de `full` como escape hatch.

**Tradeoff:** Los nombres sm/md/lg/xl son ambiguos fuera de contexto — un diseñador podría no saber qué ancho específico representa `lg`. La solución es documentar los valores exactos junto a cada propiedad y mostrarlos en el Figma panel description. La alternativa (valores numéricos como Radix: 1/2/3/4) es más honesta pero menos intuitiva.

### 3. Padding como property separada (no inset/outset)

**Por qué:** Box en Atlassian separa maxWidth de padding, y Mantine expone `px` como prop independiente de `size`. Combinar el padding con el max-width en una sola property limita la flexibilidad: un contenedor de 672px puede necesitar padding=none (si está dentro de otro container con padding), padding=sm (en mobile) o padding=lg (en una landing amplia). La separación permite todas las combinaciones sin ambigüedad.

**Tradeoff:** 5 max-widths × 4 padding values × 2 centered modes = 40 frames en Figma. Es el número correcto — cubre todos los casos de uso sin ser excesivo. La alternativa (solo 5-6 frames predefinidos) limitaría la flexibilidad.

### 4. Centered como property (no comportamiento hardcoded)

**Por qué:** El 90% de los casos necesita `Centered=yes` (marketing, docs, admin central). Pero existen casos legítimos de `Centered=no`: sidebars donde el container debe alinearse a izquierda dentro de un flex parent, containers anidados dentro de columnas de Grid, o layouts intencionalmente left-aligned. Polaris documenta un caso similar con `narrowWidth`. Hacer centrado hardcoded eliminaría esos casos sin proveer alternativa.

**Tradeoff:** Añadir una property booleana de "centered" puede confundir a diseñadores que asumen que centrar es siempre correcto. La documentación debe explicar cuándo usar `Centered=no` con ejemplos concretos.

---

## Behavior

### Essential for design

Container es un primitive de layout puro — no tiene estados interactivos, no es focusable, no gestiona foco. Su única función visual es establecer las restricciones de ancho y el padding horizontal.

Cuando `Padding != none`, el padding se aplica como `padding-inline` (lógico CSS) para compatibilidad RTL — no `padding-left/right`. En implementación: `padding-inline: [valor]; max-inline-size: [max-width]; margin-inline: auto`.

El Container no establece `overflow: hidden` por defecto — el contenido puede desbordarse si es más ancho que el Container (ej. una imagen wide o un código pre-formateado). La responsabilidad de manejar overflow es del contenido, no del Container.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Container div | ninguno | — | Es presentacional; sin ARIA role propio |
| Polymorphic `as` | heredado | Si `as="main"`, se convierte en landmark | Permite añadir semántica sin wrapper extra |

Container no requiere ningún atributo ARIA. Si el consumer necesita que el container sea un landmark, usa el `as` prop: `<Container as="main">` o `<Container as="section" aria-label="Contenido principal">`.

**WCAG 1.4.8 (Visual Presentation):** El max-width de Container contribuye directamente al cumplimiento de WCAG 1.4.8 — la longitud de línea de texto no debe superar 80 caracteres. Un Container sm (672px) con font-size 16px y line-height 1.5 produce ~75 caracteres por línea, cumpliendo la guía.

### Keyboard navigation

Container no tiene keyboard navigation — no es focusable, no tiene elementos interactivos. Todo el keyboard behavior viene del contenido que envuelve.

```
(Sin keyboard interactions — es un layout primitive)
```

---

## Content guide

### Slot: children

Container envuelve un único slot de contenido — todo su contenido va aquí. No hay sub-slots, no hay named regions, no hay estructura interna.

**Qué puede vivir dentro de un Container:**
- Un `<main>` con el contenido principal de la página — `<Container><main>...</main></Container>`
- Un `Grid` de columnas que necesita estar centrado y con max-width
- Una sección de landing page con texto, CTA y imagen
- Un formulario de configuración que no debe extenderse a todo el ancho del viewport

**Qué NO debe vivir directamente en Container:**
- Otro Container sin necesidad — el anidamiento gratuito de Containers agrega divs sin valor
- Contenido que ya tiene su propio control de ancho (Dialog, Modal, Drawer)
- Una grid que ya maneja sus propios gutters (colocar Grid dentro de Container está bien; colocar Container dentro de Grid columns generalmente no)

### Recomendaciones de uso por tipo de página

**Marketing / Landing:** `MaxWidth=lg` (1312px), `Padding=lg` (32px), `Centered=yes`. Las secciones hero suelen ser `MaxWidth=full` para imágenes edge-to-edge, con un Container `MaxWidth=lg` anidado para texto y CTAs.

**Documentación / Artículos:** `MaxWidth=sm` (672px), `Padding=md` (24px), `Centered=yes`. La restricción de ancho de columna de texto es el uso más crítico para legibilidad y WCAG 1.4.8.

**Admin Panel / Dashboard:** `MaxWidth=lg` (1312px) o `MaxWidth=xl` (1584px) para pantallas amplias, `Padding=md` (24px), `Centered=yes`. Secciones de tabla de datos pueden necesitar `MaxWidth=full`.

**Formularios / Settings:** `MaxWidth=sm` (672px) o `MaxWidth=md` (1056px), `Padding=md`, `Centered=yes`. Los formularios son más usables con ancho restringido — reduce el scanning horizontal.

---

## Pre-build checklist

```
ESTRUCTURA
□ MaxWidth × Padding × Centered = 5×4×2 = 40 frames
□ Prop "MaxWidth": sm | md | lg | xl | full
□ Prop "Padding": none | sm | md | lg
□ Prop "Centered": yes | no
□ Slot "children" como frame fill (sin tamaño fijo — es un wrapper)

VALORES DE MAX-WIDTH
□ sm   = 672px   → token cnt/sm/maxWidth
□ md   = 1056px  → token cnt/md/maxWidth
□ lg   = 1312px  → token cnt/lg/maxWidth
□ xl   = 1584px  → token cnt/xl/maxWidth
□ full = 100%    → token cnt/full/maxWidth

VALORES DE PADDING INLINE
□ none = 0px     → sin token
□ sm   = px 16px, py 12px → tokens cnt/padding/sm/px + py
□ md   = px 24px, py 16px → tokens cnt/padding/md/px + py
□ lg   = px 32px, py 24px → tokens cnt/padding/lg/px + py

ACCESIBILIDAD
□ Container renderiza como <div> sin role (correcto)
□ "as" prop disponible para polymorphic rendering
□ Sin tabIndex, sin role, sin ARIA state
□ Documentar: "consumer aplica landmark (main/section/article)"

TOKENS
□ Prefix cnt- aplicado a 10 variables
□ Padding usa spacing tokens del sistema
□ Max-width usa sizing tokens del sistema

DOCUMENTACIÓN
□ Container ≠ Card/Box/Panel (sin background, border, shadow)
□ Container ≠ Grid (no gestiona columnas)
□ Container ≠ Dialog width control
□ Cuándo usar Centered=no (sidebar, anidado en Grid columns)
□ WCAG 1.4.8 referencia para MaxWidth=sm en reading flows
```

---

## Related components

```
Grid            → layout columnar con max-width integrado + gutters
Stack           → espaciado vertical entre secciones (vive dentro del Container)
Box             → primitive flexible con props visuales (bg, border, shadow)
Card            → surface con fondo + borde + padding semántico
Page            → Polaris-style: Container + título/actions/breadcrumb (no incluido)
Section         → Radix pattern: wrapper de spacing vertical que envuelve Container
```

---

## Reference: how other systems do it

### Carbon (IBM) — Grid = Container (5 breakpoints integrados)

Carbon provee Grid como el container primario — no existe un Container standalone separado. Grid aplica max-width en cinco breakpoints (sm=320px, md=672px, lg=1056px, xl=1312px, max=1584px), centra con auto margins y gestiona gutters horizontales. `fullWidth` prop para layouts fluid. Tres gutter modes: `condensed` (1px — datos densos), `narrow` (16px — densidad media), `default` (32px — editorial). La arquitectura integrada es elegante pero fuerza a usar estructura de columnas incluso para contenido lineal — su tradeoff principal.

### Polaris (Shopify) — Page como contenedor primario

Polaris maneja containment a través del componente `Page`, que provee max-width (default 1440px), padding horizontal, y espaciado vertical con title + action slots integrados. `narrowWidth` restringe Page a 998px para flows focalizados como settings y formularios. `Box` con `maxWidth` y `paddingInline` funciona como escape hatch para containment ad-hoc sin semántica de página. La lección: cuando Container siempre vive en un contexto de página, tiene sentido fusionarlo con la estructura de página — pero esto reduce su reutilizabilidad fuera de ese contexto.

### REI Cedar — El único Tier 2 con Container standalone de primera clase

`CdrContainer` de REI Cedar es el único sistema Tier 2 con Container dedicado como first-class primitive. Aplica max-width responsive y padding horizontal consistente across todo el e-commerce de REI — garantizando que marketing pages y product pages tengan idéntico comportamiento de containment. Valida que un Container simple (width + centering + padding) justifica ser un componente de primera clase cuando la consistencia cross-page es crítica.

### Radix Themes — Section + Container: separación de concerns única

Radix Themes tiene la arquitectura más elegante del corpus: Container controla SOLO el max-width (4 tamaños: 448/688/880/1136px). El padding horizontal viene del componente padre `Section`. Esta separación — Container = width constraint, Section = spacing wrapper — es la decisión más clean arquitecturalmente pero requiere que los teams siempre usen ambos componentes juntos, añadiendo overhead cognitivo. Unique en los 24 sistemas. El `display` prop responsive permite ocultar o reflujir el Container en diferentes viewports.

### Chakra UI — El más flexible: `maxW` arbitrario + `centerContent` + polymorphic `as`

Chakra Container acepta `maxW` con T-shirt sizes (sm/md/lg/xl) o valores CSS arbitrarios (cualquier pixel). `centerContent` añade flexbox centering para los children directos del Container. El `as` polymorphic prop habilita `<Container as="main">` o `<Container as="section" aria-label="...">` — elimina divs wrapper extra para semántica HTML. Es el Container más flexible del corpus, con el tradeoff de que `maxW` arbitrario puede crear divergencia si los teams no usan la escala definida.

### Mantine — El más completo: 5 sizes + fluid + theme customization

Mantine es el Container más feature-complete: 5 named sizes con customización a nivel de tema (xs=540/sm=720/md=960/lg=1140/xl=1320px). `fluid` boolean remueve max-width para layouts edge-to-edge. Custom pixel value override. `px` prop vinculado a tokens de spacing del tema — padding horizontal se propaga desde el tema, no desde instancias. La arquitectura de customización a nivel de tema (en lugar de per-instance) es la más correcta para multi-page consistency: cambiar el tema actualiza todas las instancias simultáneamente.

### Gestalt (Pinterest) — Single fixed width: Container = reading width, nada más

Gestalt tiene la postura más opinionada: Container es 800px de ancho fijo, sin size variants. Si necesitas un ancho diferente, usa Box con `maxWidth` explícito. La filosofía: Container = "reading content width" — un concepto semántico, no una herramienta de layout flexible. 800px mantiene texto dentro de longitudes de línea cómodas (~75 chars a 16px). La ausencia deliberada de variantes fuerza consistencia y evita que designers elijan arbitrariamente entre opciones.

### GOV.UK — Single fixed width por consistencia institucional

GOV.UK usa una sola clase CSS (`govuk-width-container`) con `max-width: 960px` + `margin: 0 auto` dentro del `govuk-main-wrapper`. Un único ancho para todos los servicios gubernamentales garantiza consistencia institucional. Sin variantes — ningún equipo puede crear un layout más ancho o más estrecho que rompa la experiencia uniforme del gobierno. Es el enfoque más accessibility-conscious: 960px garantiza longitudes de línea conformes con WCAG 1.4.8 en todos los servicios.

### Nord (Nordhealth) — `max-inline-size` para RTL correctness

Nord provee `nord-layout` con `max-inline-size` (CSS logical property) en lugar de `max-width`. Es el único sistema que usa la propiedad lógica correcta para internacionalización: `max-inline-size` respeta writing-mode y direction para layouts RTL (árabe, hebreo, etc.). Para productos internacionales, esto es la implementación correcta desde el inicio — cambiar de `max-width` a `max-inline-size` posteriormente puede requerir auditoría de todo el CSS.

### Lightning Design System (Salesforce) — CSS utility classes para multi-framework

Lightning provee `slds-container` como clases CSS con cuatro named sizes: small=480px, medium=768px, large=1024px, x-large=1280px. CSS utility approach — no componente — por razones de compatibilidad multi-framework (Aura, LWC, Visualforce). `slds-container--center` para centrado horizontal. La elección de CSS utilities sobre componentes es correcta para stacks con múltiples frameworks frontend donde un componente React/Svelte/Angular no puede ser el único delivery mechanism.

---

## Tokens

**10 tokens** · prefix `cnt-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `cnt/sm/maxWidth` | `sizing/672` | Max-width Container sm |
| `cnt/md/maxWidth` | `sizing/1056` | Max-width Container md |
| `cnt/lg/maxWidth` | `sizing/1312` | Max-width Container lg |
| `cnt/xl/maxWidth` | `sizing/1584` | Max-width Container xl |
| `cnt/full/maxWidth` | `sizing/full` | Max-width Container full (100%) |
| `cnt/padding/sm/px` | `spacing/4` (16px) | Padding inline Container sm |
| `cnt/padding/md/px` | `spacing/6` (24px) | Padding inline Container md |
| `cnt/padding/lg/px` | `spacing/8` (32px) | Padding inline Container lg |
| `cnt/padding/sm/py` | `spacing/3` (12px) | Padding block Container sm |
| `cnt/padding/md/py` | `spacing/4` (16px) | Padding block Container md |
| `cnt/padding/lg/py` | `spacing/6` (24px) | Padding block Container lg |

### Spacing specs

```
MaxWidth values:
  sm   = 672px   (documentación, artículos, formularios)
  md   = 1056px  (apps, docs completos)
  lg   = 1312px  (admin, marketing — default recomendado)
  xl   = 1584px  (ultra-wide, data viz extensas)
  full = 100vw   (edge-to-edge)

Padding inline (horizontal):
  none = 0px / 0px
  sm   = px: 16px | py: 12px
  md   = px: 24px | py: 16px   ← default recomendado
  lg   = px: 32px | py: 24px

Centered=yes:
  margin-inline: auto
  (equivalente a margin-left: auto + margin-right: auto en LTR)

Centered=no:
  margin-inline: 0 (o margin-inline-start: 0)

Implementación CSS correcta:
  max-inline-size: [value];   /* no max-width para RTL support */
  margin-inline: auto;        /* no margin: 0 auto */
  padding-inline: [value];    /* no padding-left/right */

WCAG 1.4.8 reference:
  MaxWidth=sm (672px) a font-size 16px ≈ 72 chars/línea ✓
  MaxWidth=md (1056px) a font-size 16px ≈ 113 chars/línea ✗ para cuerpo de texto
  → Para reading flows usar siempre MaxWidth=sm
  → Para layouts con múltiples columnas usar MaxWidth=md/lg + Grid interno
```
