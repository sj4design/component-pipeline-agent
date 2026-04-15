# DatePicker

## Overview

El DatePicker es un selector de fecha compuesto por un trigger (input con icono de calendario) y un panel de calendario dropdown. Soporta seleccion de fecha individual y rango. El calendario usa un grid mensual con navegacion por flechas.

```
  Label
  ┌──────────────────────────────┐
  │ Select date              [📅]│   ← trigger
  └──────────────────────────────┘
  Helper text
         │
         ▼ al hacer click
  ┌──────────────────────────────┐
  │  ◄    Marzo 2026         ►   │   ← .MonthGrid
  │  Lu Ma Mi Ju Vi Sa Do       │
  │              1  2  3        │
  │   4  5  6  7  8  9 10      │
  │  11 12 13 14 ●15 16 17      │   ← .DayCell
  │  18 19 20 21 22 23 24      │
  │  25 26 27 28 29 30 31      │
  └──────────────────────────────┘
```

Tiene tres piezas: **.DayCell** (celda individual de dia), **.MonthGrid** (grid mensual con navegacion), y **DatePicker** (trigger + calendario). El trigger comparte anatomia con el Input — misma altura, padding, radius — para alineacion en formularios.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  DatePicker:
  Tipo          single · range                    Una fecha o rango de fechas
  Estado        default · hover · focus · open · error · disabled

  .DayCell:
  DayState      default · today · selected · range-middle · disabled · outside-month
  Estado        default · hover · focus · disabled
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☐ Helper text       Texto de ayuda debajo del trigger              texto editable
```

### Panel de propiedades en Figma

```
┌─ DatePicker ─────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ Type  ▼ single │ │ State ▼ def..│ │
│  └────────────────┘ └──────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☐ Helper Text                       │
│                                      │
│  Text Properties                     │
│  ✏️ Label   [ Date            ]      │
│  ✏️ Value   [ Select date     ]      │
│  ✏️ Helper  [ MM/DD/YYYY      ]      │
│                                      │
└──────────────────────────────────────┘

┌─ .DayCell ───────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ DayState ▼ def │ │ State ▼ def..│ │
│  └────────────────┘ └──────────────┘ │
│                                      │
│  Text Properties                     │
│  ✏️ Day     [ 15             ]       │
│                                      │
└──────────────────────────────────────┘

┌─ .MonthGrid ─────────────────────────┐
│                                      │
│  Text Properties                     │
│  ✏️ Month   [ March 2026     ]       │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿El usuario necesita seleccionar una fecha?
  │
  ├─ Fecha especifica con calendario visual → usa DatePicker ✓
  │
  ├─ Fecha conocida (cumpleanos, fecha historica) → usa Input con mascara
  │
  ├─ Rango de fechas con visualizacion → usa DatePicker (range) ✓
  │
  ├─ Semana, mes o trimestre → usa selector especializado
  │
  └─ Fecha + hora → usa DateTimePicker (componente separado)
```

**Usa DatePicker cuando:**
- El usuario selecciona una fecha futura o reciente (reservas, deadlines, filtros)
- El contexto visual del calendario ayuda a la decision (ver dias de la semana, relacion con hoy)
- Necesitas restringir fechas disponibles (min/max, dias habiles)

**NO uses DatePicker cuando:**
- La fecha es conocida y lejana (cumpleanos 1985) → Input con mascara es mas rapido
- Solo necesitas mes/ano → usa un selector simplificado
- Necesitas hora ademas de fecha → DateTimePicker separado
- El publico es mobile-first y el calendario custom rinde mal → considerar selector nativo del OS (recomendacion GOV.UK)

---

## Variaciones visuales

### Tipo

```
  single                                 range
  ┌──────────────────────────┐           ┌──────────────┐ ┌──────────────┐
  │ 15/03/2026           [📅]│           │ 15/03/2026   │ │ 20/03/2026   │
  └──────────────────────────┘           └──────────────┘ └──────────────┘
       │                                      │
       ▼                                      ▼
  ┌──────────────────────────┐           ┌──────────────────────────────┐
  │  ◄   Marzo 2026      ►  │           │  ◄   Marzo 2026          ►  │
  │  Lu Ma Mi Ju Vi Sa Do   │           │  Lu Ma Mi Ju Vi Sa Do       │
  │  11 12 13 14 ●15 16 17  │           │  11 12 13 14 ■15 16 17      │
  │  18 19 20 21 22 23 24   │           │  18 19 ▓▓ ▓▓ ■20 21 22      │
  └──────────────────────────┘           └──────────────────────────────┘
  ● = seleccionada                       ■ = inicio/fin  ▓ = rango medio
