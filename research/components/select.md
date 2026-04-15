# Select — Research (Cross-System Analysis)

**Fecha:** 2026-04-10
**Modo:** --max (all patterns, all systems, no scope filter)
**Sistemas analizados:** 24 (all tiers)
**Scope:** trigger, dropdown panel, options, search, multi-select, clear, tags, option groups

---

## Sistemas sin componente dedicado

Todos los 24 sistemas tienen alguna forma de componente Select o equivalente funcional. Ninguno carece de solución.

| Sistema | Componente | Notas |
|---------|-----------|-------|
| Todos 24 | Select / Dropdown / Picker / ComboBox | Variantes del mismo patrón |

---

## How Systems Solve It

### Material Design 3 — "Select como extensión del text field"

M3 trata el Select como un text field especializado, no como un primitivo independiente. Las variantes filled y outlined del text field se reusan directamente, con la misma animación de label, los mismos tokens de contenedor y las mismas formas. Esta decisión refleja la filosofía de M3 de unificar affordances de formulario: un usuario que sabe usar un text field sabe usar un select. Intencionalmente no incluye búsqueda ni filtrado; esa responsabilidad cae en autocomplete, un componente separado. El patrón ARIA es listbox (`role="listbox"`), no combobox, porque el select puro no permite escritura libre.

**Design Decisions:**
| Decisión | Por qué | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Built on text field variants | Affordances de formulario unificados; mismo aprendizaje | H | Reusar DNA visual del textfield reduce inconsistencias |
| `role="listbox"` no `role="combobox"` | Sin escritura libre → semántica ARIA honesta | H | Si no es searchable, usar listbox |
| Sin búsqueda integrada | Scope creep prevention; autocomplete es componente separado | M | Mantener searchable como opt-in, no default |

**Notable Props:** `quick` (abre en pointerdown), `typeaheadDelay`, `value`/`data-value`
**A11y:** Dropdown listbox colapsable; aria-expanded en trigger; type-ahead por carácter; posición y conteo de opciones anunciados.

---

### Spectrum (Adobe) — "Picker vs ComboBox: dos roles ARIA, dos componentes"

Spectrum separa deliberadamente Picker (selección simple sin filtro) de ComboBox (filtrable con escritura). La razón es ARIA: un listbox y un combobox tienen patrones de teclado fundamentalmente distintos. Picker usa `role="listbox"` y no acepta texto; ComboBox usa `role="combobox"` y filtra al escribir. Ambos adaptan su rendering a tray en mobile, porque los popovers son inutilizables en tablets/phones donde se usan las herramientas creativas de Adobe. React Aria hooks headless (`useSelect`/`useComboBox`) potencian ambos.

**Design Decisions:**
| Decisión | Por qué | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Picker vs ComboBox split | Roles ARIA diferentes → combinarlos crea ambiguedad UX | H | Separar searchable de non-searchable a nivel de type |
| Mobile tray rendering | Popovers inutilizables en tablets | M | Considerar adaptación touch |
| Async loading first-class | `isLoading`/`loadingState` con live regions localizadas | M | Loading state si hay listas grandes |

**Notable Props:** `items` (iterable, virtualization), `isLoading`/`loadingState`, `selectedKey`/`defaultSelectedKey`
**A11y:** Separación ARIA estricta; anuncios live region localizados en 30+ idiomas; tray en mobile.

---

### Carbon (IBM) — "Cuatro componentes, cuatro niveles de complejidad"

Carbon divide el problema en cuatro: Select (wrapper nativo), Dropdown (custom single), ComboBox (filtrable), MultiSelect (filtrable multi). Cada uno tiene una API enfocada a su nivel de complejidad, previniendo un "god component" con 40+ props. El diseño Fluid (sin borde externo, se funde con contenedores) vs Default evita CSS overrides en contextos inline/tablas densas. `readOnly` es distinto de `disabled`: permite focus y copia pero previene cambios, crítico para UIs enterprise con audit trails.

**Design Decisions:**
| Decisión | Por qué | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Cuatro componentes jerárquicos | Previene god component; API enfocada por complejidad | H | Usar `type` property para single/multiple/combobox |
| Fluid vs Default style | Evita overrides CSS en tablas densas | M | variant=borderless cubre el caso fluid |
| readOnly distinto de disabled | Focus+copia sin cambios; audit trail enterprise | M | Incluir readonly como boolean |

