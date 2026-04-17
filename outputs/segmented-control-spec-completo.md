# SegmentedControl

## Descripción general

SegmentedControl es el selector de opciones compacto del sistema de diseño: un contenedor con fondo neutro que aloja 2–5 segmentos, donde uno (o varios en modo `multiple`) puede estar seleccionado. El estado seleccionado se visualiza mediante un "chip" elevado sobre el contenedor — fondo blanco, sombra y borde — siguiendo el patrón de pill indicator de Material Design 3. Es el patrón estándar para cambiar vistas (chart/table/list), filtros de categoría inline, y selecciones de configuración compactas donde las opciones son pocas y visualmente paralelas.

```
Size=md, SelectionMode=single, 3 segments:
┌────────────────────────────────────────┐
│  ┌──────────┐  Tabla      Lista       │  h:36px
│  │  Gráfico │                         │
│  └──────────┘                         │
│  container bg: surface/pressed         │
│  selected chip: bg:white · shadow      │
└────────────────────────────────────────┘

Con íconos:
┌────────────────────────────────────────────────┐
│  ┌──────────────┐  [≡] Lista  [○] Resumen      │
│  │ [📊] Gráfico │                               │
│  └──────────────┘                               │
└────────────────────────────────────────────────┘

FullWidth=yes (fill container):
┌──────────────────────────────────────────────────────────┐
│   Diario   │   ┌─────────────┐   │   Mensual            │
│            │   │  Semanal    │   │                       │
│            │   └─────────────┘   │                       │
└──────────────────────────────────────────────────────────┘

SelectionMode=multiple:
┌────────────────────────────────────────────────────────┐
│  ┌──────┐  ┌──────┐    Zoom Phone                     │
│  │ Chat │  │ Meet │                                    │
│  └──────┘  └──────┘                                    │
└────────────────────────────────────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes en Segment (building block):

```
State → default | hover | selected | focused | disabled
Size  → sm | md | lg
```

Variantes en SegmentedControl (composición):

```
SelectionMode → single | multiple
Size          → sm | md | lg
FullWidth     → no | yes
```

Toggles en Segment:

```
👁 Has Icon  → muestra/oculta el ícono (default: off)
👁 Has Label → muestra/oculta el label (default: on)
👁 Show Selected Checkmark → muestra checkmark en selected (default: off)
```

Intercambio de ícono:

```
🔄 Icon           → ícono del segmento
🔄 Selected Icon  → checkmark u otro ícono en estado selected
```

Texto editable:

```
✏️ Label → "Segment"
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  Segment                                                 │
│  ──────────────────────────────────────────────────────  │
│  State  [ default         ▼ ]                            │
│  Size   [ md              ▼ ]                            │
│  ──────────────────────────────────────────────────────  │
│  👁 Has Icon                  [ off ]                    │
│  👁 Has Label                 [ on  ]                    │
│  👁 Show Selected Checkmark   [ off ]                    │
│  🔄 Icon          [ icon/placeholder  ]                  │
│  🔄 Selected Icon [ icon/check        ]                  │
│  ✏️ Label   [ Segment                             ]      │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  SegmentedControl                                        │
│  ──────────────────────────────────────────────────────  │
│  SelectionMode  [ single          ▼ ]                    │
│  Size           [ md              ▼ ]                    │
│  FullWidth      [ no              ▼ ]                    │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El usuario necesita elegir entre pocas opciones paralelas?
                    │
                    ▼
       ¿Las opciones controlan una vista o modo?
       ├── Sí → SegmentedControl (view switching)
       └── Navegan a contenido distinto → Tabs
                    │
                    ▼
       ¿Cuántas opciones hay?
       ├── 2–5 → SegmentedControl
       └── >5 → Select (dropdown) o Tabs
                    │
                    ▼
       ¿Se puede seleccionar más de una?
       ├── Sí → SelectionMode=multiple
       └── No → SelectionMode=single
