# CodeBlock — Especificación Completa

## Descripción general

Display de código con syntax highlighting, header opcional, número de líneas y botón de copia. Diseñado para mostrar snippets de código en documentación, onboarding flows y interfaces developer-facing con control explícito de tema (light/dark independiente del sistema).

### Wireframe estructural

```
┌────────────────────────────────────────────┐
│ [icon/lang] example.js          [⎘ Copiar] │  ← header (opcional)
├────────────────────────────────────────────┤
│  1 │ const foo = 'bar';                    │
│  2 │ console.log(foo);                     │
│  3 │ // comentario                         │
└────────────────────────────────────────────┘
     ↑ lineNumbers (opcional)
```

**Anatomía de slots:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `header` | container | No | Filename, language tag, copy button |
| `lineNumbers` | container | No | Columna de números de línea |
| `code` | text | Sí | Contenido con syntax highlighting |
| `copyButton` | icon-action | No | Botón copiar al clipboard |
| `languageTag` | container | No | Tag con nombre del lenguaje |

### Properties y valores

| Property | Valores |
|----------|---------|
| **Theme** | `light` · `dark` |
| **Size** | `sm` · `md` |
| **LineNumbers** | `no` · `yes` |
| **Wrap** | `no` · `yes` |

**Total frames:** Theme(2) × Size(2) × LineNumbers(2) × Wrap(2) = **16 frames** · Sin exclusiones

### Panel de Figma

| Property Figma | Tipo | Valores |
|----------------|------|---------|
| Theme | Variant | light / dark |
| Size | Variant | sm / md |
| LineNumbers | Variant | no / yes |
| Wrap | Variant | no / yes |
| 👁 Show Header | Boolean | true/false |
| 👁 Show Copy Button | Boolean | true/false |
| 👁 Show Language Tag | Boolean | true/false |
| 👁 Show Line Numbers | Boolean | true/false |
| ✏️ Code | Text | `const foo = 'bar';` |
| ✏️ Filename | Text | `example.js` |
| 🔄 Language Tag | Instance swap | `Tag/javascript` |

---

## Cuándo usar

**Usar CodeBlock cuando:**
- Mostrar snippets de código en documentación técnica o guías de integración
- Presentar ejemplos de API, comandos de terminal o configuración
- Necesitar control explícito de tema light/dark para el bloque de código
- El copy-to-clipboard es funcionalidad crítica (onboarding, SDK docs)

**No usar CodeBlock cuando:**
- El texto es código inline dentro de un párrafo → usar `<code>` con Typography
- Se necesita mostrar diffs con líneas añadidas/removidas → usar un componente de diff especializado
- El bloque de código forma parte de un editor editable → usar CodeEditor

---

## Variaciones visuales

### Theme: Light

```
bg:          surface/pressed     (#F7F7F9)
fg:          text/primary        (#1F1F21)
headerBg:    surface/hover       (#F0F0F3)
lineNumber:  text/subtlest       (#8C8C99)
border:      border/default      (#E1E1E5)
```

### Theme: Dark

```
bg:          surface/inverse     (#1C1C21)
fg:          text/onInverse      (#EBEBF0)
headerBg:    surface/inverse-hover (#292930)
lineNumber:  text/subtlest-inverse (#6B7280)
border:      border/inverse      (#333338)
```

### Size: sm

- Font: 12px monospace, line-height: 18px
- Padding: 12px
- Header height: 32px

### Size: md

- Font: 13px monospace, line-height: 20px
- Padding: 16px
- Header height: 40px

### LineNumbers: yes

- Columna de números separada del código por un divider vertical sutil
- Números alineados a la derecha, color `text/subtlest`
- `aria-hidden="true"` — solo decorativo

### Wrap: yes

- Las líneas largas hacen wrap en lugar de causar scroll horizontal
- Activar para código con líneas muy largas en viewports estrechos

---

## Decisiones de diseño

### 1. Theme light/dark como property explícita

Los code blocks frecuentemente se muestran en dark theme independientemente del modo del sistema (preferencia de developers, mejores colores de syntax). El Theme como property permite embed de blocks oscuros en interfaces claras y viceversa.

### 2. Syntax highlighting es runtime, no modelado en Figma

Herramientas como Prism.js o Shiki aplican colores según el tipo de token en runtime. En Figma el código se muestra en un color uniforme; el render final tiene highlighting completo. Documentar esto evita expectativas incorrectas del diseñador.

### 3. Copy button first-class

El copy-to-clipboard es crítica para snippets. El botón usa `aria-live="polite"` para anunciar "Copiado" a screen readers sin interrumpir la narración. El botón pasa a un estado de éxito visual temporal (check icon, 1.5s).

### 4. Fuente monospace

Usar `type/mono` token: SF Mono → Menlo → Consolas → monospace. La fuente monospace garantiza alineación de columnas y legibilidad de código. No mezclar con fonts proporcionales.

---

## Comportamiento e interacción

### Roles ARIA

| Elemento | Rol / Atributo |
|----------|----------------|
| Bloque completo | `role="region"` + `aria-label="Código JavaScript"` |
| Contenido | `<pre><code>` native semantics |
| Copy button | `role="button"` + `aria-label="Copiar código"` |
| Copy feedback | `aria-live="polite"` anuncia `"Copiado"` |
| Números de línea | `aria-hidden="true"` |
| Si es scrollable | `role="region"` + `tabindex="0"` + `aria-label` |

