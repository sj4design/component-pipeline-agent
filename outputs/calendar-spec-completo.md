# Calendar

## Descripción general

Calendar es el widget de grid de fechas standalone del sistema de diseño: una cuadrícula de días navegable por mes que permite seleccionar una fecha (Mode=single) o un rango de fechas (Mode=range). A diferencia de DatePicker (input + popover), Calendar es un componente standalone que puede vivir en dashboards, paneles de scheduling, o páginas de gestión de disponibilidad. Implementa el patrón ARIA `role="grid"` con roving tabindex para navegación por teclado — el mismo patrón que usa Google Calendar, Airbnb, y todos los sistemas de reserva de referencia.

```
Scale=comfortable, Mode=single:
┌──────────────────────────────────────────┐
│  ‹   abril 2026   ›                      │  header con nav
│  Lu  Ma  Mi  Ju  Vi  Sá  Do             │  row de días
│  30  31   1   2   3   4   5             │  other-month
│   6   7   8   9  10  11  12             │
│  13  14 [15] 16  17  18  19             │  15 = selected (azul)
│  20  21  22  23  24  25  26             │
│  27  28  29  30   1   2   3             │
│           [Hoy]  [Limpiar]              │  footer opcional
└──────────────────────────────────────────┘

Mode=range con VisibleMonths=2:
┌─────────────────────────────────────────────────────────────────────┐
│  ‹   abril 2026   ›                    ‹   mayo 2026   ›            │
│  Lu Ma Mi Ju Vi Sá Do    Lu Ma Mi Ju Vi Sá Do                      │
│  ...  [14]●══════════════════════════════● [18]  ...               │
│         range-start         range-middle         range-end          │
└─────────────────────────────────────────────────────────────────────┘

DayCell states:
│  default:     fg:primary, bg:transparent                            │
│  hover:       bg:brand/subtle (azul tenue)                         │
│  selected:    bg:interactive/default (azul) · fg:inverse · bold    │
│  today:       border:interactive/default · fg:interactive · bold   │
│  other-month: fg:text/subtlest (gris claro)                        │
│  disabled:    fg:disabled · text-decoration:line-through           │
│  range-start: bg:azul · radius-right:0                             │
│  range-end:   bg:azul · radius-left:0                              │
│  range-middle:bg:brand/subtle · radius:0                           │
```

**Lo que el diseñador puede configurar:**

Variantes en DayCell (building block):

```
State → default | hover | selected | today | focused | disabled | other-month | range-start | range-end | range-middle
Size  → sm | md
```

Variantes en Calendar (composición):

```
Mode          → single | range
Scale         → compact | comfortable | fullscreen
VisibleMonths → 1 | 2
ShowWeekNumbers → no | yes
```

Toggles en DayCell:

```
👁 Show Decorator → muestra/oculta el slot de decorator (dot, price, event count)
🔄 Decorator → instance-swap del decorador
✏️ Day → número del día ("15")
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  Calendar                                                │
│  ──────────────────────────────────────────────────────  │
│  Mode          [ single        ▼ ]                       │
│  Scale         [ comfortable   ▼ ]                       │
│  VisibleMonths [ 1             ▼ ]                       │
│  ShowWeekNumbers [ no          ▼ ]                       │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El usuario necesita seleccionar una fecha?
                    │
                    ▼
       ¿El calendario es siempre visible?
       ├── Sí → Calendar standalone
       └── No → DatePicker (input + popover on demand)
                    │
                    ▼
       ¿Necesita seleccionar un rango?
       ├── Sí + presets → DateRangePicker
       └── Sí simple → Calendar Mode=range + VisibleMonths=2
```

**Usar Calendar cuando:**
- Widget de scheduling en un dashboard (siempre visible)
- Selector de disponibilidad en una página de booking
- Vista de calendario mensual con eventos (Scale=fullscreen)
- Picker inline dentro de un formulario sin popover
- Side-by-side range con 2 meses (VisibleMonths=2)

