# Link

## Overview

Link es el componente de navegación textual del sistema de diseño: envuelve el elemento `<a>` con tres capacidades sistémicas que el HTML nativo no garantiza por sí solo — seguridad automática en links externos (`rel="noopener noreferrer"`), enforcement semántico (URL determina `<a>`, onClick sin URL determina `<button>`), y un sistema de tones que permite links legibles en cualquier superficie de color. El principio arquitectónico central es la doctrina Button vs. Link: Link es para navegar, Button es para actuar. Cualquier elemento que ejecute una acción sin URL de destino debe ser un Button, no un Link.

```
Variant inline (en body copy):

"Para más información sobre las políticas de privacidad,
 consulta nuestra ──────────────────────────── o contáctanos."
                   política de privacidad
                         ↑ underline siempre visible; WCAG 1.4.1

Variant standalone (navegación independiente):

→  Ir a documentación
↗  Abrir en nueva pestaña     ← "(opens in a new tab)" visually-hidden para SR
←  Volver a inicio

Con icon leading:
[▶]  Ver tutorial completo

Estados:
default:   azul   (#2659EB)  — underline
hover:     azul   (#1E4DD2)  — underline
visited:   púrpura(#7338BF)  — underline  (orientación de historial)
focused:   azul   + ring 2px
disabled:  gris   (#B8B8C0)  — sin underline
```

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Variant: inline | standalone
State:   default | hover | visited | focused | disabled
Size:    sm | md | lg
Tone:    default | subdued | monochrome | critical
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Icon            → muestra/oculta slot icon (leading)
External (Launch)   → muestra/oculta externalIcon (trailing Launch icon)
Remove Underline    → activa/desactiva layer de underline
```

### Figma properties panel

```
┌─────────────────────────────────────────────┐
│  Link                                       │
├─────────────────────────────────────────────┤
│  Variant  [inline ▾]   [standalone]        │
│  State    [default ▾]                      │
│           default / hover / visited /       │
│           focused / disabled               │
│  Size     [sm] [md] [lg]                   │
│  Tone     [default ▾]                      │
│           default / subdued /               │
│           monochrome / critical             │
├─────────────────────────────────────────────┤
│  👁 Has Icon              ○ off            │
│  👁 External (Launch)     ○ off            │
│  👁 Remove Underline      ○ off            │
├─────────────────────────────────────────────┤
│  🔄 Icon         [icon/placeholder ▾]     │
│  🔄 External Icon [icon/launch ▾]         │
│  ✏️ Label         [Link text]              │
└─────────────────────────────────────────────┘

Frames generados: 104 netos
(Variant(2) × State(5) × Size(3) × Tone(4) = 120 − 16 exclusiones)
```

---

## When to use (and when not to)

```
¿Qué acción quiero que realice el usuario?
        │
        ├── Navegar a una URL (interna o externa)
        │        └── Link con url/href
        │            Variant inline: si está dentro de párrafo
        │            Variant standalone: si es acción de navegación independiente
        │
        ├── Ejecutar una acción (guardar, eliminar, enviar)
        │        └── NO es Link → usar Button
        │            "Eliminar archivo" → Button destructive
        │
        └── ¿Link va sobre superficie de color (banner, toast, dark header)?
                 └── Link con Tone=monochrome (hereda color del texto)
```

**Usar Link cuando:**
- El destino es una URL — interna (`/products`) o externa (`https://...`)
- Navega dentro de body copy a un recurso relacionado — Variant=inline con underline siempre visible
- Es una acción de navegación standalone fuera de párrafo — Variant=standalone, puede usar `Remove Underline`
- Enlaza a recursos externos donde el usuario debe ser avisado del cambio de contexto — `External (Launch)` + SR disclosure automático
- Aparece en superficies de color (alertas, banners, toasts) — Tone=monochrome para herencia de color

**No usar Link cuando:**
- La acción no produce navegación (submit, delete, toggle, modal open) — usar Button
- Se necesita solo apariencia de link con onClick — usar Button con `variant=link` si el DS lo tiene; NUNCA `<a href="#">` o `<a>` sin href
- El link-text describe el destino insuficientemente ("Click aquí", "Leer más") — WCAG 2.4.6 exige texto descriptivo en aislamiento
- Se quiere disabled state para impedir que el usuario navegue — considerar si la solución correcta es ocultar el link o redirigir a una página de explicación

---

## Visual variations

### Por Variant

