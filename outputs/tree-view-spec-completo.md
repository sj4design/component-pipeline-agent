# TreeView

## Descripción general

TreeView es la lista jerárquica del sistema de diseño: muestra datos anidados con nodos branch (expandibles) y nodos leaf (sin hijos) con indentación incremental por nivel. Soporta 4 modos de selección (none, single, multiple, checkbox) y líneas de jerarquía opcionales. Implementa el patrón WAI-ARIA TreeView completo (`role="tree"` + `role="treeitem"` con `aria-level`, `aria-setsize`, `aria-posinset`). Es el patrón estándar para file browsers, árboles de navegación, categorías jerárquicas, y gestión de permisos con selección parcial de parent/child.

```
SelectionMode=single, Size=md, ShowLines=no:
TreeView container:
  ▼ 📁 Proyecto Zoom          ← branch-expanded, Level=0, selected (azul, border-left)
     ▶ 📁 Components          ← branch-collapsed, Level=1
       📄 Button.tsx           ← leaf, Level=2
       📄 TextField.tsx        ← leaf, Level=2
     ▼ 📁 Pages               ← branch-expanded, Level=1
       📄 Home.tsx             ← leaf, Level=2
       📄 Settings.tsx         ← leaf, Level=2
     📄 README.md              ← leaf, Level=1

SelectionMode=checkbox (permission tree):
TreeView container:
  ☑  Administración            ← checkbox mixed (partial)
     ☑  Gestión de usuarios    ← checkbox checked
     ☐  Configuración          ← checkbox unchecked
     ☑  Reportes               ← checkbox checked

ShowLines=yes (file system):
  ├─ 📁 Components
  │   ├─ 📄 Button.tsx
  │   └─ 📄 TextField.tsx
  └─ 📁 Pages
      ├─ 📄 Home.tsx
      └─ 📄 Settings.tsx

Node states:
  default:  bg:transparent · fg:primary
  hover:    bg:surface/hover
  selected: bg:brand/subtle · fg:interactive · fontWeight:500 · border-left:3px azul
  focused:  ring:2px
  disabled: fg:text/disabled · opacity:0.6
```

**Lo que el diseñador puede configurar:**

Variantes en TreeNode (building block):

```
State  → default | hover | selected | focused | disabled
Kind   → leaf | branch-collapsed | branch-expanded
Level  → 0 | 1 | 2 | 3+
Size   → sm | md
```

Variantes en TreeView:

```
SelectionMode → none | single | multiple | checkbox
Size          → sm | md
ShowLines     → no | yes
```

Toggles en TreeNode:

```
👁 Show Expand Toggle  → muestra el chevron (branch nodes)
👁 Show Checkbox       → muestra checkbox de selección
👁 Has Leading Icon    → muestra file/folder icon
👁 Has Trailing Content → badge, actions, meta info
👁 Show Connector      → línea de jerarquía (ShowLines)
🔄 Leading Icon        → file/folder icon
🔄 Expand Toggle       → chevron icon
✏️ Label               → "Node label"
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  TreeNode                                                │
│  ──────────────────────────────────────────────────────  │
│  State  [ default         ▼ ]                            │
│  Kind   [ branch-collapsed ▼ ]                           │
│  Level  [ 1               ▼ ]                            │
│  Size   [ md              ▼ ]                            │
│  ──────────────────────────────────────────────────────  │
│  👁 Show Expand Toggle  [ on  ]                          │
│  👁 Show Checkbox       [ off ]                          │
│  👁 Has Leading Icon    [ on  ]                          │
│  👁 Has Trailing Content [ off ]                         │
│  👁 Show Connector      [ off ]                          │
│  🔄 Leading Icon  [ icon/folder            ]             │
│  ✏️ Label  [ Node label                           ]      │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Los datos tienen jerarquía (parent-child)?
                    │
                    ▼
       ¿La jerarquía es navigable (expand/collapse)?
       ├── Sí → TreeView
       └── Estructura plana → List o DataGrid
                    │
                    ▼
       ¿Necesita selección?
       ├── Single → SelectionMode=single
       ├── Multiple (highlight) → SelectionMode=multiple
       ├── Checkbox con partial parent → SelectionMode=checkbox
       └── Solo navegación → SelectionMode=none
```

