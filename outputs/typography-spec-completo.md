# Typography

## Descripción general

Typography (componente `Text`) es el primitivo de texto del sistema de diseño: un único componente polimórfico que cubre Display, Heading, Body, Label y Caption. Siguiendo el patrón Polaris, `Variant` controla la apariencia visual (tamaño, peso, interlineado) mientras que el elemento HTML semántico (`as`) es responsabilidad del developer — desacoplando visual de semántica deliberadamente. Como building block, es la base de todos los componentes que muestran texto.

```
┌──────────────────────────────────────────────────────────┐
│                       Text                               │
│                                                          │
│   ┌──────────────────────────────────────────────────┐   │
│   │              [content — slot texto]              │   │
│   └──────────────────────────────────────────────────┘   │
│                                                          │
│   display-lg (48/56)  ···  caption (11/14)               │
└──────────────────────────────────────────────────────────┘
```

El componente no tiene estructura de slots adicionales — es solo texto. La composición ocurre en los componentes host (Card, Alert, Form) que combinan múltiples instancias de Text con distintos Variant y Tone.

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Variant   → display-lg | display-md | heading-xl | heading-lg | heading-md |
             heading-sm | heading-xs | body-lg | body-md | body-sm | body-xs |
             label-md | label-sm | caption
```

Toggles / propiedades adicionales (configuradas como properties en instances):

```
Tone     → primary | secondary | subtlest | disabled | inverse |
            success | warning | critical | info
Weight   → regular | medium | semibold | bold
Align    → start | center | end
Truncate → no | yes
```

### Panel de propiedades en Figma

```
┌─────────────────────────────────────────┐
│  Text                                   │
│  ─────────────────────────────────────  │
│  Variant    [ body-md              ▼ ]  │
│  Tone       [ primary              ▼ ]  │
│  Weight     [ regular              ▼ ]  │
│  Align      [ start                ▼ ]  │
│  Truncate   [ no                   ▼ ]  │
│  ─────────────────────────────────────  │
│  ✏️ Content  [ Text content            ]│
└─────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito mostrar texto?
          │
          ▼
   ¿Es un título o encabezado?      ¿Es texto de cuerpo?      ¿Es etiqueta/caption?
   → Variant=heading-*              → Variant=body-*           → Variant=label-* o caption
   → as=h1/h2/h3/h4/h5/h6          → as=p                     → as=span/label
   (developer elige nivel)          (developer elige)           (developer elige)
          │
          ▼
   ¿Necesita color semántico?
   → Tone=success|warning|critical|info
          │
          ▼
   ¿Texto largo en espacio fijo?
   → Truncate=yes + title/tooltip con texto completo
