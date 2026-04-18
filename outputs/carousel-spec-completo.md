# Carousel

## Overview

Carousel es un contenedor de slides con navegación que permite explorar contenido horizontal o vertical de forma secuencial. El componente soporta cuatro tipos de layout (single, multi, hero, thumbnail), tres estilos de indicadores de posición (dots, lines, counter), y controls de navegación opcionales (flechas). Está diseñado para casos de uso donde la exploración visual controlada por el usuario es valiosa — galerías de productos, showcases de features, contenido de onboarding — y no para sustituir contenido que debería estar completamente visible en una lista o grid.

**Nota crítica**: El 67% de los sistemas analizados (16/24) no implementan Carousel, muchos con justificaciones explícitas basadas en UX research (GOV.UK, Polaris, Spectrum). Antes de usar este componente, considerar si el contenido puede ser mostrado en un grid o lista donde todo sea visible simultáneamente.

```
Type=single (showcase estándar):
         ←  ┌───────────────────────────────────┐  →
            │                                   │
            │     [Contenido del slide activo]   │
            │     Imagen / Card / Texto          │
            │                                   │
            └───────────────────────────────────┘
                         ● ○ ○ ○ ○
                     (Indicators=dots)

Type=multi (browse con peek):
┌────────────────────────────────────────────────┐
│  │ CARD 1        │ CARD 2        │ CARD 3 │ ...│
│  │   (activo)    │   (activo)    │  (peek)│    │
│  └───────────────┴───────────────┴─────── ┘    │
│         ←                          →            │
└────────────────────────────────────────────────┘

Type=hero (full-width banner):
┌────────────────────────────────────────────────┐
│                                                │
│          HERO SLIDE — full width               │
│          Heading grande + subtítulo            │
│                                                │
│  ●───────────────────────  (Indicators=lines)  │
└────────────────────────────────────────────────┘

Type=thumbnail (e-commerce):
┌────────────────────────────────┐
│                                │
│       [Imagen principal]       │  ← slide activo grande
│                                │
└────────────────────────────────┘
  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
  │ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │   ← strip de thumbnails
  └───┘ └───┘ └───┘ └───┘ └───┘
        (thumbnails = indicadores)

CarouselSlide states:
  default     — slide fuera del viewport activo
  active      — slide actualmente visible
  transitioning — slide en animación de entrada/salida
```

El componente está compuesto por CarouselSlide (sub-componente) como bloque de construcción para cada slide individual.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
CarouselSlide:
  State: default | active | transitioning

Carousel:
  Type:       single | multi | hero | thumbnail
  Indicators: dots | lines | counter | none
  Controls:   arrows | none | both
  Size:       sm | md | lg
```

Toggles (show/hide parts — do NOT generate extra variants):

```
👁 Show Controls     → prevButton + nextButton layers
👁 Show Indicators   → indicators layer
👁 Show Counter      → counter layer (formato "3 / 12")
```

### Figma properties panel

```
╔══════════════════════════════════════╗
║  CarouselSlide                       ║
╠══════════════════════════════════════╣
║  State        [active ▾]             ║
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  Carousel                            ║
╠══════════════════════════════════════╣
║  Type         [single ▾]             ║
║  Indicators   [dots ▾]               ║
║  Controls     [arrows ▾]             ║
║  Size         [md ▾]                 ║
╠══════════════════════════════════════╣
║  👁 Show Controls      [✓]           ║
║  👁 Show Indicators    [✓]           ║
║  👁 Show Counter       [ ]           ║
╚══════════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿Necesitas mostrar contenido en formato rotante o exploratorio?
│
├── ¿El usuario NECESITA ver todo el contenido para decidir?
│   └── NO usar Carousel → usar Grid o List (todo visible)
│
├── ¿Es solo exploración visual de contenido homogéneo?
│   ├── SÍ, 1 item a la vez → Carousel Type=single
│   ├── SÍ, varios visibles + browse → Carousel Type=multi
│   ├── SÍ, full-width marketing banner → Carousel Type=hero
│   └── SÍ, galería de producto e-commerce → Carousel Type=thumbnail
│
├── ¿Quieres auto-play?
│   └── SÍ → SOLO con botón de pausa visible (WCAG 2.2.2 — NO opcional)
│
└── ¿El contexto es enterprise, admin, o tool?
    └── Preferir Grid/Tabs — el carousel es anti-patrón en interfaces de tarea