```

**Usar SegmentedControl cuando:**
- Cambiar la vista de datos: Gráfico / Tabla / Lista
- Filtrar por período: Diario / Semanal / Mensual
- Seleccionar tipo: Reunión / Webinar / Evento
- Cambiar layout: Cuadrícula / Lista / Compacto
- Configuración de preferencia con pocas opciones (2–5)

**NO usar SegmentedControl cuando:**
- Las opciones navegan a páginas distintas → usar `Tabs`
- Hay más de 5 opciones → usar `Select` o `Tabs`
- Las opciones son independientes sin relación visual → usar `CheckboxGroup`
- La selección tiene consecuencias permanentes → usar `RadioGroup` con descripción

---

## Variaciones visuales

### Segment sizes

| Size | Height | PaddingX | Gap | FontSize | FontWeight | IconSize | Radius |
|------|--------|---------|-----|---------|-----------|---------|--------|
| sm   | 28px   | 10px    | 6px | 12px    | 500       | 14px    | 6px    |
| md   | 32px   | 12px    | 6px | 13px    | 500       | 16px    | 6px    |
| lg   | 40px   | 16px    | 8px | 14px    | 500       | 18px    | 8px    |

### SegmentedControl container sizes

| Size | Altura total | Padding | Gap entre segments | Radius del container |
|------|-------------|---------|-------------------|---------------------|
| sm   | 36px        | 4px     | 2px               | 8px                 |
| md   | 40px        | 4px     | 2px               | 8px                 |
| lg   | 48px        | 4px     | 2px               | 10px                |

### States del Segment

| State | Fondo | Foreground | Borde | Shadow |
|-------|-------|-----------|-------|--------|
| default | transparent | text/secondary (gris) | transparent | — |
| hover | surface/hover | text/primary | transparent | — |
| selected | surface/default (blanco) | text/primary | border/default | elevation/1 |
| focused | surface/default (blanco) | text/primary | — | focus ring 2px |
| disabled | transparent | text/disabled | transparent | — |

---

## Decisiones de diseño

**1. SelectionMode single + multiple** — M3 unifica con `singleSelect` boolean; Spectrum tiene 3 modos (none/single/multiple). Se usan 2 modos — `none` (pure actions) ya está cubierto por ButtonGroup. Single y multiple tienen ARIA roles distintos (`radiogroup` vs `group`).

**2. Tres sizes siguiendo Carbon** — Carbon y Ant ofrecen 3 sizes. sm/md para densidad enterprise, lg para touch mobile. Las alturas (36/40/48) coinciden con las del container (segment height + 2×padding).

**3. Checkmark en selected state (M3)** — WCAG 1.4.1: el estado seleccionado no puede depender solo de color. M3 reemplaza el leading icon con checkmark. Modelado como boolean `Show Selected Checkmark` + swap slot `selectedIcon` para flexibilidad.

**4. Container con bg pressed + elevación del chip** — El segment seleccionado tiene bg blanco "elevado" sobre container oscuro + shadow elevation/1. Match visual con el patrón iOS/macOS de segmented picker y Ant Design's sliding indicator (sin animación en Figma).

**5. FullWidth como property** — En toolbars el segmented es fit-content; en filter bars necesita fill container (Ant `block` prop, Polaris `fitted`). Property explícita genera frames para ambos casos.

**6. Sin overflow collapse** — Spectrum colapsa a "more" menu con overflow. M3, Ant y la mayoría no lo hacen. Límite de ≤5 segments como hard constraint. Overflow se resuelve con un componente diferente.

### Combinaciones excluidas

```
(ninguna — SelectionMode × Size × FullWidth no tiene exclusiones)
```

---

## Comportamiento

### Esencial para diseño

- **SegmentedControl no modela el contenido que controla** — el componente solo gestiona la selección. El contenido (el gráfico, la tabla, la vista) se modela por separado en el frame del diseño.
- **Límite de 2–5 segments** — por debajo de 2 no tiene sentido; por encima de 5 usar Select o Tabs. M3 documenta este constraint explícitamente.
- **FullWidth=yes: segments se expanden equitativamente** — cada segment recibe el mismo ancho calculado como `(containerWidth - 2×padding) / count`.
- **Icon-only segments requieren aria-label** — si Has Label=off y solo hay ícono, el SR no puede anunciar la opción. Requiere aria-label en el segment (Carbon también lo documenta con Tooltip obligatorio).
- **SelectionMode=multiple: selección independiente** — cada segment puede estar seleccionado/no independientemente. No hay un "todos" implícito.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Container (single) | `role="radiogroup"` + `aria-label` | SR anuncia el grupo; roving tabindex |
| Container (multiple) | `role="group"` + `aria-label` | SR anuncia el grupo; Tab entre items |
| Segment (single) | `role="radio"` + `aria-checked` | SR anuncia "botón de opción, [nombre], [estado]" |
| Segment (multiple) | `role="checkbox"` + `aria-checked` | SR anuncia "casilla, [nombre], [estado]" |
| Icon-only | `aria-label` en el segment | Sin label visual, SR necesita nombre |
| Selected visual | checkmark icon + color + shadow | Triple afordance — WCAG 1.4.1 |
| Disabled | `aria-disabled="true"` | SR anuncia que no es interactivo |

### Navegación por teclado

```
←/→ Arrow     → navega entre segments (roving tabindex)
Home/End      → primer/último segment
Space         → selecciona/desselecciona (multiple) o selecciona (single)
Tab           → sale del grupo completo
```

---

## Guía de contenido

**Label de segment:**
- Conciso: 1–2 palabras máximo ("Gráfico", "Tabla", "Lista")
- Paralelos en gramática: todos sustantivos o todos verbos (no mezclar)
- Sin artículos: "Lista" no "La lista"; "Mensual" no "Ver mensual"
- Con ícono: el label refuerza el ícono — no duplicar el mismo concepto

**aria-label del container:**
- Descriptivo del tipo de selección: "Tipo de vista", "Período de tiempo", "Módulos activos"
- No usar "SegmentedControl" ni "Opciones" como label

---

## Pre-build checklist

```
□ ¿SelectionMode=single: role="radiogroup" en container?
□ ¿SelectionMode=multiple: role="group" en container?
□ ¿aria-label en el container (descriptivo)?
□ ¿SelectionMode=single: role="radio" + aria-checked en segments?
□ ¿SelectionMode=multiple: role="checkbox" + aria-checked en segments?
□ ¿Icon-only segments: aria-label en cada uno?
□ ¿Roving tabindex para Arrow key navigation?
□ ¿Show Selected Checkmark: visible en selected state?
□ ¿FullWidth: segments distribuidos equitativamente?
□ ¿2–5 segments hard constraint?
□ ¿Selected state: shadow + border + checkmark (triple afordance)?
```

---

## Componentes relacionados

```
Tabs             → para navegar a contenido distinto (rutas separadas)
RadioGroup       → para selección single con descripción y mayor espacio
CheckboxGroup    → para selección múltiple con labels largos
Select           → para >5 opciones como dropdown
ButtonGroup      → para acciones (no selección de estado)
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | SelectionMode | Sizes | FullWidth | ARIA | Diferenciador |
|---------|-------|--------------|-------|----------|------|--------------|
| **Material Design 3** | SegmentedButton | single/multiple | 1 (default) | No | radiogroup/group | active-indicator pill animado; check icon |
| **Spectrum (Adobe)** | ToggleButtonGroup | single/multiple | 3 | No | radiogroup/group | selectionMode prop; ARIA APG |
| **Carbon (IBM)** | ContentSwitcher | single | 3 (sm/md/lg) | Sí | tablist | tablist ARIA (diferente); icon-only con tooltip |
| **Polaris (Shopify)** | SegmentedControl | single | 1 | fitted prop | radiogroup | fitted=true para full-width |
| **Atlassian** | ToggleButton group | single | 1 | No | — | Composición manual |
| **Ant Design** | Segmented | single | 3 (small/middle/large) | block prop | radiogroup | block=full-width; animación sliding |
| **Twilio Paste** | — | — | — | — | — | Sin componente dedicado |
| **shadcn/ui** | ToggleGroup | single/multiple | — | — | radiogroup/group | Radix ToggleGroup base |
| **Chakra UI** | ButtonGroup (workaround) | — | — | — | — | Sin componente dedicado |
| **Fluent 2** | — | — | — | — | — | Sin componente dedicado |
| **Mantine** | SegmentedControl | single | 3 | fullWidth | radiogroup | fullWidth prop; animación CSS |
| **Radix UI** | ToggleGroup | single/multiple | — | — | radiogroup/group | Headless; type prop |

