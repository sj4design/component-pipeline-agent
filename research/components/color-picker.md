# Color Picker — Component Research

**Date:** 2026-04-17
**Mode:** Max (all 24 systems, all patterns)
**Systems analyzed:** 24
**Systems with Color Picker:** 9 — Spectrum, Polaris, Atlassian (palette-only), Ant Design, Lightning, Radix (Themes), Chakra (v3), Fluent 2, Mantine
**Systems without (mostly with documented reasons):** 15 — M3 (dynamic color system), Carbon (enterprise data), Paste, Primer, shadcn, Playbook, Cedar, Wise, Dell, GOV.UK (fixed palette = WCAG guaranteed), Base Web, Gestalt, Orbit, Evergreen (fixed viz palette), Nord (**patient safety risk**)

**Note:** Color picker is the component with the highest intentional-absence rate — 15/24 systems have no color picker, and 9 of those 15 have deeply documented reasons. Evaluate the absence reasons BEFORE deciding to implement.

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | HCT Dynamic Color = el sistema genera paletas; usuarios no seleccionan colores | Material Theme Builder (herramienta, no componente) |
| Carbon (IBM) | Enterprise B2B sin user color selection; `@carbon/colors` = palette de diseño, no UI | `@carbon/colors` tokens |
| Twilio Paste | No use case en Twilio Console | `<input type="color">` nativo |
| GitHub Primer | Label colors = product-specific custom impl | Custom; `<input type="color">` |
| shadcn/ui | No componente oficial; pattern = react-colorful + Popover custom | react-colorful + shadcn Popover |
| Playbook | Sin use case documentado | — |
| REI Cedar | Product variant swatches ≠ picker genérico | — |
| Wise | No user color selection en fintech | — |
| Dell | Theme options no son user-facing | — |
| GOV.UK | Paleta fija GDS garantiza WCAG 2.2 AA; colores seleccionables = riesgo de accesibilidad | Fixed GDS palette |
| Base Web (Uber) | Color es `createTheme` en build-time; sin runtime selection | `Popover` + `Input` custom |
| Gestalt (Pinterest) | Color como contenido/datos; token system enforces brand + a11y a escala | Token system |
| Orbit (Kiwi) | Travel booking sin color selection workflows | — |
| Evergreen | Analytics con paleta fija colorblind-safe; B2B sin customización | Fixed categorical palette |
| **Nord** | **PATIENT SAFETY RISK — clinical color coding (red=critical, yellow=warning) es safety-critical; colores user-seleccionables underminan convenciones regulatorias de healthcare** | CSS custom properties para theming institucional |

---

## How Systems Solve It

### Spectrum (Adobe) — "El más elegante: 6 sub-componentes composables + `Color` object"

Spectrum construye el color picker más arquitecturalmente correcto del corpus — no un componente monolítico sino **6 sub-componentes composables** que los teams combinan para el picker exacto que necesitan. `ColorArea` (gradient 2D), `ColorSlider` (channel slider), `ColorSwatch` (preview/display), `ColorWheel` (hue wheel), `ColorField` (text input para hex/canales), y `ColorPicker` (el todo-en-uno). El **`Color` object** (no hex string) como valor tipado es la decisión más importante — lleva los valores de cada canal de forma numerically-aware, con conversiones entre color spaces built-in, sin necesitar una librería externa de color math.

**Design Decisions:**
- **6 sub-componentes composables:** → Photoshop, Illustrator y XD necesitan pickers completamente distintos — uno con wheel, otro con sliders horizontales, otro solo hex → un solo componente monolítico no puede ser óptimo para todos → **Para tu caso:** si el producto tiene múltiples contextos de color selection (inline, popover, panel, modal), la arquitectura composable permite reusar piezas sin duplication
- **`Color` object (no string):** → hex string no puede representar canales alpha, no tiene contexto de color space, y requiere parsing manual → el `Color` object lleva todo el contexto matemático → **Para tu caso:** considerar el type de valor del picker — `Color` object es más poderoso pero requiere conversion a hex/css para storage; hex string es simpler pero pierde información de color space
- **`colorSpace: "hsb" | "hsl" | "rgb"` en ColorArea:** → el mismo 2D picker puede mostrar la representación de cualquier color model → **Para tu caso:** ofrecer `colorSpace` permite al consumer elegir el modelo que mejor entiende su usuario
- **`channel` prop en ColorSlider:** → cualquier slider puede controlar cualquier canal de cualquier color space → → **Para tu caso:** la generalización a través del `channel` prop es lo que hace composable la arquitectura de Spectrum — sin esto, necesitarías un slider dedicado por canal

