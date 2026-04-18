# DateRangePicker

## Overview

El DateRangePicker es el componente de selección de rango de fechas para dashboards de analytics, sistemas de reservas, reportes financieros y formularios con criterios temporales. Combina dos inputs de fecha (inicio y fin), un calendario dual de dos meses, un panel opcional de presets rápidos ("Últimos 7 días", "Este mes") y un botón de confirmación configurable. Soporta dos layouts: `popover` para filtros compactos en toolbars, e `inline` para dashboards con calendario siempre visible.

```
Estado closed (Layout=popover):
┌─────────────────────────────────────────────────┐
│  📅 Mar 8, 2026    →    📅 Mar 14, 2026   [×] │
└─────────────────────────────────────────────────┘

Estado open (Layout=popover, Show Presets Panel=on):
┌──────────────────────────────────────────────────────────────────────────────┐
│  📅 Mar 8, 2026    →    📅 Mar 14, 2026                    [Cancelar][Aplicar]│
├─────────────────┬────────────────────────────────────────────────────────────┤
│  PRESETS        │   Marzo 2026            │    Abril 2026                    │
│  ─────────────  │  Lu Ma Mi Ju Vi Sá Do   │  Lu Ma Mi Ju Vi Sá Do           │
│  Hoy            │                  1  2   │   1  2  3  4  5  6  7          │
│  Ayer           │   3  4  5  6  7  8  9   │   8  9 10 11 12 13 14          │
│  Últimos 7 días │  10 11 12 13 14 15 16   │  15 16 17 18 19 20 21          │
│  Últimos 30 días│ ●═17═18═19═20═21 22 23  │  22 23 24 25 26 27 28          │
│  Este mes       │  24 25 26 27 28 29 30   │  29 30                         │
│  Mes anterior   │  31                     │                                 │
│  Trimestre actu.│                                                            │
└─────────────────┴────────────────────────────────────────────────────────────┘
  ● = range start  ═ = in-range highlight (fondo brand/subtle)
```

La familia se construye en orden: **PresetItem → DateRangePicker**. PresetItem es el sub-componente interactivo de cada shortcut de rango. DateRangePicker ensambla los inputs, el separador, el panel de presets, el calendario y los botones de acción.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
PresetItem
  State: default | hover | selected | focused
  Size:  sm | md

DateRangePicker
  State:  default | focused | open | error | disabled
  Size:   sm | md | lg
  Picker: date | month | quarter | year
  Layout: inline | popover
```

Toggles (show/hide parts — do NOT generate extra variants):

```
DateRangePicker
  👁 Show Presets Panel  → presetsPanel
  👁 Show Apply Button   → applyButton + cancelButton
  👁 Show Separator      → separator (→ o "to" entre inputs)
```

### Figma properties panel

```
╔══════════════════════════════════════════╗
║  PresetItem                              ║
╠══════════════════════════════════════════╣
║  State  ▾  default / hover /             ║
║             selected / focused           ║
║  Size   ▾  sm / md                       ║
║  ─────────────────────────────────────── ║
║  ✏️ Label   "Last 7 days"               ║
╚══════════════════════════════════════════╝

╔══════════════════════════════════════════╗
║  DateRangePicker                         ║
╠══════════════════════════════════════════╣
║  State   ▾  default / focused / open /   ║
║              error / disabled            ║
║  Size    ▾  sm / md / lg                 ║
║  Picker  ▾  date / month /               ║
║              quarter / year              ║
║  Layout  ▾  inline / popover             ║
║  ─────────────────────────────────────── ║
║  👁 Show Presets Panel  [ off ●── ]      ║
║  👁 Show Apply Button   [ off ●── ]      ║
║  👁 Show Separator      [ on  ──● ]      ║
╚══════════════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿Necesitas seleccionar un rango de fechas?
                │
                ▼
¿El usuario conoce las fechas de antemano?
  │                         │
  Sí (fechas históricas)    No (exploración)
  │                         │
  ▼                         ▼
Dos inputs de texto         DateRangePicker
(GOV.UK pattern)
                │
                ▼
¿Es una sola fecha?
  Sí → DatePicker (componente hermano)
  No
    │
    ▼
¿Necesitas presets (Últimos 7 días)?
  Sí → DateRangePicker + Show Presets Panel
  No → DateRangePicker (solo calendario)
