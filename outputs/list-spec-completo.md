# List

## Overview

List es un sistema de dos componentes complementarios — `ListItem` (ítem individual) y `List` (contenedor) — que cubre cinco variantes semánticas de listas: unordered (bullets), ordered (números), description (clave/valor), nav (navegación) y action (menú con flechas). La decisión arquitectónica central del componente es que el `Type` de la List determina tanto la semántica HTML como el patrón ARIA y el comportamiento de teclado — lo que significa que `Type=action` usa `role="menu"` + `role="menuitem"` con arrow keys, mientras que `Type=nav` usa `role="list"` dentro de `<nav>` + Tab navigation. No son el mismo componente con apariencia diferente: son patrones completamente distintos que comparten estructura visual.

```
Patron 1: Unordered list (ul/li)
┌─────────────────────────────────────────┐
│ ● Elemento uno                          │
│ ● Elemento dos con descripción          │
│   Descripción adicional en segunda línea│
│ ● Elemento tres                         │
└─────────────────────────────────────────┘

Patron 2: Slot architecture (leading + content + trailing)
┌─────────────────────────────────────────────┐
│ [▶] Label principal            [badge] [>] │
│     Descripción de apoyo                   │
├─────────────────────────────────────────────┤
│ [▶] Label principal            [switch]   │
│     Descripción de apoyo                   │
└─────────────────────────────────────────────┘
  ↑ marker  ↑ content         ↑ trailing

Patron 3: Nav list con dividers
┌─────────────────────────────────────────────┐
│     Dashboard                               │ ← default
├─────────────────────────────────────────────┤
│ ▶  Productos           (selected/active)  │ ← selected
├─────────────────────────────────────────────┤
│     Pedidos                                 │ ← default
│     Usuarios                                │ ← default (disabled)
└─────────────────────────────────────────────┘

Densidades (default/compact/comfortable):
  compact:     ┌──────────┐  h: 32px  (enterprise dense)
  default:     ┌──────────┐  h: 40px  (general)
  comfortable: ┌──────────┐  h: 56px  (mobile touch)
```

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
ListItem:
  State:    default | hover | selected | focused | disabled
  Density:  compact | default | comfortable

List:
  Type:     unordered | ordered | description | nav | action
  Density:  compact | default | comfortable
  Dividers: none | between | all
```

Toggles (show/hide parts — do NOT generate extra variants):

```
ListItem:
  Has Marker      → muestra/oculta slot marker (bullet, número, icon)
  Has Description → muestra/oculta slot description (segunda línea)
  Has Trailing    → muestra/oculta slot trailing (badge, action, switch)
  Has Divider     → muestra/oculta línea divisoria inferior del ítem
```

### Figma properties panel

```
┌─────────────────────────────────────────────┐
│  ListItem                                   │
├─────────────────────────────────────────────┤
│  State    [default ▾]                       │
│           default / hover / selected /      │
│           focused / disabled                │
│  Density  [compact] [default] [comfortable] │
├─────────────────────────────────────────────┤
│  👁 Has Marker        ○ off                │
│  👁 Has Description   ○ off                │
│  👁 Has Trailing      ○ off                │
│  👁 Has Divider       ○ off                │
├─────────────────────────────────────────────┤
│  🔄 Marker  [bullet/disc ▾]               │
│  ✏️ Label   [List item]                   │
│  ✏️ Description [Supporting text]         │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  List                                       │
├─────────────────────────────────────────────┤
│  Type     [unordered ▾]                     │
│           unordered / ordered /             │
│           description / nav / action        │
│  Density  [compact] [default] [comfortable] │
│  Dividers [none ▾]                          │
│           none / between / all              │
└─────────────────────────────────────────────┘

Frames generados: 15 (ListItem) + 39 (List) = 54 netos
(ListItem: State(5) × Density(3) = 15)
(List: Type(5) × Density(3) × Dividers(3) = 45 − 6 exclusiones)
```

---

## When to use (and when not to)

```
¿Qué tipo de lista necesito?
        │
        ├── Lista de items sin orden (features, bullets)
        │        └── Type=unordered  → <ul><li>
        │
        ├── Lista numerada (pasos, rankings)
        │        └── Type=ordered    → <ol><li>
        │
        ├── Pares clave/valor (metadatos, ficha de producto)
        │        └── Type=description → <dl><dt><dd>
        │            (considera también DescriptionList si es
        │             complejo — GOV.UK Summary List pattern)
        │
        ├── Navegación (sidebar, menú de navegación)
        │        └── Type=nav  → <nav><ul role="list">
        │            Tab entre ítems, aria-current="page" en activo
        │
        ├── Menú de acciones (overflow, context menu)
        │        └── Type=action → role="menu" + role="menuitem"
        │            Arrow keys navigation
        │
        └── ¿Los ítems tienen selección múltiple o drag-and-drop?
                 └── Usar DataGrid o componente de SelectableList
                     (no es el scope de List)
