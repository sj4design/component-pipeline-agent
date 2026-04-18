# Slider

## Overview

El componente Slider es un control de rango deslizable para seleccionar un valor numérico (o par de valores) dentro de límites definidos. En modo `single`, un thumb se desliza a lo largo del track para elegir un valor (volumen, brillo, zoom, opacidad). En modo `range`, dos thumbs independientes definen un rango mínimo/máximo (filtro de precio, rango de edad, selección de tiempo). Complementos opcionales incluyen marks en posiciones discretas, value label visible durante la interacción, e input numérico sincronizado para entrada de precisión. Es un componente de 14 de los 24 sistemas revisados, con ausencia intencional en GOV.UK y Nord por argumentos de accesibilidad motriz y seguridad clínica.

```
Slider (md, single, con value label)
┌────────────────────────────────────────────────────────────────┐
│  Volumen                                              65%      │
│                         ┌─────┐                               │
│                         │ 65% │  ← value-label (tooltip)      │
│                         └──┬──┘                               │
│  ─────────────────────────●──────────────────────────         │
│  0                         ↑ thumb                       100  │
└────────────────────────────────────────────────────────────────┘

Slider (md, range, sin value label)
┌────────────────────────────────────────────────────────────────┐
│  Precio                                                        │
│  ─────────●────────────────────────────────●──────            │
│  $0        ↑ min thumb                     ↑ max thumb   $500 │
└────────────────────────────────────────────────────────────────┘

Slider (sm, discrete, con marks)
┌────────────────────────────────────────────────────────────────┐
│  ────●───┼───┼───┼───┼───┼───┼───┼───┼────                   │
│    1     2   3   4   5   6   7   8   9  10                     │
│          ↑ tick marks en posiciones discretas                  │
└────────────────────────────────────────────────────────────────┘
```

El Slider opera como elemento de formulario — el label es un elemento separado que referencia el input mediante `aria-labelledby`. Cada thumb es independientemente focusable (y en `Type=range`, cada uno tiene su propio `aria-label` descriptivo).

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Type: single | range
Size: sm | md | lg
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Label       → muestra/oculta label de texto sobre el track (slot: label)
Has Value Label → muestra/oculta tooltip de valor sobre el thumb (slot: value-label)
Has Marks       → muestra/oculta tick marks en el track (slot: marks)
Has Input       → muestra/oculta input numérico sincronizado (slot: input)
```

### Figma properties panel

```
╔══════════════════════════════════╗
║  Slider                          ║
╠══════════════════════════════════╣
║  Type    ● single  ○ range       ║
║  Size    ○ sm  ● md  ○ lg        ║
╠══════════════════════════════════╣
║  Has Label         [ Toggle ]    ║
║  Has Value Label   [ Toggle ]    ║
║  Has Marks         [ Toggle ]    ║
║  Has Input         [ Toggle ]    ║
╠══════════════════════════════════╣
║  ✏️ Label      [Volumen]         ║
║  ✏️ Value Label [50%]            ║
╚══════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿El usuario necesita seleccionar un valor en un rango continuo o discreto?
├── Sí → ¿El usuario necesita precisión exacta (valor específico crítico)?
│         ├── Sí → Slider + Has Input (Carbon pattern) o solo NumberInput
│         └── No → ¿Desliza para ajustar? → Slider ✓
│
├── ¿El contexto es control de media (volumen, brillo, zoom)?
│    └── Sí → Slider single, Has Value Label=true o false según contexto
│
├── ¿Filtra por rango (precio, edad, duración)?
│    └── Sí → Slider Type=range
│
└── ¿El usuario tiene limitaciones motrices (servicio de gobierno, software médico)?
     └── Sí → NumberInput en lugar de Slider (GOV.UK/Nord pattern)
