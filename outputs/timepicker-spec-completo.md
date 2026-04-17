# TimePicker — Especificación Completa

## Descripción general

Input de hora con segmentos independientes (hora/minuto/segundo/AM-PM) y dropdown de columnas scrollables. Implementa el patrón Spectrum de spinbutton por segmento para máxima accesibilidad. Soporta formatos 12h (con AM/PM) y 24h, precision hasta segundos, y steps de 1/5/15/30 minutos para calendaring y logging.

### Wireframe estructural

**TimePicker (input, Format=12h, Size=md):**
```
┌─────────────────────────────────────┐
│  🕐  [hh] : [mm] : [ss]  [AM/PM]   │
└─────────────────────────────────────┘
       ↑       ↑       ↑        ↑
   spinbutton  ↑    spinbutton  ↑
          spinbutton         spinbutton
```

**TimePicker (Format=12h, Precision=minute, dropdown abierto):**
```
┌─────────────────────────────────────┐
│  🕐  [02] : [30]           [PM]   ▼ │
└─────────────────────────────────────┘
┌──────────────────────────────────────┐
│   Hora    │  Minuto  │  AM/PM       │
│   01      │   00     │   AM         │
│ ▶ 02 ◀   │ ▶ 30 ◀  │ ▶ PM ◀       │  ← selected en azul
│   03      │   45     │              │
│   04      │   00     │              │
│           │          │              │
│  [Ahora]                 [Aceptar] │
└──────────────────────────────────────┘
```

**Anatomía de slots:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `label` | text | No | Label del campo |
| `input` | container | Sí | Input con segmentos |
| `clockIcon` | icon | No | Clock icon leading o trigger |
| `dropdown` | container | No | Popover con columnas spinner |
| `hourColumn` | container | No | Scrollable 00-23 o 01-12 |
| `minuteColumn` | container | No | Scrollable por Step |
| `secondColumn` | container | No | Scrollable (Precision=second) |
| `meridiemColumn` | container | No | AM / PM (Format=12h) |
| `nowButton` | container | No | "Ahora" shortcut |
| `okButton` | container | No | Confirmar selección |

### Properties y valores

| Property | Valores |
|----------|---------|
| **State** | `default` · `focused` · `open` · `error` · `disabled` |
| **Size** | `sm` · `md` · `lg` |
| **Format** | `12h` · `24h` |
| **Precision** | `minute` · `second` |
| **Step** | `1` · `5` · `15` · `30` |

**Frame count:** State(5) × Size(3) × Format(2) × Precision(2) × Step(4) = 240 → 120 útiles − 24 exclusiones = **96 frames**

**Exclusiones:**
| Combinación excluida | Razón |
|----------------------|-------|
| `Precision=second + Step=15` | Step de 15 minutos no aplica a precisión de segundos |
| `Precision=second + Step=30` | Step de 30 minutos no aplica a precisión de segundos |
| `Format=24h + meridiemColumn visible` | No hay AM/PM en formato 24h |

### Panel de Figma

| Property Figma | Tipo | Valores |
|----------------|------|---------|
| State | Variant | default / focused / open / error / disabled |
| Size | Variant | sm / md / lg |
| Format | Variant | 12h / 24h |
| Precision | Variant | minute / second |
| Step | Variant | 1 / 5 / 15 / 30 |
| 👁 Has Label | Boolean | true/false |
| 👁 Show Clock Icon | Boolean | true/false |
| 👁 Show Seconds | Boolean | true/false |
| 👁 Show Now Button | Boolean | true/false |

---

## Cuándo usar

**Usar TimePicker cuando:**
- El usuario debe especificar una hora concreta (reunión, alarma, límite de entrega)
- El contexto de calendaring requiere steps de 15/30 minutos para slots de reunión
- Se necesita precisión de segundos (logging de eventos, timestamps de sistema)

**Format=12h:** Apps consumer en US, reservas de restaurante, recordatorios personales
**Format=24h:** Aplicaciones europeas/técnicas, healthcare, sistemas de scheduling 24/7

**Precision=minute:** Reuniones, reservas, alarmas
**Precision=second:** Logs de sistema, timestamps precisos, control de tiempo en deportes

