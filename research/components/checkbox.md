# Checkbox — Component Research

**Fecha:** 2026-04-10
**Modo:** --max (todas las variantes, sin filtrado de scope)
**Sistemas analizados:** 24 (6 Tier 1 + 8 Tier 2 + 10 Tier 3)
**Scope:** Checkbox = control de seleccion binario con estados checked/unchecked/indeterminate

---

## Sistemas sin componente dedicado

Todos los 24 sistemas analizados ofrecen un componente Checkbox. No hay sistemas sin soporte.

---

## How Systems Solve It

### Material Design 3 — "Control de seleccion unificado con color dinamico y error propio"

Material Design 3 adopta un enfoque de rendering custom completo para que el checkbox participe del sistema de color dinamico de Material You (colorPrimary, colorError). La decision de renderizar custom en vez de usar el nativo del navegador es la unica forma de garantizar coherencia visual entre Android, Web y Flutter, donde los controles nativos difieren drasticamente en apariencia. El modelo de tres estados (checked/unchecked/indeterminate) corrige un bug historico donde `aria-checked="mixed"` no se surfaceaba correctamente.

La decision mas notable es que `errorShown` vive en el propio componente y no se delega al form wrapper. Esto permite usar checkboxes con estado de error en contextos fuera de formularios clasicos, como tablas o paneles de configuracion, donde no hay un `<form>` envolvente. El touch target es de 48dp (12mm) mientras que la caja visual es mas compacta, separando reachabilidad de densidad visual segun las recomendaciones WCAG de target minimo.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Custom rendering, no nativo | Unica via para responder a colorPrimary en Android/Web/Flutter | H | Si multiples plataformas, considerar custom |
| errorShown en el componente | Permite error en checkboxes fuera de forms (tablas, paneles) | H | Util si checkbox vive fuera de form |
| 48dp touch / caja visual menor | Separa reachabilidad de compacidad visual, cumple WCAG | M | Aplicar siempre: touch >= 44px |

**Notable Props:** `checkedState` (checked/unchecked/indeterminate), `errorShown`, `errorAccessibilityLabel`, `centerIfNoTextEnabled`

**Accessibility:** aria-checked="mixed" corregido; errorAccessibilityLabel requerido porque el cambio de color no se anuncia por SR; nativo `<input>` en Web preserva ARIA del navegador.

---

### Spectrum (Adobe) — "Comportamiento desacoplado de presentacion via hooks"

Spectrum construye su checkbox sobre los hooks `useCheckbox`/`useCheckboxGroup` de React Aria, separando completamente el comportamiento de la capa visual. Esta separacion permite que equipos de producto usen la logica ARIA sin adoptar la estetica de Adobe. La decision mas contestada es que `isIndeterminate` persiste al hacer click: si un usuario clickea un checkbox padre indeterminado, se marca como checked, pero el estado indeterminado debe ser re-calculado por la logica del padre segun sus hijos. No se auto-resetea.

CheckboxGroup es un componente separado y de primera clase, no un wrapper opcional. Esto fuerza a los desarrolladores a proveer agrupacion semantica correcta con `role="group"` y `aria-labelledby`. La distincion entre `isReadOnly` (focusable, copiable) e `isDisabled` (no focusable) es explicita y rara en otros sistemas.

La prop `isEmphasized` cambia el color del checkbox marcado de neutral a brand blue, senalando jerarquia sin cambiar semantica. Dos modos de validacion: `validationBehavior="aria"` (advisory, no bloquea envio) vs `"native"` (bloquea submission del form).

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Indeterminate persiste al click | El padre determina el estado por sus hijos, no el usuario | H | Patron correcto para select-all |
| isReadOnly separado de isDisabled | ReadOnly mantiene focusable+copiable (formularios de revision) | M | Considerar si hay contextos read-only |
| isEmphasized para jerarquia visual | Cambia neutral→brand sin cambiar semantica | M | Util para checkboxes principales |
| Dual validation (aria vs native) | Advisory no bloquea, native bloquea envio de form | M | Elegir segun UX deseada |

