# ColorPicker — Especificación Completa

## Descripción general

Selector de color completo con área de saturación 2D, sliders de hue y alpha, inputs de formato (hex/rgb/hsl) y grilla de presets. Compuesto por `ColorSwatch` (building block reutilizable para paletas) y `ColorPicker` (selector completo con tres layouts según el contexto de uso).

### Wireframe estructural

**ColorSwatch:**
```
┌──────┐
│      │  ← color fill
│  ✓   │  ← checkmark (selected state)
└──────┘
```

**ColorPicker (Layout=default):**
```
┌────────────────────────────────────┐
│ [     Saturation Area 2D      ] ☁  │  ← eyedropper
│       (click/drag cursor)          │
├────────────────────────────────────┤
│ [Preview] [■■■■■■■■■■■] Hue        │
│           [░░░░░░░░░░░] Alpha      │
├────────────────────────────────────┤
│  #1A5FEB      [Hex ▼]  ← format   │
├────────────────────────────────────┤
│ ○ ○ ○ ○ ○ ○ ○ ○  ← presets grid  │
└────────────────────────────────────┘
```

**Anatomía de slots — ColorSwatch:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `color` | shape | Sí | Fill del color representado |
| `checkIcon` | icon | No | Visible en estado selected |

**Anatomía de slots — ColorPicker:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `saturationArea` | shape | No | Área 2D para saturation/brightness |
| `hueSlider` | container | No | Slider horizontal 0-360° |
| `alphaSlider` | container | No | Slider de transparencia |
| `eyedropper` | icon-action | No | Browser EyeDropper API |
| `input` | container | No | Input hex/rgb/hsl |
| `presets` | container | No | Grilla de ColorSwatches |
| `preview` | shape | No | Preview del color seleccionado |

### Properties y valores

**ColorSwatch:**
| Property | Valores |
|----------|---------|
| **State** | `default` · `hover` · `selected` · `focused` · `disabled` |
| **Size** | `sm` · `md` · `lg` |

**ColorPicker:**
| Property | Valores |
|----------|---------|
| **Layout** | `compact` · `default` · `expanded` |
| **Format** | `hex` · `rgb` · `hsl` · `all` |
| **Alpha** | `no` · `yes` |
| **State** | `default` · `focused` · `disabled` |

**Frame counts:**
- ColorSwatch: State(5) × Size(3) = **15 frames**
- ColorPicker: Layout(3) × Format(4) × Alpha(2) × State(3) = 72 − 12 exclusiones = **60 frames**
- **Total: 75 frames**

**Exclusiones ColorPicker:**
| Combinación excluida | Razón |
|----------------------|-------|
| `Layout=compact + Format=all` | No hay espacio para todos los tabs de inputs |
| `Layout=compact + Alpha=yes` | No hay espacio para el alpha slider |

### Panel de Figma

**ColorSwatch:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| State | Variant | default / hover / selected / focused / disabled |
| Size | Variant | sm / md / lg |
| 👁 Show Checkmark | Boolean | true/false |

**ColorPicker:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| Layout | Variant | compact / default / expanded |
| Format | Variant | hex / rgb / hsl / all |
| Alpha | Variant | no / yes |
| State | Variant | default / focused / disabled |

---

## Cuándo usar

**Usar ColorPicker cuando:**
- El usuario necesita seleccionar un color exacto (brand color, text color, background fill)
- La aplicación gestiona temas o paletas personalizadas
- El diseño requiere selección de colores con alpha (transparencia)

**Layout=compact:** sidebar de herramienta de diseño, panel lateral de editor de presentaciones
**Layout=default:** popover en formulario de configuración (ej. "Color de acento")
**Layout=expanded:** página dedicada de branding, herramienta avanzada de diseño

**No usar ColorPicker cuando:**
- El usuario solo elige entre un set fijo de colores predefinidos → usar RadioGroup con ColorSwatches
- El color es parte de un preset limitado (ej. 8 colores de tags) → lista de ColorSwatches directamente

---

## Variaciones visuales

### ColorSwatch — Tamaños

| Size | Dimensiones | Border radius | Border |
|------|------------|---------------|--------|
| `sm` | 20×20px | 4px | 1px |
| `md` | 28×28px | 6px | 1px |
| `lg` | 36×36px | 8px | 2px |

### ColorSwatch — Estados