```

**Usar List cuando:**
- Se presentan ítems de texto con o sin elementos visuales auxiliares (marker, ícono, badge)
- La lista es navegacional (sidebar de admin, menú lateral de settings)
- Se necesita un menú de acciones en un popover/dropdown con keyboard navigation de flechas
- Los pares clave/valor requieren formato estructurado (key: value) en una ficha de datos

**No usar List cuando:**
- Los ítems tienen múltiples columnas de datos comparables — usar DataGrid
- La lista tiene jerarquía expandible con sub-ítems — usar TreeView
- Se necesita selección múltiple con checkboxes y bulk actions — considerar DataGrid o lista seleccionable especializada
- Los ítems son el resultado de una búsqueda con query/filter — usar Select o ComboBox que incluyen ese patrón
- La lista tiene más de 200 ítems sin paginación — especificar virtualización o paginación en el handoff

---

## Visual variations

### Por Type

**unordered**: `<ul>` + `<li>`. Marker por defecto es bullet disc (●). Sin keyboard navigation de flechas — no es interactiva. Solo para contenido de display.

**ordered**: `<ol>` + `<li>`. Marker es número automático del browser (1, 2, 3...) o custom si el slot Marker está activo con texto numérico. Para pasos, rankings, procedimientos.

**description**: `<dl>` + `<dt>` + `<dd>`. Layout de dos columnas implícito. El slot label es el `<dt>` (término); el slot description es el `<dd>` (definición). Usado para fichas de producto, metadatos de entidad.

**nav**: Lista dentro de `<nav>`. `role="list"` explícito (porque algunos resets de CSS eliminan la semántica list en `<ul>` con `list-style: none`). Tab navigation entre ítems. `aria-current="page"` en el ítem activo. `State=selected` mapea al ítem activo de navegación.

**action**: `role="menu"` + `role="menuitem"`. Arrow keys ↑↓ para navegar; Enter activa; Escape cierra el menú padre. **Nunca usar `role="listbox"` para action lists** — listbox es para selección, menu es para acciones.

### Por Density

| Density | Altura | Padding H | Padding V | fontSize | gap |
|---------|--------|-----------|-----------|----------|-----|
| compact | 32px | 12px | 6px | 13px | 8px |
| default | 40px | 16px | 10px | 14px | 12px |
| comfortable | 56px | 20px | 14px | 14px | 12px |

### Por Dividers

**none**: Sin líneas divisorias. Para listas donde el espaciado es suficiente para separar ítems.

**between**: Línea divisoria entre ítems (no antes del primero, no después del último). Patrón más común — M3 y Polaris lo usan para listas de settings y navegación.

**all**: Líneas divisorias incluidas antes del primer ítem y después del último (borders top y bottom). Para listas dentro de cards o secciones donde el container tiene borde visual propio. Exclusión: `Type=nav|action + Dividers=all` (decorativamente excesivo en menús de navegación).

### Por State (ListItem)

| State | bg | fg | Notas |
|-------|----|----|-------|
| default | transparent | text/primary | Normal |
| hover | surface/hover (#F7F7F9) | text/primary | Solo en nav/action |
| selected | brand/subtle (#EDF0FF) | interactive/default + weight 500 | Ítem activo |
| focused | transparent + ring 2px | text/primary | Keyboard focus |
| disabled | transparent + opacity 60% | text/disabled | Sin hover/click |

---

## Design decisions

### 1. 5 Types que mapean directamente a semántica HTML + patrón ARIA

**Por qué:** El mayor insight de la investigación de 24 sistemas es que "List" no es un componente — son cinco patrones que comparten estructura visual pero difieren en semántica HTML, roles ARIA y comportamiento de teclado. Carbon formaliza esta separación con cuatro componentes distintos. Orbit tiene el split más limpio con List/ListChoice. Usar un único componente con un `mode` que cambia el `role` internamente crea confusión — los consumidores no entienden cuándo el comportamiento de teclado cambia.

**Tradeoff:** Cinco valores de `Type` incrementan la superficie de aprendizaje del componente. La guía de uso (árbol de decisión incluido) es esencial para que los diseñadores elijan el correcto.

### 2. Dividers como property discreta (none/between/all)

**Por qué:** El control de dividers a nivel de lista (no de ítem individual) previene placement inconsistente. M3 usa dividers a nivel de lista para evitar que los ítems gestionen su propio borde inferior — con borde en el ítem, el primer y último ítem quedan visualmente asimétricos respecto al container. `between` es el patrón correcto para la mayoría de casos; `all` agrega borde externo para listas dentro de secciones bordeadas.

**Tradeoff:** Activar dividers en el ListItem individual (con `Has Divider`) rompe el sistema de dividers a nivel de lista. La guía debe aclarar: usar `List.Dividers` para el patrón consistente; usar `ListItem.Has Divider` solo para casos excepcionales.

### 3. 3 densidades (compact/default/comfortable) alineadas con foundations.densityModes

**Por qué:** Enterprise admin platforms (32px compact), aplicaciones de uso general (40px default), y interfaces mobile touch (56px comfortable) tienen necesidades radicalmente diferentes de densidad. La Densidad en el ListItem y en el List deben estar sincronizadas — el diseñador establece Density en el List container y todos los ítems heredan ese valor.

**Tradeoff:** Tener Density duplicado en ListItem y en List puede crear confusión si se usan desincronizados. En Figma, la Density del List debe controlar la Density de todos sus ListItem children vía overrides — documentar esto en el handoff.

### Excluded combinations

```
Type=nav|action + Dividers=all
  → Razón: en menús de navegación y action menus, los dividers
    all (incluyendo top/bottom) crean peso visual excesivo
    que compite con el container del popover/panel. Los menús
    de navegación se benefician de "between" o "none", no "all".

