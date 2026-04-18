# Calendar — Component Research

**Date:** 2026-04-17
**Mode:** Max (all 24 systems, all patterns)
**Systems analyzed:** 24
**Systems with standalone Calendar:** 9 — Spectrum, Atlassian, Ant Design, Lightning, shadcn/ui, Playbook, Chakra (via Ark), Fluent 2, Mantine
**Systems with embedded calendar (inside DatePicker):** 6 — M3, Carbon, Polaris (inline-first), Base Web, Gestalt, Orbit, Nord
**Systems without Calendar:** 9 — Paste, Primer, Cedar, Wise, Dell, Radix, GOV.UK, Evergreen + others

**CRITICAL DISTINCTION:** "Date picker calendar" (grid for date selection in a form input) ≠ "Scheduling calendar" (persistent display surface for events/appointments). Lightning is the latter; all others are the former.

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | No standalone; calendario existe solo dentro de DatePicker variants (Docked/Modal) | DatePicker modal |
| Carbon (IBM) | No standalone; grid embebido en DatePicker via Flatpickr | DatePicker (Flatpickr) |
| Twilio Paste | No Calendar; DatePicker usa `input[type=date]` nativo | Native date input |
| GitHub Primer | No Calendar general; contribution graph es custom | react-day-picker community |
| REI Cedar | No standalone; DatePicker tiene grid interna | DatePicker interno |
| Wise | No standalone; selección de fecha en DatePicker | DatePicker |
| Dell | No standalone; date selection in DatePicker | DatePicker |
| Radix UI | No calendar primitive; delega a librerías especializadas | react-day-picker (shadcn model) |
| GOV.UK | Preferencia explícita por text input (`DD/MM/YYYY`); calendar pickers son problemáticos para motricidad y cognición | `<input type="date">` o texto manual |
| Evergreen | Ausencia total — sin DatePicker ni Calendar | Librería third-party |

---

## How Systems Solve It

### Spectrum (Adobe) — "Calendar + RangeCalendar separados: standalone first-class con React Aria"

Spectrum establece la arquitectura más limpia conceptualmente: `Calendar` y `RangeCalendar` son componentes de primera clase, y `DatePicker` los compone internamente — no al revés. Esta inversión de dependencia es significativa: Lightroom Analytics, Adobe Experience Platform y AEP Journeys necesitan calendarios en panels de dashboard sin input triggers. La **separación de `Calendar` y `RangeCalendar` como componentes distintos** (en lugar de un `allowRange` prop) refleja que el range selection cambia el shape del estado, la lógica de hover (highlight del rango en-progreso), los constraints de unavailability (no puedes tener start > end), y el API externo — combinarlos en un componente crearía conditional complexity inmanejable.

**Design Decisions:**
- **`isDateUnavailable` callback (no array):** → en booking systems, la disponibilidad de fechas viene de una API y es dinámica — pre-computar todos los días disabled en el rango visible es costoso e impreciso → el callback permite lazy evaluation → **Para tu caso:** exponer siempre como callback; el consumer puede trivialmente envolver un array en `(date) => disabledDates.includes(date)` pero no puede hacer lo contrario
- **`visibleMonths` (1-3):** → dashboards de analytics necesitan ver 2-3 meses simultáneamente para comparar trends; un solo mes hace esto imposible → **Para tu caso:** 1 por default; multi-month como override para casos de range y comparación
- **`createCalendar` (sistemas de calendario alternativos):** → Spectrum soporta Hebrew, Islamic, Buddhist, Persian calendars para productos globales → la internacionalización a nivel de sistema de calendario es la a11y más ignorada → **Para tu caso:** si el producto es global, verificar si necesitas sistemas de calendario más allá del gregoriano
- **`pageBehavior: "visible" | "single"`:** → "visible" cambia ambos meses cuando se navega en un multi-month layout; "single" avanza solo un mes → **Para tu caso:** "visible" es más natural para comparación de meses adyacentes

**Notable Props:** `isDateUnavailable: (date: DateValue) => boolean`, `visibleMonths: 1|2|3`, `pageBehavior: "visible"|"single"`, `allowsNonContiguousRanges: boolean`, `createCalendar`, `firstDayOfWeek: Day`

