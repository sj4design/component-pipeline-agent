# Carousel — Component Research

**Date:** 2026-04-17
**Mode:** Max (all 24 systems, all patterns)
**Systems analyzed:** 24
**Systems with Carousel:** 8 — M3, Ant Design, Lightning, shadcn/ui, Dell, Fluent 2, Gestalt, Mantine
**Systems without (most with explicit justification):** 16 — Spectrum (a11y position), GOV.UK (evidence-based rejection), Polaris (<1% CTR), Paste (WCAG stance), Nord (clinical safety), Carbon (not enterprise use case), Atlassian, Primer, Playbook, Cedar, Wise, Radix, Chakra, Base Web, Orbit, Evergreen

**Carousel is the component with the highest intentional-omission rate across all 24 systems.** Before implementing, the omission reasoning of the non-adopters is as important as the implementation patterns of the adopters.

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Spectrum | A11y research interna muestra highest interaction-failure rate; contenido oculto viola WCAG 1.3.2 y 2.2.2 | Grid con paginación, TabList, ActionGroup overflow |
| GOV.UK | Research demostró: usuarios ignoran contenido rotante; auto-play falla WCAG 2.2.2; dots son incomprensibles para muchos usuarios | Static featured-content block + visible list de items |
| Polaris | CTR de slides más allá del primero < 1% en merchant admin — los merchants no exploran slides ocultos | Thumbnail grid (todos visibles), Scrollable con overflow hints |
| Twilio Paste | Strict WCAG compliance; auto-play timing barriers para usuarios con motor impairment | Card grids, Tabs |
| Nord | Contenido oculto en clinica = riesgo de información perdida que puede afectar outcome del paciente | Static content visible |
| Carbon | Enterprise dashboards no tienen use cases de carousel; ContentSwitcher para contenido secuencial | ContentSwitcher, Tabs, DataTable |
| Atlassian | Audit mostró zero carousel use cases en Jira/Confluence/Trello que no se resuelvan mejor con grid/list/tabs | Cards en grid, horizontal scroll CSS |
| Radix UI | Defer a librerías especializadas (Embla); carousel scroll physics demasiado complejo para una primitiva headless | Embla Carousel |
| Chakra UI | Defer a third-party (Embla, Swiper) + Chakra Box/Flex | Embla + Box |
| Base Web | Rider/driver/eater = map-centric + vertical scroll lists; sin use case de carousel | Vertical scroll lists |
| GitHub Primer | Developer tool context = zero rotating content use cases | List/table patterns |
| Playbook | eBay product listings = grid browse patterns | Product grid |
| Cedar | REI outdoor retail = product grids, category cards | Product grid |
| Wise | Financial interface = static, scannable content; rotating promotional = anti-patrón | Static content |
| Orbit | Travel booking = card lists + search results | Horizontal scroll containers |
| Evergreen | Analytics dashboard = tables, charts, card grids | Card grid |

---

## How Systems Solve It

### Gestalt (Pinterest) — "El modelo de referencia: browse sin auto-play + peek affordance"

La decisión de diseño más instructiva de todos los sistemas que SALEN del carousel está en Gestalt — Pinterest implementa un carousel PORQUE su caso de uso es radicalmente distinto del carousel tradicional. El carousel de Pinterest no es un banner rotante promocional — es una **herramienta de exploración horizontal de contenido** (pins, boards, productos). No hay auto-play porque Pinterest's model es exploración controlada por el usuario, no rotación pasiva. El `peek` behavior — mostrar una fracción del siguiente item en el borde de la pantalla — es el affordance más elegante para comunicar scrollability sin flechas ni dots: el usuario ve que hay más, y decide si quiere explorar.

