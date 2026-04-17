# DescriptionList

## Descripción general

DescriptionList es el componente de display de pares término/definición del sistema de diseño. Renderiza semánticamente con `<dl>/<dt>/<dd>` — el único elemento HTML diseñado específicamente para este patrón — garantizando accesibilidad sin ARIA adicional. Se usa en panels de metadata (user profile, order details, product attributes, settings preview) donde se necesita mostrar información estructurada en pares clave-valor. Es una familia de dos componentes: `DescriptionItem` (el par individual) y `DescriptionList` (el contenedor con N items en 1, 2 o 3 columnas).

```
Layout=horizontal:
┌────────────────────────────────────────────────────────┐
│  Email          user@example.com                       │
│  Plan           Pro ($29/mes)                          │
│  Estado         ●  Activo                              │
│  Última sesión  Hoy, 14:32                             │
└────────────────────────────────────────────────────────┘

Layout=stacked:
┌────────────────────────────────────────────────────────┐
│  Email                                                 │
│  user@example.com                                      │
│  ─────────────────────────────────────────────────── │
│  Plan                                                  │
│  Pro ($29/mes)                                         │
└────────────────────────────────────────────────────────┘
```

**Familia:** DescriptionItem (sub-componente) → DescriptionList (contenedor). Build order: DescriptionItem primero.

**Lo que el diseñador puede configurar:**

DescriptionItem:
```
Layout   → stacked (term arriba) | horizontal (side-by-side) | inline (term: desc en línea)
Size     → sm | md | lg
Emphasis → term | description | equal
```
Toggles DescriptionItem:
```
👁 Has Term Icon → muestra ícono junto al término
```

DescriptionList:
```
Columns  → 1 | 2 | 3
Dividers → none | between | all
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────┐
│  DescriptionItem                                     │
│  ─────────────────────────────────────────────────  │
│  Layout     [ horizontal          ▼ ]               │
│  Size       [ md                  ▼ ]               │
│  Emphasis   [ term                ▼ ]               │
│  ─────────────────────────────────────────────────  │
│  👁 Has Term Icon  [ off ]                          │
│  🔄 Term Icon      [ icon/placeholder  ▼ ]          │
│  ✏️ Term       [ Email                  ]           │
│  ✏️ Description [ user@example.com      ]           │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  DescriptionList                                     │
│  ─────────────────────────────────────────────────  │
│  Columns    [ 1                   ▼ ]               │
│  Dividers   [ between             ▼ ]               │
└──────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito mostrar pares clave-valor?
              │
              ▼
   ¿Los pares son estáticos (read-only)?
   ├── Sí → DescriptionList
   │           │
   │           ├── Detalles de usuario/orden/producto → Layout=horizontal
   │           ├── Formulario de revisión (antes de submit) → Layout=stacked
   │           └── Metadata inline compacta → Layout=inline
   └── No (editable) → Form (no DescriptionList)
```

**Usar DescriptionList cuando:**
- Panel de detalles de usuario (email, nombre, rol, estado)
- Resumen de pedido antes de confirmar ("Check your answers" — GOV.UK pattern)
- Ficha de producto (dimensiones, peso, material, SKU)
- Panel de settings en modo lectura (read-only preview de configuración)
- Metadata de asset (fecha, autor, tamaño, formato)

**NO usar DescriptionList cuando:**
- Los valores son editables → usar `Form` con campos
- El contenido es tabular con múltiples filas y columnas comparativas → `DataGrid`
- Los pares tienen acciones por fila (Edit/Delete) → usar `List` con trailing actions
- Es solo una lista informativa → usar `List Type=unordered`

---

## Variaciones visuales

### Por Layout

| Layout     | Dirección | Uso típico |
|-----------|----------|-----------|
| stacked   | Term arriba, description debajo | Mobile, items con descriptions largas, forms de revisión |
| horizontal | Term a la izquierda (ancho fijo), description a la derecha | Settings panels, user details en desktop |
| inline    | Term: description en una línea | Metadata compacta, tags de atributo, chips informativos |

### Por Emphasis

