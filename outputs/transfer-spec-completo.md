# Transfer

## Overview

Transfer es un selector de doble lista (dual-list selector) que permite mover elementos entre un panel "Disponibles" (source) y un panel "Seleccionados" (target) mediante botones de acción centrales. Es un campo de formulario controlado, diseñado para casos de asignación enterprise: usuarios a grupos, permisos a roles, campos a reportes, recursos a propietarios. La simultaneidad de visibilidad — ver qué hay disponible y qué está seleccionado al mismo tiempo — es el valor diferenciador que justifica la complejidad visual del componente frente a un multi-select combobox.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Asignar Usuarios al Grupo                                              │
│                                                                         │
│  ┌─────────────────────────┐         ┌─────────────────────────┐       │
│  │ Disponibles (12)        │         │ Seleccionados (3)        │       │
│  │ ┌─────────────────────┐ │         │ ┌─────────────────────┐ │       │
│  │ │ 🔍 Buscar...        │ │  [ ▶ ]  │ │ 🔍 Buscar...        │ │       │
│  │ └─────────────────────┘ │  [ ▶▶]  │ └─────────────────────┘ │       │
│  │ ☑ Seleccionar todo (4) │  [ ◀ ]  │ ☑ Seleccionar todo      │       │
│  │ ─────────────────────── │  [ ◀◀]  │ ─────────────────────── │       │
│  │ ☐  Alice Chen           │         │ ☑  Bob Martinez          │       │
│  │ ☑  Carol Davis          │         │ ☐  David Kim             │       │
│  │ ☑  Emma Wilson          │         │ ☐  Fiona Taylor          │       │
│  │ ☐  George Brown         │         │                          │       │
│  └─────────────────────────┘         └─────────────────────────┘       │
│  ▶ = mover seleccionados →    ▶▶ = mover todos →                       │
│  ◀ = mover seleccionados ←    ◀◀ = mover todos ←                       │
└─────────────────────────────────────────────────────────────────────────┘
```

El componente Transfer es una familia de 3 sub-componentes construidos jerárquicamente: `TransferItem` (fila individual) → `TransferList` (panel con header, búsqueda, lista, footer) → `Transfer` (ensamblado completo con dos paneles + botones de acción).

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Transfer:
  Size:        sm | md
  OneWay:      no | yes
  Orientation: horizontal | vertical

TransferList:
  Side:        source | target
  State:       default | empty | loading
  Size:        sm | md

TransferItem:
  State:       default | hover | selected | focused | disabled
  Size:        sm | md
```

Toggles (show/hide parts — do NOT generate extra variants):

```
TransferList:
  👁 Show Search   → campo de búsqueda/filtro en el panel
  👁 Show Footer   → paginación u acción custom en el panel

TransferItem:
  👁 Show Checkbox     → checkbox leading
  👁 Has Avatar        → avatar de persona
  👁 Has Leading Icon  → ícono antes del label
  👁 Has Description   → segunda línea descriptiva
  👁 Has Trailing Meta → metadata trailing (rol, departamento, count)
```

### Figma properties panel

```
┌─────────────────────────────────────────┐
│  Transfer                               │
│  ─────────────────────────────────────  │
│  Size        ○ sm   ○ md               │
│  OneWay      ○ no   ○ yes              │
│  Orientation ○ horizontal  ○ vertical  │
│  ─────────────────────────────────────  │
│  TransferList (sub-panel)              │
│  Side    ○ source  ○ target            │
│  State   ○ default ○ empty ○ loading  │
│  👁 Show Search      [toggle]          │
│  👁 Show Footer      [toggle]          │
│  ─────────────────────────────────────  │
│  TransferItem (sub-panel)              │
│  State   ○ default ○ hover             │
│          ○ selected ○ focused          │
│          ○ disabled                    │
│  👁 Show Checkbox     [toggle]         │
│  👁 Has Avatar        [toggle]         │
│  👁 Has Leading Icon  [toggle]         │
│  👁 Has Description   [toggle]         │
│  👁 Has Trailing Meta [toggle]         │
└─────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El usuario necesita asignar/seleccionar múltiples items?
│
├─ ¿Necesita ver simultáneamente qué hay disponible Y qué está seleccionado?
│   ├─ SÍ → Transfer
│   └─ NO → Multi-select combobox/autocomplete
│
├─ ¿El dataset tiene >300 items?
│   └─ NO usar Transfer → considerar typeahead multi-select con búsqueda
│
├─ ¿Es en viewport <600px (mobile)?
│   └─ NO usar Transfer → usar modal picker (ResourcePicker pattern)
│
├─ ¿El orden de los seleccionados importa?
│   └─ Añadir reorder en target (Lightning pattern — fuera de scope actual)
│
└─ ¿Solo hay asignación en una dirección (source siempre crece, target acumula)?
    └─ SÍ → OneWay=yes (no botón de mover de vuelta)
```

