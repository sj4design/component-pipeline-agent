# Image — Component Research

**Fecha:** 2026-04-17
**Modo:** --max (all patterns, all systems, no scope filter)
**Sistemas analizados:** 24 (all tiers)
**Scope:** All patterns — loading, fallback, preview, aspect ratio, a11y, composition

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Material Design 3 | Trata imagen como primitivo de contenido, no componente — filosofia de no formalizar elementos no-interactivos | `<img>` con shape tokens `shape.corner.*` para border-radius + Jetpack Compose `Image`/Flutter `Image.network` |
| Spectrum (Adobe) | Imagen es preocupacion de layout, no de componente — CMS layer (Experience Manager) maneja optimizacion | `<img>` nativo con dimension tokens de Spectrum para sizing |
| Carbon (IBM) | Foco enterprise en dashboards data-densos donde imagenes son infrecuentes | `ImageWithCaption` en IBM.com extension (marketing only) con `image`, `heading`, `copy` props |
| Atlassian | Componentes de imagen acoplados a su media-service backend, no son wrappers genericos | `MediaCard` con `identifier` (media service ID) para ecosystem interno; `<img>` nativo para display simple |
| Twilio Paste | Sin Image component — uso de `<img>` con spacing/sizing tokens de Paste | `<img>` nativo con tokens de Paste |
| GitHub Primer | Sin Image primitive — imagenes dentro de composites (Avatar, Card) | HTML nativo + `<img>` con Primer tokens |
| shadcn/ui | Sin Image primitive — omision intencional para evitar colision con `next/image` | `next/image` o `<img>` nativo con Tailwind `aspect-ratio` utilities |
| Wise Design | Sin abstraccion de imagen — `<img>` nativo | `<img>` HTML |
| Radix UI | Libreria headless centrada en interaction primitives — imagen fuera de scope | Avatar (con image fallback) para avatares; `<img>` nativo para todo lo demas |
| Base Web (Uber) | Sin Image primitive — `AspectRatioBox` como escape hatch para ratio enforcement | `AspectRatioBox` wrapping `<img>` para constraint de aspect ratio |
| Orbit (Kiwi.com) | Travel UI orientada a iconos e ilustraciones; destination images en el product layer | Componentes de imagen no expuestos en el DS publico |
| Evergreen (Segment) | Analytics dashboards — imagenes poco comunes en el producto Segment | `<img>` nativo |
| Nord (Nordhealth) | Imagenes de pacientes via DICOM viewers especializados, no Image componente generico | DICOM viewers externos al DS |

---

## How Systems Solve It

### Ant Design — "Preview/lightbox built-in + gallery pattern"

Ant Design provee el Image component mas completo entre todos los sistemas del ecosistema. `Image` envuelve `<img>` con preview/lightbox integrado (click abre overlay full-screen con controles de zoom, rotacion y flip), fallback automático en error via prop `fallback`, y placeholder durante carga via prop `placeholder` (acepta React node — soporte para blur-up o skeleton). `Image.PreviewGroup` habilita navegacion galeria entre multiples imagenes dentro del mismo overlay de preview. Esta es la unica implementacion Tier 1 que trata la imagen como un patron interactivo de primera clase.

La decision de incluir preview/lightbox dentro del componente Image elimina la necesidad de una libreria de lightbox separada para el caso de uso mas comun. La separacion entre `preview={false}` (imagen estatica) y `preview` como objeto de configuracion (con `visible`, `onVisibleChange`, `mask`, `maskClassName`) permite tanto el uso simple como el control programatico avanzado del overlay. El prop `fallback` acepta una URL de imagen alternativa — si el `src` principal falla, se muestra el fallback sin estado de broken image.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Preview/lightbox built-in | Elimina dependencia de libreria externa para el patron mas comun; imagen interactiva de primera clase | HIGH | Evaluar si preview es core o composicion — si el DS lo requiere, incluir; si es raro, componer con Modal |
| `Image.PreviewGroup` para galeria | Navegacion entre imagenes compartiendo un mismo overlay — patron galeria completo sin overhead | HIGH | Patron de building block: agrupar images bajo un wrapper para habilitar navegacion |
| `fallback` prop (URL alternativa) | Previene broken image states — UX robusta sin handler de error manual | HIGH | Siempre incluir fallback support — diferencia entre DS maduros y basicos |
| `placeholder` como React node | Flexible: puede ser skeleton, blur-up, o cualquier node — no fuerza un patron especifico | MED | Exponer `placeholder` slot; documentar patron blur-up con skeleton |