Total exclusiones en List: 6 frames
(nav + all: 3 densities; action + all: 3 densities)
```

---

## Behavior

### Essential for design

- **Type determina todo**: Elegir el Type correcto es la decisión más importante. `Type=action` sin arrow key navigation es un bug de accesibilidad. `Type=nav` sin `aria-current` en el ítem activo es desorientador para usuarios de SR.
- **Density sincronizada**: La Density del List container y sus ListItem children deben siempre coincidir. Si un diseñador mueve un ListItem compacto a un List comfortable, el resultado es incoherente.
- **Selected vs active en nav**: `State=selected` en ListItem corresponde al ítem actualmente activo en la navegación. En Figma el diseñador debe aplicar manualmente `State=selected` al ítem correspondiente a la ruta actual; en código, `aria-current="page"` se aplica programáticamente.
- **Action list escape**: `Type=action` siempre existe dentro de un contexto de menú (Popover, Dropdown). El comportamiento Escape (cierra el menú) es responsabilidad del Popover padre, no del List.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| List unordered/ordered | `list` (implícito en `<ul>`/`<ol>`) | — | SR anuncia "list, X items" — ayuda al usuario a dimensionar el contenido |
| ListItem (display) | `listitem` (implícito en `<li>`) | — | Parte de la semántica nativa de lista |
| List nav | `list` dentro de `<nav>` | — | `<nav>` provee el landmark; la lista provee la estructura de ítems |
| ListItem nav activo | `listitem` | `aria-current="page"` | SR anuncia "current page" o "current" en el ítem activo |
| List action | `menu` | `role="menu"` | SR anuncia "menu" — cambia el contrato de teclado a arrow keys |
| ListItem action | `menuitem` | `role="menuitem"` | SR puede navegar menú con flechas y anuncia nombre de cada acción |
| ListItem selected | `listitem` o `option` | `aria-selected="true"` | Para listbox selections; `aria-current` para navigation |
| ListItem disabled | `listitem` | `aria-disabled="true"` | SR anuncia "dimmed" o "unavailable"; sigue en el tab order |
| List description | — | `<dl>/<dt>/<dd>` nativo | SR anuncia "definition list" con terms y definiciones |

### Keyboard navigation

Primary interactions (affect design):

```
Type=unordered/ordered/description:
  No focusable — solo contenido de display; sin keyboard nav

