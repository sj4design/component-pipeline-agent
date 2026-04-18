# NumberInput

## Overview

El componente `NumberInput` es un campo de entrada numérica que combina un input de texto con botones de stepper (incremento/decremento). Implementa el patrón ARIA `spinbutton` —el rol semántico correcto para un campo numérico con límites y pasos definidos. El input acepta valores enteros o decimales y los enmarca opcionalmente con prefijos/sufijos contextuales (símbolos de moneda, unidades de medida). Los steppers son una conveniencia visual para mouse/touch; el teclado opera el spinbutton directamente desde el input.

```
┌────────────────────────────────────────────────────────────┐
│  [addon-before]  [    valor    ]  [addon-after]  [▲]       │
│                                                  [▼]       │
└────────────────────────────────────────────────────────────┘
   ↑ addon-before: opcional ($, €, £)
                              ↑ input: texto editable, role=spinbutton
                                           ↑ addon-after: opcional (kg, %, px)
                                                          ↑ steppers: sólo si Has Stepper
```

Los steppers están fusionados al borde derecho del campo y comparten la misma altura del input. El addon antes y el addon después son contenedores de texto independientes, visualmente distintos del campo de entrada.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Size:  sm | md | lg
State: default | error | disabled
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Stepper      → muestra/oculta botones ▲▼ (default: true)
Has Addon Before → muestra/oculta prefijo (default: false)
Has Addon After  → muestra/oculta sufijo  (default: false)
```

### Figma properties panel

```
┌─────────────────────────────────────┐
│  NumberInput                        │
│  ─────────────────────────────────  │
│  Size        [md            ▾]      │
│  State       [default       ▾]      │
│  ─────────────────────────────────  │
│  Has Stepper      [●──────────]     │
│  Has Addon Before [○──────────]     │
│  Has Addon After  [○──────────]     │
│  ─────────────────────────────────  │
│  ✏️ Value         0                  │
│  ✏️ Addon Before  $                  │
│  ✏️ Addon After   kg                 │
└─────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El valor a ingresar es un número?
    │
    ├─ No ─► TextInput o el campo apropiado
    │
    └─ Sí ─► ¿El rango es amplio (>100 opciones)?
                 ├─ Sí ─► Slider o TextInput libre
                 └─ No ─► ¿El usuario necesita ajustes incrementales pequeños?
                              ├─ Sí ─► NumberInput (con stepper)
                              └─ No ─► NumberInput (sin stepper) o Select
```

**Use NumberInput cuando:**
- El usuario necesita ingresar un número dentro de un rango bounded (cantidad de items, porcentaje, dimensión en px).
- Los ajustes incrementales son comunes y los steppers mejoran la UX de precisión.
- El valor necesita contexto de unidad visual ($ 100, 95 kg, 250 ms).
- El campo es parte de un formulario donde el valor exacto importa (no una selección de opciones discretas).

**Do NOT use NumberInput cuando:**
- El rango es muy amplio (ej. 1–10,000) y los steppers son impracticables → usa TextInput con validación.
- El usuario elige entre un conjunto pequeño de opciones discretas (1, 2, 3) → usa Select o RadioGroup.
- El valor es siempre texto libre que puede contener números pero no es estrictamente numérico → usa TextInput.
- El dominio es clínico o financiero crítico con riesgo de edición accidental → evalúa deshabilitar steppers por default (patrón Nord).

---

## Visual variations

### Por Size

```
sm (32px height):
┌──────────────────────────────┐
│  42                     [▲] │  h: 32px, font: 12px
│                         [▼] │  px: 8px, stepper: 28px
└──────────────────────────────┘

md (40px height):
┌──────────────────────────────┐
│  42                     [▲] │  h: 40px, font: 14px
│                         [▼] │  px: 12px, stepper: 32px
└──────────────────────────────┘

