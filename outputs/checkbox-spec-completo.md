# Checkbox

## Overview

El Checkbox es un control de seleccion que acepta tres estados: unchecked, checked e indeterminate. El usuario marca o desmarca opciones en formularios, y el cambio se envia con un boton de submit — a diferencia del Switch, no tiene efecto inmediato.

```
  ┌──┐
  │✓ │ Label text
  └──┘
       Help text (opcional)
```

Soporta seleccion individual y grupal. El estado indeterminate aparece cuando un checkbox padre tiene algunos hijos marcados — es presentacional, el usuario no puede seleccionarlo directamente.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Tamano        sm · md · lg                           Caja: 16 / 20 / 24px
  Seleccion     unchecked · checked · indeterminate    Icono: vacio / check / dash
  Estado        default · hover · focus · pressed      Interaccion
  Validacion    ninguna · error                        Borde rojo + mensaje
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☐ isDisabled         Opacity 50%, sin interaccion
  ☐ hasHelpText        Texto descriptivo debajo del label          texto editable
```

### Panel de propiedades en Figma

```
┌─ Checkbox ───────────────────────────────┐
│                                          │
│  Variant Properties                      │
│  ┌────────────────┐ ┌──────────────────┐ │
│  │ Size      ▼ md │ │ Selected ▼ unch. │ │
│  └────────────────┘ └──────────────────┘ │
│  ┌────────────────┐ ┌──────────────────┐ │
│  │ State  ▼ def.. │ │ Status  ▼ none  │ │
│  └────────────────┘ └──────────────────┘ │
│                                          │
│  Boolean Properties                      │
│  ☐ isDisabled         ☐ hasHelpText      │
│                                          │
│  Text Properties                         │
│  ✏️ Label        [ Checkbox label   ]    │
│  ✏️ Help text    [ Help text here   ]    │
│                                          │
└──────────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿El usuario selecciona opciones?
  │
  ├─ Una o varias de una lista → usa Checkbox ✓
  │
  ├─ Exactamente una de varias (mutuamente excluyente) → usa Radio
  │
  ├─ On/off con efecto inmediato → usa Switch
  │
  ├─ Muchas opciones (5+) en espacio limitado → usa Select multi
  │
  └─ Aceptar terminos (si/no) → usa Checkbox individual ✓
```

**Usa Checkbox cuando:**
- El usuario selecciona una o varias opciones independientes
- El cambio se envia con un boton de submit (no es inmediato)
- Necesitas un patron "select all" con estado indeterminate
- Es una aceptacion binaria (terminos, consentimiento)

**NO uses Checkbox cuando:**
- Solo se puede elegir una opcion → Radio
- El cambio es inmediato (settings, toggles) → Switch
- Hay 5+ opciones en espacio limitado → Select con multi-select
- Son acciones (eliminar, exportar) → Menu o Button group

---

## Variaciones visuales

### Tres estados de seleccion

```
  unchecked                checked                  indeterminate
  ┌──┐                     ┌──┐                     ┌──┐
  │  │ Opcion A            │✓ │ Opcion B            │─ │ Seleccionar todo
  └──┘                     └──┘                     └──┘
  caja vacia, borde gris   caja azul, check blanco  caja azul, dash blanco
```

### Estados de interaccion

```
  default                  hover                    focus
  ┌──┐                     ┌──┐                     ╔══╗
  │  │ Label               │  │ Label               ║  ║ Label    ← ring 2px
  └──┘                     └──┘                     ╚══╝
  borde gris medio         borde gris oscuro        borde azul + ring

  pressed                  disabled (unchecked)     disabled (checked)
  ┌──┐                     ┌╌╌┐                     ┌╌╌┐
  │  │ Label               ╎  ╎ Label               ╎✓ ╎ Label
  └──┘                     └╌╌┘                     └╌╌┘
  fondo gris tenue         opacity 50%              opacity 50%
```

### Validacion

```
  error (unchecked)                          error (checked)
  ┌──┐                                      ┌──┐
  │  │ Acepto los terminos                   │✓ │ Acepto los terminos
  └──┘                                       └──┘
  ⚠ Debes aceptar para continuar             borde rojo (error persiste)
  borde rojo + texto rojo
