# Research: Alert

## Meta
- **Date**: 2026-03-28
- **Mode**: guided
- **Systems analyzed**: 6 (Tier 1)
- **Scope**: Error · Warning · Success · Info / Inline persistente + Toast temporal / Banner de página + Overlay flotante / Acción principal + dismiss / WCAG AA · Mobile-first

---

## How the Big Systems Solve It

### Material Design 3 — "El único Tier 1 sin componente de alert inline, y no fue un accidente"

M3 tomó la decisión deliberada de no incluir un componente de alert inline persistente en su segunda generación. El Banner de M2 —que cumplía ese rol— fue eliminado en M3, y el único componente de notificación que M3 provee es el Snackbar: un overlay temporal que auto-dismiss, equivalente directo a un Toast. La justificación implícita en el lenguaje de diseño de M3 es que sus superficies adaptativas, expresivas y fluidas no tienen espacio para contenedores de alerta estáticos que interrumpan el layout. En cambio, M3 apuesta por su sistema de color roles semánticos (`error`/`errorContainer`/`onErrorContainer`) como capa de comunicación de estado: cualquier superficie o componente puede adoptar un estado de error aplicando esos tokens, sin necesidad de un contenedor de alert dedicado.

El costo de esta decisión es significativo: M3 es el único sistema Tier 1 donde los equipos de producto deben inventar su propia convención para alerts persistentes. Eso genera inconsistencia entre productos construidos sobre M3, y ausencia total de guías de accesibilidad para live regions en alerts inline.

#### Design Decisions That Matter

**1. Banner no incluido en M3** (HIGH)
- **What**: El componente Banner de Material Design 2 fue descartado al migrar a M3. No existe equivalente oficial.
- **Why**: M3 prioriza layouts adaptativos y expresivos donde un bloque de alerta full-width interrumpiría la jerarquía visual. La apuesta es que el sistema de color roles (error, errorContainer) es suficiente para comunicar estado de forma contextual sin un contenedor prescriptivo.
- **For your case**: M3 no es referencia para tu scope. No tiene ni banner de página ni overlay con acciones. Úsalo únicamente como referencia de tokens semánticos de color (errorContainer, etc.) si tu sistema está basado en M3.

**2. Snackbar como único primitivo de notificación** (HIGH)
- **What**: El Snackbar es transiente (auto-dismiss 4–10s), anclado en la parte inferior, y acepta una acción opcional. No es persistente, no está embebido en el layout.
- **Why**: Las notificaciones temporales son el caso de uso más frecuente en apps móviles (el contexto principal de M3), donde los overlays persistentes crean una carga visual permanente en pantallas pequeñas.
- **For your case**: El Snackbar es referencia para tu overlay flotante si necesitas un toast auto-dismiss simple, pero no soporta dismiss explícito con botón × ni acciones del tipo "Reintentar" como CTA principal.

**3. Color roles como capa implícita de estado** (MEDIUM)
- **What**: M3 define `error`/`errorContainer`/`onErrorContainer` como tokens semánticos aplicables a cualquier superficie. Un Card con `errorContainer` background + icono de error es el workaround comunitario para alerts inline.
- **Why**: Flexibilidad máxima sobre prescripción — cada equipo adapta el patrón a su contexto.
- **For your case**: Útil para definir tus tokens semánticos de color (mapeados a error/warning/success/info), pero no resuelve el layout, la dismiss behavior, ni la accesibilidad de tu alert.

#### Notable API Choices
- `errorContainer` / `onErrorContainer` (tokens): Par de tokens para superficies de error. Sin componente dedicado.
- Snackbar `supportingText` + `action`: Props del Toast, no del alert inline. La acción tiene max 1 elemento.

#### Accessibility
- **Keyboard**: Snackbar tiene botón de acción focusable via Tab. No existe spec de teclado para alerts inline persistentes.
- **Screen reader**: Snackbar anuncia via `aria-live`. No hay guías para live regions en alerts persistentes.
- **ARIA**: Cero documentación oficial de roles ARIA para alerts persistentes en M3.

#### Strengths & Gaps
- **Best at**: Tokens semánticos de color para comunicar estado en cualquier superficie.
- **Missing**: Componente de alert inline persistente — el único gap de esta magnitud en todos los Tier 1.

---

### Spectrum (Adobe) — "La separación arquitectónica más explícita: InlineAlert ≠ Toast por diseño"

Spectrum construyó InlineAlert como la respuesta directa a un anti-patrón específico: usar Toasts (temporales) para comunicar errores que requieren acción del usuario. El razonamiento es concreto: los Toasts auto-dismiss pueden desaparecer antes de que un usuario de lector de pantalla o un usuario con movilidad reducida los haya procesado. Un error de formulario que se desvanece en 5 segundos viola la accesibilidad por diseño, no por implementación. InlineAlert existe precisamente para ese espacio: mensajes que deben permanecer visibles hasta que la condición subyacente se resuelva, integrados en el flujo del documento (no como overlay).

La filosofía de Spectrum es tan opinionada que llega al extremo opuesto: InlineAlert no tiene dismiss. Si algo merece estar en un InlineAlert, merece quedarse hasta que el problema se resuelva. Este absolutismo funciona bien para formularios complejos (el caso de uso primario de Adobe — Analytics, Experience Manager, Experience Platform), pero limita el uso para mensajes informativos de baja prioridad.

#### Design Decisions That Matter

