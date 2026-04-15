# Menu (Dropdown Menu) — Component Research

**Fecha:** 2026-04-10
**Modo:** --max (all patterns, all systems, no scope filter)
**Sistemas analizados:** 24 (6 Tier 1 + 8 Tier 2 + 10 Tier 3)
**Scope:** Contextual action list — right-click, dropdown trigger, toolbar overflow

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| GOV.UK | Investigacion propia mostro que dropdown menus crean barreras para usuarios con discapacidades motoras y cognitivas | Navegacion plana con enlaces directos |
| REI Cedar | No presente en la libreria; enfoque en retail simple | Patron ActionBar / composicion manual |
| Orbit (Kiwi) | Dominio de viajes usa listas cortas de acciones (3-5 items) | Popover con lista de acciones basica |

---

## How Systems Solve It

### Material Design 3 — "Tres tipos de menu para tres contextos de trigger"

Material Design 3 distingue tres tipos fundamentales de menu: dropdown (anclado a un trigger), context menu (relativo al cursor via right-click o long-press), y exposed dropdown (superficie de seleccion persistente inline). Esta taxonomia refleja una decision arquitectonica importante: cada tipo tiene requerimientos de posicionamiento y trigger diferentes que serian dificiles de manejar con un solo componente y un prop `type`. El OverflowMenu (3-dot) es un patron de conveniencia especifico para toolbar overflow. Los items soportan iconos leading para coding visual del dominio.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|------------|
| Tres tipos por trigger/contexto | Posicionamiento cursor-relative vs anchor-relative requiere logica diferente | H | Si necesitas context menu (right-click), considera componente separado |
| Sin display de keyboard shortcuts | M3 es cross-platform (mobile+web), shortcuts son convencion desktop-only | M | Para apps enterprise/desktop, necesitaras un slot de shortcut |
| Exposed dropdown persistente (no overlay) | Seleccion inline no interrumpe flujo de lectura | L | No aplica a menus contextuales overlay |

**Notable Props:** `type` (dropdown/context/exposed-dropdown), `anchorElement`, leading icon slot por item, `OverflowMenu`
**A11y:** role="menu" + role="menuitem"; arrow keys navegan; Enter/Space seleccionan; Escape cierra y retorna foco al trigger; submenu items usan aria-haspopup.

### Spectrum (Adobe) — "Separacion semantica accion vs seleccion con adaptacion mobile"

Spectrum divide el sistema en tres componentes: Menu (contenido), MenuTrigger (anchor + estado open), y ActionMenu (shortcut pre-compuesto trigger+menu). La separacion `onAction` vs `onSelectionChange` a nivel de API es la decision mas fuerte: menus de accion (hacer algo) y menus de seleccion (elegir un valor) tienen state management fundamentalmente diferente. La auto-conversion a tray en mobile es unica — menus overlay anclados a triggers desktop son inalcanzables en viewports pequenos. `ContextualHelpTrigger` envuelve items disabled para explicar por que estan deshabilitados, cumpliendo WCAG 1.4.3.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|------------|
| `onAction`/`onSelectionChange` separados | Accion y seleccion tienen state management diferente — un handler para ambos causa mixing accidental | H | Decide si tu menu es action-only o tambien selection |
| Auto-tray en mobile | Menus overlay anclados a triggers desktop son inalcanzables en mobile | H | Si tu DS es mobile-first, implementa conversion a tray |
| `ContextualHelpTrigger` para items disabled | Disabled sin explicacion falla WCAG informational adequacy | M | Agrega tooltip/popover en items disabled para explicar |

**Notable Props:** `onAction(key)`, `onSelectionChange(keys)`, `selectionMode` (single/multiple/none), `disabledKeys`, `ContextualHelpTrigger`, `renderEmptyState`
**A11y:** role="menu" + aria-label requerido; disabledKeys items siguen focusable (descubribles); ContextualHelpTrigger abre popover explicando estado disabled.

### Carbon (IBM) — "Keyboard shortcuts como ciudadano de primera clase"

