# Code Block — Component Research

**Date:** 2026-04-17
**Mode:** Max (all 24 systems, all patterns)
**Systems analyzed:** 24
**Systems with dedicated block-level code component:** 5 — Carbon, Atlassian, Twilio Paste, Mantine, Nord (CSS-only)
**Systems with inline code only:** 4 — Polaris, Ant Design, Chakra, Evergreen
**Systems without:** 15 — M3, Spectrum (CSS), Lightning (blueprint), Primer (internal only), shadcn (recipe), Playbook, Cedar, Wise, Dell, Radix, GOV.UK (CSS), Base Web, Fluent 2 (preview), Gestalt, Orbit
**Note:** GitHub.com's code display (line linking, blame, multi-file tabs) is the industry UX gold standard but is product-level, not a public DS component.

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | Fuera del scope de M3 — componentes de consumer/enterprise apps, no developer tools | Card + monospaced typography custom |
| Spectrum | Solo CSS-level (typography tokens + pre/code styling); doc sites usan Prism.js con Spectrum theme | Prism.js + CSS tokens custom |
| Polaris | Solo inline `Code`; merchant admin raramente necesita block-level code display | Custom implementation en product level |
| Ant Design | `Typography.Text code` (inline only); block-level usa react-syntax-highlighter tercero | react-syntax-highlighter + custom |
| Lightning | Blueprint/SLDS blueprint con Prism.js a nivel producto; sin componente web standalone | Prism.js product-level integration |
| GitHub Primer | No componente público; GitHub.com tiene gold standard pero es product-level | react-syntax-highlighter, Shiki |
| shadcn/ui | Recipe (no componente); pattern = `<pre>` styled + Shiki/react-syntax-highlighter | `<pre>` + Shiki community recipe |
| Playbook | Sin use case de developer content | Sin workaround documented |
| Cedar | Retail scope; sin developer content needs | Sin workaround documented |
| Wise | Financial UI; no developer content | Sin workaround documented |
| Dell | Enterprise IT admin; standard content patterns | Sin workaround documented |
| Radix UI | Fuera del scope headless — focus en interactive behavior primitives | `Code` custom styled |
| Chakra UI | Solo `Code` inline; block = `Box as="pre"` + highlighter tercero | Box + react-syntax-highlighter |
| GOV.UK | CSS-only (`<pre><code>` con govuk styling); progressive enhancement = sin JavaScript | `<pre><code>` CSS styles |
| Base Web | Uber internal tools scope; sin code display | Sin workaround documented |
| Fluent 2 | No stable component (preview/community); VS Code usa Monaco (product-level) | Monaco Editor para code editing |
| Gestalt | Pinterest consumer product; sin developer content | Sin workaround documented |
| Evergreen | Solo `Code` inline; block = custom | Custom implementation |
| Orbit | Travel booking; sin developer content | Sin workaround documented |

---

## How Systems Solve It

### Atlassian — "El más feature-complete T1: Prism built-in + line numbers + line highlighting"

Atlassian CodeBlock es el más completo del corpus en Tier 1. Built-in Prism.js con Atlassian custom theme para 30+ languages. Line numbers **on by default** — refleja el contexto de developer tools (Jira issues, Confluence pages, Bitbucket code review) donde las referencias de línea son conversaciones cotidianas ("line 47 tiene el bug"). La **`highlight` prop** (ej: `"1-3,5"` para resaltar líneas 1,2,3 y 5) es esencial para code review y documentación — permite llamar atención a secciones específicas sin modificar el código. Separación explícita entre `Code` (inline) y `CodeBlock` (block) que mapea directamente a `<code>` vs `<pre><code>` semántico.