**1. Sin mecanismo de dismiss** (HIGH)
- **What**: InlineAlert no tiene botón × ni ningún mecanismo de dismissal. La única forma de que desaparezca es que la condición subyacente cambie.
- **Why**: Adobe razona que permitir cerrar un error antes de resolverlo degrada la calidad del flujo (usuarios esconden problemas sin resolverlos) y genera carga de soporte. Es un trade-off de UX consciente: menos control del usuario a cambio de mayor integridad del flujo.
- **For your case**: Tu scope requiere dismiss explícito — esto descalifica el modelo de Spectrum como referencia directa para tu alert. Sin embargo, considera mantener el no-dismiss para errores críticos bloqueantes específicamente.

**2. Cinco variantes de severidad en lugar de cuatro** (MEDIUM)
- **What**: `neutral`, `info`, `positive`, `notice`, `negative`. El quinto nivel `notice` cubre "esto puede convertirse en problema" — diferenciado de `negative` ("ya es un problema").
- **Why**: Los productos B2B de Adobe necesitan distinguir entre una advertencia preventiva (notice: "tu suscripción vence en 30 días") y un error activo (negative: "tu suscripción ha expirado"). Colapsar ambos en un solo "warning" pierde esa distinción semántica que es crítica en workflows empresariales.
- **For your case**: Tu scope de 4 tipos (error/warning/success/info) cubre el 95% de los casos. La quinta variante es valiosa si necesitas distinción preventivo/activo en el futuro.

**3. autoFocus como estrategia de accesibilidad para formularios** (HIGH)
- **What**: El prop `autoFocus` mueve el foco programáticamente al InlineAlert cuando se renderiza, específicamente para el patrón de submit fallido.
- **Why**: Sin `autoFocus`, un usuario de lector de pantalla que presione "Enviar" y reciba errores no recibirá ningún anuncio automático — tendría que navegar el DOM para descubrir que algo falló. `autoFocus` lleva el foco al resumen de errores inmediatamente, garantizando que el anuncio ocurra sin intervención del usuario.
- **For your case**: Implementa este patrón en tu alert de error para formularios. Es el requisito WCAG AA más frecuentemente omitido en alerts.

#### Notable API Choices
- `variant`: `'neutral' | 'info' | 'positive' | 'notice' | 'negative'` — cinco niveles, el `notice` es único entre sistemas Tier 1.
- `autoFocus`: Focus management programático en render. Crítico para el patrón de submit fallido.
- `Heading` + `Content` (children estructurados): Enforcement de jerarquía de dos niveles a nivel de API — no puedes meter un wall of text sin estructura.

#### Accessibility
- **Keyboard**: Sin dismiss = sin botón ×, por lo que no hay ruta de teclado para cerrar. Focus management via `autoFocus` es la estrategia principal.
- **Screen reader**: Usa `role="alert"` universalmente en todas las variantes, incluyendo neutral/info — lo que sobre-dispara anuncios assertivos para contenido de baja urgencia. Es el principal gap de a11y de Spectrum.
- **ARIA**: `role="alert"` (assertive) en todos los niveles de severidad. No diferencia polite/assertive según urgencia como Carbon o Polaris.

#### Strengths & Gaps
- **Best at**: Separación arquitectónica enforced entre InlineAlert y Toast, y el `autoFocus` prop para formularios.
- **Missing**: Sin dismiss, sin acciones documentadas, y `role="alert"` assertivo en variantes de info — sobre-interrumpe lectores de pantalla para mensajes de baja prioridad.

---

### Carbon (IBM) — "El más explícito: publica criterios de decisión Toast vs. Inline en su documentación oficial"

Carbon es el único sistema Tier 1 que incluye en su documentación oficial un árbol de decisión explícito para elegir entre Toast e Inline Notification. La regla: si el mensaje corresponde a un elemento específico de la UI o a una tarea que el usuario acaba de ejecutar, usa Inline. Si es un evento del sistema sin anclaje específico en la UI, usa Toast. Esta claridad conceptual es el mayor aporte de Carbon al ecosistema de design systems: elimina la ambigüedad que lleva a equipos a usar Toasts para errores (anti-patrón universal).

Carbon además divide las notificaciones inline en dos componentes distintos: Inline Notification (solo lectura, dismiss opcional) y Actionable Notification (con un ghost button de acción). La separación no es arbitraria: una notificación con acción tiene una jerarquía visual y cognitiva diferente a una sin acción, y merecen tratamiento diferente. La acción está constrained a uno solo intencionalmente — las notificaciones son señales, no formularios de decisión.

#### Design Decisions That Matter

**1. ARIA diferenciado por severidad** (HIGH)
- **What**: Error y Warning usan `role="alert"` (assertive, interrumpe al lector de pantalla). Info y Success usan `aria-live="polite"` (queued, espera a que el usuario esté idle).
- **Why**: No todos los mensajes tienen la misma urgencia. Forzar `role="alert"` en un "Cambios guardados" interrumpe al usuario de lector de pantalla con una notificación de baja prioridad. El ARIA diferenciado calibra la interrupción al nivel real de urgencia del mensaje.
- **For your case**: Adopta exactamente esta estrategia. Para tu error y warning: `role="alert"` (assertive). Para success e info: `aria-live="polite"`. Es el requisito WCAG AA más importante de tu componente.

