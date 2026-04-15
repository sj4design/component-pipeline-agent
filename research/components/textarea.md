# Textarea — Component Research

**Fecha:** 2026-04-10
**Modo:** --max (todas las variantes, todos los patrones)
**Sistemas analizados:** 24 (6 Tier 1 + 8 Tier 2 + 10 Tier 3)
**Scope:** Sin filtros — cobertura completa

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Material Design 3 | TextField unificado con prop `multiline` | `TextField multiline: true` — comparten visual language |
| Polaris | TextField unificado con prop `multiline` | `TextField multiline={true}` o `multiline={3}` para rows |
| Radix UI | No ofrece primitivo Textarea — elemento nativo suficiente | `<textarea>` directo con Radix Form para validacion |
| Cedar (REI) | CdrInput con modo multiline | `CdrInput` con prop multiline — mismo componente |

> **Nota:** M3 y Polaris NO carecen de soporte — lo resuelven desde TextField. La decision refleja que consideran single-line y multi-line como el mismo patron con diferente rendering.

---

## How Systems Solve It

### Spectrum (Adobe) — "Textarea dedicado con anatomia completa de campo"

Spectrum separa TextArea de TextField como componente independiente, reconociendo que multi-line tiene necesidades unicas: dimensionamiento por `rows`, resize behavior, y character counting son concerns que no aplican a single-line. El componente usa la anatomia estandar de campo de Spectrum: label (arriba o lateral), help text (description o error message), y character counter. No auto-crece por defecto — el contenido hace scroll cuando excede el area visible.

La variante `isQuiet` elimina los bordes para contextos de edicion inline (como editar una descripcion en un panel de detalle en Adobe apps). Validation se gestiona via el sistema de validacion de formularios de Spectrum con `validationState` y `errorMessage`. El approach fixed-height-by-default es una decision deliberada para evitar layout shift en formularios densos donde multiples textareas comparten espacio vertical.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Componente dedicado separado de TextField | Multi-line tiene resize, rows, character count — concerns ausentes en single-line | HIGH | Facilita API limpia; cada componente tiene solo los props que necesita |
| No auto-grow por defecto | Previene layout shift en formularios densos | HIGH | Mejor para formularios con multiples campos; scroll es predecible |
| `isQuiet` borderless variant | Edicion inline en paneles de detalle de Adobe apps | MED | Util si necesitas textarea en contextos no-formulario (wikis, CMS) |

**Notable Props:** `label`, `description`, `errorMessage`, `isQuiet`, `isRequired`, `isDisabled`, `isReadOnly`, `maxLength`, `validationState`, `rows`.
**A11y:** Label via `aria-labelledby`. Description/error via `aria-describedby`. `aria-invalid="true"` en error. Character count sin `aria-live` — responsabilidad del consumer.

---

### Carbon (IBM) — "Counter progresivo con estados de advertencia"

Carbon ofrece un TextArea standalone con control explicito de `rows` y un character counter opt-in que cambia de color conforme se acerca al limite. `enableCounter` + `maxCount` activan el display "current/max". El componente soporta `light` variant para uso sobre fondos `$layer-01` — reflejo del modelo de capas de Carbon donde cada superficie tiene un nivel de fondo que dicta la variante del componente encima.

El approach de Carbon enfatiza predictibilidad: no hay auto-resize, el developer define `rows` y el contenido scrollea. El counter progresivo es la innovacion mas notable — cambia de neutral a warning conforme se acerca al limite, dando feedback visual gradual antes de llegar al maximo.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Counter con estados progresivos de warning | Feedback gradual reduce errores de truncacion | HIGH | Excelente para campos con limite estricto (mensajes, bios) |
| `light` variant | Modelo de capas de Carbon requiere variante explicita segun fondo | MED | Solo relevante si tu DS tiene capas de superficie |
| No auto-resize | Control preciso de layout en dashboards IBM | MED | Consistente con approach fixed-height de Spectrum |

**Notable Props:** `rows`, `maxCount`, `enableCounter`, `helperText`, `warnText`, `invalidText`, `invalid`, `warn`, `light`, `hideLabel`.
**A11y:** Label via `htmlFor`/`id`. Helper/warning/error via `aria-describedby`. `aria-invalid` en error. `hideLabel` visualmente oculto pero accesible. Counter sin `aria-live`.

---

### Atlassian — "Smart resize: crece pero nunca encoge"

