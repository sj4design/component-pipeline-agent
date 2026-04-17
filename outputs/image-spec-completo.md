# Image

## Descripción general

Image es el primitivo de display de imágenes del sistema de diseño: un wrapper semántico sobre `<img>` que unifica AspectRatio, Fit, Radius, State (loading/error) y Caption en una sola API de propiedades. Su valor principal es doble: reservar espacio antes del load (evitar Cumulative Layout Shift) y modelar los estados de loading shimmer y error fallback de forma declarativa. Como building block visual, es la base de Avatar, ProductCard thumbnail, HeroBanner, y cualquier patrón que muestre imágenes remotas.

```
Loaded (AspectRatio=16:9, Fit=cover, Radius=md):
┌──────────────────────────────────────────────┐
│  ╔══════════════════════════════════════════╗ │
│  ║                                          ║ │
│  ║          [imagen — object-fit:cover]     ║ │
│  ║                                          ║ │
│  ╚══════════════════════════════════════════╝ │
│  radius: 8px                                  │
└──────────────────────────────────────────────┘

Loading (shimmer placeholder):
┌──────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────┐ │
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ │  bg: surface/disabled
│  │  ░░░░░░░░  shimmer animation  ░░░░░░░░░  │ │  aria-busy="true"
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ │
│  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘

Error (fallback icon):
┌──────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────┐ │
│  │                                          │ │  bg: surface/disabled
│  │          [🖼  imagen no disponible]       │ │  fg: text/subtlest
│  │                                          │ │
│  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘

Con caption:
│  ┌──────────────────────────────────────────┐ │
│  │            [imagen]                      │ │
│  └──────────────────────────────────────────┘ │
│  Descripción de la imagen                     │  13px/regular · text/secondary
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
AspectRatio → auto | 1:1 | 4:3 | 16:9 | 21:9 | 3:4
Fit         → cover | contain | fill | none
Radius      → none (0) | sm (4px) | md (8px) | lg (16px) | full (9999px)
State       → loaded | loading | error
```

Toggles (muestran/ocultan partes — NO generan variantes extra):

```
👁 Has Caption → muestra/oculta el texto de caption debajo de la imagen
```

Texto editable:

```
✏️ Alt text  → "Descripción de la imagen" (obligatorio en dev; vacío='' para decorativo)
✏️ Caption   → "Image caption"
```

Slot intercambiable:

```
🔄 Fallback → instancia de placeholder/image (para State=error/loading)
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────┐
│  Image                                       │
│  ──────────────────────────────────────────  │
│  AspectRatio  [ 16:9              ▼ ]        │
│  Fit          [ cover             ▼ ]        │
│  Radius       [ none              ▼ ]        │
│  State        [ loaded            ▼ ]        │
│  ──────────────────────────────────────────  │
│  👁 Has Caption  [ off ]                     │
│  ✏️ Alt text     [ Descripción de la imagen ] │
│  ✏️ Caption      [ Image caption            ] │
│  🔄 Fallback     [ placeholder/image  ↗ ]    │
└──────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito mostrar una imagen (foto, ilustración, thumbnail)?
                    │
                    ▼
       ¿La imagen puede fallar al cargar o está en un list de datos remotos?
       ├── Sí → Image (State=loading + error cubren los casos)
       └── No → <img> directo si es estática y siempre disponible
                    │
                    ▼
       ¿La imagen debe mantener proporciones fijas?
       ├── Sí → AspectRatio explícito (16:9/4:3/1:1 según contenido)
       └── No → AspectRatio=auto (imagen nativa, solo si es siempre loaded)
                    │
                    ▼
       ¿La imagen debe rellenar el espacio sin mostrar barras blancas?
       ├── Sí → Fit=cover (recorta para llenar)
       └── No → Fit=contain (muestra imagen completa con posible espacio)
                    │
                    ▼
       ¿La imagen es de una persona o avatar?
       └── Usar Avatar component (usa Image internamente, con Radius=full)
```

**Usar Image cuando:**
- Thumbnails de producto en cards de e-commerce o catálogos
- Imágenes de hero en secciones de marketing (AspectRatio=21:9 o 16:9)
- Fotografías en artículos o posts (AspectRatio=4:3 o 3:4)
- Logos de empresa en listados (Fit=contain para no recortar)
- Cualquier imagen remota que puede estar en estado loading o error

