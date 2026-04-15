# Breadcrumb — Component Research

**Date:** 2026-04-10
**Mode:** --max (all patterns, all systems, no scope filter)
**Systems analyzed:** 24 (all tiers)
**Component type:** Hierarchical path navigation

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Material Design 3 | Mobile-first, single-level navigation model — Android uses system back button | Top App Bar `navigationIcon` con back arrow |
| Polaris | Shopify Admin tiene navegacion plana (1-2 niveles) — breadcrumbs innecesarios | `Page.backAction` como single back link |
| Evergreen | SPA sidebar persistente reemplaza breadcrumbs arquitecturalmente | Sidebar nav con seccion activa resaltada |

---

## How Systems Solve It

### Spectrum (Adobe) — "Auto-collapse inteligente que responde al contenedor"

Spectrum aborda el breadcrumb como un componente que DEBE funcionar en cualquier ancho de contenedor sin intervencion del desarrollador. Su decision mas importante es el auto-collapse: cuando los items exceden el ancho disponible, los items intermedios se colapsan automaticamente en un menu "..." dropdown — sin necesidad de configurar `maxItems`. El item root puede mantenerse siempre visible via `showRoot`, lo cual es critico para aplicaciones de Adobe donde el usuario necesita saber que puede volver al nivel superior (Creative Cloud > Projects > ...). Cada item puede deshabilitarse individualmente con `isDisabled`, permitiendo representar paginas sin URL propia (como secciones intermedias sin landing page). Dos tamanos (S y M) cubren contextos compactos y estandar.

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| Auto-collapse a menu dropdown | Evita overflow horizontal sin config manual; el trade-off es que items ocultos requieren un click extra para descubrir | H | Ideal si tus breadcrumbs pueden tener profundidad variable |
| `showRoot` siempre visible | Mantiene orientacion top-level durante collapse; trade-off: consume espacio horizontal fijo | M | Necesario si tu app tiene un "Home" o raiz importante |
| `isDisabled` por item | Permite representar niveles sin URL propia; trade-off: item no-clickeable puede confundir | M | Util para secciones intermedias sin pagina dedicada |

**Notable Props:** `showRoot: boolean`, `isDisabled` por item, `size: "S" | "M"`, auto-collapse automatico.
**A11y:** `<nav aria-label="Breadcrumbs">` con `<ol>`, `aria-current="page"` automatico en ultimo item. Menu collapse accesible con `aria-expanded`.
**Best at:** Responsive sin configuracion — detecta overflow automaticamente.

---

### Carbon (IBM) — "Enterprise simple con skeleton loading"

Carbon toma una posicion deliberadamente simple: sin auto-collapse, sin dropdown, sin trucos. La razon: las aplicaciones enterprise de IBM tienen arquitecturas de informacion poco profundas (2-4 niveles), por lo que el collapse es innecesario. Lo que SI ofrece es unico entre los Tier 1: `BreadcrumbSkeleton`, un estado de carga dedicado para cuando el path se resuelve asincronamente (comun en dashboards con datos federados). `isCurrentPage` marca el item actual como texto no-interactivo, con `aria-current="page"` automatico. `noTrailingSlash` elimina el separador despues del ultimo item — un detalle de polish que Carbon cuida.

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| Sin auto-collapse | Enterprise IBM tiene jerarquias planas; trade-off: no escala a paths profundos sin implementacion custom | H | OK si tus paths son < 5 niveles |
| `BreadcrumbSkeleton` | Dashboards IBM cargan breadcrumbs asincrono; trade-off: componente adicional que mantener | M | Valioso si tu app carga paths desde API |
| `isCurrentPage` como prop semantica | Separa la semantica "pagina actual" de la logica "ultimo item"; trade-off: mas API surface | M | Preferible sobre asumir que el ultimo item siempre es current |

**Notable Props:** `noTrailingSlash: boolean`, `isCurrentPage` por item, `BreadcrumbSkeleton`.
**A11y:** `<nav aria-label="breadcrumb">` con `<ol>`, `aria-current="page"` automatico con `isCurrentPage`. Screen readers anuncian el path como lista ordenada.
**Best at:** Loading state dedicado y API minimalista para enterprise.

