# Typography

## Overview

Typography es el componente primitivo de texto del design system. Sigue el patrón de **componente único polimórfico** (Polaris model): un solo componente `Text` con un prop `Variant` que controla el estilo visual, y la elección de elemento HTML semántico (`as`) es responsabilidad del developer — no del Variant. Esta separación visual/semántica es la decisión arquitectural más importante de cualquier sistema de tipografía y está validada por 20 de 24 sistemas analizados.

```
┌───────────────────────────────────────────────────────────────┐
│  display-lg    48px / 56px lh / weight 700  — Hero sections   │
│  display-md    40px / 48px lh / weight 700                    │
│  ─────────────────────────────────────────────────────────    │
│  heading-xl    32px / 40px lh / weight 700  — Page titles     │
│  heading-lg    24px / 32px lh / weight 600  — Section titles  │
│  heading-md    20px / 28px lh / weight 600  — Card titles     │
│  heading-sm    18px / 24px lh / weight 600  — Subsections     │
│  heading-xs    16px / 20px lh / weight 600  — Small headings  │
│  ─────────────────────────────────────────────────────────    │
│  body-lg       16px / 24px lh / weight 400  — Long-form text  │
│  body-md       14px / 20px lh / weight 400  — Default UI text │
│  body-sm       13px / 18px lh / weight 400  — Secondary text  │
│  body-xs       12px / 16px lh / weight 400  — Dense UI text   │
│  ─────────────────────────────────────────────────────────    │
│  label-md      14px / 20px lh / weight 500  — Form labels     │
│  label-sm      12px / 16px lh / weight 500  — Small labels    │
│  caption       11px / 14px lh / weight 400  — Captions/meta   │
└───────────────────────────────────────────────────────────────┘
```

El componente `Text` es un building block reutilizado en todos los demás componentes del design system — desde Buttons hasta DataGrid cells, desde form labels hasta tooltips. Su configuración afecta globalmente la coherencia tipográfica del producto.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Variant:  display-lg | display-md | heading-xl | heading-lg | heading-md |
          heading-sm | heading-xs | body-lg | body-md | body-sm | body-xs |
          label-md | label-sm | caption

Tone:     primary | secondary | subtlest | disabled | inverse |
          success | warning | critical | info

Weight:   regular | medium | semibold | bold

Align:    start | center | end

