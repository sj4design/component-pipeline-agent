# List

## Descripción general

List es el componente de lista del sistema de diseño — una familia de dos componentes (`List` + `ListItem`) que cubre cinco tipos semánticos: unordered (ul/li), ordered (ol/li), description (dl/dt/dd), nav (navegación con link) y action (menú de acciones). El tipo determina tanto el HTML semántico como el patrón de accesibilidad (display vs. menu/listbox). El listItem tiene 4 slots opcionales (marker, label, description, trailing) y tres densidades para adaptarse desde enterprise compacto (32px) hasta touch móvil (56px).

```
ListItem anatomy:
┌───────────────────────────────────────────────────────────────┐
│  [marker?] ── gap ── [label*]     [trailing?]                │
│                      [description?]                           │
│  ─────────────────────────────────────────────────────────── │ ← divider (opcional)
└───────────────────────────────────────────────────────────────┘

List (Type=unordered, Density=default, Dividers=between):
┌─────────────────────────────────────────────────────────────┐
│  • Primera opción                                           │
│  ───────────────────────────────────────────────────────── │
│  • Segunda opción                           Badge 3        │
│  ───────────────────────────────────────────────────────── │
│  • Tercera opción          Supporting text                  │
└─────────────────────────────────────────────────────────────┘
```

**Familia:** ListItem (sub-componente) → List (contenedor padre). Build order: ListItem primero.

**Lo que el diseñador puede configurar:**

ListItem:
```
State    → default | hover | selected | focused | disabled
Density  → compact (32px) | default (40px) | comfortable (56px)
```
Toggles ListItem:
```
👁 Has Marker      → muestra bullet/number/icon/checkbox
👁 Has Description → muestra línea de texto secundario
👁 Has Trailing    → muestra zona trailing (badge, action, meta)
👁 Has Divider     → muestra línea separadora debajo del item
```

List:
```
Type     → unordered | ordered | description | nav | action
Density  → compact | default | comfortable
Dividers → none | between | all
```

### Panel de propiedades en Figma

```
┌─────────────────────────────────────────────────┐
│  ListItem                                       │
│  ─────────────────────────────────────────────  │
│  State       [ default             ▼ ]          │
│  Density     [ default (40px)      ▼ ]          │
│  ─────────────────────────────────────────────  │
│  👁 Has Marker       [ on  ]                    │
│  👁 Has Description  [ off ]                    │
│  👁 Has Trailing     [ off ]                    │
│  👁 Has Divider      [ off ]                    │
│  ─────────────────────────────────────────────  │
│  🔄 Marker    [ bullet/disc        ▼ ]          │
│  ✏️ Label     [ List item              ]         │
│  ✏️ Desc.     [ Supporting text        ]         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  List                                           │
│  ─────────────────────────────────────────────  │
│  Type        [ unordered           ▼ ]          │
│  Density     [ default             ▼ ]          │
│  Dividers    [ between             ▼ ]          │
└─────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Qué tipo de lista necesito?
          │
          ├── Items sin orden → Type=unordered (<ul><li>)
          ├── Items con orden → Type=ordered (<ol><li>)
          ├── Pares término/definición → Type=description (<dl><dt><dd>)
          ├── Links de navegación → Type=nav (link items, Tab nav)
          └── Acciones de menú → Type=action (Arrow key nav)
                    │
                    ▼
         ¿Necesita selection/checkbox? → Agregar marker=checkbox
         ¿Es una tabla de datos? → DataGrid (no List)
         ¿Tiene jerarquía de árbol? → TreeView (no List)
```

**Usar List cuando:**
- Listas de contenido informativo (bullet points, pasos numerados)
- Pares término/definición en formularios o cards (Type=description)
- Menús de navegación lateral o header (Type=nav)
- Menús de acciones en dropdowns/overflow (Type=action)
- Listas de items seleccionables con checkbox (marker=checkbox)

**NO usar List cuando:**
- El contenido es tabular con múltiples columnas → `DataGrid`
- La lista tiene jerarquía anidable con toggle → `TreeView`
- La lista tiene selección avanzada (multi-select, bulk actions) → `ResourceList` / DataGrid
- La lista es un picker de opciones en un formulario → `Select` / `Combobox`

---

## Variaciones visuales

### Por Type

| Type        | HTML semántico | A11y pattern | Interactividad |
|------------|---------------|--------------|----------------|
| unordered  | `<ul><li>`    | list/listitem | No focusable |
| ordered    | `<ol><li>`    | list/listitem | No focusable |
| description | `<dl><dt><dd>` | term/definition | No focusable |
| nav        | `<nav><ul><li>` | list/listitem | Tab navigation |
| action     | `role="menu"` + `role="menuitem"` | menu pattern | Arrow key nav |

