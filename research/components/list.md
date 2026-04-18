# List — Component Research

**Fecha:** 2026-04-17
**Modo:** --max (all patterns, all systems, no scope filter)
**Scope:** All patterns — presentational, interactive, selection, virtualization, slots, a11y

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Atlassian | Requerimientos de lista varian demasiado entre productos; cada contexto necesita headings/styling diferente | `Box` + `Stack` + `Pressable` primitives para composicion custom; `Menu` para action lists interactivos |
| shadcn/ui | Sin List component standalone — list patterns embebidos en Command (cmdk) y ScrollArea | `Command` para interactive lists; `div` + `map` para display lists; description lists son composiciones custom |
| Radix UI | Libreria headless: list-like behavior via Select, DropdownMenu, o custom | `Select`, `DropdownMenu`, composicion custom |
| Wise Design | Sin List documentado publicamente | Layout primitives + card-like rows |

---

## How Systems Solve It

### Material Design 3 — "Composition-heavy slot architecture"

M3 Lists son el ejemplo mas claro de composition sobre configuration en el ecosistema. Un `List` container sostiene `ListItem` children, cada uno compuesto de slots opcionales: visual leading (icon, avatar, image, video), headline, supporting text, y trailing element (icon, checkbox, switch, text). Los tres density variants (one-line 48dp, two-line 64dp, three-line 88dp) son definidos por el numero de lineas de texto, no por un prop de "size" arbitrario. `ListItemButton` es un componente separado para items interactivos — mantiene items de display-only livianos.

Esta arquitectura es la mas flexible para items complejos con tipos de contenido mixtos. El trade-off es que requiere mas boilerplate que un API de configuracion para casos simples.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Composition (slots separados) sobre configuration | Maneja todo desde listas de texto simple a layouts media-rich — sin combinatoria de props | HIGH | El patron de slots (leading-visual + content + trailing) es el correcto para rich list items |
| `ListItemButton` separado para interactive | Items de display-only no llevan overhead de interactive; items interactivos tienen ripple/focus | HIGH | Separar display item de interactive item, o usar boolean `interactive` |
| Three line-count variants (one/two/three-line) | Altura definida por contenido real, no tamaño arbitrario | MED | Variant por densidad de contenido > variant por "size" nominal |
| Dividers y subheaders como elementos sibling | No props en list items — composicion libre | MED | `Divider` y `ListGroupHeader` como building blocks composables |

**Notable Props:** `dense`, `disableGutters`, `ListItemSecondaryAction`, `ListSubheader`
**A11y:** `<ul>` con `role="list"`, items como `<li>`. `ListItemButton` focusable con keyboard. Selection via `aria-selected`. Sin `role="listbox"` built-in.

---

### Spectrum (Adobe) — "ListView vs ListBox separation con virtualizacion"

Spectrum hace la separacion mas explicita del ecosistema: `ListView` para contenido browseable/accionable (file explorer, asset panel); `ListBox` para seleccion en form controls (dentro de pickers, combo boxes). Son componentes con roles ARIA y modelos de teclado completamente diferentes — esta separacion es la decision arquitectonica mas importante de Spectrum para listas.

`ListView` virtualiza por default para colecciones grandes (sin libreria de windowing separada), soporta drag-and-drop nativo con `dragAndDropHooks`, y ofrece cuatro `selectionMode`s: `none`, `single`, `multiple`, `replace`. El modelo de collection API con `<Item>` children y key-based identity es consistente con todos los componentes de Spectrum que manejan colecciones.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| ListView vs ListBox separation | Roles ARIA diferentes (grid vs listbox), modelos de teclado diferentes — no es posible combinarlos sin ambiguedad | HIGH | La separacion en dos componentes es la arquitectura correcta — no intentar un solo "List" con mode |
| Virtualizacion por default | Listas enterprise pueden tener miles de items — virtualizacion es responsabilidad del DS, no del consumer | HIGH | Built-in virtualization es diferenciador clave para DS enterprise |
| 4 selectionModes incluyendo `replace` | `replace` limpia seleccion previa en nuevo click — comportamiento de file explorer; sin esto, los consumers deben implementarlo | MED | `replace` mode es valioso para interfaces file-manager |
| DnD nativo con hooks | DnD es un requirement recurrente en listas interactivas — integrarlo en el DS evita reinvencion | MED | DnD como feature opt-in con hooks pattern |

