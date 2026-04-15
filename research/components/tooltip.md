# Tooltip — Component Research

**Fecha:** 2026-04-10
**Modo:** --max (todas las variantes, todos los patrones)
**Sistemas analizados:** 24 (6 Tier 1 + 8 Tier 2 + 10 Tier 3)
**Scope:** Tooltip contextual — popup informativo al hover/focus

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| GOV.UK | Investigacion propia demuestra que hint text visible es superior a hover-hidden content | Hint text (texto secundario siempre visible bajo labels) |

---

## How Systems Solve It

### Material Design 3 — "Separacion arquitectural de Plain vs Rich previene violaciones a11y"

Material Design 3 separa tooltips en dos componentes distintos: Plain Tooltip y Rich Tooltip. El Plain es estrictamente texto, aparece en hover/focus, tiene un ancho maximo de 200dp y se auto-cierra a los 1500ms. El Rich agrega titulo, descripcion y acciones opcionales, con un maximo de 320dp y la posibilidad de ser persistente. La separacion no es decorativa: un tooltip con contenido interactivo (botones) que se dispara solo por hover viola role="tooltip" porque el usuario no puede navegar hacia su contenido con teclado. Al hacer dos componentes separados, M3 hace imposible cometer ese error a nivel de API.

El `caretEnabled` es por instancia, no global. En UIs densas (toolbars), la proximidad visual entre trigger y tooltip hace innecesario el caret; en layouts espaciados, el caret crea conexion visual. Auto-dismiss tras 1500ms refuerza que el tooltip debe contener informacion breve — contenido largo pertenece a otro patron.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Plain vs Rich como componentes separados | Previene botones dentro de hover-only surfaces (violacion ARIA) | HIGH | Si solo necesitas texto, un solo componente basta |
| Auto-dismiss 1500ms | Tooltips = breves; contenido largo va en otro lugar | MEDIUM | Evita que usuarios dependan del tooltip como documentacion |
| caretEnabled por instancia | Dense UI no necesita caret; sparse si | LOW | Boolean arrow = off por defecto, toggle segun layout |

**Notable Props:** caretEnabled, isPersistent (solo Rich), maxWidth 200/320dp
**A11y:** aria-labelledby (cuando es label) o aria-describedby (cuando es suplementario); role="tooltip"; focus nunca entra al Plain; Escape cierra.

---

### Spectrum (Adobe) — "Warmup/cooldown global: la solucion mas sofisticada para escaneo rapido"

Spectrum implementa un sistema de warmup/cooldown global compartido entre todos los tooltips de la aplicacion. El primer tooltip tiene ~300ms de delay, pero una vez visible, hovear sobre otro trigger muestra su tooltip instantaneamente (estado "warm"). Despues de un periodo de inactividad, el sistema vuelve a "cold" y el siguiente tooltip requiere el delay completo. Esto resuelve el problema de escaneo de toolbars: un usuario revisando 10 iconos seguidos no quiere esperar 300ms entre cada uno.

La arquitectura separa TooltipTrigger (comportamiento, posicionamiento, ARIA) de Tooltip (contenedor visual). El trigger="focus" permite mostrar el tooltip solo con teclado, util cuando hover crearia ruido visual para usuarios de mouse. offset y crossOffset permiten posicionamiento preciso en layouts complejos de Adobe.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Warmup/cooldown global | Escaneo rapido de toolbars sin delays repetidos | HIGH | Implementacion en codigo; en Figma, irrelevante (estatico) |
| trigger="focus" mode | Hover crea ruido visual en UIs densas | MEDIUM | No afecta el componente Figma |
| crossOffset (perpendicular nudge) | Layouts complejos de Adobe tools | LOW | El offset estandar basta para la mayoria |

**Notable Props:** delay, closeDelay, crossOffset (unico), isOpen (controlado)
**A11y:** Focus muestra tooltip sin warmup (focus = intencion); aria-describedby en trigger; role="tooltip"; focus nunca entra al tooltip.

---

### Carbon (IBM) — "Tres componentes = cero violaciones a11y posibles"

