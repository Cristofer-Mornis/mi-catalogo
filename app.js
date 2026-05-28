// ============================================
// ⚙️ LÓGICA DE LA WEB - No necesitas tocar esto
// ============================================
// Este archivo hace que todo funcione:
// - Muestra las tarjetas
// - Filtra por tipo, género y búsqueda
// - Actualiza el contador
// ============================================

const galeria = document.getElementById('galeria');
const buscador = document.getElementById('buscador');
const filtroTipo = document.getElementById('filtroTipo');
const filtroGenero = document.getElementById('filtroGenero');
const contador = document.getElementById('contador');

// Iconos según tipo
const iconosTipo = {
    pelicula: '🎬',
    serie: '📺',
    novela: '📖',
    documental: '🌍'
};

// Función para crear estrellas
function crearEstrellas(n) {
    return '⭐'.repeat(n) + '☆'.repeat(5 - n);
}

// Función para renderizar una tarjeta
function crearTarjeta(item) {
    const div = document.createElement('div');
    div.className = 'tarjeta';

    // Imagen o placeholder
    let imagenHTML = '';
    if (item.imagen && item.imagen.trim() !== '') {
        imagenHTML = `<img src="${item.imagen}" alt="${item.titulo}" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\'sin-imagen\'>${iconosTipo[item.tipo] || '🎬'}</div>'">`;
    } else {
        imagenHTML = `<div class="sin-imagen">${iconosTipo[item.tipo] || '🎬'}</div>`;
    }

    // Géneros como tags
    const generosHTML = item.generos.map(g => `<span class="genero-tag">${g}</span>`).join('');

    div.innerHTML = `
        <div class="imagen-container">
            ${imagenHTML}
        </div>
        <div class="info">
            <span class="tipo ${item.tipo}">${iconosTipo[item.tipo] || '🎬'} ${item.tipo}</span>
            <h3>${item.titulo}</h3>
            <div class="año">📅 ${item.año}</div>
            <div class="generos">${generosHTML}</div>
            <div class="sinopsis">${item.sinopsis}</div>
            <div class="calificacion">${crearEstrellas(item.calificacion || 0)}</div>
        </div>
    `;

    return div;
}

// Función principal de renderizado
function renderizar(items) {
    galeria.innerHTML = '';

    if (items.length === 0) {
        galeria.innerHTML = `
            <div class="sin-resultados">
                <h2>😕 No encontré nada</h2>
                <p>Prueba con otros filtros o términos de búsqueda.</p>
            </div>
        `;
        contador.textContent = 'Mostrando 0 títulos';
        return;
    }

    items.forEach(item => {
        galeria.appendChild(crearTarjeta(item));
    });

    contador.textContent = `Mostrando ${items.length} título${items.length !== 1 ? 's' : ''}`;
}

// Función de filtrado
function filtrar() {
    const texto = buscador.value.toLowerCase().trim();
    const tipo = filtroTipo.value;
    const genero = filtroGenero.value;

    const filtrados = catalogo.filter(item => {
        // Filtro por texto (título o sinopsis)
        const coincideTexto = item.titulo.toLowerCase().includes(texto) || 
                              item.sinopsis.toLowerCase().includes(texto);

        // Filtro por tipo
        const coincideTipo = tipo === 'todos' || item.tipo === tipo;

        // Filtro por género
        const coincideGenero = genero === 'todos' || item.generos.includes(genero);

        return coincideTexto && coincideTipo && coincideGenero;
    });

    renderizar(filtrados);
}

// Resetear filtros
function resetFiltros() {
    buscador.value = '';
    filtroTipo.value = 'todos';
    filtroGenero.value = 'todos';
    filtrar();
}

// Event listeners
buscador.addEventListener('input', filtrar);
filtroTipo.addEventListener('change', filtrar);
filtroGenero.addEventListener('change', filtrar);

// Render inicial
document.addEventListener('DOMContentLoaded', () => {
    renderizar(catalogo);
});