Truncate: no | yes
```

Toggles (show/hide parts — do NOT generate extra variants):

```
(no hay booleans — el contenido es el único slot)
```

### Figma properties panel

```
┌─────────────────────────────────────────┐
│  Text                                   │
│  ─────────────────────────────────────  │
│  Variant                                │
│    ○ display-lg   ○ display-md          │
│    ○ heading-xl   ○ heading-lg          │
│    ○ heading-md   ○ heading-sm          │
│    ○ heading-xs                         │
│    ○ body-lg      ○ body-md             │
│    ○ body-sm      ○ body-xs             │
│    ○ label-md     ○ label-sm            │
│    ○ caption                            │
│  ─────────────────────────────────────  │
│  Tone                                   │
│    ○ primary    ○ secondary             │
│    ○ subtlest   ○ disabled              │
│    ○ inverse    ○ success               │
│    ○ warning    ○ critical   ○ info     │
│  ─────────────────────────────────────  │
│  Weight                                 │
│    ○ regular  ○ medium                  │
│    ○ semibold ○ bold                    │
│  ─────────────────────────────────────  │
│  Align  ○ start  ○ center  ○ end       │
│  Truncate ○ no  ○ yes                  │
│  ─────────────────────────────────────  │
│  ✏️ Content   "Text content"           │
└─────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿Necesitas mostrar texto en la UI?
│
├─ ¿Es un título de página/sección? → Text Variant=heading-xl/lg/md + as="h1/h2/h3"
├─ ¿Es texto de lectura/cuerpo? → Text Variant=body-md/lg
├─ ¿Es un label de formulario? → Text Variant=label-md + as="label"
├─ ¿Es metadata pequeña o caption? → Text Variant=caption o body-xs
├─ ¿Es texto de hero/marketing? → Text Variant=display-lg/md
│
├─ ¿Necesitas inline editing? → NO usar Text → usar InlineEdit component
├─ ¿Necesitas copiar al clipboard? → NO usar Text → wrappear con CopyableText utility
├─ ¿Necesitas rich formatting (MD/HTML)? → NO usar Text → usar RichText/Editor
└─ ¿Necesitas multi-line clamping con expand? → Text Variant + CSS -webkit-line-clamp custom
```

**Usar Text cuando:**
- Cualquier texto estático de la UI necesita styling consistente: headings de páginas, títulos de cards, cuerpo de párrafos, labels de formularios, captions de imágenes, metadata de tablas.
- Se necesita un tono semántico de texto para comunicar estado: `critical` para mensajes de error inline, `success` para confirmaciones, `warning` para advertencias.
- El peso o la alineación del texto deben overridearse respecto al default del Variant (ej. `body-md + bold` para un párrafo enfatizado).
- Se necesita truncación single-line con ellipsis en un texto de ancho fijo (table cell, card title).

**NO usar Text cuando:**
- El texto es inline-editable por el usuario (usar InlineEdit component).
- El texto es copyable (texto de API key, código) — wrappear con un componente CopyableText utilitario.
- El contenido incluye rich formatting (markdown, HTML, links inline) — usar un renderer de rich text.
- Se necesita multi-line clamping con toggle de expand/collapse — el Text solo tiene single-line truncate; multi-line clamping es CSS runtime (`-webkit-line-clamp`) a implementar como wrapper.

---

## Visual variations

### Escala completa de Variants

| Variant | Size | Line Height | Weight default | Uso típico |
|---------|------|-------------|----------------|-----------|
| display-lg | 48px | 56px | 700 | Títulos hero, landing pages |
| display-md | 40px | 48px | 700 | Subtítulos hero, marketing |
| heading-xl | 32px | 40px | 700 | Título principal de página |
| heading-lg | 24px | 32px | 600 | Título de sección |
| heading-md | 20px | 28px | 600 | Título de card, dialog |
| heading-sm | 18px | 24px | 600 | Subsección, panel title |
| heading-xs | 16px | 20px | 600 | Heading pequeño, group label |
| body-lg | 16px | 24px | 400 | Texto de lectura largo |
| body-md | 14px | 20px | 400 | Texto UI estándar (default) |
| body-sm | 13px | 18px | 400 | Texto secundario |
| body-xs | 12px | 16px | 400 | Texto muy pequeño, dense UI |
| label-md | 14px | 20px | 500 | Labels de formulario estándar |
| label-sm | 12px | 16px | 500 | Labels compactos |
| caption | 11px | 14px | 400 | Captions, metadata, timestamps |

**Letter-spacing:** Los variants `display-*` tienen `-0.02em` (letra-tracking negativo para óptima legibilidad a gran tamaño). Los demás variants usan `0` letter-spacing.

### Tones (color semántico del texto)

| Tone | Color | Uso |
|------|-------|-----|
| primary | `text/primary` (#121213) | Texto principal, máximo contraste |
| secondary | `text/secondary` (#6B738A) | Texto de apoyo, metadata |
| subtlest | `text/subtlest` (#8C8C99) | Placeholder, hints, muy secundario |
| disabled | `text/disabled` (#B8B8BF) | Texto en estado disabled |
| inverse | `text/inverse` (#FFFFFF) | Sobre fondos oscuros |
| success | `status/success/fg` (#0E8C37) | Confirmaciones, positivo |
| warning | `status/warning/fg` (#B87A0D) | Advertencias |
| critical | `status/error/fg` (#DC2626) | Errores, destrucción |
| info | `status/info/fg` (#2659EB) | Informativo, links en contexto |

**Regla de doble codificación:** El tono de color semántico (success/warning/critical/info) nunca debe ser el único indicador de significado. El texto en sí debe comunicar el estado: "Error: conexión fallida" (con tono=critical), no solo texto normal con color rojo.

### Weights (override del default del Variant)

| Weight | Valor CSS | Uso |
|--------|-----------|-----|
| regular | 400 | Body text por defecto |
| medium | 500 | Labels, énfasis suave |
| semibold | 600 | Headings estándar |
| bold | 700 | Display, énfasis máximo |

El Weight prop permite override del default del Variant. Esto es útil para:
- `body-md + medium` → texto de énfasis sin cambiar al siguiente heading
- `body-lg + semibold` → lede de artículo con más peso que el cuerpo

**Exclusiones:**
- `Variant=caption + Weight=bold` → caption siempre regular o medium; bold en caption es ilegible
- `Variant=display-* + Weight=regular` → display siempre semibold o bold; regular en display no tiene el impacto necesario

### Truncate=yes

```
Texto normal:
Ejemplo de texto que puede crecer indefinidamente en ancho

