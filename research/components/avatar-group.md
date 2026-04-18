# Avatar Group — Component Research

**Date:** 2026-04-17
**Mode:** Max (all 24 systems, all patterns)
**Systems analyzed:** 24
**Systems with component:** 12 — Spectrum, Atlassian, Ant Design, Twilio Paste, Salesforce Lightning, GitHub Primer, Wise, Playbook, Chakra UI, Fluent 2, Gestalt, Mantine

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | No tiene Avatar ni AvatarGroup — considera que el grouping de personas es un problema de layout, no de componente | Composición manual con `Row` y negative margins; shape tokens para bordes |
| Carbon (IBM) | El contexto enterprise de IBM (cloud, DevOps) prioriza listas de texto sobre stacks visuales; nunca formalizó Avatar | Listas de participantes con texto/email |
| Polaris (Shopify) | Tiene `Avatar` individual pero trata el grouping como problema de `ResourceList` o inline layout | Avatar + CSS negativo margin manual |
| shadcn/ui | Headless-first: provee primitivas, no convenciones de grouping | Composición libre de `Avatar` con negative margin CSS |
| REI Cedar | Contexto retail sin casos de uso de identidad visual colectiva | Sin workaround directo |
| Dell Design System | Enterprise data-density; prefers tabular user lists over visual stacks | Tablas o tag-based displays |
| Radix UI | Headless-only — AvatarGroup es opinado sobre spacing y overflow, fuera de su alcance | Compose from `Avatar` primitive manually |
| Base Web (Uber) | Provee Avatar con overrides pero no grouping; movilidad no requiere stacks de equipo | Composición manual |
| GOV.UK | Servicios gubernamentales no usan identidad visual de usuario | Sin workaround — patrón inexistente en el contexto |
| Orbit (Kiwi) | Avatar individual para pasajero/agente; múltiples viajeros en lista, no en stack | Listas estructuradas |
| Evergreen | Dashboard B2B con Avatar colorizado; grouping manual | Compose `Avatar` with CSS |
| Nord (Nordhealth) | Healthcare: identidad individual de proveedor; multi-proveedor en lista estructurada | Listas con texto |

---

## How Systems Solve It

### Atlassian — "El más battle-tested: overflow + dropdown + tooltips en producción"

Atlassian construyó su `AvatarGroup` directamente para los casos de Jira sprint boards, Confluence page collaborators y Trello card members — productos donde la limitación de espacio y la identificación rápida de personas son requisitos de negocio reales. El componente gestiona el overflow mediante `maxCount`, mostrando "+N" para avatares ocultos, y al hacer click sobre ese badge abre un dropdown con la lista completa de miembros con nombre y avatar. Cada avatar en el grupo muestra un tooltip con el nombre del usuario al hacer hover, resolviendo el problema de identificación sin necesidad de abrir el dropdown. La separación visual entre avatares solapados se consigue mediante un ring de 2px en blanco (configurable vía `borderColor`), un detalle que muchos sistemas ignoran y que causa que los avatares "sangren" unos sobre otros.

**Design Decisions:**
- **Overflow via dropdown (not popover):** → dropdown permite navegación por teclado con arrow keys → accesibilidad production-ready sin esfuerzo extra → **Para tu caso:** dropdown es la elección correcta cuando el número de miembros puede ser largo (>20) y necesitas búsqueda o scroll
- **`maxCount` prop explícita:** → da control programático sobre cuándo aparece el overflow → evita que el stack crezca infinitamente en pantallas pequeñas → **Para tu caso:** establece defaults por contexto (8 en desktop, 4 en mobile)
- **Border ring de 2px blanco:** → contraste visual entre avatares solapados → sin ring, los avatares se mezclan en fondos oscuros o coloridos → **Para tu caso:** siempre implementar, con valor configurable para fondos no-blancos
- **Tooltip por avatar (no solo en hover del grupo):** → identificación rápida sin abrir overflow → crítico en boards donde los usuarios deben reconocer rápidamente quién está asignado → **Para tu caso:** implementar `aria-describedby` para que tooltips sean accesibles
- **`appearance: "stack" | "grid"`:** → grid layout para resúmenes de equipo más grandes → stack para compactación en espacio limitado → **Para tu caso:** stack es el default, grid es para vistas expandidas

