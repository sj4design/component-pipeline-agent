# Pagination — Component Research

**Fecha:** 2026-04-10
**Modo:** --max (all patterns, no scope filter)
**Sistemas analizados:** 24 (all tiers)
**Componente:** Pagination (page navigation control)

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Material Design 3 | Filosofia mobile-first con scroll infinito; no formaliza paginacion numerada | Button "Load more" + LinearProgressIndicator |
| Spectrum (Adobe) | Virtualizacion de listas reemplaza paginacion; `onLoadMore` callback | `onLoadMore` en ListBox/TableView para carga progresiva |
| Fluent 2 | No tiene componente standalone; DataGrid tiene paginacion integrada | Composicion con Button + Select + Text primitivos |
| Nord | APIs clinicas (FHIR bundles) usan esquemas diversos; componente generico seria contraproducente | Load-more patterns para historiales clinicos |

---

## How Systems Solve It

### Carbon (IBM) -- "La paginacion enterprise mas completa"

Carbon ofrece la implementacion de paginacion mas robusta entre los sistemas Tier 1. Su enfoque refleja los casos de uso de IBM Cloud: tablas administrativas con miles de registros donde los usuarios necesitan control granular sobre cuantos items ven por pagina y donde estan en el dataset. El componente integra un selector de tamano de pagina (rows-per-page) directamente dentro del Pagination, no como un Select separado. Esto elimina la fragmentacion de controles que ocurre cuando el designer debe componer la paginacion manualmente.

La decision mas notable es el modo `pagesUnknown`, que renderiza "Page 5 of many" cuando el servidor no puede reportar el total de items. Este patron es esencial para paginacion server-side de datasets masivos donde contar el total seria costoso. Carbon tambien incluye `PaginationSkeleton` para estados de carga, y un sistema completo de i18n con props dedicados para cada texto visible (`itemsPerPageText`, `backwardText`, `forwardText`).

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| Page size selector integrado | Enterprise tables necesitan switching entre 10/25/50/100 rows | HIGH | Incluir como boolean `sizeChanger` |
| `pagesUnknown` mode | Server-side pagination de datasets masivos sin total count | HIGH | Considerar un estado "simple" sin total |
| PaginationSkeleton | Loading state para la barra completa de paginacion | MED | Boolean loading o skeleton pattern |
| Full i18n props | Productos IBM se despliegan globalmente | MED | Text properties editables para labels |

**Notable Props:** `pageSize`, `pageSizes[]`, `totalItems`, `pagesUnknown: boolean`, `onChange: ({page, pageSize})`, `PaginationSkeleton`

**Accessibility:** `<nav aria-label="pagination">` wrapper. `aria-current="page"` en boton activo. Prev/Next con `aria-label` descriptivo. Page size select es `<select>` nativo con label asociado.

---

### Polaris (Shopify) -- "Paginacion cursor-based sin numeros de pagina"

Polaris toma el enfoque mas minimalista: solo botones Previous y Next, sin numeros de pagina, sin selector de tamano de pagina. Esto refleja directamente la arquitectura de la API de Shopify, que usa cursor-based pagination donde el total de paginas es desconocido. Los merchants de Shopify navegan secuencialmente por ordenes y productos; saltar a la pagina 47 no es un workflow de merchant.

Los booleans `hasPrevious` y `hasNext` controlan la habilitacion de los botones, mapeando directamente a los tokens de cursor que retorna el servidor. El `label` slot permite renderizar el rango actual ("Showing 1-25 of 150 products") para dar contexto sin botones numerados.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| Solo prev/next, sin numeros | Cursor-based API no tiene total count | HIGH | Modelo alternativo "simple mode" |
| `hasPrevious`/`hasNext` booleans | Mapeo directo a tokens de cursor del API | MED | Estado disabled de botones |
| `label` para rango actual | Contexto sin numeros de pagina | MED | Slot de texto opcional para total/rango |

**Notable Props:** `hasPrevious`, `hasNext`, `onPrevious`, `onNext`, `label`

**Accessibility:** Prev/Next son `<button>` con `aria-label`. Disabled usa atributo `disabled`. Sin `aria-current` porque no hay page numbers.

