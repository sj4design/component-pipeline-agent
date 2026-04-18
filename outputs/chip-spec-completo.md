# Chip

## Overview

El Chip es una unidad de interacción compacta que puede funcionar como filtro seleccionable, token removible o etiqueta de estado visual. Su forma de píldora (radio 9999) y su tamaño reducido lo distinguen de los botones estándar y lo posicionan como el elemento natural para representar entidades discretas dentro de flujos de filtrado, selección de múltiples valores y etiquetado de contenido.

El sistema define tres tipos semánticamente distintos: **filter** (toggle de grupo para faceted search), **input** (token removible que representa una entidad ingresada por el usuario) y **display** (etiqueta informativa no interactiva). Esta taxonomía de tipos previene el conflicto de roles ARIA que ocurre cuando se intenta usar un componente genérico para todos los patrones — un error que 6 de los 24 sistemas analizados cometen.

```
ANATOMÍA DEL CHIP
┌──────────────────────────────────────────┐
│  [●icon] [  Label text  ]  [✕remove]     │
│   lead       required        trail       │
└──────────────────────────────────────────┘

SLOTS:
  leadingIcon  — Ícono de contexto (categoría, tipo); opcional; bind: swap
  label        — Texto principal; REQUERIDO; bind: text
  checkmark    — Indicador de selección (solo filter type); bind: bool
  removeButton — Botón de eliminación (solo input type); bind: bool

VARIANTES DE TIPO:
  FILTER chip (toggle)
  ┌─────────────────────────────────────────────────┐
  │  ✓ JavaScript  │  Python  │  TypeScript  │  +4  │
  └─────────────────────────────────────────────────┘
  role="button" + aria-pressed="true/false"

  INPUT chip (token removible)
  ┌────────────────────────────────────────┐
  │  Alice Chen ×   │  Bob Martinez ×      │
  └────────────────────────────────────────┘
  role="button" con remove button separado

  DISPLAY chip (etiqueta)
  ┌──────────────────┐
  │  ● In Progress   │
  └──────────────────┘
  Sin interacción, sin cursor pointer, sin tab stop
```

Los chips se agrupan en un contenedor **ChipGroup** que gestiona el modelo de selección (`role="group"` + `aria-label` requerido). Los chips individuales fuera de grupo pierden contexto semántico para lectores de pantalla.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Type     → filter | input | display
Size     → sm | md | lg
Variant  → filled | outlined | elevated
State    → default | hover | focus-visible | selected
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Selected         → boolean — activa checkmark + fill; solo filter type
Removable        → boolean — muestra removeButton; solo input type
Elevated         → boolean — sombra elevada; no combinar con outlined
Disabled         → boolean — opacidad 0.4; aplica a todos los tipos
Show Leading Icon → boolean — controla visibilidad del leadingIcon slot
Show Checkmark   → boolean — visibilidad del checkmark icon
Show Remove      → boolean — visibilidad del removeButton
```

### Figma properties panel

```
┌─────────────────────────────────────────┐
│  CHIP                                   │
│  ─────────────────────────────────────  │
│  Type         [filter ▾]               │
│  Size         [md     ▾]               │
│  Variant      [filled ▾]               │
│  State        [default▾]               │
│  ─────────────────────────────────────  │
│  Selected     [ ] false                │
│  Removable    [ ] false                │
│  Elevated     [ ] false                │
│  Disabled     [ ] false                │
│  ─────────────────────────────────────  │
│  Show Leading Icon  [ ] false          │
│  Leading Icon  [swap icon ▾]           │
│  Show Checkmark     [ ] false          │
│  Show Remove        [ ] false          │
│  ─────────────────────────────────────  │
│  ✏️ Label      [Chip              ]     │
└─────────────────────────────────────────┘

CONTEO DE FRAMES
  Gross: 3 tipos × 3 sizes × 4 states = 36
  Exclusiones: 12 combinaciones inválidas
  Net: 24 frames (dentro del budget simple 10–30)
