# Slider

## Descripción general

Slider es el control de rango deslizable del sistema de diseño: una pista horizontal con uno (Type=single) o dos thumbs (Type=range) que el usuario arrastra para seleccionar un valor o rango. Implementa el patrón ARIA `role="slider"` con `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, y el crítico `aria-valuetext` para valores formateados (porcentajes, unidades, etc.). Es el patrón estándar para controles continuos donde la posición relativa comunica el valor — volumen, brillo, opacidad, umbral, precios en un rango de filtro.

```
Type=single, Size=md:
  Volumen                             50%
  ┌──────────────────────────────────────────────────────┐
  ──────────────────●───────────────────────────────────
  └──────────────────────────────────────────────────────┘
  fill (azul)       thumb (blanco + sombra)   track (gris)

Type=range, Size=md (precio min–max):
  Precio                           $200 — $800
  ──────────────●─────────────────●──────────────────────
                min               max
                fill entre los dos thumbs

Size=sm (compact, para sidebars):
  ─────●──────────────────────────────

Has Marks (valores discretos):
  ─────|──────|──────●──────|──────|──────
       0     25     50     75    100

Has Input (sincronizado):
  ────────────────────●──────────  ┌──────┐
                                   │  75  │
                                   └──────┘
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Type → single | range
Size → sm | md | lg
```

Toggles:

```
👁 Has Label       → muestra/oculta el label superior (default: on)
👁 Has Value Label → muestra/oculta el valor actual (default: on)
👁 Has Marks       → muestra/oculta los tick marks (default: off)
👁 Has Input       → muestra/oculta el input numérico sincronizado (default: off)
```

Texto editable:

```
✏️ Label       → "Volumen"
✏️ Value Label → "50%"
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  Slider                                                  │
│  ──────────────────────────────────────────────────────  │
│  Type  [ single           ▼ ]                            │
│  Size  [ md               ▼ ]                            │
│  ──────────────────────────────────────────────────────  │
│  👁 Has Label       [ on  ]                              │
│  👁 Has Value Label [ on  ]                              │
│  👁 Has Marks       [ off ]                              │
│  👁 Has Input       [ off ]                              │
│  ✏️ Label       [ Volumen                          ]     │
│  ✏️ Value Label [ 50%                              ]     │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El usuario necesita seleccionar un valor numérico?
                    │
                    ▼
       ¿El valor es continuo (no discreto)?
       ├── Sí → Slider (visualización del rango)
       └── No → NumberInput (valores exactos con stepper)
                    │
                    ▼
       ¿Necesita seleccionar un rango (min + max)?
       ├── Sí → Type=range (dos thumbs)
       └── No → Type=single (un thumb)
                    │
                    ▼
       ¿La precisión exacta importa más que la visualización?
       └── Sí → NumberInput o Slider + Has Input