**NO usar Calendar cuando:**
- El campo de fecha está en un formulario compacto → usar `DatePicker`
- Necesita presets ("Últimos 7 días") → usar `DateRangePicker`
- Es selección de tiempo → usar `TimePicker`

---

## Variaciones visuales

### DayCell sizes

| Size | Width | Height | FontSize | Radius |
|------|-------|--------|---------|--------|
| sm   | 32px  | 32px   | 12px    | pill   |
| md   | 40px  | 40px   | 14px    | pill   |

### Calendar scales

| Scale | Ancho | MonthLabel | NavIconSize | Padding | Uso |
|-------|-------|-----------|------------|---------|-----|
| compact | 280px | 14px | 16px | 12px | Sidebar widget |
| comfortable | 320px | 16px | 20px | 16px | Popover default |
| fullscreen | 100% | 20px | 24px | 24px | Dashboard page |

### DayCell States

| State | Background | Foreground | Borde | Shape |
|-------|-----------|-----------|-------|-------|
| default | transparent | text/primary | — | pill |
| hover | brand/subtle | text/primary | — | pill |
| selected | interactive/default (azul) | text/inverse | — | pill |
| today | transparent | interactive/default | interactive/default | pill outline |
| other-month | transparent | text/subtlest | — | pill |
| disabled | transparent | text/disabled | — | line-through |
| range-start | interactive/default | text/inverse | — | pill radio-left-only |
| range-middle | brand/subtle | text/primary | — | square (radius:0) |
| range-end | interactive/default | text/inverse | — | pill radio-right-only |

---

## Decisiones de diseño

**1. Calendar standalone como primitivo** — Spectrum, Atlassian y Ant tienen Calendar standalone. M3 y Carbon lo embeben en DatePicker. Zoom necesita calendar widgets en dashboards de scheduling (disponibilidad, reuniones). Standalone permite composición tanto en DatePicker como en views dedicados.

**2. 10 States en DayCell incluyendo range-start/end/middle** — range selection necesita visual continuity: start/end con radius parcial, middle con bg light sin radius — efecto de "selección continua". Modelado como States explícitos permite frames completos sin decoradores condicionales.

**3. Scale: compact / comfortable / fullscreen** — compact 280px para sidebars; comfortable 320px para popovers; fullscreen para páginas de gestión de ausencias o scheduling dedicado (patrón Ant `fullscreen={true}`).

**4. VisibleMonths 1 o 2** — range selection con 2 meses side-by-side es el default en M3 + Spectrum (el usuario ve el inicio y el fin simultáneamente). Single month suficiente para date picker popover.

**5. Decorator slot opcional** — calendarios enterprise muestran event count, precios, status dots en celdas (Ant `dateCellRender`). Slot con instance-swap permite custom content sin hardcodear un patrón específico.

**6. ShowWeekNumbers** — calendarios ISO para fiscal/reporting necesitan week numbers (Week 32). Columna extra a la izquierda, opt-in via property. Patrón Ant `showWeek`.

### Combinaciones excluidas

```
Scale=fullscreen + VisibleMonths=2 (fullscreen es single-month grande)
Scale=compact + VisibleMonths=2 (no cabe en sidebar)
```

---

## Comportamiento

### Esencial para diseño

- **DayCell es el building block** — el Calendar modela la cuadrícula completa. En Figma, DayCell se itera para poblar la grilla de 6×7 = 42 celdas.
- **Other-month cells** — las celdas del mes anterior/siguiente se muestran en gris para completar las semanas. No son seleccionables.
- **Hoy siempre marcado** — today tiene borde de color (no fill) para diferenciarse del selected. Si hoy está seleccionado: fill azul (selected toma prioridad).
- **Range: fill continuo** — range-middle elimina el border-radius para crear el efecto de selección continua entre range-start y range-end. Requiere que las celdas no tengan gap entre ellas.
- **Footer opcional** — botones "Hoy" (salta al mes actual) y "Limpiar" (reset a sin selección). Modelados como slot footer.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Grid | `role="grid"` + `aria-label="Calendario, abril 2026"` | SR anuncia el grid con mes y año |
| Fila | `role="row"` | Semántica de tabla para navegación 2D |
| Celda | `role="gridcell"` + `aria-label="15, miércoles 15 de abril de 2026"` | SR anuncia fecha completa |
| Selected | `aria-selected="true"` | SR anuncia la fecha seleccionada |
| Hoy | `aria-current="date"` | SR anuncia "día actual" |
| Disabled | `aria-disabled="true"` | SR anuncia que no es seleccionable |
| Mes nav | `aria-live="polite"` en el header | SR anuncia el cambio de mes |
| Range | `aria-describedby` en start/end | "Inicio de rango" / "Fin de rango" |

