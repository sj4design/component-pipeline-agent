# Switch

## Overview

El Switch es un control binario de efecto inmediato. El usuario lo activa o desactiva y el cambio se aplica al instante — no requiere un boton de submit. Es el equivalente digital de un interruptor de luz.

```
  ┌──────────┐
  │        ● │  Label del toggle
  └──────────┘
     track      thumb (circulo)
```

A diferencia del Checkbox (que es para formularios con submit diferido), el Switch comunica "esto cambia ahora". 17/19 sistemas usan `role="switch"` en lugar de `role="checkbox"` para reflejar esta semantica.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Tamano        sm · md · lg                         Track: 32x16 / 40x20 / 48x24
  Estado        default · hover · focus · disabled   Interaccion
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Label              Texto descriptivo a la derecha           texto editable
  ☐ Loading            Spinner en el thumb durante API call
  ☐ isChecked          Controla track color + thumb position    (on/off)
```

### Panel de propiedades en Figma

```
┌─ Switch ─────────────────────────────────┐
│                                          │
│  Variant Properties                      │
│  ┌────────────────┐ ┌──────────────────┐ │
│  │ Size      ▼ md │ │ State   ▼ def.. │ │
│  └────────────────┘ └──────────────────┘ │
│                                          │
│  Boolean Properties                      │
│  ☑ Label              ☐ Loading          │
│  ☐ isChecked                             │
│                                          │
│  Text Properties                         │
│  ✏️ Label        [ Toggle label     ]    │
│                                          │
└──────────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿El cambio tiene efecto inmediato?
  │
  ├─ Si, on/off instantaneo → usa Switch ✓
  │
  ├─ No, se envia con un boton → usa Checkbox
  │
  ├─ Seleccion entre 2+ opciones → usa Radio
  │
  └─ Multiples opciones independientes → usa Checkbox group
```

**Usa Switch cuando:**
- El cambio es inmediato (activar notificaciones, dark mode, feature toggle)
- Es una decision binaria on/off
- No hay boton de submit — el toggle ES la accion

**NO uses Switch cuando:**
- El valor se envia con un boton de submit → Checkbox
- Hay mas de 2 opciones → Radio group
- El usuario selecciona multiples items de una lista → Checkbox group
- La accion necesita confirmacion → usa dialog de confirmacion antes del toggle

---

## Variaciones visuales

### Estados on/off

```
  OFF                              ON
  ┌──────────┐                     ┌──────────┐
  │ ●        │                     │        ● │
  └──────────┘                     └──────────┘
  track gris                       track azul (brand)
  thumb izquierda                  thumb derecha
```

### Estados de interaccion

```
  default (off)            hover (off)              focus (off)
  ┌──────────┐             ┌──────────┐             ╔══════════╗
  │ ●        │             │ ●        │             ║ ●        ║  ← ring 2px azul
  └──────────┘             └──────────┘             ╚══════════╝
  gris medio               gris oscuro              gris + ring

  default (on)             hover (on)               focus (on)
  ┌──────────┐             ┌──────────┐             ╔══════════╗
  │        ● │             │        ● │             ║        ● ║  ← ring 2px azul
  └──────────┘             └──────────┘             ╚══════════╝
  azul                     azul oscuro              azul + ring

  disabled (off)           disabled (on)
  ┌──────────┐             ┌──────────┐
  │ ○        │             │        ○ │
  └──────────┘             └──────────┘
  gris claro, 50%          azul palido, 50%
```

### Con label

```
  ┌──────────┐
  │        ● │  Notificaciones por email
  └──────────┘

  ┌──────────┐
  │ ●        │  Modo oscuro
  └──────────┘
```

### Tamanos

```
  sm (16px)    ┌────────┐  ● Label    compacto, listas de settings
               └────────┘             track 32x16, thumb 12px

  md (20px)    ┌──────────┐  ● Label  formularios estandar (default)
               └──────────┘           track 40x20, thumb 16px

  lg (24px)    ┌────────────┐  ● Label  mobile, touch-friendly
               └────────────┘          track 48x24, thumb 20px
```

---

## Decisiones de diseno

### 1. isChecked como boolean, no como variante State

isChecked controla dos cosas: el color del track (gris→azul) y la posicion del thumb (izquierda→derecha). Como boolean en Figma, no multiplica frames (18 en vez de 36). El diseñador simplemente activa/desactiva el toggle en el panel de propiedades para ver ambos estados.

### 2. Tres tamanos para cubrir densidad y touch

M3 defiende un solo tamano (48dp touch target), pero 12/19 sistemas ofrecen multiples tamanos. El ratio track 2:1 (ancho:alto) es consenso, con thumb = trackH - 4px (2px padding cada lado). Tres tamanos cubren listas densas de settings (sm), formularios (md) y targets touch-friendly (lg).

### 3. Loading como boolean overlay

Solo 3/19 sistemas tienen loading (Ant Design y Primer son los referentes), pero en apps enterprise donde toggle → API call → confirmacion toma tiempo, loading previene race conditions. Como boolean overlay no multiplica frames. Ant muestra un spinner en el thumb; Primer agrega `aria-busy="true"` — la implementacion mas accesible.

### 4. Switch NO es para formularios con submit

Spectrum, Paste, Carbon, GOV.UK y Orbit coinciden en la regla mas importante: switch = efecto inmediato. Si el valor se envia con un boton, usa checkbox. GOV.UK no incluye Switch en su sistema precisamente porque todos sus formularios tienen submit diferido.

### 5. Label estable, nunca dinamico

Atlassian documenta un problema real: cambiar el label de "Notificaciones ON" a "Notificaciones OFF" rompe la navegacion por screen reader. El usuario navega por label, y si el label cambia despues del toggle, no puede re-encontrar el control. Solucion: label estable ("Notificaciones"), estado comunicado por `aria-checked`.

### Combinaciones excluidas

```
  disabled + hover/focus          no reacciona a interaccion
  loading + hover/focus           loading implica bloqueo temporal
