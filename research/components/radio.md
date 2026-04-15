# Radio — Component Research

## Meta
- **Date**: 2026-03-30
- **Mode**: Guided
- **Systems**: 14 (Default tier)
- **Scope**:
  - **Selección**: Single-select + toggle/card variant (radio tile)
  - **Contexto**: Filtro/selector standalone (fuera de forms)
  - **RadioGroup**: Sí — componente formal con estado, orientación, a11y
  - **Tamaños**: sm + md + lg

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Dell DS | Documentación no pública | Datos insuficientes |
| Wise Design | Solo datos parciales (confidence: low) | Radio básico en flujos financieros |

---

## How the Big Systems Solve It

### Material Design 3 — "6 estados de interacción exhaustivos, pero sin RadioGroup formal"

M3 define Radio con 6 estados de interacción (enabled, hovered, focused, pressed, disabled, error) — el set más completo de todos los sistemas. Sin embargo, no tiene un componente RadioGroup first-party: el agrupamiento se delega a la plataforma (fieldset/legend en web, ViewGroup en Android). El control visual es un círculo de 20dp con target de toque de 48×48dp. Error message se ancla debajo del último item del grupo. Permite pre-selección cuando hay una opción obvia.

```
  States:
  ○ enabled   ◉ selected   ◎ focused
  ○ hovered   ◉ pressed    ○ disabled

  Touch target: 48×48dp around 20dp control
  Error: below last item (group-level)
```

**Ejes normalizados:**
- `size`: no definido (single size, 20dp control)
- `State`: enabled · hovered · focused · pressed · disabled
- `Status`: error

**Para tu caso**: Shallow. M3 no tiene RadioGroup formal ni variante toggle/card. Los 6 estados de interacción son referencia útil para definir tus states, pero el approach de "no RadioGroup" no aplica — tú necesitas un wrapper formal.

---

### Spectrum (Adobe) — "Radio NO puede existir fuera de RadioGroup — enforced a nivel de API"

Spectrum toma la posición más radical: Radio lanza error si no tiene un RadioGroup ancestor. Esto no es una recomendación — es enforcement de código. La razón: un radio aislado es semánticamente sin sentido (una opción mutuamente excluyente de un grupo de una... no es exclusión). Orientación vertical por defecto, horizontal requiere opt-in explícito. `isReadOnly` es distinto de `isDisabled`: read-only mantiene el grupo focusable y navegable (útil para pantallas de confirmación), disabled lo remueve del tab order. Validación dual: native (bloquea submit) y aria (advisory).

```
  RadioGroup (mandatory wrapper):
  ┌────────────────────────────┐
  │ Label              * req   │
  │ ┌──┐                      │
  │ │◉ │ Option A              │
  │ └──┘                      │
  │ ┌──┐                      │
  │ │○ │ Option B              │
  │ └──┘                      │
  │ ┌──┐                      │
  │ │○ │ Option C (disabled)   │
  │ └──┘                      │
  │ ⚠️ Error message           │
  └────────────────────────────┘
  orientation: vertical (default) | horizontal
```

**Ejes normalizados:**
- `size`: no definido (single size)
- `Boolean`: isDisabled, isReadOnly, isRequired, isEmphasized
- `Status`: error (via validationBehavior)

**Para tu caso**: El enforcement de RadioGroup es exactamente lo que necesitas — tu scope incluye RadioGroup formal. Pero Spectrum no tiene variante toggle/card ni múltiples tamaños. La distinción isReadOnly vs isDisabled puede aplicar si tu filtro tiene estados de "vista previa" donde el usuario ve la selección pero no puede cambiarla.

---

### Carbon (IBM) — "Horizontal por defecto — el único sistema que invierte la convención"

Carbon es el único sistema donde RadioButtonGroup tiene orientación horizontal como default. La razón: IBM Cloud, Watson, y plataformas de analytics son desktop-first con formato ancho — vertical desperdiciaría espacio horizontal abundante. `legendText` es prop requerido en RadioButtonGroup — no puedes renderizar el grupo sin label accesible (enforced a nivel API, como Spectrum). No tiene pre-selección por defecto: en software enterprise, las configuraciones disparan acciones reales (provisioning, cambios de permisos), y un default silencioso puede causar consecuencias no intencionadas.

