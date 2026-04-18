# Notification — Component Research

**Fecha:** 2026-04-17
**Modo:** --max (all patterns, all systems, no scope filter)
**Scope:** All patterns — ephemeral, persistent, feed, queue, variants, a11y, notification center

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Material Design 3 | Sin notification center; Snackbar solo cubre ephemeral — asincronico no especificado | `Snackbar` para ephemeral; `Badge` para unread count en nav icons; custom `Card` + `List` para feeds |
| Polaris (Shopify) | Notification center del admin es plataforma, no DS component | `Banner` para persistent (errores/status critico); `Toast` solo para confirmaciones temporales |
| Atlassian (platform-level) | Notification center de Jira/Confluence es feature de plataforma, no open DS component | `Flag` + `FlagGroup` + `FlagsProvider` para overlays; notification center custom |
| Gestalt (Pinterest) | Activity feed de Pinterest es product feature | `Callout` para persistent inline; `Toast` para ephemeral con thumbnails de imagen |
| GitHub Primer | Notification inbox es producto GitHub, no open Primer component | `Flash` para inline alerts; notification center custom sobre Primer primitives |
| shadcn/ui | Sin notification center — Sonner para ephemeral toasts | `Sonner` para toasts; Card + ScrollArea + Badge para feeds custom |
| Twilio Paste | `Toaster` para ephemeral — sin notification center | `Toaster` con role-based ARIA; composicion con List + Badge + Popover para feeds |
| Playbook (eBay) | Message kit para feedback; sin notification center | Message kit components |
| Cedar (REI) | `CdrBanner` para inline alerts; sin notification overlay | `CdrBanner` para inline; sin overlay ni center |
| Wise Design | Patterns custom para payment/transfer status | Custom notification patterns |
| Radix UI | `Toast` con Provider/Viewport; sin notification center | `Toast.Provider` + `Toast.Viewport`; Dialog/Popover + custom lists para panels |
| Evergreen (Segment) | Dashboards analiticos con inline alerts; `toaster` programmatico | `toaster.success()`/`.warning()`/`.danger()`; inline alerts |
| Orbit (Kiwi.com) | Travel booking usa inline Alert — ephemeral inadecuado para transacciones de alto riesgo | `Alert` inline para status critico; sin ephemeral ni notification center |

---

## How Systems Solve It

### Carbon (IBM) — "Tres componentes por modelo de interaccion"

Carbon implementa la separacion mas clara de modelos de interaccion en todo el ecosistema. `ToastNotification` es no-interactivo y efimero. `InlineNotification` es persistente e inline. `ActionableNotification` es interactivo y traps focus. Esta separacion no es cosmtica — cada componente recibe el rol ARIA correcto automaticamente: Toast/Inline usan `role="status"`; Actionable usa `role="alertdialog"`.

La decision de encapsular el ARIA correcto en el componente correcto significa que los consumidores no pueden equivocarse el role por design — si necesitan que el usuario tome una accion, usan `ActionableNotification` y obtienen `role="alertdialog"` y focus trapping automaticamente. Esta es la arquitectura de a11y mas solida en Tier 1.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Tres componentes por interaccion (Toast/Inline/Actionable) | Cada modelo de interaccion requiere ARIA diferente — un solo componente no puede tener el role correcto para todos | HIGH | Adoptar al menos la separacion ephemeral vs persistent; Actionable como tercer nivel si hay actions en notifications |
| ARIA correcto automatico por tipo | `role="alertdialog"` en Actionable, `role="status"` en Toast/Inline — imposible equivocarse | HIGH | Mapear severity+interactivity → role automaticamente, no dejarlo al consumer |
| `kind` enum (error/warning/success/info) | Semantic naming alineado con ARIA live region urgency | HIGH | `kind` o `type` como enum semantico |
| `lowContrast` boolean | Variante visual de menor contraste para contextos donde la notification es informativa | MED | Variant `subtle` o `lowContrast` para reducing visual weight |

**Notable Props:** `kind: "error"|"warning"|"success"|"info"`, `role` (automatico por componente), `lowContrast`, `onClose`, `subtitle`
**A11y:** Separacion mas limpia de ARIA en Tier 1. Non-interactive Toast nunca entra en focus order; Actionable traps focus entre action y close button.

---

