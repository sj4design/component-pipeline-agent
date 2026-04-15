# Button

## Overview

El Button es el componente de accion primario del sistema. Permite al usuario ejecutar acciones, enviar formularios, o navegar. Tiene jerarquia visual explicita (5 variantes) para comunicar la importancia relativa de cada accion en la interfaz.

```
  ┌────────────────────────────────┐
  │  [icon]  Label  [icon]         │
  │  └leading      trailing┘       │
  │  ──────── container ────────── │
  └────────────────────────────────┘

  .IconButton (sub-componente):
  ┌────────┐
  │  [🔍]  │   aria-label OBLIGATORIO
  └────────┘
```

Tiene dos piezas: **Button** (con label de texto) y **.IconButton** (sub-componente solo icono). El Button acepta iconos opcionales leading/trailing. El .IconButton requiere `aria-label` — sin label visible, el texto accesible es obligatorio.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Button:
  Tamano        sm · md · lg                              32 / 40 / 48px
  Variante      primary · secondary · outline · ghost · danger
  Estado        default · hover · focus · pressed · disabled

  .IconButton:
  Tamano        sm · md · lg                              32 / 40 / 48px
  Variante      primary · secondary · ghost
  Estado        default · hover · focus · pressed · disabled
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  Button:
  ☐ Icon Before       Icono antes del label                       intercambiable
  ☐ Icon After        Icono despues del label                     intercambiable
```

### Panel de propiedades en Figma

```
┌─ Button ─────────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ Size      ▼ md │ │ Variant ▼ …  │ │
│  └────────────────┘ └──────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ State                ▼ default │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☐ Icon Before       ☐ Icon After    │
│                                      │
│  Text Properties                     │
│  ✏️ Label        [ Button        ]   │
│                                      │
│  Instance Swap                       │
│  ↳ Icon Before   [ 🏷 icon-name ]   │
│  ↳ Icon After    [ 🏷 icon-name ]   │
│                                      │
└──────────────────────────────────────┘

┌─ .IconButton ────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ Size      ▼ md │ │ Variant ▼ …  │ │
│  └────────────────┘ └──────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ State                ▼ default │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Instance Swap                       │
│  ↳ Icon         [ 🏷 icon-name  ]   │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿El usuario necesita ejecutar una accion?
  │
  ├─ Accion principal de la pagina → usa Button (primary) ✓
  │
  ├─ Accion secundaria / alternativa → usa Button (secondary/outline)
  │
  ├─ Accion terciaria / inline → usa Button (ghost)
  │
  ├─ Accion destructiva → usa Button (danger)
  │
  ├─ Solo icono (toolbar, acciones compactas) → usa .IconButton
  │
  ├─ Navegacion a otra pagina → usa Link (no Button con href)
  │
  └─ Toggle on/off → usa Toggle/Switch
```

**Usa Button cuando:**
- El usuario ejecuta una accion (enviar, guardar, eliminar, crear)
- Necesitas comunicar jerarquia visual entre acciones
- La accion modifica estado o datos

**NO uses Button cuando:**
- Navega a otra pagina → usa Link (semantica de `<a>`, no `<button>`)
- Es un toggle on/off → usa Switch
- Es seleccion entre opciones → usa Radio, Checkbox, o Select
- Es un menu de acciones → usa Menu/Dropdown

---

## Variaciones visuales

### Variantes (jerarquia visual)

```
  primary                  secondary                outline
  ┌────────────────────┐   ┌────────────────────┐   ┌────────────────────┐
  │████ Guardar ████████│   │▓▓▓▓ Cancelar ▓▓▓▓▓│   │─── Exportar ──────│
  └────────────────────┘   └────────────────────┘   └────────────────────┘
  Fondo azul, texto blanco  Fondo gris, texto negro  Fondo blanco, borde gris
  Accion principal/CTA      Accion alternativa       Accion con bajo enfasis

  ghost                    danger
  ┌────────────────────┐   ┌────────────────────┐
  │    Mas opciones    │   │████ Eliminar ██████│
  └────────────────────┘   └────────────────────┘
  Sin fondo, sin borde      Fondo rojo, texto blanco
  Accion terciaria/inline   Accion destructiva
```

### Estados

```
  default              hover                focus
  ┌────────────────┐   ┌────────────────┐   ╔════════════════╗
  │████ Label █████│   │▓▓▓▓ Label ▓▓▓▓│   ║████ Label █████║  ← ring 2px
  └────────────────┘   └────────────────┘   ╚════════════════╝

  pressed              disabled
  ┌────────────────┐   ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
  │▒▒▒▒ Label ▒▒▒▒│   ╎░░░░ Label ░░░░░░╎  opacity 50%
  └────────────────┘   └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  no focusable