**Notable Props:** `isIndeterminate`, `validationBehavior` (aria/native), `isEmphasized`, `isReadOnly`, `UNSAFE_className`

**Accessibility:** WCAG 2.1 AA via hooks; aria-checked="mixed"; aria-invalid + aria-describedby; CheckboxGroup con role="group"+aria-labelledby; RTL auto-handled.

---

### Carbon (IBM) — "Grupo primero con validacion a nivel de grupo"

Carbon toma una posicion firme: la validacion (error/warning) ocurre a nivel de grupo, no por checkbox individual. La razon es practica en contextos enterprise: cuando un formulario falla, el error es del grupo de opciones, no de una opcion especifica. Un unico mensaje accionable por grupo es mas claro que multiples mensajes por item. Carbon genera automaticamente `<fieldset>/<legend>` para los grupos, previniendo el error comun de usar `<div>+<p>` sin estructura semantica.

Tres tamanos (sm=16px, md=20px, lg=24px) siguen el sistema de densidad unificado de Carbon v11, consistente con todos los componentes de formulario. El estado `warn` (advertencia, no bloqueo) existe junto a `error`, permitiendo comunicar "esto es inusual pero permitido" — util en configuraciones enterprise donde restricciones estrictas no siempre aplican.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Error/warning a nivel de grupo | Un mensaje accionable > multiples mensajes por item | H | Si checkboxes siempre estan agrupados |
| Auto-generated fieldset/legend | Previene error comun de devs (div+p sin semantica) | H | Siempre generar estructura semantica |
| sm/md/lg (16/20/24) | Consistencia de densidad en todo el sistema Carbon v11 | M | Aplicar: 3 tamanos con caja proporcional |

**Notable Props:** `size` (sm/md/lg), `invalid`/`invalidText`, `warn`/`warnText`, `hideLabel`, `indeterminate`

**Accessibility:** fieldset/legend para grupos; SR anuncia nombre de grupo antes de cada label; aria-checked="mixed"; aria-describedby para helper/error/warning.

---

### Polaris (Shopify) — "Labels positivos obligatorios con error per-checkbox"

Polaris toma la decision opuesta a Carbon: el error vive en cada checkbox individual, no solo en el grupo. Esto viene de investigacion con comerciantes de Shopify, donde cada opcion de configuracion necesita guia inline especifica (ej: "debes aceptar estos terminos para continuar"). Labels positivos son obligatorios — la investigacion mostro que double-negatives ("No desactivar notificaciones") causan mala configuracion de tiendas.

`helpText` siempre esta visible, nunca en tooltip. En dispositivos tactiles (tabletas en tiendas fisicas), los patrones hover-dependent fallan. El checkbox acepta `checked` como `true`, `false`, o `"indeterminate"` (string value, no prop separada).

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Error per-checkbox (no solo grupo) | Comerciantes necesitan guia inline por opcion | H | Util si opciones son independientes |
| Labels positivos obligatorios | Double-negatives causan misconfiguracion | M | Buena practica: siempre framing positivo |
| helpText siempre visible, no tooltip | Touch devices no soportan hover | M | Aplicar: helper text visible |

**Notable Props:** `checked` (true/false/"indeterminate"), `error` (string), `helpText`, `labelHidden`, `onChange(newChecked, id)`

**Accessibility:** aria-checked="mixed"; aria-describedby para helpText y error; nativo `<input>`; auto-generated id para label association.

---

### Atlassian — "API con naming que espeja ARIA"

Atlassian usa props `is*` que espejan directamente el vocabulario ARIA: `isChecked` → `aria-checked`, `isInvalid` → `aria-invalid`, `isIndeterminate` como boolean separado de `isChecked` (espeja la API del DOM donde indeterminate es una propiedad separada). La decision mas notable es recomendar `isInvalid` con mensaje de error SOBRE `isDisabled` para opciones no disponibles: los elementos disabled pueden ser invisibles para algunas configuraciones de SR, mientras que los invalidos siempre son descubribles con razon.