```

---

## Comportamiento

### Lo esencial para disenar

1. **Space es la tecla de toggle.** NO Enter (Enter es para buttons). Tab navega al siguiente control. Es un control simple, no compuesto.

2. **Dual encoding obligatorio.** Color solo (verde/gris) no cumple WCAG 1.4.1 para daltonicos. La posicion del thumb (izquierda/derecha) es el segundo canal minimo. Iconos en el thumb (check/minus) son el tercer canal recomendado.

3. **El cambio es inmediato.** Si hay latencia (API call), mostrar loading state con spinner y `aria-busy="true"`. Nunca dejar al usuario sin feedback despues del toggle.

4. **Disabled debe explicar por que.** Atlassian recomienda que todo switch deshabilitado tenga contexto visible en la UI circundante explicando la razon del bloqueo.

5. **Switch en formularios con submit = error semantico.** Si un switch esta dentro de un `<form>` con boton submit, el usuario no sabe si el cambio es inmediato o diferido. Documentar esta regla explicitamente.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Switch | `switch` | `aria-checked="true\|false"` | SR anuncia "interruptor, activado/desactivado" |
| Switch | — | `aria-label` o visible label | SR necesita nombre accesible |
| Loading | — | `aria-busy="true"` | SR anuncia que esta procesando |
| Disabled | — | `aria-disabled="true"` | SR anuncia que no esta disponible |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  Tab                   foco llega al switch (ring azul visible)
  Space                 toggle on/off
  Tab                   foco al siguiente control
```

Interacciones secundarias (referencia para dev):

```
  Enter                 NO toggle (correcto per APG — Enter es para buttons)
  Shift+Tab             foco al control anterior
```

---

## Guia de contenido

**Label:** Describe la funcion, no el estado. "Notificaciones por email" — no "Activar/Desactivar notificaciones".

**Label estable:** Nunca cambiar el texto del label segun el estado. "Modo oscuro" siempre — no "Modo oscuro: ON".

**Contexto:** Si el switch controla algo no obvio, agrega texto descriptivo debajo. "Recibiras un email cada vez que un usuario comente en tu publicacion."

---

## Checklist antes de construir

```
  ☐ ¿El cambio es inmediato?
    └─ Si no → usa Checkbox en vez de Switch

  ☐ ¿Necesita loading state?
    └─ Si hay API call async → activa Loading boolean

  ☐ ¿Que tamano?
    └─ sm = listas densas · md = forms · lg = mobile/touch

  ☐ ¿El label es descriptivo y estable?
    └─ No cambiar el label segun el estado on/off

  ☐ ¿Hay feedback visual de dual encoding?
    └─ Color + posicion como minimo
    └─ Iconos en thumb como improvement opcional
```

---

## Relacion con otros componentes

```
  Checkbox       Para seleccion con submit diferido (formularios)
  Radio          Para elegir entre 2+ opciones mutuamente excluyentes
  Toggle Button  Para cambiar vista/modo (tabs), no para settings on/off
  Button         Para acciones puntuales, no para estados persistentes
```

---

## Referencia: como lo hacen otros sistemas

**role="switch" vs role="checkbox":**
- 17/19 usan `role="switch"` — la semantica correcta para efecto inmediato
- Lightning y Base Web usan `role="checkbox"` — implementaciones legacy

**Loading state:**
- Ant Design: spinner en thumb, 3 tamanos
- Primer (GitHub): `aria-busy="true"` — la mas accesible

**Thumb icons:**
- M3: checkmark (on) + minus (off) — WCAG 1.4.1 compliance automatico
- Carbon: checkmark obligatorio en tamano small
- Mantine: `thumbIcon` prop para iconos custom (sol/luna para dark mode)

**Consenso universal (19/19):**
- Space para toggle
- Disabled bloquea toda interaccion
- Binario estricto (sin indeterminado)
- Focus ring visible

---

## Tokens

**28 tokens** · prefijo `swt-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--swt-track-on` | `brand/900` | Track activo (azul) |
| `--swt-track-on-hover` | `brand/1000` | Track activo hover |
| `--swt-track-off` | `bg/mid/default` | Track inactivo (gris) |
| `--swt-track-off-hover` | `bg/mid/hover` | Track inactivo hover |
| `--swt-track-disabled` | `bg/disabled` | Track deshabilitado |
| `--swt-thumb` | `bg/surface/default` | Thumb (blanco) |
| `--swt-thumb-disabled` | `bg/surface/disabled` | Thumb deshabilitado |
| `--swt-label` | `text/label` | Texto del label |
| `--swt-label-disabled` | `text/disabled` | Label deshabilitado |
| `--swt-focus-ring` | `border/focus` | Ring de foco |

### Specs de spacing

```
  ┌─ track ────────────────────────────────┐
  │                                        │
  │  ←2→ [thumb ●]                   ←2→  │  ← 2px padding interno
  │                                        │
  └────────────────────────────────────────┘  ←8→  Label text

  track por tamano:  sm = 32x16  ·  md = 40x20  ·  lg = 48x24
  thumb por tamano:  sm = 12px   ·  md = 16px   ·  lg = 20px
  gap track↔label:   8px (siempre)
  radius track:      9999 (full pill)
  radius thumb:      9999 (circulo perfecto)
  focus ring:        2px width, 2px offset
```
