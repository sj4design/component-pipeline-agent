# Alert

## Overview

El Alert es una notificacion inline persistente que comunica un estado o condicion al usuario. Permanece visible hasta que la condicion se resuelve o el usuario lo cierra. Cuatro niveles de severidad controlan color, icono y comportamiento ARIA automaticamente.

```
  ┌────────────────────────────────────────────────┐
  │  [🔵]  Alert title                        [✕]  │
  │        Additional context about this alert.    │
  │        [Learn more]                            │
  └────────────────────────────────────────────────┘
       │         │            │              │
    status    title      description      close
     icon   (required)   (optional)      button
```

Tiene dos modos de display: **default** (inline con radius, embebido en el layout) y **banner** (edge-to-edge sin radius, parte superior de la pagina). El icono de status es automatico segun la severidad — nunca se comunica solo con color.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Status        info · success · warning · error     Color + icono + rol ARIA
  Estado        default · hover · disabled           Interaccion del close button
  Display       default · banner                     Inline con radius / edge-to-edge
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☑ Has Close         Boton ✕ para cerrar                          on por default
  ☑ Has Description   Texto descriptivo debajo del titulo           texto editable
  ☐ Has Action        Link de accion ("Learn more")                texto editable
```

### Panel de propiedades en Figma

```
┌─ Alert ──────────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ Status ▼ info  │ │ State ▼ def..│ │
│  └────────────────┘ └──────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ Display              ▼ default │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☑ Has Close         ☑ Has Descript. │
│  ☐ Has Action                        │
│                                      │
│  Text Properties                     │
│  ✏️ Title        [ Alert title    ]  │
│  ✏️ Description  [ Additional...  ]  │
│  ✏️ Action       [ Learn more     ]  │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿Necesitas comunicar una condicion al usuario?
  │
  ├─ Mensaje persistente, anclado al layout → usa Alert (inline) ✓
  │
  ├─ Mensaje de sistema, top de pagina → usa Alert (banner) ✓
  │
  ├─ Notificacion temporal que auto-desaparece → usa Toast
  │
  ├─ Decision que requiere respuesta del usuario → usa Dialog
  │
  └─ Feedback de campo de formulario → usa validacion inline del Input
```

**Usa Alert cuando:**
- Hay una condicion persistente que el usuario debe conocer (error de sistema, advertencia, exito de operacion)
- El mensaje tiene un anclaje especifico en la pagina o seccion
- Necesitas comunicar severidad con icono + color + texto

**NO uses Alert cuando:**
- Es una notificacion temporal ("Guardado exitosamente") → Toast auto-dismiss
- Requiere decision del usuario (confirmar/cancelar) → Dialog
- Es validacion de un campo especifico → inline validation del Input
- Son multiples mensajes simultaneos sin orden → considera un sistema de notificaciones

---

## Variaciones visuales

### Status (severidad)

```
  info                                 success
  ┌────────────────────────────────┐   ┌────────────────────────────────┐
  │ 🔵  Information message    [✕] │   │ ✅  Success message        [✕] │
  │     Additional details.        │   │     Operation completed.       │
  └────────────────────────────────┘   └────────────────────────────────┘
  fondo azul claro · borde azul        fondo verde claro · borde verde

  warning                              error
  ┌────────────────────────────────┐   ┌────────────────────────────────┐
  │ ⚠️  Warning message        [✕] │   │ ❌  Error message          [✕] │
  │     Review this condition.     │   │     Action required.           │
  └────────────────────────────────┘   └────────────────────────────────┘
  fondo ambar claro · borde ambar      fondo rojo claro · borde rojo
```

### Display

```
  default (inline)                     banner (page-level)
  ┌────────────────────────────────┐   ────────────────────────────────────
  │ 🔵  Alert title            [✕] │   🔵  System announcement         [✕]
  │     Description text.          │   ────────────────────────────────────
  └────────────────────────────────┘   radius 0, edge-to-edge, sin borde
  radius 8px, inline en el layout      posicion fija top de viewport