```

---

## When to use (and when not to)

```
¿El usuario necesita filtrar/seleccionar múltiples valores simultáneamente?
  └→ Sí, valores compactos y discretos → FILTER CHIP (toggle group)
  └→ Sí, pero son más de 7 opciones → Considerar checkbox dropdown

¿El usuario ya ingresó o seleccionó entidades que puede querer quitar?
  └→ Sí (emails, tags, categorías) → INPUT CHIP (removable token)

¿Necesitas mostrar estado/categoría de forma no interactiva?
  └→ Sí → DISPLAY CHIP (etiqueta)
  └→ Estado urgente/de error → Badge o Alert, no chip

¿El usuario necesita una sola selección exclusiva?
  └→ Sí → SegmentedControl o RadioGroup, no filter chips
```

**Use Chip when:**
- Necesitas mostrar un grupo de filtros seleccionables en un panel de búsqueda facetada (e.g., lenguajes de programación, categorías de producto, etiquetas de prioridad).
- El usuario ha ingresado tokens en un campo multi-valor (e.g., destinatarios de email, etiquetas de un artículo) y necesita poder eliminar cada uno individualmente.
- Quieres mostrar metadatos de estado de forma compacta (e.g., "En progreso", "Urgente", "Premium") en tarjetas o filas de tabla.
- El espacio horizontal es limitado y los checkboxes tradicionales añadirían demasiado peso visual.

**Do NOT use Chip when:**
- La selección es de una sola opción exclusiva — usa SegmentedControl o RadioGroup en su lugar.
- Tienes más de 7–8 opciones de filtro — los paneles de filtros colapsables con checkboxes son más accesibles para conjuntos grandes.
- El chip debe contener acciones complejas o navegación a páginas — usa un Button o un Link.
- El contenido a mostrar tiene importancia alta o urgente (errores críticos, alertas) — los chips son elementos de baja jerarquía visual.
- El contexto es móvil-first o táctil como superficie principal — los chips requieren precisión de puntero; usa controles de selección nativos.
- El flujo requiere confirmación legal o regulatoria — los chips no tienen affordance de formulario formal.

---

## Visual variations

### Por tipo

**filter** — Chip togglable con estado seleccionado. El checkmark en posición leading confirma la selección. El color de relleno cambia en `State=selected`. Usa `aria-pressed`.

**input** — Token removible. El `removeButton` (×) es un elemento focusable separado del body del chip. El label debe describir la entidad; el aria-label del remove button incluye el texto del chip: "Eliminar JavaScript". No tiene estado `selected`.

**display** — Etiqueta informativa estática. Sin cursor pointer, sin hover state, sin tab stop. Evita el conflicto de tabstop-pollution en tablas densas.

### Por variante visual

| Variante | Descripción | Cuándo usar |
|----------|-------------|-------------|
| `filled` | Relleno sólido en estado default; color de brand en selected | Filtros activos, selección múltiple |
| `outlined` | Sin relleno, borde visible; fill en selected | Chips secundarios, menor énfasis |
| `elevated` | Sombra de elevación sobre fondos complejos | Chips sobre mapas, imágenes, fondos no blancos |

**Exclusión:** `elevated` + `outlined` es combinación inválida — elevated implica superficie rellena.

### Por tamaño

| Size | Altura | Font | Icon | Padding X | Radio |
|------|--------|------|------|-----------|-------|
| `sm` | 32px | 12px | 16px | 8px | 9999 |
| `md` | 40px | 14px | 16px | 12px | 9999 |
| `lg` | 48px | 16px | 20px | 16px | 9999 |

### Por estado

| State | Visual | Aplica a |
|-------|--------|---------|
| `default` | Superficie neutral, borde sutil | filter, input, display |
| `hover` | Superficie levemente oscurecida | filter, input |
| `focus-visible` | Ring azul 2px + offset 2px | filter, input |
| `selected` | Fill color + checkmark visible | filter únicamente |
| `disabled` | Opacidad 0.4, sin pointer cursor | filter, input, display |

**Exclusiones de estado:**
- `Type=display` × `State=selected|hover|focus-visible` — Display chips son no-interactivos
- `Type=input` × `State=selected` — Input chips no son toggles; son tokens removibles
- `Type=filter` × `Removable=true` — Filter chips no representan entidades removibles
- `Type=display` × `Removable=true` — Display chips son etiquetas estáticas
- `Elevated=true` × `Variant=outlined` — Conflicto de superficie

---

## Design decisions

### 1. Taxonomía de tres tipos como separación semántica (no solo visual)

**Why:** Conflatar los tres patrones en un solo componente genérico causa errores de ARIA role. Un chip de filtro usa `aria-pressed` (toggle button semantics); un input chip necesita un remove button separado focusable con aria-label descriptivo; un display chip no debe estar en el tab order. Asignar el tipo incorrecto a un contexto crea expectativas erróneas para usuarios de lectores de pantalla.

**Tradeoff:** Mayor API surface y más frammes en Figma (24 vs. los ~8 de un chip genérico). Pero la claridad semántica previene el error más costoso del patrón: mezclar roles ARIA incorrectamente.

**Fuente:** 18/18 sistemas con chip diferencian al menos dos patrones de interacción. M3, Carbon, Fluent 2, Ant Design usan taxonomías de tipo explícitas.

---

### 2. Radio 9999 (píldora) universal para todos los tamaños

**Why:** La forma de píldora es el consenso de 18/18 sistemas con chip. El shape comunica semánticamente "elemento compacto, discreto" — distinto de los botones rectangulares (acciones) y de los badges rectangulares (contadores). El chip necesita su propia huella visual para que el usuario lo identifique correctamente en el contexto de otros controles.

**Tradeoff:** Cero flexibilidad de radio en el token de chip. Un sistema que requiera chips cuadrados para una área específica debe sobrescribir explícitamente. Esta es la decisión correcta — la consistencia visual del patrón tiene más valor que la flexibilidad por componente.

---

### 3. State=selected como fila de variante, no como boolean de opacidad

**Why:** `Selected` cambia simultáneamente el color de relleno, la visibilidad del checkmark y el borde del chip — tres propiedades visuales modificadas. La regla global-property-rules (Rule 27) establece que cuando ≥2 propiedades visuales cambian, la diferencia requiere un frame de variante, no un toggle de opacidad booleano. Un boolean no puede capturar estos tres cambios simultáneos correctamente en Figma.

**Tradeoff:** Aumenta el frame count de la matriz de variantes. Este costo es necesario para que el estado seleccionado sea fiel en Figma y pueda usarse en prototipos de selección múltiple.

---

### 4. Disabled como boolean (no como State variant)

**Why:** En el chip, `Disabled` solo reduce la opacidad a 0.4 sin cambios estructurales en el layout ni en los colores de fill o border. Por la regla de ≤1 propiedad visual → boolean. A diferencia de `Selected`, `Disabled` no redibujaría el componente, solo lo oscurece.

**Tradeoff:** La decisión es correcta pero requiere documentar explícitamente que disabled no se puede combinar con State=selected o State=hover para que los implementadores no generen frames imposibles.

---

### 5. leadingIcon con patrón BOOL+SWAP (no variantes por ícono)

**Why:** Si cada posible ícono generara una fila de variante, el frame count crecería 10–20× por el número de íconos del sistema. El patrón BOOL+SWAP (Show Leading Icon + Leading Icon swap) reduce el impacto a una sola propiedad booleana de visibilidad más un slot de instance swap. Esto representa una reducción del 80–95% en frames vs. el enfoque de variantes por ícono.

**Tradeoff:** El swap requiere disciplina en la librería de íconos — todos los íconos deben estar en el mismo frame size para que el swap no desplace el layout del chip.

### Excluded combinations

```
Type=display   × State=selected      → Display chips son no-interactivos; sin toggle
Type=display   × State=hover         → Display chips son no-interactivos; sin cursor
Type=display   × State=focus-visible → Display chips no están en el tab order
Type=input     × State=selected      → Input chips son tokens, no toggles
Elevated=true  × Variant=outlined    → Elevated implica superficie rellena; conflicto
Type=filter    × Removable=true      → Filter chips no son entidades removibles
Type=display   × Removable=true      → Display chips son etiquetas estáticas
```

---

## Behavior

### Essential for design

El Chip responde a interacciones de puntero y teclado según su tipo:

- **Filter chips** son toggle buttons en un grupo de selección. El clic o Space/Enter conmuta el estado `selected`. El ChipGroup puede configurarse para single-select (type="radio", un chip activo) o multi-select (type="checkbox", varios chips activos). El estado seleccionado persiste hasta que el usuario lo deselecciona.

- **Input chips** representan entidades ya ingresadas. El body del chip puede ser focusable (para abrir detalles de la entidad). El `removeButton` es un elemento separado que elimina el token. Al eliminar un chip, el foco se mueve automáticamente al siguiente chip o al campo de entrada del grupo.

- **Display chips** son completamente pasivos. No tienen cursor pointer, no capturan eventos de teclado, no están en el tab order. En tablas densas con docenas de chips por fila, esto previene contaminación de tab stops.

El `ChipGroup` contenedor requiere `aria-label` descriptivo. Sin contexto de grupo, el lector de pantalla anuncia "JavaScript, botón, presionado" sin indicar que es parte de los "Filtros de lenguaje".

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Filter chip | `role="button"` | `aria-pressed="true/false"` | Comunica estado toggle al AT |
| Input chip body | `role="button"` | `aria-label="[label] — presiona para ver detalles"` | Distingue la acción del body de la acción de eliminar |
| Remove button | `role="button"` | `aria-label="Eliminar [chip label]"` | Evita el error más común: "Eliminar ×" genérico que no identifica qué se elimina |
| Display chip | Ninguno o `role="status"` | — | No en tab order; no interactivo |
| ChipGroup | `role="group"` | `aria-label="[contexto del grupo]"` | Proporciona contexto semántico del conjunto |
| Multi-select group | `role="group"` | `aria-label`, `aria-multiselectable="true"` | Comunica modelo de selección |

### Keyboard navigation

Primary interactions (affect design):

```
Space / Enter   → Toggle selected state (filter chips únicamente)
Delete / Backspace → Eliminar chip enfocado (input chips)
Arrow keys      → Navegar entre chips del mismo grupo (roving tabindex)
Tab             → Salir del grupo y moverse al siguiente elemento focusable
```

Secondary interactions (dev reference):

```
Cuando un input chip es eliminado:
  → El foco se mueve al siguiente chip en el grupo
  → Si era el último, el foco va al campo de entrada del ChipGroup
  → Nunca caer al documento root