---

### Atlassian — "Router integration y truncation predecible"

Atlassian prioriza la integracion con SPAs (Jira, Confluence): el prop `component` en `BreadcrumbsItem` permite pasar el componente `Link` de React Router o Next.js, evitando hard navigations. Para truncation, Atlassian elige control explicito sobre auto-deteccion: `maxItems` define cuantos items se ven, y `itemsBeforeCollapse` / `itemsAfterCollapse` controlan cuales quedan visibles durante el collapse. El "..." se expande in-place al hacer click (no dropdown como Spectrum), una interaccion mas simple que funciona mejor en interfaces enterprise densas.

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| `component` prop para router | SPAs de Atlassian usan client-side routing; trade-off: mas complejo para apps tradicionales | H | Esencial si tu app usa React Router/Next |
| `maxItems` explicito (no auto) | Layout predecible vs responsive; trade-off: requiere configuracion manual | H | Preferible si necesitas control preciso del espacio |
| Expand in-place (no dropdown) | Interaccion mas simple que dropdown; trade-off: puede causar layout shift horizontal | M | Mejor para dashboards con espacio limitado |

**Notable Props:** `maxItems: number`, `itemsBeforeCollapse`, `itemsAfterCollapse`, `component` por item.
**A11y:** `<nav aria-label="Breadcrumbs">` con `<ol>`, `aria-current="page"` en ultimo item. Trigger expand: `aria-label="Show path"`.
**Best at:** Router integration y truncation con control explicito.

---

### Ant Design — "Dropdown menus en cada item para navegacion lateral"

Ant Design es el unico Tier 1 que soporta dropdown menus en items individuales. Cada breadcrumb item puede tener un `menu` prop con sub-items, creando un breadcrumb "navegable lateralmente": el usuario ve "Dashboard > Projects > Current" y puede hacer click en el chevron de "Projects" para ver otros proyectos al mismo nivel. Esto es extremadamente util para jerarquias anchas (muchos siblings) donde navegar lateralmente entre hermanos es comun. El separador acepta cualquier React node (SVG, texto custom, styled component). La API `items` basada en configuracion (array de objetos) vs JSX children facilita la generacion desde route configs.

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| Dropdown menus por item | Navegacion lateral entre siblings; trade-off: mayor complejidad de interaccion y a11y | H | Poderoso si tus usuarios navegan frecuentemente entre hermanos en un nivel |
| Separador custom (React node) | Maximo control visual; trade-off: inconsistencia si cada proyecto elige separador diferente | M | Util si tu DS necesita chevrons SVG personalizados |
| API `items` config-driven | Generacion desde router config; trade-off: menos flexible que children composicion | M | Ideal para apps que derivan breadcrumbs de route data |

**Notable Props:** `items[].menu.items` para dropdown, `separator` custom, icon support por item.
**A11y:** `<nav>` con `role="navigation"`, `aria-current="page"` en ultimo item. Dropdowns siguen ARIA menu patterns. `<ol>` para jerarquia.
**Best at:** Navegacion lateral entre siblings via dropdown — capacidad unica.

---

### Twilio Paste — "Semantica pura y composabilidad"

Paste sigue un enfoque puramente semantico: `<Breadcrumb>` envuelve `<BreadcrumbItem>` children, cada uno con un `<Anchor>` interno. El ultimo item se marca como current page via prop. La composicion children-based permite maximo control por item, pero requiere que el desarrollador maneje la logica de "cual es el current". Sin auto-collapse ni truncation built-in — Paste considera que la arquitectura de informacion de Twilio Console es suficientemente plana para no necesitarlo.

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| Children-based composition | Flexibilidad total por item; trade-off: mas codigo boilerplate | M | Preferible si necesitas items con contenido custom |
| Sin truncation | Twilio Console tiene jerarquias planas; trade-off: no escala a paths profundos | M | Solo OK si puedes garantizar < 5 niveles |