**Notable Props:** `colorSpace: "hsb" | "hsl" | "rgb"` (ColorArea); `channel: "hue" | "saturation" | "lightness" | "alpha"` (ColorSlider); `ColorPicker` (all-in-one); `ColorSwatch` (display-only)

**Accessibility:** `ColorSlider` tiene `role="slider"` con `aria-label` por canal. `ColorArea` tiene navegación bidireccional con Arrow keys y anuncios descriptivos de posición. La a11y más completa de Tier 1 para color pickers.

---

### Ant Design — "El más versátil T1: 3 formatos + presets con named groups"

Ant Design ColorPicker ofrece tres formatos con un **format switcher UI**: hex, RGB y HSB. El usuario puede elegir en cuál formato trabajar — developers piensan en hex, designers en HSB, y developers de backend en RGB. `presets` con **named groups** (`[{label: "Recent", colors: [...]}, {label: "Brand", colors: [...]}]`) permite tanto paletas estáticas (brand colors) como dinámicas (recent colors list) en el mismo componente. `panelRender` como escape hatch reemplaza completamente el panel mientras conserva el trigger + popover behavior.

**Design Decisions:**
- **Multi-format con switcher:** → cada tipo de usuario tiene un formato preferido; forzar uno solo crea friction innecesaria → **Para tu caso:** el format switcher es la feature que hace usable el picker para audiencias mixtas (designers + developers)
- **`presets` con named groups:** → la palette estática no cubre el "recent colors" use case; named groups permiten ambos sin duplicar el API → **Para tu caso:** el `presets` API de Ant es el modelo más flexible para palette + recent

**Notable Props:** `format: "hex" | "rgb" | "hsb"`, `presets: [{label, colors}]`, `disabledAlpha`, `showText`, `panelRender`

**Accessibility:** ⚠️ Trigger swatch es `<button>` con `aria-label` del color actual. Format inputs con labels. PERO la color area y sliders carecen de `role="slider"` con `aria-value*` — gap similar a Polaris.

---

### Atlassian — "El más accesible: radiogroup semantics para palette constrained"

Atlassian's color picker es una **palette grid** (radio buttons), NO un free-form picker. Para Jira labels y Trello cards, un conjunto fijo de colores evita selecciones inaccesibles o clashing. La decisión de usar `role="radiogroup"` + `role="radio"` es semánticamente perfecta para "elige UN color de una lista predefinida". `checkMarkColor` por swatch garantiza que el checkmark de selección tenga contraste suficiente contra el fondo del swatch (blanco o oscuro por swatch).

**Design Decisions:**
- **Palette constrained (no free-form):** → colores inaccesibles (bajo contraste contra texto blanco o negro) son imposibles de seleccionar → el sistema garantiza WCAG desde el design → **Para tu caso:** si el producto tiene un conjunto fijo de colores permitidos, la palette grid es MEJOR UXMENTE que un free-form picker — menos decisiones, cero errores de accesibilidad
- **`radiogroup` / `radio` ARIA:** → es la semántica correcta para single-select de un conjunto predefinido → `aria-checked` en lugar de `aria-selected` → **Para tu caso:** si implementas palette grid, este es el modelo ARIA correcto

**Notable Props:** `colors: [{label, value}]`, `selectedColor`, `onChange`, `checkMarkColor: "white" | "default"` per color option

**Accessibility:** La mejor semántica ARIA para palette-constrained pickers. `radiogroup` + `radio` + `aria-label` (nombre del color) + `aria-checked`. Teclado: Arrow keys para navegar swatches.

---

### Fluent 2 (Microsoft) — "Staged rollout: SwatchPicker (stable) + ColorPicker (preview)"

Fluent 2 tiene la arquitectura más pragmática: **SwatchPicker** (stable, curated palette de Office/Teams, swatch ring indicator para estado selected sin depender de color) y **ColorPicker** (preview, free-form). El insight clave: 90% de la selección de color en enterprise es "elige de nuestra paleta aprobada", no "ingresa cualquier hex". Lanzar SwatchPicker stable permite cubrir el 90% del use case inmediatamente; el free-form picker puede madurar en preview sin comprometer el API del sistema.