---

### Atlassian -- "Ellipsis automatico con calculo de ventana"

Atlassian renderiza botones de pagina numerados con ellipsis automatico y calculo de rango. El prop `max` limita los botones visibles totales (con ellipsis para overflow). Lo que distingue a Atlassian es que el calculo de la ventana visible es completamente automatico: el consumer pasa el array de paginas y `max`, y Atlassian decide donde colocar los ellipsis ("1 2 3 ... 8 9 10") sin matematica del lado del consumer.

El `selectedIndex` es 0-based (no 1-based como la mayoria), consistente con los patrones de API 0-indexed del resto del design system de Atlassian. Esto puede ser fuente de confusion pero es internamente coherente.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| Auto-ellipsis con `max` prop | Elimina calculo de ventana en el consumer | HIGH | Ellipsis como pattern visual obligatorio |
| 0-based selectedIndex | Consistencia con API patterns de Atlassian | LOW | Usar 1-based (mas intuitivo para designers) |
| Sin page size selector | Scope deliberadamente reducido | MED | Agregar como optional boolean |

**Notable Props:** `pages[]`, `selectedIndex`, `max: number`, `onChange`

**Accessibility:** `<nav aria-label="pagination">`. `aria-current="page"` en pagina activa. Ellipsis son `aria-hidden`. Prev/Next con `aria-label`.

---

### Ant Design -- "Maxima configurabilidad con quick jumper"

Ant Design es el sistema mas configurable para paginacion. `showQuickJumper` agrega un input de texto "Go to page" para datasets con cientos de paginas -- unico entre Tier 1 y esencial para las interfaces admin data-heavy de Alibaba. `showSizeChanger` agrega un Select de rows-per-page. `showTotal` es una funcion de render para texto personalizado del total. El modo `simple` renderiza solo prev/next con un input de pagina, y `responsive` auto-switch a modo simple en viewports pequenos.

La riqueza de opciones refleja el ecosistema de Alibaba donde una sola tabla puede tener millones de registros y el usuario necesita navegar a una pagina especifica rapidamente. El tradeoff es complejidad: 6+ booleans/props solo para paginacion.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| `showQuickJumper` | Datasets con cientos de paginas en admin Alibaba | HIGH | Boolean property en Figma |
| `showTotal` render function | Texto dinamico para total/rango | HIGH | Boolean + text property |
| `responsive` auto-switch | Degradacion mobile automatica sin codigo extra | MED | Considerar simple mode como variante responsive |
| `disabled` global | Deshabilitar toda la paginacion durante loading | MED | Boolean disabled |

**Notable Props:** `showQuickJumper`, `showSizeChanger`, `showTotal`, `simple`, `responsive`, `disabled`, `size: default|small`

**Accessibility:** `aria-current="page"` en pagina activa. Estructura `<ul>` para items. Quick jumper input con label. Prev/Next con atributos `title`.

---

### Twilio Paste -- "Nav landmark con currentPage + pageCount"

Paste implementa paginacion con `<nav>` landmark y una combinacion de Previous/Next + botones de pagina numerados. Usa `currentPage` y `pageCount` como props principales en lugar de un array de paginas. La logica de ellipsis es interna. El enfoque es directo y bien documentado con foco en accesibilidad.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| `currentPage` + `pageCount` en vez de array | API mas simple para el consumer | MED | Derivar ellipsis internamente |
| Nav landmark obligatorio | Accesibilidad como primera clase | HIGH | Siempre usar `<nav>` wrapper |

**Notable Props:** `currentPage`, `pageCount`, Previous/Next buttons

**Accessibility:** `<nav aria-label="Pagination">`, `aria-current="page"`.

---

### Salesforce Lightning -- "Paginator simplificado prev/next"

Lightning toma un enfoque similar a Polaris: solo Previous/Next arrows con indicador de pagina actual. No muestra botones de pagina individuales. Mas simple pero menos navegable para datasets grandes.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| Solo prev/next sin numeros | Simplificacion para el ecosistema Salesforce | MED | Alternativa "simple mode" |
| Indicador de pagina central | Contexto minimo | LOW | Texto de pagina actual |

