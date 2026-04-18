# Number Input — Component Research

**Fecha:** 2026-04-17
**Modo:** --max (all patterns, all systems, no scope filter)
**Scope:** All patterns — stepper, formatting, validation, type="number" vs text, mobile, a11y

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Material Design 3 | Sin NumberInput/stepper component — tension `type="number"` vs `inputmode="numeric"` documentada pero no resuelta | `TextField` con `type="number"` o `inputmode="numeric"` + HTML `min/max/step` attributes |
| Atlassian | Gap confirmado — sin componente en roadmap cercano | `@atlaskit/textfield` con `type="number"`; Slider como alternativa para rangos bounded |
| Twilio Paste | Sin NumberInput dedicado | `Input type="number"` o composicion con Input + validation |
| GitHub Primer | Sin NumberInput dedicado | `TextInput` con `type="number"` |
| shadcn/ui | Sin Number Input dedicado | `Input type="number"` o composicion con +/- buttons custom |
| Radix UI | Sin primitive — native `<input type="number">` ya lleva `role="spinbutton"` | `<input type="number">` nativo + IconButton custom para steppers; sin clamping utilities |
| Base Web (Uber) | Sin NumberInput — rangos amplios hacen steppers impracticos | `Input` con `type="number"` nativo; `endEnhancer` como escape hatch para custom stepper icons |
| Gestalt (Pinterest) | `inputMode="numeric"` en TextField — steppers excluidos como mobile-unfriendly | `TextField` con `inputMode="numeric"`; `SelectList`/`RadioGroup` para integer choices discretas pequeñas |
| Orbit (Kiwi.com) | Sin NumberInput generico — passenger count stepper es domain-specific con reglas adult/infant | `InputField` para numeros; stepper de pasajeros es componente propio del dominio travel |
| Evergreen (Segment) | Valores de configuracion (API limits, thresholds) tienen rangos amplios — stepper impractico | `TextInput` con `type="number"` nativo |
| Wise Design | Currency-aware amount input | Transfer amount input custom |
| Dell Design System | Enterprise numeric configuration | `NumberInput` basico |

---

## How Systems Solve It

### Spectrum (Adobe) — "Intl.NumberFormat: la implementacion mas internacionalizada"

Spectrum's NumberField es la implementacion mas completa de formateo internacional en el ecosistema. El prop `formatOptions` acepta exactamente las mismas opciones que `Intl.NumberFormat` de JavaScript — currency symbols, percentage display, measurement units, y tres sistemas numericos diferentes (Latin, Arabic-Indic, Devanagari) son soportados automaticamente sin codigo adicional. Esta decision es la mas significativa del componente: internacionalizacion no es una feature opcional, es el contrato principal del API.

Step anchoring se calcula desde `minValue`, no desde 0 — `minValue=2, step=5` produce 2, 7, 12, 17 (no 0, 5, 10, 15). Esta es la matematica correcta para rangos bounded. Clamping ocurre en blur, no en cada keystroke — el usuario puede escribir libremente y el valor se normaliza al salir del campo.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `formatOptions` via `Intl.NumberFormat` | Una prop cubre currency, percentage, units, y numeral systems — sin prefix/suffix props separadas; i18n automatica | HIGH | Adoptar si el DS necesita internacionalizacion seria; `formatter`/`parser` como alternativa para casos mas simples |
| Raw numeric value para form submission | El valor mostrado puede ser "€1,234.56" pero el submitted es `1234.56` — display y data correctamente separados | HIGH | Separacion de display value vs form value es critica para cualquier NumberInput con formato |
| Step anchoring desde `minValue` | Matematicamente correcto para rangos bounded — el primer valor valido es `minValue`, no 0 | MED | Documentar step anchoring behavior — consumer expectation es frecuentemente anchoring desde 0 |
| Clamping en blur, no en keystroke | UX mas fluida — el usuario puede escribir sin interrupciones | MED | Clamping-on-blur es el comportamiento correcto; keystroke clamping es disruptivo |