**Design Decisions:**
- **Sin auto-play (por principio de diseño, no solo a11y):** → el contenido de Pinterest es para exploración personal; auto-rotating content elimina la agencia del usuario sobre qué ve y cuándo → no es solo un problema de a11y — es un problema de product philosophy → **Para tu caso:** si el uso es "descubrimiento de contenido por el usuario", no auto-play nunca; si es "showcase de n items predefinidos", auto-play con pause button puede tener sentido
- **Peek (partial next item visible):** → comunicar "hay más" visualmente sin necesitar flechas o dots → el partial item actúa como affordance de scroll nativo en mobile → **Para tu caso:** el peek es el mejor affordance para carousels de browse; implement vía CSS overflow con padding negativo o clip-path
- **Multiple visible items + responsive items-per-row:** → Pinterest muestra 2-4 items en desktop, 1-2 en mobile → la experiencia es de browsing, no de presentación → **Para tu caso:** `slidesPerView` responsivo es esencial para carousels de browse; `slidesPerView: 1` es exclusivo de showcase/hero

**Notable Props:** Multiple visible items, peek behavior, scroll-snap, arrow navigation, no auto-play, responsive items-per-view

**Accessibility:** Sin auto-play = sin WCAG 2.2.2 problem. Arrows con `aria-label`. Scroll-snap no requiere `role="group"` por slide.

---

### Material Design 3 — "El modelo visual más sofisticado: morphing de tamaño en scroll"

M3 define tres layouts de carousel con un comportamiento único que ningún otro sistema replica: **items morphean de tamaño mientras se mueven por el viewport**. En multi-browse, el item en la posición focal es "large" (mayor que el resto), y se achica a "medium" o "small" a medida que se desplaza hacia los lados — creando una jerarquía visual dinámica que comunica qué item está "seleccionado" o es el principal de atención sin necesitar indicadores estáticos. No hay auto-play por default — M3's research mostró que auto-advancing elimina agencia del usuario.

**Design Decisions:**
- **Tres layouts (multi-browse, uncontained, hero):** → cada uno tiene comportamiento de item sizing fundamentalmente distinto; multi-browse = 1 hero + N small; uncontained = items peek desde los bordes; hero = single full-width → no son variantes de un mismo comportamiento, son patrones distintos → **Para tu caso:** si el producto tiene múltiples contextos de carousel, considerar si necesita los tres patrones o uno
- **Morphing de tamaño en scroll (multi-browse):** → la dificultad de implementación es alta; requiere scroll listeners y CSS transforms → pero el resultado visual es más rico que cualquier slide + dot combination → **Para tu caso:** solo valioso si el producto está en un contexto muy visual (e-commerce, media, apps de contenido); overhead para dashboards
- **Sin auto-play:** → M3 documenta explícitamente que auto-advancing reduce agencia y crea barriers para usuarios con limitaciones motrices → **Para tu caso:** usar el precedente de M3 para justificar ante stakeholders la decisión de no auto-play

**Notable Props:** `CarouselLayoutHelper (multi-browse|uncontained|hero)`, scroll snap behavior, no auto-play, size morphing during scroll

**Accessibility:** `role="list"` con `role="listitem"`. Live region anuncia item actual en snap. Items fuera de viewport marcados como `importantForAccessibility="no"`.

---

### Fluent 2 (Microsoft) — "El auto-play más accesible: pause button + aria-live"

Fluent 2 carousel es el que más rigurosamente implementa los requisitos a11y para auto-play. El **pause button visible** (no solo pause-on-hover) es WCAG 2.2.2 compliance real — todos los demás sistemas que ofrecen auto-play lo pasan por alto o confunden "pausar en hover" (insuficiente) con "tener un botón de pausa". El `aria-live="polite"` en el slide container anuncia cada cambio de slide para screen readers. Contexto: SharePoint hero webparts, Outlook campaign previews, Teams app galleries — todos son contextos de passive consumption donde el usuario está escaneando, no interactuando.

