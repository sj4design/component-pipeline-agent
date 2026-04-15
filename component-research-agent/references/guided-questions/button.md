---
component: button
questions: 4
---

# Guided Questions — Button

---

## Pregunta 1: Jerarquías y variantes necesarias
**(puedes elegir VARIAS, sepáralas con coma)**

¿Qué niveles de jerarquía visual necesitas en tu sistema de botones?

1. **Primary** — la acción más importante de la página (ej: "Guardar", "Confirmar compra") — usualmente solo uno por vista
2. **Secondary** — acción alternativa o complementaria (ej: "Cancelar", "Ver más detalles")
3. **Tertiary / Ghost** — acción de baja jerarquía, casi sin estilo (ej: "Saltar paso", "Limpiar filtros")
4. **Destructive / Danger** — acciones irreversibles o de alto riesgo (ej: "Eliminar cuenta", "Descartar cambios")
5. **Link-button** — visualmente parece un link pero semánticamente es un botón (ej: acciones inline en texto)
6. Todos los anteriores (sistema completo de jerarquías)
7. No estoy seguro — muéstrame cómo los sistemas definen las jerarquías y cuántas son necesarias

---

## Pregunta 2: Uso de iconos
**(elige UNA opción)**

¿Cómo se usan los iconos en los botones?

1. **Nunca llevan ícono** — solo texto
2. **Ícono + texto** — el ícono acompaña al label para reforzar el significado (ej: "✉ Enviar", "🗑 Eliminar")
3. **Solo ícono (icon-only)** — el botón muestra únicamente un ícono, sin texto visible (ej: botones de toolbar, FAB)
4. **Ambos** — algunos botones son ícono+texto y otros son icon-only según el contexto

**Nota adaptativa:** Si eliges 3 o 4 (icon-only), el research enfatizará los requerimientos de `aria-label` y tooltip para accesibilidad — cada sistema resuelve esto diferente.

---

## Pregunta 3: Tamaños necesarios
**(puedes elegir VARIAS, sepáralas con coma)**

¿Qué tamaños de botón necesitas?

1. **Small** — botones compactos para interfaces densas, tablas, chips (altura ~28-32px)
2. **Medium** — tamaño estándar para la mayoría de formularios e interfaces (altura ~36-40px)
3. **Large** — botones prominentes para CTAs en landing pages o onboarding (altura ~44-48px)
4. **Full-width** — el botón se expande para ocupar todo el ancho disponible (ej: formularios mobile, cards)
5. Un solo tamaño es suficiente para mi caso

---

## Pregunta 4: Estados especiales
**(puedes elegir VARIAS, sepáralas con coma)**

¿El botón necesita estados especiales más allá de hover/focus/disabled?

1. **Loading / Spinner** — mientras se procesa una acción async, el botón muestra un spinner y se bloquea (ej: submit de formulario)
2. **Success / Error** — el botón cambia visualmente al completarse la acción (ej: ✓ verde o ✗ rojo momentáneo)
3. **Selected / Active** — el botón puede tener estado "activo" de forma persistente (ej: botón de toggle, filtro activo)
4. **Count / Badge** — muestra un número sobre el botón (ej: notificaciones pendientes, items en carrito)
5. **Ninguno de los anteriores** — los estados estándar (hover, focus, disabled) son suficientes
6. No estoy seguro — muéstrame qué estados manejan los design systems por defecto

**Nota adaptativa:** Si eliges 3 (Selected/Active), esto sugiere que el componente podría ser un ToggleButton — el research cubrirá cómo los sistemas distinguen Button de ToggleButton y cuándo usar cada uno.