**Notable Props:** `selectionMode: "none"|"single"|"multiple"|"replace"`, `selectionStyle: "highlight"|"checkbox"`, `loadingState`, `onLoadMore`, `density`, `overflowMode`
**A11y:** `role="grid"` con `role="row"` para items complejos; `role="listbox"` para items simples. Full keyboard: arrow keys, Home/End, type-ahead, Shift+Click para range selection.

---

### Carbon (IBM) — "Cuatro componentes especializados"

Carbon divide la funcionalidad de lista en cuatro componentes distintos sin componente general-purpose "List". `StructuredList` usa semantica `<table>` para comparacion de datos estructurados con seleccion radio-button. `ContainedList` es un stack vertical de items en un container para navegacion o menus de accion. `UnorderedList` y `OrderedList` son componentes tipograficos para content display. Cada uno tiene su caso de uso exacto.

La decision de `StructuredList` como `<table>` es la mas diferenciadora — comunica que la lista es para comparar datos estructurados, no para navegacion o seleccion general.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Cuatro componentes especializados | Cada patron de lista tiene semantica HTML diferente y casos de uso distintos — un solo "List" crea ambiguedad | HIGH | El split es correcto pero puede ser demasiado granular; considerar 2 (presentacional + interactivo) |
| `StructuredList` con `<table>` semantics | Comparacion de datos estructurados es semanticamente tabular, no una lista | MED | `role="table"` para structured data comparison; `role="list"` para item lists |
| `ContainedList` kind: "on-page"|"disclosed" | Disclosed variant ajusta styling dentro de accordions/expandable containers | MED | Variant contextual para listas dentro de containers collapsibles |
| Seleccion radio-button only en StructuredList | Single-select por la semantica tabular — multi-select seria checkbox, diferente componente | MED | Mapear tipo de seleccion al input nativo correcto |

**Notable Props:** `StructuredList` + `StructuredListRow` + `StructuredListCell`; `ContainedList` con `action` slot; `isNested` en UnorderedList
**A11y:** `StructuredList`: `role="table"` con row/cell; seleccion via radio pattern. `ContainedList`: `role="list"`. Focus en selection rows con arrow keys.

---

### Polaris (Shopify) — "ResourceList como mini data-management surface"

Polaris tiene el repertorio de listas mas amplio: `ResourceList` (colecciones de objetos merchant con bulk actions, filtering, sorting), `ActionList` (menus de acciones en popovers), `DescriptionList` (term-definition pairs), y `List` (tipografico). ResourceList es el mas notable — trasciende un simple componente de lista para ser una superficie de data management con selection bar, filter/sort integration, paginacion awareness, y loading states.

`ResourceItem` tiene `media` para leading thumbnail/avatar y `shortcutActions` para trailing quick-actions que colapsan en kebab menu en mobile — el patron de slot mas responsive en cualquier sistema.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| ResourceList como data surface | Shopify Admin's primary use case — merchant product/order management — necesita bulk actions integrated | HIGH | Para DS de admin/SaaS, una "data list" con bulk actions es frecuente; pero es distinta del List basico |
| `shortcutActions` que colapsan en mobile | Progressive disclosure de acciones: visibles en desktop, kebab menu en mobile | HIGH | Patron valioso para responsive list items con multiples acciones |
| ActionList separado para menus | Popover action menus tienen `role="menu"` — semanticamente diferente a `role="list"` | HIGH | ActionList/MenuList es un componente separado del List de display |
| DescriptionList separado | Key-value pairs tienen layout diferente a item lists — no combinar | MED | DescriptionList siempre separado del List de items |

**Notable Props:** `ResourceList`: items, renderItem, selectable, bulkActions, sortValue, filterControl; `ResourceItem`: media, shortcutActions; `ActionList`: items array con content/icon/destructive/disabled
**A11y:** `role="list"`/`role="listitem"`. ActionList: `role="list"` o `role="menu"` segun contexto, arrow key navigation.

---

### Ant Design — "Data-driven + paginacion integrada + grid mode"

Ant Design's List es data-driven: `dataSource` array + `renderItem` function, con el componente owning iteracion, paginacion, y loading. `List.Item.Meta` provee slots estructurados (avatar, title, description). La feature unica es `grid` prop — transforma la lista en un grid responsivo con columnas configurables y breakpoints, bridging lista y grid sin componente adicional.