**Design Decisions:**
- **Built-in syntax highlighting (Prism bundled):** → simplifica dramáticamente el uso; el consumer solo pasa `language="javascript"` → a costo de mayor bundle size → **Para tu caso:** si el 90% de usos necesitan highlighting, bundled es más ergonómico; si pocos usos son críticos, BYO-highlighter reduce bundle impacto
- **Line numbers on by default:** → en developer tools, las referencias de línea son conversacionales — "arrégla la línea 42" → tener que activar manualmente es friction innecesaria → **Para tu caso:** el default correcto depende del contexto; developer tools = on by default; documentation = on by default; marketing pages con code snippets = off
- **`highlight` prop con line ranges ("1-3,5"):** → la notación es familiar para cualquier developer que usa editores (VSCode, vim) → resaltar líneas es la feature que convierte un code block de "display" a "teaching tool" → **Para tu caso:** imprescindible para documentación técnica y tutoriales
- **Inline/Block como componentes separados:** → `Code` = `<code>` semántico inline; `CodeBlock` = `<pre><code>` semántico block → la separación refleja la semántica HTML y previene uso incorrecto → **Para tu caso:** dos componentes separados es la arquitectura más limpia

**Notable Props:** `CodeBlock`: `language`, `text`, `showLineNumbers` (default: true), `highlight: "1-3,5"`, `shouldWrapLongLines`; `Code`: children inline

**Accessibility:** `<pre><code>` con `aria-label`. Line numbers son presentacionales (no los lee el screen reader). Líneas highlighted tienen diferenciación visual pero sin ARIA equivalente (gap documentado). Focus management permite tab al code block.

---

### Carbon (IBM) — "La taxonomía de tipos más clara: inline / single / multi"

Carbon CodeSnippet define la taxonomía de tipos más explícita: `inline` (expresión dentro de texto), `single` (una línea con copy), `multi` (multi-línea con copy y show-more). Cada tipo tiene un visual treatment y behavior distintos — no son variantes de un mismo componente, son tres casos de uso formalizados. El copy button es **built-in en todos los block types** — Carbon lo considera comportamiento esencial, no opcional. `maxCollapsedNumberOfRows` con expand toggle para code blocks largos en documentación — una feature práctica que pocas sistemas abordan.

**Design Decisions:**
- **Tres tipos explícitos (inline/single/multi):** → la pregunta "¿qué tipo de código estoy mostrando?" tiene una respuesta clara en el API → previene el anti-patrón de usar multi-type para código de una sola línea → **Para tu caso:** la taxonomía de Carbon es el modelo más educativo; úsalo como base incluso si el API final usa variantes en lugar de tipos
- **Copy button built-in (no opt-out por default):** → copy es el primary user action para cualquier code snippet — el usuario lee para entender, luego copia para usar → quitar el copy button necesita una razón explícita → **Para tu caso:** copy button = on por default; `hideCopyButton` como opt-out
- **No syntax highlighting (by design):** → Carbon separa container/behavior (CodeSnippet) de rendering (third-party) → mantiene el componente enfocado y evita bundling un syntax engine → **Para tu caso:** considerar el tradeoff: bundled highlighting = ergonomía; BYO = control sobre bundle
- **Show more/less toggle para multi:** → los code blocks de documentación frecuentemente son largos; el collapse con expand toggle preserva el espacio visual sin truncar el contenido accesible → **Para tu caso:** incluir `maxCollapsedRows` con show-more es una feature de UX significativa para documentación

**Notable Props:** `type: "inline" | "single" | "multi"`, `copyButtonDescription`, `feedback` (copy confirmation text), `feedbackTimeout`, `maxCollapsedNumberOfRows`, `showMoreText`, `showLessText`, `hideCopyButton`, `wrapText`

**Accessibility:** Copy button con accessible label. Inline = `<button>` (copy on click) o `<code>` (display). Multi = `role="textbox"` con `aria-label`. Show more/less keyboard accessible. Tab to focus.

---

### Twilio Paste — "El más completo T2: bundled Prism + line numbers + external link"

Paste CodeBlock es la implementación más completa de Tier 2 y compite con Atlassian en Tier 1. Syntax highlighting via Prism (30+ languages). Line numbers toggle. Copy button built-in. External link button (unique — enlaza al source del snippet para contextos de API reference donde el usuario quiere ver el código completo). Dos variantes: single-line y multi-line. `InlineCode` como componente separado.