```

**Usar Slider cuando:**
- Control de volumen o brillo (0–100%)
- Opacidad de un layer en un editor
- Rango de precios en filtros de búsqueda (Type=range)
- Umbral de sensibilidad en configuración
- Velocidad de reproducción (0.5×–2×)
- Cualquier valor donde la posición relativa es intuitiva

**NO usar Slider cuando:**
- El usuario necesita ingresar un valor exacto sin arrastrar → usar `NumberInput`
- Hay valores discretos con pocas opciones (ej. 1–5) → usar `Rating` o `Select`
- El valor es un código o ID → usar `TextField`
- Es un progreso (no editable por el usuario) → usar `ProgressBar`

---

## Variaciones visuales

### Size

| Size | Track H | Thumb Size | Mark Size | Font | Label gap |
|------|---------|-----------|----------|------|-----------|
| sm   | 4px     | 16px      | 4px      | 12px | 6px       |
| md   | 6px     | 20px      | 5px      | 14px | 8px       |
| lg   | 8px     | 24px      | 6px      | 16px | 10px      |

### Colores

| Parte | Token | Color |
|-------|-------|-------|
| Track (vacío) | `sld/track` | border/default — gris claro |
| Fill (relleno) | `sld/fill` | interactive/default — azul |
| Thumb bg | `sld/thumb-bg` | surface/default — blanco |
| Thumb border | `sld/thumb-border` | interactive/default — azul |
| Mark activo | `sld/mark-active` | surface/default — blanco |
| Mark inactivo | `sld/mark-inactive` | border/default — gris |
| Label | `sld/label-color` | text/secondary |
| Value label | `sld/value-color` | text/primary |

---

## Decisiones de diseño

**1. Type=single|range como variants (no componentes separados)** — Polaris usa un solo componente con value type-switched. El overhead de mantener 2 imports no justifica la diferencia — la mayoría de productos tiene ambos casos. La estructura visual es idéntica excepto por el segundo thumb.

**2. Has Input default OFF** — Carbon hace el input paired obligatorio — muy opinado. La mayoría de casos de Zoom (volumen, brillo) no necesitan input numérico. Para precisión crítica (configuración de umbral) se activa como enhancement.

**3. aria-valuetext requerido para valores formateados** — sin `aria-valuetext`, el SR anuncia el número crudo (50) en lugar del valor formateado ("50%", "$200", "3 estrellas"). Es la diferencia entre una experiencia comprensible y una confusa para usuarios de lector de pantalla.

**4. Has Marks para valores discretos** — los tick marks en la pista comunican que el slider tiene posiciones fijas (no continuo). Necesario para sliders de pasos enteros (0/25/50/75/100). Has Marks=off es el continuo estándar.

**5. Thumb siempre circular (pill)** — `border-radius: 9999px`. Los thumbs cuadrados o rectangulares confunden el affordance de arrastre. Blanco con borde de color fill y shadow para contraste sobre cualquier fondo de pista.

### Combinaciones excluidas

```
(ninguna — Type × Size no tiene exclusiones)
```

---

## Comportamiento

### Esencial para diseño

- **Type=range: los dos thumbs son independientes** — el thumb izquierdo es el mínimo y el derecho el máximo. No pueden cruzarse (el mínimo no puede ser mayor que el máximo).
- **Has Value Label: posición del label** — puede ser un tooltip sobre el thumb (se mueve con él) o un label estático al lado del label principal. En Figma se modela como label estático con el valor editable.
- **Has Input sincronizado** — el NumberInput al lado del slider muestra el mismo valor. Cambiar el input mueve el thumb; arrastrar el thumb actualiza el input. Patrón Carbon para precisión.
- **Fill: desde el origen o entre thumbs** — Type=single: fill desde el extremo izquierdo hasta el thumb. Type=range: fill solo entre los dos thumbs.
- **Disabled state** — el fill pasa a `sld/disabled/fill` (gris), el thumb se opaca. No modelado como variant separado — se gestiona via opacity en implementación.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Thumb | `role="slider"` (automático con `type="range"`) | SR anuncia tipo de control |
| Rango | `aria-valuemin` + `aria-valuemax` + `aria-valuenow` | SR anuncia rango y valor actual |
| Texto | `aria-valuetext="50%"` | SR anuncia el valor formateado, no el crudo |
| Type=range: thumb min | `aria-label="Valor mínimo"` | Diferencia los dos thumbs para SR |
| Type=range: thumb max | `aria-label="Valor máximo"` | Diferencia los dos thumbs para SR |
| Label | `aria-labelledby` apuntando al label visible | Asocia el nombre con el slider |

### Navegación por teclado

```
←/→ ó ↑/↓    → ±1 paso (step configurable)
Shift+Arrow  → ±stepMultiplier (10× por defecto)
Page Up/Down → paso grande (largeStep configurable)
Home/End     → valor mínimo/máximo
Tab          → mueve foco entre thumbs (Type=range) o sale (Type=single)
```

---

## Guía de contenido

**Label:**
- Nombre descriptivo: "Volumen", "Brillo", "Precio máximo", "Umbral de detección"
- No genérico: no "Valor" o "Rango"

**Value Label (valor visible):**
- Con unidad: "50%", "$200", "1.5×", "3 estrellas"
- Type=range: "200 — 800" (con guion y espacio) o "$200 – $800"
- aria-valuetext: mismo valor que el label visible

**Has Marks (labels de marcas):**
- Solo en extremos o valores clave: "0", "50", "100"
- No en cada marca (legibilidad)
- Para tiempo: "Lun", "Mié", "Vie"

---

## Pre-build checklist

```
□ ¿role="slider" en cada thumb (automático con type="range")?
□ ¿aria-valuemin, aria-valuemax, aria-valuenow actualizados en cada cambio?
□ ¿aria-valuetext con valor formateado ("50%", no "50")?
□ ¿Type=range: aria-label diferenciado en cada thumb?
□ ¿Has Label: aria-labelledby apuntando al label?
□ ¿←→ Arrow: ±1 paso; Shift+Arrow: ±10 pasos?
□ ¿Home/End: valor min/max?
□ ¿Type=range: thumbs no se cruzan (min ≤ max)?
□ ¿Has Input sincronizado bidireccional?
□ ¿Has Marks: tick marks alineados con step values?
□ ¿Thumb: tap target mínimo 44×44px en mobile?
```

---

## Componentes relacionados

```
NumberInput    → para valores numéricos exactos con stepper
Rating         → para evaluación discreta (1–5 estrellas)
ProgressBar    → para progreso no editable
RangeFilter    → filtro de precio en search (usa Type=range internamente)
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Range | Marks | Input paired | ARIA | Diferenciador |
|---------|-------|-------|-------|-------------|------|--------------|
| **Material Design 3** | Slider | Sí (RangeSlider) | Sí | No | slider | Discrete/continuous; centered track (Centered) |
| **Spectrum (Adobe)** | Slider / RangeSlider | Sí (separado) | Sí | No | slider | Separate RangeSlider; formatOptions Intl |
| **Carbon (IBM)** | Slider | No nativo (single) | Sí | Sí (obligatorio) | slider | Input siempre visible; no range nativo |
| **Polaris (Shopify)** | RangeSlider | Sí | No | No | slider | value puede ser [min,max] |
| **Atlassian** | Slider | No nativo | No | No | slider | Simple; sin range |
| **Ant Design** | Slider | Sí (range prop) | Sí | No | slider | marks objeto key→label; tooltip por thumb |
| **Twilio Paste** | — | — | — | — | — | Sin componente dedicado |
| **shadcn/ui** | Slider | Sí | No | No | slider | Radix Slider base; value array |
| **Chakra UI** | Slider | No nativo | No | No | slider | SliderThumb + SliderTrack composable |
| **Fluent 2** | Slider | No nativo | Sí | No | slider | step prop; marks |
| **Mantine** | Slider / RangeSlider | Sí (separado) | Sí | No | slider | marks con label; minRange (range); thumbFromOutside |
| **Radix UI** | Slider | Sí | No | No | slider | value array; inverted; orientation |

