# DateRangePicker

## Descripción general

DateRangePicker es el selector de rango de fechas del sistema de diseño: combina dos inputs de fecha (inicio y fin), un panel de presets ("Últimos 7 días", "Este mes"), y un Calendar con Mode=range visible en popover o inline. A diferencia de dos DatePicker independientes, DateRangePicker coordina la selección de ambas fechas, valida que el inicio sea anterior al fin, y permite confirmar explícitamente con un botón Apply. Es el patrón estándar para filtros de analytics, rangos fiscales, períodos de reporte, y cualquier selección de "de X a Y".

```
Size=md, Layout=popover (trigger cerrado):
┌────────────────────────────────────────────────────────────┐
│  [📅] 14 abril 2026    →    [📅] 20 abril 2026      [×]   │  h:40px
└────────────────────────────────────────────────────────────┘

Layout=popover (abierto):
┌─────────────────────────────────────────────────────────────────────────┐
│  [📅] 14 abril 2026    →    [📅] 20 abril 2026      [×]                │
├──────────────────┬──────────────────────────────────────────────────────┤
│  Presets         │  ‹   abril 2026   ›    ‹   mayo 2026   ›            │
│                  │  Lu Ma Mi Ju Vi Sá Do   Lu Ma Mi Ju Vi Sá Do        │
│  Today           │  ...  [14]════════════════════════[20] ...          │
│  Yesterday       ├─────────────────────────────────────────────────────┤
│ ● Last 7 days    │               [Cancelar]  [Aplicar rango]           │
│  This month      │                                                     │
│  Last month      │                                                     │
│  Last quarter    │                                                     │
└──────────────────┴─────────────────────────────────────────────────────┘

Layout=inline (siempre visible, dashboard):
┌──────────────────┬──────────────────────────────────────────────────────┐
│  Presets         │  ‹   abril 2026   ›    ‹   mayo 2026   ›            │
│  Today           │  (Calendar Mode=range, VisibleMonths=2)             │
│ ● Last 7 days    │                                                     │
│  ...             ├─────────────────────────────────────────────────────┤
│                  │   14/04/2026  →  20/04/2026    [Aplicar rango]      │
└──────────────────┴─────────────────────────────────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes en PresetItem (building block):

```
State → default | hover | selected | focused
Size  → sm | md
```

Variantes en DateRangePicker:

```
State  → default | focused | open | error | disabled
Size   → sm | md | lg
Picker → date | month | quarter | year
Layout → inline | popover
```

Toggles:

```
👁 Show Presets Panel  → muestra/oculta la columna de presets (default: on)
👁 Show Apply Button   → muestra/oculta el botón Apply explícito (default: on)
👁 Show Separator      → muestra/oculta el separador → entre inputs (default: on)
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  DateRangePicker                                         │
│  ──────────────────────────────────────────────────────  │
│  State   [ default         ▼ ]                           │
│  Size    [ md              ▼ ]                           │
│  Picker  [ date            ▼ ]                           │
│  Layout  [ popover         ▼ ]                           │
│  ──────────────────────────────────────────────────────  │
│  👁 Show Presets Panel  [ on  ]                          │
│  👁 Show Apply Button   [ on  ]                          │
│  👁 Show Separator      [ on  ]                          │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El usuario necesita seleccionar un rango de fechas?
                    │
                    ▼
       ¿Qué granularidad?
       ├── Días → Picker=date
       ├── Meses → Picker=month (reporting mensual)
       ├── Trimestres → Picker=quarter (fiscal)
       └── Años → Picker=year (comparativa anual)
                    │
                    ▼
       ¿El selector es siempre visible?
       ├── Sí → Layout=inline (dashboard)
       └── No → Layout=popover (forms, filters)
