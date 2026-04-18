# Stack

## Overview

Stack es un primitivo de layout que envuelve CSS flexbox en una API orientada a tokens de diseño. Organiza sus elementos hijos en **una sola dimensión** —vertical u horizontal— con un espaciado controlado por la escala de espaciado del sistema. Su función principal es garantizar que el espacio entre elementos siempre provenga de la escala de tokens, eliminando la proliferación de valores arbitrarios de píxeles.

```
BlockStack (vertical):              InlineStack (horizontal):
┌─────────────────────┐             ┌──────────────────────────────────────┐
│  ┌───────────────┐  │             │  ┌────────┐  ┌────────┐  ┌────────┐ │
│  │   Item 1      │  │             │  │ Item 1 │  │ Item 2 │  │ Item 3 │ │
│  └───────────────┘  │             │  └────────┘  └────────┘  └────────┘ │
│  ← gap (token) →    │             └──────────────────────────────────────┘
│  ┌───────────────┐  │
│  │   Item 2      │  │             Stack con Dividers:
│  └───────────────┘  │             ┌─────────────────────┐
│  ← gap (token) →    │             │  ┌───────────────┐  │
│  ┌───────────────┐  │             │  │   Item 1      │  │
│  │   Item 3      │  │             │  └───────────────┘  │
│  └───────────────┘  │             │  ─────────────────  │ ← divider
└─────────────────────┘             │  ┌───────────────┐  │
                                    │  │   Item 2      │  │
                                    │  └───────────────┘  │
                                    └─────────────────────┘
```

Stack no tiene relación de trigger con ningún componente. Es un contenedor de layout puro sin interactividad ni semántica ARIA propia. El significado semántico lo aportan los hijos o se especifica mediante la prop `as`.

**Lo que el diseñador puede configurar:**

Variantes (cambian la apariencia — generan variantes Figma):

```
Direction:  vertical | horizontal
Gap:        none | xs | sm | md | lg | xl
Align:      start | center | end | stretch
Justify:    start | center | end | space-between | space-around
Wrap:       no | yes
```

Toggles (muestran/ocultan partes — NO generan variantes adicionales):

```
(ninguno — Stack es un primitivo sin partes opcionales)
```

### Figma properties panel

```
┌─────────────────────────────────────────┐
│  Stack                                  │
├─────────────────────────────────────────┤
│  Direction    ○ vertical  ○ horizontal  │
│  Gap          [none ▼]                  │
│               none / xs / sm / md       │
│               lg / xl                   │
│  Align        [start ▼]                 │
│               start / center / end      │
│               stretch                   │
│  Justify      [start ▼]                 │
│               start / center / end      │
│               space-between / space-around│
│  Wrap         ○ no  ○ yes              │
└─────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿Necesitas organizar elementos en una sola dimensión?
         │
         ▼
  ¿Con espacio uniforme entre ellos?
         │
    Sí ──┼── No → usa padding/margin directamente
         │
    ¿En fila o columna?
    ┌────┴────┐
  Fila     Columna
    │          │
 Stack       Stack
 direction= direction=
 horizontal  vertical
    │
  ¿2D (filas Y columnas simultáneas)?
    └── usa Grid
```

**Usa Stack cuando:**
- Necesitas apilar form fields con espaciado consistente (vertical, Gap=md)
- Construyes una toolbar con íconos y botones agrupados (horizontal, Gap=sm)
- Compones el contenido interno de una Card (vertical, Gap=xs a md)
- Agrupas botones de acción en un footer de modal (horizontal, Gap=sm, Justify=end)
- Creas una lista de navegación lateral con items uniformemente espaciados

**NO uses Stack cuando:**
- Necesitas layout bidimensional con filas y columnas simultáneas → usa Grid
- El espaciado debe ser responsivo entre elementos distintos → considera Grid con auto-fit
- El contenedor necesita un ancho máximo con centrado → usa Container
- Los elementos son ítems de una lista semántica → usa `as="ul"` con Stack y asegúrate de que los hijos sean `<li>`
- Solo hay un elemento (el Stack sería redundante)

