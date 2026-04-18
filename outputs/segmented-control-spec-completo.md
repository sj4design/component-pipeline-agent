# SegmentedControl

## Overview

El componente SegmentedControl es un selector compacto de opciones que presenta 2 a 5 alternativas en una fila unificada visualmente. En modo `single`, solo una opción puede estar activa (semántica radio); en modo `multiple`, varias pueden estar activas simultáneamente (semántica checkbox). Es el patrón correcto para cambiar la vista de los mismos datos (chart/table/list), filtros compactos (Today/Week/Month) y selección de configuración (Light/Dark/Auto). Diferente de Tabs: SegmentedControl selecciona un valor o modo, no navega entre secciones de contenido con panels asociados.

```
SegmentedControl (md, single, 3 segments)
┌────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────────┐  │
│  │   ┌────────────┐  ┌────────────┐  ┌────────────┐        │  │
│  │   │   Month    │  │ [✓] Week   │  │    Day     │        │  │
│  │   └────────────┘  └────────────┘  └────────────┘        │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ↑ container (bg pressed)    ↑ selected (bg white + shadow)    │
└────────────────────────────────────────────────────────────────┘

SegmentedControl (md, multiple, icon+label)
┌────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ┌──────────┐  ┌─────────────┐  ┌──────────────────┐    │  │
│  │  │ ▣  List  │  │ ▣  Grid    │  │  ○  Map          │    │  │
│  │  └──────────┘  └─────────────┘  └──────────────────┘    │  │
│  └──────────────────────────────────────────────────────────┘  │
│     ↑ selected (filled)               ↑ unselected (ghost)     │
└────────────────────────────────────────────────────────────────┘
```

El Segment es el sub-componente building block. El SegmentedControl lo compone en un grupo con `role="radiogroup"` (single) o `role="group"` (multiple) y gestiona el roving tabindex entre segments.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
SelectionMode: single | multiple
Size:          sm | md | lg
FullWidth:     no | yes
```

Toggles (show/hide parts — do NOT generate extra variants — en Segment):

```
Has Icon              → muestra/oculta icon (slot: icon)
Has Label             → muestra/oculta label text (slot: label)
Show Selected Checkmark → muestra/oculta checkmark en selected state (slot: selectedIcon)
```

### Figma properties panel

```
╔══════════════════════════════════╗
║  SegmentedControl                ║
╠══════════════════════════════════╣
║  SelectionMode  ● single  ○ multiple
║  Size     ○ sm  ● md  ○ lg       ║
║  FullWidth  ○ no  ○ yes          ║
╚══════════════════════════════════╝

╔══════════════════════════════════╗
║  Segment (sub-component)         ║
╠══════════════════════════════════╣
║  State   ● default ○ hover       ║
║          ○ selected ○ focused    ║
║          ○ disabled              ║
║  Size    ○ sm  ● md  ○ lg        ║
╠══════════════════════════════════╣
║  Has Icon              [ Toggle ]║
║  Has Label             [ Toggle ]║
║  Show Selected Checkmark[Toggle ]║
╠══════════════════════════════════╣
║  ✏️ Label  [Segment]             ║
║  🔄 Icon  [icon/placeholder]     ║
║  🔄 Selected Icon [icon/check]   ║
╚══════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿El usuario necesita seleccionar entre opciones compactas y visualmente unificadas?
├── Sí → ¿Navega a panels de contenido distintos?
│         ├── Sí → Tabs (no SegmentedControl)
│         └── No → ¿Más de 5 opciones?
│                   ├── Sí → Select o Tabs
│                   └── No → SegmentedControl ✓
└── No → ¿Es una acción sin estado de selección (copy, delete, share)?
          ├── Sí → ButtonGroup (no SegmentedControl)
          └── No → RadioGroup (formulario con semántica de campo)
