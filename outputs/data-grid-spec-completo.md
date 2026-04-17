# DataGrid

## Descripción general

DataGrid es la tabla de datos del sistema de diseño: una composición de tres niveles (Cell → Row → DataGrid) que soporta sorting, selección de filas, expansión de contenido, y bulk actions. A diferencia de Table (display-only), DataGrid es interactiva: las columnas tienen headers sortables con `aria-sort`, las filas tienen checkboxes de selección, y hay un toolbar con acciones masivas. Implementa el patrón ARIA `<table>` semántico o `role="grid"` (para navegación con arrow keys 2D). Es el patrón estándar para gestión de datos tabulares: usuarios, registros, transacciones, archivos.

```
Density=default, Bordered=no:
┌──────────────────────────────────────────────────────────────────┐
│  [🔍 Buscar]   Filtros  ▾      [Exportar]  [Eliminar 2]         │  toolbar
├───┬────────────────┬──────────────┬────────────────┬────────────┤
│ ☐ │ Nombre      ▲  │ Email        │ Rol          ▼  │ Fecha      │  header
├───┼────────────────┼──────────────┼────────────────┼────────────┤
│ ☑ │ Ana García     │ ana@...      │ Admin          │ 2026-04-17 │  selected
│ ☐ │ Luis Martínez  │ luis@...     │ Editor         │ 2026-04-16 │  default
│ ☐ │ ▶ María López  │ maria@...    │ Viewer         │ 2026-04-15 │  expandable
│   │ ┌──────────────────────────────────────────────────────────┐│
│   │ │  Información expandida de María López                    ││  expanded
│   │ └──────────────────────────────────────────────────────────┘│
├───┼────────────────┼──────────────┼────────────────┼────────────┤
│   │ Total: 3 users │              │                │            │  footer
└───┴────────────────┴──────────────┴────────────────┴────────────┘
│  ←  1  2  3  →  |  Mostrando 1-25 de 127                        │  pagination

Density options:
  compact:     h:32px · px:12px
  default:     h:40px · px:16px
  comfortable: h:48px · px:20px

Cell states:
  Header default:  bg:surface/hover · fg:primary · semibold
  Header sorted:   bg:brand/subtle  · fg:interactive/default
  Body default:    bg:white          · fg:primary
  Row hover:       bg:surface/hover
  Row selected:    bg:brand/subtle  · border:interactive/hover
  Row expanded:    bg:surface/hover · border-left:3px azul
```

**Lo que el diseñador puede configurar:**

Variantes en Cell (building block):

```
Type      → header | body | footer
Alignment → start | center | end
State     → default | hover | sorted | disabled
Size      → sm | md | lg
```

Variantes en Row (building block):

```
State   → default | hover | selected | expanded | focused | disabled
Type    → header | body | footer | subheader
Density → compact | default | comfortable
```

Variantes en DataGrid:

```
Density      → compact | default | comfortable
StickyHeader → no | yes
ZebraStripes → off | on
Bordered     → no | yes
```

Toggles en Cell:

```
👁 Has Leading Icon  → ícono antes del contenido
👁 Has Sort Icon     → ícono de sort (solo en header)
👁 Has Selection     → checkbox de selección
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  DataGrid                                                │
│  ──────────────────────────────────────────────────────  │
│  Density      [ default        ▼ ]                       │
│  StickyHeader [ no             ▼ ]                       │
│  ZebraStripes [ off            ▼ ]                       │
│  Bordered     [ no             ▼ ]                       │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El usuario necesita ver datos tabulares?
                    │
                    ▼
       ¿Los datos son editables o requieren acciones?
       ├── Sí → DataGrid (sort, select, expand, bulk actions)
       └── No → Table (display simple sin interacción)
                    │
                    ▼
       ¿Cuántas filas?
       ├── 50-500 → DataGrid estándar
       └── >500 → DataGrid + virtualization (no modelado en Figma)
```

**Usar DataGrid cuando:**
- Lista de usuarios con acciones (editar, eliminar, cambiar rol)
- Registros de transacciones con sort por fecha/monto
- Gestión de archivos con selección y bulk delete
- Panel de administración con filtros y export
- Cualquier tabla con sorting, selección, o expansión de filas