| Emphasis    | Term weight | Term color | Description weight | Description color |
|-----------|------------|-----------|-------------------|------------------|
| term      | semibold (600) | text/primary | regular (400) | text/secondary |
| description | regular (400) | text/secondary | semibold (600) | text/primary |
| equal     | regular (400) | text/primary | regular (400) | text/primary |

*Contexto de uso:*
- `term` — metadata displays donde el label es lo importante (atributos de producto)
- `description` — settings UIs donde el valor es lo importante (config actual)
- `equal` — comparaciones o revisiones donde ambos tienen igual peso

### Por Size

| Size | Term font | Description font | Gap | Term width (horiz.) |
|------|----------|-----------------|-----|-------------------|
| sm   | 12px     | 13px            | 4px | 120px |
| md   | 13px     | 14px            | 6px | 160px |
| lg   | 14px     | 16px            | 8px | 200px |

### Por Columns (DescriptionList)

| Columns | Uso típico |
|---------|-----------|
| 1       | Stacked vertical, mobile, items con descriptions largas |
| 2       | User profile panel, settings page en dos columnas |
| 3       | Product spec sheet, admin dashboard con muchos atributos |

---

## Decisiones de diseño

**1. 3 Layouts: stacked / horizontal / inline** — Ant Design tiene `layout` prop (horizontal/vertical). Polaris solo tiene vertical. Se añade `inline` para el caso de metadata en línea muy compacta ("Email: foo@bar.com" como tag). Stacked cubre mobile y descriptions largas; horizontal cubre panels de settings; inline cubre metadata contextual.

**2. Emphasis property (term/description/equal)** — Settings UIs enfatizan el valor (description — la configuración actual); metadata displays enfatizan el label (term — el atributo); comparaciones son equal. Los 3 valores cubren los contextos sin necesidad de configurar individualmente pesos y colores.

**3. Multi-column (1/2/3) — Ant Design pattern** — Ant Descriptions tiene `column` prop responsive. Fichas de producto, paneles de admin y spec sheets frecuentemente necesitan 2-3 columnas para compacidad. El DOM order es linear (term→description→term→description...) — el layout visual es grid pero la semántica es lineal.

**4. `<dl><dt><dd>` obligatorio** — Polaris, Paste y Nord usan `dl/dt/dd` semántico. Atlassian usa divs (pierde semántica). GOV.UK y T3 consensus: `dl/dt/dd` es el único HTML específicamente diseñado para este patrón. Asocia term con su description en el árbol de accesibilidad sin ARIA adicional.

**5. Exclusión: Layout=inline + Emphasis=equal** — inline necesita diferenciación visual entre term y description para ser legible (sin espacio entre ellos, solo el separador ": "). Si ambos tienen igual peso y color, la distinción se pierde. Se excluye esta combinación.

### Combinaciones excluidas

```
Layout=inline + Emphasis=equal → ✗ sin diferenciación visual el inline es ilegible
```

---

## Comportamiento

### Esencial para diseño

- **DOM order = lineal aunque sea multi-column** — con Columns=2, el visual muestra term1 | term2 en una fila. Pero el DOM es: term1 → desc1 → term2 → desc2. Los SR leen cada par completo antes del siguiente.
- **Term width fija en horizontal** — en Layout=horizontal, el term tiene ancho fijo (120/160/200px según Size). La description ocupa el espacio restante. Esto crea el alineamiento vertical que hace legible el panel.
- **DescriptionItem es el unit** — un DescriptionItem = un `<dt>` + un `<dd>`. Para un term con múltiples values, se usan múltiples `<dd>` (un DescriptionItem por value, misma key).
- **Term icon es decorativo** — el icon junto al term (`termIcon`) es aria-hidden. El term text lleva toda la semántica. El icon es solo ayuda visual de categoría.
- **Inline usa separador ": "** — en Layout=inline, el separador visual entre term y description es ": " (colon + space). No se puede desactivar.

### Accesibilidad (ARIA)