```
  RadioButtonGroup (horizontal default):
  ┌──────────────────────────────────────────────┐
  │ legendText (required)                         │
  │ ◉ Option A   ○ Option B   ○ Option C         │
  └──────────────────────────────────────────────┘

  vs vertical:
  ┌────────────────────┐
  │ legendText         │
  │ ◉ Option A         │
  │ ○ Option B         │
  │ ○ Option C         │
  └────────────────────┘
```

**Ejes normalizados:**
- `size`: no definido
- `Boolean`: readOnly, disabled (group or individual)

**Para tu caso**: El horizontal-default de Carbon es relevante para tu contexto de filtros/selectores standalone — en una barra de filtros, horizontal tiene sentido. El `legendText` requerido es un patrón a adoptar para a11y. Pero sin variante toggle/card ni tamaños, Carbon es referencia parcial.

---

### Polaris (Shopify) — "ChoiceList: un componente que es radio Y checkbox según un prop"

Polaris tiene el approach más pragmático: `ChoiceList` con `allowMultiple` que toggle entre radio y checkbox. Misma API, mismos props, mismo layout — solo cambia la semántica de selección. Esto refleja la realidad de que muchas iteraciones de diseño cambian de single-select a multi-select, y con ChoiceList eso es un cambio de un prop. Default selection fuertemente recomendado: los merchants de Shopify ajustan configuraciones existentes, no hacen elecciones desde cero. `describedByError: true` en choices individuales conecta esa opción al error grupal vía aria-describedby.

```
  ChoiceList:
  ┌────────────────────────────┐
  │ Group Title                │
  │ ◉ Plan básico              │
  │   $9.99/mes                │
  │ ○ Plan pro                 │
  │   $29.99/mes               │
  │ ○ Plan enterprise          │
  │   Contactar ventas         │
  │ ⚠️ Selecciona un plan      │
  └────────────────────────────┘
  allowMultiple: false → radio
  allowMultiple: true  → checkbox
```

**Ejes normalizados:**
- `size`: no definido
- `type`: single (radio) · multiple (checkbox) — via `allowMultiple`
- `Boolean`: titleHidden, disabled

**Para tu caso**: El ChoiceList con descriptions por opción se acerca a tu radio card/tile — cada opción puede tener `helpText` (descripción debajo del label). Pero no es visualmente un "tile" con borde y contenido rico. La idea de un componente que sea radio y checkbox con un prop toggle es interesante si tu DS necesita ambos patrones.

---

### Atlassian — "Radio standalone permitido + techo de 5-7 opciones documentado"

Atlassian es el único sistema que permite Radio standalone (fuera de RadioGroup) sin error — reconociendo que en layouts complejos (filas de tabla, cards seleccionables, listas draggables) un RadioGroup wrapper estándar no funciona. RadioGroup es "strongly recommended" pero no enforced. Documentan explícitamente un techo de 5-7 opciones: más allá, recomiendan Select. No hay pre-selección por defecto — Jira/Confluence manejan configuraciones de permisos/workflow donde un default accidental tiene consecuencias reales.

```
  Standard RadioGroup:       Standalone (table row):
  ┌──────────────────┐       ┌──────────────────────────┐
  │ Orientación       │       │ ◉ Row 1 │ data │ data   │
  │ ◉ Vertical        │       │ ○ Row 2 │ data │ data   │
  │ ○ Horizontal      │       │ ○ Row 3 │ data │ data   │
  └──────────────────┘       └──────────────────────────┘
  5-7 option ceiling          No RadioGroup wrapper
```

**Ejes normalizados:**
- `size`: no definido
- `Boolean`: isRequired, isDisabled (group or individual)

**Para tu caso**: El soporte standalone es relevante si tu filtro/selector se usa dentro de contextos complejos (cards, tablas). El techo de 5-7 opciones aplica a tu caso de filtros — con más opciones, un Select dropdown es mejor UX. Pero sin variante toggle/card ni tamaños, es referencia parcial.

---

### Ant Design — "optionType='button' — la variante toggle que buscas"

Ant Design es el sistema más relevante para tu scope porque tiene exactamente la variante que necesitas: `optionType="button"` renderiza radios con semántica de radio pero visuales de button bar (segmented). Mismo componente, mismo `Radio.Group`, solo cambia la presentación. `buttonStyle` controla si es outline o solid. `size` solo aplica a la variante button (sm, middle, lg). El `options` array permite declarar opciones como data (mapeando directamente desde API responses). Usa `name` nativo de HTML para keyboard — cero JavaScript custom para navegación.