```

**Use Slider when:**
- El usuario ajusta un valor continuo o semi-continuo donde el arrastre es la interacción natural: volumen, brillo, zoom, opacidad, velocidad.
- Se filtra por rango donde ambos extremos son ajustables: precio $X–$Y, edad X–Y años, tiempo de X a Y.
- Los valores discretos son más de 4-5 (para 2-4 opciones, usar SegmentedControl o RadioGroup).
- El contexto es configuración de sensibilidad o threshold donde la percepción visual de la posición importa.

**Do NOT use Slider when:**
- El valor debe ser exacto sin margen de error (cantidades financieras, dosis médicas) — usar NumberInput.
- El usuario tiene capacidades motrices limitadas o usa tecnología asistiva de alternativa al mouse — ofrecer fallback con NumberInput.
- Hay menos de 4-5 opciones discretas — usar SegmentedControl o RadioGroup.
- El rango de valores es enorme (0–100,000) y el usuario normalmente necesita un valor muy específico — usar NumberInput.

---

## Visual variations

### Por tamaño

| Size | Track height | Thumb size | Thumb radius | Font size | Mark size |
|------|-------------|-----------|--------------|-----------|-----------|
| sm   | 4px         | 16px      | 9999px (circular) | 12px | 4px |
| md   | 6px         | 20px      | 9999px (circular) | 14px | 5px |
| lg   | 8px         | 24px      | 9999px (circular) | 16px | 6px |

### Colores

| Elemento | Color | Variable semántica |
|----------|-------|-------------------|
| Track (inactivo) | #e3e3e8 | `border/default` (aclarado) |
| Fill (activo) | #2659EB | `interactive/default` |
| Thumb bg | #FFFFFF | `surface/default` |
| Thumb border | #2659EB | `interactive/default` |
| Thumb shadow | rgba(0,0,0,0.15) | — |
| Mark activo (en fill) | #FFFFFF | `surface/default` |
| Mark inactivo | #D1D1D9 | `border/default` |
| Label fg | #6B7280 | `text/secondary` |
| Value label fg | #121212 | `text/primary` |

### Disabled state

| Elemento | Color |
|----------|-------|
| Track | #E3E3E8 |
| Fill | #D1D1D9 |
| Thumb bg | #F5F5F8 |

### Type=single vs Type=range

**single:** Un solo thumb. El fill va del origen (izquierda/0) al thumb. El `value-label` aparece sobre el thumb único.

**range:** Dos thumbs — `thumb` (mínimo, izquierda) y `thumb-end` (máximo, derecha). El fill va entre los dos thumbs. Cada thumb tiene su propio `aria-label` ("Valor mínimo" / "Valor máximo"). El `value-label` puede aparecer sobre cada thumb.

### Has Marks

Tick marks pequeños a lo largo del track en posiciones de step. Marks dentro del fill son blancos; marks fuera del fill son grises. Para scales no lineales (Free / 100GB / 1TB), los marks pueden tener labels de texto debajo.

### Has Input

Input numérico sincronizado, inspirado en Carbon. Aparece junto al label (izquierda del track en lg, debajo en sm/md). El usuario puede escribir el valor exacto o usar el slider — ambos se sincronizan. Por defecto `Has Input=false` ya que la mayoría de usos (volumen, brillo) no necesitan entrada de precisión.

---

## Design decisions

### 1. Type=single|range como variant (no componentes separados)

**Por qué:** Polaris usa un solo componente con valor type-switched (number vs [number, number]). El overhead de mantener dos imports separados no justifica la diferencia en contextos de producto donde ambos tipos son comunes. La mayoría de los productos de Zoom tienen ambos casos: volume slider (single) y price/time range filters (range).

**Tradeoff:** La tipificación es un union type, no tipos específicos. M3 y Spectrum prefieren componentes separados (`Slider` retorna siempre `number`, `RangeSlider` retorna siempre `[number, number]`) por claridad de types en TypeScript. Si type-safety fuese la prioridad absoluta, se separarían. Para un design system donde la simplicidad de API es prioritaria, la unificación es correcta.

### 2. Has Input boolean (default OFF)

**Por qué:** Carbon hace el input numérico obligatorio — es muy opinado y correcto para contextos enterprise de alta precisión. La mayoría de casos de uso de Slider en Zoom (volumen en meeting, brillo en ajustes, zoom level) son subjetivos — el usuario calibra por resultado visual, no por número. Para casos donde se necesita precisión (threshold de configuración, valores exactos de filtro), `Has Input=true` se activa.

**Tradeoff:** El default OFF significa que algunos equipos implementarán Sliders de precisión sin el input. La documentación debe indicar claramente cuándo activarlo: para cualquier contexto donde el usuario necesite ingresar un valor exacto o donde la precisión del valor es crítica.

### 3. aria-valuetext requerido para valores formateados

**Por qué:** Sin `aria-valuetext`, el screen reader anuncia el número crudo (50) en lugar del valor formateado ('50%' o '$50'). Un price slider que muestra "$50" pero anuncia "50" confunde al usuario de SR. Ant Design implementa esto por handle con `ariaValueTextFormatterForHandle`. Spectrum usa `formatOptions` con `Intl.NumberFormatOptions` — la solución más elegante (drives both visible label AND aria-valuetext from one prop). El diseñador debe especificar el formato en el `value-label` y el desarrollador debe wired `aria-valuetext` con el mismo formato.

**Tradeoff:** Requiere comunicación explícita entre diseño y desarrollo sobre el formato de valores. Sin esta comunicación, los valores de SR serán incorrectos. La especificación del formato debe incluirse en esta documentación.

### 4. Thumbs circulares siempre (border-radius: 9999px)

**Por qué:** El thumb circular es el estándar universal en los 14 sistemas que implementan Slider. Comunica claramente "este elemento se puede arrastrar" por su forma redonda (no rectangular). La consistencia cross-sistema reduce la curva de aprendizaje.

**Tradeoff:** Menos opciones de personalización visual. Si un contexto requiere un thumb cuadrado o de forma especial (ej. un controlador de EQ), sería un caso de personalización, no el default.

### Excluded combinations

```
Type=range + min > max (thumbs cruzados sin minSeparation) → inválido
Has Input=true + Size=sm → el input no tiene espacio visible adecuado
```

---

## Behavior

### Essential for design

**Arrastre del thumb:** El thumb sigue el cursor/touch a lo largo del track. La posición del thumb determina el valor proporcional entre `min` y `max`. Para sliders discretos (con `step`), el thumb snaps al step más cercano.

**Type=range — minSeparation:** Los dos thumbs no pueden cruzarse. Cuando el thumb mínimo alcanza al máximo (o viceversa), se detiene. Una `minSeparation` configurable permite que los thumbs se acerquen a menos que 1 step de distancia entre sí.

**Has Input sincronización:** El input numérico y el slider están sincronizados en tiempo real. Escribir un valor en el input mueve el thumb. Arrastrar el thumb actualiza el input. Si el usuario escribe un valor fuera del rango (< min o > max), el input muestra error y el thumb permanece en la posición válida más cercana.

**prefers-reduced-motion:** Las transiciones de thumb y fill deben pausarse con `@media (prefers-reduced-motion: reduce)`. WCAG 2.3.3.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Thumb (single) | `slider` | `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` | Anuncio correcto de valor y rango |
| Thumb min (range) | `slider` | + `aria-label="Valor mínimo"` | Distingue los dos thumbs para AT |
| Thumb max (range) | `slider` | + `aria-label="Valor máximo"` | Distingue los dos thumbs para AT |
| Label text | — | `id` referenciado por `aria-labelledby` en thumbs | Nombre accesible del control |
| Track marks (decorativo) | — | `aria-hidden="true"` | No son interactivos, ocultar del AT |
| Has Input field | — | `aria-label` o vinculado al label del slider | Input alternativo accesible |

### Keyboard navigation

Primary interactions (affect design):

```
Arrow Left / Arrow Down  → -1 step (decrementa)
Arrow Right / Arrow Up   → +1 step (incrementa)
Shift + Arrow            → ±10 steps (aceleración de incremento)
Page Down                → paso grande hacia abajo (~10% del rango)
Page Up                  → paso grande hacia arriba (~10% del rango)
Home                     → valor mínimo (min)
End                      → valor máximo (max)
Tab (Type=range)         → alterna entre thumb min y thumb max
```

Secondary interactions (dev reference):

```
Focus (click en track) → mueve thumb a la posición más cercana al click
Touch drag             → arrastre en mobile (requires touch-action: none en el thumb)
```

---

## Content guide

### Slot: label

Label descriptivo que identifica qué se está controlando:

- **Correcto:** "Volumen", "Brillo", "Tamaño de fuente", "Precio máximo"
- **Incorrecto:** "Slider", "Valor", "Ajustar"

El label es opcional visualmente (`Has Label=false`) pero el thumb SIEMPRE necesita un nombre accesible — si el label no es visible, `aria-label` en el thumb es obligatorio.

### Slot: value-label

Muestra el valor actual del thumb. Debe usar el mismo formato que se especificará en `aria-valuetext`:

- Porcentaje: "50%"
- Moneda: "$200"
- Unidades: "3 estrellas", "1.5x", "300ms"
- Sin unidad: "75" (solo cuando la unidad es obvia por el label)

El value-label aparece sobre el thumb durante la interacción (o siempre visible si es el patrón deseado).

### Slot: marks

Para sliders discretos, los marks indican las posiciones de snap. Si los marks tienen labels de texto (escala no linear), los textos deben ser cortos (1-2 palabras):

- **Correcto:** "Gratis / 100GB / 1TB / 10TB"
- **Correcto:** "Lento / Normal / Rápido"
- **Incorrecto:** labels de más de 3 palabras por mark (se superponen)

### Tipo de valor y aria-valuetext

Siempre especificar en la documentación del componente el formato de `aria-valuetext` para cada uso:

| Uso | value visible | aria-valuetext |
|-----|--------------|----------------|
| Volumen | 65 (o 65%) | "65 por ciento" o "65%" |
| Precio | $200 | "$200" o "200 dólares" |
| Rating | ★★★☆☆ | "3 de 5 estrellas" |

---

## Pre-build checklist

```
[ ] Type=single y Type=range generados como variants
[ ] Size sm, md, lg generados
[ ] Has Label toggle: muestra/oculta label slot
[ ] Has Value Label toggle: muestra/oculta value-label slot
[ ] Has Marks toggle: muestra/oculta marks slot
[ ] Has Input toggle: muestra/oculta input slot
[ ] Thumb circular (border-radius: 9999px) en todos los sizes
[ ] Fill color = interactive/default (azul)
[ ] Track color = border/default (gris claro)
[ ] Type=range: dos thumbs (thumb + thumb-end) visibles
[ ] Type=range: fill entre los dos thumbs (no desde el origen)
[ ] Disabled state: fill → border/disabled, thumb → surface/disabled
[ ] Focus ring 2px visible en thumb focused
[ ] aria-valuemin/max/now/text documentados en annotation
[ ] Formato de value-label especificado (ej. "50%" no "50")
[ ] Token prefix sld- aplicado (10 tokens)
```

---

## Related components

```
NumberInput  → cuando se necesita valor exacto sin arrastre
RangeInput   → nombre alternativo para Slider Type=range
SegmentedControl → cuando hay 2-5 opciones discretas con labels
Progress     → muestra progreso (no interactivo, diferente de Slider)
Rating       → selección de estrellas (variante semántica de slider)
```

---

## Reference: how other systems do it

**Material Design 3** ofrece cuatro configuraciones de slider: continuo (estándar), discreto (tick marks automáticos cuando `stepSize` está definido), centrado (desde el punto medio para valores bipolares como EQ), y range (RangeSlider como clase separada). La separación de `Slider` y `RangeSlider` como clases distintas es una decisión arquitectónica explícita: el dual-thumb requiere `minSeparation`, dos valores sincronizados, y lógica de estado fundamentalmente diferente. `setLabelFormatter()` debe también configurar `contentDescription` para SR — una trampa de developer conocida: el formatter solo cambia el texto visible, no el anuncio de AT.

**Spectrum/Adobe** se distingue por `formatOptions` con `Intl.NumberFormatOptions` — el motor i18n del navegador formatea tanto el label visible como `aria-valuetext` simultáneamente. "$50.00" o "50%" se formatea correctamente en todos los idiomas y es anunciado por SR sin configuración adicional. `isFilled` y `fillOffset` para tracks bipolares/centrados (controles de exposición, contraste). `trackGradient` para color pickers (hue, opacity). La solución más elegante de value formatting del Tier 1.

**Carbon/IBM** tiene la característica más notable: un input numérico persistente y siempre editable adyacente al thumb — el único sistema Tier 1 donde el input es parte del componente. `stepMultiplier` para Shift+Arrow con multiplicadores grandes (enterprise users necesitan cubrir rangos 0–1000 sin mantener arrow key por cientos de presses). Sin tooltip durante el arrastre — el input persistente ya muestra el valor en todo momento. `invalid`/`invalidText` para validación del input companion. La referencia para sliders enterprise de alta precisión.

**Polaris/Shopify** nombra el componente "RangeSlider" incluso para modo single-handle — "range" comunica "valor acotado" no la mecánica de arrastre. `value` acepta `number` (single) o `[number, number]` (dual) con type-switching en un componente. La documentación más honesta sobre las limitaciones de accesibilidad del dual-thumb: "multi-thumb ARIA patterns have inconsistent AT support on mobile" — con text field pairing como remediación documentada.

**Ant Design** es el más completo del Tier 1. `range` como prop con objeto de configuración avanzada (`{ draggableTrack, editable, minCount, maxCount }`). `marks` acepta objetos mapeando posición a ReactNode — escalas no lineales tipo "Free / 100GB / 1TB" con `step={null}` para snap solo en posiciones etiquetadas. `ariaValueTextFormatterForHandle` por handle — el API de aria-valuetext más explícito del Tier 1. `onChangeComplete` dispara solo al terminar el arrastre (no en cada pixel) — patrón de performance para server queries.

**Radix UI** es el primitivo headless de referencia: `Slider.Root` / `Slider.Track` / `Slider.Range` / `Slider.Thumb`. Array value (`[20, 80]`) crea dos thumbs independientemente estilizables. `Slider.Range` separado permite styling independiente del fill (necesario para tracks con gradiente de color). `inverted` para fill right-to-left. Toda la keyboard behavior y ARIA incorporados. Máxima flexibilidad para styling custom.

**Mantine** es la implementación Tier 3 más completa. `label` prop como formatter function (`(value) => `${value}%``) — tooltip flotante sobre el thumb durante interacción. `marks` array con posiciones etiquetadas. `RangeSlider` con `minRange` para prevenir que los thumbs se crucen. Shift+Arrow con multiplicador 10x incorporado. La referencia para built-in value tooltip formatter y labeled marks.

**Orbit (Kiwi.com)** tiene el patrón `valueDescription` — texto persistente debajo del slider que resume el rango seleccionado ("€50 – €200", "06:00 – 22:00"). Siempre visible durante y después de la interacción — superior a tooltips transitorios en mobile donde el thumb oscurece el valor durante el arrastre. La referencia para la descripción persistente de rango.

**GOV.UK** excluye Sliders explícitamente: "Require precise motor control incompatible with government services' obligation to serve users with a wide range of motor abilities." Text inputs y selects se usan en su lugar. Esta es la evidencia más fuerte del argumento de motor accessibility contra Sliders — y la razón por la que siempre se debe ofrecer un fallback con NumberInput cuando el contexto lo requiera.

**Nord (Nordhealth)** agrega la dimensión de seguridad clínica al argumento de GOV.UK: un arrastre accidental en un campo de dosis de medicamento es un problema de seguridad del paciente. Para software médico o de salud, text inputs con validación explícita son el reemplazo apropiado.

---

## Tokens

**10 tokens** · prefix `sld-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `sld/track` | `border/default` | Color del track inactivo |
| `sld/fill` | `interactive/default` | Color del fill activo |
| `sld/thumb-bg` | `surface/default` | Fondo del thumb (blanco) |
| `sld/thumb-border` | `interactive/default` | Borde del thumb |
| `sld/mark-active` | `surface/default` | Marks dentro del fill (blanco) |
| `sld/mark-inactive` | `border/default` | Marks fuera del fill (gris) |
| `sld/label-color` | `text/secondary` | Color del label de texto |
| `sld/value-color` | `text/primary` | Color del value label |
| `sld/disabled/fill` | `border/disabled` | Fill en estado disabled |
| `focus/ring` | `border/focus` | Focus ring 2px offset 2px en thumb |

### Spacing specs

```
Size sm: trackH=4px  thumb=16×16px  markSize=4px  labelGap=6px
Size md: trackH=6px  thumb=20×20px  markSize=5px  labelGap=8px
Size lg: trackH=8px  thumb=24×24px  markSize=6px  labelGap=10px

Track anatomy (horizontal):
  ┌─── track (gris, full width) ─────────────────────────────┐
  │  ████████████████████████●  ← thumb circular             │
  │  ↑ fill (azul, desde 0 al thumb)                         │
  └──────────────────────────────────────────────────────────┘

Range track anatomy:
  ┌─── track ─────────────────────────────────────────────────┐
  │  ─────●████████████████████████●────                      │
  │        ↑ min thumb   fill      ↑ max thumb               │
  └──────────────────────────────────────────────────────────┘

Thumb shadow: box-shadow 0 1px 4px rgba(0,0,0,0.15)
Thumb border: 1.5px solid sld/thumb-border
```
