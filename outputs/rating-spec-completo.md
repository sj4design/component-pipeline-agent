# Rating

## Overview

El componente `Rating` es un selector de valor numérico expresado mediante íconos (estrellas por default). Sirve tanto para captura de input interactivo ("califica esta experiencia") como para mostrar promedios de calificación de solo lectura ("4.5 de 5 estrellas"). Los dos modos comparten el mismo componente —el prop `Interactive` cambia el rol ARIA de `radiogroup` a `img` y el comportamiento completo. Soporta tres escalas (3, 5 o 10), tres tamaños y precisión entera o media estrella.

```
Interactivo (value=3 de 5, hover en 4):
┌─────────────────────────────────────────────────────────┐
│  ★  ★  ★  ★̊  ☆    ← estado hover (4 destacado)        │
│  1  2  3  4   5                                         │
│  role="radiogroup"                                      │
└─────────────────────────────────────────────────────────┘

Display-only (4.5 / 5, con label y contador):
┌─────────────────────────────────────────────────────────┐
│  ★  ★  ★  ★  ½    4.5 / 5    (234 reviews)             │
│  role="img"  aria-label="4.5 de 5 estrellas"            │
└─────────────────────────────────────────────────────────┘
```

El ícono default es una estrella (filled/empty), pero el slot `🔄 Icon` permite swapear a corazón, pulgar arriba u ícono de marca. Los slots `Show Label` y `Show Count` agregan contexto numérico junto al grupo de íconos.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Max:         3 | 5 | 10
State:       default | hover | focused | disabled
Value:       0 | 1 | 2 | 3 | 4 | 5
Size:        sm | md | lg
Interactive: no | yes
Precision:   whole | half
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Show Label  → muestra/oculta texto de valor ("4.5 / 5") (default: false)
Show Count  → muestra/oculta contador de reseñas ("(234 reviews)") (default: false)
```

### Figma properties panel

```
┌─────────────────────────────────────┐
│  Rating                             │
│  ─────────────────────────────────  │
│  Max         [5            ▾]       │
│  Interactive [no           ▾]       │
│  Precision   [whole        ▾]       │
│  State       [default      ▾]       │
│  Value       [3            ▾]       │
│  Size        [md           ▾]       │
│  ─────────────────────────────────  │
│  Show Label  [○──────────────]      │
│  Show Count  [○──────────────]      │
│  ─────────────────────────────────  │
│  ✏️ Label     4.5 / 5                │
│  ✏️ Count     (234 reviews)          │
│  🔄 Icon      icon/star-filled       │
└─────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El usuario selecciona un valor de calidad/satisfacción en escala visual?
    │
    ├─ Display: muestra calificación existente ──► Rating (Interactive=no)
    │
    └─ Input: el usuario asigna una calificación
                 ├─ Escala 1-5 (estrellas) ─────► Rating (Interactive=yes, Max=5)
                 ├─ Escala 1-3 (satisfacción) ──► Rating (Interactive=yes, Max=3)
                 ├─ NPS 1-10 ────────────────────► Rating (Interactive=yes, Max=10)
                 └─ Escala continua ─────────────► Slider
```

**Use Rating cuando:**
- Se necesita mostrar una calificación agregada con precisión de media estrella (ej. "4.5 estrellas de 1,234 reseñas").
- El usuario debe asignar una calificación explícita de experiencia (post-reunión, post-soporte, feedback de producto).
- La escala es de 3, 5 o 10 ítems con íconos visuales como metáfora comunicacional.
- Se usa escala de satisfacción con emojis o íconos contextuales (Max=3 o Max=5 con icon swap).

**Do NOT use Rating cuando:**
- El valor es continuo y la precisión importa → usa Slider.
- Las opciones son texto descriptivo ("Muy satisfecho", "Neutral", "Insatisfecho") → usa RadioGroup con labels.
- El contexto es gubernamental o de alta accesibilidad crítica → considera RadioGroup con labels (patrón GOV.UK).
- La escala es >10 → usa Slider o NPS input custom.
- Interactive=no + Max=10: la densidad de 10 íconos en sm hace el label ilegible → usar solo md o lg.

---

## Visual variations

### Por Size

```
sm (iconSize 14px, gap 2px):
★ ★ ★ ★ ★   — compacto para listas de productos

