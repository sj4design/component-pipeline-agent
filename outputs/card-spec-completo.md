# Card

## Overview

El Card es un contenedor de contenido estructurado que representa una sola entidad (articulo, producto, persona, tarea). Agrupa media, titulo, descripcion, metadata y acciones en una superficie delimitada. Es el componente mas versatil del sistema — sirve como template para articulos, productos, perfiles, KPIs y mas.

```
  ┌──────────────────────────────────┐
  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← .ContentMedia
  │ ░░░░░░░░  IMAGE  ░░░░░░░░░░░░░ │
  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
  ├──────────────────────────────────┤
  │ Category                        │  ← .ContentHeader
  │ Titulo del card            [⋮]  │
  │ Subtitulo / descripcion         │
  ├──────────────────────────────────┤
  │ Body text con contenido libre   │  ← .ContentBody
  │ Jan 15 · 5 min read             │
  ├──────────────────────────────────┤
  │              [Details] [Action] │  ← .ContentFooter
  └──────────────────────────────────┘
```

Usa 4 building blocks (.ContentMedia, .ContentHeader, .ContentBody, .ContentFooter) que se pueden intercambiar o apagar segun el caso de uso.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Estilo        elevated · filled · outlined · ghost       Sombra y borde
  Estado        default · hover                            Interaccion
  Orientacion   vertical · horizontal                      Media arriba o a la izquierda
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Has Media        Imagen/video full-bleed                    intercambiable (BB)
  ☑ Has Header       Titulo + subtitulo + avatar + badge        intercambiable (BB)
  ☑ Has Body         Contenido principal + metadata             intercambiable (BB)
  ☑ Has Actions      Footer con botones                         intercambiable (BB)
  ☐ Has Close        Boton X para dismiss
  ☐ Disabled         Opacity 50%
  ☐ Loading          Skeleton placeholders
  ☐ Is Clickable     Toda la card como link
  ☐ Is Selected      Borde azul + fondo tenue
  ☐ Is Expandable    Chevron para expand/collapse body
  ☐ Has Divider      Separadores entre regiones
```

### Panel de propiedades en Figma

```
┌─ Card ───────────────────────────────────┐
│                                          │
│  Variant Properties                      │
│  ┌────────────────┐ ┌──────────────────┐ │
│  │ Variant ▼ outl │ │ State   ▼ def.. │ │
│  └────────────────┘ └──────────────────┘ │
│  ┌─────────────────────────────────────┐ │
│  │ Orientation              ▼ vertical │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  Boolean Properties                      │
│  ☑ Has Media        ☑ Has Header         │
│  ☑ Has Body         ☑ Has Actions        │
│  ☐ Has Close        ☐ Disabled           │
│  ☐ Loading          ☐ Is Clickable       │
│  ☐ Is Selected      ☐ Is Expandable      │
│  ☐ Has Divider                           │
│                                          │
│  Instance Swap                           │
│  ↳ Media    [ .ContentMedia     ]        │
│  ↳ Header   [ .ContentHeader    ]        │
│  ↳ Body     [ .ContentBody      ]        │
│  ↳ Footer   [ .ContentFooter    ]        │
│                                          │
└──────────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿El contenido representa una entidad unica?
  │
  ├─ Si, con estructura (titulo, imagen, acciones) → usa Card ✓
  │
  ├─ Es un mensaje del sistema (error, info) → usa Alert/Banner
  │
  ├─ Es una fila de datos tabulares → usa Table row
  │
  ├─ Es un grupo de controles → usa Form section
  │
  └─ Es solo un contenedor visual → usa Box/Surface primitiva
```

**Usa Card cuando:**
- El contenido es autocontenido (articulo, producto, persona, tarea)
- Necesita estructura visual (media + titulo + acciones)
- Se presenta en grid o lista de items similares

**NO uses Card cuando:**
- Es un mensaje del sistema → Alert o Banner
- Es un contenedor de formulario → Form Section
- Los datos son tabulares → Table
- Solo necesitas un rectangulo con padding → Box primitiva

---

## Variaciones visuales

### Variantes de estilo

```
  elevated                 filled                   outlined                 ghost
  ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
  │               │        │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│        │               │        Titulo
  │  Titulo       │╗       │  Titulo       │        │  Titulo       │        Subtitulo
  │  Subtitulo    │║       │  Subtitulo    │        │  Subtitulo    │
  └───────────────┘║       └───────────────┘        └───────────────┘        sin contenedor
   ╚═══════════════╝
  sombra nivel 2           fondo gris sutil         borde 1px gris           sin borde ni fondo
```

### Orientacion

```
  vertical (default)                      horizontal
  ┌──────────────────┐                    ┌────────────┬──────────────────┐
  │ ░░░ IMAGE ░░░░░ │                    │            │ Titulo           │
  │ ░░░░░░░░░░░░░░░ │                    │   IMAGE    │ Subtitulo        │
  ├──────────────────┤                    │            │ Body text        │
  │ Titulo           │                    │            │        [Action]  │
  │ Body text        │                    └────────────┴──────────────────┘
  │        [Action]  │
  └──────────────────┘
