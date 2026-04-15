# Textarea

## Overview

El Textarea es un campo de texto multi-linea para formularios. El usuario escribe contenido extenso (descripciones, comentarios, notas) y el campo lo valida. A diferencia del Input, el Textarea crece verticalmente y puede incluir un contador de caracteres.

```
  Label *
  ┌────────────────────────────────────────┐
  │ Placeholder text...                    │
  │                                        │
  │                                        │
  │                                        │
  └────────────────────────────────────────┘
  Helper text                      0/500
```

Comparte anatomia con el Input (label, helper text, validacion, bordes), pero sin prefix/suffix — su unica decoracion es el contador de caracteres.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Tamano        sm · md · lg                           minHeight: 64 / 80 / 104px
  Estilo        outlined · filled · borderless         Bordes y fondo
  Estado        default · hover · focus · disabled · readonly   Interaccion
  Validacion    ninguna · error · warning              Borde + mensaje
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Label              Etiqueta encima del campo                texto editable
  ☐ Helper Text        Texto de ayuda debajo                    texto editable
  ☐ Character Count    Contador "0/500" alineado a la derecha   texto editable
```

### Panel de propiedades en Figma

```
┌─ Textarea ───────────────────────────────┐
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
│  ☑ Label              ☐ Helper Text      │
│  ☐ Character Count                       │
│                                          │
│  Text Properties                         │
│  ✏️ Label        [ Label            ]    │
│  ✏️ Placeholder  [ Enter text...    ]    │
│  ✏️ Helper Text  [ Helper text      ]    │
│  ✏️ Counter      [ 0/500           ]    │
│                                          │
└──────────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿El usuario debe ingresar texto libre?
  │
  ├─ Multiples lineas (descripcion, comentario, nota) → usa Textarea ✓
  │
  ├─ Una sola linea (nombre, email) → usa Input
  │
  ├─ Texto con formato rico (bold, listas, links) → usa Rich Text Editor
  │
  └─ Codigo fuente → usa Code Editor
```

**Usa Textarea cuando:**
- El contenido requiere multiples lineas (bio, descripcion, feedback)
- Hay un limite de caracteres que el usuario debe respetar
- El campo no necesita formato rico (solo texto plano)

**NO uses Textarea cuando:**
- El texto es de una sola linea → Input
- Se necesita formato rico (bold, listas) → Rich Text Editor
- Es codigo fuente → Code Editor
- El usuario elige entre opciones → Select, Radio

---

## Variaciones visuales

### Variantes de estilo

```
  outlined (default)              filled                          borderless
  ┌────────────────────────┐      ┌────────────────────────┐
  │ Texto...               │      │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│        Texto...
  │                        │      │ Texto...               │
  │                        │      │                        │        (borde solo en hover/focus)
  └────────────────────────┘      └────────────────────────┘
  Formularios estandar            Superficies con color           Edicion inline, CMS
```

### Estados del campo

```
  default                  hover                    focus
  ┌────────────────────┐   ┌────────────────────┐   ╔════════════════════╗
  │ Texto              │   │ Texto              │   ║ Texto              ║  ← ring 2px azul
  │                    │   │                    │   ║                    ║
  └────────────────────┘   └────────────────────┘   ╚════════════════════╝
  borde gris               borde gris oscuro        borde azul

  disabled                 readonly
  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐   ┌────────────────────┐
  ╎ Texto              ╎   │ Texto              │  ← sin resize handle
  ╎                    ╎   │                    │     texto copiable, no editable
  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘   └────────────────────┘
  opacity 50%              fondo sutil, focusable
```

### Validacion (Status)

```
  error                                      warning
  ┌────────────────────────────────┐         ┌────────────────────────────────┐
  │ Texto ingresado                │         │ Texto ingresado                │
  │                                │         │                                │
  └────────────────────────────────┘         └────────────────────────────────┘
  ⚠ Este campo es obligatorio                ⚠ El contenido parece incompleto
  borde rojo + mensaje rojo                  borde ambar + mensaje ambar
```

### Character count

```
  sin limite                    cerca del limite               sobre el limite
  ┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
  │ Texto breve          │      │ Texto extenso que    │      │ Texto que excede el  │
  │                      │      │ se acerca al maximo  │      │ limite establecido   │
  └──────────────────────┘      └──────────────────────┘      └──────────────────────┘
  Helper text        25/500     Helper text       480/500     Helper text       520/500
  texto gris                    texto ambar                   texto rojo