md (iconSize 20px, gap 4px):
★  ★  ★  ★  ★   — uso general

lg (iconSize 28px, gap 6px):
★   ★   ★   ★   ★   — cards grandes, hero sections
```

### Por State (Interactive=yes)

```
default (value=3):
★  ★  ★  ☆  ☆   filled: #F9BE24  empty: #D1D1D9

hover (hovering value=4):
★  ★  ★  ★  ☆   filled-hover: #F3AE14  empty-hover: #A5A5B3

focused (value=3, focus ring visible):
★  ★  ★  ☆  ☆   ring: border/focus alrededor de la estrella 3

disabled (value=3):
★  ★  ★  ☆  ☆   filled-disabled: #B8B8BF  opacity: 0.6
```

### Por Precision

```
whole (value=4):
★  ★  ★  ★  ☆   — solo valores enteros

half (value=4.5):
★  ★  ★  ★  ½   — estrella parcial (50% del ícono filled)
```

### Por Max

```
Max=3 (satisfacción simple):
★  ★  ☆   value=2 de 3

Max=5 (estándar):
★  ★  ★  ★  ☆   value=4 de 5

Max=10 (NPS / competitivo):
★★★★★★★☆☆☆   value=7 de 10 (sm: iconSize 14px recomendado)
```

### Con Show Label y Show Count

```
Interactive=no, Precision=half, Show Label=true, Show Count=true:
★  ★  ★  ★  ½    4.5 / 5    (234 reviews)
                   ↑label      ↑count