**Notable Props:** `src`, `alt`, `width`, `height`, `fallback` (URL), `placeholder` (node), `preview` (boolean | config), `rootClassName`; `Image.PreviewGroup` wrapper
**A11y:** `<img>` estandar con `alt`. Preview overlay con navegacion por teclado (arrow keys para galeria, Escape para cerrar). Controles de zoom/rotate accesibles por teclado. `alt` no es required — responsabilidad del consumidor.

---

### Polaris (Shopify) — "Thumbnail product-context con icon fallback"

Polaris nomina su Image component `Thumbnail` — una decision deliberada que comunica el scope: compact product/file previews en listas y cards de admin, no hero images ni galerias. El aspecto mas notable es el icon fallback en error: cuando `source` falla, Thumbnail renderiza un icono de tipo-de-archivo basado en el contexto del `alt` text, previniendo broken image placeholders en grids de productos. Esto es valioso en el contexto de Shopify Admin donde los comerciantes ven grids densos de productos, algunos sin imagen configurada.

El aspect ratio es fijo (square, `object-fit: cover`) en todos los tamaños — una constraint intencional para grids de productos donde el dimensionamiento consistente mantiene el ritmo visual. `transparent: boolean` remueve el background fill para imagenes con canal alpha. No hay lazy loading, preview, ni responsive srcset — este componente esta intencionalmente scope-limitado.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Nombrar "Thumbnail" no "Image" | Comunicacion de scope — no es un Image generico, es una preview de producto/archivo | MED | Si tu DS tiene tanto hero images como thumbnails, separarlos es una opcion valida |
| Icon fallback en error | Broken images en grids de productos degradan la UX significativamente; icon fallback es siempre mejor que broken | HIGH | Incluir siempre fallback handling — icon generico es el minimo viable |
| Fixed square aspect ratio | Grids de productos requieren dimensionamiento consistente; variedad de ratios rompe el grid | HIGH | Ofrecer aspect ratio presets (square, 4:3, 16:9) antes que libertad total |
| `transparent: boolean` | Imagenes de productos con transparencia (PNG) necesitan fondo neutral, no fondo de color | MED | Incluir como prop de styling para imagenes con canal alpha |

**Notable Props:** `size: "extraSmall" | "small" | "medium" | "large"`, `source: string`, `alt: string` (required), `transparent: boolean`
**A11y:** `alt` es required prop — el DS enforza descripcion de texto. `<img>` estandar con el `alt` provisto.

---

### REI Cedar — "Aspect ratio enforcement + responsive srcset"

Cedar's CdrImg es el Image component Tier 2 mas completo, destacando por dos capacidades que ningun otro Tier 2 provee: `ratio` prop para enforcement de aspect ratio via CSS (previene layout shift cuando las imagenes cargan), y soporte nativo de `srcset`/`sizes` para responsive image delivery. Para el caso de uso de e-commerce outdoor gear de REI, los grids de productos con imagenes de diferentes dimensiones necesitan ratio enforcement para mantener el ritmo visual, y responsive srcset es critico para performance movil.

El `loading` prop expone `loading="lazy"` del navegador como prop de componente, haciendo lazy loading opt-in con un API claro. Cedar es el unico Tier 2 con soporte built-in de srcset — todos los demas sistemas esperan que los desarrolladores usen atributos HTML directamente.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `ratio` prop para aspect ratio | CSS-enforced ratio previene layout shift antes de que la imagen cargue — critico para UX de grids | HIGH | `aspectRatio` prop como preset enum o string CSS — consistencia visual en grids |
| `srcset`/`sizes` nativo como props | Responsive image delivery sin markup custom — menor barrera para performance | HIGH | Exponer `srcset` y `sizes` como props pass-through si el DS lo necesita |
| `loading="lazy"` como prop | Lazy loading opt-in con API claro vs documentar el HTML attribute | MED | Boolean `lazy` o `loading: "eager"|"lazy"` |
| `alt` como required prop | El DS mas fuerte en enforcement de a11y en Tier 2 | HIGH | `alt` siempre required o con linting warning |

