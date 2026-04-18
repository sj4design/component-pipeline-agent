# ColorPicker

## Overview

ColorPicker es un selector de color interactivo que combina un área de gradiente de saturación/brillo en 2D, un slider de matiz (hue), un slider opcional de opacidad (alpha), inputs de texto para valores precisos (hex/rgb/hsl) y una paleta de presets. Se complementa con el sub-componente `ColorSwatch`, un bloque reutilizable para mostrar un color individual con indicadores de selección.

El picker cubre tres arquetipos de uso: **theming** (elección de color de marca), **design tool** (selección precisa con soporte multi-formato), y **annotation** (colores de resaltado/pluma). El layout se adapta a tres modos dimensionales según el contexto de inserción.

```
┌────────────────────────────────────────────────┐
│                                                │
│   SATURATION / LIGHTNESS 2D AREA               │
│                                          ●     │  ← cursor de selección
│                                                │
│   ████████████████████████████   HUE    [▸]   │  ← hue slider (0-360°)
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░   ALPHA  [▸]   │  ← alpha (si Alpha=yes)
│                                                │
│   [  💧 ]  [  #FF5733  ]  [rgb/hsl tabs]      │  ← eyedropper + input
│                                                │
│   ── Presets ──────────────────────────        │
│   ● ● ● ● ● ● ● ●   (ColorSwatch grid)        │
│                                                │
└────────────────────────────────────────────────┘
```

```
ColorSwatch (sub-componente standalone):
  ┌──┐  ┌──┐  ┌──┐
  │  │  │✓ │  │  │   sm (20px) / md (28px) / lg (36px)
  └──┘  └──┘  └──┘
default  selected  hover
```

El `ColorPicker` puede vivir como popover lanzado desde un trigger-swatch, o como panel inline siempre visible. El sub-componente `ColorSwatch` es reutilizable fuera del picker completo — para palettes de marca, grids de etiquetas o indicadores de estado.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
ColorSwatch:
  State:  default | hover | selected | focused | disabled
  Size:   sm | md | lg

ColorPicker:
  Layout: compact | default | expanded
  Format: hex | rgb | hsl | all
  Alpha:  no | yes
  State:  default | focused | disabled
```

Toggles (show/hide parts — do NOT generate extra variants):

```
ColorSwatch:
  👁 Show Checkmark

ColorPicker:
  (todos los slots son condicionales por Layout/Format/Alpha — no hay booleans extra)
```

### Figma properties panel

```
┌─────────────────────────────┐
│  ColorSwatch                │
│  ─────────────────────────  │
│  State   [default       ▼]  │
│  Size    [md            ▼]  │
│  ─────────────────────────  │
│  ☑ Show Checkmark           │
└─────────────────────────────┘

┌─────────────────────────────┐
│  ColorPicker                │
│  ─────────────────────────  │
│  Layout  [default       ▼]  │
│  Format  [hex           ▼]  │
│  Alpha   [no            ▼]  │
│  State   [default       ▼]  │
└─────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El usuario necesita elegir un color?
│
├─ ¿De una paleta predefinida limitada?
│   └─ ColorSwatch grid (palette constrained, Atlassian model)
│
├─ ¿Libre selección con precisión (design tool, theming)?
│   ├─ Inline siempre visible   → Layout=expanded / compact
│   └─ Popover desde trigger    → Layout=default
│
├─ ¿Solo mostrar un color sin interacción?
│   └─ ColorSwatch (State=default, no selectable)
│
└─ ¿El contexto tiene color-coding semántico fijo? (healthcare, alertas)
    └─ NO usar ColorPicker — usar paleta fija o nada