```

### Estados

```
  default                  hover (elevated)         hover (outlined)
  ┌───────────────┐        ┌───────────────┐╗       ┌───────────────┐
  │  Titulo       │╗       │  Titulo       │║       │  Titulo       │
  │  Subtitulo    │║       │  Subtitulo    │║       │  Subtitulo    │
  └───────────────┘║       └───────────────┘║       └───────────────┘
   ╚═══════════════╝        ╚═══════════════╝       borde mas oscuro
  sombra normal             sombra +1 nivel

  selected                 disabled                 loading
  ╔═══════════════╗        ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐       ┌───────────────┐
  ║  Titulo       ║        ╎  Titulo       ╎       │ ▓▓▓▓▓▓▓▓▓▓▓▓ │
  ║  Subtitulo    ║        ╎  Subtitulo    ╎       │ ▓▓▓▓▓ ▓▓▓▓   │
  ╚═══════════════╝        └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘       │ ▓▓▓ ▓▓▓▓▓▓  │
  borde azul 2px           opacity 50%              └───────────────┘
                                                    skeleton placeholders
```

---

## Decisiones de diseno

### 1. Cuatro variantes de estilo por jerarquia visual

M3 formalizo el modelo de tres niveles de elevacion (elevated/filled/outlined) que comunica posicion en la jerarquia visual sin ambiguedad. Ghost (sin contenedor visible) se agrega para fondos oscuros o texturizados — Spectrum lo llama "quiet", Radix lo llama "ghost". Cuatro variantes cubren todos los contextos sin explosion de combinaciones.

### 2. Building blocks, no slots atomicos

14/22 sistemas usan sub-componentes estructurados (shadcn, Fluent 2, Chakra como referencia). Los 4 building blocks (.ContentMedia, .ContentHeader, .ContentBody, .ContentFooter) dan estructura pre-armada como "camino facil" pero se pueden intercambiar por contenido custom via instance swap — lo mejor de ambos mundos entre estructura y composicion.

### 3. Interactividad como booleans, no variantes

disabled, loading, selected y clickable son booleans que NO multiplican frames. La razon es practica: 4 variantes de estilo x 2 orientaciones x 2 estados = 16 frames base. Si interactividad fuera variante, seriamos 16 x 4 = 64+ frames. Como booleans, el disenador los activa segun necesidad sin costo en la variant matrix.

### 4. Una CTA primaria maxima por card

20/22 sistemas coinciden: multiples botones primarios en un card causan paralisis de decision. El footer tiene un boton primario y opcionalmente uno secundario. Mas de 2 acciones visibles es un anti-patron — las acciones adicionales van en un overflow menu.

### 5. Nested interactive: sibling pattern

Cards clickables con botones internos crean HTML invalido (link dentro de link). M3 y Carbon resuelven esto con el sibling pattern: botones internos como hermanos del link principal, no hijos. En Figma, documentar que isClickable convierte toda la card en link — los botones internos deben quitarse.

### Combinaciones excluidas

```
  disabled + hover                 no reacciona a interaccion
  loading + hover/focus/pressed    loading bloquea interaccion
  static + focus/pressed           cards no interactivas no reciben foco
```

---

## Comportamiento

### Lo esencial para disenar

1. **Un card = una entidad.** Un articulo, un producto, una persona. Nunca mezclar entidades en un solo card.

2. **Media full-bleed sin padding.** Las imagenes ocupan el ancho completo del card, sin margenes internos. Mantine formalizo esto con Card.Section.

3. **Hover sube la elevacion.** Elevated: sombra +1 nivel. Outlined: borde mas oscuro. Filled: fondo mas oscuro. Ghost: fondo sutil aparece. Este feedback visual comunica interactividad.

4. **Footer fijo, body scrollable.** Si el contenido es largo, solo el body hace scroll. Las acciones siempre visibles.

5. **Aspect ratio en media.** Sin aspect-ratio reservado, las imagenes causan layout shift al cargar. Definir altura fija (180px default) o aspect-ratio CSS.

6. **Actions hover-only = inaccesible en touch.** Acciones que solo aparecen en hover no funcionan en mobile. Siempre visibles o en overflow menu.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Card (standalone) | `article` | `aria-labelledby` → titulo | SR anuncia como contenido autocontenido |
| Card (en grid) | ninguno | — | El grid da el contexto |
| Card (clickable) | `link` | tabindex="0", Enter activa | SR anuncia como link navegable |
| Card (selectable) | `checkbox` | `aria-checked` | SR anuncia como opcion seleccionable |
| Titulo | heading | h2-h4 contextual | SR navega por headings |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  Tab                   foco al card (si clickable) o a las acciones internas
  Enter                 activa card clickable o accion enfocada
  Space                 toggle card selectable
```

Interacciones secundarias (referencia para dev):