**Notable Props:** `ratio` (aspect ratio), `loading: "lazy"|"eager"`, `srcset`, `sizes`, `alt` (required), `modifier` para styling
**A11y:** `alt` es required prop — el enforcement mas fuerte en Tier 2. Lazy-loaded images mantienen sus requirements de alt text.

---

### Chakra UI — "Fallback props + polymorphic rendering"

Chakra UI wraps `<img>` con `fallbackSrc` y `fallback` props para error states — si la imagen primaria falla, se muestra una URL alternativa (fallbackSrc) o un React node (fallback). `objectFit` y `borderRadius` como style props para customizacion visual. La capacidad clave para proyectos modernos es el `as` prop para polymorphic rendering — permite usar `next/image` como implementacion base manteniendo el styling del DS.

No hay lazy loading built-in ni preview. El patron de `fallback` como React node es mas flexible que `fallbackSrc` de URL — permite mostrar un skeleton, un icono, o cualquier estado de placeholder durante carga o en error.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `fallbackSrc` vs `fallback` (node) | `fallbackSrc` para imagen alternativa; `fallback` para control total del estado de error/carga | HIGH | Ofrecer ambos: string URL para caso simple, node para control total |
| `as` prop polymorphic | Drop-in replacement con `next/image`/`gatsby-image` manteniendo DS styling | HIGH | `component` prop para polymorphism — el DS estiliza, el framework optimiza |
| `objectFit` como style prop | `object-fit: cover/contain/fill` directamente en el component API | MED | `fit: "cover"|"contain"|"fill"|"none"` como prop enum |

**Notable Props:** `src`, `alt`, `fallbackSrc`, `fallback` (node), `objectFit`, `borderRadius`, `as` (polymorphic)
**A11y:** `alt` pass-through al `<img>` subyacente. No enforced como required — responsabilidad del consumidor.

---

### Fluent 2 (Microsoft) — "Semantic shape clipping + elevation props"

Fluent 2's Image es notable por su `shape` prop con valores semanticos (`circular`, `rounded`, `square`) — aplica clipping semanticamente en lugar de via border-radius raw. Esto es consistente con como Fluent maneja Avatar shapes. El prop `fit` mapea a valores de `object-fit`. `bordered` y `shadow` proveen elevation control especifico para imagenes en document/card layouts en Microsoft 365. No hay preview/lightbox ni lazy loading.

La decision de `shape` semantico vs border-radius numerico refleja la filosofia de Fluent: las propiedades visuales deben comunicar intencion (circular = avatar/profile, rounded = card thumbnail, square = file icon) en lugar de valores de CSS raw.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `shape` semantico (circular/rounded/square) | Comunica intencion visual — avatar vs thumbnail vs icono | HIGH | Alineado con como muchos DS manejan Avatar; adoptar si el DS necesita las mismas shapes |
| `fit` mapea a `object-fit` | API limpio sobre CSS — `fit: "cover"` es mas legible que `style={{objectFit:"cover"}}` | MED | Prop `fit` enum sobre style prop directo |
| `bordered` y `shadow` props | Elevation y separacion contextual para document layouts | MED | Props de separacion visual contextual |

**Notable Props:** `fit: "none"|"center"|"contain"|"cover"|"default"`, `shape: "circular"|"rounded"|"square"`, `shadow: boolean`, `bordered: boolean`
**A11y:** `alt` para imagenes informativas; `alt=""` + `aria-hidden="true"` para decorativas. Sigue guias WAI.

---

### Gestalt (Pinterest) — "Image-first DS con dominant-color placeholder"

Gestalt (Pinterest) es el sistema Tier 3 donde Image recibe la inversion mas profunda — Pinterest es un producto centrado en imagenes, por lo que Gestalt trata Image como componente de primera clase. Las capacidades unicas son: `naturalWidth`/`naturalHeight` props para dimensiones conocidas del servidor (previenen layout shift sin CSS aspect ratio tricks), `color` prop que llena el placeholder area con el color dominante de la imagen antes de que cargue (el patron "colored placeholder" visible en Pinterest boards), y lazy loading built-in.