```

### Tamanos

```
  sm (32px)    ┌──────────────────┐    filtros, toolbars, acciones densas
               │ Label            │    font 12px · padding 12px · icon 16px
               └──────────────────┘

  md (40px)    ┌──────────────────┐    formularios, dialogs (default)
               │ Label            │    font 14px · padding 16px · icon 20px
               └──────────────────┘

  lg (48px)    ┌──────────────────┐    CTAs, landing pages, mobile
               │ Label            │    font 16px · padding 20px · icon 20px
               └──────────────────┘
```

### Con iconos

```
  Icon leading:              Icon trailing:             Ambos iconos:
  ┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
  │ [+]  Crear           │   │ Exportar         [↓] │   │ [←]  Volver      [→] │
  └──────────────────────┘   └──────────────────────┘   └──────────────────────┘
```

---

## Decisiones de diseno

### 1. Cinco variantes de jerarquia

M3 tiene 5 (filled/tonal/elevated/outlined/text). Polaris tiene 3 (primary/plain/tertiary). Carbon tiene 5 (primary/secondary/tertiary/ghost/danger). Nosotros: 5 variantes (primary/secondary/outline/ghost/danger) — cubren CTA, alternativa, bajo enfasis, terciaria y destructiva. La investigacion de Polaris muestra que mas de 4-5 estilos dificultan el reconocimiento, pero en interfaces enterprise con multiples acciones competidoras, la granularidad es necesaria.

### 2. Danger como variante, no como tone ortogonal

Polaris separa `tone=critical` de `variant` — cualquier variante puede ser destructiva. Carbon tiene 3 niveles de danger. Nosotros: danger como variante propia — mas simple y suficiente para la mayoria de casos. Si se necesita danger con bajo enfasis, usar ghost + color del label.

### 3. .IconButton como sub-componente separado

Atlassian separo en 4 componentes (Button, IconButton, LinkButton, LinkIconButton) para eliminar errores semanticos de HTML. Nosotros: Button + .IconButton. El IconButton requiere `aria-label` obligatorio — sin label visible, el texto accesible no puede ser opcional. Carbon ademas exige que ghost buttons siempre incluyan icono, porque en interfaces densas un ghost sin icono es indistinguible del texto.

### 4. Focus ring visible y con contraste

WCAG 2.4.7 requiere focus visible. WCAG 2.4.13 (AA en 2.2) requiere que el focus indicator tenga 3:1 de contraste. Nosotros: ring de 2px con offset 2px, color del sistema de foco. Mantener dimensiones del boton durante loading (patron Spectrum `isPending`) para evitar layout shift.

### Combinaciones excluidas

```
  disabled + hover/focus/pressed    no reacciona a interaccion
  ghost + danger (en .IconButton)   confuso sin label de texto
```

---

## Comportamiento

### Lo esencial para disenar

1. **Una sola accion primaria por vista.** Multiples primary buttons en la misma seccion crean competencia visual. Usar secondary/outline para acciones alternativas.

2. **Disabled es controversial.** Atlassian lo desalienta — descubrieron que el 34% de frustacion viene de botones grises sin explicacion. Alternativa: mantener habilitado y mostrar validacion inline al hacer click.

3. **Loading mantiene dimensiones.** Cuando el boton entra en estado de carga (spinner), las dimensiones originales se mantienen. Sin esto, el layout salta.

4. **Touch target minimo 44x44px.** WCAG 2.5.8. En sm (32px de altura), el touch target real debe ser 44px con padding invisible.

5. **Icon-only requiere aria-label.** Sin excepcion. El componente no debe ser usable sin texto accesible.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Button | `button` | implicito con `<button>` | SR anuncia "boton, [label]" |
| .IconButton | `button` | `aria-label` OBLIGATORIO | SR anuncia la accion sin label visible |
| Icon decorativo | — | `aria-hidden="true"` | SR ignora el icono cuando hay label |
| Loading | — | `aria-busy="true"`, `aria-disabled="true"` | SR anuncia "ocupado" |
| Danger | — | — | El label del texto comunica la accion, no solo el color |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  Tab                   foco llega al boton (ring visible)
  Enter                 activa el boton
  Space                 activa el boton
```

Interacciones secundarias (referencia para dev):