```

**Usar ColorPicker cuando:**
- El usuario debe elegir un color de marca, preferencia personal o anotación, y el conjunto de colores válidos no es predefinido o es muy amplio.
- Se necesita soporte para múltiples formatos de color (hex para desarrolladores, HSL para diseñadores, RGB para exportación).
- El contexto es theming, customización de tema, herramienta de diseño o herramienta de anotación.
- El producto ya tiene un conjunto de colores aprobados (presets) y se quiere ofrecer esa paleta como punto de partida.

**NO usar ColorPicker cuando:**
- Los colores tienen significado semántico crítico (rojo=error, amarillo=advertencia) y el usuario no debe cambiarlos — el libre albedrío viola convenciones de seguridad.
- El contexto es enterprise B2B sin flujos de selección de color del usuario (Carbon/IBM, Twilio, GitHub son exemplos que deliberadamente omiten el picker).
- La lista de colores válidos es pequeña y predefinida — usar `ColorSwatch` grid con `role="radiogroup"` es más accesible y tiene menor carga cognitiva.
- El componente está dentro de un contexto de formulario donde un `<input type="color">` nativo es suficiente para el caso de uso.

---

## Visual variations

### ColorSwatch

| Size | Dimensiones | Radio | Borde |
|------|-------------|-------|-------|
| sm   | 20×20 px    | 4 px  | 1 px  |
| md   | 28×28 px    | 6 px  | 1 px  |
| lg   | 36×36 px    | 8 px  | 2 px  |

**Estados del swatch:**
- **default** — borde `border/default` (#D0D0D9), sin indicador adicional.
- **hover** — borde intensificado a `text/secondary` (#6B7280), cursor pointer.
- **selected** — borde azul interactivo 2px + outline ring externo 2px; checkmark visible si `Show Checkmark=on`. El ring garantiza WCAG 1.4.1 (la selección nunca depende solo del color).
- **focused** — focus ring 2px (#3F64F2) sin borde adicional.
- **disabled** — opacidad 50%, sin interacción.

### ColorPicker — Layouts

| Layout   | Ancho | Área sat. H | Cols presets | Rows presets |
|----------|-------|-------------|--------------|--------------|
| compact  | 240px | 140px       | 5            | 2            |
| default  | 320px | 200px       | 8            | 3            |
| expanded | 400px | 260px       | 10           | 4            |

### ColorPicker — Formatos de input

- **hex** — Campo único `#RRGGBB`, validación 6 dígitos hex.
- **rgb** — Tres campos: R (0-255), G (0-255), B (0-255).
- **hsl** — Tres campos: H (0-360°), S (0-100%), L (0-100%).
- **all** — Tabs para elegir entre los tres formatos. Solo disponible en Layout=default y Layout=expanded.

### ColorPicker — Alpha

- **Alpha=no** — Solo hue slider. Opacidad siempre 100%.
- **Alpha=yes** — Slider adicional debajo del hue slider. Valores 0-100%. El chequerboard visible debajo del slider indica transparencia. Solo disponible en Layout=default/expanded (no en compact).

### Combinaciones excluidas

```
Layout=compact + Format=all    → No hay espacio para los input tabs
Layout=compact + Alpha=yes     → No hay espacio para el alpha slider
```

---

## Design decisions

### 1. Familia ColorSwatch + ColorPicker como componentes separados

**Por qué:** ColorSwatch es útil como primitive standalone — grids de etiquetas de Jira, palettes de documentos, indicadores de estado de color — sin necesitar el picker completo. Fluent 2 también separa SwatchPicker (estable) de ColorPicker (preview) porque el 90% de los casos de uso de enterprise son "elige de nuestra paleta aprobada", no "ingresa cualquier hex".

**Tradeoff:** Dos componentes para mantener vs. un solo componente con `withPicker={false}` (patrón Mantine). La separación es más descubrible y permite staged rollout — lanzar ColorSwatch estable antes que el picker completo si el producto aún no tiene todos los use cases definidos.

### 2. Tres layouts (compact/default/expanded) en lugar de tamaños responsivos

**Por qué:** Los contextos de inserción del picker son fundamentalmente distintos, no variaciones de la misma pantalla. Compact para sidebars y paneles inline (240px encaja en un panel de propiedades). Default para popovers de formulario (320px es el ancho de popover estándar). Expanded para páginas dedicadas de configuración de marca (400px con presets completos). Ant Design y Mantine confirman que el ancho del picker está directamente ligado al contexto de inserción, no al viewport.

**Tradeoff:** Tres layouts multiplican los frames de Figma. La alternativa (un solo layout con overflow responsivo) crea problemas de truncación en contextos compactos sin solucionar el problema de raíz.

### 3. Format como property (hex/rgb/hsl/all)

