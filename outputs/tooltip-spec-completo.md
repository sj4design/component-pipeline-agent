# Tooltip

## Overview

El Tooltip es un popup informativo que aparece al hover o focus de un trigger. Muestra texto breve y suplementario — nunca contenido interactivo. El trigger es externo al componente; el tooltip solo es la superficie visual con texto y flecha opcional.

```
          ┌───────────────────┐
          │  [Title]          │   ← opcional (hasTitle)
          │  Tooltip content  │   ← siempre presente
          └────────▼──────────┘   ← arrow (toggle)
               ▲ trigger (externo)
```

Tiene una sola pieza: el **tooltip** (la superficie que aparece). El trigger (botón, ícono, texto) es un componente externo. El tooltip solo necesita posicionarse relativo al trigger.

**Qué puede configurar el diseñador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Placement     top · bottom · left · right              Posición relativa al trigger
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Arrow              Flecha apuntando al trigger                    18/24 consenso
  ☐ Has Title          Título bold sobre el contenido                 4/24 consenso
```

### Panel de propiedades en Figma

```
┌─ Tooltip ────────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ Placement              ▼ top   │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☑ Arrow            ☐ Has Title      │
│                                      │
│  Text Properties                     │
│  ✏️ Content    [ Tooltip text    ]   │
│  ✏️ Title      [ Title          ]   │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
  ¿El usuario necesita información adicional?
  │
  ├─ Es un label para ícono sin texto → Tooltip (type="label", aria-labelledby)
  │
  ├─ Es contexto suplementario breve → Tooltip (type="description", aria-describedby)
  │
  ├─ Necesita links, botones o contenido interactivo → Popover (focus trap)
  │
  ├─ La info debería ser siempre visible → Hint text / Helper text
  │
  └─ Es una confirmación de acción → Popconfirm / Dialog
```

**Usa Tooltip cuando:**
- Un botón de solo ícono necesita label accesible
- Un campo o control necesita contexto extra breve (1-2 líneas)
- El texto completo está truncado y el usuario necesita verlo

**NO uses Tooltip cuando:**
- El contenido tiene links o botones → usa Popover
- La información es esencial para completar la tarea → hazla siempre visible
- El usuario está en mobile/touch → tooltips hover-only son inaccesibles
- El contenido es largo (más de 2 líneas) → usa Popover o inline help

---

## Variaciones visuales

### Placement

```
  top                            bottom
  ┌───────────────────┐          
  │  Tooltip content  │               ▼ trigger
  └────────▼──────────┘          ┌────────▲──────────┐
       ▲ trigger                 │  Tooltip content  │
                                 └───────────────────┘

  left                           right
       ┌───────────────────┐          ┌───────────────────┐
       │  Tooltip content  ▶          ◀  Tooltip content  │
       └───────────────────┘          └───────────────────┘
       trigger ▲                                    ▲ trigger
```

### Con y sin arrow

```
  con arrow (default)            sin arrow
  ┌───────────────────┐          ┌───────────────────┐
  │  Tooltip content  │          │  Tooltip content  │
  └────────▼──────────┘          └───────────────────┘
       ▲ trigger                      ▲ trigger
```

### Con título opcional

```
  sin título (default)           con título (hasTitle=true)
  ┌───────────────────┐          ┌───────────────────┐
  │  Tooltip content  │          │  Title (bold)      │
  └────────▼──────────┘          │  Body text here    │
                                 └────────▼──────────┘