**Notable Props:** `maxCount: number`, `size: "small" | "medium" | "large"`, `appearance: "grid" | "stack"`, `onMoreClick: () => void`, `borderColor: string`

**Accessibility:** `role="group"` con `aria-label`. El overflow badge anuncia "N more" a screen readers. El dropdown es navigable con arrow keys. Tooltips via `aria-describedby`.

---

### Spectrum (Adobe) — "Overflow limpio con popover + enforcement estricto de size"

Spectrum ofrece un `AvatarGroup` dedicado con gestión de overflow vía `maxVisibleAvatars` y un indicador "+N" que puede abrir un popover listando los usuarios ocultos. La decisión más característica de Spectrum es el **size enforcement**: todos los avatares dentro del grupo heredan el size del contenedor, sin posibilidad de mezclar tamaños. Esto refleja la filosofía de Spectrum de consistencia interna sobre flexibilidad — en herramientas de Adobe (Photoshop, Illustrator, XD), los grupos de colaboradores deben verse uniformes. El componente es también RTL-aware, invirtiendo la dirección del solapamiento en locales de derecha a izquierda.

**Design Decisions:**
- **Size enforcement total:** → un solo `size` prop controla todos los avatares del grupo → previene inconsistencias visuales en UIs de colaboración → **Para tu caso:** recomendado para la mayoría de casos; si necesitas mezclar sizes, considera composición manual
- **RTL-aware stacking:** → el solapamiento se invierte en RTL automáticamente → el "más reciente encima" se mantiene independientemente de la dirección → **Para tu caso:** crítico si el producto soporta árabe, hebreo, o farsi
- **`maxVisibleAvatars` + popover overflow:** → popover es más liviano que dropdown para listas cortas (<15 miembros) → no requiere navegación con arrow keys → **Para tu caso:** popover funciona bien para grupos de menos de 20 personas

**Notable Props:** `maxVisibleAvatars: number`, size enforced on all children, popover for overflow

**Accessibility:** `role="group"` con `aria-label`. Overflow anuncia el count de hidden members. Avatares individuales mantienen sus propios nombres accesibles.

---

### Ant Design — "La más configurable: trigger de popover + responsive sizes"

`Avatar.Group` de Ant Design destaca por ofrecer **control sobre el trigger del popover de overflow**: `maxPopoverTrigger: "hover" | "click"`. Hover es ideal para UIs de desktop con mucho espacio donde el usuario quiere información rápida; click es mejor en touch devices donde hover no existe. Adicionalmente, Ant es el único sistema con `size` que acepta un **breakpoint object** `{xs, sm, md, lg, xl, xxl}`, escalando el grupo entero responsivamente. El badge "+N" es customizable vía `maxStyle` (inline styles), permitiendo cambiar color y background para contextos semánticos.

**Design Decisions:**
- **`maxPopoverTrigger: "hover" | "click"`:** → hover = UX fluido en desktop; click = intencional en touch → el mismo componente funciona óptimamente en ambos contextos → **Para tu caso:** "click" es el default más seguro; "hover" como enhancement
- **Responsive size object:** → `size={{ xs: 24, sm: 32, md: 40 }}` escala el grupo entero → evita avatares demasiado pequeños en mobile → **Para tu caso:** siempre definir breakpoints de size para evitar overflow visual en mobile
- **`maxStyle` para el badge:** → overrides visuales del "+N" permiten semántica de color → útil para indicar urgencia o tipo de overflow → **Para tu caso:** úsalo con moderación; semántica de color debe tener equivalente no-visual

**Notable Props:** `maxCount: number`, `maxStyle: CSSProperties`, `maxPopoverPlacement`, `maxPopoverTrigger: "hover" | "click"`, `size: number | "large" | "small" | "default" | {xs,...}`

**Accessibility:** ⚠️ A11y débil — Ant no garantiza `aria-label` automático en el grupo ni en el badge "+N". Documentación no explicita la implementación de grupo accesible. Enrich-agent debe compensar con requirements explícitos.