**Notable Props:** Composable children, separator automatico.
**A11y:** `<nav aria-label="breadcrumb">` con `<ol>`, `aria-current="page"` en current item.

---

### Salesforce Lightning — "Enterprise con truncation en anchos estrechos"

Lightning breadcrumbs truncan automaticamente el texto de items individuales cuando el ancho disponible es limitado. Esto es diferente del collapse de Spectrum (que oculta items completos): Lightning mantiene todos los items visibles pero con texto acortado y tooltip on hover. Apropiado para Salesforce CRM donde los nombres de records pueden ser muy largos ("Acme Corporation West Coast Division Q4...").

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| Text truncation per item (no collapse) | Mantiene todos los items visibles; trade-off: items truncados pueden ser poco informativos | H | Util si tus items tienen nombres largos |
| Tooltip on truncated text | Revela texto completo; trade-off: no funciona en touch | M | Necesario si truncas texto |

**Notable Props:** Truncation automatica por ancho, tooltip integrado.
**A11y:** `<nav>` con `<ol>`, `aria-current` en current.

---

### GitHub Primer — "Slash separator como path convention"

Primer usa "/" (slash) como separador, coherente con la convencion de file paths y URLs de GitHub. Esta decision parece menor pero comunica inmediatamente "esto es un path" en el contexto de repositorios de codigo. Minimalista: sin truncation, sin collapse, sin dropdown — es un breadcrumb de 2-4 items para la navegacion de repositorios.

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| Slash "/" como separador | Coherencia con paths de archivos/URLs; trade-off: menos convencional para no-developers | H | Ideal si tu audiencia es tecnica o si navegas file systems |

**Notable Props:** Separator "/" fijo.
**A11y:** `<nav>` con `<ol>`, `aria-current="page"`.

---

### shadcn/ui — "Composable con BreadcrumbEllipsis para truncation"

shadcn/ui ofrece un breadcrumb altamente composable con sub-componentes dedicados: `BreadcrumbSeparator` (acepta custom content, default ChevronRight), `BreadcrumbEllipsis` (componente explicito para representar items colapsados), y `BreadcrumbLink` vs `BreadcrumbPage` (separacion semantica link vs current page). `BreadcrumbEllipsis` es un componente que el desarrollador posiciona manualmente en el breadcrumb — a diferencia de Spectrum donde el collapse es automatico.

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| `BreadcrumbEllipsis` como componente | Truncation explicita y posicionable; trade-off: requiere logica manual | H | Flexible pero mas trabajo que auto-collapse |
| `BreadcrumbLink` vs `BreadcrumbPage` | Separacion semantica clara; trade-off: mas componentes en API | M | Modelo limpio para distinguir navegable vs current |
| Separator como sub-componente | Custom separador por posicion; trade-off: mas verbose | M | Util si necesitas separadores diferentes en distintas posiciones |

**Notable Props:** `BreadcrumbSeparator`, `BreadcrumbEllipsis`, `BreadcrumbLink`, `BreadcrumbPage`.
**A11y:** `<nav>` con `<ol>`, `aria-current="page"` en `BreadcrumbPage`. Separators `aria-hidden`.

---

### Fluent 2 (Microsoft) — "BreadcrumbButton vs BreadcrumbLink para semantica correcta"

Fluent 2 hace una distincion semantica importante: `BreadcrumbButton` para acciones in-page (abrir folder picker, cambiar contexto sin navegacion URL) vs `BreadcrumbLink` para navegacion URL real. Esta es la separacion correcta desde perspectiva ARIA pero raramente implementada en otros sistemas. Soporta iconos en items y tres tamanos (small, medium, large).

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| Button vs Link sub-components | Semantica ARIA correcta para acciones vs navegacion; trade-off: decision adicional por item | H | Importante si algunos items disparan acciones in-page |
| Icon support en items | Iconos de folder/file; trade-off: complejidad visual adicional | M | Util para file browsers o navegacion con iconos de seccion |
| 3 tamanos (S/M/L) | Adaptacion a contextos densos vs estandar; trade-off: mas variantes que mantener | M | Necesario si usas breadcrumbs en sidebars vs headers |