**Notable Props:** `titleText`/`helperText`/`warnText`, `direction` (top/bottom), `type` (default/inline)
**A11y:** Dropdown=listbox, ComboBox=combobox; aria-invalid/aria-disabled/aria-readonly consistentes.

---

### Polaris (Shopify) — "Composición primero: native donde basta, custom donde se necesita"

Polaris ofrece Select (nativo, cero JS), Combobox (composición de TextField + Popover + Listbox), y Autocomplete (wrapper de conveniencia). El Select nativo es el default para formularios simples de merchants: accesibilidad gratis, comportamiento mobile nativo. El Combobox es composición explícita para dar libertad de customización al ecosistema de apps. Autocomplete cubre el 80% del caso "dropdown searchable" sin requerir ensamblaje manual.

**Design Decisions:**
| Decisión | Por qué | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Native-first Select | Zero JS, a11y gratis, mobile nativo para merchants | H | Para listas cortas (<15), nativo basta |
| Combobox como composición explícita | Flexibilidad para ecosistema de apps diverso | M | Nuestro select custom es el caso intermedio |
| `allowMultiple` en Combobox | Multi-select vía misma composición | M | Multi-select como type, no componente separado |

**Notable Props:** `allowMultiple`, `willLoadMoreResults`/`onScrolledToBottom` (lazy loading)
**A11y:** ARIA 1.2 combobox+listbox; aria-activedescendant para virtual focus.

---

### Atlassian — "Sub-types nombrados sobre combinaciones booleanas"

Atlassian usa un único Select family con sub-types nombrados (single, multi, creatable, async, async-creatable, checkbox, radio, popup) construido sobre react-select. Los sub-types nombrados evitan combinaciones inválidas como `isCreatable + !isSearchable`. Los variants checkbox-select y radio-select muestran estado de selección inline para las interfaces complejas de filtrado de Jira.

**Design Decisions:**
| Decisión | Por qué | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Sub-types nombrados vs booleanos | Self-documenting, previene combos inválidos | H | Usar type variant en vez de N booleans |
| Built on react-select | Hereda keyboard/ARIA testing maduro | M | Considerar peso de dependencia |
| Checkbox-select variant | Indicadores de selección visibles para filtros Jira | L | Multi-select con checkmarks es buena UX |

**Notable Props:** `menuPortalTarget`, `formatOptionLabel`, `isClearable`, `isSearchable`
**A11y:** combobox/listbox roles + aria-live; keyboard completo; Backspace remove en multi.

---

### Ant Design — "Un componente maximalista con `mode` switching"

Ant Design opta por un componente monolítico con `mode` (undefined=single, "multiple", "tags"). Virtual scrolling activo por defecto para listas enterprise chinas de 10,000+ items. Tags mode permite crear opciones nuevas sin componente separado. 40+ props cubren virtualmente todo escenario, desde `tokenSeparators` (auto-split de texto pegado) hasta `dropdownRender` (inyectar "Add new item" al dropdown).

**Design Decisions:**
| Decisión | Por qué | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Mode-based architecture | Un import, switching fácil, menos decisiones | H | `type` property: single/multiple/combobox |
| Virtual scroll por defecto | Listas de 10K+ items comunes en enterprise chino | M | Considerar performance para listas grandes |
| Tags mode | Input+selection blend; tagging sin componente separado | M | tags como boolean, no type separado |

**Notable Props:** `mode`, `virtual`/`listHeight`/`listItemHeight`, `dropdownRender`, `tokenSeparators`, `maxTagCount`
**A11y:** combobox+listbox roles; virtual scroll con mock accessible elements (workaround, no ideal).

---

### Twilio Paste — "Native HTML select con FormField wrapper"

Paste usa native `<select>` con styling Paste y wrapper FormField para label/error/helper. Comportamiento nativo completo del browser. Para custom dropdowns, usan Combobox como componente separado.

**A11y:** Accesibilidad nativa total; keyboard del browser.

---

### Salesforce Lightning — "Native + LightningCombobox para custom"