```
  Standard radio:              Button variant:
  ┌──────────────────┐         ┌────────────────────────────┐
  │ ◉ Option A       │         │ ┌─────┐┌─────┐┌─────┐     │
  │ ○ Option B       │         │ │  A  ││  B  ││  C  │     │
  │ ○ Option C       │         │ └─────┘└─────┘└─────┘     │
  └──────────────────┘         └────────────────────────────┘
                               optionType="button"
                               buttonStyle: outline | solid
                               size: sm | middle | lg

  Sizes (button variant only):
  sm: 24px height
  middle: 32px height (default)
  lg: 40px height
```

**Ejes normalizados:**
- `size`: sm · md(middle) · lg (solo button variant)
- `type`: default · button (via optionType)
- `variant` (button only): outline · solid (via buttonStyle)
- `Boolean`: disabled

**Para tu caso**: **Referencia #1.** `optionType="button"` es exactamente tu toggle variant. La separación de `size` solo en button variant es inteligente — el radio clásico no necesita tamaños porque su tamaño es fijo (el control es siempre ~16-20px). Tu modelo: Radio clásico (sin size) + Radio Card/Tile (con sm/md/lg). El `options` array es útil para filtros data-driven.

---

### Paste (Twilio) — "RadioGroup formal con orientación + error grupal"

Paste implementa Radio + RadioGroup como componentes separados pero diseñados para trabajar juntos. RadioGroup maneja orientación (vertical/horizontal), error state grupal, required, y disabled a nivel de grupo. Radio individual puede tener `helpText` (descripción debajo del label). Usa fieldset/legend para estructura accesible. `name` prop en RadioGroup se propaga a todos los Radio children.

**Ejes normalizados:**
- `size`: no definido
- `Boolean`: disabled, required (group level)
- `Status`: error (group level)

**Para tu caso**: RadioGroup de Paste es un buen modelo para tu wrapper formal — maneja orientación + error + required a nivel grupal. Pero sin variante toggle/card ni tamaños, es referencia de a11y/estructura más que de variantes visuales.

---

### Lightning (Salesforce) — "Radio Group nativo con orientación vertical"

Lightning tiene Radio Group como componente de nivel superior con selección mutuamente excluyente y orientación vertical. Usa inputs radio nativos del browser. No tiene variante toggle/button bar como Ant.

**Para tu caso**: Shallow. Sin variante toggle ni tamaños. Referencia menor.

---

### Primer (GitHub) — "Radio + RadioGroup + FormControl — 3 capas de abstracción"

Primer tiene Radio (control individual) + RadioGroup (agrupamiento) + FormControl (wrapper de form con label, caption, validation). Usa input[type=radio] nativo con fieldset/legend. La separación en 3 capas permite componer Radio en contextos muy diferentes: dentro de forms (con FormControl), standalone (solo RadioGroup), o individual (solo Radio en layouts custom).

**Para tu caso**: La separación en 3 capas es relevante: para tu caso de filtro standalone, usarías RadioGroup sin FormControl. Para forms usarías RadioGroup + FormControl. Pero sin variante toggle ni tamaños.

---

### shadcn/ui — "Radix RadioGroup con custom styling + roving tabindex correcto"

shadcn/ui usa Radix UI RadioGroup que implementa roving tabindex correctamente (solo el radio seleccionado o el primero está en tab order, flechas navegan). Custom-styled pero con semántica nativa. Integración directa con react-hook-form. Visual minimalista: circle indicator, sin variante button/card out-of-the-box, pero la composabilidad de Radix permite construir radio cards.

**Para tu caso**: Radix es la base técnica correcta para implementación en código (roving tabindex, keyboard nav). Para Figma, lo relevante es que shadcn demuestra que radio cards se construyen componiendo RadioGroupItem + Card — no como variante built-in del Radio.

---

### Playbook (eBay) — "Dual React/Rails con selección mutuamente excluyente"

Playbook tiene Radio con selección mutuamente excluyente y dual implementation (React + Rails). Datos parciales — confidence medium.

**Para tu caso**: Shallow. Sin variante toggle ni tamaños específicos. Sin información diferenciadora.

---

### Cedar (REI) — "Vue radio con native input + WCAG 2.1 AA"