**NO usar Image cuando:**
- El contenido es un avatar de persona → usar `Avatar`
- La imagen es un icono vectorial (SVG) → usar `Icon`
- La imagen es decorativa pura en CSS → `background-image` (sin accesibilidad necesaria)
- El contexto es un HeroBanner full-bleed → Image con AspectRatio=auto o CSS directo
- Se necesita un carrusel de imágenes → usar `Carousel` (usa Image internamente)

---

## Variaciones visuales

### AspectRatio

| AspectRatio | Relación | Uso típico |
|------------|---------|-----------|
| auto       | Nativa de la imagen | Imágenes siempre loaded con dimensiones conocidas; NOT para loading/error |
| 1:1        | Cuadrado | Thumbnails de producto, avatars cuadrados, tiles en grid |
| 4:3        | Clásico foto | Fotografías estándar, imágenes de artículos, cards de blog |
| 16:9       | Widescreen | Video thumbnails, heroes, banners de marketing |
| 21:9       | Cinematic | Heroes de marketing de ancho total, banners ultrapanorámicos |
| 3:4        | Portrait | Fotografías de persona, product cards verticales, portrait shots |

### Fit

| Fit     | CSS         | Comportamiento | Cuándo usarlo |
|---------|-------------|---------------|--------------|
| cover   | object-fit: cover   | Rellena el espacio; recorta los extremos | Thumbnails, avatars, fotos que deben rellenar |
| contain | object-fit: contain | Imagen completa visible; puede haber espacio lateral | Logos, ilustraciones que no deben recortarse |
| fill    | object-fit: fill    | Estira para rellenar exactamente (puede distorsionar) | Casos controlados donde la distorsión es aceptable |
| none    | object-fit: none    | Tamaño original sin escalar | Imágenes que ya tienen el tamaño exacto del contenedor |

### Radius

| Radius | Valor   | Uso típico |
|--------|---------|-----------|
| none   | 0px     | Imágenes full-bleed, heroes, banners que tocan los bordes del card |
| sm     | 4px     | Thumbnails en listas compactas, imágenes en cards con radius=sm |
| md     | 8px     | Default para cards estándar, imágenes en formularios |
| lg     | 16px    | Cards grandes, hero sections con esquinas redondeadas prominentes |
| full   | 9999px  | Imágenes circulares — avatars cuadrados, profile pictures |

### State

| State   | Apariencia | Comportamiento ARIA |
|---------|-----------|-------------------|
| loaded  | Imagen real | Alt text descriptivo; normal render |
| loading | Shimmer placeholder (bg: surface/disabled) | `aria-busy="true"` — SR espera hasta loaded |
| error   | Icono fallback (fg: text/subtlest, bg: surface/disabled) | Alt text describe "Imagen no disponible" |

---

## Decisiones de diseño

**1. AspectRatio como propiedad discreta (6 ratios comunes)** — La alternativa sería un campo de texto libre (ej. "16/9"). La decisión de 6 valores discretos tiene dos razones: (a) previene CLS (Cumulative Layout Shift) reservando espacio exacto antes del load — un ratio libre puede calcular mal el espacio reservado; (b) los 6 ratios cubren el 95% de casos en aplicaciones enterprise y marketing (1:1 para avatars, 16:9 para video, 4:3 para fotos, 3:4 para portrait, 21:9 para hero banners). AspectRatio=auto se limita a State=loaded porque un placeholder de loading sin ratio fijo no reserva espacio.

**2. 3 Estados (loaded/loading/error) como State discreto** — En aplicaciones con imágenes remotas (product cards, user lists, dashboards), las imágenes fallan con frecuencia (red lenta, CDN down, URL rota). Modelar los tres estados como una propiedad de diseño — no solo de desarrollo — fuerza al diseñador a pensar en cómo se ve cada caso. Mantine, Chakra y Ant Design coinciden en modelar estos estados de forma explícita.

**3. Fit y Radius separados** — La alternativa sería presets (ej. "avatar" = cover+full, "logo" = contain+none). Mantenerlos separados permite combinaciones legítimas: Fit=cover+Radius=none (thumbnail en card con edges cuadrados), Fit=contain+Radius=full (logo circular sin recorte). Los presets habrían ocultado estas combinaciones válidas.

**4. Alt text como propiedad de texto en Figma (no solo implementación)** — La mayoría de sistemas delegan el alt text al desarrollador. Incluirlo como ✏️ Alt text en el panel Figma tiene dos beneficios: (a) el diseñador puede documentar la intención del alt para el developer; (b) el handoff de Figma → código incluye el texto de accesibilidad previsto. El valor vacío `alt=''` debe usarse explícitamente para imágenes decorativas.