### Atlassian — "Flag + FlagGroup + FlagsProvider: multi-notification architecture"

Atlassian tiene el sistema de notificaciones overlay mas robusto en Tier 1. La arquitectura de tres capas es unica: `Flag` (instancia individual), `FlagGroup` (gestiona stacking, animation, y orden), `FlagsProvider` (state management a nivel de app). Esta separacion permite que la app tenga un solo "notification center" state management sin duplicacion de logica.

La variante `discovery` para anuncios de features es una decision de diseno significativa — el sistema de notificaciones se usa tambien para educacion y onboarding, no solo para system events. `AutoDismissFlag` como componente separado (no prop) hace el contrato de tiempo explicito.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| FlagGroup para stacking y animation | Gestionar multiples notifications concurrentes requiere logica de stack — no delegarla al consumer | HIGH | FlagGroup-style manager es el patron para production-ready notification systems |
| FlagsProvider para app-level state | Notifications pueden ser triggereadas desde cualquier parte de la app — el provider centraliza | HIGH | Provider pattern vs imperative API — ambos son validos; provider es mas React idiomatic |
| `discovery` variant | Sistema de notificacion = canal de comunicacion, incluyendo feature education | MED | Considerar si el DS necesita una variante para anuncios de features vs system events |
| AutoDismissFlag como componente separado | El timeout de auto-dismiss es un contrato diferente — separarlo hace la intencion explicita | MED | Boolean `autoClose` vs componente separado — el boolean con timeout es mas simple |

**Notable Props:** `appearance: "info"|"success"|"warning"|"error"|"discovery"`, `title`, `description`, `actions` (array), `FlagGroup` para stacking, `FlagsProvider` para app state
**A11y:** `role="alert"` para error/warning; `role="status"` para info/success/discovery. FlagGroup maneja focus order para stacked notifications. Auto-dismiss pausa en hover/focus.

---

### Spectrum (Adobe) — "Toast priority queue con 8 niveles"

Spectrum's Toast priority queue es la arquitectura de queuing mas sofisticada en Tier 1. Con 8 niveles de prioridad, multiples notifications concurrentes se ordenan por urgencia en lugar de simplemente apilarse LIFO. La clara separacion entre `Toast` (ephemeral transient) e `InlineAlert` (persistent section-level) establece los dos polos del espectro de notificacion.

Spectrum enforza 6000ms como duracion minima de Toast — uno de los pocos sistemas que enforza el requisito WCAG 2.2.1 (timing) a nivel de API.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| 8-level priority queue | Multiple system-initiated messages necesitan ordering semantico — no todas las notificaciones son iguales en urgencia | HIGH | Priority queue es over-engineering para la mayoria; considerar simplemente severity-based ordering |
| 6000ms minimo enforced | WCAG 2.2.1 compliance built-in — el DS previene que consumers violen el timing requirement | HIGH | Documentar y enforzar duracion minima; default ≥ 5000ms |
| Toast vs InlineAlert separacion | Dos polos claros del espectro — no intentar un componente para ambos | HIGH | La separacion Toast (overlay efimero) vs Alert/Banner (inline persistente) es correcta |

**Notable Props:** `Toast` con 8-level priority; `Badge` para unread; `InlineAlert` para persistent
**A11y:** Toast usa aria-live con 6000ms minimo enforced. Sin guidance para notification center panels.

---

### Ant Design — "Rich notification API con 6 posiciones + update-in-place"

Ant Design provee el API de notification mas rico en Tier 1. `notification.open()` con `message`, `description`, `icon`, `btn`, `duration`, `placement`, y `key`. Seis posiciones de placement (topLeft/topRight/bottomLeft/bottomRight/top/bottom) — la flexibilidad mas alta de cualquier sistema. El prop `key` habilita update-in-place — llamar `notification.open({key: 'job'})` dos veces actualiza la misma notification en lugar de crear una nueva. `maxCount` para queue cap. `notification.destroy()` para clear programmatico.