```
  Arrow keys            navegar entre cards en grid de seleccion
  Escape                deseleccionar / cerrar card expandible
```

---

## Guia de contenido

**Titulo:** Descriptivo y breve. "Guia de accesibilidad web" — no "Haz click para leer mas sobre accesibilidad".

**Subtitulo:** Complementa sin repetir. "Por Maria Garcia · 5 min" — no repetir el titulo.

**Body:** Contenido util, no relleno. 2-3 lineas max antes de truncar con "...".

**CTA:** Verbo de accion. "Leer mas", "Ver detalles" — no "Click aqui".

**Metadata:** Datos clave compactos. "Jan 15 · 5 min · 2.3K views" — separados por middot.

---

## Checklist antes de construir

```
  ☐ ¿Que variante visual?
    └─ elevated = prominente · filled = sutil · outlined = neutro · ghost = fondos oscuros

  ☐ ¿Que regiones necesita?
    └─ Media → imagen/video
    └─ Header → titulo + subtitulo + avatar + badge
    └─ Body → contenido + metadata
    └─ Footer → acciones (max 1 primaria + 1 secundaria)

  ☐ ¿Es interactivo?
    └─ Clickable → toda la card como link
    └─ Selectable → checkbox para batch selection
    └─ Expandable → expand/collapse body

  ☐ ¿Orientacion?
    └─ Vertical = grids · Horizontal = listas, sidebars

  ☐ ¿Necesita loading state?
    └─ Si carga datos → activa Loading (skeleton)
```

---

## Relacion con otros componentes

```
  Alert/Banner     Para mensajes del sistema, no entidades de contenido
  Table            Para datos tabulares, no contenido estructurado
  List Item        Para filas simples en listas (un nivel de info)
  Dialog/Modal     Para contenido que requiere accion antes de continuar
  Box/Surface      Primitiva de layout — Card agrega estructura semantica
```

---

## Referencia: como lo hacen otros sistemas

**Modelo de variantes por elevacion:**
- M3 (Google): Elevated/Filled/Outlined — el modelo original
- Chakra UI: outline/filled/elevated — mirror de M3
- Radix: fill/outline/ghost — agrega ghost

**Sub-componentes estructurados:**
- shadcn/ui: CardHeader/CardContent/CardFooter — el mas adoptado en React
- Fluent 2: CardPreview/CardHeader/CardFooter — con orientacion H/V
- Mantine: Card.Section para full-bleed — la mejor solucion al problema de media

**Interactividad como patron:**
- Carbon: 4 tiles separados (Base/Clickable/Selectable/Expandable)
- Fluent 2: 3 modos en un componente (display/clickable/selectable)
- Polaris: composicion pura sin opiniones de interactividad

**Consenso universal (22/22):**
- Titulo siempre presente
- Una CTA primaria maxima
- Footer para acciones
- Disabled = opacity reducida

---

## Tokens

**38 tokens** · prefijo `crd-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--crd-bg` | `bg/surface/default` | Fondo card (elevated/outlined) |
| `--crd-bg-filled` | `bg/fill/default` | Fondo card (filled) |
| `--crd-bg-hover` | `bg/surface/hover` | Fondo hover |
| `--crd-bg-selected` | `bg/surface/selected` | Fondo seleccionado |
| `--crd-border` | `border/default` | Borde outlined |
| `--crd-border-hover` | `border/hover` | Borde hover |
| `--crd-border-selected` | `interactive/default` | Borde seleccionado (azul) |
| `--crd-shadow` | `elevation/2` | Sombra elevated |
| `--crd-shadow-hover` | `elevation/3` | Sombra hover |
| `--crd-fg-primary` | `text/primary` | Titulo |
| `--crd-fg-secondary` | `text/secondary` | Subtitulo, metadata |
| `--crd-fg-disabled` | `text/disabled` | Texto deshabilitado |
| `--crd-focus-ring` | `interactive/default` | Ring de foco |

### Specs de spacing

```
  ┌─ Card ─────────────────────────────────────────┐
  │ ┌─ media ─────────────────────────────────────┐ │
  │ │        imagen full-bleed (180px)            │ │  padding 0
  │ └─────────────────────────────────────────────┘ │
  │ ┌─ header ────────────────────────────────────┐ │
  │ │ ←16→ [avatar] ←8→ [eyebrow/title/sub] ←16→ │ │  pad 16/16
  │ └─────────────────────────────────────────────┘ │
  │ ┌─ body ──────────────────────────────────────┐ │
  │ │ ←16→ body text + metadata              ←16→ │ │  pad 8/16
  │ └─────────────────────────────────────────────┘ │
  │ ┌─ footer ────────────────────────────────────┐ │
  │ │ ←16→           [Secondary] [Primary]   ←16→ │ │  pad 8/24
  │ └─────────────────────────────────────────────┘ │
  └─────────────────────────────────────────────────┘

  radius:          12px
  gap regiones:    0px (padding interno de cada BB)
  ancho default:   340px (min 280, max 420)
  media height:    180px
```