**Notable Props:** `formatOptions: Intl.NumberFormatOptions`, `minValue`, `maxValue`, `step`, `hideStepper: boolean`
**A11y:** `role="spinbutton"` con `aria-valuemin/max/now`. Stepper buttons con `aria-label`. Formatted display value anunciado; raw numeric en `aria-valuenow`. Best-in-class spinbutton.

---

### Carbon (IBM) — "Mobile split layout + two-tier validation"

Carbon tiene el layout movil mas ingenioso del ecosistema: en viewports estrechos, el boton de decremento se mueve a la izquierda del input y el incremento a la derecha (layout split), creando targets de toque mas amplios en cada lado del campo. En desktop usa chevrons up/down stacked dentro del input. Esta adaptation mobile-specific es unica entre todos los sistemas Tier 1 y Tier 2.

La validacion de dos niveles es la segunda decision diferenciadora: `warn` (yellow, non-blocking — el formulario puede ser enviado con advertencia) y `invalid` (red, blocking — el formulario no puede ser enviado). Esta diferenciacion cubre el caso enterprise de "soft warning" donde el valor es tecnico mente valido pero potencialmente problematico.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Mobile split layout (minus-left / plus-right) | Touch targets mas amplios en mobile — mejora significativa de usabilidad tactil | HIGH | Considerar si el DS target es mobile-primary; el layout split requiere breakpoint management |
| `warn` vs `invalid` two-tier validation | Enterprise forms necesitan advertencias no-bloqueantes — "este valor es inusual" vs "este valor es invalido" | HIGH | Dos tiers de validacion son validos para DS enterprise; para la mayoria `error` solo es suficiente |
| Stepper buttons fuera del Tab order | Arrow keys incrementan/decrementan el input focused; steppers clickeables pero no Tab-focusable — reduce Tab stops en formularios densos | MED | Debatible: WCAG requiere que acciones sean accesibles via keyboard, pero Arrow keys en el input cubren el requisito |
| `allowEmpty: boolean` | Permite que el campo este vacio (null vs 0 semantics) | MED | `allowEmpty` es critico para forms donde "no value" es diferente de "value=0" |

**Notable Props:** `size: "sm"|"md"|"lg"`, `warn: boolean`, `warnText`, `invalid: boolean`, `invalidText`, `min`, `max`, `step`, `allowEmpty: boolean`
**A11y:** `role="spinbutton"` con `aria-valuemin/max/now`. `aria-live` para value changes. Steppers fuera de Tab order pero accesibles via Arrow keys.

---

### Polaris (Shopify) — "`largeStep` + `aria-hidden` stepper decision"

Polaris maneja number input via `TextField type="number"` con dos features especificas: `largeStep` prop que agrega soporte de Page Up/Down para incrementos grandes (ajuste de cantidades de inventario de 10 o 100 unidades en lotes), y la decision deliberada de hacer los stepper buttons `aria-hidden="true"`. Esta segunda decision es documentada como intencional: previene que screen readers anuncien el cambio de valor dos veces (una por el change del input, una por el button activation).

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `largeStep` para Page Up/Down | Ajustes grandes de cantidad son comunes en Shopify Admin — Page Up/Down como shortcut de teclado es un UX enhancement real | HIGH | `step` para incremento base; `largeStep` o `shiftMultiplier` para incremento con Shift o Page Up/Down |
| Stepper buttons `aria-hidden` intencional | Previene doble announcement — el input change ya anuncia el nuevo valor; el button activation seria redundante | MED | La decision es tecnicament correcta pero reduce la affordance visual de los buttons para keyboard users |
| `min`/`max` como HTML attribute mirrors | Browser-native validation sin logica custom | LOW | Suficiente para casos simples; para formats custom, necesitas logica propia |

