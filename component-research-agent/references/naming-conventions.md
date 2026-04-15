# Component Property Naming Conventions
_Design System Agent · references/naming-conventions.md_

Normaliza el naming de propiedades de componentes UI para producir
outputs consistentes independientemente del sistema de referencia.
Agnóstico al DS — cualquier equipo puede adoptarlo.

## Section Index

| § | Section | Lines |
|---|---------|-------|
| 1 | Regla de oro — 3 preguntas | 30–40 |
| 2 | Los 9 ejes estándar | 43–89 |
| 3 | Tabla de traducción | 91–117 |
| 4 | Mapeo completo — 69 componentes | 121–680 |
| 4a | → Inputs y formularios | 130–317 |
| 4b | → Acciones | 320–360 |
| 4c | → Feedback y estado | 363–438 |
| 4d | → Contenedores y overlays | 441–517 |
| 4e | → Navegación | 519–562 |
| 4f | → Datos y contenido | 564–607 |
| 4g | → Fundacionales | 610–642 |
| 4h | → Overlays avanzados | 645–671 |
| 4i | → Mobile-first | 674–679 |
| 5 | Reglas de aplicación | 682–693 |
| 6 | Cuándo NO aplica | 696–703 |

---

## Regla de oro — 3 preguntas en secuencia

```
1. ¿Cambia los slots o la API?       → Componente separado (no es una prop)
2. ¿Cambia la función o el modo?     → type
3. ¿Cambia solo el aspecto visual?   → variant
```

Si un componente necesita `type` Y `variant` simultáneamente
→ probablemente son dos componentes distintos.

---

## Los 9 ejes estándar

| Prop       | Qué varía                    | Valores típicos                               | Multiplica frames |
|------------|------------------------------|-----------------------------------------------|:-----------------:|
| `size`     | Dimensión física             | sm · md · lg · xl                             | ✅ |
| `variant`  | Apariencia visual            | filled · outline · ghost · soft               | ✅ |
| `type`     | Modo funcional               | single · multiple · range · combobox          | ✅ |
| `shape`    | Forma geométrica             | circle · square · pill · rounded              | ✅ |
| `density`  | Densidad de información      | compact · default · loose                     | ✅ |
| `State`    | Interacción del usuario      | default · hover · focus · disabled · readonly | ✅ |
| `Status`   | Condición del sistema/datos  | none · error · warning · success · info       | ✅ |
| `Boolean`  | Visibilidad de slot opcional | true · false                                  | ❌ |
| `Overlay`  | Proceso en curso del sistema | true · false (loading spinner)                | ❌ |

### Cuándo usar State vs Status

**State** → lo dispara el **usuario** con mouse o teclado.
Mutuamente excluyente: no puedes estar en `hover` y `focus` al mismo tiempo.
```
default → hover → focus → active → disabled → readonly
```

**Status** → lo dispara el **sistema o los datos** (validación, API, lógica).
Ortogonal a State: un campo puede estar en `focus` Y en `error` simultáneamente
porque el usuario volvió al campo que ya tenía error.
```
none → error → warning → success → info
```

### Boolean vs Overlay

**Boolean** → muestra u oculta un slot del componente.
El componente no cambia su look fundamental — solo aparece o desaparece una parte.
```
label: true/false      → etiqueta encima del input
icon-left: true/false  → slot de ícono a la izquierda
clear: true/false      → botón de limpiar valor
footer: true/false     → barra de acciones
```

**Overlay** → el sistema coloca un spinner sobre el componente mientras procesa.
El componente base no cambia — el spinner es una capa encima.
```
loading: true/false
```

---

## Tabla de traducción

Cuando el research agent encuentre estos nombres en los snapshots,
mapearlos al nombre estándar antes de incluirlos en el output:

