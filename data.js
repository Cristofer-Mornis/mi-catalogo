// ============================================
// 📂 ARCHIVO DE DATOS - Aquí agregas tu contenido
// ============================================
// 
// Para agregar una nueva película, serie o novela:
// 1. Copia una de las entradas de abajo (desde { hasta },)
// 2. Pégala después de la última entrada
// 3. Cambia los datos: título, tipo, géneros, año, sinopsis, imagen
//
// IMPORTANTE: La última entrada NO lleva coma al final.
// Las demás SÍ llevan coma después del }.
//
// Para la imagen puedes usar:
// - Una URL de internet: "https://ejemplo.com/imagen.jpg"
// - Una imagen local: "imagenes/mi-pelicula.jpg"
// - Dejar vacío: "" (se mostrará un icono por defecto)
// ============================================

const catalogo = [
    {
        id: 1,
        titulo: "El Padrino",
        tipo: "pelicula",
        generos: ["Drama", "Crimen"],
        año: 1972,
        sinopsis: "La historia de la familia Corleone, una de las más poderosas del crimen organizado en Nueva York, liderada por el patriarca Vito Corleone.",
        imagen: "",
        calificacion: 5
    },
    {
        id: 2,
        titulo: "Stranger Things",
        tipo: "serie",
        generos: ["Ciencia Ficción", "Terror", "Drama"],
        año: 2016,
        sinopsis: "En los años 80, en un pequeño pueblo de Indiana, un niño desaparece misteriosamente. Sus amigos, una policía y su madre buscan respuestas mientras descubren secretos del gobierno.",
        imagen: "",
        calificacion: 4
    },
    {
        id: 3,
        titulo: "Café con Aroma de Mujer",
        tipo: "novela",
        generos: ["Romance", "Drama"],
        año: 2021,
        sinopsis: "Gaviota, una recolectora de café, sueña con cambiar su destino. Su vida da un giro cuando conoce a Sebastián, heredero de una importante empresa cafetera.",
        imagen: "",
        calificacion: 4
    },
    {
        id: 4,
        titulo: "El Señor de los Anillos: La Comunidad del Anillo",
        tipo: "pelicula",
        generos: ["Aventura", "Fantasía", "Acción"],
        año: 2001,
        sinopsis: "Un hobbit llamado Frodo hereda un anillo mágico que podría destruir la Tierra Media. Debe emprender un viaje épico para destruirlo en el Monte del Destino.",
        imagen: "",
        calificacion: 5
    },
    {
        id: 5,
        titulo: "Breaking Bad",
        tipo: "serie",
        generos: ["Drama", "Crimen", "Thriller"],
        año: 2008,
        sinopsis: "Walter White, un profesor de química con cáncer terminal, decide fabricar metanfetamina para asegurar el futuro de su familia, transformándose en un peligroso narcotraficante.",
        imagen: "",
        calificacion: 5
    },
    {
        id: 6,
        titulo: "Yo Soy Betty, la Fea",
        tipo: "novela",
        generos: ["Comedia", "Romance", "Drama"],
        año: 1999,
        sinopsis: "Beatriz Pinzón Solano, una economista inteligente pero poco agraciada, logra trabajo en una importante empresa de moda donde enfrenta el prejuicio por su apariencia.",
        imagen: "",
        calificacion: 5
    },
    {
        id: 7,
        titulo: "Planeta Tierra",
        tipo: "documental",
        generos: ["Naturaleza", "Documental"],
        año: 2006,
        sinopsis: "Una serie documental que explora los ecosistemas más impresionantes del planeta, mostrando la vida salvaje en su máxima expresión con imágenes espectaculares.",
        imagen: "",
        calificacion: 5
    },
    {
        id: 8,
        titulo: "Dune",
        tipo: "pelicula",
        generos: ["Ciencia Ficción", "Aventura", "Drama"],
        año: 2021,
        sinopsis: "Paul Atreides, un joven brillante, debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.",
        imagen: "",
        calificacion: 4
    }
];