```

### Tamanos

```
  sm (min 64px)  ┌──────────────────────┐    campos compactos
                 │ Texto                │    font 12px · padding 6/8
                 └──────────────────────┘

  md (min 80px)  ┌──────────────────────┐    formularios estandar (default)
                 │ Texto                │    font 14px · padding 8/12
                 │                      │
                 └──────────────────────┘

  lg (min 104px) ┌──────────────────────┐    campos espaciosos, mobile
                 │ Texto                │    font 16px · padding 12/16
                 │                      │
                 │                      │
                 └──────────────────────┘
```

---

## Decisiones de diseno

### 1. Componente separado, no variante de TextField

14/24 sistemas implementan Textarea como componente independiente. M3 y Polaris lo unifican con TextField via prop `multiline`, pero multi-linea tiene concerns unicos (resize, rows, character count) que no aplican a single-line. Separar da una API limpia donde cada componente tiene solo los props que necesita.

### 2. Readonly como state variant, no boolean

A diferencia de otros form controls donde readonly cambia solo una propiedad, en Textarea readonly cambia borde + fondo + elimina el resize handle — suficientes cambios visuales para justificar un frame dedicado. Spectrum, Atlassian y Carbon lo implementan como state separado.

### 3. Counter opt-in, no default

14/24 sistemas soportan contador de caracteres, pero ninguno lo muestra por defecto. Requiere `maxLength` o prop equivalente. Razon: evitar ruido visual en campos sin limite. El contador es un boolean toggle en Figma.

### 4. Auto-resize como decision de implementacion, no de diseno

10/24 sistemas ofrecen auto-resize (el campo crece al escribir). Ant Design y Mantine formalizan la API con `autoSize: { minRows, maxRows }`. En Figma, el Textarea siempre se muestra con su altura minima — el auto-resize es comportamiento de codigo, no una variante visual.

### 5. Resize vertical como default sensato

Cuando los sistemas ofrecen resize, la mayoria usa vertical-only como default. Horizontal resize rompe layouts en formularios. Atlassian tiene el modo mas sofisticado: "smart" (crece pero nunca encoge), evitando el bounce de layout.

### Combinaciones excluidas

```
  disabled + hover/focus          no reacciona a interaccion
  disabled + error/warning        validacion no aplica si esta deshabilitado
  readonly + error/warning        campos readonly no validan
  readonly + hover                cambio visual minimo, no justifica frame
```

---

## Comportamiento

### Lo esencial para disenar

1. **Label visible obligatorio.** Igual que Input — placeholder NO sustituye al label. 24/24 sistemas coinciden.

2. **Error reemplaza helper text.** Mismo patron que Input — nunca se apilan. El espacio debajo es uno solo.

3. **El counter cambia de color cerca del limite.** Carbon lo formalizo: neutral lejos del limite, ambar al acercarse, rojo al excederlo. Feedback visual progresivo.

4. **GOV.UK es el unico con `aria-live` en el counter.** 23/24 sistemas NO anuncian los caracteres restantes al screen reader. Implementar `aria-live="polite"` en el counter region es una mejora importante para accesibilidad.

5. **Readonly acepta foco, disabled no.** Readonly: apariencia normal, texto seleccionable/copiable, sin resize. Disabled: opacity 50%, sin foco, sin interaccion.

6. **El resize handle no funciona en touch.** CSS `resize` no se opera con touch. En mobile, deshabilitar resize y usar auto-resize.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Textarea | `textbox` (nativo) | `aria-describedby` → helper/error/counter | SR anuncia la guia al recibir foco |
| Textarea | — | `aria-multiline="true"` (implicito) | SR sabe que es multi-linea |
| Label | `label` | `for` → textarea id | SR anuncia el nombre del campo |
| Counter | — | `aria-live="polite"` (recomendado) | SR anuncia chars restantes en umbrales |
| Error state | — | `aria-invalid="true"` | SR anuncia "invalido" |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  Tab                   foco llega al campo (ring azul visible)
  Tab                   foco sale del campo (NO queda atrapado)
  Typing                ingresa texto, incluye Enter para nuevas lineas
```

Interacciones secundarias (referencia para dev):

```
  Ctrl+A                selecciona todo el texto
  Shift+Arrow           seleccion de texto
  Home / End            inicio / fin de la linea
```