`pagination` prop acepta la config de Ant's Pagination directamente — la integracion mas tight de paginacion en un list component en el ecosistema.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `dataSource` + `renderItem` pattern | El componente owns iteracion, paginacion, loading — reduce boilerplate consumer significantly | HIGH | Data-driven API es valioso para listas de backend; trade-off: menos flexibilidad en render |
| `pagination` built-in | Paginacion es un concern universal de las listas de datos — integrarla elimina composicion manual | HIGH | Pagination integrada vs. composicion externa — decision architectural important |
| `grid` mode | Lista que puede ser grid — transforma layout sin cambiar componente | MED | `layout: "list"|"grid"` como alternativa al grid mode separado |
| `itemLayout: "vertical"` | Card-style items con content y actions stacked verticalmente | MED | Variant layout para items tipo card |

**Notable Props:** `dataSource`, `renderItem`, `pagination`, `loading`, `grid`, `size`, `itemLayout`, `header`, `footer`; `List.Item.Meta`: avatar, title, description
**A11y:** `role="list"` (configurable); items como `role="listitem"`. Sin keyboard navigation para seleccion — List es display-oriented.

---

### Primer (GitHub) — "ActionList como building block para NavList y SelectPanel"

Primer's ActionList es uno de los componentes de lista mas completos en Tier 2 y actua como building block para `NavList` y `SelectPanel`. `ActionList.Item`, `ActionList.LeadingVisual`, `ActionList.TrailingVisual`, y `ActionList.Description` establecen el patron de sub-componentes para slots nombrados. Single/multi selection modes built-in. Section dividers con headers. La arquitectura compound component es la referencia para listas interactivas con composition.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Building block para NavList y SelectPanel | La misma base de list item para navigation y selection reduce inconsistencia | HIGH | ActionList como core; NavList y SelectPanel como wrappers especializados |
| `LeadingVisual` / `TrailingVisual` como sub-componentes | Slots nombrados claros — mas explicit que children positions | HIGH | Patron de sub-componentes para slots > children positioning magica |
| Section dividers + group headers | Agrupacion con separadores — patron critico para listas largas | HIGH | `ListGroup` con `label` como building block de agrupacion |

**Notable Props:** ActionList, ActionList.Item, ActionList.LeadingVisual, ActionList.TrailingVisual, ActionList.Description, ActionList.Group
**A11y:** `role="list"` con `role="listitem"`. Selection con `aria-selected`. Group via `role="group"` + `aria-labelledby`.

---

### Twilio Paste — "Semantic HTML first con slots para ListItem"

Paste provee List/Description List como wrappers HTML semanticos — `<ul>`, `<ol>`, `<dl>`. `ListItem` soporta leading/trailing content slots. Sin selection ni action patterns built-in — composicion con otros primitivos para interactividad. Filosofia: semantic list para content, otros componentes para interaction.

**Notable Props:** `List` (ordered/unordered); `ListItem` con slots; `DescriptionList` separado
**A11y:** `<ul>/<ol>/<dl>` semantica nativa — screen readers anuncian tipo y count.

---

### Playbook (eBay) — "SelectableList con checkbox/radio"

`List` con ordered/unordered/borderless variants. `SelectableList` para selection con checkbox/radio integrados. `layout: "horizontal"|"vertical"`. Dark mode support nativo. Dual React/Rails.

**Notable Props:** `List` + `SelectableList`; `layout`; dark mode
**A11y:** `role="listbox"` para SelectableList; `aria-selected` por item.

---

### REI Cedar — "CdrList: presentational puro"

Ordered, unordered, e inline list variants. `modifier` prop para compact/inline styling. Puramente presentacional — sin selection ni action list patterns.

**Notable Props:** `modifier: "compact"|"inline"`, ordered/unordered/inline
**A11y:** `<ul>/<ol>` semantica; `<li>` items.

---

### Chakra UI — "Semantic wrappers con ListIcon"

`List`, `UnorderedList`, `OrderedList` con `ListItem` y `ListIcon` sub-componentes. `spacing` prop para gap entre items. Puramente presentacional — sin interactive patterns.

**Notable Props:** `spacing`, `List`/`ListItem`/`ListIcon`
**A11y:** Semantica HTML nativa.

---

### GOV.UK — "Summary List y Task List: patterns especificos de servicio"