```

**Use SegmentedControl when:**
- Se cambia el modo de vista sobre los mismos datos: chart/table/list, grid/list, mapa/lista de resultados.
- Se selecciona un filtro compacto de opción única o múltiple: Today/Week/Month, categorías, etiquetas.
- Se elige una configuración de presentación: Light/Dark/Auto, Small/Medium/Large, Dense/Comfortable.
- El espacio es limitado y los labels son cortos (1-2 palabras).

**Do NOT use SegmentedControl when:**
- El click navega a secciones de contenido con sus propios panels — usar Tabs.
- Hay más de 5 opciones — usar Select o Tabs.
- El contexto es un formulario con campo de selección — usar RadioGroup (con semántica de `<fieldset>` y `<legend>`).
- Las opciones son acciones sin estado seleccionado (como botones de acción) — usar ButtonGroup.
- El label de cada opción es largo (más de 2-3 palabras) — el control se vuelve demasiado ancho.

---

## Visual variations

### Por tamaño (Segment individual)

| Size | Altura | Padding H | Font size/weight | Icon size | Radius |
|------|--------|-----------|------------------|-----------|--------|
| sm   | 28px   | 10px      | 12px / 500       | 14px      | 6px    |
| md   | 32px   | 12px      | 13px / 500       | 16px      | 6px    |
| lg   | 40px   | 16px      | 14px / 500       | 18px      | 8px    |

### Por tamaño (SegmentedControl wrapper)

| Size | Altura wrapper | Padding interno | Gap entre segments | Radius container |
|------|---------------|-----------------|-------------------|-----------------|
| sm   | 32px          | 2px             | 2px               | 8px             |
| md   | 36px          | 2px             | 2px               | 8px             |
| lg   | 44px          | 2px             | 2px               | 10px            |

### Estados del Segment

| Estado | Background | Foreground | Border | Shadow |
|--------|-----------|-----------|--------|--------|
| default | transparent | text/secondary (#6b7280) | transparent | — |
| hover | surface/hover (#f7f7f8) | text/primary (#121212) | transparent | — |
| selected | surface/default (blanco) | text/primary (#121212) | border/default (#d1d1d9) | elevation/1 |
| focused | surface/default (blanco) | text/primary (#121212) | — | + focus ring 2px |
| disabled | transparent | text/disabled (#b8b8bf) | transparent | — |

### Container

Fondo `surface/pressed` (#efefef) con borde sutil `border/disabled` (#e0e0e5). El segmento seleccionado "flota" sobre este fondo con bg blanco + shadow — patrón iOS/macOS que comunica elevación.

### FullWidth

- `FullWidth=no` (default): el control tiene ancho mínimo determinado por sus segments (fit-content). Usado en toolbars.
- `FullWidth=yes`: el control ocupa el 100% del contenedor padre, cada segment tiene flex:1. Usado en filter bars.

### Contenido del Segment

- **Solo texto**: más común, máxima claridad verbal.
- **Solo ícono**: requiere `aria-label` obligatorio por segment + Tooltip visible. Carbon exige Tooltip para este caso.
- **Ícono + texto**: mayor descriptividad, preferido cuando hay espacio.
- **Show Selected Checkmark**: en `SelectionMode=single`, el ícono del segment seleccionado se reemplaza por un checkmark (M3 pattern). Cumple WCAG 1.4.1 — el estado selected no depende únicamente del color.

---

## Design decisions

### 1. SelectionMode single + multiple con ARIA role adaptativa

**Por qué:** M3 unifica ambos modos con un `singleSelect` boolean. Spectrum va más allá con 3 modos (none/single/multiple). Nosotros usamos 2 — `none` (pure actions) está cubierto por ButtonGroup, no necesitamos replicarlo en SegmentedControl. `SelectionMode=single` renderiza `role="radiogroup"` + `role="radio"` por segment; `SelectionMode=multiple` renderiza `role="group"` + `role="checkbox"`. Esta adaptación de ARIA es correcta semánticamente y unánime entre los 14 sistemas T3 que implementan el componente.

**Tradeoff:** API más compleja que un componente single-select puro. El beneficio es que un solo componente cubre ambos casos de uso con la semántica ARIA correcta para cada uno.

### 2. Tres tamaños (sm/md/lg) siguiendo Carbon

**Por qué:** Carbon ofrece 3 tamaños; Ant Design también. `sm/md` para densidad enterprise y toolbars; `lg` para touch mobile donde el target de 40px es crítico. La escala de alturas (28/32/40px en Segment) hace match con el sistema de Input del design system, generando coherencia visual en layouts que combinan ambos componentes.

**Tradeoff:** Más frames en Figma (15 Segment × 3 sizes = 15; SegmentedControl 12 combinaciones). El beneficio es flexibilidad real para distintos contextos de densidad.

### 3. Checkmark icon en selected state (M3 pattern, WCAG 1.4.1)

**Por qué:** WCAG 1.4.1 Non-text Contrast prohíbe que el estado seleccionado dependa únicamente del color. M3 reemplaza el leading icon con un checkmark en `single-select`. Modelado como boolean `Show Selected Checkmark` + instance-swap slot `selectedIcon` (default: `icon/check`). Triple afordance en `selected`: color diferente + shadow + checkmark.

**Tradeoff:** Requiere que los segments con `Has Icon=true` gestionen el swap icon → checkmark en selected state. Sin ícono inicial, el checkmark aparece como ícono leading adicional (igual de válido).

### 4. Container con bg pressed + shadow (iOS/macOS pattern)

**Por qué:** El segmento seleccionado tiene bg blanco "elevado" sobre el container de fondo gris. La sombra `elevation/1` refuerza visualmente el estado selected. Este es el patrón canónico de iOS Segmented Control y también lo que Ant Design approxima con su sliding indicator (sin animación en Figma, ya que las animaciones no son un concern de diseño estático).

**Tradeoff:** La "elevación" del selected segment es sutil — puede ser difícil de percibir en densidades bajas de contraste. La combinación bg-blanco + shadow + border + checkmark asegura que al menos uno de los cuatro indicadores sea perceptible.

### 5. FullWidth como property (Ant `block` + Polaris `fitted`)

**Por qué:** En toolbars el control es fit-content (no bloquea otros items de la toolbar). En filter bars necesita llenar el contenedor para que los segments ocupen espacio proporcional. Property explícita permite a Figma generar frames para ambos layouts.

**Tradeoff:** El equipo de diseño debe decidir conscientemente el modo. No hay un default "universal" — fit-content es el correcto para toolbars, full-width para filter bars.

### 6. Sin overflow collapse (a diferencia de Spectrum)

**Por qué:** Spectrum colapsa a "more" menu con overflow. Ant Design y M3 no lo hacen. La recomendación de ≤5 segments (M3 documenta este constraint explícitamente) soluciona el problema desde el diseño. Si se necesitan más opciones, el patrón correcto cambia a Select o Tabs.

**Tradeoff:** Sin overflow, si alguien diseña un SegmentedControl con 6+ segments, el componente se romperá visualmente. La solución es documentar claramente el límite.

### Excluded combinations

```
label vacío + icon ausente → un segment debe tener al menos uno de los dos
SegmentedControl < 2 segments → sin sentido semántico (un solo radio/checkbox)
SegmentedControl > 5 segments → usar Select o Tabs
Icon-only sin aria-label → excluida de a11y correcta
```

---

## Behavior

### Essential for design

**Roving tabindex:** Solo el segment seleccionado está en el tab order (`tabindex=0`). Los demás tienen `tabindex=-1`. Arrow keys navegan entre segments sin salir del grupo. Tab sale del grupo completo como un solo tab stop.

**SelectionMode=single:** Arrow keys cambian la selección inmediatamente (no requieren Space para confirmar, como en radiogroup estándar). Este es el pattern de roving tabindex para radio groups.

**SelectionMode=multiple:** Arrow keys mueven el foco entre segments. Space toggle el estado del segment enfocado (seleccionar/deseleccionar). Permite múltiples activos simultáneamente.

**Disabled segment dentro de un grupo enabled:** El segment deshabilitado tiene `aria-disabled="true"` y es saltado por las Arrow keys. El grupo completo sigue siendo operable.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| SegmentedControl wrapper | `radiogroup` (single) / `group` (multiple) | `aria-label="[contexto]"` | Nombre del grupo para AT |
| Segment (single) | `radio` | `aria-checked="true/false"`, `tabindex` gestionado | Semántica exclusiva de selección |
| Segment (multiple) | `checkbox` | `aria-checked="true/false"`, `tabindex` gestionado | Semántica multi-selección |
| Segment (disabled) | `radio`/`checkbox` | `aria-disabled="true"` | Comunicar inaccesibilidad sin remover del DOM |
| Segment (icon-only) | `radio`/`checkbox` | `aria-label="[Nombre de la opción]"` | Sin label visual, necesita nombre accesible |

### Keyboard navigation

Primary interactions (affect design):

```
Arrow Left / Arrow Right  → navega entre segments (horizontal, roving tabindex)
Arrow Up / Arrow Down     → navega entre segments (equivalente en vertical, si se implementa)
Home                      → primer segment del grupo
End                       → último segment del grupo
Space                     → toggle (multiple) o select (single)
Tab                       → sale del grupo completo como un solo tab stop
```

Secondary interactions (dev reference):

```
Shift+Tab    → sale del grupo hacia atrás
Enter        → algunos sistemas lo tratan igual que Space (no universal, no documentar)
```

---

## Content guide

### Slot: label (texto del segment)

Labels cortos y paralelos en estructura gramatical:

- **Correcto:** "Lista / Grilla / Mapa" — todos son sustantivos.
- **Correcto:** "Hoy / Esta semana / Este mes" — todos son períodos temporales.
- **Incorrecto:** "Ver lista / Grid / Mostrar en mapa" — inconsistente.
- **Máximo:** 2-3 palabras por segment. Si necesitas más, el SegmentedControl no es el componente correcto.

### Slot: icon

Íconos que refuerzan el label — no lo reemplazan a menos que el contexto visual sea muy claro (como list/grid/map con íconos universales).

- **Icon-only:** Solo cuando los íconos son universalmente reconocibles Y el espacio es muy limitado (toolbar compacto). Siempre añadir `aria-label` y Tooltip.
- **Icon + label:** Preferido cuando hay espacio disponible.

### Slot: aria-label del grupo

El grupo necesita un nombre que identifique qué se está seleccionando, no el tipo de control:

- **Correcto:** "Modo de vista", "Período de tiempo", "Tema de la interfaz"
- **Incorrecto:** "Segmented control", "Opciones"

### Show Selected Checkmark

El checkmark en el segmento seleccionado es un refuerzo visual de a11y — no decorativo. Debe mostrarse siempre en `SelectionMode=single`. En `multiple`, el estado checked se comunica por background diferenciado.

---

## Pre-build checklist

```
[ ] Segment: 15 frames (State 5 × Size 3) generados
[ ] SegmentedControl: 12 frames (SelectionMode 2 × Size 3 × FullWidth 2)
[ ] Has Icon toggle funciona correctamente (muestra/oculta icon slot)
[ ] Has Label toggle funciona correctamente (muestra/oculta label slot)
[ ] Show Selected Checkmark toggle funciona en state=selected
[ ] Instance swap: icon slot → cualquier ícono del sistema
[ ] Instance swap: selectedIcon slot → icon/check por defecto
[ ] State=selected: bg blanco + shadow visible
[ ] State=focused: focus ring 2px visible
[ ] State=disabled: texto desaturado, no interactivo visualmente
[ ] Container: bg surface/pressed, border sutil
[ ] role="radiogroup" / role="group" documentado en annotation
[ ] Límite de 5 segments documentado en guías de uso
[ ] Token prefix seg- aplicado (22 tokens)
```

---

## Related components

```
Tabs             → navegación entre panels de contenido (no SegmentedControl)
RadioGroup       → selección de formulario con fieldset/legend
CheckboxGroup    → selección múltiple en formulario
ButtonGroup      → acciones sin estado de selección
Select/Dropdown  → más de 5 opciones o labels largos
```

---

## Reference: how other systems do it

**Material Design 3** unifica single-select y multi-select en un componente con un `singleSelect` boolean. En modo single-select, el ícono del segmento seleccionado se reemplaza por un checkmark — señal visual adicional más allá del cambio de color/border, que ayuda a usuarios con daltonismo. El límite de 5 segments es una guía documentada formalmente, no solo recomendación informal. ARIA: `role="radiogroup"` (single) o `role="group"` con `role="checkbox"` (multiple). Esta es la referencia canónica para el checkmark en selected state.

**Spectrum/Adobe ActionGroup** es el más flexible del Tier 1: tres modos de selección (`none`, `single`, `multiple`) en un solo componente con una prop `selectionMode`. La característica diferenciadora es el overflow collapse: cuando los items no caben en el espacio disponible, los items que se desbordan se colapsan en un dropdown "more" — la única solución accesible para toolbars responsive entre los 24 sistemas. Callbacks separados: `onAction` (para modo none, acciones puras) vs `onSelectionChange` (para modos single/multiple). Referencia para toolbars mixtos y overflow handling.

**Carbon/IBM ContentSwitcher** hace la distinción semántica más explícita entre ContentSwitcher y Tabs de cualquier sistema Tier 1: ContentSwitcher cambia la vista de los MISMOS datos (chart/table/list del mismo dataset); Tabs navega entre secciones de contenido DISTINTAS. Esta documentación previene el error de uso más común. Icon-only segments requieren Tooltip — enforced como design guideline. El trade-off de usar `aria-pressed` en lugar de `role="radio"` está documentado como decisión consciente.

**Ant Design** tiene un sliding indicator animado como característica visual definitoria — una pill animada que se mueve de segment a segment al seleccionar. Es el SegmentedControl visualmente más pulido del Tier 1. Single-select únicamente. `options` acepta strings, números u objetos con `label: ReactNode` para icon+text, icon-only, o text-only. `block` hace que el control llene el ancho del contenedor. ARIA correcto: `role="radiogroup"` + `role="radio"` + `aria-checked`. El indicador deslizante requiere `prefers-reduced-motion` compliance.

**GitHub Primer** es uno de los pocos sistemas Tier 2 con un componente nombrado y dedicado (no un ButtonGroup con estilos). Soporta icon + label, icon-only, y text-only. Full-width option. Usado principalmente para view-switching en GitHub (Code/Issues/Pull Requests). Sin indicador animado — implementación limpia y minimalista apropiada para el contexto de developer tool.

**Radix UI Themes** es la referencia para el sliding indicator CSS con `prefers-reduced-motion` correcto. La animación se suprime automáticamente via CSS media query `@media (prefers-reduced-motion: reduce)`. Radio group semantics, `size` y `radius` desde Themes tokens. La implementación más correcta de reduced-motion en animación de sliding indicator.

**Mantine** es el SegmentedControl más completo del Tier 3: soporta `orientation="vertical"` (único entre los sistemas que lo implementa como prop de primera clase — útil para paneles de filtro en sidebar). `fullWidth` llena el contenedor. Sliding indicator CSS con `transitionDuration` y `transitionTimingFunction` configurables. `prefers-reduced-motion` soportado via CSS. Referencia para orientación vertical y control de animación.

**Fluent 2 (preview)** tiene el indicador selected más correcto para WCAG 1.4.1: shape change + contraste, no solo color. Usado en Teams/SharePoint para view switching. El selected state usa un fill elevado que cambia forma, no solo color — la implementación de referencia para non-color-only selected state.

---

## Tokens

**22 tokens** · prefix `seg-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `seg/container/bg` | `surface/pressed` | Fondo del wrapper del SegmentedControl |
| `seg/container/border` | `border/default` | Borde sutil del wrapper |
| `seg/sm/h` | `sizing/32` | Altura del control en size sm |
| `seg/md/h` | `sizing/36` | Altura del control en size md |
| `seg/lg/h` | `sizing/44` | Altura del control en size lg |
| `seg/segment/default/fg` | `text/secondary` | Color de texto/ícono en estado default |
| `seg/segment/hover/bg` | `surface/hover` | Background en hover |
| `seg/segment/hover/fg` | `text/primary` | Texto/ícono en hover |
| `seg/segment/selected/bg` | `surface/default` | Background blanco del selected |
| `seg/segment/selected/fg` | `text/primary` | Texto/ícono en selected |
| `seg/segment/selected/border` | `border/default` | Borde del selected |
| `seg/segment/selected/shadow` | `elevation/1` | Shadow que eleva el selected |
| `seg/segment/focused/ring` | `focus/ring` | Focus ring 2px |
| `seg/segment/disabled/fg` | `text/disabled` | Color texto/ícono disabled |
| `seg/radius/sm` | `radius/md` | Border-radius segment en sm |
| `seg/radius/md` | `radius/md` | Border-radius segment en md |
| `seg/radius/lg` | `radius/lg` | Border-radius segment en lg |
| `seg/fontSize/sm` | `type/xs` | Tamaño de tipo en sm |
| `seg/fontSize/md` | `type/sm` | Tamaño de tipo en md |
| `seg/fontSize/lg` | `type/md` | Tamaño de tipo en lg |
| `seg/gap` | `spacing/0.5` | Gap entre segments dentro del wrapper |
| `seg/padding` | `spacing/0.5` | Padding interno del wrapper |

### Spacing specs

```
Segment sm: h=28px  px=10px  gap=6px  icon=14px  radius=6px
Segment md: h=32px  px=12px  gap=6px  icon=16px  radius=6px
Segment lg: h=40px  px=16px  gap=8px  icon=18px  radius=8px

SegmentedControl wrapper:
  sm: h=32px  p=2px  gap=2px  radius=8px
  md: h=36px  p=2px  gap=2px  radius=8px
  lg: h=44px  p=2px  gap=2px  radius=10px

Layout:  [p] [segment] [gap] [segment] [gap] [segment] [p]
         sm:  2  +  [seg]  +  2  +  [seg]  +  2  +  [seg]  +  2
```