---

### GitHub Primer -- "Paginacion link-based para URLs"

Primer usa paginacion basada en links (no botones), donde cada pagina es una URL navegable (?page=2). Esto es preferible para SEO y URLs compartibles. Maneja page counts grandes con ellipsis. El enfoque URL-based es fundamentalmente diferente al button-based de Ant/Carbon.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| Link-based, no button-based | SEO + URLs compartibles | HIGH | Decidir link vs button semantica |
| Ellipsis para page count grande | Misma solucion universal | MED | Pattern de truncation |

**Accessibility:** `<nav>`, `aria-current="page"`, links con `aria-label="Page N"`.

---

### shadcn/ui -- "Composable con PaginationEllipsis"

shadcn/ui expone Pagination como componente composable con sub-componentes: `PaginationEllipsis`, `PreviousPage`, `NextPage`, `PageNumber`. Es link-based por defecto. El approach composable da maxima flexibilidad al developer pero requiere mas trabajo de ensamblaje.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| Composicion con sub-componentes | Maxima flexibilidad de layout | MED | Sub-componentes en Figma |
| Link-based por defecto | Consistente con Primer | MED | Link vs button decision |

---

### Radix UI -- "Siblings prop para ventana de paginas"

Radix usa `siblings` prop para controlar cuantas paginas se muestran alrededor de la pagina actual. Ellipsis se insertan automaticamente. `<nav aria-label="pagination">`, `aria-current="page"` en pagina activa.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| `siblings` para control de ventana | Configurable sin exponer logica de ellipsis | MED | Parametro interno, no propiedad Figma |

---

### Chakra UI -- "Composable con count + pageSize"

Chakra expone Pagination como partes composables: Root, PrevTrigger, NextTrigger, Items, PageText. Usa `count` (total items) + `pageSize` para calcular paginas automaticamente. `siblingCount` controla ellipsis.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| `count` + `pageSize` para calculo automatico | Consumer no calcula paginas | MED | Misma logica que Paste |
| Parts composables | Flexibilidad maxima | LOW | Sub-componentes en Figma |

---

### GOV.UK -- "Dos modos: block vs numbered"

GOV.UK formaliza una distincion que otros sistemas ignoran: paginacion block (prev/next con titulos de seccion para contenido secuencial) vs paginacion numbered (para result sets). Block pagination muestra "Previous: How to apply", "Next: What happens after" -- navegacion contextual sin numeros. Numbered es para datasets donde "page 3 of 50" importa.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| Dos modos formalizados (block vs numbered) | Diferentes UX para contenido secuencial vs result sets | HIGH | Considerar si el componente cubre ambos |
| Pure HTML, sin JS | Gobierno necesita accesibilidad maxima | LOW | No aplica a Figma, pero a11y es referencia |

---

### Base Web (Uber) -- "Dropdown selector en vez de botones numerados"

Base Web es el mas arquitectonicamente distinto: usa un dropdown select para navegacion de paginas en vez de botones numerados. Esto escala a page counts arbitrariamente grandes sin adaptacion de UI -- pagina 1 de 1000 renderiza identico a pagina 1 de 10. El tradeoff es que los usuarios pierden el sentido visual de donde estan en el rango.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| Dropdown en vez de botones | Escala a cualquier page count | HIGH | Patron alternativo interesante pero no convencional |

---

### Mantine -- "usePagination hook + boundaries + siblings"

Mantine expone el hook `usePagination` separado del componente visual: retorna el array computado de paginas (cuales mostrar, cuales reemplazar con ellipsis). `boundaries` controla paginas al inicio/final, `siblings` controla paginas alrededor de la actual. `withEdges` agrega botones first/last.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|-------------|
| `boundaries` + `siblings` para ellipsis | Control granular de truncation | MED | Parametros internos |
| `withEdges` para first/last buttons | Navegacion rapida a extremos | MED | Considerar botones first/last como boolean |

---

### Gestalt (Pinterest) -- "Prev/next only con accessibilityLabel obligatorio"