aria-live="polite":
  → Anunciar adición de chips: "JavaScript añadido a filtros activos"
  → Anunciar eliminación: "Alice Chen eliminado"

En grupos de filter con selección cambiada:
  → aria-live anuncia el nuevo estado si el cambio es de múltiples chips simultáneos
  → Para toggle individual, aria-pressed es suficiente anuncio
```

---

## Content guide

### Slot: label (REQUERIDO)

El label del chip debe ser conciso y específico. La longitud máxima recomendada es de 24 caracteres — los chips con labels muy largos pierden su naturaleza compacta y deben evaluarse como candidatos para una representación diferente.

- **Filter chips:** Usa el nombre de la categoría o valor sin verbo ("JavaScript", "Urgente", "Este mes"). El chip ya comunica que es seleccionable.
- **Input chips:** Muestra el nombre de la entidad tal como fue ingresada o seleccionada ("alice@empresa.com", "Diseño UX", "Q2 2026").
- **Display chips:** Muestra el estado o categoría del item ("En progreso", "Premium", "Archivado").

Evita prefijos redundantes como "Tipo: Frontend" — el contexto del ChipGroup ya provee esa información.

### Slot: leadingIcon (opcional)

El ícono debe reforzar visualmente la categoría del label, no repetirla. Usar un ícono de globe junto a "Inglés" añade valor; usar una estrella junto a "Premium" añade valor. Evitar íconos genéricos que no aporten contexto.

En chips de persona (input chips para destinatarios), el leadingIcon puede ser un avatar — en ese caso el bind es media en lugar de icon.

### Slot: removeButton (solo input type)

El `aria-label` del removeButton DEBE incluir el texto del chip. No usar "×", "Eliminar" ni "Remove" genérico. El patrón correcto es: `aria-label="Eliminar [label]"` — ej. "Eliminar alice@empresa.com".

Este es el error de accesibilidad más común en implementaciones de chips. Polaris auto-genera estos labels; Atlassian los hace requeridos como contrato de API. Implementa uno de los dos enfoques.

### Slot: checkmark (solo filter type, state=selected)

El checkmark es el indicador visual de selección secundario (el fill del chip es el primario). No incluir texto alternativo explícito — el `aria-pressed="true"` ya comunica el estado seleccionado al AT. El checkmark es una confirmación visual redundante, no la fuente de verdad de accesibilidad.

---

## Pre-build checklist

```
ANTES DE EMPEZAR
  [ ] Definir qué tipos necesita el producto: filter / input / display (nunca los tres en duda)
  [ ] Decidir el modelo de selección del ChipGroup: single-select (radio) vs. multi-select (checkbox)
  [ ] Confirmar que el sistema de íconos tiene íconos en los tamaños correctos (16px para sm/md, 20px para lg)

