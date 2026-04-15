# Table — Research Report

**Fecha:** 2026-04-10
**Modo:** --max (all patterns, all systems, no scope filter)
**Sistemas analizados:** 24 (all tiers)
**Componente:** Table / Data Table / Data Grid

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Orbit (Kiwi.com) | Productos de viaje usan card/list para resultados de vuelo | Layouts basados en cards e itinerarios |

Todos los demas 23 sistemas tienen algun tipo de componente tabla o grid de datos.

---

## How Systems Solve It

### Material Design 3 — "Spec sin implementacion: la brecha deliberada entre guia visual y componente de produccion"

Material Design 3 proporciona solo una especificacion visual para tablas — density, indicadores de sort, seleccion de filas — pero no entrega un componente de tabla listo para produccion. Google reconoce que sus propias tablas internas son demasiado personalizadas para un componente generico. MUI llena este vacio con DataGrid en tres niveles comerciales (Community/Pro/Premium), donde el nivel Premium incluye pivoting, agregacion y exportacion a Excel. La v8 introduce el Data Source API con un unico callback `getRows()` que reemplaza multiples event handlers, dejando al grid manejar caching y retry internamente.

**Design Decisions:**
1. **Brecha spec-vs-implementacion intencional** — Google sabe que tablas enterprise son demasiado variadas para un solo componente generico; prefiere que MUI monetice la complejidad. Impact: H. Para tu caso: si tu DS es para producto enterprise, necesitas un wrapper propio o TanStack Table.
2. **Tres niveles comerciales** — Community (gratis, sort/filter/pagination), Pro (column pinning, tree data, lazy loading), Premium (pivoting, aggregation, Excel export). Impact: M. Para tu caso: evalua que features necesitas antes de elegir tier.
3. **`getRows()` single callback** — v8 Data Source API simplifica server-side: un callback reemplaza onSortModelChange + onFilterModelChange + onPaginationModelChange. Impact: M. Para tu caso: si manejas datos server-side, este patron es el mas limpio.

**Notable Props:** `columnVisibilityModel`, `checkboxSelection`, `disableRowSelectionOnClick`, `getRows` (Data Source API v8).
**A11y:** role="grid" + role="row" + role="gridcell"; aria-sort en headers; aria-selected en filas; Tab mueve al siguiente elemento interactivo (no a la siguiente celda).

### Spectrum (Adobe) — "Hooks headless + componente visual: separacion de capas para reutilizacion maxima"

Spectrum divide tablas en dos capas: React Aria hooks (comportamiento/a11y, headless) y React Spectrum TableView (styled). La API usa composicion JSX (`<TableHeader><Column><Row><Cell>`) en vez de arrays de configuracion, lo que permite columnas dinamicas y patrones async como arboles React naturales. Column resizing y async loading son ciudadanos de primera clase con componentes explicitos (`ColumnResizer`, `ResizableTableContainer`). La separacion de hooks permite que cualquier producto Adobe reutilice la logica de teclado/seleccion/ARIA sin atarse al diseño visual de Spectrum.

**Design Decisions:**
1. **Hooks layer compartido** — React Aria hooks comparten logica de keyboard/selection/ARIA entre todos los productos Adobe; previene fragmentacion por copy-paste. Impact: H. Para tu caso: si tienes multiples productos, un layer headless evita duplicacion de a11y.
2. **Composicion JSX sobre config arrays** — Columnas dinamicas y patrones async componen naturalmente como arboles React. Impact: M. Para tu caso: JSX es mas flexible que JSON config para tablas con columnas condicionales.
3. **Column resizing como componente explicito** — `ColumnResizer` y `ResizableTableContainer` son componentes separados porque resizing tiene necesidades complejas de pointer + keyboard + ARIA. Impact: M. Para tu caso: si necesitas resize, hazlo un sub-componente, no un booleano.

**Notable Props:** `sortDescriptor`/`onSortChange` (controlled), `selectionBehavior` (toggle vs. replace), `onLoadMore` (infinite scroll).
**A11y:** La a11y mas profunda investigada; role="grid" para interactivo, role="treegrid" para tree; aria-live para conteo de seleccion; navegacion completa por celdas con Enter/Space/arrow keys.

### Carbon (IBM) — "Operaciones batch y toolbar como ciudadanos de primera clase, no add-ons"