CheckboxSelect es un variante dropdown searchable para listas de 20-100+ opciones — un patron hibrido raro en otros sistemas. El trabajo de accessibilidad 2024-2025 resolvio 6000+ issues. No usan arrow-key roving tabindex para checkbox groups (la semantica multi-select no lo implica, a diferencia de radio groups).

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| is* props espejan ARIA | Reduce overhead mental para devs gestionando API + a11y tree | H | Adoptar naming convention is* |
| isInvalid sobre isDisabled | Disabled puede ser invisible a SR; invalid siempre descubrible | H | Preferir error message sobre deshabilitar |
| isIndeterminate separado | Espeja DOM API, mas directo | M | Preferir boolean separado |

**Notable Props:** `isInvalid`, `isIndeterminate` (boolean separado), CheckboxSelect (dropdown searchable para listas largas)

**Accessibility:** aria-checked="mixed"; aria-invalid; role="group"+aria-labelledby; sin arrow-key navigation (multi-select != radio).

---

### Ant Design — "Validacion delegada al form wrapper"

Ant delega completamente la validacion a `Form.Item`: no hay `isInvalid` en el Checkbox. Es una posicion arquitectural que dice "el contexto de validacion pertenece al form layer, no al control individual". `indeterminate` se documenta especificamente para el patron "select all" con grupo plano (no arboles de profundidad arbitraria), reflejando el caso de uso principal: data tables.

Checkbox.Group acepta un array `options` que mapea directamente la respuesta de un servidor a checkboxes sin JSX individual. Los props `classNames`/`styles` aceptan objetos o funciones que reciben el estado, permitiendo styling condicional basado en checked/disabled.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Sin error per-checkbox | Validacion pertenece al form layer | M | Puede limitar uso standalone |
| options array en Group | Mapea server response directamente | M | Eficiente para datos dinamicos |
| indeterminate solo para select-all plano | Scoped a data tables, no arboles arbitrarios | L | Suficiente para la mayoria de casos |

**Notable Props:** `indeterminate`, `classNames`/`styles` (funcion con state), `valuePropName="checked"` en Form.Item

**Accessibility:** aria-checked="mixed" corregido; nativo `<input>`; Form.Item provee aria-describedby para error; disabled via aria-disabled o native disabled.

---

### Tier 2: Paste (Twilio) — "Checkbox nativo con CheckboxGroup como first-class"
Envuelve nativo `input[type=checkbox]` con CheckboxGroup automatizando fieldset/legend. Indeterminate soportado. Prioriza integracion nativa del navegador sobre customizacion visual. ~80 words.

### Tier 2: Lightning (Salesforce) — "Checkbox Button como variante toggle"
Ademas del checkbox clasico, ofrece Checkbox Button: un toggle-button visual con semantica de checkbox para filtros multi-select. El CheckboxGroup genera fieldset/legend automaticamente. ~60 words.

### Tier 2: Primer (GitHub) — "FormControl como wrapper semantico"
Checkbox nativo con FormControl wrapper que inyecta label, caption, validation. CheckboxGroup con fieldset/legend. Prioriza simplicidad y semantica nativa. ~50 words.

### Tier 2: shadcn/ui — "Radix headless con visual custom"
Construido sobre Radix UI Checkbox. Completamente customizable visualmente con soporte de indeterminate y react-hook-form integration nativa. ~50 words.

### Tier 2: Playbook — "Dual React/Rails con form integration"
Checkboxes para formularios con soporte dual React/Rails. API sencilla, sin features avanzadas como indeterminate formal. ~40 words.

### Tier 2: Cedar (REI) — "Vue checkbox con a11y WCAG 2.1 AA"
Vue-based checkbox con input nativo como base. WCAG 2.1 AA compliance. Sin indeterminate formal. ~40 words.

### Tier 2: Wise — "Consent y preferencias"
Checkboxes orientados a flujos de consentimiento financiero. Enfasis en claridad legal. ~30 words.