```

---

## Decisiones de diseño

### 1. Un solo tamaño, no sm/md/lg

22/24 sistemas usan un único tamaño de tooltip. El tooltip es información suplementaria breve — no necesita jerarquía de tamaños como un botón o input. Font 12px, padding 6/8px, max-width 240px cubre todos los casos. M3 usa 200dp para plain y 320dp para rich, pero la mayoría mantiene un solo preset.

### 2. Arrow como boolean, no como variante

18/24 sistemas implementan la flecha como toggle boolean (Chakra `hasArrow`, Fluent `withArrow`, Carbon caret). En UIs densas (toolbars), la proximidad visual entre trigger y tooltip hace innecesaria la flecha. En layouts espaciados, la flecha crea conexión visual. Default true — el diseñador la desactiva cuando necesita limpieza visual.

### 3. Dark-only; light mode vía Figma Variables

20/24 sistemas solo tienen tooltip dark. El tooltip oscuro sobre contenido claro tiene máximo contraste y es universalmente reconocible como "información contextual". La variante light (Evergreen, Base Web) solo cambia colores, no estructura — caso perfecto para modos de variable en Figma en lugar de multiplicar frames.

### 4. Placement como variante de 4 valores

22/24 sistemas coinciden en 4 posiciones básicas: top, bottom, left, right. Ant Design ofrece 12 posiciones (top-start, top-end, etc.) pero la granularidad excesiva no justifica los frames adicionales en Figma. Auto/mostSpace (Polaris, Atlassian) es comportamiento runtime que el código resuelve.

### 5. hasTitle como toggle, no como componente separado

M3 separa Plain Tooltip de Rich Tooltip como componentes distintos para prevenir contenido interactivo en tooltips hover-only. Decisión válida a nivel de código, pero en Figma la diferencia es solo un campo de texto adicional (título bold). Un boolean `hasTitle` es más eficiente que dos componentes separados.

### Combinaciones excluidas

```
  No aplica — tooltip tiene un solo estado visual (default/visible).
  El tooltip en sí no tiene estados interactivos (hover, focus, pressed).
  Esos estados pertenecen al TRIGGER (componente externo).
```

---

## Comportamiento

### Lo esencial para diseñar

1. **Aparece en hover Y focus.** 24/24 sistemas coinciden. Hover-only excluye usuarios de teclado. Focus = intención explícita. Ant Design es hover-only por default — un gap de a11y significativo que no debemos replicar.

2. **Escape siempre cierra.** La tecla Escape cierra el tooltip visible. 24/24 sistemas coinciden. Sin excepción.

3. **Focus NUNCA entra al tooltip.** A diferencia de modales y popovers, el focus del teclado permanece en el trigger. El tooltip no es focusable. Si necesitas contenido focusable, usa Popover.

4. **Delay de 300ms antes de mostrar.** Previene tooltips accidentales al mover el mouse. Spectrum implementa warmup/cooldown global: el primer tooltip tiene ~300ms, pero hovear sobre otro trigger lo muestra instantáneamente (estado "warm").

5. **Contenido solo informativo — NUNCA interactivo.** Si un diseñador pone un link o botón dentro del tooltip, viola `role="tooltip"` y excluye usuarios de teclado. Carbon lo hace arquitectónicamente imposible separando Tooltip (informativo) de Toggletip (interactivo, patrón disclosure).

6. **Trigger debe ser focusable.** El elemento que activa el tooltip DEBE poder recibir focus por teclado. Íconos solos sin wrapper button no son triggers válidos. Carbon lo impone: íconos NO pueden ser triggers directamente — deben estar envueltos en IconButton.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por qué importa |
|-------|-----|-----------|-----------------|
| Tooltip | `tooltip` | `role="tooltip"`, `id` | SR anuncia contenido como información suplementaria |
| Trigger (descripción) | — | `aria-describedby` → tooltip ID | SR lee el tooltip como descripción adicional del trigger |
| Trigger (label) | — | `aria-labelledby` → tooltip ID | Para icon-only buttons: el tooltip ES el nombre accesible |

### Navegación por teclado

Interacciones principales (afectan el diseño):

```
  Focus en trigger      tooltip aparece (tras delay)
  Escape                cierra tooltip
  Mouse out / blur      cierra tooltip
```

Interacciones secundarias (referencia para dev):

```
  Hover en trigger      tooltip aparece (tras delay ~300ms)
  Warmup activo         siguiente tooltip aparece instantáneamente
  Touch (mobile)        tooltip NO se muestra (sin hover nativo)