**Accessibility:** React Aria foundation: `role="grid"`, `role="gridcell"` por día, Arrow keys + Page Up/Down + Shift+Page Up/Down (años), RTL auto-flip de arrow keys, `aria-label` requerido en cada instancia, `aria-live` region en el heading de mes/año.

---

### Atlassian — "Calendar como primitiva standalone + dual disabled API"

Atlassian construye `Calendar` como una primitiva pura — `DatePicker` es un paquete separado que la compone. Esta decisión está motivada por Jira sprint boards, Trello cards y Confluence page properties — todos necesitan calendarios sin text input triggers. El **dual disabled API** es la contribución más práctica de Atlassian: `disabled` (array de fechas concretas, ergonómico para listas de holidays) + `disabledDateFilter` (callback para availability computado dinámicamente). No hay sistema que sea más ergonómico para los dos casos de uso comunes. `previouslySelected` como building block para range composition permite que cada producto implemente range logic apropiada a su interaction model sin forzar un solo modelo.

**Design Decisions:**
- **Dual disabled model:** → una lista de holidays es más legible como array que como función → una verificación de disponibilidad dinámica necesita callback → la dualidad es la API correcta → **Para tu caso:** soportar ambas formas; normalizar internamente a callback si necesitas unificar la lógica
- **`minDate`/`maxDate` restringen navegación (no solo selección):** → el usuario no debe poder navegar a meses donde TODAS las fechas están fuera del rango — confunde y frustra → **Para tu caso:** siempre vincular el minDate/maxDate a la navegación también, no solo al día selection
- **`previouslySelected` para range composition:** → Atlassian expone el building block del range sin implementar el range completo — da a Jira, Trello y Confluence libertad para implementar range según su UX → **Para tu caso:** considerar si el producto necesita un range built-in o composición libre

**Notable Props:** `disabled: string[]`, `disabledDateFilter: (day: string) => boolean`, `minDate`/`maxDate`, `previouslySelected`, `weekStartDay: 0-6`, `onSelect: ({ day, month, year, iso }) => void`

**Accessibility:** `role="grid"` + table semantics. `aria-label` por celda con full date string. `aria-selected`, `aria-disabled`. Navigation buttons labeled. Live region en heading.

---

### Ant Design — "Calendar como display surface con fullscreen + cell rendering"

Ant Design es el único sistema que diseña Calendar explícitamente como **display surface** (no como form input tool). `fullscreen={true}` (default) renderiza un calendario de página completa para gestión de vacaciones, schedules, eventos. `fullscreen={false}` renderiza como card compacta para widgets de sidebar. El `dateCellRender` / `cellRender` para contenido arbitrario de React en cada celda es la feature más poderosa — un calendario que solo muestra números es inútil para dashboard enterprise; se necesita mostrar counts de tareas, revenue, eventos, disponibilidad.

**Design Decisions:**
- **`fullscreen` toggle:** → un componente, dos escalas de presentación — eliminate la necesidad de dos componentes o layouts hacks → **Para tu caso:** si el producto necesita tanto un widget de sidebar como una página de calendario completa, este prop es la solución correcta
- **`dateCellRender`:** → revenue por día, task counts, flight prices, availability indicators — todos requieren contenido arbitrario en las celdas → **Para tu caso:** exponer un render prop o slot de contenido por celda; es la feature que más diferencia un "date picker" de un "calendar display"
- **`mode: "month" | "year"`:** → el modo año muestra los meses del año en lugar de los días del mes — navegación bi-nivel para selección eficiente → **Para tu caso:** si el producto necesita selección de mes (no solo día), el modo year es esencial
- **`showWeek: boolean`:** → números de semana ISO son necesarios en enterprise planning y análisis de rendimiento semanal → **Para tu caso:** incluir como opt-in; relevante para products de gestión de proyectos y analytics

**Notable Props:** `fullscreen: boolean`, `mode: "month" | "year"`, `dateCellRender / cellRender`, `headerRender`, `disabledDate: (current: Dayjs) => boolean`, `validRange: [Dayjs, Dayjs]`, `showWeek: boolean`, `onSelect(value, info.source)`

**Accessibility:** Arrow keys + Page Up/Down. `aria-selected`, `aria-disabled`. Live region en heading — documentación no explicita garantía de anuncio SR para navegación.

---

### Fluent 2 (Microsoft) — "Work-week mode + week numbers para enterprise scheduling"