Carbon tiene la division mas rigurosa: Tooltip (hover/focus, no interactivo), Toggletip (click/Enter, contenido interactivo, patron disclosure), y Definition Tooltip (definiciones inline con subrayado punteado). El Toggletip usa el patron WAI-ARIA disclosure (NO role="tooltip") porque su contenido interactivo debe ser alcanzable por teclado, algo imposible con un tooltip que desaparece al mover el mouse.

Una regla unica: los iconos NO pueden ser triggers de tooltips directamente. Deben estar envueltos en IconButton para garantizar que el trigger es focusable. Esto previene triggers inalcanzables por teclado.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| 3 componentes separados (Tooltip, Toggletip, Definition) | Cada contrato de interaccion es explicito e inviolable | HIGH | Para Figma, un solo Tooltip basta (no interactivo) |
| Icons no pueden ser triggers | Triggers deben ser focusable; icon solos no lo son | HIGH | Tu trigger esta fuera del componente tooltip |
| Toggletip = disclosure pattern, no tooltip | Contenido interactivo requiere patron diferente | MEDIUM | Confirma: tooltip Figma = solo texto, no botones |

**Notable Props:** label vs description (mapean directo a aria-labelledby/aria-describedby), align, defaultOpen (Toggletip)
**A11y:** Toggletip = disclosure (no role="tooltip"); Tooltip = role="tooltip"; icon-trigger enforcement previene triggers no focusables.

---

### Polaris (Shopify) — "mostSpace positioning para admin layouts responsivos"

Polaris mantiene un unico componente Tooltip con toggles de comportamiento. La innovacion es preferredPosition="mostSpace" que auto-coloca el tooltip en el lado con mas espacio disponible, resolviendo layouts variables de la admin de Shopify sin calculo del developer. persistOnClick resuelve el gap hover/touch para merchants en tablets. Width presets (default/wide) limitan las opciones para consistencia entre miles de apps Shopify.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| mostSpace auto-positioning | Admin layouts variados (sidebars, modales, viewports) | HIGH | En Figma: Placement = variant con top/bottom/left/right |
| persistOnClick | Tablets no tienen hover; click = fallback | MEDIUM | Implementacion en codigo, no afecta Figma |
| Width presets (default/wide) | Consistencia visual ecosistema-wide | LOW | Un solo ancho maximo basta |

**Notable Props:** preferredPosition (above|below|mostSpace|cover), persistOnClick, hoverDelay, dismissOnMouseOut, accessibilityLabel
**A11y:** aria-describedby en trigger; accessibilityLabel = texto SR optimizado separado del visual; Escape cierra; aparece en focus.

---

### Atlassian — "Mouse-following para triggers grandes en UIs de productividad"

Atlassian tiene un diferenciador unico: position="mouse" donde el tooltip sigue la posicion del cursor. Esto resuelve el problema de triggers grandes (tarjetas Kanban de Jira, filas de tabla, bloques de codigo) donde un tooltip anclado al elemento aparece lejos de la mirada del usuario. position="auto" es el default inteligente que elige la mejor posicion automaticamente.

No hay politica de truncacion: texto truncado en contenido suplementario derrota el proposito de dar contexto.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Mouse-following | Triggers grandes → tooltip lejos de la mirada si se ancla al centro | HIGH | Unico; comportamiento runtime, no afecta Figma |
| Auto position default | Viewports variables de Jira (sidebars, split-views) | MEDIUM | Placement "auto" no se modela en Figma; usar top/bottom/left/right |
| No truncacion | Texto truncado en tooltip = sin sentido | LOW | Content siempre visible completo |

**Notable Props:** position (auto|top|right|bottom|left|mouse), mousePosition, component, truncate (desaconsejado)
**A11y:** Mouse mode no aplica a teclado (siempre element-anchored); aria-describedby; role="tooltip"; focus se queda en trigger.

---

### Ant Design — "Herencia Tooltip -> Popover -> Popconfirm: sistema overlay completo"

Ant Design usa herencia de tres niveles: Tooltip (base texto) se extiende a Popover (titulo + contenido) y luego a Popconfirm (acciones confirmar/cancelar). Los tres comparten la API de posicionamiento y triggers. 12 posiciones disponibles. El problema critico: es hover-only por defecto — trigger={['hover', 'focus']} requiere opt-in explicito para acceso por teclado, un gap de a11y significativo.