El prop `role` con valores `"img"` (informativa, requiere alt) vs `"presentation"` (decorativa, oculta de AT) es la implementacion de a11y mas explicita para imagen en el ecosistema — fuerza la decision de informativa vs decorativa en el API en lugar de delegarla a convenciones de `alt=""`.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `naturalWidth`/`naturalHeight` | Dimensiones conocidas del servidor previenen layout shift sin CSS tricks — pattern aplicable en SSR/SSG | HIGH | Ofrecer width/height como props; documentar que previenen CLS |
| `color` prop para placeholder dominante | UX perceptible: el placeholder en el color dominante reduce el "flash" visual al cargar | MED | Requiere color extraction en backend — no es viable sin infraestructura |
| `role: "img"|"presentation"` | Fuerza la decision informativa vs decorativa en el API | HIGH | `role` o boolean `decorative` — decision mas clara que convenciones de `alt=""` |
| Lazy loading built-in | Core para un producto image-heavy; `loading="lazy"` built-in sin opt-in requerido | HIGH | Default lazy en grids; eager para above-the-fold |

**Notable Props:** `naturalWidth`, `naturalHeight`, `fit: "cover"|"contain"|"none"`, `color` (placeholder), `loading="lazy"`, `role: "img"|"presentation"`
**A11y:** `role` prop fuerza decision de informativa/decorativa. `loading="lazy"` no exime el requirement de alt text. Sin generacion automatica de alt.

---

### Mantine — "fallbackSrc + component polymorphism"

Mantine combina `fallbackSrc` para error fallback con `radius` del theme scale para border-radius (en lugar de valores raw), `fit` para object-fit, y el `component` prop para polymorphic rendering (ej. Next.js Image). El boundary entre error state y loading state esta manejado simplemente — si `src` falla se muestra `fallbackSrc`, si no hay fallback se muestra broken image. No hay preview/lightbox — Mantine espera composicion con el Lightbox component separado.

El `component` prop para polymorphism es la solucion mas elegante para el problema de framework-specific image optimization — el DS provee styling, el consumidor elige la implementacion subyacente.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `radius` desde theme scale | Consistencia con el sistema de tokens; evita valores raw | MED | `radius` desde tokens > `borderRadius` como valor raw |
| `component` polymorphic | El DS estiliza; el consumidor usa la implementacion de imagen de su framework | HIGH | Patron valioso para DS que necesitan framework agnosticism |
| No preview built-in | Separacion de concerns — lightbox/preview es un componente separado | MED | Valida el approach de composicion sobre todo-en-uno |

**Notable Props:** `src`, `alt`, `fallbackSrc`, `radius` (theme scale), `fit`, `component` (polymorphic), `width`, `height`
**A11y:** `alt` pass-through. No enforced como required.

---

### GOV.UK — "Responsive image obligatorio con alt requerido"

GOV.UK provee un Image component basico optimizado para el contexto de servicios de gobierno: responsive sizing enforced, `alt` requerido por el componente (consistente con regulaciones de accesibilidad gubernamentales WCAG AA mandatory), y sin preview ni lazy loading — optimizado para contenido de estilo documento. Sin carousel, sin lightbox, sin aspect ratio control avanzado.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `alt` required | WCAG AA mandatorio en contexto gubernamental — el DS enforza compliance | HIGH | `alt` required es la decision de a11y mas impactante en cualquier Image component |
| Sin preview ni lazy | Document-style content no necesita preview interactivo; lazy loading via HTML attribute | LOW | Contexto especifico — responsive y alt son los dos valores universales |

**Notable Props:** `src`, `alt` (required), responsive sizing built-in
**A11y:** `alt` required — enforcement mas fuerte en Tier 3 junto con Cedar en Tier 2.

---

### Salesforce Lightning — "Basic wrapper con lazy loading"

Lightning's `lightning-image` es un wrapper basico con lazy loading via `loading="lazy"`, sin preview ni fallback logic. Es uno de los wrappers mas simples del ecosistema, reflejando que los casos de uso de imagen en Salesforce CRM son infrecuentes.