```

### Estados del trigger

```
  default                hover                  focus
  ┌────────────────────┐ ┌────────────────────┐ ╔════════════════════╗
  │ Select date    [📅]│ │ Select date    [📅]│ ║ Select date    [📅]║
  └────────────────────┘ └────────────────────┘ ╚════════════════════╝
  borde gris              borde gris oscuro      ring azul 2px

  open                   error                  disabled
  ╔════════════════════╗ ┌────────────────────┐ ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
  ║ 15/03/2026     [📅]║ │ Select date    [📅]│ ╎ Select date    [📅]╎
  ╚════════════════════╝ └────────────────────┘ └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
  ring + calendario       borde rojo              opacity 50%
```

### Estados del DayCell

```
  default     today       selected    range-mid   disabled    outside
  ┌────┐      ┌────┐      ┌────┐      ┌────┐     ┌────┐      ┌────┐
  │ 15 │      │ 15 │      │ 15 │      │ 17 │     │ 15 │      │ 28 │
  └────┘      └────┘      └────┘      └────┘     └────┘      └────┘
  texto negro  borde azul  fondo azul  fondo azul  texto gris  texto gris
               circulo     texto blanco claro      claro       muy claro
```

---

## Decisiones de diseno

### 1. Tres sub-componentes con responsabilidades claras

Spectrum separa en 4 componentes (DatePicker, DateRangePicker, Calendar, RangeCalendar). Ant Design unifica todo en uno. Carbon usa Flatpickr. Nosotros: 3 piezas (.DayCell, .MonthGrid, DatePicker). DayCell encapsula los 6 estados de dia sin multiplicar variantes del padre. MonthGrid tiene navegacion propia. DatePicker compone trigger + panel.

### 2. DayCell con DayState + State — dos ejes independientes

El dia puede ser "today" Y "hover" simultaneamente. Separar DayState (que ES el dia) de State (interaccion actual) evita la explosion combinatoria de un solo eje. DayState=disabled + State=hover es excluido porque un dia deshabilitado no reacciona a hover.

### 3. El trigger comparte ADN con el Input

M3 formalizo esto: el trigger de fecha ES un text field que abre calendario. Mismos tokens, misma altura, mismo label, mismo helper text. Garantiza alineacion perfecta en formularios mixtos con Inputs y DatePickers.

### 4. Single y Range en el mismo componente

Atlassian NO tiene DateRangePicker — argumenta que dos DatePickers con validacion cruzada son mejores. Ant Design lo unifica. Nosotros: un componente con Type (single/range) porque el calendario y el trigger son los mismos, solo cambia el comportamiento de seleccion.

### Combinaciones excluidas

```
  DayState=disabled + State=hover       disabled bloquea interaccion
  DayState=outside-month + State=hover  fuera del mes no es interactivo
```

---

## Comportamiento

### Lo esencial para disenar

1. **Escape siempre cierra.** El calendario se cierra y el foco vuelve al trigger. Sin excepcion.

2. **El calendario abre hacia donde hay espacio.** Si no cabe abajo, abre arriba. En Figma, mostrarlo abajo por default.

3. **Today es siempre visible.** `aria-current="date"` marca el dia actual con borde azul. El usuario siempre puede orientarse en el tiempo.

4. **Range requiere dos clicks.** Primer click = inicio, segundo click = fin. El rango intermedio se destaca con fondo azul claro. En Figma, mostrar el estado con rango seleccionado.

5. **Considerar input de texto alternativo.** La investigacion de Spectrum muestra que campos de texto libre para fechas tienen 23% de tasa de error. Los segmentos editables (spinbutton) reducen eso al 2%. Para accesibilidad, siempre ofrecer una alternativa de teclado al calendario visual.

6. **Mobile: evaluar selector nativo.** GOV.UK confirma que `<select>` nativo es mas confiable en mobile. Si el publico es mobile-first, considerar el picker del OS.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Trigger | `combobox` o `button` | `aria-expanded`, `aria-haspopup` | SR anuncia "selector de fecha, colapsado" |
| Calendario | `grid` | `aria-label="Marzo 2026"` | SR anuncia el grid como calendario |
| Celda de dia | `gridcell` | `aria-selected`, `aria-disabled` | SR anuncia "15 de marzo, seleccionado" |
| Dia actual | `gridcell` | `aria-current="date"` | SR distingue el dia de hoy del resto |
| Nav prev/next | `button` | `aria-label="Mes anterior"` | SR anuncia la accion de navegacion |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  Tab                   foco llega al trigger
  Enter / Space         abre calendario, foco en dia seleccionado (o hoy)
  ← → ↑ ↓              navega entre dias (highlight visible)
  Enter                 selecciona dia → cierra (single) o continua (range)
  Escape                cierra sin seleccionar → foco vuelve al trigger
```

Interacciones secundarias (referencia para dev):

```
  Page Up / Down        mes anterior / siguiente
  Shift + Page Up/Down  ano anterior / siguiente
  Home / End            inicio / fin de semana
```

---

## Guia de contenido

**Label:** Breve y descriptivo. "Fecha de entrega", "Fecha de inicio" — no "Seleccione una fecha".