---

## Visual variations

### Direction: vertical (default)

Stack vertical es el caso de uso más común: campos de formulario, contenido de tarjetas, listas de navegación. Los ítems se apilan de arriba a abajo con un gap uniforme.

| Gap | Valor px | Uso típico |
|-----|----------|------------|
| none | 0px | Ítems completamente adosados (botones de toolbar con bordes compartidos) |
| xs | 4px | Compact: labels e inputs muy cercanos, chips agrupados |
| sm | 8px | Grupos de campos relacionados, nav items |
| md | 16px | Separación estándar entre secciones de formulario |
| lg | 24px | Separación entre grupos visuales en una card |
| xl | 32px | Separación de secciones mayores en una página |

### Direction: horizontal

Stack horizontal organiza elementos de izquierda a derecha. Úsalo para toolbars, grupos de botones, combinaciones icono+etiqueta, y métricas en línea.

| Align | Efecto visual |
|-------|---------------|
| start | Ítems alineados al tope (default) |
| center | Ítems centrados en el eje transversal |
| end | Ítems alineados al fondo |
| stretch | Ítems estiran su altura para igualar el más alto |

### Wrap: yes

Con `Wrap=yes` los ítems saltan a la siguiente línea cuando no caben. Útil para grupos de chips, tags o botones de filtro que no deben truncarse.

```
┌──────────────────────────────────────┐
│  [Tag A] [Tag B] [Tag C] [Tag D]     │
│  [Tag E] [Tag F]                     │
└──────────────────────────────────────┘
```

### Justify: space-between

Distribuye los ítems con el espacio disponible entre ellos. Patrón clásico para headers con título a la izquierda y acciones a la derecha.

```
┌──────────────────────────────────────┐
│  Título de sección        [Button]   │
└──────────────────────────────────────┘
```

---

## Design decisions

### 1. Un solo componente con prop `Direction` en lugar de dos componentes separados

**¿Por qué?** La arquitectura de un componente (con `Direction` como prop) fue elegida por su simplicidad de aprendizaje: un solo import, un solo nombre, sin decisión adicional de "¿cuál uso?". La alternativa de dos componentes (BlockStack/InlineStack — patrón Polaris) es arquitectónicamente más limpia para RTL y APIs enfocadas por eje, pero agrega carga cognitiva para los consumidores.

**Trade-off:** Con un solo componente, `Align` e `Justify` cambian su eje de referencia dependiendo de `Direction`. Documentar esto es crítico: cuando `Direction=vertical`, `Align` controla el eje horizontal (cross-axis) y `Justify` el vertical (main-axis). La confusión de ejes es el principal vector de error en componentes flexbox.

**Evidencia cross-sistema:** MUI, Spectrum, Carbon y Radix usan un componente; Polaris, Atlassian y Chakra usan dos. La mayoría de las migraciones futuras a un sistema con RTL deberían evaluar el patrón de dos componentes.

### 2. Gap restringido a tokens (escala xs–xl) — no se aceptan valores arbitrarios

**¿Por qué?** El valor principal de Stack sobre `display: flex` directo en CSS es que el espaciado siempre proviene de la escala de diseño. Si `Gap` aceptara valores arbitrarios en píxeles, el componente perdería su razón de existir como mecanismo de enforcement. Spectrum tipifica `gap` como `DimensionValue` para rechazar valores fuera de escala a nivel de TypeScript; Carbon usa índices de escala (1–13) con el mismo efecto.

**Trade-off:** Algunos casos de uso legítimos necesitan valores intermedios (ej. 6px entre `xs=4` y `sm=8`). La decisión es no contemplarlos en Stack y derivarlos hacia CSS directo o un token personalizado.

### 3. Sin semántica ARIA — el significado lo aportan los hijos o la prop `as`

