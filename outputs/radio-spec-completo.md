# Radio

## Overview

El Radio es un control de seleccion mutuamente excluyente. El usuario elige una sola opcion de un grupo — al seleccionar una, las demas se deseleccionan automaticamente. Siempre vive dentro de un RadioGroup.

```
  ¿Metodo de contacto?

  ◉ Email
  ○ Telefono
  ○ SMS
```

Tiene dos presentaciones: el radio clasico (circulo + label) y el radio card (tarjeta con titulo, descripcion y addon). Ambos comparten la misma semantica y navegacion por teclado, pero el card ofrece contenido mas rico para seleccion prominente (planes, metodos de envio).

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

.RadioItem:
```
  Seleccion     false · true                                   Circulo: vacio / relleno
  Estado        default · hover · focus · pressed              Interaccion
  Disabled      false · true                                   Opacity 50%
```

.RadioCard:
```
  Tamano        sm · md · lg                                   Altura: 48 / 64 / 80px
  Seleccion     false · true                                   Borde: gris / azul
  Estado        default · hover · focus                        Interaccion
  Disabled      false · true                                   Opacity 50%
```

RadioGroup:
```
  Orientacion   vertical · horizontal                          Direccion del layout
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☐ hasError           Mensaje de error debajo del grupo        texto editable
  ☐ hasAddon           Slot para icono/imagen en RadioCard      intercambiable
```

### Panel de propiedades en Figma

```
┌─ RadioGroup ─────────────────────────────┐
│                                          │
│  Variant Properties                      │
│  ┌─────────────────────────────────────┐ │
│  │ Orientation              ▼ vertical │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  Boolean Properties                      │
│  ☐ hasError                              │
│                                          │
│  Text Properties                         │
│  ✏️ Legend    [ Select an option    ]    │
│  ✏️ Error    [ Please select one   ]    │
│                                          │
└──────────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿El usuario elige una opcion de un grupo?
  │
  ├─ 2-5 opciones, todas visibles → usa Radio ✓
  │
  ├─ 5+ opciones, espacio limitado → usa Select
  │
  ├─ Multiples opciones independientes → usa Checkbox
  │
  ├─ On/off binario → usa Switch o Checkbox
  │
  └─ Opciones con contenido rico (descripcion, precio) → usa RadioCard ✓
```

**Usa Radio cuando:**
- El usuario debe elegir exactamente una opcion de un grupo
- Hay 2-5 opciones que caben visibles en pantalla
- Cada opcion es mutuamente excluyente con las demas

**NO uses Radio cuando:**
- Hay 5+ opciones y el espacio es limitado → Select
- El usuario puede elegir multiples → Checkbox
- Es on/off binario → Switch
- Las opciones son acciones (borrar, exportar) → Menu

---

## Variaciones visuales

### Radio clasico (.RadioItem)

```
  unselected               selected                 disabled
  ┌──┐                     ┌──┐                     ┌╌╌┐
  │○ │ Opcion A            │◉ │ Opcion B            ╎○ ╎ Opcion C
  └──┘                     └──┘                     └╌╌┘
  circulo vacio            circulo con dot azul     opacity 50%

  hover                    focus                    pressed
  ┌──┐                     ╔══╗                     ┌──┐
  │○ │ Opcion              ║○ ║ Opcion              │○ │ Opcion
  └──┘                     ╚══╝                     └──┘
  borde mas oscuro         ring 2px azul            fondo tenue
```

### Radio card (.RadioCard)

```
  unselected                              selected
  ┌──────────────────────────────┐        ┌──────────────────────────────┐
  │ ○  Plan Basico               │        │ ◉  Plan Pro                  │
  │    $9.99/mes · 5 usuarios    │        │    $29.99/mes · 50 usuarios  │
  └──────────────────────────────┘        └──────────────────────────────┘
  borde gris, fondo blanco                borde azul, fondo azul tenue

  hover                                  disabled
  ┌──────────────────────────────┐        ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
  │ ○  Plan Basico               │        ╎ ○  Plan Enterprise           ╎
  │    $9.99/mes · 5 usuarios    │        ╎    Contactar ventas          ╎
  └──────────────────────────────┘        └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
  fondo gris tenue                        opacity 50%
```

### RadioGroup orientaciones

