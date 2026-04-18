# Calendar

## Overview

Calendar es un widget standalone de selección y visualización de fechas organizado como una cuadrícula de días agrupados en semanas. Se comporta como un primitivo de fecha de primera clase — puede usarse directamente en dashboards de programación (leave management, disponibilidad, scheduling) o componerse dentro de un DatePicker con input trigger. El componente admite selección single o range, tres escalas de presentación (compact para sidebars, comfortable para popovers, fullscreen para páginas dedicadas), y un slot de decorator por celda para mostrar información adicional como eventos, precios o conteos.

```
Vista single-month, comfortable, mode=single:

┌──────────────────────────────────────┐
│  ←  │        Abril 2026       │  →   │  ← header (nav + month-year label)
├─────┴─────────────────────────┴──────┤
│  Lu  │ Ma  │ Mi  │ Ju  │ Vi │ Sa │ Do│  ← weekdayRow
├──────┼─────┼─────┼─────┼────┼────┼──┤
│   30 │  31 │   1 │   2 │  3 │  4 │  5│  ← daysGrid (6 filas × 7 cols)
│    6 │   7 │   8 │   9 │ 10 │ 11 │ 12│
│   13 │  14 │   15│  16 │ 17 │ 18 │ 19│  ← "17" = today (borde azul)
│   20 │  21 │  [22]│ 23 │ 24 │ 25 │ 26│  ← "[22]" = selected (fondo azul)
│   27 │  28 │  29 │  30 │    │    │   │
└──────────────────────────────────────┘
│         [Hoy] [Limpiar]              │  ← footer (opcional)
└──────────────────────────────────────┘

Vista range (2 meses visibles):

┌──────────────────┬───────────────────┐
│  ←  Abril 2026  │    Mayo 2026  →   │
├────┬────┬────┬──┴┬───┬───┬──────────┤
│ Lu │ Ma │...    │ Lu │ Ma │...      │
├────┼────┼────┼───┼───┼───┼──────────┤
│    │  1 │ ●2 │███│███│███│ ██8│     │
│    │    │start│   range   │ end│     │
└────────────────────────────────────────┘
  ●=range-start, ███=range-middle, ██=range-end

DayCell states:
  ○ default     — número neutro
  ◎ today       — borde azul, peso 600
  ● selected    — fondo azul sólido, texto blanco
  ◐ range-start — fondo azul, radius derecho=0
  ◑ range-end   — fondo azul, radius izquierdo=0
  ▬ range-middle— fondo azul suave, sin radius
  ◌ hover       — fondo brand/subtle
  ◉ focused     — focus ring
  ╌ disabled    — gris, line-through
  · other-month — gris claro
```

El Calendar standalone no incluye input de texto. Para formularios con texto de fecha, usar DatePicker (Calendar + input trigger). Para rangos con presets y dos inputs, usar DateRangePicker.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
DayCell:
  State:  default | hover | selected | today | focused | disabled
          other-month | range-start | range-end | range-middle
  Size:   sm | md

Calendar:
  Mode:            single | range
  Scale:           compact | comfortable | fullscreen
  VisibleMonths:   1 | 2
  ShowWeekNumbers: no | yes
```

Toggles (show/hide parts — do NOT generate extra variants):

```
DayCell:
  👁 Show Decorator    → decorator layer (dot, count, price, custom)

Calendar:
  (sin booleans — el footer se muestra según Scale)