**Notable Props:** `type="number"`, `min`, `max`, `step`, `largeStep: number`
**A11y:** `role="spinbutton"` nativo de `<input type="number">`. Steppers `aria-hidden` previene doble announcement. `largeStep` con Page Up/Down bien documentado.

---

### Ant Design — "`formatter`/`parser` + `stringMode` para precision"

Ant Design's InputNumber es el mas feature-rich en Tier 1. El par `formatter`/`parser` habilita transformacion bidireccional del valor — mostrar "$ 1,000" mientras se almacena `1000`, o mostrar "50%" mientras se almacena `0.5`. `stringMode` usa representacion string para evitar la perdida de precision de float64 de JavaScript — critico para aplicaciones financieras y cientificas donde los valores pueden exceder los limites de Number. `Shift+Arrow` multiplica el step por 10 como shortcut de power user.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `formatter`/`parser` pair | Display value y stored value son controlados independientemente — la feature de formateo mas poderosa en Tier 1 | HIGH | `formatter`/`parser` es la API correcta si el DS necesita formatos custom que `Intl.NumberFormat` no cubre |
| `stringMode` para precision | JavaScript float64 pierde precision en valores grandes; `stringMode` usa strings para BigNumber/high-precision decimal | HIGH | Critico para DS de finanzas/contabilidad/ciencia — no necesario para casos generales |
| `Shift+Arrow` para 10x step | Power user shortcut para ajustes rapidos grandes | MED | `shiftMultiplier: 10` como default documentado |
| `addonBefore`/`addonAfter` slots | Units/currency symbols como contexto visual adjacent al input | MED | Slots de contexto son validos alternativa a prefix/suffix en el input mismo |
| `controls: false` | Remove stepper buttons para use cases donde solo se necesita el text field | MED | Boolean `hideControls` o `hideStepper` para layouts donde los buttons no son necesarios |

**Notable Props:** `formatter: (value) => string`, `parser: (displayValue) => number`, `stringMode: boolean`, `precision: number`, `step`, `controls: boolean`, `addonBefore`, `addonAfter`
**A11y:** `role="spinbutton"` con `aria-valuemin/max/now`. Stepper buttons con `aria-label`. `Shift+Arrow` no anunciado a screen readers (keyboard shortcut only).

---

### Chakra UI — "Compound architecture con format/parse y clampValueOnBlur"

Chakra's NumberInput usa arquitectura compound: `NumberInput`/`NumberInputField`/`NumberInputStepper`/`NumberIncrementStepper`/`NumberDecrementStepper`. Valor basado en string con `valueAsNumber` en onChange. `clampValueOnBlur` para clamping en blur. `format`/`parse` props para transformacion bidireccional de display. El compound architecture permite customizar o reemplazar cualquier parte del componente sin reimplementar toda la logica.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Compound architecture | Cada parte (field, steppers) es customizable independientemente — maxima flexibilidad de composicion | HIGH | Trade-off: mas boilerplate para el caso basico; mas flexibilidad para custom layouts |
| String-based value con `valueAsNumber` | Evita precision issues de float; `valueAsNumber` en onChange para consumers que necesitan el numero | MED | String-based internamente es la decision correcta; exponer ambos como Chakra hace |
| `clampValueOnBlur` | UX fluida durante escritura; normalizacion al salir del campo | MED | Default `true` es correcto |

**Notable Props:** Compound: `NumberInput`, `NumberInputField`, `NumberInputStepper`, `NumberIncrementStepper`, `NumberDecrementStepper`; `format`, `parse`, `clampValueOnBlur`, `min`, `max`, `step`
**A11y:** Full spinbutton ARIA contract: Up/Down arrows, Page Up/Down, Home/End. `aria-valuenow/min/max`.

---

### Fluent 2 (Microsoft) — "SpinButton con `displayValue` + `type='text'`"