Truncate=yes (en container de ancho fijo):
Ejemplo de texto que puede crecer indeid...
```

Aplica `text-overflow: ellipsis` + `overflow: hidden` + `white-space: nowrap`. Solo funciona cuando el contenedor tiene ancho limitado. En Figma se modela con clip content activo.

---

## Design decisions

### 1. Componente único Text (patrón Polaris) en lugar de componentes separados por rol

**Por qué:** Polaris, Chakra, Mantine y Radix Themes unifican todo el texto en un solo `Text` component con `variant`/`as` decoupling. Un solo import, API minimal, máxima flexibilidad. Spectrum divide en Heading/Body/Detail (3 componentes) y Base Web tiene 20+ componentes — mayor enforcement semántico pero API más grande. Para nuestro design system, la simplicidad de 1 componente con propiedades bien documentadas supera el enforcement por API de múltiples componentes. Se compensa con documentación explícita y lint rules de handoff.

**Tradeoff:** La responsabilidad del elemento HTML semántico (`as` prop) recae en el developer. `Variant=heading-lg` NO renderiza automáticamente `<h2>` — el developer debe especificarlo. Este es el riesgo más documentado de tipografía polimórfica y requiere onboarding explícito.

### 2. 14 variants: display(2) + heading(5) + body(4) + label(2) + caption(1)

**Por qué:** M3 tiene 15 (5 roles × 3 sizes); Polaris 9; Ant Design no tiene escala fija. Nuestros 14 variants = display(2) + heading(5) + body(4) + label(2) + caption(1). Esta escala cubre Display/Heading/Body/Label/Caption — todos los contextos UI posibles. Los 5 variants de heading (xl/lg/md/sm/xs) permiten jerarquías ricas en dashboards complejos sin saltar niveles. Los 4 body variants cubren desde longitud de lectura (body-lg) hasta densidad máxima de tabla (body-xs). Los 14 frames representan uno por escala: Tone/Weight/Align/Truncate se exponen como properties de instance en Figma.

**Tradeoff:** 14 frames en Figma son gestionables. Si se multiplicara por Tone(9) × Weight(4) × Align(3) × Truncate(2) = 1512 frames — absurdo. La solución correcta es exponer estos como properties de instance Figma en lugar de frames separados.

### 3. Tone como property de texto (patrón Polaris + Ant Design)

**Por qué:** Los tones semánticos (success/warning/critical/info) son concerns del sistema tipográfico, no de utilities de color externas. Polaris tiene `tone`, Ant Design tiene `type`, Gestalt tiene `color` restringido a tokens semánticos. Incluir Tone en el componente Text evita dependencia de utility classes de color para texto semántico y mantiene todo el styling tipográfico en un solo prop.

**Tradeoff:** El componente tiene más properties que un Text primitivo mínimo. El beneficio de coherencia semántica (todo el texto semántico pasa por el mismo canal) justifica las properties adicionales.

### 4. Weight override independiente del Variant

**Por qué:** Los variants tienen un weight default óptimo (heading=600, body=400, label=500). El Weight prop permite override para casos como `body-md + bold` (párrafo enfatizado) o `heading-md + regular` (heading de menor jerarquía). Sin este override, el designer necesitaría usar un Variant diferente solo para cambiar el peso, lo que rompe la semántica del tamaño.

**Tradeoff:** Potencial abuso: usar weight para crear "pseudo-headings" con variants de body. Documentar claramente que el Variant determina el contexto semántico y el Weight modifica el énfasis dentro de ese contexto.

### 5. Truncate single-line únicamente (no multi-line clamp)

**Por qué:** La truncación single-line (text-overflow: ellipsis) cubre el 95% de los casos en UI: titles de cards, nombres en tablas, URLs en listas. Ant Design tiene `ellipsis` con rows + expandable — el API de truncación más completo en T1, pero es runtime CSS complejo (`-webkit-line-clamp`). Mantine tiene `lineClamp`. Nosotros modelamos solo single-line en el componente y documentamos multi-line clamping como implementación custom en el wrapper si es necesario.

**Tradeoff:** Los productos que necesiten multi-line clamping (descripciones en cards, bio de usuarios) deben implementar el CSS `-webkit-line-clamp` como wrapper custom. Este caso es suficientemente frecuente que se debería considerar en v2 del componente.

### Excluded combinations

```
Variant=caption  + Weight=bold
→ Caption es el nivel más pequeño (11px); bold en 11px es ilegible y visualmente inconsistente.