Carbon es el unico sistema Tier 1 con display de keyboard shortcuts integrado. Para IBM, donde power users enterprise operan principalmente via teclado, mostrar shortcuts en menus ensena y acelera workflows. El context menu es first-class (no afterthought). Danger hover state para items destructivos. Limite documentado de max 12 items por menu — mas alla de 12, scanning overhead excede el umbral y se recomienda tree o select. Icon-only trigger variant para toolbar overflow.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|------------|
| Keyboard shortcut display integrado | Power users enterprise operan via teclado — mostrar shortcuts en menus ensena y acelera workflows | H | Si tu app es enterprise/productividad, shortcut display es critico |
| Max 12 items por menu | Scanning overhead excede threshold despues de 12 items | M | Documenta limite; sugiere tree/select para >12 items |
| Danger hover state | Items destructivos necesitan visual distinction en hover ademas de default | M | Agrega hover state especifico para danger items |

**Notable Props:** `label`, `shortcutText`, `renderIcon`, `hasDivider`, `danger`, `size` (sm/md/lg)
**A11y:** role="menu" + role="menuitem"; shortcut text es visible y SR-readable (no aria-hidden); danger items anunciados as-is.

### Polaris (Shopify) — "ActionList + Popover: composicion sobre componente dedicado"

Polaris no tiene componente Menu dedicado — usa ActionList dentro de Popover. Esta decision refleja que Shopify apps necesitan ActionList en contextos fuera de menus (bulk action bars, row actions, card footers). `actionRole` cambia semantica de items (menuitem/option/destructive). `allowFiltering` para listas con 8+ items agrega busqueda inline. No tiene keyboard shortcut display, contextual help para disabled, ni mobile tray.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|------------|
| ActionList + Popover composicion | ActionList se reutiliza en contextos no-menu (bulk actions, row actions) — un Menu dedicado duplicaria ActionList | H | Si necesitas action lists en multiples contextos, composicion es mejor |
| `allowFiltering` en listas grandes | Apps de merchant con 20+ opciones necesitan filtro inline sin navegar a otra pantalla | M | Agrega prop searchable para menus con >8 items |
| `actionRole` como switch semantico | Misma lista puede ser menuitem u option segun contexto — un prop vs dos componentes | M | Simplifica API si action y selection coexisten |

**Notable Props:** `actionRole` (menuitem/option/destructive), `allowFiltering`, `items[]` (con url, onAction, destructive, disabled), `sections`

### Atlassian — "Separacion DropdownMenu vs Menu y tipos de item semanticos"

Atlassian separa DropdownMenu (overlay contextual triggered) y Menu (navegacion sidebar persistente). DropdownItemCheckbox y DropdownItemRadio son componentes separados (no modes) — cada tipo de item necesita ARIA roles diferentes (menuitemcheckbox vs menuitemradio). No tiene destructive styling — Atlassian UX research muestra que items rojos incrementan clicks accidentales, asi que acciones irreversibles requieren confirmation dialog. No tiene keyboard shortcut display ni mobile tray.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|------------|
| DropdownMenu vs Menu split | Sidebar persistente y dropdown temporal tienen requerimientos a11y incompatibles | H | Si tienes menu persistente, es componente separado |
| CheckboxItem/RadioItem como componentes separados | aria-checked y menuitemcheckbox requieren ARIA roles diferentes — un `selectionMode` prop necesitaria runtime ARIA switching | H | Crea sub-componentes por tipo de item para ARIA correcto |
| Sin destructive styling | Items rojos incrementan clicks accidentales — irreversible requiere confirmation dialog | M | Evalua si danger styling reduce o aumenta errores en tu contexto |

**Notable Props:** `trigger` (ReactNode), `placement`, `shouldFlip`, `DropdownItemCheckbox`, `DropdownItemRadio`, `shouldRenderToParent`

### Ant Design — "Menu de navegacion con modo inline + dropdown separado"

Ant Design separa Menu (navegacion estructural persistente con modos horizontal/vertical/inline) y Dropdown (overlay contextual). `danger` prop para items destructivos. Dark theme first-class (`theme="dark"`). Inline submenu mode soporta profundidad ilimitada (sin recomendacion de limite). Es el sistema mas flexible en modos de navegacion pero su Menu esta orientado a navigation, no action menus.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|------------|
| Menu vs Dropdown split | Navegacion persistente necesita selected-state tracking y collapse — overlay no | H | Para action menus contextuales, usa patron Dropdown |
| `danger` prop en items | Enterprise chino requiere distincion visual inline para acciones destructivas | M | Agrega flag danger a items con visual treatment diferenciado |
| Dark theme built-in | Enterprise dashboards necesitan dark mode como first-class | L | Usa Figma Variables para theme, no variant |