Fluent 2 llama a su componente `SpinButton` (no NumberInput), reflejando su linea de Office toolbar. Usa `type="text"` (no `type="number"`) por consistency cross-browser. `displayValue` prop para unit annotation ("100%", "250px") que se muestra en el campo mientras el raw numeric es el valor almacenado. `stepPage` para Page Up/Down jumps mas grandes. Full keyboard contract del APG SpinButton.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `type="text"` sobre `type="number"` | Cross-browser consistency; evita scroll-to-change; permite formatted values con units | HIGH | El consenso Tier 3 es `type="text"` + `inputmode="numeric"` > `type="number"` |
| `displayValue` para unit annotation | Muestra "100%" en el campo; el raw value es 100 — separacion clara de display vs data con prop explicito | HIGH | `displayValue` es mas explicito que `formatter` para el caso simple de units |
| `stepPage` para jumps grandes | Page Up/Down con step mayor que el normal — complementario al step basico | MED | `shiftStep` o `pageStep` como complement a `step` |

**Notable Props:** `value`, `min`, `max`, `step`, `stepPage`, `displayValue`, `onChange`
**A11y:** `role="spinbutton"` con `aria-valuenow/min/max`. `aria-valuetext` para displayed value con units. Full keyboard: Up/Down, Page Up/Down, Home/End.

---

### Mantine — "La implementacion mas completa en Tier 3"

Mantine's NumberInput es la mas feature-complete en Tier 3 sin dependencias externas. `prefix`/`suffix` para units/currency. `thousandSeparator` para numeros grandes. `allowNegative: boolean`. `allowDecimal: boolean`. `clampBehavior: "blur"|"strict"` — strict mode clamps en cada keystroke, blur mode solo al salir del campo. Cubre currency, percentages, units, e integers con una sola API.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `prefix`/`suffix` para units | API directa para el patron mas comun ($/€, %, mg, px) | HIGH | `prefix`/`suffix` es mas intuitivo que `formatter`/`parser` para el caso simple de units |
| `thousandSeparator` | Numeros grandes (1,000,000) son ilegibles sin separadores — feature critica para finance | HIGH | Boolean o string para separator character (`,` en US, `.` en EU) |
| `allowNegative`/`allowDecimal` boolean controls | Control granular sobre el tipo de numero — sin pattern validation manual | HIGH | Booleans son mas claros que regex patterns para restricciones comunes |
| `clampBehavior: "blur"|"strict"` | Blur es mejor UX para la mayoria; strict es necesario en algunos casos de uso | MED | `clampBehavior` como prop configurable |

**Notable Props:** `prefix`, `suffix`, `thousandSeparator`, `allowNegative`, `allowDecimal`, `clampBehavior`, `min`, `max`, `step`
**A11y:** `role="spinbutton"`. Full keyboard contract. Sin dependencias externas para formatting.

---

### GOV.UK — "`inputmode="numeric"` con research backing"

GOV.UK no provee stepper controls por design — `inputmode="numeric"` con `pattern="[0-9]*"` en lugar de `type="number"`. Sin stepper controls. Field width comunica la longitud esperada del valor. Inputs compuestos separados para numeros complejos (ej. fecha: tres inputs separados para dia/mes/año). Su investigacion de usuarios es el argumento mas documentado contra `type="number"`.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `inputmode="numeric"` sobre `type="number"` | User research: `type="number"` scroll-to-change, inconsistencias de locale, y browser spinners conflictuando con DS buttons | HIGH | La investigacion de GOV.UK es el argumento mas fuerte para preferir `type="text"` + `inputmode` |
| Field width comunica longitud esperada | Visual affordance — un input angosto comunica "2 digitos" sin helper text | MED | Width-based affordance es un patron de UX de forms bien establecido |
| Sin stepper controls | Government service context: numeros de referencia, codigos postales, cantidades — steppers no aplican | MED | Context-specific; para DS generales, steppers siguen siendo validos para cantidades bounded |