```

**Usar Typography cuando:**
- Se necesita cualquier texto del sistema con estilo tipográfico controlado
- Se quiere aplicar color semántico al texto (success/warning/critical/info)
- Se necesita controlar peso, alineación o truncado de texto
- Se está construyendo un heading, párrafo, label o caption

**NO usar Typography cuando:**
- El texto necesita edición inline → usar `InlineEdit`
- El texto necesita copiarse al clipboard → implementar acción custom con botón
- Se necesita formateo rich (bold/italic inline) → usar un editor de texto
- El texto tiene múltiples roles mezclados (código, citas, listas) → usar elementos HTML semánticos directamente

---

## Variaciones visuales

### Escala de variantes

| Variant      | Size | Line-height | Weight default | Uso típico |
|-------------|------|-------------|---------------|-----------|
| `display-lg` | 48px | 56px        | Bold (700)    | Heroes, splash screens, landing pages |
| `display-md` | 40px | 48px        | Bold (700)    | Secciones de marketing, modales grandes |
| `heading-xl` | 32px | 40px        | Bold (700)    | Título principal de página |
| `heading-lg` | 24px | 32px        | Semibold (600)| Sección primaria, card heading grande |
| `heading-md` | 20px | 28px        | Semibold (600)| Subsección, panel header |
| `heading-sm` | 18px | 24px        | Semibold (600)| Group label en sidebar, drawer title |
| `heading-xs` | 16px | 20px        | Semibold (600)| Heading mínimo, list section header |
| `body-lg`    | 16px | 24px        | Regular (400) | Texto largo, artículos, descripciones |
| `body-md`    | 14px | 20px        | Regular (400) | Body text estándar — UI default |
| `body-sm`    | 13px | 18px        | Regular (400) | Texto compacto, tablas densas |
| `body-xs`    | 12px | 16px        | Regular (400) | Texto muy pequeño, chips, badges |
| `label-md`   | 14px | 20px        | Medium (500)  | Labels de form, tab labels, button text |
| `label-sm`   | 12px | 16px        | Medium (500)  | Labels de campo sm, helper text |
| `caption`    | 11px | 14px        | Regular (400) | Captions de imagen, timestamps, footnotes |

### Tones

| Tone       | Color resultante | Caso de uso |
|-----------|-----------------|-------------|
| primary   | #121212 | Texto principal — default para body y headings |
| secondary | #6B7280 | Texto secundario, metadata, descripciones auxiliares |
| subtlest  | #8C8C96 | Hints, placeholders, texto muy de fondo |
| disabled  | #B8B8C0 | Texto deshabilitado — no interactivo |
| inverse   | #FFFFFF | Texto sobre fondos oscuros/dark surfaces |
| success   | #159238 | Confirmación, estado OK inline |
| warning   | #B87A0D | Advertencia inline, validación parcial |
| critical  | #DC2626 | Error, estado destructivo, texto de alerta |
| info      | #2659EB | Informativo, notas, tips contextuales |

### Weight override

| Weight    | Valor | Cuándo usar |
|-----------|-------|-------------|
| regular   | 400   | Body text (default para body-*) |
| medium    | 500   | Labels (default para label-*), énfasis suave |
| semibold  | 600   | Headings (default para heading-*) |
| bold      | 700   | Display (default para display-*), énfasis fuerte |

---

## Decisiones de diseño

**1. Un solo componente `Text` (patrón Polaris)** — Spectrum divide en Heading/Body/Detail (3 componentes); Base Web tiene 20+ componentes nombrados. Un solo componente con Variant = API mínima, un solo import. El desacoplamiento visual/semántico (`as` prop) da flexibilidad sin sacrificar correctitud. Ant Design es el más completo pero su API de 3 subcomponentes con props interactivos (editable/copyable) añade complejidad fuera del scope del primitivo.

**2. 14 variantes (display×2 + heading×5 + body×4 + label×2 + caption×1)** — M3 tiene 15 (5 roles × 3 sizes); Polaris tiene 9. La escala de 14 cubre toda la jerarquía tipográfica del producto sin duplicidades. display-lg/md para hero sections; heading-xl para h1 de página; los 5 heading para sub-jerarquía; body-lg para artículos, body-md como body estándar, body-sm/xs para densidad; label-md/sm para formularios; caption para anotaciones.

**3. Tone independiente del Variant** — Polaris tiene `tone` en el mismo Text component. El texto de error, warning o éxito ocurre en cualquier variant (un heading puede ser critical, un body puede ser success). Mantenerlo como property en Figma evita multiplicar frames innecesariamente.

**4. Weight override independiente** — Los variants tienen weight default (heading=600, body=400). El override de weight permite énfasis dentro del mismo variant (body-md + bold = párrafo enfatizado) sin cambiar de variant. Patrón Polaris `fontWeight`.

**5. Truncate single-line únicamente** — Ant Design tiene ellipsis con rows + expandable (multiline clamping). El multiline clamping es runtime CSS (-webkit-line-clamp) que no se puede representar en Figma con fidelidad. Truncate=yes representa el caso de single-line con ellipsis, que cubre las tablas y cards. Multiline se documenta como referencia de dev.

**6. 14 frames representativos (no multiplicar)** — 14 variants × 9 tones × 4 pesos × 3 aligns = 1.512 frames. Absurdo para Figma. Solo se generan los 14 variants como frames base; Tone, Weight, Align y Truncate se exponen como component properties configurables por instance.

### Combinaciones excluidas

```
Variant=caption + Weight=bold       → ✗ caption siempre regular/medium (11px bold es ilegible)
Variant=display-* + Weight=regular  → ✗ display siempre semibold+ (display regular sin impacto visual)
Variant=display-* + Tone=subtlest   → ✗ display en color subtlest (contraste insuficiente en hero)
```

---

## Comportamiento

### Esencial para diseño

- **Variant es visual, `as` es semántico** — `heading-xl` + `as="h3"` es completamente válido cuando la jerarquía visual y la jerarquía de documento divergen. El developer decide el elemento HTML; el diseñador decide el estilo.
- **Heading hierarchy no se salta** — h1 → h3 (saltando h2) es una violación de accesibilidad. La jerarquía visual puede variar, pero la semántica debe ser secuencial.
- **Truncate=yes requiere texto completo accesible** — el texto truncado debe tener `title` attribute o tooltip con el contenido completo. El usuario debe poder acceder al texto.
- **Tone=disabled solo para texto genuinamente deshabilitado** — no para decoración. Si el texto es deshabilitado, el elemento interactivo asociado también debe tener `disabled` state.

### Accesibilidad (ARIA)

| Parte | Role | Atributos | Por qué importa |
|-------|------|-----------|----------------|
| Heading (display-*/heading-*) | implicit heading | Elemento HTML h1–h6 según `as` prop | Los SR navegan por headings; el nivel semántico crea el outline del documento |
| Body text (body-*) | ninguno (texto) | `as="p"` o `as="span"` según contexto | `p` crea bloque en el flujo; `span` es inline — impacta reading order |
| Label (label-*) | ninguno | `as="label"` + `htmlFor` si es form label | Labels semánticos conectan con inputs para SR |
| Truncado (Truncate=yes) | ninguno | `title="[texto completo]"` | SR leerá el texto completo; el title provee fallback visual en hover |
| Texto deshabilitado | ninguno | `aria-disabled` en el elemento interactivo padre | El texto en sí no tiene state disabled — el parent lo tiene |

### Navegación por teclado

Primary interactions (afectan diseño):

```
Text no es focusable — no tiene keyboard interactions propias.
```

Secondary interactions (referencia dev):

```
Si Text está dentro de un link o button: Tab → foco en el interactive parent
Truncate=yes: texto visible via title tooltip en hover (no requiere teclado)
Texto seleccionable: comportamiento nativo del browser (Ctrl+A, Shift+click)
```

---

## Guía de contenido

**Jerarquía visual:**
- Máximo un `display-*` por página — es el reclamo visual principal
- Los headings deben seguir orden h1 → h2 → h3 → h4 sin saltar niveles
- `heading-xs` (16px semibold) es el heading mínimo recomendado — por debajo puede confundirse con label

**Longitud de línea:**
- Texto de lectura (body-lg/md): 60–80 caracteres por línea óptimo
- Headings: sin límite estricto, pero heading-xl/lg raramente pasan de 2 líneas en UI
- Labels/caption: diseñados para una línea; si se necesitan 2 líneas, reconsiderar el Variant

**Tones semánticos:**
- Tone=critical para errores de validación reales, no para decoración roja
- Tone=success solo cuando una acción se completó exitosamente
- Tone=warning para estados de atención que no son error aún
- Nunca usar Tone como único diferenciador (contraste de color solo no basta para a11y)

---

## Pre-build checklist

```
□ ¿El Variant es el apropiado para el nivel de jerarquía?
□ ¿El elemento HTML (as) coincide con la semántica del contenido?
□ ¿Los headings siguen orden secuencial (sin saltar niveles)?
□ ¿Hay máximo un h1 (heading-xl + as="h1") por página?
□ ¿Truncate=yes tiene title con el texto completo?
□ ¿Tone=disabled solo en texto genuinamente deshabilitado?
□ ¿El contraste color/fondo cumple WCAG AA (4.5:1 body, 3:1 large)?
□ ¿caption no tiene Weight=bold?
□ ¿display-* no tiene Weight=regular?
□ ¿Los labels de formulario usan as="label" + htmlFor?
```

---

## Componentes relacionados

```
Button      → usa label-md/label-sm como texto del botón
Badge       → usa label-sm/body-xs para el label del badge
Alert       → combina heading-sm (título) + body-md (descripción)
Tooltip     → usa body-sm o label-sm para el contenido
Form        → usa label-md para field labels, body-sm para helper text
Card        → usa heading-md/sm para título + body-md para descripción
Table       → usa label-sm para headers, body-sm/md para cells
Link        → wrappea Text o extiende sus estilos con color interactivo
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Enfoque | Componentes | Truncado | Responsive | Diferenciador clave |
|---------|---------|-------------|---------|-----------|-------------------|
| **Material Design 3** | Tokens CSS (sin componente) | — | No | No nativo | 5 roles × 3 sizes = 15 tokens; no componente React |
| **Spectrum (Adobe)** | 3 componentes separados | Heading + Body + Detail | No | No | Heading fuerza nivel semántico via `level` prop |
| **Carbon (IBM)** | Tokens + 2 componentes | Heading + Body | No | CSS clamp() en Expressive | Productive vs. Expressive dual scale; compact body variants |
| **Polaris (Shopify)** | 1 componente polimórfico | Text | Single-line | No | variant + as independientes; tone semántico; truncate boolean |
| **Atlassian** | Tokens shorthand + Heading | Heading | No | No | Shorthand font tokens (familia+peso+size en 1 token) |
| **Ant Design** | 3 subcomponentes | Title + Text + Paragraph | Multi-line (rows + expand) | No | editable + copyable + ellipsis avanzado |
| **Twilio Paste** | Componentes por rol | Heading + Paragraph + Display + DetailText | Componente separado | Manual | Paste Truncate como componente wrapping |
| **Lightning (Salesforce)** | Utility classes | lightning-formatted-text | No | No | Linkificación y sanitización automáticas |
| **Primer (GitHub)** | 2 componentes | Heading + Text | sx prop | Array syntax en sx | `fontSize={[2, 4]}` responsive via sx |
| **shadcn/ui** | BYO (Tailwind) | — | Tailwind | Tailwind utilities | No componente — recetas Tailwind prose classes |
| **Radix Themes** | Primitivos styled | Text + Heading + Em + Strong + Code | No | No | `trim` prop para leading trim (optical alignment) |
| **Chakra UI** | 2 componentes | Heading + Text | `noOfLines` (multi-line) | Objeto responsive | `noOfLines` + `isTruncated`; color mode aware |
| **GOV.UK** | Utility classes | — | No | Automático en clase | Responsive automático; font GDS Transport mandatada |
| **Base Web (Uber)** | 20+ componentes | HeadingXS–XXXL, ParagraphS–L, LabelS–L... | No | No | Un componente por ramp step; overrides pattern |
| **Fluent 2 (Microsoft)** | Componentes por rol | Text + Title1-3 + Subtitle1-2 + Body1-2 + Caption1-2 | `truncate` prop | No | `block` prop cambia de inline a block; LargeTitle para hero |
| **Gestalt (Pinterest)** | 2 componentes | Heading + Text | `lineClamp` + auto-tooltip | No | `accessibilityLevel` required; auto-tooltip en truncado |
| **Mantine** | Familia completa | Title + Text + Highlight + Mark + Code + Blockquote | `lineClamp` + `truncate` | Objeto responsive | `gradient` text; Highlight para búsqueda inline |
| **Orbit (Kiwi)** | 2 componentes | Heading + Text | No | Incorporado | Tipos viaje-optimizados; responsive built-in |
| **Evergreen (Segment)** | Familia nombrada | Heading + Text + Paragraph + Strong + Code | No | No | `is` prop polimórfico; API minimalista |
| **Nord (Nordhealth)** | Web components | nord-heading + nord-text | No | No | Escala clínica; `level` controla semántica + visual |