**Por qué:** Desarrolladores prefieren hex (copia directa a CSS); diseñadores prefieren HSL (más intuitivo para ajustes de tono y saturación); integraciones de backend a menudo necesitan RGB. Ant Design es el sistema más claro en este punto: ofrece format switcher porque "cada tipo de usuario tiene un formato preferido" y forzar uno solo genera fricción innecesaria. El valor `all` con tabs es la solución para equipos mixtos developers+designers.

**Tradeoff:** Format=all requiere espacio para tabs — no cabe en Layout=compact, de ahí la exclusión explícita.

### 4. Saturation area como slider 2D (WAI-ARIA compliant)

**Por qué:** El gradient 2D es inherentemente inaccesible sin dispositivo apuntador. WAI-ARIA Color Picker pattern resuelve esto usando `role="slider"` con dos dimensiones en el mismo elemento, Arrow keys para navegación (X=saturación, Y=brillo) y `aria-valuetext` descriptivo ("Saturation 80%, Brightness 60%"). Sin este patrón, los usuarios de teclado o screen reader no pueden usar el picker — falla WCAG 1.3.3 (Sensory Characteristics).

**Tradeoff:** La navegación 2D con Arrow keys es menos natural que el drag para usuarios con mouse. La solución de Spectrum es la más completa — Arrow keys + Shift+Arrow para incrementos grandes + `aria-valuetext` descriptivo en cada cambio.

### 5. Input hex siempre visible como alternativa accesible

**Por qué:** WCAG 2.1 SC 1.3.3 requiere que no haya contenido accesible solo a través de características sensoriales. El gradient 2D y los sliders son visuales/motriz. Los inputs de texto hex/rgb/hsl son la alternativa mandatoria para usuarios de teclado y screen reader. Todos los 7 sistemas que tienen picker con gradient canvas incluyen inputs de texto.

**Tradeoff:** Los inputs ocupan espacio en el layout compact. En compact (240px), solo se muestra el formato hex para mantener el componente manejable.

---

## Behavior

### Essential for design

El `ColorPicker` abre como popover por encima del trigger-swatch al hacer click. Al abrirse, el foco se mueve al primer control interactivo dentro del picker (input hex o área de saturación si no hay input). El foco queda atrapado dentro del popover hasta que se cierra. Al cerrar, el foco regresa al trigger.

La actualización del color es **continua durante la interacción** — `onChange` se dispara en cada frame de drag o cada Arrow key para permitir preview en tiempo real. `onChangeEnd` se dispara al soltar para persistir el valor. Esta distinción es crítica para evitar flooding de API calls.

Al seleccionar un swatch de preset, el cursor del saturation area salta a la posición correspondiente al color del swatch.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Contenedor del picker | `dialog` | `aria-label="Selector de color"` | Focus trap; Escape cierra |
| Saturation area 2D | `slider` | `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow=[s,v]`, `aria-valuetext="Saturación 80%, Brillo 60%"` | Alternativa de teclado al drag; screen readers leen el valor descriptivo |
| Hue slider | `slider` | `aria-valuemin=0`, `aria-valuemax=360`, `aria-valuenow=[deg]`, `aria-label="Matiz"` | Control de tono con valor numérico |
| Alpha slider | `slider` | `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow=[pct]`, `aria-label="Opacidad"` | Control de transparencia |
| ColorSwatch (preset) | `button` | `aria-label="Color #FF5733"`, `aria-pressed="true/false"` | Screen reader anuncia el color y el estado de selección |
| Input hex/rgb/hsl | `textbox` | `pattern="[0-9a-fA-F]{6}"`, `aria-label="Valor hex"` | Alternativa accesible al gradient para entrar valores precisos |
| Eyedropper | `button` | `aria-label="Selector de color del cursor"` | Función browser EyeDropper API |
| Trigger swatch | `button` | `aria-label="Selector de color, color actual: #FF5733"`, `aria-haspopup="dialog"` | Screen reader anuncia el color actual antes de abrir |

### Keyboard navigation

Primary interactions (affect design):