**2. Criterios explícitos Toast vs. Inline** (HIGH)
- **What**: Carbon publica reglas: si el mensaje tiene un anclaje específico en la UI, usa Inline. Si es un evento de sistema sin contexto UI específico, usa Toast.
- **Why**: Sin estas reglas, los equipos recurren al criterio visual ("el Toast se ve mejor aquí") en lugar del criterio semántico ("¿a qué elemento de la UI corresponde este mensaje?"). Esto lleva al anti-patrón más dañino: usar Toasts para errores que el usuario necesita ver y resolver, pero que desaparecen antes de que lo haga.
- **For your case**: Dado que tu scope es banner de página + overlay flotante, la regla de Carbon se aplica directamente: banner para mensajes con contexto de página, overlay flotante para eventos del sistema sin anclaje UI específico.

**3. lowContrast prop para control de intensidad visual** (MEDIUM)
- **What**: Un boolean que alterna entre alta y baja intensidad visual sin cambiar la severidad semántica. Misma severidad `error`, diferente peso visual.
- **Why**: En interfaces densas, un error de baja prioridad con fondo rojo intenso compite visualmente con contenido primario. El modo lowContrast permite mostrar el mismo mensaje con menor disrupción visual cuando el contexto lo justifica.
- **For your case**: Útil para tu banner de página en contextos donde el alert informativo no debe competir con el contenido principal (ej: aviso de feature en beta en una página de trabajo activo).

#### Notable API Choices
- `kind`: `'error' | 'warning' | 'success' | 'info'` — controla icono, color Y comportamiento ARIA. El prop semántico que hace más trabajo de todos.
- `lowContrast`: Boolean único entre sistemas Tier 1 para control de intensidad visual.
- `actionButtonLabel` (Actionable variant): Constrained a una sola acción — enforced por el API.
- `subtitle`: Segundo nivel de jerarquía de contenido (título + detalle).

#### Accessibility
- **Keyboard**: Botón × reachable via Tab, activado con Space/Enter. Para Actionable Notification, el botón de acción también está en el Tab order. El foco NO se mueve al notification en render — se anuncia via live region sin interrumpir el foco actual.
- **Screen reader**: Error/warning anuncian assertivamente (interrumpen lectura actual). Info/success anuncian en cola (cuando el usuario está idle). Esta es la implementación de live regions más calibrada de todos los sistemas Tier 1.
- **ARIA**: `role="alert"` para error/warning; `aria-live="polite"` para info/success. El ícono usa `aria-hidden="true"` con label provisto por texto adyacente.

#### Strengths & Gaps
- **Best at**: Criterios explícitos Toast vs. Inline, ARIA diferenciado por severidad, y el two-contrast-level system para control de intensidad visual.
- **Missing**: Sin estrategia de stacking para múltiples notificaciones simultáneas, y sin guías específicas para layouts mobile donde el límite de dos líneas puede necesitar relajarse.

---

### Polaris (Shopify) — "El gold standard para alerts con acciones: reglas de dismiss enforced y ARIA calibrado por tone"

Polaris llama a su componente de alert inline persistente "Banner" — una elección de naming que refleja su uso primario: comunicar condiciones persistentes a comerciantes en el contexto de gestión de su tienda. Lo que distingue a Polaris de otros sistemas no es la feature set sino la claridad de sus reglas de uso: qué tono para qué situación, cuándo debe haber dismiss y cuándo no, y exactamente cómo el ARIA debe cambiar según la urgencia. Polaris es el sistema más opinionado de todos sobre el uso correcto del componente.

La regla más contraintuitiva de Polaris: los banners no-críticos (info, success, warning) deben ser dismissibles. Los críticos pueden no serlo. La lógica invierte la expectativa común: precisamente porque un banner no-crítico tiene menos urgencia, los merchants deben poder controlarlo y quitarlo de su vista. Un banner crítico permanece porque la condición requiere resolución, no dismissal.

#### Design Decisions That Matter

**1. Dismissibilidad enforced para tones no-críticos** (HIGH)
- **What**: Los banners con `tone="info"`, `tone="success"`, y `tone="warning"` deben incluir `onDismiss`. Los banners `critical` pueden omitirlo intencionalmente.
- **Why**: Los banners de baja urgencia que no se pueden cerrar saturan la UI del merchant con mensajes que ya procesó pero no puede quitar. Polaris razona que dar control sobre la densidad de información es más importante que mantener la información visible para mensajes no-críticos.
- **For your case**: Adopta esta regla para tu scope: error/warning críticos pueden ser no-dismissibles. Success, info, y warnings preventivos siempre deben tener dismiss explícito.

**2. ARIA tone-diferenciado (alert vs. status)** (HIGH)
- **What**: `critical` y `warning` usan `role="alert"` (assertive). `info` y `success` usan `role="status"` (polite). El rol ARIA es consecuencia directa del tone, no configurable por el implementador.
- **Why**: La distinción semántica entre `role="alert"` y `role="status"` es exactamente la distinción entre "interrumpe lo que estás haciendo" y "te lo digo cuando puedas". Polaris aplica esta distinción automáticamente basada en el tone, eliminando el riesgo de que equipos asignen el ARIA equivocado.
- **For your case**: Implementa `role="alert"` para error y warning, `role="status"` para success e info. Polaris y Carbon coinciden en esta estrategia — es la implementación de referencia para WCAG AA.

