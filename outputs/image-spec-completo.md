# Image

## Overview

Image es un componente de visualización de contenido que envuelve `<img>` con tres capacidades críticas que el elemento HTML nativo no provee por sí solo: gestión de estados de carga (loading/loaded/error), enforcement de aspect ratio para prevenir Cumulative Layout Shift (CLS), y control explícito de la semántica de accesibilidad (informativa vs. decorativa). En el ciclo de vida de cualquier imagen remota existen tres momentos distintos que el diseñador debe modelar: el placeholder mientras carga, la imagen cuando está disponible, y el fallback cuando falla. Image formaliza estos tres estados como variantes discretas del componente.

```
AspectRatio + Fit + State:

Estado loaded (4:3, cover):
┌─────────────────────────┐
│  ████████████████████  │
│  ████████████████████  │  ← imagen real, recorta para llenar
│  ████████████████████  │
└─────────────────────────┘

Estado loading (shimmer placeholder):
┌─────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░   │
│  ░░░░░░░░░░░░░░░░░░░   │  ← skeleton animation
│  ░░░░░░░░░░░░░░░░░░░   │
└─────────────────────────┘

Estado error (fallback icon):
┌─────────────────────────┐
│                         │
│       [▣ imagen]        │  ← fallback icon + surface/disabled bg
│                         │
└─────────────────────────┘

Radius: none / sm(4) / md(8) / lg(16) / full(9999)
┌──┐  ┌──╮  ╭──╮  ╭──╮  ╭──╮
│  │  │  │  │  │  │  │  (   )
└──┘  └──╯  ╰──╯  ╰──╯  ╰──╯
none   sm    md    lg   full
```

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
AspectRatio: auto | 1:1 | 4:3 | 16:9 | 21:9 | 3:4
Fit:         cover | contain | fill | none
Radius:      none | sm | md | lg | full
State:       loaded | loading | error
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Caption: true | false  → muestra/oculta el slot caption
```

### Figma properties panel

```
┌─────────────────────────────────────────────┐
│  Image                                      │
├─────────────────────────────────────────────┤
│  AspectRatio  [auto ▾]                      │
│               auto / 1:1 / 4:3 / 16:9 /    │
│               21:9 / 3:4                    │
│  Fit          [cover ▾]                     │
│               cover / contain / fill / none │
│  Radius       [none ▾]                      │
│               none / sm / md / lg / full    │
│  State        [loaded ▾]                    │
│               loaded / loading / error      │
├─────────────────────────────────────────────┤
│  👁 Has Caption    ○ off                    │
├─────────────────────────────────────────────┤
│  🔄 Fallback  [placeholder/image ▾]        │
│  ✏️ Alt text  [Descripción de la imagen]   │
│  ✏️ Caption   [Image caption]              │
└─────────────────────────────────────────────┘

Frames generados: 60 netos
(Subset representativo de 6 AspectRatio × 5 Radius × 3 States,
 combinando Fit como instance property, con exclusiones State
 loading/error + AspectRatio=auto)
```

---

## When to use (and when not to)

```
¿Qué tipo de imagen necesito mostrar?
        │
        ├── Avatar / thumbnail cuadrado (perfil, producto)
        │        └── AspectRatio=1:1, Fit=cover, Radius=full (avatar) o md (card)
        │
        ├── Hero / banner de contenido
        │        └── AspectRatio=16:9, Fit=cover, Radius=none o sm
        │
        ├── Foto de producto / e-commerce
        │        └── AspectRatio=4:3, Fit=contain (no recortar el producto)
        │
        ├── Logo / marca
        │        └── AspectRatio=auto o 16:9, Fit=contain (nunca cover)
        │
        ├── Galería / grid de medios
        │        └── AspectRatio=1:1 o 4:3, Fit=cover (grid uniforme)
        │
        └── Imagen cinematográfica / banner ancho
                 └── AspectRatio=21:9, Fit=cover