FIGMA
  [ ] 24 frames net creados (3 tipos × 3 sizes × 4 states minus 12 exclusiones)
  [ ] State=selected con fill distinto al default (no solo checkmark visible)
  [ ] leadingIcon usando patrón BOOL+SWAP correctamente
  [ ] removeButton como elemento separado (no merged con el trailing del label)
  [ ] Disabled layer con opacidad 0.4 (no grey fill — la transparencia aplica sobre cualquier fondo)
  [ ] Display chips sin cursor pointer en el prototype layer
  [ ] Todos los tamaños tienen radio=9999 exacto

ACCESIBILIDAD
  [ ] aria-pressed en filter chips (no aria-selected)
  [ ] aria-label en remove buttons incluye el texto del chip
  [ ] ChipGroup tiene aria-label descriptivo (no genérico "Chips")
  [ ] Display chips fuera del tab order (tabIndex=-1 o no-focusable)
  [ ] Focus management post-removal especificado para input chips
  [ ] Selección comunicada por indicador visual ADEMÁS del color (checkmark, borde, peso de texto)

TOKENS
  [ ] Prefix chp- en todos los tokens del componente
  [ ] Colores de estado selected no dependen solo de color (WCAG 1.4.1)
  [ ] Ring de focus usa el token focus.ring del sistema