Carbon es action-oriented: la barra de acciones batch y el toolbar son elementos arquitecturales de primera clase. El patron render-prop maneja estado de seleccion/sort/expansion centralmente. Usa elementos nativos `<table>` (no role="grid") para mejor soporte SR por defecto. El batch action bar se desliza al seleccionar filas, reemplazando el toolbar y estandarizando operaciones multi-fila. El toolbar es un componente composable hermano separado — no un prop monolitico.

**Design Decisions:**
1. **Batch action bar como primer ciudadano** — Se desliza al seleccionar filas, reemplaza toolbar; estandariza operaciones multi-fila en productos IBM. Impact: H. Para tu caso: si tu tabla tiene acciones masivas (delete, export, assign), el patron batch bar es el mas probado.
2. **Toolbar como componente hermano** — Toolbar es composable y separado de Table; un toolbar-as-prop se vuelve un objeto de config inmanejable. Impact: M. Para tu caso: componer toolbar separado da mas flexibilidad.
3. **Sort arrows solo en hover** — Reduce ruido visual en dashboards con 10+ columnas. Impact: L. Para tu caso: bueno para tablas densas; malo si los usuarios necesitan ver cual columna esta sorted sin hover.

**Notable Props:** `isSortable`, `useZebraStyles`, `stickyHeader`, `dismissable` (en filas).
**A11y:** Semantica nativa `<table>`; batch action bar anuncia conteo via aria-live; Tab entre elementos interactivos (no navegacion por celdas).

### Polaris (Shopify) — "Dos componentes enfocados: display analitico vs. gestion de recursos"

Polaris divide explicitamente: DataTable (display read-only con totals, datos numericos) vs. IndexTable (gestion de recursos con seleccion, bulk actions). Esta separacion previene combinar features incompatibles. DataTable tiene `totals` built-in para resumenes financieros. IndexTable tiene `promotedBulkActions` vs. `bulkActions` — refleja que el 90% de merchants usan solo 2-3 acciones comunes. `condensed` transforma IndexTable a layout de cards en mobile.

**Design Decisions:**
1. **DataTable vs IndexTable split** — Uno para analytics display, otro para resource management. Impact: H. Para tu caso: si tienes tablas read-only Y tablas de gestion, separarlas evita feature bloat.
2. **`totals` row built-in** — Resumenes financieros son universales en Shopify admin. Impact: M. Para tu caso: si manejas datos financieros/numericos, un summary row es esencial.
3. **`promotedBulkActions` vs `bulkActions`** — Las primeras siempre visibles (delete, edit), las segundas en overflow menu. Impact: M. Para tu caso: priorizar 2-3 acciones principales previene toolbar cluttered.

**Notable Props:** `totals`, `promotedBulkActions`, `condensed` (mobile card layout), `sortable`.
**A11y:** Elementos nativos `<table>`; aria-live para conteo de seleccion; aria-sort en headers sortables; role="rowheader" en primera celda para identificar el recurso.

### Atlassian — "Drag-and-drop ranking como feature built-in con a11y completa"

Atlassian incluye drag-and-drop ranking (`isRankable`) built-in — unico entre todos los sistemas. Space para agarrar + arrow keys para mover + Space para soltar para keyboard ranking. Optimizado para Jira/Confluence con listas moderadas (50-200 filas), no datasets masivos. Pagination sobre virtualization porque la conciencia de posicion ("pagina 3 de 7") importa mas que scroll seamless para project management. Loading state atenua contenido al 20% (no skeleton) para mantener continuidad con datos previos.

**Design Decisions:**
1. **`isRankable` built-in** — Drag-and-drop row reordering con a11y completa; internalizar esto resolvio a11y inconsistente entre equipos. Impact: H. Para tu caso: si necesitas reordenar filas, esto es unico — ningun otro sistema lo resuelve tan bien.
2. **Pagination sobre virtualization** — Posicion awareness ("pagina 3 de 7") importa mas que seamless scroll para PM. Impact: M. Para tu caso: pagination es mejor para datasets moderados; virtualization para 1000+ filas.
3. **Loading = dim al 20%** — No skeleton; continuidad con datos previos previene desorientacion durante reload. Impact: L. Para tu caso: dim es mejor que skeleton cuando los datos cambian poco.

**Notable Props:** `isRankable`, `onRankEnd`, `isFixedSize`, `emptyView`.
**A11y:** Space grab + arrow move + Space drop para keyboard; aria-live para cambios de rank; aria-sort en headers sortables.