**NO usar DataGrid cuando:**
- La tabla es puramente informativa → usar `Table`
- Hay menos de 5 filas → usar `List`
- Los datos son jerárquicos → usar `TreeView`

---

## Variaciones visuales

### Cell sizes

| Size | Height | PaddingX | PaddingY | FontSize |
|------|--------|---------|---------|---------|
| sm   | 32px   | 12px    | 6px     | 12px    |
| md   | 40px   | 16px    | 8px     | 13px    |
| lg   | 48px   | 20px    | 12px    | 14px    |

### Row Density (afecta altura del header + body)

| Density | Header H | Row H | FontSize |
|---------|---------|-------|---------|
| compact | 32px | 32px | 12px |
| default | 40px | 40px | 13px |
| comfortable | 48px | 48px | 14px |

### Cell states por Type

| Type | State | Background | Foreground | FontWeight |
|------|-------|-----------|-----------|-----------|
| header | default | surface/hover | text/primary | 600 |
| header | hover | surface/pressed | text/primary | 600 |
| header | sorted | brand/subtle | interactive/default | 600 |
| body | default | surface/default | text/primary | 400 |
| body | hover | surface/hover | text/primary | 400 |
| body | disabled | surface/disabled | text/disabled | 400 |
| footer | default | surface/hover | text/primary | 600 |

### Row states

| State | Background | Border | Notas |
|-------|-----------|--------|-------|
| default | white | border/default (bottom) | — |
| hover | surface/hover | border/default | — |
| selected | brand/subtle | interactive/hover | — |
| expanded | surface/hover | interactive/default left 3px | Left accent |
| focused | white | — | Focus ring exterior |
| disabled | surface/disabled | border/default | opacity 0.6 |

---

## Decisiones de diseño

**1. Familia de 3 sub-components: Cell → Row → DataGrid** — espeja la composición HTML nativa (`<td>` → `<tr>` → `<table>`). Permite reutilizar Cell y Row en otros contextos (summaries, comparison tables) y mantener DataGrid enfocado en grid semantics.

**2. 3 densities (compact/default/comfortable)** — enterprise dashboards necesitan compact (filas pequeñas para ver más datos); touch mobile necesita comfortable (tap targets grandes). Coincide con foundations.densityModes del sistema.

**3. Selection + Expansion como State values** — son mutuamente excluyentes con hover en runtime. Modelado como State values en lugar de booleans separados evita que el frame count se multiplique exponencialmente.

**4. Sort icon solo en header Type** — sort es propiedad de columna, no de celda individual. Las exclusiones en config enforzan que Type=body|footer no rendereen sort icon en Figma.

**5. Toolbar y pagination como slots externos** — Carbon TableToolbar y pagination son composable BBs independientes. DataGrid se enfoca en grid semantics; el consumer compone toolbar y pagination según necesidad.

**6. Sin virtualization ni column resize modelados** — son runtime behaviors (scroll listeners, pointer events). Modelar solo el visual estático. Para datasets >1000 filas, implementar virtualization (no es responsabilidad de Figma).

### Combinaciones excluidas

```
Cell: Type=body|footer + State=sorted (sort solo aplica en headers)
Cell: Type=header + State=disabled (headers no se deshabilitan)
Row: Type=header + State=selected|expanded
Row: Type=footer + State=hover|selected|expanded
```

---

## Comportamiento

### Esencial para diseño