**5. Caption como toggle (Has Caption)** — La alternativa sería siempre mostrar el caption. El toggle permite que el mismo frame de Image sirva para casos sin caption (thumbnails, avatars) y con caption (fotografías en artículos, imágenes de producto con descripción). En Figma, las variantes con caption (Has Caption=on) incluyen el wrapper `<figure>` + `<figcaption>`.

### Combinaciones excluidas

```
State=loading + AspectRatio=auto → ✗ shimmer sin ratio no reserva espacio (causa CLS)
State=error   + AspectRatio=auto → ✗ fallback sin ratio no tiene dimensiones definidas
```

---

## Comportamiento

### Esencial para diseño

- **AspectRatio previene CLS** — El contenedor de Image reserva el espacio antes de que la imagen cargue usando `aspect-ratio` CSS o padding-top hack (16:9 = 56.25%). Sin AspectRatio definido (=auto), el layout se mueve cuando carga la imagen — error de Core Web Vitals.
- **Fit=cover con AspectRatio=1:1** — La combinación estándar para avatars y thumbnails cuadrados. Cover recorta los extremos de la imagen para rellenar el cuadrado. Si la imagen es portrait (3:4) y el contenedor es cuadrado, los lados se recortan — esto es intencional.
- **Fit=contain para logos** — Los logos tienen proporciones variadas (landscape, portrait, cuadrado). Fit=contain garantiza que el logo siempre sea completamente visible dentro del área definida. Fit=cover recortaría logos landscape en un contenedor cuadrado.
- **State=loading shimmer** — El shimmer es una animación CSS (gradiente que se desplaza de izquierda a derecha) sobre el fondo surface/disabled. Comunica al usuario que el contenido está cargando. El aspecto y el radius del shimmer coinciden exactamente con la imagen final para evitar saltos visuales.
- **Caption con `<figure>` + `<figcaption>`** — Cuando Has Caption=on, el componente usa `<figure>` como wrapper y `<figcaption>` para el texto. Esta es la semántica HTML correcta para imagen + descripción visible asociada. El Developer debe implementar este patrón.

### Accesibilidad (ARIA)

| Caso | Elemento HTML | Atributos | Por qué importa |
|------|--------------|-----------|----------------|
| Imagen informativa (loaded) | `<img>` | `alt="descripción significativa"` | WCAG 1.1.1: no-text content — SR lee el alt como sustituto de la imagen |
| Imagen decorativa | `<img>` | `alt=""` | Alt vacío = decorativo — SR ignora la imagen completamente; `role="presentation"` es equivalente |
| Imagen con caption | `<figure>` + `<figcaption>` | `<img alt="">` + `<figcaption>` | La figcaption puede ser el alt implícito; el img puede tener alt="" si la caption describe la imagen |
| State=loading | `<img>` o div | `aria-busy="true"` | SR sabe que el contenido está pendiente — no anuncia el placeholder como imagen real |
| State=error | `<img>` | `alt="Imagen no disponible"` o `aria-label="..."` | SR describe el estado de error; el usuario sabe que la imagen falló |
| Imagen enlazada | `<a>` → `<img>` | `alt` describe destino del link (no solo la imagen) | El alt del img dentro de un link describe la acción del link, no la imagen |

### Navegación por teclado

Primary interactions (afectan diseño):

```
Image no es focusable por sí misma — sin keyboard interactions.

Excepción: Image wrapeada en <a> (link) o <button>:
→ Tab/Shift+Tab  → enfoca el link/button contenedor
→ Enter/Space    → activa el link/button
→ El alt text es el label del link/button
```

---

## Guía de contenido

**Alt text (obligatorio en imágenes informativas):**
- Describe lo que hay en la imagen, no cómo se ve ("Foto de Pedro Quinones" no "imagen.jpg")
- Máximo ~100 caracteres — los SR leen el alt completo en un solo anuncio
- Para imágenes de producto: describe el producto, color, ángulo relevante ("Silla Ergonómica modelo A en color azul, vista frontal")
- Para personas: nombre + contexto relevante ("Foto de María García, CEO de Acme Corp")
- Para gráficos/data: describir el dato clave ("Gráfico de barras: ventas Q1 aumentaron 23%")
- Para iconos decorativos dentro de imágenes: incluir en el alt si son informativos
- `alt=""` (vacío, no ausente) para imágenes puramente decorativas