### Ant Design — "Maximalist: todo en un componente, virtual scroll + tree + fixed columns + expandable + column filters"

Ant Design es maximalist: virtual scrolling, tree data via `children`, fixed columns (CSS sticky en v5), expandable rows, column-level filter dropdowns, drag-and-drop sort, summary rows, y nested sub-tables — todo en un `<Table>`. v5 refactored fixed columns de DOM duplicado a CSS sticky, habilitando virtual scroll + fixed columns simultaneamente. Column-level `filters` array renderiza dropdown en header — usuarios filtran donde ven los datos. `Table.EXPAND_COLUMN`/`Table.SELECTION_COLUMN` son sentinels explicitos para ordenamiento de columnas.

**Design Decisions:**
1. **Todo en un componente** — Evita decision fatigue sobre cual componente usar; un `<Table>` cubre todos los casos. Impact: H. Para tu caso: si tu equipo prefiere un solo componente configurable vs. familia de sub-componentes.
2. **Column-level filters** — Dropdown en header; usuarios filtran donde ven los datos (no en panel separado). Impact: M. Para tu caso: excelente para dashboards densos; menos util para tablas simples.
3. **`children` field = tree automatico** — No necesita TreeTable separado; jerarquias son pervasivas en enterprise chino. Impact: M. Para tu caso: si manejas datos jerarquicos, el patron `children` es el mas limpio.

**Notable Props:** `virtual`, `sticky` + `offsetHeader`, `Table.EXPAND_COLUMN`, `Table.SELECTION_COLUMN`, `expandable`, `rowSelection`.
**A11y:** Semantica nativa `<table>` preservada en virtual scroll; aria-sort/aria-expanded; a11y menos refinada que Spectrum/Carbon; anuncios SR para posicion virtual minimos. (Weak a11y)

### Paste (Twilio) — "Tabla semantica pura: composicion HTML sin logica de datos built-in"

Paste provee una tabla semantica sin sort/filter/selection built-in. Es presentational-only: `striped`, `bordered`, wrapper scrollable. La logica de datos se delega a TanStack Table o custom hooks. Este approach mantiene el DS liviano y deja la complejidad de datos a librerias especializadas.

**Notable Props:** `striped`, `bordered`, scrollable wrapper.
**A11y:** Semantica HTML nativa completa (`<table>`, `<thead>`, `<th scope>`).

### Lightning (Salesforce) — "Data grid enterprise completo: sort, selection, inline edit, row actions, virtual scroll"

Lightning DataTable es un grid enterprise completo con sort, seleccion, inline edit, row actions y virtual scroll. Es el mas feature-complete de los sistemas evaluados despues de Ant Design. Column resizing y pinning incluidos.

**Notable Props:** `columns` config array, `enableInfiniteLoading`, inline edit, row actions dropdown.
**A11y:** role="grid" con arrow key navigation; aria-sort; keyboard accessible inline editing.

### Primer (GitHub) — "DataTable con sort, row actions, loading skeleton y pagination integrada"

Primer DataTable incluye sort, row actions, loading skeleton y pagination integrada con selection. Orientado a listas de repositorios, issues, pull requests.

**Notable Props:** `sortable` columns, row actions, loading skeleton, pagination.
**A11y:** role="grid"; checkbox selection con aria-label; aria-sort.

### shadcn/ui — "Primitivos semanticos + receta TanStack Table para features completas"

shadcn/ui provee primitivos de tabla semantica (Table, TableHeader, TableBody, TableRow, TableHead, TableCell) y una receta de DataTable construida sobre TanStack Table v8 para sort, filter, pagination, column visibility. La arquitectura es: TanStack maneja datos, shadcn maneja visual.

**Notable Props:** Primitivos composables + TanStack Table integration.
**A11y:** Semantica HTML nativa; a11y depende de la implementacion TanStack.

### Radix UI — "Tabla presentacional pura mapeada a HTML semantico"

Radix Table (Themes) es presentational-only: `Table.Header`, `Table.Body`, `Table.Row`, `Table.ColumnHeaderCell`, `Table.Cell`. `size` para density. Recomienda TanStack Table para data management.

**Notable Props:** `size` (density), interactive row via `onClick`.
**A11y:** HTML semantico nativo.

### Chakra UI — "TableContainer para overflow + variantes striped/simple"

