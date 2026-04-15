# Skeleton

## Overview

El Skeleton es un placeholder de carga que imita la forma del contenido que aun no ha llegado. Es un componente chromeless — sin bordes, sin sombras, sin interaccion. Solo formas geometricas grises con animacion sutil que indica "algo esta cargando aqui".

```
  Text variant:
  ████████████████████████████████     ← linea 1 (100%)
  ████████████████████████            ← linea 2 (80%)
  ██████████████████                  ← linea 3 (60%)

  Circular variant:
       ┌────┐
       │ ██ │     ← avatar / icono
       └────┘

  Rectangular variant:
  ████████████████████████████████████
  ████████████████████████████████████   ← card / imagen
  ████████████████████████████████████
```

Un solo elemento visual sin slots composables — el Skeleton ES la forma misma. El disenador ajusta dimensiones via instance override.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Forma         text · circular · rectangular    Linea de texto / circulo / rectangulo
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  (ninguno — Skeleton no tiene toggles)
```

### Panel de propiedades en Figma

```
┌─ Skeleton ───────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ Variant               ▼ text   │ │
│  └─────────────────────────────────┘ │
│                                      │
│  (Sin booleans, sin textos,          │
│   sin swaps — componente minimo)     │
│                                      │
│  Dimensiones se ajustan via          │
│  instance override en el consumidor  │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿El contenido esta cargando?
  │
  ├─ Se conoce la forma del contenido (texto, avatar, card) → usa Skeleton ✓
  │
  ├─ Duracion desconocida, accion puntual → usa Spinner
  │
  ├─ Duracion conocida, porcentaje visible → usa Progress
  │
  └─ Los datos fallaron y no vendran → usa Empty State o Error State
```

**Usa Skeleton cuando:**
- El contenido esta cargando asincronamente y conoces su forma aproximada
- Quieres comunicar "aqui habra contenido" en vez de un espacio vacio
- Necesitas reducir la percepcion de tiempo de carga (patron psicologico validado)

**NO uses Skeleton cuando:**
- No conoces la forma del contenido → Spinner es mas honesto
- La operacion tiene progreso cuantificable → Progress muestra el avance real
- Los datos fallaron → no dejes el skeleton indefinidamente (argumento de Nord)
- El contenido se renderiza server-side sin estado de carga → no hay carga progresiva

---

## Variaciones visuales

### Formas

```
  text                               circular                      rectangular
  ████████████████████████            ┌────┐                       ████████████████████████
  ████████████████████                │ ██ │  radius full          ████████████████████████
  ██████████████████                  └────┘  40×40px default      ████████████████████████
  radius 4px                                                       radius 8px
  h 16px · w variable               Avatares, iconos              Cards, imagenes, thumbnails
  Parrafos, descripciones
```

### Composiciones tipicas

```
  Card skeleton:                     List item skeleton:
  ┌───────────────────────┐          ┌────┐ ████████████████████████
  │ ██████████████████████│          │ ██ │ ████████████████████
  │ ██████████████████████│          └────┘
  │ ██████████████████████│
  ├───────────────────────┤          Profile skeleton:
  │ ████████████████████  │          ┌────┐
  │ ████████████████      │          │ ██ │  ████████████████
  │ ████████████          │          └────┘  ████████████
  └───────────────────────┘
```

---

## Decisiones de diseno

### 1. Primitivas genericas, no subcomponentes por tipo

Ant Design tiene 6 subcomponentes (Skeleton.Button, Skeleton.Input, Skeleton.Avatar). Polaris tiene 5 (SkeletonPage, SkeletonBodyText, SkeletonThumbnail). Carbon usa 3 primitivas genericas (SkeletonText, SkeletonIcon, SkeletonPlaceholder). Para Figma, primitivas genericas (text/circular/rectangular) son mas practicas — el disenador ajusta dimensiones manualmente de todas formas. Los subcomponentes aportan valor en codigo (size matching automatico), no en Figma.

### 2. Sin Size variant — dimensiones por instance override

Skeleton no tiene tamanos predefinidos. A diferencia de un Button (sm/md/lg), un skeleton de texto puede tener cualquier ancho, y un skeleton circular puede ser 24px (xs avatar) o 64px (xl avatar). Las dimensiones se controlan via instance override en Figma — el mismo componente sirve para todos los tamanos.

### 3. Chromeless — sin bordes, sin sombras, sin estados

Skeleton es el componente mas simple del sistema. No tiene hover, focus, pressed, disabled. Es puramente decorativo. Solo un rectangulo gris con animacion. Esta simplicidad es intencional: el skeleton debe ser visualmente neutro para no competir con el contenido real cuando aparezca.

### 4. Animacion como indicador de actividad

La animacion (pulse u onda) distingue "cargando" de "roto" o "vacio". Sin animacion, el usuario no sabe si el contenido viene o si algo fallo. En Figma la animacion no se representa — la variante muestra la forma estatica. Documentar como propiedad conceptual (`animated: true/false`).

### Combinaciones excluidas

```
  (ninguna — Skeleton no tiene estados interactivos que combinar)