```

---

## Related components

```
Badge / Lozenge
  → Para estados informativos con semántica de alerta o sistema
  → Atlassian separa arquitecturalmente Tag (interactivo) de Lozenge (display)
  → Usar Badge cuando el chip sería solo display y hay significado de estado urgente

Button
  → Para acciones únicas; el chip no ejecuta acciones, representa estados o entidades
  → Si el chip necesita un icono trailing de dropdown/menu → evaluar ButtonMenu

SegmentedControl
  → Para selección exclusiva (una opción a la vez) con pocas opciones (2–4)
  → Mejor que filter chips cuando el single-select es el único modelo del grupo

TagInput / ComboboxWithChips
  → Cuando los chips se crean dinámicamente mientras el usuario escribe (type-to-add)
  → Fluent 2 TagPicker, Evergreen TagInput — patrón distinto al input chip simple

ChoiceList / CheckboxGroup
  → Para filtros con 8+ opciones donde la densidad no es prioritaria
  → Polaris recomienda checkboxes sobre filter chips para audiencias no técnicas
```

---

## Reference: how other systems do it

**Material Design 3** establece la taxonomía más granular del sector con cuatro tipos: Assist, Filter, Input y Suggestion. El tipo Assist es único — activa acciones contextuales inteligentes (añadir al calendario, compartir). El tipo Suggestion provee completaciones de IA. M3 es también el único sistema en Tier 1 que documenta el patrón "soft-disabled" (focusable pero inerte) para chips filtro inactivos, lo que mejora la descubribilidad para usuarios que no entienden por qué el chip está deshabilitado.

**Spectrum (Adobe)** adopta arquitectura container-first: el TagGroup posee el selectionMode y su configuración determina el comportamiento de todos los chips hijos — `selectionMode="multiple"` para filter, `selectionMode="single"` para choice, `onRemove` en el grupo para input chips. Los tags individuales son deliberadamente pasivos. La ventaja es consistencia garantizada sin variación per-item. El atributo `aria-label` en TagGroup es obligatorio en runtime — lanza excepción si falta. La característica `maxRows` + "show more" es la solución de overflow más completa de Tier 1.

**Carbon (IBM)** unifica chip y tag en un Tag component con cuatro variantes operacionales. La variante `operational` es única: al hacer click revela un popover con información contextual — el chip actúa como trigger de progressive disclosure. La variante `selectable` es el equivalente de filter chip. Carbon toma la decisión deliberada de hacer los tags read-only inaccesibles por teclado para evitar contaminación de tab stops en grids de datos densos con docenas de tags por fila — validando el patrón `display` de nuestro spec.

**Polaris (Shopify)** es el único sistema Tier 1 sin filter chip explícito. La investigación de usuario de Shopify encontró que los comerciantes entienden mejor los checkboxes que los toggles de chip, lo que llevó a la decisión intencional de usar ChoiceList para filtros. El Tag de Polaris cubre exclusivamente input chips (tokens removibles). Una de las contribuciones más valiosas de Polaris es la auto-generación de aria-labels descriptivos para remove buttons — derivados del contenido del chip sin requerir ninguna configuración adicional del desarrollador.

**Atlassian** separa arquitecturalmente Tag (interactivo) de Lozenge (display de estado), reflejando una distinción de dominio real en Jira/Confluence: las etiquetas manejadas por el usuario y los estados asignados por el sistema tienen affordances fundamentalmente diferentes. La característica `onBeforeRemoveAction` (retorna una Promise) es única en Tier 1 — la eliminación de una etiqueta en Jira puede disparar automaciones, actualizaciones de filtros y notificaciones, por lo que se necesita confirmación async antes de proceder.

**Ant Design** provee `CheckableTag` como sub-componente dedicado para filter chips — un import separado que evita confusion de modo. El sistema de color es el más expresivo: 17+ presets más valores hex arbitrarios, crítico para plataformas SaaS donde los colores de tags provienen de configuración del usuario.

**REI Cedar (CdrChip)** es la única implementación Tier 2 con chip interactivo dedicado. Valida que un solo componente de chip puede servir tanto para filter (multi-select) como para choice (single-select) a través de la configuración del grupo. Certificado WCAG 2.1 AA.

**Lightning Design System** tiene el Pill componente específicamente para el patrón de input chip en lookups y comboboxes CRM. El Pill Container gestiona grupos de pills removibles en contextos de entrada de datos de CRM.

**Mantine** ofrece la implementación más clara de filter chip en Tier 3 con Chip y Chip.Group. `Chip.Group` gestiona single-select (`type="radio"`) o multi-select (`type="checkbox"`) internamente — la semántica ARIA correcta emerge del tipo de grupo. Esta es la arquitectura de referencia para filter chip panels.

**Fluent 2 (Microsoft)** es el más arquitectónicamente granular en Tier 3: Tag (display), InteractionTag (clickable + dismissible con acciones separadas) y TagPicker (sistema completo de entrada multi-valor). InteractionTag separa explícitamente el click en el body del chip de la acción de dismiss — útil para chips de contacto donde click = ver detalles del contacto, X = eliminar del campo.

---

## Tokens

**28 tokens** · prefix `chp-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `chp-bg-default` | `surface/default` | Fondo del chip en estado default |
| `chp-bg-hover` | `surface/hover` | Fondo en hover (filter/input) |
| `chp-bg-selected` | `surface/selected` | Fondo en state=selected (filter) |
| `chp-bg-disabled` | `surface/disabled` | Fondo cuando disabled=true |
| `chp-fg-default` | `text/primary` | Color del label en estado default |
| `chp-fg-selected` | `interactive/default` | Color del label en state=selected |
| `chp-fg-disabled` | `text/disabled` | Color del label cuando disabled |
| `chp-border-default` | `border/default` | Borde del chip en estado default |
| `chp-border-hover` | `border/hover` | Borde en hover |
| `chp-border-focus` | `border/focus` | Borde en focus-visible |
| `chp-border-selected` | `interactive/default` | Borde en state=selected |
| `chp-icon-default` | `text/secondary` | Color de leadingIcon en default |
| `chp-icon-selected` | `interactive/default` | Color de leadingIcon en selected |
| `chp-remove-fg` | `text/secondary` | Color del × button en default |
| `chp-remove-fg-hover` | `text/primary` | Color del × button en hover |
| `chp-focus-ring` | `focus/ring` | Ring de focus visible |
| `chp-focus-ring-width` | `focus/ringWidth` (2px) | Grosor del focus ring |
| `chp-focus-ring-offset` | `focus/ringOffset` (2px) | Offset del focus ring |
| `chp-elevated-shadow` | `elevation/1` | Sombra para variant=elevated |
| `chp-radius` | `radius/9999` | Radio píldora universal |
| `chp-h-sm` | `control/sm` (32px) | Altura size=sm |
| `chp-h-md` | `control/md` (40px) | Altura size=md |
| `chp-h-lg` | `control/lg` (48px) | Altura size=lg |
| `chp-font-sm` | `type/sm` (12px) | Font-size size=sm |
| `chp-font-md` | `type/md` (14px) | Font-size size=md |
| `chp-font-lg` | `type/lg` (16px) | Font-size size=lg |
| `chp-px-sm` | `spacing/8` (8px) | Padding horizontal sm |
| `chp-px-md` | `spacing/12` (12px) | Padding horizontal md |