```

**Use Carousel when:**
- El contenido es visual y homogéneo (imágenes, cards de producto, features)
- La exploración horizontal es el modo de interacción esperado por el usuario
- El tipo es single (galerías, product galleries con main + thumbnails)
- El contexto es discovery browsing controlado por el usuario, no presentación de información crítica
- Las slides contienen contenido equivalente — ninguna slide es más importante que las demás

**Do NOT use Carousel when:**
- El contenido de las slides no-primera es importante para la decisión del usuario — el dato de Polaris (<1% CTR en slides más allá del primero) indica que el usuario raramente llega al resto
- El contexto es una interfaz de tarea o admin — usar TabList, AccordionGroup, o Grid
- El contenido es texto largo o informativo — el carousel fragmenta y oculta información
- El auto-play se quiere implementar sin un botón de pausa visible y focusable
- Las slides tienen propósitos diferentes entre sí — usar Tabs (labels visibles) en lugar de Carousel

---

## Visual variations

### Type variations

**Type=single**
El tipo más común. Un slide visible a la vez, centrado y a full ancho del contenedor. Los controles (flechas) se superponen sobre los bordes del slide o aparecen debajo. Los dots indican posición y total de slides. Altura fija: sm=240px, md=400px, lg=560px.

**Type=multi**
Múltiples slides visibles simultáneamente con un "peek" del siguiente/anterior en los bordes del contenedor. Genera sensación de browsing horizontal. Más adecuado para contenido tipo card (productos, artículos, testimoniales). El número de slides visibles se configura por breakpoint.

**Type=hero**
Slide de ancho completo sin márgenes laterales — el contenido llega al borde del contenedor. Típicamente imagen de fondo con texto superpuesto. Indicators tipo lines (progress bars) o none. Altura lg=560px por defecto.

**Type=thumbnail**
Slide principal grande arriba + strip horizontal de thumbnails abajo. Los thumbnails actúan como indicadores de posición y como controles de navegación directa. Exclusión: `Type=thumbnail + Indicators=dots` no aplica (los thumbnails ya son los indicadores).

### Indicators

**dots**: Círculos pequeños. Activo: color `interactive/default` (azul, 10px). Inactivo: `border/default` (gris, 8–10px). Espaciado 8px entre dots. Centrados bajo el slide.

**lines**: Barras horizontales de progreso (24×4px). La barra activa está llena de `interactive/default`; las inactivas de `border/default`. Útil para hero banners con sensación de "avance".

**counter**: Texto "3 / 12" en `text/secondary` (gris), font 13px. Posicionado en esquina o bajo el slide. Patrón de Atlassian — más informativo que dots cuando hay muchos slides (>7).

**none**: Sin indicadores visuales de posición. Solo válido cuando el contexto provee contexto suficiente (ej. thumbnail strip ya indica posición).

### Controls

**arrows**: Flechas prev/next solo (sin "both"). El botón "previous" deshabilitado en el primer slide (sin loop). El botón "next" deshabilitado en el último slide (sin loop). Con loop, ambas siempre activas.

**none**: Sin controles de flecha. Solo navegación por indicators o swipe.

**both**: Flechas + indicadores visibles simultáneamente. Es el valor por defecto más completo.

### Sizes

| Size | height | indicatorSize | controlSize | gap |
|------|--------|--------------|-------------|-----|
| sm   | 240px  | 8px          | 32px        | 8px |
| md   | 400px  | 10px         | 40px        | 12px |
| lg   | 560px  | 12px         | 48px        | 16px |

---

## Design decisions

### 1. Sin auto-play por defecto (user agency como principio)

**Why:** No es solo un requisito de WCAG 2.2.2 — es un principio de product design. M3, Gestalt y GOV.UK documentan explícitamente que el auto-advancing elimina la agencia del usuario sobre qué ve y cuándo. El dato de Polaris (<1% CTR más allá del primer slide) sugiere que los usuarios raramente exploran los slides — el auto-play no mejora el engagement, solo mueve el contenido sin que el usuario lo controle. Cuando se necesita auto-play para marketing/showcase, debe ser opt-in y siempre acompañado de un botón de pausa visible y focusable.

**Tradeoff:** Algunos stakeholders de marketing esperan auto-play. La documentación del riesgo de WCAG 2.2.2 y la referencia a los datos de CTR de Polaris proveen argumentos objetivos para la discusión.

### 2. WAI-ARIA Carousel pattern formal (role=region + role=group por slide)

**Why:** El patrón canónico WAI-ARIA para carousel define semántica específica que no puede ser reemplazada por otros roles: `role="region"` + `aria-roledescription="carousel"` en el contenedor, y `role="group"` + `aria-roledescription="slide"` + `aria-label="Slide N of M"` en cada slide. Fluent 2 es el sistema con la implementación más completa de este patrón. Sin estos roles, los screen readers tratan el carousel como un div genérico y los usuarios no entienden la estructura.

**Tradeoff:** `aria-roledescription` es una feature ARIA avanzada que puede no ser soportada por todos los screen readers antiguos. Sin embargo, degrada gracefully — si no se soporta, el contenido sigue siendo accesible, solo sin la descripción de "carousel".

### 3. 4 Types distintos (single/multi/hero/thumbnail)

**Why:** Los cuatro tipos representan casos de uso con presentaciones fundamentalmente distintas, no variantes de una misma presentación. Un product gallery (thumbnail) tiene una relación principal/detalle que no existe en un hero banner. Un multi-browse con peek tiene una affordance de "hay más" que el single no necesita. Tratar los cuatro como variantes de un mismo patrón oscurece estas diferencias semánticas y funcionales.

**Tradeoff:** 36 frames netos en Figma (después de exclusiones) — más que la mayoría de componentes. La exclusión `Type=thumbnail + Indicators=dots` reduce el total pero la complejidad del componente es inherente a sus múltiples contextos de uso.

### 4. Slides ocultos con inert para skip Tab

**Why:** El error de a11y más común en implementaciones de carousel: slides fuera del viewport contienen links, botones e inputs que siguen siendo alcanzables con Tab key — el usuario navega a contenido invisible. La mitigación correcta es `aria-hidden="true"` + `tabindex="-1"` en todos los elementos focusables de slides no-activos, actualizado en cada cambio de slide.

**Tradeoff:** Requiere gestión dinámica de atributos en cada transición de slide. En implementaciones basadas en CSS-only, esto no es posible. Embla y las implementaciones de referencia manejan esto correctamente.

### Excluded combinations

```
Type=thumbnail + Indicators=dots
→ En el tipo thumbnail, el strip de thumbnails ya actúa como indicador de posición;
  agregar dots es redundante y confuso visualmente

