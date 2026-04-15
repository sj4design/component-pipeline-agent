# Progress

## Overview

El Progress es un indicador visual de avance de tarea. Muestra cuanto de una operacion se ha completado (determinado) o que algo esta en curso sin duracion conocida (indeterminado). Es un componente display-only: no recibe foco, no tiene interaccion, no dispara acciones.

```
  Determinado (bar):
  Label                          75%
  ████████████████████░░░░░░░░░░░░░
  Helper text

  Indeterminado (bar):
  Loading...
  ░░░░████████░░░░░░░░░░░░░░░░░░░░░   ← animacion ciclica

  Determinado (circular):
      ╭───╮
     ╱     ╲
    │  75%  │
     ╲     ╱
      ╰───╯
```

Tiene dos piezas estructurales: el **track** (fondo) y el **fill** (relleno que muestra el progreso). Label y porcentaje son opcionales.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Tamano        sm · md · lg                     Track: 4 / 8 / 12px (bar) · 32 / 48 / 64px (circular)
  Forma         bar · circular                   Barra horizontal o anillo
  Status        default · success · error        Color del fill: azul / verde / rojo
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☐ Label              Texto descriptivo arriba                    texto editable
  ☐ Percentage         Valor numerico (ej: "75%")                  texto editable
  ☐ Indeterminate      Animacion ciclica sin valor conocido
```

### Panel de propiedades en Figma

```
┌─ Progress ───────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ Size      ▼ md │ │ Variant ▼ bar│ │
│  └────────────────┘ └──────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ Status               ▼ default │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☐ Label              ☐ Percentage   │
│  ☐ Indeterminate                     │
│                                      │
│  Text Properties                     │
│  ✏️ Label        [ Loading...    ]   │
│  ✏️ Percentage   [ 50%           ]   │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿El usuario necesita saber el estado de una operacion?
  │
  ├─ Duracion conocida (upload, download, pasos) → usa Progress (bar) ✓
  │
  ├─ Duracion desconocida, forma consistente → usa Progress (indeterminate) ✓
  │
  ├─ Duracion desconocida, accion puntual → usa Spinner
  │
  ├─ Contenido cargando, placeholder visual → usa Skeleton
  │
  └─ Medicion persistente (uso de disco, CPU) → usa Meter (role="meter")
```

**Usa Progress cuando:**
- La operacion tiene un porcentaje de avance conocido (upload, download, instalacion)
- Necesitas consistencia visual entre progreso conocido y desconocido (indeterminado)
- El contexto es standalone — una barra o anillo que reporta estado

**NO uses Progress cuando:**
- La duracion es desconocida y un spinner es suficiente → Spinner es mas simple
- Necesitas placeholder de contenido → Skeleton imita la forma del contenido real
- Es una medicion persistente, no una tarea que termina → Meter tiene semantica ARIA distinta
- El progreso es multi-paso con labels por paso → usa Stepper

---

## Variaciones visuales

### Formas

```
  bar (default)                              circular
  Label                         75%              ╭───╮
  ████████████████████░░░░░░░░░░░░░             ╱     ╲
                                               │  75%  │
  Uso general, formularios,                     ╲     ╱
  uploads, instalaciones                         ╰───╯
                                               Dashboards, tarjetas compactas
```

### Tamanos

```
  sm   ██████████░░░░░░░░░░   track 4px · font 10px · circular 32px
  md   ██████████░░░░░░░░░░   track 8px · font 12px · circular 48px
  lg   ██████████░░░░░░░░░░   track 12px · font 14px · circular 64px
```

### Status

```
  default                    success                    error
  ████████████░░░░░░░░░░     ██████████████████████     ████████████░░░░░░░░░░
  azul — en curso            verde — completado         rojo — fallo

  Transicion de texto:
  default → "Uploading... 75%"
  success → "Upload complete"
  error   → "Upload failed"
```

### Indeterminado

```
  Determinado:                           Indeterminado:
  ████████████████████░░░░░░░░░░░░░      ░░░░████████░░░░░░░░░░░░░░░░░░░░░
  fill proporcional al valor             fill animado sin valor fijo

  En Figma: barra con fill al ~30% centrado
  En codigo: animacion ciclica via CSS/JS
```

---

## Decisiones de diseno

### 1. Un componente con Variant, no dos separados

M3, Lightning y Chakra separan bar y circular en componentes independientes porque sus props difieren (gapSize para linear, strokeWidth para circular). Ant Design y Mantine unifican en uno via prop `type`. Para Figma, un solo component set con Variant (bar/circular) es mas mantenible — mismo set de propiedades, diferentes formas. Las props especificas se manejan internamente sin contaminar la API.

### 2. Label y porcentaje como toggles, no integrados

Spectrum fuerza el label como prop requerida en TypeScript — elimina el gap de a11y mas comun. M3 y Atlassian no incluyen label, se compone externamente. Carbon pone helper text debajo de la barra: sin conflicto de contraste con el fill, y puede transicionar de "45%" a "Upload complete" sin layout shift. Nosotros: label y porcentaje como booleanText toggleables — self-contained pero opcionales.

### 3. Status desacoplado del valor

Carbon y Ant Design desacoplan status de value — puedes setear `status="finished"` cuando el async resuelve sin que value llegue a 100. Critico para operaciones asincronas. Nosotros: 3 status (default/success/error) independientes del valor numerico.

### 4. Indeterminado como boolean explicito

M3 usa `value=null` para indeterminado — elegante pero implicito. Spectrum y Atlassian usan `isIndeterminate` boolean explicito. Nosotros: boolean `isIndeterminate` porque es mas claro en code review y en Figma como toggle visual. Es el consenso mayoritario (12/20 sistemas).

### Combinaciones excluidas

```
  indeterminate + success/error     no tiene valor, no puede completar/fallar
  indeterminate + hasPercentage     sin valor, no hay porcentaje que mostrar
  circular + sm                     espacio insuficiente para renderizar anillo legible