`Summary List` para key-value pairs con "Change" action links opcionales (patron universal en government service forms). `Task List` para multi-step task tracking con status tags. Sin lista generica interactiva — government services usan layouts de pagina explicitos para seleccion, no listas.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| "Change" links con texto visually-hidden | "Change name" no "Change" — screen reader context completo | HIGH | Pattern de accion en item con contexto visually-hidden — adoptar en cualquier DS |
| Sin lista interactiva | Government services usan paginas separadas para cada paso — listas no son el patron de seleccion | MED | Contexto especifico; el pattern Summary List es universalmente valioso |

**Notable Props:** Summary List con `actions`; Task List con status tags
**A11y:** `<dl>/<dt>/<dd>` para Summary List. "Change" links con visually-hidden contexto.

---

### Base Web (Uber) — "Slot architecture: artwork + content + endEnhancer"

El patron de slots mas limpio en Tier 3. `artwork` (visual leading, acepta cualquier node), `endEnhancer` (trailing action/badge), `sublist` para nesting. `ListItemLabel` para texto primario/secundario. Pensado para ride/delivery content rows.

**Notable Props:** `artwork`, `endEnhancer`, `sublist`, `ListItemLabel`
**A11y:** `<ul>/<li>` semantica; nesting via `sublist`.

---

### Fluent 2 (Microsoft) — "Virtualized list para productividad"

La lista mas feature-rich en Tier 3. Virtualizacion para datasets grandes (miles de items en Teams/Outlook). Selection modes (single, multiselect, extended con Shift+Click). Drag-and-drop reordering. Column layouts para detail views. Diseñado para Outlook message list, Teams conversation list, OneDrive file list.

**Notable Props:** virtualization, selection modes, DnD, column layouts
**A11y:** `role="listbox"` con `aria-selected`; `aria-multiselectable`; full keyboard contract.

---

### Gestalt (Pinterest) — "Content display con spacing control"

`List` + `List.Item` con `type: "ordered"|"unordered"`. `spacing: "condensed"|"regular"`. Foco en content display (pin descriptions, board lists) — sin interactive selection.

**Notable Props:** `type`, `spacing`, `label`
**A11y:** Semantica HTML nativa.

---

### Mantine — "Icon como custom bullet + presentational"

`icon` prop en `List.Item` para reemplazar el bullet por custom icon. `spacing`, `size`, `withPadding`, `center` (vertically center icon con texto). Puramente presentacional.

**Notable Props:** `icon`, `spacing`, `size`, `withPadding`, `center`
**A11y:** `<ul>/<ol>/<li>` semantica.

---

### Orbit (Kiwi.com) — "List + ListChoice: the clearest split"

El split mas claro del ecosistema: `List` para informacion estatica (flight details: "1 checked bag included", "Wi-Fi available"); `ListChoice` para seleccion (seat type, meal preference) con `selected`, `onClick`, checkbox/radio affordance, y `role="option"`. Comparten estructura visual pero difieren en todos los ejes de comportamiento.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| List vs ListChoice separation | HTML `<ul>` (display) vs `<select>`/`<listbox>` (interaccion) — la distincion mas clara del ecosistema | HIGH | Adoptar este split como principio arquitectonico |

**Notable Props:** `List` (icon + text); `ListChoice` (selected, onClick, checkbox/radio)
**A11y:** `List`: semantica HTML. `ListChoice`: `role="option"`, `aria-selected`.

---

### Evergreen (Segment) — "Icon + color en ListItem para status"

`UnorderedList`/`OrderedList` con `icon` e `iconColor` en `List.Item` para status indicators. `size` para text sizing. Foco en data pipeline documentation y status lists.

**Notable Props:** `icon`, `iconColor`, `size`
**A11y:** Semantica HTML nativa.

---

### Nord (Nordhealth) — "DescriptionList y NavList clinicos"

`DescriptionList` para patient record key-value pairs (diagnosis, medication, dosage). `NavList` para sidebar navigation con active state y grouping. Contexto clinico forma ambos componentes hacia scan-and-find efficiency.

**Notable Props:** DescriptionList; NavList con active state
**A11y:** `<dl>/<dt>/<dd>`; `aria-current` en NavList.

---

### Lightning (Salesforce) — "Record lists con drag-and-drop"