Fluent 2 Calendar está diseñado para Outlook y Teams — el contexto de scheduling enterprise más exigente. El **work-week mode (Lunes-Viernes)** es la contribución más distintiva: en meetings de empresa, los weekends son ruido visual que aumenta cognitive load. Mostrar solo 5 columnas en lugar de 7 es una decisión de fidelidad al contexto. Week numbers column es first-class para granjas de reuniones que planean por "semana 14" no por fechas absolutas. Full localization string system para internacionalización.

**Design Decisions:**
- **Work-week mode (5 columnas):** → en scheduling enterprise, los domingos y sábados no existen para la mayoría de meetings → 7 columnas es overhead visual innecesario → **Para tu caso:** incluir si el producto es scheduling de negocio; NO incluir si puede usarse para reservas personales donde los weekends sí importan
- **Week numbers:** → planificación enterprise usa ISO week numbers ("Q1 semana 14") → sin week numbers el usuario debe calcular mentalmente → **Para tu caso:** opt-in; relevante para gestión de proyectos, analytics, y países europeos donde la semana ISO es idiomática

**Notable Props:** First-class standalone, work-week mode (Mon-Fri), week numbers column, full localization strings, used in Outlook and Teams

**Accessibility:** Hereda la sólida a11y de Fluent 2. `role="grid"`. Keyboard navigation completa.

---

### Mantine — "getDayProps callback: la customización por celda más flexible"

Mantine Calendar en `@mantine/dates` usa `getDayProps: (date: Date) => DayProps` — un callback que retorna props arbitrarios para cada celda de día. En lugar de tener props separados para `disabledDates`, `highlightedDates`, `eventDates`, etc., un solo callback permite cualquier combinación de estados visuales y ARIA attributes. `numberOfColumns` para multi-month. Tres selection modes (single/multiple/range) en el mismo componente.

**Design Decisions:**
- **`getDayProps` callback unificado:** → una API para todos los estados de día en lugar de N props separados → el consumer tiene control total sobre qué información per-celda necesita → **Para tu caso:** `getDayProps` es el patrón más extensible para calendarios con datos ricos por celda

**Notable Props:** `getDayProps: (date: Date) => DayProps`, `numberOfColumns`, `mode: "single" | "multiple" | "range"`, full date navigation

---

### shadcn/ui — "Calendar standalone via react-day-picker + composición en Popover"

shadcn/ui Calendar es un wrapper delgado sobre `react-day-picker` — inheriting su API de `mode="single"|"multiple"|"range"`. La decisión clave: exponer Calendar como componente standalone que puede usarse directamente en una página (no solo dentro de un Popover), dándole versatilidad para inline date displays. shadcn/ui es la mayoría del ecosistema React que implementa calendarios — su popularidad hace de react-day-picker el estándar de facto para web.

**Notable Props:** `mode: "single" | "multiple" | "range"`, `selected`, `onSelect`, `disabled`, `fromDate`/`toDate`, `showOutsideDays`, `numberOfMonths`

---

### Salesforce Lightning — "Calendar de scheduling completo: month/week/day views + events"

Lightning Calendar es cualitativamente distinto de todos los demás — es un **scheduling calendar completo** con vistas de mes/semana/día, display de eventos, drag-and-drop de eventos, y click-to-create. Análogo a Google Calendar embedded en Salesforce CRM. No es una herramienta de selección de fecha — es una interface de gestión de tiempo.

**Notable Props:** month/week/day views, event display, scheduling, drag-and-drop (scheduling calendar, not date picker)

---

### Polaris (Shopify) — "DatePicker IS the Calendar: inline-first para merchants"

Polaris `DatePicker` renderiza inline por default — sin trigger, sin popover. El merchant siempre ve el calendario en panels de filtros y dashboards. `allowRange` prop en lugar de componente separado. Estado de mes/año fully controlled (required) para sincronización con datos de analytics.

**Notable Props:** `month`/`year` (required controlled), `onMonthChange`, `allowRange`, `multiMonth`, `disableDatesBefore`/`disableDatesAfter`

---

### Orbit (Kiwi.com) — "renderDay para precios/disponibilidad en travel booking"

Orbit Calendar (via `InputDate`) siempre está inline en el flujo de reservas. `renderDay` prop para mostrar precios y disponibilidad de vuelos por celda — la feature killer para travel booking. Un usuario necesita ver el precio de cada día antes de seleccionar la fecha de vuelo.