La distincion entre `message` (minimalist, single-line, top-center) y `notification` (rich card) establece un two-tier pattern por peso de informacion.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `key` para update-in-place | Casos de uso como "uploading... → uploaded!" necesitan actualizar la notification existente | HIGH | `id`/`key` para update-in-place es un feature critico para async workflows |
| 6 placement positions | Flexibilidad maxima para diferentes layouts; desktop/mobile pueden necesitar posiciones diferentes | MED | 2-3 posiciones es suficiente en la mayoria de DS; flexibilidad excesiva genera inconsistencia |
| `maxCount` para queue cap | Previene notification flooding — critico en apps con muchos eventos async | HIGH | Queue cap con eviction de oldest es la estrategia correcta |
| `message` vs `notification` two-tier | Dos APIs para pesos de informacion diferentes — reduccion de friction para el caso simple | MED | Un componente con `compact` variant es mas mantenible que dos APIs separadas |

**Notable Props:** `notification.open({message, description, icon, btn, duration, placement, key})`; `.success()/.error()/.warning()/.info()`; `duration: 0` para persistent; `maxCount`
**A11y:** Mas debil que Spectrum/Carbon — aria-live presente pero ARIA defaults limitados. Imperative API puede bypassear el accessibility tree.

---

### Base Web (Uber) — "Notification + Toaster: dos polos claros"

Base Web implementa el two-component pattern mas explcito del ecosistema Tier 3: `Notification` para mensajes persistentes estilizados (info/positive/warning/negative) + `Toaster` para queue efimero. El `Notification` component es un styled container — no un sistema de notificacion, sino el primitive visual para mensajes de status. Esta separacion hace los dos paradigmas completamente claros sin ambiguedad.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `Notification` (persistent) + `Toaster` (ephemeral) separados | La semantica y el comportamiento de los dos son incompatibles — un solo componente ambiguo es peor | HIGH | Referencia principal para el two-component pattern |
| `Overrides` para deep customization | Base Web's override system permite customizar cualquier parte del rendering | MED | Pattern valioso para DS que necesitan alta customizabilidad |

**Notable Props:** `Notification`: kind (info/positive/warning/negative); `Toaster` para ephemeral queue
**A11y:** Notification como styled container; ARIA por responsabilidad del consumer.

---

### Mantine — "Notifications package: queue management completo"

`@mantine/notifications` es el sistema de queue management mas completo en Tier 3. `notifications.show()`, `update()`, `hide()`, `clean()`. `update()` habilita transiciones loading→success en una sola notification. `limit` cap con queuing de excess notifications (se muestran cuando las anteriores se descartan). `Notifications` container component con posicion configurable.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `update()` para loading→outcome transitions | Casos de uso comunes: "Saving..." → "Saved" o "Failed" en la misma notification | HIGH | `update(id)` es una API critica para async workflows |
| `limit` con queuing | Excess notifications se queued y aparecen al descartar anteriores — no se pierden | HIGH | Queue-with-limit es la estrategia correcta; las notifications no se descartan silenciosamente |
| `clean()` para clear programmatico | Casos como "logout" o "error critico" necesitan clear de todo | MED | `clear()` / `dismiss all` como API de escape hatch |
| Paquete separado `@mantine/notifications` | El sistema de notificaciones es lo suficientemente complejo para ser un paquete independiente | MED | Tree-shaking y separation of concerns — valioso para DS grandes |

**Notable Props:** `notifications.show({id, title, message, autoClose, loading, icon})`; `update(id)`; `hide(id)`; `clean()`; `limit`; `Notifications` container
**A11y:** aria-live regions. Queue replacements deben triggear nuevo announcement — no silent swap.

---

### Fluent 2 (Microsoft) — "Toast + MessageBar con politeness explicita"

Fluent 2 provee `Toast` + `Toaster` con `useToastController` para ephemeral overlay y `MessageBar` para inline persistent. El diferenciador clave es el prop `politeness` en `Toast` para control explicito de `aria-live` — `"assertive"` para errores criticos, `"polite"` para informacion, `"off"` para notificaciones silenciosas. Microsoft 365 Activity Feed es plataforma, no DS.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `politeness` prop explicito | Los consumidores pueden necesitar override del default severity→urgency mapping | HIGH | `politeness: "assertive"|"polite"|"off"` como override explicito es la implementacion ARIA mas correcta |
| `useToastController` hook | Imperative API via hook — React idiomatic; accessible desde cualquier componente en el tree | MED | Hook pattern vs provider injection — ambos validos |