**Design Decisions:**
- **Ring indicator para swatch selected state:** → un checkmark sobre un swatch puede no tener suficiente contraste; el ring alrededor del swatch indica selección sin depender del color del swatch → → **Para tu caso:** el ring es el mejor indicador de selección para swatches — contraste garantizado independientemente del color del swatch

**Notable Props:** SwatchPicker: curated palettes, ring indicator; ColorPicker: free-form (preview), gradient canvas

**Accessibility:** Swatch ring para selected state sin reliance en color. Sliders con `role="slider"`.

---

### Mantine — "`withPicker=false` como toggle entre free-form y swatch-only"

Mantine ColorPicker es el más completo de Tier 3: gradient canvas + hue slider + optional alpha + 5 formatos (hex, rgb, hsl, hsla, hexa) + `swatches` array + **`withPicker={false}`** que oculta el gradient canvas y muestra solo swatches. Esta última feature hace que Mantine's single component sirva tanto el use case de Fluent 2's SwatchPicker como el free-form picker.

**Notable Props:** `format: "hex" | "rgb" | "hsl" | "hsla" | "hexa"`, `swatches: string[]`, `withPicker: boolean` (default true), `fullWidth`, `size`

**Accessibility:** Sliders con `role="slider"`. Swatches con `role="listbox"`/`role="option"`. `aria-valuenow` en sliders.

---

### Polaris (Shopify) — "HSB only + live preview + critical a11y gap"

Polaris ColorPicker es el más limitado en a11y: solo modelo HSB, sin keyboard navigation en el color area (drag-only), sin `role="slider"` en la hue/saturation area. El punto fuerte es el `onChange` continuo para live preview en tiempo real durante el drag — ideal para theme customization donde el merchant ve los cambios al instante.

**Notable Props:** `color: HSBAColor`, `onChange`, `allowAlpha`, `fullWidth`

**Accessibility:** ⚠️ CRITICAL A11Y GAP — keyboard/screen reader users no pueden usar el picker sin pointing device.

---

### Salesforce Lightning — "Three selection methods: palette + gradient + hex"

Lightning tiene tres modos de selección en un componente: swatch palette (paleta predefinida), hue-saturation gradient (free-form), y hex input (precisión). Diseñado para Salesforce admins customizando branding sin conocimiento técnico.

---

### Chakra (v3) — "FormControl integration + format prop"

Chakra v3 ColorPicker integra automáticamente con `FormControl` context para `aria-invalid` / `aria-required`. `format` prop selecciona el color model. Dark mode via tokens automático.

---

### Radix UI (Themes only) — "HEX/HSL/HSB + popover"

Radix Themes ColorPicker (no Primitive) soporta HEX/HSL/HSB modes, gradient canvas con alpha slider, trigger popover. Solo en Radix Themes, no disponible como Primitive standalone.

---

## Pipeline Hints

**Archetype recommendation:** `form-control`
Rationale: Color Picker es un form control que acepta y retorna un valor de color. El usuario interactúa con él para seleccionar un valor — igual que un input o select.

**Slot consensus:** (9 sistemas con color picker)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| trigger-swatch | icon-action | no | 7/9 | Color preview que abre el picker popover; inline pickers no lo tienen |
| color-area / gradient-canvas | container | no | 6/9 | 2D area de selección de saturation/lightness; ausente en palette-only (Atlassian) |
| hue-slider | container | no | 7/9 | Hue channel slider; horizontal o radial (wheel) |
| alpha-slider | container | no | 5/9 | Opacity channel slider; opt-in en todos |
| color-wheel | container | no | 2/9 | Wheel alternativo al hue slider; Spectrum ColorWheel |
| hex-input / channel-inputs | container | no | 7/9 | Text inputs para valores precisos; alternativa accesible al gradient area |
| format-switcher | container | no | 3/9 | Toggle entre hex/rgb/hsb; Ant, Mantine, Chakra |
| presets / swatches-grid | container | no | 5/9 | Palette de colores predefinidos |
| value-display | text | no | 4/9 | Texto del color actual junto al trigger |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| format/colorSpace | variant | hex/rgb/hsl/hsb | 6/9 | Core selection axis; Mantine tiene 5 formats |
| hasAlpha | boolean | true/false | 6/9 | Alpha channel opt-in; `disabledAlpha` en Ant, `allowAlpha` en Polaris |
| swatches/presets | variant | color[] | 5/9 | Preset colors array |
| hasPicker | boolean | true/false | 1/9 | Mantine `withPicker=false` para swatch-only |
| isPopover | boolean | true/false | 7/9 | Trigger + popover mode; algunos inline (Polaris, Spectrum ColorArea) |
| value | variant | Color object / hex string | varies | Spectrum usa `Color` object; otros hex string o HSBAColor object |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasAlpha | 6/9 | false | Alpha channel opt-in |
| hasSwatches | 5/9 | false | Preset palette visible |
| hasTextInput | 7/9 | true | Hex/channel text input alternative |
| withPicker | 1/9 | true | Mantine: false = swatch-only mode |
| isPopover | 7/9 | true | Most pickers use trigger + popover pattern |
| showText | 1/9 | false | Ant: show color value text next to trigger |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 9/9 | Trigger swatch con color actual | |
| popover-open | 7/9 | Picker panel abierto; focus management dentro | |
| gradient-dragging | 6/9 | Cursor changed; color updating live | |
| slider-focus | 7/9 | Focus ring en slider; Arrow keys para ajuste | |
| swatch-selected | 5/9 | Ring o checkmark en swatch activo | |
| hex-input-editing | 7/9 | Text cursor en hex input | |
| disabled | 4/9 | Trigger opaco; sin interacción | |
| error (invalid hex) | 3/9 | Input error state; sin actualizar el color | |

