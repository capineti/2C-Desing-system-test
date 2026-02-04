# 🎨 Guía de Setup Inicial de Figma

Esta guía te ayudará a preparar el archivo de Figma (`Design System.fig`) para que esté listo para recibir diseños, siguiendo la estructura definida en el Máster Plan.

---

## 🚀 Paso 1: Crear el Archivo

1. Crea un nuevo **Design File** en Figma.
2. Nómbralo: `[Producto] Design System`.

## 📂 Paso 2: Crear las Páginas

Elimina la "Page 1" por defecto y crea la siguiente estructura de páginas (copia y pega los nombres con emojis para mejor organización visual):

### 1. ⬥ Cover
**Contenido:**
- Un frame grande (1920x960) como portada (thumbnail).
- Título del Sistema y Estado.

### 2. 📖 00 - Overview
**Propósito:** Manual de instrucciones y visión global.
**Contenido:**
- **Design Principles:** (Clarity, Accessibility first, etc.)
- **Accessibility Rules:** (WCAG Compliance, Contrast strategy).
- **Naming Conventions:** Chuleta de cómo nombrar tokens y capas.
- **Theming:** Estrategia de modo claro/oscuro.

### 3. 🎨 01 - Foundations
**Propósito:** Definición visual base.
**Frames a crear dentro:**
*Organiza esta página en secciones horizontales.*
- **Colors**: Primitives (paleta completa) y Semantic (variables aplicadas).
- **Typography**: Escala tipográfica y estilos de texto.
- **Spacing**: Escala de espaciado (cubos de 4px, 8px, etc.).
- **Radius & Shadows**: Ejemplos visuales.
- **Iconography**: Set base de iconos (o link a librería externa).

### 3. 🧩 02 - Components
**Propósito:** Biblioteca de componentes reutilizables.
**Frames a crear dentro:**
- **Atoms**: Buttons, Inputs, Labels, Badges.
- **Molecules**: Search bars, Form groups, Cards.
- **Organisms**: Navbars, Footers, Modals.

*Tip: Usa "Sections" de Figma para agrupar Atoms, Molecules y Organisms.*

### 4. ✏️ 03 - Draft (UX Pilot)
**Propósito:** Zona de aterrizaje para la IA y experimentación.
**Reglas:**
- Aquí es donde ejecutas **UX Pilot**.
- Espacio sucio para iterar y probar ideas.
- Nada de lo que hay aquí se programa directamente.

### 5. 📐 04 - Layouts
**Propósito:** Estructuras y plantillas limpias.
**Contenido:**
- Grid layouts (Desktop 12 col, Tablet 8 col, Mobile 4 col).
- Plantillas vacías extraídas de drafts exitosos.

### 6. 📱 05 - Screens
**Propósito:** Diseños finales de producción.
**Organización:**
- Organiza por **Flujos** de usuario.
- Usa **Secciones (Shift + S)** para agrupar versión Desktop y Mobile.
- **Solo entra aquí lo que tiene Tokens aplicados y componentes finales.**

---

## ⚡️ Paso 3: Importar Tokens (La Magia)

Para no crear las variables manualmente una por una:

1. Instala/Abre el plugin **Tokens Studio for Figma**.
2. Ve a la pestaña **Tools** > **Load from file/folder** (o JSON).
3. Importa el archivo `initial_tokens.json` que hemos generado.
4. Selecciona los sets (Global, Primitives, Semantic).
5. Dale a **"Create Styles/Variables"**.

¡Listo! ✨ Ahora tendrás tus colecciones de variables creadas automáticamente en Figma sin haber tecleado ni una sola manualmente.