**Notable Props:** `inputmode="numeric"`, `pattern="[0-9]*"`, width convencional
**A11y:** `inputmode="numeric"` + `type="text"` — keyboard numerica en mobile sin drawbacks de `type="number"`.

---

### Nord (Nordhealth) — "Seguridad clinica: sin steppers, sin scroll-to-change"

Nord usa `nord-input` con `type="number"` pero deshabilita los stepper buttons y el scroll-to-change. Unit labeling via prefix/suffix slots. `min`/`max`/`step` para enforcement de rango clinico. La razon es seguridad del paciente: un incremento accidental en un campo de dosificacion podria causar daño. Esta es la decision de diseno mas conservadora — y mas documentada — del ecosistema Tier 3.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Sin steppers (deliberado) | Riesgo de edicion accidental en campos de dosificacion clinica — seguridad del paciente | HIGH | Para DS de healthcare/finance/critical-safety: considerar deshabilitar steppers por default |
| Scroll-to-change deshabilitado | Scroll accidental modifica valores cuando el usuario intenta hacer scroll en la pagina | HIGH | Deshabilitar `wheel` event en inputs numericos es recomendacion universal — muchos sistemas lo implementan |

**Notable Props:** `type="number"`, prefix/suffix slots, `min`/`max`/`step`, sin steppers, sin scroll-to-change
**A11y:** Spinbutton ARIA nativo. Range enforcement via `min`/`max`. Sin edicion accidental.

---

### Cedar (REI) — "CdrInputNumber con +/- y min/max/step"

Vue number input con +/- stepper buttons. `min`/`max`/`step` configuration. Para cantidades de items o configuraciones bounded. El Tier 2 mas completo con stepper buttons integrados.

**Notable Props:** +/- buttons, `min`, `max`, `step`
**A11y:** Buttons con `aria-label="Increase"/"Decrease"`.

---

### Playbook (eBay) — "Quantity/numeric entry dual React/Rails"

Number input para entry de cantidades y numericos. Dual React/Rails support.

**Notable Props:** Quantity entry, dual framework
**A11y:** Standard spinbutton.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: spin-field con formateo + clamping + accesibilidad de spinbutton**

El NumberInput es el componente de form mas tecnico del ecosistema — la mayoria de los problemas son de bajo nivel (float precision, locale formatting, scroll-to-change, cross-browser behavior). El archetype correcto es un controlled text input que presenta un interface spinbutton accesible, con formateo bidireccional opcional y stepper buttons como enhancement visual.

**Recomendacion:** `type="text"` + `inputmode="numeric"` + `role="spinbutton"` manual (Fluent2/GOV.UK approach) para maximo control. Stepper buttons como opt-in — `hideStepper` boolean para casos donde no son adecuados. `formatter`/`parser` o `prefix`/`suffix` + `thousandSeparator` para formateo.

### Slot Consensus Table

| Slot | Sistemas | Consenso |
|------|----------|----------|
| input field | Todos | 12/12 |
| increment button | Carbon, Spectrum, Ant Design, Chakra, Fluent2, Mantine, Cedar, Playbook | 8/12 |
| decrement button | Carbon, Spectrum, Ant Design, Chakra, Fluent2, Mantine, Cedar, Playbook | 8/12 |
| label | Todos (via form field wrapper) | 12/12 |
| helper/error text | Carbon, Spectrum, Ant Design, Chakra, Mantine | 5/12 |
| prefix/addon antes | Ant Design (addonBefore), Mantine (prefix), Nord | 3/12 |
| suffix/addon despues | Ant Design (addonAfter), Mantine (suffix), Nord | 3/12 |
| unit display | Fluent2 (displayValue), Mantine (suffix), Nord | 3/12 |

### Property Consensus Table