**Caption (texto visible debajo de la imagen):**
- Complemente la imagen, no la repita — add context el alt text no puede dar
- Para fotografías: crédito del fotógrafo, fecha, o contexto adicional ("Conferencia anual 2025, Buenos Aires")
- Para screenshots: describe el contexto del paso en el flujo
- Para imágenes de producto: medidas, materiales, o detalles que el alt no incluye
- Font: 13px/regular · text/secondary — caption no compite con el contenido principal

**AspectRatio según tipo de contenido:**
- `1:1` para avatars, thumbnails de producto en grid cuadrado, user profile pictures
- `4:3` para fotografías en artículos, blog posts, eventos
- `16:9` para capturas de pantalla, videos, hero sections de dashboards
- `21:9` para hero banners de marketing full-width
- `3:4` para fotografías de personas, product cards verticales (moda, e-commerce)
- `auto` solo cuando la imagen siempre estará disponible y sus dimensiones son conocidas

---

## Pre-build checklist

```
□ ¿El alt text describe significativamente el contenido (no "image.jpg")?
□ ¿Las imágenes decorativas tienen alt="" (vacío, no ausente)?
□ ¿AspectRatio=auto solo en imágenes que no pueden estar en State=loading/error?
□ ¿El AspectRatio coincide con las proporciones reales del contenido?
□ ¿Fit=cover para thumbnails/avatars que deben rellenar? ¿Fit=contain para logos?
□ ¿State=loading tiene shimmer implementado (aria-busy="true")?
□ ¿State=error tiene alt text que describe el fallback ("Imagen no disponible")?
□ ¿Has Caption=on usa <figure> + <figcaption> en implementación?
□ ¿Imágenes enlazadas tienen alt que describe el destino del link?
□ ¿AspectRatio fijo implementado con CSS aspect-ratio o padding-top hack para CLS?
```

---

## Componentes relacionados