```

### Con y sin partes opcionales

```
  Minimo (solo titulo):               Completo:
  ┌──────────────────────────────┐    ┌──────────────────────────────────┐
  │ 🔵  Alert title          [✕] │    │ 🔵  Alert title              [✕] │
  └──────────────────────────────┘    │     Additional context.          │
                                      │     [Learn more]                 │
                                      └──────────────────────────────────┘
```

---

## Decisiones de diseno

### 1. Un componente con display mode, no dos separados

Atlassian separa en tres componentes (Banner, SectionMessage, InlineMessage) para codificar el scope del mensaje en el nombre. Ant Design usa un boolean `banner` en el mismo componente. Nosotros: un Alert con Display variant (default/banner) — el scope actual no incluye alerts inline en formularios, asi que la three-tier architecture de Atlassian seria sobrediseno.

### 2. ARIA diferenciado por severidad — el patron mas importante

Carbon y Polaris coinciden: error/warning usan `role="alert"` (assertive — interrumpe el screen reader). Info/success usan `role="status"` (polite — anuncia en cola). Esta calibracion existe porque announcements assertivos para mensajes de baja urgencia crean "fatiga de anuncios" — los usuarios aprenden a ignorarlos. Es el requisito WCAG AA mas importante del componente.

### 3. Icono + color, nunca color solo

Los 5 sistemas con alert dedicado comunican severidad con color + icono, nunca color exclusivamente. El icono es el canal primario; el color es refuerzo. 8% de hombres no distinguen rojo de verde — el icono lo hace inequivoco. El icono usa `aria-hidden="true"` porque el texto adyacente ya comunica la severidad.

### 4. Dismiss enforced para non-critical

Polaris enforza dismissibilidad para info/success/warning — precisamente porque son de baja urgencia, el usuario debe poder controlarlos. Error critico puede ser no-dismissible. Nosotros seguimos este patron: `Has Close` default true, con la guia de que errors criticos pueden omitirlo.

### 5. Una sola accion primaria maxima

Carbon y Polaris limitan a una accion. La razon: un alert es una senal, no un punto de decision. Si requiere elegir entre opciones, pertenece a un Dialog. Ant Design permite ReactNode arbitrario — flexibilidad maxima pero riesgo de banners que parecen dialogs.

### Combinaciones excluidas

```
  disabled + hover            no reacciona a interaccion
  banner + (ninguna)          banner acepta todas las combinaciones de status
```

---

## Comportamiento

### Lo esencial para disenar

1. **Error/warning interrumpen el screen reader.** Usan `role="alert"` (assertive). Info/success esperan su turno con `role="status"` (polite). Calibrar la interrupcion a la urgencia real.

2. **Icono automatico por status.** El disenador elige el Status; el icono se asigna automaticamente. No mezclar iconos de una severidad con colores de otra.

3. **Close button minimo 44x44px.** Touch target WCAG 2.5.8. El boton ✕ debe ser alcanzable por teclado y tener focus ring visible.

4. **No auto-focus al aparecer.** El alert se anuncia via live region, no moviendo el foco. Excepcion: error de formulario post-submit — ahi si, auto-focus al alert (patron Spectrum `autoFocus`).

5. **Banner no compite con la nav.** Posicion fija encima de la navegacion — la informacion de sistema debe ser visible independientemente del scroll.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Alert (error/warning) | `alert` | `aria-live="assertive"` | SR interrumpe para comunicar urgencia |
| Alert (info/success) | `status` | `aria-live="polite"` | SR anuncia en cola sin interrumpir |
| Status icon | — | `aria-hidden="true"` | Icono es decorativo — el texto comunica la severidad |
| Close button | `button` | `aria-label="Cerrar alerta"` | SR anuncia la accion del boton |
| Action link | `link` o `button` | — | SR anuncia como elemento interactivo |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  Tab                   foco llega al close button y/o action link
  Space / Enter         activa close button o action link
  Escape                cierra el alert (si es dismissible)
```

Interacciones secundarias (referencia para dev):

```
  role="alert"          error/warning se anuncian assertivamente
  role="status"         info/success se anuncian en cola (polite)
```

---

## Guia de contenido