### Por Density (ListItem height)

| Density     | Altura | px    | py    | Font  | Uso |
|------------|--------|-------|-------|-------|-----|
| compact    | 32px   | 12px  | 6px   | 13px  | Enterprise admin, tablas densas |
| default    | 40px   | 16px  | 10px  | 14px  | Standard — UI general |
| comfortable | 56px   | 20px  | 14px  | 14px  | Touch, mobile, items con descripción |

### Por Dividers

| Dividers | Descripción |
|---------|-------------|
| none    | Sin separadores — spacing del Stack/List hace la separación |
| between | Divider entre cada item (no arriba del primero ni abajo del último) |
| all     | Divider arriba, entre items y abajo — wrap completo |

### Estados de ListItem

| State    | Fondo | Texto | Nota |
|---------|-------|-------|------|
| default | transparent | text/primary | Sin interacción |
| hover   | surface/hover | text/primary | Mouse over en nav/action |
| selected | brand/subtle | interactive/default (medium) | Item activo/seleccionado |
| focused | transparent + ring 2px | text/primary | Foco de teclado |
| disabled | transparent | text/disabled (0.6 opacity) | No interactivo |

### Marker variants (slot opcional)

- `bullet/disc` — punto sólido (default unordered)
- `bullet/circle` — círculo vacío (nested lists)
- `number` — automático por ordered
- `icon/*` — cualquier icon del sistema (vía instance-swap)
- `checkbox` — checkbox para selección múltiple
- `radio` — radio button para selección única

---

## Decisiones de diseño

**1. 5 Types desde un solo componente** — Atlassian no tiene List component (demasiado variable). Polaris tiene 4 componentes separados (ResourceList/ActionList/DescriptionList/List). Un componente con 5 Types cubre los casos semánticos sin proliferar componentes — el Type determina el HTML y el a11y pattern automáticamente.

**2. Dividers como property (none/between/all)** — M3 controla dividers a nivel de List (no colocando Divider components manualmente). Esto evita inconsistencias en el placement (algunas listas con divider arriba, otras no). `between` es el patrón más común en menús; `all` para listas con border visible; `none` cuando el spacing es suficiente.

**3. 3 densidades (compact/default/comfortable)** — foundations.densityModes define compact/default/comfortable. Heights 32/40/56px matching foundations.controlHeights (xs/md/lg). Enterprise admin usa compact; la mayoría usa default; mobile touch usa comfortable. La density se propaga de List a todos sus ListItems.

**4. Type=action usa arrow keys (menu pattern)** — Distinción crítica de a11y: Type=nav usa Tab para navegar (cada link es un destino separado). Type=action usa Arrow keys (ARIA menu pattern) — el menú es una unidad de foco única que se navega internamente. Esta distinción determina el behavior de teclado completamente.

**5. ListItem isBuildingBlock=true, List no** — ListItem es building block porque se usa dentro de Menu, Dropdown, Select, Command. List no es building block — es un componente de UI final que usa ListItems.

### Combinaciones excluidas

```
Type=nav + Dividers=all     → ✗ nav links con divider top+bottom es overkill visual
Type=action + Dividers=all  → ✗ menú de acciones no necesita borde exterior
```

---

## Comportamiento

### Esencial para diseño

- **Type determina el a11y pattern** — no es solo apariencia. Type=action implica `role="menu"` + Arrow keys. No usar Type=action para listas de navegación (usaría el keyboard pattern incorrecto).
- **Density es heredada** — cuando se cambia Density en List, se aplica a todos los ListItems. No mezclar densities dentro de una misma lista.
- **Marker slot es flexible** — el diseñador puede usar bullet, número, ícono o checkbox/radio en el mismo ListItem template vía instance-swap.
- **Trailing slot es de forma libre** — puede contener Badge, Button, Toggle, texto de meta. El diseñador es responsable de la composición interna del trailing.
- **Selected ≠ active nav** — en Type=nav, usar `aria-current="page"` para el link activo. En Type=action, usar `aria-checked` para checkboxes. En Type=unordered/ordered, usar `aria-selected` solo si la lista es interactiva/seleccionable.

### Accesibilidad (ARIA)

| Type | Contenedor | Item | Interactividad |
|------|-----------|------|---------------|
| unordered | `<ul>` | `<li>` | No focusable |
| ordered | `<ol>` | `<li>` | No focusable |
| description | `<dl>` | `<dt>/<dd>` | No focusable |
| nav | `<nav><ul>` | `<li><a>` | Tab; `aria-current="page"` en activo |
| action | `role="menu"` | `role="menuitem"` | Arrow keys; Enter/Space activa |