**Notable Props:** `BreadcrumbButton`, `BreadcrumbLink`, `size`, icon support, `current: boolean`.
**A11y:** `<nav>` con `<ol>`, `aria-current="page"` en current item.

---

### GOV.UK — "collapseOnMobile muestra solo el padre"

GOV.UK tiene el approach mas agresivo para mobile: `collapseOnMobile` colapsa TODO el breadcrumb a mostrar solo el parent directo del current page. Esto refleja su filosofia de gobierno: en mobile, el usuario solo necesita saber "como vuelvo un nivel arriba", no todo el path. Server-rendered via Nunjucks macros. Explicitamente NO recomendado para flujos transaccionales/formularios.

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| `collapseOnMobile` solo muestra parent | Maximo ahorro de espacio mobile; trade-off: pierde contexto de path completo | H | Agresivo pero efectivo para mobile-first con jerarquias profundas |
| No en flujos transaccionales | Breadcrumbs confunden en formularios multi-step; trade-off: necesitas otro patron para wizards | M | Correcto — usa Steps/Stepper para flujos transaccionales |

**Notable Props:** `collapseOnMobile: boolean`.
**A11y:** `<nav aria-label="Breadcrumb">` con `<ol>`.

---

### Radix UI — "HTML semantico puro, sin opiniones visuales"

Radix provee estructura semantica correcta (`nav > ol > li > a`) con separadores CSS-generated y `aria-hidden`. Sin handling de overflow, sin truncation, sin collapse — es una base sin opinion para construir encima. Los separadores son pseudo-elementos CSS, no elementos DOM.

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| Separadores via CSS pseudo-elements | Zero DOM overhead; trade-off: no customizable via props | M | Ideal si tus separadores son siempre el mismo caracter |

**A11y:** Estructura correcta `nav > ol > li > a`, `aria-current` manual.

---

### Chakra UI — "isCurrentPage desactiva el link automaticamente"

Chakra simplifica el pattern "current page": `isCurrentPage` en un `BreadcrumbItem` automaticamente aplica `aria-current="page"` y convierte el link en texto no-interactivo. `BreadcrumbSeparator` acepta cualquier contenido. El prop `as` permite polymorphic rendering del link.

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| `isCurrentPage` auto-desactiva link | Menos boilerplate; trade-off: menos control granular | M | Conveniente para la mayoria de casos |

**Notable Props:** `isCurrentPage`, `separator` custom, `as` polymorphic.
**A11y:** `aria-current="page"` automatico, separators `aria-hidden`.

---

### Orbit (Kiwi.com) — "Breadcrumb como navegacion de funnel con estado"

Orbit redefine el breadcrumb: en vez de navegacion de sitemap, es un tracker de progreso de booking funnel. `onGoBack` permite navegacion back con preservacion de estado del formulario — critico en flujos de reserva de viajes donde perder el estado es costoso. En mobile, colapsa a mostrar solo "previous + current".

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| `onGoBack` preserva estado | Navegacion back sin perder datos de formulario; trade-off: acopla breadcrumb a estado de app | H | Critico para flujos transaccionales con estado |
| Collapse mobile a prev+current | Ahorro de espacio respetando context minimo; trade-off: pierde path completo | M | Balance entre GOV.UK (solo parent) y sin collapse |

**Notable Props:** `onGoBack` callback, mobile collapse automatico.

---

### Nord (Nordhealth) — "EHR deep-hierarchy con URLs compartibles"

Nord maneja jerarquias profundas de EHR (Electronic Health Records) donde cada nivel tiene una URL compartible. `nord-breadcrumb-item` sin `href` automaticamente se marca como `aria-current="page"`. Web Components composables. Agrega explicitamente `role="list"` para preservar semantica en browsers que la eliminan de listas con CSS custom.