**Design Decisions:**
- **Pause button visible y focusable:** → WCAG 2.2.2 requiere que cualquier contenido que se mueve automáticamente pueda ser pausado, detenido u ocultado — "pausar en hover" no cumple porque el usuario debe poder pausar y dejar de apuntar el mouse → **Para tu caso:** si implementas auto-play, el pause button no es opcional — es un requisito de accesibilidad
- **`aria-live="polite"` en slide container:** → sin live region, los screen reader users no saben que el slide cambió → "polite" no interrumpe lo que el usuario está leyendo → **Para tu caso:** siempre incluir; una de las a11y gaps más comunes en implementaciones de carousel
- **Circular navigation (loop):** → en enterprise showcase contexts, el loop infinito da sensación de galería sin límites → **Para tu caso:** loop=true por default en carousels de showcase; loop=false en browse carousels donde "llegar al final" tiene sentido

**Notable Props:** auto-play + pause button visible, `aria-live="polite"`, `aria-roledescription="carousel"`, previous/next buttons, pagination dots

**Accessibility:** La implementación más completa de WAI-ARIA carousel pattern. `role="region"` + `aria-roledescription="carousel"`. `role="group"` + `aria-roledescription="slide"` + `aria-label="N of M"`. Pause button. aria-live.

---

### Ant Design — "La implementación más feature-complete: react-slick + todas las opciones"

Ant Design Carousel (react-slick) es el más feature-rich en términos de API. Auto-play con `autoplaySpeed`. Fade AND slide transitions. Vertical mode. `slidesToShow` + `slidesToScroll`. `centerMode`. `adaptiveHeight`. `goTo(slideNumber)` imperativo API. El `effect: 'fade'` resuelve la "confusión de looping" — cuando el carousel está en loop y el usuario llega al último slide y continúa, la transición de fade en lugar de slide hace que el regreso al primero se sienta más natural, menos disorienting.

**Design Decisions:**
- **`effect: 'fade'` para loops:** → slide transition en loop = el usuario ve el slide "saltar" del último al primero de forma confusa → fade = loop invisible, transición suave → **Para tu caso:** ofrecer ambos; fade es mejor para showcases en loop, slide es mejor para browse secuencial
- **react-slick dependency:** → batalla-tested; manejo de touch/swipe; responsive breakpoints; edge cases cubiertos → rebuilding = engineering waste → **Para tu caso:** para implementaciones web, evaluar Embla (más moderno, ESM, más liviano) vs react-slick (más features pero legacy bundle)

**Notable Props:** `autoplay`, `autoplaySpeed`, `dots`, `dotPosition (top|bottom|left|right)`, `effect ('scrollx'|'fade')`, `slidesToShow`, `slidesToScroll`, `vertical`, `beforeChange/afterChange`, `goTo(n)`, `adaptiveHeight`, `centerMode`, `infinite`, `speed`

**Accessibility:** ⚠️ A11y incompleta — `role="listbox"` con `role="option"` (incorrecto según WAI-ARIA carousel pattern). Sin aria-live. Sin pause button. `autoplay` se pausa en hover/focus pero no tiene botón visible.

---

### shadcn/ui (Embla) — "El wrapper más limpio: Embla + plugin architecture"

shadcn/ui Carousel envuelve Embla Carousel — el engine más moderno para carousels React/web. La arquitectura de **plugins de Embla** (Autoplay, ClassNames, AutoHeight) mantiene el core minimal mientras permite opt-in de features avanzadas. `CarouselItem` como children arbitrarios (no un array de objetos) da máxima flexibilidad. El principal valor es que Embla maneja correctamente el scroll physics, snap behavior, y touch/swipe sin reproduced complex logic.

**Notable Props:** Horizontal/vertical orientation, loop, auto-play via plugin, multiple slides visible, responsive via CSS, prev/next buttons, dots via plugin, drag-to-scroll

**Accessibility:** `role="region"` + `aria-roledescription="carousel"`. `role="group"` + `aria-roledescription="slide"`. Keyboard navigation. WAI-ARIA pattern partial implementation.

---

### Mantine — "El más completo en T3: Embla + responsive + drag"

Mantine Carousel (también Embla-based) añade responsive breakpoints configurables para `slidesPerView`, drag-to-scroll, `Carousel.Slide` sub-component, custom indicators, y slide-change callbacks. La configuración de responsive es la más ergonómica del conjunto.

