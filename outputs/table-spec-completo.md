# Table

## Overview

La Table es un componente tabular para mostrar datos estructurados en filas y columnas. Soporta ordenamiento, seleccion de filas, densidad variable y decoraciones visuales (zebra stripes, bordes). Se compone de sub-componentes — `.TableHeaderCell`, `.TableCell`, `.TableRow` — que se ensamblan dentro de un shell contenedor.

```
  ┌───┬──────────────┬──────────────┬──────────────┐
  │ □ │ Nombre     ▲ │ Correo       │ Rol          │  ← .TableHeaderCell
  ├───┼──────────────┼──────────────┼──────────────┤
  │ ☑ │ Ana Garcia   │ ana@mail.com │ Admin        │  ← .TableRow (selected)
  ├───┼──────────────┼──────────────┼──────────────┤
  │ □ │ Luis Lopez   │ luis@mail.com│ Editor       │  ← .TableRow (default)
  ├───┼──────────────┼──────────────┼──────────────┤
  │ □ │ Maria Perez  │ maria@m.com  │ Viewer       │  ← .TableRow (striped)
  └───┴──────────────┴──────────────┴──────────────┘
```

El componente Table no tiene variantes propias — es un shell de composicion. La complejidad vive en los sub-componentes: `.TableHeaderCell` maneja estados de sort, `.TableCell` maneja densidad, y `.TableRow` maneja estados de interaccion (hover, selected, disabled).

Variantes (cambian la apariencia — generan variantes en Figma):

```
  .TableHeaderCell
    Estado        default · hover · sorted-asc · sorted-desc    Interaccion de sort

  .TableCell
    Densidad      compact · default · comfortable               Altura: 32 / 40 / 48px

  .TableRow
    Estado        default · hover · selected · disabled          Interaccion de fila
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Bordered           Borde exterior de la tabla
  ☐ Striped            Filas alternadas con fondo sutil (zebra)
  ☐ Sticky Header      Header fijo al hacer scroll
  ☐ Selection          Columna de checkboxes para seleccion
  ☐ Pagination         Controles de paginacion debajo
  ☐ Sort Icon          Icono de sort en header cells
  ☐ Checkbox           Checkbox en filas (ligado a Selection)
  ☐ Striped Row        Fondo alterno en fila (ligado a Striped)
```

### Panel de propiedades en Figma

```
┌─ Table ──────────────────────────────┐
│                                      │
│  Boolean Properties                  │
│  ☑ Bordered          ☐ Striped       │
│  ☐ Sticky Header     ☐ Selection    │
│  ☐ Pagination                        │
│                                      │
└──────────────────────────────────────┘

┌─ .TableHeaderCell ───────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ State                  ▼ def.. │  │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☐ Sort Icon                         │
│                                      │
│  Text Properties                     │
│  ✏️ Label        [ Column         ]  │
│                                      │
└──────────────────────────────────────┘

┌─ .TableCell ─────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ Density               ▼ def.. │  │
│  └─────────────────────────────────┘ │
│                                      │
│  Text Properties                     │
│  ✏️ Content      [ Cell value     ]  │
│                                      │
└──────────────────────────────────────┘

┌─ .TableRow ──────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ State                  ▼ def.. │  │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☐ Checkbox          ☐ Striped       │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿Necesitas mostrar datos estructurados con multiples atributos?
  │
  ├─ Son 1-3 items con pocos atributos → usa una Lista o Cards
  │
  ├─ Datos tabulares comparativos (filas + columnas) → usa Table ✓
  │
  ├─ Necesitas edicion inline celda por celda → usa Data Grid (role="grid")
  │
  ├─ Son metricas/KPIs sin estructura tabular → usa Dashboard/Stats cards
  │
  └─ Es una lista de navegacion (click → detalle) → usa List con links
```

**Usa Table cuando:**
- Los datos tienen multiples atributos por item (nombre, email, rol, fecha)
- El usuario necesita comparar valores entre filas
- Se necesita ordenar, filtrar o seleccionar filas
- Hay operaciones batch sobre multiples items (eliminar, exportar, asignar)

**NO uses Table cuando:**
- Hay menos de 3 items → una lista simple es mejor
- Cada item necesita visualizacion rica (imagenes, graficos) → usa Cards
- Es un formulario con campos editables → usa Form layout
- En mobile con muchas columnas → considera Cards o layout stacked

---

## Variaciones visuales

### Estados del header cell