**Seleccionable (cualquier Type):**
- Single-select: `aria-selected="true"` en item seleccionado
- Multi-select: `aria-multiselectable="true"` en container + `aria-selected` en cada item
- `aria-disabled="true"` en items deshabilitados

### Navegación por teclado

Primary interactions (afectan diseño):

```
Type=nav    → Tab / Shift+Tab navega entre items; Enter activa link
Type=action → ↑↓ navega entre items; Enter/Space activa; Escape cierra menú
              (el menú completo recibe un solo tab stop)
Type=unordered/ordered/description → no focusable
```

Secondary interactions (referencia dev):

```
Type=action → Home → primer item; End → último item; type-ahead → busca por letra
Checkbox marker → Space activa/desactiva checkbox
Radio marker → Arrow keys cambian selección dentro del grupo
```

---

## Guía de contenido

**Label:**
- Texto conciso — una idea por item
- Sin punto final en listas de bullet
- Con punto final solo en listas de oraciones completas (ordered instructional)
- Máximo 2 líneas en Density=comfortable; 1 línea en compact/default

**Description (supporting text):**
- Máximo 1 línea en compact/default (se trunca si excede)
- En comfortable puede tener 2 líneas
- Tono secondary — texto de apoyo, no información crítica

**Marker de ícono:**
- El ícono debe reforzar el significado del label (no ser decorativo sin relación)
- Size debe ser sm (16px) para Density=compact, md (20px) para default/comfortable

**Type=description:**
- Término (`dt`): máximo 3 palabras, sentence case
- Definición (`dd`): valor conciso, puede ser texto, badge, link
- Relación 1:1 típicamente (un dt por dd)

---

## Pre-build checklist

```
□ ¿El Type es correcto para el contenido semántico?
□ ¿Type=action para menús con Arrow key navigation?
□ ¿Type=nav para links de navegación con Tab navigation?
□ ¿Density es consistente en toda la lista?
□ ¿State=selected tiene aria-selected o aria-current según el Type?
□ ¿State=disabled tiene aria-disabled y no href en links?
□ ¿El marker coincide con el Type (bullet → unordered, número → ordered)?
□ ¿Has Divider y Dividers=between son consistentes (no duplicar)?
□ ¿Para descripción lists se usan <dl><dt><dd> (Type=description)?
□ ¿Listas de datos complejas → DataGrid en vez de List?
```

---

## Componentes relacionados