| Nombre encontrado           | Sistema(s)             | Mapear a                       |
|-----------------------------|------------------------|--------------------------------|
| `kind`                      | Carbon (IBM)           | `variant`                      |
| `appearance`                | Polaris, Atlassian     | `variant`                      |
| `intent`                    | Blueprint, Primer      | `variant`                      |
| `level`                     | algunos DS             | `variant`                      |
| `look`                      | algunos DS             | `variant`                      |
| `emphasis`                  | algunos DS             | `variant`                      |
| `color` (como apariencia)   | Material, MUI          | `variant`                      |
| `mode`                      | varios                 | `type`                         |
| `behavior`                  | varios                 | `type`                         |
| `format`                    | varios                 | `type`                         |
| `style` (como forma)        | varios                 | `shape`                        |
| `isDisabled`                | Spectrum, React Aria   | `disabled` → dentro de `State` |
| `isReadOnly`                | Spectrum, React Aria   | `readonly` → dentro de `State` |
| `isInvalid`                 | Spectrum               | `Status = error`               |
| `validationState`           | Spectrum v1            | `Status`                       |
| `invalid` + `invalidText`   | Carbon                 | `Status = error`               |
| `warn` + `warnText`         | Carbon                 | `Status = warning`             |
| `status` (string)           | Ant Design             | `Status`                       |
| `tone`                      | Polaris v12            | `variant` o `Status` según contexto |
| `type` (visual)             | algunos DS             | `variant` si solo cambia apariencia |

---

## Mapeo completo — 69 componentes

Formato: `componente → eje → valores`

Los valores van de menor énfasis/complejidad a mayor.
Los Boolean no se listan todos — solo los más representativos.

---

### Inputs y formularios

**textfield**
```
size:    sm · md · lg
variant: outlined · filled · borderless
State:   default · hover · focus · disabled · readonly
Status:  none · error · warning · success
Boolean: label · prefix-icon · suffix-icon · clear · helper-text
```

**select**
```
size:    sm · md · lg
type:    single · multiple · combobox
variant: outlined · filled · borderless
State:   default · hover · focus · disabled · readonly · open
Status:  none · error · warning
Boolean: label · clear · searchable · tags
```

**checkbox**
```
size:    sm · md · lg
type:    single · group
State:   default · hover · focus · disabled
Status:  none · error
Boolean: indeterminate · label
```

**radio**
```
size:    sm · md · lg
type:    single · group
State:   default · hover · focus · disabled
Status:  none · error
Boolean: label
```

**switch**
```
size:    sm · md · lg
State:   default · hover · focus · disabled
Boolean: label
Overlay: loading
```

**slider**
```
size:    sm · md · lg
type:    single · range
State:   default · hover · focus · disabled
Boolean: marks · tooltip · input
```

**number-input**
```
size:    sm · md · lg
State:   default · hover · focus · disabled · readonly
Status:  none · error · warning
Boolean: label · controls-visible
```

**search**
```
size:    sm · md · lg
State:   default · hover · focus · disabled
Boolean: clear · action-button
Overlay: loading
```

**file-upload**
```
type:    button · dropzone
State:   default · hover · focus · disabled · drag-over
Status:  none · error
Boolean: multiple · preview
```

**color-picker**
```
size:    sm · md · lg
type:    basic · advanced
State:   default · hover · focus · disabled · open
```

**inline-edit**
```
size:    sm · md · lg
State:   default · hover · editing · disabled · readonly
Status:  none · error
```

**textarea**
```
size:    sm · md · lg
variant: outlined · filled · borderless
State:   default · hover · focus · disabled · readonly
Status:  none · error · warning
Boolean: label · helper-text · character-count · auto-resize
```

**combobox**
```
size:    sm · md · lg
State:   default · hover · focus · disabled · readonly · open
Status:  none · error
Boolean: clear · multi
```

**rating**
```
size:    sm · md · lg
type:    input · display
Boolean: half-star · clear · custom-icon · count
State:   default · hover · focus · disabled · readonly
```

**pin-input**
```
size:    sm · md · lg
type:    numeric · alphanumeric
Boolean: mask · auto-submit
State:   default · focus · disabled · error
```

**transfer**
```
Boolean: search · select-all · pagination · custom-render
```

**form**
```
density: compact · default · loose
type:    vertical · horizontal · inline
```

**timepicker**
```
size:    sm · md · lg
type:    single · range
State:   default · hover · focus · disabled · readonly
Status:  none · error
```