**Notable Props:** `renderDay: (day: Date) => ReactNode`, siempre inline, range selection para vuelos de ida y vuelta

---

### Chakra UI (via Ark UI) — "Day/month/year view levels con state machines"

Chakra Calendar via Ark UI / Zag.js usa state machines para gestionar los view levels (día → mes → año) con navegación drill-down y drill-up. Single, range y multiple selection.

---

## Pipeline Hints

**Archetype recommendation:** `grid-tabular`
Rationale: Calendar es fundamentalmente un grid de días organizados en filas de semanas y columnas de días de la semana. ARIA spec prescribe `role="grid"` con `role="gridcell"` por celda. grid-tabular captura esta estructura.

**Slot consensus:** (9 sistemas con standalone Calendar)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| header | container | yes | 9/9 | Contains month-year label + navigation buttons |
| prev-month-button | icon-action | yes | 9/9 | Navigate to previous month; `aria-label="Previous month"` |
| next-month-button | icon-action | yes | 9/9 | Navigate to next month; `aria-label="Next month"` |
| month-year-label | text | yes | 9/9 | Current month+year; aria-live region; also clickable for month/year picker in some |
| weekday-headers | text | yes | 9/9 | Mon-Sun (or work-week) abbreviations; `role="columnheader"` |
| week-number | text | no | 3/9 | ISO week number column; Ant, Fluent 2, Mantine |
| day-cells | container | yes | 9/9 | The `role="grid"` with 4-6 rows × 7 columns |
| day-cell-content | container | no | 3/9 | Custom content per cell; Ant dateCellRender, Mantine getDayProps, Orbit renderDay |
| footer | container | no | 3/9 | Today button, apply/cancel actions for range; optional |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| selectionMode | variant | single/range/multiple | 7/9 | Spectrum separates into two components; others use prop |
| visibleMonths | variant | 1/2/3 | 4/9 | Spectrum visibleMonths, Mantine numberOfColumns, Polaris multiMonth, shadcn numberOfMonths |
| firstDayOfWeek | variant | 0-6 (Sun-Sat) | 6/9 | Critical for localization; Sunday (US) vs Monday (Europe) |
| showWeekNumbers | boolean | true/false | 3/9 | Ant showWeek, Fluent 2, Mantine |
| isDateUnavailable | variant | callback | 6/9 | Spectrum, Atlassian (+ array), Ant, Mantine, Polaris (array only), shadcn (disabled prop) |
| minDate/maxDate | variant | Date | 8/9 | Universal constraint; Atlassian also restricts navigation |
| viewMode | variant | month/year/decade | 3/9 | Ant (month/year), Chakra (day/month/year), Fluent 2 |
| isFullscreen | boolean | true/false | 1/9 | Ant Design only |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| showWeekNumbers | 3/9 | false | ISO week column |
| showOutsideDays | 4/9 | true | Days from prev/next month visible in grid |
| allowsNonContiguousRanges | 1/9 | false | Spectrum: allow range with gaps (disabled dates within range) |
| isReadOnly | 4/9 | false | Display-only, no selection |
| isDisabled | 4/9 | false | Entire calendar disabled |
| autoFocus | 3/9 | false | Focus first available date on mount |
| skipPartiallyExpanded | 1/9 | false | M3: skip half-expanded state |

**State coverage (comprehensive) — per day cell:**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 9/9 | Number, neutral styling | |
| today | 9/9 | Circle/underline/bold; `aria-current="date"` | Must be visually distinct AND accessible |
| selected | 9/9 | Filled circle/square; `aria-selected="true"` | Single selection |
| range-start | 6/9 | Filled circle + range highlight extends right | Range selection start |
| range-end | 6/9 | Filled circle + range highlight extends left | Range selection end |
| range-middle | 6/9 | Range highlight background (no circle) | Days between start and end |
| hover | 7/9 | Circle preview; in range mode: preview range highlight | |
| focus | 9/9 | Focus ring around cell | Keyboard navigation |
| disabled | 8/9 | Muted color; `aria-disabled="true"`; non-selectable | |
| outside-month | 7/9 | Muted; shows days from prev/next month | Some hide these cells |
| custom-decorated | 3/9 | Arbitrary content from render prop | Ant, Mantine, Orbit |