**Patrones clave de la industria:**
1. **`aria-valuetext` (Spectrum, Ant)** — crítico para valores no numéricos o formateados. Spectrum usa `formatOptions` de Intl.NumberFormat. Ant usa `tooltip.formatter`. Sin esto el SR dice "50" en lugar de "50%".
2. **Spectrum RangeSlider como componente separado** — diferente de la mayoría que usa una prop `range`. La justificación: RangeSlider tiene dos thumbs con ARIA independiente, y separar los componentes evita lógica condicional compleja.
3. **Carbon input obligatorio** — decisión opinada: siempre muestra el NumberInput sincronizado al lado. Útil en contextos de precisión, pero add overhead visual para casos como volumen donde es innecesario.
4. **Ant Design `marks` como objeto** — `{ 0: '0°', 26: '26°', 37: '37°', 100: '100°' }` — permite labels en posiciones arbitrarias (no solo uniformes). El más flexible del mercado para sliders con marcas semánticas.

---

## Tokens

**10 tokens** · prefijo `sld-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `sld/track` | `border/default` | Pista vacía — gris claro |
| `sld/fill` | `interactive/default` | Pista rellena — azul |
| `sld/thumb-bg` | `surface/default` | Fondo del thumb — blanco |
| `sld/thumb-border` | `interactive/default` | Borde del thumb — azul |
| `sld/mark-active` | `surface/default` | Tick mark activo (sobre fill) |
| `sld/mark-inactive` | `border/default` | Tick mark inactivo (sobre track) |
| `sld/label-color` | `text/secondary` | Color del label del slider |
| `sld/value-color` | `text/primary` | Color del value label |
| `sld/disabled/fill` | `border/disabled` | Fill en estado disabled |
| `focus/ring` | `border/focus` | Focus ring del thumb |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Size sm: track:4px · thumb:16px · mark:4px · font:12px  │
│  Size md: track:6px · thumb:20px · mark:5px · font:14px  │
│  Size lg: track:8px · thumb:24px · mark:6px · font:16px  │
│                                                          │
│  Thumb: siempre circular (border-radius: 9999px)         │
│  Thumb shadow: 0 1px 4px rgba(0,0,0,0.15)               │
│                                                          │
│  Estructura:                                             │
│  [Label]                          [Value Label]          │
│  ────────────────●──────────────────────────             │
│  (fill azul)     (thumb)           (track gris)          │
│                                                          │
│  Frames totales:                                         │
│  Type(2) × Size(3) = 6 frames                           │
└──────────────────────────────────────────────────────────┘
```