| Parte | HTML | ARIA | Por qué importa |
|-------|------|------|----------------|
| DescriptionList container | `<dl>` | nativo | SR anuncia "lista de definiciones, N items" |
| DescriptionItem term | `<dt>` | nativo | SR anuncia el término antes de su descripción |
| DescriptionItem description | `<dd>` | nativo | SR anuncia la descripción asociada al `<dt>` anterior |
| Term icon | SVG + `aria-hidden="true"` | decorativo | El icon es visual; el text ya provee el nombre |
| Columns=2/3 (visual grid) | CSS grid | DOM linear | El orden de tab/lectura es lineal, no por columnas |

### Navegación por teclado

Primary interactions (afectan diseño):

```
DescriptionList no es focusable — solo display.
Si hay links o acciones dentro de la description, esos son focusables (Tab order).
```

---

## Guía de contenido

**Term (la clave):**
- Sentence case: "Fecha de nacimiento" (no "FECHA DE NACIMIENTO")
- Máximo 3-4 palabras — es un label, no una pregunta
- Sin dos puntos al final en Layout=stacked/horizontal (el separador ": " es solo para inline)
- Debe ser único en la lista — dos terms iguales confunden (si se necesita, usar section heading)

**Description (el valor):**
- El valor real, no una descripción del valor
- Puede incluir Badge, Link, Avatar, Toggle read-only
- Si el valor está vacío: mostrar "—" (guión largo) o un texto como "No especificado" — nunca dejar en blanco (es invisible para SR)
- Valores largos: considerar Layout=stacked para que el texto fluya en su línea propia

**Multi-column:**
- Columns=2/3 solo cuando todos los items son breves (1 línea) — items largos rompen el grid
- Ordenar los items por importancia (no por nombre o tipo) — los primeros items son los más vistos

---

## Pre-build checklist

```
□ ¿El contenido es read-only? Si no → Form
□ ¿Layout=horizontal tiene suficiente ancho para term+description?
□ ¿Layout=inline tiene Emphasis=term o Emphasis=description (no equal)?
□ ¿Columns=2/3 solo con items de una sola línea?
□ ¿Los terms son únicos (no duplicados) en la lista?
□ ¿Valores vacíos muestran "—" o texto en vez de vacío?
□ ¿Term icon es aria-hidden?
□ ¿DOM order es lineal (term→desc→term→desc) aunque sea multi-column visual?
□ ¿Se está usando <dl><dt><dd> en implementación (no divs con role)?
```

---

## Componentes relacionados

