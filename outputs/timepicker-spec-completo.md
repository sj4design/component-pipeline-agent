# TimePicker

## Overview

TimePicker es un campo de formulario para ingresar horas. Combina un input de texto segmentado (inspirado en el patrón spinbutton de Spectrum/React Aria) con un dropdown de columnas scrollables estilo Ant Design, permitiendo tanto entrada directa por teclado como selección visual. Soporta formato 12h (con AM/PM) y 24h, precisión hasta segundos, y pasos configurables (1/5/15/30 min) para cubrir desde logs de tiempo exacto hasta agendas de reuniones con intervalos fijos.

```
  Label (opcional)
  ┌──────────────────────────────────────────┐
  │  🕐  [ HH ] : [ MM ]  [ AM ]          ▼ │
  └──────────────────────────────────────────┘
       ┌────────┬────────┬────────┐
       │  08    │  00    │  AM    │
       │  09 ●  │  15    │  PM    │   ← columna seleccionada = highlight
       │  10    │  30    │        │
       │  11    │  45    │        │
       └────────┴────────┴────────┘
         [  Ahora  ]      [  OK  ]
```

El input muestra los segmentos `HH`, `MM` (y `SS` cuando `Precision=second`) como spinbuttons independientes. Al pulsar `Alt+Down` o hacer clic en el ícono de reloj, se abre el dropdown con columnas scrollables para horas, minutos, (segundos) y AM/PM. Los botones "Ahora" y "OK" completan la interacción.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
State:     default | focused | open | error | disabled
Size:      sm | md | lg
Format:    12h | 24h
Precision: minute | second
Step:      1 | 5 | 15 | 30
```

Toggles (show/hide parts — do NOT generate extra variants):

```
👁 Has Label         → muestra/oculta el label encima del input
👁 Show Clock Icon   → ícono de reloj leading (trigger alternativo)
👁 Show Seconds      → columna de segundos en dropdown + segmento SS
👁 Show Now Button   → botón "Ahora" en footer del dropdown
```

### Figma properties panel

```
┌─────────────────────────────────────────┐
│  TimePicker                             │
│  ─────────────────────────────────────  │
│  State    ○ default  ○ focused          │
│           ○ open     ○ error            │
│           ○ disabled                    │
│  Size     ○ sm  ○ md  ○ lg             │
│  Format   ○ 12h  ○ 24h                 │
│  Precision ○ minute  ○ second          │
│  Step     ○ 1  ○ 5  ○ 15  ○ 30        │
│  ─────────────────────────────────────  │
│  👁 Has Label         [toggle]         │
│  👁 Show Clock Icon   [toggle]         │
│  👁 Show Seconds      [toggle]         │
│  👁 Show Now Button   [toggle]         │
│  ─────────────────────────────────────  │
│  ✏️ Label text        "Hora de inicio" │
└─────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El usuario necesita ingresar una hora?
│
├─ ¿Es un contexto clínico o de seguridad crítica?
│   └─ NO usar TimePicker → usar <input type="time"> 24h (Nord pattern)
│       (ambigüedad AM/PM es fuente documentada de errores médicos)
│
├─ ¿El uso es en scheduling/reuniones con intervalos fijos?
│   └─ SÍ → Step=15 o Step=30, mostrar Now Button
│
├─ ¿El usuario necesita hora exacta (logs, registros)?
│   └─ SÍ → Step=1, considerar Precision=second
│
├─ ¿Necesita rango inicio + fin?
│   └─ Usar 2 TimePickers (no hay RangePicker en este DS)
│
└─ ¿El contexto es 100% móvil y táctil casual?
    └─ Considerar selector nativo del sistema operativo
