# NumberInput

## Descripción general

NumberInput es el control de entrada numérica del sistema de diseño: un campo de texto restringido a valores numéricos con botones de stepper (+ / −) integrados. A diferencia de un TextField con `type="number"`, NumberInput gestiona el incremento/decremento mediante botones visuales, clamping automático en blur, y navegación por teclado con Arrow keys — todo bajo el patrón ARIA `role="spinbutton"`. Es el patrón estándar para cantidades, volumen, edad, precios, y cualquier valor numérico que tenga un rango razonable.

```
Size=md, State=default:
┌──────────────────────────────────────────────────┐
│  12                                     [−] [+]  │  h:40px
└──────────────────────────────────────────────────┘

Con Addon Before (moneda):
┌─────┬──────────────────────────────────┬──────────┐
│  $  │  1,200                           │ [−] [+]  │
└─────┴──────────────────────────────────┴──────────┘

Con Addon After (unidad):
┌──────────────────────────────────────┬─────┬──────────┐
│  75                                  │ kg  │ [−] [+]  │
└──────────────────────────────────────┴─────┴──────────┘

States:
│  default:  bg:white   border:default  fg:primary        │
│  error:    bg:white   border:error    fg:primary         │
│  disabled: bg:disabled border:disabled fg:disabled       │
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Size  → sm | md | lg
State → default | error | disabled
```

Toggles:

```
👁 Has Stepper      → muestra/oculta los botones − / + (default: on)
👁 Has Addon Before → muestra/oculta el slot de texto izquierdo (default: off)
👁 Has Addon After  → muestra/oculta el slot de texto derecho (default: off)
```

Texto editable:

```
✏️ Value        → "0"
✏️ Addon Before → "$"
✏️ Addon After  → "kg"
```

### Panel de propiedades en Figma

```
┌──────────────────────────────────────────────────────────┐
│  NumberInput                                             │
│  ──────────────────────────────────────────────────────  │
│  Size   [ md              ▼ ]                            │
│  State  [ default         ▼ ]                            │
│  ──────────────────────────────────────────────────────  │
│  👁 Has Stepper      [ on  ]                             │
│  👁 Has Addon Before [ off ]                             │
│  👁 Has Addon After  [ off ]                             │
│  ✏️ Value        [ 0                              ]      │
│  ✏️ Addon Before [ $                              ]      │
│  ✏️ Addon After  [ kg                             ]      │
└──────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El usuario necesita ingresar un valor numérico?
                    │
                    ▼
       ¿Tiene un rango razonable y pasos discretos?
       ├── Sí → NumberInput (steppers + clamping)
       └── No → TextField con type="number"
                    │
                    ▼
       ¿El rango es continuo y visual?
       └── Sí → Slider (para volumen, brillo, porcentajes)
                    │
                    ▼
       ¿Es un código de longitud fija?
       └── Sí → PinInput (OTP, PIN)
```

**Usar NumberInput cuando:**
- Cantidad de ítems en un carrito (1–99)
- Tamaño de fuente en un editor (8–96)
- Edad en un formulario (1–120)
- Precio con símbolo de moneda (`$`) como addon-before
- Peso o medida con unidad (`kg`, `cm`, `%`) como addon-after

**NO usar NumberInput cuando:**
- El valor es continuo y relativo (0–100%) → usar `Slider`
- Es un código numérico de longitud fija → usar `PinInput`
- No tiene rango ni validación numérica → usar `TextField`
- El incremento no es lineal (ej. potencias de 2) → input libre + validación

---

## Variaciones visuales

### Size

| Size | Height | PaddingX | PaddingY | FontSize | StepperW | IconSize | Radius |
|------|--------|---------|---------|---------|---------|---------|--------|
| sm   | 32px   | 8px     | 6px     | 12px    | 28px    | 12px    | 6px    |
| md   | 40px   | 12px    | 8px     | 14px    | 32px    | 14px    | 6px    |
| lg   | 48px   | 16px    | 12px    | 16px    | 36px    | 16px    | 8px    |

### State

| State | Background | Border | Foreground | Notas |
|-------|-----------|--------|-----------|-------|
| default | surface/default (blanco) | border/default | text/primary | Focus: border/focus |
| error | surface/default | border/error (rojo) | text/primary | Ícono alert en trailing |
| disabled | surface/disabled | border/disabled | text/disabled | No interactivo |

---

## Decisiones de diseño