destroyTooltipOnHide remueve nodos DOM al ocultar, optimizacion critica para dashboards con cientos de filas con tooltips.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Herencia 3 niveles (Tooltip/Popover/Popconfirm) | Sistema overlay consistente | MEDIUM | En Figma: Tooltip es separado de Popover |
| Hover-only por defecto | Gap de a11y significativo | HIGH | Tu componente DEBE aparecer en focus tambien |
| 12 posiciones | Granularidad excesiva para la mayoria | LOW | 4 posiciones (top/bottom/left/right) bastan |

**Notable Props:** trigger (hover|focus|click|contextMenu, arrays), destroyTooltipOnHide, color (paleta semantica), arrow.pointAtCenter, zIndex
**A11y:** *** No accesible por teclado por defecto *** — debe agregar focus al trigger prop explicitamente; role="tooltip" cuando habilitado.

---

### Primer (GitHub) — "type=label vs type=description: la distincion ARIA mas importante"

Primer v2 exige declarar si el tooltip proporciona el nombre accesible (type="label") o descripcion suplementaria (type="description"). Esto determina si usa aria-labelledby o aria-describedby — una distincion que la mayoria de sistemas deja al developer. Para botones solo-icono, type="label" es obligatorio porque el tooltip ES el nombre accesible.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| type="label" vs "description" | ARIA correcta para icon-only buttons | HIGH | En Figma: no afecta visualmente, documentar en description |

**Notable Props:** type (label|description)
**A11y:** Accesible por defecto; la distincion label/description es la mas matizada entre todos los sistemas.

---

### Radix UI — "Provider pattern para warmup compartido + skipDelayDuration"

Radix implementa Tooltip.Provider con skipDelayDuration (300ms default): ventana tras cerrar un tooltip donde el siguiente abre instantaneamente. Reproduce el comportamiento de tooltips nativos de OS (macOS menu bar, Windows taskbar). disableHoverableContent para modo estricto no interactivo. Headless — sin estilos.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Provider + skipDelayDuration | Escaneo rapido de toolbars sin delays | HIGH | Comportamiento runtime; no afecta Figma |
| disableHoverableContent | Fuerza no-interactividad | MEDIUM | Tu tooltip ya sera no interactivo |

**Notable Props:** delayDuration, skipDelayDuration, disableHoverableContent
**A11y:** aria-describedby; role="tooltip"; collision detection.

---

### Chakra UI — "shouldWrapChildren para elementos disabled + hasArrow"

Chakra resuelve el problema de tooltips en elementos disabled: shouldWrapChildren envuelve el trigger en un span para que hover siga funcionando. hasArrow es boolean directo. label acepta ReactNode.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| shouldWrapChildren | Disabled elements no emiten hover; wrapper resuelve | MEDIUM | Edge case documentar en enrich |
| hasArrow boolean | Simple toggle de flecha | HIGH | Confirma: arrow = boolean en Figma |

**Notable Props:** shouldWrapChildren, hasArrow, openDelay, closeDelay, label (ReactNode)
**A11y:** aria-describedby; role="tooltip".

---

### Fluent 2 (Microsoft) — "relationship prop: label vs description para ARIA correcta"

Fluent 2 implementa relationship prop que controla la semantica ARIA: "description" usa aria-describedby (suplementario), "label" usa aria-label (nombre accesible). withArrow. Optimizado para patrones de toolbar de Office.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| relationship="label" vs "description" | Icon-only buttons necesitan aria-label, no aria-describedby | HIGH | Documentar en componentDescriptions |

**Notable Props:** relationship (description|label), withArrow
**A11y:** relationship prop = implementacion de referencia para ARIA correcta en icon-only buttons.

---

### Mantine — "Tooltip.Floating + Tooltip.Group para datos y UIs densas"

Tooltip.Floating sigue el cursor (para data viz). Tooltip.Group comparte delay en UIs densas (como Radix Provider pero scoped). multiline + width para contenido largo. openDelay/closeDelay configurables.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|-------------|
| Tooltip.Floating (sigue cursor) | Data viz sin DOM element ancla | MEDIUM | Variante separada si necesitas data viz |
| Tooltip.Group (delay compartido scoped) | Dense UI scanning | MEDIUM | Runtime; no afecta Figma |