**datepicker**
```
size:    sm · md · lg
State:   default · hover · focus · disabled · readonly
Status:  none · error
Boolean: label · clear
Overlay: loading
```

**calendar**
```
type:    single-month · dual-month
State:   default · disabled
Overlay: loading
```

**rangecalendar**
```
type:    single-month · dual-month · with-preview
State:   default · selecting · disabled
Overlay: loading
```

**daterangepicker**
```
size:    sm · md · lg
type:    base · with-presets · dual-calendar
State:   default · hover · focus · selecting · disabled · readonly
Status:  none · error
Boolean: footer
Overlay: loading
```

**date-range-picker**
```
size:    sm · md · lg
type:    single-input · dual-input · with-presets
State:   default · hover · focus · selecting · disabled · readonly
Status:  none · error
Boolean: label · clear · footer · preset-panel
Overlay: loading
```

---

### Acciones

**button**
```
size:    sm · md · lg · xl
variant: filled · outline · ghost · soft · link · danger
State:   default · hover · focus · active · disabled
Boolean: icon-left · icon-right · icon-only · full-width
Overlay: loading
```

**link**
```
variant: default · subtle · inverse
State:   default · hover · focus · active · visited · disabled
Boolean: external-icon
```

**menu**
```
size:    sm · md · lg
State:   default · open
Boolean: searchable · multi-select · dividers
```

**segmented-control**
```
size:    sm · md · lg
State:   default · disabled
Boolean: icon-only
```

**chip**
```
size:    sm · md · lg
type:    assist · filter · input · suggestion
variant: filled · outline
State:   default · hover · focus · selected · disabled
Boolean: icon · close · avatar
```

---

### Feedback y estado

**alert**
```
variant: filled · outline · soft
type:    info · success · warning · error
Boolean: icon · close · title · action-button
```

**toast**
```
variant: filled · soft
type:    info · success · warning · error
Boolean: icon · close · action-button
```

**badge**
```
size:    sm · md · lg
variant: filled · outline · soft · dot
type:    count · status · label
```

**progress**
```
size:    sm · md · lg
type:    bar · circle · steps
State:   default · success · error
Overlay: loading (el propio componente es un overlay)
```

**spinner**
```
size:    sm · md · lg · xl
variant: default · inherit-color
```

**skeleton**
```
type:    text · avatar · card · table · image · custom
Boolean: animated
```

**steps**
```
type:    horizontal · vertical
variant: default · simple · navigation · dot
Boolean: icon · description · clickable
```

**banner**
```
variant: filled · soft
type:    info · success · warning · error · announcement
Boolean: icon · close · action-button · sticky
```

**notification**
```
type:    info · success · warning · error
Boolean: icon · close · action-button · auto-dismiss
```

**timeline**
```
type:    vertical · horizontal · alternating
Boolean: icon · custom-dot · connector-line
State:   default · active · completed · pending
```

**stat**
```
size:    sm · md · lg
Boolean: trend · prefix · suffix · comparison · loading
```

---

### Contenedores y overlays

**modal**
```
size:    sm · md · lg · xl · fullscreen
Boolean: header · footer · close-button · close-on-overlay
```

**drawer**
```
size:    sm · md · lg · xl
type:    left · right · top · bottom
Boolean: header · footer · close-button
```

**popover**
```
type:    default · tooltip-style
Boolean: arrow · close-button
```

**tooltip**
```
type:    dark · light
Boolean: arrow
```

**bottom-sheet**
```
type:    standard · modal
Boolean: drag-handle · close-button · scrim
State:   default · expanded · collapsed · peek
```

**accordion**
```
variant: default · bordered · filled · ghost
Boolean: icon · multiple · arrow-position-end
State:   default · expanded · disabled
```

**empty-state**
```
type:    no-data · no-results · error · no-access
Boolean: image · action-button
```

**tag**
```
size:    sm · md · lg
variant: filled · outline · soft
Boolean: icon · close
State:   default · hover · disabled
```

**avatar**
```
size:    xs · sm · md · lg · xl
shape:   circle · square
type:    image · initials · icon
Boolean: badge · status-dot
```