Type=nav:
  Tab → navega entre ítems de la lista de navegación
  Shift+Tab → navega hacia atrás
  Enter → activa el link del ítem
  (La lista de navegación sigue el Tab order normal del DOM)

Type=action:
  Tab → foco inicial en el primer ítem del menú
  ↑ / ↓ → navega entre ítems (arrow keys)
  Enter → activa el ítem (ejecuta la acción)
  Escape → cierra el menú padre (responsabilidad del Popover)
  Home / End → primer/último ítem
  Letras → type-ahead (salta al primer ítem que comienza con esa letra)
```

Secondary interactions (dev reference):

```
Multi-select (fuera de scope de List base):
  Space → selecciona/deselecciona ítem (requiere role="listbox")
  Shift+Click → range selection
  Ctrl+A → seleccionar todos

Nota: estos patrones requieren role="listbox" + role="option",
no role="list" + role="listitem" — son componentes distintos
(SelectableList / DataGrid)
```

---

## Content guide

### marker (slot opcional, ListItem)
- **Tipo**: Icon o texto; Figma binding `instance-swap`; toggle `👁 Has Marker`
- **Cuándo activar**: En listas unordered para bullets customizados (ícono en lugar de disc); en ordered para números estilizados; en nav para íconos de sección
- **Default**: `bullet/disc` — bullet circle estándar
- **Tamaño**: El ícono marker debe ser `icn-sm` (16px) para Density=default; `icn-xs` (12px) para compact
- **Prohibido**: No usar marker en `Type=description` — los `<dt>` no llevan bullets

### label (slot requerido, ListItem)
- **Tipo**: Text; binding `text`; default "List item"
- **Longitud**: 1–3 palabras en compact; hasta 1 línea completa en default; puede ser 2 líneas en comfortable si la jerarquía lo justifica
- **En nav**: El label es el nombre de la sección/página. Debe ser descriptivo en aislamiento — usuarios de SR navegan entre ítems con Tab/Arrow
- **En action**: El label es el nombre de la acción. Verbo + objeto cuando aplica: "Exportar CSV", "Duplicar", "Archivar"

### description (slot opcional, ListItem)
- **Tipo**: Text; binding `text`; toggle `👁 Has Description`
- **Default**: "Supporting text"
- **Cuándo**: Para metadata adicional (tipo de archivo, fecha, subtítulo de sección)
- **Longitud**: Máximo 1 línea para Density=compact; hasta 2 líneas para comfortable
- **Color**: Siempre `text/secondary` — jerarquía visual inferior al label
- **Prohibido**: No usar description en `Type=action` — los ítems de menú deben ser concisos para scan rápido

### trailing (slot opcional, ListItem)
- **Tipo**: Container libre; toggle `👁 Has Trailing`
- **Contenidos típicos**: Badge, meta-texto, switch, chevron, action button
- **Posición**: Extremo derecho del ítem, alineado al centro vertical
- **En action list**: Trailing puede ser un shortcut keyboard hint (⌘K), un checkmark de ítem seleccionado, o un indicador de sub-menú (chevron)

---

## Pre-build checklist

```
[ ] ListItem: 15 frames netos (State(5) × Density(3))
[ ] List: 39 frames netos (45 − 6 exclusiones nav/action + Dividers=all)
[ ] State=selected: bg=brand/subtle, fg=interactive/default, fontWeight=500
[ ] State=focused: ring 2px visible (solo en Type=nav y Type=action)
[ ] Density tokens: compact h=32, default h=40, comfortable h=56
[ ] Dividers=between: línea entre ítems, NO antes del primero ni después del último
[ ] Dividers=all: líneas entre ítems + borde top y bottom del container
[ ] Exclusión aplicada: Type=nav|action + Dividers=all = 0 frames
[ ] Marker slot: swap con "bullet/disc" como default
[ ] Description slot: color text/secondary (lst-description-fg)
[ ] Tokens vinculados: lst/selected/bg → brand/subtle, lst/hover/bg → surface/hover
[ ] Type=nav: aria-current="page" en el ítem activo documentado en handoff
[ ] Type=action: role="menu" + role="menuitem" + arrow key nav en handoff
[ ] WCAG AA: State=disabled tiene señal visual (no solo color) + aria-disabled
[ ] DescriptionList (dl/dt/dd) semántica especificada en handoff para Type=description
```

---

## Related components

```
DescriptionList  → especialización de Type=description con layout de dos columnas
                   y soporte de "Change" action links (GOV.UK Summary List pattern)