**1. Steppers verticales (stacked) como default** — Carbon tiene el patrón split mobile (−|input|+) pero es un layout change que complica Figma. Los steppers verticales son el estándar desktop (4 de 5 sistemas). El split horizontal es para touch y se modela como variante de layout en la implementación.

**2. Has Stepper como boolean (no prop separada)** — Los steppers son la funcionalidad distintiva de NumberInput vs TextField. Default ON. Se puede desactivar para casos donde solo se quiere el clamping/validación sin UI de stepper (ej. campos de precio con formato libre).

**3. Has Addon (before/after) como booleanTextPairs** — Ant Design y Polaris tienen addon/prefix para unidades ('$', 'kg', '%'). Son texto que renderiza fuera del campo como slot decorativo. Boolean porque son opcionales; texto editable para el caso de uso.

**4. Steppers no Tab-focusables** — Carbon y Polaris documentan esto: Arrow keys operan el spinbutton desde el input. Los steppers son conveniencia para mouse/touch. Reducir Tab stops en formularios densos es una decisión de accesibilidad deliberada.

### Combinaciones excluidas

```
(ninguna — todas las combinaciones de Size × State son válidas)
```

---

## Comportamiento

### Esencial para diseño

- **Clamping en blur, no por keystroke** — el valor se valida al perder foco, no al escribir. Esto permite que el usuario borre el valor temporalmente para reescribir sin errores intermedios.
- **Has Stepper default ON** — los botones − / + son la affordance visual principal. Has Stepper=off es un estado especial para casos sin stepper visible.
- **formatter/parser** — el valor almacenado es numérico (ej. 1200), pero el valor visible puede estar formateado (ej. "1,200"). El developer implementa el formatter; el diseñador modela el texto formateado en `✏️ Value`.
- **Addon antes vs trailing icon** — Addon Before/After son slots de texto (unidades, símbolos). No confundir con iconos decorativos. Un TextField con ícono y un NumberInput con addon son estructuralmente distintos.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Input | `role="spinbutton"` (automático con `type="number"`) | SR anuncia "campo giratorio" con valor actual |
| Rango | `aria-valuemin` + `aria-valuemax` + `aria-valuenow` | SR anuncia el rango y valor en cada cambio |
| Steppers | `aria-label="Incrementar"` / `aria-label="Decrementar"` | Sin label, el SR anuncia "botón" sin contexto |
| Error | `aria-invalid="true"` + `aria-errormessage` | SR anuncia el error al campo |
| Botones | `tabIndex="-1"` en steppers | No reciben foco por Tab — Arrow keys en input |

### Navegación por teclado

```
↑/↓ Arrow     → incrementa/decrementa 1 paso (step)
Shift+↑/↓     → incrementa/decrementa 10× (stepMultiplier)
Page Up/Down  → paso grande (largeStep configurable)
Home/End      → va al mínimo/máximo
Tab           → sale del campo (steppers no son Tab-focusables)
```

---

## Guía de contenido

**Value (texto visible):**
- Mostrar el valor formateado: "1,200" no "1200"; "75%" no "0.75"
- Para placeholders: "0" (no vacío) — siempre mostrar un estado inicial

**Addon Before (símbolo):**
- Moneda: "$", "€", "£", "¥"
- Operadores: "±", "×"
- Unidad al inicio (si la convención local lo requiere)

**Addon After (unidad):**
- Unidades de medida: "kg", "cm", "px", "pt", "rem"
- Porcentaje: "%"
- Tiempo: "ms", "s", "min"

**Error text (debajo del campo):**
- Rango excedido: "El valor debe estar entre 1 y 100"
- Formato inválido: "Ingresa un número válido"
- Requerido: "Este campo es requerido"

---

## Pre-build checklist

```
□ ¿role="spinbutton" en el input (automático con type="number")?
□ ¿aria-valuemin, aria-valuemax, aria-valuenow actualizados?
□ ¿Steppers tienen aria-label="Incrementar" / "Decrementar"?
□ ¿Steppers tienen tabIndex="-1" (no Tab-focusables)?
□ ¿Arrow keys ↑↓ incrementan/decrementan desde el input?
□ ¿Shift+Arrow multiplica el paso × 10?
□ ¿Clamping ocurre en blur, no en keystroke?
□ ¿State=error: aria-invalid="true" + aria-errormessage?
□ ¿Has Addon Before/After como texto decorativo (no input)?
□ ¿formatter/parser separados para display vs. valor almacenado?
```