```
  vertical (default)                      horizontal
  ┌────────────────────┐                  ┌──────────────────────────────────────┐
  │ Metodo de contacto │                  │ Vista:                               │
  │ ◉ Email            │                  │ ◉ Email   ○ Telefono   ○ SMS        │
  │ ○ Telefono         │                  └──────────────────────────────────────┘
  │ ○ SMS              │
  └────────────────────┘
```

### Tamanos (solo RadioCard)

```
  sm (48px)    ┌──────────────────────────┐    seleccion compacta
               │ ○  Opcion · detalle      │    font 14/12 · padding 8/12
               └──────────────────────────┘

  md (64px)    ┌──────────────────────────┐    seleccion estandar (default)
               │ ○  Opcion                │    font 14/14 · padding 12/16
               │    Descripcion           │
               └──────────────────────────┘

  lg (80px)    ┌──────────────────────────┐    seleccion prominente (pricing)
               │ ○  Opcion                │    font 16/14 · padding 16/20
               │    Descripcion detallada │
               └──────────────────────────┘
```

---

## Decisiones de diseno

### 1. RadioItem y RadioCard como sub-componentes dentro de RadioGroup

Ant Design demuestra que `optionType="button"` dentro del mismo Radio.Group permite cambiar la presentacion sin cambiar la semantica. Nuestro modelo sigue esta idea: .RadioItem (clasico) y .RadioCard (card) son sub-componentes que viven dentro de RadioGroup. La semantica ARIA es identica.

### 2. Tamanos solo en RadioCard, no en RadioItem

El radio clasico tiene un control circular de 16-20px con label al lado — no necesita 3 tamanos. El card si necesita tamanos porque su contenido varia (compacto para filtros, prominente para pricing). Ant Design valida este enfoque: `size` solo aplica a la variante button.

### 3. Orientacion vertical como default

13/14 sistemas usan vertical como default. Carbon es la unica excepcion (horizontal por contexto enterprise desktop-wide). Vertical maximiza legibilidad y maneja labels largos sin truncamiento. Horizontal es opt-in para barras de filtros con opciones cortas.

### 4. Error a nivel de grupo, no individual

10/12 sistemas manejan error a nivel de RadioGroup. La razon: "no seleccionaste una opcion" es un error del grupo, no de una opcion especifica. El error message se ancla debajo del ultimo item.

### 5. Roving tabindex, no Tab entre cada radio

Tab lleva al grupo (foco en el seleccionado o el primero), flechas navegan entre opciones. Este es el patron ARIA correcto para radiogroup — NO Tab entre cada radio individualmente. 14/14 sistemas coinciden.

### Combinaciones excluidas

```
  Disabled + hover/focus/pressed   no reacciona a interaccion
```

---

## Comportamiento

### Lo esencial para disenar

1. **Flechas navegan, Tab entra/sale.** Tab lleva al grupo. Flechas mueven entre opciones Y seleccionan. Tab sale del grupo. Es roving tabindex, no linear.

2. **Seleccion es mutuamente excluyente.** Al seleccionar una opcion, todas las demas se deseleccionan. No hay multi-select — para eso usa Checkbox.

3. **5-7 opciones maximo.** Atlassian documenta este techo. Mas alla, un Select dropdown es mejor UX porque el scroll mental de opciones se vuelve costoso.

4. **Pre-seleccion depende del contexto.** Para filtros con default ("Todos"), pre-seleccionar. Para selectores sin opcion obvia ("Elige envio"), dejar vacio.

5. **Todo el contenido del card es non-interactive.** Si el RadioCard tiene links o botones internos, el roving tabindex del grupo conflictuara. El unico target de foco es el radio input.

6. **wrapAround: ultimo → primero.** Las flechas ciclan al llegar al final del grupo. No se detienen.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| RadioGroup | `radiogroup` | `aria-labelledby` → legend | SR anuncia nombre del grupo |
| RadioGroup | — | `aria-required` | SR anuncia si es obligatorio |
| Radio | `radio` | `aria-checked="true\|false"` | SR anuncia "opcion 2 de 5, seleccionada" |
| RadioCard | `radio` | `aria-describedby` → description | SR anuncia descripcion del card |
| Error | — | `aria-describedby` | SR anuncia el error al navegar |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  Tab                   foco llega al grupo (radio seleccionado o primero)
  ↑ ↓ ← →              navegar entre opciones + seleccionar
  Tab                   foco sale del grupo al siguiente control