`lightning-list-view` para record lists; description lists para key-value pairs; drag-and-drop reordering en algunos contextos. Contexto CRM con objetos de negocio.

**Notable Props:** `lightning-list-view`; DnD reordering
**A11y:** Record-specific semantica.

---

### Dell Design System — "Enterprise data lists con metadata columns"

Listas de datos enterprise con metadata columns y structured item rows. Contexto IT management.

**Notable Props:** Metadata columns, structured rows
**A11y:** Semantica enterprise-standard.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: DOS componentes — presentational List + interactive SelectableList**

El mayor insight de los 24 sistemas es que "List" no es un componente — son dos componentes que comparten estructura visual pero difieren en semantica, ARIA, y comportamiento. Orbit's List/ListChoice split es la expresion mas limpia de esta verdad.

- **`List`**: `<ul>/<ol>/<dl>` con slots (leading-visual + content + trailing). Display-only. `role="list"`, `role="listitem"`. Sin selection, sin keyboard navigation de seleccion.
- **`SelectableList` / `ActionList`**: `role="listbox"` con `role="option"`. Selection modes (single/multi). Arrow key navigation. `aria-selected`.

**No intentar un solo componente con `mode="interactive"`** — los roles ARIA son incompatibles.

### Slot Consensus Table

| Slot | Sistemas | Consenso |
|------|----------|----------|
| leading-visual / artwork / icon | MUI, Primer, Base Web, Carbon, Polaris, Orbit, Mantine, Gestalt, Evergreen | 9/20 |
| primary text / headline | Todos | 20/20 |
| secondary text / description | MUI, Spectrum, Primer, Ant Design, Base Web, Carbon | 6/20 |
| trailing element / endEnhancer | MUI, Spectrum, Primer, Polaris, Base Web, Carbon | 6/20 |
| group header / subheader | MUI, Carbon, Primer, Polaris, Spectrum | 5/20 |
| checkbox/radio (selection) | Spectrum, Primer, Playbook, Orbit, Fluent2 | 5/20 |
| action links | Polaris (shortcutActions), GOV.UK (Change links), Carbon (action slot) | 3/20 |

### Property Consensus Table

| Propiedad | Valores observados | Consenso |
|-----------|-------------------|---------:|
| selectionMode | none, single, multiple, replace | 5/20 |
| size / density | sm/md/lg, compact/regular/spacious, condensed/regular | 6/20 |
| layout / itemLayout | horizontal, vertical | 3/20 |
| ordered/unordered (type) | boolean, "ordered"/"unordered", ordered prop | 8/20 |
| loading | boolean, loadingState enum | 4/20 |
| overflowMode | truncate, wrap | 2/20 |

### Boolean Properties Table

| Prop | Default | Sistemas |
|------|---------|----------|
| dense | false | MUI, Carbon |
| disableGutters | false | MUI |
| selectable | false | Polaris ResourceList |
| inline (list) | false | Cedar (modifier) |
| isNested | false | Carbon |
| withPadding | false | Mantine |
| center (icon align) | false | Mantine |

### State Coverage Table

| Estado | Sistemas | Consenso |
|--------|----------|----------|
| default | Todos | 20/20 |
| hover | Sistemas con interactive items | 10/20 |
| selected | Spectrum, Primer, Polaris, Playbook, Orbit, Fluent2, MUI | 7/20 |
| focused | Sistemas con keyboard navigation | 8/20 |
| disabled (item level) | Primer, Polaris, Spectrum, Carbon | 4/20 |
| loading | Spectrum, Ant Design | 2/20 |
| dragging | Spectrum, Fluent2, Lightning | 3/20 |
| empty state | Ant Design | 1/20 |

### Exclusion Patterns

- **Virtualizacion no es universal**: Solo Spectrum y Fluent2 incluyen virtualizacion built-in — para la mayoria, es responsabilidad del consumer con `react-virtual` o `react-window`
- **Sin DnD por default**: Solo Spectrum, Fluent2, y Lightning tienen DnD — es feature opt-in, no base
- **DescriptionList siempre separado**: Ningun sistema combina item lists con description lists en un componente — son siempre componentes distintos
- **Sin empty state built-in**: Solo Ant Design provee empty state — los demas lo componen externamente

### Building Block Candidates

