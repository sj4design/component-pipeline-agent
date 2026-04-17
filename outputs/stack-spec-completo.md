# Stack

## Descripción general

Stack es el primitivo de layout 1D del sistema de diseño: un wrapper flexbox que apila children en una dirección (vertical u horizontal) con gaps y alineaciones del spacing scale. No tiene semántica propia ni apariencia visual — es infraestructura de layout puro. Su responsabilidad es eliminar el margin-hacking manual entre elementos y garantizar que el spacing siempre provenga del spacing scale. Para layouts 2D (columnas + filas), usar `Grid`. Para contenido con max-width y padding de página, usar `Container`.

```
Direction=vertical (default):           Direction=horizontal:
┌────────────────────────┐              ┌─────────────────────────────────┐
│ ┌──────────────────┐   │              │ ┌──────┐  gap  ┌──────┐  gap  ┌──┐ │
│ │    child 1       │   │              │ │  ch1 │  ───  │  ch2 │  ───  │c3│ │
│ └──────────────────┘   │              │ └──────┘       └──────┘       └──┘ │
│          gap            │              └─────────────────────────────────┘
│ ┌──────────────────┐   │
│ │    child 2       │   │
│ └──────────────────┘   │
│          gap            │
│ ┌──────────────────┐   │
│ │    child 3       │   │
│ └──────────────────┘   │
└────────────────────────┘
```

Stack es un building block puro — no aparece en el UI final, solo estructura el espacio entre sus hijos. El designer configura el Stack y mete componentes reales (Card, Button, Text, etc.) como children.

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Direction  → vertical | horizontal
Gap        → none (0) | xs (4px) | sm (8px) | md (16px) | lg (24px) | xl (32px)
Align      → start | center | end | stretch  (cross-axis)
Justify    → start | center | end | space-between | space-around  (main-axis)
Wrap       → no | yes
```

Toggles (muestran/ocultan partes — NO generan variantes extra):

```
(ninguno — Stack no tiene partes opcionales)
```

### Panel de propiedades en Figma

```
┌─────────────────────────────────────────┐
│  Stack                                  │
│  ─────────────────────────────────────  │
│  Direction  [ vertical          ▼ ]     │
│  Gap        [ md (16px)         ▼ ]     │
│  Align      [ start             ▼ ]     │
│  Justify    [ start             ▼ ]     │
│  Wrap       [ no                ▼ ]     │
└─────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito organizar elementos en un eje?
            │
            ├── Un solo eje (vertical u horizontal) → Stack
            │
            └── Dos ejes (filas + columnas) → Grid
                            │
                            ▼
             ¿Necesito max-width + padding de página?
             └── Sí → Container (wrappea Stack o Grid)
                            │
                            ▼
             Stack horizontal con ¿necesito merge de bordes?
             └── Sí → ButtonGroup (patrón especial)