### Spacing specs

```
SIZE: sm (height 32px)
  ├── padding-y: 4px  (spacing/4)
  ├── padding-x: 8px  (spacing/8)
  ├── gap (icon→label, label→remove): 8px (spacing/8)
  ├── font-size: 12px  │  line-height: 16px
  ├── icon-size: 16px
  └── border-radius: 9999

SIZE: md (height 40px) — DEFAULT
  ├── padding-y: 8px   (spacing/8)
  ├── padding-x: 12px  (spacing/12)
  ├── gap: 8px         (spacing/8)
  ├── font-size: 14px  │  line-height: 20px
  ├── icon-size: 16px
  └── border-radius: 9999

SIZE: lg (height 48px)
  ├── padding-y: 12px  (spacing/12)
  ├── padding-x: 16px  (spacing/16)
  ├── gap: 8px         (spacing/8)
  ├── font-size: 16px  │  line-height: 24px
  ├── icon-size: 20px
  └── border-radius: 9999

FOCUS RING (todos los tamaños)
  ├── ring-width: 2px
  ├── ring-offset: 2px
  └── ring-color: #405EF2 (interactive/default)

REMOVE BUTTON (interno, sin padding adicional)
  ├── click target mínimo: 24×24px (a11y minimum)
  └── icon-size: coincide con el chip size (16px sm/md, 20px lg)
```