```

Interacciones secundarias (referencia para dev):

```
  Space                 seleccionar opcion actual (cuando ninguna seleccionada)
  Home / End            primera / ultima opcion
```

---

## Guia de contenido

**Legend:** Pregunta o instruccion clara. "¿Metodo de contacto preferido?" o "Selecciona un plan".

**Label:** Breve y descriptivo. "Email", "Plan Pro" — no "Seleccionar email como metodo de contacto".

**Description (RadioCard):** Detalles que diferencian la opcion. "$29.99/mes · 50 usuarios" — no repetir el label.

**Error text:** Especifico. "Selecciona un metodo de contacto para continuar" — no "Campo requerido".

---

## Checklist antes de construir

```
  ☐ ¿Radio clasico o card?
    └─ Clasico → opciones simples con texto
    └─ Card → opciones con descripcion, precio, icono

  ☐ ¿Cuantas opciones?
    └─ 2-5 → Radio es correcto
    └─ 5+ → considera Select

  ☐ ¿Pre-seleccion?
    └─ Con default obvio (filtros) → pre-seleccionar
    └─ Sin default → dejar vacio

  ☐ ¿Orientacion?
    └─ Vertical = forms, opciones con texto largo
    └─ Horizontal = filtros, opciones cortas

  ☐ ¿Necesita error?
    └─ Si es requerido → hasError en RadioGroup
```

---

## Relacion con otros componentes

```
  Checkbox       Para seleccion multiple (no exclusiva)
  Select         Para 5+ opciones en espacio limitado
  Switch         Para on/off de efecto inmediato
  SegmentedControl   Para cambiar vista/modo (no seleccionar valor)
  RadioCard      Sub-componente para opciones con contenido rico
```

---

## Referencia: como lo hacen otros sistemas

**Variante card/button:**
- Ant Design: `optionType="button"` — radio con visual de button bar
- Polaris: ChoiceList con `helpText` por opcion — semi-card

**Enforzamiento de grupo:**
- Spectrum: Radio lanza error si no tiene RadioGroup ancestor
- Atlassian: RadioGroup recomendado pero no enforced

**Orientacion:**
- Carbon: unico con horizontal como default (enterprise desktop-wide)
- 13/14: vertical como default universal

**Consenso universal (14/14):**
- Seleccion mutuamente excluyente
- Roving tabindex (flechas entre opciones)
- fieldset/legend o role="radiogroup"
- wrapAround al final del grupo

---

## Tokens

**48 tokens** · prefijos `rdi-`, `rdc-`, `rdg-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--rdi-border` | `border/mid/default` | Borde circulo radio |
| `--rdi-border-hover` | `border/mid/hover` | Borde hover |
| `--rdi-dot` | `brand/900` | Dot seleccionado (azul) |
| `--rdi-dot-hover` | `brand/1000` | Dot hover |
| `--rdi-focus-ring` | `border/focus` | Ring de foco |
| `--rdc-bg` | `bg/surface/default` | Fondo card |
| `--rdc-bg-hover` | `bg/surface/hover` | Fondo card hover |
| `--rdc-bg-selected` | `bg/surface/selected` | Fondo card seleccionado |
| `--rdc-border` | `border/mid/default` | Borde card |
| `--rdc-border-selected` | `brand/900` | Borde card seleccionado |
| `--rdg-error-fg` | `status/error/fg` | Error text del grupo |

### Specs de spacing

```
  RadioItem:
  ┌──┐ ←8→ Label text
  │◉ │
  └──┘
  control: 16px circulo · dot: 8px
  gap control↔label: 8px

  RadioCard:
  ┌────────────────────────────────────────┐
  │ ←px→ [◉ 16px] ←8→ [Title          ] ←px→
  │                     [Description    ]     │
  │ ↕ py                               ↕ py  │
  └────────────────────────────────────────┘
  px/py por tamano:  sm = 12/8  ·  md = 16/12  ·  lg = 20/16
  radius:            sm = 6  ·  md = 8  ·  lg = 12
  gap entre items:   8px (siempre)
```