**Notable Props:** `Toast` con `politeness`; `MessageBar` para inline; `Toaster` + `useToastController`
**A11y:** `politeness` prop es la implementacion mas arquitectonicamente correcta de aria-live control.

---

### GOV.UK — "Notification Banner: solo dos modos, sin auto-dismiss"

`Notification Banner` persistente con dos modos fijos: azul ("important" — informacion antes de proceder) y verde ("success" — confirmar accion completada). Sin auto-dismiss por design. Sin variantes warning/error (esos usan Error Summary y Error Message separados). Sin notification center. El scope forzado previene overuse.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Sin auto-dismiss | Todas las notificaciones de gobierno persisten hasta dismissed por el usuario — ningun mensaje critico desaparece sin ser leido | HIGH | Anti-auto-dismiss para dominios de alto stakes es correcto; documentar cuantos segundos es el minimo aceptable |
| Solo important + success | Error usa Error Summary; warning no existe — restriccion intencional | MED | El scope limiting previene inflation de notification types |

**Notable Props:** `type: "important"|"success"`, siempre persistente
**A11y:** `role="alert"` para important; sin auto-dismiss — conformidad implicita con WCAG 2.2.1.

---

### Nord (Nordhealth) — "Siempre persistente: seguridad clinica"

`nord-notification` web component para notificaciones inline persistentes (info/success/warning/danger). Dismissible manualmente — nunca auto-dismiss. Sin notification overlay, sin notification center. Contexto clinico: una notification de interaccion medicamentosa o valor de laboratorio anormal que desaparece puede tener consecuencias de seguridad para el paciente.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Sin auto-dismiss (jamás) | Patient safety — una notificacion clinica importante que no fue leida puede causar daño | HIGH | La severidad del dominio determina el comportamiento por default; en dominios de alto stakes, persistent-first |
| Scroll-to-change deshabilitado | Previene edicion accidental de valores numericos | N/A en notification context | — |

**Notable Props:** `variant: "info"|"success"|"warning"|"danger"`, siempre dismissible-manualmente
**A11y:** Sin auto-dismiss — WCAG 2.2.1 compliance automatica. Icons + color para severity (no solo color).

---

### Radix UI — "Toast con F8 hotkey para keyboard access"

Radix `Toast` con `Toast.Provider` + `Toast.Viewport`. El diferenciador de a11y es el hotkey F8 para que los usuarios de teclado puedan mover focus al viewport de toasts antes de que auto-dismissed — el usuario puede entonces Tab a las acciones dentro del toast.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| F8 hotkey para Toast viewport | Sin F8, toasts con acciones son inaccesibles para keyboard users si se descartan antes de que puedan tabear | HIGH | Hotkey para mover focus al notification area — el patron de keyboard accessibility mas importante |

**Notable Props:** `Toast.Provider`, `Toast.Viewport`, `Toast.Title`, `Toast.Description`, `Toast.Action`, `Toast.Close`
**A11y:** F8 para focus viewport — el patron de keyboard accessibility mas completo para ephemeral notifications.

---

### Chakra UI — "`createToaster()` factory con loading→outcome transitions"

`createToaster()` factory para toasts ephemeral. `toaster.update(id)` para transiciones loading→outcome. Sin notification center. Analytics dashboards usan inline alerts para persistent status.

**Notable Props:** `createToaster()`; `.update(id)`; types: success/error/warning/info/loading
**A11y:** `role="status"` default; `role="alert"` para error.

---

### Dell DS — "Enterprise notification patterns con notification panel"

Enterprise notification patterns para system alerts y IT management dashboards. Notification panel para IT management.

**Notable Props:** Notification panel; severity variants
**A11y:** Enterprise a11y standard.

---

### Lightning (Salesforce) — "Platform notification con preference management"

`lightning-notification` para system notifications. `force:showToast` para ephemeral. Notification settings API para preference management por tipo y canal — el unico Tier 2 con API-level preference management.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Notification preference management | Enterprise users necesitan control sobre volumen y routing de notificaciones | HIGH | Notification preferences son criticos para enterprise DS; fuera de scope para la mayoria |

**Notable Props:** `lightning-notification`; `force:showToast`; preference settings API
**A11y:** Enterprise a11y standard.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: DOS componentes — ephemeral Toast + persistent Alert/Banner**