```

**Usar DateRangePicker cuando:**
- Filtro de analytics ("del 1 al 30 de abril")
- Rango de fechas para exportar un reporte
- Disponibilidad de habitación/recurso (check-in / check-out)
- Período fiscal (Q1-Q2 2026) — Picker=quarter
- Comparativa de años anteriores — Picker=year

**NO usar DateRangePicker cuando:**
- Solo se necesita una fecha → usar `DatePicker`
- El rango es de horas → usar dos `TimePicker`
- Las fechas son independientes y sin relación de rango → dos `DatePicker`

---

## Variaciones visuales

### PresetItem sizes

| Size | Height | PaddingX | FontSize | Radius |
|------|--------|---------|---------|--------|
| sm   | 28px   | 10px    | 12px    | 6px    |
| md   | 32px   | 12px    | 13px    | 6px    |

### DateRangePicker sizes

| Size | Input Height | FontSize | Presets Width | Calendar Width |
|------|-------------|---------|--------------|---------------|
| sm   | 32px        | 13px    | 140px        | 560px         |
| md   | 40px        | 14px    | 160px        | 640px         |
| lg   | 48px        | 16px    | 180px        | 720px         |

### States del trigger (inputs)

| State | Border | Background | Notas |
|-------|--------|-----------|-------|
| default | border/default | surface/default | Closed |
| focused | border/focus (azul) | surface/default | Input activo |
| open | border/focus | surface/default | Dropdown visible |
| error | border/error (rojo) | surface/default | Rango inválido |
| disabled | border/disabled | surface/disabled | No interactivo |

### Picker types

| Picker | Granularidad | Grid visible | Uso |
|--------|------------|-------------|-----|
| date | Días | Calendario mensual | Reservas, analytics diario |
| month | Meses | Grid de meses (año) | Reporting mensual |
| quarter | Trimestres | Grid de trimestres | Fiscal, performance Q1-Q4 |
| year | Años | Grid de años | Comparativa histórica |

---

## Decisiones de diseño

**1. Three-zone layout (inputs + presets + calendar)** — el layout canónico de Polaris + Ant: inputs arriba, presets a la izquierda (shortcuts), y calendar con 2 meses. Este layout es el más usado en dashboards analytics porque reduce el número de clicks para rangos comunes.

**2. Layout: inline o popover** — inline para dashboards always-visible (el filtro es el protagonista); popover para forms y filtros compactos (el trigger es un input field). Property explícita genera ambos layouts.

**3. Picker: date/month/quarter/year** — enterprise reporting necesita rangos de meses (Q1-Q2), trimestres fiscales, años. Ant Design cubre los 4; M3 y Spectrum solo date. Zoom tiene reporting features que necesitan los 4 niveles.

**4. Calendar es slot externo** — reutiliza el Calendar component con Mode=range y VisibleMonths=2. Evita duplicar la lógica de day-cell en este config. El consumer compone con Calendar.

**5. Explicit Apply button opt-in** — Polaris research: los usuarios modifican el rango múltiples veces antes de confirmar; auto-close on second pick confunde. Ant tiene `needConfirm`. Modelado como boolean Show Apply Button.

**6. Presets como sub-component PresetItem** — el panel de presets tiene estado interactivo (hover/selected) que merece sub-component. Lista de PresetItem verticalmente alineada. Facilita custom presets del consumer.

### Combinaciones excluidas

```
Layout=inline + State=open (inline siempre está abierto)
Picker=quarter|year + Show Presets Panel (presets menos útiles en rangos grandes)
```

---

## Comportamiento

### Esencial para diseño

- **Layout=popover: trigger doble** — los dos inputs son el trigger. Click en cualquiera de ellos abre el popover con el calendario.
- **Hover preview del rango** — mientras el usuario mueve el cursor sobre las celdas del calendario (después de seleccionar el inicio), las celdas se pre-iluminan en brand/subtle mostrando el rango tentativo. Patrón Spectrum.
- **Preset seleccionado → llena inputs** — al hacer click en un PresetItem, los dos inputs se llenan con las fechas calculadas y el calendario muestra el rango correspondiente.
- **Validación de rango** — si la fecha de inicio es posterior a la fin, State=error en los inputs.
- **Apply button** — la confirmación solo ocurre con click en Apply (o Enter en Apply). Cerrar el popover sin Apply cancela la selección tentativa.
- **Cancel button** — revierte al último rango confirmado y cierra el popover.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Container | `role="group"` + `aria-label="Rango de fechas"` | SR anuncia el grupo |
| Start input | `aria-label="Fecha inicio"` | SR diferencia los dos inputs |
| End input | `aria-label="Fecha fin"` | SR diferencia los dos inputs |
| Popover calendar | `role="dialog"` + `aria-modal="false"` | SR anuncia como overlay |
| Preset items | `role="button"` + `aria-label` con rango completo | SR anuncia el rango del preset |
| Error | `aria-invalid="true"` + `aria-errormessage` en ambos inputs | SR anuncia el error |
| Apply | `aria-label="Aplicar rango [inicio] al [fin]"` | SR confirma el rango |

### Navegación por teclado

```
Tab             → start input → end input → calendar → presets → apply/cancel
Arrow keys      → navega días en el calendar
Page Up/Down    → mes anterior/siguiente en el calendar
Enter           → selecciona fecha, luego selecciona fin del rango
Escape          → cierra popover (Layout=popover) sin confirmar
```

---

## Guía de contenido

**Presets estándar:**
- Hoy, Ayer
- Últimos 7 días, Últimos 30 días, Últimos 90 días
- Esta semana, Semana pasada
- Este mes, Mes pasado
- Este trimestre, Trimestre pasado
- Este año, Año pasado

**Input placeholders:**
- "DD/MM/AAAA" (no "Selecciona fecha")
- Para rangos de meses: "MMM AAAA" (ej. "Ene 2026")

**Apply button:**
- "Aplicar" o "Aplicar rango"
- No "OK", "Listo", o "Confirmar"

**Error text:**
- Rango inválido: "La fecha de inicio debe ser anterior a la fecha de fin"
- Rango requerido: "Selecciona un rango de fechas"

---

## Pre-build checklist

```
□ ¿role="group" + aria-label en el container?
□ ¿Inputs con aria-label="Fecha inicio" / "Fecha fin"?
□ ¿Layout=popover: calendar role="dialog"?
□ ¿Preset items: role="button" + aria-label con rango descriptivo?
□ ¿Error: aria-invalid en ambos inputs + aria-errormessage?
□ ¿Apply: aria-label con rango confirmado?
□ ¿Hover preview de rango tentativo?
□ ¿Show Apply Button: confirmación explícita (no auto-close)?
□ ¿Escape cierra sin confirmar?
□ ¿Focus trap en popover (Layout=popover)?
□ ¿Preset seleccionado: aria-pressed="true"?
```

---

## Componentes relacionados

```
Calendar       → primitivo subyacente (Mode=range, VisibleMonths=2)
DatePicker     → para selección de fecha única
TimePicker     → para rango de tiempo (composición con DateRangePicker)
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Presets | Picker types | Apply | ARIA | Diferenciador |
|---------|-------|---------|-------------|-------|------|--------------|
| **Material Design 3** | DateRangePicker | No | date | No | dialog+grid | Inline range en DatePicker modal |
| **Spectrum (Adobe)** | DateRangePicker | No | date | No | group+grid | Hover preview; internationalization |
| **Carbon (IBM)** | DatePicker range | No | date | No | grid | Tipo range en mismo DatePicker |
| **Polaris (Shopify)** | DateRangePicker | Sí | date | Sí | group | 3-zone layout; explicit Apply; research-backed |
| **Atlassian** | DateRange (via DS) | No nativo | date | No | group | Dos pickers independientes |
| **Ant Design** | RangePicker | Sí | date/month/quarter/year | needConfirm prop | group | Más completo del mercado; 4 picker types |
| **Twilio Paste** | — | — | — | — | — | Sin componente dedicado |
| **shadcn/ui** | DateRangePicker | Sí (custom) | date | No | — | Compose con Calendar mode="range" |
| **Fluent 2** | DateRangePicker | No | date | No | group | value=[start,end] |
| **Mantine** | DatePickerInput (type=range) | Sí (preset) | date/month/year | No | group | RangeSeparator; allowDeselect |
| **React Aria** | RangeCalendar | No | date | No | grid | Full ARIA; internationalization |