NavList          → especialización de Type=nav con gestión de aria-current y
                   posible agrupación de secciones
TreeView         → lista jerárquica con ítems expandibles y sub-ítems anidados
DataGrid         → lista con múltiples columnas de datos comparables, selección
                   múltiple y ordenación
Select / ComboBox → lista de selección dentro de un picker con búsqueda/filter
Divider          → divider standalone para separaciones semánticas dentro de List
                   (ListGroup header pattern de Primer)
Avatar Group     → composición frecuente en el slot trailing de ListItem
Badge            → el elemento más común en el slot trailing para indicar count/status
```

---

## Reference: how other systems do it

**Material Design 3 — Composition sobre configuration:** M3 Lists son el ejemplo más claro de composición: `List` contiene `ListItem` children compuestos de slots opcionales (visual leading, headline, supporting text, trailing element). Tres variantes de densidad definidas por número de líneas de texto (one-line 48dp, two-line 64dp, three-line 88dp) — la altura está determinada por el contenido real, no por un prop de "size" arbitrario. `ListItemButton` separado para ítems interactivos para mantener los ítems de display livianos. Dividers y subheaders como elementos sibling composables — no props en los list items.

**Spectrum (Adobe) — ListView vs ListBox con virtualización:** La separación más explícita del ecosistema: `ListView` para contenido navegar/accionar (file explorer, asset panel); `ListBox` para selección en form controls. Roles ARIA y modelos de teclado completamente diferentes — la separación es la decisión arquitectónica más importante de Spectrum. `ListView` virtualiza por defecto para colecciones grandes. Cuatro `selectionMode`s: none, single, multiple, replace. DnD nativo con `dragAndDropHooks`.

**Carbon (IBM) — Cuatro componentes especializados:** Carbon divide en `StructuredList` (semántica `<table>` para comparación de datos), `ContainedList` (navegación/action menus), `UnorderedList` y `OrderedList` (tipográficos). `ContainedList` con `kind: "on-page"|"disclosed"` para variante dentro de accordions. `StructuredList` usa `role="table"` para datos estructurados comparables — la distinción más arquitectónicamente correcta del ecosistema.

**Polaris (Shopify) — ResourceList como superficie de data management:** El repertorio más amplio: `ResourceList` (colecciones con bulk actions, filtering), `ActionList` (menús en popovers), `DescriptionList`, `List`. ResourceList trasciende un componente de lista para ser una superficie de gestión de datos con selection bar, filter/sort y loading states. `shortcutActions` en ResourceItem colapsan en menú kebab en mobile — patrón más responsive del ecosistema. `ActionList` separado para menús con `role="menu"`.

**Ant Design — Data-driven con paginación integrada + grid mode:** Lista data-driven: `dataSource` + `renderItem` con el componente owning iteración, paginación y loading. `pagination` prop acepta la configuración de Ant's Pagination — integración más tight en el ecosistema. `grid` prop transforma la lista en grid responsivo con columnas configurables — bridging lista y grid sin componente adicional.

**GitHub Primer — ActionList como building block:** Primer's ActionList actúa como building block para `NavList` y `SelectPanel`. Sub-componentes: `ActionList.Item`, `ActionList.LeadingVisual`, `ActionList.TrailingVisual`, `ActionList.Description`. Selection modes single/multi built-in. Section dividers con headers. `ActionList.Group` con `aria-labelledby` para agrupaciones accesibles. La referencia más completa para listas interactivas con composition.

**Twilio Paste — Semantic HTML first:** List/Description List como wrappers HTML semánticos (`<ul>`, `<ol>`, `<dl>`). Sin selection ni action patterns built-in — composición con otros primitivos. Filosofía: lista semántica para contenido; otros componentes para interacción. El sistema más conservador en scope — y consistentemente correcto en semántica.

**Orbit (Kiwi.com) — Split List/ListChoice:** El split más claro del ecosistema: `List` para información estática (detalles de vuelo: "1 maleta incluida"); `ListChoice` para selección (tipo de asiento, preferencia de comida) con `selected`, `onClick`, y `role="option"`. Comparten estructura visual pero difieren en todos los ejes de comportamiento. Lección clave adoptada en la separación display/nav/action del `Type` property.

**GOV.UK — Summary List y Task List:** Dos patrones específicos de servicio de gobierno. `Summary List` para pares clave/valor con "Change" action links que incluyen texto visually-hidden con contexto completo: "Change nombre" no "Change" — el patrón de link en ítem con contexto SR más completo del ecosistema. `Task List` para tracking de tareas multi-paso con status tags.

**Base Web (Uber) — Slot architecture limpia:** Patrón de slots más limpio en Tier 3: `artwork` (visual leading, acepta cualquier node), `endEnhancer` (trailing action/badge), `sublist` para anidamiento. `ListItemLabel` para texto primario/secundario. El slot `artwork` es la mejor abstracción para leading visual — más flexible que un prop `icon` que solo acepta íconos.

**Fluent 2 (Microsoft) — Lista virtualizada para productividad:** La lista más feature-rich en Tier 3. Virtualización para datasets grandes (miles de ítems en Teams/Outlook). Selection modes (single, multiselect, extended con Shift+Click). Drag-and-drop reordering. Column layouts para detail views. Diseñado específicamente para Outlook message list, Teams conversation list, OneDrive file list.

**Mantine — Icon como bullet custom:** `icon` prop en `List.Item` para reemplazar el bullet por custom icon. `center: boolean` para alinear verticalmente el ícono con el texto. Puramente presentacional — valida el patrón del slot marker como reemplazo del bullet estándar.

---

## Tokens

**18 tokens** · prefix `lst-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `lst-compact-h` | `sizing/32` | Altura Density=compact |
| `lst-default-h` | `sizing/40` | Altura Density=default |
| `lst-comfortable-h` | `sizing/56` | Altura Density=comfortable |
| `lst-default-bg` | `surface/default` | Background default |
| `lst-default-fg` | `text/primary` | Color texto label |
| `lst-hover-bg` | `surface/hover` | Background State=hover |
| `lst-selected-bg` | `brand/subtle` | Background State=selected |
| `lst-selected-fg` | `interactive/default` | Color texto State=selected |
| `lst-selected-fontWeight` | `type/weight-medium` | Weight texto State=selected (500) |
| `lst-focused-ring` | `focus/ring` | Ring 2px State=focused |
| `lst-disabled-fg` | `text/disabled` | Color texto State=disabled |
| `lst-divider-color` | `border/default` | Color líneas divisorias |
| `lst-label-fontSize` | `type/md` (14px) | Font size label |
| `lst-description-fontSize` | `type/sm` (12px) | Font size description |
| `lst-description-fg` | `text/secondary` | Color description |
| `lst-gap` | `spacing/3` (8px) | Gap entre marker y content |
| `lst-px` | `spacing/4` (16px) | Padding horizontal (default) |
| `lst-py` | `spacing/2` (4px) | Padding vertical base |