**Design Decisions:**
- **External link button:** → en documentación de API, el snippet es un ejemplo extractado; el link permite al developer ver el contexto completo → **Para tu caso:** incluir si el producto tiene snippets que son extractos de código fuente completo (API docs, GitHub integrations)

**Notable Props:** `language`, line numbers toggle, copy button, external link button, single/multi-line variants, `InlineCode` separate component

**Accessibility:** Copy button con `aria-label` y copy confirmation. Line numbers `aria-hidden`.

---

### Mantine — "El más completo de todos los tiers: Code + CodeHighlight + CodeHighlightTabs"

Mantine es el sistema con la implementación más completa de code block en todos los 24 sistemas. **Tres componentes en jerarquía clara:**
- `Code`: inline/block básico sin highlighting — el contenedor minimal
- `CodeHighlight`: single block con syntax highlighting (highlight.js), copy button built-in, language label
- `CodeHighlightTabs`: **ÚNICO** en todos los 24 sistemas — tabbed multi-snippet display donde cada tab tiene su propio language, file name e icon

`CodeHighlightTabs` resuelve el patrón más común en developer documentation: mostrar el mismo ejemplo en múltiples lenguajes (`npm install` / `yarn add` / `pnpm add`), o mostrar archivos relacionados (component + styles + test). Este patrón es universal pero ningún otro design system lo productiza como componente.

**Design Decisions:**
- **Tres componentes (Code/CodeHighlight/CodeHighlightTabs):** → capas de complejidad progresiva; el consumer usa solo lo que necesita; no hay bloat en el caso básico → **Para tu caso:** la jerarquía de tres niveles es el modelo más elegante para este componente
- **`CodeHighlightTabs` (tabbed multi-snippet):** → el pattern "npm/yarn/pnpm" + "JS/TS/JSX variants" es ubicuo en developer documentation → tener que componer esto manualmente cada vez es friction innecesaria → **Para tu caso:** si el sistema sirve documentación técnica, CodeHighlightTabs es la feature que más valor aporta
- **highlight.js (no Prism.js):** → highlight.js es más ligero (~30KB gzipped para el core) y simpler de integrar que Prism → la calidad de grammar es levemente menor que Prism pero suficiente para la mayoría de lenguajes → **Para tu caso:** para sitios estáticos/documentación, Shiki es la mejor opción moderna; para runtime, highlight.js es pragmático
- **Theme-aware (light/dark automático):** → Mantine's color scheme se aplica automáticamente al code block → sin necesidad de configurar temas separados → **Para tu caso:** integrar el code block en el sistema de theming/dark mode desde el inicio

**Notable Props:** `Code`: inline/block, `CodeHighlight`: `code`, `language`, copy button default-on, language label; `CodeHighlightTabs`: `code: [{ code, language, fileName, icon }][]`

**Accessibility:** Copy button con `aria-label` + copy confirmation tooltip. Tabs: `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`. Line numbers `aria-hidden`.

---

### Carbon Sequential Comparison — GitHub.com as UX Gold Standard

GitHub Primer no expone un componente público de code block, pero GitHub.com es el referente de UX más completo:
- **Line number linking:** click en número de línea → URL actualiza a `#L47`; shift-click → selección de rango `#L47-L52`
- **Blame annotations:** qué commit/autor modificó cada línea
- **Copy button:** top-right, copia solo el código (no números de línea)
- **Code folding:** collapse de funciones/bloques
- **Multi-file tabs:** en PRs y gists, múltiples archivos en tabs
- **Language detection automática:** 300+ lenguajes vía Linguist + Tree-sitter

Estos son targets de UX para cualquier design system que sirva developer content, aunque muchos son product-level concerns más que design system components.

---

### Nord (Nordhealth) — "Container sin highlighting para clinical codes"

Nord `nord-code-block` es CSS-only — container styling con monospaced font y border. Sin syntax highlighting. El contexto healthcare justifica el componente: clinical codes (ICD-10, SNOMED), API responses de sistemas EHR (HL7/FHIR), valores de configuración. El "código" en este contexto no es JavaScript — es data estructurada que necesita visual distinction.

---