Variant=display-* + Weight=regular
→ Display (48px/40px) siempre necesita peso fuerte para el impacto visual necesario.
→ Display+regular se vería como body text agrandado, no como display type.
```

---

## Behavior

### Essential para diseño

**Truncate=yes:** El texto se trunca con ellipsis cuando excede el ancho del contenedor. En Figma, el frame del texto tiene "clip content" activado. El tooltip o `title` attribute con el texto completo debe estar presente en implementación para accesibilidad (la versión truncada oculta contenido a usuarios con visión).

**Align:** Alineación del texto dentro del contenedor. `start` = left-to-right por defecto (adaptable a RTL automáticamente). `center` y `end` son geométricamente fijos. En Figma se aplica como text alignment.

**Weight override:** Cuando Weight difiere del default del Variant, Figma debe mostrar el peso overrideado correctamente. Verificar que las fuentes del sistema tengan las weights 400/500/600/700 disponibles.

**El componente no tiene estados interactivos.** Text es un primitivo de presentación puro — no tiene hover, focus, active ni disabled. El estado `disabled` en `Tone=disabled` es puramente visual (color gris) sin interacción.

**Responsive:** El componente Text en Figma no es responsive (los frames son estáticos). En implementación, las familias de variantes `display-*` y `heading-*` pueden tener escalado responsivo via tokens de tipografía por breakpoint. Esto es un concern de implementación, no de Figma.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Heading variant | `heading` (implícito) | El elemento HTML (`h1`-`h6`) determina el role — no el Variant | `heading-lg` en `<div>` NO es un heading para AT; debe ser `<h2>` etc. |
| Body/text variant | `paragraph` o inline | Depende del elemento (`<p>`, `<span>`) | Los `<p>` son block-level; `<span>` son inline |
| Truncate=yes | — | `title="[texto completo]"` o tooltip | AT lee el texto completo; el usuario con visión ve el truncado |
| Tone=disabled | — | Si el texto describe un elemento interactivo, `aria-disabled="true"` en el elemento interactivo | El color no comunica estado a AT |
| Tones semánticos | — | El texto en sí debe comunicar el significado, no solo el color | `critical` + "Error:" en el texto = correcto; solo color rojo = incorrecto |

**Regla fundamental sobre heading hierarchy:**
- No saltar niveles: `h1` → `h3` saltando `h2` es una violación de WCAG 2.4.6
- El Variant visual NO determina el nivel semántico
- Un `heading-xs` visualmente puede ser un `<h2>` semánticamente si la jerarquía del documento lo requiere
- `heading-lg` puede ser `<h4>` si está dentro de una sección `h2` y `h3`

### Keyboard navigation

```
No focusable (excepto cuando está wrapeado en un elemento interactivo).
AT lee el texto en orden de documento — respetar la jerarquía de headings
y el orden de lectura natural es la única consideración de a11y del componente Text.
```

---

## Content guide

### Slot: content (required)
El texto en sí. Guías por Variant:

**display-lg / display-md** — Máximo 5–8 palabras. Sin puntuación final. Frase de impacto. Ejemplos: "Diseña con claridad", "El sistema que escala contigo".

**heading-xl / heading-lg / heading-md** — Conciso y descriptivo. Máximo 10 palabras. Describe el contenido de la sección. Evitar gerundios al inicio ("Creando vs. Crear"). Ejemplos: "Configuración de cuenta", "Miembros del equipo", "Resumen de facturación".

**heading-sm / heading-xs** — Más cortos aún. Máximo 6 palabras. Para subsecciones o group labels. Ejemplos: "Preferencias", "Datos personales", "Acciones rápidas".

**body-lg / body-md** — Longitud variable según contenido. Párrafos completos son válidos. Body-lg para texto de lectura (artículos, instrucciones detalladas). Body-md para UI estándar (descripciones, mensajes).

**body-sm / body-xs** — Texto secundario o de apoyo. Máximo 2–3 líneas para mantener legibilidad a tamaño reducido.

**label-md / label-sm** — Texto de label siempre en forma de sustantivo o frase nominal (no oración completa): "Correo electrónico", "Nombre completo". Sin dos puntos al final en diseño (el dos puntos se añade en implementación si el contexto lo requiere).

**caption** — El más breve. Metadata, timestamps, copyright, footnotes. Máximo 1 línea idealmente.

### Cuándo usar qué Tone

- `primary` — Default. Todo texto principal, de lectura, headings.
- `secondary` — Metadata, subtítulos, textos de apoyo. No para contenido crítico.
- `subtlest` — Placeholders, hints, texto muy secundario. Verificar contraste AA.
- `disabled` — Texto que describe un campo/elemento deshabilitado.
- `inverse` — SOLO sobre fondos oscuros (toasts, tooltips dark, dark mode panels).
- `success` — Confirmaciones inline, estados positivos. Siempre incluir texto descriptivo.
- `warning` — Advertencias inline. Siempre incluir texto descriptivo.
- `critical` — Errores inline, acciones destructivas. Siempre incluir texto descriptivo.
- `info` — Información contextual, valores de referencia. Siempre incluir texto descriptivo.

---

## Pre-build checklist

```
Figma
□ 14 frames: uno por Variant (display-lg, display-md, heading-xl...caption)
□ Properties de instance configuradas: Tone, Weight, Align, Truncate
□ Cada frame muestra el Variant con Tone=primary, Weight=default, Align=start, Truncate=no
□ Todas las combinaciones de Tone correctamente ligadas a los tokens de color
□ Weight=semibold y bold verificados con la fuente disponible (no faux bold)
□ Truncate=yes: frame con clip content ON + texto largo de ejemplo truncado
□ letter-spacing -0.02em aplicado en display-lg y display-md
□ Exclusiones documentadas: caption+bold, display+regular no creados como variantes