**3. Una acción primaria máxima** (HIGH)
- **What**: El prop `action` acepta un solo objeto de acción. `secondaryAction` es para "Aprender más" o "Recordar después", no para una CTA alternativa.
- **Why**: Un banner no es un punto de decisión. Si una situación requiere elegir entre múltiples respuestas, pertenece a un modal dialog, no a un banner. Limitar la acción primaria a uno mantiene al componente enfocado en su propósito: señalizar y proveer una ruta de resolución clara.
- **For your case**: Tu scope de "acción principal + dismiss" se mapea perfectamente a este modelo: un CTA principal (Reintentar, Ver detalles, Deshacer) + botón ×.

**4. Densidad adaptativa según contexto** (MEDIUM)
- **What**: El mismo Banner reduce su peso visual en containers compactos (cards, modales, sidebars) — oculta ícono opcionalmente via `hideIcon`, reduce padding.
- **Why**: Un alert full-weight dentro de un card compacto es visualmente aplastante. Polaris diseñó el componente para adaptar su densidad al container, no solo al breakpoint de viewport.
- **For your case**: Para mobile-first, esto es clave: el mismo Banner en mobile debe adaptarse tanto al viewport pequeño como a posibles contextos embedded.

#### Notable API Choices
- `tone`: `'success' | 'info' | 'warning' | 'critical'` — controla color, ícono, y rol ARIA. Es el prop más impactante del API.
- `onDismiss`: Esperado (casi requerido) para tones no-críticos.
- `action` / `secondaryAction`: Constraint a una primaria + una secundaria enforced por shape del API.
- `stopAnnouncements`: Escape hatch para deshabilitar live region updates — útil si el banner actualiza su contenido frecuentemente.
- `hideIcon`: Para contextos de espacio comprimido donde el ícono añade ruido visual.

#### Accessibility
- **Keyboard**: Containers con `tabindex="0"` y visible focus indicator. El botón × está en el Tab order. Botones de acción son focusables estándar.
- **Screen reader**: Critical/warning → `role="alert"` (assertive, interrumpe). Info/success → `role="status"` (polite, queued). `stopAnnouncements` para banners que actualicen frecuentemente.
- **ARIA**: `role="alert"` para critical/warning; `role="status"` para info/success. `aria-describedby` vincula propósito del banner a su título.

#### Strengths & Gaps
- **Best at**: Las reglas más claras y enforced de cuándo aplicar dismiss, la estrategia ARIA tone-diferenciada, y el modelo de una acción primaria que previene que los banners se conviertan en dialogs de decisión.
- **Missing**: Sin estrategia de stacking para múltiples banners simultáneos, y la zona gris entre `tone="success"` vs. Toast puede confundir en workflows de múltiples pasos.

---

### Atlassian — "La arquitectura más sofisticada: tres componentes distintos según el scope espacial del mensaje"

Atlassian es el único sistema Tier 1 que resuelve el problema del alert con tres componentes separados en lugar de uno. No es redundancia: es una jerarquía espacial explícita donde cada componente tiene un scope de impacto específico. **Banner** es para anuncios a nivel de página (encima de la navegación, condiciones de sistema). **SectionMessage** es para feedback contextual a nivel de sección o formulario. **InlineMessage** es para feedback a nivel de elemento o campo. Cada tier tiene su propia visual treatment, su propio API, y sus propias reglas de uso.

La razón detrás de esta arquitectura es el portfolio de Atlassian: Jira, Confluence, Bitbucket y Trello tienen necesidades radicalmente distintas. Un warning de degradación de performance de Jira es un evento de sistema que afecta toda la página. Un error de configuración en una sección de settings de un proyecto es contextual a esa sección. Un issue de validación en una fila de tabla es contextual a ese elemento. Colapsar estos tres scopes en un componente fuerza a los equipos a tomar decisiones de styling en lugar de decisiones de componente, produciendo inconsistencia.

#### Design Decisions That Matter

**1. Tres-tier hierarchy como decisión de arquitectura** (HIGH)
- **What**: Banner = scope de página. SectionMessage = scope de sección. InlineMessage = scope de elemento. El scope del mensaje determina qué componente usar.
- **Why**: Cuando todos los alerts usan el mismo componente, la decisión de scope queda en manos del implementador cada vez. Codificándola en el nombre del componente, Atlassian convierte la elección de scope en una decisión de componente explícita, reduciendo ambigüedad y produciendo mayor consistencia entre equipos.
- **For your case**: Tu scope es Banner de página + Overlay flotante (Flag). Los otros dos tiers (SectionMessage, InlineMessage) están fuera de tu scope actual, pero el modelo conceptual de Atlassian vale para tu arquitectura de componentes: si en el futuro necesitas alerts inline en formularios o en elementos, ya tendrás el modelo para nombrarlos correctamente.

**2. Banner fijo en la parte superior del viewport** (HIGH)
- **What**: El Banner de Atlassian se posiciona encima de la navegación, fixed-position, para condiciones que afectan toda la experiencia de la página.
- **Why**: Un aviso de mantenimiento de sistema o una degradación de performance no es un mensaje contextual — es información que debe ser visible independientemente de dónde esté el usuario en la página. Fixed-position sobre la nav garantiza visibilidad sin competir con el contenido.
- **For your case**: Tu "banner de página" es equivalente al Banner de Atlassian. El posicionamiento fixed encima de la nav es la implementación correcta para condiciones de sistema o mensajes de alta prioridad que deben persistir al scrollear.