**Exclusion patterns found:**
- disabled × selected — disabled dates cannot be selected; navigation can still reach them for context
- range-start × range-end (same date) — selecting same date for start and end = single date range; most systems treat as valid, show both start+end indicators merged
- outside-month × selected — outside month days can typically be clicked (navigates to that month and selects); some systems disallow

**Building block candidates:**
- calendar-header → `.CalendarHeader` — 7/9 sistemas formalizan el header como sub-componente
- calendar-grid → `.CalendarGrid` — el `role="grid"` con weekday headers y day cells
- calendar-day → `.CalendarCell` — la celda individual con todos sus estados

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| selectionMode | single, range, multiple | 7/9 | Core axis |
| viewMode | month, year, decade | 3/9 | Drill-down navigation level |
| pageBehavior | visible, single | 1/9 | Spectrum only (multi-month scroll behavior) |
| calendarSystem | gregorian, hebrew, islamic, buddhist | 1/9 | Spectrum createCalendar |

**A11y consensus:**
- Primary role: `role="grid"` on the calendar grid container (universal across all implementing systems)
- `role="gridcell"` on each day cell; `role="columnheader"` on weekday headers
- Keyboard navigation: Arrow keys (days), Page Up/Down (months), Shift+Page Up/Down (years), Home/End (week boundaries), Tab (moves between header, grid, footer)
- Today: `aria-current="date"` (not `aria-current="page"`)
- Selected: `aria-selected="true"` on selected cell(s)
- Disabled: `aria-disabled="true"` (not `disabled` attribute — gridcells use aria-disabled)
- Month/year heading: `aria-live="polite"` region so screen readers announce month change on navigation
- Nav buttons: `aria-label="Go to previous month"` / `"Go to next month"`
- RTL: Arrow key directions must reverse (Left → next day in RTL, Right → previous day)
- `aria-label` required on Calendar instance describing its purpose ("Select your check-in date")
- Range selection: SR must announce both start and end selection; during range-in-progress, hover states should be announced
- GOV.UK note: text date input (`input[type=date]` or separate day/month/year fields) is MORE accessible than calendar grids for users with motor impairments and cognitive disabilities — consider offering text input alternative

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template | Same component set |
| 40–70% | Extension | Same component set + property |
| < 40% | Separate | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Single-date selection | 100% | Template | Base calendar, single select | All 9 |
| Range selection | 85% | Template | Range highlight, start/end states | Spectrum RangeCalendar, Mantine range, shadcn, Polaris allowRange, Atlassian (manual) |
| Multiple selection | 60% | Template | Multiple selected days, non-contiguous | Spectrum, Mantine, shadcn mode="multiple" |
| Multi-month display | 75% | Template | Side-by-side months for range UX | Spectrum visibleMonths, Mantine numberOfColumns |
| Data-enriched calendar | 50% | Extension | Custom content per cell (prices, events, counts) | Ant dateCellRender, Mantine getDayProps, Orbit renderDay |
| Full-page scheduling calendar | 10% | Separate | Month/week/day views, events, drag-drop | Lightning (Google Calendar analog) |
| Work-week mode | 70% | Extension | 5 columns (Mon-Fri), no weekends | Fluent 2 |
| Year/decade picker | 60% | Extension | View mode drill-down | Ant, Chakra |
| NOT a Calendar — DatePicker | 30% | Not-a-calendar | Calendar = grid alone; DatePicker = calendar + input trigger | M3, Carbon, Paste |

---

## What Everyone Agrees On

1. **`role="grid"` is the ARIA standard:** Every system with a calendar grid uses `role="grid"` with `role="gridcell"`. This is the universal ARIA pattern — there is no disagreement.

2. **Arrow key navigation:** All implementing systems use Arrow keys to navigate between days, Page Up/Down for months. This keyboard contract is universal.

3. **`aria-live` on month heading:** Every well-implemented calendar announces month changes via a live region so screen reader users know when the calendar view has changed.

4. **`minDate`/`maxDate` constraints:** All systems support date range constraints. Almost all restrict navigation too (not just selection) — preventing users from navigating to months where all dates are unavailable.

5. **Today must be visually distinct:** All systems mark today's date differently from other dates, with an accessible `aria-current="date"` attribute.

6. **Outside-month days shown for grid alignment:** Most systems show greyed-out days from previous/next months to fill the grid to complete 5-6 rows × 7 columns.

---

## Where They Disagree