- **Header sorts ciclan** — click en header sortable cicla entre: ascending → descending → none. El sort icon rota y cambia color (State=sorted).
- **Row selection con checkboxes** — hay un checkbox de "select all" en el header (selecciona todas las visibles) y checkboxes individuales en cada row body.
- **Batch actions bar** — cuando hay rows seleccionadas, un toolbar de bulk actions aparece con las acciones disponibles (Eliminar, Exportar, Cambiar estado). El count de seleccionadas se anuncia via `aria-live`.
- **Expanded row** — al hacer click en el expand button (chevron), la fila se expande mostrando contenido adicional con border-left azul de 3px como accent visual.
- **Zebra stripes** — ZebraStripes=on aplica bg alternado en filas pares para mejorar la legibilidad en grids con muchas columnas.
- **StickyHeader** — cuando se hace scroll vertical, el header permanece fijo en la parte superior.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Container | `<table>` nativo (default) o `role="grid"` | `<table>` nativo tiene mejor soporte AT |
| Header cell | `scope="col"` + `aria-sort="ascending\|descending\|none"` | SR anuncia el estado del sort |
| Body row | `aria-selected="true\|false"` (si selection activa) | SR anuncia si la fila está seleccionada |
| Expand button | `aria-expanded="true\|false"` | SR anuncia si la fila está expandida |
| Selection checkbox | `aria-label="Seleccionar fila: [primera celda]"` | SR identifica la fila en el checkbox |
| Batch actions | `aria-live="polite"` anuncia "N filas seleccionadas" | SR anuncia cambios de selección |
| Sort button | `<button>` interno + `aria-label="Ordenar por [columna]"` | SR permite activar sort desde el header |

### Navegación por teclado

```
Tab               → navega entre elementos interactivos (headers sortables, checkboxes, expand buttons)
Space en checkbox → toggle selection de fila
Enter en sort header → cicla sort asc/desc/none
Arrow keys (grid mode opcional) → navegación 2D cell-to-cell con roving tabindex
Escape            → cancela inline edit (si aplica)
```

---

## Guía de contenido

**Headers de columna:**
- Sustantivos sin artículos: "Nombre", "Email", "Fecha" (no "El Nombre" ni "Fecha de creación")
- Si la columna tiene sort: cursor pointer + sort icon
- Evitar headers de más de 2 palabras

**Batch actions:**
- Botones destructivos en rojo: "Eliminar (3)"
- Incluir el count en el label: "Exportar (12)" no "Exportar"

**Empty state (sin datos):**
- Mensaje específico: "No hay usuarios que coincidan con los filtros" — no "Sin resultados"
- CTA si aplica: "Invitar primer usuario"

**Toolbar search placeholder:**
- Específico al contexto: "Buscar por nombre o email" — no "Buscar"

---

## Pre-build checklist

```
□ ¿<table> nativo (default) o role="grid" para arrow-key mode?
□ ¿scope="col" en header cells?
□ ¿aria-sort en headers sortables?
□ ¿aria-selected en rows cuando selection activa?
□ ¿Expand button: aria-expanded?
□ ¿Selection checkboxes: aria-label con identificador de fila?
□ ¿Batch actions bar: aria-live="polite" con count?
□ ¿StickyHeader: position:sticky con z-index correcto?
□ ¿ZebraStripes: background en filas pares?
□ ¿Expanded row: border-left 3px + expandedContent slot?
□ ¿Empty state modelado con EmptyState component?
□ ¿Pagination como slot externo (no interno de DataGrid)?
```

---

## Componentes relacionados

