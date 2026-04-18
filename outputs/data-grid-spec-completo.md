# DataGrid

## Overview

El DataGrid es el componente de gestión de datos tabular más completo del sistema. Organiza colecciones de registros en filas y columnas con soporte para ordenamiento, selección (simple o múltiple), filas expandibles, barra de acciones masivas, densidad configurable y estados vacíos. Es el bloque central de dashboards de administración, paneles de recursos y pantallas de reporte enterprise.

```
┌─────────────────────────────────────────────────────────────────────┐
│  [toolbar: título + búsqueda + filtros + acción primaria]           │  ← slot toolbar (opcional)
├─────────────────────────────────────────────────────────────────────┤
│  [✕ 3 items selected]  [Eliminar] [Exportar] [Asignar]      [×]   │  ← batch actions bar (activado por selección)
├──────┬──────────────────────┬──────────────┬───────────────────────┤
│  ☑  │ Nombre            ↑  │ Estado       │ Acciones              │  ← headerRow (Row Type=header)
├──────┼──────────────────────┼──────────────┼───────────────────────┤
│  ☑  │ Alpha Project        │ Activo       │ ⋮                     │  ← Row Type=body, State=selected
│  ☑  │ Beta Campaign        │ Pausado      │ ⋮                     │
│  □  │ Gamma Initiative  ▼  │ Borrador     │ ⋮                     │  ← Row State=expanded
│       └─ Sub-contenido expandido ─────────────────────────────────┘
│  ☑  │ Delta Task           │ Activo       │ ⋮                     │
├──────┴──────────────────────┴──────────────┴───────────────────────┤
│  [← Anterior]   1  2  3  4  [Siguiente →]              [48/página] │  ← slot pagination (opcional)
└─────────────────────────────────────────────────────────────────────┘
```

La familia se construye en orden: **Cell → Row → DataGrid**. Cell es la unidad atómica (header/body/footer × alignment × state × size). Row compone N celdas y agrega contexto de tipo y expansión. DataGrid ensambla headerRow + body rows + slots opcionales.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Cell
  Type:      header | body | footer
  Alignment: start | center | end
  State:     default | hover | sorted | disabled
  Size:      sm | md | lg

Row
  State:    default | hover | selected | expanded | focused | disabled
  Type:     header | body | footer | subheader
  Density:  compact | default | comfortable

DataGrid
  Density:      compact | default | comfortable
  StickyHeader: no | yes
  ZebraStripes: off | on
  Bordered:     no | yes
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Cell
  👁 Has Leading Icon   → leadingIcon
  👁 Has Sort Icon      → sortIcon
  👁 Has Selection      → selection (checkbox)

DataGrid
  toolbar slot          → aparece/desaparece según composición
  footer slot           → Row Type=footer (totals)
  pagination slot       → control de paginación
  emptyState slot       → mensaje sin datos
```

### Figma properties panel

```
╔══════════════════════════════════════════╗
║  Cell                                    ║
╠══════════════════════════════════════════╣
║  Type        ▾  header / body / footer   ║
║  Alignment   ▾  start / center / end     ║
║  State       ▾  default / hover /        ║
║                 sorted / disabled        ║
║  Size        ▾  sm / md / lg             ║
║  ─────────────────────────────────────── ║
║  👁 Has Leading Icon    [ off ●── ]      ║
║  👁 Has Sort Icon       [ off ●── ]      ║
║  👁 Has Selection       [ off ●── ]      ║
║  ─────────────────────────────────────── ║
║  ✏️ Content   "Cell value"               ║
║  🔄 Leading Icon  icon/placeholder       ║
║  🔄 Sort Icon     icon/sort-asc          ║
╚══════════════════════════════════════════╝

╔══════════════════════════════════════════╗
║  Row                                     ║
╠══════════════════════════════════════════╣
║  State    ▾  default / hover / selected  ║
║              expanded / focused /        ║
║              disabled                   ║
║  Type     ▾  header / body / footer /   ║
║              subheader                  ║
║  Density  ▾  compact / default /        ║
║              comfortable                ║
╚══════════════════════════════════════════╝

╔══════════════════════════════════════════╗
║  DataGrid                                ║
╠══════════════════════════════════════════╣
║  Density       ▾  compact / default /   ║
║                   comfortable           ║
║  StickyHeader  ▾  no / yes              ║
║  ZebraStripes  ▾  off / on              ║
║  Bordered      ▾  no / yes              ║
╚══════════════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿Datos en tabla?
        │
        ▼