**Notable Props:** `danger` (boolean on MenuItem), `theme` (light/dark), `mode` (horizontal/vertical/inline), `items[]`, `expandIcon`

### shadcn/ui — "Radix DropdownMenu con sub-menus y checkbox/radio items"

shadcn/ui usa Radix UI DropdownMenu como base. Sub-menus via DropdownMenuSub. Separator como componente. RadioGroup y CheckboxItem como sub-componentes first-class para menus que sirven como filtros multi-select o single-select. Es la implementacion mas completa para desktop apps con toolbars tipo Office/VS Code.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|------------|
| Sub-menus nativos | Desktop apps necesitan menus jerarquicos | H | Soporta al menos 1 nivel de submenu |
| CheckboxItem/RadioItem first-class | Toolbar menus con toggles (bold/italic, show/hide sidebar) necesitan item types semanticos | M | Si tu app tiene toggle states en menus, necesitas estos tipos |
| Separator como componente | Agrupacion visual explicita entre secciones de items | L | Usa dividers entre grupos logicos |

### Radix UI — "Tres primitivos separados: DropdownMenu, ContextMenu, Menubar"

Radix separa en tres primitivos porque WAI-ARIA tiene tres patrones de menu fundamentalmente diferentes. DropdownMenu (abierto por boton), ContextMenu (abierto por right-click), y Menubar (barra horizontal persistente). CheckboxItem y RadioItem son sub-componentes first-class. Sub/SubTrigger/SubContent para menus multi-nivel. Type-ahead integrado.

### Fluent 2 (Microsoft) — "Menus de productividad Office con checkbox/radio y split button"

Fluent 2 esta orientado a Office/Teams/Azure. MenuItemCheckbox y MenuItemRadio para toolbars de productividad. Integracion con SplitButton. Sub-menus via MenuGroup. Motion system para animaciones entrada/salida.

### Chakra UI — "Compound components con MenuOptionGroup"

Menu/MenuButton/MenuList/MenuItem como compound components. MenuItemOption y MenuOptionGroup para radio/checkbox groups. `closeOnSelect` control para mantener menu abierto en items toggle.

### Mantine — "rightSection para shortcut display y loop keyboard"

`leftSection`/`rightSection` en items — rightSection especificamente para keyboard shortcut display y count badges. `closeOnItemClick` para items toggle. `color="red"` para destructive actions. Loop keyboard navigation (wraps around).

### GitHub Primer — "ActionMenu con modos SingleSelect/MultiSelect y async loading"

ActionMenu con variantes SingleSelect/MultiSelect/Group. Async item loading. Basado en Popover.

### Twilio Paste — "Menu basado en Reakit con danger items"

Menu basado en Reakit. Dividers. Danger item variant.

### Base Web — "Menu data-driven con items array"

Data-driven via `items` array. `getItemLabel`/`renderItem` para rendering flexible. StatefulMenu vs Menu controlado.

### Gestalt (Pinterest) — "Dropdown con Sections simple"

Dropdown.Section para agrupacion. Dropdown.Item y Dropdown.Link para menus mixtos accion/navegacion. Sin checkbox/radio/sub-menu.

### Evergreen — "OptionsGroup para seleccion exclusiva"

Menu.OptionsGroup para seleccion tipo radio (sort/filter menus). Menu.Item con `intent` para danger actions.

### Nord (Nordhealth) — "Action menus clinicos simples"

Web component para menus de accion clinicos (Edit/Archive/Print paciente). Listas simples apropiadas para eficiencia de personal clinico.

---

## Pipeline Hints

**Archetype recommendation:** composite-overlay
Rationale: Menu es un trigger + panel overlay. El trigger puede ser un boton, icon-button, o right-click area. El panel es una lista de items con posicionamiento overlay. Consenso universal entre los 21 sistemas que lo implementan.