**Notable Props:** `src`, `alt`, `loading: "lazy"|"eager"`, standard sizing
**A11y:** `alt` pass-through standard.

---

### Playbook — "Rounded corners y loading states"

Playbook provee un Image component basico con `url` y `alt` props, soporte de rounded corners y loading states. Minimal featureset para casos de uso simples.

**Notable Props:** `url`, `alt`, rounded corners, loading state support
**A11y:** `alt` standard.

---

### Dell Design System — "Responsive sizing con alt requirement"

Dell's Image component ofrece responsive sizing y alt text requirement para contextos enterprise.

**Notable Props:** `src`, `alt`, responsive sizing
**A11y:** `alt` requerido.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: contenedor de imagen con behavior de carga y fallback**

La imagen es el unico componente del DS que tiene tres estados de tiempo: carga (placeholder), exito (imagen), y error (fallback). El archetype correcto es un wrapper sobre `<img>` que gestiona estos tres estados + aspect ratio + a11y semantic. No es un primitive puro (como M3 trata) ni un interactive component puro (como Ant Design con preview) — es un content display component con estado de carga.

**Recomendacion:** Implementar dos niveles: `Image` (generico con fallback + aspect ratio + a11y) y `Thumbnail` (Image con constraint de tamaños y context para previews de objeto). Esta separacion refleja el patron Polaris y el uso de Ant Design.

### Slot Consensus Table

| Slot | Sistemas con el slot | Consenso |
|------|---------------------|----------|
| src/url (imagen source) | AntDesign, Polaris, Cedar, Chakra, Gestalt, Mantine, Fluent2, GOV.UK, Lightning, Playbook, Dell | 11/11 |
| alt (texto alternativo) | AntDesign, Polaris, Cedar, Chakra, Gestalt, Mantine, Fluent2, GOV.UK, Lightning, Playbook, Dell | 11/11 |
| fallback/fallbackSrc | AntDesign, Chakra, Mantine | 3/11 |
| placeholder (loading state) | AntDesign | 1/11 |
| preview overlay | AntDesign | 1/11 |
| caption | IBM.com ImageWithCaption solamente | 1/11 |

### Property Consensus Table

| Propiedad | Valores observados | Consenso |
|-----------|-------------------|----------|
| fit/objectFit | cover, contain, fill, none, center, default | 5/11 sistemas |
| shape/radius | circular, rounded, square; radius desde tokens | 4/11 sistemas |
| size | extraSmall, small, medium, large (Polaris); numeric (otros) | 3/11 sistemas |
| loading | lazy, eager | 3/11 sistemas |
| ratio/aspectRatio | CSS ratio string, numeric (Cedar) | 2/11 sistemas |
| width / height | numerics | 4/11 sistemas |
| srcset / sizes | responsive image attrs | 1/11 sistemas (Cedar) |

### Boolean Properties Table

| Prop | Default | Sistemas |
|------|---------|----------|
| transparent | false | Polaris |
| bordered | false | Fluent2 |
| shadow | false | Fluent2 |
| lazy | false | Gestalt (built-in), Cedar, Lightning |
| decorative (via role="presentation") | false | Gestalt |
| preview | true | Ant Design |

### State Coverage Table

| Estado | Sistemas que lo implementan | Consenso |
|--------|---------------------------|----------|
| loading (placeholder visible) | AntDesign, Chakra (via fallback), Gestalt (color placeholder) | 3/11 |
| error (fallback visible) | AntDesign, Polaris (icon), Chakra, Mantine | 4/11 |
| loaded (imagen visible) | Todos | 11/11 |
| preview open (lightbox) | AntDesign | 1/11 |
| disabled | Ninguno | 0/11 |

### Exclusion Patterns

- **Sin animation/transition built-in**: No sistema provee fade-in durante carga como prop — los consumidores aplican CSS transitions
- **Sin lazy loading via IntersectionObserver**: Todos los sistemas que tienen lazy usan `loading="lazy"` del browser — sin custom scroll observer
- **Sin caption built-in**: Solo IBM.com extension; caption es responsabilidad del consumidor (usar `<figure>/<figcaption>`)
- **Sin color dominant placeholder automatico**: El patron de Gestalt requiere infraestructura de extraccion de color — no es viable sin backend support