```

**Usar Image cuando:**
- Se muestra contenido visual con dimensiones no conocidas en tiempo de diseño (imágenes remotas, contenido generado por usuario)
- Se necesita enforce un aspect ratio para mantener ritmo visual en grids — prevención de CLS
- Se requiere manejo explícito de estados loading/error con placeholders consistentes con el sistema de diseño
- El alt text es un requisito de accesibilidad que debe ser visible en el API del componente

**No usar Image cuando:**
- La imagen es puramente decorativa sin ningún valor informativo — considerar si debe eliminarse del diseño por completo o tratarse con `alt=""`
- Se necesita interacción de preview/lightbox — Image es un componente de display; componer con Modal para preview
- La imagen es en realidad un ícono SVG — usar el componente Icon, que tiene mejor control de color y accesibilidad
- El contenido es una ilustración compleja con múltiples elementos que requieren descripción larga — usar `aria-describedby` con un elemento de texto oculto

---

## Visual variations

### Por AspectRatio

| Ratio | Proporción | Casos de uso principales |
|-------|-----------|--------------------------|
| auto | Dimensiones nativas del archivo | Imágenes editoriales de tamaño conocido |
| 1:1 | Cuadrado | Avatares, thumbnails de producto, grids uniformes |
| 4:3 | Clásico fotográfico | Fotos de producto, tarjetas de contenido |
| 16:9 | Widescreen | Heroes, banners, thumbnails de video |
| 21:9 | Cinematográfico | Banners anchos, headers de sección |
| 3:4 | Retrato | Fotografía de personas, portadas de libros |

### Por Fit

**cover** (default): La imagen llena el contenedor, recortando para mantener el ratio. Ideal cuando el sujeto siempre está centrado (avatares, fotos de productos). Nunca usar para logos — los recorta.

**contain**: La imagen se escala para caber completa dentro del contenedor; pueden aparecer barras (letterbox). Obligatorio para logos, iconos, y cualquier imagen donde el recorte sería destructivo.

**fill**: Estira la imagen para llenar exactamente el contenedor, deformando las proporciones. Usar solo para fondos texturizados o cuando la distorsión es aceptable.

**none**: La imagen se muestra a su tamaño nativo, sin scaling. Para imágenes que ya tienen las dimensiones exactas del contenedor.

### Por Radius

| Valor | px | Contexto |
|-------|----|---------|
| none | 0 | Imágenes que llegan a bordes del layout, banners edge-to-edge |
| sm | 4 | Thumbnails en listas, tarjetas sutilmente redondeadas |
| md | 8 | Tarjetas de producto, cards generales |
| lg | 16 | Cards prominentes, panels de hero |
| full | 9999 | Avatares circulares (1:1 + full = circle perfecto) |

### Por State

**loaded**: La imagen real se muestra. Estado final objetivo. Background transparente.

**loading**: Shimmer placeholder animado. Background `surface/disabled`. Simula el peso visual de la imagen para prevenir layout shift. Requiere `AspectRatio` fijo (no `auto`) — de lo contrario el placeholder no tiene altura definida.

**error**: Fallback icon centrado sobre background `surface/disabled`. El ícono de fallback usa `text/subtlest`. Señala que la imagen no pudo cargarse sin mostrar el broken image icon nativo del navegador.

---

## Design decisions

### 1. AspectRatio como property discreta (6 ratios en lugar de valor libre)

**Por qué:** Proporciones libres en un grid producen inconsistencia visual que destruye el ritmo. Los 6 ratios cubren el 95% de casos reales: 1:1 para avatares y thumbnails cuadrados, 4:3 para fotos, 16:9 para video y heroes, 21:9 para banners anchos, 3:4 para retratos. La restricción a valores discretos previene el CLS (Cumulative Layout Shift) porque el navegador puede reservar el espacio antes de que la imagen cargue — crítico para métricas de Core Web Vitals.

**Tradeoff:** Imágenes con proporciones no estándar (como 5:4 de algunos formatos de cámara) requieren que el diseñador elija el ratio más cercano o use `auto`, que no previene CLS.

### 2. Estado loading modelado con shimmer, no solo invisible

**Por qué:** Los sistemas maduros (Ant Design, Chakra, Gestalt) incluyen fallback/loading visible. La diferencia entre un Image component básico y uno production-ready es el manejo del error state. El shimmer (skeleton animado) es preferido al spinner porque comunica la forma del contenido que va a aparecer — el usuario sabe que espera una imagen, no un dato numérico.

**Tradeoff:** El shimmer requiere animación CSS (`@keyframes`) que consume ciclos de GPU en dispositivos de bajo rendimiento. En listas con 50+ imágenes simultáneamente en loading, considerar reducir la animación vía `prefers-reduced-motion`.

### 3. Fit y Radius como propiedades independientes

**Por qué:** La combinación más común es `avatar = 1:1 + cover + full` y `logo = auto + contain + none`. Si Fit y Radius estuvieran acoplados como un enum `shape` (circular/rounded/square como en Fluent 2), no se podría tener un thumbnail rectangular con bordes redondeados. La independencia permite todas las combinaciones válidas.

**Tradeoff:** Más propiedades en el panel = mayor superficie de error para el diseñador. Mitigado documentando las combinaciones canónicas (avatar, hero, product, logo, gallery) en la guía de contenido.

### 4. Alt text como campo obligatorio (WCAG 1.1.1)

**Por qué:** Cedar, Polaris y GOV.UK hacen `alt` required — son los sistemas más robustos en accesibilidad de imagen. Las imágenes sin alt text (o con alt vacío incorrecto) son el error de accesibilidad más frecuente en la web. Incluir el campo alt en el panel de Figma establece la expectativa durante el diseño, no solo en desarrollo.

**Tradeoff:** Imágenes puramente decorativas deben recibir `alt=""` explícito, lo que es contraintuitivo para diseñadores. La documentación debe explicar la distinción decorativa/informativa con ejemplos claros.

### Excluded combinations

```
State=loading + AspectRatio=auto
State=error  + AspectRatio=auto
  → Razón: los placeholders (shimmer y fallback icon) necesitan
    un aspect ratio fijo para tener altura definida.
    Con AspectRatio=auto, el contenedor colapsa a 0px de alto
    porque no hay imagen cargada que defina las dimensiones.
    Total: 2 × 4 fits × 5 radius = exclusiones en el subset
    representativo.