**inline** (body copy): Underline siempre visible. Sin padding adicional. Se integra en el flujo de texto sin interrumpir el ritmo. El underline no es opcional — es el indicador principal de que el texto es interactivo en WCAG 1.4.1. `visited` state NO se muestra en inline (exclusión del config): los links inline en body copy raramente necesitan diferenciación de visitados.

**standalone** (navegación independiente): Puede usar `Remove Underline` para navegación de tipo menu. Soporta icon leading/trailing. El `Launch` icon indica apertura en nueva pestaña. Touch target más amplio que el texto gracias al padding del contenedor padre.

### Por State

| State | Color fg | Underline | Ring |
|-------|----------|-----------|------|
| default | interactive/default (#2659EB) | sí | no |
| hover | interactive/hover (#1E4DD2) | sí | no |
| visited | interactive/visited (#7338BF) | sí | no |
| focused | interactive/default (#2659EB) | sí | ring 2px |
| disabled | text/disabled (#B8B8C0) | no | no |

### Por Size

| Size | fontSize | lineHeight | iconSize | gap |
|------|----------|-----------|----------|-----|
| sm | 13px | 18px | 14px | 4px |
| md | 14px | 20px | 16px | 4px |
| lg | 16px | 24px | 18px | 6px |

### Por Tone

| Tone | Color fg | Cuándo usar |
|------|----------|-------------|
| default | interactive/default (azul) | Links de navegación estándar |
| subdued | text/secondary (gris) | Links de menor jerarquía, metadata |
| monochrome | currentColor (hereda padre) | Links sobre superficies de color |
| critical | status/error/fg (rojo) | Links destructivos (confirmar eliminación) |

---

## Design decisions

### 1. Variant inline vs standalone (patrón Carbon/Spectrum)

**Por qué:** Carbon es el sistema más explícito en la distinción: links inline (en body copy) tienen underline permanente y hover que afecta solo el texto; links standalone (en navegación) pueden llevar ícono `Launch` para externos y tiene tratamiento visual diferente. Las dos variantes no son intercambiables — un link de navegación sin underline en body copy viola WCAG 1.4.1; un link de body copy con padding de standalone rompe el ritmo tipográfico del párrafo.

**Tradeoff:** Dos variantes significa que el diseñador debe elegir conscientemente el contexto de uso. El riesgo es usar `standalone` dentro de párrafos por preferencia estética al underline — la guía de contenido debe prevenir esto con ejemplos.

### 2. Visited state incluido (vs. omisión de Atlassian)

**Por qué:** Atlassian omitió visited state basándose en investigación de usuario de que agrega ruido en Jira (UI densa). Sin embargo, GOV.UK y Nord documentan que el visited state ayuda a usuarios con dificultades de memoria a orientarse — saben qué páginas ya han visitado en un flujo de múltiples pasos. El color visitado púrpura (#7338BF) es el estándar cross-browser de `:visited` que los usuarios aprenden a asociar con historial. Para interfaces de navegación de documentos o flujos de onboarding, visited es crítico.

**Tradeoff:** En UIs muy densas (dashboards, tablas de datos) donde los links son metadata, visited puede agregar ruido visual. En esos casos usar `Tone=monochrome` que no tiene visited state diferenciado (exclusión del config).

### 3. 4 Tones (default/subdued/monochrome/critical)

**Por qué:** Monochrome (patrón Polaris) es crítico para links sobre fondos de color — banners, toasts, alerts donde el azul estándar puede tener contraste insuficiente sobre el fondo de color. Critical para links destructivos como "confirmar eliminación" donde la semántica de peligro debe ser visible también en el link. Subdued para metadatos y links de menor jerarquía. Default para navegación estándar.

**Tradeoff:** Más tones = más combinaciones a especificar en el handoff. Los tones están ligados a tokens semánticos (no valores RGB arbitrarios), lo que minimiza el riesgo de variaciones no aprobadas.

### 4. External automático: target + rel + Launch icon + SR text

**Por qué:** Spectrum, Polaris y Carbon aplican automáticamente seguridad en links externos. El vector de ataque "reverse tabnapping" — donde `window.opener` permite a la página destino manipular la página origen — afecta a todo `target="_blank"` sin `rel="noopener noreferrer"`. Los tres sistemas Tier 1 que lo aplican automáticamente lo hacen porque los desarrolladores olvidan agregar el atributo consistentemente cuando es opcional. "(opens in a new tab)" como texto visually-hidden para SR es más robusto que `aria-label` en el ícono — provee el disclosure completo en el contexto del link.

**Tradeoff:** El comportamiento automático es "mágico" para consumidores que no entienden por qué el componente agrega atributos. Documentar explícitamente en `componentDescription` el comportamiento automático y cuándo activarlo.

### 5. url vs onClick determina `<a>` vs `<button>` (patrón Polaris)

**Por qué:** Polaris es el único Tier 1 con este enforcement semántico automático: proveer `url` renderiza `<a href>`; proveer `onClick` sin `url` renderiza `<button>`. Hace imposible crear el anti-patrón de `<a href="#">` con onClick (que no está en el tab order por defecto y no activa con Enter nativo). Es la decisión de API más impactante para accesibilidad de un Link component.

**Tradeoff:** Mayor restricción en el API — los consumidores no pueden usar Link para acciones. Esto es una feature, no un bug, pero requiere educación en la guía del DS.

### Excluded combinations

```
Variant=inline + State=visited
  → Razón: links inline en body copy raramente necesitan
    diferenciación de visitados; el visited state en párrafos
    crea inconsistencia visual en texto running.

Tone=monochrome + State=visited
  → Razón: monochrome hereda el color del padre (currentColor);
    no hay un "visited purple" definible en currentColor —
    sería el mismo color que el padre con visited CSS, lo que
    crea comportamiento inconsistente según el fondo.
```

---

## Behavior

### Essential for design

- **Doctrina Link vs Button**: Link navega. Button actúa. Si el elemento no tiene destino URL, es Button, nunca Link.
- **Underline en inline SIEMPRE**: En body copy, el underline no es estético — es el único diferenciador visual entre texto normal e interactivo que cumple WCAG 1.4.1 cuando el contraste de color no es suficiente como único indicador.
- **External disclosure**: El ícono Launch es la señal visual; el texto visually-hidden es la señal accesible. Ambos son necesarios — uno para usuarios visuales, otro para usuarios de SR.
- **Disabled sin navegación**: `disabled` remueve el `href` del `<a>` (no agrega el atributo HTML `disabled` que no existe en `<a>`) y agrega `aria-disabled="true"`. El link sigue en el DOM pero no produce navegación. El diseñador debe evaluar si disabled es la solución correcta o si el link debe desaparecer.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Link navegacional (con URL) | `link` (implícito en `<a href>`) | `href="[url]"` | Semantica nativa correcta; SR anuncia "link" al navegar con Tab |
| Link-como-botón (onClick sin URL) | `button` | renderizado como `<button>`, no `<a>` | SR anuncia "button"; activa con Enter Y Space |
| Link external | `link` | `target="_blank"` + `rel="noopener noreferrer"` auto | Seguridad + disclosure de cambio de contexto |
| Link external (SR disclosure) | — | texto visually-hidden "(opens in a new tab)" | SR users saben antes de activar que abre en nueva pestaña |
| Link disabled | `link` | `aria-disabled="true"` + sin `href` | SR anuncia estado; sigue accesible por Tab para que el usuario sepa que existe pero está inactivo |
| Link de navegación activo | `link` | `aria-current="page"` | SR anuncia el link activo en la navegación |

### Keyboard navigation

Primary interactions (affect design):

```
Tab    → Navega hacia el link (y desde el link al siguiente focusable)
Shift+Tab → Navega hacia atrás
Enter  → Activa el link (navega a href)

IMPORTANTE: Space NO activa links (diferencia con Button)
  → Un link que responde a Space en lugar de Enter
    está usando el keyboard handler incorrecto
```

Secondary interactions (dev reference):

```
Link dentro de NavigationMenu o NavList:
  Arrow keys → navegar entre ítems de navegación
  (solo cuando el padre gestiona el foco con roving tabindex)

Link icon-only:
  Requiere aria-label obligatorio en el <a>
  → Error crítico si se omite: SR lee "link" sin descripción
```

---

## Content guide

### label (slot requerido)
- **Tipo**: Text, Figma binding `text`, default "Link text"
- **Contenido**: Descriptivo en aislamiento — el usuario de SR navega de link en link con Tab; el texto debe describir el destino sin contexto adicional del párrafo
- **Correcto**: "Ver política de privacidad", "Documentación de API de pagos", "Volver al inicio"
- **Incorrecto**: "Click aquí", "Leer más", "Aquí" — anti-patrones WCAG 2.4.6
- **Longitud**: Idealmente 2–5 palabras descriptivas. Links más largos en body copy deben ser la frase natural del texto, no forzados.

### icon (slot opcional)
- **Tipo**: Icon, Figma binding `instance-swap`; toggle `👁 Has Icon`
- **Posición**: Leading (antes del label) por defecto
- **Cuándo**: Para reforzar el tipo de acción — `arrow-right` para avanzar, `download` para descarga, `external/launch` para nueva pestaña
- **Accesibilidad**: El ícono es decorativo; el label es el nombre accesible. El ícono no puede ser el único portador de significado.

### externalIcon (slot condicional)
- **Tipo**: Icon fijo `icon/launch` (Launch); toggle `👁 External (Launch icon)`
- **Cuándo**: Activar cuando el link abre en nueva pestaña (`target="_blank"`)
- **Posición**: Trailing (después del label) — convención universal en Carbon, Polaris, Spectrum
- **Tamaño**: Mismo tamaño que el texto del link (iconSize coincide con fontSize del size seleccionado)
- **SR text**: El componente agrega texto visually-hidden "(opens in a new tab)" automáticamente junto al ícono

---

## Pre-build checklist

```
[ ] 104 frames netos generados (no 120)
[ ] Exclusiones aplicadas: inline+visited y monochrome+visited = 0 frames
[ ] State=focused tiene ring 2px visible en todos los Sizes y Tones
[ ] State=disabled: sin underline, sin href, fg=text/disabled
[ ] Tone=monochrome aplica currentColor en todos los states excepto disabled
[ ] External icon slot: icon/launch, trailing, toggle off por default
[ ] Remove Underline toggle: oculta layer underline sin cambiar frame
[ ] Visited state (púrpura #7338BF) presente en standalone/default+subdued
[ ] External icon paired con visually-hidden SR text en handoff
[ ] Tokens vinculados: lnk/default/fg → interactive/default, etc.
[ ] WCAG 2.4.6: guía de contenido documenta anti-patrones "click aquí"
[ ] Doctrina Button vs Link: documentada en componentDescription
[ ] rel="noopener noreferrer" especificado en handoff para external
```

---

## Related components

```
Button         → para acciones sin URL de destino (submit, delete, toggle)
NavLink        → especialización de Link para navegación activa con aria-current
                 (composición: Link + Tone=default + aria-current management)
Breadcrumb     → usa múltiples Links inline con separadores
MenuItem       → composición de Link o Button en contextos de menú
                 (ActionList type=action usa Button; NavList usa Link)
Typography     → Link inline siempre aparece dentro de contexto de Typography
                 (hereda el font-size/line-height del texto circundante)
```

---

## Reference: how other systems do it

**Spectrum (Adobe) — RouterProvider + seguridad automática:** El sistema más sofisticado para integración con routers. `RouterProvider` configurado una vez en el root hace que todos los Links de Spectrum usen automáticamente ese router — sin boilerplate por link. Auto-agrega `rel="noreferrer noopener"` en `target="_blank"`. `isQuiet` remueve el underline para navigation-style links. La separación standalone vs inline existe explícitamente con tratamientos visuales diferenciados para cada contexto.

**Carbon (IBM) — inline/standalone + Launch icon estándar:** Carbon tiene la distinción inline/standalone más explícita y documentada. El prop `inline: boolean` determina tratamiento visual y de hover. El ícono `Launch` para links externos es una convención documentada pero no enforcement automático — los equipos lo deben aplicar manualmente. `$link-visited` como token del DS para consistencia en el visited state.

**Polaris (Shopify) — Enforcement semántico url vs onClick:** La decisión de API más impactante en el ecosistema: `url` renderiza `<a href>`, `onClick` sin `url` renderiza `<button>`. Hace imposible el anti-patrón de link-sin-href. Detección automática de URLs externas: aplica `target="_blank"` + `rel` + Launch icon automáticamente. `monochrome` para links en surfaces de color. Texto visually-hidden "(opens in a new tab)" — la implementación de disclosure más completa en Tier 1.

**Atlassian — Arquitectura Anchor + Link + doctrina explícita:** Publica la doctrina "Button vs. Link" más explícita: Link para navegación, Button para acciones. Arquitectura de dos capas: `Anchor` (primitive sin estilo) + `Link` (estilizado). Omisión deliberada de visited state basada en investigación de usuario en Jira (UI densa). `aria-current="page"` documentado explícitamente para navegación activa.

**Ant Design — Typography.Link con ellipsis:** Link dentro de la familia Typography — hereda `ellipsis` (truncación con tooltip) y `copyable`. Valioso para URLs largas en tablas. `disabled` implementado via CSS + click suppression (HTML `<a>` no tiene disabled nativo). **Gap de seguridad**: `target="_blank"` NO agrega `rel` automáticamente — los consumidores deben agregarlo manualmente. Lección: no replicar este gap.

**Twilio Paste — Anchor con naming semántico:** Nombra el componente "Anchor" para alineación con el elemento HTML `<a>`, evitando naming collision con React Router `<Link>`. External link indicator automático con texto visually-hidden "(opens in new tab)" y `rel="noopener noreferrer"` para todos los `target="_blank"`. Una de las implementaciones más completas de external link safety en Tier 2.

**GitHub Primer — `as` prop para router integration:** `as` prop para rendering como router Link (React Router, Next.js). Variante `muted`/`secondary` para links de menor énfasis. La implementación más pragmática de router integration via polymorphism.

**Gestalt (Pinterest) — `externalLinkIcon` con aria-label:** `externalLinkIcon` prop con aria-label automático ("opens in a new tab") — disclosure más explícito en Tier 3. `display` prop (inline/inlineBlock/block) para patrones de card-title link donde la imagen + texto actúan como link.

**Orbit (Kiwi.com) — TextLink con `type` para dark backgrounds:** `type: "primary"|"secondary"|"white"` para legibilidad en dark backgrounds — el tone system más explícito para surfaces de color en Tier 3. `external: boolean` agrega `target="_blank"` con visually-hidden "(opens in new tab)". `standAlone` para layout de block-level link.

**GOV.UK — Underline obligatorio + visited preservado:** Sin componente JS — `<a>` nativo con CSS classes. Underline obligatorio en body copy (WCAG 1.4.1). Visited state `:visited` preservado — investigación documentada de que ayuda a usuarios con dificultades de memoria a orientarse en transacciones de gobierno. "(opens in new tab)" visible en el texto (no solo visually-hidden).

---

## Tokens

**16 tokens** · prefix `lnk-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `lnk-default-fg` | `interactive/default` | State=default color |
| `lnk-hover-fg` | `interactive/hover` | State=hover color |
| `lnk-visited-fg` | `interactive/visited` | State=visited color |
| `lnk-focused-ring` | `focus/ring` | Focus ring color |
| `lnk-disabled-fg` | `text/disabled` | State=disabled color |
| `lnk-subdued-fg` | `text/secondary` | Tone=subdued |
| `lnk-monochrome-fg` | `text/currentColor` | Tone=monochrome |
| `lnk-critical-fg` | `status/error/fg` | Tone=critical |
| `lnk-sm-fontSize` | `type/sm` (12px) | Size=sm font |
| `lnk-md-fontSize` | `type/md` (14px) | Size=md font |
| `lnk-lg-fontSize` | `type/lg` (16px) | Size=lg font |
| `lnk-iconSize-sm` | `iconSize/sm` (16px) | Icon size en Size=sm |
| `lnk-iconSize-md` | `iconSize/md` (16px) | Icon size en Size=md |
| `lnk-iconSize-lg` | `iconSize/md` (16px) | Icon size en Size=lg |
| `lnk-gap-sm` | `spacing/1` (2px) | Gap icon-label sm |
| `lnk-gap-md` | `spacing/1` (2px) | Gap icon-label md |

### Spacing specs

```
Tamaños (fontSize / lineHeight / iconSize / gap):
  sm: 13px / 18px / 14px / 4px
  md: 14px / 20px / 16px / 4px   ← default
  lg: 16px / 24px / 18px / 6px

Focus ring:
  ring: 2px solid lnk-focused-ring (#3F63F2)
  ring-offset: 2px
  border-radius: 2px  (coincide con corners del texto)

Underline:
  offset: 2px debajo del baseline
  thickness: 1px
  color: igual al fg del state actual

External icon (Launch):
  margin-left: 4px (gap/sm) del label
  size: coincide con el tamaño de font del Size seleccionado
  color: igual al fg del state actual

Disabled state:
  cursor: not-allowed
  pointer-events: none (sin href)
  opacity: no usar — usar text/disabled directamente para
           accesibilidad de contraste mínimo

Minimum touch target (standalone):
  height: mínimo 44px para Variant=standalone en mobile
  (agregar padding vertical al contenedor padre)
```