**Usar Transfer cuando:**
- La tarea es de asignación enterprise donde el usuario necesita visualizar simultáneamente los items disponibles y los ya seleccionados: asignar usuarios a grupos, permisos a roles, campos a reportes, recursos a propietarios.
- El dataset del source es navegable (< ~300 items), lo que hace valioso el scrolling visual en lugar de búsqueda-primero.
- La selección no es de un solo item sino de un subconjunto de una lista, y el usuario necesita revisar qué queda sin seleccionar.
- La operación es bidireccional (el usuario puede equivocarse y querer devolver items al source).

**NO usar Transfer cuando:**
- El dataset tiene más de ~300 items — la promesa del Transfer (ver todo disponible) se rompe; usar multi-select combobox con typeahead y búsqueda.
- El viewport es mobile (<600px) — los paneles side-by-side son inutilizables; usar modal picker o selector paso a paso.
- Solo se necesita selección simple o de pocos items — un checkbox group o multi-select combobox tiene menos overhead visual.
- El caso de uso es selección de archivos o recursos con muchos atributos por item — considerar un DataGrid con multi-select en lugar de Transfer.
- Es para asignación de permisos críticos de seguridad — considerar un flujo por pasos con confirmación explícita (el Transfer puede hacer operaciones destructivas accidentalmente con "mover todos").

---

## Visual variations

### Transfer principal

**Orientation=horizontal (default)**
```
[source list]  [▶][▶▶][◀][◀◀]  [target list]
```
Los dos paneles se muestran lado a lado con los botones de acción en el centro. Es el layout estándar para desktop.

**Orientation=vertical**
```
[source list]
[▶][◀]
[target list]
```
Los paneles se apilan con los botones de acción entre ellos. Para layouts móviles o paneles verticales.
Exclusión: `Orientation=vertical + Size=sm` no está permitido — vertical necesita más altura para ser funcional.

**OneWay=yes**
Solo aparecen los botones `▶` y `▶▶` (mover a target). No hay botones `◀` ni `◀◀`. En el target, los items tienen un botón `✕` para eliminarlos individualmente en lugar del botón de mover-back.

### TransferList por Side

**Side=source** — Header muestra "Disponibles (N)" con checkbox de seleccionar-todo. Search visible cuando `Show Search=true`. Footer de paginación cuando `Show Footer=true`.

**Side=target** — Header muestra "Seleccionados (N)" con mismo pattern. En `OneWay=yes`, los items del target tienen `✕` individual para remover.

### TransferList por State

| State | Apariencia |
|-------|-----------|
| default | Lista con items, scroll, interactiva |
| empty | Estado vacío centrado: "No hay items disponibles" o "Sin selección aún" |
| loading | Skeleton loader o spinner centrado mientras se cargan los datos |

### TransferItem por State

| State | BG | Texto | Detalles |
|-------|-----|-------|---------|
| default | transparent | `text/primary` | — |
| hover | `surface/hover` | `text/primary` | BG sutil |
| selected | `brand/subtle` | `interactive/default` | Font weight 500 |
| focused | transparent | `text/primary` | Ring 2px visible |
| disabled | transparent | `text/disabled` | Opacity 0.6, cursor not-allowed |

### TransferItem por contenido (booleans)