```

**Usa DateRangePicker cuando:**
- Los usuarios necesitan seleccionar un periodo para filtrar reportes o analytics (el caso de uso más común).
- El rango es exploratorio — el usuario no sabe las fechas exactas y necesita navegar el calendario.
- Se requieren atajos de rango frecuentes como "Últimos 7 días", "Este mes", "Q1 2026" — el `presetsPanel` elimina clicks repetitivos.
- El dominio requiere rangos de meses completos, trimestres fiscales o años — usa `Picker=month|quarter|year`.
- Se necesita confirmación explícita antes de aplicar el filtro (dashboards analytics de alto tráfico) — activa `Show Apply Button`.

**Do NOT usa DateRangePicker cuando:**
- El usuario selecciona una sola fecha → usa `DatePicker`.
- Las fechas son conocidas de antemano (historial laboral, declaraciones de impuestos) → usa dos `TextInput[type=date]` con fieldset+legend (patrón GOV.UK: más rápido y accesible para fechas sabidas).
- El rango es de meses/años sin granularidad de día y se puede expresar mejor con dos select dropdowns → considera esa alternativa más simple.
- Estás en un flujo mobile-first con pantallas pequeñas → el picker dual de dos meses necesita al menos 640px de ancho; en mobile usa layout de un mes o considera bottom-sheet.

---

## Visual variations

### Tamaños

| Size | Input height | Font size | Presets width | Calendar width | Gap |
|------|-------------|-----------|---------------|----------------|-----|
| sm | 32px | 13px | 140px | 560px | 12px |
| md | 40px | 14px | 160px | 640px | 16px |
| lg | 48px | 16px | 180px | 720px | 20px |

### Estados del componente raíz

| State | Border inputs | Background | Nota visual |
|-------|--------------|-----------|-------------|
| default | `border/default` (#D0D0D9) | blanco | trigger cerrado |
| focused | `border/focus` (azul) | blanco | ring 2px, calendar no abierto aún |
| open | `border/focus` (azul) | blanco | calendar visible, shadow elevation/3 |
| error | `border/error` (#DC2626) | blanco | input con borde rojo, mensaje de error abajo |
| disabled | `border/disabled` (#E0E0E7) | `surface/disabled` | opacity 0.6, no interactivo |

### PresetItem states

| State | Background | Texto | Font weight |
|-------|-----------|-------|-------------|
| default | transparent | `text/primary` | regular |
| hover | `surface/hover` (#F8F8FC) | `text/primary` | regular |
| selected | `brand/subtle` (#EDF0FF) | `interactive/default` (azul) | 600 |
| focused | transparent + ring | `text/primary` | regular |

### Picker modes

- **date (default):** calendario de días. Dos meses lado a lado. Celdas de día individuales.
- **month:** grilla de 12 meses en vez de días. Rango de Enero a Diciembre.
- **quarter:** grilla de 4 trimestres (Q1–Q4). Para fiscal reporting.
- **year:** lista de años. Para planeación anual o historiales de múltiples años.

### Layout: inline vs. popover

**Popover (default):** Los inputs actúan como trigger. Al hacer clic/focus, el panel calendario emerge debajo con `shadow elevation/3`. El estado `open` activa el panel. Escape lo cierra.

**Inline:** El calendario está siempre visible. No hay estado `open` — el picker es permanente. Ideal para dashboards donde el filtro de fecha es la función principal de la pantalla (Polaris always-on dashboard). La exclusión `Layout=inline + State=open` refleja esto en el config.

### Range highlight en el calendario

Las celdas entre start y end reciben fondo `brand/subtle` para visualizar el rango. Solo el start y el end cell llevan `aria-selected="true"` — las celdas intermedias son visual-only. La fecha de inicio tiene borde redondeado a la izquierda; la fecha de fin lo tiene a la derecha (pill visual).

---

## Design decisions

### 1. Layout en tres zonas: inputs + presets + calendario (patrón Polaris)

**Por qué:** La convergencia de Polaris y Ant Design hacia este layout refleja investigación de usuario real: los merchantss y analistas modifican rangos múltiples veces por sesión. Tener los inputs visibles (estado actual del rango), los presets a la izquierda (shortcuts para rangos frecuentes) y el calendario a la derecha (selección precisa) reduce los clicks al mínimo para los tres patrones de uso más comunes.

**Tradeoff:** El panel combinado es ancho (640px en md). En viewports < 768px debe colapsar a layout de un mes o bottom-sheet. Documentado como responsabilidad del consumer.

### 2. Layout como property explícita (inline vs. popover)

**Por qué:** Inline para dashboards always-visible como Polaris; popover para forms y filtros compactos como M3/Ant Design. Modelar los dos layouts como una property `Layout` genera ambos en el component set sin duplicar el componente completo.

**Tradeoff:** La exclusión `Layout=inline + State=open` reduce los frames netos de 120 a 80. El consumer debe comprender que `inline` no tiene state `open`.

### 3. Picker: date / month / quarter / year (patrón completo Ant Design)

**Por qué:** Reporting enterprise necesita rangos de meses completos (billing), trimestres fiscales (Q1 2026 – Q4 2026) y años (planeación anual). M3 y Spectrum solo cubren `date`. La inclusión de los cuatro tipos via una única property `Picker` cubre el espectro completo sin componentes separados.

**Tradeoff:** La exclusión `Picker=quarter|year + ShowPresets` reduce frames porque los presets son menos útiles para rangos temporales grandes (no hay "Últimos 7 trimestres" como preset común).

### 4. Calendario como slot externo (instance-swap)

**Por qué:** El componente Calendar ya existe en el sistema con `Mode=range, VisibleMonths=2`. Reutilizarlo evita duplicar toda la lógica de celdas de día, navegación de mes y highlight de rango en este config. El consumer compone el DateRangePicker con el Calendar component actualizado.

**Tradeoff:** El diseñador debe instanciar el Calendar component correctamente en el slot. La documentación del slot es crítica para evitar inconsistencias.

### 5. Apply button opt-in (patrón Polaris / Ant needConfirm)

**Por qué:** Investigación de Shopify: los merchants modifican el rango múltiples veces explorando el calendario antes de confirmar. Auto-cerrar al seleccionar el end date confunde cuando el usuario quería navegar al mes siguiente primero. Ant Design lo implementa como `needConfirm`. Modelado como boolean `Show Apply Button` para que sea opt-in, no default.

**Tradeoff:** Sin Apply button (auto-apply) el flujo es más rápido para usuarios que saben exactamente las fechas. Documentar: activar Apply para dashboards analytics; desactivar para flujos de reservas donde la selección de end date es la acción final natural.

### 6. PresetItem como sub-componente (patrón Polaris)

**Por qué:** El panel de presets tiene estado interactivo propio (hover/selected/focused) que merece un sub-componente con sus propios estados y tokens. Una lista de PresetItems verticalmente alineados facilita que el consumer defina sus propios presets (programáticos, "Últimos N días laborales") sin modificar el DateRangePicker.

**Tradeoff:** 8 frames adicionales (State×Size) por PresetItem. El beneficio es reutilización y customización libre del panel.

### Combinaciones excluidas

```
Layout=inline + State=open           → inline siempre está abierto
Picker=quarter|year + ShowPresets    → presets menos útiles en rangos grandes
```

---

## Behavior

### Essential for design

**Flujo de selección con popover:** El usuario hace clic en el trigger → el calendario emerge (State=open, shadow elevation/3) → selecciona el start date (primera celda remarcada) → mientras mueve el cursor, se muestra el hover preview del rango tentativo — el highlight crece en tiempo real → selecciona el end date → si Show Apply Button=on, el rango queda "staging" hasta que hace clic en "Aplicar"; si es auto-apply, el popover cierra y los inputs actualizan.

**Flujo de preset:** El usuario hace clic en un PresetItem (State=selected, fondo `brand/subtle`) → los inputs se actualizan con el rango calculado → el calendario navega al mes correspondiente y resalta el rango. Si Show Apply Button=on, el preset no se aplica hasta hacer clic en Aplicar.

**Estado de error:** Ocurre cuando end < start, cuando el rango supera el máximo permitido, o cuando hay fechas inválidas en los inputs directos. Ambos inputs muestran borde rojo (`border/error`). El mensaje de error aparece debajo del trigger.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Container | `role="group"` | `aria-label="Rango de fechas"` | Anuncia contexto del grupo al SR |
| Start input | `role="textbox"` o spinbutton | `aria-label="Fecha inicio"` | Distingue los dos inputs |
| End input | `role="textbox"` o spinbutton | `aria-label="Fecha fin"` | Distingue los dos inputs |
| Calendar popover | `role="dialog"` | `aria-modal="false"` + `aria-label="Seleccionar rango"` | SR anuncia apertura del popup |
| Calendar cells | `role="gridcell"` | `aria-label="[fecha completa]"` + `aria-selected` solo en start/end | Solo endpoints llevan aria-selected |
| PresetItem | `role="button"` | `aria-label="[Nombre preset], del [fecha] al [fecha]"` | Contexto completo del rango |
| Apply button | `<button>` | `aria-label="Aplicar rango [inicio] al [fin]"` | Confirma con contexto del rango |
| Error message | `<span>` | `aria-live="polite"` | Anuncia error al validar |
| Inputs con error | inputs | `aria-invalid="true"` + `aria-errormessage` | Conecta input con mensaje |

### Keyboard navigation

Primary interactions (affect design):

```
Tab              → start input → end input → calendario → presets → apply/cancel
Escape           → cierra popover (Layout=popover únicamente)
Enter / Space    → en PresetItem: aplica preset → actualiza inputs y calendario
Arrow keys       → en calendario: día a día entre celdas
Page Up/Down     → mes anterior/siguiente en calendario
Enter/Space      → en celda de calendario: selecciona start, luego end
```

Secondary interactions (dev reference):

```
Home             → primer día del mes en calendario
End              → último día del mes en calendario
Ctrl+Page Up     → año anterior en calendario
Ctrl+Page Down   → año siguiente en calendario
Shift+Tab        → navegación inversa entre zonas
Tab              → sale del calendario hacia la zona siguiente
```

**Focus management:** Ring 2px en elemento focalizado. Focus trap activo en el popover cuando `State=open` — Tab cicla por start input → end input → celdas de calendario → presets → apply/cancel → de vuelta al inicio. Escape libera el trap y cierra el popover, devolviendo el foco al trigger.

---

## Content guide

### slot: startInput / endInput

Muestra la fecha seleccionada o el placeholder ("MM/DD/AAAA"). En `Picker=month` muestra "Ene 2026". En `Picker=quarter` muestra "Q1 2026". En `Picker=year` muestra "2026". El separador `→` o "to" entre los dos inputs debe ser visible pero no dominante — usa `text/secondary` para el separador.

### slot: separator

El separador visual entre start y end inputs. Puede ser un ícono `→` o texto "to" / "al". Usa `text/secondary` para que no compita con los valores de fecha. `Show Separator=off` aplica en designs compactos donde el contexto espacial ya implica el rango.

### slot: presetsPanel (PresetItems)

Lista vertical de PresetItems. Los labels deben ser concisos y en formato consistente:
- "Hoy" / "Ayer" — rangos de un día
- "Últimos 7 días" / "Últimos 30 días" / "Últimos 90 días" — rangos relativos
- "Esta semana" / "Este mes" / "Este trimestre" / "Este año" — períodos actuales
- "Mes anterior" / "Trimestre anterior" — períodos pasados

Para analytics, incluye los 5–7 más comunes. Evita listas de más de 10 presets — la discoverability se pierde.

### slot: calendar

Instancia del componente Calendar con `Mode=range, VisibleMonths=2`. El calendario muestra dos meses consecutivos. La navegación de mes es con flechas `←` / `→` en los headers de cada mes. En `Picker=month`, el calendario muestra una grilla de 12 meses. Las celdas del rango seleccionado reciben fondo `brand/subtle`. Las celdas de fechas no disponibles (disabled) muestran texto `text/disabled` y no son seleccionables.

### slot: applyButton / cancelButton

Solo visibles cuando `Show Apply Button=on`. Posicionados en la esquina superior derecha del panel, alineados con los inputs. "Aplicar" es la acción primaria (Button variant=primary). "Cancelar" cierra el popover sin cambiar el rango actual (Button variant=ghost o secondary). Los labels del botón deben ser concisos: "Aplicar" y "Cancelar" — evita "OK" o "Confirmar".

---

## Pre-build checklist

```
[ ] PresetItem: 8 frames netos (State×Size = 4×2)
[ ] DateRangePicker: 80 frames netos (120 gross - 40 exclusiones)
      - Verificar: Layout=inline + State=open NO existe
      - Verificar: Picker=quarter|year + ShowPresets NO existe