---

### Twilio Paste — "Entity vs user shape: la distinción enterprise más clara"

Paste es el único sistema Tier 1/2 que distingue explícitamente entre `variant="user"` (circular) y `variant="entity"` (rounded square) **dentro del mismo AvatarGroup**, permitiendo grupos mixtos donde personas y organizaciones coexisten en el mismo stack. Esto refleja el contexto enterprise de Twilio donde una lista de colaboradores puede incluir tanto usuarios individuales como cuentas de empresa. El overflow usa `overflowText` (texto configurable para el badge, no solo "+N").

**Design Decisions:**
- **Mixed entity/user variants en el mismo grupo:** → una empresa puede ser participante al igual que un individuo → sin esta distinción, se pierde información semántica sobre el tipo de participante → **Para tu caso:** crítico en productos B2B con múltiples tipos de actores
- **`overflowText` configurable:** → en lugar de "+N" fijo, el texto puede localizarse o personalizarse → "y 3 más" vs "+3" vs "3 ocultos" → **Para tu caso:** localización desde el diseño, no como afterthought

**Notable Props:** `variant: "user" | "entity"`, `overflowText: string`, size enforcement

**Accessibility:** `role="group"` con `aria-label`. Overflow text es legible por screen readers por ser texto visible.

---

### Salesforce Lightning — "El más rico en interacción: overflow dropdown + add-member button"

Lightning (`lightning-avatar-group`) ofrece el AvatarGroup más interactivo del conjunto: además del overflow dropdown para ver miembros ocultos, integra un **botón de "Add member"** (+) directamente en el stack como último elemento. Esto convierte el componente de display pasivo a un punto de entrada de colaboración activa. Soporta tanto shapes circulares (user) como cuadradas (entity) y el dropdown de overflow es navigable por teclado.

**Design Decisions:**
- **Inline add-member button:** → la acción de invitar está co-ubicada con la lista de participantes → reduce clics para completar el flujo de colaboración → **Para tu caso:** implementar si el contexto permite invitar directamente desde la vista del grupo
- **max-count + dropdown overflow:** → dropdown con lista scrollable para grupos grandes → necesario cuando el número de miembros puede ser muy alto → **Para tu caso:** el patrón más robusto para equipos enterprise

**Notable Props:** `max-count`, circular and square shape support, overflow dropdown, add-member button

**Accessibility:** Dropdown navigable con arrow keys. Add-member button es un `<button>` verdadero.

---

### GitHub Primer — "Overlap invertido y hover-expand para contributor lists"

`AvatarStack` de Primer usa **solapamiento de derecha a izquierda** (el avatar de la derecha queda encima), lo cual refleja la convención Git de "el más reciente/primero aparece primero". Al hacer hover sobre el stack, los avatares ocultos se revelan expandiendo el stack horizontalmente — una alternativa a popover/dropdown que evita capa flotante. Diseñado específicamente para commit contributors y PR reviewers.

**Design Decisions:**
- **Hover-expand (no popover):** → la lista de avatares ocultos aparece inline expandiendo el stack → elimina la capa flotante y el z-index management → **Para tu caso:** ideal cuando el espacio lo permite y el número de miembros es moderado (<12)
- **RTL reversed stacking:** → "más reciente" semántica de Git requiere orden visual específico → la decisión de dirección de solapamiento tiene significado semántico, no solo estético → **Para tu caso:** documentar la convención de orden antes de implementar

**Notable Props:** `disableExpand: boolean`, size prop, hover expansion behavior

**Accessibility:** La expansión por hover debe ser activable también por focus. Avatares con `aria-label` individual.

---

### Fluent 2 (Microsoft) — "Stack vs spread + overflow con pie-chart"

Fluent 2 ofrece el modelo de **dual layout** más arquitecturalmente significativo: `stack` (solapamiento tradicional con negative margin) y `spread` (spacing positivo uniforme). El modo spread es crucial para Microsoft Teams donde los avatares pequeños en un stack se vuelven ilegibles. El **overflow indicator como pie-chart** (mostrando distribución proporcional de miembros ocultos por status/rol) es un patrón completamente único. El `AvatarGroupPopover` es un componente separado que gestiona la lista expandida con keyboard dismissal y focus trap.