| Propiedad | Valores observados | Consenso |
|-----------|-------------------|---------:|
| min | number | 10/12 |
| max | number | 10/12 |
| step | number | 10/12 |
| size | sm, md, lg | 4/12 |
| disabled | boolean | 8/12 |
| invalid/isInvalid | boolean | 6/12 |
| precision/decimals | number | 4/12 |
| formatter | function | 3/12 |
| parser | function | 3/12 |
| allowEmpty | boolean | 2/12 |
| stringMode | boolean | 1/12 (Ant Design) |
| largeStep/stepPage | number | 2/12 |
| controls/hideStepper | boolean | 2/12 |

### Boolean Properties Table

| Prop | Default | Sistemas |
|------|---------|----------|
| disabled | false | Todos |
| invalid | false | Carbon, Spectrum, Ant Design, Chakra |
| warn | false | Carbon solamente |
| allowEmpty | false | Carbon |
| stringMode | false | Ant Design |
| allowNegative | true | Mantine |
| allowDecimal | true | Mantine |
| hideStepper | false | Spectrum (hideStepper), Ant Design (controls: false) |
| clampValueOnBlur | true | Chakra, Mantine |

### State Coverage Table

| Estado | Sistemas | Consenso |
|--------|----------|----------|
| default | Todos | 12/12 |
| hover | Mayoria | 8/12 |
| focused (input) | Todos | 12/12 |
| disabled | Todos | 12/12 |
| invalid/error | Carbon, Spectrum, Ant Design, Chakra, Mantine, Fluent2 | 6/12 |
| warn (non-blocking) | Carbon solamente | 1/12 |
| at-min (decrement disabled) | Spectrum, Chakra, Fluent2 | 3/12 |
| at-max (increment disabled) | Spectrum, Chakra, Fluent2 | 3/12 |
| loading | Ninguno | 0/12 |
| read-only | Carbon, Spectrum | 2/12 |

### Exclusion Patterns

- **`type="number"` browser native spinners**: 3 sistemas (GOV.UK, Fluent2, Nord) explicitamente rechazan `type="number"` — el consenso emergente es `type="text"` + `inputmode="numeric"` con custom spinbutton ARIA
- **Scroll-to-change**: Nord deshabilita explicitamente; es recomendado deshabilitarlo en todos los NumberInputs — accidental value modification es UX y accessibility concern
- **Stepper buttons como default para rangos grandes**: Gestalt, Evergreen, Orbit, Base Web todos excluyen steppers para sus contextos — steppers solo son apropiados para small-range bounded integers

### Building Block Candidates

- `NumberInput` → base con stepper + spinbutton ARIA + clamping
- `CurrencyInput` → NumberInput con prefix/suffix currency + thousandSeparator
- `PercentInput` → NumberInput con suffix % + 0-100 range
- `QuantityInput` → NumberInput con size-constrained display + min=0 + integer-only

### Enum / Configuration Properties

```
size: "sm" | "md" | "lg"
clampBehavior: "blur" | "strict" | "none"
inputMode: "numeric" | "decimal"
type: "text" | "number"  (text recomendado)
validationState: "valid" | "invalid" | "warn"
```

### A11y Consensus