**Design Decisions:**
| What | Why (tradeoff) | Impact | Para tu caso |
|------|----------------|--------|-------------|
| `role="list"` explicito | Preserva semantica en Safari/VoiceOver; trade-off: redundante en la mayoria de browsers | M | Best practice — todos deberian hacerlo |
| Sin `href` = current page | Convencion simple; trade-off: asume que current page no tiene su propio enlace | M | Elegante y reduce API surface |

**Notable Props:** Web Components, `href` presence/absence determina current.
**A11y:** `role="list"` explicito, `aria-current` automatico.

---

### Gestalt (Pinterest), Base Web (Uber), Mantine

**Gestalt:** API data-array (`items: [{href, label}]`), deteccion automatica de current page (ultimo item), sin soporte de separador custom. Simple y opinado.

**Base Web:** Override-based, separador custom, StyledLink integration. Minimalista.

**Mantine:** Children-as-items, cualquier React node como separador. Notablemente, NO aplica automaticamente `<nav>` ni `aria-current` — el desarrollador debe agregarlos manualmente. Documentado como gap de a11y conocido.

---

## Pipeline Hints

**Archetype recommendation:** inline-action
Rationale: Breadcrumb es una lista horizontal de links sin chrome (sin bg, sin border, sin shadow). Encaja en inline-action por ser acciones de navegacion presentadas inline, chromeless.

**Slot consensus:**
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| icon | icon | no | 4/21 (Ant, Fluent 2, shadcn, items con icono) | Icon leading en cada BreadcrumbItem. Boolean toggle. |
| label | text | yes | 21/21 | Texto del breadcrumb item. Siempre presente. |
| separator | internal | yes | 21/21 | "/" o ">" entre items. Interno, no slot — aria-hidden. |
| ellipsis | internal | no | 8/21 (Spectrum, Atlassian, shadcn, Cedar, GOV.UK, Orbit, Fluent, Chakra) | Truncation indicator para paths largos. |
| dropdown-menu | container | no | 1/21 (solo Ant Design) | Menu de siblings por item. Excluido — demasiado especifico. |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| State (en .BreadcrumbItem) | state | default/hover/focus/pressed/disabled | 21/21 | Items son links interactivos |
| IsCurrent | boolean | true/false | 18/21 | Current page = non-interactive, aria-current="page" |
| Size | variant | sm/md | 4/21 (Spectrum, Fluent 2, Lightning, Nord) | Mayoria no tiene Size — solo un tamano |
| hasIcon | boolean | true/false | 4/21 | Icono leading en item |
| hasEllipsis | boolean | true/false | 8/21 | Muestra truncation "..." |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| IsCurrent | 18/21 | false | Marca item como pagina actual, no-interactivo |
| hasIcon | 4/21 | false | Icono leading en BreadcrumbItem |
| hasEllipsis | 8/21 | false | Muestra indicador de truncation en Breadcrumb principal |
| showRoot | 2/21 (Spectrum, Atlassian) | false | Root siempre visible durante collapse |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 21/21 | Link color (interactive fg), no underline | Base appearance |
| hover | 18/21 | Underline text | Link hover convention |
| focus | 18/21 | Focus ring 2px | Keyboard navigation, WCAG 2.4.7 |
| pressed | 12/21 | Darker fg, underline | Active click state |
| disabled | 6/21 | Opacity 0.5, no cursor pointer | Per-item disable via isDisabled |
| current | 18/21 | Bold/semibold weight, no link styling, fg primary text | NOT a state — implemented as IsCurrent boolean |

**Exclusion patterns found:**
- disabled x hover/focus/pressed — universal (disabled blocks all interaction)
- IsCurrent=true x hover/focus/pressed — 18/21 (current page item is non-interactive, no link states)
- IsCurrent=true x disabled — logico (current page no puede estar disabled)

**Building block candidates:**
- `.BreadcrumbItem` — 21/21 systems have named child component (BreadcrumbItem, BreadcrumbsItem, CdrBreadcrumbItem). Sub-component with own states (default, hover, focus, pressed) and IsCurrent boolean. The Breadcrumb parent is a container of BreadcrumbItem instances with separators injected between them.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| separator (visual, not prop) | "/" (slash), ">" (chevron), ChevronRight icon | 21/21 | Internal rendering — not exposed as variant prop |