### Navegación por teclado

```
Arrow keys      → navega día a día (roving tabindex)
Page Up/Down    → mes anterior/siguiente
Shift+Page Up/Down → año anterior/siguiente
Home/End        → inicio/fin de semana
Enter/Space     → selecciona el día con foco
Escape          → cierra si está en popover (DatePicker)
```

---

## Guía de contenido

**Header (mes y año):**
- Formato localizado: "abril 2026" (no "April 2026" ni "04/2026")
- Para locale inglés: "April 2026"

**Días de la semana:**
- Abreviado a 2 letras: "Lu Ma Mi Ju Vi Sá Do" (español)
- Todas en la misma fuente y peso

**DayCell Decorator (tooltip / evento):**
- Dot: indica "hay algo" sin contar
- Número: cantidad de eventos
- Custom: precio (ej. booking calendar), disponibilidad

---

## Pre-build checklist

```
□ ¿role="grid" + aria-label dinámico (mes año)?
□ ¿role="row" en cada fila?
□ ¿role="gridcell" + aria-label completo en cada celda?
□ ¿aria-current="date" en today?
□ ¿aria-selected="true" en selected?
□ ¿aria-disabled="true" en disabled?
□ ¿Header mes/año en aria-live="polite"?
□ ¿Arrow keys con roving tabindex?
□ ¿Page Up/Down cambian mes?
□ ¿Mode=range: range-middle sin border-radius?
□ ¿Other-month cells: no seleccionables?
□ ¿RTL: Arrow keys invertidas (derecha = izquierda)?
```

---

## Componentes relacionados