```

### Select-all pattern

```
  ┌──┐
  │─ │ Seleccionar todo (indeterminate)
  └──┘
    ┌──┐
    │✓ │ Opcion A (checked)
    └──┘
    ┌──┐
    │  │ Opcion B (unchecked)
    └──┘
    ┌──┐
    │✓ │ Opcion C (checked)
    └──┘
```

### Tamanos

```
  sm (16px)    ┌──┐ Label    dashboards, tablas compactas
               └──┘          caja 16x16, icono 12px, font 12px

  md (20px)    ┌──┐ Label    formularios estandar (default)
               └──┘          caja 20x20, icono 14px, font 14px

  lg (24px)    ┌──┐ Label    mobile, seleccion prominente
               └──┘          caja 24x24, icono 16px, font 16px
```

---

## Decisiones de diseno

### 1. Tri-state como variante Selected, no boolean

Cada valor de Selected (unchecked/checked/indeterminate) cambia el icono visual: vacio, check o dash. Un boolean no puede representar 3 estados. 24/24 sistemas reconocen el tri-state. En Figma, Selected es una variante con 3 valores que cambia el contenido de la caja.

### 2. isDisabled como boolean, no state variant

Disabled solo cambia opacity (0.5) sin alterar la estructura del componente. Siguiendo las reglas globales de propiedades: 1 propiedad visual cambiada = boolean. Esto evita multiplicar 69 frames por 2.

### 3. .CheckboxControl como sub-componente separado

La caja visual (control) se separa del Checkbox completo (control + label + help text) para reutilizacion. El control se puede embeber en futuros patrones como Checkbox.Card sin duplicar las variantes de la caja. Carbon y Spectrum validan esta separacion.

### 4. Error a nivel de checkbox individual Y grupo

Carbon pone el error a nivel de grupo; Polaris lo pone por checkbox individual. Ambos son validos segun contexto: opciones independientes (consentimiento) necesitan error individual, opciones agrupadas ("elige al menos una") necesitan error grupal. El DS soporta ambos.

### 5. Space toggle, Enter NO

Esta distincion critica diferencia Checkbox de Button. Space cambia el estado; Enter envia el formulario. 24/24 sistemas la respetan. Confundir las teclas causa bugs de accesibilidad severos.

### Combinaciones excluidas

```
  disabled + hover/focus/pressed     no reacciona a interaccion
  disabled + error                   validacion no aplica si esta deshabilitado
```

---

## Comportamiento

### Lo esencial para disenar

1. **Indeterminate es presentacional, no interactivo.** El usuario no puede "seleccionar indeterminate" — es un estado derivado por el padre cuando algunos hijos estan checked. Al clickear un checkbox indeterminate, pasa a checked.

2. **Space toggle, Enter NO.** Enter envia el formulario. Esta distincion es critica y no negociable.

3. **El label es clickeable.** Toda el area del label es click target, no solo la caja. Aumenta el area interactiva y mejora usabilidad en touch.

4. **Group con fieldset/legend.** Cuando hay multiples checkboxes relacionados, agrupar con fieldset/legend o `role="group"` + `aria-labelledby`. No usar divs planos — el SR necesita el contexto del grupo.

5. **Tab entre checkboxes, NO flechas.** A diferencia de Radio (que usa roving tabindex con flechas), cada checkbox tiene su propio tab stop. La razon: checkboxes son multi-select independientes, no mutuamente excluyentes.

6. **Touch target minimo 44x44px.** La caja visual es 16-24px, pero el area interactiva invisible debe ser al menos 44x44px para cumplir WCAG 2.5.8 best practice.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Checkbox | `checkbox` | `aria-checked="true\|false\|mixed"` | SR anuncia estado de seleccion |
| Checkbox | — | `aria-invalid="true"` (error) | SR anuncia campo invalido |
| Label | `label` | `for` → checkbox id | SR anuncia el nombre de la opcion |
| Help text | — | `aria-describedby` | SR anuncia la descripcion |
| Group | `group` | `aria-labelledby` → legend | SR anuncia nombre del grupo antes de cada opcion |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  Tab                   foco llega al checkbox (ring en la caja)
  Space                 toggle checked/unchecked
  Tab                   foco al siguiente checkbox (linear, no flechas)
```