**Usar TreeView cuando:**
- File browser (carpetas y archivos)
- Árbol de navegación de páginas (Confluence, Notion)
- Árbol de categorías (taxonomía de productos)
- Gestión de permisos jerárquicos (checkbox con mixed state)
- Árbol de procesos o pasos con sub-steps

**NO usar TreeView cuando:**
- La lista es plana (sin jerarquía) → usar `List` o `DataGrid`
- La jerarquía es solo 1 nivel → usar `List` con secciones
- Los datos se navegan a páginas distintas → usar `Sidebar`
- Hay drag-and-drop de reordenación → implementación custom + TreeView base

---

## Variaciones visuales

### TreeNode sizes

| Size | Height | Indent/Level | Gap | FontSize | IconSize | ToggleSize |
|------|--------|-------------|-----|---------|---------|-----------|
| sm   | 28px   | 20px        | 6px | 13px   | 14px    | 14px      |
| md   | 36px   | 24px        | 8px | 14px   | 16px    | 16px      |

### TreeNode States

| State | Background | Foreground | Border | FontWeight |
|-------|-----------|-----------|--------|-----------|
| default | transparent | text/primary | — | 400 |
| hover | surface/hover | text/primary | — | 400 |
| selected | brand/subtle | interactive/default | interactive/default (left 3px) | 500 |
| focused | transparent | text/primary | — | 400 + ring |
| disabled | transparent | text/disabled | — | 400 |

### Kind visual

| Kind | Toggle icon | Indent | Toggle rotation |
|------|------------|--------|----------------|
| leaf | — (oculto) | per level | — |
| branch-collapsed | chevron-right → | per level | 0° |
| branch-expanded | chevron-down ↓ | per level | 90° |

### Indentación por Level

```
Level 0: paddingLeft = 0px (raíz)
Level 1: paddingLeft = 1× indent (20px sm / 24px md)
Level 2: paddingLeft = 2× indent (40px sm / 48px md)
Level 3+: paddingLeft = 3× indent (60px sm / 72px md)
```

---

## Decisiones de diseño

**1. Kind property: leaf / branch-collapsed / branch-expanded** — Carbon distingue branch vs leaf estructuralmente. Expandir/colapsar son 2 visual states del mismo branch node. Property discreta permite renderizar todos los casos sin un boolean `isExpanded` adicional.

**2. Level: 0/1/2/3+ para indent incremental** — Figma no puede generar indent dinámico; modelar 4 niveles es suficiente para la mayoría de trees. Level=3+ representa deep nesting (Confluence page tree, permission trees).

**3. 4 SelectionModes: none/single/multiple/checkbox** — checkbox es distinto de multiple: renderiza un Checkbox visual en cada node (para permission trees donde el padre puede estar `mixed`) mientras multiple solo hace highlight. `checkStrictly` (Ant) para parent/child desacoplados en permission trees.

**4. ShowLines (connector)** — file system UIs se benefician de connector lines visuales entre parent y children. Opt-in via property. Consumer decide según contexto (folders vs category tree).

**5. Selected state con border-left** — el border-left de 3px azul + bg brand/subtle da triple afordance: color de fondo + borde + color de texto. Más visible que solo bg color — importante en árboles densos.

**6. Sin async loading ni virtualization** — son runtime behaviors (loadData Ant, scroll listeners). Documentados en scope. Para trees con cientos de nodos, virtualización es responsabilidad del developer.

### Combinaciones excluidas

```
Kind=leaf + Show Expand Toggle (leaf no tiene children — toggle oculto)
```

---

## Comportamiento

### Esencial para diseño