### GOV.UK — "CSS-only, no JavaScript, progressive enhancement"

GOV.UK stylea `<pre><code>` con CSS puro — monospaced font, background color, left-border inset. Sin JavaScript, sin highlighting, sin copy button. Funciona en cualquier browser y con cualquier asistive technology por default. El caso extremo de progressive enhancement.

---

## Pipeline Hints

**Archetype recommendation:** `container`
Rationale: Code block es un container estilizado para contenido code con affordances opcionales (copy button, expand toggle). No es interactivo como form-control, no es nav, no tiene overlay. container es el archetype correcto.

**Slot consensus:** (5 sistemas con block-level code, incluyendo partial implementations)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| code-content | text | yes | 5/5 | `<pre><code>` semántico; el código mismo |
| toolbar/header | container | no | 4/5 | Contiene language-label + copy-button + external-link |
| language-label | text | no | 3/5 | Badge/text mostrando el lenguaje ("javascript", "python") |
| copy-button | icon-action | no | 4/5 | Copy-to-clipboard; top-right por convención; Carbon on-always, Atlassian no built-in |
| line-numbers | visual | no | 3/5 | Columna de números; Atlassian (on by default), Paste, Carbon |
| expand-toggle | icon-action | no | 1/5 | "Show more" / "Show less" para code blocks largos; Carbon only |
| tabs | container | no | 1/5 | Tabbed multi-snippet; Mantine CodeHighlightTabs only |
| external-link | icon-action | no | 1/5 | Enlace a source completo; Paste only |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| language | variant | string (js/python/etc) | 4/5 | Para syntax highlighting; "plain" si no hay highlighting |
| type/variant | variant | inline/single/multi/block | 2/5 | Carbon explicit (inline/single/multi); Atlassian (Code/CodeBlock) |
| showLineNumbers | boolean | true/false | 3/5 | Atlassian: on by default; Paste: optional; Carbon: N/A (no highlighting) |
| hasCopyButton | boolean | true/false | 4/5 | On by default en Carbon, Paste, Mantine; `hideCopyButton` opt-out en Carbon |
| maxCollapsedRows | variant | number | 1/5 | Carbon: collapse + show-more toggle |
| shouldWrapLines | boolean | true/false | 2/5 | Carbon `wrapText`, Atlassian `shouldWrapLongLines` |
| highlight | variant | string "1-3,5" | 1/5 | Atlassian: line ranges to highlight |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasCopyButton | 4/5 | true | On by default; `hideCopyButton` como opt-out (Carbon model) |
| showLineNumbers | 3/5 | varies | Atlassian=true, Paste=opt-in |
| hasLineHighlighting | 1/5 | false | Atlassian solo |
| isExpandable | 1/5 | false | Carbon show-more/less |
| wrapLines | 2/5 | false | Wrap long lines; false = horizontal scroll |
| hasLanguageLabel | 3/5 | true | Badge que indica el lenguaje |
| hasExternalLink | 1/5 | false | Paste: link a source completo |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 5/5 | Code visible con styling base | |
| copy-success | 4/5 | Button icon → check; tooltip "Copied!"; reverts after timeout | |
| copy-error | 1/5 | Button icon → error; Paste documented | |
| expanded | 1/5 | Code completo visible (Carbon multi, post show-more) | |
| collapsed | 1/5 | Primeras N líneas + show-more button | |
| hover (copy button) | 4/5 | Button highlight | |
| focus (copy button) | 4/5 | Focus ring + tooltip | Keyboard accessible |
| scrollable (overflow) | 3/5 | Horizontal scroll; tabindex=0 para keyboard | |
| focused (code block) | 3/5 | Outline para keyboard scroll de overflow content | |
| tab-active | 1/5 | Mantine CodeHighlightTabs tab activo | |

**Exclusion patterns found:**
- inline code × line numbers — números de línea son exclusivos de block code; inline nunca tiene números
- copy-button × read-only display — todos los sistemas con copy button lo incluyen en el block variant; inline rara vez necesita copy (copia con triple-click)