Interacciones secundarias (referencia para dev):

```
  Shift+Tab             foco al checkbox anterior
  Enter                 NO toggle — envia el formulario
```

---

## Guia de contenido

**Label:** Positivo y claro. "Recibir notificaciones" — no "No desactivar notificaciones" (double negative).

**Help text:** Explica la consecuencia. "Recibiras un email semanal con novedades" — no "Marca esta casilla".

**Error text:** Especifico y accionable. "Debes aceptar los terminos para continuar" — no "Campo requerido".

**Group legend:** Describe el conjunto. "Tipos de notificacion" — no "Selecciona opciones".

---

## Checklist antes de construir

```
  ☐ ¿Individual o en grupo?
    └─ Individual → Checkbox con label
    └─ Grupo → CheckboxGroup con legend + error grupal

  ☐ ¿Necesita select-all?
    └─ Si si → checkbox padre con estado indeterminate
    └─ Logica de parent-child en el codigo

  ☐ ¿Necesita help text?
    └─ Si la opcion necesita explicacion → activa hasHelpText

  ☐ ¿Es requerido?
    └─ Para aceptacion de terminos → error si no esta checked

  ☐ ¿Que tamano?
    └─ sm = tablas/dashboards · md = forms · lg = mobile
```

---

## Relacion con otros componentes

```
  Radio          Para seleccion mutuamente excluyente (una sola opcion)
  Switch         Para cambios de efecto inmediato (no requiere submit)
  Select multi   Para 5+ opciones en espacio limitado (con dropdown)
  CheckboxGroup  Contenedor de checkboxes con legend y error grupal
```

---

## Referencia: como lo hacen otros sistemas

**Error a nivel de grupo vs individual:**
- Carbon: error solo a nivel de grupo — un mensaje accionable por conjunto
- Polaris: error por checkbox individual — guia inline por opcion

**Indeterminate:**
- Spectrum: persiste al click — el padre recalcula segun hijos
- Radix: union type `checked: boolean | "indeterminate"`

**Touch target:**
- M3: 48dp touch target invisible alrededor de caja de 18dp
- GOV.UK: touch targets extra grandes para accesibilidad gobierno

**Consenso universal (24/24):**
- Tri-state (checked/unchecked/indeterminate)
- Space toggle, NO Enter
- Label asociado siempre
- Focus ring visible

---

## Tokens

**42 tokens** · prefijo `chk-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--chk-border` | `border/mid/default` | Borde unchecked |
| `--chk-border-hover` | `border/mid/hover` | Borde hover |
| `--chk-border-error` | `status/error/border` | Borde error |
| `--chk-bg-checked` | `brand/900` | Fondo checked (azul) |
| `--chk-bg-checked-hover` | `brand/1000` | Fondo checked hover |
| `--chk-bg-indeterminate` | `brand/900` | Fondo indeterminate |
| `--chk-checkmark` | `brand/0` | Icono check/dash (blanco) |
| `--chk-focus-ring` | `border/focus` | Ring de foco |
| `--chk-label` | `text/label` | Texto del label |
| `--chk-label-disabled` | `text/disabled` | Label deshabilitado |
| `--chk-help-text` | `text/secondary` | Help text |
| `--chk-error-fg` | `status/error/fg` | Error text |

### Specs de spacing

```
  ┌──┐
  │✓ │ ←8→ Label text
  └──┘
              Help text (opcional)

  caja por tamano:   sm = 16x16  ·  md = 20x20  ·  lg = 24x24
  icono por tamano:  sm = 12px   ·  md = 14px   ·  lg = 16px
  radius caja:       sm = 2px    ·  md = 4px    ·  lg = 4px
  border width:      sm = 1.5px  ·  md = 2px    ·  lg = 2px
  gap caja↔label:    8px (siempre)
  padding vertical:  4px (touch target extension)
  font label:        sm = 12px   ·  md = 14px   ·  lg = 16px
```
