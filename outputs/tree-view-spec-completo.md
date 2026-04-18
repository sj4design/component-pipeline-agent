# TreeView

## Overview

TreeView es una lista jerárquica interactiva con expand/collapse que representa datos con estructura padre-hijo de múltiples niveles. Soporta navegación tipo sidebar, exploración de sistemas de archivos, selección única y múltiple (incluyendo modo checkbox), y trees con conectores visuales opcionales para estructuras profundas. Es el componente adecuado cuando la relación jerárquica entre nodos es parte del significado de los datos, no solo su agrupación visual.

```
┌─────────────────────────────────────────┐
│  Files                                  │
│                                         │
│  ▶ 📁 src/                              │
│  ▼ 📁 components/          ← expandido │
│    ▶ 📁 Button/                         │
│    ▼ 📁 Modal/                          │
│      📄 Modal.tsx   ← selected         │
│      📄 Modal.test.tsx                  │
│      📄 index.ts                        │
│    📄 index.ts                          │
│  ▶ 📁 hooks/                            │
│  📄 App.tsx                             │
│                                         │
└─────────────────────────────────────────┘
  ▶ = branch colapsado
  ▼ = branch expandido
  📁 = ícono de carpeta (leadingIcon)
  📄 = ícono de archivo (leadingIcon)
```

TreeView es una familia de 2 sub-componentes: `TreeNode` (nodo individual, building block) y `TreeView` (contenedor del tree completo con gestión de selección y navegación).

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
TreeNode:
  State:  default | hover | selected | focused | disabled
  Kind:   leaf | branch-collapsed | branch-expanded
  Level:  0 | 1 | 2 | 3+
  Size:   sm | md

TreeView:
  SelectionMode: none | single | multiple | checkbox
  Size:          sm | md
  ShowLines:     no | yes
```

Toggles (show/hide parts — do NOT generate extra variants):

```
TreeNode:
  👁 Show Expand Toggle   → chevron de expand/collapse (solo en branches)
  👁 Show Checkbox        → checkbox leading (en SelectionMode=checkbox)
  👁 Has Leading Icon     → ícono antes del label (folder, file, category)
  👁 Has Trailing Content → badge, actions, meta trailing
  👁 Show Connector       → líneas conectoras de jerarquía (ShowLines=yes)
```

### Figma properties panel

```
┌─────────────────────────────────────────┐
│  TreeView                               │
│  ─────────────────────────────────────  │
│  SelectionMode                          │
│    ○ none  ○ single  ○ multiple         │
│    ○ checkbox                           │
│  Size      ○ sm  ○ md                  │
│  ShowLines ○ no  ○ yes                 │
│  ─────────────────────────────────────  │
│  TreeNode (sub-panel)                  │
│  State  ○ default  ○ hover             │
│         ○ selected ○ focused           │
│         ○ disabled                     │
│  Kind   ○ leaf                         │
│         ○ branch-collapsed             │
│         ○ branch-expanded              │
│  Level  ○ 0  ○ 1  ○ 2  ○ 3+          │
│  Size   ○ sm  ○ md                     │
│  ─────────────────────────────────────  │
│  👁 Show Expand Toggle  [toggle]       │
│  👁 Show Checkbox       [toggle]       │
│  👁 Has Leading Icon    [toggle]       │
│  👁 Has Trailing Content [toggle]      │
│  👁 Show Connector      [toggle]       │
│  ─────────────────────────────────────  │
│  ✏️ Label    "Nombre del nodo"         │
│  🔄 Leading Icon  [icon/folder]        │
│  🔄 Expand Toggle [icon/chevron-right] │
└─────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El contenido tiene estructura jerárquica padre-hijo?
│
├─ ¿La jerarquía es de 1 solo nivel?
│   └─ NO usar TreeView → usar Accordion o lista agrupada
│
├─ ¿El propósito es navegación (sidebar)?
│   └─ TreeView con SelectionMode=single + Kind tracking
│
├─ ¿Es un file browser / explorador de assets?
│   └─ TreeView con Leading Icons + Kind=leaf/branch
│
├─ ¿Es para asignación de permisos con checkbox?
│   └─ TreeView con SelectionMode=checkbox
│
├─ ¿Hay más de ~300 nodos visibles simultáneamente?
│   └─ Requiere virtualización (fuera de scope del Figma build)
│
└─ ¿El uso es primariamente mobile (<600px)?
    └─ Considerar Accordion flat — TreeView en mobile es denso y complejo
