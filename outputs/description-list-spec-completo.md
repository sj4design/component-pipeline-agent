# DescriptionList

## Overview

El DescriptionList es el componente semántico para mostrar pares de término/valor: metadatos de usuario (Email, Teléfono, Rol), resúmenes de pedido (Subtotal, Impuesto, Total), fichas de producto (Peso, Dimensiones, SKU), previews de configuración y paneles de detalle. Descansa sobre la semántica nativa `<dl><dt><dd>` de HTML — la única estructura HTML diseñada específicamente para este patrón, con accesibilidad incorporada sin necesidad de ARIA adicional.

```
Layout=stacked, Columns=1, Dividers=between:
┌─────────────────────────────────────────────────┐
│  Customer Details                      [Editar]  │
├─────────────────────────────────────────────────┤
│  Nombre                                          │
│  Pedro Quinones                                  │
├─────────────────────────────────────────────────┤
│  Email                                           │
│  pedro@example.com                               │
├─────────────────────────────────────────────────┤
│  Plan                                            │
│  Pro ●                                           │
└─────────────────────────────────────────────────┘

Layout=horizontal, Columns=1:
┌─────────────────────────────────────────────────┐
│  Nombre          Pedro Quinones                  │
│  Email           pedro@example.com               │
│  Rol             Administrador                   │
│  Fecha alta      12 ene 2026                     │
└─────────────────────────────────────────────────┘

Layout=inline, Columns=2 (producto specs):
┌─────────────────────────────────────────────────┐
│  Peso: 2.4 kg          Ancho: 35 cm             │
│  Alto: 22 cm           Profundidad: 12 cm        │
│  SKU: PRD-00142        Color: Negro mate         │
└─────────────────────────────────────────────────┘
```

La familia se construye en orden: **DescriptionItem → DescriptionList**. DescriptionItem es el par term/description con sus variantes de layout, tamaño y énfasis. DescriptionList organiza N items en columnas con opciones de separadores.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
DescriptionItem
  Layout:   stacked | horizontal | inline
  Size:     sm | md | lg
  Emphasis: term | description | equal

DescriptionList
  Columns:  1 | 2 | 3
  Dividers: none | between | all
```

Toggles (show/hide parts — do NOT generate extra variants):

```
DescriptionItem
  👁 Has Term Icon  → termIcon (ícono junto al término)
```

### Figma properties panel

```
╔══════════════════════════════════════════╗
║  DescriptionItem                         ║
╠══════════════════════════════════════════╣
║  Layout   ▾  stacked / horizontal /      ║
║               inline                    ║
║  Size     ▾  sm / md / lg               ║
║  Emphasis ▾  term / description /        ║
║               equal                     ║
║  ─────────────────────────────────────── ║
║  👁 Has Term Icon  [ off ●── ]           ║
║  ─────────────────────────────────────── ║
║  ✏️ Term         "Email"                ║
║  ✏️ Description  "user@example.com"     ║
║  🔄 Term Icon    icon/placeholder       ║
╚══════════════════════════════════════════╝

╔══════════════════════════════════════════╗
║  DescriptionList                         ║
╠══════════════════════════════════════════╣
║  Columns  ▾  1 / 2 / 3                  ║
║  Dividers ▾  none / between / all       ║
╚══════════════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿Necesitas mostrar información estructurada de solo lectura?
                │
                ▼
¿Es un par etiqueta:valor?
  Sí → DescriptionList
  No → Table (múltiples ítems del mismo tipo) o Card (contenido libre)

¿El usuario necesita editar los valores?
  Sí → Form (con campos editables)
  No → DescriptionList (display-only)

¿Son muchos registros del mismo tipo en columnas?
  Sí (+5 ítems comparables) → Table o DataGrid
  No → DescriptionList