---

## Guia de contenido

**Label:** Breve y descriptivo. "Descripcion", "Comentario", "Notas" — no "Escribe una descripcion detallada".

**Placeholder:** Sugiere el tipo de contenido esperado. "Describe el problema con detalle..." — no repitas el label.

**Helper text:** Explica restricciones o formato. "Maximo 500 caracteres. Incluye pasos para reproducir." — no "Escribe aqui".

**Error text:** Especifica que salio mal. "La descripcion debe tener al menos 50 caracteres" — no solo "Campo requerido".

**Character count:** Muestra formato "actual/maximo". "25/500" — no "25 caracteres escritos de 500 permitidos".

---

## Checklist antes de construir

```
  ☐ ¿Que variante visual?
    └─ outlined = forms · filled = surfaces · borderless = inline/CMS

  ☐ ¿Tiene limite de caracteres?
    └─ Si si → activa Character Count + define maxLength

  ☐ ¿Necesita readonly?
    └─ Para formularios de auditoria, recibos, datos heredados

  ☐ ¿Warning o solo error?
    └─ Si hay validaciones "suaves" → incluye warning

  ☐ ¿Cuantas lineas iniciales?
    └─ Define minHeight por tamano (sm=64, md=80, lg=104)

  ☐ ¿Auto-resize?
    └─ Si si → documentar para dev (minRows/maxRows)
    └─ Si no → scroll interno cuando el contenido excede
```

---

## Relacion con otros componentes

```
  Input          Version single-line — mismos tokens y anatomia base
  Select         Comparte label, helper text, validacion — misma altura de campo
  Rich Text      Para texto con formato (bold, listas). Textarea es solo texto plano
  Code Editor    Para codigo fuente con syntax highlighting
```

---

## Referencia: como lo hacen otros sistemas

**Los que separan Textarea de TextField:**
- Spectrum (Adobe): TextArea dedicado con isQuiet para inline editing
- Carbon (IBM): TextArea con counter progresivo y warn state

**Los que unifican:**
- M3 (Google): TextField con `multiline: true`
- Polaris (Shopify): TextField con `multiline={3}` para rows iniciales

**Auto-resize como estandar de facto:**
- Ant Design: `autoSize: { minRows, maxRows }` — la API mas clara
- Mantine: `autosize` con `minRows/maxRows` — mirror de Ant
- Atlassian: `resize="smart"` — crece pero nunca encoge

**Counter accesible:**
- GOV.UK: unico con `aria-live="polite"` para anunciar chars restantes

---

## Tokens

**52 tokens** · prefijo `txta-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--txta-bg` | `bg/surface/default` | Fondo del campo (outlined) |
| `--txta-bg-filled` | `bg/mid/default` | Fondo del campo (filled) |
| `--txta-border` | `border/mid/default` | Borde default |
| `--txta-border-hover` | `border/mid/hover` | Borde en hover |
| `--txta-border-focus` | `border/interactive/focus` | Borde en focus |
| `--txta-border-error` | `status/error/border` | Borde en error |
| `--txta-border-warning` | `status/warning/border` | Borde en warning |
| `--txta-fg` | `text/primary` | Texto ingresado |
| `--txta-fg-placeholder` | `text/subtlest` | Placeholder |
| `--txta-fg-helper` | `text/secondary` | Helper text |
| `--txta-fg-error` | `status/error/fg` | Error text |
| `--txta-fg-counter` | `text/secondary` | Counter normal |
| `--txta-fg-counter-warning` | `status/warning/fg` | Counter cerca del limite |
| `--txta-fg-counter-error` | `status/error/fg` | Counter sobre el limite |
| `--txta-focus-ring` | `focus/ring` | Ring de foco |

### Specs de spacing

```
  ┌─ textarea-container ───────────────────────────────────┐
  │                                                        │
  │  ←px→                                           ←px→   │
  │       ↕ py                                      ↕ py   │
  │       Texto multi-linea...                             │
  │                                                        │
  └────────────────────────────────────────────────────────┘
  ← 4px →
  Helper text                                      0/500

  px/py por tamano:  sm = 8/6  ·  md = 12/8  ·  lg = 16/12
  minHeight:         sm = 64  ·  md = 80  ·  lg = 104
  radius:            sm = 6  ·  md = 8  ·  lg = 8
  gap label↔campo:   4px
  gap campo↔helper:  4px
```