**¿Por qué?** Stack es un primitivo de presentación pura. Asignarle `role="list"` o cualquier ARIA por defecto sería incorrecto en la mayoría de los casos de uso (toolbars, form fields, card bodies). La prop `as` permite cambiar el elemento raíz a `nav`, `ul`, `section`, `article`, etc., cuando el contexto lo requiere.

**Trade-off:** Los equipos frecuentemente olvidan especificar `as` cuando el Stack actúa como lista de navegación o lista de ítems. Un lint rule personalizado que detecte Stacks usados como nav sin `as="nav"` es la mitigación recomendada.

### 4. Sin soporte de overflow/scroll horizontal incorporado

**¿Por qué?** La lógica de overflow (scroll horizontal, fade edges, botones de flecha) añade complejidad que depende del contexto de layout del padre. Carbon y Ant Design implementan overflow en sus Tab containers, no en Stack. Stack con `Wrap=no` y `Direction=horizontal` simplemente desborda su contenedor por defecto; el scroll debe ser manejado por el componente que usa Stack.

**Trade-off:** Grupos de chips o tags horizontales sin wrap pueden romperse en viewports pequeños. La solución recomendada es `Wrap=yes` o un contenedor con `overflow-x: auto`.

### Combinaciones excluidas

```
(ninguna — Stack no tiene exclusiones formales entre sus propiedades)

Notas de diseño:
- Wrap=yes se ignora visualmente cuando Direction=vertical (no tiene efecto)
- Justify=space-between con un solo hijo no tiene efecto visual observable
- Gap=none + Wrap=yes crea ítems completamente adosados con salto de línea
```

---

## Behavior

### Essential for design

Stack no tiene comportamientos interactivos. El diseñador debe conocer dos reglas fundamentales:

1. **Eje de referencia cambia con Direction:** `Align` controla el eje transversal (cross-axis); `Justify` controla el eje principal (main-axis). Cuando `Direction=vertical`, el eje principal es vertical; cuando `Direction=horizontal`, el eje principal es horizontal.
2. **Wrap sólo es relevante para Direction=horizontal:** Los stacks verticales no hacen wrap en condiciones normales.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Stack container | none (por defecto) | — | Es un div de layout; no aporta semántica |
| Stack container con `as="ul"` | implicit list | — | Los hijos deben ser `<li>` para coherencia semántica |
| Stack container con `as="nav"` | navigation | `aria-label` recomendado | Identifica la región de navegación |
| Stack container con `as="section"` | region | `aria-labelledby` recomendado | Identifica la región de contenido |
| Ítems hijos | (sin cambio) | — | Stack no modifica la semántica de sus hijos |

### Keyboard navigation

Primary interactions (affect design):

```
Stack no tiene navegación de teclado propia.
No es focusable ni interactivo.
El manejo de teclado es responsabilidad de los componentes hijos.
```

Secondary interactions (dev reference):

```
N/A — Stack es un primitivo de layout.
La interactividad la implementan los consumidores del componente.
```

---

## Content guide

### Slot: children (requerido)

Stack acepta cualquier número de elementos hijos. Los hijos pueden ser cualquier componente o elemento HTML.

- **Mínimo:** 2 hijos (un Stack con un solo hijo es redundante — usa directamente el elemento)
- **Sin límite máximo** explícito, aunque más de 10–12 ítems verticales sin agrupación sugiere un patrón diferente
- **Tip de contenido:** El contenido de los hijos determina si Stack debe usar `as="ul"` (lista), `as="nav"` (navegación), o el default `as="div"` (agrupación genérica)
- **Dividers:** Cuando se necesitan separadores entre ítems, pasar un componente `<Divider>` o `<Separator>` como hijo entre elementos es el patrón recomendado (patrón MUI/Atlassian)

---

## Pre-build checklist