**Patrones clave de la industria:**
1. **Polaris 3-zone layout** — el más documentado: inputs (triggers), presets (shortcuts), calendar (2 meses). Respaldado por UX research de Shopify merchants que usan rangos comunes frecuentemente.
2. **Ant Design RangePicker** — el más completo: 4 picker types (date/month/quarter/year), presets, needConfirm prop, hover preview. Referencia de API para implementación.
3. **Spectrum hover preview** — mientras el usuario mueve el cursor, el rango se pre-ilumina. Requiere `onHoverChange` callback + estado local del hover. Mejora significativamente la UX de selección de rangos.
4. **Explicit Apply (Polaris/Ant needConfirm)** — patrón confirmado por research: usuarios de analytics ajustan el rango múltiples veces. Auto-close on second pick genera clics accidentales. Apply como confirmación explícita reduce errores.

---

## Tokens

**32 tokens** · prefijo `drp-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `drp/input/sm/h` | `sizing/32` | Altura trigger size sm |
| `drp/input/md/h` | `sizing/40` | Altura trigger size md |
| `drp/input/lg/h` | `sizing/48` | Altura trigger size lg |
| `drp/default/border` | `border/default` | Borde default |
| `drp/default/bg` | `surface/default` | Background default |
| `drp/focused/border` | `border/focus` | Borde focused |
| `drp/focused/ring` | `focus/ring` | Focus ring |
| `drp/open/border` | `border/focus` | Borde cuando open |
| `drp/open/shadow` | `elevation/3` | Sombra del popover |
| `drp/error/border` | `border/error` | Borde error |
| `drp/disabled/bg` | `surface/disabled` | Background disabled |
| `drp/disabled/opacity` | `opacity/disabled` | Opacidad disabled |
| `drp/preset/default/fg` | `text/primary` | Preset default |
| `drp/preset/hover/bg` | `surface/hover` | Preset hover |
| `drp/preset/selected/bg` | `brand/subtle` | Preset selected bg |
| `drp/preset/selected/fg` | `interactive/default` | Preset selected fg |
| `drp/preset/focused/ring` | `focus/ring` | Preset focus ring |
| `drp/preset/radius` | `radius/md` | Radius de preset item |
| `drp/separator/fg` | `text/secondary` | Flecha separadora |
| `drp/calendar/w/sm` | `sizing/560` | Calendar width sm |
| `drp/calendar/w/md` | `sizing/640` | Calendar width md |
| `drp/calendar/w/lg` | `sizing/720` | Calendar width lg |
| `drp/presets/w/sm` | `sizing/140` | Presets panel sm |
| `drp/presets/w/md` | `sizing/160` | Presets panel md |
| `drp/presets/w/lg` | `sizing/180` | Presets panel lg |
| `drp/gap/sm` | `spacing/3` | Gap entre zonas sm |
| `drp/gap/md` | `spacing/4` | Gap entre zonas md |
| `drp/gap/lg` | `spacing/5` | Gap entre zonas lg |
| `drp/fontSize/sm` | `type/sm` | Font size sm |
| `drp/fontSize/md` | `type/md` | Font size md |
| `drp/fontSize/lg` | `type/lg` | Font size lg |
| `drp/preset/selected/fontWeight` | `type/weight-semibold` | Preset selected weight |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Trigger sm: h:32px · font:13px                          │
│  Trigger md: h:40px · font:14px                          │
│  Trigger lg: h:48px · font:16px                          │
│                                                          │
│  Layout popover (abierto):                               │
│  ┌──────────────────────────────────────┐                │
│  │  [Presets 160px] │ [Calendar 640px]  │  Size md       │
│  └──────────────────────────────────────┘                │
│                                                          │
│  Sub-componentes:                                        │
│  PresetItem:       State(4) × Size(2) = 8 frames        │
│  DateRangePicker:  State(5) × Size(3) × Picker(4) ×     │
│                    Layout(2) = 120 − 40 = 80 frames     │
│                                                          │
│  Frames totales: 8 + 80 = 88 frames                     │
└──────────────────────────────────────────────────────────┘
```