```

**Usar Stack cuando:**
- Listas de ítems verticales: form fields, tarjetas en columna, menú de opciones
- Grupos horizontales: botones en toolbar, tags en fila, navegación inline
- Separación uniforme entre N elementos sin saber cuántos serán
- Card content (title + description + cta, vertical con gap sm/md)
- Sidebar navigation (links verticales con gap xs/sm)
- Button group (horizontal con gap xs)

**NO usar Stack cuando:**
- Se necesita control de columnas fijas o proporcionales → usar `Grid`
- El layout tiene filas Y columnas → usar `Grid`
- Se necesita max-width del contenido de página → usar `Container`
- Los ítems necesitan gaps distintos entre sí → usar CSS manual o layout custom
- Se necesita posicionamiento absoluto → usar CSS manual

---

## Variaciones visuales

### Gap scale

| Gap   | Valor | Uso típico |
|-------|-------|-----------|
| none  | 0px   | Children que se tocan (merged borders, button group compact) |
| xs    | 4px   | Gap mínimo — inline chips, icon+text |
| sm    | 8px   | Gap compacto — form labels+inputs, nav items, button group |
| md    | 16px  | Gap estándar — secciones de card, list items |
| lg    | 24px  | Gap amplio — secciones de página, grupos de cards |
| xl    | 32px  | Gap máximo — separación de secciones grandes |

### Align (cross-axis)

| Align   | CSS equivalent    | Caso de uso |
|---------|------------------|------------|
| start   | `align-items: flex-start` | Default — children alineados al inicio del eje cruzado |
| center  | `align-items: center` | Centrado vertical en stack horizontal (toolbar) |
| end     | `align-items: flex-end` | Alineación al final (p.ej. botón alineado abajo) |
| stretch | `align-items: stretch` | Children expanden al ancho/alto total (columnas iguales) |

### Justify (main-axis)

| Justify        | CSS equivalent | Caso de uso |
|---------------|----------------|------------|
| start         | `justify-content: flex-start` | Default — children al inicio |
| center        | `justify-content: center` | Grupo centrado en el eje principal |
| end           | `justify-content: flex-end` | Children al final (botones a la derecha) |
| space-between | `justify-content: space-between` | Espaciado equitativo — navs, toolbars |
| space-around  | `justify-content: space-around` | Espaciado con margen lateral |

### Direction + casos comunes

```
vertical   + gap md    → Card content (title, description, CTA)
vertical   + gap sm    → Form section (label, input, helper)
vertical   + gap xs    → Nav sidebar links
horizontal + gap sm    → Button group, tab row
horizontal + gap xs    + align=center → Icon + label row
horizontal + justify=space-between + align=center → Toolbar (logo ↔ acciones)
horizontal + wrap=yes  + gap sm → Tag cloud, chip collection
```

---

## Decisiones de diseño

**1. Stack 1D separado de Grid 2D (patrón Spectrum/Atlassian)** — Spectrum separa Flex (1D) de Grid (2D). Atlassian tiene Stack + Inline + Flex en 3 tiers. Stack 1D tiene una API más simple (sin template-areas, sin column definitions). El developer no necesita pensar en grid cuando solo quiere "estos elementos verticalmente espaciados". Fluent 2 removió Stack en v9 (recomendando CSS nativo), pero nuestra decisión de mantenerlo en el DS sigue el patrón de Polaris, Mantine, Orbit y Carbon — que lo consideran esencial para design tokens en spacing.

**2. Direction vertical como default** — Vertical stacking es la mayoría de casos en UI: form fields, card content, listas. Horizontal es opt-in. Polaris (BlockStack default), Carbon (orientation="vertical" default) y Mantine (Stack default = vertical) convergen en esto.

**3. Gap escala en 6 valores (none, xs, sm, md, lg, xl)** — los 6 valores cubren el rango completo del spacing scale: 0, 4px, 8px, 16px, 24px, 32px. Carbon usa índices (1-13) que son opacos; Polaris usa tokens nombrados ("100", "200"...) que son crípticos. La escala tshirt-size (xs/sm/md/lg/xl) es legible y consistente con el resto del sistema.

**4. Align y Justify separados (flexbox semántico)** — Unificar alignment en una prop sería confuso porque la dirección cambia el axis significado: en vertical, Align controla el eje horizontal y Justify controla el eje vertical. Separar las props mantiene la semántica estándar de CSS flexbox — zero learning curve para developers.

**5. 60 frames representativos** — Direction(2) × Gap(6) × Align(4) × Justify(5) = 240 frames sería excesivo para Figma. Los 60 frames cubren las combinaciones más comunes (Direction × Gap × Align con Justify=start, plus los Justify variants más usados en horizontal).

### Combinaciones excluidas

```
(ninguna — Stack no tiene combinaciones inválidas)
```

---

## Comportamiento

### Esencial para diseño

- **Stack es invisible** — no tiene borde, fondo, ni ninguna apariencia visual propia. Solo define el layout de sus hijos.
- **Gap vs. margen** — Stack usa `gap` de CSS flexbox (no margen en los hijos). Esto significa que el último hijo NO tiene margen extra. El gap solo existe entre ítems.
- **Wrap=yes cambia el comportamiento de Gap** — con Wrap=yes y Direction=horizontal, los hijos que no caben en una línea se van a la siguiente con el mismo gap. Es útil para tags y chips.
- **Stretch expande hijos** — Align=stretch hace que los hijos tomen el 100% del eje cruzado (ancho en vertical, alto en horizontal). Los hijos deben poder expandirse para que funcione.
- **No semántica HTML propia** — el elemento HTML del Stack (div por default) no tiene significado semántico. Si el stack wrappea una lista de nav links, el developer debe usar `as="nav"` o `as="ul"`.

### Accesibilidad (ARIA)

| Parte | Role | Atributos | Por qué importa |
|-------|------|-----------|----------------|
| Stack container | ninguno | `div` por default | Layout puro; el contenido semántico viene de los children |

Stack no tiene ARIA propio. La semántica del contenido la definen los children (Button, Link, Text, etc.).

### Navegación por teclado

Primary interactions (afectan diseño):

```
Stack no es focusable ni interactivo — no tiene keyboard interactions.
El focus fluye entre los children interactivos en DOM order.
```

Secondary interactions (referencia dev):

```
Tab → navega entre los children focusables en el orden del DOM
     (DOM order = visual order con Direction=vertical; importante que coincidan)