**Slot consensus:** (feeds spec-agent Phase 1 directly)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| trigger | slot | yes | 21/21 | Button, IconButton, or custom trigger. MenuTrigger in Spectrum |
| item-icon | icon | no | 18/21 | Leading icon per menu item. leftSection in Mantine |
| item-label | text | yes | 21/21 | Primary text label of menu item |
| item-shortcut | text | no | 4/21 | Keyboard shortcut display. Carbon shortcutText, Mantine rightSection |
| item-description | text | no | 6/21 | Secondary description under label. Spectrum, Carbon |
| submenu-arrow | icon | no | 12/21 | Chevron indicating submenu. Auto-rendered |
| item-checkbox | icon | no | 8/21 | Checkmark for checkable items. Radix, Fluent, Chakra, shadcn |
| divider | divider | no | 18/21 | Separator between groups/sections |
| group-label | text | no | 14/21 | Section/group header text |
| search | slot | no | 2/21 | Inline search/filter. Polaris allowFiltering |

**Property consensus:** (feeds spec-agent Phase 2 directly)
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Size | variant | sm/md/lg | 8/21 | Carbon, Mantine, Chakra. Many systems single-size |
| State (panel) | state | default/open | 21/21 | Panel visibility state. Controlled by trigger |
| State (item) | state | default/hover/focus/disabled | 21/21 | Per-item interaction states |
| ItemType | variant | default/danger | 14/21 | Carbon danger, Ant danger, Mantine color="red" |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasIcon | 18/21 | false | Controls leading icon slot on items |
| hasShortcut | 4/21 | false | Controls keyboard shortcut text display |
| hasSubmenuArrow | 12/21 | false | Chevron for submenu items |
| hasDividers | 18/21 | false | Separators between groups |
| isDanger | 14/21 | false | Destructive item styling (red text, danger hover) |
| isCheckable | 8/21 | false | Checkbox/radio item type |
| searchable | 2/21 | false | Inline search/filter in menu |
| multiSelect | 6/21 | false | Multiple selection mode |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 21/21 | Base appearance, transparent bg | |
| hover | 21/21 | bgHover surface, subtle bg change | |
| focus | 21/21 | Focus ring or bg highlight | Keyboard navigation |
| pressed | 8/21 | Darker bg momentarily | On click/Enter |
| disabled | 21/21 | Opacity 0.5, non-interactive | aria-disabled="true", still focusable in some systems |
| danger-default | 14/21 | Red text color | Destructive item base state |
| danger-hover | 6/21 | Red bg + white text | Carbon, Mantine danger hover |
| selected/checked | 8/21 | Checkmark icon + accent bg | For checkable items |