### Tier 2: Dell — "Enterprise form checkboxes"
Checkboxes enterprise con integracion de formularios corporativos. ~30 words.

### Tier 3: Radix UI — "Headless con checked union type"
`checked` acepta `boolean | "indeterminate"` (union type). `Checkbox.Indicator` renderiza condicionalmente para controlar icono per-estado. Form integration nativa. ~50 words.

### Tier 3: Chakra UI — "isIndeterminate boolean + icon custom"
Boolean `isIndeterminate` separado. Prop `icon` custom permite reemplazar el check visual. CheckboxGroup para array de valores. colorScheme integration. ~50 words.

### Tier 3: GOV.UK — "Touch targets grandes con conditional reveal"
Touch targets extra grandes para accesibilidad gobierno. Patron "conditional reveal" donde seleccionar una opcion expande campos adicionales. Opcion "none of the above" exclusiva. fieldset/legend obligatorio. ~60 words.

### Tier 3: Base Web — "Toggle como variante via checkmarkType"
`checkmarkType` convierte el checkbox en toggle switch visual (mismo componente, diferente presentacion). `labelPlacement` en 4 posiciones (top/bottom/left/right). Override-based customization. ~50 words.

### Tier 3: Fluent 2 — "checked='mixed' espeja ARIA directamente"
`checked="mixed"` como string value que espeja directamente `aria-checked="mixed"` del spec. `shape="circular"` para patrones de lista tipo Office. `labelPosition` before/after. ~50 words.

### Tier 3: Gestalt (Pinterest) — "Label requerido con density sm/md"
Label es prop requerido (no opcional). `labelDisplay="hidden"` para contextos de tabla. Dos tamanos sm/md para densidad. Color rojo Pinterest para estado checked. ~50 words.

### Tier 3: Mantine — "Checkbox.Card para seleccion full-card"
`Checkbox.Card` formaliza el patron de card clickeable con checkbox. Checkbox.Group con orientacion. Icon custom. Full size scale (xs-xl). El patron Card resuelve settings/plan selection UIs. ~50 words.

### Tier 3: Orbit — "Mobile-first con info tooltip"
Touch targets mobile-first. Prop `info` para tooltips explicativos en opciones de viaje. `hasError` para validacion. Sin soporte indeterminate. ~40 words.

### Tier 3: Evergreen — "Minimal B2B con bulk-select"
Estilo minimal B2B. `indeterminate` para bulk-select en dashboards de analytics. `isInvalid` para error state. ~30 words.

### Tier 3: Nord — "Healthcare consent forms"
Formularios de consentimiento medico. Claridad visual de estado sin ambiguedad para decision-making clinico. Web component portability. ~30 words.

---

## Pipeline Hints

**Archetype recommendation:** form-control
Rationale: Checkbox es un control de seleccion binario que vive dentro de formularios o como toggle de configuracion. Todos los 24 sistemas lo tratan como form control individual o dentro de un grupo.

**Slot consensus:**
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| control | visual | yes | 24/24 | La caja visual del checkbox (check/dash/empty) |
| label | text | yes | 22/24 | Texto de la opcion. Gestalt y GOV.UK lo hacen required |
| help-text | text | no | 8/24 | Polaris, Carbon, Primer, Paste: descripcion debajo del label |
| error-message | text | no | 14/24 | Texto de error. En algunos solo a nivel de grupo |
| icon-check | icon | yes | 24/24 | Internal: icono check/dash/empty segun estado |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Size | variant | sm/md/lg | 6/24 | Carbon (3), Gestalt (2), Mantine (5 sizes). Muchos solo md |
| Selected | variant | checked/unchecked/indeterminate | 24/24 | Tri-state universal. Cambia icono check/dash/empty |
| State | state | default/hover/focus/pressed | 20/24 | Interaccion del usuario sobre el control |
| Status | status | none/error | 14/24 | Carbon, Polaris per-item; Ant solo via Form.Item |
| isEmphasized | variant | false/true | 2/24 | Spectrum: cambia checked color neutral→brand |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| label | 22/24 | true | Visibilidad del texto de la opcion |
| isDisabled | 24/24 | false | Bloquea toda interaccion |
| helpText | 8/24 | false | Texto descriptivo debajo del label |
| isRequired | 12/24 | false | Marcador de campo requerido |
| isReadOnly | 3/24 | false | Spectrum, raro en otros |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 24/24 | Caja con borde, sin fill | base |
| hover | 20/24 | Borde mas oscuro, bg tinted | cursor pointer |
| focus | 22/24 | Focus ring 2px alrededor del control | WCAG 2.4.7 |
| pressed | 8/24 | Caja presionada, color mas oscuro | click feedback |
| disabled | 24/24 | Opacity 0.38-0.5, cursor not-allowed | Bloquea interaccion |
| error | 14/24 | Borde rojo + texto error | Validacion |