| Dimension | Consenso | Implementacion |
|-----------|----------|----------------|
| Role | `role="spinbutton"` — nativo en `type="number"`, manual en `type="text"` | Si se usa `type="text"`, agregar `role="spinbutton"` + `aria-valuenow/min/max` manualmente |
| ARIA valores | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` obligatorios | Sincronizar con el valor actual y los limites |
| `aria-valuetext` | Requerido cuando el valor mostrado incluye units/formato ("100%", "250mg") | Fluent2 `displayValue`, Ant Design con `formatter` necesitan `aria-valuetext` |
| Teclado | ↑↓ incrementa/decrementa por step; Page Up/Down por `largeStep`; Home/End a min/max | Full APG SpinButton keyboard contract |
| Buttons | `aria-label="Increment"/"Decrement"` en stepper buttons — nunca icon-only sin label | Carbon y Spectrum como referencia |
| Scroll-to-change | Deshabilitar `wheel` event en input focused — accidental modification | `e.preventDefault()` en wheel event cuando input focused |
| APG Pattern | WAI-ARIA SpinButton Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/ |

---

## What Everyone Agrees On

1. **`role="spinbutton"` es el ARIA correcto.** Sin excepcion — native `<input type="number">` lo lleva implicito; custom implementations deben agregarlo manualmente.
2. **`aria-valuenow`, `aria-valuemin`, `aria-valuemax` son obligatorios.** El spinbutton ARIA contract requiere los tres — sin ellos, screen readers no pueden anunciar el valor o los limites.
3. **Stepper buttons deben tener `aria-label`.** "Increment"/"Decrement" o equivalente — icon-only buttons sin label son el failure de a11y mas comun en number inputs.
4. **Clamping en blur, no en keystroke.** 8/12 sistemas implementan clamping-on-blur — es el comportamiento de UX correcto para no interrumpir la escritura del usuario.
5. **`min`/`max`/`step` son props fundamentales.** 10/12 sistemas los proveen — son el API minimo de cualquier NumberInput que acepte rangos bounded.
6. **Scroll-to-change debe ser deshabilitado.** El consenso emergente es que `wheel` event modificando el valor es un anti-patron — Nord lo deshabilita por seguridad clinica; GOV.UK lo evita usando `type="text"`; es buena practica universal.
7. **Separar display value de form value.** `formatter`/`parser` (Ant Design, Chakra), `displayValue` (Fluent2), o `prefix`/`suffix` (Mantine) — el valor almacenado debe ser siempre el numero raw, no el string formateado.

---

## Where They Disagree

**1. ¿`type="number"` o `type="text"` con `inputmode="numeric"`?**
- **Option A (`type="number"` — Carbon, Cedar, Playbook, Spectrum):** ARIA spinbutton nativo; browser validation; mas simple
- **Option B (`type="text"` + inputmode — GOV.UK, Fluent2, Nord, Mantine):** Control total del formatting; evita scroll-to-change; evita inconsistencias de locale; browser spinners no interfieren con DS buttons

**2. ¿`Intl.NumberFormat` via `formatOptions` o `formatter`/`parser` pair?**
- **Option A (Spectrum — `formatOptions`):** Una prop cubre todos los formatos internacionales — i18n automatica; no requiere custom logic
- **Option B (Ant Design, Chakra — `formatter`/`parser`):** Flexibilidad total para formatos custom; no requiere `Intl.NumberFormat` knowledge; mas verboso

**3. ¿Steppers built-in o opt-out?**
- **Option A (Carbon, Spectrum, Ant Design, Chakra, Mantine — steppers default):** Stepper buttons visibles por default con `hideStepper` para opt-out
- **Option B (Gestalt, Orbit, Evergreen, Nord — sin steppers):** Sin stepper buttons — context-specific donde steppers son inapropiados para el dominio

**4. ¿Compound architecture o API flat?**
- **Option A (Chakra — compound):** `NumberInput`/`NumberInputField`/`NumberInputStepper` — maxima composabilidad; mas boilerplate
- **Option B (Ant Design, Spectrum, Mantine — API flat):** Un componente con props — menos boilerplate; menos flexible para custom layouts

**5. ¿Validacion de dos niveles (warn + invalid) o solo invalid?**
- **Option A (Carbon — `warn` + `invalid`):** Dos tiers: warning no-bloqueante + invalid bloqueante — cubre "soft warning" enterprise
- **Option B (Todos los demas — solo `invalid`/error):** Un tier de validacion — mas simple; el caso de "soft warning" es raro fuera de enterprise IBM

---

## Visual Patterns Found

### Patron 1: Standard NumberInput con steppers (stacked)

```
Label
┌─────────────────────────────────┐
│  42                         [▲] │
│                             [▼] │
└─────────────────────────────────┘
Helper text
```

### Patron 2: Carbon mobile split layout

```
Desktop:                         Mobile (narrow):
Label                            Label
┌──────────────────────┐         ┌──────────────────────────┐
│ 42              [▲]  │         │ [−]    42          [+]   │
│                 [▼]  │         └──────────────────────────┘
└──────────────────────┘                ↑ split layout
  stacked steppers                      wider touch targets
