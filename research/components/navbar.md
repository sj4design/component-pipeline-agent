# Navbar (Top Navigation Bar) — Component Research

**Fecha:** 2026-04-10
**Modo:** --max (all patterns, all systems, no filtering)
**Sistemas analizados:** 24 (all tiers)
**Scope:** Horizontal top navigation bar — persistent header at page top with logo, navigation links, search, user actions, and responsive hamburger collapse.

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Spectrum (Adobe) | Prefiere composicion desde primitivos: ActionButton, Avatar, Menu, Flex | Header area es un layout pattern, no un componente. SideNav maneja navegacion principal |
| Ant Design | No hay componente Navbar; se compone con Layout.Header + Menu horizontal | Menu mode="horizontal" + Layout.Header container + custom flex layout |
| Chakra UI | Trata navbar como un ejercicio de composicion | Recipe con Flex, HStack, IconButton (hamburger), Drawer, Menu |
| Gestalt (Pinterest) | Pinterest usa un header custom demasiado especifico para abstraer en Gestalt | PageHeader solo proporciona titulo de pagina + breadcrumbs, no navbar |
| Evergreen (Segment) | Se enfoca en navegacion por sidebar para SPAs | Composicion desde Pane, Heading, IconButton |
| Fluent 2 | No tiene NavBar dedicado; Microsoft usa bespoke ribbon/command bar | Composicion desde Toolbar + MenuBar |

---

## How Systems Solve It

### Material Design 3 — "Scroll-responsive header con cuatro variantes de tamano"

M3 divide la navegacion top-level en dos componentes separados: Top App Bar para el header persistente con titulo, icono de navegacion, y acciones; y Navigation Bar para navegacion por tabs en la parte inferior del movil. Esta separacion refleja la conviccion de M3 de que la navegacion primaria en movil vive abajo (alcance del pulgar), mientras que el header sirve como contexto de la pagina actual.

El Top App Bar viene en cuatro variantes — CenterAligned, Small, Medium y Large — diferenciadas por la posicion y tamano del titulo. Large usa un layout de dos lineas con el titulo prominente debajo de la fila de acciones, creando una jerarquia visual fuerte. La decision mas sofisticada de M3 es hacer del scroll behavior un ciudadano de primera clase: el bar puede comprimirse de Large a Small al scrollear, u ocultarse completamente al bajar y reaparecer al subir. Esto permite maximizar el espacio de contenido en movil sin perder acceso a la navegacion.

Las tres regiones de slots — `navigationIcon` (leading: menu o back), `title` (centro o start), y `actions` (trailing: max 3 iconos visibles, overflow menu para mas) — son deliberadamente limitadas. M3 no incluye search integrado en el Top App Bar; la busqueda es un componente separado (Search Bar) que puede reemplazar al Top App Bar contextualmente. El color del container eleva tonalmente cuando el contenido scrollea detras, proporcionando un indicador visual de scroll sin sombra dura.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Scroll behavior built-in (compress/hide) | Maximizar area de contenido en movil; el usuario necesita contexto pero no siempre acceso permanente | HIGH | Si tu app es content-heavy en movil, el compress-on-scroll es valioso; si es enterprise desktop-first, probablemente innecesario |
| 4 variantes de tamano para titulo | El tamano del titulo comunica jerarquia de pagina — Large para landing, Small para drill-down | HIGH | Si tu app tiene jerarquia de paginas clara, las variantes son utiles; si es dashboard plano, Small es suficiente |
| Max 3 acciones visibles + overflow | Evitar sobrecarga cognitiva en movil; acciones secundarias van a menu overflow | MED | Buena regla general; en desktop puedes mostrar mas acciones |
| Search separado del Top App Bar | Busqueda merece su propia UX (expansion, sugerencias, historial) sin comprimir la navbar | MED | Si search es critico, considera integrarlo en el navbar; si es secundario, M3 tiene razon |

**Notable Props:** scrollBehavior (enterAlways/exitUntilCollapsed), navigationIcon slot, actions slot (max 3), colors (container/scroll)

**A11y:** Top App Bar es una landmark region (header). Navigation icon y action icons requieren content descriptions. Title sirve como heading de pagina. No usa role="navigation" — es una header region.