autoplay=true + sin pause button
→ WCAG 2.2.2 violation — si se habilita autoplay, el pause button
  es obligatorio y no puede ser omitido por configuración
```

---

## Behavior

### Essential for design

**Slides ocultos y focus**: Las slides fuera del viewport deben tener todos sus elementos focusables internos inaccesibles por Tab. Si un slide contiene un link o botón y no está activo, ese link/botón debe tener `tabindex="-1"` y el slide `aria-hidden="true"`. Esto se actualiza en cada cambio de slide.

**Loop behavior**: Con `Controls=arrows` y sin loop, el botón "previous" está deshabilitado en el primer slide y "next" en el último. Con loop, ambos siempre activos. El diseño debe mostrar el estado disabled del botón.

**Touch/swipe**: Todos los carousels deben soportar swipe horizontal en mobile. El swipe debe producir el mismo resultado que las flechas. No hay estado visual específico para swipe en Figma — es responsabilidad de la implementación.

**Auto-play (cuando se activa)**: El slide cambia según el `autoplaySpeed`. Se pausa al hacer hover sobre el carousel, al recibir focus cualquier elemento interno, y al activar el pause button. Solo el pause button es WCAG compliant — hover/focus alone no es suficiente.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Container | `region` | `aria-roledescription="carousel"`, `aria-label="[propósito]"` (ej: "Productos destacados") | Define la región semántica del carousel para SR |
| Cada slide | `group` | `aria-roledescription="slide"`, `aria-label="Slide N de M"` | SR anuncia posición en la secuencia al navegar |
| Slides no activos | heredado | `aria-hidden="true"` en el contenedor del slide | Oculta contenido invisible del AT |
| Contenido de slides ocultos | heredado | `tabindex="-1"` en todos los elementos focusables | Previene Tab a contenido invisible |
| Botón prev | `button` | `aria-label="Slide anterior"` | Nav sin texto visible |
| Botón next | `button` | `aria-label="Siguiente slide"` | Nav sin texto visible |
| Botón prev (disabled) | `button` | `aria-disabled="true"` (sin loop, primer slide) | SR anuncia "no disponible" |
| Dots indicator | `tablist` | — | Permite navegación directa por teclado |
| Dot individual | `tab` | `aria-selected="true"` (activo), `aria-label="Ir al slide N"` | SR anuncia qué slide activa |
| Slide content area | contenedor | `aria-live="polite"` | Anuncia cambios de slide sin interrumpir |
| Pause button (autoplay) | `button` | `aria-label="Pausar rotación automática"` | WCAG 2.2.2 — control obligatorio para autoplay |

### Keyboard navigation

Primary interactions (affect design):

```
Tecla          | Acción                                 | Focus target
────────────── | ────────────────────────────────────── | ────────────────────
Arrow Left     | Slide anterior                         | Botón prev (si tiene focus)
Arrow Right    | Siguiente slide                        | Botón next (si tiene focus)
Home           | Primer slide                           | Primer slide
End            | Último slide                           | Último slide
Tab            | Mueve entre controles del carousel     | Botón next / dots / pause
Shift+Tab      | Retrocede entre controles              | Botón prev
Enter / Space  | Activa dot: navega a ese slide         | Dot activo
Enter          | Activa botón next/prev                 | Botón activado
```

Secondary interactions (dev reference):

```
Swipe izquierda → Siguiente slide (gesture mobile)
Swipe derecha   → Slide anterior (gesture mobile)
Hover           → Pausa autoplay (solo supplementary — NO suficiente para WCAG)
```

**Focus management:**
- Al cargar, ningún elemento del carousel tiene focus inicial
- Tab entra al carousel y mueve el focus al primer control interactivo (botón prev o primer dot)
- En slides con contenido interno interactivo (links, botones), Tab navega dentro del slide activo; Tab fuera del último elemento del slide activo mueve al siguiente control del carousel
- Los slides no activos son "invisibles" para Tab — sus elementos no reciben focus

---

## Content guide

### slides (CarouselSlide content)
El contenido dentro de cada slide debe ser auto-contenido — funcionar sin ver los otros slides. Evitar narrativas del tipo "como vimos en el slide anterior" o "a continuación veremos". Cada slide es una unidad completa.

Para galerías de imágenes: cada imagen debe tener un `alt` descriptivo. Para slides con solo imágenes decorativas, `alt=""`. Para slides con producto: `alt="[Nombre del producto], [color], vista [frontal/lateral]"`.

### prevButton / nextButton
Solo ícono (chevron izquierdo/derecho). El texto accesible viene del `aria-label`. No añadir texto visible — la iconografía es universalmente entendida para este patrón. Tamaño mínimo del botón: 32px (sm) / 40px (md) / 48px (lg).

### indicators (dots)
Los dots no tienen texto visible. Su valor informativo es puramente posicional. Para que sean útiles para SR, cada dot necesita `aria-label="Ir al slide N"` y el dot activo `aria-selected="true"`. No más de 10–12 dots — con más slides, usar `Indicators=counter`.

### counter
Formato canónico: "[posición] / [total]". Ejemplos: "3 / 12", "1 / 5". No usar "Slide 3 de 12" — el texto largo reduce el espacio disponible y el formato numérico es igualmente claro. El counter debe actualizarse en cada cambio de slide.

---

## Pre-build checklist

```
CarouselSlide
□ 3 frames: State(3) — default, active, transitioning
□ default: opacidad reducida o fuera del viewport activo
□ active: visibilidad completa, contenido interactivo
□ transitioning: estado intermedio de animación (puede ser simplificado en Figma)