Cedar tiene CdrRadio basado en Vue con input nativo y agrupamiento via fieldset/legend. WCAG 2.1 AA compliance.

**Para tu caso**: Shallow. Sin variante toggle ni tamaños. Confirma el patrón fieldset/legend pero no aporta nada nuevo vs los sistemas anteriores.

---

## What Everyone Agrees On (Consenso)

### 1. Selección mutuamente excluyente — una y solo una opción
**Todos los 14 sistemas** implementan Radio como single-select exclusivo. Si necesitas multi-select, es Checkbox. Esta distinción es fundamental y no negociable. Ningún sistema intenta hacer Radio multi-select.

### 2. Agrupamiento con fieldset + legend es mandatorio para accesibilidad
**12/12 sistemas con Radio** (excluyendo Dell/Wise por datos insuficientes) usan `fieldset` + `legend` (o `role="radiogroup"` + `aria-label`) para agrupar radios. El legend provee el contexto que screen readers anuncian antes de cada opción: "Elige tu plan: opción 1 de 3, Plan básico". Sin el grupo, cada radio se anuncia aislado y pierde contexto.

### 3. Roving tabindex — flechas entre opciones, Tab entra/sale del grupo
**Consenso absoluto**: Tab lleva al grupo (foco en el seleccionado, o el primero si ninguno), flechas navegan entre opciones, Tab sale del grupo. Este es el patrón ARIA correcto para radiogroup — NO Tab entre cada radio individualmente.

### 4. Error es del grupo, no del radio individual
**10/12 sistemas** manejan error a nivel de RadioGroup, no del Radio individual. La razón: "no seleccionaste una opción" es un error del grupo, no de una opción específica. El error message se ancla debajo del último item o debajo del grupo completo.

### 5. Disabled puede ser grupal o individual
**Todos los sistemas** soportan disabled a nivel individual (una opción no disponible) Y a nivel de grupo (todo el RadioGroup deshabilitado). Ambos son válidos y no mutuamente excluyentes.

### 6. Orientación vertical es el default universal
**13/14 sistemas** usan vertical como orientación default. Carbon es la única excepción (horizontal default por contexto enterprise desktop-wide). Vertical maximiza legibilidad y maneja labels largos sin truncamiento.

---

## Decisions You Need to Make (Divergencias)

### 1. "¿Radio clásico y toggle/card como variante de un componente o como componentes separados?"

| | **Option A: Variante de un componente** | **Option B: Componentes separados** |
|---|---|---|
| **Adoptado por** | Ant Design (`optionType`), Polaris (ChoiceList con helpText) | shadcn (composición RadioGroupItem + Card), ninguno explícitamente |
| **Cómo funciona** | `Radio.Group` con `optionType="default"|"button"|"card"` — mismo componente, diferente visual | `Radio` y `RadioCard` como componentes distintos, ambos dentro de `RadioGroup` |
| **Pro** | Una API, un import; cambiar de radio a tile es un prop change | Cada componente tiene su API óptima; Radio Card puede tener slots extra (imagen, badge, precio) |
| **Contra** | La API se complica: props que solo aplican a una variante (buttonStyle solo en button) | Dos componentes a mantener; el consumidor debe saber cuál usar |

**Para tu caso**: **Option A (variante)** recomendado para tu scope. Tu contexto es filtro/selector — la transición entre radio clásico y radio card/tile es fluida. Modelo Ant: `type="default"|"card"`. Los props adicionales del card (descripción, icono) se manejan como slots opcionales.

### 2. "¿Pre-selección por defecto o grupo vacío?"

| | **Option A: Pre-seleccionar** | **Option B: Sin selección inicial** |
|---|---|---|
| **Adoptado por** | Polaris, M3 (cuando hay opción obvia) | Atlassian, Carbon, Spectrum |
| **Cómo funciona** | El primer o mejor option viene seleccionado al cargar | Ninguna opción seleccionada; el usuario debe elegir activamente |
| **Pro** | Menos fricción; confirma estado actual; reduce un click | Sin suposiciones; el usuario hace una elección consciente |
| **Contra** | Si el default es incorrecto, el usuario puede no darse cuenta | Más fricción; requiere acción para cada grupo |