**Step=1:** Input libre sin restricción de intervalo
**Step=5:** Planning granular con intervalos frecuentes
**Step=15:** Reuniones estándar de 15 min (Google Calendar default)
**Step=30:** Reuniones de media hora, horarios simplificados

**No usar TimePicker cuando:**
- El input de hora es libre sin restricción → usar TextField con validación de formato
- Se necesita rango de horas (inicio + fin) → usar dos TimePickers compuestos
- Fecha + hora combinadas → usar DatePicker + TimePicker separados o un DateTimePicker

---

## Variaciones visuales

### Input — Estados

| Estado | Border | Background | Ring |
|--------|--------|-----------|------|
| `default` | `border/default` | Blanco | No |
| `focused` | `border/focus` (brand) | Blanco | Sí |
| `open` | `border/focus` (brand) | Blanco | Shadow lg |
| `error` | `border/error` | Blanco | No |
| `disabled` | `border/default` | `surface/disabled` | No, opacity 60% |

### Segmentos spinbutton

Los segmentos son áreas clickeables dentro del input. Al hacer click en un segmento, ese segmento queda activo (bg ligeramente resaltado) y las arrow keys cambian su valor.

**Segmento activo:** bg `brand/subtle`, texto brand color
**Segmento inactivo:** transparente, texto `text/primary`
**Placeholder (sin valor):** `--` en `text/subtlest`

### Dropdown — Columnas

Cada columna es un listbox scrollable con el valor seleccionado centrado y resaltado:

| Estado item | Apariencia |
|-------------|-----------|
| `default` | Transparente, texto primario |
| `hover` | `surface/hover`, texto primario |
| `selected` | `interactive/default` bg (azul), texto blanco, font-weight 600 |
| `disabled` | Texto gris, opacity 50% (ej. step=15, solo muestra :00 :15 :30 :45) |

### Tamaños

| Size | Input H | Font | Dropdown W | Column W | Row H |
|------|---------|------|-----------|---------|-------|
| `sm` | 32px | 13px | 200px | 56px | 32px |
| `md` | 40px | 14px | 240px | 64px | 36px |
| `lg` | 48px | 16px | 280px | 72px | 40px |

---

## Decisiones de diseño

### 1. Segmentos spinbutton (patrón Spectrum)

Adobe Spectrum usa segmentos independientes con `role="spinbutton"` para cada parte de la hora (hora, minuto, AM/PM). Cada segmento es navegable independientemente con Arrow Left/Right para moverse entre segmentos y Arrow Up/Down para cambiar el valor. Este patrón elimina los errores de parsing de formato (el usuario nunca puede escribir "25:70") y es la mejor experiencia de keyboard disponible.

### 2. Dropdown con columnas (no reloj analógico)

El picker de columnas scrollables (Ant Design, Polaris, Alibaba) es más denso, accesible por teclado y funciona en pantallas estrechas. El reloj analógico (Material Design) es visualmente atractivo pero difícil de navegar sin mouse. Para aplicaciones de enterprise/productividad, las columnas son la elección correcta.

### 3. Step discrete controla las opciones de la columna de minutos

Step=15 muestra solo "00", "15", "30", "45" en la columna de minutos. Esto reduce la cognitiva del usuario en contextos de calendaring. Step=1 muestra 60 opciones. Los valores no disponibles se marcan como `aria-disabled` si el step cambia mid-interaction.

### 4. Format como property explícita + detección de locale en runtime

US usa 12h (AM/PM); Europa usa 24h. La propiedad `Format` permite al diseñador especificar cuál versión mostrar. En implementación, el default puede detectarse del locale del browser. La columna `meridiemColumn` (AM/PM) se excluye completamente en Format=24h.

### 5. Now button como shortcut UX

El botón "Ahora" rellena todos los segmentos con la hora actual. Es especialmente útil en flows de reserva ("Reservar para ahora") y elimina 3-4 interacciones del usuario. Modelar como slot booleano.

---

## Comportamiento e interacción

### Roles ARIA