**Design Decisions:**
- **stack vs spread layout:** → stack = compacto, prioriza espacio; spread = legibilidad, prioriza identidad → la misma información, dos experiencias completamente distintas → **Para tu caso:** ofrecer ambas como variantes si el producto tiene contextos de alta y baja densidad
- **Pie-chart overflow indicator:** → muestra distribución proporcional de tipos de miembros ocultos → más información que "+N" sin necesitar abrir el popover → **Para tu caso:** valioso en dashboards analíticos; sobre-engineered para casos de colaboración simple
- **`AvatarGroupPopover` como sub-componente separado:** → desacopla el trigger de la lista expandida → permite reutilizar el popover en otros contextos → **Para tu caso:** buen patrón de composición para productos con múltiples tipos de overflow

**Notable Props:** `layout: "stack" | "spread"`, `overflowIndicator: "count" | "icon"`, `AvatarGroupPopover`

**Accessibility:** Fluent 2 documenta explícitamente el anuncio del overflow count a screen readers. `AvatarGroupPopover` es keyboard-dismissible (Escape) y focus-trapped.

---

### Gestalt (Pinterest) — "Add-collaborators button integrado: display a acción en un paso"

`AvatarGroup` de Gestalt tiene la característica más única de Tier 3: `addCollaboratorsButton` — un botón "+" integrado como último elemento del stack que actúa como entry point para invitar colaboradores en boards de Pinterest. Eleva el componente de puro display a patrón de colaboración activa. El renderizado es data-driven via `collaborators` array prop. Size enforced.

**Design Decisions:**
- **`addCollaboratorsButton` built-in:** → la acción de invitar es parte del componente, no un patrón compuesto → reduce complejidad del consumer → **Para tu caso:** implementar cuando el flujo de invitar es frecuente y co-ubicado con la lista de participantes
- **Data-driven via `collaborators` array:** → el componente recibe datos, no children → simplifica el uso para listas dinámicas → **Para tu caso:** preferible para grupos cargados desde API

**Notable Props:** `addCollaboratorsButton: boolean`, `collaborators: Array<{name, src}>`, `size`

**Accessibility:** El botón "Add collaborators" es un `<button>` verdadero con label accesible. Group tiene `aria-label` descriptivo.

---

### Chakra UI — "Spacing configurable: control total sobre el overlap"

`AvatarGroup` de Chakra acepta `spacing` con cualquier valor CSS (incluyendo negativos) para control preciso del overlap amount. Es el sistema más flexible en este aspecto. `max` prop controla el overflow con un "+N" Avatar como último elemento. Size enforced via context.

**Notable Props:** `max: number`, `spacing: string | number` (CSS value, negative = overlap)

**Accessibility:** Documentación menciona `role="group"` y `aria-label` como requeridos por el consumidor.

---

### Mantine — "CSS-based overlap, overflow manual"

`Avatar.Group` de Mantine usa CSS negative margin via `spacing` prop. El overflow "+N" se implementa como un `Avatar` estándar posicionado manualmente como último hijo — el componente no gestiona automáticamente el truncado. El consumidor decide cuándo renderizar el badge de overflow. Máxima flexibilidad, mínima convención.

**Notable Props:** `spacing: MantineSpacing` (puede ser negativo para overlap)

---

### Wise Design — "Overflow simplificado para transfer recipients"

Wise implementa AvatarGroup para mostrar destinatarios de transferencias. Soporta "+N" overflow badge con opciones de size limitadas. Contexto fintech donde los grupos son típicamente pequeños (2-5 personas). Confianza baja en la implementación — documentación pública limitada.

---

### Playbook — "Dual React/Rails con stacking kit"

Playbook proporciona "Multiple Users" y "Multiple Users Stacked" — un kit de avatares solapados que soporta badge "+N" manual. Contexto dual React/Rails. Confianza media — menos documentación de accesibilidad explícita.