**avatar-group**
```
size:    xs · sm · md · lg · xl
Boolean: overflow-indicator
```

**divider**
```
type:    horizontal · vertical
variant: solid · dashed · dotted
Boolean: label
```

---

### Navegación

**tabs**
```
variant: line · card · pills · underline
size:    sm · md · lg
Boolean: icon · closable · add-button
```

**navbar**
```
type:    default · prominent · dense
Boolean: logo · search · avatar · actions · hamburger-menu
State:   default · elevated · hidden
```

**sidebar**
```
type:    persistent · collapsible · modal
variant: full · rail · mini
State:   default · collapsed · expanded
Boolean: header · footer · search · nested-items
```

**bottom-nav**
```
Boolean: icon · label · badge
State:   default · active
```

**breadcrumb**
```
Boolean: icon · custom-separator
```

**pagination**
```
size:    sm · md · lg
Boolean: quick-jumper · size-changer · simple-mode
```

**drawer** (ver Contenedores)

---

### Datos y contenido

**table**
```
density: compact · default · loose
Boolean: bordered · striped · sticky-header · expandable · selection
```

**data-grid**
```
density: compact · default · loose
Boolean: sortable · filterable · resizable · row-selection · inline-edit · virtual-scroll · sticky-header · pagination
```

**list**
```
type:    display · action · selectable · resource
density: compact · default · loose
Boolean: dividers · leading-visual · trailing-action · drag-reorder
```

**tree-view**
```
type:    navigation · selection · checkbox
Boolean: drag-reorder · async-load · icons · multi-select
State:   default · expanded · selected · disabled
```

**description-list**
```
type:    vertical · horizontal · grid
Boolean: bordered · colon · action-slot
```

**card**
```
variant: default · bordered · shadow · flat
Boolean: header · footer · cover-image · actions · hoverable
```

**tooltip** (ver Contenedores)

**popover** (ver Contenedores)

---

### Fundacionales

**typography**
```
type:    display · heading · title · body · label · caption · code
size:    xs · sm · md · lg · xl · 2xl
Boolean: truncate · monospace
```

**icon**
```
size:    xs · sm · md · lg · xl
type:    decorative · informative
Boolean: animated
```

**stack**
```
type:    vertical · horizontal
Boolean: dividers · wrap
```

**grid**
```
type:    fixed-columns · auto-fit · auto-fill
```

**container**
```
size:    sm · md · lg · xl · full
Boolean: fluid
```

---

### Overlays avanzados

**command-palette**
```
Boolean: search · recent-items · grouped · shortcuts
State:   default · open · loading
```

**carousel**
```
type:    slide · fade
Boolean: auto-play · arrows · dots · loop · multiple-slides
State:   default · dragging
```

**code-block**
```
type:    inline · single-line · multi-line
Boolean: line-numbers · copy-button · line-highlight · tabs
```

**image**
```
shape:   default · rounded · circle
Boolean: preview · fallback · lazy-load · caption
```

---

### Mobile-first

**bottom-sheet** (ver Contenedores)

**bottom-nav** (ver Navegación)

---

## Reglas de aplicación en el research agent

Cuando el agente genera el output de `/research` o `/matrix`,
aplicar estas reglas antes de escribir las propiedades:

1. **Traducir** nombres según la tabla de traducción arriba
2. **Clasificar** cada prop según los 9 ejes estándar
3. **Verificar** usando las 3 preguntas de la regla de oro
4. **Reportar divergencias** cuando un sistema usa un eje diferente al estándar
   — ej: "Carbon usa `kind` para lo que este estándar llama `variant`"
5. **No inventar** valores que no aparezcan en al menos 2 sistemas de referencia

---

## Cuándo este mapeo NO aplica

- Componentes muy específicos del dominio (ej: un DatePicker con lógica fiscal)
  → documentar como custom, no forzar al estándar
- Props que no tienen equivalente en ningún sistema de referencia
  → mantener el nombre original y marcar como `[custom]`
- Cuando el sistema objetivo tiene una convención ya establecida diferente
  → mantener la convención existente, documentar el delta