```
Saturation area:
  Arrow Left/Right   → mueve cursor horizontal (± 1% saturación)
  Arrow Up/Down      → mueve cursor vertical (± 1% brillo)
  Shift + Arrow      → incremento 10%

Hue slider:
  Arrow Left/Right   → cambia matiz ± 1°
  Shift + Arrow      → cambia matiz ± 10°

Alpha slider:
  Arrow Left/Right   → cambia opacidad ± 1%
  Shift + Arrow      → cambia opacidad ± 10%

ColorSwatch (en grid de presets):
  Arrow keys         → navega entre swatches
  Enter / Space      → selecciona swatch

Tab:
  Navega entre controles: saturation area → hue slider → alpha slider
  → eyedropper → input → presets

Escape:
  Cierra picker popover; foco regresa al trigger
```

Secondary interactions (dev reference):

```
Eyedropper:
  Click              → activa browser EyeDropper API (requiere user gesture)
  
Input hex/rgb/hsl:
  Enter              → aplica el valor escrito
  Blur               → aplica si válido; revierte si inválido
  
Trigger swatch (desde fuera):
  Enter / Space      → abre picker popover
```

---

## Content guide

### Slot: saturationArea

El área de gradiente 2D siempre ocupa el slot superior del picker. El eje X controla la saturación (0% izquierda → 100% derecha); el eje Y controla el brillo (100% arriba → 0% abajo). El fondo del área se actualiza en tiempo real al mover el hue slider.

**Cursor:** círculo blanco de 12px con borde oscuro para visibilidad sobre todos los colores. Nunca usar un cursor que dependa del color del fondo para ser visible.

### Slot: hueSlider

Slider horizontal con gradiente de 0° a 360°. La thumbheel es blanca con borde oscuro. Altura fija de 16px, radio tipo pill. Siempre presente en todos los layouts.

### Slot: alphaSlider

Solo visible cuando `Alpha=yes`. Mismo tamaño que hue slider. El fondo del slider muestra el chequerboard (indicador de transparencia) debajo del gradiente del color actual → transparente.

### Slot: eyedropper

Ícono de acción inline. Al activar, llama a la browser EyeDropper API. Solo disponible en browsers que soportan la API (Chrome, Edge). En Safari/Firefox, el slot puede ocultarse condicionalmente.

### Slot: input

Input adaptativo según `Format`. En Format=hex: un campo de texto con prefijo "#". En Format=rgb/hsl: tres campos numerados. En Format=all: tabs que intercambian entre los formatos.

**Ejemplo de label accesible:** `<label for="hex-input">Hex</label>`, no solo placeholder.

### Slot: presets

Grid de ColorSwatch. Los colores son configurados por el producto. Número de columnas según Layout: 5 (compact), 8 (default), 10 (expanded). Siempre 2-4 filas para no dominar el espacio visual. El grupo tiene `role="listbox"` con `aria-label="Colores predefinidos"`.

### Slot: preview

Rectángulo de previsualización del color actual. Útil en Layout=expanded para mostrar el color antes y después. Tamaño sugerido: 40×40px al lado del input.

---

## Pre-build checklist

```
COLORSWATCH
□ 3 sizes definidos: sm(20)/md(28)/lg(36)
□ 5 states: default, hover, selected, focused, disabled
□ Selected state: ring externo 2px + borde azul 2px (no solo color)
□ Checkmark boolean layer nombrado "checkIcon"
□ aria-pressed en selected; aria-label="Color #[hex]"
□ Focus ring 2px con offset 2px

COLORPICKER — ESTRUCTURA
□ 3 layouts: compact(240px), default(320px), expanded(400px)
□ 4 formatos: hex, rgb, hsl, all
□ 2 alpha modes: no, yes
□ 3 states: default, focused, disabled
□ Exclusiones aplicadas: compact+all y compact+alpha eliminadas
□ Frame count net: 60 frames (72 brutos − 12 exclusiones)

ACCESIBILIDAD
□ role="dialog" en popover con aria-label
□ Saturation area: role="slider" con aria-valuetext descriptivo
□ Hue slider: role="slider" con aria-valuemin/max/now
□ Alpha slider: role="slider" con aria-valuemin/max/now
□ Trigger swatch: aria-label dinámico con color actual
□ Presets: role="listbox" + role="button" por swatch
□ Input hex siempre visible como alternativa de teclado

TOKENS
□ Prefix cp- aplicado a todas las variables
□ Swatch sizes vinculados a tokens de sizing
□ Ring y border states vinculados a tokens de focus/interactive/border
□ Slider height 16px como token
□ Padding interno de 16px (spacing/4) como token
```