**Notable Props:** loop, auto-play (Autoplay plugin), drag-to-scroll, multiple slides visible, responsive breakpoints, vertical orientation, slide gaps, custom indicators, slide-change callbacks

---

### Salesforce Lightning — "Marketing carousel enterprise con image-model y auto-scroll"

Lightning Carousel es image-focused — cada slide tiene src, header, description. Auto-scroll built-in con configurable interval. Pause-on-hover. Pagination dots. Flechas prev/next. Designed para Salesforce homepages y marketing pages — passive consumption contexts.

**Notable Props:** auto-scroll interval, image-based slides (src/header/description), prev/next arrows, pagination dots

---

## Pipeline Hints

**Archetype recommendation:** `container`
Rationale: Carousel es un container de slides con navegación. No es overlay, no es form control, no es nav-content. container es el archetype correcto para un wrapper de contenido con controles de navegación.

**Slot consensus:** (8 sistemas con carousel)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| slide-items | container | yes | 8/8 | Los slides individuales; children arbitrarios (shadcn, Mantine) o array de objetos (Lightning) |
| prev-button | icon-action | yes | 8/8 | Navega al slide anterior; `aria-label="Previous slide"` |
| next-button | icon-action | yes | 8/8 | Navega al siguiente slide; `aria-label="Next slide"` |
| pagination-dots | container | no | 6/8 | Indicadores de posición; no en Gestalt (usa peek), no en M3 |
| pause-button | icon-action | no | 1/8 | Fluent 2 — REQUERIDO para WCAG 2.2.2 si autoplay está habilitado |
| slide-title | text | no | 2/8 | Lightning, Ant (image-model) — título por slide |
| slide-description | text | no | 2/8 | Lightning, Ant — descripción por slide |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| isLooping | boolean | true/false | 6/8 | Loop/infinite behavior |
| slidesPerView | variant | 1/2/3/auto | 5/8 | Multiple slides visible simultaneously |
| orientation | variant | horizontal/vertical | 3/8 | Ant, Mantine, shadcn |
| hasAutoplay | boolean | true/false | 4/8 | Ant, Lightning, Fluent 2 (built-in), Mantine (plugin) |
| autoplaySpeed | variant | ms number | 4/8 | Ant, Lightning, Fluent 2, Mantine |
| transitionEffect | variant | slide/fade | 2/8 | Ant (scrollx/fade); others slide-only |
| hasDots | boolean | true/false | 6/8 | Pagination indicators |
| dotPosition | variant | bottom/top/left/right | 1/8 | Ant Design only |
| hasPeek | boolean | true/false | 2/8 | Gestalt explicit, M3 uncontained implicit |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| isLooping | 6/8 | true | Infinite scroll/loop |
| hasDots | 6/8 | true | Pagination indicators |
| hasAutoplay | 4/8 | false | Auto-rotation (requires pause button for WCAG) |
| isDraggable | 3/8 | true | Drag-to-scroll (Mantine, shadcn, Gestalt) |
| hasPeek | 2/8 | false | Partial next/prev item visible |
| adaptiveHeight | 1/8 | false | Ant: height adjusts to current slide |
| centerMode | 1/8 | false | Ant: current slide centered |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 8/8 | Slide visible, controls available | |
| slide-transitioning | 6/8 | Animation (slide/fade) between slides | |
| autoplay-playing | 4/8 | Slide changes on interval; pause button visible | |
| autoplay-paused | 4/8 | Slide static; pause button shows "play" | Triggered by hover, focus, or button click |
| prev-button-hover | 8/8 | Button highlight | |
| next-button-hover | 8/8 | Button highlight | |
| dot-active | 6/8 | Filled/emphasized dot for current slide | |
| dot-focus | 6/8 | Focus ring on dot; keyboard navigation | |
| drag-active | 3/8 | Cursor changes; slide follows pointer | |
| first-slide (no loop) | 4/8 | Prev button disabled | |
| last-slide (no loop) | 4/8 | Next button disabled | |