```

---

## Guía de contenido

**Contenido:** Breve y directo. Máximo 2 líneas. Si necesitas más, usa Popover o inline help.

**Título (opcional):** Una frase corta en bold. "Atajo de teclado", "Vista previa" — no oraciones completas.

**Para icon-only buttons:** El tooltip ES el label. Usa la misma convención que usarías para un botón con texto: "Guardar", "Eliminar", "Copiar enlace".

**Nunca dupliques:** Si el trigger ya tiene texto visible que dice lo mismo, el tooltip es redundante.

**Sin interacción:** No pongas "Click aquí para más información" — eso pertenece a un Popover o link.

---

## Checklist antes de construir

```
  ☐ ¿El trigger es focusable?
    └─ Si es ícono solo → envolver en IconButton
    └─ Si es texto → verificar que sea un elemento interactivo

  ☐ ¿El tooltip es label o description?
    └─ Icon-only button → aria-labelledby (el tooltip ES el nombre)
    └─ Contexto adicional → aria-describedby (suplementario)

  ☐ ¿Necesita flecha?
    └─ Layout espaciado → arrow=true (conexión visual)
    └─ Toolbar denso → arrow=false (limpieza visual)

  ☐ ¿El contenido es solo texto?
    └─ Si tiene links/botones → usar Popover, no Tooltip

  ☐ ¿El contenido cabe en 2 líneas?
    └─ Si es más largo → usar Popover o inline help

  ☐ ¿Qué placement?
    └─ Default: top · Ajustar si hay restricciones de espacio
```

---

## Relación con otros componentes

```
  Popover        Para contenido interactivo (links, botones, forms)
  Toggle Tip     Para contenido interactivo triggered por click (patrón disclosure)
  Helper Text    Para información siempre visible debajo de un campo
  Toast          Para feedback temporal de acciones del usuario
  Badge          Para contadores/estado, no información contextual
```

---

## Referencia: cómo lo hacen otros sistemas

**Separación arquitectónica (prevenir violaciones a11y):**
- Carbon: 3 componentes — Tooltip, Toggletip, Definition Tooltip. Cada contrato de interacción es explícito.
- M3: 2 componentes — Plain Tooltip (solo texto) y Rich Tooltip (título + acciones, persistente).

**Warmup/cooldown global:**
- Spectrum: delay compartido entre todos los tooltips. Primer tooltip ~300ms, siguientes instantáneos.
- Radix: `skipDelayDuration` en Provider para escaneo rápido de toolbars.

**Distinción ARIA label vs description:**
- Primer: `type="label"` vs `type="description"` — determina `aria-labelledby` vs `aria-describedby`.
- Fluent 2: `relationship` prop con misma distinción.

**Consenso universal (24/24):**
- `role="tooltip"` + `aria-describedby`
- Aparece en focus + hover
- Escape cierra
- Contenido no interactivo

---

## Tokens

**12 tokens** · prefijo `tip-` · 3 capas (primitivo → semántico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--tip-bg` | `bg/inverse/default` | Fondo del tooltip (oscuro) |
| `--tip-fg` | `text/inverse` | Texto del tooltip (claro) |
| `--tip-border` | `border/inverse` | Borde sutil del tooltip |
| `--tip-radius` | `radius/sm` | Border radius (6px) |
| `--tip-shadow` | `elevation/1` | Sombra sutil |
| `--tip-arrow-bg` | `bg/inverse/default` | Fondo de la flecha (mismo que tooltip) |
| `--tip-title-weight` | `font/weight/semibold` | Peso del título opcional |
| `--tip-font-size` | `font/size/xs` | Tamaño de texto (12px) |
| `--tip-line-height` | `font/lineHeight/tight` | Line height (16px) |
| `--tip-max-width` | `240` | Ancho máximo |
| `--tip-offset` | `spacing/1` | Distancia trigger-tooltip (4px) |
| `--tip-delay` | `300` | Delay de aparición (ms) |

### Specs de spacing

```
  ┌─ tooltip ──────────────────────────────────────┐
  │                                                │
  │  ←8→ [Title (bold)]                     ←8→    │
  │       ↕ 4                                      │
  │  ←8→ [Content text]                     ←8→    │
  │       ↕ 6 (py)                          ↕ 6    │
  │                                                │
  └────────────────────────────────────────────────┘
                    ▼ arrow (6px)
              ↕ 4px offset

  padding:        6px vertical · 8px horizontal
  gap title↔body: 4px
  arrow size:     6px
  offset:         4px (distancia al trigger)
  radius:         6px
  max-width:      240px
  font-size:      12px / line-height 16px
```