---

### Carbon (IBM) — "El shell de aplicacion enterprise mas completo"

Carbon trata el navbar no como un componente aislado sino como la capa superior de un shell de aplicacion completo. El UI Shell de Carbon es un sistema de multiples sub-componentes: Header (container principal), HeaderName (logo/nombre de app), HeaderNavigation (links de navegacion horizontales), HeaderGlobalBar (acciones globales a la derecha), HeaderPanel (paneles laterales flyout), y HeaderMenu (dropdowns dentro de la nav). La decision arquitectonica clave es que el Header controla tambien el toggling del SideNav, los paneles flyout, y el contexto a nivel de aplicacion.

HeaderNavigation es donde viven los links de navegacion horizontal — cada link puede ser simple o un HeaderMenu dropdown. Lo mas distintivo de Carbon son los HeaderPanel flyouts: los iconos de accion global (notificaciones, app switcher, usuario) abren paneles de altura completa en lugar de menus dropdown. Este patron es unico para flujos enterprise complejos donde las notificaciones o el app switcher necesitan espacio para contenido rico.

El header es fixed por defecto — no tiene scroll-hide behavior. La razon: en aplicaciones enterprise, los usuarios necesitan acceso permanente a navegacion y acciones globales. En movil, el header colapsa a hamburger + SideNav. Carbon incluye un skip-to-content link como primer elemento focusable, un patron a11y que deberia ser universal.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Shell architecture (Header controla SideNav, paneles) | El navbar enterprise necesita coordinar multiples areas de UI, no solo mostrar links | HIGH | Si tu app tiene sidebar + header + panels, el modelo shell es el correcto |
| HeaderPanel flyouts full-height | Notificaciones, app switcher, settings necesitan espacio real, no un dropdown de 200px | HIGH | Adoptar para acciones que requieren contenido rico; overkill para menus simples |
| Fixed position sin scroll-hide | Enterprise = acceso permanente a nav y acciones globales | MED | Correcto para dashboards; considerar scroll-hide para landing pages |
| Skip-to-content como primer focusable | WCAG 2.1 Level A — usuarios de teclado deben poder saltar la nav repetitiva | HIGH | Implementar siempre. No es opcional |

**Notable Props:** Header, HeaderName (prefix + name), HeaderNavigation, HeaderMenuItem, HeaderGlobalAction (icon buttons), HeaderPanel (side flyout), SideNav trigger

**A11y:** Header con role="banner" + skip-to-content link. HeaderNavigation con nav aria-label. HeaderGlobalAction con aria-label. HeaderPanel con focus trap.

---

### Polaris (Shopify) — "Search-first: la busqueda como navegacion primaria"

El TopBar de Polaris es inseparable del Frame — el shell de aplicacion de Shopify Admin. Esta decision arquitectonica refleja que Shopify Admin es una sola aplicacion con una estructura rigida, no un toolkit para aplicaciones diversas. El TopBar provee el header persistente con logo, campo de busqueda, y menu de usuario.

La decision mas distintiva de Polaris es hacer del search field el elemento dominante del TopBar. En Shopify Admin, la navegacion primaria es la busqueda: los merchants buscan ordenes, productos, clientes, y la busqueda es mas rapida que navegar por menus. Esto invierte el modelo tradicional donde los links horizontales son la navegacion primaria y la busqueda es secundaria.

El user menu (avatar + dropdown) maneja account switching y acciones de perfil. El logoSuffix permite branding contextual (badge "Plus"). No hay links de navegacion horizontal en el TopBar — toda la navegacion estructural vive en el sidebar. Esto simplifica radicalmente el header pero lo hace inapropiado como modelo general para navbars.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Search field como elemento dominante | Merchants navegan por busqueda, no por menu; buscar "order #1234" es mas rapido que navegar a Pedidos > filtrar | HIGH | Si tus usuarios buscan entidades especificas frecuentemente, search-first tiene sentido |
| Parte del Frame shell | Shopify Admin es una sola app; TopBar no tiene sentido fuera de ese contexto | HIGH | Si controlas la app completa, el modelo shell funciona; si es un toolkit, necesitas standalone |
| Sin links horizontales de nav | La sidebar maneja toda la navegacion; duplicarla en el header seria redundante | MED | Si tienes sidebar nav, mantener header limpio es correcto; sin sidebar, necesitas links |