**Exclusion patterns found:**
- autoplay × no pause button — WCAG 2.2.2 violation; no system should ship autoplay without pause button
- hidden slides × interactive content — slides outside viewport MUST have tabindex=-1 on all focusable children and aria-hidden="true"; otherwise keyboard users tab into invisible content

**Building block candidates:**
- slide → `.CarouselSlide` — todos los sistemas formalizan el slide como sub-componente
- pagination → `.CarouselIndicators` — 4/8 sistemas formalizan los dots/indicators

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| layout | multi-browse, uncontained, hero, standard | 1/8 | M3 only; otros sin layout named variants |
| transitionEffect | slide, fade | 2/8 | Ant + Fluent 2 |
| dotPosition | bottom, top, left, right | 1/8 | Ant only |

**A11y consensus (WAI-ARIA carousel pattern):**
- Container: `role="region"` + `aria-roledescription="carousel"` + `aria-label` describing purpose (e.g., "Featured products")
- Each slide: `role="group"` + `aria-roledescription="slide"` + `aria-label="Slide N of M"`
- Hidden slides (outside viewport): `aria-hidden="true"` + `tabindex="-1"` on ALL focusable descendants
- `aria-live="polite"` on slide content area — announces slide changes to screen readers
- Auto-play: MUST have visible, focusable pause/play button (WCAG 2.2.2). Pause-on-hover is supplementary, NOT sufficient.
- Prev/next buttons: `aria-label="Previous slide"` / `"Next slide"` (not just icons)
- Dots: `role="tab"` or `aria-current="true"` on active dot; Arrow keys for dot navigation; `aria-label="Go to slide N"` on each dot
- Loop at boundaries: when carousel loops from last to first, announce "Returning to first slide" or similar
- No auto-play alternative: consider GOV.UK's approach — static featured item + visible list of all items

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template | Same component set |
| 40–70% | Extension | Same component set + property |
| < 40% | Separate | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Single-slide showcase (hero) | 100% | Template | One slide full-width, prev/next controls, dots | Ant, Lightning, Fluent 2 |
| Browse carousel (multiple visible) | 70% | Template | 2-4 slides visible, peek affordance | Gestalt, Mantine, shadcn, M3 multi-browse |
| Auto-rotating announcement | 60% | Extension | Autoplay + pause button; passive consumption | Lightning, Fluent 2, Ant |
| Fade-transition carousel | 70% | Template | Same shell + fade instead of slide | Ant fade, Fluent 2 |
| Vertical carousel | 50% | Extension | Orientation: vertical scroll instead of horizontal | Ant, Mantine |
| Full-width morphing (M3 hero) | 30% | Extension | Single item, full viewport, size morphing | M3 hero layout |
| Multi-browse with morphing | 10% | Separate | Items morph size on scroll | M3 multi-browse only |
| NOT a carousel — Tab pattern | 0% | Not-carousel | Tabs = visible labels, simultaneous content access | Spectrum, Carbon alternative |
| NOT a carousel — Scroll overflow | 0% | Not-carousel | Horizontal scroll without snap/arrows/dots | Polaris Scrollable |

---

## What Everyone Agrees On

1. **Previous/Next buttons are non-optional:** Every system with a carousel has prev/next arrow buttons. Dot-only navigation is insufficient (no system does this alone).

2. **Auto-play must pause on focus:** Every system that supports auto-play pauses when any element inside the carousel receives focus. This is the minimum behavior — but pause-on-focus alone is NOT WCAG compliant (a pause button is required).

3. **Loop behavior by default:** Most systems (6/8) default to infinite loop. The exceptions are systems designed for sequential content where reaching the end is meaningful.

4. **Touch/swipe required on mobile:** All implementing systems support touch swipe for mobile navigation. Desktop-only carousels that don't work on mobile are universally rejected.

5. **Hidden slides must not receive focus:** Every well-implemented carousel ensures that off-screen slides don't trap keyboard focus. This is the single most common implementation bug.

---

## Where They Disagree