### Building Block Candidates

- `Image` → wrapper basico con fallback + alt + fit
- `Thumbnail` → Image con size presets y constraint de aspect ratio
- `ImagePreviewGroup` → wrapper para habilitar galeria navigation en colecciones de Image
- `Figure` → composicion de Image + figcaption para contenido editorial

### Enum / Configuration Properties

```
fit: "cover" | "contain" | "fill" | "none" | "center"
shape: "circular" | "rounded" | "square" | "default"
loading: "lazy" | "eager"
role: "img" | "presentation"
size: "xs" | "sm" | "md" | "lg"
```

### A11y Consensus

| Dimension | Consenso | Implementacion |
|-----------|----------|----------------|
| Role | `<img>` con `role` implicito | Usar elemento `<img>` nativo, no `<div role="img">` |
| ARIA obligatorio | `alt` para informativas; `alt=""` + `aria-hidden="true"` para decorativas | Forzar decision en API (role prop o alt required) |
| Keyboard | Sin keyboard interaction en estado estatico; preview overlay con arrow keys + Escape | Preview/lightbox debe ser completamente keyboard accessible |
| Focus | Sin focus en imagen estatica; overlay con focus management | Focus trap en overlay; focus return al trigger al cerrar |
| APG Pattern | No hay APG pattern especifico para imagen estatica | Preview/lightbox sigue APG dialog pattern |

---

## What Everyone Agrees On

1. **`alt` es el unico prop universalmente requerido.** Todos los sistemas que proveen Image component lo incluyen; los que lo hacen required (Cedar, Polaris, GOV.UK) son los mas robustos en a11y.
2. **`object-fit` necesita abstraccion.** El patron `fit: "cover"|"contain"` aparece en 5 sistemas — la abstraccion sobre el CSS es suficientemente valiosa como para ser prop de primera clase.
3. **Fallback handling es table stakes.** Los sistemas maduros (Ant Design, Chakra, Mantine) incluyen fallback; los basicos (Lightning, Playbook) no. La diferencia entre un Image component basico y uno production-ready es el manejo del error state.
4. **Aspect ratio enforcement previene layout shift.** Cedar con `ratio` y Gestalt con `naturalWidth`/`naturalHeight` atacan el mismo problema de CLS desde angulos diferentes — ambos son correctos para su contexto.
5. **Polymorphic rendering para framework compatibility.** Chakra `as` y Mantine `component` resuelven el problema de framework-specific image optimization (Next.js Image) manteniendo DS styling — el patron `component` es la solucion mas elegante.
6. **Preview/lightbox NO es core.** Solo Ant Design lo incluye built-in — el consenso es que lightbox/preview se compone externamente, a menos que sea un use case primario.
7. **Decorative vs informative es una decision API.** Gestalt's `role` prop fuerza la decision en el API; todos los demas la delegan a convenciones de `alt=""` — la decision explicita en el API es superior.

---

## Where They Disagree

**1. ¿Incluir preview/lightbox dentro del Image component?**
- **Option A (Ant Design):** Preview built-in con `preview` prop — zero friction para el caso de uso mas comun; todo-en-uno
- **Option B (Mantine, todos los demas):** Preview como composicion separada — Image es display, lightbox es interaccion; mejor separacion de concerns

**2. ¿`alt` required o no?**
- **Option A (Cedar, Polaris, GOV.UK):** `alt` es required prop — el DS enforza a11y por defecto; falla loudly en desarrollo
- **Option B (Ant Design, Chakra, Mantine):** `alt` es opcional — flexibilidad para decorativas; compliance es responsabilidad del consumidor

**3. ¿Shape como enum semantico o border-radius numerico?**
- **Option A (Fluent 2, Polaris-ish):** `shape: "circular"|"rounded"|"square"` — semantico, comunica intencion visual
- **Option B (Mantine, Chakra):** `radius` desde tokens o style prop directo — mas flexible, menos semantico