```
Table          → para tablas display-only sin sort/select
TreeView       → para datos jerárquicos con nesting
List           → para listas cortas (<10 items)
Pagination     → slot externo de DataGrid
EmptyState     → slot externo para estado sin datos
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Sort | Selection | Expand | Virtual | ARIA | Diferenciador |
|---------|-------|------|----------|--------|---------|------|--------------|
| **Material Design 3** | DataTable | Sí | Sí | No | No | table | Checkbox col; checkboxSelection |
| **Spectrum (Adobe)** | TableView | Sí | Sí | No | Sí | grid | Virtualized; column resizing; ARIA 2D |
| **Carbon (IBM)** | DataTable | Sí | Sí | Sí | No | table | TableToolbar; expandable rows; batchActions |
| **Polaris (Shopify)** | DataTable / IndexTable | Sí | Sí | No | No | table | IndexTable para full record management |
| **Atlassian** | DynamicTable | Sí | Sí | No | No | table | isRankable (drag sort); stateful |
| **Ant Design** | Table | Sí | Sí | Sí | Sí (virtual) | table | summary (footer row); tree-data; fixed cols |
| **MUI / Joy UI** | DataGrid (Free/Pro) | Sí | Sí | Sí | Sí (Pro) | grid | Column resize; Pro features (virtualization) |
| **Tanstack Table** | — | Sí | Sí | Sí | Sí | — | Headless; renderless; cualquier markup |
| **AG Grid** | Grid | Sí | Sí | Sí | Sí | grid | Enterprise grid; infinite scroll; pivot |
| **Fluent 2** | DataGrid | Sí | Sí | No | No | grid | Column width; resizable |
| **Mantine** | DataTable | Sí | Sí | Sí | No | table | pinned columns; row context menu |

**Patrones clave de la industria:**
1. **Carbon TableToolbar** — el más documentado: toolbar con search + filter + bulk actions + download. El pattern de separar toolbar (comportamiento) de DataGrid (rendering) es el más adoptado.
2. **Spectrum TableView** — la implementación más completa de ARIA grid: `role="grid"` con arrow-key 2D navigation, column resizing, y virtualization. Referencia de accesibilidad.
3. **Ant Design summary** — soporte para filas de totales/footer con `summary` prop. Essential para reporting grids con aggregations.
4. **`<table>` nativo vs `role="grid"`** — `<table>` tiene mejor soporte AT legacy (NVDA, JAWS con VoiceOver en Windows). `role="grid"` habilita arrow-key 2D navigation. Carbon por default usa `<table>`; Spectrum usa `role="grid"`. Recomendación: `<table>` por defecto, `role="grid"` opt-in.

---

## Tokens

**38 tokens** · prefijo `dg-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `dg/compact/h` | `sizing/32` | Row height compact |
| `dg/default/h` | `sizing/40` | Row height default |
| `dg/comfortable/h` | `sizing/48` | Row height comfortable |
| `dg/header/bg` | `surface/hover` | Background header |
| `dg/header/fg` | `text/primary` | Texto header |
| `dg/header/fontWeight` | `type/weight-semibold` | Peso header |
| `dg/header/sorted/bg` | `brand/subtle` | Header sorted bg |
| `dg/header/sorted/fg` | `interactive/default` | Header sorted fg |
| `dg/body/bg` | `surface/default` | Background body |
| `dg/body/fg` | `text/primary` | Texto body |
| `dg/row/hover/bg` | `surface/hover` | Row hover |
| `dg/row/selected/bg` | `brand/subtle` | Row selected bg |
| `dg/row/selected/border` | `interactive/hover` | Row selected border |
| `dg/row/expanded/borderLeft` | `interactive/default` | Expanded row accent |
| `dg/row/focused/ring` | `focus/ring` | Focus ring |
| `dg/row/disabled/opacity` | `opacity/disabled` | Disabled opacity |
| `dg/zebra/bg` | `surface/pressed` | Zebra alternado |
| `dg/border/default` | `border/default` | Borde filas |
| `dg/border/strong` | `border/hover` | Borde Bordered=on |
| `dg/cell/px/sm` | `spacing/3` | PaddingX sm |
| `dg/cell/px/md` | `spacing/4` | PaddingX md |
| `dg/cell/px/lg` | `spacing/5` | PaddingX lg |
| `dg/cell/fontSize/sm` | `type/xs` | Font size sm |
| `dg/cell/fontSize/md` | `type/sm` | Font size md |
| `dg/cell/fontSize/lg` | `type/md` | Font size lg |
| `dg/toolbar/h` | `sizing/56` | Toolbar height |
| `dg/toolbar/bg` | `surface/default` | Toolbar background |
| `dg/pagination/h` | `sizing/48` | Pagination height |
| `dg/pagination/bg` | `surface/default` | Pagination background |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Density compact:     header:32px · row:32px · font:12px │
│  Density default:     header:40px · row:40px · font:13px │
│  Density comfortable: header:48px · row:48px · font:14px │
│                                                          │
│  Expanded row: border-left 3px · interactive/default     │
│  Selected row: background brand/subtle                   │
│  Sorted header: background brand/subtle                  │
│                                                          │
│  Sub-componentes:                                        │
│  Cell: Type(3) × Alignment(3) × State(4) × Size(3) −    │
│        exclusiones = 72 frames                          │
│  Row:  State(6) × Type(4) × Density(3) − 24 = 48 frames│
│  DataGrid: Density(3) × Sticky(2) × Zebra(2) ×          │
│            Bordered(2) = 24 frames                      │
│                                                          │
│  Frames totales: 72 + 48 + 24 = 144 frames              │
└──────────────────────────────────────────────────────────┘
```