Carousel
□ 36 frames netos generados según combinaciones útiles
□ Exclusión implementada: Type=thumbnail no tiene frame con Indicators=dots
□ sm/md/lg heights correctos: 240/400/560px

Controles
□ prevButton: aria-label="Slide anterior", disabled state cuando primer slide (sin loop)
□ nextButton: aria-label="Siguiente slide", disabled state cuando último slide (sin loop)
□ Tamaños mínimos botones: sm=32px / md=40px / lg=48px

Indicators
□ dots: activo=interactive/default, inactivo=border/default; cada dot con aria-label
□ lines: barra llena=active, barra vacía=inactive
□ counter: formato "N / Total" en text/secondary
□ Dots agrupados en role="tablist" con cada dot como role="tab"

A11y crítica
□ Slides no activos tienen aria-hidden="true" en el diseño
□ role="region" + aria-roledescription="carousel" en el container
□ role="group" + aria-roledescription="slide" + aria-label="Slide N de M" en cada slide
□ aria-live="polite" en el contenedor de slides (documenta en spec)
□ Si se incluye autoplay: botón pause obligatorio, visible, focusable

Exclusiones verificadas
□ Type=thumbnail: sin Indicators=dots frame
□ Documentar: autoplay requiere pause button visible
```

---

## Related components

```
Componente       | Cuándo usar ESTE en lugar de Carousel
────────────────────────────────────────────────────────────────────────
Grid/List        | El usuario necesita ver TODO el contenido para decidir;
                 | contenido informativo o de tarea; sin exploración visual

