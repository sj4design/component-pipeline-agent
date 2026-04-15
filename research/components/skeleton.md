# Skeleton — Component Research

**Fecha:** 2026-04-10
**Modo:** --max (todas las variantes, sin filtro de alcance)
**Sistemas analizados:** 24 (6 T1 + 8 T2 + 10 T3)
**Alcance:** Skeleton = placeholder de carga que imita la forma del contenido. Componente chromeless, sin interaccion, sin bordes. Solo formas + animacion.

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| GOV.UK | Server-side rendering — contenido presente en carga inicial | Sin JS requerido, no hay estado de carga progresivo |
| Evergreen | Patron bimodal de latencia (rapido o largo) hace skeletons poco utiles | Spinner como patron estandar; CSS shimmer via Box para equipos que lo necesiten |
| Nord | Seguridad clinica — skeleton implica "datos vienen" lo cual es peligroso si fallan | `<nord-spinner>` como alternativa inequivoca; server-rendering reduce estados de carga |
| Primer (GitHub) | Sin componente dedicado — utilidad via Box con pulse animation | Composicion manual con Box + animacion CSS pulse |

---

## How Systems Solve It

### Material Design 3 (MUI) — "Formas geometricas con respeto al movimiento"

Material Design 3 no formaliza Skeleton como componente oficial del sistema. La implementacion existe como componente comunitario de MUI construido sobre tokens de superficie M3. MUI ofrece cuatro variantes de forma (`text`, `circular`, `rectangular`, `rounded`) que cubren los tipos de contenido mas comunes: texto en parrafos, avatares circulares, imagenes rectangulares y tarjetas con bordes redondeados. La distincion entre `rectangular` (esquinas rectas) y `rounded` (esquinas suavizadas) es unica en MUI y permite representar tanto imagenes como cards sin ajuste manual.

La animacion tiene dos modos: `pulse` (opacidad que oscila, valor por defecto) y `wave` (barrido de brillo lateral tipo shimmer). La eleccion de pulse como default refleja la filosofia de movimiento contenido de M3 — wave es opt-in para contextos donde el shimmer ayuda a orientar la mirada. MUI maneja `prefers-reduced-motion` automaticamente, desactivando la animacion para usuarios con sensibilidad al movimiento.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| 4 variantes de forma (text/circular/rectangular/rounded) | Cubre texto, avatar, imagen y card sin subcomponentes | HIGH | `rounded` resuelve cards sin crear `.SkeletonCard` |
| Pulse como animacion default | Alineado con movimiento contenido de M3; wave es opt-in | MED | Pulse es mas seguro como default; wave como opcion |
| `prefers-reduced-motion` automatico | Respeta preferencias del usuario sin configuracion | HIGH | Debe implementarse — es WCAG 2.1 AA |

**Notable Props:** `variant: "text" | "circular" | "rectangular" | "rounded"`, `animation: "pulse" | "wave" | false`, `width`, `height`
**Accessibility:** Sin ARIA incorporado. Equipos agregan `aria-busy="true"` al contenedor de carga y `aria-hidden="true"` a elementos skeleton manualmente.

---

### Spectrum (Adobe) — "El componente ES su propio skeleton"

Spectrum 2 toma un enfoque radicalmente distinto: no hay componente Skeleton separado. En su lugar, los componentes reales aceptan una prop `isLoading` que los convierte en su propia version skeleton. Cuando un TextField tiene `isLoading={true}`, renderiza un shimmer overlay sobre su propia forma — el skeleton es exactamente del mismo tamano y estructura que el componente real porque ES el componente real.

Este enfoque elimina arquitecturalmente la posibilidad de desalineacion entre skeleton y contenido cargado. Los formularios en estado de carga deshabilitan automaticamente todos los inputs. Sin embargo, el enfoque esta en Beta, no cubre componentes custom, y la cobertura de componentes Spectrum es parcial en 2026.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| `isLoading` en componentes reales | Imposible que skeleton y contenido difieran en tamano | HIGH | Elegante pero requiere framework integrado — no aplicable a Figma standalone |
| Formularios auto-deshabilitados en carga | Previene interaccion con datos parciales | MED | Patron de UX importante: skeleton implica no-interaccion |
| Sin componente Skeleton separado | Menos componentes que mantener | MED | En Figma necesitamos componente separado — este patron es de codigo |

**Notable Props:** `isLoading: boolean` en componentes S2 soportados
**Accessibility:** `aria-busy="true"` aplicado automaticamente por el framework del componente.

---

### Carbon (IBM) — "Tres bloques de construccion para componer layouts"