```

---

## Behavior

### Essential for design

- **Prevención de layout shift**: Siempre usar `AspectRatio` fijo en grids y listas de contenido. `AspectRatio=auto` es solo para imágenes de tamaño conocido en layouts editoriales de ancho fijo.
- **Transición de estados**: `loading → loaded` debe ser instantáneo o con fade corto (150ms max). No usar `loading → loaded` con slide o scale — el movimiento inesperado de contenido es una violación de `prefers-reduced-motion`.
- **Fallback consistente**: El ícono de fallback en `State=error` debe ser siempre el mismo en toda la aplicación — usar el slot `🔄 Fallback` para establecer un ícono de placeholder uniforme.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| `<img>` informativo | `img` (implícito) | `alt="[descripción]"` | Screen reader anuncia la imagen por su descripción |
| `<img>` decorativo | `presentation` | `alt=""` (vacío) | SR ignora la imagen; sin texto alternativo, algunos SRs leen el nombre del archivo |
| State=loading | `img` (implícito) | `aria-busy="true"` | SR advierte que el contenido está cargando |
| State=error | `img` (implícito) | `alt="Imagen no disponible"` o descriptivo | SR comunica el fallo; nunca dejar alt del placeholder vacío |
| `<figcaption>` | — | Sibling de `<img>` dentro de `<figure>` | SR asocia caption con imagen automáticamente en la semántica de `<figure>` |

### Keyboard navigation

Primary interactions (affect design):

```
Image estática: no focusable, no interacción de teclado.
(La imagen en sí nunca recibe foco.)
```

Secondary interactions (dev reference):

```
Si Image está dentro de un <a> (link-to-image):
  Tab → foco en el <a>
  Enter → activa el link

Si Image tiene preview/lightbox (composición externa con Modal):
  Enter / Space → abre modal de preview
  Escape → cierra modal
  Arrow keys → navegar entre imágenes en galería
  → El foco debe retornar al trigger al cerrar