[ ] Tokens aplicados:
      - Input default border → drp/default/border (border/default)
      - Input focused border → drp/focused/border (border/focus)
      - Input open shadow → drp/open/shadow (elevation/3)
      - Input error border → drp/error/border (border/error)
      - Preset selected bg → drp/preset/selected/bg (brand/subtle)
      - Preset selected fg → drp/preset/selected/fg (interactive/default)
      - Focus ring → drp/focused/ring (focus/ring)
[ ] Layout=inline: sin Estado=open, calendar siempre visible
[ ] Layout=popover: Estado=open con shadow correcto
[ ] Picker=month: grilla de 12 meses (no celdas de día)
[ ] Picker=quarter: grilla Q1-Q4 (no celdas de día)
[ ] Estado error: borde rojo + aria-invalid documentado
[ ] PresetItem State=selected: fondo brand/subtle + texto azul + fontWeight=600
[ ] Calendar slot: instancia con Mode=range, VisibleMonths=2
[ ] Hover preview del rango tentativo documentado (behavior note)
[ ] Focus trap en popover documentado
[ ] Exclusiones de a11y: solo start+end llevan aria-selected (no intermedias)
[ ] Timezone: nota de implementación en spec de dev
```

---

## Related components

```
DatePicker          → selección de fecha única (componente hermano)
Calendar            → slot externo del DateRangePicker (Mode=range)
PresetItem          → sub-componente del panel de presets
Input               → base del startInput/endInput
Popover             → envuelve el panel en Layout=popover
Button              → applyButton y cancelButton
TextInput           → alternativa para fechas conocidas (GOV.UK pattern)
```

---

## Reference: how other systems do it

### Spectrum DateRangePicker — spinbutton inputs y hover preview de clase mundial

Spectrum separa el input layer (DateRangePicker con campos spinbutton por segmento: mes/día/año independientes) del calendar layer (RangeCalendar, usable standalone). Cada unidad de fecha es un spinbutton independiente con su propio min/max validation — sin ambigüedades de formato de cadena. El prop `allowsNonContiguousRanges` permite seleccionar rangos que cruzan fechas no disponibles, crítico para booking con fines de semana o feriados bloqueados.

El hover preview es la decisión de UX más avanzada entre todos los sistemas: mientras el usuario mueve el cursor sobre fechas potenciales de fin, el rango tentativo se ilumina antes de confirmar. Esto reduce drásticamente los errores de selección al hacer visibles las consecuencias antes del click. Accesibilidad: mejor de su clase — cada segmento tiene role="spinbutton" con aria-valuemin/max/now; la semántica del rango se anuncia distintamente.

### Ant Design DatePicker.RangePicker — trimestres, presets dinámicos y restricción por start date

RangePicker de Ant comparte cinco modos con el DatePicker (date/week/month/quarter/year). El modo quarter-range sirve el caso fiscal. El prop `disabledDate` con contexto `info.from` es la API de restricción de rango más poderosa entre todos los sistemas: durante la selección, la función recibe la fecha de inicio ya elegida y puede deshabilitar celdas de fin que violarían reglas ("máximo 90 días desde el inicio") sin gestión de estado externa.

Los presets vía `presets` aceptan tanto pares de fechas estáticos como funciones dinámicas — "Últimos N días laborales" calculado en render time. `needConfirm` configura si auto-cierra o requiere OK, haciendo ambos flujos configurables por caso de uso.

### Material Design 3 — modal full-screen para mobile

M3 usa un modal full-screen para mobile: la selección de rango necesita espacio real, especialmente para el dual-month view. La "pastilla" visual conectando start y end es la firma de diseño de M3. El sistema `CalendarConstraints` funciona idénticamente para pickers simples y de rango. La decisión de componente separado (MaterialDateRangePicker vs. MaterialDatePicker) refleja que el estado de rango (tracking start-selected, end-in-progress, complete-range) es lo suficientemente complejo para merecer su propia máquina de estados.

### Mantine DatePickerInput[type="range"] — API más ergonómica en T3

El prop `type="range"` en `DatePickerInput` es el API de rango más ergonómico en T3. El mismo componente cubre selección single, range y multiple. `DatesProvider` gestiona locale y timezone globalmente en el root de la app — sin configuración por componente. `numberOfColumns` controla el display multi-mes; `getDayProps` habilita personalización por día (marcadores de precio, dots indicadores).

### Orbit InputDateRange — travel-specific con precios por día

Orbit es un sistema purpose-built para flight booking. El prop `renderDay` muestra datos de precio por día dentro de las celdas del calendario — el caso de uso donde los usuarios necesitan ver costo junto a fechas. La selección secuencial (primero salida, luego vuelta) con validación de min/max estadía previene rangos de reserva inválidos a nivel del componente, no solo en submit.

### GOV.UK — el anti-pattern más investigado: text inputs para fechas conocidas

GOV.UK no provee calendar range picker. Su investigación de usuario encontró que para rangos de fechas donde el usuario conoce ambas fechas (historial laboral, períodos de declaración, año fiscal), dos grupos de tres text inputs (Día/Mes/Año) superan en velocidad y precisión a cualquier calendar picker. Es el argumento más fundamentado contra calendar pickers cuando el contexto implica fechas exactas conocidas — aplicable siempre que el rango sea "sabido", no "explorado".

---

## Tokens

**32 tokens** · prefix `drp-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| drp/input/sm/h | sizing/32 | Altura input size sm |
| drp/input/md/h | sizing/40 | Altura input size md |
| drp/input/lg/h | sizing/48 | Altura input size lg |
| drp/default/border | border/default | Borde inputs estado default |
| drp/default/bg | surface/default | Fondo inputs default |
| drp/focused/border | border/focus | Borde inputs estado focused |
| drp/focused/ring | focus/ring | Ring de foco en inputs |
| drp/open/border | border/focus | Borde inputs estado open |
| drp/open/shadow | elevation/3 | Sombra del panel abierto |
| drp/error/border | border/error | Borde inputs estado error |
| drp/disabled/bg | surface/disabled | Fondo inputs disabled |
| drp/disabled/opacity | opacity/disabled | Opacidad disabled (0.6) |
| drp/preset/default/fg | text/primary | Texto PresetItem default |
| drp/preset/hover/bg | surface/hover | Fondo PresetItem hover |
| drp/preset/selected/bg | brand/subtle | Fondo PresetItem selected |
| drp/preset/selected/fg | interactive/default | Texto PresetItem selected |
| drp/preset/selected/fontWeight | type/weight-semibold | Font weight PresetItem selected |
| drp/preset/focused/ring | focus/ring | Ring PresetItem focused |
| drp/preset/radius | radius/md | Border radius PresetItem |
| drp/separator/fg | text/secondary | Color del separador → |
| drp/calendar/w/sm | sizing/560 | Ancho del calendario size sm |
| drp/calendar/w/md | sizing/640 | Ancho del calendario size md |
| drp/calendar/w/lg | sizing/720 | Ancho del calendario size lg |
| drp/presets/w/sm | sizing/140 | Ancho del panel presets sm |
| drp/presets/w/md | sizing/160 | Ancho del panel presets md |
| drp/presets/w/lg | sizing/180 | Ancho del panel presets lg |
| drp/gap/sm | spacing/3 | Gap entre zonas size sm |
| drp/gap/md | spacing/4 | Gap entre zonas size md |
| drp/gap/lg | spacing/5 | Gap entre zonas size lg |
| drp/fontSize/sm | type/sm | Font size size sm (13px) |
| drp/fontSize/md | type/md | Font size size md (14px) |
| drp/fontSize/lg | type/lg | Font size size lg (16px) |

### Spacing specs

```
PresetItem sm:  h=28px  px=10px  fontSize=12px  lineHeight=16px  radius=6px
PresetItem md:  h=32px  px=12px  fontSize=13px  lineHeight=18px  radius=6px

DateRangePicker sm:  inputH=32px  presetsW=140px  calendarW=560px  gap=12px
DateRangePicker md:  inputH=40px  presetsW=160px  calendarW=640px  gap=16px
DateRangePicker lg:  inputH=48px  presetsW=180px  calendarW=720px  gap=20px

Panel open shadow: elevation/3 (16px blur, 8px offset-y)
Focus ring: 2px solid focus/ring  offset=2px
Error message: fontSize=12px  color=status/error/fg  marginTop=4px
Calendar range highlight: bg=brand/subtle  rx=left para start, rx=right para end
```