**Notable Props:** searchField (SearchField component), userMenu (TopBar.UserMenu), logoSuffix, contextControl

**A11y:** Dentro de la estructura de landmarks de Frame. Search field con label. User menu con role="menu". Frame provee skip-navigation links.

---

### Atlassian — "Multi-producto con theming y app switcher"

AtlassianNavigation es un bar horizontal slot-based con: ProductHome (logo), PrimaryButton (nav items top-level), Search, AppSwitcher, Help, Notifications, Settings, y Profile — todos como render props. Esta arquitectura de maxima composicion refleja la necesidad de soportar la navegacion global de todos los productos Atlassian (Jira, Confluence, Bitbucket) con una barra compartida.

Cada region es un render prop, dando flexibilidad total. El product theming via `theme` prop aplica los colores especificos de cada producto (azul Jira, morado Confluence) al bar completo — el navbar es la superficie de marca principal. Los primary nav items abren paneles dropdown de ancho completo (no menus pequenos) para contenido como listas de proyectos, items recientes, starred — un patron unico de la densa arquitectura de informacion de Atlassian.

El app switcher (icono waffle) es un slot de primera clase que abre un panel mostrando todos los productos Atlassian del usuario — navegacion cross-producto desde el navbar.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Render props para cada region | Suite multi-producto necesita que cada producto configure su navbar de forma diferente sin fork | HIGH | Si tienes multiples apps que comparten navbar, render props dan la flexibilidad necesaria |
| Product theming via `theme` prop | El navbar es la superficie de marca mas visible; cada producto necesita su identidad visual | HIGH | Si tu marca tiene sub-marcas o productos, theming es valioso; para una app single-brand, un solo tema basta |
| Full-width dropdown panels | La informacion densa (proyectos, items recientes) no cabe en un dropdown de 200px | MED | Adoptar para contenido rico en dropdowns; overkill para menus simples de 5 items |
| App switcher como slot | Usuarios de Atlassian trabajan en multiples productos simultaneamente | MED | Solo necesario si tienes multiples productos/apps |

**Notable Props:** renderProductHome, primaryItems, renderSearch, renderAppSwitcher, renderNotifications, renderProfile, renderHelp, renderSettings, theme

**A11y:** Render como header + nav para primary items. Skip links. Primary buttons accesibles como nav links. Dropdown panels manejan focus. AppSwitcher con aria-label.

---

### Twilio Paste — "TopBar de acciones, no de navegacion"

Paste separa explicitamente el Topbar (acciones globales) de la navegacion (Sidebar). El Topbar es un container horizontal para acciones como user menu, status, help — no contiene links de navegacion. La navegacion via links vive exclusivamente en el Sidebar, que se activa desde un hamburger trigger en el Topbar.

Esta separacion tiene un razonamiento fuerte: en Twilio Console, la navegacion es profunda y jerarquica (productos > sub-productos > configuracion), y no cabe en un header horizontal. El Topbar se limita a acciones que son globales y siempre visibles.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Topbar = acciones, Sidebar = navegacion | Navegacion compleja necesita sidebar; header queda limpio para acciones | HIGH | Modelo ideal para apps enterprise con navegacion profunda |
| Hamburger trigger para sidebar | En movil/desktop estrecho, la sidebar colapsa; el topbar mantiene acceso al toggle | MED | Standard pattern; implementar siempre que haya sidebar |

**A11y:** Skip-to-content implementado explicitamente. Hamburger con aria-expanded + aria-controls.

---

### GitHub Primer — "Dos capas: header global oscuro + page header contextual"

Primer separa el header en dos niveles: el Header oscuro persistente (logo, search, nav links, user avatar) que es global, y el PageHeader contextual (breadcrumbs, titulo de pagina, acciones) debajo. Esta separacion refleja que GitHub tiene un contexto global (quien eres, en que repo estas) y un contexto de pagina (que ves ahora).

