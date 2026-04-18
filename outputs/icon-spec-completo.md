# Icon

## Overview

Icon es el primitivo visual más fundamental del sistema de diseño: un glifo SVG que comunica significado a través de forma, sin texto. Puede ser decorativo (invisible para lectores de pantalla) o informativo (con nombre accesible). Su valor en el sistema no es solo estético sino sistémico: estandariza el tratamiento de color vía `currentColor`, garantiza que iconos en botones, links y alerts hereden el color del texto circundante sin asignación manual.

```
Decorativo (en botón con etiqueta):
┌──────────────────────────────┐
│  [▶ svg aria-hidden]  Guardar │  ← icon decorativo; "Guardar" es el nombre accesible
└──────────────────────────────┘

Informativo standalone (status badge):
┌──────────────────────────────┐
│  <span role="img"            │
│    aria-label="Error: email  │
│    inválido">  ⚠  </span>   │  ← icon lleva el nombre accesible
└──────────────────────────────┘

Tamaños comparados:
  xs ◉  (12px) — badges, chips, metadata densa
  sm ◉  (16px) — inline con texto 14px body
  md ◎  (20px) — inline con texto 16px body, default
  lg ○  (24px) — navegación, elementos de jerarquía alta
  xl ○  (32px) — estados vacíos, ilustraciones mínimas

Estilos:
  outlined  ○  — default; strokes sin fill
  filled    ●  — active states, seleccionados (iOS BottomNav pattern)
  two-tone  ◑  — iconos de status con dos colores (Ant Design pattern)
```

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Size:  xs | sm | md | lg | xl
Style: outlined | filled | two-tone
Tone:  inherit | primary | secondary | subdued |
       success | warning | critical | info
```

Toggles (show/hide parts — do NOT generate extra variants):

```
(ninguno — Icon no tiene capas opcionales)
```

### Figma properties panel

```
┌─────────────────────────────────────────────┐
│  Icon                                       │
├─────────────────────────────────────────────┤
│  Size     [xs] [sm] [md] [lg] [xl]         │
│  Style    [outlined] [filled] [two-tone]    │
│  Tone     [inherit ▾]                       │
│           inherit / primary / secondary /   │
│           subdued / success / warning /     │
│           critical / info                   │
├─────────────────────────────────────────────┤
│  🔄 Glyph  [icon/placeholder ▾]            │
└─────────────────────────────────────────────┘

Frames generados: 102 netos
(Size(5) × Style(3) × Tone(8) = 120 − 18 exclusiones two-tone+tone)
```

---

## When to use (and when not to)

```
¿Necesito comunicar algo visualmente?
        │
        ├── Sí, junto a texto visible
        │        └── Icon decorativo (aria-hidden) + texto como nombre accesible
        │            → Size sm/md según tamaño del texto
        │
        ├── Sí, sin texto (standalone)
        │        └── Icon informativo (role="img" + aria-label)
        │            → Usar con cautela — GOV.UK desaconseja iconos sin texto
        │
        └── No, es puramente decorativo / ornamental
                 └── aria-hidden="true" explícito
                     → Tone=inherit hereda el color del contexto