Atlassian tiene `@atlaskit/textarea` como paquete independiente de `@atlaskit/textfield`, con cinco modos de resize que son la feature mas sofisticada del ecosistema. `smart` es el modo estrella: auto-crece verticalmente pero nunca encoge, evitando el bounce de layout que frustra usuarios cuando borran texto. Los otros modos cubren todos los escenarios: `auto` (crece y encoge), `vertical` (draggable por el usuario), `horizontal`, y `none` (fijo).

La variante `subtle` (borderless hasta hover/focus) habilita el patron de edicion inline en Jira — donde descripciones y comentarios se editan in-place sin navegar a otra pagina. `isCompact` reduce la altura para contextos densos. `isMonospaced` soporta campos de code/log donde la tipografia monoespaciada es critica.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| 5 modos de resize incluyendo `smart` | `smart` previene layout bounce — el problema mas frustrante de auto-resize | HIGH | Usa `smart` como default si implementas auto-resize |
| `subtle` appearance (borderless) | Edicion inline en Jira detail views | MED | Equivalente a `isQuiet` de Spectrum — mismo patron |
| `isMonospaced` boolean | Campos de codigo/logs en Jira y Bitbucket | LOW | Solo si necesitas textareas de codigo |

**Notable Props:** `resize` (5 values), `appearance` (standard/subtle/none), `isCompact`, `isMonospaced`, `isDisabled`, `isInvalid`, `isRequired`, `minimumRows`, `maxHeight`.
**A11y:** `<textarea>` nativo. `aria-invalid` en error. Label manejado por consumer (Form component). Sin character counter built-in.

---

### Ant Design — "autoSize con minRows/maxRows: la API mas clara"

Ant Design's `Input.TextArea` es sub-componente de Input, compartiendo el sistema de status (`error`/`warning`) y la integracion con Form. El feature definitorio es `autoSize: { minRows, maxRows }` — la API mas explicita para auto-resize acotado. El field crece desde `minRows` hasta `maxRows` y luego scrollea. `showCount` con `formatter` permite displays localizados del contador ("5/100 palabras" en vez de "25/100 caracteres").

La decision de hacer TextArea un sub-componente de Input (en vez de componente independiente) mantiene una superficie de API consistente: todos los inputs comparten `status`, `prefix`, `suffix`, y Form integration. El tradeoff es discoverability — developers deben buscar `Input.TextArea`, no `TextArea`.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| `autoSize: { minRows, maxRows }` | API explicita para auto-resize acotado — boundaries claros | HIGH | Estandar de facto para bounded auto-resize |
| Sub-componente de Input | API consistente con Input (status, prefix/suffix, Form) | MED | Reduce API surface pero afecta discoverability |
| `showCount` con `formatter` | Displays localizados/custom del contador | MED | Necesario si soportas multiples idiomas |

**Notable Props:** `autoSize`, `showCount`, `maxLength`, `status`, `allowClear`, `rows`, `disabled`, `readOnly`, `bordered`.
**A11y:** `<textarea>` nativo. `aria-valuemax` con `maxLength`. Counter visual — sin `aria-live`. Error via Form `aria-describedby`.

---

### Polaris (Shopify) — "Bounded auto-resize via maxHeight"

Polaris no tiene componente Textarea separado — usa `TextField multiline`. Cuando `multiline={true}`, auto-crece sin limite. Cuando `multiline={3}`, establece rows iniciales. `maxHeight` acota el crecimiento en pixeles, creando bounded auto-resize. Character count via `showCharacterCount` + `maxLength` muestra "X of Y characters used" con texto accesible para screen readers.

El approach unificado de Polaris (TextField para todo) refleja su filosofia de API minima para merchants de Shopify. El tradeoff: `maxHeight` en pixeles es menos intuitivo que `maxRows` en numero de filas (Ant Design).

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| `maxHeight` para acotar auto-resize | Bounded auto-grow sin componente separado | HIGH | Menos intuitivo que `maxRows` pero funcional |
| Character count accesible ("X of Y characters used") | Unico Tier 1 con texto de counter SR-friendly | MED | Adopta este pattern para accesibilidad |
| TextField unificado | API minima, discoverability via docs | MED | Solo si tu TextField ya maneja multi-line |

**Notable Props:** `multiline`, `maxHeight`, `showCharacterCount`, `maxLength`, `helpText`, `error`, `label`, `labelHidden`, `disabled`, `readOnly`.
**A11y:** Label via `htmlFor`. Error/help via `aria-describedby`. `aria-invalid` en error. Character count SR-accessible.

---