**¿Calendar y RangeCalendar como componentes separados, o `selectionMode` prop?**
- **Option A: Componentes separados** (Spectrum — `Calendar` + `RangeCalendar`) — API exactamente correcta para cada modo; sin branching interno; props más claros
- **Option B: `selectionMode` prop** (Mantine, shadcn, Atlassian prep) — un solo componente; más familiar para la mayoría; internals más complejos
- **Para tu caso:** Un componente con `selectionMode` es más ergonómico para la mayoría de casos; separa solo si el range selection tiene una API completamente distinta

**¿`isDateUnavailable` como callback, array, o ambos?**
- **Option A: Solo callback** (Spectrum, Ant) — máxima flexibilidad; el consumer envuelve arrays si necesita
- **Option B: Array + callback** (Atlassian) — dual API para ergonomía en casos simples (listas de holidays) y complejos (dynamic availability)
- **Option C: Solo array** (Polaris) — simple; insuficiente para availability dinámica
- **Para tu caso:** Dual API (array + callback) de Atlassian es el más ergonómico en la práctica

**¿`dateCellRender` / `getDayProps` para custom content en celdas?**
- **Option A: `getDayProps` (callback que retorna props arbitrarios)** (Mantine) — máxima flexibilidad; el consumer controla todo del day cell
- **Option B: `dateCellRender` (React slot)** (Ant) — slot de contenido; más legible; limitado a contenido no-behavior
- **Option C: Sin custom cell content** (Spectrum, Atlassian, Fluent 2) — calendar limpio para selección; no para display de datos
- **Para tu caso:** Incluir algún mecanismo de custom cell content si el producto necesita mostrar datos (precios, eventos, counts) junto con las fechas

**¿minDate/maxDate restringen solo selección o también navegación?**
- **Option A: Restringen selección + navegación** (Atlassian) — el usuario no puede navegar a meses completamente fuera del rango; más UX friendly
- **Option B: Restringen solo selección** (la mayoría) — el usuario puede navegar libremente pero las fechas fuera del rango están disabled; más flexible
- **Para tu caso:** Atlassian's approach es mejor UX en la mayoría de casos; restringir navegación previene confusión

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Single-month compact | 7×4-6 grid, header con nav | DatePicker popover, sidebar widget | Atlassian, shadcn, Spectrum compact |
| Dual-month range | Dos meses side-by-side para range selection | Reservas, campaigns, análisis comparativo | Spectrum visibleMonths=2, Polaris multiMonth |
| Full-page calendar | Calendar ocupa toda la página con rich content per cell | Gestión de vacaciones, leave management | Ant fullscreen=true |
| Data-enriched cells | Números + custom content (precios, eventos) por celda | Travel booking, HR calendars, analytics | Ant dateCellRender, Orbit renderDay |
| Work-week view | 5 columnas (Lun-Vie), sin fines de semana | Enterprise scheduling, meeting booking | Fluent 2 |
| Year/month picker mode | Vista de meses del año en lugar de días | Selección de mes para reports | Ant mode="year", Chakra |

**Single-month estándar:**
```
┌──────────────────────────────────────┐
│  ← │     April 2026     │ →          │
├────┬────┬────┬────┬────┬────┬────────┤
│ Mo │ Tu │ We │ Th │ Fr │ Sa │ Su    │
├────┼────┼────┼────┼────┼────┼────────┤
│    │    │  1 │  2 │  3 │  4 │  5    │
│  6 │  7 │  8 │  9 │ 10 │ 11 │ 12   │
│ 13 │ 14 │ 15 │ 16 │ 17 │ 18 │ 19   │
│ 20 │ 21 │ 22 │ 23 │ 24 │ 25 │ 26   │
│ 27 │ 28 │ 29 │ 30 │    │    │      │
└──────────────────────────────────────┘
```

**Dual-month range (Spectrum, Polaris):**
```
┌─────────────────────┬─────────────────────┐
│  ←  April 2026  →  │  ←  May 2026    →   │
├───┬───┬───┬───┬───┬───┬───┼───┬───┬───┬───┤
│ 1 │ 2 │●3 │███│███│███│█8 │ 1 │ 2 │...   │
│   start  │──range──│  end │               │
└─────────────────────┴─────────────────────┘
```