```

**Usar Icon cuando:**
- Acompaña texto en botones, links, campos de formulario — el ícono refuerza el significado del texto
- Representa estado semántico (success/warning/critical/info) junto con color Y forma para cumplir WCAG 1.4.1 (no solo color)
- Se usa en navegación con etiqueta visible en cada ítem
- Actúa como indicador activo/inactivo (outlined → filled) en BottomNav o tabs

**No usar Icon cuando:**
- Es el único indicador de significado sin texto alternativo — un icono solitario en un botón sin `aria-label` en el botón padre es un error de accesibilidad crítico
- Se quiere expresar una acción compleja que requiere etiqueta de texto; el icono solo añade ruido
- Se trata de decoración pura sin señal visual que aporte contexto al usuario (en ese caso agregar `aria-hidden` pero reconsiderar si el espacio visual vale la pena)
- El contexto es gobierno/cumplimiento estricto donde GOV.UK desaconseja iconos sin texto adyacente

---

## Visual variations

### Por tamaño

| Size | px | Uso recomendado |
|------|----|-----------------|
| xs   | 12 | Badges, chips, metadatos en UI densa, contadores |
| sm   | 16 | Inline con texto 13–14px, elementos de forma compacta |
| md   | 20 | **Default** — inline con texto 14–16px, botones de tamaño medio |
| lg   | 24 | Navegación principal, jerarquía alta, header actions |
| xl   | 32 | Estados vacíos, ilustraciones mínimas, modales de confirmación |

### Por estilo

**outlined** (default): Stroke sin fill. Lectura clara a cualquier tamaño. Uso general en todos los contextos.

**filled**: Fill sólido. Señala estado activo o seleccionado. Patrón iOS BottomNav: el tab activo usa el ícono filled; los inactivos usan outlined. Fluent 2 formaliza esto con `bundleIcon`.

**two-tone**: Dos capas de color (primary + secondary). Exclusivo para iconos de status standalone donde se necesita diferenciación visual rica. Restricción: solo compatible con `Tone=primary` o `Tone=inherit` — las otras tones aplican a la capa primaria únicamente y el two-tone pierde coherencia con colores semánticos.

### Por tone

| Tone | Color | Cuándo usarlo |
|------|-------|---------------|
| inherit | currentColor | **Default** — icon adopta el color del texto circundante |
| primary | text/primary (#121213) | Icon standalone de primer plano |
| secondary | text/secondary (#6B7280) | Icon de apoyo, menos jerarquía |
| subdued | text/subtlest (#8C8C99) | Información de baja prioridad |
| success | status/success/fg (#158038) | Confirmación, completado, disponible |
| warning | status/warning/fg (#B87A0D) | Atención, degradado, parcialmente funcional |
| critical | status/error/fg (#DC2626) | Error, destructivo, urgente |
| info | status/info/fg (#2659EB) | Información contextual, estado neutral positivo |

---

## Design decisions

### 1. `Tone=inherit` como default (patrón Spectrum/Carbon/Polaris)

**Por qué:** El 17 de 21 sistemas con icon component usa `currentColor` como color por defecto. Cuando un botón tiene color de texto rojo (estado critical), el ícono dentro hereda ese rojo automáticamente sin asignación manual. Sin `currentColor`, el diseñador debe actualizar el color del ícono cada vez que el contexto cambia de color — un error de sincronización frecuente en producción.

**Tradeoff:** El ícono es "invisible" como primitivo independiente — su apariencia depende completamente del padre. Para iconos verdaderamente standalone se debe seleccionar un tone explícito.

### 2. 3 estilos (outlined/filled/two-tone) inspirados en Ant Design, no 2 como Fluent 2

**Por qué:** El patrón outlined→filled para indicar active state es universal (iOS, Material Design, Fluent 2 con bundleIcon). Two-tone resuelve casos específicos de status donde el ícono necesita dos colores diferenciados — por ejemplo un ícono de alerta con borde de un color y fill de otro. Ant Design es el único Tier 1 que formaliza los tres estilos como property discreta, lo que reduce props adicionales (como `filled: boolean` + `twoTone: boolean`).

**Tradeoff:** Two-tone requiere iconos con dos capas de paths nombrados, lo que impone una restricción sobre el icon set — no todos los iconos genéricos soportan el modo two-tone correctamente.

### 3. Decorativo por defecto (patrón Carbon/Polaris/Paste)

**Por qué:** La investigación de Carbon y Polaris confirma que la gran mayoría de iconos en una UI están junto a texto visible — son decorativos. Forzar a los desarrolladores a marcar explícitamente cada ícono con `aria-hidden` produce más olvidos que el patrón contrario. Solo cuando se provee un `aria-label` o `label` prop el ícono se vuelve informativo automáticamente.

**Tradeoff:** Si un desarrollador olvida proveer `aria-label` en un ícono standalone genuinamente informativo, el screen reader lo ignorará. Mitigación: lint para `<Icon>` sin label ni dentro de un padre con `aria-label`.

### 4. 5 tamaños coincidentes con `foundations.iconSizes` (xs/sm/md/lg/xl = 12/16/20/24/32)

**Por qué:** Carbon tiene 4 tamaños (16/20/24/32), Polaris 2 (minor/major), Spectrum 4 (S/M/L/XL). Cinco tamaños cubre desde chips compactos (xs=12) hasta estados vacíos (xl=32) sin gap. Cada tamaño es optimizado para su pixel grid — no es escalar un SVG maestro, que produce strokes visualmente irregulares.

**Tradeoff:** Más tamaños significa más frames en Figma y más variantes de SVG para mantener. Compensado por la garantía de calidad visual a cada tamaño específico.

### Excluded combinations

```
Style=two-tone + Tone != primary | inherit
  → Razón: two-tone tiene capa primaria + secundaria; los tones
    semánticos (success/warning/critical/info) aplicarían solo
    a la capa primaria, produciendo resultados visuales incoherentes
    (ej. warning-amber en la capa primary + default-blue en la
    capa secondary no comunica "warning").