```
DatePicker       → Calendar en popover activado desde un input field
DateRangePicker  → Calendar Mode=range + PresetItems + Apply button
TimePicker       → para selección de hora
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Standalone | Range | Fullscreen | ARIA | Diferenciador |
|---------|-------|-----------|-------|-----------|------|--------------|
| **Material Design 3** | DatePicker (embedded) | No (solo en Picker) | Sí | No | grid | Calendar embebido en modal DatePicker |
| **Spectrum (Adobe)** | Calendar | Sí | Sí (RangeCalendar) | No | grid | RangeCalendar separado; internationalization |
| **Carbon (IBM)** | DatePicker solo | No | Sí | No | grid | Calendar embebido en DatePicker |
| **Polaris (Shopify)** | DatePicker standalone | Sí | Sí | No | grid | prop month + onMonthChange |
| **Atlassian** | Calendar | Sí | No | No | grid | onSelect + disabledRange prop |
| **Ant Design** | Calendar | Sí | No (DateRangePicker) | Sí (fullscreen) | grid | fullscreen + dateCellRender + showWeek |
| **Twilio Paste** | — | — | — | — | — | Sin componente dedicado |
| **shadcn/ui** | Calendar | Sí | Sí (mode="range") | No | grid | Basado en react-day-picker; multiple modes |
| **Chakra UI** | — | — | — | — | — | Sin componente dedicado |
| **Fluent 2** | Calendar | Sí | Sí | No | grid | workWeekDays; restrictedDates |
| **Mantine** | DatePicker + Calendar | Sí | Sí | No | grid | Calendar primitivo + DatePicker |
| **Radix UI** | — | — | — | — | — | Sin componente |
| **React Aria** | Calendar + RangeCalendar | Sí | Sí | No | grid | Full ARIA spec; internationalization |

**Patrones clave de la industria:**
1. **WAI-ARIA Date Picker Design Pattern** — el patrón ARIA canónico define `role="grid"` con roving tabindex. Arrow keys 2D, Page Up/Down para meses, aria-label descriptivo por celda. React Aria y Spectrum son las implementaciones de referencia más completas.
2. **Ant Design `fullscreen`** — único T1 con Calendar de pantalla completa integrada. `dateCellRender` permite contenido custom por celda (events, prices). Patrón de Google Calendar / Calendly para dashboards dedicados.
3. **Range selection visual** — el efecto de selección continua (pills en start/end, strip sin radius en middle) es el patrón universal. Airbnb popularizó este pattern; todos los T1 lo usan en sus range pickers.
4. **Spectrum RangeCalendar separado** — Spectrum separa `Calendar` (single) y `RangeCalendar` (range) como componentes distintos. La razón: ARIA semántico difiere (activedescendant para hover preview del range). La mayoría del mercado prefiere una prop `mode`.

---

## Tokens

**26 tokens** · prefijo `cal-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `cal/sm/cell` | `sizing/32` | Tamaño de celda sm |
| `cal/md/cell` | `sizing/40` | Tamaño de celda md |
| `cal/cell/radius` | `radius/pill` | Radius de cada DayCell |
| `cal/default/bg` | `surface/default` | Background del calendario |
| `cal/default/fg` | `text/primary` | Días del mes |
| `cal/hover/bg` | `brand/subtle` | Hover sobre celda |
| `cal/selected/bg` | `interactive/default` | Día seleccionado |
| `cal/selected/fg` | `text/inverse` | Texto del día seleccionado |
| `cal/today/fg` | `interactive/default` | Color del día de hoy |
| `cal/today/border` | `interactive/default` | Borde del día de hoy |
| `cal/focused/ring` | `focus/ring` | Focus ring del día |
| `cal/disabled/fg` | `text/disabled` | Días deshabilitados |
| `cal/other-month/fg` | `text/subtlest` | Días del mes adyacente |
| `cal/range-middle/bg` | `brand/subtle` | Días en rango middle |
| `cal/range-start/bg` | `interactive/default` | Día inicio del rango |
| `cal/range-end/bg` | `interactive/default` | Día fin del rango |
| `cal/cell/fontSize/sm` | `type/xs` | Font size celda sm |
| `cal/cell/fontSize/md` | `type/sm` | Font size celda md |
| `cal/header/fontSize/compact` | `type/sm` | Font size header compact |
| `cal/header/fontSize/comfortable` | `type/md` | Font size header comfortable |
| `cal/header/fontSize/fullscreen` | `type/xl` | Font size header fullscreen |
| `cal/weekday/fg` | `text/secondary` | Día de la semana |
| `cal/weekday/fontSize` | `type/xs` | Font size día semana |
| `cal/weekday/fontWeight` | `type/weight-medium` | Peso día semana |
| `cal/padding/compact` | `spacing/3` | Padding scale compact |
| `cal/padding/comfortable` | `spacing/4` | Padding scale comfortable |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Scale compact:     w:280px · padding:12px · header:14px │
│  Scale comfortable: w:320px · padding:16px · header:16px │
│  Scale fullscreen:  w:100%  · padding:24px · header:20px │
│                                                          │
│  DayCell sm: 32×32px · font:12px                        │
│  DayCell md: 40×40px · font:14px                        │
│                                                          │
│  Grid: 7 columnas × 6 filas = 42 celdas + 1 fila header │
│                                                          │
│  Sub-componentes:                                        │
│  DayCell:  State(10) × Size(2) = 20 frames              │
│  Calendar: Mode(2) × Scale(3) × Months(2) ×             │
│            WeekNums(2) = 24 gross − 8 = 16 frames       │
│                                                          │
│  Frames totales: 20 + 16 = 36 frames                    │
└──────────────────────────────────────────────────────────┘
```