```

### Patron 3: Formatted NumberInput (currency/percentage)

```
$  label                         % label
┌─────────────────────┐          ┌─────────────────────┐
│ $ │  1,234.56   [▲] │          │  95.5           [▲] │  %
│   │             [▼] │          │                 [▼] │
└─────────────────────┘          └─────────────────────┘
prefix slot                      suffix slot
```

### Patron 4: States (valid / warn / invalid)

```
Default:                 Warn:                    Invalid:
┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐
│  42           [▲] │   │  9999         [▲] │   │  -5           [▲] │
│               [▼] │   │               [▼] │   │               [▼] │
└───────────────────┘   └───────────────────┘   └───────────────────┘
                        ⚠ Unusually high value   ✕ Value below minimum
                        (non-blocking warn)       (blocking error)
```

### Patron 5: At-min / At-max boundary

```
At minimum (value = min):        At maximum (value = max):
┌────────────────────────┐       ┌────────────────────────┐
│  0                 [▲] │       │  100               [▲] │
│                [−̶]̶ [▼] │       │                    [▼] │
└────────────────────────┘       └────────────────────────┘
  decrement disabled                increment disabled
  aria-disabled="true"              aria-disabled="true"
```

---

## Risks to Consider

| Riesgo | Severidad | Detalle |
|--------|-----------|---------|
| Scroll-to-change modificando valores accidentalmente | HIGH | Un usuario que hace scroll en la pagina con el cursor sobre un `<input type="number">` focused modifica el valor sin intencion. Este es el anti-patron mas documentado en number inputs — GOV.UK, Nord, y la investigacion de Fluent2 todos lo mencionan. Deshabilitar `wheel` event cuando el input es focused es la solucion. |
| Float64 precision loss en valores financieros | HIGH | JavaScript `Number` pierde precision para valores como `0.1 + 0.2 = 0.30000000000004`. Para DS que manejan currency/accounting, `stringMode` (Ant Design) o Decimal.js externamente es necesario. Sin mitigacion, los calculos financieros producen resultados incorrectos. |
| `aria-valuetext` faltante en inputs con units | MEDIUM | Sin `aria-valuetext`, un screen reader anuncia "current value: 100" para un campo de "100%". Con `aria-valuetext="100 percent"`, el contexto es completo. Los sistemas con `formatter`/`displayValue` deben sincronizar `aria-valuetext` con el valor formateado. |
| Stepper buttons icon-only sin `aria-label` | MEDIUM | El failure de a11y mas comun en custom number inputs — botones +/- sin label accessible. Screen readers anuncian "button" sin contexto. Carbon y Spectrum como referencias para labels correctos. |

---

## Next Steps

1. **Decidir `type="text"` + `inputmode="numeric"` vs `type="number"`** — evaluar si el DS target tiene casos de uso que requieren formatted values (currency, units) que hacen `type="number"` impractico.
2. **Elegir formatting API**: `Intl.NumberFormat` via `formatOptions` (Spectrum) vs `formatter`/`parser` pair (Ant Design) vs `prefix`/`suffix` + `thousandSeparator` (Mantine).
3. **Deshabilitar scroll-to-change** en el input por default — patron de seguridad recomendado universalmente.
4. **Implementar full spinbutton keyboard contract**: ↑↓ step, Page Up/Down largeStep, Home/End min/max.
5. **Definir boundary states**: decrement disabled cuando value=min; increment disabled cuando value=max — con `aria-disabled` correcto.
6. **Evaluar si `stringMode` o precision management** es necesario para el dominio del DS.