**Titulo:** Breve y descriptivo. "Payment failed", "Account verified" — no "Error" ni "Alert".

**Descripcion:** Explica la condicion Y que hacer. "Your card was declined. Try a different payment method." — no solo "Something went wrong."

**Accion:** Verbo de accion claro. "Retry", "Learn more", "Update settings" — no "Click here".

**Longitud:** Titulo max 1 linea. Descripcion max 2 lineas. Si necesitas mas, usa un Dialog o pagina dedicada.

**Severidad correcta:** info = dato neutral. success = operacion completada. warning = atencion requerida pero no bloqueante. error = accion requerida, algo fallo.

---

## Checklist antes de construir

```
  ☐ ¿Que severidad? (info/success/warning/error)
    └─ Determina color, icono Y rol ARIA automaticamente

  ☐ ¿Inline o banner?
    └─ Inline = contextual a una seccion
    └─ Banner = condicion de sistema, top de pagina

  ☐ ¿Es dismissible?
    └─ Info/success/warning → si (enforced)
    └─ Error critico → puede ser no-dismissible

  ☐ ¿Necesita accion?
    └─ Si si → una sola accion primaria

  ☐ ¿Necesita descripcion?
    └─ Si el titulo no es suficiente para entender + resolver

  ☐ ¿Es un error de formulario post-submit?
    └─ Si si → considerar autoFocus al alert (patron Spectrum)
```

---

## Relacion con otros componentes

```
  Toast          Temporal, auto-dismiss. Para confirmaciones rapidas
  Dialog         Para decisiones que requieren respuesta del usuario
  Input          Validacion inline de campo individual
  Banner         Sinonimo — Alert en display=banner ES el banner
  Callout        Informacion contextual no-urgente (algunos sistemas)
```

---

## Referencia: como lo hacen otros sistemas

**Separacion arquitectonica:** Atlassian (Banner + SectionMessage + InlineMessage — three-tier by scope), Spectrum (InlineAlert sin dismiss — error debe resolverse).

**ARIA gold standard:** Carbon (error/warning = assertive, info/success = polite), Polaris (role="alert" vs role="status" automatico por tone).

**Un componente flexible:** Ant Design (banner boolean + action slot arbitrario), Carbon (lowContrast para control de intensidad visual).

**Consenso universal:** Color + icono nunca color solo. Jerarquia titulo + descripcion. Inline persistente separado de Toast temporal.

---

## Tokens

**28 tokens** · prefijo `alt-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--alt-bg-info` | `status/info/surface` | Fondo info |
| `--alt-bg-success` | `status/success/surface` | Fondo success |
| `--alt-bg-warning` | `status/warning/surface` | Fondo warning |
| `--alt-bg-error` | `status/error/surface` | Fondo error |
| `--alt-border-info` | `status/info/border` | Borde info |
| `--alt-border-success` | `status/success/border` | Borde success |
| `--alt-border-warning` | `status/warning/border` | Borde warning |
| `--alt-border-error` | `status/error/border` | Borde error |
| `--alt-icon-info` | `status/info/default` | Color icono info |
| `--alt-icon-success` | `status/success/default` | Color icono success |
| `--alt-icon-warning` | `status/warning/default` | Color icono warning |
| `--alt-icon-error` | `status/error/default` | Color icono error |
| `--alt-title-fg` | `text/primary` | Color del titulo |
| `--alt-desc-fg` | `text/secondary` | Color de la descripcion |

### Specs de spacing

```
  ┌─ alert ────────────────────────────────────────────┐
  │                                                     │
  │  ←16→ [icon 20px] ←12→ [content area]  ←12→ [✕] ←16→
  │       ↕ 12                                   ↕ 12  │
  │                                                     │
  │       content area:                                 │
  │       [title]                                       │
  │       ←0→                                           │
  │       [description]                                 │
  │       ←0→                                           │
  │       [action link]                                 │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  padding:           16px horizontal · 12px vertical
  gap icon↔content:  12px
  gap title↔desc:    4px
  gap desc↔action:   8px
  radius default:    8px
  radius banner:     0px
  close button:      44×44px touch target
  width default:     480px (puede crecer)
```