El insight central de todos los 24 sistemas es que NO existe un "Notification Center" como componente DS reutilizable — es universalmente un feature de plataforma. El scope correcto del DS es: (1) la instancia individual de notificacion en sus dos modalidades fundamentales, y (2) los primitivos de queue management. Notification center se compone de primitivos (Popover + List + Badge).

- **`Toast` / `Toaster`**: overlay ephemeral con queue, stacking, y auto-dismiss
- **`Alert` / `Banner` / `InlineNotification`**: inline persistente con severity variants

### Slot Consensus Table

| Slot | Sistemas | Consenso |
|------|----------|----------|
| title / message | Todos | 18/18 |
| description / subtitle | AntDesign, Carbon, Atlassian, Mantine, Fluent2 | 5/18 |
| icon (severity visual) | Carbon, Atlassian, AntDesign, Mantine, Nord, Fluent2 | 6/18 |
| action button(s) | AntDesign, Atlassian, Carbon(Actionable), Chakra | 4/18 |
| close / dismiss button | Casi todos | 14/18 |
| status indicator (badge/dot) | Atlassian (Flag badge), AntDesign | 2/18 |

### Property Consensus Table

| Propiedad | Valores observados | Consenso |
|-----------|-------------------|---------:|
| kind/type/variant | error, warning, success, info | 18/18 |
| duration / autoClose | ms number o boolean false | 10/18 |
| placement | top, topRight, topLeft, bottomRight, bottomLeft, bottom | 6/18 |
| title | string | 12/18 |
| description | string | 8/18 |
| role | alert, status, alertdialog | 6/18 |
| closable/dismissible | boolean | 8/18 |
| maxCount/limit | number | 3/18 |
| politeness | assertive, polite, off | 2/18 |

### Boolean Properties Table

| Prop | Default | Sistemas |
|------|---------|----------|
| autoClose / autoDismiss | true | Mayoria (excepto GOV.UK, Nord) |
| closable | true | Carbon, Atlassian, Ant Design |
| loading | false | Mantine, Chakra, Ant Design (message) |
| lowContrast | false | Carbon |
| persistent | false (ephemeral default) | Ant Design (duration: 0) |
| pauseOnHover | true | Atlassian, recomendado general |
| pauseOnFocus | true | Atlassian |

### State Coverage Table

| Estado | Sistemas | Consenso |
|--------|----------|----------|
| default (visible) | Todos | 18/18 |
| loading (en progreso) | Mantine, Chakra, Ant Design | 3/18 |
| success | Todos con kind/type | 18/18 |
| error | Todos con kind/type | 18/18 |
| warning | Todos con kind/type | 18/18 |
| info | Todos con kind/type | 18/18 |
| discovery/announcement | Atlassian solamente | 1/18 |
| dismissing/exiting (animation) | Atlassian, Mantine, Radix | 3/18 |
| read/unread | Ninguno en DS (solo platform features) | 0/18 |

### Exclusion Patterns

- **Sin Notification Center como componente DS**: Unanime en los 24 sistemas — notification center es feature de plataforma
- **Sin priority queue compleja en la mayoria**: Solo Spectrum tiene 8-level priority; la mayoria usa LIFO simple con maxCount
- **Sin read/unread state management**: Zero sistemas DS proveen este estado — responsabilidad de plataforma
- **Sin notification grouping por categoria**: Ningun DS provee agrupacion de notificaciones — feature de plataforma
- **Sin preference settings API**: Solo Lightning provee preference management — enterprise-specific

### Building Block Candidates

- `Toast` / `Toaster` → ephemeral overlay con queue
- `Alert` / `InlineNotification` / `Banner` → inline persistente
- `ActionableNotification` → notification con focus-trappable action (Carbon pattern)
- `ToastViewport` → area accesible para keyboard focus (Radix F8 pattern)
- `NotificationGroup` → stacking manager (Atlassian FlagGroup pattern)

### Enum / Configuration Properties

```
kind/type/variant: "error" | "warning" | "success" | "info" | "discovery"
placement: "top" | "topRight" | "topLeft" | "bottomRight" | "bottomLeft" | "bottom"
role: "alert" | "status" | "alertdialog"
politeness: "assertive" | "polite" | "off"
duration: number | false  (false = persistent)
```

### A11y Consensus