### Spacing specs

```
Densidades (h / px / py / gap / fontSize):
  compact:     32px / 12px / 6px  / 8px  / 13px
  default:     40px / 16px / 10px / 12px / 14px   ← default
  comfortable: 56px / 20px / 14px / 12px / 14px

Slots (posicionamiento):
  marker:   alineado al inicio del contenido, top-center con label
            Tamaño: icn-sm (16px) para default/comfortable
                    icn-xs (12px) para compact
  label:    bloque de texto principal, flex-grow
  description: debajo del label, font-size type/sm, color text/secondary
  trailing: extremo derecho, alineado al centro vertical del ítem

Dividers:
  between: 1px sólido, color border/default (#D1D1D9)
           solo entre ítems (nth-child separator, no :first ni :last)
  all:     ídem + borde top en :first-child y borde bottom en :last-child
           (o border en el container de la lista)

Focus ring:
  ring: 2px solid focus/ring (#3F63F2)
  ring-offset: 2px
  border-radius: 4px (coincide con bordes del ítem)
  Solo en ítems interactivos (Type=nav y Type=action)

Mínimo touch target (comfortable, mobile):
  height: 56px  — cumple WCAG 2.5.5 mínimo 44×44px
  width: ancho completo del contenedor

Nested list indent (si se implementa anidamiento):
  padding-left: 24px por nivel adicional
```
