
// ============================================
// 🏠 APP.JS — Página de inicio
// ============================================

const isGitHub = location.hostname.includes('github.io');
let DATA_URL = 'data.json';
let GITHUB_USER = '';
let GITHUB_REPO = '';

if (isGitHub) {
  const parts = location.pathname.split('/').filter(Boolean);
  GITHUB_REPO = parts[0] || '';
  GITHUB_USER = location.hostname.split('.')[0];
  DATA_URL = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main/data.json`;
}

let catalogo = [];

// Cargar datos
async function cargarDatos() {
  try {
    const res = await fetch(DATA_URL + '?t=' + Date.now()); // evitar cache
    if (!res.ok) throw new Error('No se pudo cargar data.json');
    catalogo = await res.json();
    if (!Array.isArray(catalogo)) catalogo = [];
    renderizarTodo();
  } catch (e) {
    mostrarToast('Error cargando catálogo: ' + e.message, 'error');
    console.error(e);
  }
}

// Iconos
const iconos = { pelicula:'🎬', serie:'📺', novela:'📖', documental:'🌍' };

// Estrellas
function estrellas(n) {
  n = Math.max(0, Math.min(5, parseInt(n)||0));
  return '⭐'.repeat(n) + '☆'.repeat(5-n);
}

// URL amigable para detalle
function linkDetalle(id) {
  return `detail.html?id=${id}`;
}

// Crear tarjeta
function tarjetaHTML(item) {
  const img = item.imagen
    ? `<img class="poster" src="${item.imagen}" alt="${item.titulo}" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'poster-placeholder\\'>${iconos[item.tipo]||'🎬'}</div>'">`
    : `<div class="poster-placeholder">${iconos[item.tipo]||'🎬'}</div>`;

  const generos = (item.generos||[]).slice(0,3).join(' • ');

  return `
    <a href="${linkDetalle(item.id)}" class="tarjeta">
      ${img}
      <div class="info">
        <h3>${item.titulo}</h3>
        <div class="meta">${iconos[item.tipo]||'🎬'} ${item.tipo} • ${item.año}</div>
        <div class="estrellas">${estrellas(item.calificacion)}</div>
        <div class="meta" style="margin-top:4px; font-size:.7rem;">${generos}</div>
      </div>
    </a>
  `;
}

// Renderizar hero (destacados)
function renderizarHero() {
  const destacados = catalogo.filter(x => x.destacado);
  if (!destacados.length) {
    document.getElementById('heroSection').style.display = 'none';
    return;
  }
  const hero = destacados[0];
  const bg = hero.imagen || '';

  document.getElementById('heroSection').innerHTML = `
    <div class="hero">
      <div class="hero-bg" style="background-image:url('${bg}')"></div>
      <div class="hero-content">
        <span class="tag">${iconos[hero.tipo]||'🎬'} ${hero.tipo.toUpperCase()}</span>
        <h1>${hero.titulo}</h1>
        <p>${hero.sinopsis}</p>
        <div class="hero-buttons">
          <a href="${linkDetalle(hero.id)}" class="btn btn-primary">▶ Reproducir / Ver detalle</a>
          <a href="${linkDetalle(hero.id)}" class="btn btn-secondary">ℹ️ Más info</a>
        </div>
      </div>
    </div>
  `;
}

// Renderizar secciones por tipo
function renderizarSecciones(items) {
  const tipos = ['pelicula','serie','novela','documental'];
  const nombres = { pelicula:'Películas', serie:'Series', novela:'Novelas', documental:'Documentales' };
  let html = '';

  tipos.forEach(tipo => {
    const deTipo = items.filter(x => x.tipo === tipo);
    if (!deTipo.length) return;
    html += `
      <h2 class="section-title">${iconos[tipo]||'🎬'} ${nombres[tipo]}</h2>
      <div class="galeria">${deTipo.map(tarjetaHTML).join('')}</div>
    `;
  });

  // Si hay filtro activo y no hay secciones, mostrar galería plana
  if (!html) {
    html = `<div class="galeria">${items.map(tarjetaHTML).join('')}</div>`;
  }

  document.getElementById('contenidoDinamico').innerHTML = html;
}

// Filtrar y ordenar
function obtenerFiltrados() {
  let items = [...catalogo];
  const texto = document.getElementById('buscador').value.toLowerCase().trim();
  const tipo = document.getElementById('filtroTipo').value;
  const genero = document.getElementById('filtroGenero').value;
  const orden = document.getElementById('filtroOrden').value;

  // URL params (para links directos)
  const params = new URLSearchParams(location.search);
  const tipoParam = params.get('tipo');
  if (tipoParam && !document.getElementById('filtroTipo').dataset.manual) {
    document.getElementById('filtroTipo').value = tipoParam;
  }

  if (texto) {
    items = items.filter(x =>
      (x.titulo||'').toLowerCase().includes(texto) ||
      (x.sinopsis||'').toLowerCase().includes(texto)
    );
  }
  if (tipo !== 'todos') items = items.filter(x => x.tipo === tipo);
  if (genero !== 'todos') items = items.filter(x => (x.generos||[]).includes(genero));

  // Orden
  if (orden === 'reciente') items.sort((a,b) => (b.año||0) - (a.año||0));
  if (orden === 'antiguo') items.sort((a,b) => (a.año||0) - (b.año||0));
  if (orden === 'mejor') items.sort((a,b) => (b.calificacion||0) - (a.calificacion||0));
  if (orden === 'az') items.sort((a,b) => (a.titulo||'').localeCompare(b.titulo||''));

  return items;
}

function renderizarTodo() {
  renderizarHero();
  renderizarSecciones(obtenerFiltrados());
}

// Event listeners
['buscador','filtroTipo','filtroGenero','filtroOrden'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener(id==='buscador'?'input':'change', () => {
      if (id==='filtroTipo') el.dataset.manual = 'true';
      renderizarSecciones(obtenerFiltrados());
    });
  }
});

// Toast
function mostrarToast(msg, tipo='success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + tipo;
  setTimeout(() => t.classList.remove('show'), 3500);
}

// Iniciar
cargarDatos();