**3. Discovery como quinto severity level** (LOW)
- **What**: Además de success/warning/danger/information, Atlassian tiene `discovery` — para anunciar features nuevas o capacidades disponibles. Es el único sistema con este nivel.
- **Why**: Los equipos de producto necesitan comunicar "hay algo nuevo que puedes explorar" de forma distinta a "hay un error" o "hay una advertencia". Sin `discovery`, los equipos repurposean colores de error/warning para mensajes positivos promocionales, diluyendo la semántica de severidad.
- **For your case**: No está en tu scope inmediato, pero considera si tu sistema necesitará alerts de discovery/onboarding en el futuro. Reservar ese nivel ahora evita tener que reescribir el sistema de tokens semánticos más adelante.

#### Notable API Choices
- `appearance` (todos los tiers): `'success' | 'warning' | 'danger' | 'information' | 'discovery'` — cinco niveles incluyendo el discovery único de Atlassian.
- Slot de acciones en SectionMessage: Múltiples acciones permitidas (vs. constraint de uno en Carbon y Polaris).
- Flag (Toast equivalent): Componente completamente separado, sin jerarquía compartida con los tres tiers inline.

#### Accessibility
- **Keyboard**: Elementos interactivos en todos los tiers son keyboard-reachable. InlineMessage con hover-reveal requiere focus management cuidadoso para keyboard users.
- **Screen reader**: Todos los tiers usan roles semánticos apropiados. Severidad comunicada por color + ícono (nunca solo por color).
- **ARIA**: Urgencias más altas (danger/warning) usan live regions assertivas; informational y discovery usan polite.

#### Strengths & Gaps
- **Best at**: La three-tier hierarchy es el modelo de scoping de alerts más sofisticado entre todos los sistemas Tier 1, y el `discovery` level es único y valioso para casos de product growth.
- **Missing**: Mayor curva de aprendizaje (equipos deben entender las reglas de scope), y el hover-reveal de InlineMessage puede crear gaps de accesibilidad para keyboard users si no se implementa cuidadosamente.

---

### Ant Design — "El más flexible: action slot arbitrario, banner mode en un solo componente, y distinción clara con Message y Notification"

Ant Design's Alert es pragmático y feature-complete: cubre los cuatro tipos estándar, soporta jerarquía de dos niveles (message + description), es opcionalmente dismissible, acepta cualquier ReactNode como acción, y puede comportarse como banner de página via un prop boolean. La filosofía es confiar en que los equipos apliquen la configuración correcta en lugar de enforcar reglas a nivel de API. Esto maximiza la flexibilidad pero reduce las guías.

Lo más notable del ecosistema de Ant Design es que el Alert convive con dos componentes más: `Message` (Toast auto-dismiss, sin acciones) y `Notification` (alerta global persistente con acciones, para eventos de sistema). Entender esta trinidad —Alert para inline, Message para transient toast, Notification para overlay global persistente— es prerequisito para usar Ant Design correctamente. El Alert es definitivamente el componente para tu caso de uso de inline persistente; Message es el de overlay temporal.

#### Design Decisions That Matter

**1. Action slot arbitrario** (HIGH)
- **What**: El prop `action` acepta cualquier ReactNode — puedes meter uno o varios botones, links, componentes custom.
- **Why**: Ant Design optimiza para la máxima flexibilidad en productos enterprise donde los casos de uso de notificaciones son extremadamente variados y los guardrails de un prop tipado serían demasiado restrictivos.
- **For your case**: La flexibilidad es útil, pero considera adoptar la constraint de Carbon/Polaris (máximo una acción primaria) en tus guidelines de uso aunque el componente técnicamente permita más. La flexibilidad técnica sin guideline produce banners que parecen dialogs.

**2. closable como opt-in explícito** (MEDIUM)
- **What**: La dismissibilidad no es el default — debe activarse con `closable={true}`.
- **Why**: Los alerts son persistentes por naturaleza, y hacer el dismiss el default subvertiría su propósito. Los equipos deben hacer una elección activa de permitir el cierre.
- **For your case**: Esto invierte el modelo de Polaris (dismiss expected para non-critical). Considera cuál convención quieres en tu sistema: opt-in o opt-out para dismiss.

**3. banner prop para modo de display** (LOW)
- **What**: Un boolean que elimina border-radius y border y extiende el Alert edge-to-edge, para uso en la parte superior de una página como banner.
- **Why**: Un único componente que soporta inline embedded y full-width banner evita duplicar la API y el knowledge del componente para los dos casos de uso más comunes de un alert.
- **For your case**: El `banner` mode de Ant Design es el approach más simple para tu scope de "banner de página". Un componente, dos display modes. La alternativa (dos componentes separados como Atlassian) es más explícita pero requiere más estructura.

#### Notable API Choices
- `type`: `'success' | 'info' | 'warning' | 'error'` — cuatro tipos estándar.
- `message`: Contenido primario (required).
- `description`: Jerarquía secundaria opcional. Cuando está presente, el ícono escala automáticamente.
- `closable`: Opt-in para dismissibilidad. Default `false`.
- `action`: ReactNode arbitrario — máxima flexibilidad, mínimos guardrails.
- `banner`: Boolean para modo edge-to-edge. Dual-purpose del mismo componente.
- `showIcon`: Default `false` en modo simple; default `true` cuando hay `description`.

#### Accessibility
- **Keyboard**: Botón × (cuando `closable`) y action slot con comportamiento estándar de teclado.
- **Screen reader**: Severidad comunicada por color + ícono. `showIcon` default asegura que cuando hay contenido rico, siempre hay ícono para refuerzo semántico.
- **ARIA**: La documentación reconoce `role="alert"` y `aria-live`, pero es menos explícita que Carbon y Polaris sobre qué roles mapean a qué tipos. Recomendado: auditar la implementación renderizada, no confiar solo en la documentación.