**Mínimo (solo label):**
```
[☑] Nombre del item
```

**Con descripción:**
```
[☑] Nombre del item
    Descripción secundaria del item
```

**Person (avatar + email):**
```
[☑] [👤] Alice Chen
         alice@empresa.com • Admin
```

**Rich (icon + label + meta):**
```
[☑] [📁] Nombre del item           [metadata]
         Descripción opcional
```

---

## Design decisions

### 1. Familia de 3 sub-componentes: TransferItem → TransferList → Transfer

**Por qué:** La arquitectura de 3 niveles permite reutilizar `TransferList` de forma independiente (como un panel de display-only con selectAll) y `TransferItem` en otros contextos (resultados de búsqueda, picker modals, listas de asignación). Ant Design es el único sistema T1 con Transfer nativo — su arquitectura de componentes anidados es la referencia canónica.

**Tradeoff:** Más componentes para configurar en Figma. El beneficio de reutilización en el DS justifica la inversión. Los 3 componentes tienen frame counts separados que suman 29 frames en total.

### 2. Side property (source/target) en TransferList como property discreta

**Por qué:** Los paneles source y target tienen semántica visual y de contenido diferentes: source muestra "Disponibles" + búsqueda (siempre), target muestra "Seleccionados" + paginación (cuando los items crecen). La property Side permite construir ambos paneles como frames distintos sin variables condicionales complejas.

**Tradeoff:** El designer debe crear y gestionar dos instances de TransferList en el Transfer. Esto es intencional — los paneles son distintos visualmente aunque compartan la misma estructura.

### 3. OneWay como property con 2 valores

**Por qué:** El caso de uso de "agregar permisos" es muy común en enterprise: source infinito, target solo crece y permite eliminación individual. Modelado como `OneWay=yes` oculta los botones de mover-back y muestra iconos `✕` en los items del target. Ant Design tiene `oneWay` prop para este exacto caso.

**Tradeoff:** La eliminación individual en target (botón ×) es un slot adicional que requiere variante del TransferItem. Vale la pena modelarlo explícitamente dado lo común del caso de uso.

### 4. Cuatro botones de acción estándar: ▶ ◀ ▶▶ ◀◀

**Por qué:** Ant Design tiene 2 botones (mover seleccionados). Los casos de uso enterprise frecuentemente necesitan "mover todos" (▶▶ ◀◀) especialmente cuando hay filtros activos — el usuario puede filtrar a 5 items y querer moverlos todos a la vez. 4 botones cubren: mover seleccionados → , mover todos → , mover seleccionados ← , mover todos ←.

**Tradeoff:** Más superficie de botones en el centro. Los botones de "mover todos" deben deshabilitarse cuando no hay items que mover (lista source/target vacía o sin selección).

### 5. Search + pagination como slots opcionales por separado

**Por qué:** Para listas < 50 items, la búsqueda añade overhead sin valor. Para listas > 100 items, la búsqueda es esencial. Modelamos como booleans independientes: `Show Search` y `Show Footer` (paginación). Esto permite configurar por caso: sin búsqueda sin paginación (listas pequeñas), solo búsqueda (listas medianas), ambos (listas grandes).

**Tradeoff:** Más opciones para el designer al configurar instancias. Documentar el umbral recomendado: Search=on para >20 items, Footer=on para >100 items.

### Excluded combinations

```
Orientation=vertical + Size=sm  ← vertical necesita más altura mínima para ser funcional
```

---

## Behavior

### Essential para diseño

**Selección en paneles:** Los items se seleccionan con checkbox (click o Space). El checkbox de header "Seleccionar todo" selecciona/deselecciona todos los items visibles (no los ocultos por filtro). El estado `indeterminate` del checkbox header indica selección parcial.

**Mover items:** El botón ▶ mueve los items actualmente seleccionados en source al target. El botón ▶▶ mueve TODOS los items visibles (si hay filtro activo, solo mueve los items filtrados — safeguard crítico de Mantine). Lo mismo aplica a ◀ y ◀◀.