**Patrones clave de la industria:**
1. **M3 active-indicator pill** — el segmento seleccionado tiene un pill shape detrás con animación de slide. Chip blanco elevado sobre container gris. Es el patrón visual más reconocible y claro.
2. **Carbon ContentSwitcher con role=tablist** — Carbon usa `tablist`/`tab` en lugar de `radiogroup`/`radio` — decisión controversial porque semánticamente no navega a contenido (como los tabs sí deben). La mayoría del mercado usa `radiogroup`.
3. **Ant Design `block` + Mantine `fullWidth`** — prop explícita para full-width. En Ant la animación sliding replica el pill de M3 con CSS transition en el `selectedIndex`.
4. **Checkmark en selected (M3 + Carbon)** — triple afordance: color distinto + shadow/elevation + checkmark icon. Cubre WCAG 1.4.1 (uso del color) para todos los usuarios.

---

## Tokens

**22 tokens** · prefijo `seg-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `seg/container/bg` | `surface/pressed` | Background del container |
| `seg/container/border` | `border/default` | Borde del container |
| `seg/sm/h` | `sizing/32` | Altura container size sm |
| `seg/md/h` | `sizing/36` | Altura container size md |
| `seg/lg/h` | `sizing/44` | Altura container size lg |
| `seg/segment/default/fg` | `text/secondary` | Texto/ícono segmento default |
| `seg/segment/hover/bg` | `surface/hover` | Fondo hover del segmento |
| `seg/segment/hover/fg` | `text/primary` | Texto/ícono hover |
| `seg/segment/selected/bg` | `surface/default` | Fondo del chip seleccionado |
| `seg/segment/selected/fg` | `text/primary` | Texto/ícono seleccionado |
| `seg/segment/selected/border` | `border/default` | Borde del chip seleccionado |
| `seg/segment/selected/shadow` | `elevation/1` | Sombra del chip seleccionado |
| `seg/segment/focused/ring` | `focus/ring` | Focus ring del segmento |
| `seg/segment/disabled/fg` | `text/disabled` | Texto/ícono disabled |
| `seg/radius/sm` | `radius/md` | Radius container sm |
| `seg/radius/md` | `radius/md` | Radius container md |
| `seg/radius/lg` | `radius/lg` | Radius container lg |
| `seg/fontSize/sm` | `type/xs` | Font size segments sm |
| `seg/fontSize/md` | `type/sm` | Font size segments md |
| `seg/fontSize/lg` | `type/md` | Font size segments lg |
| `seg/gap` | `spacing/0.5` | Gap entre segments |
| `seg/padding` | `spacing/0.5` | Padding container |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Container sm: h:36px  · p:4px  · gap:2px · r:8px       │
│  Container md: h:40px  · p:4px  · gap:2px · r:8px       │
│  Container lg: h:48px  · p:4px  · gap:2px · r:10px      │
│                                                          │
│  Segment sm: h:28px · px:10px · gap:6px · font:12px     │
│  Segment md: h:32px · px:12px · gap:6px · font:13px     │
│  Segment lg: h:40px · px:16px · gap:8px · font:14px     │
│                                                          │
│  Sub-componentes:                                        │
│  Segment:        State(5) × Size(3) = 15 frames         │
│  SegmentedCtrl:  SelectionMode(2) × Size(3) ×           │
│                  FullWidth(2) = 12 frames                │
│                                                          │
│  Frames totales: 15 + 12 = 27 frames                    │
└──────────────────────────────────────────────────────────┘
```