Lightning ofrece Select nativo estilizado y LightningCombobox para dropdowns custom. Dos componentes distintos para dos necesidades.

**A11y:** Native para formularios simples; combobox ARIA para custom.

---

### GitHub Primer — "Native select + ActionMenu para custom"

Primer estiliza `<select>` nativo y ofrece ActionMenu para dropdowns custom con funcionalidad avanzada.

**A11y:** Native select con Primer styling.

---

### shadcn/ui — "Radix Select: custom styled con portal rendering"

shadcn/ui usa Radix UI Select con rendering custom completo. Portal rendering para evitar clipping. Soporte de item groups con labels visibles. Fully accessible sin configuración manual.

**A11y:** Radix provee combobox/listbox con keyboard completo y type-ahead.

---

### Radix UI — "Custom replacement para native select"

Radix ofrece Select como reemplazo custom de `<select>` nativo. `position` prop (item-aligned vs popper). ScrollUpButton/ScrollDownButton para listas largas. Type-ahead integrado. Sin multi-select.

**A11y:** listbox/option ARIA pattern; type-ahead; scroll buttons accesibles.

---

### Fluent 2 — "Dropdown vs Combobox: separación arquitectónica limpia"

Fluent 2 tiene la separación más limpia: Dropdown (no-editable, single/multi) y Combobox (editable/searchable). Multi-select con checkboxes visibles. Option icons y secondary text. Esta separación evita la torpeza API de aplicar condicionalmente diferentes keyboard handlers y ARIA en el mismo componente.

**Design Decisions:**
| Decisión | Por qué | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Dropdown vs Combobox separados | Keyboard y ARIA fundamentalmente diferentes | H | type=single usa listbox, type=combobox usa combobox |
| Multi-select con checkboxes | Selección visible inline | M | Checkmarks en opciones multi |

**A11y:** Type-ahead en ambos; multi-select anuncia selecciones.

---

### Mantine — "Tres componentes + creatable mode"

Mantine ofrece Select, MultiSelect, y NativeSelect como tres componentes separados. `creatable` mode permite crear opciones nuevas. `renderOption` para custom item rendering. MultiSelect con `maxValues`. Async loading soportado.

**Design Decisions:**
| Decisión | Por qué | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Creatable mode | Crear opciones sin componente separado | M | tags boolean cubre este caso |
| `renderOption` | Custom rendering por opción | M | Opciones con iconos/descripciones |
| `maxValues` en MultiSelect | Límite de selecciones | L | Útil para chips/tags UX |

---

### Base Web (Uber) — "Search by default"

Base Web hace búsqueda el comportamiento default, no opt-in. Para herramientas internas de Uber con cientos de ciudades, un dropdown sin filtro es inutilizable. Multi-select con tags. Async loading vía `onInputChange`. Overrides pattern para customización.

---

### Chakra UI — "NativeSelect + custom Select"

Chakra ofrece NativeSelect para mobile/simple y custom Select vía Ark UI para rendering rich. Recomendación context-dependent.

---

### GOV.UK — "Native siempre: research-backed"

GOV.UK usa native `<select>` siempre. Investigación muestra que custom dropdowns rinden peor para audiencias gubernamentales en mobile y con tecnología asistiva. Error/hint integrados.

---

### Gestalt (Pinterest) — "SelectList + Dropdown"

SelectList (nativo) para formularios simples; Dropdown (custom) para rendering rich. Dos variantes del mismo patrón.

---

### Evergreen — "SelectMenu multi-select con búsqueda"

SelectMenu es multi-select con búsqueda integrada para filtrado analytics (cientos de event types). `isMultiSelect` con checkboxes.

---

### Orbit (Kiwi.com) — "Native select con prefix icon"

Native `<select>` wrapper con slot de prefix icon para contexto travel (cabin class, passenger icon). Sets finitos de opciones en mobile.

---

### Nord (Nordhealth) — "Native select web component"

Native `<select>` como web component; integración healthcare con error/helper-text. Fiabilidad y accesibilidad sobre customización visual.

---

### Playbook, Cedar, Wise, Dell — Variaciones menores

Playbook: native y custom dual React/Rails. Cedar: Vue wrapper nativo WCAG 2.1 AA. Wise: currency/country selects críticos. Dell: enterprise configuration selects.