lg (48px height):
┌──────────────────────────────┐
│  42                     [▲] │  h: 48px, font: 16px
│                         [▼] │  px: 16px, stepper: 36px
└──────────────────────────────┘
```

### Por State

```
default:
┌──────────────────────────────┐
│  42                     [▲] │  border: border/default (#D1D1D9)
└──────────────────────────────┘

error:
┌──────────────────────────────┐  border: border/error (#DB2424)
│  -5                     [▲] │
└──────────────────────────────┘
⚠ Valor mínimo es 0

disabled:
┌──────────────────────────────┐  bg: surface/disabled
│  42                     [▲] │  border: border/disabled
│                         [▼] │  fg: text/disabled, opacity: 0.5
└──────────────────────────────┘
```

### Con Addon (prefijo/sufijo)

```
Has Addon Before (moneda):
┌───────────────────────────────────────────────┐
│ $ │  1,234.56                            [▲]  │
│   │                                     [▼]  │
└───────────────────────────────────────────────┘

Has Addon After (unidades):
┌───────────────────────────────────────────────┐
│  95.5                               kg │ [▲] │
│                                         │ [▼] │
└───────────────────────────────────────────────┘

Sin Stepper (solo input libre):
┌──────────────────────────────────────────────────┐
│  42                                              │
└──────────────────────────────────────────────────┘
```

### Boundary states (en-tiempo-de-ejecución, no variants Figma)

```
At minimum (value = min):        At maximum (value = max):
┌────────────────────────────┐   ┌────────────────────────────┐
│  0                    [▲]  │   │  100                  [▲]  │
│                   [▼ dim]  │   │               [▲ dim]      │
└────────────────────────────┘   └────────────────────────────┘
  decrement: aria-disabled        increment: aria-disabled
```

---

## Design decisions

### 1. Steppers verticales (stacked) como default en desktop

**Por qué:** El layout de steppers stacked (▲ encima de ▼ dentro del borde derecho del input) es el estándar adoptado por 4/5 sistemas Tier 1 que tienen este componente (Carbon en desktop, Spectrum, Ant Design, Chakra). El layout split (− | input | +) de Carbon en mobile es específico para touch y requiere lógica de breakpoint que complica Figma.

**Trade-off:** Los steppers stacked son menos accesibles en pantallas táctiles pequeñas porque los targets son más pequeños. Si el DS tiene un uso mobile-primary significativo, considerar exponer el layout split como variante de tamaño o viewport.

---

### 2. Steppers no Tab-focusables (solo click/touch)

**Por qué:** Carbon y Polaris documentan explícitamente esta decisión: las Arrow Keys sobre el input operan el spinbutton (↑ = +1, ↓ = −1), que es el contrato keyboard del patrón ARIA. Los steppers son conveniencia de mouse/touch. Reducir Tab stops en formularios densos mejora la experiencia de teclado. Los steppers tienen `aria-hidden="true"` o `tabIndex={-1}`.

**Trade-off:** Un usuario que navega solo con Tab no verá los steppers en el orden de foco. Es correcto porque el input mismo es el punto de interacción. La operación de incremento/decremento es accesible via Arrow Keys en el input, cumpliendo WCAG 2.1.1 (Keyboard).

---

### 3. Addon Before/After como booleanTextPairs (texto editable fuera del input)

**Por qué:** Ant Design y Polaris tienen `addonBefore`/`addonAfter` para unidades contextuales ('$', 'kg', '%'). Son contenedores de texto que renderizan fuera del campo de entrada —visualmente parte del componente, semánticamente separados. Booleans porque son opcionales; el texto default es editable en Figma para que el designer cambie '$' por '€' sin necesidad de crear nuevas variantes.

**Trade-off:** El dev necesita sincronizar el addon con `aria-valuetext` cuando el valor tiene unidad: `aria-valuetext="95 kilogramos"` en lugar de solo `95`. Documentado como responsabilidad de implementación.

---

### 4. Clamping en blur, no en cada keystroke

**Por qué:** 8/12 sistemas implementan clamping-on-blur. Durante la escritura, el usuario puede estar en mitad de ingresar un número válido (ej. escribiendo "1" cuando el mínimo es 10) —clampear en keystroke interrumpe el flujo y genera frustración. Al salir del campo (`blur`), el valor se normaliza al rango válido.

**Trade-off:** El valor mostrado puede ser temporalmente fuera de rango mientras el usuario escribe. Para casos donde esto es problemático (ej. calculadoras en tiempo real), `clampBehavior: "strict"` (Mantine pattern) es una opción configurable.

---

### 5. `type="text"` + `inputmode="numeric"` recomendado (no `type="number"`)

**Por qué:** GOV.UK, Fluent 2 y Nord rechazan explícitamente `type="number"` por tres razones documentadas: (1) scroll-to-change modifica el valor accidentalmente cuando el cursor pasa sobre el campo; (2) inconsistencias de locale en el formato del número; (3) los browser spinners nativos interfieren con los steppers del DS. Con `type="text"` + `role="spinbutton"` manual se tiene control total del comportamiento.

**Trade-off:** Requiere implementar el contrato ARIA de spinbutton manualmente (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`). Más trabajo de dev, pero el resultado es más robusto y consistente.

---

## Behavior

### Essential for design

- **Steppers fuera del Tab order.** El input recibe el foco; ↑/↓ incrementan/decrementan.
- **Clamping en blur.** El valor se normaliza al rango min/max al salir del campo.
- **At-min/max:** El botón de decremento se deshabilita (`aria-disabled="true"`) cuando `value === min`; el botón de incremento cuando `value === max`.
- **Addon antes/después** renderiza como contenedores de texto separados del input, fusionados visualmente al borde del campo.
- **Scroll-to-change deshabilitado.** El evento `wheel` no modifica el valor (anti-patrón documentado universalmente).

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Input | `spinbutton` (manual si `type="text"`) | `aria-valuemin`, `aria-valuemax`, `aria-valuenow`; `aria-valuetext` si hay addon/unidad | Contrato completo del spinbutton para screen readers |
| Increment button | `button` | `aria-label="Incrementar"`, `tabIndex={-1}` | Sin label, el SR anuncia "button" sin contexto |
| Decrement button | `button` | `aria-label="Decrementar"`, `tabIndex={-1}` | Ídem |
| Increment at-max | `button` | `aria-disabled="true"` | SR anuncia que la acción no está disponible |
| Decrement at-min | `button` | `aria-disabled="true"` | Ídem |
| State=error | Input | `aria-invalid="true"`, `aria-errormessage="error-id"` | El SR asocia el mensaje de error con el campo |
| State=disabled | Input | `disabled` | Excluye del orden de foco; SR no anuncia como interactivo |

### Keyboard navigation

Primary interactions (affect design):

```
↑ Arrow       → incrementa valor en 1 paso (step)
↓ Arrow       → decrementa valor en 1 paso (step)
Shift+↑/↓     → incrementa/decrementa en 10× (shiftMultiplier)
Page Up       → incrementa en paso grande (largeStep)
Page Down     → decrementa en paso grande
Home          → establece valor al mínimo (min)
End           → establece valor al máximo (max)
```

Secondary interactions (dev reference):

```
Tab           → mueve foco al campo (steppers no reciben Tab)
Shift+Tab     → foco al elemento anterior
Enter         → confirma valor en algunos contextos de form
Blur          → dispara clamping si value está fuera de rango
```

---

## Content guide

### `addon-before` (slot opcional, Has Addon Before)
- **Qué va aquí:** Símbolo de moneda o prefijo contextual. Máx. 3–4 caracteres.
- **Ejemplos:** `$`, `€`, `£`, `USD`, `MXN`.
- **Evitar:** Palabras largas como prefijo —el campo se hace confuso. Para labels largos usar el label del form field.

### `input` (slot obligatorio)
- **Qué va aquí:** El valor numérico. Default "0".
- **Formato:** El developer controla el formatter. El designer muestra el valor formateado en el texto property.
- **Placeholder:** Usar solo cuando el campo puede estar vacío y "0" tiene semántica diferente de "sin valor".

### `addon-after` (slot opcional, Has Addon After)
- **Qué va aquí:** Unidad de medida o sufijo contextual.
- **Ejemplos:** `kg`, `%`, `px`, `ms`, `°C`, `días`.
- **Evitar:** Combinar addon-before Y addon-after simultáneamente es válido pero raro (ej. `$100.00 USD`).

### `decrement` / `increment` (slots condicionales, Has Stepper)
- **Qué va aquí:** Iconos ▲▼ o −/+. El designer no cambia el contenido —solo elige si mostrarlos.
- **Tamaño:** Proporcional al size del componente (sm: 12px, md: 14px, lg: 16px).

---

## Pre-build checklist

```
[ ] Size tiene valores: sm, md, lg
[ ] State tiene valores: default, error, disabled
[ ] Dimensiones correctas por size:
    sm: h=32, py=6, px=8, font=12, stepper-w=28
    md: h=40, py=8, px=12, font=14, stepper-w=32
    lg: h=48, py=12, px=16, font=16, stepper-w=36
[ ] Has Stepper toggle funcional (default: true)
[ ] Has Addon Before toggle + ✏️ Addon Before editables
[ ] Has Addon After toggle + ✏️ Addon After editables
[ ] State=error: borde rojo (border/error)
[ ] State=disabled: fondo surface/disabled, texto text/disabled
[ ] Steppers: ▲ arriba, ▼ abajo, dentro del borde derecho del input
[ ] Steppers: fondo surface/hover, separados del input por borde
[ ] Focus ring visible al estado de foco del input (border/focus)
[ ] Tokens nmi- aplicados: nmi/bg, nmi/border, nmi/fg, nmi/stepper-bg, nmi/stepper-fg
[ ] 9 frames en el grid (3 sizes × 3 states)
```

---

## Related components

```
TextInput          → input de texto libre (sin spinbutton ARIA)
Slider             → rango amplio con control visual continuo
Select             → opciones discretas y pequeñas (1-10 items)
CurrencyInput      → NumberInput especializado con prefix $
PercentInput       → NumberInput con suffix % y rango 0-100
QuantityInput      → NumberInput con min=0, enteros, small range
```

---

## Reference: how other systems do it

### Spectrum (Adobe) — Intl.NumberFormat: la implementación más internacionalizada

Spectrum's `NumberField` es la implementación más completa de formateo internacional. El prop `formatOptions` acepta exactamente las opciones de `Intl.NumberFormat` —currency, percentage, units y tres sistemas numéricos diferentes se soportan sin código adicional. El cálculo de step anchoring se realiza desde `minValue`, no desde 0: `minValue=2, step=5` produce 2, 7, 12, 17 (matematicamente correcto para rangos bounded). El clamping ocurre en blur, no en keystroke. `hideStepper` boolean para casos donde los botones no son apropiados.

### Carbon (IBM) — Mobile split layout y two-tier validation

Carbon tiene el layout mobile más ingenioso: en viewports estrechos, el botón de decremento se mueve a la izquierda del input y el incremento a la derecha (layout split), creando targets de toque más amplios. La validación de dos niveles (`warn` no-bloqueante + `invalid` bloqueante) cubre el caso enterprise de "soft warning". `allowEmpty: boolean` para semántica null vs. zero —crítico cuando vacío no es lo mismo que cero.

### Ant Design — `formatter`/`parser` y `stringMode` para precisión financiera

El par `formatter`/`parser` es la API de formateo más potente en Tier 1: `formatter: (v) => "$ " + v.toLocaleString()` + `parser: (v) => v.replace(/\$\s?|(,*)/g, '')`. `stringMode` usa representación string para evitar la pérdida de precisión de float64 de JavaScript —crítico para finanzas donde `0.1 + 0.2 ≠ 0.3`. `Shift+Arrow` multiplica el step por 10 como shortcut de power user. `addonBefore`/`addonAfter` como slots de contexto visual.

### Fluent 2 (Microsoft) — SpinButton con `displayValue` y `type="text"`

Fluent 2 llama al componente `SpinButton` reflejando su linaje de Office. Usa `type="text"` (no `type="number"`) por consistencia cross-browser. `displayValue` prop muestra "100%" en el campo mientras el valor almacenado es `100` —separación explícita de display vs. data. `stepPage` para Page Up/Down con paso mayor que el normal. Full keyboard contract del APG SpinButton.

### GOV.UK — `inputmode="numeric"` con research backing

GOV.UK no provee stepper controls por diseño —`inputmode="numeric"` con `pattern="[0-9]*"`. Su investigación de usuarios es el argumento más documentado contra `type="number"`: scroll-to-change, inconsistencias de locale, y browser spinners conflictuando con los botones del DS. El ancho del campo comunica la longitud esperada del valor como affordance visual.

### Polaris (Shopify) — `largeStep` y steppers `aria-hidden` intencional

`largeStep` agrega soporte de Page Up/Down para incrementos grandes (ajuste de inventario de 10 o 100 unidades en lotes). Los stepper buttons tienen `aria-hidden="true"` de forma intencional: previene que los screen readers anuncien el cambio de valor dos veces (una por el change del input, otra por el button activation). El input change ya anuncia el nuevo valor.

### Mantine — La implementación más completa en Tier 3

`prefix`/`suffix` para units/currency. `thousandSeparator` para números grandes. `allowNegative: boolean`. `allowDecimal: boolean`. `clampBehavior: "blur"|"strict"` —strict clampea en cada keystroke, blur solo al salir. Una sola API cubre currency, percentages, units e integers. La más feature-complete sin dependencias externas.

### Nord (Nordhealth) — Seguridad clínica: sin steppers, sin scroll-to-change

Nord deshabilita los stepper buttons y el scroll-to-change por seguridad del paciente: un incremento accidental en un campo de dosificación clínica podría causar daño. Esta es la decisión de diseño más conservadora del ecosistema —y la más documentada. Para DS de healthcare o sistemas críticos, considerar deshabilitar steppers por default.

---

## Tokens

**12 tokens** · prefix `nmi-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `nmi/bg` | `surface/default` | Fondo del input |
| `nmi/border` | `border/default` | Borde del campo en estado default |
| `nmi/border-focus` | `border/focus` | Borde al enfocar (azul) |
| `nmi/border-error` | `border/error` | Borde en estado error (rojo) |
| `nmi/fg` | `text/primary` | Color del valor ingresado |
| `nmi/stepper-bg` | `surface/hover` | Fondo de los botones stepper |
| `nmi/stepper-fg` | `text/secondary` | Color de los íconos ▲▼ |
| `nmi/stepper-border` | `border/default` | Borde de separación stepper/input |
| `nmi/disabled/bg` | `surface/disabled` | Fondo en estado disabled |
| `nmi/disabled/fg` | `text/disabled` | Texto en estado disabled |
| `nmi/error/fg` | `status/error/fg` | Color del texto de error y ícono |
| `nmi/radius` | `radius/md` | Border radius |
| `focus/ring` | `border/focus` | Anillo de focus visible |

### Spacing specs

```
Size sm:
  height:    32px   (controlHeights/sm)
  padding-y: 6px
  padding-x: 8px
  font-size: 12px   (typeScale/sm)
  line-height: 16px
  radius:    6px
  stepper-w: 28px
  icon-size: 12px   (iconSizes/xs)
  gap:       6px

Size md:
  height:    40px   (controlHeights/md)
  padding-y: 8px
  padding-x: 12px
  font-size: 14px   (typeScale/md)
  line-height: 20px
  radius:    6px
  stepper-w: 32px
  icon-size: 14px
  gap:       8px

Size lg:
  height:    48px   (controlHeights/lg)
  padding-y: 12px
  padding-x: 16px
  font-size: 16px   (typeScale/lg)
  line-height: 24px
  radius:    8px
  stepper-w: 36px
  icon-size: 16px
  gap:       8px

Focus ring:
  width:  2px   (focus/ringWidth)
  offset: 2px   (focus/ringOffset)
  color:  border/focus
```