```
  Shift+Tab             foco al elemento anterior
  aria-disabled         focusable pero no activable (patron M3)
```

---

## Guia de contenido

**Label:** Verbo de accion. "Guardar", "Crear proyecto", "Eliminar" — no "OK" ni "Submit" ni "Click here".

**Danger label:** El texto debe comunicar la accion destructiva. "Eliminar cuenta" — no solo "Eliminar". El color rojo refuerza pero no reemplaza al texto.

**Icon:** El icono refuerza el label, no lo reemplaza (excepto en IconButton). "+" con "Crear", "↓" con "Descargar". Icono generico como placeholder = mala practica.

**Longitud:** Max 3 palabras para el label. Si necesitas mas contexto, usar tooltip o descripcion adyacente.

---

## Checklist antes de construir

```
  ☐ ¿Que variante? (primary/secondary/outline/ghost/danger)
    └─ ¿Hay otro primary en la misma vista?
    └─ ¿Es accion destructiva? → danger

  ☐ ¿Que tamano?
    └─ sm = dense · md = default · lg = CTA/mobile

  ☐ ¿Necesita icono?
    └─ Leading = refuerzo · Trailing = disclosure
    └─ Solo icono → .IconButton con aria-label

  ☐ ¿Que pasa en loading?
    └─ Spinner sin layout shift
    └─ aria-busy + aria-disabled

  ☐ ¿Disabled o validacion inline?
    └─ Considerar mantener habilitado + mostrar error al click

  ☐ ¿Touch target >= 44px?
    └─ Especialmente en sm (32px de altura visual)
```

---

## Relacion con otros componentes

```
  Link           Para navegacion (semantica <a>), no acciones
  Toggle         Para estados on/off binarios
  Menu           Para listas de acciones en dropdown
  ButtonGroup    Para agrupar acciones relacionadas
  IconButton     Sub-componente para acciones solo-icono
  FAB            Accion principal de pantalla (componente separado)
```

---

## Referencia: como lo hacen otros sistemas

**Jerarquia de 5 niveles:** M3 (filled/tonal/elevated/outlined/text), Carbon (primary/secondary/tertiary/ghost/danger).

**Separacion semantica por componente:** Atlassian (Button/IconButton/LinkButton/LinkIconButton — 4 componentes para HTML correcto), Spectrum (Button/ActionButton/ToggleButton).

**Tone ortogonal:** Polaris (`tone=critical` independiente de `variant`), Carbon (3 niveles de danger: primary/tertiary/ghost).

**Consenso universal:** Tab + Enter/Space para activar. Focus ring visible. Icon-only requiere aria-label. Touch target 44px.

---

## Tokens

**48 tokens** · prefijo `btn-` / `ibtn-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--btn-primary-bg` | `interactive/default` | Fondo primary |
| `--btn-primary-bg-hover` | `interactive/hover` | Fondo primary hover |
| `--btn-primary-bg-pressed` | `interactive/pressed` | Fondo primary pressed |
| `--btn-primary-fg` | `text/onColor` | Texto primary (blanco) |
| `--btn-secondary-bg` | `bg/surface/secondary` | Fondo secondary |
| `--btn-outline-border` | `border/mid/default` | Borde outline |
| `--btn-ghost-bg-hover` | `bg/surface/hover` | Fondo ghost en hover |
| `--btn-danger-bg` | `status/error/default` | Fondo danger |
| `--btn-disabled-bg` | `bg/surface/disabled` | Fondo disabled |
| `--btn-disabled-fg` | `text/disabled` | Texto disabled |
| `--btn-focus-ring` | `border/focus` | Ring de foco |

### Specs de spacing

```
  ┌─ Button ───────────────────────────────────────────┐
  │                                                     │
  │  ←px→ [icon 16-20px] ←gap→ [label] ←gap→ [icon] ←px→
  │       ↕ centrado vertical                           │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  ┌─ .IconButton ──────────────────────────────────────┐
  │                                                     │
  │  ←px→ [icon 16-20-24px] ←px→                       │
  │       ↕ centrado vertical                           │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  Button px/gap por tamano:  sm = 12/6  ·  md = 16/8  ·  lg = 20/8
  IconButton px por tamano:  sm = 8  ·  md = 10  ·  lg = 12
  radius:                    sm = 6  ·  md = 8  ·  lg = 12
  focus ring:                2px width · 2px offset
  icon size:                 sm = 16  ·  md = 20  ·  lg = 20
  font size:                 sm = 12  ·  md = 14  ·  lg = 16
```