```

---

## Behavior

### Essential for design

El ícono no tiene comportamiento propio. Su comportamiento es heredado del padre interactivo que lo contiene. El diseñador debe considerar:

- **Botón con ícono + texto**: el ícono es decorativo; el texto es el nombre accesible del botón
- **Botón con solo ícono**: el `aria-label` va en el `<button>`, el ícono lleva `aria-hidden="true"` — no en el SVG
- **Ícono de status**: único caso donde el ícono standalone es informativo; requiere wrapper con `role="img"` + `aria-label`
- **Cambio outlined→filled**: señal visual de cambio de estado (inactivo→activo); debe ir acompañado de cambio de aria-label en el padre si el significado cambia

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| SVG decorativo | — (ninguno) | `aria-hidden="true"` | Evita que el SR lea el nombre del glyph o del archivo SVG |
| SVG informativo | `img` | `role="img"` + `aria-label="[descripción]"` | SR lee la descripción; el ícono comunica significado sin texto adyacente |
| Ícono dentro de button | — (ninguno) | `aria-hidden="true"` en el SVG; `aria-label` en el `<button>` | El label accesible va en el elemento interactivo, no en el ícono |
| Wrapper informativo | `img` | `role="img"` + `aria-label` | Si el ícono está en un `<span>` o `<div>`, el role va en el wrapper, no en el SVG |

### Keyboard navigation

Primary interactions (affect design):

```
No focusable standalone — el ícono nunca recibe foco por sí mismo.
El foco está en el padre interactivo (button, link, etc.).
```

Secondary interactions (dev reference):

```
N/A — sin interacción de teclado directa.
Nota: En botones icon-only, Tab navega al botón padre;
Enter/Space activa el botón. El ícono es transparente
al keyboard handler.
```

---

## Content guide

### svg (slot requerido)
- **Tipo**: Component set de íconos SVG; en Figma binding `instance-swap`
- **Default**: `icon/placeholder` (cuadrado de referencia para el grid)
- **Naming convention**: usar noun-verb en inglés, no descripciones abstractas — `add`, `delete`, `check-circle`, `arrow-right` son correctos; `plus-thing-blue` no
- **Formato**: SVG con viewBox="0 0 {size} {size}"; paths optimizados para cada size grid
- **Prohibido**: poner texto visible dentro del SVG; usar bitmap images como sustituto de SVG

### aria-label (slot condicional)
- **Cuándo**: solo cuando el ícono es el único portador de significado (sin texto adyacente)
- **Contenido**: descripción funcional del ícono en el contexto de uso — no el nombre del glyph (`"Close dialog"`, no `"X icon"`)
- **Longitud**: máximo 40 caracteres; si requiere más, el contexto visual es insuficiente por sí solo

---

## Pre-build checklist

```
[ ] Cada tamaño (xs/sm/md/lg/xl) tiene su SVG optimizado para su pixel grid
[ ] Tone=inherit aplica currentColor — verificar que el path SVG usa fill="currentColor"
[ ] Style=two-tone tiene dos capas de path nombradas (primary-layer / secondary-layer)
[ ] Exclusiones aplicadas: two-tone + tone semántico = 18 combinaciones excluidas
[ ] Frames netos: 102 (no 120)
[ ] Glyph swap slot configurado con "icon/placeholder" como default
[ ] Decorativo por default: sin role ni aria-label en el SVG base
[ ] Tokens vinculados: icn/xs → iconSize/xs, icn/inherit/fg → text/currentColor, etc.
[ ] Documentación en componentDescription incluye advertencia de icon-only button pattern
[ ] WCAG 2.2 AA: iconos de status combinan SIEMPRE shape + color (no solo color)
```

---

## Related components

```
Button         → contiene Icon + Label; el Icon es siempre decorativo aquí
Link           → mismo patrón que Button para leading/trailing icon
Badge          → puede contener un Icon xs como indicador de tipo
Avatar         → usa Image o Icon fallback cuando no hay foto
Tooltip        → wrapper para icon-only buttons que provee el nombre visual
Alert / Toast  → Icon informativo de status (success/warning/critical/info)
                 + Tone debe coincidir con el tone del Alert
