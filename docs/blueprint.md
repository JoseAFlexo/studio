# **App Name**: INDUX File Explorer

## Core Features:

- Folder Sidebar: Display a sidebar with folder sections (Maintenance, Safety & Health, Spares, Technical Documentation, Procedures, Others) each with a corresponding icon.
- File Listing: Implement a file listing in the main panel, displaying file icons and names. Include quick action icons (open, download, rename, delete) for each file.
- File Preview: Create a file preview modal that supports zooming, panning, and closing. Handle PDF and image files, and use a placeholder for unsupported formats.
- Real-time Search: Add a search bar to filter files in real-time by name.

## Style Guidelines:

- Accent color: `#4ade80` (green) for active icons and actions.
- General Background: `#0f172a` (dark).
- Sidebar Background: `#1e293b`.
- File Cards: `#334155`.
- Soft Borders: `#475569`.
- Main Text: `#f1f5f9` (light).
- Secondary Text: `#cbd5e1`.
- Hover/Active State: `#4b5563`.
- Delete Action: `#ef4444` (red).
- Use distinct icons for each file type and action (e.g., document icon for files, download icon for downloads).
- Responsive and touch-friendly design optimized for HMI panels.
- Highlight selected folders and files to indicate active selection.

## Original User Request:
¡Perfecto! Aquí tienes el **prompt completo y actualizado desde cero**, listo para Firebase Studio o una IA generadora, con **todos los detalles de diseño, funcionalidades y estilo visual tipo INDUX OS**.

---

## ✅ Prompt para generar el nuevo explorador de archivos de INDUX OS

> Crea un **Explorador de Archivos Industrial** para el sistema INDUX OS.  
> Este módulo debe permitir al operario gestionar y visualizar archivos técnicos asociados a secciones como mantenimiento, recambios, seguridad, etc., desde una interfaz moderna y táctil optimizada para entorno HMI/SCADA.

---

### 🗂️ Estructura de carpetas (con iconos integrados):

Las secciones deben mostrarse en una barra lateral tipo sidebar, cada una con su icono al principio:

| Carpeta/Sección            | Icono sugerido |
|----------------------------|----------------|
| Maintenance                | 🧰             |
| Safety & Health            | 🛡️             |
| Spares                     | 🔩             |
| Technical Documentation    | 📄             |
| Procedures                 | 📋             |
| Others                     | 📁             |

- Al seleccionar una carpeta, se muestran los archivos asociados en el panel derecho.

---

### 🧠 Funcionalidades principales:

#### 📁 Explorador de archivos:
- Sidebar con las carpetas anteriores (visualmente diferenciadas y seleccionables)
- Buscador superior (`Search files...`)
- Listado de archivos con ícono (`📄`) y nombre
- Icono ⚙️ de acciones rápidas por archivo: abrir, descargar, renombrar, eliminar
- Hover sobre archivo muestra herramientas rápidas (👁️, ⬇️)

#### 📄 Vista previa de archivo:
- Cuando se selecciona un archivo, se abre una **ventana flotante de vista previa (modal o panel derecho)** con:
  - Nombre del archivo
  - Herramientas básicas:
    - 🔍 Zoom In / Out
    - ✋ Pan (mover documento)
    - ❌ Botón para **cerrar la vista previa**
  - Área central donde se muestra el contenido (PDF, imagen o placeholder)

---

### 💄 Estilo visual (Indux OS / Gris Onyx):

#### 🎨 Colores base:

| Elemento                        | Color HEX     |
|--------------------------------|---------------|
| Fondo general                  | `#0f172a`     |
| Fondo sidebar                  | `#1e293b`     |
| Tarjetas de archivo            | `#334155`     |
| Bordes suaves                  | `#475569`     |
| Texto principal                | `#f1f5f9`     |
| Texto secundario               | `#cbd5e1`     |
| Hover (activo)                 | `#4b5563`     |
| Íconos activos / acción        | `#4ade80`     |
| Rojo para eliminar             | `#ef4444`     |

---

### 🧩 UX y detalles adicionales:

- Toda la interfaz debe ser **responsive y táctil**, pensada para paneles HMI
- Las carpetas deben resaltarse al seleccionarse
- El archivo activo debe mostrarse como tarjeta o fila seleccionada
- La búsqueda debe filtrar en tiempo real por nombre
- Mostrar tamaño del archivo y fecha opcional debajo del nombre
- Permitir descarga con un solo clic en ⬇️
- La vista previa debe tener un botón de cerrar en la esquina (❌ o `Close`)

---

### ⚙️ Tecnologías recomendadas:
- React + TailwindCSS
- Componente tipo `FileExplorer.tsx` o `FileManager.tsx`
- Modular y fácil de extender (soporte futuro para roles, permisos, tags, etc.)

---

¿Quieres que ahora te prepare directamente el `FileExplorer.tsx` con esta lógica visual en React para que lo subas al proyecto de Indux OS? Te puedo dar el layout base con la ventana de vista previa incluida.
  