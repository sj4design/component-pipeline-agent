# Modal

## Overview

El Modal es un dialogo overlay centrado que interrumpe el flujo del usuario para mostrar contenido critico o requerir una decision. El fondo se bloquea con un scrim semi-transparente y el foco queda atrapado dentro del modal hasta que se cierra.

```
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  ░░░░░░░░░ ┌──────────────────────┐ ░░░░░░░░░
  ░░░░░░░░░ │ Titulo            X  │ ░░░░░░░░░
  ░░░░░░░░░ │ Descripcion          │ ░░░░░░░░░
  ░░░░░░░░░ ├──────────────────────┤ ░░░░░░░░░
  ░░░░░░░░░ │                      │ ░░░░░░░░░
  ░ SCRIM ░ │   Body content       │ ░░░░░░░░░
  ░░░░░░░░░ │   (scrollable)       │ ░░░░░░░░░
  ░░░░░░░░░ │                      │ ░░░░░░░░░
  ░░░░░░░░░ ├──────────────────────┤ ░░░░░░░░░
  ░░░░░░░░░ │     [Cancel] [OK]    │ ░░░░░░░░░
  ░░░░░░░░░ └──────────────────────┘ ░░░░░░░░░
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

Tiene tres zonas fijas: header (titulo + close), body (contenido scrolleable) y footer (acciones). El footer es opcional — puede tener 0, 1, 2 o N acciones.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Tamano        sm · md · lg · fullscreen              Ancho: 400 / 560 / 800 / 1280px
  Tipo          default · danger                       Color titulo + boton primario
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Has Footer         Footer con botones de accion
  ☑ Has Dividers       Separadores entre header/body/footer
  ☐ Has Description    Texto descriptivo debajo del titulo     texto editable
```

### Panel de propiedades en Figma

```
┌─ Modal ──────────────────────────────────┐
│                                          │
│  Variant Properties                      │
│  ┌────────────────┐ ┌──────────────────┐ │
│  │ Size    ▼ md   │ │ Variant ▼ def.. │ │
│  └────────────────┘ └──────────────────┘ │
│                                          │
│  Boolean Properties                      │
│  ☑ Has Footer        ☑ Has Dividers      │
│  ☐ Has Description                       │
│                                          │
│  Text Properties                         │
│  ✏️ Title        [ Modal title      ]    │
│  ✏️ Description  [ Description text ]    │
│                                          │
└──────────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿El usuario necesita tomar una decision antes de continuar?
  │
  ├─ Confirmacion simple (si/no) → usa Modal sm ✓
  │
  ├─ Formulario o contenido medio → usa Modal md ✓
  │
  ├─ Contenido extenso (tabla, wizard) → usa Modal lg ✓
  │
  ├─ Workflow completo (multi-step) → usa Modal fullscreen ✓
  │
  ├─ Contenido lateral sin bloquear → usa Drawer
  │
  └─ Mensaje informativo sin accion → usa Toast o Banner
```

**Usa Modal cuando:**
- El usuario DEBE tomar una decision antes de continuar
- La accion es irreversible (eliminar, enviar)
- El contenido requiere atencion exclusiva (formulario critico)

**NO uses Modal cuando:**
- El contenido es complementario, no critico → Drawer
- Es un mensaje informativo → Toast o Banner
- El usuario necesita ver el contenido principal → Drawer o Panel inline
- Es una seleccion rapida (color, fecha) → Popover

---

## Variaciones visuales

### Tamanos

```
  sm (400px)                md (560px)                    lg (800px)
  ┌──────────────┐          ┌────────────────────┐        ┌──────────────────────────┐
  │ Titulo    X  │          │ Titulo          X  │        │ Titulo                X  │
  ├──────────────┤          ├────────────────────┤        ├──────────────────────────┤
  │              │          │                    │        │                          │
  │ ¿Eliminar?   │          │  Formulario        │        │  Tabla / contenido       │
  │              │          │  de datos          │        │  extenso                 │
  ├──────────────┤          ├────────────────────┤        ├──────────────────────────┤
  │ [No]  [Si]   │          │    [Cancel] [Save] │        │        [Cancel] [Submit]  │
  └──────────────┘          └────────────────────┘        └──────────────────────────┘
  Confirmaciones            Formularios                   Tablas, wizards

  fullscreen (1280px)
  ┌────────────────────────────────────────────────────────────────┐
  │ Titulo                                                    X  │
  ├──────────────────────────────────────────────────────────────┤
  │                                                              │
  │                    Workflow completo                          │
  │                    Multi-step, editor                        │
  │                                                              │
  ├──────────────────────────────────────────────────────────────┤
  │                                          [Cancel] [Complete] │
  └──────────────────────────────────────────────────────────────┘
  Workflows complejos, mobile auto-fullscreen
```

### Variante danger