- **Expand toggle solo en branch nodes** — los leaf nodes no muestran toggle. En Figma: Kind=leaf tiene Show Expand Toggle=off siempre.
- **SelectionMode=checkbox: mixed state** — cuando un branch tiene algunos children seleccionados y otros no, el checkbox del parent muestra `aria-checked="mixed"`. En Figma modelar con un estado intermedio (guión en el checkbox).
- **Roving tabindex** — solo el nodo actualmente focuseado tiene `tabindex=0`. Todos los demás tienen `tabindex="-1"`. Arrow keys mueven el foco.
- **Type-ahead** — escribir letras salta al primer nodo visible que empiece por esa letra. Spectrum es la implementación de referencia.
- **Asterisco *** — expande todos los siblings del nodo actualmente focuseado.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Container | `role="tree"` + `aria-label` + `aria-multiselectable="true"` si multiple | SR anuncia el árbol y modo |
| TreeNode | `role="treeitem"` + `aria-level` + `aria-setsize` + `aria-posinset` | SR anuncia posición en la jerarquía |
| Branch node | `aria-expanded="true\|false"` | SR anuncia si está expandido |
| Selected | `aria-selected="true"` | SR anuncia selección |
| Checkbox mode | `aria-checked="true\|false\|mixed"` | SR anuncia estado partial |
| Disabled | `aria-disabled="true"` | SR anuncia no interactivo |
| Icon/badge | Labels planos o `aria-label` | SR necesita texto plano |

### Navegación por teclado

```
Arrow Up/Down     → navega entre nodes visibles
Arrow Right       → expande branch (si collapsed) / mueve al primer child (si expanded)
Arrow Left        → colapsa branch / mueve al parent
Home/End          → primer/último node visible
Enter/Space       → selecciona node (o toggle checkbox)
Type-ahead        → escribir letra salta al primer match
* (asterisk)      → expande todos los siblings
Tab               → sale del tree completo
```

---

## Guía de contenido

**Labels de nodo:**
- Archivo: nombre completo con extensión "Button.tsx", "README.md"
- Carpeta/categoría: nombre descriptivo sin iconos "Components", "Administración"
- Sin truncate en Figma — el label debe ser completamente visible

**SelectionMode=checkbox labels accesibles:**
- Si el label del nodo es suficientemente descriptivo: usar como nombre
- Si el nodo tiene solo ícono: agregar `aria-label` explícito

**Trailing content:**
- Badge: count de sub-items ("12 páginas")
- Estado: chip o badge semántico ("Activo", "Pendiente")
- Acciones inline: aparecen al hacer hover (editar, eliminar)

---

## Pre-build checklist

```
□ ¿role="tree" + aria-label en container?
□ ¿role="treeitem" en cada nodo?
□ ¿aria-level, aria-setsize, aria-posinset en cada nodo?
□ ¿Branch: aria-expanded?
□ ¿Selected: aria-selected?
□ ¿SelectionMode=checkbox: aria-checked con mixed?
□ ¿Disabled: aria-disabled?
□ ¿Roving tabindex (solo node activo tabindex=0)?
□ ¿Arrow Right: expande / mueve al primer child?
□ ¿Arrow Left: colapsa / mueve al parent?
□ ¿Type-ahead funcional?
□ ¿ShowLines: connectors aria-hidden?
□ ¿Kind=leaf: Sin expand toggle?
```

---

## Componentes relacionados