### Navegación de teclado

| Tecla | Comportamiento |
|-------|----------------|
| `Tab` | Navega al copy button |
| `Enter` / `Space` | Copia el código al clipboard |
| Arrow keys | Scroll en el bloque (si `tabindex=0`) |
| `Home` / `End` | Inicio / final del bloque |

### Focus

- Copy button: anillo de focus `2px` visible en tema light y dark
- Bloque scrollable largo: `tabindex=0` para permitir navegación de teclado
- Estado success del copy: check icon por 1.5s, luego revierte a copy icon

### Comportamiento del copy button

1. Click / Enter → copia `innerText` del `<code>` al clipboard
2. Icon cambia a check, color feedback brand
3. `aria-live="polite"` anuncia `"Copiado"`
4. Después de 1.5s → revierte al estado original automáticamente

---

## Guía de contenido

**Filename (header):**
- Usar el nombre real del archivo si aplica: `example.js`, `config.yaml`
- Si es un snippet genérico sin archivo: omitir o usar el tipo: `JavaScript`
- Extensiones ayudan al usuario entender el contexto antes de leer

**Language tag:**
- Usar nombre reconocible: `javascript`, `typescript`, `python`, `bash`, `json`
- El tag ayuda a motores de syntax highlighting a aplicar el esquema correcto
- Omitir si el lenguaje no aplica (ej. salida de terminal plana)

**Código en el frame de Figma:**
- Mostrar un snippet representativo (5-10 líneas) que tenga estructura visual
- No usar lorem ipsum — usar código real del proyecto o ejemplos auténticos
- El código en Figma es estático; el highlighting se aplica en implementación

---

## Pre-build checklist

**Antes de construir el componente en Figma:**

- [ ] Confirmar que el token `type/mono` apunta a la stack de fuentes monospace correcta
- [ ] Verificar que `surface/inverse` y `text/onInverse` tienen contraste ≥ 4.5:1 en modo dark
- [ ] El copy button tiene estado de hover, focus y success distintos visualmente
- [ ] El header es un slot booleano — verificar que el código se re-ajusta correctamente sin header
- [ ] LineNumbers activadas: asegurar que la columna tiene ancho fijo (no empuja el código)
- [ ] El bloque scrollable horizontal no trunca el código en Wrap=no
- [ ] Probar con snippet de código real de 15-20 líneas para validar proporciones

---

## Componentes relacionados

| Componente | Relación |
|------------|----------|
| **Typography** | Usar `<code>` inline para código en medio de texto |
| **Button** | El copy button puede usar Button/icon-only internamente |
| **Tooltip** | Tooltip sobre el language tag para descripción completa |
| **Badge / Tag** | El language tag puede usar Tag component |

---

## Referencia: ¿cómo lo hacen otros sistemas?

| Sistema | Theme control | Syntax highlighting | Copy button |
|---------|--------------|--------------------|----|
| **GitHub Primer** | Automático (sigue sistema) | Sí (CodeMirror) | Sí, first-class |
| **Stripe Elements** | Siempre dark en docs | Sí | Sí |
| **Atlassian** | No separado | Sí | Opcional |
| **Carbon (IBM)** | Explicit prop | Sí | Sí, con estado |
| **Spectrum (Adobe)** | Sigue sistema | Limitado | No nativo |
| **Polaris (Shopify)** | Sigue sistema | No | Sí |

**Consenso:** Copy button es crítico en todos. Control de tema explícito es uncommon pero valioso para developer tools. Syntax highlighting delegado a runtime en todos.

---

## Tokens y espaciado

**Prefijo:** `cb-` · **Total tokens:** 14 · **Modo:** Components

### Tokens de color

| Token | Valor DS | Uso |
|-------|----------|-----|
| `cb/light/bg` | `surface/pressed` | Fondo modo light |
| `cb/light/fg` | `text/primary` | Texto modo light |
| `cb/light/headerBg` | `surface/hover` | Header modo light |
| `cb/dark/bg` | `surface/inverse` | Fondo modo dark |
| `cb/dark/fg` | `text/onInverse` | Texto modo dark |
| `cb/border` | `border/default` | Border del bloque |
| `cb/lineNumber/fg` | `text/subtlest` | Números de línea |

### Tokens de espaciado y tipografía

| Token | Valor DS | Uso |
|-------|----------|-----|
| `cb/radius` | `radius/md` | Border radius del bloque |
| `cb/sm/fontSize` | `type/xs` (12px) | Fuente size sm |
| `cb/md/fontSize` | `type/sm` (13px) | Fuente size md |
| `cb/sm/padding` | `spacing/3` (12px) | Padding size sm |
| `cb/md/padding` | `spacing/4` (16px) | Padding size md |
| `cb/font/family` | `type/mono` | Stack de fuente monospace |

### Espaciado por tamaño

| Propiedad | sm | md |
|-----------|----|----|
| Font size | 12px | 13px |
| Line height | 18px | 20px |
| Padding | 12px | 16px |
| Header height | 32px | 40px |
| Border radius | 6px (`radius/md`) | 6px (`radius/md`) |