```
  default                                danger
  ┌────────────────────────┐             ┌────────────────────────┐
  │ Guardar cambios     X  │             │ ⚠ Eliminar items    X  │  ← titulo rojo + icono
  ├────────────────────────┤             ├────────────────────────┤
  │                        │             │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │  ← borde superior rojo
  │ ¿Guardar los cambios   │             │ Esta accion es         │
  │ antes de salir?        │             │ permanente. Se         │
  │                        │             │ eliminaran 15 items.   │
  ├────────────────────────┤             ├────────────────────────┤
  │  [Descartar] [Guardar] │             │  [Cancelar] [Eliminar] │  ← boton destructivo
  └────────────────────────┘             └────────────────────────┘
  boton primario azul                    boton primario rojo
```

### Footer variable

```
  sin footer (informativo)           1 accion                     2 acciones (default)
  ┌──────────────────────┐           ┌──────────────────────┐     ┌──────────────────────┐
  │ Titulo            X  │           │ Titulo            X  │     │ Titulo            X  │
  │                      │           │                      │     │                      │
  │ Contenido solo       │           │ Contenido            │     │ Contenido            │
  │ lectura              │           │                      │     │                      │
  └──────────────────────┘           ├──────────────────────┤     ├──────────────────────┤
                                     │          [Entendido] │     │  [Cancelar] [Aceptar]│
                                     └──────────────────────┘     └──────────────────────┘
```

---

## Decisiones de diseno

### 1. Cuatro tamanos fijos, no sizing arbitrario

Carbon y Atlassian validan este enfoque: anchos predefinidos (400/560/800/1280px) garantizan que todos los modals del sistema se vean consistentes. Sin sizing custom, no hay ambiguedad de "¿es medium o large?". Cada tamano tiene un caso de uso documentado: sm para confirmaciones, md para formularios, lg para tablas/contenido extenso, fullscreen para workflows.

### 2. Danger como variante semantica, no solo un color

Carbon introdujo esta idea: el tipo danger no es un boton rojo — es un modelo de interaccion completo. Titulo rojo, icono de alerta, borde superior rojo, boton primario destructivo. Esto comunica gravedad a nivel de componente, no solo de boton. El developer elige `danger` y todo se configura automaticamente.

### 3. Footer como slot flexible, no prop con estructura fija

Atlassian y shadcn/ui demuestran que el footer como sub-componente da la flexibilidad necesaria: 0 acciones (informativo), 1 (confirmacion simple), 2 (cancel + confirm), o custom (checkbox "no mostrar de nuevo" + botones). Como prop con estructura fija, seria imposible cubrir todos los casos.

### 4. Body scroll interno, header/footer fijos

13/14 sistemas implementan scroll solo en el body. Las acciones del footer siempre estan visibles — el usuario nunca tiene que scrollear para encontrar "Guardar". Carbon, Atlassian y Spectrum coinciden en este patron como default.

### 5. Escape cierra, overlay dismiss OFF

Escape cierra el modal en 13/14 sistemas — es tan esperado que no tenerlo frustra al usuario de teclado. Overlay dismiss (click fuera) esta OFF por default para modals transaccionales: un click accidental no deberia descartar un formulario con datos. Spectrum valida esta combinacion exacta con props separadas para cada metodo de cierre.

### Combinaciones excluidas

```
  No hay exclusiones — 4 sizes x 2 variants = 8 frames totales
```

---

## Comportamiento

### Lo esencial para disenar

1. **Focus trap obligatorio.** Tab cicla entre los elementos interactivos del modal sin escapar al fondo. Sin focus trap, un usuario de teclado pierde contexto. WCAG 2.4.3 lo requiere.

2. **Foco al abrir: primer elemento interactivo.** Si hay formulario, foco al primer input. Si no, foco al close button. Nunca dejar el foco en el background.

3. **Foco al cerrar: vuelve al trigger.** El boton que abrio el modal recibe el foco al cerrar. Sin esto, el foco se pierde en `<body>`.

4. **Scrim bloquea interaccion visual y semantica.** El fondo recibe `aria-hidden="true"`. El scrim no solo oscurece — bloquea clicks, scrolls y tab navigation hacia el contenido de atras.

5. **Max 2 botones en el footer como default.** Research de Google muestra que 3+ opciones causan paralisis de decision en modals. Si necesitas 3+, documenta como excepcion.

6. **Auto-fullscreen en mobile.** Atlassian auto-convierte a fullscreen debajo de 480px viewport. Elimina la decision responsive de cada developer.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Modal (default) | `dialog` | `aria-modal="true"`, `aria-labelledby` → titulo | SR anuncia "dialogo" al recibir foco |
| Modal (danger) | `alertdialog` | `aria-modal="true"`, `aria-labelledby` → titulo | SR anuncia con mayor urgencia |
| Background | — | `aria-hidden="true"`, `inert` | SR ignora todo el contenido detras |
| Close button | `button` | `aria-label="Cerrar"` | SR anuncia proposito del boton |
| Titulo | heading | `id` referenciado por `aria-labelledby` | SR anuncia nombre del dialog |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  Tab / Shift+Tab     navegar dentro del modal (focus trap, wrap circular)
  Escape              cerrar modal → foco vuelve al trigger
  Enter / Space       activar boton enfocado