```

### Exclusiones de combinaciones

```
Interactive=no  + State=hover    → EXCLUIDA (display-only no tiene hover)
Interactive=no  + State=focused  → EXCLUIDA (display-only no es focusable)
Precision=half  + Max=10         → EXCLUIDA (10 medias = 20 pasos, overflow visual)
```

---

## Design decisions

### 1. Max 3/5/10 como property (no continuo)

**Por qué:** Las tres escalas cubren los casos de uso universales: 5 estrellas es el estándar de Amazon/Google/reviews de producto; 3 es la escala mínima para happy/neutral/sad (suficiente para NPS simple o CSAT corto); 10 para ratings competitivos (IMDb, RatingG). Más de 10 íconos pierde legibilidad y usabilidad táctil —ese territorio pertenece a un Slider. Menos de 3 pierde granularidad semántica.

**Trade-off:** Si el producto necesita Max=4 o Max=7, el dev lo configura pero no existe como variant de Figma. El sistema tiene capacidad para ello; la propiedad Figma solo expone los tres valores más comunes.

---

### 2. `Interactive` como property explícita (no solo `disabled`)

**Por qué:** Display-only y interactive no son el mismo componente con un toggle de desactivación —tienen roles ARIA completamente diferentes. `Interactive=no` → `role="img"` con un `aria-label` descriptivo. `Interactive=yes` → `role="radiogroup"` con `role="radio"` por ícono. Este cambio de semántica es tan fundamental que merece una property explícita, no solo un `disabled` boolean.

**Referencia:** Todos los 4 sistemas implementadores (Ant Design, Base Web, Chakra, Mantine) tratan el modo display como un estado primario del componente, no como un fallback.

**Trade-off:** Agrega complejidad al panel de propiedades. Compensa con claridad semántica para el designer y el developer.

---

### 3. Precision whole/half (no decimal arbitrario)

**Por qué:** La media estrella es el sweet spot de granularidad para ratings de display: "4.5 estrellas" es legible y culturalmente establecido. Los promedios con decimales (4.3, 4.7) se redondean visualmente al medio más cercano. Para precisión decimal real en displays de productos (IMDb style), el patrón Mantine `fractions={10}` sería la implementación de dev —no es necesario exponer en Figma como variant.

**Trade-off:** Los promedios de 4.3 se redondean visualmente a 4.5. Para listados de productos donde la diferencia entre 4.3 y 4.5 importa comercialmente, el dev debe implementar `fractions` custom.

---

### 4. Icon swappable (estrella como default)

**Por qué:** El componente de Rating es reusable para múltiples metáforas: estrellas para calificación de reuniones o soporte, corazones para favoritos, pulgar arriba para aprobación. El swap slot `🔄 Icon` permite cambiar el ícono sin crear un componente separado.

**Trade-off:** El designer debe asegurarse que el ícono swapeado tiene versión filled y empty. Si el ícono elegido no tiene estas dos variantes claras, el estado visual del rating se vuelve ambiguo.

---

### 5. `allowClear` implícito (default true en interactive)

**Por qué:** En campos de rating opcionales, el usuario debe poder retirar su selección haciendo click en la misma estrella (reset a 0). Sin este comportamiento, un click accidental en una estrella baja obliga al usuario a seleccionar otra, sin forma de dejar el campo vacío. Este es el comportamiento default de Ant Design y es correcto para formularios donde el rating es opcional.

**Trade-off:** Para ratings requeridos (donde 0 no es un valor válido), el dev debe deshabilitar el allowClear. No se expresa en Figma —es una nota de implementación.

---

## Behavior

### Essential for design

- **Hover preview:** Al mover el cursor sobre los íconos (Interactive=yes), el valor previsualizdo se destaca con el estado hover antes de hacer click.
- **Hover cancela:** Al salir del componente sin click, el valor vuelve al seleccionado anteriormente (no al hover).
- **Click en ícono seleccionado:** Resetea a 0 (allowClear).
- **Precision=half:** La mitad izquierda del ícono es "media estrella", la derecha es "estrella completa". El hover en mitad izquierda muestra la media estrella.
- **Roving tabindex:** Solo el ícono seleccionado (o el primero si ninguno) tiene `tabIndex=0`. El resto tienen `tabIndex=-1`.
- **Display-only:** Sin cursor pointer, sin hover visual, sin foco keyboard. Un solo `role="img"` con `aria-label` describe el valor completo.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Wrapper (Interactive=yes) | `radiogroup` | `aria-label="Calificación"` | Agrupa las opciones de radio |
| Cada ícono (Interactive=yes) | `radio` | `aria-checked="true/false"`, `aria-label="[N] estrellas"` | SR anuncia la opción y si está seleccionada |
| Ícono hover (Interactive=yes) | `radio` | `aria-label="[N] estrellas"` | SR anuncia el valor en hover (no confirma) |
| Wrapper (Interactive=no) | `img` | `aria-label="4.5 de 5 estrellas"` | SR lee el valor completo sin anunciar cada ícono |
| Precision=half (display) | `img` | `aria-label="4.5 de 5 estrellas"` | Fraccional anunciado con claridad |
| Label slot | — | `aria-hidden="true"` si el radiogroup ya tiene aria-label | Evita doble anuncio |
| Count slot | — | Se incluye en el `aria-label` del wrapper: "4.5 de 5 estrellas, basado en 234 reseñas" | Contexto completo en un solo anuncio |

### Keyboard navigation

Primary interactions (affect design):

```
Tab          → mueve foco al grupo (Interactive=yes)
← Arrow      → decrementa rating (−1 o −0.5 si Precision=half)
→ Arrow      → incrementa rating (+1 o +0.5 si Precision=half)
Home         → establece valor mínimo (1 o 0.5)
End          → establece valor máximo (Max)
1–5          → salta directamente al valor numérico (teclas de número)
Tab (dentro) → sale del grupo al siguiente elemento focusable
```

Secondary interactions (dev reference):

```
Space/Enter  → confirma el valor con foco (ya seleccionado con Arrow)
Esc          → cancela hover preview y devuelve foco al valor seleccionado
```

---

## Content guide

### `icons` (slot obligatorio)
- **Qué va aquí:** El grupo de íconos que representan la escala. Default: estrellas.
- **Swap slot `🔄 Icon`:** Swapear por heart (favoritos), thumbs-up (like/dislike), face emoji, o ícono de marca.
- **Regla:** El ícono debe tener variante filled (seleccionado) y empty/outline (no seleccionado). Usar íconos ambiguos (ej. siempre sólidos) rompe la comunicación visual del rating.

### `label` (slot opcional, Show Label)
- **Qué va aquí:** Representación textual del valor. Formato: `"[valor] / [max]"` o `"[valor]"`.
- **Ejemplos:** `4.5 / 5`, `7 / 10`, `3 / 5`.
- **Cuándo activar:** En contextos donde el valor numérico exact importa (marketplace, review cards). No en ratings de formulario interactivo donde el número es obvio del ícono seleccionado.

### `countText` (slot opcional, Show Count)
- **Qué va aquí:** Número de reseñas o contribuidores. Formato: `"(N reviews)"` o `"N reseñas"`.
- **Ejemplos:** `(1,234 reviews)`, `(89)`, `2.4k reseñas`.
- **Cuándo activar:** Solo en modo display-only (Interactive=no). En modo interactivo, el contador de reseñas no tiene sentido mientras el usuario está seleccionando.

---

## Pre-build checklist

```
[ ] Max tiene valores: 3, 5, 10
[ ] Interactive tiene valores: no, yes
[ ] Precision tiene valores: whole, half
[ ] State tiene valores: default, hover, focused, disabled
[ ] Value tiene valores: 0, 1, 2, 3, 4, 5 (para Max=5; 0-3 para Max=3; 0-10 para Max=10)
[ ] Size tiene valores: sm, md, lg