```

**Usa DescriptionList cuando:**
- Muestras los atributos de un solo objeto: perfil de usuario, detalle de pedido, ficha de producto, configuración activa.
- Los pares son heterogéneos (diferentes tipos de datos, diferentes longitudes) — DescriptionList maneja esto mejor que una tabla de dos columnas.
- La página es una pantalla de "revisar antes de enviar" (checkout, onboarding) donde el usuario confirma información ingresada previamente.
- Necesitas metadatos en un sidebar, modal, o panel lateral sin la rigidez de una tabla.
- Los valores incluyen contenido rico: badges de estado, links, fechas formateadas, avatares — el slot `description` acepta cualquier contenido (ReactNode).

**Do NOT usa DescriptionList cuando:**
- Los datos son editables → usa `Form` con sus campos de entrada.
- Tienes múltiples registros del mismo tipo (lista de usuarios, lista de productos) → usa `Table` o `DataGrid`.
- Las columnas comparativas son el propósito principal (plan A vs plan B) → usa una tabla de comparación o `Table`.
- Solo tienes un par término/valor → usa directamente un `Text` con `font-weight` diferenciado; no vale el overhead del componente.

---

## Visual variations

### Tamaños de DescriptionItem

| Size | Term font-size | Description font-size | Gap term→desc | Term width (horizontal) |
|------|---------------|----------------------|---------------|------------------------|
| sm | 12px | 13px | 4px | 120px |
| md | 13px | 14px | 6px | 160px |
| lg | 14px | 16px | 8px | 200px |

### Layouts

**Stacked (term arriba, description abajo):**
- Dirección: column
- Ideal para valores largos o cuando el term es más corto que el valor
- El term ocupa todo el ancho, el description también
- Ejemplo: "Dirección de envío" / "123 Calle Principal, Madrid, 28001"

**Horizontal (term a la izquierda, description a la derecha):**
- Dirección: row, term con ancho fijo (120/160/200px según size), description con flex:1
- Ideal para metadatos compactos donde todos los términos tienen longitud similar
- Ejemplo: "Email  →  pedro@example.com"

**Inline (term: description en una línea):**
- Dirección: row, separador ":" implícito en el diseño
- Ideal para specs técnicas compactas en Columns=2 o 3
- Excluye `Emphasis=equal` — inline siempre necesita el term subdued para legibilidad

### Énfasis visual

| Emphasis | Term | Description |
|----------|------|-------------|
| term | weight=600, `text/primary` | weight=400, `text/secondary` |
| description | weight=400, `text/secondary` | weight=600, `text/primary` |
| equal | weight=400, `text/primary` | weight=400, `text/primary` |

Usa `Emphasis=term` para paneles de metadatos donde las etiquetas identifican categorías (Ant Design pattern).
Usa `Emphasis=description` para settings y detalles de usuario donde el valor es lo importante.
Usa `Emphasis=equal` para tablas de comparación donde ambos tienen el mismo peso.

### Columns y Dividers del DescriptionList

| Combinación | Uso típico |
|-------------|-----------|
| Columns=1, Dividers=between | Panel de detalles con separadores sutiles entre campos |
| Columns=1, Dividers=none | Panel limpio sin líneas, espacio como separador |
| Columns=2, Dividers=between | Specs de producto en dos columnas |
| Columns=2, Dividers=all | Grid formal estilo Ant Design bordered |
| Columns=3, Dividers=none | Dashboard de KPIs o metadatos densos |

### Term icon

El `termIcon` aparece junto al término cuando `Has Term Icon=on`. Tamaño 16px (`iconSize/sm`). Color `text/secondary`. `aria-hidden="true"` — la semántica la lleva el texto del término.

---

## Design decisions

### 1. Tres layouts: stacked / horizontal / inline

**Por qué:** Stacked maneja valores largos sin comprimir el term; horizontal es el patrón "label: value" clásico para metadatos compactos; inline permite specs técnicas ultra-densas en multi-columna. Los tres cubren el 99% de los contextos de diseño real. Ant Design (horizontal/vertical), Nord (horizontal/vertical) y Polaris (stacked) convergen en que ningún layout único sirve todos los casos.

**Tradeoff:** 3 layouts × 3 sizes × 3 emphases = 27 frames brutos (minus 3 exclusiones = 24 netos). Es asumible para un sub-componente tan fundamental.

### 2. Emphasis property (term / description / equal)

**Por qué:** Las UIs de settings enfatizan el valor (description) porque el usuario necesita scanear los valores, no los labels. Los paneles de metadatos enfatizan el term (label) porque el label identifica la categoría. Las tablas de comparación necesitan peso igual. Una propiedad explícita elimina la necesidad de overrides de token a nivel de instancia.

**Tradeoff:** Tres valores de emphasis frente a un sistema de dos tokens separados (termColor, descriptionColor). La propiedad explícita es más fácil de usar en el panel de Figma que recordar qué token cambiar.

### 3. Multi-columna via Columns property (1/2/3)

**Por qué:** Las fichas de producto, dashboards de KPIs y panels de specs frecuentemente necesitan 2–3 columnas para compacidad. El DOM order sigue siendo lineal (term → description → term → description), solo el layout visual es grid. Esto preserva la accesibilidad: los lectores de pantalla leen en orden lógico, no en orden visual de columnas.

**Tradeoff:** La implementación CSS de multi-columna en dl es compleja (CSS Grid sobre el dl o wrapper). Documentado como responsabilidad del developer con la guía de que el DOM order debe ser siempre lineal.

### Combinaciones excluidas

```
Layout=inline + Emphasis=equal
  → Inline necesita el term subdued para distinguirse visualmente
     del description. Equal weight en inline crea ambigüedad "¿cuál es el valor?".