```

---

## Content guide

### source (slot requerido)
- **Tipo**: Image fill en Figma (`image-fill`)
- **Binding**: La imagen real se establece como fill del frame con el aspect ratio configurado
- **En producción**: prop `src` con URL absoluta o relativa; soportar `srcset`/`sizes` para imágenes responsive

### fallback (slot opcional)
- **Tipo**: Container con ícono centrado; binding `instance-swap`
- **Default**: `placeholder/image` — ícono genérico de imagen
- **Cuándo personalizar**: Para diferentes contextos semánticos (ícono de video, ícono de documento, ícono de avatar) que comuniquen mejor el tipo de contenido que debería haberse cargado
- **Prohibido**: No usar texto en el fallback — el alt text es el canal accesible para ese mensaje

### caption (slot opcional, condicional)
- **Tipo**: Text, Figma binding `text`
- **Activar**: Toggle `👁 Has Caption`
- **Contenido**: Descripción editorial de la imagen, crédito fotográfico o información de contexto que complementa (no repite) el alt text
- **Longitud**: 1–3 líneas. Captions largas pertenecen al cuerpo de texto
- **Formato HTML**: Usar `<figure>` + `<figcaption>` para asociación semántica correcta
- **Diferencia con alt text**: alt text es para accesibilidad (describe QUÉ es la imagen); caption es para todos los usuarios (aporta CONTEXTO sobre la imagen)

### alt text (propiedad de contenido)
- **Obligatorio** en imágenes informativas
- **Vacío `alt=""`** para imágenes puramente decorativas
- **Estilo**: descriptivo y conciso. "Foto del equipo en la conferencia de 2025" ✓; "imagen123.jpg" ✗; "Foto de foto de foto" ✗
- **Máximo**: 125 caracteres — si requiere más, la imagen es demasiado compleja para ser tratada solo como imagen

---

## Pre-build checklist

```
[ ] 60 frames netos generados (subset representativo de las combinaciones clave)
[ ] Exclusión aplicada: State=loading|error + AspectRatio=auto = 0 frames
[ ] State=loading tiene shimmer animation layer (bg surface/disabled + animated overlay)
[ ] State=error tiene fallback icon centrado (icn-md, tone=subdued) sobre surface/disabled
[ ] Radius tokens vinculados: img/radius/sm → radius/sm (4), md → 8, lg → 16, full → 9999
[ ] Caption slot oculto por default (toggle "Has Caption" = off)
[ ] Alt text editable en el panel de propiedades de Figma
[ ] Fit=cover usa object-fit: cover en la implementación
[ ] Fit=contain usa object-fit: contain en la implementación
[ ] aria-busy="true" especificado en handoff para State=loading
[ ] WCAG 1.1.1: alt text obligatorio documentado en componentDescription
[ ] CLS prevention: documentado que AspectRatio fijo es requerido en grids
```

---

## Related components

```
Avatar         → Image con AspectRatio=1:1, Radius=full, Fit=cover + fallback de iniciales
                 (es una especialización de Image, no un componente separado conceptualmente)