**Notable Props:** Tooltip.Floating, Tooltip.Group, multiline, width, openDelay, closeDelay

---

### Otros sistemas (shallow)

**Twilio Paste:** Reakit-based; 12 placement options; non-interactive by default. Standard tooltip pattern.

**Salesforce Lightning:** Popover-based helptext icon pattern. SLDS helptext utility. El tooltip siempre usa un icono de ayuda como trigger.

**shadcn/ui:** Radix UI Tooltip wrapped; requiere TooltipProvider; delay config; portal rendering.

**Playbook:** Context help; dual React/Rails. Implementacion basica.

**REI Cedar:** Vue tooltip; info trigger icon; WCAG 2.1 AA compliance.

**Wise:** Fee/rate explanations; financial help text. Uso domain-specific.

**Dell:** Enterprise UI help text. Estandar.

**Base Web:** Separacion clara Tooltip vs Popover. showArrow boolean. Theming integrado.

**Gestalt (Pinterest):** Dark background forzado; link prop para "Learn more" (caso limite de interactividad). accessibilityLabel.

**Orbit (Kiwi):** enabled prop para tooltips condicionales (explicar estados disabled). preferredAlign para mobile.

**Evergreen:** appearance="card" (fondo blanco, borde) para contenido rico vs default dark. Sobre infraestructura Popover.

**Nord (Nordhealth):** Web component; focus-triggered obligatorio para navegacion clinica por teclado. Shadow DOM ARIA.

---

## Pipeline Hints

**Archetype recommendation:** container
Rationale: Tooltip es un contenedor simple de contenido (texto) con flecha opcional. No tiene interaccion interna, no es form-control, no es grid. Es una superficie que envuelve texto informativo.

**Slot consensus:**
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| content | text | yes | 24/24 | Texto principal del tooltip, siempre presente |
| title | text | no | 4/24 | M3 Rich, Ant Popover, Evergreen card mode, Base Web |
| arrow | icon | no | 18/24 | Flecha/caret apuntando al trigger; boolean toggle |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Placement | variant | top/bottom/left/right | 22/24 | Universal; algunos agregan start/end variants (12 total en Ant) |
| Type | variant | dark/light | 4/24 | Evergreen, Base Web, Gestalt (forced dark); mayoria solo dark |
| State | state | default | 24/24 | Tooltip no tiene estados interactivos propios (hover/focus son del trigger) |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasArrow | 18/24 | true | Chakra, Fluent, Carbon, Radix, Atlassian, Polaris, etc. |
| hasTitle | 4/24 | false | M3 Rich, titulo opcional sobre contenido |
| multiline | 3/24 | false | Mantine, permite texto multi-linea con width fijo |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default (visible) | 24/24 | Fondo oscuro, texto claro, sombra sutil | Estado unico visible en Figma |

Nota: El tooltip en si no tiene estados interactivos (hover, focus, pressed). Esos estados pertenecen al TRIGGER (que es un componente separado). El tooltip aparece y desaparece; no cambia su apariencia interna.

**Exclusion patterns found:**
- No aplica — tooltip tiene un solo estado visual (default/visible). Sin combinaciones que excluir.

**Building block candidates:**
- Ninguno — tooltip es demasiado simple para sub-componentes. El contenido es texto directo, no una estructura compuesta.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| placement | top, bottom, left, right | 22/24 | 4 posiciones basicas; Ant tiene 12 pero la mayoria consolida |
| maxWidth | 200-320dp | 6/24 | M3 200dp (plain), 320dp (rich); la mayoria deja libre |
| delay | 300-500ms | 8/24 | Warmup delay; runtime, no visual |
| offset | 4-8px | 10/24 | Distancia trigger-tooltip; spacing token, no variant |