```
  default                  hover                    sorted-asc            sorted-desc
  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐  ┌──────────────────┐
  │ Column           │     │ Column           │     │ Column  ▲        │  │ Column  ▼        │
  └──────────────────┘     └──────────────────┘     └──────────────────┘  └──────────────────┘
  bg gris sutil            bg gris oscuro           icono sort azul       icono sort azul
```

### Densidad de celdas

```
  compact (32px)     ┌───────────────────┐    dashboards densos, datos numericos
                     │ Cell value        │    font 12px · py 4 · px 12
                     └───────────────────┘

  default (40px)     ┌───────────────────┐    tablas estandar (default)
                     │ Cell value        │    font 14px · py 8 · px 12
                     └───────────────────┘

  comfortable (48px) ┌───────────────────┐    tablas espaciosas, lectura prolongada
                     │ Cell value        │    font 14px · py 12 · px 16
                     └───────────────────┘
```

### Estados de fila

```
  default                                    hover
  ┌────────────────────────────────────┐     ┌────────────────────────────────────┐
  │ □  Ana Garcia   ana@mail   Admin   │     │ □  Ana Garcia   ana@mail   Admin   │
  └────────────────────────────────────┘     └────────────────────────────────────┘
  bg blanco                                  bg gris muy sutil

  selected                                   disabled
  ┌────────────────────────────────────┐     ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
  │ ☑  Ana Garcia   ana@mail   Admin   │     ╎ □  Ana Garcia   ana@mail   Admin   ╎
  └────────────────────────────────────┘     └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
  bg azul claro + checkbox checked           opacity 50%, no interactivo
```

### Striped vs bordered

```
  striped                                    bordered
  ┌──────────────┬──────────────┐            ┌──────────────┬──────────────┐
  │ Header 1     │ Header 2     │            │ Header 1     │ Header 2     │
  ├──────────────┼──────────────┤            ├──────────────┼──────────────┤
  │ Cell         │ Cell         │            │ Cell         │ Cell         │
  ├──────────────┼──────────────┤            ├──────────────┼──────────────┤
  │▓▓▓▓Cell▓▓▓▓▓│▓▓▓▓Cell▓▓▓▓▓│            │ Cell         │ Cell         │
  ├──────────────┼──────────────┤            ├──────────────┼──────────────┤
  │ Cell         │ Cell         │            │ Cell         │ Cell         │
  └──────────────┴──────────────┘            └──────────────┴──────────────┘
  filas alternas con bg sutil                borde completo alrededor + entre celdas
```

---

## Decisiones de diseno

### 1. Tabla presentacional, no data grid monolitico

Los sistemas se dividen en dos campos. Ant Design y Lightning meten todo en un componente (50+ props). Paste, Radix y shadcn/ui ofrecen primitivos semanticos y delegan sort/filter a TanStack Table. El approach monolitico genera componentes masivos con API inmanejable.

**Nosotros: presentacional.** La Table maneja la presentacion visual (densidad, estados, decoraciones). La logica de datos (sort, filter, pagination) vive en el codigo. En Figma, esto significa un shell limpio con sub-componentes configurables.

### 2. Density, no Size

15/23 sistemas ofrecen density (compact/default/comfortable) que cambia padding y font-size, no el componente entero. Ninguno crea un componente separado por densidad. M3 lo llama density; Carbon usa tres sizes que son efectivamente densidades.

**Nosotros: Density en `.TableCell`.** compact(32px), default(40px), comfortable(48px). Controla padding + fontSize. Es una variable mode, no un componente separado.

### 3. Sub-componentes por responsabilidad

Spectrum separa hooks headless de componente visual. Carbon separa toolbar como componente hermano. La descomposicion canonica es: HeaderCell (sort), Cell (densidad), Row (seleccion/estados), Table (shell).

**Nosotros: 4 sub-componentes.** `.TableHeaderCell` tiene 4 estados de sort. `.TableCell` tiene 3 densidades. `.TableRow` tiene 4 estados. `Table` es el shell de composicion sin variantes propias.

### 4. Booleans para decoraciones, no variantes

Striped, bordered, selectable, stickyHeader — son decoraciones visuales que no cambian estructura. 15+ sistemas los implementan como toggles booleanos. Si fueran variantes, multiplicarian frames exponencialmente (striped x bordered x selectable = 8 combinaciones x densidades x estados...).

**Nosotros: todo boolean.** Cero multiplicacion de frames. Un solo frame de Table shell.

### 5. role="table" como default, no role="grid"

Carbon, Polaris y GOV.UK usan `role="table"` — Tab entre elementos interactivos, no navegacion por celdas. Spectrum, Fluent y Lightning usan `role="grid"` con arrow keys entre celdas. Grid es necesario para inline edit y cell-level interactions.