**Building block candidates:**
- toolbar → `.CodeBlockToolbar` — la barra superior con language-label + copy + external-link; Atlassian, Paste, Mantine la formalizan
- tabs → `.CodeBlockTabs` — Mantine `CodeHighlightTabs` como sub-componente

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| type | inline, single, multi | 2/5 | Carbon taxonomy; Atlassian = dos componentes |
| syntaxEngine | prism, highlightjs, shiki, none | varies | Atlassian=Prism, Mantine=HL.js, shadcn/Carbon=none (BYO) |

**A11y consensus:**
- Semantic HTML: `<pre><code>` para block; `<code>` para inline — universal
- Language: `class="language-javascript"` o `data-language="javascript"` en el `<code>` element — screen readers leen el texto plano, no tokens de color
- Copy button: `aria-label="Copy code"` + copy confirmation via `aria-live="polite"` o tooltip; success icon solo no es suficiente
- Line numbers: `aria-hidden="true"` + `user-select: none` — no deben ser leídos por screen readers ni seleccionados durante copy
- Long code blocks (overflow): `tabindex="0"` para keyboard scroll + `role="region"` + `aria-label` describiendo el contenido
- Syntax highlighting: puramente visual; screen readers leen el texto sin los tokens — correcto behavior
- Highlighted lines: actualmente un gap en todos los sistemas — no hay ARIA pattern establecido; considerar `aria-label` en el rango de líneas resaltadas
- Tabs (CodeHighlightTabs): standard ARIA tab pattern: `role="tablist"`, `role="tab"` + `aria-selected`, `role="tabpanel"` + `aria-labelledby`
- Copy confirmation: NO solo visual — el "Copied!" debe ser anunciado via `aria-live="polite"` o texto visualmente oculto

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template | Same component set |
| 40–70% | Extension | Same component set + property |
| < 40% | Separate | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Inline code | 0% (different element) | Separate | `<code>` inline, no copy, no line numbers | All systems (universal) |
| Single-line block | 100% | Template | One line, copy button, no line numbers needed | Carbon `single`, Paste single-line, Atlassian simple |
| Multi-line block | 85% | Template | Multiple lines, copy, optional line numbers | Carbon `multi`, Atlassian CodeBlock, Paste multi, Mantine |
| Block with syntax highlighting | 80% | Template | Same structure + Prism/HL.js/Shiki rendering | Atlassian, Paste, Mantine CodeHighlight |
| Block with line numbers | 75% | Template | Adds line number column | Atlassian (default), Paste opt-in |
| Block with line highlighting | 60% | Extension | Specific lines visually emphasized | Atlassian `highlight` prop |
| Block with expand/collapse | 60% | Extension | Max-height + show-more toggle | Carbon `maxCollapsedRows` |
| Tabbed multi-snippet | 10% | Extension | Multiple code snippets in tabs | Mantine CodeHighlightTabs |
| NOT a code block — Code editor | 0% | Not-code-block | Interactive editing; Monaco, CodeMirror are editors | VS Code, not DS component |

---

## What Everyone Agrees On

1. **`<pre><code>` semantic HTML:** Every system uses proper semantic HTML for block code. The `<pre>` preserves whitespace and line breaks; `<code>` indicates computer code. This is universal and correct.

2. **Copy button is expected behavior:** Every implementing system includes a copy button or strongly recommends one. Copy-to-clipboard is the primary user action for code blocks in documentation and developer tools.

3. **Inline code is a different component from block code:** All systems treat inline `<code>` and block `<pre><code>` as distinct, either via separate components or explicit type variants.

4. **Syntax highlighting is visual-only:** No system adds ARIA attributes to syntax-highlighted tokens. Screen readers read plain text, which is the correct behavior — adding ARIA to individual tokens would create noise.

5. **Line numbers should not be selectable:** All systems that include line numbers use CSS `user-select: none` and/or `aria-hidden="true"` to prevent line numbers from being copied or read aloud.

---

## Where They Disagree