```

---

## Guía de contenido

Stack es un contenedor de layout — el contenido viene de sus children. Las consideraciones son:

- **DOM order = visual order** — para accesibilidad, el orden visual de los hijos debe coincidir con el orden en el DOM. No usar `order` de CSS para reordenar visualmente (genera desincronía para SR y teclado).
- **Limit depth** — Stack dentro de Stack es válido, pero más de 3-4 niveles de anidamiento sugiere que se necesita un componente de layout más expresivo o un rediseño.
- **Justify=space-between en horizontal** — muy útil para toolbars (logo + nav a la izquierda, acciones a la derecha), pero asegurarse de que el primero y último hijo son los "anchor points" correctos.

---

## Pre-build checklist

```
□ ¿Es un layout de un solo eje? Si tiene filas+columnas → Grid
□ ¿El Gap es del spacing scale (no valor arbitrario)?
□ ¿Direction=horizontal con Wrap=yes para colecciones que fluyen?
□ ¿Align=stretch cuando los hijos deben tomar el ancho completo?
□ ¿El DOM order coincide con el visual order (para teclado + SR)?
□ ¿El Stack tiene un elemento HTML semántico si el contexto lo requiere (nav, ul)?
□ ¿No hay padding/margin extra en los children que duplica el Gap del Stack?
```

---

## Componentes relacionados

```
Grid        → layout 2D (columnas + filas); Stack es para 1D
Container   → añade max-width + padding de página; wrappea Stack/Grid
Divider     → puede insertarse entre hijos de Stack para separación visual
ButtonGroup → Stack horizontal con gap xs/none + posible merged borders
Form        → usa Stack vertical internamente para organizar fields
Card        → su contenido interno es típicamente un Stack vertical con gap md
NavBar      → usa Stack horizontal con justify=space-between para extremos
Sidebar     → usa Stack vertical con gap xs para nav links
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Enfoque | Divider | Responsive | Diferenciador |
|---------|-------|---------|---------|-----------|--------------|
| **Material Design 3** | Stack (MUI) | `direction` + `spacing`; 1D wrapper | `divider` prop | direction responsive (objeto) | divider prop inserta elementos entre hijos; useFlexGap mode |
| **Spectrum (Adobe)** | Flex | Full flexbox props con DimensionValue spacing | No | No | API full-parity con CSS flexbox; rowGap/columnGap separados |
| **Carbon (IBM)** | Stack | Minimal: orientation + gap index (1-13) | No | No | API más restrictiva; gap index en Carbon spacing scale |
| **Polaris (Shopify)** | InlineStack / BlockStack | Dos componentes separados (logical props) | No | gap responsive (objeto) | CSS logical properties naming (RTL-ready); gap responsive |
| **Atlassian** | Stack / Inline / Flex | 3 tiers: Stack(V) + Inline(H) + Flex(full) | separator en Stack | No | `spread` shorthand en Inline; progressive disclosure 3 niveles |
| **Ant Design** | Space / Flex | Space (original) + Flex (v5, recomendado) | split prop en Space | No | Space.Compact para merged borders; split prop |
| **Twilio Paste** | Stack | Vertical con orientation prop | No | No | Token-constrained; Inline separado existe |
| **Lightning (Salesforce)** | lightning-layout | Grid-first (no stack primitive) | No | — | Layout system orientado a página |
| **Primer (GitHub)** | Stack | direction + gap + align + justify + wrap + padding | No | direction/gap responsive (objeto) | Más completo de T2; padding prop incorporado; responsive |
| **shadcn/ui** | Sin componente | Tailwind flex utilities | — | Tailwind | BYO — flex/flex-col/gap-* utilities; sin abstracción |
| **Radix UI** | Flex | Full flexbox typed props; Radix Themes | No | Props responsive (objeto) | `asChild` polymorphic; gap constrained a scale |
| **Chakra UI** | Stack / VStack / HStack | 3 shorthand components | `divider` prop | responsive (array syntax) | VStack/HStack shortcuts; StackDivider component |
| **GOV.UK** | Sin Stack | Grid classes gov-frontend | — | Clases automáticas | Grid-only; layout orientado a páginas de gobierno |
| **Base Web (Uber)** | Sin Stack dedicado | Block con display="flex" | — | overrides | Override-based; FlexGrid para responsive |
| **Fluent 2 (Microsoft)** | Removido en v9 | CSS flexbox/grid directo | — | CSS | Removido deliberadamente — argumento: CSS moderno > abstracción Stack |
| **Gestalt (Pinterest)** | Flex | direction + gap constrained al spacing scale | No | No | gap siempre del spacing scale (sin valores arbitrarios) |
| **Mantine** | Stack / Group / Flex | 3 componentes: Stack(V) + Group(H) + Flex(full) | No | Responsive objetos | Group tiene `grow` para distribución igual; 3 tiers |
| **Orbit (Kiwi)** | Stack | direction + spacing + wrap + align + justify | No | 5 breakpoint props | Más granular en responsive: mediumMobile/tablet/desktop/etc. |
| **Evergreen** | Sin Stack | Pane con flex props | — | — | Pane + display="flex" como primitivo |
| **Nord** | nord-stack | Web component; atributos HTML | No | — | Framework-portable via custom elements |