```

**Usar TimePicker cuando:**
- El usuario debe especificar una hora concreta dentro de un formulario (reuniones, alarmas, horarios de trabajo, reservas).
- Se necesita control sobre el paso (intervalos de 15 o 30 min para agendas de calendario).
- El producto soporta tanto formato 12h (mercados US/latam consumer) como 24h (enterprise europeo).
- Se requiere precisión hasta segundos (logs de actividad, registros de tiempo de entrada/salida).
- Un shortcut "Ahora" puede ahorrar pasos al usuario (reservas, check-in de tiempo).

**NO usar TimePicker cuando:**
- El contexto es clínico, farmacéutico o de seguridad crítica — la ambigüedad AM/PM es un error documentado; usar `<input type="time">` en modo 24h (recomendación de Nord/Nordhealth).
- Solo se necesita seleccionar una fecha sin hora — usar DatePicker.
- Se necesita ingresar fecha + hora combinada — componer DatePicker + TimePicker lado a lado.
- El input de hora es secundario y la precisión es baja — un Select con opciones fijas (Mañana / Tarde / Noche) puede ser más usable.
- El dataset de slots disponibles es grande y complejo — considerar un selector de lista con búsqueda.

---

## Visual variations

### Por Size

| Size | Input H | Font | Dropdown W | Column Row H |
|------|---------|------|-----------|--------------|
| sm   | 32px    | 13px | 200px     | 32px         |
| md   | 40px    | 14px | 240px     | 36px         |
| lg   | 48px    | 16px | 280px     | 40px         |

El tamaño md es el default para formularios estándar. sm es apropiado en paneles compactos o herramientas tipo admin dashboard. lg se usa cuando el input es el elemento focal de la pantalla (wizard de onboarding, modal de scheduling).

### Por State

**default** — Border `border/default` (#D1D1D9), fondo blanco, texto primario.

**focused** — Border cambia a `border/focus` (azul #2659EB), ring exterior de 2px con offset 2px. El segmento activo del spinbutton muestra fondo de acento sutil.

**open** — Equal a focused + sombra de elevación nivel 3 en el dropdown. El dropdown aparece debajo del input alineado al borde izquierdo.

**error** — Border `border/error` (#DC2626). Sin ring. El mensaje de error aparece debajo del input en texto `critical`.

**disabled** — Border #E0E0E6, fondo `surface/disabled`, opacidad 0.6, cursor not-allowed.

### Por Format

**12h** — Los segmentos muestran `HH:MM AM/PM`. La columna de meridiem (AM/PM) aparece como cuarta columna en el dropdown. Las horas van de 01 a 12.

**24h** — Los segmentos muestran `HH:MM`. No hay columna de meridiem. Las horas van de 00 a 23. Nunca mostrar la columna de AM/PM cuando Format=24h (exclusión crítica).

### Por Precision

**minute** — Solo columnas de horas y minutos (+ meridiem en 12h).

**second** — Añade columna de segundos entre minutos y meridiem. El input muestra tres segmentos: `HH:MM:SS`. Nota: Precision=second es incompatible con Step=15 o Step=30 (exclusión — la combinación no tiene sentido semántico).

### Por Step

El step controla el intervalo de la columna de minutos en el dropdown:
- **Step=1** → todos los minutos 00–59
- **Step=5** → 00, 05, 10, 15... 55
- **Step=15** → 00, 15, 30, 45
- **Step=30** → 00, 30

El step no afecta la entrada directa por teclado — el usuario puede escribir cualquier minuto válido.

### Estados de columna (dropdown)

| Estado | Fondo | Color texto | Peso |
|--------|-------|-------------|------|
| default | transparent | `text/primary` | 400 |
| hover | `surface/hover` | `text/primary` | 400 |
| selected | `interactive/default` (azul) | `text/inverse` (blanco) | 600 |
| disabled | transparent | `text/disabled` | 400, opacity 0.5 |

---

## Design decisions

### 1. Segmentos spinbutton como modelo primario de entrada (Spectrum pattern)

**Por qué:** El modelo de segmentos independientes (cada parte de la hora como spinbutton separado con `role="spinbutton"`) es el más accesible para teclado y tecnología asistiva. Cada segmento valida independientemente, acepta dígitos directamente, y anuncia cambios via `aria-live`. Este es el patrón de Spectrum/React Aria, el mejor en accesibilidad entre todos los sistemas T1.

**Tradeoff:** Es menos familiar visualmente que un input de texto libre (`09:30`) para usuarios no técnicos. Sin embargo, el beneficio de a11y y la reducción de errores de formato justifican la elección. El dropdown de columnas ofrece la entrada visual para quienes prefieren no usar teclado.

### 2. Dropdown de columnas scrollables (Ant Design pattern) como interacción visual

**Por qué:** El drum picker (columnas scrollables) de Ant Design es más denso y compacto que un listbox de slots lineales (Fluent/Base Web). Permite ver el contexto (horas adyacentes) sin scroll externo. Ant Design, Alibaba y Mantine lo usan como patrón primario para scheduling.

**Tradeoff:** Las columnas son menos familiares para AT que el pattern combobox. Mitigado por el hecho de que el input segmentado (teclado) siempre es el camino primario; el dropdown es una alternativa visual, no el único path.

### 3. Format 12h/24h como property explícita (no solo por locale)

**Por qué:** US y LATAM consumer usan 12h; Europa y enterprise usan 24h. MD3 deja el formato 100% a locale sin override de developer, lo que impide forzar 24h en contextos de seguridad. Fluent 2 y Ant Design permiten override explícito. Nuestra elección sigue este modelo: `Format` es una property con default derivado de locale pero overridable.

**Tradeoff:** El developer debe elegir conscientemente el formato. El riesgo de elegir mal es real pero aceptable comparado con no poder forzar 24h en contextos que lo requieren.

### 4. Step discreto como property (1/5/15/30)

**Por qué:** Calendaring y booking requieren intervalos fijos (15/30 min para reuniones). Sin step, el usuario podría seleccionar 09:07 en un sistema donde solo existen slots de :00 y :30. Step=30 es el default de Base Web; Step=15 es el default de Fluent 2 para Office 365. Nosotros exponemos los 4 valores más comunes como property discreta.

**Tradeoff:** El step limita el dropdown pero NO limita la entrada directa por teclado. Un usuario que necesita 14:37 puede escribirlo directamente. Esto es intencional: el step es UX convenience, no constraint de modelo de datos.

### 5. Show Now Button como toggle opcional

**Por qué:** "Set to current time" reduce pasos en booking flows y check-in de tiempo (log entry). Ant Design tiene `showNow` por defecto en true. Nosotros lo hacemos un toggle explícito porque en muchos contextos (scheduling futuro, configuración de horarios) el tiempo actual no es relevante.

**Tradeoff:** Un toggle más en el panel de Figma. El beneficio de claridad semántica supera la complejidad añadida.

### Excluded combinations

```
Precision=second  +  Step=15     ← sin sentido: segundos implican precisión máxima
Precision=second  +  Step=30     ← mismo problema
Format=24h        +  meridiemColumn visible  ← el AM/PM no existe en 24h
```

---

## Behavior

### Essential para diseño

El TimePicker tiene dos modos de interacción que coexisten:

1. **Entrada directa por segmentos** — El input muestra segmentos `[HH]:[MM]` (y `[SS]`/`[AM/PM]` según configuración). El foco inicia en el primer segmento. Arrow Up/Down cambia el valor del segmento. Arrow Left/Right mueve entre segmentos. Escribir dígitos rellena el segmento y avanza al siguiente automáticamente cuando se alcanza el máximo (2 dígitos para horas/minutos).

2. **Dropdown de columnas** — Se abre con `Alt+Down` o clic en el ícono de reloj. Presenta 2–4 columnas scrollables según Format y Precision. La selección en columnas actualiza inmediatamente los segmentos. Confirmar con "OK" cierra el dropdown. "Ahora" (si está visible) llena todos los segmentos con la hora actual.

**Auto-advance de segmentos:** Al escribir el segundo dígito de un segmento, el foco pasa automáticamente al siguiente (ej. escribir "09" en horas mueve al segmento de minutos).

**Wrap-around:** Arrow Up en el valor máximo del segmento vuelve al mínimo (23 → 00 en 24h). Arrow Down en 00 va al máximo.

**El dropdown no roba foco del segmento activo** al abrirse. El foco se mueve al dropdown solo cuando el usuario navega explícitamente dentro de él.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Input container | `combobox` | `aria-expanded`, `aria-controls="[dropdown-id]"`, `aria-haspopup="dialog"` | Identifica el trigger del dropdown |
| Segmento hora | `spinbutton` | `aria-label="Hora"`, `aria-valuemin=0`, `aria-valuemax=23`, `aria-valuenow=9` | Permite navegación y anuncio de valor por AT |
| Segmento minuto | `spinbutton` | `aria-label="Minuto"`, `aria-valuemin=0`, `aria-valuemax=59` | Ídem para minutos |
| Segmento segundo | `spinbutton` | `aria-label="Segundo"` (si visible) | Solo cuando Precision=second |
| Segmento AM/PM | `spinbutton` | `aria-label="AM/PM"`, `aria-valuemin=0`, `aria-valuemax=1` | Solo cuando Format=12h |
| Dropdown | `dialog` | `aria-label="Seleccionar hora"` | Focus trap cuando está abierto |
| Columna hora | `listbox` | `aria-label="Horas"` | Contenedor de opciones |
| Opción de hora | `option` | `aria-selected="true/false"` | Opción seleccionada |
| Input en error | — | `aria-invalid="true"`, `aria-errormessage="[error-id]"` | Vincula mensaje de error |
| Hora deshabilitada | `option` | `aria-disabled="true"` | Opciones no seleccionables |

### Keyboard navigation

Primary interactions (affect design):

```
Tab              → foco al input (primer segmento)
Arrow Up/Down    → cambia valor del segmento activo (+1/-1)
Arrow Left/Right → mueve entre segmentos (HH ↔ MM ↔ SS ↔ AM/PM)
0-9              → entrada directa en el segmento activo
Alt+Down         → abre dropdown
Enter (dropdown) → confirma selección + cierra dropdown
Escape           → cierra dropdown sin guardar cambios
```

Secondary interactions (dev reference):

```
Home             → valor mínimo del segmento activo
End              → valor máximo del segmento activo
Tab (dropdown)   → navega entre columnas del dropdown
Arrow Up/Down    → scroll dentro de la columna enfocada
Enter/Space      → selecciona opción de columna
Tab a OK         → confirmar
Tab a Ahora      → llenar con hora actual
```

---

## Content guide

### Slot: label
Texto descriptivo encima del input. Debe ser conciso y específico: "Hora de inicio", "Hora de fin", "Hora de la alarma". Evitar el genérico "Hora" sin contexto. El label es crucial para la asociación ARIA — siempre incluirlo en formularios formales. En layouts muy compactos donde el contexto es claro por posición, se puede ocultar con `Has Label=off` pero mantenerlo como `aria-label` en el input.

### Slot: input
El campo en sí con sus segmentos. No hay texto editable directo — los segmentos son la UI. El placeholder visual de los segmentos usa `--` cuando no hay valor: `[--]:[--]` en lugar de `[00]:[00]` para no confundir con un valor real de medianoche.

### Slot: clockIcon
Ícono de reloj como trigger alternativo para abrir el dropdown. Útil para usuarios que prefieren interacción visual sobre `Alt+Down`. Debe tener `aria-label="Abrir selector de hora"` y `aria-hidden="true"` si el input ya tiene el label completo.

### Slot: nowButton
Etiqueta: "Ahora" (es). En inglés: "Now". Usar texto corto. No "Hora actual" — demasiado largo para el espacio disponible.

### Slot: okButton
Etiqueta: "OK". Alternativas válidas: "Confirmar", "Aceptar". No usar "Listo" o "Guardar" — el TimePicker no guarda datos por sí solo.

### Mensajes de error
Mensajes específicos y accionables:
- "Ingresa una hora válida (ej. 09:30 AM)" — error de formato
- "La hora debe ser posterior a las 08:00" — error de rango mínimo
- "La hora de fin debe ser después de la hora de inicio" — error de validación cruzada

---

## Pre-build checklist

```
Figma
□ Frames creados: State(5) × Size(3) × Format(2) × Precision(2) = 60 bases
□ Step se modela como property de dropdown (no genera frames separados)
□ Exclusiones aplicadas: Precision=second+Step=15/30 eliminadas (net: 96 frames)
□ Format=24h: meridiemColumn oculta en todos los frames
□ Dropdown como component separado vinculado via instance swap
□ Variables de token aplicadas en todos los states
□ Ring de focus visible en State=focused y State=open
□ Sombra elevation/3 en dropdown
□ Booleans configurados: Has Label, Show Clock Icon, Show Seconds, Show Now Button