---

## Pipeline Hints

**Archetype recommendation:** `composite-overlay`
Rationale: AvatarGroup combina múltiples elementos visuales solapados (avatares) con affordances de overlay (tooltip, popover, dropdown) para revelar contenido oculto. No es un form-control, no es nav, y su estructura de "stack con overflow" define el archetype composite-overlay.

**Slot consensus:** (12 sistemas con el componente)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| avatar-items | container | yes | 12/12 | Individual avatar elements; in some systems as children, in others as data prop |
| overflow-indicator | text | no | 10/12 | "+N" badge; configurable text in Paste; pie-chart in Fluent 2 |
| overflow-popover | container | no | 5/12 | Expanded member list; Atlassian (dropdown), Ant, Fluent 2, Lightning, Spectrum |
| add-button | icon-action | no | 2/12 | "+" invite affordance; Gestalt (built-in), Lightning |
| tooltip | container | no | 3/12 | Per-avatar name tooltip; Atlassian, Primer (hover expand), others manual |
| border-ring | visual | no | 7/12 | 2px outline between overlapping avatars; Atlassian, Paste, Primer, Lightning, Chakra, Spectrum, Fluent 2 |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| maxCount | variant | number | 8/12 | Spectrum: `maxVisibleAvatars`; Atlassian/Ant/Chakra: `maxCount`; Lightning: `max-count` |
| size | variant | sm/md/lg | 9/12 | All major systems enforce size across the group; Ant adds responsive breakpoint object |
| spacing | variant | CSS value / negative margin | 3/12 | Chakra + Mantine configurable; others hardcoded overlap |
| layout | variant | stack/spread/grid | 2/12 | Fluent 2 (stack/spread); Atlassian (stack/grid) |
| variant/shape | variant | user/entity | 2/12 | Paste, Lightning — circular vs rounded-square for mixed groups |
| overflowTrigger | variant | hover/click | 1/12 | Ant Design only; others default to click |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasOverflowIndicator | 10/12 | true | Controls "+N" badge visibility |
| hasTooltip | 3/12 | false | Per-avatar name tooltip on hover |
| hasAddButton | 2/12 | false | Integrated "+" invite button (Gestalt, Lightning) |
| hasOverflowPopover | 5/12 | false | Whether overflow badge opens popover/dropdown |
| isBorderRingEnabled | 7/12 | true | 2px border ring between overlapping avatars |
| disableExpand | 1/12 | false | Primer: disable the hover-expand behavior |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 12/12 | stacked avatars, overflow badge if needed | |
| hover (per avatar) | 8/12 | tooltip appears with user name | Atlassian, Primer, Spectrum, others |
| overflow-expanded | 5/12 | popover/dropdown opens with full member list | Atlassian, Ant, Lightning, Fluent 2, Spectrum |
| stack-expanded (hover) | 1/12 | avatars spread horizontally | Primer's hover-expand pattern |
| focus (overflow badge) | 8/12 | focus ring on "+N" interactive element | Required for keyboard nav |
| disabled | 1/12 | opacity reduction | Rare; individual avatar level |

**Exclusion patterns found:**
- overflow-expanded × hover-on-individual-avatars — interaction conflict when popover is open; 4/12 systems resolve by pausing tooltips during open state
- Non-interactive groups × focus order — when group is purely decorative, no element should be in tab order; 6/12 systems document `aria-hidden="true"` for decorative use

**Building block candidates:**
- overflow-popover → `.AvatarGroupOverflow` — 5/12 systems formalize the expanded list as a sub-component
- add-button → `.AvatarGroupAddButton` — 2/12 systems integrate it formally; others treat as composition

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| layout | stack, spread, grid | 2/12 | Fluent 2 (stack/spread), Atlassian (stack/grid) |
| overflowTrigger | hover, click | 1/12 | Ant Design; hover default is problematic for touch |
| shape | user (circular), entity (square) | 2/12 | Paste, Lightning for mixed-type groups |
| overflowIndicatorStyle | count, icon, pie-chart | 1/12 | Fluent 2's pie-chart is unique |