Tabs             | Contenido dividido en categorías con labels visibles;
                 | el usuario necesita acceder a cualquier sección directamente

Image (single)   | Una sola imagen sin galería; sin navegación;
                 | el contexto no requiere exploración de múltiples items

Modal + gallery  | Galería con zoom, detalle, y lightbox; cuando el usuario
                 | necesita inspeccionar imágenes en detalle
```

---

## Reference: how other systems do it

### Gestalt (Pinterest)
El modelo de referencia más instructivo precisamente porque el contexto es radicalmente diferente del carousel tradicional (33/40 puntos sin autoplay). El carousel de Pinterest no es un banner rotante — es una herramienta de exploración horizontal de contenido. El `peek` behavior — mostrar una fracción del siguiente item en el borde — es el affordance más elegante para comunicar scrollability sin flechas ni dots: el usuario ve que hay más y decide si quiere explorar. Sin auto-play por principio de diseño: el contenido de Pinterest es para exploración personal, y el auto-rotating elimina la agencia del usuario. Multiple visible items + responsive items-per-row (2–4 en desktop, 1–2 en mobile) hace que la experiencia sea de browsing, no de presentación. Sin auto-play = sin WCAG 2.2.2 problem.

### Material Design 3
El modelo visual más sofisticado del corpus (32/40 puntos sin autoplay). M3 define tres layouts con un comportamiento único: items morphean de tamaño mientras se mueven por el viewport. En multi-browse, el item en la posición focal es "large" y se achica a "medium" o "small" al desplazarse — jerarquía visual dinámica sin indicadores estáticos. Sin auto-play por defecto — M3 documenta explícitamente que auto-advancing reduce agencia y crea barriers para usuarios con limitaciones motrices. `role="list"` con `role="listitem"` (no el patrón WAI-ARIA carousel canónico). Items fuera de viewport marcados como `importantForAccessibility="no"`.

### Fluent 2 (Microsoft)
La implementación de auto-play más accesible del corpus (41/50 puntos). El pause button visible y focusable — no solo pause-on-hover — es WCAG 2.2.2 compliance real. `aria-live="polite"` en el contenedor del slide anuncia cada cambio. El patrón WAI-ARIA más completo: `role="region"` + `aria-roledescription="carousel"`, `role="group"` + `aria-roledescription="slide"` + `aria-label="N of M"`, pause button, aria-live. Contexto de uso: SharePoint hero webparts, Outlook campaign previews, Teams app galleries — passive consumption donde el usuario escanea, no interactúa activamente. Circular navigation (loop) como default para sensación de galería sin límites.

### shadcn/ui (Embla)
El wrapper más limpio del corpus (37/50 puntos). Envuelve Embla Carousel — el engine más moderno para carousels React/web. La arquitectura de plugins de Embla (Autoplay, ClassNames, AutoHeight) mantiene el core minimal mientras permite opt-in de features avanzadas. `CarouselItem` como children arbitrarios (no array de objetos) da máxima flexibilidad — cualquier contenido puede ser un slide. Scroll physics correcto, snap behavior, y touch/swipe sin lógica personalizada. WAI-ARIA pattern implementado parcialmente.

### Ant Design
La implementación más feature-rich en términos de API (36/50 puntos), construida sobre react-slick. Auto-play con `autoplaySpeed`. Transiciones slide AND fade. `centerMode`. `adaptiveHeight`. `goTo(slideNumber)` API imperativo. El `effect: 'fade'` para loops resuelve la "confusión de looping" — cuando el carousel avanza del último al primer slide, la transición fade hace el loop invisible y más natural que el slide. ⚠️ A11y incompleta: usa `role="listbox"` con `role="option"` (incorrecto según WAI-ARIA carousel pattern). Sin aria-live. Sin pause button visible para autoplay.

---

## Tokens

**18 tokens** · prefix `crl-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `crl/sm/h` | `sizing/240` | Altura del carousel size sm |
| `crl/md/h` | `sizing/400` | Altura del carousel size md |
| `crl/lg/h` | `sizing/560` | Altura del carousel size lg |
| `crl/indicator/active` | `interactive/default` | Color del indicator activo (dot, line) |
| `crl/indicator/inactive` | `border/default` | Color de indicators inactivos |
| `crl/control/bg` | `surface/default` | Fondo del botón prev/next |
| `crl/control/shadow` | `elevation/2` | Sombra del botón prev/next |
| `crl/control/sm/size` | `sizing/32` | Tamaño botón control, size sm |
| `crl/control/md/size` | `sizing/40` | Tamaño botón control, size md |
| `crl/control/lg/size` | `sizing/48` | Tamaño botón control, size lg |
| `crl/dot/active/size` | 10px | Tamaño dot activo |
| `crl/dot/inactive/size` | 8px | Tamaño dot inactivo |
| `crl/dot/gap` | `spacing/2` | Espacio entre dots (8px) |
| `crl/line/w` | 24px | Ancho de indicator tipo line |
| `crl/line/h` | 4px | Alto de indicator tipo line |
| `crl/counter/fg` | `text/secondary` | Color texto counter "N / M" |
| `crl/counter/fontSize` | `type/xs` | Font size del counter |
| `crl/slide/gap` | `spacing/3` | Gap entre slides en Type=multi |

### Spacing specs

```
Carousel container:
  height: sm=240px / md=400px / lg=560px
  width: 100% del contenedor padre

Controls (prev/next buttons):
  size: sm=32px / md=40px / lg=48px (cuadrado)
  posición: superpuestos sobre el slide (centered vertically)
  offset desde el borde: 12px (sm) / 16px (md) / 20px (lg)
  bg: surface/default con shadow elevation/2

Indicators (dots):
  dot activo: 10px diámetro, interactive/default
  dot inactivo: 8px diámetro, border/default
  gap entre dots: 8px
  margen top desde slide: 12px (sm) / 16px (md) / 20px (lg)

Indicators (lines):
  width: 24px, height: 4px
  gap entre lines: 4px
  margen top desde slide: 12px (sm) / 16px (md) / 20px (lg)

Counter:
  font: 13px / text/secondary
  posición: esquina inferior derecha del carousel
  padding: 8px desde el borde

Type=multi gap entre slides:
  sm: 8px
  md: 12px
  lg: 16px
```