[ ] Dimensiones por size:
    sm: iconSize=14px, gap=2px, labelFontSize=13px
    md: iconSize=20px, gap=4px, labelFontSize=14px
    lg: iconSize=28px, gap=6px, labelFontSize=16px

[ ] Color filled=default:  #F9BE24 (status/warning/fg aproximado)
[ ] Color filled=hover:    #F3AE14 (más oscuro)
[ ] Color empty=default:   #D1D1D9 (border/default)
[ ] Color empty=hover:     #A5A5B3 (border/hover)
[ ] Color disabled:        #B8B8BF, opacity 0.6

[ ] Interactive=no + State=hover → EXCLUIDA (no generar frame)
[ ] Interactive=no + State=focused → EXCLUIDA
[ ] Precision=half + Max=10 → EXCLUIDA

[ ] Show Label toggle funcional (default: false), ✏️ Label editable
[ ] Show Count toggle funcional (default: false), ✏️ Count editable
[ ] 🔄 Icon swap slot configurado (default: icon/star-filled)

[ ] Tokens rt- aplicados: rt/filled, rt/filled/hover, rt/empty, rt/empty/hover,
    rt/focused/ring, rt/disabled/opacity, rt/iconSize/sm/md/lg, rt/label/fontSize

[ ] 36 frames net (excluidas 12 de 48 brutos)
```

---

## Related components

```
Slider          → para valores continuos con alta precisión (0.1 steps)
RadioGroup      → para opciones con labels de texto (Very satisfied / Neutral / etc.)
Badge           → para conteo de reseñas en chip/tag
Tooltip         → para labels hover de cada estrella (tooltips pattern de Ant)
```

---

## Reference: how other systems do it

### Ant Design (Tier 1) — `Rate`: el único Tier 1 con componente dedicado

Ant Design's `Rate` es la implementación Tier 1 más completa. `allowHalf` para media estrella. `character` como función del índice: `(index) => emojiArray[index]` —cada ícono puede ser diferente según posición, habilitando escalas de satisfacción con faces progresivas. `tooltips: ["Terrible", "Bad", "Normal", "Good", "Wonderful"]` provee labels accesibles por estrella y texto hover visual. `allowClear` default `true` para resetear a 0 en campos opcionales. `count` prop (default 5) para escalas no estándar. `onHoverChange` callback para preview del valor en hover.

### Base Web / Uber (Tier 3) — `StarRating`: post-trip rating canónico

Base Web's `StarRating` es purpose-built para el flujo de calificación de Uber (driver/rider post-trip). API más restringida: sin half-star, sin custom icons en el API base (Overrides system para customización). `numItems`, `value`, `readOnly`. `onMouseLeave` explícitamente expuesto para cancelar el hover preview en dispositivos touch donde el hover puede quedar "fantasma" después del toque. La arquitectura de Overrides permite reemplazar el star SVG por cualquier componente React.

### Chakra UI v3 (Tier 3) — Rating construido sobre Ark UI

Chakra v3 usa Ark UI's rating primitive. `icon` / `emptyIcon` como props separados para íconos filled y empty (ej. heart-filled / heart-outline). Visually hidden radio inputs internamente —los íconos son decorativos; la semántica viene de inputs ocultos nativos sin necesidad de ARIA management manual. `allowHalf`. Tamaños xs–xl. La a11y correcta viene "gratis" de los inputs nativos.

### Mantine (Tier 3) — El más flexible del ecosistema

`fractions: number` —el integer denominator para subdivisión arbitraria. `fractions={2}` para medias estrellas; `fractions={10}` para mostrar 4.3 de 5 con exactitud sin redondear (43% de la quinta estrella llena). `highlightSelectedOnly: boolean` para escalas de satisfacción donde la lógica acumulativa no aplica —seleccionar "😊" (cara 4) no debe también iluminar "😞" (cara 1). `getSymbol: (index) => ReactNode` idéntico al `character` function de Ant Design. Integración nativa con Mantine Form via `form.getInputProps`.

### GOV.UK — Alternativa de RadioGroup con labels

GOV.UK rechaza las estrellas en favor de RadioGroup con labels de texto descriptivos ("Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"). El argumento: los labels de texto son inequívocos, los íconos son ambiguos culturalmente y las estrellas pueden significar cosas diferentes en distintos contextos. Para interfaces de gobierno o alta accesibilidad, el RadioGroup con labels es la alternativa más robusta. La decisión de incluir `Rating` en nuestro DS es válida para contextos de producto digital; el patrón GOV.UK aplica para formularios de feedback institucional.

---

## Tokens

**10 tokens** · prefix `rt-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `rt/filled` | `status/warning/fg` | Color de ícono seleccionado (amarillo) |
| `rt/filled/hover` | `status/warning/fg-bold` | Color de ícono en hover (amarillo oscuro) |
| `rt/empty` | `border/default` | Color de ícono no seleccionado (gris) |
| `rt/empty/hover` | `border/hover` | Color de ícono vacío en hover (gris oscuro) |
| `rt/focused/ring` | `focus/ring` | Anillo de focus keyboard |
| `rt/disabled/opacity` | `opacity/disabled` | Opacidad del estado disabled (0.6) |
| `rt/iconSize/sm` | `iconSize/sm` | Tamaño ícono pequeño (14px) |
| `rt/iconSize/md` | `iconSize/md` | Tamaño ícono medio (20px) |
| `rt/iconSize/lg` | `iconSize/lg` | Tamaño ícono grande (28px) |
| `rt/label/fontSize` | `type/md` | Tamaño fuente del label numérico (14px) |

### Spacing specs

```
Size sm:
  icon-size: 14px  (rt/iconSize/sm → iconSizes/sm)
  gap:        2px
  label-font: 13px

Size md (default):
  icon-size: 20px  (rt/iconSize/md → iconSizes/md)
  gap:        4px
  label-font: 14px (rt/label/fontSize → type/md)

Size lg:
  icon-size: 28px  (rt/iconSize/lg → iconSizes/lg aprox)
  gap:        6px
  label-font: 16px

Colors (state default):
  filled:       #F9BE24  — amarillo dorado (status/warning/fg)
  filled-hover: #F3AE14  — amarillo más oscuro en hover
  empty:        #D1D1D9  — gris claro (border/default)
  empty-hover:  #A5A5B3  — gris medio (border/hover)
  disabled:     #B8B8BF  — gris apagado, opacity 0.6

Focus ring:
  width:  2px   (focus/ringWidth)
  offset: 2px   (focus/ringOffset)
  color:  border/focus

Half-star (Precision=half):
  Solo media mitad del ícono llena (clip o mask del ícono filled al 50% del ancho)
  El eje de corte es vertical: mitad izquierda = selected, mitad derecha = empty
```