**A11y consensus:**
- Primary role: `navigation` landmark (`<nav>`) — 21/21 consensus
- Required ARIA: `aria-label="Breadcrumb"` on `<nav>`, `aria-current="page"` on current item
- Keyboard: Tab navigates between link items, Enter activates link. No arrow key navigation (items are independent links, not a composite widget).
- Focus: Linear (Tab/Shift+Tab) — each item is a separate tab stop. NOT roving tabindex.
- APG pattern: Breadcrumb (WAI-ARIA Practices)
- Separators: `aria-hidden="true"` — decorative, not announced by screen readers
- Structure: `<nav>` > `<ol>` > `<li>` > `<a>` — ordered list communicates hierarchy
- Nord edge case: explicit `role="list"` on `<ol>` to preserve semantics in Safari/VoiceOver

---

## What Everyone Agrees On

1. **`<nav aria-label="Breadcrumb">` wrapper**: Todos los 21 sistemas que implementan breadcrumb usan un landmark `<nav>` con label descriptivo. La razon: breadcrumb es navegacion secundaria y necesita un landmark distinto del nav principal para que screen readers los distingan.

2. **`<ol>` ordered list para items**: El orden importa — los items representan jerarquia de lo general a lo especifico. Usar `<ul>` seria semanticamente incorrecto porque implicaria que el orden no importa.

3. **`aria-current="page"` en el item actual**: El ultimo item (current page) debe tener `aria-current="page"` y ser non-interactive (texto, no link). Navegar a donde ya estas es un anti-pattern.

4. **Separadores aria-hidden**: Los separadores ("/" o ">") son decoracion visual — screen readers leen la lista y entienden la jerarquia sin ellos. Anunciar "slash" entre cada item seria ruido.

5. **Items son links independientes (no composite widget)**: A diferencia de Tabs o RadioGroup, breadcrumb items son links individuales con Tab navigation normal. No necesitan arrow keys ni roving tabindex — cada item es un tab stop independiente.

6. **Chromeless (sin chrome de contenedor)**: Ningun sistema aplica background, border, o shadow al contenedor breadcrumb. Es una lista de links inline, transparente.

---

## Where They Disagree

**"Como manejar paths largos con muchos niveles?"**
- **Option A: Auto-collapse a dropdown menu** (Spectrum) — Detecta overflow automaticamente y colapsa items intermedios en un menu. Upside: zero config, responsive. Downside: items ocultos requieren click extra para descubrir.
- **Option B: `maxItems` explicito con expand in-place** (Atlassian) — El desarrollador define cuantos items mostrar. Upside: layout predecible. Downside: requiere configuracion manual.
- **Option C: `BreadcrumbEllipsis` manual** (shadcn/ui) — El desarrollador posiciona un componente "..." donde quiera. Upside: maximo control. Downside: mas codigo.
- **Option D: Sin truncation** (Carbon, Primer, Paste) — Paths cortos no necesitan truncation. Upside: simple. Downside: no escala.
- Para tu caso: Si tus paths pueden ser > 4 niveles, necesitas collapse. Auto (Option A) es el mas robusto.

**"Separador: slash, chevron, o custom?"**
- **Option A: Slash fijo "/"** (Primer, Carbon, Radix) — Convencional para paths de archivos y URLs. Mejor para audiencia tecnica.
- **Option B: Chevron ">" o ChevronRight icon** (shadcn, Fluent 2, GOV.UK) — Mas convencional para navegacion web. Comunica "drill down" direccionalmente.
- **Option C: Separador configurable** (Ant, Chakra, Mantine) — Maximo control pero riesgo de inconsistencia cross-product.
- Para tu caso: Chevron icon es el mas universal para aplicaciones web no-tecnicas.