```

### Figma properties panel

```
╔══════════════════════════════════════╗
║  DayCell                             ║
╠══════════════════════════════════════╣
║  State        [default ▾]            ║
║  Size         [md ▾]                 ║
╠══════════════════════════════════════╣
║  👁 Show Decorator     [ ]           ║
║  🔄 Decorator          [indicator/dot]║
║  ✏️ Day                [15]          ║
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  Calendar                            ║
╠══════════════════════════════════════╣
║  Mode            [single ▾]          ║
║  Scale           [comfortable ▾]     ║
║  VisibleMonths   [1 ▾]               ║
║  ShowWeekNumbers [no ▾]              ║
╚══════════════════════════════════════╝
```

**Sub-component: DayCell**

```
╔══════════════════════════════════════╗
║  DayCell — 20 frames                 ║
║  State(10) × Size(2) = 20            ║
╚══════════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿Necesitas selección o visualización de fechas?
│
├── ¿Es un formulario con input de texto de fecha?
│   └── NO usar Calendar → usar DatePicker (Calendar + input trigger)
│
├── ¿Es selección de rango con presets ("Últimos 7 días")?
│   └── NO usar Calendar → usar DateRangePicker
│
├── ¿Es un dashboard de eventos, scheduling, o disponibilidad?
│   └── SÍ → Calendar Scale=fullscreen (Ant fullscreen pattern)
│
├── ¿Es un widget de sidebar o panel lateral?
│   └── SÍ → Calendar Scale=compact (280px)
│
├── ¿Es un popover desde un input de fecha?
│   └── SÍ → Calendar Scale=comfortable (320px), componer en Popover
│
└── ¿Necesitas seleccionar un rango de fechas?
    └── SÍ → Calendar Mode=range, VisibleMonths=2