Chakra Table usa `TableContainer` wrapper para scroll horizontal. `variant` (simple/striped/unstyled), `colorScheme` para color de stripes. Presentational only.

**Notable Props:** `variant` (simple/striped/unstyled), `colorScheme`, `size`.
**A11y:** HTML semantico.

### GOV.UK — "Guidance-first: caption requerido, alineacion numerica, scope attributes"

GOV.UK es unico por su approach guidance-first: caption requerido, columnas numericas alineadas a la derecha, `firstCellIsHeader` para row header `<th>`, scope en todos los headers. Nunjucks macro con `head`/`rows` data arrays. Sin JS, sin sorting.

**Notable Props:** `caption`, `firstCellIsHeader`, `head`/`rows`.
**A11y:** La mas estricta: caption obligatorio, scope="col"/scope="row" en todos los headers, alineacion numerica.

### Base Web (Uber) — "Tres niveles: Table basico, Table-grid layout, Data Table completo"

Base Web tiene tres niveles: Table basico HTML, Table-grid (CSS grid layout), y Data Table completo con sorting, type-aware column filtering, y column resizing. Overrides throughout para customizacion.

**Notable Props:** Sorting, type-aware filtering, column resizing, Overrides API.
**A11y:** Semantica HTML; grid pattern para Data Table.

### Fluent 2 (Microsoft) — "DataGrid sobre TanStack Table v8: separacion limpia datos/visual"

Fluent 2 DataGrid esta construido sobre TanStack Table v8: TanStack maneja datos (sort, filter, grouping, pagination, virtualization), Fluent maneja visual y ARIA. `focusMode` ("cell" o "row_unstable"). `aria-rowcount`/`aria-colcount` para grids virtuales. Multi-column sort.

**Notable Props:** `focusMode`, virtualization, multi-column sort, single/multiselect rows, column resizing.
**A11y:** role="grid"; `aria-rowcount`/`aria-colcount` para virtual grids; focus mode configurable.

### Gestalt (Pinterest) — "Sticky header/columns + expandable rows para jerarquia campaign->ad group->ad"

Gestalt Table tiene sticky header y sticky first/last columns; expandable rows para jerarquia campaign->ad group->ad; sortable columns con server-sort callbacks. Orientado a analytics.

**Notable Props:** Sticky header/columns, expandable rows, sortable, server-sort callbacks.
**A11y:** Semantica HTML; aria-sort.

### Mantine — "Tabla presentacional con stickyHeader, striped, highlightOnHover, withColumnBorders"

Mantine Table es presentational con `stickyHeader` + `stickyHeaderOffset`, `striped` ("odd"/"even"), `highlightOnHover`, `withColumnBorders`, `withTableBorder`, `captionSide`. DataTable en paquetes comunitarios.

**Notable Props:** `stickyHeader`, `striped`, `highlightOnHover`, `withColumnBorders`, `withTableBorder`, `captionSide`.
**A11y:** HTML semantico; caption side configurable.

### Evergreen (Segment) — "SearchHeaderCell para filtrado inline por columna en analytics"

Evergreen Table tiene `Table.SearchHeaderCell` para filtro inline as-you-type en header. `Table.Row` con `isSelectable`/`isSelected` para bulk operations. `onScrolled` para infinite loading detection. Orientado a analytics.

**Notable Props:** `Table.SearchHeaderCell`, `isSelectable`/`isSelected`, `onScrolled`.
**A11y:** Semantica HTML.

### Nord (Nordhealth) — "Web component clinico para datos de pacientes, medicacion y lab"

Nord Table es un web component calibrado para datos clinicos: listas de pacientes, resultados de lab, horarios de medicacion. Typography y spacing optimizados para legibilidad numerica clinica. Headers `sortable`.

**Notable Props:** `sortable` headers, slot structure semantico.
**A11y:** HTML semantico nativo.

### Playbook, Cedar, Wise, Dell — "Tablas basicas de display"

Estos sistemas proveen tablas basicas de display con variantes de density y styling. Cedar destaca por layout responsive stacked para mobile (unico entre todos). Dell es enterprise data grid.

---

## Pipeline Hints

**Archetype recommendation:** grid-tabular
Rationale: La tabla es un grid de datos estructurado con filas/columnas, seleccion, sort, y operaciones batch. Todos los sistemas la implementan como grid tabular, no como container o composite.