Tokens
□ 14 size tokens vinculados a escala tipográfica
□ 9 color tokens de tone vinculados a paleta semántica
□ 4 weight tokens vinculados a escala de pesos

Accesibilidad
□ Documentado en specs: Variant ≠ elemento HTML semántico
□ Regla heading hierarchy documentada: no saltar niveles
□ Regla Truncate=yes: requiere title/tooltip con texto completo en implementación
□ Regla tones semánticos: color + texto, nunca solo color
□ Ejemplo de uso correcto: heading-md + as="h3" documentado en handoff

Contenido
□ Ejemplo de texto representativo en cada frame (no "Lorem ipsum")
□ Máximo de palabras recomendado por Variant documentado
□ Guía de Tone documentada con casos de uso correctos e incorrectos
```

---

## Related components

```
Link          → texto interactivo con semántica de navigation (wrappea Text internamente)
Button        → acción con texto (usa label-md internamente)
Badge         → label corto con fondo de color (usa label-sm internamente)
Tooltip       → texto contextual en overlay (usa body-sm internamente)
FormLabel     → label de campo de formulario (wrappea Text con Variant=label-md)
InlineEdit    → edición de texto in-place (composición con Text + input)
DataGrid      → células de tabla (usan body-sm/body-xs internamente)
```

---

## Reference: how other systems do it

### Material Design 3 — Tokens únicamente, sin componente

M3 define la escala de tipos más granular entre los 24 sistemas: 5 roles (Display, Headline, Title, Body, Label) × 3 tamaños (Large, Medium, Small) = 15 tokens. No existe un componente `<Typography>` — es una decisión arquitectural deliberada. M3 trata la tipografía como un concern de CSS, no de componente: los tokens se aplican vía CSS a los elementos HTML semánticamente apropiados. Esto fuerza los heading semantics correctos porque no hay componente intermediario que pueda renderizar un `<div>` en lugar de `<h2>`. Los tokens por separado por propiedad (family, weight, size, line height, letter-spacing como custom properties individuales) permiten ajustes ópticos independientes por nivel. Esta perspectiva informa nuestra documentación: Variant es visual, el elemento HTML es semántica — son concerns separados.

### Spectrum / Adobe — Tres componentes separados: Heading + Body + Detail

Spectrum divide en tres componentes de propósito específico en lugar de uno polimórfico. `Heading` siempre renderiza un elemento heading — es semánticamente imposible usar `<Heading>` y obtener `<div>`. `Body` maneja texto de párrafo e inline. `Detail` cubre texto UI pequeño: captions, labels, metadata. Cada componente acepta `size` que overridea el tamaño visual sin cambiar el elemento semántico. La separación fuerza intent semántico al nivel del API: elegir `<Heading>` declara explícitamente "esto es un heading". La crítica principal es el overhead de imports: tres importaciones para texto. Adobe's `UNSAFE_className` maneja casos de override fuera del sistema. Este approach es el de mayor enforcement semántico en T1.

### Carbon / IBM — Escala Productive vs Expressive con clamp() fluido

Carbon es el único sistema con dos filosofías de escala tipográfica explícitas y nombradas: Productive (valores px fijos, optimizados para lectura larga en UI de aplicaciones) y Expressive (clamp() CSS fluido entre breakpoints, para marketing y editorial). La escala Productive define `heading-01` hasta `heading-07` y variantes `body-compact` (line-height 1.29 vs 1.43) para soporte explícito de densidad en tablas enterprise. El escalado fluido Expressive (CSS `clamp()`) es superior a saltos discretos por breakpoint para texto de display y hero — el tipo escala continuamente entre tamaños de viewport sin saltos. El componente `<Heading>` de Carbon calcula automáticamente el nivel de heading correcto basado en contexto de anidación — el approach más sofisticado para prevenir errores de jerarquía.

### Polaris / Shopify — Componente único con variant/as decoupling

Polaris usa un componente `Text` único para todas las necesidades tipográficas: headings, body, captions, labels, cualquier texto. `variant` controla el estilo visual; `as` controla el elemento HTML renderizado independientemente. Este decoupling explícito — `variant="headingLg" as="h3"` — es el más claro en T1. Un heading de navigation que visualmente parece `headingSm` pero es semánticamente `h2` se expresa directamente en la combinación de props. El prop `tone` trae el color semántico al componente tipográfico: `critical`, `caution`, `success`, `subdued`, `text-inverse`. `truncate` boolean provee truncación single-line. `breakWord` previene overflow para strings largos sin espacios. Este es el patrón que adoptamos como base.

### Atlassian — Tokens shorthand de fuente (family + weight + size + line-height en uno)

Atlassian provee un componente `Heading` (size visual + `as` para override de elemento) y tokens de diseño para body text. La ausencia notable de un componente `<Body>` o `<Text>` significa que el body text se estiliza via tokens directamente en CSS en lugar de un React wrapper — un approach híbrido que evita el overhead de React wrapper para el elemento de texto más común mientras provee ergonomía a nivel de componente para headings. Los tokens shorthand de fuente son distintivos: `font.heading.xlarge` es un solo token que agrupa family, weight, size y line-height en una sola declaración CSS shorthand. Esto reduce el número de referencias de token versus el approach por-propiedad de M3 (5 tokens vs 1 token por nivel de texto). Atlassian requiere el prop `as` en Heading como obligatorio — fuerza decisiones semánticas deliberadas.

### Ant Design — Typography con editable, copyable y ellipsis avanzado

La Typography de Ant Design es la implementación más interactiva entre los 24 sistemas. `Typography.Text` y `Typography.Paragraph` incluyen `editable` (modo inline edit), `copyable` (botón de copy-to-clipboard), y `ellipsis` (truncación con expand/tooltip). Estas son patterns de interacción construidos dentro del componente tipográfico. El API `ellipsis` es el más avanzado de truncación en T1: multi-line clamping (`rows: 3`), toggle expandable, sufijo de texto, tooltip para contenido completo, y callback `onExpand`. Los props `code`, `mark`, `keyboard`, `underline`, `delete`, `strong`, `italic` cubren la gama completa de inline text formatting semántico en admin panels. Esta referencia informa nuestra decisión de scope: nosotros no incluimos editable/copyable en el componente Text base, pero los documentamos como patterns separados a implementar.

### Radix UI Themes — Leading trim para alineación óptica

Radix Themes provee primitivos tipográficos estilizados: `Text`, `Heading`, `Em`, `Strong`, `Quote`, `Code`. Escala `size` de 1-9 para Text; `weight`, `color`, prop polimórfico `as`. El prop `trim` es único entre los 24 sistemas: remueve el whitespace extra encima y debajo del texto causado por line-height, habilitando alineación vertical óptica precisa a los límites del ink en lugar de la line box. En práctica: texto + ícono alineados ópticamente sin ajustes manuales. `trim="both"` es el valor más útil para alineación perfecta de text+icon en componentes como Button o Tag.

### Gestalt (Pinterest) — accessibilityLevel requerido en Heading

`Heading` con `accessibilityLevel` (1-6, **requerido**) que controla tanto el HTML semántico como el tamaño visual por defecto. `size` prop (100-600) para override visual. `Text` con `size` (100-600), `weight`, `color` (tokens semánticos restringidos), `lineClamp` (truncación multi-line), `overflow`. El prop `title` en Text truncado surfacea automáticamente el texto completo como tooltip nativo — la solución de truncación más completa de los 24 sistemas. La restricción del color prop a tokens semánticos previene que los developers elijan colores de bajo contraste — todos los valores en el prop `color` pasan WCAG AA. Gestalt es el único sistema donde `accessibilityLevel` es **requerido** en Heading — el nivel de enforcement semántico más alto de todos.

---

## Tokens

**30 tokens** · prefix `typ-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `typ/display-lg/size` | `type/display-lg` | Font size + line-height display-lg |
| `typ/display-md/size` | `type/display-md` | Font size + line-height display-md |
| `typ/heading-xl/size` | `type/heading-xl` | Font size + line-height heading-xl |
| `typ/heading-lg/size` | `type/heading-lg` | Font size + line-height heading-lg |
| `typ/heading-md/size` | `type/heading-md` | Font size + line-height heading-md |
| `typ/heading-sm/size` | `type/heading-sm` | Font size + line-height heading-sm |
| `typ/heading-xs/size` | `type/heading-xs` | Font size + line-height heading-xs |
| `typ/body-lg/size` | `type/body-lg` | Font size + line-height body-lg |
| `typ/body-md/size` | `type/body-md` | Font size + line-height body-md |
| `typ/body-sm/size` | `type/body-sm` | Font size + line-height body-sm |
| `typ/body-xs/size` | `type/body-xs` | Font size + line-height body-xs |
| `typ/label-md/size` | `type/label-md` | Font size + line-height label-md |
| `typ/label-sm/size` | `type/label-sm` | Font size + line-height label-sm |
| `typ/caption/size` | `type/caption` | Font size + line-height caption |
| `typ/primary/fg` | `text/primary` | Color tone=primary |
| `typ/secondary/fg` | `text/secondary` | Color tone=secondary |
| `typ/subtlest/fg` | `text/subtlest` | Color tone=subtlest |
| `typ/disabled/fg` | `text/disabled` | Color tone=disabled |
| `typ/inverse/fg` | `text/inverse` | Color tone=inverse |
| `typ/success/fg` | `status/success/fg` | Color tone=success |
| `typ/warning/fg` | `status/warning/fg` | Color tone=warning |
| `typ/critical/fg` | `status/error/fg` | Color tone=critical |
| `typ/info/fg` | `status/info/fg` | Color tone=info |
| `typ/weight/regular` | `type/weight-regular` | Font weight 400 |
| `typ/weight/medium` | `type/weight-medium` | Font weight 500 |
| `typ/weight/semibold` | `type/weight-semibold` | Font weight 600 |
| `typ/weight/bold` | `type/weight-bold` | Font weight 700 |
| `typ/display/tracking` | `type/tracking-tight` | Letter-spacing -0.02em (display variants) |
| `typ/body/tracking` | `type/tracking-normal` | Letter-spacing 0 (resto de variants) |
| `typ/truncate/overflow` | `type/overflow-ellipsis` | Reglas CSS de truncación |