```

**Usar TreeView cuando:**
- El contenido tiene relación de anidación de múltiples niveles (2+ niveles) donde la jerarquía es parte del significado: sistemas de archivos, categorías de productos, árboles de permisos, secciones de documentación anidadas, estructuras organizacionales.
- El usuario necesita expandir/colapsar ramas para explorar la estructura sin navegar a otra pantalla.
- Se requiere selección de nodos con retroalimentación visual clara del activo (sidebar navigation) o multi-selección con checkboxes (permissions tree, file selection para batch operations).
- El tree es estático o semi-estático (los datos cambian poco) — los trees completamente dinámicos con carga async son un caso de implementación avanzado.

**NO usar TreeView cuando:**
- La jerarquía es de solo 1 nivel — un Accordion o una lista con secciones collapsibles tiene menos overhead de ARIA y keyboard pattern.
- El propósito es mostrar pasos secuenciales — usar ProgressIndicator o Stepper.
- Hay más de ~300 nodos simultáneamente visibles sin virtualización — el rendimiento se degrada significativamente.
- El uso primario es en mobile — la densidad de touch targets y la complejidad del keyboard pattern hacen el TreeView difícil de usar en pantallas pequeñas.
- Los nodos tienen múltiples atributos que necesitan columnas alineadas — usar DataGrid con agrupación jerárquica (TreeGrid pattern de Lightning).

---

## Visual variations

### TreeNode por Kind

**leaf** — Nodo sin hijos. No tiene chevron de expand. Solo: ícono leading (opcional) + label + trailing (opcional). El `Show Expand Toggle` debe estar siempre off para Kind=leaf — es la exclusión fundamental del componente.

**branch-collapsed** — Nodo con hijos, actualmente cerrado. Chevron apunta a la derecha (→). Hijos no visibles.

**branch-expanded** — Nodo con hijos, actualmente abierto. Chevron apunta hacia abajo (↓). Hijos visibles debajo con indent.

### TreeNode por Level (indent incremental)

| Level | Indent (md) | Uso típico |
|-------|-------------|-----------|
| 0 | 0px | Raíz del tree |
| 1 | 24px | Primer nivel de anidación |
| 2 | 48px | Segundo nivel |
| 3+ | 72px+ | Niveles profundos (3 o más) |

El indent en size sm es 20px por nivel en lugar de 24px.

### TreeNode por State

| State | BG | Texto | Detalle extra |
|-------|-----|-------|--------------|
| default | transparent | `text/primary` | — |
| hover | `surface/hover` | `text/primary` | BG sutil |
| selected | `brand/subtle` | `interactive/default` | Font weight 500 + border-left 3px en `interactive/default` |
| focused | transparent | `text/primary` | Ring 2px visible |
| disabled | transparent | `text/disabled` | Opacity 0.6, cursor not-allowed |

El estado `selected` tiene un indicador visual doble: fondo `brand/subtle` + borde izquierdo de 3px en color `interactive/default`. Esto asegura que el nodo activo sea perceptible más allá del solo cambio de fondo, especialmente importante en trees con ShowLines=yes donde los conectores pueden crear ruido visual.

### TreeView por SelectionMode

**none** — Sin selección visual. Los nodos son solo navegables (expand/collapse) sin estado `selected`.

**single** — Un nodo activo a la vez. Click en nodo = activo. Patrón sidebar/navigation.

**multiple** — Varios nodos pueden estar highlighted simultáneamente. Click = toggle del nodo.

**checkbox** — Cada nodo tiene un checkbox visible. El nodo padre puede tener estado `indeterminate` cuando algunos de sus hijos están seleccionados pero no todos. Patrón para permissions trees y file selection.

### TreeView con ShowLines=yes

```
┌────────────────────────────┐
│ Account                    │
│ │ ├── Profile              │
│ │ ├── Security  ← active  │
│ │ └── Notifications        │
│ Billing                    │
│ ▼ Organization             │
│   ├── Members              │
│   └── Roles                │
└────────────────────────────┘
  │ ├ └ = connector lines