**Data-enriched cell (Orbit/Ant):**
```
┌────────────────┐
│ 17             │
│ $245           │  ← precio del vuelo ese día
│ ✓ available    │
└────────────────┘
```

---

## Risks to Consider

**Risk 1: Month heading no anunciado al cambiar mes** (HIGH)
Si el heading del mes (ej: "April 2026") no tiene `aria-live="polite"`, los usuarios de screen reader no saben que el calendario cambió al hacer click en los botones de navegación. Navegan ciegamente.
**Mitigation:** `aria-live="polite"` siempre en el elemento del heading de mes/año. Testar con VoiceOver y NVDA antes de ship.

**Risk 2: Range selection sin anuncio SR del estado in-progress** (HIGH)
Durante range selection, cuando el usuario ha seleccionado el start date y está hovering para ver el preview del end, los screen readers no anuncian qué rango se está previewing. El usuario no sabe si su selección es correcta hasta hacer click.
**Mitigation:** Anunciar el rango in-progress via live region: "Range selected: April 3 to April 17". Actualizar en cada cambio de hover/focus durante range selection.

**Risk 3: Keyboard navigation no llega a todos los días** (HIGH)
Implementaciones incorrectas que usan `tabindex` en lugar de `roving tabindex` permiten Tab key en cada celda, creando un tab order enorme. La especificación ARIA es: solo un día tiene tabindex=0 en el grid; los demás son tabindex=-1; Arrow keys mueven el focus dentro.
**Mitigation:** Implementar roving tabindex pattern: un solo focusable element en el grid en cada momento; Arrow keys manejan la navegación interna.

**Risk 4: Calendar inutilizable en mobile por touch targets pequeños** (MEDIUM)
Celdas de calendario con 32x32px o menos son difíciles de tocar con precision en mobile. WCAG 2.5.5 requiere 48x48dp mínimo.
**Mitigation:** En mobile viewports, aumentar el min-height y min-width de las celdas a 44-48px. Considerar un diseño más compacto del header para dar más espacio a las celdas.

**Risk 5: Disabled dates confundidas con outside-month days** (MEDIUM)
Si los días disabled y los días de outside-month tienen styling similar (ambos grisados), los usuarios no pueden distinguir "esta fecha no existe en este mes" de "esta fecha no está disponible".
**Mitigation:** Design tokens distintos para disabled vs. outside-month. Típicamente: outside-month = texto más claro pero clickeable (cambia de mes); disabled = texto grisado + línea diagonal o diferente opacidad, NO clickeable.

---

## Dimension Scores (sistemas CON standalone Calendar)

| Sistema | A11y | Customization | Range UX | i18n | Standalone | Total |
|---------|------|---------------|----------|------|------------|-------|
| Spectrum | 10 | 8 | 10 | 10 | 10 | **48/50** |
| Fluent 2 | 9 | 7 | 8 | 9 | 9 | **42/50** |
| Atlassian | 9 | 7 | 6 | 8 | 10 | **40/50** |
| Mantine | 8 | 10 | 9 | 8 | 9 | **44/50** |
| Ant Design | 7 | 10 | 7 | 8 | 9 | **41/50** |
| shadcn/ui | 7 | 8 | 8 | 7 | 9 | **39/50** |
| Chakra (Ark) | 7 | 7 | 7 | 7 | 8 | **36/50** |
| Orbit | 6 | 9 | 7 | 6 | 7 | **35/50** |
| Polaris | 7 | 6 | 7 | 6 | 8 | **34/50** |

---

## Next Steps

1. **`/spec calendar`** — Generate config.json with anatomy (header nav, weekday headers, day grid, selection states, range states)
2. **`/enrich calendar`** — Add a11y (role=grid, roving tabindex, aria-live heading, range SR announcements, RTL)
3. **`/build calendar`** — Full pipeline in one command using this research as cache
4. **`/build calendar --max`** — Use pre-generated config without scope questions
5. **`/research calendar --fresh`** — Re-run research from scratch (bypasses this cache)

**Key spec decisions to make:**
- Calendar + RangeCalendar as separate components (Spectrum) or `selectionMode` prop (Mantine)?
- `isDateUnavailable` as callback only, array only, or dual API (Atlassian)?
- Include `dateCellRender` / `getDayProps` for custom cell content?
- `visibleMonths` for multi-month display?
- Work-week mode (5 columns) as variant?
- Show week numbers column as opt-in?