Gestalt, como Polaris, solo tiene prev/next sin botones numerados. Pero se distingue con `accessibilityLabel` como prop requerido, forzando al consumer a etiquetar la navegacion.

---

### Orbit (Kiwi.com) -- "Paginacion de resultados de vuelos"

Orbit tiene paginacion con truncation para page counts grandes, collapso a prev/next en mobile, y control totalmente controlado para data fetching asincrono.

---

### Evergreen (Segment) -- "B2B data table pagination"

Evergreen maneja paginacion para datasets masivos (millones de eventos), con ellipsis truncation para miles de paginas y callbacks granulares `onPreviousPage`/`onNextPage`.

---

### REI Cedar -- "Vue, URL-based, WCAG 2.1 AA"

Cedar usa Vue y navegacion URL-based, similar a Primer. Fuerte foco en WCAG 2.1 AA compliance.

---

### Playbook -- "Dual React/Rails"

Playbook tiene paginacion para navegacion de data lists, con implementacion dual React y Rails.

---

### Wise -- "Transaction history navigation"

Wise tiene paginacion para navegacion de historial de transacciones. Datos limitados.

---

### Dell Design System -- "Enterprise data list navigation"

Dell tiene paginacion para listas de datos enterprise. Datos limitados.

---

## Pipeline Hints

**Archetype recommendation:** inline-action
Rationale: Pagination es una barra horizontal de controles tipo boton (prev/next + page numbers). No es container, no es form-control, no es overlay. Estructura plana con items interactivos inline, identico al patron de botones agrupados.

**Slot consensus:**
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| prev-button | icon-action | yes | 20/20 | Boton Previous, siempre presente |
| next-button | icon-action | yes | 20/20 | Boton Next, siempre presente |
| page-buttons | container | yes | 16/20 | Lista de botones numerados (excluye Polaris, Lightning, Gestalt, Nord) |
| ellipsis | visual | no | 14/20 | Truncation "..." para rangos grandes |
| total-display | text | no | 8/20 | "Showing 1-10 of 100" o similar |
| size-changer | slot | no | 6/20 | Select de rows-per-page (Carbon, Ant, Mantine) |
| quick-jumper | slot | no | 3/20 | Input "Go to page" (Ant, Mantine, Base Web dropdown) |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Size | variant | sm/md/lg | 8/20 | Ant tiene default/small; Carbon no tiene size. Mapear a sm/md/lg |
| State (PageButton) | state | default/hover/focus/pressed/disabled | 20/20 | Aplica a cada page button individual |
| IsCurrent (PageButton) | variant | false/true | 16/20 | Pagina activa cambia bg/fg -- structural change, no solo color |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| quickJumper | 3/20 | false | Input "Go to page" (Ant showQuickJumper) |
| sizeChanger | 6/20 | false | Select rows-per-page (Carbon, Ant) |
| showTotal | 8/20 | false | Display total items/range |
| simpleMode | 5/20 | false | Solo prev/next sin numeros (Ant simple, Polaris, Lightning) |
| disabled | 8/20 | false | Deshabilitar toda la paginacion |
| withEdges | 3/20 | false | Botones first/last page (Mantine withEdges) |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 20/20 | Base appearance, transparent bg, text fg | |
| hover | 18/20 | Bg hover surface, slightly elevated | |
| focus | 18/20 | Focus ring 2px | Keyboard navigation |
| pressed | 14/20 | Darker bg, pressed feedback | |
| disabled | 16/20 | Opacity 0.5, no interaction | First page = prev disabled, last = next disabled |
| current/active | 16/20 | Brand bg + white fg OR underline + bold | Indicates current page |

**Exclusion patterns found:**
- disabled x hover/focus/pressed -- universal (16/16 systems with disabled)
- current x disabled -- current page should never be disabled
- simpleMode x page-buttons -- simple mode hides numbered buttons

**Building block candidates:**
- .PageButton -- 16/20 systems have structured page button items with own states (default/hover/focus/pressed/disabled) + IsCurrent variant. This is the primary BB. Used as instances inside the page-buttons container.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| pageCount | number | 20/20 | Total pages, drives rendering |
| currentPage | number | 20/20 | Active page index |