**Búsqueda:** El campo de búsqueda filtra en tiempo real los items del panel. El filtro es case-insensitive y busca en label y descripción. Al filtrar, el contador del header refleja "N resultados de M total".

**Focus return:** Después de mover items, el foco regresa al panel de origen (source) en el primer item de la lista resultante.

**Estado vacío:** Cuando un panel queda sin items (todos movidos al otro lado), muestra el estado empty con mensaje apropiado: source vacío = "No hay más items disponibles", target vacío = "No has seleccionado ningún item aún".

**Disabled items:** Items con `disabled=true` no pueden seleccionarse ni moverse. Deben distinguirse visualmente (opacity 0.6, cursor not-allowed) y tenerse en cuenta en el "seleccionar todo" — el selectAll omite los disabled.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Contenedor Transfer | `group` | `aria-label="Transferir items"` | Identifica la región completa para AT |
| Panel source | `listbox` | `aria-multiselectable="true"`, `aria-label="Disponibles, 12 items"` | Identifica el panel y su count |
| Panel target | `listbox` | `aria-multiselectable="true"`, `aria-label="Seleccionados, 3 items"` | Idem para target |
| Header con count | — | Count en el aria-label del listbox | Informa cantidad sin visión |
| TransferItem | `option` | `aria-selected="true/false"` | Estado de selección de cada opción |
| Botón ▶ | `button` | `aria-label="Mover 2 items seleccionados a Seleccionados"` | Contexto dinámico con count |
| Botón ▶▶ | `button` | `aria-label="Mover todos a Seleccionados"` | Diferenciado de move-selected |
| Botón ◀ | `button` | `aria-label="Mover seleccionados a Disponibles"` | Dirección inversa |
| Botón ◀◀ | `button` | `aria-label="Mover todos a Disponibles"` | Move-all inverso |
| Live region | — | `aria-live="polite"` en el contador | Anuncia "2 items movidos a Seleccionados" |
| Item disabled | `option` | `aria-disabled="true"` | No seleccionable |
| Search input | `input` | `aria-label="Buscar en Disponibles"` / `"Buscar en Seleccionados"` | Labels distintos por panel |

### Keyboard navigation

Primary interactions (affect design):

```
Tab                    → source search → source list → action buttons → target list → target search
Arrow Up/Down          → navega entre items dentro de la lista enfocada
Space                  → toggle selección del item enfocado
Enter (action button)  → mover items seleccionados → focus regresa a source/target
Shift+Click            → rango de selección (mouse)
```

Secondary interactions (dev reference):

```
Ctrl/Cmd+A             → selecciona todos los items visibles (Spectrum pattern)
Shift+Arrow            → extend selection (multiple)
Home/End               → primer/último item de la lista
Tab (dentro de list)   → sale de la lista y pasa a los action buttons
```

---

## Content guide

### Slot: header (TransferList)
El header muestra el título del panel + count de items + estado de selección. Formato: "Disponibles (12)" o "Disponibles, 12 items, 4 seleccionados" (versión accesible completa para aria-label). El título debe ser específico del caso de uso: "Usuarios disponibles", "Permisos disponibles", "Campos disponibles". No usar el genérico "Source" o "Target".

### Slot: search (TransferList)
Placeholder: "Buscar usuarios…", "Filtrar permisos…" — específico del tipo de item. Evitar "Buscar…" genérico. El campo debe tener un label visible o `aria-label` descriptivo distinto para cada panel.

### Slot: emptyState (TransferList)
Dos estados diferentes:
- Panel source vacío: "Todos los items han sido movidos" o "No hay [items] disponibles"
- Panel target vacío: "No has seleccionado ningún [item] aún"

### Slot: label (TransferItem)
Texto principal del item. Debe ser único dentro de la lista (o tener un discriminador secundario para items con mismo nombre).

### Slot: description (TransferItem)
Segunda línea opcional. Uso para: email, rol, departamento, descripción breve. Max 1 línea.

### Slot: trailingMeta (TransferItem)
Metadata trailing alineado a la derecha. Uso para: rol, conteo, fecha, status breve. Max 10–15 caracteres.