---

## Related components

```
ColorSwatch     → sub-componente de ColorPicker; también standalone para palettes
Select          → cuando la lista de colores es finita y predefinida (≤ 15 opciones)
Popover         → wrapper de overlay para el trigger-popover pattern
Input           → input de texto para entrada directa de valores hex
Slider          → primitive base para hue/alpha sliders (si existen en el DS)
Badge           → alternativa si solo necesitas mostrar un color con label de texto
```

---

## Reference: how other systems do it

### Spectrum (Adobe) — 6 sub-componentes composables + `Color` object

Spectrum construye el color picker más arquitecturalmente correcto del corpus — no un componente monolítico sino **6 sub-componentes composables**: `ColorArea` (gradiente 2D), `ColorSlider` (channel slider), `ColorSwatch` (preview/display), `ColorWheel` (hue wheel), `ColorField` (text input), y `ColorPicker` (all-in-one). El `Color` object como valor tipado es la decisión más importante — lleva los valores de cada canal con conversiones entre color spaces built-in.

El `channel` prop en `ColorSlider` es lo que hace composable la arquitectura: cualquier slider puede controlar cualquier canal (hue, saturation, lightness, alpha) de cualquier color space. Sin este nivel de generalización, se necesitaría un slider dedicado por canal. La accesibilidad es la más completa de Tier 1: `aria-valuetext` descriptivo en el `ColorArea`, Arrow keys para navegación bidireccional, anuncios de posición.

### Ant Design — 3 formatos + presets con named groups

Ant Design ColorPicker ofrece tres formatos con un **format switcher UI**: hex, RGB y HSB. El usuario elige en qué formato trabajar. `presets` con **named groups** (`[{label: "Recent", colors: [...]}, {label: "Brand", colors: [...]}]`) permite tanto paletas estáticas como dinámicas (recent colors list) en el mismo componente. El insight clave: el format switcher es la feature que hace usable el picker para audiencias mixtas de designers y developers.

`panelRender` como escape hatch permite reemplazar completamente el panel manteniendo el trigger + popover behavior — útil para pickers completamente customizados sin perder el overlay management.

### Atlassian — radiogroup semantics para palette constrained

El picker de Atlassian es una **palette grid** (radio buttons), NO un free-form picker. Para Jira labels y Trello cards, un conjunto fijo de colores evita selecciones inaccesibles. `role="radiogroup"` + `role="radio"` es semánticamente perfecta para "elige UN color de una lista predefinida". `checkMarkColor` por swatch garantiza que el checkmark tenga contraste suficiente contra el fondo del swatch (blanco o negro por swatch). Es el modelo ARIA más correcto para palette-constrained pickers.

### Fluent 2 (Microsoft) — SwatchPicker (stable) + ColorPicker (preview)

Fluent 2 tiene la arquitectura más pragmática: **SwatchPicker** (stable, curated palette, swatch ring indicator) y **ColorPicker** (preview, free-form). El insight clave: el 90% de la selección de color en enterprise es "elige de nuestra paleta aprobada". El ring alrededor del swatch selected indica selección sin depender del color del swatch — contraste garantizado independientemente del color, cumpliendo WCAG 1.4.1.

### Mantine — `withPicker=false` como toggle entre free-form y swatch-only

Mantine ColorPicker es el más completo de Tier 3: gradient canvas + hue slider + alpha opcional + 5 formatos (hex, rgb, hsl, hsla, hexa) + `swatches` array + **`withPicker={false}`** que oculta el gradient canvas y muestra solo swatches. Un solo componente sirve tanto el use case de SwatchPicker como el free-form picker. `size` prop para cinco tamaños. Sliders con `role="slider"` y swatches con `role="listbox"`.

### Polaris (Shopify) — HSB only + live preview + critical a11y gap

Polaris ColorPicker es el más limitado en a11y: solo modelo HSB, sin keyboard navigation en el color area (drag-only), sin `role="slider"` en la hue/saturation area. El punto fuerte es el `onChange` continuo para live preview en tiempo real durante el drag — ideal para theme customization. **Nota importante:** Polaris es el caso de estudio de lo que no hacer en accesibilidad — keyboard/screen reader users no pueden usar el picker sin pointing device. Nuestro sistema resuelve esto con `role="slider"` + Arrow keys + inputs de texto como alternativa.

