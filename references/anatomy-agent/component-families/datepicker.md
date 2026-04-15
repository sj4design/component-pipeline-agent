# DatePicker Family — Component Data

Source: Research Agent output (6 Tier 1 design systems analyzed)
Systems: Material Design 3, Spectrum (Adobe), Ant Design, Carbon (IBM), Atlassian DS, Fluent UI

## Hierarchy

```
Calendar ──┬── DatePicker
           └── RangeCalendar ── DateRangePicker
```

**Architecture rationale:**
Spectrum is the only architecture that supports all 4 modes (single/range × popover/inline).
Calendar as a standalone primitive enables this. The research confirms: "Option A is the
only correct architecture for the full scope."

| Component        | Extends         | Role                                              |
|------------------|-----------------|---------------------------------------------------|
| Calendar         | —               | Grid de fechas navegable. La base de la familia.   |
| DatePicker       | Calendar        | Input + popover que envuelve Calendar              |
| RangeCalendar    | Calendar        | Extiende Calendar con selección de rango           |
| DateRangePicker  | RangeCalendar   | Dual-input + presets + apply que envuelve RangeCalendar |

## Color palette

```js
const COLORS = {
  calendar:        { color: "#534AB7", bg: "#EEEDFE", border: "#AFA9EC" },
  datepicker:      { color: "#0F6E56", bg: "#E1F5EE", border: "#5DCAA5" },
  rangecalendar:   { color: "#185FA5", bg: "#E6F1FB", border: "#85B7EB" },
  daterangepicker: { color: "#993C1D", bg: "#FAECE7", border: "#F0997B" },
};
```

---

## Calendar — 3 slots

### `header` · required · consensus 6/6
Barra de navegación completa: título mes/año + controles prev/next.
- Regiones internas: `title`, `nav-control`
- Estados: —
- Notes: Los 6 sistemas tienen esta estructura. M3, Spectrum y Ant usan el header
  para toggle de vista (mes/año). `nav-prev` y `nav-next` son regiones de
  `nav-control`, no slots propios.

### `grid` · required · consensus 6/6
Tabla 7×5 de fechas (7 columnas por día de la semana, hasta 6 filas por mes).
- Regiones internas: `weekday-labels`
- Estados: —
- Notes: `weekday-labels` (Lu, Ma, Mi...) es región interna porque no es
  reemplazable vía API — solo cambia por locale.

### `day-cell` · required · consensus 6/6
Celda individual por fecha. Elemento interactivo principal del calendario.
- Regiones internas: —
- Estados: `default`, `today`, `selected`, `disabled`, `focused`
- Notes: `today-indicator` y `selected` son variantes visuales, no slots propios
  → van al Variant Matrix. Research: "Today is always visually marked, and always
  distinctly from selected" (consensus 6/6).

### Wireframe reference — Calendar
```
┌──────────────────────────────────────┐
│  ◄   header: "Marzo 2026"    ►      │ ← header slot
│  title         nav-control          │
├──────────────────────────────────────┤
│  Lu  Ma  Mi  Ju  Vi  Sá  Do        │ ← weekday-labels (region of grid)
├──────────────────────────────────────┤
│  ·   ·   ·   ·   ·   1   2         │
│  3   4   5   6   7   8   9         │
│  10  11  12  13  14  15  16        │ ← grid slot
│  17  18  19  20  21  22  23        │
│  24  25  26 [27]  28  29  30       │ ← day-cell slot ([27] = today state)
│  31  ·   ·   ·   ·   ·   ·         │
└──────────────────────────────────────┘
```

---

## DatePicker — 4 own slots (hereda 3 de Calendar = 7 total)

### `label` · optional · consensus 5/6
Etiqueta accesible del campo. Texto que identifica el propósito del datepicker.
- Regiones internas: —
- Estados: —
- Notes: Carbon y Atlassian la hacen required. Los demás la hacen optional pero
  fuertemente recomendada para a11y.

### `input` · required · consensus 6/6
Campo de texto con trigger integrado. El usuario puede escribir la fecha o
hacer click en el ícono para abrir el calendario.
- Regiones internas: `trigger`
- Estados: —
- Notes: `trigger` es el ícono/botón dentro del input que abre el popover.
  Es región interna porque no se reemplaza externamente — siempre es un ícono
  de calendario.

### `popover-container` · required · consensus 6/6
Overlay flotante que envuelve el Calendar cuando se abre desde el input.
- Regiones internas: —
- Estados: —
- Notes: Es el contenedor del calendario en modo popover. En modo inline,
  este slot no existe (Calendar se renderiza directamente).

### `error-message` · optional · consensus 4/6
Texto de validación que aparece debajo del input cuando hay un error.
- Regiones internas: —
- Estados: —
- Notes: M3 y Spectrum lo manejan con helper-text genérico. Carbon y Atlassian
  tienen un slot específico de error.

