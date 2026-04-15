# Input

## Overview

El Input es un campo de texto de una sola linea para formularios. El usuario escribe un valor (nombre, email, cantidad) y el campo lo valida. Es el componente de formulario mas basico y universal — los 24 sistemas analizados lo implementan.

```
  Label *
  ┌──────────────────────────────────────────┐
  │ [🔍]  [$]  Placeholder text  [✕] [⚠] [.00] │
  └──────────────────────────────────────────┘
  Helper text                          0/100
```

El Input comparte anatomia con Select y Textarea — misma altura, padding, radius, label y helper text — para que formularios mixtos se alineen sin ajustes.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Tamano        sm · md · lg                                   Altura: 32 / 40 / 48px
  Estilo        outlined · filled · borderless                 Bordes y fondo
  Estado        default · hover · focus · disabled             Interaccion
  Validacion    ninguna · error · warning                      Borde + mensaje
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Supporting Text    Texto de ayuda/error debajo              texto editable
  ☐ Prefix Icon        Icono antes del valor                    intercambiable
  ☐ Suffix Icon        Icono despues del valor                  intercambiable
  ☐ Prefix Text        Texto fijo antes ("$", "https://")       texto editable
  ☐ Suffix Text        Texto fijo despues (".00", "kg")         texto editable
  ☐ Clear Button       "✕" para borrar el valor
  ☐ Character Count    Contador "0/100" alineado a la derecha
  ☐ Required           Asterisco "*" junto al label
```

### Panel de propiedades en Figma

```
┌─ Input ──────────────────────────────────┐
│                                          │
│  Variant Properties                      │
│  ┌────────────────┐ ┌──────────────────┐ │
│  │ Size      ▼ md │ │ Variant ▼ outl.. │ │
│  └────────────────┘ └──────────────────┘ │
│  ┌────────────────┐ ┌──────────────────┐ │
│  │ State  ▼ def.. │ │ Status  ▼ none  │ │
│  └────────────────┘ └──────────────────┘ │
│                                          │
│  Boolean Properties                      │
│  ☑ Supporting Text    ☐ Prefix Icon      │
│  ☐ Suffix Icon        ☐ Prefix Text      │
│  ☐ Suffix Text        ☐ Clear Button     │
│  ☐ Character Count    ☐ Required         │
│                                          │
│  Text Properties                         │
│  ✏️ Label        [ Label            ]    │
│  ✏️ Placeholder  [ Placeholder text ]    │
│  ✏️ Support Text [ Helper text      ]    │
│  ✏️ Prefix Text  [ $               ]    │
│  ✏️ Suffix Text  [ .00             ]    │
│  ✏️ Char Count   [ 0/100           ]    │
│                                          │
│  Instance Swap                           │
│  ↳ Prefix Icon   [ 🏷 icon-name    ]    │
│  ↳ Suffix Icon   [ 🏷 icon-name    ]    │
│                                          │
└──────────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿El usuario debe ingresar texto libre?
  │
  ├─ Una linea de texto → usa Input ✓
  │
  ├─ Multiples lineas → usa Textarea
  │
  ├─ Elige entre opciones predefinidas → usa Select o Radio
  │
  ├─ Busca en una lista con autocompletado → usa Combobox
  │
  └─ Solo on/off → usa Switch o Checkbox
```

**Usa Input cuando:**
- El usuario debe escribir texto libre (nombre, email, URL, cantidad)
- El valor es de una sola linea
- Hay validacion por formato (email, telefono, numero)

**NO uses Input cuando:**
- El texto requiere multiples lineas → Textarea
- El usuario elige entre opciones fijas → Select, Radio o Combobox
- Es una decision binaria → Switch o Checkbox
- Es una busqueda con resultados filtrados → SearchField dedicado

---

## Variaciones visuales

### Variantes de estilo

```
  outlined (default)              filled                          borderless
  ┌────────────────────────┐      ┌────────────────────────┐
  │ Placeholder text       │      │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│        Placeholder text
  └────────────────────────┘      │ Placeholder text       │      ─────────────────────────
                                  └────────────────────────┘
  Formularios estandar            Superficies con color           Inline, tablas, denso
```

### Estados del campo

```
  default                  hover                    focus
  ┌────────────────────┐   ┌────────────────────┐   ╔════════════════════╗
  │ Valor              │   │ Valor              │   ║ Valor              ║  ← ring 2px azul
  └────────────────────┘   └────────────────────┘   ╚════════════════════╝
  borde gris               borde gris oscuro        borde azul

  disabled
  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
  ╎ Valor              ╎
  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
  opacity 50%, sin interaccion
```

### Validacion (Status)

```
  error                                      warning
  ┌────────────────────────────────┐         ┌────────────────────────────────┐
  │ Valor ingresado          [⚠]  │         │ Valor ingresado          [⚠]  │
  └────────────────────────────────┘         └────────────────────────────────┘
  ⚠ Este campo es obligatorio                ⚠ Este valor es inusual
  borde rojo + mensaje rojo                  borde ambar + mensaje ambar
