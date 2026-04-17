# Rating

## Descripción general

Rating es el componente de calificación visual del sistema de diseño: un conjunto de íconos (estrella por defecto, intercambiable por corazón o thumbs-up) que representa un valor en una escala (3, 5, o 10) con soporte para precisión entera o de medio punto. Existen dos modos: `Interactive=yes` (el usuario puede establecer su calificación — funciona como input) e `Interactive=no` (solo muestra la calificación promedio — display-only). La API de accesibilidad difiere completamente entre ambos modos: radiogroup para interactivo, img para display. Es el componente estándar para reviews de producto, feedback de sesiones, y calificaciones de satisfacción.

```
Interactive=yes, Size=md, Value=3, Max=5:
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  ★  ★  ★  ☆  ☆          3 / 5                          │  star: 20px
│  ←filled→ ←empty→                                       │  gap: 4px
│                   ↑ label (opcional)                    │
│                                                          │
└──────────────────────────────────────────────────────────┘

Interactive=no, Size=sm, Value=4.5, Max=5 (display con half):
┌──────────────────────────────────────────────────────────┐
│  ★  ★  ★  ★  ½  ☆    4.5 / 5  (234 reviews)            │  star: 14px
│  ←──── filled ───→ half                                  │  gap: 2px
└──────────────────────────────────────────────────────────┘

Sizes (3):
┌─────────────────────────────────────────────────────────┐
│  sm: ★★★★★  14px / gap 2px  (inline en listas, reviews) │
│  md: ★★★★★  20px / gap 4px  (default, cards)            │
│  lg: ★★★★★  28px / gap 6px  (prominente, ratings page)  │
└─────────────────────────────────────────────────────────┘

Estados (Interactive=yes):
│  default:  ★★★★☆  (filled amarillo / empty gris)        │
│  hover:    ★★★★☆  (filled amarillo más intenso)          │
│  focused:  ★★★★☆  (ring 2px de focus)                   │
│  disabled: ★★★★☆  (opacity 0.6, no interactive)         │
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Max         → 3 | 5 | 10
State       → default | hover | focused | disabled
Value       → 0 | 1 | 2 | 3 | 4 | 5
Size        → sm | md | lg
Interactive → no | yes
Precision   → whole | half
```

Toggles:

```
👁 Show Label → muestra/oculta el texto "4.5 / 5"
👁 Show Count → muestra/oculta el texto "(234 reviews)"
```

Slot intercambiable:

```
🔄 Icon → "icon/star-filled" (default) | "icon/heart" | "icon/thumbs-up"
```

Textos editables:

```
✏️ Label → "4.5 / 5"
✏️ Count → "(234 reviews)"
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  Rating                                                  │
│  ──────────────────────────────────────────────────────  │
│  Max         [ 5              ▼ ]                        │
│  State       [ default        ▼ ]                        │
│  Value       [ 4              ▼ ]                        │
│  Size        [ md             ▼ ]                        │
│  Interactive [ yes            ▼ ]                        │
│  Precision   [ whole          ▼ ]                        │
│  ──────────────────────────────────────────────────────  │
│  👁 Show Label  [ off ]                                  │
│  👁 Show Count  [ off ]                                  │
│  🔄 Icon        [ icon/star-filled  ↗ ]                  │
│  ✏️ Label        [ 4.5 / 5                          ]    │
│  ✏️ Count        [ (234 reviews)                    ]    │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito capturar o mostrar una calificación?
                    │
                    ▼
       ¿El usuario puede cambiar la calificación?
       ├── Sí → Interactive=yes (input de rating)
       └── No → Interactive=no (display de rating promedio)
                    │
                    ▼
       ¿Cuántos niveles de calificación necesito?
       ├── 3 (simple: malo/regular/bueno)     → Max=3
       ├── 5 (estándar: Amazon, Google)       → Max=5
       └── 10 (detallado: IMDb, NPS-adjacent) → Max=10
                    │
                    ▼
       ¿Necesito precisión de medio punto?
       ├── Sí → Precision=half (4.5 estrellas)
       └── No → Precision=whole (enteros solo)

       Nota: Precision=half + Max=10 = excluido (20 pasos — overflow)
```

**Usar Rating cuando:**
- Calificación de producto o servicio en una página de reviews (Interactive=no, Show Label + Count)
- Input de satisfacción en un formulario de feedback post-meeting (Interactive=yes, Max=5)
- Promedio de calificación en una card de producto (Interactive=no, sm, Show Label)
- "¿Cómo calificarías esta sesión?" al final de una meeting de Zoom (Interactive=yes, Max=5)
- Mostrar el rating de un instructor o ponente (Interactive=no, con count)