| Elemento | Rol / Atributo |
|----------|----------------|
| Input container | `role="combobox"` + `aria-expanded` + `aria-controls="[dropdown-id]"` + `aria-haspopup="dialog"` |
| Segmento hora | `role="spinbutton"` + `aria-valuemin="0"` + `aria-valuemax="23"` + `aria-valuenow` + `aria-label="Hora"` |
| Segmento minuto | `role="spinbutton"` + `aria-valuemin="0"` + `aria-valuemax="59"` + `aria-valuenow` + `aria-label="Minuto"` |
| Segmento segundo | `role="spinbutton"` + `aria-label="Segundo"` |
| Segmento AM/PM | `role="spinbutton"` + `aria-valuetext="AM/PM"` + `aria-label="Meridiano"` |
| Dropdown | `role="dialog"` + `aria-label="Seleccionar hora"` |
| Columna hora | `role="listbox"` + `aria-label="Hora"` |
| Opción en columna | `role="option"` + `aria-selected="true/false"` |
| Disabled option | `aria-disabled="true"` |
| Error | `aria-invalid="true"` + `aria-errormessage` |

### Navegación de teclado

| Tecla | Comportamiento |
|-------|----------------|
| `Tab` | Navega al input (al primer segmento) |
| `Arrow Up` | Incrementa el valor del segmento activo |
| `Arrow Down` | Decrementa el valor del segmento activo |
| `Arrow Left` | Mueve el foco al segmento anterior (horas ← minutos ← AM/PM) |
| `Arrow Right` | Mueve el foco al segmento siguiente |
| Digits (0-9) | Entrada directa en el segmento activo |
| `Alt + Arrow Down` | Abre el dropdown |
| Arrow keys en dropdown | Navega entre opciones de la columna activa |
| `Tab` en dropdown | Mueve entre columnas |
| `Enter` en dropdown | Confirma la selección y cierra |
| `Escape` | Cierra el dropdown sin cambios |

### Comportamiento de los segmentos

- Al activar un segmento: el valor se muestra resaltado (bg brand/subtle)
- Typing de dígitos: si el usuario escribe "2" en el segmento de horas, el campo muestra "02" y puede añadir más dígitos
- Valor cyclical: Arrow Up en "12" (Format=12h) → "01"; Arrow Down en "01" → "12"
- En Step=15: Arrow Up en el segmento de minutos → salta :00 → :15 → :30 → :45 → :00

### Focus management

- Input: focus al primer segmento (hora)
- Al abrir dropdown: focus a la primera columna
- Focus trap en el dropdown mientras está abierto
- Al cerrar dropdown (Enter o Escape): focus retorna al input
- Al confirmar con OK: cierra dropdown, focus al input

### Validación

- Segmentos validan en tiempo real (un segmento inválido como "26" en Format=24h se reestablece automáticamente)
- Error state del input cuando la hora completa está fuera de un rango permitido (ej. `minTime`/`maxTime` prop)
- `aria-invalid="true"` + mensaje de error cuando el valor no es válido

---

## Guía de contenido

**Label:**
- "Hora de inicio", "Hora de fin", "Hora del recordatorio"
- Si está dentro de un FormField, el label viene del FormField — no duplicar

**Placeholder en segmentos:**
- `--` para cada segmento vacío: `-- : -- AM`
- Nunca "HH:MM" — el formato ya es evidente por los segmentos separados

**Now button:**
- "Ahora" — conciso
- Alternativas: "Hora actual", "Usar hora actual"

**OK button:**
- "Aceptar" — estándar
- Alternativas según contexto: "Confirmar", "Aplicar"

**Error messages:**
- "La hora debe estar entre 08:00 y 20:00"
- "Selecciona una hora válida"
- "La hora de fin debe ser posterior a la hora de inicio"

---

## Pre-build checklist

- [ ] Exclusiones verificadas: `Precision=second + Step=15|30` y `Format=24h + meridiemColumn` no existen en el set
- [ ] Los segmentos en el input tienen tamaño mínimo clickeable para mobile
- [ ] Dropdown: cada columna tiene ancho fijo (no depende del contenido)
- [ ] Valor seleccionado en la columna está centrado verticalmente con items arriba y abajo visibles
- [ ] Estado open del input tiene la misma apariencia que focused (border brand) más shadow
- [ ] Now button alineado a la izquierda, OK button a la derecha en el footer del dropdown
- [ ] En Format=12h: meridiemColumn solo tiene 2 opciones (AM / PM) — verificar proporciones de columna estrecha
- [ ] En Format=24h: el ancho del dropdown se ajusta (sin columna AM/PM)