**Placeholder:** Formato esperado. "DD/MM/YYYY" o "Select date" — indica al usuario que formato usar si escribe.

**Helper text:** Explica restricciones. "Solo dias habiles" o "Maximo 30 dias desde hoy" — no dejar vacio si hay reglas.

**Error text:** Di que salio mal Y que hacer. "Selecciona una fecha futura" — no solo "Fecha invalida".

**Nombres de meses y dias:** Respetar el locale del usuario. Lunes-Domingo, Enero-Diciembre. El primer dia de la semana varia por cultura (Lunes en Europa, Domingo en US).

---

## Checklist antes de construir

```
  ☐ ¿Single o range?
    └─ Single = una fecha (deadline, nacimiento)
    └─ Range = periodo (reserva, filtro temporal)

  ☐ ¿Hay fechas deshabilitadas?
    └─ Min/max (no antes de hoy, no despues de 30 dias)
    └─ Dias especificos (fines de semana, feriados)

  ☐ ¿El formato de fecha es correcto para el locale?
    └─ DD/MM/YYYY vs MM/DD/YYYY vs YYYY-MM-DD

  ☐ ¿Hay alternativa de teclado?
    └─ Input de texto con validacion como alternativa al calendario

  ☐ ¿Mobile-first?
    └─ Considerar selector nativo del OS

  ☐ ¿Necesita helper text?
    └─ Si hay restricciones → documentarlas en helper
```

---

## Relacion con otros componentes

```
  Input          Comparte anatomia del trigger (altura, padding, radius, label)
  Select         Mismo patron trigger + dropdown, diferente contenido
  TimePicker     Para seleccion de hora — componente separado
  DateTimePicker Combina fecha + hora
  Calendar       El grid mensual puede usarse standalone (patron Polaris)
```

---

## Referencia: como lo hacen otros sistemas

**Segmentos editables (gold standard):** Spectrum — cada unidad de fecha es spinbutton. Reduce errores de formato del 23% al 2%.

**Multi-modo:** Ant Design (5 picker modes: date/week/month/quarter/year), Carbon (simple/single/range en un componente).

**Composicion:** Polaris (calendario inline + Popover + TextField — building blocks separados).

**Sin range:** Atlassian (dos DatePickers independientes con validacion cruzada — research-backed para Jira sprints).

**Consenso universal:** role="grid" en calendario, arrow keys para navegar, Escape cierra, aria-current="date" en hoy.

---

## Tokens

**32 tokens** · prefijo `dc-` / `mg-` / `dp-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--dp-trigger-bg` | `bg/surface/default` | Fondo del trigger |
| `--dp-trigger-border` | `border/mid/default` | Borde default del trigger |
| `--dp-trigger-border-focus` | `border/focus` | Borde en focus/open |
| `--dp-trigger-border-error` | `status/error/border` | Borde en error |
| `--dc-bg-selected` | `interactive/default` | Fondo dia seleccionado |
| `--dc-bg-range` | `interactive/subtle` | Fondo rango intermedio |
| `--dc-bg-hover` | `bg/surface/hover` | Fondo dia en hover |
| `--dc-fg-default` | `text/primary` | Texto dia default |
| `--dc-fg-selected` | `text/onColor` | Texto dia seleccionado |
| `--dc-fg-today` | `interactive/default` | Texto/borde dia actual |
| `--dc-fg-disabled` | `text/disabled` | Texto dia deshabilitado |
| `--dc-fg-outside` | `text/tertiary` | Texto dia fuera del mes |
| `--mg-bg` | `bg/surface/default` | Fondo del grid mensual |
| `--mg-shadow` | `elevation/2` | Sombra del panel |

### Specs de spacing

```
  ┌─ trigger ──────────────────────────────────────────┐
  │                                                     │
  │  ←12→ [value text]                    [📅 20px] ←12→│
  │       ↕ centrado vertical                           │
  │                                                     │
  └─────────────────────────────────────────────────────┘
  ←4→
  ┌─ calendar panel ───────────────────────────────────┐
  │  ←12→                                         ←12→ │
  │       [◄] ←8→ [March 2026] ←8→ [►]                │
  │  ←12→                                         ←12→ │
  │       Lu  Ma  Mi  Ju  Vi  Sa  Do                   │
  │       ┌────┐┌────┐┌────┐┌────┐...                  │
  │       │ 15 ││ 16 ││ 17 ││ 18 │                     │
  │       └────┘└────┘└────┘└────┘                     │
  │  ←12→                                         ←12→ │
  └────────────────────────────────────────────────────┘

  trigger height:      40px
  trigger padding:     12px horizontal
  trigger radius:      8px
  day cell:            36×36px · radius 9999 (circle)
  gap entre celdas:    2px
  panel padding:       12px
  panel radius:        8px
  panel shadow:        elevation level 2
  gap label↔trigger:   4px
  gap trigger↔helper:  4px
  nav icon:            20px
  weekday header font: 12px · color secondary
```