```
Layout & Structure
□ Direction correcta para el caso de uso (vertical para form/card, horizontal para toolbar/buttons)
□ Gap tomado de la escala de tokens (none/xs/sm/md/lg/xl)
□ Align y Justify configurados si se necesita alineación no-default
□ Wrap=yes si los ítems pueden desbordar en viewports pequeños

Semantic HTML
□ Prop `as` especificada cuando el Stack actúa como nav, ul, section, o article
□ Si `as="ul"`, los hijos directos son <li>
□ Si `as="nav"`, hay un aria-label descriptivo

Accessibility
□ Stack no añade roles ARIA a menos que `as` lo implique
□ Los ítems hijos tienen su propia semántica correcta
□ Sin valores de gap arbitrarios (solo tokens permitidos)

Figma Handoff
□ Frames Figma nombrados: Stack/vertical/gap-[size] y Stack/horizontal/gap-[size]
□ Auto-layout configurado con la dirección y gap correspondientes
□ frameCount neto: 60 frames
```

---

## Related components

```
Grid
  └── Para layouts 2D (filas y columnas simultáneas)
  └── Cuando los ítems tienen tamaños heterogéneos en dos dimensiones

Container
  └── Para limitar el ancho máximo del contenido con centrado
  └── Envuelve Stacks en layouts de página

Divider / Separator
  └── Se inserta como hijo de Stack para separar visualmente grupos de ítems
  └── Alternativa a Gap para separación semántica fuerte

Inline (alias de Stack direction=horizontal)
  └── Algunos sistemas nombran el Stack horizontal como Inline para claridad semántica

List / DescriptionList
  └── Cuando el stack contiene ítems de lista semántica con estructura definida
  └── Lista con título, descripción, o ítems de datos pares key/value
```

---

## Reference: how other systems do it

### MUI / Material Design 3

MUI implementa `Stack` como un wrapper de conveniencia sobre CSS flexbox para layout unidimensional. La característica más distintiva es la prop `divider`: acepta un elemento React (normalmente `<Divider />`) y lo inserta automáticamente entre cada hijo, resolviendo el problema universal de "border-bottom en todos menos el último". El switch `useFlexGap` cambia de espaciado por márgenes negativos (legacy) a `gap` nativo de CSS —el enfoque moderno que funciona correctamente con `flexWrap`. La prop `component` (polymorphic) permite renderizar el Stack como `nav`, `ul` o cualquier elemento semántico. MD3 en sí no tiene Stack dedicado —MUI lo provee como extensión comunitaria.

### Spectrum (Adobe)

El componente `Flex` de Spectrum es un wrapper tipado sobre CSS flexbox que expone todas las propiedades estándar como props de primera clase. La filosofía es de cero abstracción: los desarrolladores que conocen CSS flexbox tienen curva de aprendizaje cero. Todos los props de `gap`, `rowGap` y `columnGap` usan el tipo `DimensionValue` (`"size-100"`, `"size-200"`), garantizando que el espaciado siempre esté en la grilla de 4px. Un solo componente `Flex` con `direction="column"` reemplaza a Stack; `direction="row"` reemplaza a Inline. Menos nombres que aprender, pero menos claridad semántica.

### Carbon (IBM)

El `Stack` de Carbon es intencionalmente minimalista: solo `gap` y `orientation` son sus únicas preocupaciones. La prop `gap` acepta índices enteros (1–13) que mapean directamente a la escala de espaciado de 2px de Carbon, haciendo imposible usar espaciado fuera de escala sin escapar a CSS. El uso de `orientation` en lugar de `direction` es más semántico pero menos familiar para desarrolladores CSS. Sin wrap, sin alineación, sin dividers. Carbon FlexGrid maneja todo lo más complejo.

### Polaris (Shopify)

La elección arquitectónica más distintiva de Polaris: dos componentes separados en lugar de uno con prop de dirección. `InlineStack` maneja layout horizontal; `BlockStack` maneja layout vertical. La nomenclatura sigue propiedades lógicas CSS (`inline` = horizontal en LTR, `block` = vertical), haciendo el soporte RTL implícito. Cada componente tiene una API enfocada con solo las props relevantes para su eje (`wrap` solo existe en InlineStack ya que el wrap vertical es raro). Gap responsivo via objetos está soportado.