```

**Use Calendar when:**
- Necesitas un widget de fecha standalone que no está atado a un input de texto
- El contexto es un dashboard de scheduling, leave management, o disponibilidad de recursos
- Quieres mostrar información adicional por celda (eventos, precios, disponibilidad) via decorator slot
- El componente se compone programáticamente dentro de un DatePicker propio
- El usuario necesita ver 2 meses simultáneamente para selección de rango

**Do NOT use Calendar when:**
- El usuario debe poder ingresar la fecha también por teclado como texto — usar DatePicker con input
- El rango necesita presets configurables ("Esta semana", "Este mes") — usar DateRangePicker
- La selección de fecha es dentro de un formulario estándar donde el texto es la entrada primaria
- El contexto es un scheduling calendar completo con vistas de semana/día y drag-and-drop de eventos — ese es un producto diferente (Lightning Calendar tier)

---

## Visual variations

### DayCell — 10 estados

**default**: Número de día con texto `text/primary` (#121213), fondo transparente, tamaño sm=32px/md=40px, radius: pill.

**hover**: Fondo `brand/subtle` (rgba(0.93, 0.95, 1.0)) — señal de interactividad. El texto permanece oscuro.

**selected**: Fondo `interactive/default` (azul sólido #2659EB), texto blanco (`text/inverse`), peso 600. Radius completo (pill).

**today**: Sin fondo de relleno. Texto `interactive/default` azul, peso 600. Border de 1px `interactive/default`. No reemplaza al selected — pueden coexistir (today + selected es la fecha de hoy ya seleccionada).

**focused**: Focus ring de 2px `focus/ring` alrededor de la celda. Sin cambio de fondo. Solo por navegación de teclado.

**disabled**: Texto `text/disabled` (gris claro), decoración `line-through`. No responde a clicks. `aria-disabled="true"`.

**other-month**: Texto `text/subtlest` — días del mes anterior/siguiente que aparecen en la cuadrícula para completar las filas. Son clickeables (navegan al mes correspondiente).

**range-start**: Fondo `interactive/default` azul, texto blanco, peso 600. Border radius solo en el lado izquierdo (radio derecho = 0) para que la franja de rango fluya hacia la derecha.

**range-end**: Fondo `interactive/default` azul, texto blanco, peso 600. Border radius solo en el lado derecho (radio izquierdo = 0) para que la franja de rango fluya hacia la izquierda.

**range-middle**: Fondo `brand/subtle` claro, texto `text/primary` oscuro, sin border radius — efecto de franja continua entre start y end.

### Calendar — Escalas

**compact (280px)**: Para sidebars y widgets pequeños. Font del header 14px, iconos de navegación 16px, padding 12px.

**comfortable (320px)**: Default para popovers de DatePicker. Font del header 16px, iconos 20px, padding 16px.

**fullscreen (100% ancho)**: Para páginas dedicadas de scheduling. Font del header 20px, iconos 24px, padding 24px. Solo VisibleMonths=1 (la exclusión `Scale=fullscreen + VisibleMonths=2` aplica).

### ShowWeekNumbers

Cuando está activo, aparece una columna adicional a la izquierda con los números de semana ISO (Semana 14, Semana 15...). El header de esa columna muestra "Sem" o similar. La columna usa `text/secondary` para diferenciarse de los números de día.

---

## Design decisions

### 1. Calendar standalone como primitivo (no embebido en DatePicker)

**Why:** Spectrum, Atlassian y Ant Design establecen este patrón: Calendar es un componente de primera clase, y DatePicker lo compone internamente, no al revés. En dashboards de scheduling (Zoom scheduling, leave management, disponibilidad), se necesitan calendarios en panels sin input triggers. La separación permite composición en ambos contextos.

**Tradeoff:** Requiere un componente DatePicker separado que componga Calendar + Popover + Input. Más componentes en el sistema, pero cada uno con responsabilidad clara.

### 2. 10 estados en DayCell incluyendo range-start/end/middle

**Why:** La selección de rango requiere continuidad visual: start/end con radius parcial para que "fluyan" hacia el middle, y middle con background suave sin radius para crear el efecto de franja continua. Modelar estos como states explícitos en Figma permite generar todos los frames sin decorators condicionales en runtime.

**Tradeoff:** 20 frames para DayCell (10 states × 2 sizes) — más frames que la mayoría de primitivos. Sin embargo, la granularidad es necesaria para diseñar correctamente las transiciones de estado y para documentar exactamente cómo se ve cada combinación.

### 3. Scale: compact / comfortable / fullscreen (patrón Ant fullscreen)

**Why:** Tres contextos de uso con requerimientos de presentación radicalmente distintos: sidebar widget (280px), popover de formulario (320px), y página dedicada de scheduling (100% ancho). Una property `size` numérica no captura la semántica contextual de cada escala.

**Tradeoff:** `Scale=fullscreen` excluye `VisibleMonths=2` (no tiene sentido un calendar de ancho total con dos meses side-by-side — la cuadrícula sería gigante). Esta exclusión reduce el total de frames pero debe ser documentada claramente.

### 4. VisibleMonths=1 o 2 (patrón Spectrum/Polaris)

**Why:** La selección de rango con dos meses side-by-side es el patrón canónico (Spectrum, M3, Polaris). Permite al usuario ver el start y el end del rango sin navegar. VisibleMonths=1 es suficiente para selección de fecha single en un popover.

**Tradeoff:** `VisibleMonths=2` aumenta significativamente el ancho del componente — requiere suficiente espacio (640px+ para comfortable). La exclusión `Scale=compact + VisibleMonths=2` previene que esto se use en sidebars donde no cabe.

### 5. Decorator slot opcional por celda (patrón Ant dateCellRender)

**Why:** Calendarios enterprise muestran event count, precios, status dots en celdas. Un slot con instance-swap permite custom content sin hardcodear un pattern específico — el decorator puede ser un dot, un número, un precio, o cualquier indicador del sistema.

**Tradeoff:** El decorator agrega altura a las celdas cuando está visible, lo que puede afectar el layout del fullscreen calendar. El diseño debe anticipar la altura adicional en las especificaciones de spacing.

### 6. ShowWeekNumbers como property (patrón Ant showWeek)

**Why:** Calendarios ISO para fiscal reporting y agenda laboral necesitan week numbers. En Europa y contextos enterprise, "Semana 14" es una referencia idiomática. Ant lo soporta vía `showWeek`. Spectrum no lo tiene. Es opt-in (default=no) para no aumentar la complejidad visual por defecto.

**Tradeoff:** Añade una columna más al grid, reduciendo el espacio disponible para cada celda. En compact scale puede hacer las celdas demasiado pequeñas — validar con diseño específico.

### Excluded combinations

```
Scale=fullscreen + VisibleMonths=2
→ Un calendario full-page con dos meses es innecesariamente grande;
  fullscreen es para ver un mes con celdas grandes y datos ricos