### Action buttons labels
- ▶ : "Mover →" o solo el ícono con aria-label descriptivo
- ▶▶: "Mover todos →"
- ◀ : "Mover ←"
- ◀◀: "Mover todos ←"
Los labels deben actualizarse dinámicamente en el aria-label cuando hay una selección activa: "Mover 3 usuarios seleccionados".

---

## Pre-build checklist

```
Figma — TransferItem
□ 10 frames: State(5) × Size(2)
□ Booleans: Show Checkbox, Has Avatar, Has Leading Icon, Has Description, Has Trailing Meta
□ Text properties: Label, Description, Meta
□ Swap slots: Checkbox, Avatar, Leading Icon
□ Estados de selección claramente diferenciados: selected usa brand/subtle + interactive/default

Figma — TransferList
□ 12 frames: Side(2) × State(3) × Size(2)
□ Booleans: Show Search, Show Footer
□ Header con count dinámico documentado
□ Estado empty con mensaje diferenciado por Side
□ Estado loading con skeleton/spinner

Figma — Transfer
□ 7 frames: Size(2) × OneWay(2) × Orientation(2) − 1 exclusión
□ Exclusión aplicada: Orientation=vertical + Size=sm eliminado
□ 4 botones de acción en horizontal: ▶ ▶▶ ◀ ◀◀
□ 2 botones en OneWay=yes: solo ▶ ▶▶
□ Orientation=vertical documentado

Accesibilidad
□ Roles ARIA documentados: group > listbox > option
□ aria-labels de paneles con count documentados
□ aria-labels de botones de acción con contexto dinámico
□ aria-live region para anuncios de movimiento documentada
□ Regla: "mover todos" con filtro activo = solo mover filtrados

Contenido
□ Títulos de paneles específicos al caso de uso (no "Source/Target")
□ Placeholder de búsqueda específico por panel
□ Estados vacíos diferenciados para source vs target
□ Máximo recomendado documentado: <300 items para usar Transfer
```

---

## Related components

```
Select (multi)     → selección múltiple compacta sin visibilidad simultánea de source/target
Combobox           → typeahead search para datasets grandes (>300 items)
Checkbox group     → selección múltiple simple sin movimiento entre listas
DataGrid           → cuando los items tienen múltiples columnas (Table Transfer pattern)
Modal/Drawer       → contenedor alternativo para Transfer en mobile (ResourcePicker pattern)
List               → lista simple sin funcionalidad de selección/movimiento
```

---

## Reference: how other systems do it

### Ant Design — La implementación canónica

El Transfer de Ant Design es la implementación definitiva del dual-list y la referencia primaria para este patrón en todos los tiers. Dos paneles side-by-side con checkboxes por item, botones de movimiento bidireccionales en el centro, búsqueda opcional por panel, paginación para datasets grandes, y renderizado de items completamente customizable. La variante Table Transfer compone Transfer con Table, renderizando cada panel como una tabla de datos ordenable y filtrable — esencial para escenarios enterprise donde los items transferidos tienen múltiples columnas. El modo one-way (`oneWay`) restringe el movimiento a source→target con eliminación-desde-target, simplificando casos de "agregar a selección". `disabledTime` callback permite reglas de negocio complejas. Arquitecturalmente es el único sistema T1 con Transfer como componente de primera clase.

### Salesforce Lightning DualListbox — Reorder en target

La DualListbox de Lightning es la segunda implementación enterprise más fuerte junto a Ant Design. Dos paneles ("Available Options" / "Selected Options") con botones de flecha bidireccionales, filtro en el source, y botones up/down de reorden en el target. El reorder es el diferenciador clave de Lightning: en muchos escenarios enterprise (orden de campos, arreglo de columnas, asignación con prioridad), la secuencia de los items seleccionados tiene el mismo significado semántico que la selección en sí. Integración completa de formulario: `required`, `disabled`, help text, errores de validación, y `max` (máximo de items seleccionables). Los paneles tienen nombres fijos semánticos ("Available" / "Selected") que proveen claridad sin depender de posición visual.

### Mantine TransferList — Modelo tuple más simple