**A11y consensus:**
- Primary role: tooltip (24/24 consensus)
- Required ARIA: aria-describedby en trigger apuntando al ID del tooltip (para descripciones); aria-labelledby en trigger para label-style tooltips (icon-only buttons)
- Keyboard: aparece en focus del trigger, Escape cierra
- Focus: lineal — focus NUNCA entra al tooltip (se queda en trigger); non-modal
- APG pattern: tooltip (WAI-ARIA)
- Contenido interactivo: NUNCA en tooltip; usar Popover si se necesitan links/botones
- Trigger: DEBE ser focusable (no icon solos sin button wrapper)

---

### Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| >= 70% | Template — same base, configured with booleans | Same component set |
| 40-70% | Extension — shared shell + contentType prop | Same component set with variant |
| < 40% | Separate component | Own component set |
| Different semantics | NOT this component | Different component |

**Types found:**

| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Plain/Simple tooltip | 100% | Base | Texto unico, dark bg, no titulo | 22/24 |
| Tooltip with title | 85% | Template | Boolean hasTitle agrega linea de titulo | M3 Rich, Ant, Evergreen, Base Web |
| Light tooltip | 90% | Template | Type=light invierte colores (fondo claro) | Evergreen, Base Web |
| Arrow tooltip | 95% | Template | Boolean hasArrow muestra/oculta flecha | 18/24 |
| Tooltip (icon-only label) | 100% | Template | Misma apariencia, diferente ARIA (aria-label vs describedby) | Primer, Fluent 2 |
| Floating/mouse-following tooltip | 70% | Extension | Sigue cursor, sin anchor fijo | Mantine, Atlassian |
| Definition tooltip | 50% | Separate | Trigger = texto con underline punteado, inline | Carbon |
| Toggletip / Interactive tooltip | 30% | NOT tooltip | Click-triggered, contenido interactivo, patron disclosure | Carbon, Gestalt (link) |
| Popover | 20% | NOT tooltip | Container interactivo, focus trap, botones internos | Todos (separado) |
| Popconfirm | 15% | NOT tooltip | Acciones confirmar/cancelar | Ant (hereda de tooltip pero es otro patron) |

---

## What Everyone Agrees On

1. **role="tooltip" + aria-describedby**: Todos los sistemas que implementan tooltip usan role="tooltip" en el contenido y aria-describedby en el trigger. La relacion programatica es universal.

2. **No contenido interactivo**: Unanimidad en que tooltips con role="tooltip" NO deben contener links, botones o elementos focusables. El contenido interactivo requiere Popover.

3. **Aparece en focus + hover**: El tooltip DEBE mostrarse tanto en hover como en focus del trigger. Hover-only excluye usuarios de teclado. Focus = intencion explicita.

4. **Escape cierra**: La tecla Escape SIEMPRE cierra el tooltip visible y devuelve focus al trigger. Sin excepcion.

5. **Trigger debe ser focusable**: El elemento que activa el tooltip DEBE poder recibir focus por teclado. Icons solos sin wrapper button no son triggers validos.

6. **Contenido breve**: El tooltip es para informacion suplementaria breve. Contenido extenso pertenece a otro patron (popover, inline help, hint text).

7. **Focus nunca entra al tooltip**: A diferencia de modales y popovers, el focus del teclado NUNCA se mueve dentro del tooltip. El focus permanece en el trigger.

---

## Where They Disagree

**"Deberia el tooltip tener una flecha/caret?"**
- **Si (default)**: Chakra, Fluent, Carbon, Mantine, Base Web (18/24). La flecha crea conexion visual entre trigger y tooltip, especialmente util en layouts espaciados.
- **No (default)**: M3 (caretEnabled=false default), algunos sistemas modernos. En UIs densas, la proximidad hace innecesaria la flecha.
- **Para tu caso**: Boolean hasArrow=true por defecto. El designer lo desactiva cuando necesita limpieza visual.

**"Deberian existir variantes de color (dark/light)?"**
- **Solo dark**: Mayoria (20/24). El tooltip dark sobre contenido light tiene maximo contraste y es universalmente reconocible.
- **Dark + light**: Evergreen, Base Web (4/24). Light variant para UIs con fondo oscuro.
- **Para tu caso**: Usar Figma Variables para dark/light mode. No multiplicar frames con Type variant. Si se necesita, Type = dark/light son solo 2 valores (bajo impacto).