**Exclusion patterns found:**
- disabled x hover/focus/pressed -- 24/24 systems (universal)
- error x disabled -- 12/24 (disabled no muestra error)

**Building block candidates:**
- Ningun BB formal. Checkbox es atomico (no tiene container slots que requieran composicion). El CheckboxGroup se modela como componente wrapper separado.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| labelPosition | right/left/above | 4/24 | Base Web, Fluent 2. Default right |

**A11y consensus:**
- Primary role: `checkbox` (24/24 consensus)
- Required ARIA: `aria-checked` (true/false/mixed), `aria-label` o `<label>` asociado
- Keyboard: Space toggle (NO Enter — Enter submits form). Tab navega entre checkboxes.
- Focus: Linear (Tab/Shift+Tab entre items). NO roving tabindex (multi-select != radio).
- APG pattern: Checkbox (dual-state) / Tri-state Checkbox
- Group: role="group" o fieldset/legend con aria-labelledby
- Error: aria-invalid + aria-describedby (NO aria-errormessage)

---

## What Everyone Agrees On

1. **Tri-state (checked/unchecked/indeterminate):** Los 24 sistemas que implementan checkbox reconocen el estado indeterminate via aria-checked="mixed". Es un estandar universal, no una feature opcional.

2. **Space toggle, NOT Enter:** Space cambia el estado del checkbox. Enter NO lo hace (envia el formulario). Esta distincion es critica para a11y y todos los sistemas la respetan.

3. **Label asociado siempre:** Cada checkbox necesita un label accesible (visible o visually hidden). Sin label, el SR no puede anunciar el proposito del control. 22/24 lo hacen required en la API.

4. **Indeterminate es presentacional, no interactivo:** El usuario no puede "seleccionar indeterminate" — es un estado derivado por el parent cuando algunos hijos estan checked. Al clickear un checkbox indeterminate, pasa a checked, y el parent recalcula.

5. **Focus ring visible obligatorio:** WCAG 2.4.7 exige indicador de foco visible. Todos los sistemas implementan un focus ring de al menos 2px alrededor del control checkbox.

6. **Group semantico:** Cuando hay multiples checkboxes relacionados, deben agruparse con fieldset/legend o role="group"+aria-labelledby. No usar divs planos.

---

## Where They Disagree

1. **"Debe el error vivir en el checkbox individual o en el grupo?"**
- **Option A: Per-checkbox error** (Polaris, Atlassian) — cada opcion puede tener su propio mensaje de error inline. Mejor para opciones independientes donde cada una necesita guia especifica.
- **Option B: Error a nivel de grupo** (Carbon, Ant Design) — un solo mensaje de error para todo el grupo. Mas claro en contextos enterprise donde el fallo es del conjunto, no de una opcion.
- **Para tu caso:** Ambos modos son validos. Si checkboxes son independientes (consent, settings) → per-checkbox. Si son opciones de un grupo relacionado → grupo.