El Header oscuro contiene search como un input colapsable y links de navegacion (Pull Requests, Issues, Marketplace). En movil, tiene un slide-out menu panel.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Dos capas separadas (header + page header) | Contexto global vs contexto de pagina son concerns diferentes | HIGH | Util si tu app tiene contexto global persistente y contexto de pagina variable |
| Header oscuro | Diferencia visualmente la nav global del contenido de pagina; crear contraste | MED | Dark header funciona para developer tools; light header es mas neutral |

**A11y:** Header usa landmark. Nav links accesibles. Mobile menu con aria-expanded.

---

### shadcn/ui — "Recipe composable, no componente monolitico"

shadcn/ui documenta navbar como una receta de layout usando flex containers, NavigationMenu para links, y Sheet para hamburger drawer mobile. No existe un componente Navbar; el desarrollador compone exactamente lo que necesita. NavigationMenu (basado en Radix) maneja la logica de dropdowns con viewports animados.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Recipe vs componente | Maximo control; navbars son demasiado especificos de producto para abstraer | HIGH | Si quieres control total, composicion es mejor; si quieres consistencia en un equipo, un componente es mas seguro |

---

### Salesforce Lightning — "Global header enterprise con app launcher"

Lightning tiene un Global Header persistente como parte del Global Navigation model. El header incluye app launcher (waffle), global search (elemento central dominante), favorites, setup, notifications, y user profile. La navegacion por tabs vive en una barra secundaria debajo del header.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Search como elemento central dominante | En Salesforce, buscar un registro (contacto, lead, oportunidad) es la accion mas frecuente | HIGH | Para CRMs y data-heavy apps, search central tiene sentido |
| Nav tabs en barra secundaria | Separar navegacion de acciones globales; tabs below permiten contexto de app | MED | Buena separacion de concerns; considerar si tu app necesita dos barras |

**A11y:** Search con role="combobox" + aria-autocomplete.

---

### Playbook — "Nav horizontal simple para links"

Playbook ofrece Nav/NavItem como componente horizontal o vertical con variant="subtle" para styling subdued. Es puramente links de navegacion — no tiene search, user menu, o acciones integradas.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Solo links, nada mas | Componente simple para un solo concern: navegacion por links | LOW | Util como sub-componente dentro de un navbar mas complejo |

---

### Base Web — "Layout regions nombradas, sin logica de nav"

HeaderNavigation de Base Web es un componente de layout minimal con regiones nombradas (logo, left, center, right) usando overrides. No maneja logica de navegacion — es puramente layout. Se combina con StyledNavigationList para grupos de links.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Layout puro, sin logica | Maximo control sobre comportamiento de nav | MED | Bueno si necesitas un container flexible; malo si quieres algo turnkey |

---

### Radix UI — "NavigationMenu con viewport animado para mega-menus"

Radix NavigationMenu es arquitectonicamente unico: multiples triggers comparten un solo viewport animado que transiciona suavemente entre paneles de contenido. Resuelve el problema de "mega-menu jank" donde cada dropdown se monta/desmonta independientemente. Sin embargo, NavigationMenu no es un shell de navbar — solo maneja la porcion de links + dropdowns.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Viewport compartido animado | Transiciones suaves entre paneles de dropdown; evita jank visual | HIGH | Excelente para mega-menus con contenido rico; overkill para 5 links simples |
| Solo links + dropdowns, no shell | Cada concern por separado; el navbar shell lo compone el equipo | MED | Combinar con un layout container para el navbar completo |

**A11y:** role="navigation" en root. aria-expanded automatico en triggers. Focus management dentro de viewport.

---

### GOV.UK — "Header de gobierno con accesibilidad estricta"

El Header de GOV.UK tiene requisitos estructurales estrictos: crown logo y service name en posiciones exactas, links de navegacion que colapsan detras de un boton "Menu" (no hamburger icon) en movil. Hay separacion entre Header (identidad global) y Service Navigation (tabs in-service).

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Boton "Menu" en vez de hamburger icon | Accesibilidad: el texto "Menu" es mas claro que un icono para todos los usuarios | HIGH | Considerar texto + icono en lugar de solo hamburger; mejora discoverability |
| Separacion Header vs Service Navigation | Identidad del gobierno vs navegacion del servicio especifico | MED | Relevante si tu app tiene marca institucional + sub-servicios |