```

---

## Comportamiento

### Lo esencial para disenar

1. **El skeleton debe aproximar la forma del contenido real.** Si la card tiene imagen + titulo + 2 lineas de texto, el skeleton tiene rectangular + text largo + 2 text cortos. Desalineacion entre skeleton y contenido causa transicion brusca.

2. **Solo contenido async tiene skeleton.** La navegacion y el chrome de la pagina son estaticos — nunca se esqueletonizan. Solo el contenido cargado asincronamente recibe skeleton (patron Polaris).

3. **Timeout obligatorio.** Si los datos fallan y el skeleton permanece indefinidamente, el usuario no sabe que algo fallo. Implementar timeout + fallback a empty state o error state.

4. **Respetar prefers-reduced-motion.** La animacion shimmer/pulse debe desactivarse para usuarios con sensibilidad vestibular. Es WCAG 2.3.3.

5. **Transicion suave a contenido real.** Fade-in del contenido real cuando carga (patron Chakra/Radix). Sin transicion, el cambio es abrupto.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Elemento skeleton | `none` | `aria-hidden="true"` | SR ignora los placeholders — son decorativos |
| Contenedor de carga | — | `aria-busy="true"` | SR sabe que la region esta actualizandose |
| Contenedor (mejora) | `status` | `aria-live="polite"` | SR anuncia "Cargando..." proactivamente (Orbit/Gestalt) |
| Contenedor (label) | — | `aria-label="Loading [content type]"` | SR anuncia QUE esta cargando |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  N/A — Skeleton no es interactivo
  No recibe foco. Componente puramente decorativo.
```

Interacciones secundarias (referencia para dev):

```
  aria-hidden="true"    en cada elemento skeleton individual
  aria-busy="true"      en el contenedor padre de carga
```

---

## Guia de contenido

**Forma del skeleton:** Debe aproximar la forma del contenido real. Un parrafo de 3 lineas = 3 skeletons de texto con anchos decrecientes (100%, 80%, 60%).

**Dimensiones:** Usar las mismas dimensiones que el componente real que reemplaza. Avatar md = skeleton circular 40x40px. Card = skeleton rectangular del mismo tamano.

**Cuando NO usar skeleton:** Si el contenido carga en menos de 300ms, no mostrar skeleton — el flash de placeholder es peor que esperar. Skeleton es para cargas de 300ms a 5s. Mas de 5s, considerar feedback mas explicito (progress bar o mensaje).

---

## Checklist antes de construir

```
  ☐ ¿Que forma tiene el contenido real?
    └─ Texto → text variant
    └─ Avatar/icono → circular variant
    └─ Imagen/card → rectangular variant

  ☐ ¿Las dimensiones coinciden con el contenido real?
    └─ Si no → la transicion sera brusca

  ☐ ¿Hay timeout si los datos fallan?
    └─ Skeleton indefinido = contenido "roto" invisible

  ☐ ¿La animacion respeta reduced motion?
    └─ Desactivar shimmer/pulse en prefers-reduced-motion

  ☐ ¿El contenedor tiene aria-busy?
    └─ aria-busy="true" en el padre, aria-hidden="true" en skeletons
```

---

## Relacion con otros componentes

```
  Spinner        Duracion desconocida sin forma conocida del contenido
  Progress       Duracion conocida con porcentaje de avance
  Empty State    Cuando los datos no existen (no estan cargando — no vendran)
  Error State    Cuando la carga fallo (skeleton no debe quedarse indefinidamente)
```

---

## Referencia: como lo hacen otros sistemas

**Subcomponentes dedicados:** Ant Design (6 sub: Button, Input, Avatar, Image, Node, base), Polaris (5: Page, BodyText, DisplayText, Thumbnail, Tabs), Chakra (3: Skeleton, SkeletonCircle, SkeletonText).

**Primitivas genericas:** Carbon (SkeletonText + SkeletonIcon + SkeletonPlaceholder), Atlassian (un solo componente con borderRadius configurable), shadcn (un solo elemento con CSS).

**isLoading en componentes reales:** Spectrum S2 — el componente ES su propio skeleton. Zero desalineacion pero solo funciona en codigo.

**Consenso universal (20/20):** aria-hidden en skeletons, aria-busy en contenedor, formas basadas en contenido real, animacion como indicador de actividad.

---

## Tokens

**8 tokens** · prefijo `skl-` · 1 capa (componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--skl-bg` | `bg/surface/tertiary` | Color de fondo del skeleton |
| `--skl-radius-text` | `radius/xs` | Radius para variant text (4px) |
| `--skl-radius-circular` | `radius/full` | Radius para variant circular (9999) |
| `--skl-radius-rectangular` | `radius/md` | Radius para variant rectangular (8px) |
| `--skl-shimmer-from` | `bg/surface/tertiary` | Color inicio de animacion shimmer |
| `--skl-shimmer-to` | `bg/surface/secondary` | Color fin de animacion shimmer |

### Specs de spacing

```
  text variant:
  ┌─────────────────────────────────────┐
  │ ████████████████████████████████    │  h = 16px default
  │                                     │  w = 100% (variable)
  │ gap entre lineas: 8px              │  radius = 4px
  └─────────────────────────────────────┘

  circular variant:
  ┌────────┐
  │  ████  │  h = w = 40px default
  │  ████  │  radius = 9999
  └────────┘

  rectangular variant:
  ┌─────────────────────────────────────┐
  │ ████████████████████████████████████│  h = 120px default
  │ ████████████████████████████████████│  w = 200px default
  │ ████████████████████████████████████│  radius = 8px
  └─────────────────────────────────────┘

  Dimensiones controladas por instance override.
```