### M3 (Google) — "TextField unificado: single-line y multi-line son uno"

M3 no tiene Textarea. TextField con `multiline: true` renderiza un area multi-linea. Ambos estilos (Filled y Outlined) aplican. El crecimiento es content-driven sin API explicita de `rows` o `maxRows` — equipos implementan scroll constraints por su cuenta. Character counter es sub-componente posicionado abajo del campo, visible solo con `maxLength`.

La unificacion es la decision mas agresiva: un solo componente para todos los inputs de texto. Reduce component count pero oculta la capacidad multi-line detras de configuracion. El tradeoff: designers deben configurar correctamente `multiline` en Figma para ver la diferencia visual.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Un solo TextField para todo | Reduce component count, visual language unificado | HIGH | Solo viable si tu TextField ya es robusto |
| Auto-grow solo (sin rows/maxRows API) | Simplicidad — deja constraints al implementador | MED | Riesgo de layout shift sin boundaries |
| Counter como sub-componente | Solo visible con `maxLength` — zero visual overhead sin limite | MED | Buen patron para counter opt-in |

**Notable Props:** `multiline: true`, `maxLength`, `supportingText`, `isError`.
**A11y:** `aria-multiline="true"`. Supporting text via `aria-describedby`. `aria-invalid` en error. Counter sin `aria-live`.

---

### Twilio Paste — "Composicion de campo con primitivos separados"

Paste ofrece TextArea dedicado pero sin auto-resize. Se integra con Label, HelpText, y form primitives de Paste. El approach es composicional: cada pieza del field (label, input, helper, error) es un primitivo separado que el developer ensambla.

**Notable Props:** Dedicado, `rows`, sin auto-resize. Composicion con Label + HelpText.
**A11y:** Label via primitives. Helper/error via `aria-describedby`.

---

### Salesforce Lightning — "Character counter con validacion de largo"

Lightning textarea incluye `max-length` con character counter y `message-when-too-long` para validacion. Parte de la familia de form elements.

**Notable Props:** `max-length`, character counter, `message-when-too-long`.
**A11y:** Estandar SLDS.

---

### GitHub Primer — "resize + validationStatus + block width"

Primer tiene Textarea dedicado con `resize` prop, `block` (full-width), y `validationStatus` para error/success/warning. Soporta `rows`. Auto-resize via CSS/sx.

**Notable Props:** `resize`, `block`, `validationStatus`, `rows`.
**A11y:** `validationStatus` auto-configura ARIA.

---

### shadcn/ui — "Wrapper minimo: HTML textarea con Tailwind"

Wrapper thin sobre `<textarea>` nativo. Sin auto-resize, sin character count. Consumer compone con Label y form primitives. Filosofia: maximo control al developer.

**Notable Props:** Todos los nativos de `<textarea>`.
**A11y:** Depende del consumer.

---

### Playbook (PowerHome) — "resize + maxCharacters + characterCount"

Textarea dedicado con `rows`, `maxCharacters`, `characterCount` display, y `resize` prop con 4 valores.

**Notable Props:** `rows`, `maxCharacters`, `characterCount`, `resize`.
**A11y:** Estandar.

---

### Wise Design — "TextareaField con counter integrado"

Form field wrapper con label, hint, error integrados. `maxLength` con visual counter. Sin auto-resize.

**Notable Props:** `maxLength`, counter visual, label/hint/error integrados.

---

### Dell DS — "Enterprise textarea con control de resize"

`maxLength`, `rows`, `resize` control. Patron de form field con label, helper text, error.

---

### Chakra UI — "Textarea dedicado + react-textarea-autosize"

Componente dedicado que extiende `chakra.textarea`. Comparte `size`, `variant`, y `colorScheme` con Input. `resize` prop. Auto-resize via integracion con `react-textarea-autosize` documentada en recipes.

**Notable Props:** `size`, `variant`, `resize`. Auto-resize via biblioteca externa.
**A11y:** Estandar con Chakra's form control.

---

### GOV.UK — "Character count como componente separado con aria-live"

Arquitecturalmente unico: Character count es un componente separado que wrappea Textarea. `data-maxlength` o `data-maxwords` (word-based limits). El componente Character count tiene su propio `aria-live="polite"` — la unica implementacion con live region para anunciar caracteres restantes.

**Notable Props:** `data-maxlength`, `data-maxwords`, Character count component.
**A11y:** `aria-live="polite"` en Character count. Labels visibles enforced por defecto.

---

### Base Web (Uber) — "Sistema de overrides para customizacion profunda"