**A11y consensus:**
- Primary role: `navigation` with `aria-label="Pagination"` (20/20 consensus)
- Required ARIA: `aria-current="page"` on active page button (16/16 systems with numbered pages)
- Keyboard: Tab navigates between prev/next/page buttons; Enter activates page buttons
- Focus: Linear tabbing (each page button is a tab stop) -- NOT roving tabindex
- APG pattern: No formal APG pagination pattern; follows navigation landmark + button patterns
- Prev/Next: `aria-label="Previous page"` / `aria-label="Next page"` (descriptive, not just "Previous")
- Ellipsis: `aria-hidden="true"` (visual decoration, not interactive)
- Page numbers: `aria-label="Page N"` for full context when number alone is ambiguous

---

## What Everyone Agrees On

1. **Nav landmark wrapper**: Toda paginacion va dentro de `<nav aria-label="Pagination">`. 20/20 sistemas con componente lo implementan. Sin esto, screen readers no pueden distinguir la paginacion de otra navegacion.

2. **aria-current="page" en pagina activa**: El unico atributo ARIA que comunica "estas aqui" en un contexto de paginacion. 16/16 sistemas con botones numerados lo usan. Es el equivalente de `aria-selected` para tabs.

3. **Previous/Next siempre presentes**: Incluso los sistemas mas minimalistas (Polaris, Lightning) tienen prev/next. Es el minimo comun denominador de navegacion por paginas.

4. **Disabled en extremos**: Previous se deshabilita en pagina 1, Next se deshabilita en ultima pagina. 16/16 sistemas implementan esto. Feedback inmediato de limites del dataset.

5. **Ellipsis para rangos grandes**: Cuando hay mas de ~7 paginas, se trunca con "..." (1 2 3 ... 8 9 10). 14/20 sistemas implementan ellipsis. Escala la UI sin importar el page count.

6. **Tamano de target >= 44x44px**: Botones de pagina deben cumplir WCAG 2.5.8 (24x24 minimo) y recomendacion tactil (44x44). Touch-friendly por defecto.

---

## Where They Disagree

**"Botones numerados o solo prev/next?"**
- Option A: Botones numerados (Atlassian, Ant, Carbon, Primer, shadcn, Radix, Chakra, Mantine, Paste) -- 14/20 sistemas. Permite saltar a paginas especificas, orientacion visual de posicion.
- Option B: Solo prev/next (Polaris, Lightning, Gestalt) -- 3/20 sistemas. Ideal para cursor-based APIs sin total count.
- Para tu caso: Implementar ambos. Mode default con numeros, boolean `simpleMode` para prev/next only.

**"Page size selector integrado o separado?"**
- Option A: Integrado en el componente (Carbon, Ant) -- selector de rows-per-page es parte de Pagination.
- Option B: Separado (Atlassian, Primer) -- el Select de tamano es un componente independiente.
- Para tu caso: Boolean `sizeChanger` que muestra/oculta un slot de Select integrado. Flexible sin multiplicar frames.

**"Quick jumper (go to page input)?"**
- Option A: Si (Ant, Mantine) -- input para escribir numero de pagina. Esencial para 100+ paginas.
- Option B: No (mayoria) -- raramente necesario si el ellipsis permite saltar eficientemente.
- Para tu caso: Boolean `quickJumper`. Off por defecto. Activo para tablas enterprise con cientos de paginas.

**"Link-based o button-based?"**
- Option A: Links con URLs (Primer, Cedar, shadcn) -- SEO, shareable, back-button friendly.
- Option B: Buttons con JS (Carbon, Ant, Atlassian) -- client-side filtering/sorting.
- Para tu caso: Semantica de boton en Figma (visual es identico). El developer decide link vs button en codigo.

**"Botones first/last page?"**
- Option A: Si (Mantine withEdges, Orbit) -- botones << >> para saltar al inicio/final.
- Option B: No (mayoria) -- ellipsis + click en page 1 / last page es suficiente.
- Para tu caso: Boolean `withEdges`. Low priority pero facil de agregar.