**Exclusion patterns found:**
- gradient-area × keyboard-only users — el gradient area 2D es inaccesible sin pointing device; hex/channel inputs son la alternativa mandatoria
- color-only swatch selection × a11y — checkmark/ring siempre requerido además del color; swatch selected state no puede depender solo del color del borde

**Building block candidates:**
- channel-slider → `.ColorSlider` — Spectrum lo formaliza; el slider para hue/saturation/lightness/alpha
- swatch-grid → `.ColorSwatchGrid` — Atlassian lo formaliza con radiogroup semantics
- color-area → `.ColorArea` — Spectrum lo formaliza como sub-componente

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| format | hex, rgb, hsl, hsb, hsla, hexa | varies | Core; algunos permiten multi-format con switcher |
| colorSpace | hsb, hsl, rgb | 2/9 | Spectrum; determina el modelo del color area |
| defaultFormat | hex | 4/9 | Default cuando se ofrecen múltiples formatos |

**A11y consensus:**
- Color sliders (hue, saturation, lightness, alpha): DEBEN usar `role="slider"` con `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label` (nombre del canal)
- Palette/swatch grids: `role="listbox"` + `role="option"` (o `role="radiogroup"` + `role="radio"` para single-select con radio semantics) — Atlassian's radiogroup model es el más correcto para single-select constrained
- Selected swatch: ring o checkmark visible SIEMPRE además del color — `aria-checked="true"` / `aria-selected="true"`
- MANDATORIO: hex input o channel inputs como alternativa accesible al gradient area — el gradient 2D es inusable para keyboard/screen reader sin esta alternativa (WCAG 2.1 SC 1.3.3)
- Trigger button: anuncia el color actual en `aria-label` (e.g., "Color picker, current color: #FF5733")
- Popover: focus management al abrir/cerrar; focus trap dentro del popover; Escape cierra
- Gradient area keyboard: Arrow keys = ajuste de saturation (X) y lightness (Y); debe tener `aria-label` describiendo la 2D navigation
- Color announcement: cuando el color cambia, anunciar el nuevo valor via `aria-live="polite"` o updating `aria-label` del trigger
- No color-only: selección de swatch y estados de error nunca dependen solo del color

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template | Same component set |
| 40–70% | Extension | Same component set + property |
| < 40% | Separate | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Free-form picker (gradient + sliders + hex) | 100% | Template | 2D gradient + hue slider + hex input | Spectrum, Ant, Polaris, Lightning, Mantine, Chakra |
| Palette-constrained (swatch grid only) | 20% | Separate | Solo swatches predefinidos, sin gradient area | Atlassian, Fluent 2 SwatchPicker, Mantine withPicker=false |
| Swatch + free-form hybrid | 70% | Template | Preset palette + gradient canvas | Ant (presets), Mantine (swatches + picker), Lightning |
| Inline (always-visible) vs. popover-triggered | 70% | Template | Placement determines trigger vs. no trigger | Spectrum ColorArea (inline), Polaris (inline), Ant (popover default) |
| Alpha-enabled picker | 80% | Template | Adds alpha slider | Most, opt-in |
| Multi-format picker | 60% | Extension | Format switcher + input adapts per model | Ant, Mantine, Chakra |
| NOT a color picker — Color token display | 0% | Not-a-picker | Swatch para mostrar un color, no seleccionarlo | ColorSwatch |
| NOT a color picker — Theme builder | 0% | Not-a-picker | M3 Dynamic Color; herramienta de diseño | Material Theme Builder |