### Atlassian

La arquitectura de divulgación progresiva en tres niveles de Atlassian es el sistema de layout más reflexivo del conjunto de investigación. `Stack` (vertical) e `Inline` (horizontal) son wrappers con restricciones para casos comunes; `Flex` es el escape hatch de flexbox completo. Los tres soportan la prop `as` para rendering polimórfico. Stack tiene la prop `separator` para dividers. Inline tiene la prop `spread` (shorthand para `justifyContent="space-between"`). La arquitectura de tres niveles da a los desarrolladores un camino de escalada obvio.

### Ant Design

Ant Design tiene dos primitivos de layout superpuestos: `Space` (el original, ampliamente usado) y `Flex` (añadido en v5, recomendado para código nuevo). Space provee la prop `split` para dividers; `Space.Compact` es un patrón único que elimina los gaps y fusiona los bordes entre hijos, creando controles agrupados (botones/inputs) que aparecen como una sola unidad visual. Flex es un wrapper delgado de flexbox. Ambos coexisten sin deprecación.

### Sistemas Tier 2

**Twilio Paste:** `Stack` e `Inline` separados con espaciado basado en tokens y prop `orientation`. **GitHub Primer:** `Stack` único con `direction`, `gap`, `align`, `justify`, `wrap` y `padding`; sintaxis de objeto responsivo. **Dell Design System:** `Stack`/`Flex` con consciencia de densidad (compact/comfortable/spacious). **Playbook:** `FlexItem`/`Flex` con `orientation`, `spacing`, `justify` y tokens de Playbook.

### Sistemas Tier 3

**Radix UI:** `Flex` headless con props de flexbox tipados; objetos de prop responsivos; polimorfismo `as`. **Chakra UI:** `Stack`/`VStack`/`HStack` —tres variantes nombradas; prop `divider`; dirección responsiva. **Gestalt (Pinterest):** `Flex`/`Box` con `direction` y `gap` restringidos a la escala de Gestalt. **Mantine:** `Stack` (vertical), `Group` (horizontal + alineación + `grow`), `Flex` (completo). **Orbit (Kiwi.com):** `Stack` con cinco props de breakpoint para dirección y espaciado responsivos. **Fluent 2:** Stack existía en v8 pero fue **removido intencionalmente en v9** — los equipos de Microsoft recomiendan CSS nativo; esto es el argumento anti-Stack más fuerte del ecosistema.

---

## Tokens

**8 tokens** · prefix `stk-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| stk/gap/none | spacing/0 | Gap=none (0px) |
| stk/gap/xs | spacing/1 | Gap=xs (4px) |
| stk/gap/sm | spacing/2 | Gap=sm (8px) |
| stk/gap/md | spacing/4 | Gap=md (16px) |
| stk/gap/lg | spacing/6 | Gap=lg (24px) |
| stk/gap/xl | spacing/8 | Gap=xl (32px) |
| stk/align/default | — | start (cross-axis default) |
| stk/justify/default | — | start (main-axis default) |

### Spacing specs

```
Gap values → spacing scale:
  none  →  0px   (spacing/0)
  xs    →  4px   (spacing/1)
  sm    →  8px   (spacing/2)
  md    →  16px  (spacing/4)
  lg    →  24px  (spacing/6)
  xl    →  32px  (spacing/8)

Frame counts:
  Stack (net):  60 frames
  Direction(2) × Gap(6) × Align(4) × Justify(5) = 240 gross
  Subset representativo: 60 frames de casos comunes

Alignment axes (Direction=vertical):
  Align  → controla eje X (cross-axis = horizontal)
  Justify → controla eje Y (main-axis = vertical)

Alignment axes (Direction=horizontal):
  Align  → controla eje Y (cross-axis = vertical)
  Justify → controla eje X (main-axis = horizontal)
```