El TransferList de Mantine es la tercera implementación canónica. Dos listas buscables con checkboxes, botones de movimiento bidireccionales, estado `nothingFound` por lista, `transferAll` y `transferAllMatchingFilter` para bulk moves, y `itemComponent` para renderizado custom. El modelo de datos es un tuple `[left, right]`: `value` es `[sourceData, targetData]`, `onChange` retorna el tuple actualizado. Este approach evita la indirección key-based de Ant Design. La función `transferAllMatchingFilter` es un safeguard crítico: cuando hay un filtro activo, "mover todos" solo mueve los items filtrados/visibles, previniendo transferencias accidentales de items ocultos. Search incluida por defecto (sin necesidad de `showSearch: true`).

---

## Tokens

**30 tokens** · prefix `xfr-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `xfr/list/sm/w` | `sizing/280` | Ancho del panel TransferList size sm |
| `xfr/list/md/w` | `sizing/320` | Ancho del panel TransferList size md |
| `xfr/list/sm/h` | `sizing/400` | Alto del panel TransferList size sm |
| `xfr/list/md/h` | `sizing/480` | Alto del panel TransferList size md |
| `xfr/list/bg` | `surface/default` | Fondo del panel |
| `xfr/list/border` | `border/default` | Border del panel |
| `xfr/list/radius` | `radius/md` | Border radius del panel |
| `xfr/header/bg` | `surface/hover` | Fondo del header del panel |
| `xfr/header/border` | `border/default` | Border inferior del header |
| `xfr/item/sm/h` | `sizing/32` | Altura de TransferItem size sm |
| `xfr/item/md/h` | `sizing/40` | Altura de TransferItem size md |
| `xfr/item/default/fg` | `text/primary` | Color de texto default |
| `xfr/item/hover/bg` | `surface/hover` | Fondo item en hover |
| `xfr/item/selected/bg` | `brand/subtle` | Fondo item seleccionado |
| `xfr/item/selected/fg` | `interactive/default` | Texto item seleccionado |
| `xfr/item/selected/fontWeight` | `type/weight-medium` | Peso del texto seleccionado |
| `xfr/item/focused/ring` | `focus/ring` | Ring en item focused |
| `xfr/item/disabled/opacity` | `opacity/disabled` | Opacidad item disabled |
| `xfr/action/size/sm` | `sizing/32` | Tamaño de botones de acción sm |
| `xfr/action/size/md` | `sizing/36` | Tamaño de botones de acción md |
| `xfr/action/bg` | `surface/default` | Fondo de botones de acción |
| `xfr/action/border` | `border/default` | Border de botones de acción |
| `xfr/action/hover/bg` | `surface/hover` | Fondo botón acción en hover |
| `xfr/search/h/sm` | `sizing/32` | Altura del campo de búsqueda sm |
| `xfr/search/h/md` | `sizing/36` | Altura del campo de búsqueda md |
| `xfr/gap/sm` | `spacing/4` | Gap entre paneles y botones sm |
| `xfr/gap/md` | `spacing/5` | Gap entre paneles y botones md |
| `xfr/item/gap` | `spacing/2` | Gap interno entre elementos del item |
| `xfr/item/px` | `spacing/3` | Padding horizontal del item |
| `xfr/item/fontSize/sm` | `type/sm` | Tamaño de fuente item sm |

### Spacing specs

```
TransferItem size sm:
  Height:      32px
  Padding H:   10px
  Gap interno: 8px
  Font size:   13px
  Icon size:   14px

TransferItem size md:
  Height:      40px
  Padding H:   12px
  Gap interno: 10px
  Font size:   14px
  Icon size:   16px

TransferList size sm:
  Width:       280px
  Height:      400px
  Header H:    36px
  Search H:    32px

TransferList size md:
  Width:       320px
  Height:      480px
  Header H:    44px
  Search H:    36px

Transfer (gap entre paneles y action column):
  Size sm: gap=16px, action button size=32px
  Size md: gap=20px, action button size=36px

Exclusión:
  Orientation=vertical + Size=sm → no válido
```