```

Los conectores son líneas verticales/horizontales que muestran la relación parent-child. Se aplican al slot `connector` del TreeNode (shape decorativo). Siempre `aria-hidden="true"`.

### TreeNode por Size

| Size | Node H | Indent | Gap interno | Font | Icon |
|------|--------|--------|-------------|------|------|
| sm | 28px | 20px/level | 6px | 13px | 14px |
| md | 36px | 24px/level | 8px | 14px | 16px |

---

## Design decisions

### 1. Kind como property discreta: leaf / branch-collapsed / branch-expanded (Carbon pattern)

**Por qué:** Carbon distingue branch vs leaf estructuralmente. Expandir/colapsar son 2 estados visuales del mismo branch node. Una property discreta de 3 valores (`leaf`, `branch-collapsed`, `branch-expanded`) permite frames explícitos para cada estado sin depender de un boolean `isExpanded` combinado con la presencia de hijos. En Figma esto es especialmente importante porque los frames necesitan ser estáticos.

**Tradeoff:** El designer debe elegir el Kind correcto al colocar instancias. Documentar claramente: `Kind=leaf` = sin toggle, `Kind=branch-*` = con toggle.

### 2. Level: 0/1/2/3+ para indent incremental

**Por qué:** Figma no puede generar indent dinámico basado en profundidad de anidación — se necesita modelar niveles explícitamente. 4 valores (0, 1, 2, 3+) son suficientes para la mayoría de trees. Level=3+ representa nesting profundo de forma genérica, lo que evita proliferación de frames para niveles 4, 5, 6, etc. que visualmente se ven igual que level 3 (mismo indent incremental).

**Tradeoff:** Para trees con profundidades mayores a 3, Level=3+ se reutiliza para todos los niveles más profundos. Esto es aceptable visualmente. El runtime maneja el indent real; Figma representa el patrón.

### 3. Cuatro SelectionModes explícitos: none/single/multiple/checkbox

**Por qué:** Spectrum tiene 3 modos con `selectionStyle`; Ant Design tiene checkbox con `checkStrictly`. Modelamos 4 explícitos porque `checkbox` es visualmente distinto de `multiple`: `checkbox` renderiza un Checkbox visual en cada nodo (para permissions trees, bulk operations) mientras `multiple` solo usa highlight sin checkbox. Esta distinción visual es significativa para el diseño en Figma.

**Tradeoff:** El mode `checkbox` requiere que el TransferItem muestre el Checkbox component en el slot correspondiente — binding explícito en el componente de Figma.

### 4. ShowLines como property discreta (Ant Design showLine)

**Por qué:** Los trees de file system se benefician de líneas conectoras visuales entre parent y children para orientación en estructuras profundas. Los trees de navigation sidebar (settings, docs) son generalmente más limpios sin líneas. La property permite que el consumer elija según contexto. Ant Design lo implementa como `showLine` prop; Carbon lo tiene como opción visual.

**Tradeoff:** ShowLines añade los slots de connector a los TreeNodes. Requiere variantes en Figma pero la propiedad de valor es alta para trees de 3+ niveles de profundidad.

### 5. Sin drag-and-drop modelado

**Por qué:** Ant Design tiene `draggable`; Atlassian DynamicTable tiene `isRankable` con keyboard a11y completa. DnD es una interacción runtime compleja que no se puede representar fielmente en Figma. Más importante: la accesibilidad del drag-and-drop en trees es un problema no resuelto — todos los sistemas con DnD tienen gaps documentados de AT. Modelamos solo los visual states (default/hover/selected) y documentamos el caso de DnD como fuera del scope del componente de Figma.

**Tradeoff:** Los productos que necesiten reorder de nodos en runtime deben implementar DnD custom o proveer botones up/down alternativos (Lightning pattern) accesibles por teclado.

### Excluded combinations

```
Kind=leaf + Show Expand Toggle=true
→ Los leaves no tienen children; mostrar el toggle es confuso y semánticamente incorrecto.
→ La exclusión debe estar explícitamente documentada y aplicada en Figma con overrides.
```

---

## Behavior

### Essential para diseño

**Expand/collapse:** Click en el chevron de expand toggle expande o colapsa los hijos de un branch. Click en el label de un branch (sin checkbox) puede también expand/collapse — este comportamiento es configurable en runtime. En Figma, el Kind representa el estado resultante.

**Selection:** En SelectionMode=single, seleccionar un nodo deselecciona el anterior. En multiple, click toggle el nodo sin afectar otros. En checkbox, click en el checkbox toggle el estado, con propagación a hijos (parent checked = todos los children checked, partial = indeterminate en parent).

**Indent visual:** El indent por nivel es fijo (20px en sm, 24px en md). El expand toggle y el leadingIcon son parte del indent — su presencia contribuye al alineamiento visual de los labels.

**Roving tabindex:** Solo el nodo actualmente enfocado tiene `tabindex=0`. Todos los otros nodos tienen `tabindex=-1`. El foco se mueve con Arrow keys dentro del tree. Tab saca del tree al siguiente elemento enfocable.

**Type-ahead:** Escribir letras saltan al primer nodo visible cuyo label empieza con esa letra (Spectrum pattern). Permite navegación rápida en trees largos.

**Asterisco (*):** Expande todos los siblings del nodo activo (WAI-ARIA TreeView pattern estándar).

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Contenedor tree | `tree` | `aria-label="[propósito]"`, `aria-multiselectable="true"` (si multiple) | Identifica la región del tree |
| TreeNode | `treeitem` | `aria-level="N"`, `aria-setsize="N"`, `aria-posinset="N"` | Informa posición dentro del tree al AT |
| Branch node | `treeitem` | `aria-expanded="true/false"` | Estado de expansión anunciado por AT |
| Nodo seleccionado | `treeitem` | `aria-selected="true"` | Para data selection trees |
| Nodo activo (nav) | `treeitem` | `aria-current="page"` | Para navigation trees (no aria-selected) |
| Checkbox mode | `treeitem` | `aria-checked="true/false/mixed"` | `mixed` para parent con partial children |
| Nodo disabled | `treeitem` | `aria-disabled="true"` | No interactuable |
| Connector lines | shape decorativo | `aria-hidden="true"` | Puramente decorativo |
| Grupo de hijos | `group` | — | Agrupa children bajo su parent en AT |

**Nota crítica sobre aria-level/setsize/posinset:** Estos atributos son requeridos por la especificación WAI-ARIA TreeView pero son complejos de computar. Solo Fluent 2 los calcula automáticamente entre todos los sistemas analizados. Deben estar documentados en el spec de handoff como requerimiento de implementación.

### Keyboard navigation

Primary interactions (affect design):

```
Arrow Up/Down   → navega entre nodos visibles (arriba/abajo en el tree)
Arrow Right     → expande branch colapsado, O mueve al primer hijo si ya expandido
Arrow Left      → colapsa branch expandido, O mueve al parent si ya colapsado/es leaf
Home            → primer nodo visible del tree
End             → último nodo visible del tree
Enter/Space     → selecciona nodo (o toggle checkbox en SelectionMode=checkbox)
```

Secondary interactions (dev reference):

```
*               → expande todos los siblings del nodo actual
a–z             → type-ahead: salta al primer nodo visible que empieza con esa letra
Shift+Arrow     → extend selection (en SelectionMode=multiple)
Tab             → sale del tree (roving tabindex — Tab no navega entre nodos)
```

---

## Content guide

### Slot: label (required)
El texto principal del nodo. Debe ser:
- Conciso (1 línea, máximo 2)
- Único dentro de sus siblings (o incluir discriminador en trailingContent)
- En el idioma del producto

Para trees de navegación: usar el nombre de la sección/página directamente.
Para trees de archivos: usar el nombre del archivo/carpeta sin path.

### Slot: expandToggle
El chevron de expand/collapse. No tiene texto visible — el state se comunica via `aria-expanded` en el treeitem. El ícono es `chevron-right` (branch-collapsed) o `chevron-down`/rotado 90° (branch-expanded).

### Slot: leadingIcon
Ícono contextual del tipo de nodo:
- File browser: `icon/folder` (branches), `icon/file` (leaves)
- Navigation: ícono de la sección (configuración, usuarios, reportes)
- Category: ícono del tipo de categoría
- Permission tree: sin ícono (el checkbox es suficiente)

### Slot: trailingContent
Contenido trailing opcional. Casos de uso:
- **Count badge:** número de items dentro del branch ("12")
- **Status badge:** estado del item (Jira issue type, tamaño de archivo)
- **Actions on hover:** botones de editar/eliminar/más que aparecen solo en hover

Cuando hay actions on hover, el trailingContent debe ser visible solo en estado hover y focused para no crear ruido visual permanente.

### Labels del tree container
El `aria-label` del contenedor `role="tree"` debe describir el propósito: "Árbol de archivos del proyecto", "Navegación de configuración", "Árbol de permisos del rol". Evitar el genérico "Tree" o "TreeView".

---

## Pre-build checklist

```
Figma — TreeNode
□ 80 frames netos: State(5) × Kind(3) × Level(4) × Size(2) = 120 − 40 exclusiones
□ Exclusión aplicada: Kind=leaf + Show Expand Toggle → toggle forzado a off
□ Indent incremental correcto: Level 0/1/2/3+ con 20px (sm) o 24px (md) por nivel
□ Estado selected: BG brand/subtle + border-left 3px + fg interactive/default
□ Estado focused: ring 2px visible sin cambio de BG
□ Expand toggle: chevron-right (collapsed) / chevron rotado (expanded)
□ Booleans configurados: Show Expand Toggle, Show Checkbox, Has Leading Icon, Has Trailing Content, Show Connector
□ Swap slots: Leading Icon (folder/file/custom), Expand Toggle