```
Menu/Dropdown  → usa List Type=action internamente
Sidebar Nav    → usa List Type=nav con items selected
Accordion      → puede usar List internamente para items del cuerpo
TreeView       → extensión de List para jerarquías anidadas
DataGrid       → para datos tabulares con múltiples columnas
Select         → usa ListBox (ARIA listbox) para opciones de formulario
Command        → usa List Type=action para command palette items
Description List → usa List Type=description directamente
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Tipos | Densidad | Selection | Virtualización | Diferenciador |
|---------|-------|---------|----------|---------------|--------------|
| **Material Design 3** | 1 tipo (3 variantes: 1/2/3 líneas) | Composición | No nativa | No | ListItemButton separado de ListItem; slots de composición |
| **Spectrum (Adobe)** | ListView + ListBox (2 comps) | compact/regular/spacious | single/multi/replace | Sí (built-in) | DnD reorder; async load; selection modes en un solo comp |
| **Carbon (IBM)** | 4 comps (StructuredList/ContainedList/Unordered/Ordered) | Carbon scale | Radio-select en StructuredList | No | StructuredList con table semantics; kind="disclosed" |
| **Polaris (Shopify)** | ResourceList + ActionList + DescriptionList + List | — | Bulk multi-select en ResourceList | No | ResourceList con bulk actions/filter integrados |
| **Atlassian** | No List component | — | Vía Menu | No (product-level) | Composición de Box+Stack+Pressable; Menu para actions |
| **Ant Design** | List (data-driven) + Descriptions | default/small/large | No nativa | No (ext recomendado) | dataSource+renderItem pattern; grid mode; pagination |
| **Twilio Paste** | List + Description List | — | No | No | Separación explícita list vs. description list |
| **Lightning** | List views (record-level) | — | Page-level | No | Record list views integradas con SF data model |
| **Primer (GitHub)** | ActionList (compound) | — | single/multi | No | ActionList.LeadingVisual/.TrailingVisual/.Description slots |
| **shadcn/ui** | Command (lista porción) | — | — | cmdk | No List component; list en Command/ScrollArea |
| **Radix UI** | Sin List primitivo | — | — | — | Sin List; usa Select/DropdownMenu para lists interactivas |
| **Chakra UI** | List + UnorderedList + OrderedList | spacing prop | No | No | Puramente presentacional; ListIcon sub-comp |
| **GOV.UK** | Summary List + Task List | — | — | — | Summary List con Change links accesibles; Task List con status |
| **Base Web** | List + ListItem | — | No | No | Slot architecture: artwork + content + endEnhancer; sublist nesting |
| **Fluent 2** | List (virtualized) | — | single/multi/extended | Sí | DnD reorder; Outlook/Teams-scale list con miles de items |
| **Gestalt** | List + List.Item | condensed/regular | No | No | Content-first (pin descriptions); type ordered/unordered |
| **Mantine** | List + List.Item | spacing prop | No | No | `icon` prop en List.Item para custom bullet; `center` alignment |
| **Orbit (Kiwi)** | List + ListChoice | — | Selection en ListChoice | No | List/ListChoice split: display vs. selection; travel domain |
| **Evergreen** | UnorderedList + OrderedList | — | No | No | icon+iconColor en List.Item para status; data pipeline context |
| **Nord** | DescriptionList + NavList | — | NavList active state | No | Clinical domain: patient records + sidebar nav |

**Patrones clave de la industria:**
1. **Display vs. Interactive split** — Orbit (List/ListChoice), Spectrum (ListView/ListBox), Primer (List/ActionList) todos separan listas de display de listas interactivas. El HTML y a11y son fundamentalmente distintos. Nuestro Type prop unifica esto en un componente.
2. **Slot architecture** — Base Web (artwork+content+endEnhancer) y Primer (LeadingVisual+Description+TrailingVisual) son las referencias de anatomía de ListItem. Tres zonas: leading + main + trailing.
3. **Virtualization** — Spectrum y Fluent 2 la tienen built-in. La mayoría no. Para listas de miles de items, virtualization es responsabilidad de la implementación (react-virtual).
4. **dataSource pattern** — Ant Design's `dataSource+renderItem` es el patrón data-driven. El resto usa children declarativos. Nuestro List usa children (más predecible en Figma).

---

## Tokens

**18 tokens** · prefijo `lst-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `lst-compact-h` | `sizing/32` | Altura item compact — 32px |
| `lst-default-h` | `sizing/40` | Altura item default — 40px |
| `lst-comfortable-h` | `sizing/56` | Altura item comfortable — 56px |
| `lst-default-bg` | `surface/default` | Fondo default — transparente |
| `lst-default-fg` | `text/primary` | Texto default |
| `lst-hover-bg` | `surface/hover` | Fondo hover — #F7F7F9 |
| `lst-selected-bg` | `brand/subtle` | Fondo selected — #EDF0FF |
| `lst-selected-fg` | `interactive/default` | Texto selected — #2659EB |
| `lst-selected-fontWeight` | `type/weight-medium` | Peso selected — 500 |
| `lst-focused-ring` | `focus/ring` | Ring focus — 2px #3F61F2 |
| `lst-disabled-fg` | `text/disabled` | Texto disabled — #B8B8C0 |
| `lst-divider-color` | `border/default` | Color divider — #D1D1D8 |
| `lst-label-fontSize` | `type/md` | Font label — 14px |
| `lst-description-fontSize` | `type/sm` | Font description — 13px |
| `lst-description-fg` | `text/secondary` | Color description — #6B7280 |
| `lst-gap` | `spacing/3` | Gap marker↔label — 12px |
| `lst-px` | `spacing/4` | Padding horizontal — 16px |
| `lst-py` | `spacing/2` | Padding vertical (base) — 8px |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────────┐
│  ListItem anatomy por Density                                │
│                                                              │
│  compact (32px):                                            │
│  │ px:12 │ [marker 16px] 8px [label 13px] │ [trailing] │    │
│           py:6 top + py:6 bottom                            │
│                                                              │
│  default (40px):                                            │
│  │ px:16 │ [marker 16px] 12px [label 14px] │ [trailing] │   │
│           py:10 top + py:10 bottom                           │
│                                                              │
│  comfortable (56px):                                        │
│  │ px:20 │ [marker 20px] 12px [label 14px] │ [trailing] │   │
│           ↕  [description 13px/secondary]  ↕              │
│           py:14 top + py:14 bottom                           │
│                                                              │
│  Frames:                                                     │
│  ListItem: State(5) × Density(3) = 15 frames                │
│  List:     Type(5) × Density(3) × Dividers(3) = 45 − 6 = 39│
└──────────────────────────────────────────────────────────────┘
```