---

## Componentes relacionados

| Componente | Relación |
|------------|----------|
| **DatePicker** | Companion natural para DateTimePicker (fecha + hora combinados) |
| **FormField** | TimePicker se usa como input dentro de FormField |
| **Slider** | La columna scrollable tiene analogía con Slider vertical |
| **Select / Dropdown** | El dropdown de columnas comparte el popover base |

---

## Referencia: ¿cómo lo hacen otros sistemas?

| Sistema | Patrón | Columnas | Format 12/24h | Seconds | Step |
|---------|--------|----------|--------------|---------|------|
| **Ant Design** | Columnas scrollables | 3 (h/m/s) | Ambos | Sí | Sí |
| **Spectrum (Adobe)** | Segmentos spinbutton | Sin dropdown | Ambos | Sí | No |
| **Carbon (IBM)** | TextField con formato | No | 12h | No | No |
| **Polaris (Shopify)** | Columnas scrollables | 2 (h/m) | 12h | No | No |
| **MUI** | Reloj analógico (mobile) + columnas (desktop) | 2-3 | Ambos | Sí | No |
| **Atlassian** | TextField con validación | No | Ambos | No | No |

**Consenso:** Ant Design es el más completo con columnas + seconds + step. Spectrum lidera en accesibilidad con segmentos spinbutton. Nuestra implementación combina ambos enfoques: segmentos spinbutton en el input + columnas en el dropdown.

---

## Tokens y espaciado

**Prefijo:** `tp-` · **Total tokens:** 22 · **Modo:** Components

### Tokens del input

| Token | Valor DS | Uso |
|-------|----------|-----|
| `tp/sm/h` | `sizing/32` | Alto input sm |
| `tp/md/h` | `sizing/40` | Alto input md |
| `tp/lg/h` | `sizing/48` | Alto input lg |
| `tp/default/border` | `border/default` | Border reposo |
| `tp/focused/border` | `border/focus` | Border focused |
| `tp/focused/ring` | `focus/ring` | Focus ring |
| `tp/open/shadow` | `elevation/3` | Shadow open |
| `tp/error/border` | `border/error` | Border error |
| `tp/disabled/bg` | `surface/disabled` | Fondo disabled |
| `tp/disabled/opacity` | `opacity/disabled` | Opacidad disabled |

### Tokens del dropdown

| Token | Valor DS | Uso |
|-------|----------|-----|
| `tp/dropdown/bg` | `surface/default` | Fondo dropdown |
| `tp/dropdown/border` | `border/default` | Border dropdown |
| `tp/dropdown/radius` | `radius/md` | Radius dropdown |
| `tp/dropdown/shadow` | `elevation/3` | Sombra dropdown |

### Tokens de items en columna

| Token | Valor DS | Uso |
|-------|----------|-----|
| `tp/column/item/hover` | `surface/hover` | Hover de opción |
| `tp/column/item/selected` | `interactive/default` | Seleccionada (brand) |
| `tp/column/item/selectedFg` | `text/inverse` | Texto seleccionada |
| `tp/column/item/selectedFontWeight` | `type/weight-semibold` | Peso seleccionada |

### Tokens de tipografía y espaciado

| Token | Valor DS | Uso |
|-------|----------|-----|
| `tp/fontSize/sm` | `type/sm` | Font size sm |
| `tp/fontSize/md` | `type/md` | Font size md |
| `tp/fontSize/lg` | `type/lg` | Font size lg |
| `tp/padding` | `spacing/3` | Padding input |

### Espaciado por tamaño

| Propiedad | sm | md | lg |
|-----------|----|----|-----|
| Input height | 32px | 40px | 48px |
| Dropdown width | 200px | 240px | 280px |
| Column width | 56px | 64px | 72px |
| Column row height | 32px | 36px | 40px |
| Font size | 13px | 14px | 16px |

### Columnas visibles por Format y Precision

| Configuración | Columnas mostradas |
|---------------|-------------------|
| Format=12h, Precision=minute | Hora · Minuto · AM/PM |
| Format=12h, Precision=second | Hora · Minuto · Segundo · AM/PM |
| Format=24h, Precision=minute | Hora · Minuto |
| Format=24h, Precision=second | Hora · Minuto · Segundo |