```

---

## Behavior

### Essential for design

El DescriptionList es estático por defecto — no tiene estados interactivos propios. El comportamiento relevante para diseño es:

**Truncamiento:** Para valores muy largos en Layout=horizontal, el description se trunca con "..." o hace wrap. La decisión de layout (stacked si los valores son largos, horizontal si son cortos) es del diseñador — documentarlo en la pantalla.

**Valores vacíos:** Nunca dejar un `description` vacío. Siguiendo el patrón GOV.UK, usa "No proporcionado" como placeholder descriptivo, o incluye un link de CTA ("Agregar teléfono"). Un `<dd>` vacío es invisible para lectores de pantalla y confuso para usuarios visuales.

**Contenido rico en description:** El slot acepta cualquier contenido: badges de estado, links, fechas formateadas, avatares compactos. Asegúrate de que el contenido rico no supere el line-height del item — si hay riesgo, usa Layout=stacked.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Container | `<dl>` nativo | — | Semántica description list incorporada |
| Término | `<dt>` nativo | — | SR anuncia como "término" |
| Valor | `<dd>` nativo | — | SR asocia valor con su término precedente |
| Term icon | `<svg>` / `<img>` | `aria-hidden="true"` | Solo visual; el term text lleva la semántica |
| Multiple `<dd>` | `<dd>` adicionales | — | Permitidos si un term tiene varios valores |
| Columns layout | CSS Grid | DOM lineal | Orden de lectura: term1 → desc1 → term2 → desc2 |
| Action links | `<a>` | `aria-label="Editar [nombre campo]"` | Contexto completo, no solo "Editar" |

### Keyboard navigation

Primary interactions (affect design):

```
No focusable por defecto — el componente es display-only.
Los links o botones dentro de los slots description/term sí son focusables
y siguen el flujo de Tab natural del documento.
```

Secondary interactions (dev reference):

```
Tab    → navega a links/botones dentro de los slots
        (no hay navegación especial del componente en sí)
```

**Focus management:** Ninguno en el componente raíz. Si incluyes action links por fila (patrón GOV.UK "Cambiar nombre"), cada link debe ser independientemente focalizable con texto accesible completo: "Cambiar [nombre del campo]".

---

## Content guide

### slot: term (DescriptionItem)

Etiqueta concisa del dato. Preferiblemente 1–3 palabras. Usa case sentence (primera letra mayúscula, resto minúsculas) para consistencia. Evita abreviaciones que no sean universalmente reconocidas. El term es el `<dt>` — lo que el lector de pantalla anuncia como "término".

Ejemplos correctos: "Email", "Fecha de alta", "Plan de suscripción"
Ejemplos incorretos: "E-Mail", "FECHA", "Suscripción (plan)"

### slot: description (DescriptionItem)

El valor. Puede ser texto simple, un badge de estado, un link, una fecha formateada, o un avatar + nombre. Evita dejar este slot vacío — usa "No proporcionado" o "—" como mínimo. Para valores monetarios, usa el formato de moneda del sistema (no mezclar formatos). Para fechas, usa el formato consistente del producto.

Cuando el valor es un link de acción (patrón GOV.UK): el link debe incluir el nombre del campo en su texto accesible. Ejemplo: `<a>Cambiar <span class="sr-only">email</span></a>` renderizado visualmente como "Cambiar" pero accesible como "Cambiar email".

### slot: termIcon (DescriptionItem, opcional)

Ícono acompañante del término. Útil para paneles de metadatos donde los íconos ayudan a la scanability rápida. Tamaño 16px. Color `text/secondary`. Siempre `aria-hidden="true"` — el ícono es decorativo, el término es semántico. Mantén consistencia: si usas iconos para algunos términos, úsalos para todos o para ninguno.

### slot: items (DescriptionList)

N instancias de DescriptionItem. Para `Columns=2` o `3`, el layout visual será grid pero el DOM order será lineal (term1 → desc1 → term2 → desc2 → ...). La cantidad recomendada por sección es 3–8 items. Para más de 8, considera dividir en secciones con títulos encima del DescriptionList.

---

## Pre-build checklist

```
[ ] DescriptionItem: 24 frames netos (27 gross - 3 exclusiones)
      - Verificar: Layout=inline + Emphasis=equal NO existe