| Estado | Apariencia |
|--------|-----------|
| `default` | Border sutil `#D1D1D9` |
| `hover` | Border más oscuro `#6B7280` |
| `selected` | Border brand 2px + outline 2px exterior + checkmark opcional |
| `focused` | Focus ring 2px |
| `disabled` | Border sutil + opacity 50% |

### ColorPicker — Layouts

| Layout | Ancho | Saturation H | Presets |
|--------|-------|-------------|---------|
| `compact` | 240px | 140px | 5 cols × 2 filas |
| `default` | 320px | 200px | 8 cols × 3 filas |
| `expanded` | 400px | 260px | 10 cols × 4 filas |

### ColorPicker — Format=all

Muestra tabs en el input area: `Hex` · `RGB` · `HSL` — solo disponible en Layout `default` y `expanded`.

---

## Decisiones de diseño

### 1. Familia ColorSwatch + ColorPicker

ColorSwatch standalone es útil para mostrar paletas o listados de colores sin el picker completo. Reutilizable como building block en DataGrid (cell con color), Tags coloreados, y cualquier selección de color de preset.

### 2. Tres layouts según contexto

- **Compact (240px):** Para sidebars y paneles estrechos donde el space es crítico. Sin Format=all ni Alpha.
- **Default (320px):** Form popover estándar. El más versátil.
- **Expanded (400px):** Para herramientas de diseño donde el usuario necesita precisión máxima.

### 3. Saturation area como slider 2D

WAI-ARIA Color Picker pattern define el área 2D como `role="slider"` con `aria-valuetext` descriptivo (ej. _"Saturación 80%, Brillo 60%"_). Las arrow keys mueven el cursor en la dirección correspondiente.

### 4. Eyedropper (EyeDropper API)

Solo disponible en Chrome 95+. Degradar gracefully: ocultar el botón en browsers que no soportan `window.EyeDropper`. En Figma modelar como slot siempre visible; la implementación condiciona visibilidad.

---

## Comportamiento e interacción

### Roles ARIA

| Elemento | Rol / Atributo |
|----------|----------------|
| Contenedor principal | `role="dialog"` + `aria-label="Selector de color"` |
| Área de saturación | `role="slider"` + `aria-valuetext="Saturación X%, Brillo Y%"` |
| Hue slider | `role="slider"` + `aria-valuemin="0"` + `aria-valuemax="360"` + `aria-valuenow` |
| Alpha slider | `role="slider"` + `aria-valuemin="0"` + `aria-valuemax="100"` + `aria-valuenow` |
| ColorSwatch | `role="button"` + `aria-label="Color #1A5FEB"` + `aria-pressed="true/false"` |
| Input hex/rgb | `role="textbox"` con validación de patrón |
| Eyedropper | `aria-label="Selector de color del cursor"` |

### Navegación de teclado

| Tecla | Comportamiento |
|-------|----------------|
| `Tab` | Navega entre controles (saturation → hue → alpha → input → swatches) |
| `Arrow` en saturation | Mueve el cursor 2D (1% por tecla) |
| `Arrow` en hue slider | Cambia 1° (Shift+Arrow = 10°) |
| `Arrow` en alpha slider | Cambia 1% (Shift+Arrow = 10%) |
| `Enter` en swatch | Selecciona ese color |
| `Escape` | Cierra el picker sin cambio |

### Focus

- Ring de focus 2px en cada control activo
- Indicador de cursor visible en el área de saturación (cross-hair)
- Focus trap dentro del dialog popover mientras está abierto
- Return focus al trigger al cerrar

### WCAG 1.4.1 — Color no es el único indicador

El color seleccionado debe tener un indicador adicional al fill: el checkmark visible en ColorSwatch estado `selected`, o el border 2px exterior. Opcional: mostrar el ratio de contraste WCAG del color seleccionado vs fondo para guiar elecciones accesibles.

---

## Guía de contenido

**Presets:**
- Incluir siempre colores básicos del sistema (brand, neutral, semánticos)
- Organizar presets en orden: brand → semánticos → neutros → custom del usuario
- Tooltip sobre cada swatch: mostrar el nombre del color si tiene uno (ej. "Azul marca")

**Input de formato:**
- `hex`: Escribir en formato `#RRGGBB` o `RRGGBB` (normalizar automáticamente)
- `rgb`: Campos separados R / G / B con rango 0-255
- `hsl`: Campos H° / S% / L%
- Validar en blur, no en cada keystroke