---

## What Everyone Agrees On

1. **Hex input is mandatory as fallback:** Every system with a gradient picker provides a hex/text input as an accessible alternative. Without it, the picker fails WCAG 1.3.3 (Sensory Characteristics).

2. **Selected swatch needs non-color indicator:** All systems use either a ring border, checkmark, or both to indicate the selected swatch. Color-only selection indication fails WCAG 1.4.1 (Use of Color).

3. **Alpha is opt-in:** No system enables alpha by default. The default is fully opaque color selection; alpha is an explicit addition when the product needs opacity control.

4. **Popover-triggered is the dominant pattern:** 7/9 systems open the picker in a popover. Inline-always-visible pickers are less common and typically used in dedicated settings/theme panels.

5. **Continuous onChange during drag:** Every picker that supports live preview fires onChange continuously during interaction, not only on release. This enables real-time preview in surrounding UI.

---

## Where They Disagree

**¿Free-form picker o palette constrained?**
- **Option A: Free-form (gradient + sliders)** (Spectrum, Ant, Polaris, Lightning, Mantine) — máxima flexibilidad; útil en design tools, theme builders, custom data vis
- **Option B: Palette constrained (swatch grid)** (Atlassian, Fluent 2 SwatchPicker, Mantine withPicker=false) — previene colores inaccesibles; menor cognitive load; correcto para productos con paleta corporativa fija
- **Para tu caso:** Si el producto tiene una paleta predefinida de N colores, la palette grid es SUPERIOR al free-form picker — menos errores, mejor a11y, menor complejidad

**¿`Color` object o hex string como valor?**
- **Option A: `Color` object** (Spectrum) — type-safe; conversiones built-in; preserva color space context; requires conversion para storage
- **Option B: Hex string** (Ant, Mantine, shadcn) — simple; directo a CSS y storage; pierde color space info
- **Option C: `HSBAColor` object** (Polaris) — específico al modelo HSB; más tipado que hex pero menos general que Color
- **Para tu caso:** Hex string es suficiente para la mayoría de casos; `Color` object solo si el producto maneja múltiples color spaces

**¿Un componente (Mantine `withPicker`) o dos (Fluent 2 SwatchPicker + ColorPicker)?**
- **Option A: Único con prop** (Mantine) — menor número de componentes; API más simple; un componente grande
- **Option B: Dos componentes** (Fluent 2) — cada uno con API perfecta para su use case; staged rollout posible; más componentes
- **Para tu caso:** Para productos con ambos use cases (palette + free-form), un componente con prop es más ergonómico; para grandes design systems donde los casos de uso son muy distintos, la separación en dos componentes es más mantenible

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Trigger swatch → popover picker | Swatch trigger + popover con full picker UI | Form fields, inline color inputs | Ant, Chakra, Radix |
| Inline picker (always visible) | Picker siempre visible en el panel | Theme settings, design tool panels | Spectrum ColorArea, Polaris |
| Palette grid solo | Grid de swatches radio buttons | Label colors, category colors, brand palette | Atlassian, Fluent 2 SwatchPicker |
| Picker + presets | Free-form picker + swatches debajo | Design systems con brand palette + custom | Ant (presets), Mantine, Lightning |

**Free-form picker completo (Ant Design / Mantine):**
```
┌──────────────────────────────────┐
│  ┌───────────────────────────┐   │
│  │   SATURATION/LIGHTNESS    │   │
│  │   GRADIENT AREA (2D)      │ ○ │ ← selection cursor
│  └───────────────────────────┘   │
│  ████████████████████████  HUE   │ ← hue slider
│  ░░░░░░░░░░░░░░░░░░░░░░░░  ALPHA │ ← alpha slider (opt-in)
│  [HEX: #FF5733] [RGB: 255,87,51] │ ← format inputs
│  ○ ○ ● ○ ○  (format switcher)    │
│  ─ Presets ─────────────────     │
│  ● ● ● ● ● ● ●                  │
└──────────────────────────────────┘
```

**Palette grid (Atlassian — `radiogroup`/`radio`):**
```
┌────────────────────┐
│  Select label color│
│  ● ● ● ● ● ●      │  ← role="radiogroup"
│  ● ●[●]● ● ●      │  ← selected swatch con ring
│         ↑           │
│    checkmark +      │
│    ring indicator   │
└────────────────────┘
```