---

## Visual Patterns Found

### Pattern 1: Standard Numbered
```
┌─────────────────────────────────────────────────┐
│  ◀  │ 1 │ 2 │ 3 │ ··· │ 8 │ 9 │ 10 │  ▶  │
└─────────────────────────────────────────────────┘
     prev  pages with ellipsis truncation    next
```
Best for: Tablas de datos, resultados de busqueda, listas paginadas
Adopted by: Atlassian, Ant, Carbon, Primer, shadcn, Radix, Chakra, Mantine, Paste, Evergreen, Orbit

### Pattern 2: Simple (prev/next only)
```
┌───────────────────────────────┐
│  ◀ Previous  │  Next ▶  │
└───────────────────────────────┘
```
Best for: Cursor-based APIs, mobile, contenido secuencial
Adopted by: Polaris, Lightning, Gestalt, GOV.UK (block mode)

### Pattern 3: Full-featured (Carbon/Ant enterprise)
```
┌──────────────────────────────────────────────────────────────────────┐
│ 1-10 of 100 items │ 10 per page ▼ │  ◀  │ 1 │ 2 │ ··· │ 10 │  ▶  │ Go to ___
└──────────────────────────────────────────────────────────────────────┘
  total display        size changer     numbered pages           quick jumper
```
Best for: Enterprise admin tables, dashboards con millones de registros
Adopted by: Carbon (sin quick jumper), Ant Design (completo)

### Pattern 4: Dropdown selector (Base Web)
```
┌───────────────────────────────────┐
│  ◀  │ Page [5 ▼] of 100 │  ▶  │
└───────────────────────────────────┘
```
Best for: Page counts muy grandes donde botones no escalan
Adopted by: Base Web (Uber)

---

## Risks to Consider

1. **Frame explosion con Size x State** (HIGH) -- Si cada page button tiene Size(3) x State(6) x IsCurrent(2) = 36 frames solo para el sub-componente. Mitigacion: IsCurrent como variant (2 values), State como interactive component para hover/focus/pressed (reduce frames visibles a 6).

2. **Inconsistencia ellipsis** (MEDIUM) -- El caracter "..." puede renderizarse como tres puntos, un glifo unicode, o un icono. Mitigacion: Usar un componente dedicado de ellipsis con consistencia tipografica.

3. **Touch target en tamano sm** (MEDIUM) -- Page buttons en size sm pueden caer debajo de 44x44px. Mitigacion: Asegurar minimo 32x32px visible + padding para llegar a 44x44 touch target.

4. **Accesibilidad del quick jumper** (MEDIUM) -- El input "Go to page" necesita label asociado, validacion de rango, y feedback de error si el usuario escribe un numero fuera de rango. Mitigacion: aria-label + aria-invalid + aria-describedby para errores.

---

## Dimension Scores

| Sistema | Completeness | A11y | Flexibility | Consistency | Scalability |
|---------|:----:|:----:|:----:|:----:|:----:|
| Carbon | 9 | 9 | 7 | 9 | 8 |
| Ant Design | 10 | 7 | 10 | 8 | 9 |
| Atlassian | 7 | 9 | 6 | 9 | 7 |
| Polaris | 4 | 8 | 3 | 9 | 5 |
| Paste | 7 | 9 | 6 | 8 | 7 |
| Primer | 7 | 8 | 7 | 8 | 7 |
| Mantine | 8 | 7 | 9 | 7 | 8 |
| Chakra UI | 7 | 7 | 8 | 7 | 7 |
| shadcn/ui | 6 | 7 | 8 | 7 | 6 |
| GOV.UK | 6 | 10 | 5 | 9 | 5 |

---

## Next Steps

1. `/spec pagination` -- Definir anatomia, matriz de variantes, y optimizacion
2. `/enrich pagination` -- Agregar especificacion de interaccion y tokens
3. `/generate pagination` -- Generar componentes en Figma
4. `/figma-qa` -- Auditar y auto-fix calidad de generacion
5. `/build pagination` -- Pipeline completo en un comando