**Patrones clave de la industria:**
1. **1D vs 2D separación** — Virtualmente todos los sistemas separan Stack (flexbox 1D) de Grid (CSS Grid 2D). La única excepción es Lightning que usa Grid para ambos.
2. **Divider/separator prop** — MUI Stack, Atlassian Stack, Ant Design Space y Chakra Stack tienen divider/separator built-in. Patrón "ítems con separadores" es suficientemente común para merecer prop dedicada.
3. **Fluent 2 removió Stack** — argumento más fuerte contra Stack components: CSS moderno (gap, flexbox, grid) puede reemplazarlos. Ningún otro sistema lo siguió, pero es el argumento más citado cuando se debate si incluir Stack.
4. **Naming: logical properties** — Polaris es el único que usa InlineStack/BlockStack (CSS logical properties). El resto usa direction="vertical/horizontal" o componentes separados sin referencia a LTR/RTL.

---

## Tokens

**8 tokens** · prefijo `stk-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `stk-gap-none` | `spacing/0` | Gap 0px — merged/touching children |
| `stk-gap-xs` | `spacing/1` | Gap 4px — inline compact |
| `stk-gap-sm` | `spacing/2` | Gap 8px — compacto standard |
| `stk-gap-md` | `spacing/4` | Gap 16px — estándar |
| `stk-gap-lg` | `spacing/6` | Gap 24px — amplio |
| `stk-gap-xl` | `spacing/8` | Gap 32px — máximo |

### Especificaciones de espaciado

```
┌─────────────────────────────────────────────────────────────┐
│  Gap scale → spacing system                                 │
│                                                             │
│  none: 0px   │  xs: 4px    │  sm: 8px                      │
│  md: 16px    │  lg: 24px   │  xl: 32px                     │
│                                                             │
│  Ejemplo vertical gap=md:                                   │
│  ┌──────────────────────┐                                   │
│  │     child 1          │                                   │
│  └──────────────────────┘                                   │
│              16px gap                                       │
│  ┌──────────────────────┐                                   │
│  │     child 2          │                                   │
│  └──────────────────────┘                                   │
│              16px gap                                       │
│  ┌──────────────────────┐                                   │
│  │     child 3          │                                   │
│  └──────────────────────┘                                   │
│                                                             │
│  Frames representativos: 60                                 │
│  (de 240 combinaciones teóricas Direction×Gap×Align×Justify)│
└─────────────────────────────────────────────────────────────┘
```