**A11y:** WCAG 2.1 AA obligatorio. Menu toggle con aria-expanded + aria-controls. Skip links mandatorio.

---

### Mantine — "AppShell.Header integrado con responsive sidebar"

Mantine trata Header como una region de layout dentro de AppShell que se coordina automaticamente con Navbar (sidebar), Aside, y Footer. Los breakpoints responsivos de AppShell controlan cuando el sidebar colapsa y el Burger del header se hace visible.

**Design Decisions:**

| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Header como region de AppShell | Coordinacion automatica con sidebar responsive | HIGH | Si usas Mantine, AppShell es el camino; modelo similar a Carbon UI Shell |

---

### Nord — "Web component con slots para healthcare SaaS"

nord-header es un web component con slots para logo, nav links, user menu, y notificaciones. Integra con nord-navigation (sidebar). Patron standard para apps de Nordhealth.

---

### Wise — "Header de fintech optimizado para conversion"

Header con logo, nav links, CTA button prominente ("Send money"), y language selector. En movil colapsa a hamburger. Optimizado para conversion — el CTA siempre esta visible.

---

### Dell Masthead — "Mega-menu e-commerce"

Masthead enterprise con logo, mega-menu navigation (paneles full-width multi-columna para categorias de productos), search, cart, y user account. Patron de navegacion e-commerce.

---

### REI Cedar — "Header deprecated, ahora composicion"

Cedar depreco su Header monolitico en favor de composicion desde primitivos. Behavior responsive requiere implementacion manual.

---

### Orbit (Kiwi.com) — "Bottom nav para movil, no top header"

NavigationBar de Orbit es una barra de navegacion bottom (no top) con iconos + labels, similar a M3's Navigation Bar. Disenado para el flujo de booking mobile de Kiwi.com. Arquitectonicamente diferente de un top navbar.

---

## Pipeline Hints

**Archetype recommendation:** nav-content (horizontal navigation bar)
Rationale: El navbar es un componente de navegacion horizontal con slots para contenido diverso (logo, links, search, acciones). El archetype nav-content refleja su rol como barra de contenido de navegacion, no un container generico ni un form-control.

**Slot consensus:**

| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| logo | icon/media | yes | 18/18 | Logo de app/marca. Todos los sistemas lo incluyen. Click navega a root. M3: navigationIcon, Carbon: HeaderName, Atlassian: renderProductHome |
| nav-items | container | no | 14/18 | Links de navegacion horizontal. Carbon: HeaderNavigation, Ant: Menu horizontal, Primer: nav links. Polaris no tiene (usa sidebar) |
| search | slot | no | 10/18 | Campo de busqueda integrado. Polaris/Lightning: dominante central. Carbon/Primer: colapsable. M3: componente separado |
| actions | container | no | 16/18 | Acciones globales a la derecha (iconos: notificaciones, help, settings). Carbon: HeaderGlobalBar, Atlassian: renderHelp/renderSettings |
| avatar/user-menu | slot | no | 16/18 | Avatar de usuario + dropdown menu. Polaris: TopBar.UserMenu, Atlassian: renderProfile, Carbon: HeaderGlobalAction |
| hamburger-menu | icon-action | no | 14/18 | Toggle para sidebar/drawer en mobile. Carbon: SideNav trigger, Mantine: Burger |
| app-switcher | icon-action | no | 4/18 | Icono waffle para cambiar entre productos. Solo Atlassian, Lightning, Carbon |
| divider | divider | no | 6/18 | Separador visual entre regiones del navbar |
| breadcrumb | container | no | 3/18 | Breadcrumbs dentro del header (Primer PageHeader, GOV.UK) |
| cta-button | slot | no | 3/18 | Boton de accion prominente (Wise: "Send money") |

**Property consensus:**

| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Type | variant | default/prominent/dense | 10/18 | M3: CenterAligned/Small/Medium/Large. Carbon: fixed. Atlassian: themed. Dense = compact for data-heavy apps |
| State | state | default/elevated/hidden | 12/18 | M3: scroll-responsive elevation. Most: default only. Hidden = scroll-hide behavior |
| Position | variant | fixed/sticky/static | 14/18 | Fixed es default en la mayoria. Sticky para scroll-responsive. Static es raro |
| Color scheme | token | light/dark | 12/18 | Primer: siempre dark. Atlassian: product theme. Carbon: Layout theme. Via Figma Variables, NOT variant |
| Scroll behavior | variant | none/compress/hide | 4/18 | Solo M3 tiene scroll behavior built-in. Otros lo manejan con CSS/JS custom |

