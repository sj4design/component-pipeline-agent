---
component: tabs
questions: 4
---

# Guided Questions — Tabs

---

## Pregunta 1: Variante visual
**(elige UNA opción)**

¿Qué estilo visual necesitas para los tabs?

1. **Línea / Underline** — tab activo marcado con línea debajo del texto, estilo clásico (ej: GMail, documentación técnica, perfiles de usuario)
2. **Pills / Capsule** — tab activo como chip o cápsula con fondo, estilo moderno (ej: filtros de contenido, dashboards, apps móviles)
3. **Solid / Filled** — tab activo con fondo completo del color primario, alta visibilidad (ej: navegación principal, sectores claramente diferenciados)
4. **Icono + texto** — cada tab lleva un ícono arriba o izquierda del label (ej: navegación de apps, configuración con secciones)
5. **Solo íconos** — los tabs muestran únicamente ícono, sin label visible (ej: toolbars compactas, mobile con espacio limitado)
6. No estoy seguro — muéstrame las variantes disponibles en los design systems y cuándo usar cada una

**Nota adaptativa:** Si eliges 5 (solo íconos), el research enfatizará los requerimientos de `aria-label` y tooltips — cada sistema resuelve accesibilidad de icon-only tabs diferente.

---

## Pregunta 2: Orientación
**(elige UNA opción)**

¿Cómo se ubican los tabs en la interfaz?

1. **Horizontal arriba** — tabs en la parte superior del contenido (el patrón más común)
2. **Horizontal abajo** — tabs debajo del contenido (menos común, usado en mobile navigation bars)
3. **Vertical lateral** — tabs a la izquierda o derecha del contenido (ej: configuración con secciones, paneles de opciones)
4. **Responsive** — horizontal en desktop, se adapta (ej: dropdown o scroll) en mobile
5. No estoy seguro — muéstrame las implicaciones de layout de cada orientación

---

## Pregunta 3: Comportamiento con muchos tabs
**(elige UNA opción)**

¿Qué pasa cuando hay más tabs de los que caben en el espacio disponible?

1. **Scroll horizontal** — los tabs se deslizan horizontalmente, hay flechas o gesture para navegar (ej: mobile, contenido dinámico)
2. **Dropdown de overflow** — los tabs que no caben se agrupan en un menú "Más..." o "..." (ej: navegación de escritorio con secciones variables)
3. **Wrapping** — los tabs se envuelven a una segunda línea (ej: interfaces muy anchas con muchos tabs)
4. **Cantidad fija** — el número de tabs es fijo y siempre caben en el espacio disponible (no hay overflow)
5. No estoy seguro — cuéntame las implicaciones de UX de cada opción

**Nota adaptativa:** Si eliges 4 (cantidad fija y controlada), puedes saltar esta pregunta sin perder información relevante.

---

## Pregunta 4: Carga del contenido
**(elige UNA opción)**

¿Cómo se carga el contenido de cada tab?

1. **Eager / Pre-cargado** — todos los paneles de contenido están en el DOM desde el inicio, solo se muestran/ocultan (ej: contenido estático, cuando el SEO importa)
2. **Lazy / Bajo demanda** — el contenido de cada tab se carga solo cuando el usuario lo activa por primera vez (ej: datos pesados, múltiples llamadas a API)
3. **Re-fetch al cambiar** — cada vez que el usuario cambia de tab, se vuelve a pedir los datos (ej: datos en tiempo real que deben estar frescos)
4. **Con skeleton mientras carga** — sea lazy o re-fetch, necesito estados de loading (skeleton o spinner) durante la transición
5. No estoy seguro — muéstrame cómo los design systems manejan el estado de carga en tabs