Figma — TreeView
□ 16 frames: SelectionMode(4) × Size(2) × ShowLines(2)
□ ShowLines=yes: connector lines visibles en los TreeNodes usando Show Connector=true
□ SelectionMode=checkbox: Show Checkbox=true en todos los TreeNodes del tree

Accesibilidad
□ Roles ARIA documentados: tree > group > treeitem
□ aria-level, aria-setsize, aria-posinset documentados como requerimiento de implementación
□ aria-expanded en branch nodes documentado
□ aria-current="page" vs aria-selected documentados por caso de uso
□ aria-hidden="true" en connector lines documentado
□ Keyboard pattern completo documentado en specs

Contenido
□ aria-label descriptivo para el tree container
□ Distinción Kind=leaf (sin toggle) vs Kind=branch (con toggle) clara en frames
□ Placeholder de label genérico pero representativo
□ Casos de uso documentados: file browser, navigation, permissions, category
```

---

## Related components

```
Accordion        → jerarquía plana de 1 nivel con expand/collapse
Navigation       → sidebar navigation sin anidación profunda
List             → lista plana sin jerarquía
Checkbox group   → selección múltiple flat sin jerarquía
DataGrid         → datos tabulares; considerar para tree con múltiples columnas (TreeGrid)
Transfer         → cuando la tarea es mover items entre dos listas (no navegar una jerarquía)
```

---

## Reference: how other systems do it

### Spectrum / React Aria — Collection API y separación onAction vs selección

El TreeView de Spectrum está construido sobre la collection API de React Aria — la misma base que ListBox, ComboBox y Table. Los items se declaran via `<TreeViewItem>` children o colecciones dinámicas con prop `items`. El componente sigue el patrón WAI-ARIA TreeView completo con soporte de arrow keys más type-ahead de caracteres. Una distinción clave es la separación de `onAction` (activación primaria — abrir archivo, navegar) de `selectionMode` (selección checkbox o highlight) — la mayoría de sistemas conflate estas dos operaciones distintas. `selectionStyle: "checkbox" | "highlight"` permite elegir la expresión visual de la selección. `expandedKeys`/`defaultExpandedKeys` proveen patrones controlado + no-controlado.

### Carbon / IBM — Tres tamaños con densidad máxima xs=24px

El TreeView de Carbon provee `TreeView` container + `TreeNode` children. Branch vs leaf es estructural (presencia de children = branch; sin children = leaf). Selección única únicamente. Tres tamaños (xs/sm/default) a 24/32/40px — el tree más denso en todos los tiers con xs. Diseñado para navegación de sistemas de archivos y jerarquías de configuración en productos IBM Cloud. `renderIcon` prop en TreeNode permite custom leading icon. El enfoque de inferencia estructural (children present = branch) es más simple que una property `Kind` explícita.

### Ant Design — Implementación más completa con DirectoryTree y checkStrictly

Ant Design provee el tree más completo en T1. `Tree` soporta expand/collapse, selección single/multiple, selección checkbox con `checkStrictly` opcional (desacoplar cascada parent-child), drag-and-drop, carga async via `loadData`, virtual scrolling para datasets grandes, y rendering custom de nodos. `DirectoryTree` es una variante pre-configurada para file browser UIs con expand-on-click para carpetas, single-click para archivos, e íconos de file/folder integrados. `showLine` activa líneas conectoras. `fieldNames` permite mapeo de campos de respuesta API custom (`{ title: 'name', key: 'id', children: 'items' }`). `checkStrictly: true` desacopla completamente parent/child para permission trees donde la selección del parent no implica la de sus children.

### Salesforce Lightning — TreeGrid con columnas

Lightning provee `Tree` para datos jerárquicos generales y `TreeGrid` para datos jerárquicos tabulares (filas con columnas). El Tree soporta expand/collapse y selección única con `metatext` por nodo. El `TreeGrid` es notable — renderiza un tree donde cada nodo es una fila con múltiples columnas, combinando la jerarquía de un tree con la densidad de datos de una tabla. Más apropiado para admin UIs enterprise donde los datos jerárquicos tienen múltiples atributos que necesitan alineamiento de columnas.

### GitHub Primer — Navigation tree con aria-current y estados async explícitos

El TreeView de Primer es explícitamente un componente de navegación, diseñado para el explorador de archivos de GitHub, sidebar de repositorio, y árbol de archivos de pull requests. El prop `current` indica la página activa en contexto de navegación (`aria-current="page"`). `TreeView.SubTree` acepta `state: "loading" | "done" | "error"` con spinner integrado y affordance de retry en error — el patrón de carga async más explícito en cualquier tier. Items soportan `href` para navegación y `onSelect` para selección. Esta separación semántica (navigation trees usan `aria-current`, data selection trees usan `aria-selected`) es la distinción más importante que documentamos en nuestro spec de a11y.

### Fluent 2 / Microsoft — ARIA posicional automático

El Tree de Fluent 2 es la implementación T3 más testeada en producción, construida para el explorador de archivos de VS Code, el árbol de carpetas de Outlook, y la navegación de canales de Teams. Soporta `TreeItem` anidados con distinción `itemType="branch" | "leaf"`. Lo más importante para a11y: `aria-level`, `aria-setsize`, y `aria-posinset` son calculados automáticamente por el componente — estos atributos posicionales críticos son requeridos por WAI-ARIA pero complejos de computar, y Fluent 2 es el único sistema que los maneja automáticamente. `appearance` tokens para variantes de densidad. Diseñado para los contextos más exigentes de aplicaciones desktop enterprise de Microsoft.

### Mantine — Modelo data-driven con checkboxes y cascada

El Tree de Mantine usa un approach data-driven: todo el tree se define mediante un prop `data` (array anidado de `{ label, value, children }` objects). Fácil para renderizar trees server-driven. Selección checkbox con prop `checkboxes` + cascada parent-child (equivalente al `checkable` de Ant Design). Renderizado custom via `renderNode` escape hatch. El hook `useTree` gestiona el estado de expansión y selección de forma controlada. El approach data-driven es más simple que JSX para trees impulsados por API, aunque menos flexible para tipos de nodo heterogéneos.

---

## Tokens

**26 tokens** · prefix `tv-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `tv/sm/h` | `sizing/28` | Altura del TreeNode size sm |
| `tv/md/h` | `sizing/36` | Altura del TreeNode size md |
| `tv/sm/indent` | `spacing/5` | Indent por nivel en size sm (20px) |
| `tv/md/indent` | `spacing/6` | Indent por nivel en size md (24px) |
| `tv/default/bg` | `surface/default` | Fondo del tree container |
| `tv/default/fg` | `text/primary` | Color de texto default |
| `tv/hover/bg` | `surface/hover` | Fondo en hover |
| `tv/selected/bg` | `brand/subtle` | Fondo de nodo seleccionado |
| `tv/selected/fg` | `interactive/default` | Texto de nodo seleccionado |
| `tv/selected/fontWeight` | `type/weight-medium` | Peso del texto seleccionado |
| `tv/selected/borderLeft` | `interactive/default` | Color del border-left indicador |
| `tv/focused/ring` | `focus/ring` | Ring de foco |
| `tv/disabled/fg` | `text/disabled` | Color de texto disabled |
| `tv/disabled/opacity` | `opacity/disabled` | Opacidad en disabled |
| `tv/connector/color` | `border/default` | Color de las líneas conectoras |
| `tv/connector/thickness` | `border/1` | Grosor de las líneas conectoras |
| `tv/iconSize/sm` | `iconSize/sm` | Tamaño de íconos en size sm (14px) |
| `tv/iconSize/md` | `iconSize/md` | Tamaño de íconos en size md (16px) |
| `tv/fontSize/sm` | `type/sm` | Font size en size sm (13px) |
| `tv/fontSize/md` | `type/md` | Font size en size md (14px) |
| `tv/gap/sm` | `spacing/1.5` | Gap interno entre elementos sm (6px) |
| `tv/gap/md` | `spacing/2` | Gap interno entre elementos md (8px) |
| `tv/padding/sm` | `spacing/1` | Padding del tree container sm (4px) |
| `tv/padding/md` | `spacing/2` | Padding del tree container md (8px) |
| `tv/borderLeft/width` | `border/3` | Ancho del indicador border-left |
| `tv/toggleSize/sm` | `sizing/14` | Tamaño del expand toggle sm |

### Spacing specs

```
TreeNode size sm:
  Height:       28px
  Indent/level: 20px
  Gap interno:  6px
  Font size:    13px
  Font weight:  400
  Line height:  18px
  Icon size:    14px
  Toggle size:  14px

TreeNode size md (default):
  Height:       36px
  Indent/level: 24px
  Gap interno:  8px
  Font size:    14px
  Font weight:  400
  Line height:  20px
  Icon size:    16px
  Toggle size:  16px

Estado selected:
  Background:   brand/subtle
  Foreground:   interactive/default
  Font weight:  500 (medium)
  Border left:  3px solid interactive/default

Focus ring:
  Width:   2px
  Color:   focus/ring (#4062F2)
  Offset:  2px

TreeView container:
  Padding sm: 4px
  Padding md: 8px

Connector lines:
  Thickness:    1px
  Color:        border/default
  aria-hidden:  true (siempre)

Exclusión:
  Kind=leaf + Show Expand Toggle=true → no válido
```