- `List` → presentational wrapper `<ul>/<ol>`
- `ListItem` → slot architecture (leading + content + trailing)
- `ListGroup` → seccion con header + divider
- `ActionList` → interactive list con `role="listbox"` + selection
- `DescriptionList` → key-value pairs con `<dl>/<dt>/<dd>`
- `NavList` → List especializado con `aria-current` para navigation

### Enum / Configuration Properties

```
selectionMode: "none" | "single" | "multiple" | "replace"
selectionStyle: "highlight" | "checkbox"
density: "compact" | "regular" | "spacious"
type: "ordered" | "unordered"
itemLayout: "horizontal" | "vertical"
loadingState: "idle" | "loading" | "loadingMore" | "error"
overflowMode: "truncate" | "wrap"
```

### A11y Consensus

| Dimension | Consenso | Implementacion |
|-----------|----------|----------------|
| Presentational | `<ul>/<ol>/<dl>` semanticos | Screen readers anuncian "list, X items" — nunca `<div role="list">` sin razon |
| Interactive/selectable | `role="listbox"` + `role="option"` | NO `role="menu"` — menu es para action menus, listbox para selection |
| Selection state | `aria-selected="true/false"` | Multi-select: `aria-multiselectable="true"` en el listbox |
| Keyboard (interactive) | ↑↓ navegar; Home/End primero/ultimo; Space toggle; type-ahead | Full keyboard contract del listbox APG pattern |
| Grupos | `role="group"` + `aria-labelledby` en el header | Primer ActionList.Group como referencia |
| Description lists | `<dl>/<dt>/<dd>` — nunca tabla | GOV.UK Summary List como referencia |
| Action links en items | Texto visually-hidden con contexto | GOV.UK "Change name" pattern — nunca solo "Change" |
| APG Pattern | listbox (selection); list (display) | WAI-ARIA Listbox Pattern para interactive lists |

---

## What Everyone Agrees On

1. **Presentational y interactive son dos componentes diferentes.** La distincion entre `<ul>` (display) y `role="listbox"` (interaccion) es arquitectonicamente fundamental — 24 sistemas lo confirman con separacion de componentes.
2. **El slot architecture (leading + content + trailing) es el consensus para list items.** MUI, Spectrum, Primer, Base Web todos usan la misma estructura de tres columnas — es el patron ganador.
3. **DescriptionList es siempre un componente separado.** `<dl>/<dt>/<dd>` tiene layout y semantica diferentes a `<ul>/<li>` — nunca combinarlos.
4. **Selection modes deben incluir al menos `single` y `multiple`.** Spectrum agrega `replace` para file-explorer behavior — valioso para listas de assets.
5. **Grouping con section headers es critico para listas largas.** Todos los sistemas enterprise (Primer, Carbon, Spectrum, Polaris) tienen grouping — es una feature sin la cual listas de mas de 10 items son hard to scan.
6. **Keyboard navigation para listas interactivas sigue el listbox APG pattern.** Arrow keys para navegar, Space para seleccionar, Home/End para primero/ultimo — sin excepcion en sistemas bien implementados.
7. **Iconos/avatars como leading visual son el caso de uso mas comun.** 9/20 sistemas tienen slot de leading visual — es table stakes para cualquier List component moderno.

---

## Where They Disagree

**1. ¿Un componente "List" con modes o dos componentes (presentational + interactive)?**
- **Option A (Orbit, Spectrum, Primer):** Dos componentes separados — List para display, ActionList/ListChoice para interaccion
- **Option B (Fluent2, Playbook):** Un componente con selection modes opt-in — menos componentes, mas complejo

**2. ¿Virtualizacion built-in o delegada al consumer?**
- **Option A (Spectrum, Fluent2):** Virtualizacion por default — el DS maneja performance para listas largas
- **Option B (Todos los demas):** Consumer usa `react-virtual`/`react-window` externamente — menos complejidad en el DS

**3. ¿Paginacion integrada o composicion externa?**
- **Option A (Ant Design):** `pagination` built-in en el List component — menos boilerplate
- **Option B (Todos los demas):** Pagination compuesto externamente — separation of concerns mas limpia

**4. ¿Data-driven (`dataSource` + `renderItem`) o declarativo (children)?**
- **Option A (Ant Design, Spectrum via Collection API):** Data-driven — menos boilerplate para listas de backend
- **Option B (MUI, Carbon, Polaris, Primer):** Declarativo con children — mas flexible en render, mas verbose