**Slot consensus:**
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| header-row | container | yes | 23/23 | Fila de encabezados de columna |
| header-cell | text | yes | 23/23 | Celda de encabezado individual con sort indicator |
| body | container | yes | 23/23 | Contenedor de filas de datos |
| data-row | container | yes | 23/23 | Fila de datos individual |
| data-cell | text | yes | 23/23 | Celda de datos individual |
| checkbox-column | icon-action | no | 14/23 | Columna de seleccion con checkbox |
| expand-column | icon-action | no | 8/23 | Columna de expansion para filas expandibles |
| sort-indicator | icon | no | 18/23 | Icono de sort (ascending/descending/none) en header |
| toolbar | container | no | 10/23 | Barra de herramientas sobre la tabla |
| batch-action-bar | container | no | 6/23 | Barra de acciones batch (reemplaza toolbar en seleccion) |
| pagination | container | no | 12/23 | Controles de paginacion debajo de la tabla |
| empty-state | container | no | 8/23 | Estado vacio cuando no hay datos |
| footer-row | container | no | 6/23 | Fila de totales/resumen |
| row-actions | icon-action | no | 7/23 | Menu de acciones por fila |
| caption | text | no | 5/23 | Titulo/descripcion de la tabla (GOV.UK exige) |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Density | variant | compact/default/comfortable | 15/23 | M3, Carbon, Ant, Radix, Mantine, Fluent, etc. |
| State | state | default/hover/focus | 12/23 | Row hover highlight, focus ring |
| ColumnAlign | config | left/center/right | 18/23 | Per-column, GOV.UK exige right para numeros |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| bordered | 16/23 | false | Bordes visibles en celdas/tabla |
| striped | 15/23 | false | Filas alternadas con bg diferente (zebra) |
| stickyHeader | 14/23 | false | Header fijo al hacer scroll |
| selectable | 14/23 | false | Checkbox column para seleccion de filas |
| sortable | 18/23 | false | Headers clickeables para sort |
| expandable | 8/23 | false | Filas expandibles con contenido anidado |
| highlightOnHover | 10/23 | false | Highlight de fila en hover |
| withColumnBorders | 6/23 | false | Bordes verticales entre columnas |
| isRankable | 1/23 | false | Drag-and-drop row reordering (Atlassian unico) |
| virtual | 4/23 | false | Virtual scroll para datasets grandes |
| loading | 8/23 | false | Estado de carga (dim, skeleton, spinner) |
| stickyFirstColumn | 3/23 | false | Primera columna fija en scroll horizontal |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 23/23 | Base appearance | |
| hover (row) | 16/23 | Row bg lighten/darken | highlightOnHover boolean |
| focus (cell/row) | 12/23 | Focus ring on cell or row | Grid pattern = cell focus; table pattern = row focus |
| selected (row) | 14/23 | Checkbox checked + accent bg on row | Batch operations |
| disabled (row) | 5/23 | Opacity 0.5, non-interactive | Specific rows disabled |
| loading | 8/23 | Dim content 20% or skeleton | Atlassian dims, Primer uses skeleton |
| empty | 8/23 | Empty state illustration + text | No data available |
| sorting | 8/23 | Sort indicator change + aria-sort update | Column being sorted |
| expanded | 8/23 | Row expanded with nested content | Expandable rows |
| error | 3/23 | Error border on specific cells | Inline edit validation |
| dragged | 1/23 | Elevated row + shadow | Atlassian isRankable |

**Exclusion patterns found:**
- disabled row x hover/focus/selected — universal (disabled rows cannot be interacted with)
- loading x sort/filter/expand — table is busy, no new operations
- empty x sort/filter/expand/select — no data to operate on
- virtual x pagination — typically one or the other, not both simultaneously

**Building block candidates:**
- header-cell -> `.TableHeader` — 20/23 systems have structured header cell (sort indicator + label + optional filter)
- data-row -> `.TableRow` — 18/23 systems have structured row (cells + optional checkbox + optional expand + optional row actions)
- data-cell -> `.TableCell` — 23/23 systems have individual cell (text, potentially editable)

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| columnAlign | left, center, right | 18/23 | Per-column text alignment |
| sortDirection | ascending, descending, none | 18/23 | Current sort state per column |
| stripedStyle | odd, even | 4/23 | Which rows get stripe bg (Mantine) |
| captionSide | top, bottom | 3/23 | Position of table caption |
| selectionBehavior | toggle, replace | 2/23 | Spectrum: click toggles vs replaces selection |