```

---

## Comportamiento

### Lo esencial para disenar

1. **Progress es display-only.** No recibe foco, no tiene keyboard nav, no dispara acciones. 20/20 sistemas coinciden.

2. **El porcentaje necesita contexto.** "75%" solo no dice nada a un screen reader. El label debe decir QUE progresa: "Uploading photo.jpg — 75%".

3. **Success/error necesitan mas que color.** Color solo falla WCAG para daltonicos (8% de hombres). Carbon usa icono + color. Nosotros: cambio de color + cambio de texto del label.

4. **Indeterminado respeta reduced motion.** Las animaciones ciclicas pueden causar mareo. En `prefers-reduced-motion`, la barra muestra un patron estatico sutil.

5. **Track necesita contraste.** El track (fondo gris) debe tener al menos 3:1 contra el fondo de pagina.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Contenedor | `progressbar` | `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` | SR anuncia "barra de progreso, 75%" |
| Contenedor (indet.) | `progressbar` | omitir `aria-valuenow` | SR infiere "progreso indeterminado" de la ausencia del valor |
| Label | — | `aria-label` o `aria-labelledby` | SR anuncia QUE esta progresando |
| Helper text | — | `aria-live="polite"` | SR anuncia cambios de estado sin interrumpir |
| Region de carga | — | `aria-busy="true"` | SR sabe que la region esta actualizandose |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  N/A — Progress no es interactivo
  No recibe foco. Componente puramente presentacional.
```

Interacciones secundarias (referencia para dev):

```
  aria-live="polite"    cambios de status se anuncian automaticamente
  aria-busy="true"      en la region contenedora durante la carga
```

---

## Guia de contenido

**Label:** Describe la operacion. "Uploading photo.jpg", "Installing update" — no "Progress" ni "Loading".

**Porcentaje:** Formato numerico simple. "75%" — no "75 percent".

**Helper text:** Transiciona del porcentaje al resultado. "75%" → "Upload complete" o "Upload failed — try again". Ubicacion debajo de la barra evita conflictos de contraste con el fill (patron Carbon).

**Valor contextual:** Usar `aria-valuetext` para anuncios ricos: "3 de 10 archivos procesados" en vez de "30%" (patron Radix `getValueLabel`).

---

## Checklist antes de construir

```
  ☐ ¿Bar o circular?
    └─ Bar = uso general · Circular = dashboards, tarjetas

  ☐ ¿Determinado o indeterminado?
    └─ Determinado = duracion conocida
    └─ Indeterminado = duracion desconocida

  ☐ ¿Necesita label visible?
    └─ Si no → aria-label obligatorio como fallback

  ☐ ¿Necesita porcentaje visible?
    └─ Si si → considerar aria-valuetext contextual

  ☐ ¿Que pasa cuando termina?
    └─ Success → verde + texto "Complete"
    └─ Error → rojo + texto "Failed" + accion de retry

  ☐ ¿Timeout si falla indefinidamente?
    └─ Implementar timeout + fallback a error state
```

---

## Relacion con otros componentes

```
  Spinner        Duracion desconocida, accion puntual (no barra)
  Skeleton       Placeholder de carga que imita forma del contenido
  Meter          Medicion persistente (role="meter"), no tarea que termina
  Stepper        Progreso multi-paso con labels por paso
  Badge          Porcentaje en contextos compactos
```

---

## Referencia: como lo hacen otros sistemas

**Los que separan bar y circular:** M3 (LinearProgressIndicator / CircularProgressIndicator), Lightning (Progress Bar + Progress Ring), Chakra (Progress + CircularProgress).

**Los que unifican:** Ant Design (`type` prop: line/circle/dashboard), Mantine (Progress + RingProgress).

**Status como first-class:** Carbon (`status` desacoplado de value, icono + color para terminales), Fluent 2 (`validationState` para estados terminales).

**Consenso universal (20/20):** role="progressbar" con aria-valuenow/min/max. Indeterminado omite aria-valuenow. No interactivo. Track + fill como anatomia base.

---

## Tokens

**18 tokens** · prefijo `prg-` · 2 capas (semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--prg-track-bg` | `bg/surface/secondary` | Fondo del track |
| `--prg-fill-default` | `interactive/default` | Fill en progreso (azul) |
| `--prg-fill-success` | `status/success/default` | Fill completado (verde) |
| `--prg-fill-error` | `status/error/default` | Fill fallo (rojo) |
| `--prg-label-fg` | `text/primary` | Color del label |
| `--prg-percentage-fg` | `text/secondary` | Color del porcentaje |
| `--prg-track-radius` | `radius/full` | Radius del track (pill) |

### Specs de spacing

```
  ┌─ bar ──────────────────────────────────────────────┐
  │                                                     │
  │  [label text]                    [percentage text]   │
  │                                                     │
  │  ┌─ track ────────────────────────────────────────┐ │
  │  │ ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░ │ │
  │  └────────────────────────────────────────────────┘ │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  gap label↔track:     4px
  gap track↔helper:    4px
  track height:        sm = 4  ·  md = 8  ·  lg = 12
  track radius:        9999 (pill)
  circular diameter:   sm = 32  ·  md = 48  ·  lg = 64
```