**Texto accesible del color:**
- `aria-label` del swatch debe incluir el valor: `"Color #1A5FEB"` o `"Azul marca #1A5FEB"`
- Nunca usar solo el fill como indicador de qué color es

---

## Pre-build checklist

**ColorSwatch:**
- [ ] Estado `selected` tiene checkmark + border 2px + outline: dos indicadores visuales simultáneos
- [ ] Tamaños sm/md/lg verificados con grillas de 5, 8 y 10 columnas respectivamente
- [ ] El fill del swatch es variable — en Figma usar un color de muestra (ej. `#1A5FEB`)

**ColorPicker:**
- [ ] Layout `compact` no incluye frames con `Format=all` ni `Alpha=yes`
- [ ] Área de saturación tiene cursor cross-hair visible en el punto seleccionado
- [ ] Sliders de hue y alpha tienen thumb visible con hover/focus states
- [ ] Preview muestra el color actual en un cuadrado suficientemente grande para evaluar
- [ ] Format=all tiene tabs visibles sobre el input area
- [ ] Alpha slider tiene fondo de checkerboard para indicar transparencia

---

## Componentes relacionados

| Componente | Relación |
|------------|----------|
| **Slider** | Hue y alpha sliders usan el mismo patrón visual interno |
| **Input** / **TextField** | Input de valor hex/rgb/hsl |
| **Popover** / **Tooltip** | ColorPicker se presenta como popover sobre el trigger |
| **Tabs** | Format=all usa tabs para cambiar entre hex/rgb/hsl |

---

## Referencia: ¿cómo lo hacen otros sistemas?

| Sistema | Layouts | Alpha | Eyedropper | Presets |
|---------|---------|-------|------------|---------|
| **Spectrum (Adobe)** | 1 fijo | Sí | Sí | Sí |
| **Ant Design** | Expanded con hue/alpha | Sí | Sí (Chrome) | Presets customizables |
| **Radix UI** | Flexible (headless) | Sí | No | No nativo |
| **MUI** | 1 fijo | Sí | No | Sí |
| **Carbon (IBM)** | No incluido nativo | — | — | — |
| **Polaris (Shopify)** | Compact fijo | No | No | No |

**Consenso:** Área de saturación 2D + hue slider son core. Alpha y eyedropper como opt-in. Los mejores sistemas (Spectrum, Ant) soportan todos los formatos hex/rgb/hsl.

---

## Tokens y espaciado

**Prefijo:** `cp-` · **Total tokens:** 22 · **Modo:** Components

### Tokens de ColorSwatch

| Token | Valor DS | Uso |
|-------|----------|-----|
| `cp/swatch/sm` | `sizing/20` | Tamaño 20×20px |
| `cp/swatch/md` | `sizing/28` | Tamaño 28×28px |
| `cp/swatch/lg` | `sizing/36` | Tamaño 36×36px |
| `cp/swatch/radius/sm` | `radius/xs` | Border radius sm |
| `cp/swatch/radius/md` | `radius/sm` | Border radius md |
| `cp/swatch/radius/lg` | `radius/md` | Border radius lg |
| `cp/swatch/border/default` | `border/default` | Border reposo |
| `cp/swatch/border/selected` | `interactive/default` | Border seleccionado |
| `cp/swatch/focused/ring` | `focus/ring` | Focus ring |

### Tokens de ColorPicker

| Token | Valor DS | Uso |
|-------|----------|-----|
| `cp/w/compact` | `sizing/240` | Ancho layout compact |
| `cp/w/default` | `sizing/320` | Ancho layout default |
| `cp/w/expanded` | `sizing/400` | Ancho layout expanded |
| `cp/saturation/h/compact` | `sizing/140` | Alto área saturación compact |
| `cp/saturation/h/default` | `sizing/200` | Alto área saturación default |
| `cp/saturation/h/expanded` | `sizing/260` | Alto área saturación expanded |
| `cp/slider/h` | `sizing/16` | Alto de los sliders hue/alpha |
| `cp/slider/radius` | `radius/pill` | Border radius de sliders |
| `cp/input/h` | `sizing/32` | Alto del input de formato |
| `cp/gap/sm` | `spacing/1.5` | Gap interno pequeño |
| `cp/gap/md` | `spacing/2` | Gap interno mediano |
| `cp/padding` | `spacing/4` | Padding del contenedor |
| `cp/preset/gap` | `spacing/1` | Gap entre swatches del preset |