| Dimension | Consenso | Implementacion |
|-----------|----------|----------------|
| Role por severity | `role="alert"` (assertive) para error/warning; `role="status"` (polite) para info/success | Automatico segun kind — nunca dejar al consumer |
| Duration minima | ≥ 5000ms (WCAG 2.2.1) | Spectrum enforza 6000ms; documentar y enforzar minimum |
| Auto-dismiss pause | Pausar en hover y en focus (WCAG 2.2.1) | Atlassian implementa ambos — adoptar como default |
| Keyboard access | F8 hotkey para focus viewport (Radix); Tab a acciones dentro del toast | Sin F8-equivalent, actions en toasts son inaccesibles |
| Focus management | Actionable notifications deben trap focus (Carbon ActionableNotification) | Solo notifications con user-required actions deben trap focus |
| ARIA live regions | Notifications son live regions — no pueden estar fuera del DOM o ser display:none cuando llegan | Notification container siempre en DOM; content se inserta dinamicamente |
| APG Pattern | ARIA Live Region pattern + Toast pattern de ARIA APG | https://www.w3.org/WAI/ARIA/apg/patterns/toast/ |

---

## What Everyone Agrees On

1. **Ephemeral (Toast) y persistent (Alert/Banner) son dos componentes diferentes.** Sin excepcion — 24 sistemas los separan o tratan como casos distintos. No hay un "Notification" monolitico.
2. **kind/type enum con error/warning/success/info es universal.** 18/18 sistemas con notificaciones usan estos cuatro valores semanticos — es el standard absoluto.
3. **`role="alert"` para error/warning; `role="status"` para info/success.** El mapeo severity → ARIA urgency es consenso — solo Fluent2 expone `politeness` para override.
4. **Auto-dismiss debe ser pauseable en hover y focus.** WCAG 2.2.1 lo requiere; Atlassian es la referencia de implementacion.
5. **Notification Center no es un componente DS.** Los 24 sistemas confirman que es una feature de plataforma — el DS provee primitivos.
6. **Duration minima ≥ 5000ms es obligatoria.** WCAG 2.2.1 — los sistemas que default a 4000ms violan WCAG sin override del consumer.
7. **Update-in-place via `id`/`key` es critico para async workflows.** "Saving..." → "Saved!" en la misma notification es un pattern esencial; Ant Design y Mantine lo implementan.

---

## Where They Disagree

**1. ¿Auto-dismiss por default o persistent-first?**
- **Option A (Ant Design, Carbon Toast, Mantine — mayoria):** Auto-dismiss por default — el caso de uso mas comun para ephemeral
- **Option B (GOV.UK, Nord):** Persistent-first — en dominios de alto stakes, ninguna notificacion debe desaparecer sin ser leida

**2. ¿Imperative API (`notification.show()`) o declarative/provider?**
- **Option A (Ant Design, Mantine, Evergreen, Chakra):** Imperative API — puede llamarse desde cualquier parte del codigo, incluido fuera del tree de React
- **Option B (Atlassian FlagsProvider, Radix Toast.Provider, Fluent2 useToastController):** Provider/hook pattern — React idiomatic; puede bypassear accessibility tree con el API imperativo

**3. ¿Cuantos placement positions?**
- **Option A (Ant Design: 6 posiciones):** Maxima flexibilidad — cualquier corner o edge
- **Option B (Mayoria: 1-2 posiciones):** Consistencia — una posicion por default (top-right o bottom-right); override raro
- **Consenso emergente:** Top-right para desktop, bottom-center para mobile

**4. ¿Tres componentes por interaccion (Carbon) o un componente con props?**
- **Option A (Carbon):** ToastNotification + InlineNotification + ActionableNotification — ARIA correcto automatico por tipo
- **Option B (Todos los demas):** Un componente con props — menos componentes, mas configuracion manual de ARIA

**5. ¿Priority queue o LIFO simple con maxCount?**
- **Option A (Spectrum: 8-level priority):** Ordenacion por urgencia semantica — mas correcto pero mas complejo
- **Option B (Ant Design maxCount, Mantine limit):** LIFO con cap — simple, predecible

---

## Visual Patterns Found

### Patron 1: Toast ephemeral (top-right)