**NO usar Rating cuando:**
- La escala necesita decimal (0.1 steps) → usar `Slider`
- El valor tiene significado específico no ordinal → usar `Select` o `RadioGroup`
- La calificación es binaria (like/dislike) → usar dos IconButtons con thumbs-up/down
- Se necesita comparar múltiples dimensiones → usar múltiples Rating o un componente custom
- El contexto es una forma de pago → no usar estrellas (connotación de review)

---

## Variaciones visuales

### Max

| Max | Pasos | Uso típico |
|-----|-------|-----------|
| 3   | 3     | Satisfacción simple: 😞/😐/😊; feedback rápido |
| 5   | 5     | Standard Amazon/Google — covers 95% of use cases |
| 10  | 10    | Competitive rating (IMDb), NPS-adjacent |

### State (Interactive=yes)

| State    | Filled stars | Empty stars | Ring |
|----------|-------------|------------|------|
| default  | amarillo (#FAC022) | gris (#D1D1D8) | no |
| hover    | amarillo intenso (#F2AD14) | gris hover (#A5A5B3) | no |
| focused  | amarillo (#FAC022) | gris (#D1D1D8) | sí (2px interactive/default) |
| disabled | amarillo desaturado (#B8B8BD) | gris claro (#E0E0E3) | no (opacity: 0.6) |

### Precision

| Precision | Paso mínimo | Cuándo usar |
|-----------|------------|------------|
| whole     | 1 estrella  | Input de rating (siempre entero); display de ratings sin decimales |
| half      | 0.5 estrellas | Display de rating promedio (ej. "4.5 de 5") — común en reviews |

### Size

| Size | IconSize | Gap | LabelFontSize |
|------|---------|-----|-------------|
| sm   | 14px    | 2px | 13px |
| md   | 20px    | 4px | 14px |
| lg   | 28px    | 6px | 16px |

---

## Decisiones de diseño

**1. Max=3/5/10 (no 100, no input libre)** — 5 estrellas es el estándar de Amazon/Google (95% de casos); 10 para ratings competitivos (IMDb); 3 para feedback rápido (happy/neutral/sad). Valores mayores a 10 son confusos visualmente y mejor representados con Slider. Un input libre de Max generaría inconsistencia en el DS.

**2. Precision=whole|half (no decimal)** — Half rating es el caso más común en displays de promedio: "4.5 estrellas". Decimales más finos (4.3) son difíciles de representar visualmente y se redondean de todas formas. Para precisión de 0.1, el Slider es la herramienta correcta. `Precision=half + Max=10` está excluido porque genera 20 pasos visuales — demasiados para una buena UX.

**3. Interactive vs display-only como property** — Los dos modos tienen ARIA roles completamente diferentes (`radiogroup` vs `img`), diferentes estados visuales (hover, focused, disabled para interactivo; solo default para display), y diferentes interacciones de teclado. Modelarlos como una sola propiedad discreta deja claro que son variantes del mismo componente.

**4. Ícono intercambiable (star default)** — Star es el estándar universal. Sin embargo, para plataformas de contenido puede ser heart (favoritos), thumbs-up (like), o face (satisfacción). El slot 🔄 Icon permite cambiar el conjunto de íconos sin duplicar el componente.

**5. Show Label + Show Count como toggles separados** — Label ("4.5 / 5") y Count ("(234 reviews)") son información complementaria. Pueden aparecer juntos, por separado, o ninguno. Los toggles independientes evitan generar variantes para todas las combinaciones.

### Combinaciones excluidas

```
Interactive=no + State=hover|focused → ✗ display-only no tiene estados interactivos
Precision=half + Max=10              → ✗ 20 pasos — overflow visual
```

---

## Comportamiento

### Esencial para diseño

- **Half-star en display** — para Precision=half, la "media estrella" se representa como el ícono de estrella parcialmente filled (50% de izquierda a derecha). En Figma se modela con un ícono half-filled; en implementación con clip-path o gradient en SVG.
- **Value en hover (preview)** — cuando el usuario hace hover sobre una estrella en Interactive=yes, las estrellas hasta ese punto se "pre-iluminan" para mostrar el valor que quedaría si hace click. Este comportamiento es estándar en todos los sistemas de rating.
- **Roving tabindex** — en Interactive=yes, la estrella del valor actual tiene `tabindex=0`; el resto tienen `tabindex=-1`. Arrow keys mueven el focus entre estrellas. Esto sigue el patrón de radiogroup WAI-ARIA.
- **Number keys** — en Interactive=yes con foco, las teclas 1-5 (o 1-3, 1-10 según Max) saltan directamente al valor. Esto mejora la eficiencia para usuarios de teclado.
- **State=disabled** — la calificación está en opacity 0.6 y no responde a hover, click, ni teclado. Se usa para ratings de solo-lectura que deben comunicar "este valor no puede cambiarse" (ej. rating bloqueado por el sistema).

### Accesibilidad (ARIA)

| Caso | Implementación | Por qué importa |
|------|---------------|----------------|
| Interactive=yes | `role="radiogroup"` + `aria-label="Calificación"` | Patrón de radiogroup para selección de valor |
| Cada estrella (interactive) | `role="radio"` + `aria-checked="true/false"` + `aria-label="[N] estrellas"` | SR lee "2 estrellas, seleccionado" |
| Display-only | `role="img"` + `aria-label="[N] de [Max] estrellas"` | SR lee "4.5 de 5 estrellas" |
| Precision=half | `aria-label="[N] de [Max] estrellas"` (con decimal) | SR lee "4.5 de 5 estrellas" |
| Show Count | `aria-label` incluye count | "4.5 de 5 estrellas, basado en 234 reseñas" |
| State=disabled | `aria-disabled="true"` | SR anuncia que el rating no es interactivo |

### Navegación por teclado

```
Interactive=yes:
  Arrow Left / Arrow Right → disminuye / aumenta el valor en 1 paso
  Arrow Down / Arrow Up    → idem (alt)
  Home                     → salta a valor 0 (sin calificación)
  End                      → salta al valor máximo
  1, 2, 3, ... [Max]       → salta directamente al valor
  Tab                      → sale del radiogroup y va al siguiente elemento

Display-only:
  Sin keyboard interactions (no focusable)
```

---

## Guía de contenido

**aria-label del container (Interactive=yes):**
- Descriptivo del contexto: "Califica esta sesión", "Calificación del instructor", "¿Qué tan satisfecho estás?"
- No usar solo "Calificación" — agregar el objeto: "Calificación del producto"

**aria-label por estrella:**
- "[N] de [Max] estrellas" — idiomático y universal para SR
- Para Max=3 con ícono distinto: "[N] de 3 corazones" o "[N] de 3"

**Show Label:**
- Formato: "[value] / [max]" → "4.5 / 5" o "[value] de [max]" → "4.5 de 5"
- Con Precision=half: siempre mostrar el decimal: "4.5 / 5" no "4/5" cuando el valor es 4.5

**Show Count:**
- Formato: "([N] reviews)" o "([N] reseñas)" o "basado en [N]"
- Para pluralización: "[N] reseña" (singular) vs "[N] reseñas" (plural) — el developer maneja

**Cuándo usar cada Max:**
- `3` para encuestas rápidas de NPS o satisfacción simple (malo/regular/bueno)
- `5` para ratings de productos, instructores, sesiones — el gold standard
- `10` cuando se necesitan matices finos: rankings comparativos, ratings IMDb-style

---

## Pre-build checklist

```
□ ¿Interactive=yes usa role="radiogroup" + role="radio" por estrella?
□ ¿Interactive=no usa role="img" + aria-label con el valor y máximo?
□ ¿Precision=half tiene aria-label con decimal ("4.5 de 5 estrellas")?
□ ¿Roving tabindex implementado (active star tabindex=0, resto -1)?
□ ¿Arrow keys cambian el valor en Interactive=yes?
□ ¿Number keys (1-Max) saltan directamente al valor?
□ ¿State=disabled tiene aria-disabled="true"?
□ ¿Show Count integrado en el aria-label del container?
□ ¿Precision=half + Max=10 excluido?
□ ¿Preview de valor en hover (estrellas pre-iluminadas)?
```

---

## Componentes relacionados

```
Slider      → para escalas con precisión de decimal (0.1 steps)
RadioGroup  → para selección de opciones discretas con label (no visual como estrella)
Form        → Rating Interactive=yes es un campo de formulario; debe estar dentro de Form
Input       → Rating comparte el patrón de roving tabindex con RadioGroup
Badge       → puede acompañar al Rating en un ProductCard (badge de count de reviews)
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Sizes | Max | Interactive | Half | Custom icon | ARIA |
|---------|-------|-------|-----|------------|------|------------|------|
| **Material Design 3** | Sin componente | — | — | — | — | — | — |
| **Spectrum (Adobe)** | Sin componente | — | — | — | — | — | — |
| **Carbon (IBM)** | Sin componente | — | — | — | — | — | — |
| **Polaris (Shopify)** | RatingStars (interno) | — | 5 | No | No | No | img role |
| **Atlassian** | Sin componente | — | — | — | — | — | — |
| **Ant Design** | Rate | sm/default/lg | configurable | Sí | Sí | character prop | radiogroup |
| **Twilio Paste** | Sin componente | — | — | — | — | — | — |
| **Lightning** | Sin componente | — | — | — | — | — | — |
| **Primer (GitHub)** | Sin componente | — | — | — | — | — | — |
| **shadcn/ui** | Sin componente | — | — | — | — | — | — |
| **Chakra UI** | Sin componente | — | — | — | — | — | — |
| **Fluent 2** | Rating | Sin size prop | configurable | Sí | Sí | icon slot | radiogroup |
| **Gestalt (Pinterest)** | Sin componente | — | — | — | — | — | — |
| **Mantine** | Rating | Sin size | configurable | Sí | Sí (fractions) | emptySymbol/fullSymbol | radiogroup |
| **Orbit (Kiwi)** | StarRating | — | 5 | No | Sí | No | img role |
| **Evergreen** | Sin componente | — | — | — | — | — | — |
| **React-Stars** | external | — | configurable | Sí | Sí | char | manual |

**Patrones clave de la industria:**
1. **Rating component es raro en T1** — Solo Ant Design (T1) y Fluent 2/Mantine (T3) lo tienen como componente de primera clase. M3, Spectrum, Carbon, Atlassian, Polaris, Chakra, Primer no lo tienen. Esto lo hace un componente especializado con menos precedentes de sistema T1.
2. **Ant Design como referencia** — Ant tiene el rating más completo en T1: `count` (Max), `allowHalf`, `character` (custom icon), estados disabled, `tooltips` por estrella. Es la implementación más funcional disponible.
3. **role=radiogroup para interactive** — Ant Design, Fluent 2, y Mantine coinciden en radiogroup para el modo interactivo. Es el patrón correcto según WAI-ARIA (selectores de valor en escala discreta).
4. **Custom icon** — Ant (`character`), Fluent 2 (`icon`), Mantine (`emptySymbol`/`fullSymbol`) permiten ícono custom. La estrella es el default universal, pero heart para favoritos y thumbs-up para reactions son variantes válidas.

---

## Tokens

**10 tokens** · prefijo `rt-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `rt-filled` | `status/warning/fg` | Color estrellas filled — amarillo |
| `rt-filled-hover` | `status/warning/fg-bold` | Color filled en hover — amarillo intenso |
| `rt-empty` | `border/default` | Color estrellas vacías |
| `rt-empty-hover` | `border/hover` | Color vacías en hover |
| `rt-focused-ring` | `focus/ring` | Focus ring en estado focused |
| `rt-disabled-opacity` | `opacity/disabled` | Opacity en State=disabled — 0.6 |
| `rt-iconSize-sm` | `iconSize/sm` | Tamaño estrella sm — 14px |
| `rt-iconSize-md` | `iconSize/md` | Tamaño estrella md — 20px |
| `rt-iconSize-lg` | `iconSize/lg` | Tamaño estrella lg — 28px |
| `rt-label-fontSize` | `type/md` | Font del label "4.5 / 5" |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Size=sm: ícono 14px · gap 2px · label 13px             │
│  Size=md: ícono 20px · gap 4px · label 14px             │
│  Size=lg: ícono 28px · gap 6px · label 16px             │
│                                                          │
│  Colores:                                                │
│  filled (default):   #FAC022 (status/warning/fg)        │
│  filled (hover):     #F2AD14 (status/warning/fg-bold)   │
│  empty (default):    #D1D1D8 (border/default)           │
│  empty (hover):      #A5A5B3 (border/hover)             │
│  disabled opacity:   0.6                                │
│                                                          │
│  Frames totales:                                         │
│  36 frames (subset representativo de combinaciones       │
│  Max × Size × Interactive × State)                      │
└──────────────────────────────────────────────────────────┘
```
