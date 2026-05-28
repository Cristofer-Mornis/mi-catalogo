========================================
📦 MI CATÁLOGO AUDIOVISUAL PROFESIONAL v2.0
========================================

🎬 ¿QUÉ INCLUYE ESTE PAQUETE?
========================================

✅ Página de inicio tipo Netflix (carruseles, hero banner)
✅ Página de detalle individual por cada película/serie/novela
✅ Trailer de YouTube embebido (se reproduce dentro de tu web)
✅ Panel de administración con LOGIN
✅ Agregar, editar y eliminar contenido visualmente desde la web
✅ Filtros por tipo, género, año, calificación, búsqueda
✅ Diseño 100% responsive (celular y PC)
✅ Todo 100% GRATIS usando GitHub Pages

ARCHIVOS:
├── index.html      → Página principal (home)
├── detail.html     → Página de detalle individual
├── admin.html      → Panel de administración (login + CRUD)
├── style.css       → Diseño profesional tipo Netflix
├── app.js          → Lógica del home
├── detail.js       → Lógica de la página de detalle
├── admin.js        → Lógica del panel admin (GitHub API)
├── data.json       → Tu catálogo (base de datos)
└── README.txt      → Esta guía

========================================
🚀 PASO 1: SUBIR A GITHUB PAGES
========================================

1. Ve a https://github.com y crea una cuenta (gratis)
2. Clic en el botón verde "New" → "New repository"
3. Nombre del repositorio: mi-catalogo (o el que quieras)
4. Selecciona "Public" (público)
5. ✅ Marca "Add a README file"
6. Clic en "Create repository"

7. Dentro del repositorio, clic en "Add file" → "Upload files"
8. Arrastra TODOS los archivos de este paquete:
   index.html, detail.html, admin.html, style.css,
   app.js, detail.js, admin.js, data.json
9. Escribe un mensaje: "Subo catálogo v2"
10. Clic en "Commit changes"

11. Ve a "Settings" (pestaña arriba a la derecha)
12. En el menú lateral izquierdo, busca "Pages"
13. En "Source", selecciona "Deploy from a branch"
14. En "Branch", elige "main" y carpeta "/ (root)"
15. Clic en "Save"

16. Espera 1-5 minutos
17. Tu catálogo estará en:
    https://TUUSUARIO.github.io/mi-catalogo

========================================
🔑 PASO 2: CREAR TOKEN DE GITHUB (para el panel admin)
========================================

El panel admin necesita un "token" para guardar cambios
automáticamente en tu repositorio. Es gratis y seguro.

1. En GitHub, clic en tu foto de perfil (arriba a la derecha)
2. Ve a "Settings"
3. En el menú lateral IZQUIERDO, al final, busca:
   "Developer settings"
4. Clic en "Personal access tokens" → "Tokens (classic)"
5. Clic en "Generate new token (classic)"
6. GitHub te pedirá tu contraseña, ingrésala
7. En "Note" escribe: "Catálogo Admin"
8. En "Expiration" selecciona "No expiration" (o la fecha que quieras)
9. ✅ Marca el permiso "repo" (acceso completo a repositorios)
10. Baja hasta abajo y clic en "Generate token"
11. ⚠️ COPIA EL TOKEN AHORA (es como una contraseña larga)
    Se ve algo así: ghp_xxxxxxxxxxxxxxxxxxxx
    GitHub solo te lo muestra UNA VEZ.

12. Ve a tu catálogo web: https://TUUSUARIO.github.io/mi-catalogo/admin.html
13. Pega el token en el campo "Token de acceso personal"
14. Clic en "Conectar"
15. ¡Listo! Ya puedes agregar, editar y eliminar contenido.

⚠️ IMPORTANTE: El token se guarda SOLO en tu navegador.
Nadie más lo ve. Si cambias de navegador o borras datos,
tendrás que ingresarlo de nuevo.

========================================
📝 PASO 3: USAR EL PANEL ADMIN
========================================

AGREGAR NUEVO CONTENIDO:
1. Ve a admin.html
2. Clic en "➕ Agregar nuevo"
3. Llena los campos:
   - Título: nombre de la película/serie/novela
   - Tipo: película, serie, novela o documental
   - Año: año de lanzamiento
   - Calificación: 1 a 5 estrellas
   - Géneros: selecciona al menos uno
   - URL de imagen: link del poster (puedes buscar en themoviedb.org)
   - URL del trailer: pega el link completo de YouTube
   - Sinopsis: descripción breve
   - Destacado: marca si quieres que aparezca en el banner principal
4. Clic en "💾 Guardar"
5. Espera 2-3 minutos y recarga tu web

EDITAR O ELIMINAR:
- En la lista de tu catálogo, clic en "✏️ Editar" o "🗑️ Eliminar"

========================================
🎞️ CÓMO PONER TRAILERS DE YOUTUBE
========================================

Solo pega el link COMPLETO de YouTube en el campo "URL del trailer".

✅ Links que funcionan:
• https://www.youtube.com/watch?v=ABCDEF123
• https://youtu.be/ABCDEF123
• https://www.youtube.com/embed/ABCDEF123

El sistema lo convierte automáticamente a formato embebido.
El trailer se reproduce DENTRO de tu web, sin salir de ella.

========================================
🖼️ CÓMO PONER IMÁGENES (POSTERS)
========================================

OPCIÓN A — Imagen de internet (recomendado):
Busca el poster en:
• https://www.themoviedb.org (TMDB)
• https://www.imdb.com
• https://www.filmaffinity.com

Copia la URL de la imagen y pégala en el campo "URL de la imagen".

Ejemplo de URL válida:
https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg

OPCIÓN B — Sin imagen:
Deja el campo vacío. Aparecerá un icono automático según el tipo.

========================================
🔄 CÓMO ACTUALIZAR TU CATÁLOGO
========================================

MÉTODO 1 (recomendado) — Desde la web:
1. Ve a admin.html
2. Agrega, edita o elimina lo que quieras
3. Clic en guardar
4. Espera 1-3 minutos
5. Recarga tu web principal

MÉTODO 2 — Editando data.json directo:
1. En GitHub, busca el archivo "data.json"
2. Clic en el lápiz (Edit this file)
3. Modifica el JSON directamente
4. Clic en "Commit changes"
5. Espera 1 minuto y recarga

========================================
📱 COMPARTIR TU CATÁLOGO
========================================

Tu link público es:
https://TUUSUARIO.github.io/mi-catalogo

Compártelo por WhatsApp, Telegram, Instagram, email...
Se ve perfecto en celular y computadora.

Cada película/serie tiene su propia página de detalle:
https://TUUSUARIO.github.io/mi-catalogo/detail.html?id=1

========================================
❓ SOLUCIÓN DE PROBLEMAS
========================================

• "Error cargando catálogo":
  Espera 2-3 minutos después de subir data.json.
  GitHub Pages tarda en actualizarse.

• "Error guardando":
  Revisa que tu token tenga el permiso "repo" marcado.
  Revisa que el repositorio sea PÚBLICO.

• Las imágenes no se ven:
  La URL debe terminar en .jpg, .png, .webp, etc.
  Algunas webs bloquean imágenes externas. Usa TMDB.

• El trailer no se reproduce:
  Asegúrate de pegar el link COMPLETO de YouTube,
  no solo el código del video.

========================================
🎉 ¡DISFRUTA TU CATÁLOGO PROFESIONAL!
========================================