Accesibilidad
□ Segmentos documentados como spinbuttons en specs de handoff
□ Roles ARIA en componente description de Figma
□ Contraste de texto verificado en todos los estados (AA mínimo)
□ Estado error documentado con mensaje de ejemplo
□ Focus ring de 2px visible sobre fondo blanco y de color

Contenido
□ Placeholder `--:--` (no `00:00`) para estado sin valor
□ Labels de columnas documentados: "Horas", "Minutos", "Segundos", "AM/PM"
□ Botón Now = "Ahora", botón confirm = "OK"
```

---

## Related components

```
DatePicker        → para selección de fecha. Componer DatePicker + TimePicker para datetime.
DateRangePicker   → para rangos de fecha (inicio + fin). No incluye hora.
Select            → alternativa simple cuando solo hay opciones predefinidas de tiempo (Mañana/Tarde).
TextField         → cuando se necesita entrada libre de tiempo como texto (casos edge, legacy forms).
Form              → componente contenedor para integrar TimePicker con validación de formulario.
```

---

## Reference: how other systems do it

### Material Design 3 — Dial primario con toggle a texto

MD3 lidera con un dial analógico de reloj como modo primario, con un botón dentro del picker para cambiar a entrada de texto. La interacción de arrastre en el dial es superior para móvil táctil — "approximately 2 o'clock" es más natural en touch que escribir dígitos. El formato 12h/24h no es overridable por developers; MD3 trata el formato como concern de localización. El picker es modal-only (dialog), requiere espacio vertical significativo y no es viable para embedding inline. El dial no es navegable por screen reader — el modo texto es requerido como fallback obligatorio de a11y.

### Spectrum / React Aria — Segmentos spinbutton (mejor a11y)

Spectrum's TimeField es el referente de accesibilidad de teclado. Cada unidad de tiempo (horas, minutos, segundos, AM/PM) es un spinbutton independiente navegable. Arrow keys ciclan valores dentro del segmento; Tab/Right avanzan al siguiente. El prop `timeZone` acepta identificadores IANA para handling de zona horaria — el único sistema T1 con manejo de timezone a nivel de componente. `granularity` controla qué segmentos aparecen, permitiendo que el mismo componente sirva entrada gruesa (hour-only) y precisa (second-level). Es el modelo de a11y que adoptamos como base para nuestros segmentos.

### Carbon / IBM — Composición de primitivos de formulario

Carbon's TimePicker es minimal por diseño: un TextInput para HH:MM más un Select opcional para AM/PM. Esta composición hereda automáticamente toda la validación, estado de error, helper text y label patterns del sistema de formularios. Sin validación de formato integrada — las aplicaciones validan el string de tiempo. Es la implementación más rápida de integrar cuando ya se usa el sistema de formularios Carbon. El approach de composición de primitivos es una alternativa válida cuando no se necesita una UI especializada.

### Ant Design — Drum picker con columnas scrollables

El TimePicker de Ant Design usa el paradigma column-scroll (drum/wheel) — tres columnas scrollables para horas, minutos y segundos. La interacción de columna está optimizada para "elegir una hora de reunión" en lugar de entrada precisa. `TimePicker.RangePicker` es único en T1: selección de tiempo inicio+fin en una sola superficie de interacción, diseñado para scheduling de turnos y ventanas de servicio. `disabledTime` callback permite reglas de negocio complejas. `hourStep`/`minuteStep`/`secondStep` saltan valores no válidos para intervalos de reserva. Es el patrón visual que adoptamos para nuestro dropdown.

### Fluent 2 / Microsoft — Combobox con intervalos configurables

El TimePicker de Fluent 2 es un dropdown estilo combobox con typing freeform. `increment` (en minutos) controla la generación de slots. `hourCycle` acepta `h11`/`h12`/`h23`/`h24` para cobertura completa de locale. Construido sobre el componente Combobox para herencia completa de accesibilidad. `startHour`/`endHour` limitan el rango seleccionable (ej. solo horas de negocio). Diseñado para contextos de scheduling de Microsoft 365. El freeform typing habilitado por defecto significa que los usuarios siempre pueden escribir una hora precisa.

### Base Web / Uber — Select con slots pre-generados

El TimePicker de Base Web se construye sobre su componente Select: un dropdown de slots pre-generados en intervalos configurables (`step` en segundos, default 1800 = 30 minutos). El modo `creatable` permite escritura freeform de tiempos no en la lista. Buscable por defecto. Un `DatetimePicker` combina selección de fecha + tiempo. El modelo override permite personalización visual profunda. `step={900}` para intervalos de 15 minutos; `step={3600}` para solo horas.

### GOV.UK — Inputs de texto separados por unidad

GOV.UK usa inputs de texto separados para horas y minutos — sin widget custom. Cada campo tiene `inputmode="numeric"`. La guía de formato se entrega via hint text. Sin JavaScript requerido. La elección entre 12h y 24h está guiada por investigación de usuario (el formato 24h se considera más preciso para registros oficiales). Es el patrón de mayor robustez y menor fallo — el fallback absoluto cuando el contexto requiere máxima compatibilidad con AT sin patrones ARIA custom.

### Nord / Nordhealth — Input nativo 24h obligatorio

La posición de Nord es la más fuerte contra los pickers custom en contextos de seguridad: la ambigüedad AM/PM es documentada como fuente de errores médicos. Órdenes de medicación especificadas como "8:00 AM" ingresadas como "8:00 PM" en un picker de 12h causan errores de timing con consecuencias clínicas. El formato 24h con `<input type="time">` nativo elimina esta categoría de error. Los drum pickers son explícitamente señalados como riesgosos en tablets clínicas usados con guantes. Esta perspectiva informa nuestra decisión de exponer `Format` como property explícita y documentar el riesgo en contextos clínicos.

### Mantine — Dos tiers explícitos: TimeInput vs TimePicker

Mantine provee dos tiers explícitos: `TimeInput` envuelve `<input type="time">` para entrada por teclado estilo formulario; `TimePicker` provee un selector visual de columna scroll. Esta división de dos tiers es el único sistema que nombra y separa explícitamente los dos modelos de interacción. `withSeconds` habilita precisión sub-minuto. Esta transparencia arquitectural es un referente para documentar los dos modos en nuestro componente.

---

## Tokens

**22 tokens** · prefix `tp-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `tp/sm/h` | `sizing/32` | Altura del input size sm |
| `tp/md/h` | `sizing/40` | Altura del input size md |
| `tp/lg/h` | `sizing/48` | Altura del input size lg |
| `tp/default/border` | `border/default` | Border en estado default |
| `tp/focused/border` | `border/focus` | Border en estado focused/open |
| `tp/focused/ring` | `focus/ring` | Ring exterior en focused/open |
| `tp/open/shadow` | `elevation/3` | Sombra del dropdown |
| `tp/error/border` | `border/error` | Border en estado error |
| `tp/disabled/bg` | `surface/disabled` | Fondo en estado disabled |
| `tp/disabled/opacity` | `opacity/disabled` | Opacidad en disabled |
| `tp/dropdown/bg` | `surface/default` | Fondo del panel dropdown |
| `tp/dropdown/border` | `border/default` | Border del dropdown |
| `tp/dropdown/radius` | `radius/md` | Border radius del dropdown |
| `tp/dropdown/shadow` | `elevation/3` | Elevación del dropdown |
| `tp/column/item/hover` | `surface/hover` | Fondo de ítem en hover |
| `tp/column/item/selected` | `interactive/default` | Fondo de ítem seleccionado |
| `tp/column/item/selectedFg` | `text/inverse` | Texto de ítem seleccionado |
| `tp/column/item/selectedFontWeight` | `type/weight-semibold` | Peso de ítem seleccionado |
| `tp/fontSize/sm` | `type/sm` | Tamaño de fuente size sm |
| `tp/fontSize/md` | `type/md` | Tamaño de fuente size md |
| `tp/fontSize/lg` | `type/lg` | Tamaño de fuente size lg |
| `tp/padding` | `spacing/3` | Padding interno del input |

### Spacing specs

```
Size sm:
  Input height:      32px
  Input padding H:   10px (spacing/2.5)
  Font size:         13px
  Dropdown width:    200px
  Column width:      56px
  Column row height: 32px

Size md (default):
  Input height:      40px
  Input padding H:   12px (spacing/3)
  Font size:         14px
  Dropdown width:    240px
  Column width:      64px
  Column row height: 36px

Size lg:
  Input height:      48px
  Input padding H:   16px (spacing/4)
  Font size:         16px
  Dropdown width:    280px
  Column width:      72px
  Column row height: 40px

Dropdown:
  Border radius:     8px (radius/md)
  Shadow:            elevation/3
  Footer padding:    8px 12px
  Gap entre columnas: 0 (sin separación — el borde actúa de divisor)

Focus ring:
  Width:   2px
  Offset:  2px
  Color:   focus/ring (#4062F2)
```