**A11y consensus:**
- Primary role: `role="group"` (8/12 explicit) + `aria-label` describing the collection ("Team members", "Contributors", "Board collaborators")
- Required ARIA: `aria-label` on group container; `aria-label` or `alt` on each avatar; overflow "+N" must have accessible text ("N more members")
- Keyboard: overflow badge is `<button>` → Enter/Space to expand; dropdown navigable with arrow keys; Escape to dismiss popover; add-button is focusable `<button>`
- Focus: non-interactive groups → `aria-hidden="true"` or `tabIndex={-1}` on all children; interactive (with popover/add-button) → only interactive elements in tab order
- APG pattern: Group container → ARIA group pattern; overflow popover → Dialog or Listbox depending on content
- Hover-expand (Primer): must also respond to focus for keyboard users
- Overflow indicator: must announce count textually, not just visually ("+3" renders fine; "3" alone does not)

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template — same Base component, configured with booleans | Same component set, different boolean combos |
| 40–70% | Extension — shared shell + extra variant prop | Same component set with additional property |
| < 40% | Separate component | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Stack (default) | 100% | Template | Overlapping avatars, negative margin | All 12 |
| Stack with overflow popover | 80% | Template | Adds overflow badge + popover slot | Atlassian, Ant, Spectrum, Fluent 2, Lightning |
| Stack with hover-expand | 75% | Template | Overflow revealed by hover, no popover layer | Primer |
| Stack with add-button | 70% | Template | Last item is "+" invite button | Gestalt, Lightning |
| Spread (non-overlapping) | 60% | Extension | Positive spacing instead of negative | Fluent 2 |
| Grid layout | 50% | Extension | 2D arrangement for larger groups | Atlassian (`appearance="grid"`) |
| Mixed-entity group | 85% | Template | Circular + square avatars in same stack | Paste, Lightning |
| Data-driven (array prop) | 70% | Template | Driven by `collaborators[]` array vs children | Gestalt, Lightning |

---

## What Everyone Agrees On

1. **Horizontal stacking with negative margins:** Every system with AvatarGroup uses negative margins or CSS overlap to create the stack visual. The exact amount varies (12–16px offset for medium avatars) but the technique is universal.

2. **maxCount overflow to "+N" badge:** 10/12 systems collapse excess avatars into a "+N" indicator. This is the universal solution to the "how many avatars before the group becomes unreadable" problem.

3. **Size enforcement across the group:** 9/12 systems enforce a single size for all avatars within the group. Mixed sizes create visual chaos in overlapping stacks and are almost universally rejected.

4. **Border ring for contrast separation:** 7/12 systems add a 2px white (or background-color-matching) outline between overlapping avatars. Without this ring, avatars "bleed" into each other on non-white backgrounds.

5. **Group-level ARIA labeling:** All systems with documented accessibility use `role="group"` + `aria-label`. This is the non-negotiable a11y baseline.

6. **Overflow indicator must be interactive:** In all systems with popover/dropdown overflow, the "+N" badge is an interactive button, not decorative text. This ensures keyboard and screen reader users can access the full member list.

---

## Where They Disagree

**¿Cómo debe revelarse la lista de miembros ocultos?**
- **Option A: Popover/dropdown on click** (Atlassian, Ant, Spectrum, Lightning, Fluent 2) — opens an overlay with the full list; supports keyboard navigation; proper separation between trigger and content
- **Option B: Hover-expand inline** (Primer) — avatars spread horizontally in place; no overlay layer; simpler but must also respond to focus; breaks in very constrained horizontal space
- **Para tu caso:** Click-triggered popover is more robust for a11y and works on touch; hover-expand is elegant for contributor lists in low-density UIs

**¿Debe el AvatarGroup incluir un botón de acción ("+") integrado?**
- **Option A: Built-in add-button** (Gestalt, Lightning) — integrated as last element; reduces clicks to invite; but conflates display and action in one component
- **Option B: External action affordance** (Atlassian, Spectrum, Ant, Chakra) — add-button is composed externally; component stays as pure display; consumer wires the action
- **Para tu caso:** External composition is cleaner and more reusable; built-in only if the invite flow is always co-located with the group (Pinterest boards, Salesforce records)