**A11y consensus:**
- Primary role: `table` for read-only display (15/23), `grid` for interactive tables with cell navigation (8/23)
- Required ARIA: `aria-sort` on sortable headers, `aria-selected` on selected rows, `aria-expanded` on expandable rows
- Keyboard: Tab entre elementos interactivos (table role); Arrow keys para navegar celdas (grid role); Enter/Space para activar sort
- Focus: Linear (Tab between interactive elements) for table role; Roving tabindex / aria-activedescendant for grid role cell navigation
- APG pattern: Table (read-only) / Grid (interactive)
- Caption/aria-label on table element required for context
- GOV.UK: scope="col" y scope="row" en todos los headers (universal best practice)
- Weak a11y flag: Ant Design (SR announcements minimal en virtual scroll)

---

## What Everyone Agrees On

1. **HTML semantico como base**: Todos los 23 sistemas usan `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` como base. Incluso sistemas con virtual scroll (Ant v5, Fluent 2) preservan la semantica. Razon: screen readers dependen de la semantica nativa de tabla para navegacion por fila/columna.

2. **Sort via header interactivo**: 18/23 sistemas implementan sort haciendo click en el header de columna. El header debe ser un `<button>` (no un `<div>`) y comunicar estado via `aria-sort`. Razon: el header es el lugar natural donde el usuario ve y controla el orden.

3. **Density como dimension, no como componente separado**: 15/23 sistemas ofrecen density (compact/default/comfortable) que cambia padding y font-size. Ninguno crea un componente separado. Razon: density solo cambia spacing, no estructura — perfecto para Figma Variable modes.

4. **Seleccion via checkbox column dedicada**: 14/23 sistemas usan una columna de checkbox para seleccion de filas, no click en la fila. Razon: evita conflicto con otros clicks en la fila (links, actions, expand).

5. **Striped y bordered como booleans independientes**: 15+ sistemas implementan zebra stripes y bordes como toggles booleanos independientes. No son variantes que multipliquen frames. Razon: son decoraciones visuales que no cambian estructura.

6. **Sticky header como feature opt-in**: 14/23 sistemas ofrecen sticky header como booleano. Default off. Razon: sticky header es esencial en tablas largas pero innecesario en tablas cortas, y puede causar issues con scroll containers anidados.

---

## Where They Disagree

1. **"Tabla presentacional vs. data grid completo?"** — Option A: Tabla semantica pura (Paste, Radix, Chakra, GOV.UK, Mantine) que delega sort/filter/selection a TanStack Table o custom hooks. Adopters: 8/23. Upside: DS liviano, separation of concerns. Downside: cada equipo implementa features diferente. — Option B: Data grid built-in (Lightning, Ant, Fluent, Base Web, Carbon). Adopters: 5/23. Upside: consistencia garantizada, a11y correcta en todas las features. Downside: componente masivo, API compleja (Ant tiene 50+ props). — Para tu caso: si tu equipo es pequeno, Option A + TanStack Table recipe. Si tienes multiples equipos, Option B evita fragmentacion.

2. **"Un componente vs. familia split?"** — Option A: Componente unico configurable (Ant, Atlassian, Mantine). Todo en un `<Table>`. Upside: un solo import, menos decision fatigue. Downside: API surface enorme. — Option B: Familia split por caso de uso (Polaris: DataTable + IndexTable). Upside: cada componente enfocado, API clara. Downside: los usuarios deben elegir cual usar. — Para tu caso: para Figma, un componente shell con booleans es mas manejable que multiples componentes.

3. **"role=table vs. role=grid?"** — Option A: `role="table"` (Carbon, Polaris, Paste, GOV.UK) — Tab entre elementos interactivos, no cell navigation. Mas simple, mejor soporte SR default. — Option B: `role="grid"` (Spectrum, M3/MUI, Fluent, Lightning) — Arrow keys navegan celdas, Enter activa. Necesario para inline edit y cell-level interactions. — Para tu caso: si tu tabla tiene celdas interactivas (inline edit, links en celdas), usa grid. Si es read-only con sort/select, usa table.