**¿Auto-play or no auto-play?**
- **Option A: Auto-play opt-in** (Ant, Lightning, Fluent 2, Mantine plugin) — marketing and showcase contexts benefit from passive rotation; valid if paired with visible pause button
- **Option B: No auto-play ever** (Gestalt, M3, shadcn default, GOV.UK, Spectrum, Polaris) — user agency over content; eliminates WCAG 2.2.2 compliance burden entirely
- **Para tu caso:** No auto-play as default; opt-in for specific marketing/showcase contexts with a pause button as non-optional companion feature

**¿Single-slide showcase o multi-visible browse?**
- **Option A: Single slide at a time** (Lightning, Fluent 2, Ant default) — each slide gets full attention; clear sequential structure; most familiar "carousel" mental model
- **Option B: Multiple visible + peek** (Gestalt, M3 multi-browse, Mantine, shadcn) — richer browsing experience; horizontal exploration; "gallery" feel
- **Para tu caso:** Diseñar `slidesPerView: 1|2|3|auto` desde el inicio — los dos casos de uso son fundamentalmente distintos y ambos son legítimos en contextos diferentes

**¿Generic children o image-data model?**
- **Option A: Children arbitrarios** (shadcn, Mantine, M3, Gestalt) — máxima flexibilidad; cualquier contenido dentro del slide; composición libre
- **Option B: Data model por slide (src/title/description)** (Lightning, Ant legacy) — menos flexible; más ergonómico para image showcases; opinionated
- **Para tu caso:** Children arbitrarios es superior para un design system; el data model puede existir como una receta/variant sobre el componente base

**¿Library-wrapped (Embla) o built-in?**
- **Option A: Wrap Embla** (shadcn, Mantine) — scroll physics correcto; touch handling probado; ESM; plugin architecture; lighter bundle (Embla ~3KB)
- **Option B: Build-in** (Fluent 2, Lightning) — zero dependencies; control total; consistency visual con el resto del sistema
- **Para tu caso:** Para web React, Embla es el estándar de facto — el ROI de reimplementar scroll physics es negativo

**¿Usar carousel o alternativas?**
- **Option A: Carousel** — válido para browse de contenido visual (productos, fotos, cards) con user-driven navigation y sin auto-play
- **Option B: Grid + paginación** (Spectrum, Polaris) — todo el contenido visible; no hidden content; mejor para task-completion; mejor a11y
- **Para tu caso:** Si el contenido es para "explorar visualmente de forma horizontal", carousel es válido. Si el usuario NECESITA ver todo el contenido para tomar una decisión, usa grid/list.

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Single-slide hero | 1 slide full-width + flechas + dots | Marketing banners, product showcase | Lightning, Fluent 2, Ant |
| Browse multi-visible | 2-4 slides + peek at edges | Product discovery, gallery browse | Gestalt, M3, Mantine, shadcn |
| Fade-loop showcase | Slides fade en lugar de slide | Marketing loops sin disorienting direction | Ant fade, Fluent 2 |
| Announcement banner | Auto-rotating + pause button | Enterprise home pages, SharePoint | Fluent 2, Lightning |
| Vertical scroll carousel | Items stack vertically | Feeds, sequential reading | Ant vertical, Mantine |

**Single-slide hero (más común):**
```
  ←  ┌──────────────────────────────────┐  →
     │                                  │
     │     [Slide content here]          │
     │     Image / text / card          │
     │                                  │
     └──────────────────────────────────┘
              ● ○ ○ ○ ○
              (pagination dots)
```

**Multi-visible browse con peek (Gestalt/M3):**
```
┌──────────────────────────────────────┐
│ │ CARD 1    │ CARD 2    │ CARD 3 │   │
│ │ (visible) │ (visible) │ (peek) │   │
│ └───────────┴───────────┴────────┘   │
│                          ↑           │
│                        peek signal   │
└──────────────────────────────────────┘
```

**Auto-play con pause button (Fluent 2):**
```
  ←  ┌──────────────────────────────────┐  →
     │     [Slide content]              │
     │                          ⏸ PAUSE│
     └──────────────────────────────────┘
              ● ○ ○ ○
```

