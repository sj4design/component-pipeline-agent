# CodeBlock

## Overview

CodeBlock es un contenedor estilizado para mostrar fragmentos de código fuente con syntax highlighting, numeración de líneas, y un botón de copia al portapapeles. Está diseñado para documentación técnica, developer tools, tutoriales y cualquier contexto donde el usuario necesita leer código y probablemente copiarlo. El componente soporta dos themes (light/dark), dos sizes (sm/md), y configuración granular de features opcionales (header con nombre de archivo, tag de lenguaje, botón de copia, y columna de números de línea).

**Distinción importante**: CodeBlock es para bloques de código multi-línea (`<pre><code>`). Para código inline dentro de texto corriente (nombres de props, valores, expresiones), usar el componente `Code` inline — son semánticamente diferentes y no intercambiables.

```
Theme=dark, Size=md, con todos los slots activos:

┌──────────────────────────────────────────────┐
│  example.js          [javascript]      [📋]  │  ← header
├──────────────────────────────────────────────┤
│  1  │  import { Button } from '@ui/core';   │
│  2  │                                        │  ← code (con line numbers)
│  3  │  function App() {                      │
│  4  │    return (                            │
│  5  │      <Button variant="primary">       │
│  6  │        Click me                        │
│  7  │      </Button>                         │
│  8  │    );                                  │
│  9  │  }                                     │
└──────────────────────────────────────────────┘
 ↑           ↑                            ↑
lineNumbers  code (text monospace)        copyButton (top-right)

Theme=light, básico (sin header, sin line numbers):
┌──────────────────────────────────────┐ [📋]
│                                      │
│  npm install @company/ui             │
│                                      │
└──────────────────────────────────────┘

Copy button — estados:
  [📋] default   →   [✓ Copiado] success (3s)   →   [📋] reset
```

El syntax highlighting es responsabilidad de la implementación (Prism, Shiki, highlight.js) — en Figma el código se muestra en color uniforme. El token `cb/font/family` mapea a una fuente monospace (SF Mono, Menlo, Consolas, Courier New).

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Theme:       light | dark
Size:        sm | md
LineNumbers: no | yes
Wrap:        no | yes
```

Toggles (show/hide parts — do NOT generate extra variants):

```
👁 Show Header        → header layer (filename + language tag + copy)
👁 Show Copy Button   → copyButton layer
👁 Show Language Tag  → languageTag layer
👁 Show Line Numbers  → lineNumbers layer
```

### Figma properties panel

```
╔══════════════════════════════════════╗
║  CodeBlock                           ║
╠══════════════════════════════════════╣
║  Theme        [dark ▾]               ║
║  Size         [md ▾]                 ║
║  LineNumbers  [no ▾]                 ║
║  Wrap         [no ▾]                 ║
╠══════════════════════════════════════╣
║  👁 Show Header         [ ]          ║
║  👁 Show Copy Button    [✓]          ║
║  👁 Show Language Tag   [ ]          ║
║  👁 Show Line Numbers   [ ]          ║
╠══════════════════════════════════════╣
║  ✏️ Code          [const foo = 'bar']║
║  ✏️ Filename      [example.js]       ║
║  🔄 Language Tag  [Tag/javascript]   ║
╚══════════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿Necesitas mostrar código en la UI?
│
├── ¿Es una expresión o nombre inline dentro de texto?
│   └── NO usar CodeBlock → usar Code inline (<code>)
│
├── ¿Es un bloque de código multi-línea?
│   └── SÍ → CodeBlock
│
├── ¿El contexto es documentación técnica con referencias de línea?
│   └── SÍ → CodeBlock con LineNumbers=yes
│
├── ¿El usuario necesita copiar el código para usarlo?
│   └── SÍ → CodeBlock con Show Copy Button=true (default)
│
├── ¿El código tiene nombre de archivo o lenguaje conocido?
│   └── SÍ → CodeBlock con Show Header=true + Language Tag
│
└── ¿Es un editor de código donde el usuario escribe?
    └── NO usar CodeBlock → usar un editor (Monaco, CodeMirror)