`size` (COMPACT/DEFAULT/LARGE), `resize`, `error`/`positive` states. Sin character count. Override system permite customizacion profunda de elementos internos.

---

### Fluent 2 (Microsoft) — "3 appearances para multiples superficies"

`resize` (4 valores), `size` (small/medium/large), `appearance` (outline/filled-darker/filled-lighter). Integrado con Field wrapper para label y validacion. Las 3 appearances reflejan la necesidad de Microsoft de soportar textareas en diversas superficies (Teams chat, Outlook compose, admin panels).

---

### Gestalt (Pinterest) — "TextArea con counter y label management"

`maxLength` con character counter built-in. `helperText` y `errorMessage` slots. `rows` para altura. `label` y `labelDisplay` para labels visibles/ocultos.

---

### Mantine — "autosize con minRows/maxRows (mirror de Ant Design)"

Extiende `InputBase`. `autosize` con `minRows`/`maxRows` — misma API que Ant Design, confirmando el patron como estandar de facto. `maxLength` con character count opcional via `InputWrapper`.

---

### Orbit (Kiwi.com) — "Contexto travel con feedback slots"

`resize` (vertical/none), `maxLength` con counter visual, `help`/`error`/`feedback` slots. `spaceAfter` para spacing en formularios.

---

### Evergreen (Segment) — "Wrapper minimo sobre textarea nativo"

Thin component. `isInvalid`, `required`, `disabled`, `placeholder`. API minimal — native textarea behavior para resize y sizing.

---

### Nord (Nordhealth) — "expand + counter para contexto clinico"

Web component con `expand` para auto-resize. `maxlength` con character counter built-in. `size` (s/m/l). Healthcare context: character limits claros para notas clinicas.

---

## Pipeline Hints

**Archetype recommendation:** form-control
Rationale: Textarea es un campo de entrada de formulario con label, helper text, status validation — patron identico a TextField/Input pero con rendering multi-linea.

**Slot consensus:**
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| label | text | no | 20/24 | Arriba del campo. Algunos sistemas lo gestionan desde Form wrapper |
| textarea-field | text | yes | 24/24 | El area de texto multi-linea. Elemento core |
| helper-text | text | no | 18/24 | Texto de ayuda debajo del campo |
| error-text | text | no | 18/24 | Texto de error debajo del campo (reemplaza helper en estado error) |
| character-count | text | no | 14/24 | Display "X/Y" o "X characters remaining". Posicion: bottom-right |
| prefix-icon | icon | no | 4/24 | Icono al inicio del campo (poco comun en textarea vs textfield) |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Size | variant | sm/md/lg | 16/24 | Afecta padding, fontSize, minHeight |
| Variant | variant | outlined/filled/borderless | 14/24 | M3: filled/outlined. Spectrum: isQuiet. Atlassian: standard/subtle/none |
| State | state | default/hover/focus/disabled/readonly | 24/24 | Universal. readonly focusable+copiable |
| Status | status | none/error/warning | 18/24 | error universal. warning en 12/24. success en 4/24 (bajo consenso) |
| Resize | variant | none/vertical/horizontal/both/auto/smart | 10/24 | Atlassian tiene 5 modos. Mayoria: vertical default |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| label | 20/24 | true | Visibilidad del label |
| helper-text | 18/24 | false | Texto de ayuda debajo |
| character-count | 14/24 | false | Display de contador de caracteres |
| auto-resize | 10/24 | false | Auto-crecimiento vertical. Ant: `autoSize`, Mantine: `autosize` |
| required | 16/24 | false | Asterisco en label + `aria-required` |
| clearable | 4/24 | false | Boton para limpiar contenido (bajo consenso para textarea) |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 24/24 | Border neutral, bg surface | Estado base |
| hover | 20/24 | Border darker | Sin cambio de bg en mayoria |
| focus | 24/24 | Focus ring / border accent | WCAG 2.4.7 obligatorio |
| disabled | 24/24 | Opacity 0.5, no interactivo | Todos implementan |
| readonly | 16/24 | Focusable, copiable, border sutil o sin border | Spectrum, Atlassian, Carbon |
| error | 18/24 | Border error (rojo), icono error, error text | Reemplaza helper text |
| warning | 12/24 | Border warning (amarillo), warning text | Carbon, Ant, Polaris |

**Exclusion patterns found:**
- disabled x hover/focus — 24/24 (universal: disabled bloquea interaccion)
- readonly x error — 16/16 (readonly no valida)
- disabled x warning/error — 18/24 (disabled no muestra status)