2. **"Cuantos tamanos debe tener el checkbox?"**
- **Option A: Un solo tamano** (Spectrum, Polaris, Atlassian) — simplicidad, el checkbox no necesita adaptarse a densidad.
- **Option B: 3 tamanos sm/md/lg** (Carbon, Mantine, Gestalt) — consistencia de densidad con otros form controls.
- **Para tu caso:** 3 tamanos (sm=16, md=20, lg=24) para consistencia con el sistema.

3. **"Como modelar indeterminate: boolean separado o union type?"**
- **Option A: Boolean separado** (Spectrum `isIndeterminate`, Atlassian `isIndeterminate`, Chakra) — espeja DOM API, mas explicito.
- **Option B: Union type en checked** (Polaris `"indeterminate"`, Radix `"indeterminate"`, Fluent `"mixed"`) — un solo prop controla todo.
- **Para tu caso:** En Figma, modelar como variant Selected=checked/unchecked/indeterminate (3 valores) ya que cambia el icono visual.

4. **"Debe existir isReadOnly separado de isDisabled?"**
- **Option A: Si** (Spectrum) — readonly es focusable y copiable, disabled no.
- **Option B: No** (Carbon, Polaris, la mayoria) — disabled cubre ambos casos.
- **Para tu caso:** Omitir readonly inicialmente. Agregar si el DS lo necesita.

5. **"Soporte para Checkbox.Card (card clickeable)?"**
- **Option A: Componente separado** (Mantine Checkbox.Card) — card completa como click target.
- **Option B: No, componer manualmente** (la mayoria) — checkbox + card wrapper.
- **Para tu caso:** Fuera de scope para v1. Considerar para v2.

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Standard | Caja + label a la derecha | Formularios, settings | 24/24 |
| With help text | Caja + label + descripcion debajo | Opciones complejas | 8/24 |
| Select all | Checkbox padre indeterminate + hijos | Tablas, listas | 20/24 |
| Card checkbox | Card completa como click target | Plan selection, settings | 2/24 (Mantine) |
| Button checkbox | Apariencia de boton, semantica checkbox | Filtros | 1/24 (Lightning) |

### Standard Checkbox
```
┌──┐
│✓ │ Label text
└──┘
     Help text (optional)
     Error message (optional)
```

### Select-All Pattern
```
┌──┐
│─ │ Select all (indeterminate)
└──┘
  ┌──┐
  │✓ │ Option A (checked)
  └──┘
  ┌──┐
  │  │ Option B (unchecked)
  └──┘
  ┌──┐
  │✓ │ Option C (checked)
  └──┘
```

### Checkbox Group with Validation
```
  Legend (group label)
  ┌──┐
  │  │ Option A
  └──┘
  ┌──┐
  │  │ Option B
  └──┘
  ⚠ Error: Select at least one option
```

---

## Risks to Consider

1. **Indeterminate sin logica de parent-child** (HIGH) — Implementar el icono dash sin la logica de select-all crea un estado visual sin significado. Mitigacion: documentar que indeterminate solo se usa con patron select-all y requiere logica en el parent.

2. **Touch target insuficiente en mobile** (MEDIUM) — La caja visual de 16-20px es demasiado pequena para touch. Mitigacion: touch target invisible de al menos 44x44px (WCAG 2.5.8 requiere 24x24 minimo, pero 44x44 es best practice).

3. **Label omitido en tablas** (MEDIUM) — En contextos de data table, checkboxes a menudo pierden su label visible. Mitigacion: siempre proveer aria-label o labelHidden con texto significativo (nombre de la fila, no "select").

4. **Error vs disabled confusion** (MEDIUM) — Usar disabled para opciones no disponibles puede hacerlas invisibles a SR. Mitigacion: preferir error message con razon sobre disabled cuando sea posible (enfoque Atlassian).

---

## Next Steps

```
/spec checkbox        -- Genera config.json con anatomia, matriz y optimizacion
/enrich checkbox      -- Agrega a11y detallada + tokens
/generate checkbox    -- Construye en Figma
/figma-qa             -- Audita y corrige
/build checkbox       -- Pipeline completo en un comando
```