**¿Syntax highlighting bundled o BYO-highlighter?**
- **Option A: Bundled (Atlassian=Prism, Paste=Prism, Mantine=HL.js)** — ergonomía máxima; el consumer solo pasa `language=`; a costo de mayor bundle
- **Option B: BYO-highlighter (Carbon, shadcn, GOV.UK)** — el consumer integra su propio Prism/Shiki/HL.js; control de bundle; más setup
- **Option C: Shiki para build-time** — generando HTML estático en build time; cero JS runtime; VS Code grammar parity — el estándar moderno para documentation sites
- **Para tu caso:** Para documentation sites: Shiki (build-time). Para apps con código dinámico (consolas, REPL): Prism/HL.js runtime. Para minimalismo: no built-in, BYO.

**¿Dos componentes (inline + block) o un componente con variants?**
- **Option A: Dos componentes** (Atlassian Code + CodeBlock, Paste InlineCode + CodeBlock, Mantine Code + CodeHighlight) — semántica clara; API optimizada por caso
- **Option B: Un componente con `type` prop** (Carbon inline/single/multi) — API unificada; más simple de aprender
- **Para tu caso:** Dos componentes es la arquitectura más limpia semánticamente; type prop funciona si el equipo prefiere menos componentes que aprender

**¿Line numbers on by default o opt-in?**
- **Option A: On by default** (Atlassian) — refleja contexto de developer tools; ahorrar friction
- **Option B: Opt-in** (Paste, Carbon no tienen highlighting en el mismo componente) — no todos los code snippets necesitan números; marketing pages con small snippets no necesitan números
- **Para tu caso:** Depende del contexto principal — si es documentation site, on by default; si el componente es para UI general con snippets ocasionales, opt-in

**¿Tabbed multi-snippet (CodeHighlightTabs) o composición manual?**
- **Option A: Built-in tab component** (Mantine CodeHighlightTabs) — ergonomía máxima para el pattern más común
- **Option B: Composición con Tabs** (todos los demás) — más flexible pero requiere más código
- **Para tu caso:** Si el producto es documentación técnica o developer tools, CodeHighlightTabs como componente formal vale la inversión

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Inline code | `<code>` monospaced inline en texto | Property names, valores, expresiones | All systems |
| Single-line block | Una línea + copy button | API keys, comandos, short expressions | Carbon single, Paste single |
| Multi-line block | Multiple líneas, scroll o wrap | Functions, classes, examples | Carbon multi, Atlassian, Paste, Mantine |
| Block con line numbers | Multi-line + columna de números | Tutoriales, code review, debugging | Atlassian (default), Paste |
| Block con line highlighting | Multi-line + líneas resaltadas | Tutorials step-by-step, diff highlights | Atlassian |
| Tabbed multi-snippet | Tabs con diferentes lenguajes/archivos | npm/yarn install commands, multi-language examples | Mantine CodeHighlightTabs |
| Collapsible long code | Multi-line + show-more toggle | Reference docs, large config files | Carbon maxCollapsedNumberOfRows |

**Inline code:**
```
Install the package using <npm install @mantine/core> in your terminal.
                             └──── inline <code> ────┘
```

**Single-line block (Carbon `single`):**
```
┌────────────────────────────────────────┐ [📋]
│  npm install @mantine/core             │
└────────────────────────────────────────┘
                                    copy btn (top-right)
```

**Multi-line block con line numbers (Atlassian):**
```
┌──────────────────────────────────────────────┐ [📋]
│  1  │ import { Button } from '@company/ui';  │
│  2  │                                        │
│  3  │ function App() {                        │  ← highlighted line
│  4  │   return <Button>Click me</Button>;    │
│  5  │ }                                      │
└──────────────────────────────────────────────┘
```

**Tabbed multi-snippet (Mantine CodeHighlightTabs):**
```
┌──────────────────────────────────────────────┐
│  [npm] [yarn] [pnpm]                         │
├──────────────────────────────────────────────┤
│  npm install @mantine/core @mantine/hooks    │ [📋]
└──────────────────────────────────────────────┘
```

**Collapsible long code (Carbon `multi` with maxCollapsedNumberOfRows):**
```
┌────────────────────────────────────┐ [📋]
│  function complexFunction() {      │
│    // line 1                       │
│    // line 2                       │
│    ...                             │
│  [Show 47 more lines ↓]           │
└────────────────────────────────────┘
```