```
Form           → para pares clave-valor editables
List           → lista de items con marker/trailing; Type=description para dl básico
DataGrid       → tablas de datos comparativos con múltiples filas
Card           → container natural para DescriptionList en paneles de detalle
Badge          → puede ir como value dentro de DescriptionItem description
Avatar         → puede ir como value (ej: "Asignado a: [Avatar] Nombre")
Link           → puede ir como value (ej: "Documento: [Link] Ver contrato")
Tooltip        → para terms con nombres técnicos que necesitan explicación
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Tiene componente | Semántica | Layouts | Columnas | Acciones por fila | Diferenciador |
|---------|----------------|----------|---------|---------|------------------|--------------|
| **Material Design 3** | No | No (list pattern) | — | — | — | List 2-line como aproximación |
| **Spectrum (Adobe)** | No | No (composición) | — | — | — | Flex+Typography para metadata |
| **Carbon (IBM)** | StructuredList | `<table>` | Tabular | Multi-col | Selección por fila | StructuredList con radio/checkbox |
| **Polaris (Shopify)** | DescriptionList | `<dl><dt><dd>` | Stacked default | 1 | No | Simple items API; ReactNode description |
| **Atlassian** | No | No (divs) | — | — | — | Composición Box+Stack; sin semántica |
| **Ant Design** | Descriptions | `<div role>` | H + V | 1-4 responsive | `extra` en header | Más completo: colSpan, colon, bordered, size variants |
| **Twilio Paste** | DescriptionList | `<dl><dt><dd>` | Vertical | 1 | No | Semántica correcta; Paste spacing |
| **Lightning** | Record View Form | Propietario | SF layout | — | — | Salesforce-specific; field rendering automático |
| **Primer (GitHub)** | No | — | — | — | — | Composición manual |
| **shadcn/ui** | No (community) | Community varies | — | — | — | Recipes; sin componente oficial |
| **Radix UI** | No | — | — | — | — | Sin componente |
| **Chakra UI** | No | — | SimpleGrid workaround | — | — | Community: SimpleGrid 2-col |
| **GOV.UK** | Summary List | `<dl><dt><dd>` | V solo | 1 | Change links por fila | 3-col: term+value+actions; missing info pattern |
| **Base Web** | No | — | — | — | — | Sin componente |
| **Fluent 2** | No | — | — | — | — | Field comp es form-oriented (no display) |
| **Gestalt** | No | — | — | — | — | Sin componente público |
| **Mantine** | No (community) | Community varies | — | — | — | Community recipes |
| **Orbit** | No | — | — | — | — | Internal booking patterns |
| **Evergreen** | No | — | — | — | — | Internal config panels |
| **Nord** | DescriptionList | `<dl><dt><dd>` | H + V | 1 | No | Clínico; DescriptionGroup + Term + Details |

**Patrones clave de la industria:**
1. **Mayoría no tiene componente** — solo Polaris, Paste, Ant Design, GOV.UK, Nord tienen componentes dedicados. El resto compone manualmente. Indica que este componente es domain-specific pero muy valioso cuando el dominio lo necesita.
2. **`dl/dt/dd` es la referencia de a11y** — Polaris, Paste, GOV.UK, Nord lo usan correctamente. Ant Design usa `<div>` con role — funcional pero no idiomático. Atlassian no tiene semántica.
3. **GOV.UK Summary List** — el modelo más completo con acciones por fila (Change links) y patrón de valor faltante. Es el gold standard de "check your answers" pattern.
4. **Ant Design Descriptions** — el más completo en features: columnas responsive, colSpan, colon, bordered, size. Referencia para extensibilidad.

---

## Tokens

**14 tokens** · prefijo `dl-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `dl-sm-gap` | `spacing/1` | Gap stacked sm — 4px |
| `dl-md-gap` | `spacing/1.5` | Gap stacked md — 6px |
| `dl-lg-gap` | `spacing/2` | Gap stacked lg — 8px |
| `dl-term-fg-emphasized` | `text/primary` | Term color (Emphasis=term o equal) |
| `dl-term-fg-subtle` | `text/secondary` | Term color (Emphasis=description) |
| `dl-term-fontWeight-emphasized` | `type/weight-semibold` | Term weight (Emphasis=term) |
| `dl-term-fontWeight-subtle` | `type/weight-regular` | Term weight (Emphasis=description o equal) |
| `dl-description-fg-emphasized` | `text/primary` | Description color (Emphasis=description o equal) |
| `dl-description-fg-subtle` | `text/secondary` | Description color (Emphasis=term) |
| `dl-description-fontWeight-emphasized` | `type/weight-semibold` | Description weight (Emphasis=description) |
| `dl-description-fontWeight-subtle` | `type/weight-regular` | Description weight (Emphasis=term o equal) |
| `dl-divider-color` | `border/default` | Color divider entre items |
| `dl-fontSize-sm` | `type/sm` | Font size sm — 12/13px |
| `dl-fontSize-md` | `type/md` | Font size md — 13/14px |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────────┐
│  Layout=horizontal, Size=md:                                 │
│                                                              │
│  │ 160px term │ gap:6px │ description (flex:1)  │           │
│  │ Email       │         │ user@example.com      │           │
│  │ Plan        │         │ Pro ($29/mes)          │           │
│                                                              │
│  Layout=stacked, Size=md:                                   │
│  Email                                                       │
│  ─ 6px gap ─                                                 │
│  user@example.com                                            │
│  ─ between divider ─                                         │
│  Plan                                                        │
│  ─ 6px gap ─                                                 │
│  Pro ($29/mes)                                               │
│                                                              │
│  Layout=inline, Size=md:                                    │
│  Email: user@example.com                                     │
│                                                              │
│  Frames:                                                     │
│  DescriptionItem: Layout(3) × Size(3) × Emphasis(3) = 27    │
│                   − 3 inline+equal = 24 frames               │
│  DescriptionList: Columns(3) × Dividers(3) = 9 frames       │
└──────────────────────────────────────────────────────────────┘
```