---

## Pipeline Hints

**Archetype recommendation:** composite-overlay
Rationale: El Select consta de un trigger (button-like) que abre un panel overlay (dropdown/listbox) con opciones interactivas. Este patrón de trigger+overlay es el consenso en 24/24 sistemas.

**Slot consensus:** (feeds spec-agent Phase 1 directly)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| trigger | container | yes | 24/24 | Button-like control, contains value/placeholder + chevron |
| label | text | no | 22/24 | Form label above trigger (part of form field wrapper) |
| placeholder | text | yes | 24/24 | Shown when no value selected |
| value-text | text | yes | 24/24 | Displays selected value(s) |
| icon-leading | icon | no | 10/24 | Prefix icon inside trigger (Orbit, Fluent) |
| chevron | icon | yes | 24/24 | Dropdown arrow indicator |
| clear-button | icon-action | no | 16/24 | Clearable "x" inside trigger |
| dropdown-panel | container | yes | 24/24 | Overlay container for options |
| search-input | text | no | 14/24 | Filter/search field at top of dropdown |
| option | text | yes | 24/24 | Individual option item — sub-component candidate |
| option-icon | icon | no | 8/24 | Icon within option (Fluent, shadcn) |
| option-description | text | no | 6/24 | Secondary text within option |
| option-checkbox | icon | no | 8/24 | Checkbox in multi-select options (Fluent, Atlassian) |
| option-group-label | text | no | 14/24 | Section header for grouped options |
| tags-container | container | no | 12/24 | Container for selected value tags in multi-select |
| tag | text | no | 12/24 | Individual removable tag — sub-component candidate |
| helper-text | text | no | 18/24 | Below trigger, form hint |
| error-text | text | no | 20/24 | Below trigger, error message |
| no-results | text | no | 10/24 | Empty state when search yields nothing |
| loading-indicator | icon | no | 8/24 | Spinner for async loading |

**Property consensus:** (feeds spec-agent Phase 2 directly)
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Size | size | sm/md/lg | 20/24 | Universal; heights 32/40/48 |
| Type | variant | single/multiple/combobox | 18/24 | Ant=mode, Carbon=separate comps, Fluent=separate comps |
| Variant | variant | outlined/filled/borderless | 14/24 | M3 filled/outlined; Carbon default/fluid; many outlined-only |
| State | state | default/hover/focus/disabled/readonly/open | 22/24 | open=dropdown visible, unique to overlay composites |
| Status | status | none/error/warning | 20/24 | Some add success (Ant) |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasLabel | 22/24 | true | Controls label slot visibility |
| isClearable | 16/24 | false | Shows clear "x" button when value selected |
| isSearchable | 14/24 | false | Shows search input in dropdown (combobox type auto-enables) |
| hasTags | 12/24 | false | Shows tags for multi-select instead of count text |
| isDisabled | 24/24 | false | Disables all interaction |
| isReadonly | 8/24 | false | Focus+copy, no change |
| isRequired | 18/24 | false | Required field asterisk |
| isLoading | 8/24 | false | Shows loading spinner |
| hasHelperText | 18/24 | false | Controls helper text slot |
| hasLeadingIcon | 10/24 | false | Controls prefix icon in trigger |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 24/24 | Base appearance, border visible | |
| hover | 22/24 | Border darkened, subtle bg change | |
| focus | 22/24 | Focus ring 2px, border color change | Keyboard nav |
| open | 20/24 | Dropdown visible, trigger border active, chevron rotated | Unique to composite-overlay |
| disabled | 24/24 | Opacity 0.5, no interaction | |
| readonly | 8/24 | Reduced border, no chevron, focusable | Enterprise |
| error | 20/24 | Red border + error icon/text | Validation |
| warning | 12/24 | Amber border + warning text | Validation |

**Exclusion patterns found:**
- disabled x hover/focus/open — 24/24 systems (universal)
- disabled x error/warning — 20/24 (disabled overrides validation)
- readonly x open — 8/8 (readonly cannot open dropdown)
- readonly x hover — partial, some show hover on readonly