### Spacing specs

```
Escala tipográfica completa:

display-lg:   48px / 56px lh / weight 700 / tracking -0.02em
display-md:   40px / 48px lh / weight 700 / tracking -0.02em
heading-xl:   32px / 40px lh / weight 700
heading-lg:   24px / 32px lh / weight 600
heading-md:   20px / 28px lh / weight 600
heading-sm:   18px / 24px lh / weight 600
heading-xs:   16px / 20px lh / weight 600
body-lg:      16px / 24px lh / weight 400
body-md:      14px / 20px lh / weight 400
body-sm:      13px / 18px lh / weight 400
body-xs:      12px / 16px lh / weight 400
label-md:     14px / 20px lh / weight 500
label-sm:     12px / 16px lh / weight 500
caption:      11px / 14px lh / weight 400

Tones de color (aproximaciones hex):
primary:   #121213 (text/primary)
secondary: #6B738A (text/secondary)
subtlest:  #8C8C99 (text/subtlest)
disabled:  #B8B8BF (text/disabled)
inverse:   #FFFFFF (text/inverse)
success:   #0E8C37 (status/success/fg)
warning:   #B87A0D (status/warning/fg)
critical:  #DC2626 (status/error/fg)
info:      #2659EB (status/info/fg)

Truncate:
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

Frame count en Figma:
  14 frames base (uno por Variant)
  Tone/Weight/Align/Truncate = properties de instance, NO frames adicionales
  Total: 14 frames (sin multiplicar por combinaciones)
```