**Exclusion patterns found:**
- disabled x hover/focus/pressed — 21/21 systems (universal)
- disabled x danger-hover — implied (disabled blocks all interaction)
- danger x selected — rarely combined (action items don't hold selection state)

**Building block candidates:** (feeds spec-agent BB detection)
- menuItem → `.MenuItem` — 21/21 systems have discrete item with own states (hover, focus, disabled, danger)
- menuGroup → `.MenuGroup` — 14/21 systems have section/group with optional label header
- menuDivider → reuse standard Divider or inline separator (no sub-component needed)

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| placement | auto/top/bottom/left/right | 18/21 | Popover positioning |
| selectionMode | none/single/multiple | 8/21 | Spectrum, Primer, Chakra |
| maxItems | number (12 recommended) | 2/21 | Carbon limit. Most undocumented |

**A11y consensus:** (feeds enrich-agent Phase 1 directly)
- Primary role: `menu` (21/21 consensus)
- Item role: `menuitem` (action), `menuitemcheckbox` (checkable), `menuitemradio` (radio select)
- Required ARIA: `aria-haspopup="menu"` on trigger, `aria-expanded` on trigger, `aria-label` on menu container
- Keyboard: Down/Up navigate items, Enter/Space activate, Right opens submenu, Left/Escape closes submenu, Escape closes menu, Tab closes menu and moves past
- Focus: Roving tabindex within menu. On open → first item. On close → return to trigger. Type-ahead supported (Radix, Fluent, Mantine)
- APG pattern: Menu (vertical submenu pattern)
- Disabled items: aria-disabled="true" (stay focusable per ARIA menu pattern, Spectrum/Radix)

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| >= 70% | Template — same Base component | Same component set, different boolean combos |
| 40-70% | Extension — shared shell + contentType | Same component set with additional variant |
| < 40% | Separate component | Own component set |
| Different semantics | NOT this component | Different component entirely |

**Types found:**

| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Action Menu (dropdown) | 100% | Template (base) | Button trigger → overlay action list | All 21 |
| Context Menu (right-click) | 85% | Template | Cursor-relative positioning, no visible trigger | M3, Carbon, Radix, Lightning |
| Overflow Menu (3-dot) | 90% | Template | IconButton trigger, toolbar context | M3, Carbon, Lightning |
| Selection Menu (single) | 75% | Extension | selectionMode=single, checkmark on selected | Spectrum, Primer, Chakra, Radix |
| Multi-Select Menu | 70% | Extension | selectionMode=multiple, checkbox items | Spectrum, Primer, Radix, Fluent |
| Submenu (nested) | 80% | Template | SubTrigger + SubContent, Right arrow opens | shadcn, Radix, Fluent, Carbon |
| Filter Menu (checkbox/radio) | 65% | Extension | CheckboxItem/RadioItem types, stays open | shadcn, Radix, Fluent, Chakra |
| Navigation Menu (persistent) | 30% | Separate | Persistent sidebar, selected state tracking, modes | Atlassian Menu, Ant Menu |
| Menubar (horizontal) | 25% | Separate | Horizontal persistent bar, different ARIA (menubar) | Radix Menubar |
| Exposed Dropdown (inline) | 20% | NOT a Menu | Persistent inline selection, no overlay | M3 exposed-dropdown |

---

## What Everyone Agrees On

1. **role="menu" + role="menuitem"**: Todos los 21 sistemas usan el patron ARIA menu. Es el estandar APG sin excepcion. Los sistemas que no lo usan (GOV.UK) directamente evitan el componente.

2. **Trigger controla apertura**: El menu se abre via un trigger element (button, icon-button, right-click area). El trigger tiene `aria-haspopup="menu"` y `aria-expanded`. Sin trigger, no hay menu.

3. **Escape cierra y retorna foco al trigger**: Comportamiento keyboard universal. Escape cierra el menu y devuelve foco al trigger que lo abrio. Previene focus loss.

4. **Arrow keys para navegacion interna**: Down/Up mueven entre items. El menu es UN tab stop — Tab lo cierra. Arrow keys manejan navegacion interna.

5. **Items disabled siguen en DOM**: Items disabled usan `aria-disabled="true"` pero permanecen en DOM y algunos sistemas los mantienen focusable para descubribilidad. Nunca se remueven del flujo.

6. **Dividers/separators entre grupos**: Agrupacion visual con separadores es practica universal. `role="separator"` o `role="none"` para separadores.

7. **Iconos leading opcionales**: La mayoria soporta icono antes del label para coding visual del dominio (edit, delete, copy, etc.).

---

## Where They Disagree

1. **"Debe el menu mostrar keyboard shortcuts?"** → Carbon y Mantine SI (slot `shortcutText`/`rightSection`) — enterprise power users necesitan recordatorios de shortcuts. Spectrum, Atlassian, Polaris, M3 NO — cross-platform y mobile-first no tienen shortcuts. → **Para tu caso:** Si tu app es enterprise/desktop, agrega slot para shortcut display.

2. **"Debe haber destructive (danger) styling en items?"** → Carbon, Ant, Mantine, Spectrum SI — texto rojo + hover state rojo para acciones destructivas. Atlassian NO — items rojos incrementan clicks accidentales, prefiere confirmation dialog. → **Para tu caso:** Danger styling es util pero SIEMPRE combina con confirmation para acciones irreversibles.

3. **"Debe el menu convertirse a tray en mobile?"** → Spectrum SI (auto-tray en viewport pequeno). Todos los demas NO. → **Para tu caso:** Si tu DS es mobile-first, la conversion es valiosa. Si es desktop-only, no la necesitas.

4. **"Componente dedicado Menu o composicion ActionList + Popover?"** → Polaris usa composicion (ActionList reutilizable). Todos los demas tienen componente dedicado. → **Para tu caso:** Si necesitas ActionList en otros contextos (bulk actions, row actions), composicion es mejor. Si no, componente dedicado simplifica.

5. **"Items deshabilitados deben tener contextual help?"** → Spectrum SI (ContextualHelpTrigger explica por que esta deshabilitado). Todos los demas solo usan `aria-disabled`. → **Para tu caso:** Contextual help mejora UX pero agrega complejidad de implementacion.

6. **"Checkbox/radio items como sub-componentes o modo?"** → Radix, Fluent, shadcn usan sub-componentes separados (CheckboxItem, RadioItem). Chakra usa MenuOptionGroup con mode. → **Para tu caso:** Sub-componentes separados son mas limpios para ARIA (roles diferentes).

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Simple action list | Items con icon + label | Menus basicos, 3-8 acciones | All 21 systems |
| Grouped sections | Dividers + group labels entre secciones | Menus con categorias logicas | 14/21 |
| Shortcut display | Icon + label + shortcut text alineado derecha | Enterprise/desktop apps | Carbon, Mantine |
| Danger item | Item con texto rojo y hover state rojo | Acciones destructivas (delete, remove) | 14/21 |
| Checkable items | Checkmark/checkbox antes del label | Filter/toggle menus | 8/21 |
| Nested submenu | Item con chevron derecho, abre submenu al hover/Right | Menus jerarquicos | 12/21 |

```
Simple action list:
┌──────────────────────────┐
│  ○ Edit                  │
│  ○ Duplicate             │
│  ○ Move to...        ▶  │
│  ────────────────────    │
│  ○ Delete           ⌫   │ ← danger item
└──────────────────────────┘

Grouped with shortcuts:
┌──────────────────────────┐
│  File                    │ ← group label
│  ○ New           ⌘N     │
│  ○ Open          ⌘O     │
│  ○ Save          ⌘S     │
│  ────────────────────    │
│  Edit                    │
│  ○ Undo          ⌘Z     │
│  ○ Redo          ⌘⇧Z    │
└──────────────────────────┘

Checkable items:
┌──────────────────────────┐
│  View                    │
│  ☑ Sidebar               │
│  ☐ Minimap               │
│  ☐ Status Bar            │
│  ────────────────────    │
│  ● List View             │ ← radio
│  ○ Grid View             │
│  ○ Board View            │
└──────────────────────────┘

Nested submenu:
┌──────────────────────────┐
│  ○ Edit                  │
│  ○ Move to...        ▶  │──┐
│  ○ Share             ▶  │  │ ┌──────────────┐
│  ────────────────────    │  └─│ Folder A     │
│  ○ Delete                │    │ Folder B     │
└──────────────────────────┘    │ Folder C     │
                                └──────────────┘
```

---

## Risks to Consider

1. **Profundidad de submenus sin limite** (MEDIUM) — Ant Design no documenta limite. Mas de 2 niveles causa confusion cognitiva y dificultad motor en mobile. Mitigation: Limita a 1 nivel de submenu; para jerarquias profundas, usa tree view o panel lateral.

2. **Menu vs Select confusion semantica** (HIGH) — Usar role="menu" para seleccion de valores es un error comun. Menus son para ACCIONES, Select/Listbox son para VALORES. Mitigation: Documenta claramente: "Si el item setea un valor, usa Select. Si el item ejecuta una accion, usa Menu."

3. **Mobile touch targets insuficientes** (MEDIUM) — Items de menu con height < 44px fallan WCAG 2.5.8 en touch. Mitigation: min-height 44px en items para touch, 32px minimo para desktop con spacing suficiente.

4. **Danger items sin confirmacion** (MEDIUM) — El styling rojo de danger items puede dar falsa sensacion de seguridad. Usuarios pueden hacer click sin leer. Mitigation: Siempre combina danger styling con confirmation dialog para acciones irreversibles.

5. **Type-ahead no implementado** (LOW) — Solo Radix, Fluent y Mantine implementan type-ahead (presionar letra salta a items que empiezan con esa letra). Mitigation: Implementar type-ahead mejora UX para menus largos pero no es critico si max 12 items.

---

## Next Steps

```
/spec menu          → outputs/menu-config.json
/enrich menu        → outputs/menu-enriched.md + config.json actualizado
/generate menu      → Componentes Figma generados
/figma-qa           → Auditoria + auto-fix
/build menu         → Pipeline completo en un comando
```