Card           → contenedor que frecuentemente incluye Image como hero o thumbnail
Carousel       → Image usada como slide dentro del Carousel
Skeleton       → el shimmer de State=loading es consistente con el Skeleton component
Icon           → fallback de Image usa Icon internamente
Modal          → para preview/lightbox, componer Image + Modal (no está en scope de Image)
```

---

## Reference: how other systems do it

**Ant Design — Preview/lightbox integrado + galería:** Ant Design provee el Image component más completo del ecosistema. Preview/lightbox integrado al click (con controles de zoom, rotación y flip). `Image.PreviewGroup` habilita navegación en galería entre múltiples imágenes. `fallback` acepta URL alternativa; `placeholder` acepta React node (blur-up, skeleton). La decisión de incluir preview elimina la dependencia de una librería de lightbox separada para el caso de uso más común. Lección: cuando preview es un patrón primario en el DS, integrarlo en el componente elimina inconsistencias.

**Polaris (Shopify) — Thumbnail con fallback de ícono de tipo de archivo:** Polaris nombra su componente `Thumbnail` — comunicación explícita de scope. Cuando `source` falla, renderiza un ícono de tipo de archivo basado en el contexto del `alt` text. Crítico para grids de productos donde algunos merchants no tienen imagen configurada. El aspect ratio es fijo (cuadrado, `object-fit: cover`) para mantener ritmo visual en grids de admin. `alt` es prop required — enforcement más fuerte de accesibilidad en Tier 1.

**REI Cedar — Aspect ratio enforcement + responsive srcset:** CdrImg es el Image component Tier 2 más completo. `ratio` prop para enforcement de aspect ratio vía CSS (previene CLS). Soporte nativo de `srcset`/`sizes` para responsive image delivery. `loading: "lazy"|"eager"` como prop de componente — lazy loading opt-in explícito. `alt` requerido — enforcement de a11y más fuerte en Tier 2. Cedar resuelve el problema de CLS desde el componente mismo, no como responsabilidad del consumidor.

**Chakra UI — `fallbackSrc` + polymorphic rendering:** `fallbackSrc` para imagen alternativa en error; `fallback` (React node) para control total del estado de carga/error. El prop `as` permite usar `next/image` como implementación base manteniendo el styling del DS — solución elegante para framework compatibility.

**Fluent 2 (Microsoft) — Shape semántico:** El prop `shape` usa valores semánticos (`circular`, `rounded`, `square`) en lugar de border-radius numérico. Comunica intención visual (circular = avatar, rounded = thumbnail, square = ícono de archivo). Alineado con cómo Fluent trata Avatar shapes — consistencia sistémica.

**Gestalt (Pinterest) — Image-first con dominant-color placeholder:** Pinterest trata Image como componente de primera clase. `color` prop llena el área de placeholder con el color dominante de la imagen antes de que cargue — el patrón "colored placeholder" visible en Pinterest boards. `role: "img"|"presentation"` fuerza la decisión informativa/decorativa explícitamente en el API (más claro que confiar en la convención `alt=""`). Natural width/height del servidor previenen CLS sin CSS tricks.

**Mantine — Polymorphism con `component` prop:** `component` prop para rendering como Next.js Image o Gatsby Image — el DS estiliza, el framework optimiza. `radius` desde el theme scale en lugar de valores raw. No incluye preview — separación de concerns (lightbox es un componente separado).

**GOV.UK — Alt requerido + responsive obligatorio:** Sin componente JS — `<img>` nativo con classes CSS. Underline mandatory. `alt` requerido por regulación gubernamental (WCAG AA obligatorio en contexto de servicios de gobierno). Sin preview ni lazy loading — optimizado para contenido de tipo documento.

---

## Tokens

**10 tokens** · prefix `img-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `img-radius-sm` | `radius/sm` (4px) | Radius=sm |
| `img-radius-md` | `radius/md` (8px) | Radius=md |
| `img-radius-lg` | `radius/lg` (16px) | Radius=lg |
| `img-radius-full` | `radius/pill` (9999) | Radius=full (avatar circular) |
| `img-loading-bg` | `surface/disabled` | Shimmer placeholder background |
| `img-error-bg` | `surface/disabled` | Error fallback background |
| `img-error-fg` | `text/subtlest` | Fallback icon color |
| `img-caption-fontSize` | `type/sm` (12px) | Caption font size |
| `img-caption-fg` | `text/secondary` | Caption text color |
| `img-caption-marginTop` | `spacing/2` (4px) | Espacio entre imagen y caption |

### Spacing specs

```
Aspect ratios (width × height en 320px de ancho):
  1:1   → 320 × 320
  4:3   → 320 × 240
  16:9  → 320 × 180
  21:9  → 320 × 137
  3:4   → 320 × 427
  auto  → dimensiones nativas de la imagen

Radius (px):
  none: 0
  sm:   4
  md:   8
  lg:   16
  full: 9999

Caption:
  font-size: 12px  (type/sm)
  line-height: 16px
  color: text/secondary
  margin-top: 4px  (spacing/2)
  max-width: igual al ancho de la imagen

Placeholder states (loading + error):
  background: surface/disabled (#F4F4F8)
  min-height: determinado por AspectRatio × ancho del contenedor
  icon fallback: icn-md (20px), centrado horizontalmente y verticalmente
  icon color: text/subtlest (#8C8C99)
```