```

**Use CodeBlock when:**
- Mostrando ejemplos de código en documentación técnica, tutoriales, o API reference
- El código fuente es de lectura — el usuario necesita leer y/o copiar, no editar
- El contexto es developer tools, consolas de error, o stack traces
- El código tiene un nombre de archivo o lenguaje identificable que agrega contexto
- La length del código requiere números de línea para referencias ("corrije la línea 42")

**Do NOT use CodeBlock when:**
- El código es inline dentro de prosa: "usa el componente `<Button>` para acciones primarias" — usar `Code` inline
- El usuario necesita editar el código — usar un editor de código (Monaco, CodeMirror)
- Es una sola variable o valor de configuración muy corto que cabe en una línea sin contexto extra — puede ser suficiente `Code` inline
- El contenido es un error o stack trace simple de una línea — puede ser suficiente Typography monospace

---

## Visual variations

### Theme

**Theme=light**
Background `surface/pressed` (muy ligeramente gris, rgba(0.97, 0.97, 0.98)), texto `text/primary` (casi negro). Header background ligeramente más oscuro `surface/hover`. Border sutil `border/default`. Integra con la UI light mode estándar.

**Theme=dark**
Background casi negro `surface/inverse` (rgba(0.11, 0.11, 0.13)), texto casi blanco `text/onInverse` (rgba(0.92, 0.92, 0.94)). Header background `surface/hover` del dark (rgba(0.16, 0.16, 0.18)). Border oscuro. El theme dark puede usarse independientemente del modo del sistema — muchos developers prefieren ver el código en dark sin cambiar toda la UI. Ofrece mejor contraste para los colores de syntax highlighting.

### Sizes

| Size | fontSize | lineHeight | padding | headerH |
|------|----------|-----------|---------|---------|
| sm   | 12px     | 18px      | 12px    | 32px    |
| md   | 13px     | 20px      | 16px    | 40px    |

Ambos sizes usan fuente monospace. La diferencia es principalmente para contextos compactos (sm para chat, sidebars) vs. contextos estándar (md para documentación).

### LineNumbers=yes
Columna adicional a la izquierda con los números de línea. Color `text/subtlest` en light, `text/secondary` en dark — diferenciados del texto de código pero visibles. `aria-hidden="true"` en la columna — los números son decorativos (el SR lee el código, no los números). `user-select: none` para que no sean incluidos en operaciones de copy-paste manual.

### Wrap=yes vs. no
**Wrap=no** (default): Líneas largas hacen scroll horizontal. El contenedor tiene `overflow-x: auto`. Requiere `tabindex=0` para keyboard scroll.

**Wrap=yes**: Líneas largas hacen wrap a la siguiente visual-line. Los números de línea (si están activos) permanecen en la línea lógica — importante para mantener la coherencia de las referencias de línea.

### Header (cuando Show Header=true)
Barra superior con: nombre de archivo a la izquierda, language tag en el medio (o a la derecha del filename), y botón de copia a la derecha. El header tiene un background ligeramente diferente al cuerpo para crear separación visual. Altura fija sm=32px / md=40px.

### Copy button — estados
**default**: Ícono de clipboard/copiar. Con tooltip "Copiar código" al hover.
**hover**: Highlight del botón (surface/hover o highlight con opacity).
**success** (post-copy): Ícono de check + texto "Copiado" (si hay espacio) durante ~3 segundos. `aria-live="polite"` anuncia la confirmación para SR.
**reset**: Vuelve al estado default automáticamente.

---

## Design decisions

### 1. Theme light/dark como propiedad independiente del sistema

**Why:** Los code blocks frecuentemente se muestran en dark theme independientemente del modo de color de la UI — es una preferencia de developer y ofrece mejor contraste para los colores de syntax highlighting (fondo oscuro permite rojos, verdes y amarillos más saturados sin perder legibilidad). Una propiedad `Theme` explícita permite al diseñador controlar esto sin dependencia del modo de color global.

**Tradeoff:** Requiere que el equipo de implementación gestione el theming del syntax highlighter de forma independiente del dark mode del sistema. Mantine's enfoque de theme-aware automático es más elegante pero requiere integración profunda con el sistema de tokens.

### 2. Copy button first-class con feedback accesible

**Why:** El copy-to-clipboard es la acción primaria del usuario para cualquier code snippet — el usuario lee para entender, luego copia para usar. Carbon lo modela como comportamiento esencial (no opt-out por default), no una feature opcional. El `aria-live="polite"` que anuncia "Copiado" es el paso más frecuentemente omitido en implementaciones — sin él, los usuarios de screen reader no reciben confirmación de que la copia fue exitosa.

**Tradeoff:** El ícono de check post-copy es visual-only si no hay `aria-live`. En Figma el estado "success" del botón es un frame de variante — la implementación debe gestionar el timeout de 3 segundos y el reset al estado default.

### 3. Syntax highlighting es runtime, no modelado en Figma

**Why:** Prism, Shiki o highlight.js aplican colores semánticos según el tipo de token (keywords azul, strings verde, comments gris, etc.) en el browser o en build time. Replicar este sistema de colores en Figma requeriría N estilos de texto por tipo de token, y se desactualizaría con los temas de syntax. En Figma el código se muestra en el color uniforme del theme (fg del theme). El rendering final tiene highlighting.

**Tradeoff:** La diferencia entre el diseño en Figma y el output en código puede ser sorprendente para quienes no conocen esta convención. La documentación debe dejarlo explícito: "El syntax highlighting es responsabilidad de la implementación. En Figma, el código se muestra en color uniforme."

### 4. Line numbers con aria-hidden y user-select: none

**Why:** Los números de línea son puramente decorativos para el contenido del código. Si un screen reader los leyera, el output sería "1 const foo 2 const bar" en lugar de "const foo const bar" — completamente ilegible. `user-select: none` es igualmente crítico: sin él, una operación de Ctrl+A + Ctrl+C incluiría los números de línea en el clipboard → "1 const foo = 2 2 const bar = 3" en lugar del código limpio.

**Tradeoff:** Los números de línea deben estar en elementos HTML separados del código (spans o una columna de tabla), no concatenados con el texto. Esto añade complejidad al markup pero es el único enfoque correcto.

### Excluded combinations

```
(No hay exclusiones en CodeBlock — todas las combinaciones son válidas)
Nota: Theme(2) × Size(2) × LineNumbers(2) × Wrap(2) = 16 frames totales
```

---

## Behavior

### Essential for design

**Scroll horizontal con teclado**: Cuando el código es más ancho que el contenedor (Wrap=no), el bloque necesita `tabindex="0"` para ser alcanzable por teclado, permitiendo que el usuario use Arrow keys para scrollear horizontalmente. Sin esto, el usuario de teclado solo ve las primeras N columnas.

**Copy con confirmación**: Al hacer click en el botón de copia, el código completo (sin números de línea) va al clipboard. El botón muestra el estado de éxito (~3 segundos) y luego reseteará. Una región `aria-live="polite"` anuncia "Copiado al portapapeles" para usuarios de screen reader.

**Header como contexto**: Cuando el filename está en el header, el usuario entiende de inmediato el contexto del snippet sin leer el código. El language tag comunica el lenguaje sin que el usuario deba reconocer la sintaxis.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Container (scrollable) | `region` | `tabindex="0"`, `aria-label="Código [lenguaje]: [descripción]"` | Permite keyboard scroll; region da nombre semántico |
| Pre/code element | heredado (`<pre><code>`) | `class="language-javascript"` (o el lenguaje) | Semántica HTML nativa; clase para syntax highlighter |
| Copy button | `button` | `aria-label="Copiar código"` | Nombre accesible para SR |
| Copy confirmation | live region | `aria-live="polite"`, texto oculto visualmente que dice "Copiado al portapapeles" | SR anuncia el éxito de la copia |
| Line numbers | presentacional | `aria-hidden="true"`, `user-select: none` | Decorativos; no deben ser leídos ni copiados |
| Language tag | informacional | Sin rol especial; el texto "javascript" es suficiente | El SR lee el texto del tag |
| Header container | contenedor | Sin rol especial — es un visual container | El contexto del region es suficiente |

### Keyboard navigation

Primary interactions (affect design):

```
Tecla          | Acción                                    | Focus target
────────────── | ─────────────────────────────────────────  | ──────────────
Tab            | Mueve al copy button (o al code block)    | copyButton
Enter / Space  | Activa copy button → copia código         | copyButton (permanece)
Arrow Keys     | Scroll del code block (si tiene focus)    | code block
Home / End     | Inicio / fin de línea (scroll horizontal) | code block
```

Secondary interactions (dev reference):

```
Ctrl+A (en code block focuseado)  → selecciona solo el texto de código
Triple-click                       → selecciona una línea
Ctrl+C / Cmd+C                    → copia selección manual (alternativa al copy button)
```

**Focus management:**
- Tab llegará al copy button si está visible — es el único elemento interactivo del componente
- El code block tiene `tabindex=0` si su contenido hace overflow (scroll necesario)
- No hay focus trap — Tab sale del componente naturalmente al siguiente elemento

---

## Content guide

### code (slot required)
El código debe ser exactamente el código a mostrar — sin escapado manual de HTML, sin caracteres especiales en el texto de Figma. En Figma el valor por defecto es `const foo = 'bar';`. En producción el contenido viene del sistema.

Usar código real representativo, no "lorem ipsum" técnico. Si el snippet es para documentación de un componente, mostrar el uso más común, no el uso más complejo.

### header / filename
Usar el nombre real del archivo cuando se conoce: `component.tsx`, `styles.css`, `config.json`. Sin path completo — solo el filename con extensión. Si no hay filename relevante, no mostrar el header y confiar en el language tag solo.

Correcto: `Button.tsx`
Incorrecto: `src/components/ui/Button/Button.tsx`

### languageTag
Usar el nombre canónico del lenguaje en minúsculas: `javascript`, `typescript`, `python`, `css`, `json`, `bash`, `yaml`, `html`. No usar abreviaciones no estándar (`js` vs `javascript` — preferir el nombre completo). El language tag debe coincidir con el `language` prop que el syntax highlighter usará.

### copyButton
Sin texto visible — solo ícono. El aria-label provee el nombre accesible "Copiar código". El estado de success puede mostrar texto breve "Copiado" si hay espacio en el header. El ícono de clipboard es universalmente reconocible para este patrón.

---

## Pre-build checklist

```
Estructura
□ 16 frames: Theme(2) × Size(2) × LineNumbers(2) × Wrap(2) = 16
□ Theme=dark: bg=surface/inverse (#1C1C21), fg=text/onInverse (#EBEBF0)
□ Theme=light: bg=surface/pressed (#F7F7F9), fg=text/primary (#1E1E21)
□ Font family: monospace (SF Mono / Menlo / Consolas — no proportional)

Slots
□ header layer: filename + languageTag + copyButton en una barra
□ lineNumbers layer: aria-hidden="true" documentado en spec; user-select:none
□ code layer: contenido en monospace, lineHeight correcto (18px sm / 20px md)
□ copyButton: estados default + hover + success (check icon) en Figma

Sizes
□ sm: fontSize=12px, lineHeight=18px, padding=12px, headerH=32px
□ md: fontSize=13px, lineHeight=20px, padding=16px, headerH=40px

A11y
□ Copy button: aria-label="Copiar código" documentado
□ aria-live="polite" para confirmación de copia documentado en spec
□ code block scrollable: tabindex=0 + role="region" + aria-label documentados
□ Line numbers: aria-hidden="true" + user-select:none documentados
□ Header copy button vs. floating copy button: posición consistente (top-right)

Tokens
□ Todos los colores vinculados a tokens semánticos
□ prefix cb- en todas las variables
□ cb/font/family = type/mono token
□ cb/dark/bg ≠ cb/light/bg (values distintos)
```

---

## Related components

```
Componente       | Cuándo usar ESTE en lugar de CodeBlock
────────────────────────────────────────────────────────────────────────
Code (inline)    | Expresión, nombre de prop, o valor corto dentro de texto;
                 | semánticamente <code>, no <pre><code>

Typography mono  | Texto técnico no-código (IDs, SKUs, hashes) que necesita
                 | fuente monospace pero sin las affordances de un code block

Monaco / Editor  | El usuario necesita EDITAR el código, no solo leerlo;
                 | code blocks son read-only

Terminal/Console | Output de comandos con prompts y respuestas;
                 | patrón diferente (fondo más oscuro, sin copy del output)
```

---

## Reference: how other systems do it

### Atlassian
El sistema más feature-complete en Tier 1 (41/50 puntos). Built-in Prism.js con Atlassian custom theme para 30+ lenguajes. Line numbers on by default — refleja el contexto de developer tools (Jira, Confluence, Bitbucket) donde "ve la línea 47" es una instrucción cotidiana. La prop `highlight` (`"1-3,5"` para resaltar líneas 1, 2, 3 y 5) convierte el code block de display a teaching tool — imprescindible para documentación técnica y tutoriales. Separación explícita entre `Code` (inline, `<code>`) y `CodeBlock` (block, `<pre><code>`) que mapea directamente a la semántica HTML. Gap documentado: los highlighted lines no tienen ARIA equivalente en ningún sistema.

### Carbon (IBM)
La taxonomía de tipos más clara del corpus (31/40 puntos para el container sin highlighting). Carbon CodeSnippet define tres tipos explícitos: `inline` (expresión dentro de texto), `single` (una línea con copy), `multi` (multi-línea con copy y show-more). La distinción no es cosmética — cada tipo tiene behavior distinto. Copy button built-in en todos los block types: Carbon lo considera comportamiento esencial (no opt-out). Sin syntax highlighting por diseño: Carbon separa container/behavior (CodeSnippet) de rendering (third-party), manteniendo el componente enfocado y el bundle pequeño. `maxCollapsedNumberOfRows` con expand toggle para code blocks largos — feature de UX significativa para documentación extensa con config files o respuestas de API.

### Twilio Paste
La implementación más completa de Tier 2 (40/50 puntos). Syntax highlighting via Prism (30+ lenguajes). Line numbers toggle. Copy button built-in. External link button único en el corpus — enlaza al source completo del snippet para contextos de API reference donde el usuario quiere ver el código completo, no solo el extracto. Dos variantes: single-line y multi-line. `InlineCode` como componente separado. Copy confirmation via aria-live correctamente implementado — uno de los pocos sistemas que documenta esto explícitamente.

### Mantine
El sistema con la implementación más completa en todos los tiers (41/50 puntos). Tres componentes en jerarquía clara: `Code` (inline/block básico sin highlighting), `CodeHighlight` (single block con syntax highlighting via highlight.js, copy default-on, language label), y `CodeHighlightTabs` — el único en los 24 sistemas que productiza el tabbed multi-snippet display. `CodeHighlightTabs` resuelve el patrón universal de documentación: mostrar el mismo ejemplo en múltiples lenguajes (`npm/yarn/pnpm`) o archivos relacionados (component + styles + test). Theme-aware automático con el sistema de dark mode de Mantine. ARIA tabs pattern completo en CodeHighlightTabs: `role="tablist"`, `role="tab"` + `aria-selected`, `role="tabpanel"` + `aria-labelledby`.

### GOV.UK
El extremo del espectro: CSS-only, sin JavaScript, progressive enhancement (no en el scoring por scope distinto). Stylea `<pre><code>` con CSS puro — monospaced font, background color, left-border inset. Sin syntax highlighting, sin copy button, sin line numbers. Funciona en cualquier browser y con cualquier assistive technology sin configuración. La justificación: los servicios de gobierno deben funcionar incluso con JavaScript deshabilitado. Establece el baseline mínimo que cualquier implementación debe superar.

---

## Tokens

**14 tokens** · prefix `cb-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `cb/light/bg` | `surface/pressed` | Background del code block en theme light |
| `cb/light/fg` | `text/primary` | Texto del código en theme light |
| `cb/light/headerBg` | `surface/hover` | Background del header en theme light |
| `cb/dark/bg` | `surface/inverse` | Background del code block en theme dark |
| `cb/dark/fg` | `text/onInverse` | Texto del código en theme dark |
| `cb/border` | `border/default` | Border del contenedor en ambos themes |
| `cb/radius` | `radius/md` | Border radius del contenedor (4px) |
| `cb/sm/fontSize` | `type/xs` | Font size en size sm (12px) |
| `cb/md/fontSize` | `type/sm` | Font size en size md (13px) |
| `cb/sm/padding` | `spacing/3` | Padding interno en size sm (12px) |
| `cb/md/padding` | `spacing/4` | Padding interno en size md (16px) |
| `cb/lineNumber/fg` | `text/subtlest` | Color de los números de línea |
| `cb/font/family` | `type/mono` | Familia tipográfica monospace |
| `cb/copySuccess/fg` | `status/success/fg` | Color del check icon en copy success |

### Spacing specs

```
Container:
  border-radius: radius/md (4px)
  border: 1px solid border/default
  overflow-x: auto (Wrap=no) / visible (Wrap=yes)
  tabindex: 0 si overflow activo

Header (cuando visible):
  height: sm=32px / md=40px
  padding: 0 12px (sm) / 0 16px (md)
  border-bottom: 1px solid border/default (separa header del code)
  display: flex, align-items: center, justify-content: space-between

Code area:
  padding: 12px (sm) / 16px (md) — todos los lados
  font-family: type/mono (SF Mono, Menlo, Consolas, Courier New)
  font-size: type/xs = 12px (sm) / type/sm = 13px (md)
  line-height: 18px (sm) / 20px (md)
  tab-size: 2 (convención frontend) o 4 (Python, Java)

Line numbers column (cuando visible):
  min-width: 40px (sm) / 48px (md) — acomoda hasta 3 dígitos
  padding-right: 12px / 16px
  border-right: 1px solid border/default (sutil separador)
  user-select: none
  aria-hidden: true

Copy button:
  size: 28px × 28px (sm) / 32px × 32px (md)
  padding: 4px
  border-radius: radius/sm (2px)
  posición en header: flex-end
  posición flotante (sin header): top-right corner, margin 8px

Language tag:
  height: 20px (sm) / 24px (md)
  padding: 0 8px
  font-size: 11px (sm) / 12px (md)
  border-radius: radius/sm (2px)
```