```
List        → para datos planos sin jerarquía
Sidebar     → para navegación con jerarquía (usa TreeView internamente)
DataGrid    → para datos tabulares jerárquicos (Row expand)
Checkbox    → building block del SelectionMode=checkbox
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | SelectionModes | ShowLines | Async | ARIA | Diferenciador |
|---------|-------|--------------|----------|-------|------|--------------|
| **Material Design 3** | — | — | — | — | — | Sin componente dedicado |
| **Spectrum (Adobe)** | TreeView | none/single/multiple | No | Sí | tree | Type-ahead; loadChildren async; best ARIA |
| **Carbon (IBM)** | TreeView | single/multi | No | No | tree | TreeNode kind prop; controlled |
| **Polaris (Shopify)** | ResourceList hierarchy | — | — | — | — | Sin componente dedicado |
| **Atlassian** | Tree | single/multi/checkbox | No | Sí | tree | Drag-and-drop (isRankable); virtual |
| **Ant Design** | Tree | Sí (4 modes) | Sí (showLine) | Sí (loadData) | tree | checkStrictly; draggable; filterTreeNode |
| **Fluent 2** | Tree | none/single | No | — | tree | TreeItem slots; subtree |
| **shadcn/ui** | — | — | — | — | — | Sin componente dedicado |
| **Chakra UI** | — | — | — | — | — | Sin componente |
| **Mantine** | — | — | — | — | — | Sin componente |
| **Radix UI** | — | — | — | — | — | Sin componente |
| **Headless UI** | Disclosure (simple) | — | — | — | — | Solo expand/collapse single level |

**Patrones clave de la industria:**
1. **WAI-ARIA TreeView Pattern** — el patrón canónico define `role="tree"` + `role="treeitem"` con `aria-level`, `aria-setsize`, `aria-posinset`. Arrow keys para navegación. Spectrum y Carbon son las implementaciones de referencia.
2. **Ant Design checkStrictly** — prop para desacoplar parent/child checkbox. Sin `checkStrictly`, seleccionar un parent selecciona todos sus children. Con `checkStrictly`, cada nodo es independiente. Critical para permission trees donde "tener el permiso padre" no implica "tener todos los sub-permisos".
3. **Spectrum type-ahead** — el único T1 con type-ahead nativo: escribir "B" salta al primer nodo que empieza por B. APG lo documenta pero pocos lo implementan. Mejora significativamente la navegación por teclado en árboles grandes.
4. **Carbon Kind property** — conceptualización clara: `leaf | branch`. No hay un boolean `isLeaf` — la semántica viene de si el nodo tiene children o no. Modelado como property discreta en Figma es más claro que un boolean.

---

## Tokens

**26 tokens** · prefijo `tv-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `tv/sm/h` | `sizing/28` | Altura nodo sm |
| `tv/md/h` | `sizing/36` | Altura nodo md |
| `tv/sm/indent` | `spacing/5` | Indent por nivel sm |
| `tv/md/indent` | `spacing/6` | Indent por nivel md |
| `tv/default/bg` | `surface/default` | Background árbol |
| `tv/default/fg` | `text/primary` | Texto default |
| `tv/hover/bg` | `surface/hover` | Hover bg |
| `tv/selected/bg` | `brand/subtle` | Selected bg |
| `tv/selected/fg` | `interactive/default` | Selected fg |
| `tv/selected/fontWeight` | `type/weight-medium` | Selected weight |
| `tv/selected/borderLeft` | `interactive/default` | Border-left accent |
| `tv/focused/ring` | `focus/ring` | Focus ring |
| `tv/disabled/fg` | `text/disabled` | Disabled fg |
| `tv/disabled/opacity` | `opacity/disabled` | Disabled opacity |
| `tv/connector/color` | `border/default` | Color conector |
| `tv/connector/thickness` | `border/1` | Grosor conector |
| `tv/iconSize/sm` | `iconSize/sm` | Icon size sm |
| `tv/iconSize/md` | `iconSize/md` | Icon size md |
| `tv/fontSize/sm` | `type/sm` | Font size sm |
| `tv/fontSize/md` | `type/md` | Font size md |
| `tv/gap/sm` | `spacing/1.5` | Gap items sm |
| `tv/gap/md` | `spacing/2` | Gap items md |
| `tv/padding/sm` | `spacing/1` | Padding container sm |
| `tv/padding/md` | `spacing/2` | Padding container md |
| `tv/borderLeft/width` | `border/3` | Ancho border-left selected |
| `tv/checkbox/size` | `sizing/16` | Checkbox size en nodos |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  TreeNode sm: h:28px · indent:20px/level · gap:6px       │
│  TreeNode md: h:36px · indent:24px/level · gap:8px       │
│                                                          │
│  Indent acumulativo:                                     │
│  Level 0: 0px                                           │
│  Level 1: 20px (sm) / 24px (md)                         │
│  Level 2: 40px (sm) / 48px (md)                         │
│  Level 3+: 60px+ (sm) / 72px+ (md)                      │
│                                                          │
│  Selected: bg:brand/subtle + border-left:3px interactive │
│                                                          │
│  Sub-componentes:                                        │
│  TreeNode: State(5) × Kind(3) × Level(4) × Size(2) −    │
│            exclusiones = 80 frames                      │
│  TreeView: SelectionMode(4) × Size(2) ×                  │
│            ShowLines(2) = 16 frames                     │
│                                                          │
│  Frames totales: 80 + 16 = 96 frames                    │
└──────────────────────────────────────────────────────────┘
```