```

### Slots opcionales

```
  con prefix icon + suffix icon              con prefix text + suffix text
  ┌────────────────────────────────┐         ┌────────────────────────────────┐
  │ 🔍  Buscar...            [✕]  │         │ $  1,500                 .00  │
  └────────────────────────────────┘         └────────────────────────────────┘

  con character count                        con required indicator
  ┌────────────────────────────────┐
  │ Descripcion breve              │           Label *
  └────────────────────────────────┘         ┌────────────────────────────────┐
  Helper text                    25/100      │ Valor                          │
                                             └────────────────────────────────┘
```

### Tamanos

```
  sm (32px)    ┌──────────────────────┐    filtros densos, dashboards
               │ Valor                │    font 12px · padding 6/8
               └──────────────────────┘

  md (40px)    ┌──────────────────────┐    formularios estandar (default)
               │ Valor                │    font 14px · padding 8/12
               └──────────────────────┘

  lg (48px)    ┌──────────────────────┐    mobile, formularios espaciosos
               │ Valor                │    font 16px · padding 12/16
               └──────────────────────┘
```

---

## Decisiones de diseno

### 1. Label estatico arriba, no flotante

M3 popularizo el label flotante que anima desde la posicion del placeholder hasta arriba del campo al hacer focus. Es elegante y ahorra ~20px por campo. Pero 22/24 sistemas usan label estatico arriba: es mas simple, no tiene problemas de internacionalizacion con labels largos, no requiere animacion en Figma, y mantiene el area del input como zona exclusiva de texto. La excepcion de M3 es coherente con su lenguaje visual, pero el consenso abrumador favorece la simplicidad.

### 2. Tres variantes visuales cubren el 90% de contextos

La decision de ofrecer outlined, filled y borderless viene de un equilibrio entre cobertura y complejidad. Outlined es el estandar para formularios (18/24 lo usan como default). Filled (fondo gris, sin borde superior) es el enfoque de M3 y Ant para superficies con color. Borderless es esencial para edicion inline en tablas y paneles densos — Atlassian lo llama "subtle" y lo usa extensivamente en Jira. Ant Design agrega "underlined" como cuarta variante, pero solo 2/24 lo adoptan y no justifica la complejidad adicional.

### 3. Warning ademas de error

Error significa "invalido, no puedes continuar" (borde rojo). Warning significa "inusual pero permitido" (borde ambar). Carbon e IBM introdujeron esta distincion para formularios financieros y enterprise: $50,000 es un monto valido pero inusual — warning avisa sin bloquear. Solo 4/24 sistemas lo implementan, pero el costo es bajo (mismo slot, diferente color) y el valor en contextos enterprise es alto.

### 4. Prefix/suffix: texto e icono como slots independientes

Polaris formalizo la distincion entre prefix/suffix (texto no editable dentro del borde como "$" o ".com") y leading/trailing icons (iconos decorativos o funcionales). GOV.UK refuerza este patron con prefijos de texto para unidades. En Figma, cada slot es un boolean independiente para evitar multiplicacion de frames.

### 5. Error reemplaza helper text, nunca se apilan

18/24 sistemas usan el mismo espacio para helper text y error text. Cuando aparece el error, el helper desaparece. Esto previene salto de layout (el campo no cambia de altura) y evita dos mensajes compitiendo por atencion debajo del campo. Si el helper contenia instrucciones criticas, deben incorporarse en el mensaje de error.

### Combinaciones excluidas

```
  disabled + hover/focus          no reacciona a interaccion
  disabled + error/warning        validacion no aplica si esta deshabilitado
```

---

## Comportamiento

### Lo esencial para disenar

1. **El label visible es obligatorio.** Placeholder NO sustituye al label — desaparece al escribir y falla WCAG. 24/24 sistemas coinciden. Gestalt y Nord lo enforzan a nivel de API.

2. **Error reemplaza helper text.** Nunca se muestran ambos. El espacio debajo del campo es uno solo. Si el helper decia "Minimo 8 caracteres", el error debe decir "La contrasena debe tener al menos 8 caracteres".

3. **Focus usa color de acento en el borde.** Ring de 2px azul visible. Es la unica forma en que el usuario de teclado sabe donde esta el cursor. WCAG 2.4.7 lo requiere.

4. **El boton limpiar (✕) solo aparece con valor.** Campo vacio = sin ✕.

5. **Prefix/suffix viven dentro del borde.** El "$" o el icono de busqueda estan dentro del campo, no fuera. Auto-padding evita que el texto ingresado se solape con los decoradores.

6. **autocomplete es obligatorio en campos comunes.** email, name, tel, address — especificar el atributo autocomplete beneficia a usuarios con discapacidades motoras y reduce friccion. GOV.UK es el mayor defensor de este patron.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Input | `textbox` (nativo) | `aria-describedby` → helper/error | SR anuncia la guia o error al recibir foco |
| Label | `label` | `for` → input id | SR anuncia el nombre del campo |
| Error text | — | `aria-live="polite"` | SR anuncia el error cuando aparece |
| Required | — | `aria-required="true"` | SR anuncia "obligatorio" |
| Error state | — | `aria-invalid="true"` | SR anuncia "invalido" al navegar |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  Tab                   foco llega al campo (ring azul visible)
  Shift+Tab             foco sale del campo hacia atras
  Typing                ingresa texto
  Escape                limpia el valor (si clear button activo)
```