4. **"Pagination vs. virtual scroll vs. infinite loading?"** — Pagination (Atlassian, Primer) — posicion awareness, mejor para datasets moderados. Virtual scroll (Ant, Lightning, Fluent) — mejor para 1000+ filas. Infinite loading (Spectrum onLoadMore, Evergreen onScrolled) — seamless UX pero pierde posicion. — Para tu caso: pagination como default, virtual scroll como opt-in para datasets grandes.

5. **"Sort indicators siempre visibles vs. solo en hover?"** — Carbon muestra sort arrows solo en hover para reducir ruido en dashboards densos. La mayoria muestra siempre. — Para tu caso: visible siempre es mas accesible; hover-only necesita alternative para touch.

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Basic table | Filas/columnas sin chrome extra | Datos simples, display | Paste, Radix, Chakra, GOV.UK |
| Sortable table | Headers clickeables con sort indicators | Datos comparativos | 18/23 sistemas |
| Selectable table | Checkbox column + batch action bar | Gestion de recursos | Carbon, Polaris, Atlassian, Primer |
| Expandable table | Filas que revelan contenido anidado | Datos jerarquicos | Carbon, Ant, Gestalt |
| Data grid | Sort + filter + selection + inline edit | Enterprise dashboards | Lightning, Ant, Fluent, Base Web |
| Sticky header/columns | Header y/o columnas fijas en scroll | Tablas anchas/largas | Gestalt, Mantine, Ant |

```
Basic table:
┌──────────┬──────────┬──────────┐
│ Header 1 │ Header 2 │ Header 3 │
├──────────┼──────────┼──────────┤
│ Cell     │ Cell     │ Cell     │
├──────────┼──────────┼──────────┤
│ Cell     │ Cell     │ Cell     │
└──────────┴──────────┴──────────┘

Selectable table:
┌───┬──────────┬──────────┬──────────┐
│ □ │ Header 1 │ Header 2 │ Header 3 │
├───┼──────────┼──────────┼──────────┤
│ ☑ │ Cell     │ Cell     │ Cell     │ ← selected row (accent bg)
├───┼──────────┼──────────┼──────────┤
│ □ │ Cell     │ Cell     │ Cell     │
└───┴──────────┴──────────┴──────────┘
  ┌────────────────────────────────┐
  │ ■ 1 selected │ Delete │ Export │ ← batch action bar
  └────────────────────────────────┘

Expandable table:
┌──────────┬──────────┬──────────┬───┐
│ Header 1 │ Header 2 │ Header 3 │   │
├──────────┼──────────┼──────────┼───┤
│ Cell     │ Cell     │ Cell     │ ▼ │ ← expand toggle
│ ┌────────────────────────────┐ │   │
│ │  Expanded content area     │ │   │
│ └────────────────────────────┘ │   │
├──────────┼──────────┼──────────┼───┤
│ Cell     │ Cell     │ Cell     │ ▶ │ ← collapsed
└──────────┴──────────┴──────────┴───┘
```

---

## Risks to Consider

1. **Explosion combinatoria en Figma** (HIGH) — Density x Bordered x Striped x Selectable x Sortable x Expandable = cientos de combinaciones. Mitigacion: todos como booleans en Figma (no multiplican frames). Solo Density como variant dimension.

2. **role=table vs role=grid ambiguedad** (MEDIUM) — Elegir mal el rol impacta toda la a11y (keyboard pattern diferente). Mitigacion: usar `role="table"` como default (read-only), documentar cuando cambiar a `role="grid"` (inline edit, cell-level interactions).

3. **Sticky header en scroll containers anidados** (MEDIUM) — stickyHeader puede no funcionar correctamente si la tabla esta dentro de otro scroll container. Mitigacion: documentar requisito de scroll container directo.

4. **Virtual scroll + a11y** (MEDIUM) — Virtual scroll puede romper semantica de tabla para screen readers si no se implementa `aria-rowcount`/`aria-colcount`. Mitigacion: seguir patron Fluent 2 con aria-rowcount/aria-colcount explicitos.

5. **Mobile responsiveness** (LOW) — Solo Cedar tiene layout stacked para mobile. La mayoria usa horizontal scroll. Mitigacion: horizontal scroll con indicador visual es aceptable; stacked layout es opcional.

---

## Next Steps

```
/spec table          --> outputs/table-config.json
/enrich table        --> outputs/table-enriched.md + updated config.json
/generate table      --> Figma components
/figma-qa            --> Audit + auto-fix
/build table         --> Full pipeline in one command
```