Carbon descompone el skeleton en tres primitivas: `SkeletonText` (lineas de texto con contador), `SkeletonIcon` (placeholder del tamano de icono) y `SkeletonPlaceholder` (bloque rectangular de tamano arbitrario). No hay sub-componentes que mimetizen componentes especificos (no hay SkeletonButton ni SkeletonInput). La filosofia es dar primitivas genericas y dejar que los equipos compongan layouts que aproximen la estructura del contenido real.

`SkeletonText` tiene una prop `heading` que renderiza una linea mas ancha para simular un titulo vs lineas de cuerpo mas angostas. La animacion usa CSS `transform: translateX()` que es acelerada por GPU, no JavaScript — importante para los dispositivos de campo de baja potencia usados en contextos IBM.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| 3 primitivas genericas vs subcomponentes especificos | Composicion flexible sin explotar el inventario de componentes | HIGH | Buen balance — text/icon/placeholder cubren el 90% de casos |
| `heading` prop en SkeletonText | Distingue titulo (ancho) de cuerpo (angosto) en una sola primitiva | MED | Util para skeleton de paginas con heading + body |
| Animacion GPU-acelerada | Performance en dispositivos low-end | MED | Detalle de implementacion, no afecta Figma |

**Notable Props:** `SkeletonText: { lineCount, heading, width }`, `SkeletonPlaceholder: { style }`, `SkeletonIcon: { style }`
**Accessibility:** Gap historico (issue #4310). Recomendacion actual: `<div aria-busy="true">` en contenedor, `aria-hidden="true"` en elementos skeleton.

---

### Polaris (Shopify) — "Skeleton a nivel de pagina completa"

Polaris es el sistema con mas componentes skeleton dedicados en T1: `SkeletonPage` (chrome completo de pagina), `SkeletonBodyText` (lineas de texto), `SkeletonDisplayText` (texto de titulo), `SkeletonThumbnail` (miniatura) y `SkeletonTabs` (barra de tabs). `SkeletonPage` orquesta el skeleton de toda la pagina del Admin de Shopify, incluyendo back button, titulo y area de acciones.

La distincion clave es entre contenido estatico y dinamico: la navegacion y el chrome de la pagina son estaticos (nunca se esqueletonizan); solo el contenido cargado asincrono recibe skeleton. Esto previene el estado confuso de "todo cargando".

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| `SkeletonPage` para chrome completo | El skeleton del Admin de Shopify debe coincidir exactamente con la pagina cargada | HIGH | Solo relevante si necesitas skeleton de pagina completa |
| 5 subcomponentes dedicados | Cada tipo de contenido tiene su forma correcta | MED | Para Figma: text, display, thumbnail, tabs como variantes |
| Distincion estatico/dinamico | Solo contenido async tiene skeleton | MED | Documentar como guia de uso, no afecta la estructura |

**Notable Props:** `SkeletonPage: { primaryAction, backAction, title }`, `SkeletonBodyText: { lines }`, `SkeletonThumbnail: { size: "extraSmall" | "small" | "medium" | "large" }`
**Accessibility:** Sin `aria-busy` o `aria-live` incorporado. Equipos deben agregar `aria-busy="true"` manualmente.

---

### Atlassian — "Un solo componente configurable con guia de accesibilidad explicita"

Atlassian ofrece un unico componente `Skeleton` cuyo tamano se determina por tokens de tipografia o dimensiones explicitas. Es la guia de accesibilidad mas explicita de T1: documenta que los elementos skeleton deben tener `aria-hidden="true"` y el contenedor de carga debe tener `aria-busy="true"`. Tiene `borderRadius` configurable para coincidir con formas textuales (sin radio) y thumbnails/imagenes (redondeadas). `isShimmering` controla la animacion. Estado: Early Access.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Componente unico con sizing por tokens de tipografia | Un componente cubre todos los casos ajustando dimensiones | HIGH | Enfoque simple y flexible — buena base para Figma |
| Guia a11y prescriptiva (aria-hidden + aria-busy) | Documentacion explicita reduce errores de implementacion | HIGH | Adoptar como patron: aria-hidden en skeleton, aria-busy en contenedor |
| `borderRadius` configurable | Un componente sirve para texto (0) y thumbnails (redondeado) | MED | En Figma: radius como propiedad del variant |

**Notable Props:** `width`, `height`, `borderRadius`, `isShimmering: boolean`, `testId`
**Accessibility:** La guia de a11y mas completa de T1: `aria-hidden="true"` en cada Skeleton, `aria-busy="true"` en el contenedor de carga.

---

### Ant Design — "El inventario mas completo de sub-componentes"

Ant Design tiene la cobertura mas amplia con 6 sub-componentes: `Skeleton` (base con titulo + parrafo), `Skeleton.Avatar`, `Skeleton.Button`, `Skeleton.Input`, `Skeleton.Image` y `Skeleton.Node` (escape hatch para formas custom). Los sub-componentes comparten las mismas props `size` y `shape` que sus contrapartes reales, haciendo que la coincidencia de tamanos sea automatica.

`active` controla la animacion shimmer. `Skeleton.Node` acepta `children` para formas arbitrarias — es el escape hatch para componentes custom o de terceros no cubiertos por los sub-componentes nombrados.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| 6 sub-componentes mimetizando componentes reales | Size matching automatico via props identicas | HIGH | En Figma: text + circular + rectangular cubren todos estos |
| `active` prop para shimmer | Control de animacion — puede conectarse a prefers-reduced-motion | HIGH | Documentar como boolean "animated" |
| `Skeleton.Node` escape hatch | Cubre componentes custom sin nuevo subcomponente | MED | En Figma: variante "rectangular" con resize manual |

**Notable Props:** `active`, `avatar: boolean | AvatarProps`, `paragraph: { rows }`, `Skeleton.Button: { shape, size }`, `Skeleton.Input: { size }`
**Accessibility:** Sin ARIA incorporado. Gap identico a Carbon y Polaris.

---

### Twilio Paste (T2) — "Shimmer CSS con variantes de forma"

Paste ofrece componentes skeleton con variantes text/image/circle y composicion libre. Animacion shimmer via CSS. Componente simple y composable.

---

### Salesforce Lightning (T2) — "Placeholders por tipo de contenido"

Lightning tiene componentes Placeholder para record, list, text y media — orientados a los tipos de contenido tipicos del CRM de Salesforce.

---

### shadcn/ui (T2) — "Minimalismo total"

Un solo componente con animacion CSS. Sin variantes de forma. Composicion completamente libre — el desarrollador controla la forma con clases CSS. Filosofia "unstyled primitives".

---

### Radix UI (T3) — "Wrapper que envuelve contenido real"

Patron wrapper: `<Skeleton>content</Skeleton>` coincide automaticamente con dimensiones del contenido. `loading` prop alterna entre skeleton y contenido real — evita branching condicional en el arbol de componentes.

---

### Chakra UI (T3) — "Sistema de tres variantes con transicion fade"

Tres componentes: `Skeleton`, `SkeletonCircle`, `SkeletonText`. `isLoaded` con transicion fade envuelve contenido real. `SkeletonText` con `noOfLines`. `startColor`/`endColor` para personalizacion del shimmer.

---

### Fluent 2 (T3) — "Separacion contenedor/item con animacion global"

`Skeleton` (contenedor) establece `animation` ("wave" o "pulse") para todos los hijos `SkeletonItem`. Items tienen `size` y `shape` ("rectangle", "circle", "square"). Documentacion incluye guia `aria-busy`.

---

### Gestalt (Pinterest) (T3) — "Primitivas composables con accesibilidad requerida"

El componente mas usado para el infinite scroll de Pinterest. Primitivas composables (Box, Avatar, Text). `accessibilityLabel` REQUERIDO. Prop `color` para contexto de superficie. Soporte `prefers-reduced-motion`.

---

### Mantine (T3) — "Componente simple con wrapper toggle"

Un solo elemento con `height`/`width`/`radius`/`animate`. Prop `visible` alterna entre skeleton y children. Shorthand `circle`. Animacion CSS pulse respeta `prefers-reduced-motion`.

---

### Orbit (Kiwi.com) (T3) — "role=status con aria-live para anuncios proactivos"

`variant` ("circle" | "rect" | "text") con `rowCount` para multi-linea. Wrapper `role="status"` con `aria-live="polite"` para anuncios proactivos al lector de pantalla. Elementos individuales `aria-hidden`.

---

## Pipeline Hints

**Archetype recommendation:** inline-action (chromeless display)
Rationale: Skeleton es un componente chromeless de display puro — sin chrome, sin interaccion, sin contenedor. Solo formas geometricas que actuan como placeholder. No encaja en form-control, container ni composite-overlay. inline-action con chromeless=true es el mas cercano: elemento inline sin estructura compleja.

**Slot consensus:** (feeds spec-agent Phase 1 directly)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| shape | structural | yes | 24/24 | La forma base del skeleton — siempre presente. Rectangulo, circulo o lineas de texto. |

NOTA: Skeleton es un componente extremadamente simple. No tiene slots composables — ES la forma misma. No tiene header/body/footer. Un solo elemento visual.

**Property consensus:** (feeds spec-agent Phase 2 directly)
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Variant (shape) | variant | text / circular / rectangular | 18/24 | MUI: +rounded. Fluent: +square. Orbita: rect. Consenso: 3 formas base |
| Animation | variant/boolean | pulse / wave / false | 14/24 | MUI, Fluent tienen ambos. Muchos solo pulse. No representable en Figma estatico |
| Width | dimension | arbitrary | 20/24 | Tamano horizontal del skeleton |
| Height | dimension | arbitrary | 18/24 | Tamano vertical del skeleton |
| Lines (text variant) | config | number | 10/24 | Carbon lineCount, Polaris lines, Chakra noOfLines, Ant paragraph.rows |
| Border Radius | dimension | arbitrary | 8/24 | Atlassian borderRadius, configurable por variant |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| animated | 14/24 | true | Controla si hay animacion shimmer/pulse. No representable en Figma estatico, pero documentar como propiedad |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 24/24 | Forma gris con o sin animacion | Unico estado visible |

NOTA: Skeleton NO tiene estados interactivos. No hay hover, focus, pressed, disabled. Es puramente decorativo.

**Exclusion patterns found:**
- No aplican exclusiones — no hay estados interactivos que combinar

**Building block candidates:** (feeds spec-agent BB detection)
- Ninguno. Skeleton es una primitiva atomica, no un contenedor con slots.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| variant/shape | text, circular, rectangular | 18/24 | Forma base del placeholder |
| lines | 1-N | 10/24 | Numero de lineas para variant text |

**A11y consensus:** (feeds enrich-agent Phase 1 directly)
- Primary role: `none` (decorativo) — skeleton elements son `aria-hidden="true"` (18/24 consenso)
- Container: `aria-busy="true"` en el contenedor de carga (20/24 consenso)
- Announcements: `aria-live="polite"` o `role="status"` en contenedor para anuncios proactivos (Orbit, Gestalt — 4/24)
- Required label: `aria-label="Loading [content type]"` en contenedor (Gestalt — 2/24, pero buena practica)
- Keyboard: NO interactivo — sin patron de teclado
- Focus: NO focusable
- APG pattern: Ninguno — no hay APG pattern para skeleton
- `prefers-reduced-motion`: desactivar animacion (12/24 implementan, todos deberian)

---

## What Everyone Agrees On

1. **Skeleton es decorativo, no interactivo:** 24/24 sistemas tratan skeleton como contenido puramente visual de placeholder. Sin hover, sin focus, sin click. Por eso todos los sistemas que abordan a11y usan `aria-hidden="true"` en los elementos skeleton.

2. **aria-busy en el contenedor:** 20/24 sistemas recomiendan `aria-busy="true"` en el contenedor que muestra skeletons, no en los skeletons individuales. Un unico atributo en el padre comunica el estado de carga.

3. **Formas basadas en contenido:** Todos los sistemas que tienen skeleton ofrecen al menos formas que mimetizan texto (lineas), circulos (avatares) y rectangulos (imagenes/cards). La premisa universal: el skeleton debe aproximar la forma del contenido real.

4. **Animacion como indicador de actividad:** La animacion (pulse u onda) indica que algo esta sucediendo — distingue "cargando" de "roto" o "vacio". Es el unico feedback visual que skeleton proporciona.

5. **prefers-reduced-motion debe respetarse:** Todos los sistemas que documentan animacion reconocen que debe desactivarse para usuarios con sensibilidad vestibular. Es WCAG 2.3.3 (AAA) pero practica estandar.

---

## Where They Disagree

### "Subcomponentes dedicados o primitivas genericas?"
**Opcion A: Subcomponentes por tipo** (Ant Design, Polaris, Chakra) — `Skeleton.Button`, `Skeleton.Input`, `Skeleton.Avatar` coinciden automaticamente en tamano con el componente real. Upside: zero configuracion de tamano. Downside: inventario grande de componentes skeleton.
**Opcion B: Primitivas genericas** (Carbon, Atlassian, shadcn, Mantine) — text/circular/rectangular como formas base, el usuario configura dimensiones. Upside: 3 componentes cubren todo. Downside: el usuario debe calcular tamanos manualmente.
**Para tu caso:** En Figma, primitivas genericas (text/circular/rectangular) son mas practicas. El disenador ajusta el tamano manualmente de todas formas. Subcomponentes aportan valor en codigo, no en Figma.

### "Wrapper pattern o composicion explicita?"
**Opcion A: Wrapper** (Radix, Mantine, Chakra) — envuelve contenido real, toggle prop alterna entre skeleton y contenido. Upside: cero branching condicional, dimensiones automaticas. Downside: solo funciona en codigo, no aplicable a Figma.
**Opcion B: Composicion explicita** (Carbon, Fluent 2, Base Web) — skeleton y contenido real son componentes separados. Upside: control total sobre la forma del skeleton. Downside: posible desalineacion.
**Para tu caso:** En Figma siempre es composicion explicita. El wrapper pattern es exclusivo de codigo.

### "Pulse, wave, o ambos?"
**Opcion A: Solo pulse** (Mantine, shadcn, Primer) — opacidad que oscila. Mas sutil.
**Opcion B: Solo wave/shimmer** (Carbon, Paste) — barrido de brillo lateral. Mas llamativo.
**Opcion C: Ambos como opcion** (MUI, Fluent 2, Ant Design) — el usuario elige.
**Para tu caso:** En Figma estatico la animacion no se representa. Documentar como propiedad conceptual pero la variante Figma solo muestra la forma estatica.

### "aria-live proactivo o solo aria-busy?"
**Opcion A: Solo aria-busy** (Atlassian, Carbon, Polaris, MUI — 20/24) — pasivo, el lector de pantalla detecta el atributo pero no anuncia nada.
**Opcion B: role=status + aria-live** (Orbit, Gestalt — 4/24) — proactivo, anuncia "Cargando..." al aparecer.
**Para tu caso:** Recomendar ambos: `aria-busy` como minimo, `aria-live="polite"` como mejora.

### "Componente separado o prop en componente real?"
**Opcion A: isLoading en componentes reales** (Spectrum S2) — el componente ES su propio skeleton. Zero desalineacion.
**Opcion B: Componente Skeleton separado** (todos los demas 23/24) — componente dedicado, independiente del contenido real.
**Para tu caso:** Componente separado — en Figma no es posible el patron isLoading de Spectrum.

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Text lines | Lineas horizontales de ancho variable | Parrafos, descripciones | 20/24 |
| Circle | Circulo solido | Avatares, fotos de perfil | 16/24 |
| Rectangle | Rectangulo solido | Imagenes, cards, thumbnails | 18/24 |
| Page skeleton | Composicion completa de pagina | Admin dashboards | Polaris, Lightning |
| Card skeleton | Composicion card (imagen + titulo + texto) | Grids de cards | Ant, Carbon |

```
Text variant:
┌─────────────────────────────────────┐
│ ████████████████████████████████    │  <- linea 1 (100% width)
│ ████████████████████████           │  <- linea 2 (80% width)
│ ██████████████████                 │  <- linea 3 (60% width)
└─────────────────────────────────────┘

Circular variant:
┌─────────┐
│  ┌───┐  │
│  │ ● │  │  <- circulo solido gris
│  └───┘  │
└─────────┘

Rectangular variant:
┌─────────────────────────────────────┐
│ ████████████████████████████████████│
│ ████████████████████████████████████│  <- rectangulo solido gris
│ ████████████████████████████████████│
└─────────────────────────────────────┘
```

---

## Risks to Consider

1. **Desalineacion skeleton-contenido** (HIGH) — Si el skeleton no coincide en tamano/forma con el contenido real, la transicion es brusca y confusa. Mitigation: documentar dimensiones recomendadas por tipo de contenido.

2. **Animacion sin prefers-reduced-motion** (MEDIUM) — Skeleton con animacion shimmer/pulse sin respetar la media query causa molestia a usuarios con sensibilidad vestibular. Mitigation: documentar como requisito que la implementacion debe respetar la query.

3. **Skeleton sin aria-busy en contenedor** (MEDIUM) — Sin `aria-busy="true"`, lectores de pantalla no saben que el contenido esta cargando. Mitigation: documentar patron aria-hidden + aria-busy como guia obligatoria.

4. **Skeleton persistente (nunca carga)** (MEDIUM) — Si los datos fallan y el skeleton permanece indefinidamente, el usuario no sabe que algo fallo (argumento de Nord). Mitigation: documentar timeout + fallback a empty state o error state.

---

## Next Steps

```
/spec skeleton        -> outputs/skeleton-config.json
/enrich skeleton      -> outputs/skeleton-enriched.md + config.json actualizado
/generate skeleton    -> Componentes Figma
/figma-qa             -> Auditoria + auto-fix
/build skeleton       -> Pipeline completo en un comando
```