**Nosotros: `role="table"` default.** La mayoria de tablas son read-only con sort y select. Si hay inline edit, el dev cambia a `role="grid"`.

### Combinaciones excluidas

```
  disabled + hover/focus/selected     fila deshabilitada no reacciona
  loading + sort/filter/expand        tabla ocupada, no acepta operaciones
  empty + sort/filter/select          sin datos, nada que operar
```

---

## Comportamiento

### Lo esencial para disenar

1. **Sort via click en header.** El header debe ser un `<button>`, no un `<div>`. Click alterna entre ascending → descending → none. El icono de sort cambia para reflejar la direccion.

2. **Seleccion via checkbox, no click en fila.** 14/23 sistemas usan checkbox dedicado. Click en fila puede conflictuar con links, expand, o row actions.

3. **Density cambia padding, no estructura.** Compact para dashboards densos, comfortable para lectura prolongada. Es un cambio de spacing, no de layout.

4. **Sticky header mantiene contexto.** En tablas largas, el header fijo permite saber que columna es cada dato. Solo funciona si el scroll container es directo (no anidado).

5. **Striped y bordered son independientes.** Puedes tener ambos, uno, o ninguno. Son decoraciones ortogonales.

6. **En mobile, scroll horizontal con indicador.** Solo Cedar (REI) tiene layout stacked. La mayoria usa scroll horizontal. Un indicador visual de "hay mas columnas" ayuda.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Table | `table` o `grid` | `aria-label` o `<caption>` | SR anuncia el proposito de la tabla |
| Header cell | `columnheader` | `scope="col"`, `aria-sort` | SR anuncia nombre de columna y estado de sort |
| Data row | `row` | `aria-selected` (si selectable) | SR anuncia si la fila esta seleccionada |
| Data cell | `cell` | contenido leido directamente | SR lee celda por celda al navegar |
| Checkbox | `checkbox` | `aria-label="Seleccionar [nombre]"` | SR anuncia que item se selecciona |
| Sort button | `button` | dentro de `<th>`, `aria-sort` | SR anuncia "ordenar por [columna], ascendente" |

### Navegacion por teclado

Interacciones principales (las que afectan el diseno):

```
  Tab                   foco entra a la tabla → primer elemento interactivo
  Enter / Space         activa sort en header, toggle checkbox en fila
  ↑ ↓                   navega entre filas (role="grid") o entre checkboxes
```

Interacciones secundarias (no afectan diseno, referencia para dev):

```
  ← →                   navega entre celdas (solo role="grid")
  Home / End             primera / ultima celda de la fila
  Ctrl+Home / Ctrl+End   primera / ultima celda de la tabla
  Space                  selecciona fila (si hasCheckbox)
```

---

## Guia de contenido

**Headers:** Breves y descriptivos. "Nombre", "Fecha", "Estado" — no "Nombre completo del usuario registrado". Evitar abreviaturas ambiguas.

**Celdas:** Contenido consistente por columna. Si una celda tiene fecha, todas las celdas de esa columna deben tener fecha. Alinear numeros a la derecha (GOV.UK research-backed).

**Empty state:** Cuando no hay datos, mostrar ilustracion + texto descriptivo + accion. "No hay resultados. Intenta con otros filtros" — no dejar la tabla vacia.

**Caption:** Describir el proposito de la tabla. "Usuarios activos en los ultimos 30 dias" — no "Tabla de usuarios".

**Seleccion:** El checkbox del header selecciona/deselecciona todos. Cuando hay filas seleccionadas, mostrar conteo: "3 seleccionados".

---

## Checklist antes de construir

```
  ☐ ¿Cuantas columnas tendra?
    └─ Mas de 6-7 → considerar scroll horizontal o column hiding
    └─ Columnas numericas → alinear a la derecha

  ☐ ¿Necesita sort?
    └─ Si → activar sort icon en headers relevantes
    └─ ¿Sort solo cliente o server-side?

  ☐ ¿Necesita seleccion de filas?
    └─ Si → activar checkbox column
    └─ ¿Que acciones batch? (eliminar, exportar, asignar)

  ☐ ¿Que densidad?
    └─ compact = dashboards, datos numericos
    └─ default = tablas generales
    └─ comfortable = lectura prolongada, tablas con texto largo

  ☐ ¿Striped o bordered?
    └─ Striped = muchas filas similares (facilita lectura horizontal)
    └─ Bordered = datos densos, celdas con mucha info

  ☐ ¿Cuantas filas se esperan?
    └─ Menos de 50 → scroll simple
    └─ 50-200 → pagination
    └─ Mas de 200 → considerar virtual scroll

  ☐ ¿La tabla va dentro de otro container?
    └─ Si → verificar sticky header funciona con scroll container padre
```