Scale=compact + VisibleMonths=2
→ 280px no es suficiente para dos meses side-by-side;
  dos meses require al menos 600px de ancho disponible

State=other-month + State=selected|range-*
→ Los días de otros meses no son seleccionables en el mes actual;
  click en un other-month day navega a ese mes (cambia el estado del Calendar)

State=disabled + State=selected|range-*
→ Las fechas disabled no pueden ser seleccionadas;
  si una fecha está disabled, no puede aparecer en range-start/end/middle
```

---

## Behavior

### Essential for design

**Roving tabindex**: Solo una celda del grid tiene `tabindex=0` en cada momento (la celda "activa"). Todas las demás tienen `tabindex=-1`. Las Arrow keys mueven el focus dentro del grid actualizando el tabindex. NO usar Tab para navegar entre celdas — Tab se usa para moverse entre secciones (header, grid, footer).

**Anuncio de cambio de mes**: Cuando el usuario hace click en los botones de navegación (← →), el heading del mes/año tiene `aria-live="polite"` para que el screen reader anuncie el cambio. Sin esto, los usuarios de SR navegan "a ciegas".

**Range selection en-progreso**: Durante la selección de rango, cuando el usuario ha seleccionado el start date y está hovering para ver el preview del end, el rango se muestra visualmente (range-middle highlight). Al hacer click se fija el end date.

**minDate/maxDate**: Restringen tanto la selección como la navegación — el usuario no puede navegar a meses donde todas las fechas están fuera del rango permitido (patrón Atlassian, más UX friendly que solo restringir selección).

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Calendar container | `grid` | `aria-label="Calendario, [Mes Año]"` | Define la región semántica del grid de fechas |
| Fila de semana | `row` | — | Estructura de tabla para navegación SR |
| Celda de día | `gridcell` | `aria-label="[día mes año, día de semana]"`, `aria-selected="true"` (selected), `aria-current="date"` (today), `aria-disabled="true"` (disabled) | Label completo permite SR leer la fecha sin ambigüedad |
| Heading mes/año | `heading` | `aria-live="polite"` | Anuncia cambios de mes sin interrumpir al usuario |
| Botón prev mes | `button` | `aria-label="Mes anterior"` | Nav button sin texto visible |
| Botón next mes | `button` | `aria-label="Mes siguiente"` | Nav button sin texto visible |
| Número de semana | presentacional | `aria-hidden="true"` | Decorativo — el número ISO no agrega valor semántico a la selección |
| Decorator | presentacional | `aria-hidden="true"` (decorativo) o descripción en `aria-label` del gridcell | Depende de si el decorator tiene valor funcional |

### Keyboard navigation

Primary interactions (affect design):

```
Tecla               | Acción                                | Focus target
─────────────────── | ───────────────────────────────────── | ──────────────────────
Arrow Left/Right    | Día anterior/siguiente                | DayCell correspondiente
Arrow Up/Down       | Semana anterior/siguiente             | DayCell correspondiente
Page Up             | Mes anterior                          | Misma posición en el mes anterior
Page Down           | Mes siguiente                         | Misma posición en el mes siguiente
Shift+Page Up       | Año anterior                          | Misma posición en el año anterior
Shift+Page Down     | Año siguiente                         | Misma posición en el año siguiente
Home                | Primer día de la semana actual        | Primera celda de la fila
End                 | Último día de la semana actual        | Última celda de la fila
Enter / Space       | Selecciona la fecha focuseada         | DayCell (permanece)
Escape              | Cierra el calendario (si en popover)  | Input trigger que lo abrió
Tab                 | Mueve entre header, grid, footer      | Siguiente sección
```

Secondary interactions (dev reference):

```
RTL automático: en idiomas RTL (árabe, hebreo), Arrow Left → día siguiente,
Arrow Right → día anterior (las direcciones se invierten)
Click en other-month: navega al mes del día clicado
```

**Focus management:**
- El roving tabindex mantiene solo una celda focusable en el grid
- Al cargar/abrir, focus va a la celda con la fecha seleccionada o, si no hay selección, a la fecha de hoy o al primer día del mes
- En modo range, después de seleccionar el start date, el focus permanece activo para que el usuario navegue al end date

---

## Content guide

### header (nav de meses)
El label del mes/año debe mostrar siempre el nombre completo del mes más el año de 4 dígitos: "Abril 2026", no "Abr 26" ni "04/2026". Los botones de navegación solo tienen ícono (chevron) — su nombre accesible viene del `aria-label`.

### weekdayRow
Las cabeceras de días de la semana usan abreviaturas de 2 letras ("Lu", "Ma", "Mi") en compact/comfortable, y nombres cortos ("Lun", "Mar", "Mié") en fullscreen. El primer día de la semana debe ser configurable según la localización (domingo para US, lunes para España/EU).

### daysGrid — números de día
Solo el número. Sin unidades de medida ni texto adicional. El `aria-label` del gridcell sí incluye el contexto completo: "17 de abril de 2026, viernes".

### decorator slot
El decorator es información auxiliar — nunca debe ser el único portador de información crítica (evitar "solo los días con punto verde están disponibles" si el punto es lo único visible). El decorator debe complementar el estado del día, no reemplazarlo. Textos cortos: max 3 caracteres para precios ("$45"), 1-2 dígitos para counts ("3"), dot para presencia.

### footer
Botones de acción opcionales: "Hoy" regresa la vista al mes actual y selecciona hoy. "Limpiar" borra la selección. "Aplicar" confirma la selección (útil en DateRangePicker con popover que no se cierra automáticamente). Los labels deben ser reconocibles y cortos — no usar "Ir al día de hoy" cuando "Hoy" es suficiente.

---

## Pre-build checklist

```
DayCell
□ 20 frames generados: State(10) × Size(2)
□ sm=32px, md=40px cuadrado (misma altura y anchura)
□ radius: pill (9999) en default/hover/selected/today/focused
□ range-start: radius izquierdo completo, radius derecho = 0
□ range-end: radius derecho completo, radius izquierdo = 0
□ range-middle: radius = 0 en todos los lados (franja continua)
□ today: solo border 1px azul, sin fondo de relleno
□ disabled: line-through + text/disabled, NO pointer-events
□ other-month: text/subtlest (más claro que disabled pero visible)
□ selected + today pueden coexistir (fondo selected, border today)
□ decorator layer: aria-hidden o incluido en aria-label del gridcell