**Boolean properties found:**

| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| logo | 18/18 | true | Logo siempre visible por defecto; toggle para ocultar en contextos especificos |
| search | 10/18 | false | Campo de busqueda integrado; Polaris/Lightning = true por defecto |
| avatar | 16/18 | true | User menu/avatar; casi universal |
| actions | 16/18 | true | Acciones globales (notifications, help, settings) |
| hamburgerMenu | 14/18 | false | Toggle hamburger; visible en mobile/responsive |
| appSwitcher | 4/18 | false | Waffle icon; solo multi-producto |
| divider | 6/18 | false | Separador entre regiones |
| ctaButton | 3/18 | false | Boton de accion prominente (Wise pattern) |

**State coverage (comprehensive):**

| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 18/18 | Base appearance, surface color, no shadow | Universal |
| elevated | 10/18 | Shadow o tonal elevation cuando contenido scrollea detras | M3: tonal elevation. Carbon: subtle shadow. Indica que hay contenido scrolleado |
| hidden | 4/18 | Navbar oculto (scroll-hide-on-down) | M3: exitUntilCollapsed. Raro en enterprise apps |
| hover (nav items) | 14/18 | Background highlight o underline en nav items | State del sub-componente NavItem, no del navbar |
| focus (nav items) | 14/18 | Focus ring en nav items | WCAG 2.4.7 obligatorio |
| active/current (nav items) | 14/18 | Color accent, underline, bold text | Indica pagina actual; state del NavItem |
| pressed (nav items) | 8/18 | Darker background momentaneo | State del NavItem |

**Exclusion patterns found:**
- hidden x elevated — 4/18 systems (si esta hidden, no puede estar elevated)
- Solo un state de navbar a la vez (default OR elevated OR hidden)
- NavItem states (hover/focus/pressed/active) son del sub-componente, no del navbar principal

**Building block candidates:**
- nav-items region -> `.NavItem` — 14/18 systems have structured nav items (link text + optional icon + optional dropdown trigger). Sub-componente con sus propios states (default/hover/focus/pressed/active)
- user-menu -> composicion con Avatar + Menu — no necesita BB separado; usa Avatar y Menu existentes
- search -> composicion con Search/Input existente — no BB propio

**Enum/configuration properties:**

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| maxVisibleActions | 2, 3, 4, 5 | 6/18 | M3 max 3. Atlassian flexible. Overflow to menu |
| navItemLayout | text / icon+text / icon-only | 10/18 | Como se muestran los nav items |

**A11y consensus:**
- Primary role: `navigation` (14/18 consensus) — wrapped in `<nav aria-label="Main navigation">`
- Container: `<header>` or `role="banner"` for the global site header landmark
- Required ARIA: `aria-label` on nav element, `aria-expanded` on hamburger/dropdowns, `aria-current="page"` on active nav item
- Keyboard: Tab navigates between nav items and actions; Enter activates links/buttons; Escape closes dropdowns/panels
- Focus: Linear tab order (not roving); nav items are individual tab stops
- APG pattern: Menubar pattern for horizontal nav with dropdowns; simple links for flat navigation
- Skip-to-content: MUST be first focusable element (Carbon, Paste, GOV.UK, Nord implement explicitly)
- Mobile hamburger: aria-expanded + aria-controls pointing to drawer/panel
- A11y quality flag: Ant Design does NOT auto-wrap in `<nav>` landmark — developers must add manually

---

## What Everyone Agrees On

1. **Logo a la izquierda, acciones a la derecha:** Todas los 18 sistemas con navbar colocan el logo/marca a la izquierda y las acciones de usuario (avatar, notificaciones, settings) a la derecha. Es una convencion tan universal que los usuarios lo esperan automaticamente — romperla causa desorientacion.

2. **Responsive = hamburger collapse:** 14/18 sistemas colapsan la navegacion horizontal a un icono hamburger en mobile que abre un drawer/sidebar. Es el patron responsive mas predecible para usuarios. La alternativa (bottom nav) es solo Orbit (mobile-first booking).