[ ] DescriptionList: 9 frames netos (Columns×Dividers = 3×3)
[ ] Tokens aplicados:
      - Term emphasized → dl/term/fg/emphasized (text/primary)
      - Term subtle → dl/term/fg/subtle (text/secondary)
      - Term fontWeight emphasized → dl/term/fontWeight/emphasized (semibold)
      - Description emphasized → dl/description/fg/emphasized (text/primary)
      - Description subtle → dl/description/fg/subtle (text/secondary)
      - Divider color → dl/divider/color (border/default)
[ ] Layout=horizontal: term con ancho fijo (120/160/200px por size)
[ ] Layout=stacked: dirección column, term arriba
[ ] Layout=inline: separador ":" implícito en el diseño
[ ] Emphasis=term: term weight=600 primario, description weight=400 secundario
[ ] Emphasis=description: description weight=600 primario, term weight=400 secundario
[ ] Has Term Icon=on: ícono 16px a la izquierda del term
[ ] Term icon: aria-hidden=true documentado en spec
[ ] Columns=2/3 con nota: DOM order lineal (term→desc→term→desc)
[ ] Dividers=between: solo entre items, no antes del primero ni después del último
[ ] Dividers=all: líneas entre y alrededor de cada item (estilo bordered)
[ ] Valores vacíos: "No proporcionado" como placeholder, nunca vacío
[ ] Action links en description: texto accesible completo documentado
[ ] Nota de scope: componente display-only, sin estados de hover/focus en el item
```

---

## Related components

```
Form              → versión editable de DescriptionList
Table             → múltiples objetos del mismo tipo en filas
DataGrid          → tabla con interacción (sort, select, expand)
Card              → contenedor para DescriptionList en contexto de detalle
Divider           → separador visual (usado en Dividers=between/all)
Badge             → contenido frecuente en el slot description
Avatar            → contenido frecuente en el slot description (user info)
```

---

## Reference: how other systems do it

### Ant Design Descriptions — el gold standard de features

Ant Design's `Descriptions` (plural) es el más completo entre los 24 sistemas. Renderiza un grid bordered o borderless con column count configurable, tamaños, layout direction (horizontal/vertical) y separador de colon opcional. El objeto `column` acepta breakpoints responsivos (`{xxl: 4, xl: 3, lg: 3, md: 2, sm: 1}`) — multi-columna adaptativa sin media queries. `Descriptions.Item` soporta `span` para items que ocupan múltiples columnas (un campo de dirección que abarca 2 columnas mientras nombre y email toman 1 cada uno).

El prop `bordered` renderiza `<table>` HTML real con `<th>` para términos y `<td>` para valores — semántica de tabla genuina cuando se necesita. El prop `extra` provee un action slot en el header (botón Editar, badge de estado, link de ayuda). El prop `colon` agrega ":" después de los labels — convencion de enterprise UI que Ant estandariza a nivel de componente en lugar de requerir inserción manual en cada string de label.

### GOV.UK Summary List — el patrón más user-tested: tres columnas con Change links

El Summary List de GOV.UK se usa en cada página "Revisar tus respuestas" de los servicios digitales del gobierno UK — millones de transacciones. El componente renderiza filas con tres columnas: key (term), value (description), y actions (links Cambiar/Eliminar). El link "Cambiar" incluye el nombre del campo tanto visualmente como en texto oculto para screen readers: "Cambiar nombre" no solo "Cambiar" — esto es crítico para usuarios que navegan por links.

El patrón de "información faltante" reemplaza valores vacíos con un link ("Sin teléfono — Agregar") en lugar de dejar el campo en blanco, invisible para lectores de pantalla. Es el sistema con la investigación de usuario más profunda para este componente.

### Polaris DescriptionList — semántica dl/dt/dd de primera clase

Polaris provee `DescriptionList` como componente dedicado que renderiza `dl`/`dt`/`dd` semántico. El API de array de `items` (`{term: string, description: ReactNode}`) permite contenido rico en el slot description sin romper la estructura semántica. Shopify Admin es fundamentalmente un producto de display de metadatos — cada página de orden, cliente, producto y descuento es una serie de pares key-value, justificando el componente de primera clase.

El layout vertical por defecto maneja valores largos de merchant mejor que columnas horizontales donde el contenido largo comprimiría la columna de label.

### Twilio Paste DescriptionList — la referencia de a11y en T2

Paste provee `DescriptionList`, `DescriptionListTerm` y `DescriptionListDetails` como sub-componentes que renderizan `dl > dt + dd` semántico. Es uno de los dos sistemas T2 (junto con Polaris T1) que garantiza HTML semántico correcto. Es la referencia de accesibilidad para T2.

### Carbon StructuredList — extensión hacia selección de filas

El StructuredList de Carbon sirve como el equivalente más cercano a una description list. La configuración de dos columnas (term | value) maneja display de key-value, mientras la variante de selección opcional extiende el patrón hacia panels de configuración donde el usuario puede elegir entre opciones. No usa `dl/dt/dd` — usa `role="table"`, lo cual requiere más ARIA que la semántica nativa.

### Nord DescriptionList — implementación mínima y correcta

Nord provee `DescriptionList > DescriptionGroup > DescriptionTerm + DescriptionDetails` con `direction` (horizontal/vertical) a nivel de lista y `dl/dt/dd` semántico. Es la implementación más ligera pero correcta — la referencia para sistemas que quieren una description list sin el peso de Ant Design o GOV.UK.

---

## Tokens

**14 tokens** · prefix `dl-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| dl/sm/gap | spacing/1 | Gap entre term y description size sm |
| dl/md/gap | spacing/1.5 | Gap entre term y description size md |
| dl/lg/gap | spacing/2 | Gap entre term y description size lg |
| dl/term/fg/emphasized | text/primary | Color term con Emphasis=term |
| dl/term/fg/subtle | text/secondary | Color term con Emphasis=description/equal |
| dl/term/fontWeight/emphasized | type/weight-semibold | Font weight term con Emphasis=term |
| dl/term/fontWeight/subtle | type/weight-regular | Font weight term subtl |
| dl/description/fg/emphasized | text/primary | Color description con Emphasis=description/equal |
| dl/description/fg/subtle | text/secondary | Color description con Emphasis=term |
| dl/description/fontWeight/emphasized | type/weight-semibold | Font weight description con Emphasis=description |
| dl/description/fontWeight/subtle | type/weight-regular | Font weight description sutil |
| dl/divider/color | border/default | Color de los dividers entre items |
| dl/fontSize/sm | type/sm | Font size size sm (12px→13px) |
| dl/fontSize/md | type/md | Font size size md (13px→14px) |
| dl/fontSize/lg | type/lg | Font size size lg (14px→16px) |

### Spacing specs

```
DescriptionItem sm:
  termFontSize=12px  descriptionFontSize=13px  gap=4px  termWidth(horizontal)=120px

DescriptionItem md:
  termFontSize=13px  descriptionFontSize=14px  gap=6px  termWidth(horizontal)=160px

DescriptionItem lg:
  termFontSize=14px  descriptionFontSize=16px  gap=8px  termWidth(horizontal)=200px

Term icon:  size=16px  color=text/secondary  marginRight=6px

Dividers:
  Dividers=between  →  1px solid dl/divider/color  entre items (no al inicio, no al final)
  Dividers=all      →  1px solid dl/divider/color  alrededor de cada item

DescriptionList padding recomendado: 16px (hereda del container padre)
Multi-columna CSS: display:grid, grid-template-columns=repeat(N, 1fr), gap=16px
```