```

Interacciones secundarias (referencia para dev):

```
  Tab (ultimo → primero)    wrap circular del focus trap
  Focus on open             primer input (si form) o close button
```

---

## Guia de contenido

**Titulo:** Accion o pregunta clara. "¿Eliminar 15 items?" o "Guardar cambios" — no "Atencion" o "Aviso".

**Descripcion:** Explica consecuencias. "Esta accion es permanente y no se puede deshacer." — no repetir el titulo.

**Boton primario:** Verbo que describe la accion. "Eliminar", "Guardar", "Enviar" — no "OK" o "Aceptar" generico.

**Boton secundario:** "Cancelar" o alternativa. No usar "No" — es ambiguo.

---

## Checklist antes de construir

```
  ☐ ¿Que tamano?
    └─ sm = confirmacion · md = formulario · lg = tabla/extenso · fullscreen = workflow

  ☐ ¿Es destructivo?
    └─ Si si → usa variante danger (titulo rojo, boton destructivo)

  ☐ ¿Cuantas acciones en el footer?
    └─ 0 = informativo · 1 = ack · 2 = cancel+confirm (default)
    └─ 3+ = excepcion documentada

  ☐ ¿El body tiene scroll?
    └─ Si el contenido es largo → scroll interno en body, footer fijo

  ☐ ¿Tiene descripcion?
    └─ Si la accion necesita contexto → activa Has Description
```

---

## Relacion con otros componentes

```
  Drawer         Panel lateral — para contenido complementario sin bloquear
  Toast          Mensaje temporal — no requiere accion del usuario
  Banner/Alert   Mensaje persistente — no interrumpe el flujo
  Popover        Contenido contextual anclado a un trigger — no modal
  AlertDialog    Variante danger del Modal (mismo componente, role diferente)
```

---

## Referencia: como lo hacen otros sistemas

**Separacion contenido/contenedor:**
- Spectrum: Dialog (contenido) separado de Modal (contenedor) — maximo reutilizo
- shadcn/ui: Dialog y AlertDialog como componentes separados por semantica ARIA

**Tipado semantico:**
- Carbon: passive/transactional/danger — el tipo drive overlay dismiss, footer, visual
- Ant Design: `Modal.confirm()` imperativo para confirmaciones rapidas

**Footer flexible:**
- Atlassian: sub-componentes ModalHeader/Body/Footer opcionales
- Ant Design: `footer={null}` elimina footer completamente

**Consenso universal (14/14):**
- Focus trap obligatorio
- role="dialog" + aria-modal + aria-labelledby
- Foco regresa al trigger
- Layout de 3 zonas (header/body/footer)
- Escape cierra

---

## Tokens

**30 tokens** · prefijo `mdl-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--mdl-bg` | `bg/surface/default` | Fondo del modal (blanco) |
| `--mdl-overlay` | `overlay/default` | Scrim (negro 50%) |
| `--mdl-border` | `border/mid/default` | Borde sutil |
| `--mdl-divider` | `border/mid/default` | Separadores header/footer |
| `--mdl-title-fg` | `text/primary` | Titulo default |
| `--mdl-title-fg-danger` | `status/error/fg` | Titulo danger (rojo) |
| `--mdl-desc-fg` | `text/secondary` | Descripcion |
| `--mdl-danger-border` | `status/error/border` | Borde superior danger |
| `--mdl-focus-ring` | `border/focus` | Ring de foco |

### Specs de spacing

```
  ┌─ Modal ────────────────────────────────────────┐
  │ ┌─ header ──────────────────────────────────┐  │
  │ │ ←pad→ [⚠] ←8→ Titulo              [X] ←pad→│
  │ │       ←pad→ Descripcion            ←pad→    │
  │ └──────────────────────────────────────────────┘
  │ ── divider ──────────────────────────────────── │
  │ ┌─ body (scrollable) ─────────────────────────┐│
  │ │ ←pad→ Contenido                      ←pad→  ││
  │ └─────────────────────────────────────────────┘│
  │ ── divider ──────────────────────────────────── │
  │ ┌─ footer ─────────────────────────────────────┐
  │ │ ←pad→              [Cancel] ←12→ [OK] ←pad→ │
  │ └──────────────────────────────────────────────┘
  └────────────────────────────────────────────────┘

  padding por tamano:  sm/md = 24  ·  lg/full = 32
  radius:              sm/md/lg = 12  ·  fullscreen = 0
  gap titulo↔desc:     4px
  gap header↔body:     16-20px
  gap footer buttons:  12px
  overlay opacity:     50%
```