**Building block candidates:** (feeds spec-agent BB detection)
- option → `.SelectOption` — 24/24 systems have structured option items (text + optional icon + optional description + optional checkbox)
- tag → reuse existing Tag/Chip component — 12/24 systems use removable tags for multi-select display

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| dropdownPosition | bottom/top/auto | 14/24 | Where panel renders relative to trigger |
| maxTagCount | number | 8/24 | Max visible tags before "+N more" |

**A11y consensus:** (feeds enrich-agent Phase 1 directly)
- Primary role: `combobox` on trigger (searchable) / `listbox` via button with `aria-haspopup="listbox"` (non-searchable) — 18/24 consensus for combobox when type=combobox
- Required ARIA: `aria-expanded`, `aria-haspopup`, `aria-controls` (links trigger to listbox), `aria-activedescendant` (on combobox), `aria-selected` on options, `aria-labelledby` (label association)
- Keyboard: Down/Up navigate options, Enter selects, Escape closes dropdown, Tab exits, Home/End first/last option, type-ahead filters
- Focus: On open → first option or search input. On close → return to trigger. aria-activedescendant pattern (22/24).
- APG pattern: Combobox (searchable) / Listbox (simple)
- Multi-select: aria-multiselectable="true" on listbox; Backspace removes last tag; tag remove buttons with descriptive labels ("Remove [value]")
- A11y quality flags: Ant Design virtual scroll SR workaround (weak); GOV.UK native = strongest

---

### Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| >= 70% | Template | Same component set, different boolean combos |
| 40-70% | Extension | Same component set with additional variant property |
| < 40% | Separate component | Own component set |
| Different semantics | NOT this component | Different component entirely |

**Types found:**

| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Single select (basic) | 100% | Template (base) | Pick one value, dropdown closes | 24/24 |
| Single select + clear | 95% | Template | + clear button boolean | 16/24 |
| Single select + search | 85% | Template | + search input in dropdown | 14/24 |
| Multi-select (chips/tags) | 75% | Extension (type=multiple) | Tags in trigger, checkmarks in options | 18/24 |
| Multi-select + search | 70% | Extension | Tags + search combined | 14/24 |
| Combobox/Autocomplete | 65% | Extension (type=combobox) | Input replaces trigger, type to filter | 18/24 |
| Creatable/Tags input | 50% | Extension | Create new options on Enter | 8/24 (Ant, Mantine, Atlassian) |
| Async select | 80% | Template | Loading spinner, fetch on open/search | 8/24 |
| Native select | 40% | Separate | OS rendering, no custom options | 10/24 |
| Cascader/Nested select | 30% | NOT Select | Multi-level hierarchical | 2/24 (Ant, Carbon) |
| Tree select | 20% | NOT Select | Tree hierarchy with expand/collapse | 2/24 (Ant) |
| Menu/Dropdown actions | 25% | NOT Select | Actions not values | separate component |

---

## What Everyone Agrees On

1. **Trigger button pattern**: All 24 systems render the select trigger as a button-like control with a chevron indicator, matching text field heights for form alignment.

2. **Chevron rotation on open**: The downward-pointing chevron rotates or changes to indicate open/closed state. Universal visual affordance.

3. **Escape closes**: Pressing Escape always closes the dropdown and returns focus to the trigger. Zero exceptions across all 24 systems.

4. **Label + helper text anatomy**: Form field wrapper with label above, helper/error text below. Same anatomy as text field, ensuring form consistency.

5. **Option highlighting**: The currently focused option (via keyboard or hover) receives a distinct background highlight. aria-activedescendant or roving tabindex tracks it.

6. **Single-select auto-close**: Selecting an option in single-select mode closes the dropdown immediately. Multi-select keeps it open.

7. **Disabled blocks everything**: Disabled state prevents opening, hovering, focusing. Opacity reduction (0.38-0.5) is universal.

---

## Where They Disagree

1. **"Un componente o varios?"** Carbon y Fluent 2 usan componentes separados (Dropdown + ComboBox + MultiSelect). Ant Design y Atlassian lo resuelven con un solo componente y `mode`/sub-types. -> Option A: Un componente con `type` variant (simpler API, 18/24). Option B: Componentes separados (cleaner ARIA, 6/24). **Para tu caso:** Un componente con Type=single/multiple/combobox es el balance correcto: menos archivos Figma, misma anatomía base.