**Trigger swatch → popover (default pattern):**
```
[████████] ← trigger swatch (button con aria-label="Color picker, current: #FF5733")
      ↓ click
┌────────────────────────────────┐
│  [GRADIENT AREA] ...           │
│  ...                           │
└────────────────────────────────┘
```

---

## Risks to Consider

**Risk 1: Gradient area no accesible por teclado** (HIGH — WCAG 1.3.3)
El gradient 2D es inherentemente inaccesible sin pointing device. Keyboard users no pueden navegar X e Y simultáneamente con un solo control.
**Mitigation:** Hex input SIEMPRE visible como alternativa. Si se implementan Arrow keys en el gradient, deben mover el cursor en la dimensión X (saturation) o Y (lightness) con modificadores (e.g., Shift = Y). `role="slider"` con AMBAS dimensiones documentadas.

**Risk 2: Selected swatch solo visible por color** (HIGH — WCAG 1.4.1)
Un swatch seleccionado que solo muestra su color más saturado (o un borde del mismo color) falla Use of Color.
**Mitigation:** Ring de 2-3px alrededor del swatch (Fluent 2 model) o checkmark con `checkMarkColor` adaptado (Atlassian model). Siempre `aria-checked="true"` en el swatch activo.

**Risk 3: Color picker en contextos donde los colores tienen significado fijo** (HIGH — Safety risk)
En healthcare (Nord), government (GOV.UK), o sistemas de alertas, los colores tienen significado semántico entrenado. Un color picker que permite al usuario cambiar los colores puede causar que interpretaciones correctas de alertas se rompan.
**Mitigation:** Evaluar antes de implementar si el contexto tiene color-coding conventions que son safety-critical o regulatory. Si es así, NO implementar color picker — usar palette constrained o no ofrecer.

**Risk 4: Trigger button no anuncia el color actual** (MEDIUM)
Sin `aria-label` dinámico en el trigger, el screen reader user no sabe el color actual antes de abrir el picker.
**Mitigation:** `aria-label="Color picker, selected color: #FF5733"` o su nombre si existe en una palette.

**Risk 5: `onChange` continuo durante drag sin debounce causa performance issues** (MEDIUM)
Si el onChange actualiza una base de datos o hace un API call en cada frame de drag, puede causar flooding de requests.
**Mitigation:** Distinguir entre `onChange` (durante drag, para live preview) y `onChangeEnd` (al soltar, para persistir). Exponer ambos callbacks.

---

## Dimension Scores (sistemas CON color picker)

| Sistema | A11y | Composability | Format Support | Presets | Completeness | Total |
|---------|------|---------------|----------------|---------|--------------|-------|
| Spectrum | 10 | 10 | 8 | 4 | 10 | **42/50** |
| Atlassian | 10 | 5 | 1 | 8 | 6 | **30/50** |
| Fluent 2 | 9 | 7 | 6 | 8 | 8 | **38/50** |
| Mantine | 8 | 7 | 10 | 8 | 9 | **42/50** |
| Ant Design | 6 | 7 | 10 | 9 | 8 | **40/50** |
| Chakra v3 | 7 | 7 | 8 | 5 | 7 | **34/50** |
| Lightning | 7 | 5 | 7 | 8 | 7 | **34/50** |
| Polaris | 4 | 4 | 3 | 3 | 5 | **19/50** |
| Radix Themes | 6 | 4 | 7 | 3 | 6 | **26/50** |

---

## Next Steps

1. **`/spec color-picker`** — Generate config.json with anatomy (gradient area, hue/alpha sliders, hex input, presets)
2. **`/enrich color-picker`** — Add a11y (role=slider, hex input fallback, swatch ring, trigger aria-label)
3. **`/build color-picker`** — Full pipeline in one command using this research as cache
4. **`/build color-picker --max`** — Use pre-generated config without scope questions
5. **`/research color-picker --fresh`** — Re-run research from scratch (bypasses this cache)

**Key spec decisions to make:**
- Free-form picker vs. palette-constrained vs. both (withPicker toggle)?
- `Color` object vs. hex string vs. HSBAColor as value type?
- Format switcher (hex/rgb/hsb) built-in or single format?
- Alpha channel: opt-in (default) or always included?
- Inline (always visible) or popover-triggered as primary mode?
- Include presets/swatches alongside gradient canvas?