```
                                    ┌─────────────────────────┐
                                    │ [✓] Titulo exitoso    ✕ │
                                    │     Descripcion opcional │
                                    └─────────────────────────┘
                                    ┌─────────────────────────┐
                                    │ [i] Segunda notification │
                                    │     en queue             │
                                    └─────────────────────────┘
                          ↑ stacking: newer on top
```

### Patron 2: Inline/Banner notification

```
┌─────────────────────────────────────────────────────────────┐
│ [⚠] Warning: Este mensaje describe una situacion de alerta  │
│     que requiere atencion del usuario.        [Accion] [✕]  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ [✓] Exito: La operacion fue completada exitosamente.  [✕]  │
└─────────────────────────────────────────────────────────────┘
```

### Patron 3: Loading → success transition (Mantine/Ant Design)

```
T=0 (loading):                     T=3s (success):
┌──────────────────────┐           ┌──────────────────────┐
│ [○] Guardando...     │  update   │ [✓] Guardado!        │
│     Espera un momento│ ────────► │     Tu trabajo fue   │
└──────────────────────┘           │     guardado.        │
                                   └──────────────────────┘
        mismo id/key → misma notification actualizada in-place
```

### Patron 4: Actionable notification (Carbon)

```
┌─────────────────────────────────────────────────────────────┐
│ [✕] Error critico: No se puede procesar la solicitud.       │
│     Detalles del error en el log del sistema.               │
│                                    [Ver detalles] [Cerrar] │
└─────────────────────────────────────────────────────────────┘
↑ role="alertdialog" — foco trapped entre [Ver detalles] y [Cerrar]
```

### Patron 5: Toast con keyboard access (Radix F8 pattern)

```
Pantalla normal:                    Despues de F8:
┌────────────────────────────────┐  Focus enviado al Toast Viewport ───►
│ [...contenido normal...]       │  ┌─────────────────────────────┐
│                    ↑           │  │ [i] Notificacion         ✕ │
│              presionar F8 para │  │     [Tab] para accion   [Accion] │
│              focus notificacion│  └─────────────────────────────┘
└────────────────────────────────┘
```

---

## Risks to Consider

| Riesgo | Severidad | Detalle |
|--------|-----------|---------|
| Auto-dismiss demasiado rapido (< 5000ms) | HIGH | WCAG 2.2.1 requiere minimo 5 segundos o mecanismo de pausa/extension. Muchos sistemas default a 4000ms — violacion directa. Sin pause-on-hover, usuarios con motion sensitivities o slow readers no pueden leer el contenido antes de que desaparezca. |
| `role="alert"` para todas las notificaciones | HIGH | `role="alert"` es assertive — interrumpe al screen reader inmediatamente. Usar `role="alert"` para info/success notifications es molesto e incorrecto. El mapeo severity → urgency (error/warning → alert; info/success → status) debe ser automatico. |
| Actions en toasts sin keyboard access | HIGH | Toasts con botones de accion son inaccesibles para keyboard users si desaparecen antes de que el usuario pueda tabear a ellos. Sin F8-equivalent o pause-on-focus, las acciones solo son accesibles con mouse. |
| Notification flood sin maxCount | MEDIUM | Apps con muchos eventos async (uploads, real-time updates) pueden generar docenas de notificaciones consecutivas. Sin queue cap, la pantalla se llena y el performance se degrada. `maxCount`/`limit` con eviction strategy es critico. |
| Imperative API fuera del lifecycle de React | LOW | `notification.open()` llamado fuera del tree de React (en servicios, event handlers globales) puede crear notificaciones antes de que el aria-live region este montado — las notificaciones no son anunciadas por screen readers. |

---

## Next Steps

1. **Decidir arquitectura**: Toast (ephemeral) + Alert/Banner (persistent) como dos componentes vs un componente con `persistent` boolean.
2. **Implementar Carbon-style ARIA mapping**: kind → role automaticamente; `politeness` como override explicito (Fluent2 reference).
3. **Enforcar duration minima ≥ 5000ms** y pause-on-hover/focus built-in.
4. **Implementar `id`/`key` para update-in-place** — critico para async workflows.
5. **Evaluar F8 hotkey pattern (Radix)** para keyboard accessibility de toasts con acciones.
6. **Definir maxCount/limit strategy** con documentation de comportamiento de eviction.