**Para tu caso**: **Depende del contexto de uso.** Para filtros donde hay un estado "por defecto" (ej: "Todos", "Más relevante"), pre-seleccionar es correcto. Para selectores donde no hay opción obvia (ej: "Elige método de envío"), dejar vacío. Tu RadioGroup debería soportar ambos (`defaultValue` prop opcional).

### 3. "¿RadioGroup enforced (Spectrum) o standalone permitido (Atlassian)?"

| | **Option A: Enforced** | **Option B: Standalone permitido** |
|---|---|---|
| **Adoptado por** | Spectrum (error si no hay RadioGroup) | Atlassian, Ant, todos los demás |
| **Cómo funciona** | Radio lanza error/warning si no está dentro de RadioGroup | Radio funciona solo, RadioGroup es recomendado pero no mandatorio |
| **Pro** | Imposible olvidar el grupo accesible; 100% compliance garantizado | Máxima flexibilidad para layouts complejos (tablas, cards custom) |
| **Contra** | Bloquea uso en table rows, cards draggables, layouts no estándar | Riesgo de Radio huérfano sin contexto accesible |

**Para tu caso**: **Option B (standalone permitido)** recomendado. Tu caso de filtro standalone necesita flexibilidad — a veces el radio estará dentro de una card o barra de filtros donde un `RadioGroup` formal no encaja. Pero documenta claramente que RadioGroup es el default y standalone es la excepción.

### 4. "¿Tamaños aplican a todas las variantes o solo a la variante toggle/card?"

| | **Option A: Tamaños en todo** | **Option B: Tamaños solo en toggle/card** |
|---|---|---|
| **Adoptado por** | Ninguno explícitamente (la mayoría solo tiene 1 tamaño) | Ant Design (size solo en button variant) |
| **Cómo funciona** | Radio clásico + toggle/card tienen sm/md/lg | Radio clásico es tamaño fijo; solo toggle/card escala |
| **Pro** | Consistencia; el mismo prop funciona en todas las variantes | Pragmático; el control circular del radio clásico no necesita 3 tamaños |
| **Contra** | El radio clásico escalado se ve raro (círculo de 24px es oversize) | Diferente API surface por variante |

**Para tu caso**: **Option B (tamaños solo en toggle/card)**. El radio clásico es un control de 16-20px con label al lado — no necesita 3 tamaños. El toggle/card sí necesita sm (compact para filtros densos), md (default), lg (selección prominente como pricing). Modelo Ant.

### 5. "¿Orientación horizontal como default para filtros?"

| | **Option A: Vertical default** | **Option B: Horizontal default** |
|---|---|---|
| **Adoptado por** | 13/14 sistemas (casi todos) | Carbon (enterprise dashboard context) |
| **Cómo funciona** | `orientation="vertical"` default, horizontal opt-in | `orientation="horizontal"` default |
| **Pro** | Maneja labels largos; patrón universal; accesible | Compacto; ideal para barras de filtros con opciones cortas |
| **Contra** | Ocupa más espacio vertical en filtros | Labels largos se truncan o rompen layout |

**Para tu caso**: **Mantener vertical como default pero documentar horizontal como recomendado para filtros**. Tu contexto principal es filtro/selector donde horizontal es la presentación natural, pero el componente debería defaultear a vertical por convención y el consumidor opt-in a horizontal para contextos de filtro.

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| Classic Radio | Círculo 16-20px + label texto | Formularios, listas de opciones | Todos (14/14) |
| Radio Button Bar | Semántica radio con visual de segmented/button bar | Filtros, view mode selector, toggle switches | Ant Design |
| Radio Card/Tile | Radio con contenido enriquecido (descripción, icono, precio) | Pricing plans, métodos de envío, planes de servicio | Polaris (helpText), shadcn (composición) |
| Radio in Table | Radio standalone en rows de tabla | Selección de fila en data grids | Atlassian |

### Classic Radio (vertical group)
```
┌──────────────────────────────┐
│ ¿Método de contacto?         │
│                              │
│ ◉ Email                      │
│ ○ Teléfono                   │
│ ○ SMS                        │
│ ○ WhatsApp (disabled)        │
│                              │
│ ⚠️ Selecciona una opción     │
└──────────────────────────────┘
```