Calendar
□ 16 frames generados: Mode(2) × Scale(3) × VisibleMonths(2) × ShowWeekNumbers(2) = 24; −8 exclusiones = 16
□ Exclusiones correctas: Scale=fullscreen + VisibleMonths=2 (no frame); Scale=compact + VisibleMonths=2 (no frame)
□ compact=280px, comfortable=320px, fullscreen=100%
□ heading mes/año marcado como aria-live="polite"
□ botones prev/next con aria-label="Mes anterior/siguiente"
□ weekdayRow: role="columnheader" por celda de cabecera
□ roving tabindex: diseño muestra solo una celda activa (DayCell focused)

Tokens y valores
□ Todos los colores de estado vinculados a tokens semánticos (no valores hardcoded)
□ range-middle/bg = cal/range-middle/bg = brand/subtle
□ selected/bg = cal/selected/bg = interactive/default
□ today/border = cal/today/border = interactive/default
□ focus ring = cal/focused/ring = focus/ring
```

---

## Related components

```
Componente         | Cuándo usar ESTE en lugar de Calendar
──────────────────────────────────────────────────────────────────────────────
DatePicker         | Formularios con input de texto de fecha;
                   | el usuario debe poder escribir la fecha, no solo clickear

DateRangePicker    | Rango de fechas con presets ("Últimos 30 días"),
                   | dos inputs de texto, y UI más compacta que Calendar Mode=range