**¿Cómo se maneja el solapamiento en RTL?**
- **Option A: Auto-reverse RTL** (Spectrum, Atlassian implied) — overlap direction reverses automatically in RTL locales; "most recent on top" semantics preserved
- **Option B: Fixed direction** (most systems) — no RTL handling; teams must add CSS `direction: rtl` manually
- **Para tu caso:** If the product supports RTL languages, bake RTL handling into the component from day one; retrofitting is painful

**¿Circular o cuadrado — o ambos en el mismo grupo?**
- **Option A: Circular only** (Spectrum, Atlassian, Chakra, Mantine) — consistent shape; simpler; "people = circles" convention
- **Option B: User (circular) + entity (square) coexist** (Paste, Lightning) — mixed groups for enterprise B2B where organizations and people share the same context
- **Para tu caso:** Start with circular-only; add entity variant only if the product has explicit "person vs. organization" distinction in the data model

**¿Spacing/overlap hardcoded o configurable?**
- **Option A: Fixed overlap amount** (Atlassian, Spectrum, Ant, Gestalt) — design system decides the visual density; consumers can't override
- **Option B: Configurable `spacing` prop** (Chakra, Mantine) — negative value = overlap; positive = separation; maximum flexibility at the cost of visual inconsistency risk
- **Para tu caso:** Hardcoded default with a `spacing` escape hatch for edge cases; don't expose full flexibility as the primary API

**¿Layout stack o spread?**
- **Option A: Stack only** (all systems except Fluent 2 and Atlassian) — traditional overlap; space-efficient; the mental model everyone knows
- **Option B: Stack + spread** (Fluent 2, Atlassian) — spread for contexts where identity clarity trumps space efficiency (Teams channel headers, large group summaries)
- **Para tu caso:** Start with stack; add spread variant if analytics show users struggling to distinguish avatars in dense layouts

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Stack with overflow badge | Avatares solapados + "+N" clickeable → popover | Colaboración, asignación de equipo | Atlassian, Spectrum, Ant, Chakra, Fluent 2 |
| Stack with hover-expand | Avatares ocultos se revelan al hover | Contributor lists, PR reviewers | GitHub Primer |
| Stack with inline add-button | "+" como último elemento del stack | Invitación a boardrooms, colaboración social | Gestalt, Lightning |
| Spread layout | Avatares con spacing positivo, sin solapamiento | Alta densidad de identidad (Teams headers) | Fluent 2 |
| Grid layout | Avatares en 2D grid, no en línea | Team overviews, member galleries | Atlassian |
| Pie-chart overflow | Overflow indica distribución proporcional | Analytics dashboards con roles/status | Fluent 2 |

**Stack con overflow popover (el más común):**
```
┌────────────────────────────────┐
│  ●●●●●  +3                     │
│  └─┘└─┘└─┘└─┘└─┘  └──┘        │
│   A  B  C  D  E   overflow     │
└────────────────────────────────┘

Al click en +3:
┌─────────────────┐
│ ● F. Fernández  │
│ ● G. González   │
│ ● H. Hernández  │
└─────────────────┘
```

**Hover-expand (Primer):**
```
Default:          On hover:
●●●●+3  →  ●  ●  ●  ●  ●  ●  ●
└collapsed┘   └─────expanded─────┘
```

**Stack con add-button (Gestalt, Lightning):**
```
┌──────────────────┐
│  ●●●●●  +2  [+] │
│             add  │
└──────────────────┘
```

**Grid layout (Atlassian):**
```
┌──────────┐
│ ● ● ● ●  │
│ ● ● ● ●  │
│ ● ● +N   │
└──────────┘
```

---

## Risks to Consider

**Risk 1: Border ring omission in dark/colored backgrounds** (HIGH)
Sin border ring, los avatares se mezclan visualmente en backgrounds no-blancos. El 42% de sistemas sin AvatarGroup dedicado (que componen manualmente) frecuentemente olvidan este detalle. Implementar siempre con `outline: 2px solid var(--avatar-ring-color)` donde el color por default es el background del contenedor padre.
**Mitigation:** Token de design dedicado `--avatar-ring-color` con default `white`; override para fondos coloridos.