### Radio Button Bar (Ant pattern)
```
┌──────────────────────────────────────┐
│ Vista:                               │
│ ┌────────┐┌────────┐┌────────┐      │
│ │▓ Lista ││ Grid   ││ Mapa   │      │
│ └────────┘└────────┘└────────┘      │
│  selected   default   default       │
│                                      │
│ Sizes:                               │
│ sm: ┌──────┐┌──────┐┌──────┐ 24px  │
│ md: ┌────────┐┌────────┐┌────────┐ 32px │
│ lg: ┌──────────┐┌──────────┐┌──────────┐ 40px │
└──────────────────────────────────────┘
```

### Radio Card/Tile
```
┌──────────────────────────────────────┐
│ Elige tu plan:                       │
│                                      │
│ ┌─────────────────┐ ┌─────────────┐ │
│ │ ◉ Plan Básico   │ │ ○ Plan Pro  │ │
│ │                 │ │             │ │
│ │ $9.99/mes       │ │ $29.99/mes  │ │
│ │ 5 usuarios      │ │ 50 usuarios │ │
│ │ 10GB storage    │ │ 100GB       │ │
│ └─────────────────┘ └─────────────┘ │
│                                      │
│ ┌─────────────────┐                  │
│ │ ○ Enterprise    │                  │
│ │                 │                  │
│ │ Contactar       │                  │
│ │ ventas          │                  │
│ └─────────────────┘                  │
└──────────────────────────────────────┘
```

---

## Risks to Address Early

### 1. Radio Card responsive layout (HIGH)
Cards en horizontal se ven bien en desktop pero colapsan en mobile. Sin breakpoint awareness, 3 cards en fila se salen del viewport. **Mitigación**: RadioGroup con `orientation="horizontal"` debe hacer wrap automático o cambiar a vertical en viewports angostos. Definir breakpoint en el componente o delegar a CSS grid del consumidor.

### 2. Roving tabindex en variante card (MEDIUM)
La variante card tiene más contenido interactivo potencial (links, badges). Si hay elementos focusables dentro del card, el roving tabindex del radiogroup puede conflictear con la navegación interna del card. **Mitigación**: Todo el contenido del card debe ser non-interactive (aria-hidden en decorativos); el único target de foco es el radio input. Si necesitas contenido interactivo en el card, usa un pattern diferente (no radio).

### 3. Confusión Radio Card vs SegmentedControl (MEDIUM)
La variante button bar de Ant se parece visualmente a un SegmentedControl. Si tu DS tiene ambos, los consumidores no sabrán cuál usar. **Mitigación**: Documentar claramente: Radio Button Bar = selección persistente que envía valor (como un form field). SegmentedControl = cambia vista/modo en la misma página (como tabs).

### 4. Size inheritance en RadioGroup (LOW)
Si RadioGroup tiene `size` y un Radio child también, ¿quién gana? **Mitigación**: RadioGroup.size se propaga a todos los children. Radio individual NO puede override el size del grupo. Documentar esta regla.

---

## Dimension Scores

| Dimension | M3 | Spec | Car | Pol | Atl | Ant | Paste | SLDS | Pri | shad | Play | Ced |
|-----------|:--:|:----:|:---:|:---:|:---:|:---:|:-----:|:----:|:---:|:----:|:----:|:---:|
| 1. Variants/Types | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| 2. Sizes | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 3. Interactive States | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ |
| 4. Anatomy | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| 5. Keyboard Nav | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| 6. ARIA & Roles | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| 7. Responsive | ❌ | ⚠️ | ❌ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ | ⚠️ | ⚠️ | ❌ | ❌ |
| 8. Motion | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 9. Theming | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ |
| 10. Content | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| 11. Edge Cases | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ❌ | ⚠️ |
| 12. Dependencies | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ |

**Top 3 por cobertura**: Ant Design (8✅ 4⚠️), Spectrum (8✅ 3⚠️ 1❌), Polaris (8✅ 3⚠️ 1❌)

---

## Next Steps

| # | Step | Command | Agent |
|---|------|---------|-------|
| 1 | Define component anatomy (slots, regions, hierarchy) | `/spec avatar` | Spec Agent |
| 2 | Full spec: anatomy + matrix + optimize | `/spec radio` | Spec Agent |
| 3 | Enrich: interaction spec + tokens | `/enrich radio` | Enrich Agent |
| 4 | Generate in Figma | `/generate radio` | Figma Generation Agent |

**Recomendación**: Usa el pipeline optimizado → `/spec radio` (combina anatomy + matrix + optimize) → `/enrich radio` (combina interaction + tokens).