Interacciones secundarias (referencia para dev):

```
  Ctrl+A                selecciona todo el texto
  Ctrl+C/V/X            copiar, pegar, cortar
  Home / End             inicio / fin del texto
```

---

## Guia de contenido

**Label:** Breve y descriptivo. "Email", "Nombre completo", "Cantidad" — no "Por favor ingresa tu direccion de correo electronico".

**Placeholder:** Muestra un ejemplo del formato esperado. "nombre@empresa.com", "1,500.00" — no repitas el label.

**Helper text:** Explica restricciones o impacto. "Minimo 8 caracteres con una mayuscula" — no "Ingresa tu contrasena".

**Error text:** Di que salio mal Y que hacer. "El email debe tener formato usuario@dominio.com" — no solo "Campo invalido".

**Prefix/suffix text:** Usa texto corto y familiar. "$", "kg", ".com" — no "dolares americanos".

---

## Checklist antes de construir

```
  ☐ ¿Que variante visual?
    └─ outlined = forms · filled = surfaces · borderless = inline/tablas

  ☐ ¿Necesita prefix o suffix?
    └─ Icono → activa Prefix/Suffix Icon
    └─ Texto fijo ("$", ".com") → activa Prefix/Suffix Text

  ☐ ¿Tiene limite de caracteres?
    └─ Si si → activa Character Count

  ☐ ¿El campo puede quedar vacio?
    └─ Si si → activa Clear Button

  ☐ ¿Warning o solo error?
    └─ Si hay validaciones "suaves" (montos inusuales, formatos raros) → incluye warning

  ☐ ¿Que tipo de input HTML?
    └─ text, email, password, number, tel, url → afecta teclado mobile y autocomplete

  ☐ ¿El campo es requerido?
    └─ Si si → activa Required indicator (asterisco)
```

---

## Relacion con otros componentes

```
  Select         Comparte anatomia (altura, padding, radius, label, helper)
  Textarea       Version multi-linea del Input — mismos tokens de color y spacing
  Combobox       Input + dropdown de sugerencias filtradas
  SearchField    Input especializado con icono de busqueda y clear button
  Password       Input con toggle de visibilidad — puede ser tipo HTML o componente
```

---

## Referencia: como lo hacen otros sistemas

**Los que separan Input de Textarea:**
- Spectrum (Adobe): TextField y TextArea son componentes independientes — cada uno con API limpia
- Carbon (IBM): TextInput separado de TextArea, con warn state unico

**Los que unifican:**
- M3 (Google): TextField con prop `multiline` — un componente para todo
- Polaris (Shopify): TextField unificado con connected fields para valor+unidad

**Los que priorizan composicion:**
- shadcn/ui: Input minimal + Form wrapper para label/error
- Paste (Twilio): Input separado de FormField wrapper

**Consenso universal (24/24):**
- Label asociado al campo
- Error via aria-describedby + aria-invalid
- Focus ring visible
- Prefix/suffix dentro del borde

---

## Tokens

**62 tokens** · prefijo `inp-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--inp-bg` | `bg/surface/default` | Fondo del campo (outlined) |
| `--inp-bg-filled` | `bg/mid/default` | Fondo del campo (filled) |
| `--inp-border` | `border/mid/default` | Borde default |
| `--inp-border-hover` | `border/mid/hover` | Borde en hover |
| `--inp-border-focus` | `border/focus` | Borde en focus |
| `--inp-border-error` | `status/error/border` | Borde en error |
| `--inp-border-warning` | `status/warning/border` | Borde en warning |
| `--inp-fg` | `text/label` | Texto ingresado |
| `--inp-fg-placeholder` | `text/subtlest` | Placeholder |
| `--inp-fg-helper` | `text/secondary` | Helper text |
| `--inp-fg-error` | `status/error/fg` | Error text |
| `--inp-fg-warning` | `status/warning/fg` | Warning text |
| `--inp-fg-disabled` | `text/disabled` | Texto deshabilitado |
| `--inp-icon` | `icon/secondary` | Iconos prefix/suffix |
| `--inp-focus-ring` | `border/focus` | Ring de foco |

### Specs de spacing

```
  ┌─ input-container ──────────────────────────────────────┐
  │                                                        │
  │  ←px→ [icon 20] ←8→ [$] ←8→ [value] ←8→ [✕] ←8→ [⚠] ←px→
  │       ↕ py                                      ↕ py  │
  │                                                        │
  └────────────────────────────────────────────────────────┘
  ← 4px →
  Helper text                                      0/100

  px/py por tamano:  sm = 8/6  ·  md = 12/8  ·  lg = 16/12
  gap icon↔texto:    8px (siempre)
  radius:            sm = 6  ·  md = 8  ·  lg = 8
  gap label↔campo:   4px
  gap campo↔helper:  4px
```