---

## Relacion con otros componentes

```
  List            Para items simples sin estructura columnar
  Card            Para items con visualizacion rica (imagenes, graficos)
  Pagination      Se compone debajo de la tabla para navegar paginas
  Checkbox        Reutilizado dentro de .TableRow para seleccion
  Button          Usado en toolbar/batch action bar para acciones masivas
  Badge/Tag       Para estados en celdas (activo, pendiente, error)
  Drawer          Patron "detail panel": click en fila → drawer con detalles
```

---

## Referencia: como lo hacen otros sistemas

**Tabla presentacional (DS liviano):**
- Paste (Twilio): semantica pura, sin sort/filter built-in
- Radix: primitivos composables, `size` para density
- shadcn/ui: primitivos + receta TanStack Table para features completas

**Data grid completo (DS enterprise):**
- Ant Design: maximalist — virtual scroll, tree data, column filters, expandable, todo en uno
- Lightning (Salesforce): sort, inline edit, row actions, virtual scroll
- Fluent 2: sobre TanStack Table v8, `focusMode` configurable

**Enfoques especializados:**
- Carbon (IBM): batch action bar como primer ciudadano, toolbar hermano separado
- Polaris (Shopify): DataTable (display) vs IndexTable (gestion) — split por caso de uso
- Atlassian: `isRankable` built-in con drag-and-drop accesible
- GOV.UK: caption obligatorio, scope en todos los headers, numeros a la derecha

**Consenso universal (23/23):**
- HTML semantico (`<table>`, `<th>`, `<td>`) como base
- Sort via header interactivo
- Density como dimension, no componente separado
- Checkbox column para seleccion de filas

---

## Tokens

**35 tokens** · prefijo `tbl-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--tbl-bg` | `surface/default` | Fondo de la tabla |
| `--tbl-border` | `border/mid/default` | Borde exterior |
| `--tbl-divider` | `border/light/default` | Separador entre filas |
| `--tbl-header-bg` | `surface/secondary` | Fondo de header row |
| `--tbl-header-fg` | `text/secondary` | Texto de header (uppercase-style) |
| `--tbl-header-bg-hover` | `surface/hover` | Header cell en hover |
| `--tbl-cell-fg` | `text/label` | Texto de celda |
| `--tbl-cell-fg-secondary` | `text/secondary` | Texto secundario en celda |
| `--tbl-row-bg-hover` | `surface/hover` | Fila en hover |
| `--tbl-row-bg-selected` | `surface/selected` | Fila seleccionada |
| `--tbl-row-bg-striped` | `surface/subtle` | Fila zebra stripe |
| `--tbl-row-fg-disabled` | `text/disabled` | Texto de fila deshabilitada |
| `--tbl-sort-fg` | `icon/secondary` | Icono sort inactivo |
| `--tbl-sort-fg-active` | `interactive/default` | Icono sort activo |
| `--tbl-checkbox-border` | `border/mid/default` | Borde del checkbox |
| `--tbl-checkbox-checked` | `interactive/default` | Checkbox marcado |
| `--tbl-focus-ring` | `border/focus` | Anillo de foco |

### Specs de spacing

```
  ┌─ Table ──────────────────────────────────────────────────┐
  │                                                          │
  │  ┌─ .TableHeaderCell ─────────────────────────────────┐  │
  │  │ ←12→ [Label text] ←4→ [sort-icon 16px]        ←12→│  │
  │  │      ↕ 8                                      ↕ 8 │  │
  │  │      altura: 40px · fontSize: 12px                 │  │
  │  └────────────────────────────────────────────────────┘  │
  │  ── divider ────────────────────────────────────────── │  │
  │  ┌─ .TableRow ─ .TableCell ───────────────────────────┐  │
  │  │ ←px→ [Cell value text]                         ←px→│  │
  │  │      ↕ py                                     ↕ py │  │
  │  └────────────────────────────────────────────────────┘  │
  │                                                          │
  └──────────────────────────────────────────────────────────┘

  .TableCell por densidad:
    compact:      h=32, fontSize=12, py=4,  px=12
    default:      h=40, fontSize=14, py=8,  px=12
    comfortable:  h=48, fontSize=14, py=12, px=16

  .TableHeaderCell:
    h=40, fontSize=12, py=8, px=12, gap icon=4

  radius tabla:     8px (solo la tabla shell, no celdas individuales)
  ancho default:    800px (fill container en la practica)
  checkbox column:  ancho 40px
```