---

## Componentes relacionados

```
TextField    → para texto libre sin restricción numérica
Slider       → para rangos continuos y visuales (volumen, brillo)
PinInput     → para códigos numéricos de longitud fija (OTP, PIN)
Select       → para selección de valor de una lista (no edición)
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Stepper | Addon | Formato | ARIA | Diferenciador |
|---------|-------|---------|-------|---------|------|--------------|
| **Material Design 3** | — | No nativo | — | — | — | Solo TextField con type=number |
| **Spectrum (Adobe)** | NumberField | Sí (vertical) | Sí (formatOptions) | Intl.NumberFormat | spinbutton | formatOptions API; locale-aware |
| **Carbon (IBM)** | NumberInput | Sí (vertical + mobile split) | No | No built-in | spinbutton | mobile split; helperText |
| **Polaris (Shopify)** | TextField type=number | Sí (vertical) | prefix/suffix | No | spinbutton | prefix/suffix como string; min/max |
| **Atlassian** | Textfield type=number | No (solo input) | No | No | textbox | Sin stepper — raw input |
| **Ant Design** | InputNumber | Sí (vertical) | addonBefore/After | formatter/parser | spinbutton | formatter/parser API; precision prop |
| **Twilio Paste** | — | No | — | — | — | Sin componente dedicado |
| **Lightning** | lightning-input type=number | Sí | — | — | spinbutton | LWC native |
| **Primer (GitHub)** | — | No | — | — | — | Sin componente dedicado |
| **shadcn/ui** | — | No nativo | — | — | — | Compose con react-number-format |
| **Chakra UI** | NumberInput | Sí (vertical) | No built-in | No | spinbutton | useNumberInput hook |
| **Fluent 2** | SpinButton | Sí (vertical) | No | Sí (displayValue) | spinbutton | displayValue prop para formato |
| **Mantine** | NumberInput | Sí (vertical) | leftSection/right | Sí (thousandSeparator) | spinbutton | thousandSeparator; clampBehavior |
| **Evergreen** | — | No | — | — | — | Sin componente dedicado |

**Patrones clave de la industria:**
1. **Spectrum `formatOptions` (Intl.NumberFormat)** — el enfoque más completo: locale, currency, unit, style. `{style: "currency", currency: "USD"}` produce "$1,200.00" sin formatter custom.
2. **Ant Design `formatter/parser`** — patrón manual pero flexible: `formatter` controla el display, `parser` extrae el número. Permite formatos arbitrarios.
3. **Stepper vertical vs. split horizontal** — vertical (Carbon desktop, Polaris) para densidad; split (Carbon mobile: −|input|+) para touch target. La mayoría elige vertical como default.
4. **Steppers no Tab-focusables** — Carbon, Polaris y Spectrum lo documentan: los Arrow keys en el input reemplazan la necesidad de Tab a los botones. Reduce Tab stops en formularios.

---

## Tokens

**12 tokens** · prefijo `nmi-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `nmi/bg` | `surface/default` | Background del campo |
| `nmi/border` | `border/default` | Borde default |
| `nmi/border-focus` | `border/focus` | Borde en focus — azul |
| `nmi/border-error` | `border/error` | Borde en error — rojo |
| `nmi/fg` | `text/primary` | Texto del valor |
| `nmi/stepper-bg` | `surface/hover` | Background de los steppers |
| `nmi/stepper-fg` | `text/secondary` | Color de los íconos + / − |
| `nmi/stepper-border` | `border/default` | Borde divisor de steppers |
| `nmi/disabled/bg` | `surface/disabled` | Background disabled |
| `nmi/disabled/fg` | `text/disabled` | Texto disabled |
| `nmi/error/fg` | `status/error/fg` | Color ícono/texto de error |
| `nmi/radius` | `radius/md` | Border radius (6–8px según size) |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Size sm: h:32px · px:8px  · py:6px  · font:12px        │
│  Size md: h:40px · px:12px · py:8px  · font:14px        │
│  Size lg: h:48px · px:16px · py:12px · font:16px        │
│                                                          │
│  Estructura interna (de izquierda a derecha):            │
│  [Addon Before] [input] [Addon After] [−] [+]           │
│                                                          │
│  Stepper widths: 28px (sm) · 32px (md) · 36px (lg)      │
│                                                          │
│  Frames totales:                                         │
│  Size(3) × State(3) = 9 frames                          │
└──────────────────────────────────────────────────────────┘
```