TimePicker         | Selección de hora; no de fecha;
                   | para datetime combinar Calendar + TimePicker

DateTimePicker     | Selección de fecha Y hora en un solo flujo;
                   | Calendar solo cubre la parte de fecha
```

---

## Reference: how other systems do it

### Spectrum (Adobe)
Spectrum establece la arquitectura más limpia del corpus (48/50 puntos): `Calendar` y `RangeCalendar` son componentes de primera clase, y `DatePicker` los compone internamente — no al revés. Esta inversión de dependencia responde a que Lightroom Analytics, Adobe Experience Platform y AEP Journeys necesitan calendarios en panels de dashboard sin input triggers. La feature más notable es `isDateUnavailable` como callback — en booking systems la disponibilidad es dinámica y un array no escala. `visibleMonths` de 1 a 3 para comparar trends en multi-month. `createCalendar` para calendarios alternativos (hebreo, islámico, budista) — la internacionalización a nivel de sistema de calendario es la a11y más ignorada. React Aria foundation garantiza `role="grid"`, `role="gridcell"`, Arrow keys + Page Up/Down, RTL auto-flip, y `aria-live` en el heading.

### Atlassian
Atlassian construye Calendar como una primitiva pura — `DatePicker` es un paquete separado que la compone (40/50 puntos). El dual disabled API es la contribución más práctica: `disabled` (array de fechas concretas, ergonómico para listas de feriados) + `disabledDateFilter` (callback para availability computado dinámicamente). `minDate`/`maxDate` restringen tanto la selección como la navegación — el usuario no puede navegar a meses donde todas las fechas están fuera del rango, previniendo confusión. `previouslySelected` como building block para range composition permite que Jira, Trello y Confluence implementen range logic según su interaction model sin forzar un modelo único.

### Ant Design
Ant Design es el único sistema que diseña Calendar explícitamente como display surface y no como form input tool (41/50 puntos). `fullscreen={true}` (default) renderiza un calendario de página completa para gestión de vacaciones y schedules. `dateCellRender` / `cellRender` para contenido arbitrario de React en cada celda — la feature más poderosa para dashboards enterprise. `mode: "month" | "year"` para un navegador bi-nivel: el modo year muestra los meses del año en lugar de los días del mes, permitiendo selección eficiente de mes. `showWeek` para números de semana ISO en enterprise planning.

### Fluent 2 (Microsoft)
Fluent 2 Calendar está diseñado para Outlook y Teams — el contexto de scheduling enterprise más exigente (42/50 puntos). El work-week mode (Lunes-Viernes, 5 columnas) es la contribución más distintiva: en meetings de empresa, los weekends son ruido visual que aumenta cognitive load. Mostrar solo 5 columnas en lugar de 7 reduce el grid a lo relevante. Week numbers column de primera clase para organizaciones que planean por "semana 14" en lugar de fechas absolutas. Full localization string system para internacionalización. Hereda la sólida accesibilidad de Fluent 2: `role="grid"`, keyboard navigation completa, y integración con el sistema de theming.

### Mantine
Mantine Calendar en `@mantine/dates` usa `getDayProps: (date: Date) => DayProps` — un callback que retorna props arbitrarios para cada celda (44/50 puntos). Esta única API reemplaza múltiples props separados (`disabledDates`, `highlightedDates`, `eventDates`, etc.), dando control total al consumer sobre qué información por celda necesita. `numberOfColumns` para multi-month display. Tres selection modes (single/multiple/range) en el mismo componente. La configuración de responsive es la más ergonómica del corpus para breakpoints de `slidesPerView`/`numberOfColumns`. Theme-aware automático con el sistema de dark mode de Mantine.

---

## Tokens

**26 tokens** · prefix `cal-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `cal/sm/cell` | `sizing/32` | Tamaño celda DayCell size sm |
| `cal/md/cell` | `sizing/40` | Tamaño celda DayCell size md |
| `cal/cell/radius` | `radius/pill` | Border radius de DayCell (9999) |
| `cal/default/bg` | `surface/default` | Fondo por defecto (transparente) |
| `cal/default/fg` | `text/primary` | Texto número día en estado default |
| `cal/hover/bg` | `brand/subtle` | Fondo en hover de DayCell |
| `cal/selected/bg` | `interactive/default` | Fondo de DayCell seleccionado |
| `cal/selected/fg` | `text/inverse` | Texto de DayCell seleccionado (blanco) |
| `cal/today/fg` | `interactive/default` | Texto del día de hoy (azul) |
| `cal/today/border` | `interactive/default` | Border del día de hoy |
| `cal/focused/ring` | `focus/ring` | Focus ring por navegación de teclado |
| `cal/disabled/fg` | `text/disabled` | Texto de fechas disabled |
| `cal/other-month/fg` | `text/subtlest` | Texto de días de otros meses |
| `cal/range-middle/bg` | `brand/subtle` | Fondo de días en el medio del rango |
| `cal/range-start/bg` | `interactive/default` | Fondo del día inicio de rango |
| `cal/range-end/bg` | `interactive/default` | Fondo del día fin de rango |
| `cal/cell/fontSize/sm` | `type/xs` | Font size celda sm (10px) |
| `cal/cell/fontSize/md` | `type/sm` | Font size celda md (12px) |
| `cal/header/fontSize/compact` | `type/sm` | Font del heading mes, scale compact |
| `cal/header/fontSize/comfortable` | `type/md` | Font del heading mes, scale comfortable |
| `cal/header/fontSize/fullscreen` | `type/xl` | Font del heading mes, scale fullscreen |
| `cal/weekday/fg` | `text/secondary` | Texto cabeceras días de semana |
| `cal/weekday/fontSize` | `type/xs` | Font size cabeceras días |
| `cal/weekday/fontWeight` | `type/weight-medium` | Peso cabeceras días |
| `cal/padding/compact` | `spacing/3` | Padding interno scale compact (12px) |
| `cal/padding/comfortable` | `spacing/4` | Padding interno scale comfortable (16px) |

### Spacing specs

```
DayCell:
  sm: 32×32px cuadrado, font 12px, lineHeight 16px
  md: 40×40px cuadrado, font 14px, lineHeight 20px
  gap entre celdas: 0 (el grid no tiene gap — la celda es el hit target completo)

Calendar container:
  compact:     width=280px, padding=12px, gap header/grid=8px
  comfortable: width=320px, padding=16px, gap header/grid=12px
  fullscreen:  width=100%,  padding=24px, gap header/grid=16px

Header (nav + heading):
  height mínima: 40px (compact) / 44px (comfortable) / 48px (fullscreen)
  botones nav: 32×32px (compact) / 40×40px (comfortable/fullscreen)

WeekdayRow:
  height: 32px (compact/comfortable) / 40px (fullscreen)
  texto centrado horizontalmente en cada columna

DaysGrid:
  6 filas × 7 columnas (o 8 con ShowWeekNumbers=yes)
  height total: 6 × cellSize = 6×32=192px (sm) / 6×40=240px (md)

Footer (cuando visible):
  height: 40px (compact) / 44px (comfortable)
  padding: 8px vertical
```