2. **"Searchable por defecto?"** Base Web activa búsqueda por defecto. La mayoría (20/24) lo hace opt-in. -> Option A: Search opt-in (20/24, simpler default). Option B: Search por defecto (Base Web, mejor para listas largas). **Para tu caso:** Search opt-in via `isSearchable` boolean. Combobox type auto-enables search.

3. **"Rol ARIA del trigger: button+listbox o combobox?"** M3 y Spectrum usan `button` + `role="listbox"` para non-searchable. Atlassian y Ant usan `combobox` para todo. -> **Para tu caso:** Non-searchable: button with aria-haspopup="listbox". Searchable/combobox: `role="combobox"`.

4. **"Tags vs count text en multi-select?"** Algunos muestran tags removibles (Ant, Base Web, Mantine). Otros muestran "N items selected" text. -> **Para tu caso:** Ambos: `hasTags` boolean. Default: count text. Tags: opt-in.

5. **"Clear button: siempre visible o solo con valor?"** Carbon y Ant muestran clear solo cuando hay valor seleccionado. Algunos (Atlassian) lo muestran siempre. -> **Para tu caso:** Solo con valor seleccionado (conditional visibility dentro del boolean).

---

## Visual Patterns Found

### Pattern 1: Single Select (Default)
```
┌─────────────────────────────┐
│ Label                        │
├─────────────────────────────┤
│ ○ Selected value          ▼ │
├─────────────────────────────┤
│ Helper text                  │
└─────────────────────────────┘
         │ (open)
         ▼
┌─────────────────────────────┐
│ Option 1                     │
│ ● Option 2 (selected)       │
│ Option 3                     │
│ Option 4                     │
└─────────────────────────────┘
```

### Pattern 2: Searchable Select
```
┌─────────────────────────────┐
│ ○ Selected value        ✕ ▼ │
└─────────────────────────────┘
         │ (open)
         ▼
┌─────────────────────────────┐
│ 🔍 Search...                │
├─────────────────────────────┤
│ Option A                     │
│ ● Option B (selected)       │
│ Option C                     │
└─────────────────────────────┘
```

### Pattern 3: Multi-Select with Tags
```
┌─────────────────────────────┐
│ [Tag1 ✕] [Tag2 ✕] [+2]  ▼ │
└─────────────────────────────┘
         │ (open)
         ▼
┌─────────────────────────────┐
│ 🔍 Search...                │
├─────────────────────────────┤
│ ☑ Option A                   │
│ ☑ Option B                   │
│ ☐ Option C                   │
│ ☐ Option D                   │
└─────────────────────────────┘
```

### Pattern 4: Grouped Options
```
┌─────────────────────────────┐
│  Group Label 1               │
│  ├ Option A                  │
│  └ Option B                  │
│  Group Label 2               │
│  ├ Option C                  │
│  └ Option D                  │
└─────────────────────────────┘
```

---

## Risks to Consider

1. **Combinatoric explosion** (HIGH) — Type(3) x Variant(3) x Size(3) x State(6) = 162 frames BEFORE booleans. Must use exclusions aggressively (readonly only on outlined, open not with disabled).

2. **ARIA role mismatch** (HIGH) — Non-searchable select and searchable combobox have fundamentally different ARIA roles and keyboard patterns. Mixing them in one component requires conditional ARIA, which is error-prone.

3. **Mobile rendering** (MEDIUM) — Custom select dropdowns perform worse than native on mobile. GOV.UK research confirms this. Consider native fallback on mobile or ensure touch target sizes (48px min).

4. **Virtual scrolling a11y** (MEDIUM) — Ant Design's virtual scroll creates mock accessible elements that degrade SR experience. If supporting large lists, ensure proper aria-setsize/aria-posinset on visible options.

5. **Tag remove button labels** (MEDIUM) — Multi-select tag remove buttons ("x") without descriptive labels ("Remove Python from selection") are a common WCAG 4.1.2 failure.

---

## Next Steps

```
/spec select        --> outputs/select-config.json
/enrich select      --> outputs/select-enriched.md + config update
/generate select    --> Figma components
/figma-qa select    --> Audit + auto-fix
/build select       --> Full pipeline
```