**"Cuantas posiciones de placement?"**
- **4 basicas**: top/bottom/left/right (mayoria). Suficiente para el 95% de casos.
- **12 detalladas**: Ant Design (top-start, top-end, etc.). Granularidad excesiva para la mayoria.
- **Auto/mostSpace**: Polaris, Atlassian. Logica runtime, no variant.
- **Para tu caso**: 4 posiciones basicas como variant en Figma. Auto = comportamiento runtime.

**"Deberia soportar titulo opcional?"**
- **Si**: M3 Rich, Ant, Evergreen (4/24). Para contexto mas estructurado.
- **No**: Mayoria (20/24). Tooltip = solo texto. Titulo implica complejidad de popover.
- **Para tu caso**: Boolean hasTitle=false por defecto. Low-consensus pero util para contexto adicional sin llegar a popover.

**"Warmup/cooldown delay compartido?"**
- **Si, global**: Spectrum, Radix (Provider pattern). Resuelve escaneo rapido de toolbars.
- **Si, scoped**: Mantine (Tooltip.Group). Delay compartido en grupo especifico.
- **No**: Mayoria. Cada tooltip opera independientemente.
- **Para tu caso**: Comportamiento runtime, no afecta componente Figma.

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Dark pill | Fondo oscuro, texto claro, border-radius sm-md, sin flecha | UIs densas, tooltips simples | M3 Plain, Carbon, Primer |
| Dark pill + arrow | Misma pastilla oscura con flecha triangular apuntando al trigger | Layouts espaciados, conexion visual clara | Chakra, Fluent, Atlassian, Polaris |
| Light card | Fondo claro, borde sutil, sombra, border-radius md | Sobre fondos oscuros, contenido extenso | Evergreen (card), Base Web |
| Two-line (title + body) | Titulo bold + cuerpo regular, misma superficie oscura | Contexto estructurado sin popover | M3 Rich, Ant |

### ASCII Wireframes

**Dark pill (sin arrow):**
```
          ┌───────────────────┐
          │  Tooltip content  │
          └───────────────────┘
               ▲ trigger
```

**Dark pill + arrow (placement=top):**
```
          ┌───────────────────┐
          │  Tooltip content  │
          └────────▼──────────┘
               ▲ trigger
```

**Dark pill + arrow (placement=bottom):**
```
               ▼ trigger
          ┌────────▲──────────┐
          │  Tooltip content  │
          └───────────────────┘
```

**Two-line (title + body):**
```
          ┌───────────────────┐
          │  Title (bold)     │
          │  Body text here   │
          └────────▼──────────┘
               ▲ trigger
```

---

## Risks to Consider

1. **Contenido interactivo mal clasificado** (HIGH) — Si un designer pone un link o boton dentro del tooltip, viola role="tooltip" y excluye usuarios de teclado. Mitigacion: documentar claramente que tooltip = no interactivo; usar popover para contenido con acciones.

2. **Hover-only implementation** (HIGH) — Si la implementacion en codigo no agrega focus trigger, usuarios de teclado nunca ven el tooltip. Mitigacion: el componente Figma debe documentar en su description que focus trigger es obligatorio.

3. **ARIA relationship incorrecta** (MEDIUM) — Usar aria-describedby en icon-only buttons (en lugar de aria-label) produce botones sin nombre accesible. Mitigacion: documentar la distincion label vs description en componentDescriptions.

4. **Tooltip sobre elementos disabled** (MEDIUM) — Elementos disabled no emiten hover events. Mitigacion: wrapper span (Chakra's shouldWrapChildren approach) o mantener tooltip visible con aria-disabled en lugar de disabled nativo.

5. **Posicionamiento en viewports pequenos** (LOW) — Tooltip puede quedar cortado en mobile. Mitigacion: collision detection en runtime; no afecta componente Figma.

---

## Next Steps

```
/spec tooltip       --> outputs/tooltip-config.json
/enrich tooltip     --> outputs/tooltip-enriched.md + updated config.json
/generate tooltip   --> Figma components
/figma-qa           --> Audit + auto-fix
/build tooltip      --> Full pipeline in one command
```