3. **Skip-to-content link como primer focusable:** Los sistemas con a11y seria (Carbon, GOV.UK, Paste, Nord) implementan un skip link antes del navbar. Es WCAG 2.4.1 Level A — no es opcional para sitios con contenido repetitivo.

4. **Avatar + dropdown para user menu:** 16/18 sistemas usan un avatar circular que abre un dropdown con account actions (profile, settings, logout). El avatar comunica "alguien esta logueado" sin ocupar espacio con texto.

5. **El navbar es fixed/sticky por defecto:** 14/18 sistemas posicionan el navbar como fixed o sticky en la parte superior. Los usuarios esperan poder acceder a la navegacion y acciones sin scrollear de vuelta al inicio.

6. **Nav items como links, no como buttons:** Los items de navegacion horizontal son semanticamente links (`<a>`) que llevan a paginas, no buttons que ejecutan acciones. Esto es correcto para a11y (links navegan, buttons actuan) y para SEO.

---

## Where They Disagree

### 1. "Componente monolitico vs composicion?"
**Option A — Componente dedicado:** Carbon UI Shell, Atlassian AtlassianNavigation, Polaris TopBar. Un componente con API definida y slots. Upside: consistencia garantizada, menor esfuerzo para implementar. Downside: rigido; cada variacion necesita la API lo soporte.

**Option B — Receta de composicion:** Spectrum, shadcn/ui, Chakra, Ant Design. Layout containers + primitivos existentes. Upside: flexibilidad total. Downside: cada equipo puede inventar su propia navbar; sin consistencia.

**Para tu caso:** Si tu DS sirve a un solo producto o a un equipo pequeno, un componente dedicado es correcto y mas rapido de adoptar. Si sirve a muchos equipos/productos, considera composicion con un layout container y sub-componentes documentados.

### 2. "Search integrado en el header o separado?"
**Option A — Search integrado:** Polaris (dominante), Lightning (central), Primer (colapsable). Search vive dentro del navbar como ciudadano de primera clase.

**Option B — Search separado:** M3 (Search Bar propio), Spectrum (ActionBar), shadcn (sin opinar). Search es un componente independiente que puede o no aparecer en el header.

**Para tu caso:** Si search es la navegacion primaria de tu app (e-commerce, CRM, admin), integralo. Si es secundario, mantenerlo separado simplifica el navbar y permite mayor flexibilidad.

### 3. "Scroll behavior: fixed permanente vs responsive?"
**Option A — Siempre fixed:** Carbon, Atlassian, Lightning, Polaris. El navbar nunca se oculta. Enterprise apps necesitan acceso permanente.

**Option B — Scroll-responsive:** M3 (compress/hide). Maximiza espacio de contenido en mobile.

**Para tu caso:** Enterprise/dashboard = fixed siempre. Content/mobile-first = considerar scroll-responsive. Para un componente de DS, ofrecer ambos via propiedad.

### 4. "Nav items en el header o todo en sidebar?"
**Option A — Nav items horizontales en header:** Carbon, Atlassian, Primer, Dell, GOV.UK. La navegacion primaria vive en la barra horizontal.

**Option B — Sidebar-only nav:** Polaris, Paste, Mantine. El header no tiene links de navegacion; toda la nav vive en el sidebar.

**Para tu caso:** Si la navegacion es shallow (5-8 secciones principales), horizontal en header funciona bien. Si es profunda (sub-menus anidados), sidebar es mejor. Ambos modelos pueden coexistir: header para top-level, sidebar para sub-navegacion.

### 5. "Dropdowns simples vs mega-menus?"
**Option A — Dropdowns simples:** Ant Menu, Primer, GOV.UK. Menu items en una lista vertical estrecha.

**Option B — Mega-menus/panels full-width:** Atlassian (full-width panels), Dell Masthead (multi-columna), Radix (viewport animado). Contenido rico con columnas, imagenes, links agrupados.

**Para tu caso:** Si tus dropdowns tienen < 10 items, dropdown simple. Si necesitas contenido categorizado o imagenes, mega-menu. Radix NavigationMenu es la mejor base tecnica para mega-menus animados.