**4. ¿Aspect ratio enforcement via prop o CSS externo?**
- **Option A (Cedar):** `ratio` prop — el componente enforza el aspect ratio con CSS paddding-bottom trick
- **Option B (shadcn/ui, Tailwind):** Aspect ratio via utility classes externas — mas flexible, menos out-of-the-box

**5. ¿Polymorphic rendering para framework images?**
- **Option A (Chakra `as`, Mantine `component`):** El Image DS es polymorphic — puede ser Next.js Image, Gatsby Image, etc.
- **Option B (shadcn/ui, M3):** Sin Image DS — usar directamente el framework-specific component; el DS no intenta abstraerlo

---

## Visual Patterns Found

### Patron 1: Static Image con estados de carga/error

```
Estado loading:
┌─────────────────────┐
│  ░░░░░░░░░░░░░░░░   │  ← skeleton / color placeholder
│  ░░░░░░░░░░░░░░░░   │
│  ░░░░░░░░░░░░░░░░   │
└─────────────────────┘

Estado loaded:
┌─────────────────────┐
│  ████████████████   │
│  ████████████████   │  ← imagen real
│  ████████████████   │
└─────────────────────┘

Estado error:
┌─────────────────────┐
│                     │
│     [▣ icono]       │  ← fallback icon o fallbackSrc
│                     │
└─────────────────────┘
```

### Patron 2: Thumbnail grid (Polaris)

```
┌────┐ ┌────┐ ┌────┐
│████│ │████│ │ ▣  │  ← tercero sin imagen: icon fallback
└────┘ └────┘ └────┘
  sm    md      lg
```

### Patron 3: Preview/lightbox (Ant Design)

```
Normal:                  Preview open:
┌──────────────┐        ┌──────────────────────────────────────┐
│              │  click  │                                      │
│   ████████   │ ──────► │         ██████████████████          │
│   ████████   │        │         ██████████████████          │
└──────────────┘        │                                      │
                        │  [◄]  [↻] [↺] [⊕] [⊖] [✕]         │
                        └──────────────────────────────────────┘
```

### Patron 4: Image con caption

```
┌─────────────────────┐
│                     │
│   ████████████████  │
│   ████████████████  │
│                     │
└─────────────────────┘
  Caption text aqui
  (via <figure>/<figcaption>)
```

---

## Risks to Consider

| Riesgo | Severidad | Detalle |
|--------|-----------|---------|
| CLS (Cumulative Layout Shift) sin dimensiones | HIGH | Si no se conocen width/height antes de cargar, la imagen empuja contenido al renderizarse — especialmente perjudicial en grids. Requiere aspect ratio enforcement o dimensiones explicitas en el API. |
| `alt` omitido para imagenes decorativas | HIGH | Si `alt` no es required, los consumidores frecuentemente omiten `alt=""` en imagenes decorativas, haciendo que screen readers anuncien el filename. La decision de hacer `alt` required vs `role="presentation"` es critica. |
| Preview/lightbox sin focus management | MEDIUM | Un preview overlay sin focus trap y return-focus al cerrar viola WCAG 2.1 SC 1.3.1 y SC 2.4.3. Si se incluye preview, el focus management es obligatorio. |
| `type="number"` nativos con scroll-to-change | LOW | No aplica directamente, pero los image src dinamicos que cambian en hover/interaccion sin anuncio aria-live son un problema de a11y comun en galerias. |
| Lazy loading y SEO | LOW | `loading="lazy"` para imagenes above-the-fold (especialmente LCP image) penaliza performance. Documentar que above-the-fold images deben ser `loading="eager"`. |

---

## Next Steps

1. **Definir scope del Image DS:** ¿Es un wrapper simple (fallback + alt + fit) o incluye preview? La decision impacta complexity significativamente.
2. **Decidir si `alt` es required:** Cedar/Polaris/GOV.UK-style enforcement vs. flexible — evaluar cuanto control de a11y quiere el DS.
3. **Confirmar si `shape` semantico o `radius` desde tokens** — alineacion con Avatar shapes del DS.
4. **Evaluar polymorphic `component` prop** para compatibilidad con Next.js Image / Gatsby Image.
5. **Definir el patron de Thumbnail** vs Image base — dos componentes o un Image con `size` presets.