**Building block candidates:**
- Ninguno — Textarea es un form-control atomico sin container slots. Los sub-elementos (label, helper, counter) son slots de texto, no building blocks.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| resize | none, vertical, horizontal, both, auto, smart | 10/24 | `smart` solo Atlassian. Default: vertical en mayoria |
| autoSize | boolean o { minRows, maxRows } | 10/24 | Ant/Mantine: objeto. Polaris: boolean + maxHeight |

**A11y consensus:**
- Primary role: `textbox` (nativo `<textarea>` element) — 24/24 consenso
- Required ARIA: `aria-describedby` (links helper/error/counter text), `aria-invalid="true"` en error, `aria-required="true"` si required, `aria-multiline="true"` (implicito en textarea nativo)
- Keyboard: Tab para entrar, Tab para salir, Typing para ingresar texto — NO es composite widget. Sin arrow key navigation especial
- Focus: Linear (Tab entra, Tab sale). Sin focus trap, sin roving tabindex
- APG pattern: No hay APG pattern especifico — `<textarea>` es nativo HTML
- Character count a11y: GOV.UK es el UNICO con `aria-live="polite"` para anunciar chars restantes. Todos los demas: visual-only counter

---

## What Everyone Agrees On

1. **Label association es obligatoria**: Todos los 24 sistemas vinculan label via `htmlFor`/`id` o `aria-labelledby`. Nunca un textarea sin label accesible, aunque sea visualmente oculto.

2. **Error communicated via `aria-describedby` + `aria-invalid`**: Universal. Error text se vincula al textarea, y `aria-invalid="true"` activa el anuncio del screen reader. Ningun sistema usa `aria-errormessage`.

3. **Resize vertical es el default sensato**: Cuando ofrecen resize, la mayoria usa vertical-only como default. Horizontal resize rompe layouts en formularios. `both` es opt-in.

4. **Character counter es opt-in, no default**: Ningun sistema muestra el counter sin que el developer/designer lo active. Requiere `maxLength` o prop equivalente. Razon: evitar ruido visual en campos sin limite.

5. **Disabled bloquea toda interaccion**: Opacity ~0.5, no focusable (o aria-disabled + focusable en composites), bloquea hover/focus/pressed. Universal.

6. **Helper text y error text comparten posicion**: Debajo del campo. En estado error, error text reemplaza helper text (no se muestran ambos). Patron consistente en 18/24 sistemas.

---

## Where They Disagree

### 1. "Componente dedicado o variante de TextField?"
- **Opcion A: Componente separado** (Spectrum, Carbon, Atlassian, Primer, shadcn/ui, Playbook, Chakra, Gestalt, Mantine, Fluent, Evergreen, Nord — 14/24)
  - API limpia. Solo props relevantes para multi-line.
  - Upside: discoverability, no props irrelevantes.
  - Downside: duplicacion de logic de field (label, error, validation).
- **Opcion B: Variante de TextField** (M3, Polaris, Cedar — 4/24)
  - Un componente para todo. Consistent API.
  - Upside: menos componentes.
  - Downside: prop multiline oculta la capacidad.
- **Recomendacion:** Componente separado. Consenso claro (14/24) y la separacion evita props confusas.

### 2. "Auto-resize: built-in o responsabilidad del consumer?"
- **Opcion A: Built-in** (Atlassian, Ant, Polaris, Mantine, Nord, Chakra — 10/24)
  - Developer obtiene auto-resize con un prop.
  - Upside: consistencia, zero-config.
  - Downside: complejidad interna, layout shift risk.
- **Opcion B: Consumer responsibility** (Spectrum, Carbon, shadcn/ui, Paste, Gestalt, Evergreen — 12/24)
  - Textarea es fixed-height. Consumer agrega auto-resize via CSS o libreria.
  - Upside: predictibilidad, no layout shift.
  - Downside: cada team reimplementa auto-resize.
- **Recomendacion:** Boolean `auto-resize` que opt-in (como Ant/Mantine). Default: false.

### 3. "Character counter: parte del componente o componente separado?"
- **Opcion A: Prop del componente** (Carbon, Ant, Playbook, Gestalt, Nord, Wise — 10/24)
  - `showCount` / `enableCounter` + `maxLength`.
  - Upside: zero setup, consistent position.
- **Opcion B: Componente separado** (GOV.UK — 1/24)
  - Character count wrappea Textarea.
  - Upside: reutilizable en cualquier input. Tiene `aria-live`.