### Chakra UI v3 — FormControl integration + format prop

Chakra v3 ColorPicker integra automáticamente con `FormControl` context para `aria-invalid` / `aria-required`. `format` prop selecciona el color model. Dark mode via tokens automático. La integración con FormControl hace que el error state del picker se propague de la misma forma que cualquier otro form field.

### Radix UI (Themes) — HEX/HSL/HSB + popover

Radix Themes ColorPicker (no Primitive) soporta HEX/HSL/HSB modes, gradient canvas con alpha slider, trigger popover. Solo disponible en Radix Themes, no como Primitive standalone. El approach de Radix demuestra que el picker es más una feature de product design system que un primitive genérico — confirma la decisión de la mayoría de sistemas de no incluirlo.

### Sistemas que lo omiten deliberadamente

15 de 24 sistemas no tienen color picker, 9 con razones documentadas profundamente: **Material Design 3** (HCT Dynamic Color = el sistema genera paletas, usuarios no seleccionan), **Carbon** (enterprise B2B sin selección de color del usuario), **GOV.UK** (paleta fija GDS garantiza WCAG 2.2 AA), **Nord** (**RIESGO DE SEGURIDAD CLÍNICA** — color-coding en healthcare es regulatorio), **Gestalt** (token system enforces brand + a11y a escala). Evaluar estas razones antes de implementar — si el contexto tiene color-coding conventions que son safety-critical, NO implementar color picker.

---

## Tokens

**22 tokens** · prefix `cp-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `cp/swatch/sm` | `sizing/20` | Tamaño del swatch pequeño |
| `cp/swatch/md` | `sizing/28` | Tamaño del swatch mediano |
| `cp/swatch/lg` | `sizing/36` | Tamaño del swatch grande |
| `cp/swatch/radius/sm` | `radius/xs` (4px) | Radio swatch sm |
| `cp/swatch/radius/md` | `radius/sm` (6px) | Radio swatch md |
| `cp/swatch/radius/lg` | `radius/md` (8px) | Radio swatch lg |
| `cp/swatch/border/default` | `border/default` | Borde en estado default |
| `cp/swatch/border/selected` | `interactive/default` | Borde azul en selected |
| `cp/swatch/focused/ring` | `focus/ring` | Focus ring 2px |
| `cp/saturation/h/compact` | `sizing/140` | Altura área sat. compact |
| `cp/saturation/h/default` | `sizing/200` | Altura área sat. default |
| `cp/saturation/h/expanded` | `sizing/260` | Altura área sat. expanded |
| `cp/w/compact` | `sizing/240` | Ancho picker compact |
| `cp/w/default` | `sizing/320` | Ancho picker default |
| `cp/w/expanded` | `sizing/400` | Ancho picker expanded |
| `cp/slider/h` | `sizing/16` | Altura sliders hue/alpha |
| `cp/slider/radius` | `radius/pill` (9999px) | Radio pill de sliders |
| `cp/input/h` | `sizing/32` | Altura input hex/rgb/hsl |
| `cp/gap/sm` | `spacing/1.5` (6px) | Gap entre swatches small |
| `cp/gap/md` | `spacing/2` (8px) | Gap entre swatches default |
| `cp/padding` | `spacing/4` (16px) | Padding interior del picker |
| `cp/preset/gap` | `spacing/1` (4px) | Gap dentro del preset grid |

### Spacing specs

```
ColorSwatch
  sm:   20×20px, radius 4px, border 1px
  md:   28×28px, radius 6px, border 1px
  lg:   36×36px, radius 8px, border 2px
  selected ring: 2px border + 2px outline (offset 2px del borde)

ColorPicker — padding interno: 16px todos los lados
ColorPicker — gap entre bloques internos: 8px (default), 6px (compact)

Sliders (hue + alpha):
  height: 16px
  radius: pill (9999px)
  thumb: 20px circle, borde 2px blanco, sombra sutil

Saturation area cursor:
  circle: 12px, borde 2px blanco, inner shadow

Preset grid:
  gap entre swatches: 4px
  columnas: 5 (compact) | 8 (default) | 10 (expanded)

Input hex/rgb/hsl:
  height: 32px
  radius: 6px (matches sm control)
```