```

---

## Reference: how other systems do it

**Material Design 3 — Variable font con eje óptico:** Material Symbols es arquitectónicamente único en el ecosistema: una variable font con ejes continuos (fill 0–1, weight 100–700, optical size 20–48). El eje de optical size es la innovación clave — un ícono a 20dp recibe automáticamente strokes más gruesos para legibilidad mientras que un ícono a 48dp tiene mayor detalle. Los tres estilos de familia (Outlined/Rounded/Sharp) son archivos de fuente separados, no ejes, lo que previene mezcla accidental de estilos. Tres mil símbolos disponibles. Lección aplicada: diseñar variantes de tamaño específico para al menos 16px y 24px — un solo SVG escalado produce calidad visual notablemente inferior.

**Carbon (IBM) — Optimización SVG por tamaño:** Carbon provee sus 2,000+ íconos en cuatro tamaños fijos (16/20/24/32px) como SVGs separados optimizados por pixel grid. Todos los íconos son decorativos por defecto (`aria-hidden="true"`); proveer `aria-label` agrega automáticamente `role="img"` y un elemento `<title>` dentro del SVG. El árbol de dependencias es tree-shakeable ítem a ítem. Lección: decorativo-por-defecto produce menos fallos de accesibilidad que lo contrario.

**Fluent 2 (Microsoft) — 5,000+ íconos con `bundleIcon`:** La biblioteca más grande del ecosistema (5,000+ íconos en 6 variantes de tamaño). La utilidad `bundleIcon` combina una variante Regular y una Filled en un componente único que el padre puede alternar — elimina lógica de renderizado condicional en cada punto de uso y formaliza la convención "filled = activo". Adoptado en la prop `Style` del componente.

**Spectrum (Adobe) — Herencia automática por `alt` prop:** Spectrum separa íconos de workflow (UI actions) de íconos de producto (identidad de app). El color hereda vía `currentColor`. Si se provee `alt`, aplica `role="img"` + `aria-label` automáticamente; sin `alt`, aplica `aria-hidden="true"` automáticamente. Un único punto de control de accesibilidad.

**Polaris (Shopify) — Sistema de tones semánticos + advertencias de dev:** El sistema de tones de Polaris mapea el color del ícono a tokens semánticos (base/subdued/caution/warning/critical/interactive/success). Solo dos tamaños (minor 20px / major 24px) alineados con la tipografía de Shopify Admin. Dev mode advierte cuando falta `accessibilityLabel` y el ícono no está dentro de un padre etiquetado.

**Atlassian — `label` requerido con enforcement ESLint:** El prop `label` es el único punto de control de accesibilidad: string no vacío = `role="img"` + `aria-label`; string vacío = `aria-hidden="true"`. Reglas ESLint exigen que `label` siempre esté explícitamente definido. El sistema two-tone usa `primaryColor`/`secondaryColor` para fills de status.

**Twilio Paste — Boolean `decorative` como el modelo de enforcement más fuerte:** El boolean `decorative` es el patrón de accesibilidad más limpio de Tier 2. `decorative={true}` aplica `aria-hidden="true"` automáticamente. `decorative={false}` requiere un prop `title` o el componente lanza un error en runtime. Elimina la ambigüedad de `aria-label` opcional donde los desarrolladores pueden olvidar etiquetar íconos.

**GitHub Primer Octicons — Optimización SVG a 16px y 24px:** Cada Octicon tiene versión en 16px y 24px con paths optimizados para cada pixel grid. Tree-shakeable como componentes React individuales. Prop `verticalAlign` controla la alineación baseline con texto adyacente.

**Chakra UI — `createIcon` factory para íconos personalizados:** El factory `createIcon` es el patrón más limpio para registrar íconos personalizados desde SVG path data — crea un componente React con todas las props estándar (size, color, aria-label) sin archivo SVG. El wrapper `Icon` acepta children SVG o prop `as` para íconos de terceros.

---

## Tokens

**14 tokens** · prefix `icn-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `icn-size-xs` | `iconSize/xs` (12px) | Tamaño xs |
| `icn-size-sm` | `iconSize/sm` (16px) | Tamaño sm |
| `icn-size-md` | `iconSize/md` (20px) | Tamaño md (default) |
| `icn-size-lg` | `iconSize/lg` (24px) | Tamaño lg |
| `icn-size-xl` | `iconSize/xl` (32px) | Tamaño xl |
| `icn-inherit-fg` | `text/currentColor` | Tone inherit — currentColor |
| `icn-primary-fg` | `text/primary` | Tone primary |
| `icn-secondary-fg` | `text/secondary` | Tone secondary |
| `icn-subdued-fg` | `text/subtlest` | Tone subdued |
| `icn-success-fg` | `status/success/fg` | Tone success |
| `icn-warning-fg` | `status/warning/fg` | Tone warning |
| `icn-critical-fg` | `status/error/fg` | Tone critical |
| `icn-info-fg` | `status/info/fg` | Tone info |
| `icn-focus-ring` | `focus/ring` | (heredado del padre interactivo) |

### Spacing specs

```
Tamaños (px):
  xs: 12 × 12
  sm: 16 × 16
  md: 20 × 20  ← default
  lg: 24 × 24
  xl: 32 × 32

Gap sugerido icon-label en componentes que contienen Icon:
  sm icon (16px): gap 4px  → spacing/1
  md icon (20px): gap 4px  → spacing/1
  lg icon (24px): gap 6px  → spacing/1 ~ spacing/2

Focus ring (heredado del padre):
  ring: 2px solid focus/ring
  ring-offset: 2px

Notas:
- Icon no tiene padding propio; el padre define el hit area
- Para icon-only buttons, el padre debe tener mínimo 32px × 32px
  (sm/md icon) o 40px × 40px (lg/xl icon) para WCAG 2.5.5 AA
```