#### Strengths & Gaps
- **Best at**: Action slot más flexible de todos los sistemas, `description` prop para jerarquía limpia de dos niveles, y `banner` mode que evita tener dos componentes para dos display modes.
- **Missing**: Documentación ARIA menos precisa que Carbon/Polaris — equipos con requisitos WCAG estrictos deben verificar la implementación. Y la trinidad Alert/Message/Notification requiere estudio para evitar usarlos incorrectamente.

---

## What Everyone Agrees On

_Estas son las decisiones que no están en debate. Si tu componente no las implementa, algo está mal._

### 1. Color + ícono, nunca color solo
Todos los sistemas comunican severidad a través de la combinación de color + ícono, no mediante color exclusivamente. La razón: los usuarios daltónicos (8% de los hombres) no pueden distinguir rojo de naranja de verde si el único indicador es el color. El ícono (⚠, ✓, ℹ, ×) es el canal de comunicación primario; el color es el refuerzo. Ningún sistema Tier 1 excluye el ícono en sus variantes de alert con acción o descripción.

### 2. Jerarquía de dos niveles: título + descripción
Los cinco sistemas con componente de alert dedicado (todos excepto M3) soportan dos niveles de contenido: un título corto y scannable, y un cuerpo descriptivo opcional. El título permite al usuario entender la situación en un vistazo; la descripción provee el contexto para resolverla. Esta jerarquía es uniforme: Spectrum (Heading + Content), Carbon (title + subtitle), Polaris (título + contenido), Atlassian (title + description), Ant Design (message + description). La estructura de dos niveles previene walls of text en alertas.

### 3. Inline persistente y Toast temporal son componentes arquitectónicamente separados
Todos los sistemas que implementan ambos (Carbon, Polaris, Atlassian, Ant Design) los tienen como componentes distintos, no como modos de un mismo componente. Esta separación es intencional: los dos patrones tienen modelos de renderizado diferentes (en-layout vs. overlay), lifecycles diferentes (persistente vs. auto-dismiss), y roles ARIA diferentes. Implementarlos como variantes de un componente crea ambigüedad API que lleva al anti-patrón más dañino: usar Toasts para errores que requieren acción.

### 4. ARIA live region diferenciado por urgencia
Carbon y Polaris —los dos sistemas más WCAG-explícitos— coinciden en la misma estrategia: errores y warnings usan `role="alert"` o `aria-live="assertive"` (interrupción inmediata), mientras info y success usan `aria-live="polite"` (anuncio en cola). Esta calibración existe porque los lectores de pantalla interruptivos para mensajes de baja urgencia crean "announcement fatigue" — los usuarios aprenden a ignorar los anuncios porque son demasiado frecuentes e intrusivos. El ARIA debe reflejar la urgencia real del mensaje.

### 5. Una sola acción primaria máxima en el alert
Los sistemas que documentan acciones (Carbon, Polaris) convergen en limitar la acción primaria a una. La razón: un alert es una señal, no un punto de decisión. Si una situación requiere que el usuario elija entre múltiples opciones de resolución, ese caso de uso pertenece a un modal dialog, no a un banner. Una acción mantiene el alert enfocado en su función: señalizar y proveer una ruta de resolución clara.

---

## Decisions You Need to Make

### "¿Un componente con `banner` mode o dos componentes separados para inline y page-level banner?"

| | Opción A: Un componente con prop `banner` | Opción B: Dos componentes separados |
|---|---|---|
| **Adoptado por** | Ant Design (`banner` prop) | Atlassian (Banner + SectionMessage) |
| **Cómo funciona** | El mismo `Alert` cambia su display mode a edge-to-edge con un boolean. API única, un componente a conocer. | `PageBanner` para top-of-page system-level, `Alert` para contextual inline. API separada, scope explícito en el nombre. |
| **El upside** | Menor superficie de API. Los equipos aprenden un solo componente y controlan el display con un prop. | El scope del mensaje está codificado en el componente elegido. Menos decisiones incorrectas por confusión de contexto. |
| **El downside** | El scope semántico (¿es esto un aviso de sistema o un alert contextual?) queda en manos del implementador en lugar de en la arquitectura. | Mayor costo de onboarding. Los equipos deben aprender dos componentes y sus reglas de uso. |

**Para tu caso**: Tu scope actual (banner de página + overlay flotante) justifica el approach de Ant Design — un `Alert` con `banner` mode. Tu scope no incluye alerts inline en formularios o elementos, por lo que la three-tier architecture de Atlassian sería sobrediseño en este momento. Si tu scope crece, refactoriza hacia componentes separados.

---

### "¿Dismissibilidad opt-in o enforced por tone?"

| | Opción A: Opt-in explícito | Opción B: Enforced por tone |
|---|---|---|
| **Adoptado por** | Ant Design (`closable={true}`), Carbon (dismiss button opcional) | Polaris (non-critical **must** have onDismiss) |
| **Cómo funciona** | El componente es persistente por default. El dismiss debe activarse explícitamente por el implementador. | El componente automáticamente espera dismiss para tones de baja urgencia; los críticos pueden omitirlo. |
| **El upside** | Máxima flexibilidad. El implementador decide caso por caso. | Regla clara que previene banners informativos permanentes que los usuarios nunca pueden cerrar. |
| **El downside** | Requiere disciplina del implementador. Fácil olvidar añadir `closable` en banners no-críticos, acumulando banners que los usuarios no pueden quitar. | Menos flexibilidad. Puede haber casos legítimos de non-critical permanentes (ej: una nota editorial fija). |