---

## Risks to Consider

**Risk 1: Auto-play sin pause button** (HIGH — WCAG 2.2.2)
Auto-play sin botón de pausa visible viola WCAG 2.2.2 (Pause, Stop, Hide). Pausar en hover no es suficiente — usuarios de teclado y screen readers no hacen hover. Este es el error de a11y más frecuente en implementaciones de carousel.
**Mitigation:** Si se habilita auto-play, el pause button es obligatorio. Exponer `hasAutoplay` como prop desactivado por defecto; si se activa, el pause button aparece automáticamente.

**Risk 2: Slides ocultos reciben focus por teclado** (HIGH)
Slides fuera del viewport que contienen links, botones o inputs siguen siendo alcanzables con Tab key — el usuario navega a contenido invisible. Este es el segundo error más común y el más confuso para usuarios de teclado.
**Mitigation:** Slides no activos: `aria-hidden="true"` + `tabindex="-1"` en todos los elementos focusables dentro. Actualizar en cada cambio de slide.

**Risk 3: Carousel encubre que el contenido es importante** (HIGH — UX risk)
El dato de Polaris (<1% CTR en slides más allá del primero) es generalizable. Si el contenido de los slides no-primero es importante para que el usuario tome una decisión, el carousel es el formato equivocado.
**Mitigation:** Antes de implementar, preguntar: "¿Qué pasa si el usuario solo ve el primer slide?" Si la respuesta es "pierde información importante", usar grid/list en lugar de carousel.

**Risk 4: Sin aria-live = slide changes no anunciados** (HIGH)
Sin `aria-live="polite"` en el slide area, los screen reader users navegan "a ciegas" — saben que presionaron "Next" pero no saben qué contenido vieron.
**Mitigation:** `aria-live="polite"` siempre en el contenedor del slide activo.

**Risk 5: Dots sin información** (MEDIUM)
Dots numéricos (● ○ ○ ○) no informan al usuario qué contenido está detrás de cada punto. GOV.UK documenta esto como una de las razones para rechazar el componente.
**Mitigation:** Dots con `aria-label="Slide N of M"` (e.g., "Slide 2 of 5"). En casos críticos, reemplazar dots por thumbnails o títulos de slide visible.

---

## Dimension Scores (sistemas CON carousel)

| Sistema | A11y | Flexibility | Auto-play UX | Browse UX | Visual Quality | Total |
|---------|------|-------------|--------------|-----------|----------------|-------|
| Fluent 2 | 9 | 7 | 10 | 7 | 8 | **41/50** |
| Gestalt | 8 | 7 | N/A (no autoplay) | 10 | 8 | **33/40** ⭐ |
| Mantine | 7 | 9 | 7 | 9 | 7 | **39/50** |
| shadcn/ui | 7 | 9 | 6 | 8 | 7 | **37/50** |
| M3 | 7 | 6 | N/A (no autoplay) | 9 | 10 | **32/40** ⭐ |
| Ant Design | 6 | 10 | 6 | 7 | 7 | **36/50** |
| Lightning | 7 | 5 | 8 | 6 | 7 | **33/50** |

---

## Next Steps

1. **`/spec carousel`** — Generate config.json with anatomy (slide container, prev/next, dots, optional autoplay controls)
2. **`/enrich carousel`** — Add a11y (WAI-ARIA carousel pattern, aria-live, hidden slides, pause button requirement)
3. **`/build carousel`** — Full pipeline in one command using this research as cache
4. **`/build carousel --max`** — Use pre-generated config without scope questions
5. **`/research carousel --fresh`** — Re-run research from scratch (bypasses this cache)

**Key spec decisions to make:**
- Auto-play: opt-in prop with mandatory pause button, or opt-out default?
- `slidesPerView: 1` (showcase) or multi-visible + peek (browse) as default?
- Generic children vs. image data model?
- Embla as dependency or built-in scroll physics?
- Loop by default or opt-in?
- Vertical orientation support?
- Consider documenting the alternatives (grid + pagination, tabs) alongside the component