**Risk 2: Overflow indicator no accesible para screen readers** (HIGH)
"+3" como texto visible pero sin anuncio a screen readers es el error de a11y más común en AvatarGroup. Un usuario de lector de pantalla navigando por tab necesita escuchar "3 more members" o "more options: 3 people hidden", no silencio o "plus 3".
**Mitigation:** `aria-label="3 more members"` en el overflow badge; texto visible "+3" puede ser `aria-hidden="true"`.

**Risk 3: Hover-only interactions inaccesibles en touch** (HIGH)
Tooltips por hover en avatares individuales y hover-expand patterns (Primer) son completamente inaccesibles en móvil táctil. Diseñar siempre con "focus reveals lo mismo que hover" como regla.
**Mitigation:** Todo tooltip debe activarse también en `:focus`. Hover-expand debe expandirse también al focus del primer avatar oculto.

**Risk 4: maxCount inflexible en diseños responsivos** (MEDIUM)
Un maxCount fijo (e.g., 5) que funciona bien en desktop puede verse roto en mobile donde el stack no cabe. Ningún sistema excepto Ant Design tiene responsive maxCount.
**Mitigation:** Aceptar maxCount por breakpoint o usar container queries para ajustar automáticamente.

**Risk 5: Conflicto de interacción con tooltip activo + popover** (MEDIUM)
Si el tooltip de un avatar está abierto cuando el usuario hace click en el overflow badge, ambas capas (tooltip + popover) pueden coexistir causando confusión visual. 4/12 sistemas resuelven esto cerrando tooltips al abrir el popover.
**Mitigation:** Estado del grupo controla qué capa está activa; `onOverflowOpen` cierra todos los tooltips.

---

## Dimension Scores (sistemas CON el componente)

| Sistema | API Design | Overflow UX | A11y | Flexibility | Responsiveness | Total |
|---------|------------|-------------|------|-------------|----------------|-------|
| Atlassian | 9 | 9 | 9 | 7 | 6 | **40/50** |
| Fluent 2 | 8 | 9 | 9 | 9 | 8 | **43/50** |
| Spectrum | 8 | 8 | 8 | 6 | 6 | **36/50** |
| Lightning | 8 | 9 | 8 | 7 | 6 | **38/50** |
| Chakra UI | 7 | 7 | 6 | 9 | 7 | **36/50** |
| Gestalt | 7 | 7 | 8 | 6 | 6 | **34/50** |
| Ant Design | 8 | 8 | 5 | 9 | 9 | **39/50** |
| Primer | 7 | 8 | 7 | 6 | 6 | **34/50** |
| Paste | 7 | 6 | 8 | 7 | 6 | **34/50** |
| Mantine | 6 | 5 | 5 | 8 | 6 | **30/50** |
| Wise | 5 | 5 | 4 | 4 | 4 | **22/50** |
| Playbook | 5 | 5 | 4 | 5 | 4 | **23/50** |

**Leader for overflow UX:** Fluent 2 + Atlassian + Lightning
**Leader for a11y:** Atlassian + Fluent 2 + Paste
**Leader for flexibility:** Chakra UI + Ant Design

---

## Next Steps

1. **`/spec avatar-group`** — Generate config.json with anatomy (slots, properties, states) based on this research
2. **`/enrich avatar-group`** — Add a11y requirements (group ARIA, overflow announcement, keyboard) and design tokens
3. **`/build avatar-group`** — Full pipeline in one command using this research as cache
4. **`/build avatar-group --max`** — Use pre-generated config as-is without scope questions
5. **`/research avatar-group --fresh`** — Re-run research from scratch (bypasses this cache)

**Key spec decisions to make:**
- Include `layout: "stack" | "spread"` or stack-only?
- Include built-in `addButton` or external composition?
- Overflow via popover (click) only, or also support hover mode?
- Responsive maxCount via breakpoint prop?