**Para tu caso**: Con WCAG AA y mobile-first como restricciones, adopta el modelo de Polaris: dismiss enforced para success, info, y warning. Los errores críticos bloqueantes pueden ser no-dismissibles. Esta regla simplifica la toma de decisiones de los implementadores y mejora la experiencia en mobile donde los banners permanentes consumen más espacio crítico.

---

### "¿`role="alert"` universal o ARIA diferenciado por severidad?"

| | Opción A: role="alert" universal | Opción B: ARIA diferenciado por severidad |
|---|---|---|
| **Adoptado por** | Spectrum (role="alert" en todas las variantes) | Carbon, Polaris (assertive para error/warning, polite para info/success) |
| **Cómo funciona** | Todo alert, sin importar su severidad, anuncia assertivamente e interrumpe el lector de pantalla. | Los errores interrumpen; los mensajes informativos esperan a que el usuario esté idle. |
| **El upside** | Implementación más simple. Una sola decisión ARIA para todo el componente. | Calibración correcta de urgencia. Los usuarios de lector de pantalla no se ven bombardeados por anuncios intrusivos para mensajes de baja prioridad. |
| **El downside** | Over-triggers en variantes de baja urgencia, causando announcement fatigue en usuarios de screen reader que aprenden a ignorar los anuncios. | Requiere lógica condicional en el componente: el rol ARIA cambia según el type prop. Más complejidad de implementación. |

**Para tu caso**: Con WCAG AA como restricción explícita, la Opción B es el requisito mínimo. `role="alert"` (assertive) para error y warning. `role="status"` o `aria-live="polite"` para success e info. Carbon y Polaris coinciden en esta estrategia — es el gold standard para WCAG AA en alert components.

---

### "¿Cuántos severity types? ¿4 o 5?"

| | Opción A: 4 tipos estándar | Opción B: 5 variantes |
|---|---|---|
| **Adoptado por** | Carbon, Polaris, Ant Design (error/warning/success/info) | Spectrum (negative/notice/positive/info/neutral), Atlassian (+discovery) |
| **Cómo funciona** | Error, Warning, Success, Info cubren todos los estados semánticos fundamentales. | Un quinto nivel distingue "warning preventivo" (notice) de "error activo" (negative), o añade un nivel de discovery para anuncios de features. |
| **El upside** | Vocabulario universal, inmediatamente familiar para cualquier desarrollador. Menos estados que mantener y documentar. | Semántica más fina para casos B2B complejos o workflows de product growth. |
| **El downside** | "Warning" colapsa dos semánticas distintas: advertencias activas y preventivas. | Mayor complejidad. Los equipos deben aprender cuándo usar `notice` vs `warning` y qué lo diferencia de `error`. |

**Para tu caso**: Los 4 tipos estándar son suficientes para tu scope. Si en el futuro identificas la necesidad de distinguir advertencias preventivas de activas, puedes añadir un quinto tipo entonces. Arrancar con 4 y escalar es más sostenible que empezar con 5 y tener que educar a los equipos sobre la distinción.

---

### "¿Toast separado o compartir API con el alert inline?"

| | Opción A: Componentes completamente separados | Opción B: Modos del mismo componente |
|---|---|---|
| **Adoptado por** | Carbon, Polaris, Atlassian, Ant Design, Spectrum | Ningún Tier 1 (M3 solo tiene Toast) |
| **Cómo funciona** | `Alert` o `Banner` para inline persistente; `Toast` o `Snackbar` separado para temporal overlay. APIs distintas, componentes distintos. | El mismo componente tiene un prop para elegir entre inline persistente y overlay temporal. |
| **El upside** | Imposible usar el componente equivocado. La separación arquitectónica previene el anti-patrón de Toasts para errores a nivel de API. | Menor superficie de API para los consumidores del sistema. |
| **El downside** | Los equipos deben aprender dos componentes. En sistemas pequeños, puede sentirse como over-engineering. | Sin guardrails: los equipos pueden usar el Toast mode para errores que requieren acción, el anti-patrón más dañino. |

**Para tu caso**: Implementa componentes separados. El anti-patrón de usar Toasts para errores es tan dañino para la experiencia (especialmente para usuarios de screen reader en WCAG AA) que la separación arquitectónica vale el costo. Tu scope incluye ambos explícitamente — son casos de uso distintos y deben tener APIs distintas.

---

## Visual Patterns Found

### Patrón 1: Inline Banner Persistente con Acción

El más común en todos los sistemas. Bloque embebido en el flow del documento, full-width de su container. Icono + título + descripción opcional + acción + dismiss.