**5. ¿Icon como prop o como sub-componente slot?**
- **Option A (Mantine, Cedar, Evergreen):** `icon` prop en `ListItem` — conveniente para el caso simple
- **Option B (Primer, Spectrum, Base Web):** `LeadingVisual`/`artwork` sub-componente — mas flexible (acepta cualquier node), mas verbose

---

## Visual Patterns Found

### Patron 1: Basic List con leading icon

```
┌─────────────────────────────────────┐
│ ● Elemento uno                      │
│ ● Elemento dos                      │
│ ● Elemento tres                     │
└─────────────────────────────────────┘

Con icon:
┌─────────────────────────────────────┐
│ [▶] Primary text                    │
│     Secondary text / description    │
├─────────────────────────────────────┤
│ [▶] Primary text                    │
│     Secondary text / description    │
└─────────────────────────────────────┘
```

### Patron 2: Slot architecture (leading + content + trailing)

```
┌──────────────────────────────────────────┐
│ [avatar] Primary text          [badge] ▶ │
│          Secondary text                  │
├──────────────────────────────────────────┤
│ [icon]   Primary text          [switch]  │
│          Secondary text                  │
└──────────────────────────────────────────┘
  ↑ leading  ↑ content          ↑ trailing
```

### Patron 3: Selectable list (ActionList)

```
┌──────────────────────────────────────────┐
│ Section A                                │ ← group header
├──────────────────────────────────────────┤
│ [✓] Selected item              [icon]   │ ← selected
│ [ ] Not selected               [icon]   │
├──────────────────────────────────────────┤
│ Section B                                │
├──────────────────────────────────────────┤
│ [ ] Another item               [icon]   │
│ [ ] Disabled item ━━━━━━━━━━━━ [icon]   │ ← disabled
└──────────────────────────────────────────┘
```

### Patron 4: Description List

```
┌──────────────────────────────────────────┐
│ Nombre:         Pedro Quinones           │
│ Email:          hola@example.com         │
│ Rol:            Admin              [Cambiar] │
│ Estado:         Activo             [Cambiar] │
└──────────────────────────────────────────┘
  ↑ <dt>          ↑ <dd>          ↑ action link
```

### Patron 5: ResourceList con bulk actions (Polaris)

```
┌─ [ ] Todos ──────────────────────────────┐ ← bulk selection bar
│ [Eliminar] [Exportar]                    │
├──────────────────────────────────────────┤
│ [✓][img] Producto A    $99  [Edit][...] │
│ [✓][img] Producto B    $49  [Edit][...] │
│ [ ][img] Producto C    $199 [Edit][...] │
└──────────────────────────────────────────┘
```

---

## Risks to Consider

| Riesgo | Severidad | Detalle |
|--------|-----------|---------|
| `role="menu"` en lugar de `role="listbox"` para listas de seleccion | HIGH | Menu es para action menus (items ejecutan comandos); listbox es para selection lists (items se seleccionan). El error ARIA mas comun en listas interactivas — keyboard behavior y announcements son incorrectos con el role equivocado. |
| Performance en listas largas sin virtualizacion | HIGH | Listas de 200+ items sin virtualizacion causan layout thrashing y janky scroll — especialmente en mobile. Si el DS no provee virtualizacion built-in, documentar explicitamente el threshold y la libreria recomendada. |
| Presentational List vs Interactive List en el mismo componente | MEDIUM | Un componente "List" con `interactive` boolean que cambia `role` internamente es confuso — los consumers no entienden cuando el role cambia. Dos componentes son mas explicitos aunque mas verbose. |
| Items disabled sin feedback tactil | MEDIUM | Items disabled en listas de seleccion deben tener `aria-disabled="true"` Y señal visual — solo color para disabled viola WCAG 1.4.1. |

---

## Next Steps

1. **Confirmar arquitectura: dos componentes vs uno con modes** — la decision impacta ARIA, keyboard behavior, y API.
2. **Definir slot architecture para ListItem**: sub-componentes (Primer-style) vs props individuales (Mantine-style).
3. **Determinar si virtualizacion es in-scope** para el DS o delegada al consumer con documentacion de threshold.
4. **Separar DescriptionList desde el inicio** — nunca intentar combinar con item list.
5. **Definir selectionModes** y si `replace` (file-explorer) es un requirement del DS.