**Patrones clave de la industria:**
1. **variant/as desacoplados** — Polaris, Primer, Atlassian, Chakra, Mantine, Orbit: consenso universal. Visual y semántica se controlan independientemente.
2. **Multi-line truncation (lineClamp)** — Liderado por T3: Chakra (`noOfLines`), Gestalt (`lineClamp` + auto-tooltip), Mantine. Ant Design es el único T1 con esto. Fluent 2 y Polaris solo single-line.
3. **Semantic tone en texto** — Polaris, Atlassian, Ant Design, Gestalt, Fluent 2 tienen color semántico (critical/success/warning) como prop del text component. No como utility clase separada.
4. **Leading trim** — Radix Themes introduce `trim` prop para optical alignment. Único en la industria — resuelve el gap de line-height extra en alineación vertical precisa.

---

## Tokens

**30 tokens** · prefijo `typ-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `typ-display-lg-size` | `type/display-lg` | 48px / line-height 56px / bold |
| `typ-display-md-size` | `type/display-md` | 40px / line-height 48px / bold |
| `typ-heading-xl-size` | `type/heading-xl` | 32px / line-height 40px / bold |
| `typ-heading-lg-size` | `type/heading-lg` | 24px / line-height 32px / semibold |
| `typ-heading-md-size` | `type/heading-md` | 20px / line-height 28px / semibold |
| `typ-heading-sm-size` | `type/heading-sm` | 18px / line-height 24px / semibold |
| `typ-heading-xs-size` | `type/heading-xs` | 16px / line-height 20px / semibold |
| `typ-body-lg-size` | `type/body-lg` | 16px / line-height 24px / regular |
| `typ-body-md-size` | `type/body-md` | 14px / line-height 20px / regular |
| `typ-body-sm-size` | `type/body-sm` | 13px / line-height 18px / regular |
| `typ-body-xs-size` | `type/body-xs` | 12px / line-height 16px / regular |
| `typ-label-md-size` | `type/label-md` | 14px / line-height 20px / medium |
| `typ-label-sm-size` | `type/label-sm` | 12px / line-height 16px / medium |
| `typ-caption-size` | `type/caption` | 11px / line-height 14px / regular |
| `typ-primary-fg` | `text/primary` | Tono primary — #121212 |
| `typ-secondary-fg` | `text/secondary` | Tono secondary — #6B7280 |
| `typ-subtlest-fg` | `text/subtlest` | Tono subtlest — #8C8C96 |
| `typ-disabled-fg` | `text/disabled` | Tono disabled — #B8B8C0 |
| `typ-inverse-fg` | `text/inverse` | Tono inverse — #FFFFFF |
| `typ-success-fg` | `status/success/fg` | Tono success — #159238 |
| `typ-warning-fg` | `status/warning/fg` | Tono warning — #B87A0D |
| `typ-critical-fg` | `status/error/fg` | Tono critical — #DC2626 |
| `typ-info-fg` | `status/info/fg` | Tono info — #2659EB |
| `typ-weight-regular` | `type/weight-regular` | Font weight 400 |
| `typ-weight-medium` | `type/weight-medium` | Font weight 500 |
| `typ-weight-semibold` | `type/weight-semibold` | Font weight 600 |
| `typ-weight-bold` | `type/weight-bold` | Font weight 700 |

### Especificaciones de espaciado

```
┌─────────────────────────────────────────────────────────┐
│  Escala tipográfica completa                             │
│                                                         │
│  display-lg   48px / lh 56px / bold / ls -0.02em       │
│  display-md   40px / lh 48px / bold / ls -0.02em       │
│  heading-xl   32px / lh 40px / bold                    │
│  heading-lg   24px / lh 32px / semibold                │
│  heading-md   20px / lh 28px / semibold                │
│  heading-sm   18px / lh 24px / semibold                │
│  heading-xs   16px / lh 20px / semibold                │
│  body-lg      16px / lh 24px / regular                 │
│  body-md      14px / lh 20px / regular  ← UI default   │
│  body-sm      13px / lh 18px / regular                 │
│  body-xs      12px / lh 16px / regular                 │
│  label-md     14px / lh 20px / medium                  │
│  label-sm     12px / lh 16px / medium                  │
│  caption      11px / lh 14px / regular                 │
│                                                         │
│  Frames totales: 14 (uno por variant)                   │
│  Tone/Weight/Align/Truncate: component properties       │
└─────────────────────────────────────────────────────────┘
```