**"El current page item debe ser un link?"**
- **Option A: Non-interactive text** (Carbon, Chakra, shadcn, Nord) — El current page no deberia ser clickeable porque ya estas ahi.
- **Option B: Link deshabilitado visualmente** (algunos sistemas) — Es un link pero styled como texto normal.
- Para tu caso: Non-interactive text es la convencion correcta — `aria-current="page"` + texto no-clickeable.

**"Se necesitan tamanos (Size)?"**
- **Option A: Un solo tamano** (mayoria — Carbon, Atlassian, Ant, Primer, shadcn, Paste) — Breadcrumb vive en una posicion fija del layout, no necesita escalar.
- **Option B: 2-3 tamanos** (Spectrum S/M, Fluent 2 S/M/L) — Para contextos densos (sidebars) vs estandar (header).
- Para tu caso: Un solo tamano es suficiente para la mayoria de apps. Agrega Size solo si usas breadcrumbs en sidebars Y headers.

**"Dropdown menus en items para navegacion lateral?"**
- **Option A: Sin dropdown** (20/21 sistemas) — Breadcrumb solo navega verticalmente (up/down en jerarquia).
- **Option B: Dropdown con siblings** (Ant Design) — Cada item puede tener menu de paginas hermanas.
- Para tu caso: Excluir dropdown — demasiada complejidad para un beneficio de nicho. Si necesitas navegacion lateral, usa un menu separado.

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Linear path | Items separados por "/" o ">" en linea horizontal | Standard, paths cortos (2-5 items) | Carbon, Primer, Paste, Chakra |
| Collapsible path | Items intermedios colapsan a "..." con expand | Paths profundos (5+ niveles) | Spectrum, Atlassian, shadcn, Cedar |
| Mobile collapse | Solo muestra parent directo en mobile | Mobile-first con jerarquias profundas | GOV.UK, Orbit |
| Icon + label | Icono leading en cada item (folder, home) | File browsers, navegacion visual | Fluent 2, Ant Design |

### ASCII Wireframes

**Linear path (standard):**
```
Home  /  Products  /  Category  /  Current Page
 ▶       ▶            ▶            (bold, non-link)
```

**Collapsible path:**
```
Home  /  ...  /  Category  /  Current Page
 ▶      [▼]      ▶            (bold, non-link)
         │
         ├─ Level 2
         ├─ Level 3
         └─ Level 4
```

**Mobile collapse (GOV.UK):**
```
< Parent Page
  (back arrow + parent name only)
```

**Icon + label:**
```
🏠 Home  >  📁 Products  >  📁 Category  >  Current Page
```

---

## Risks to Consider

1. **Truncation complexity** (HIGH) — Si implementas auto-collapse o ellipsis, necesitas manejar: (a) accesibilidad del menu/expand trigger, (b) logica de que items colapsar (middle-out), (c) responsive behavior. Sin truncation, paths de 6+ items desbordan el contenedor.

2. **Current page item accesibilidad** (MEDIUM) — Si el current page item es un link (aunque styled como texto), screen readers lo anunciaran como link y usuarios intentaran navegar a el. Debe ser texto no-interactivo con `aria-current="page"`.

3. **Separator en RTL** (MEDIUM) — Chevron ">" apunta a la derecha en LTR pero necesita invertirse en RTL. Slash "/" es bidireccional. Si tu app soporta RTL, el separador debe ser logico (CSS `transform: scaleX(-1)` en chevron para RTL).

4. **Keyboard focus visible en items deshabilitados** (LOW) — Items con `isDisabled` deben mantener `aria-disabled="true"` pero NO recibir focus (a diferencia de disabled en composites donde mantienen focus). Breadcrumb items son links independientes — disabled = skip en tab order.

---

## Next Steps

```
/spec breadcrumb      → outputs/breadcrumb-config.json
/enrich breadcrumb    → outputs/breadcrumb-enriched.md + updated config.json
/generate breadcrumb  → Figma components
/figma-qa             → audit + auto-fix
```

O usa `/build breadcrumb` para ejecutar todo el pipeline en un comando.