```
┌─────────────────────────────────────────────────────────────────────┐
│ ⚠  Warning: Tu API key expira en 3 días                   [Renovar]  [×] │
└─────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────┐
│ ●  Error: No se pudo guardar el formulario                        [×] │
│    Verifica los campos requeridos e intenta nuevamente              │
│    [Ver errores]                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

Adoptado por: Spectrum (InlineAlert), Carbon (InlineNotification), Polaris (Banner), Atlassian (SectionMessage), Ant Design (Alert).

---

### Patrón 2: Page-Level Banner (Top of Viewport)

Full-width, fixed en la parte superior de la página, encima o debajo de la navegación. Para condiciones de sistema que afectan toda la experiencia.

```
┌─────────────────────────────────────────────────────────────────────┐
│ ● Mantenimiento programado el domingo 5 de abril, 02:00–04:00 UTC  [Detalles] │
└─────────────────────────────────────────────────────────────────────┘
█████████████████████████████ NAVEGACIÓN ████████████████████████████
─────────────────────────────────────────────────────────────────────
Contenido de la página...
```

Adoptado por: Atlassian (Banner component), Ant Design (Alert con `banner={true}`), Polaris (Banner a nivel de página).

---

### Patrón 3: Toast / Overlay Flotante

Overlay posicionado fuera del flow del documento (esquina inferior o superior), auto-dismiss con countdown opcional, sin acción compleja.

```
                               ┌─────────────────────────────────┐
                               │ ✓  Cambios guardados correctamente │
                               │                             [×]  │
                               └─────────────────────────────────┘
```

```
                               ┌─────────────────────────────────┐
                               │ ●  Error al conectar             │
                               │    Reintentando en 10s...        │
                               │    [Reintentar ahora]      [×]  │
                               └─────────────────────────────────┘
```

Adoptado por: Carbon (Toast Notification), Polaris (Toast), Atlassian (Flag), Ant Design (Message/Notification), M3 (Snackbar).

---

### Patrón 4: High-Contrast Banner (Carbon-style)

Misma severidad semántica, mayor intensidad visual. Fondo sólido en lugar de tint suave. Para alerts que deben competir con contenido denso.

```
┌─────────────────────────────────────────────────────────────────────┐
│█ ●  Error: No tienes permisos para realizar esta acción.  [Solicitar acceso] [×] █│
└─────────────────────────────────────────────────────────────────────┘
```

Adoptado por: Carbon (lowContrast prop — controla entre high-contrast y low-contrast).

---

## Risks to Address Early

1. **ARIA assertivo para mensajes de baja urgencia** (HIGH) — Si usas `role="alert"` para todos los tipos incluyendo info y success (como hace Spectrum), crearás announcement fatigue en usuarios de screen reader. El resultado: aprenden a ignorar los anuncios, haciendo que los errores reales también pasen desapercibidos. Mitiga diferenciando desde el inicio: `role="alert"` para error/warning, `role="status"` para info/success. Carbon y Polaris son la referencia.

2. **Toast para errores que requieren acción** (HIGH) — El anti-patrón más dañino en alert design: usar un overlay auto-dismiss para comunicar un error que el usuario debe resolver. En mobile, el Toast puede desaparecer antes de que el usuario lo lea. Para usuarios de screen reader, el anuncio ocurre y desaparece antes de que procesen la acción requerida. Mitiga con separación arquitectónica estricta: si el mensaje requiere acción del usuario, es siempre un alert inline, nunca un Toast.

3. **Banners permanentes no-dismissibles en mobile** (MEDIUM) — En viewport pequeño, un banner informativo que no se puede cerrar consume una fracción significativa del espacio visible permanentemente. En mobile, un banner de 3 líneas puede ocupar 15-20% del viewport. Mitiga con la regla de Polaris: dismiss siempre requerido para tones no-críticos. En mobile, considerar además reducir la información en el banner y mover el detalle a un link.

4. **Falta de focus management en submit fallido** (MEDIUM) — Cuando un formulario falla al enviarse y aparece un alert de error, los usuarios de teclado y screen reader no reciben feedback automático si el foco no se mueve al alert. Es uno de los gaps WCAG AA más frecuentes en formularios. Mitiga implementando el patrón `autoFocus` de Spectrum: cuando el alert de error se renderiza tras un submit fallido, mueve el foco programáticamente al alert.

5. **Multiple banners simultáneos sin priorización** (LOW) — Ningún Tier 1 tiene una estrategia de stacking para múltiples alerts simultáneos. Si tu sistema puede generar varios alerts al mismo tiempo (ej: múltiples errores de validación de sección), necesitarás definir una regla de priorización: ¿el error más urgente primero? ¿FIFO? ¿máximo N visibles? Define esta regla antes de que llegue el caso de uso.

---

## Next Steps

| # | Qué hacer | Por qué | Agente | Comando |
|---|-----------|---------|--------|---------|
| 1 | Definir anatomía | Mapear container, icon slot, title, description, action slot, dismiss button, live region wrapper | Anatomy Agent | `/anatomy alert` |
| 2 | Build variant matrix | Cruzar types (4) × states (default, hover, dismiss, focus) × modes (inline, banner, toast) | Variant Matrix | `/matrix alert` |
| 3 | Asignar tokens | Mapear background, border, icon color, text color, action color por severity × light/dark mode | Token Agent | `/tokens alert` |
| 4 | Escribir interaction spec | Keyboard navigation, focus management en render, dismiss behavior, auto-dismiss countdown | Interaction Agent | `/interaction alert` |
| 5 | Planear estructura Figma | Auto-layout blueprint, component properties por type y mode, naming conventions | Figma Planner | `/figma-plan alert` |

---

_Generated by Component Research Agent v2 — 2026-03-28_
_6 sistemas analizados · Guided mode · Scope: Error/Warning/Success/Info · Banner de página + Overlay flotante · Acción principal + dismiss · WCAG AA · Mobile-first_