- **Opcion C: Consumer compone** (shadcn/ui, Primer, Paste — 6/24)
  - Consumer agrega counter via helper text.
  - Upside: flexibilidad total.
- **Recomendacion:** Prop del componente (Opcion A). Mayoria adopta. En Figma: boolean toggle para visibilidad.

### 4. "Cuantas variantes visuales?"
- **Opcion A: 2 variantes** (outlined + filled) — M3, Ant
- **Opcion B: 3 variantes** (outlined + filled + borderless) — Spectrum, Atlassian, Fluent
- **Opcion C: 1 variante** (outlined only) — Carbon, shadcn/ui, Primer
- **Recomendacion:** 3 variantes (outlined/filled/borderless). Borderless cubre el patron de edicion inline que varios sistemas implementan.

### 5. "Readonly como boolean o state?"
- **Opcion A: Boolean** (Spectrum, Atlassian — `isReadOnly`) — no multiplica frames, visual change minimo
- **Opcion B: State variant value** — multiplica frames pero permite visual diferenciada
- **Recomendacion:** Boolean (global-property-rules.md). Visual change es minimo (remove border o change bg). No justifica multiplicar frames.

---

## Visual Patterns Found

### Pattern 1: Standard Form Field
```
┌──────── Label ────────────────────────── * ┐
│ ┌────────────────────────────────────────┐ │
│ │ Placeholder text...                    │ │
│ │                                        │ │
│ │                                        │ │
│ └────────────────────────────────────────┘ │
│ Helper text                      0/500     │
└────────────────────────────────────────────┘
```
**Best for:** Formularios estandar. Adopted by: 20/24 systems.

### Pattern 2: Borderless / Quiet / Inline Edit
```
┌────────────────────────────────────────────┐
│ Placeholder text...                        │
│                                            │
│ (border visible only on hover/focus)       │
└────────────────────────────────────────────┘
```
**Best for:** Edicion inline en paneles, wikis, CMS. Adopted by: Spectrum, Atlassian, Fluent (6/24).

### Pattern 3: Auto-resize with bounded growth
```
Initial (2 rows):          After typing (4 rows):      At maxRows (6 rows, scrolls):
┌───────────────────┐      ┌───────────────────┐       ┌───────────────────┐
│ Text line 1       │      │ Text line 1       │       │ Text line 3       │▲
│ Text line 2       │      │ Text line 2       │       │ Text line 4       ││
└───────────────────┘      │ Text line 3       │       │ Text line 5       ││
                           │ Text line 4       │       │ Text line 6       │▼
                           └───────────────────┘       └───────────────────┘
```
**Best for:** Campos de comentario, descripcion. Adopted by: Ant, Mantine, Polaris, Nord (8/24).

### Pattern 4: Character Counter Variants
```
Carbon (progressive):      GOV.UK (remaining):         Ant (fraction):
Helper text      25/500    You have 475                Description    25/500
                           characters remaining
                 ████░     (aria-live="polite")
```
**Best for:** Campos con limite estricto. Adopted by: 14/24 con alguna forma de counter.

---

## Risks to Consider

1. **Layout shift con auto-resize** (HIGH) — Auto-grow cambia la altura del campo, empujando contenido debajo. Mitigacion: usar bounded auto-resize (`maxRows`/`maxHeight`) o `smart` resize (grow-only, never shrink como Atlassian).

2. **Character counter inaccesible** (HIGH) — 23/24 sistemas NO tienen `aria-live` para el counter. Screen reader users no saben cuantos caracteres les quedan conforme escriben. Mitigacion: implementar `aria-live="polite"` en el counter region (pattern GOV.UK).

3. **Resize handle en mobile** (MEDIUM) — El drag handle de CSS `resize` no funciona bien en touch devices. Mitigacion: deshabilitar `resize` en mobile, usar auto-resize en su lugar.

4. **Helper text vs error text conflict** (MEDIUM) — Cuando ambos existen y hay error, el helper text desaparece. Si el helper text contenia instrucciones importantes ("Escribe al menos 50 caracteres"), el usuario pierde contexto. Mitigacion: mantener helper visible y agregar error encima, o incorporar instrucciones en el error message.

---

## Next Steps

```
/spec textarea        → outputs/textarea-config.json
/enrich textarea      → outputs/textarea-enriched.md + config.json actualizado
/generate textarea    → Componentes Figma
/figma-qa             → Auditoria + auto-fix
```

O usa `/build textarea` para ejecutar todo el pipeline.