---

## Visual Patterns Found

| Pattern | Description | Best for | Systems |
|---------|-------------|----------|---------|
| Standard bar | Logo + nav links + actions horizontally | General purpose, most apps | Carbon, Atlassian, Primer, GOV.UK, Nord |
| Search-centered | Logo + dominant search field + minimal actions | CRM, e-commerce admin, data-heavy | Polaris, Lightning |
| Actions-only | Logo + global actions (no nav links) | Apps with sidebar-only nav | Paste, Mantine |
| Shell-integrated | Header controls sidebar toggle + flyout panels | Enterprise apps | Carbon, Polaris, Mantine |
| Mega-menu | Nav items trigger full-width dropdown panels | E-commerce, complex catalogs | Dell, Atlassian, Radix |
| Two-layer | Global header + page-level header below | Apps with global + page context | Primer (Header + PageHeader), GOV.UK (Header + Service Nav) |
| Scroll-responsive | Bar compresses/hides on scroll | Mobile-first, content-heavy | M3 |

```
Standard bar:
┌──────────────────────────────────────────────────────────┐
│ [Logo]  Link  Link  Link  Link          🔍  🔔  👤  ☰   │
└──────────────────────────────────────────────────────────┘

Search-centered:
┌──────────────────────────────────────────────────────────┐
│ [Logo]     [_________ Search _________]      🔔  👤     │
└──────────────────────────────────────────────────────────┘

Actions-only (sidebar nav):
┌──────────────────────────────────────────────────────────┐
│ ☰  [Logo]                                🔔  ⚙️  👤     │
└──────────────────────────────────────────────────────────┘

Two-layer:
┌──────────────────────────────────────────────────────────┐
│ [Logo]  Link  Link  Link          🔍  🔔  👤            │
├──────────────────────────────────────────────────────────┤
│ ← Home / Section / Page     [Actions]  [Button]         │
└──────────────────────────────────────────────────────────┘

Mega-menu open:
┌──────────────────────────────────────────────────────────┐
│ [Logo]  Products▼  Solutions  Pricing         🔍  👤     │
├──────────────────────────────────────────────────────────┤
│ ┌─── Col 1 ───┐ ┌─── Col 2 ───┐ ┌─── Col 3 ───┐       │
│ │ Product A   │ │ Product D   │ │ Resources   │       │
│ │ Product B   │ │ Product E   │ │ Blog        │       │
│ │ Product C   │ │ Product F   │ │ Docs        │       │
│ └─────────────┘ └─────────────┘ └─────────────┘       │
└──────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

1. **Responsive breakpoint inconsistency** (HIGH) — Si el punto de quiebre donde los nav links colapsan a hamburger no coincide con los breakpoints del grid del sistema, el navbar se rompe visualmente en ciertos tamanos. Mitigation: usar los mismos breakpoints del sistema (md=768px para collapse).

2. **Dropdown z-index conflicts** (MEDIUM) — Los dropdowns/mega-menus del navbar deben tener z-index mayor que modals, tooltips, y sticky elements debajo. Mitigation: definir un z-index scale con el navbar dropdown en el nivel mas alto.

3. **Focus management en hamburger drawer** (HIGH) — Al abrir el drawer mobile, el focus debe moverse dentro y quedar trapeado. Al cerrar, volver al hamburger trigger. Si esto falla, usuarios de teclado quedan atrapados o pierden focus. Mitigation: implementar focus trap + focus-on-close patron.

4. **Navbar ocultando contenido focusable** (MEDIUM) — Con navbar fixed, elementos focusables debajo del navbar pueden quedar ocultos (WCAG 2.4.11). Mitigation: scroll-padding-top en CSS igual a la altura del navbar.

5. **Mega-menu en mobile** (MEDIUM) — Mega-menus full-width no funcionan en mobile. Mitigation: en mobile, colapsar todo a drawer con estructura de acordeon.

---

## Next Steps

```
/spec navbar        → Define anatomy, variant matrix, frame count
/enrich navbar      → Add a11y rules + design tokens
/generate navbar    → Build in Figma
/figma-qa           → Audit + auto-fix
/build navbar       → Full pipeline in one command
```