¿Los usuarios necesitan interactuar
 (sort, select, expand, bulk ops)?
        │
   Sí ──┤──── No ──→ Usa Table simple (display-only)
        │
        ▼
¿Cuántos registros típicos?
        │
  <50 ──┤──── 50–500 ──→ DataGrid (paginación)
        │         │
    List/Cards    │
              500–5000 ──→ DataGrid + StickyHeader
                  │
              >5000 ──→ Virtualización (no modelado en Figma)
```

**Usa DataGrid cuando:**
- La tarea principal es revisar y gestionar un conjunto de recursos (órdenes, usuarios, archivos, campañas).
- Los usuarios necesitan ordenar por columna para encontrar registros rápidamente.
- Se requiere selección de filas para operaciones masivas (eliminar, exportar, asignar, etiquetar).
- El dataset tiene 50–500 filas con paginación server-side — el patrón enterprise estándar (Carbon, Atlassian).
- Se necesitan filas expandibles para mostrar un panel de detalle sin navegar a otra pantalla.
- Un toolbar con búsqueda global o filtros complementa la gestión del recurso.

**Do NOT usa DataGrid cuando:**
- Los datos son solo display sin interacción → usa `Table` o `DescriptionList`.
- Hay menos de 10–15 filas y no hay selección ni sort → una lista simple o un `Stack` de cards es más limpio.
- El dataset supera los 5 000 registros y se requiere scroll sin paginación → la virtualización (AG Grid, MUI DataGrid Premium) está fuera del scope de este componente Figma.
- Los usuarios necesitan editar celdas inline (status, cantidad) → esto requiere estados adicionales no modelados aquí (inline edit → Lightning/Dell/MUI Premium scope).
- Se necesita drag-and-drop para reordenar filas → usa el patrón Atlassian DynamicTable con Space+Arrow+Space keyboard.

---

## Visual variations

### Densidades

| Densidad | Altura de fila | Padding horizontal | Font size | Uso |
|----------|---------------|-------------------|-----------|-----|
| compact | 32px | 12px | 12px (type/xs) | Dashboards enterprise densos |
| default | 40px | 16px | 13px (type/sm) | Uso general, admin panels |
| comfortable | 48px | 20px | 14px (type/md) | Touch, zoom accesibilidad |

### Cell: combinaciones clave

**Header cells**
- Default: fondo `surface/hover` (#F7F7F9), texto `text/primary`, `font-weight: 600`
- Hover: fondo más oscuro `#F0F0F5`, texto más oscuro
- Sorted: fondo `brand/subtle` (#EDF0FF), texto `interactive/default` (azul), icono sort activo

**Body cells**
- Default: fondo blanco, texto `text/primary`, `font-weight: 400`
- Hover: fondo `surface/hover` (#F8F8FC)
- Disabled: fondo `surface/disabled`, texto `text/disabled` (#B8B8C0)

**Footer cells**
- Igual que header: fondo `surface/hover`, `font-weight: 600` — resaltan totales/sumarios

### Row states

| State | Background | Border | Nota |
|-------|-----------|--------|------|
| default | white | `border/default` (#D0D0D9) | |
| hover | `surface/hover` (#F8F8FC) | mismo | highlight sutil |
| selected | `brand/subtle` (#EDF0FF) | `interactive/hover` (#3366D1) | checkbox checked |
| expanded | `surface/hover` | `interactive/default` (azul) + border-left 3px | contenido revelado |
| focused | white | ring 2px | sin cambio de fondo |
| disabled | `surface/disabled` (#F5F5FA) | mismo | opacity 0.6 |

### ZebraStripes

Cuando `ZebraStripes=on`, las filas pares reciben fondo `surface/pressed` (#F3F3F7) en lugar de blanco. Mejora la legibilidad en grids anchos con muchas columnas de datos numéricos.

### Bordered vs. no Bordered

`Bordered=yes` agrega un borde visible alrededor del grid completo y bordes verticales entre columnas — útil para datos contractuales o reportes formales. `Bordered=no` (default) mantiene solo los bordes horizontales entre filas.

### Estado vacío (emptyState slot)

Cuando el body no tiene filas, se muestra el slot `emptyState` centrado. El diseño ilustra el caso "sin datos" vs. "filtros no encontraron resultados" — estos dos casos deben tener mensajes distintos.

---

## Design decisions

### 1. Familia de 3 sub-components: Cell → Row → DataGrid

**Por qué:** Espeja la composición HTML nativa (`<td>` → `<tr>` → `<table>`). Permite que Cell y Row se reutilicen en contextos diferentes (resumen de pedido, listas de recursos compactas). Los frameworks de terceros como Carbon y Ant Design mapean directamente a esta jerarquía conceptual.

**Tradeoff:** Más frames totales (Cell: 72 netos, Row: 48, DataGrid: 24 = 144 frames) frente a un componente monolítico que combinaría todo. La modularidad vale la inversión porque los consumers pueden componer grids con cualquier combinación de densidad × tipo de celda.

### 2. 3 densidades (compact / default / comfortable) siguiendo foundations.densityModes

**Por qué:** Enterprise dashboards necesitan compact (32px) para mostrar más filas sin scroll; pantallas touch y usuarios con zoom activo necesitan comfortable (48px). Las tres densidades coinciden con `foundations.densityModes` del sistema, garantizando coherencia con otros componentes que aceptan densidad.

**Tradeoff:** Triplicar los frames del DataGrid completo frente a un tamaño único. El ahorro en tiempo de diseño de pantallas enterprise justifica los frames adicionales.

### 3. Selection y Expansion como State values, no booleans independientes

**Por qué:** `State=selected` y `State=expanded` son mutuamente excluyentes con `State=hover` en runtime (no puedes estar en hover y selected simultáneamente en el mismo frame). Modelarlos como valores del mismo enum `State` genera exactamente un frame por combinación válida, en lugar de multiplicar booleans que generarían combinaciones imposibles.

**Tradeoff:** El diseñador no puede activar `selected=true` + `hover=true` en Figma, lo cual es correcto — esa combinación no existe en runtime.

### 4. Sort icon solo en header type (exclusión configurada)

**Por qué:** El sort es una propiedad de columna, no de celda individual. Las celdas `body` o `footer` nunca muestran el sort icon — solo los `header`. La exclusión en `config.exclusions` fuerza esto a nivel de spec, previniendo que Figma genere frames imposibles como "body cell, State=sorted".

**Tradeoff:** Ninguno — es la semántica correcta. Todo sistema revisado (Carbon, Ant, Atlassian, Fluent 2) coincide en que `aria-sort` pertenece a `<th>`, nunca a `<td>`.

### 5. Toolbar y pagination como slots externos, no propiedades del DataGrid

**Por qué:** Carbon TableToolbar y Atlassian pagination son building blocks composables. El DataGrid debe ser enfocado en la semántica de grid; el consumer compone toolbar y paginación según sus necesidades específicas (algunos tienen búsqueda + filtros, otros solo exportación). Esto reduce los frames netos del DataGrid a 24 (sin multiplicar por "tiene toolbar").

**Tradeoff:** El diseñador debe componer el toolbar por separado. La documentación del slot lo deja claro.

### 6. Sin virtualización ni column resize modelados

**Por qué:** Son comportamientos de runtime (scroll listeners, pointer events, resize observers) sin representación semántica en Figma. Las grids con >5 000 filas requieren soluciones como TanStack Table + virtualización — fuera del scope de este modelo de diseño. El scope está documentado explícitamente (50–500 filas, Carbon pattern).

**Tradeoff:** Las grids de >1 000 filas quedan fuera de spec. Los equipos de producto que las necesitan deben usar MUI DataGrid Pro o AG Grid directamente.

### Combinaciones excluidas

```
Cell:
  Type=body|footer + State=sorted    → sort solo en headers
  Type=header + State=disabled       → headers no se deshabilitan

Row:
  Type=header + State=selected       → header rows no son seleccionables
  Type=header + State=expanded       → header rows no son expandibles
  Type=footer + State=hover          → footer es estático
  Type=footer + State=selected       → footer no es seleccionable
  Type=footer + State=expanded       → footer no es expandible
```

---

## Behavior

### Essential for design

La experiencia del DataGrid se construye alrededor de tres modos de interacción que el diseñador debe representar explícitamente en sus pantallas:

**Modo browse (State=default/hover):** El usuario escanea la grid. Hover de fila señala la posición del cursor. Sort de columna reordena los datos — el header activo cambia a `State=sorted` con icono direccional y color `interactive/default`.

**Modo selección (State=selected):** Al activar un checkbox, la fila cambia a `State=selected` (fondo `brand/subtle`, borde `interactive/hover`). Al seleccionar ≥1 fila, la batch actions bar aparece reemplazando al toolbar normal — este cambio contextual es el patrón Carbon y debe modelarse en la pantalla de diseño.

**Modo expansión (State=expanded):** Al hacer clic en el botón chevron, la fila cambia a `State=expanded` con un borde-izquierdo azul 3px y revela el `expandedContent` debajo. Solo una fila puede estar expandida a la vez en el patrón Carbon estándar.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Container | `<table>` nativo o `role="grid"` | `aria-label` o `aria-labelledby` | Anuncia contexto al SR |
| Header cell | `<th>` | `scope="col"` + `aria-sort="ascending\|descending\|none"` | SR anuncia estado de sort |
| Sort button | `<button>` dentro de `<th>` | `aria-label="Ordenar por [columna]"` | Distinguible por navegación por botones |
| Body row | `<tr>` | `aria-selected="true\|false"` (si selection activa) | SR anuncia selección de fila |
| Row checkbox | `<input type="checkbox">` | `aria-label="Seleccionar [id/nombre de fila]"` | Sin contexto → 20 checkboxes idénticos |
| Expand button | `<button>` | `aria-expanded="true\|false"` + `aria-label` | SR anuncia estado expandido |
| Batch actions bar | `<div>` | `aria-live="polite"` | Anuncia "3 filas seleccionadas" |
| Pagination | nav | `aria-label="Paginación de tabla"` | Landmark para SR |

### Keyboard navigation

Primary interactions (affect design):

```
Tab             → navega entre elementos interactivos:
                  headers sortables → checkboxes → botones expand → acciones de fila
Space           → toggle selection en checkbox de fila o header
Enter           → en header sortable: cicla sort asc → desc → none
Enter           → en botón expand: toggle expanded state
```

Secondary interactions (dev reference):

```
Arrow keys      → cell-to-cell navigation (solo si role="grid" mode activo, Spectrum/MUI pattern)
Escape          → cancela inline edit (si aplica)
Shift+Tab       → navegación inversa entre elementos interactivos
Home / End      → primera/última columna en grid mode
Ctrl+Home       → primera celda del grid (grid mode)
Ctrl+End        → última celda del grid (grid mode)
```

**Focus management:** Ring de 2px en elemento focalizado. La fila completa recibe highlight cuando una celda interna tiene foco (opcional, mejora la scanability). La batch actions bar activa un focus trap mientras está visible — Escape o deseleccionar todas las filas lo desactiva.

---

## Content guide

### slot: toolbar

Compuesto externamente. Puede incluir: título del recurso, campo de búsqueda, chips de filtros activos, botón de exportación, acción primaria ("Crear nuevo"). El diseñador debe mantenerlo separado del DataGrid frame y apilarlos verticalmente. Al activar selección, este slot es reemplazado visualmente por la batch actions bar.

### slot: headerRow (Cell Type=header)

Cada header cell muestra la etiqueta de columna en `font-weight: 600`. Si la columna es sortable, incluye un `<button>` interno con el `sortIcon` (icono de flecha). La primera columna puede incluir un checkbox "select all" (instancia del slot `selection` con lógica indeterminate cuando hay selección parcial). Evita labels de columna muy largas — el truncamiento con tooltip es el patrón estándar.

### slot: body (N × Row Type=body)

Los valores de celda deben ser concisos y legibles en la densidad elegida. Para celdas de estado (badges), asegúrate de que el badge quepa en la altura de celda de la densidad compact (32px). Los valores numéricos deben estar `Alignment=end` (alineación a la derecha). Las celdas de acción (`⋮`) deben estar `Alignment=center` o `end`.

### slot: expandedContent (dentro de Row expandida)

Contenido revelado debajo de la fila. Puede ser un panel de detalle, una sub-tabla o un formulario de edición. Mantén la jerarquía visual clara con padding interno. El `expandedContent` no hereda la densidad de la grid — define su propio espaciado según su contenido.

### slot: footer (Row Type=footer, opcional)

Para totales, sumarios o contadores. Usa `font-weight: 600` igual que el header. Posicionado después del último body row. Si StickyHeader=yes, considera si el footer también debe ser sticky (implementación específica de producto).

### slot: pagination (opcional)

Instancia del componente Pagination externo. Posicionado debajo del footer o del último body row. Incluye siempre el selector de "filas por página" para datasets que lo necesiten.

### slot: emptyState (opcional)

Visible cuando no hay filas en el body. Diseña dos variantes: "sin datos aún" (onboarding) y "sin resultados para los filtros actuales" (filtros activos). La segunda debe incluir un CTA para limpiar filtros.

---

## Pre-build checklist

```
[ ] Cell: 72 frames netos (108 gross - 36 exclusiones)
      - Verificar: Type=body + State=sorted NO existe
      - Verificar: Type=header + State=disabled NO existe
[ ] Row: 48 frames netos (72 gross - 24 exclusiones)
      - Verificar: Type=header + State=selected NO existe
      - Verificar: Type=footer + State=hover/selected/expanded NO existen
[ ] DataGrid: 24 frames (Density × StickyHeader × ZebraStripes × Bordered)
[ ] Tokens aplicados:
      - Header bg → dg/header/bg (surface/hover)
      - Header sorted bg → dg/header/sorted/bg (brand/subtle)
      - Row selected bg → dg/row/selected/bg (brand/subtle)
      - Row expanded borderLeft → dg/row/expanded/borderLeft (interactive/default)
      - Focus ring → dg/row/focused/ring (focus/ring)
      - Zebra bg → dg/zebra/bg (surface/pressed)
[ ] Slots correctamente nombrados:
      - toolbar / headerRow / body / footer / pagination / emptyState
[ ] Leading icon y sort icon: instance swap configurado
[ ] Checkbox en selection column: instancia de Checkbox component
[ ] ZebraStripes=on probado con 6+ rows (visible alternancia)
[ ] StickyHeader=yes documentado con nota de implementación
[ ] Densidad compact (32px) revisada: badges y texto caben sin recorte
[ ] Estado emptyState con dos versiones: sin-datos y sin-resultados
[ ] Documento de scope: "50–500 filas, sin virtualización, sin inline edit"
```

---

## Related components

```
Table (simple)         → display-only, sin sort/select/expand
List                   → recursos en formato card/row sin tabla
Pagination             → slot externo del DataGrid
Checkbox               → usado en selection column
Button                 → toolbar y batch actions
Badge                  → valores de estado en celdas
EmptyState             → slot emptyState del DataGrid
Tooltip                → hover en celdas truncadas
```

---

## Reference: how other systems do it

### Ant Design Table — máximo de features en un solo componente

Ant Design es el sistema más completo en Tier 1. Su `<Table>` absorbe virtualización, tree data via campo `children`, columnas fijas con CSS sticky (v5), filas expandibles, filtros por columna en el header, edición inline, drag-and-drop de sort, filas de sumario y sub-tablas anidadas. La decisión de v5 de cambiar de DOM duplicado a CSS sticky para columnas fijas eliminó el bug de doble-lectura por lectores de pantalla, habilitó virtualización + columnas fijas simultáneamente, y redujo el DOM en ~50%.

Los filtros por columna son el diferenciador más poderoso: cada columna define su propio tipo de filtro (texto, fecha, categorías) con un dropdown directamente en el header — el filtro está donde están los datos. El campo `children` en los datos renderiza automáticamente estructura de árbol sin un componente TreeTable separado. La accesibilidad de navegación de celdas con teclado es la más débil de los T1 — no usar como referencia de a11y.

### Carbon DataTable — operaciones masivas con render-prop

Carbon DataTable está optimizado para el patrón enterprise de revisar registros y ejecutar operaciones masivas. La batch action bar es un elemento arquitectónico de primer nivel: cuando hay filas seleccionadas, se desliza hacia arriba reemplazando el toolbar y creando un modo visual claro de "edición masiva". El render-prop pattern da a los consumers control total del layout mientras DataTable gestiona el estado de selección, sort y expansión.

La filosofía anti-virtualización es deliberada: Carbon apunta a paneles admin con datos server-side paginados (50–500 rows) donde la paginación es preferible porque los usuarios de enterprise necesitan conciencia posicional ("estoy en la página 3 de 7 = fila 101–150 de 847"). Carbon y Atlassian coinciden en que scroll infinito elimina el anclaje posicional que los flujos de auditoría y cumplimiento requieren.

### Atlassian DynamicTable — drag-and-drop con a11y completa

DynamicTable es único entre los 24 sistemas por su soporte de ranking (reordenamiento) de filas con accesibilidad completa de teclado: Space para agarrar, flechas para reposicionar, Space para soltar, Escape para cancelar — con anuncios aria-live en cada movimiento ("Fila movida de posición 3 a posición 1"). El estado de carga reduce la opacidad al 20% en lugar de skeleton — los usuarios pueden seguir leyendo los datos previos mientras los nuevos cargan.

### Fluent 2 DataGrid — TanStack Table como motor nativo

Fluent 2 envuelve TanStack Table v8 nativo, haciendo que TanStack gestione las operaciones de datos (sort, filter, group, paginate) y Fluent 2 gestione los visuales y la semántica ARIA. El `focusMode` prop es la decisión más madura: "cell" habilita navegación con flechas entre celdas (role="grid"), mientras "row_unstable" trata cada fila como un único tab stop — reconocimiento explícito de que la navegación full role="grid" es innecesaria para grids sin contenido de celda interactivo.

La implementación de `aria-rowcount` + `aria-rowindex` para scroll virtual es la referencia correcta de a11y para grids con virtualización.

### Polaris IndexTable — gestión de recursos con layout mobile

Polaris separa la gestión de recursos (IndexTable) del display (DataTable). IndexTable está diseñado para listas de merchants (órdenes, productos, clientes). El prop `condensed` transforma la tabla en un layout de cards para mobile — la única solución mobile-first entre los T1 para grids. Los `promotedBulkActions` siempre visibles en la batch bar reflejan que el 90% de los merchants usan solo 2–3 acciones masivas frecuentes.

### Base Web Data Table — filtros type-aware y tres niveles de complejidad

El modelo de tres niveles (Table → Table-Grid → Data Table) es el enfoque de complejidad progresiva más explícito entre los 24 sistemas. Los filtros de columna type-aware son el diferenciador: columnas categóricas obtienen listas de checkbox, numéricas obtienen sliders de rango, booleanas obtienen toggles, y datetime obtienen date range pickers — todo configurado via la propiedad `type` de columna.

---

## Tokens

**38 tokens** · prefix `dg-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| dg/compact/h | sizing/32 | Altura de fila density compact |
| dg/default/h | sizing/40 | Altura de fila density default |
| dg/comfortable/h | sizing/48 | Altura de fila density comfortable |
| dg/header/bg | surface/hover | Fondo de header cells |
| dg/header/fg | text/primary | Texto de header cells |
| dg/header/fontWeight | type/weight-semibold | Font weight header |
| dg/header/sorted/bg | brand/subtle | Fondo header con sort activo |
| dg/header/sorted/fg | interactive/default | Texto header con sort activo |
| dg/body/bg | surface/default | Fondo body cells |
| dg/body/fg | text/primary | Texto body cells |
| dg/row/hover/bg | surface/hover | Fondo fila en hover |
| dg/row/selected/bg | brand/subtle | Fondo fila seleccionada |
| dg/row/selected/border | interactive/hover | Borde fila seleccionada |
| dg/row/expanded/borderLeft | interactive/default | Borde izquierdo fila expandida |
| dg/row/focused/ring | focus/ring | Ring de foco en fila |
| dg/row/disabled/opacity | opacity/disabled | Opacidad fila deshabilitada |
| dg/zebra/bg | surface/pressed | Fondo alternado zebra stripes |
| dg/border/default | border/default | Borde horizontal entre filas |
| dg/border/strong | border/hover | Borde fuerte (Bordered=yes) |
| dg/cell/px/sm | spacing/3 | Padding horizontal celda sm |
| dg/cell/px/md | spacing/4 | Padding horizontal celda md |
| dg/cell/px/lg | spacing/5 | Padding horizontal celda lg |
| dg/cell/fontSize/sm | type/xs | Font size celda sm (12px) |
| dg/cell/fontSize/md | type/sm | Font size celda md (13px) |
| dg/cell/fontSize/lg | type/md | Font size celda lg (14px) |
| dg/toolbar/h | sizing/56 | Altura del toolbar |
| dg/toolbar/bg | surface/default | Fondo del toolbar |
| dg/pagination/h | sizing/48 | Altura del área de paginación |
| dg/pagination/bg | surface/default | Fondo del área de paginación |

### Spacing specs

```
Cell sm:  h=32px  px=12px  py=6px   fontSize=12px  lineHeight=16px  iconSize=14px
Cell md:  h=40px  px=16px  py=8px   fontSize=13px  lineHeight=18px  iconSize=16px
Cell lg:  h=48px  px=20px  py=12px  fontSize=14px  lineHeight=20px  iconSize=18px

Row compact:     h=32px  py=6px
Row default:     h=40px  py=8px
Row comfortable: h=48px  py=12px

Grid gap entre filas:  1px (border-bottom)
Grid border externo (Bordered=yes):  1px solid dg/border/strong
Focus ring:  2px solid focus/ring  offset=2px

Batch actions bar:  h=48px  px=16px  bg=interactive/default  fg=inverse
PresetItem label:   paddingX=12px  bg=white  fg=text/secondary  fontSize=13px
```