### Wireframe reference — DatePicker
```
  label: "Fecha de nacimiento"          ← label slot (optional)
┌──────────────────────────────┐
│  DD / MM / AAAA        📅   │        ← input slot (trigger = 📅)
└──────────────────────────────┘
  "Formato inválido"                    ← error-message slot (optional)
         │
         ▼ (popover-container)
┌──────────────────────────────┐
│  ◄  Marzo 2026  ►           │
│  Lu Ma Mi Ju Vi Sá Do       │        ← Calendar heredado
│  ...calendar grid...        │
└──────────────────────────────┘
```

---

## RangeCalendar — 1 own slot (hereda 3 de Calendar = 4 total)

### `range-fill` · required · consensus 5/6
Franja de fondo entre inicio y fin del rango dentro del grid.
- Regiones internas: —
- Estados: —
- Notes: Es el highlight visual que conecta la fecha de inicio con la de fin.
  Spectrum y M3 lo implementan como una capa de background.
  Los endpoints (inicio/fin) son estados de `day-cell`, no slots propios.

### Wireframe reference — RangeCalendar
```
┌──────────────────────────────────────┐
│  ◄   header: "Marzo 2026"    ►      │
├──────────────────────────────────────┤
│  Lu  Ma  Mi  Ju  Vi  Sá  Do        │
├──────────────────────────────────────┤
│  ·   ·   ·   ·   ·   1   2         │
│  3   4   5   6   7   8   9         │
│  10  11 [12██████████████17] 18     │ ← range-fill between endpoints
│  19  20  21  22  23  24  25        │
│  26  27  28  29  30  31  ·         │
└──────────────────────────────────────┘
         [12] = range-start (state of day-cell)
         [17] = range-end (state of day-cell)
         ████ = range-fill slot
```

---

## DateRangePicker — 4 own slots (hereda 4 de RangeCalendar = 8 total)

### `dual-input` · required · consensus 5/6
Par de campos inicio/fin como unidad visual. Funciona como un solo control.
- Regiones internas: `start-input`, `end-input`, `input-separator`
- Estados: —
- Notes: Spectrum y Carbon lo implementan como dos inputs visualmente conectados.
  `input-separator` es el divisor visual (flecha, dash, "a") entre los campos.

### `dual-calendar` · optional · consensus 4/6
Segundo mes en vista paralela. Muestra dos meses lado a lado para
facilitar selección de rangos largos.
- Regiones internas: —
- Estados: —
- Notes: Spectrum, Ant y Atlassian lo incluyen. M3 no (usa navegación mes a mes).
  Es opcional porque rangos cortos no lo necesitan.

### `preset-panel` · optional · consensus 3/6
Panel con rangos predefinidos (Últimos 7 días, Este mes, etc.).
- Regiones internas: `preset-item`
- Estados: —
- Notes: ⚠️ Consenso bajo (3/6). Solo Ant, Atlassian y Carbon lo incluyen.
  Spectrum y M3 no tienen presets como slot del componente.
  Evaluar si tu DS lo necesita.

### `apply-footer` · optional · consensus 3/6
Barra con botones Aplicar/Cancelar. Requiere confirmación explícita del rango.
- Regiones internas: —
- Estados: —
- Notes: ⚠️ Consenso bajo (3/6). Ant y Carbon lo incluyen.
  La mayoría aplica el rango inmediatamente al seleccionar el endpoint final.
  Útil cuando hay presets o cuando se quiere validación antes de aplicar.

### Wireframe reference — DateRangePicker
```
  ┌─────────────────────┬──┬─────────────────────┐
  │  01 / 03 / 2026     │→ │  15 / 03 / 2026     │  ← dual-input
  │  (start-input)      │  │  (end-input)        │
  └─────────────────────┴──┴─────────────────────┘
            │                    input-separator = →
            ▼
  ┌───────────────────────────────────────────────────────────────┐
  │ ┌──────────────┐  ┌──────────────────┬──────────────────┐    │
  │ │ Últimos 7d   │  │  ◄ Marzo 2026    │    Abril 2026 ►  │    │
  │ │ Últimos 30d  │  │  Lu Ma Mi ...    │    Lu Ma Mi ...  │    │
  │ │ Este mes     │  │  ...grid...      │    ...grid...    │    │
  │ │ Último trim  │  │                  │                  │    │
  │ │ (preset-panel)│  │ (calendar)       │ (dual-calendar)  │    │
  │ └──────────────┘  └──────────────────┴──────────────────┘    │
  │                                                               │
  │                              [ Cancelar ]  [ Aplicar ]        │
  │                              (apply-footer)                   │
  └───────────────────────────────────────────────────────────────┘
```