---

## Risks to Consider

**Risk 1: Copy button sin confirmación accesible** (HIGH)
El "Copied!" tooltip o ícono de check solo son visibles — los screen reader users no saben si la copia fue exitosa.
**Mitigation:** `aria-live="polite"` region que anuncia "Copied to clipboard" al hacer copia. El timeout de reset (3-5 seg) debe también ser reflejado en el anuncio o silenciado para no causar dos anuncios.

**Risk 2: Scroll horizontal no alcanzable por teclado** (HIGH)
Code blocks con overflow horizontal que no tienen `tabindex="0"` no son scrolleables por teclado — el usuario de teclado solo ve las primeras N columnas de código.
**Mitigation:** `tabindex="0"` en el container scrolleable + `role="region"` + `aria-label="Code sample: [language]"`. Permite Arrow keys para scroll.

**Risk 3: Line numbers incluidos en copia del clipboard** (MEDIUM)
Si los números de línea no están en un elemento separado con `user-select: none`, el copy del código incluirá los números → "1 const x = 2 2 const y = 3" en lugar de "const x = 2\nconst y = 3".
**Mitigation:** Line numbers en elementos separados con `user-select: none`. El copy button debe copiar solo el contenido de `<code>`, no el wrapper completo.

**Risk 4: Bundle size de syntax highlighting** (MEDIUM)
Prism.js con todos los lenguajes = ~800KB. highlight.js core = ~50KB + lenguajes adicionales. Shiki = tree-shakeable pero setup más complejo. Bundling el highlight engine sin configurar code-splitting puede impactar significativamente el LCP.
**Mitigation:** Importar solo los lenguajes necesarios. Para documentation sites, usar Shiki con build-time rendering (cero JS en el browser para highlighting).

**Risk 5: Tema de highlighting no integrado con dark mode** (MEDIUM)
Si el syntax highlighter tiene su propio sistema de temas que no está integrado con el dark mode del design system, el code block se ve "roto" en dark mode — fondo claro con temas oscuros del sistema o viceversa.
**Mitigation:** Usar un highlighter que soporte `prefers-color-scheme` o integrar el theme switching programáticamente. Mantine's automático es el modelo correcto.

---

## Dimension Scores (sistemas CON block-level code)

| Sistema | A11y | Syntax Highlighting | Copy UX | Line Features | Completeness | Total |
|---------|------|---------------------|---------|---------------|--------------|-------|
| Mantine | 8 | 8 (HL.js) | 9 | 6 | 10 | **41/50** |
| Atlassian | 8 | 9 (Prism bundled) | 5 | 10 | 9 | **41/50** |
| Carbon | 9 | 0 (none) | 9 | 5 | 8 | **31/40**⭐ |
| Twilio Paste | 8 | 8 (Prism bundled) | 9 | 7 | 8 | **40/50** |
| Nord | 7 | 0 (none) | 0 | 0 | 4 | **11/50** |

---

## Next Steps

1. **`/spec code-block`** — Generate config.json with anatomy (inline + block variants, toolbar, line numbers, copy button)
2. **`/enrich code-block`** — Add a11y (copy confirmation aria-live, tabindex for scroll, line numbers aria-hidden)
3. **`/build code-block`** — Full pipeline in one command using this research as cache
4. **`/build code-block --max`** — Use pre-generated config without scope questions
5. **`/research code-block --fresh`** — Re-run research from scratch (bypasses this cache)

**Key spec decisions to make:**
- Syntax highlighting: bundled (Prism/HL.js) vs BYO vs none? If bundled: which engine?
- Inline + block as separate components (Atlassian/Mantine model) vs `type` prop (Carbon)?
- Line numbers: on by default (Atlassian) or opt-in?
- Include `CodeHighlightTabs` (tabbed multi-snippet) as a variant? Only if product is documentation/developer tools.
- Include collapse/expand for long blocks (`maxCollapsedRows`)?
- Dark mode: integrate with system color scheme token automatically?