```
Avatar        → usa Image internamente con Radius=full y AspectRatio=1:1
ProductCard   → usa Image para thumbnail (Fit=cover, AspectRatio=1:1 o 4:3)
Carousel      → usa Image para slides; expone AspectRatio y Fit
HeroBanner    → usa Image con AspectRatio=16:9 o 21:9 como fondo visual
MediaCard     → combina Image + Caption + texto descriptivo en un solo patrón
Thumbnail     → alias semántico de Image sm (uso en listas y tablas)
Gallery       → grid de Images con lightbox on-click
Icon          → para SVG vectoriales — no usar Image para iconos
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | AspectRatio | Fit | Radius | Loading/Error | Caption | Diferenciador |
|---------|-------|------------|-----|--------|--------------|---------|--------------|
| **Material Design 3** | Image (ShapeableImageView) | No nativo | — | ShapeModel tokens (cualquier forma) | No nativo | No | Shape theming vía ShapeKeyTokens; sin loading state |
| **Spectrum (Adobe)** | Image | No | objectFit | borderRadius | No | No | CORS, crossOrigin; simple wrapper sobre `<img>` |
| **Carbon (IBM)** | ImageWithCaption | No | — | — | No (ImageLoader manual) | Sí | Caption WYSIWYG; usado en CMS patterns; no aspect control |
| **Polaris (Shopify)** | Image, Thumbnail | No (Thumbnail fijo) | — | Sí (Thumbnail) | No | No | Thumbnail size=sm/md/lg; Image es thin wrapper |
| **Atlassian** | Sin componente | — | — | — | — | — | Box + img directo; sin wrapper |
| **Ant Design** | Image | No (width/height props) | — | No | Sí (placeholder, fallback props) | No | Preview mode (zoom, rotate, flip); fallback prop para error; placeholder node |
| **Twilio Paste** | Sin componente | — | — | — | — | — | Native `<img>` directo con Paste Box |
| **Lightning (Salesforce)** | lightning-image | No | — | — | No | — | Web component; accesibility-first alt |
| **Primer (GitHub)** | Sin componente | — | — | — | — | — | Native img con sx prop vía Box |
| **shadcn/ui** | Sin componente | — | — | — | — | — | Next.js `<Image>` para optimización; no DS component |
| **Radix UI** | Sin componente | — | — | — | — | — | Primitivo headless no incluye Image |
| **Chakra UI** | Image | No | objectFit | borderRadius | fallbackSrc, fallback node | No | fallback prop (React node) para error; sizes | 
| **GOV.UK** | Sin componente | — | — | — | — | No | Native img con classes; sin wrapper |
| **Base Web (Uber)** | Sin componente | — | — | — | — | — | Block con override system |
| **Fluent 2 (Microsoft)** | Image | No | fit prop (cover/contain/fill/none) | shape (square/circular/rounded) | No | No | fit + shape + block prop; shadow prop |
| **Gestalt (Pinterest)** | Image, Mask | No | fit | Mask (radius separado) | No | No | Mask como wrapper de radius; Image + Mask composition |
| **Mantine** | Image | No | fit (CSS objectFit) | radius (theme tokens) | withPlaceholder, fallbackSrc | No | withPlaceholder para loading/error unificado; srcSet support |
| **Orbit (Kiwi)** | ServiceLogo | No (brand logos) | — | Sí | No | No | Domain-specific: solo logos de aerolíneas y servicios; no generic |
| **Evergreen** | Sin componente genérico | — | — | — | — | — | Avatar usa imagen; sin Image component |
| **Nord** | Sin componente | — | — | — | — | — | Healthcare; native img |

**Patrones clave de la industria:**
1. **Loading/Error state** — Solo Ant Design (T1), Chakra UI, y Mantine lo modelan explícitamente con props de placeholder/fallback. Los demás lo delegan al developer. Esta es la razón más fuerte para tener un componente Image (vs. `<img>` nativo): el state management de loading/error.
2. **AspectRatio como propiedad** — Ningún T1 lo modela como propiedad discreta del componente. Radix Themes tiene un componente `AspectRatio` separado que wrappea cualquier contenido. La decisión de incluir AspectRatio en Image directamente simplifica el API y refuerza el uso correcto.
3. **Fit/objectFit** — Fluent 2, Spectrum, Chakra y Mantine lo exponen. Los demás delegan a CSS. El consenso de T1+T2 es que Fit debe ser una prop del componente.
4. **Radius en Image** — La mayoría lo expone a través del sistema de theming (shape tokens en M3, borderRadius en Chakra). El patrón de 5 valores discretos (none/sm/md/lg/full) es consistente con otros primitivos del DS — Radius=full para avatars circulares es el caso de uso más común.
5. **Caption con `<figure>`** — Carbon (T1) y sistemas de CMS-oriented (Storyblok, Contentful DS) son los únicos con caption de primera clase. La mayoría deja la `<figcaption>` al developer. Incluirla como toggle permite que el diseñador documente la intención sin forzar la estructura al desarrollador.

---

## Tokens

**10 tokens** · prefijo `img-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `img-radius-sm` | `radius/sm` | Radius sm — 4px |
| `img-radius-md` | `radius/md` | Radius md — 8px |
| `img-radius-lg` | `radius/lg` | Radius lg — 16px |
| `img-radius-full` | `radius/pill` | Radius full — 9999px (circular) |
| `img-loading-bg` | `surface/disabled` | Background del shimmer de loading |
| `img-error-bg` | `surface/disabled` | Background del state de error |
| `img-error-fg` | `text/subtlest` | Color del icono/texto de error |
| `img-caption-fontSize` | `type/sm` | Tamaño de fuente del caption — 13px |
| `img-caption-fg` | `text/secondary` | Color del texto de caption |
| `img-caption-marginTop` | `spacing/2` | Separación imagen → caption — 8px |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  AspectRatio reference:                                   │
│                                                           │
│  1:1   ████ 100%/100%  — cuadrado                        │
│  4:3   ████████ / ██████  — ratio: 75%                   │
│  16:9  ████████████████ / █████████  — ratio: 56.25%     │
│  21:9  █████████████████████ / █████████  — ratio: 42.86%│
│  3:4   ████ / █████████  — ratio: 133.33%                │
│                                                           │
│  Radius scale:                                            │
│  none: 0px │ sm: 4px │ md: 8px │ lg: 16px │ full: 9999px │
│                                                           │
│  Caption spacing:                                         │
│  [  imagen  ]                                             │
│  ←─ 8px ──→                                              │
│  Caption text — 13px/regular · text/secondary             │
│                                                           │
│  Frames totales:                                          │
│  6 AspectRatio × 5 Radius × 3 State = 90 representativo  │
│  Subset curado de 60 frames (excluye auto+loading/error)  │
└──────────────────────────────────────────────────────────┘
```
