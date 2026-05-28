
// ============================================
// 🔍 DETAIL.JS — Página de detalle individual
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

const params = new URLSearchParams(location.search);
const itemId = parseInt(params.get('id'));

const iconos = { pelicula:'🎬', serie:'📺', novela:'📖', documental:'🌍' };

function estrellas(n) {
  n = Math.max(0, Math.min(5, parseInt(n)||0));
  return '⭐'.repeat(n) + '☆'.repeat(5-n);
}

// Convertir URL YouTube a embed
function youtubeEmbed(url) {
  if (!url) return '';
  // youtu.be/XXXX
  let m = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0`;
  // youtube.com/watch?v=XXXX
  m = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0`;
  // youtube.com/embed/XXXX
  m = url.match(/embed\/([a-zA-Z0-9_-]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0`;
  return '';
}

async function cargarDetalle() {
  try {
    const res = await fetch(DATA_URL + '?t=' + Date.now());
    if (!res.ok) throw new Error('No se pudo cargar');
    const catalogo = await res.json();
    const item = catalogo.find(x => x.id === itemId);

    if (!item) {
      document.getElementById('detalleContainer').innerHTML = `
        <div style="text-align:center; padding:80px 20px;">
          <h2 style="font-size:2rem; margin-bottom:12px;">😕 No encontrado</h2>
          <p style="color:#888;">Este contenido no existe en el catálogo.</p>
          <a href="index.html" class="btn btn-primary" style="margin-top:20px;">← Volver al inicio</a>
        </div>`;
      return;
    }

    // Renderizar hero de detalle
    const bg = item.imagen || '';
    const embed = youtubeEmbed(item.trailer);
    const generos = (item.generos||[]).map(g => `<span class="pill">${g}</span>`).join('');

    document.getElementById('detalleContainer').innerHTML = `
      <div class="detalle-hero">
        <div class="bg" style="background-image:url('${bg}')"></div>
        <div class="detalle-content">
          <span class="tag" style="display:inline-block; margin-bottom:12px;">${iconos[item.tipo]||'🎬'} ${item.tipo.toUpperCase()}</span>
          <h1>${item.titulo}</h1>
          <div class="detalle-meta">
            <span class="match">${estrellas(item.calificacion)}</span>
            <span>${item.año}</span>
            <span class="pill">HD</span>
            ${generos}
          </div>
          <p class="detalle-sinopsis">${item.sinopsis}</p>
          <div class="hero-buttons" style="margin-bottom:30px;">
            ${embed ? `<button class="btn btn-primary" onclick="document.getElementById('trailerBox').scrollIntoView({behavior:'smooth'})">▶ Ver trailer</button>` : ''}
            <a href="index.html" class="btn btn-secondary">← Volver</a>
          </div>
        </div>
      </div>

      <section style="padding-top:0">
        <h2 class="section-title">🎬 Trailer</h2>
        <div class="trailer-box" id="trailerBox">
          ${embed
            ? `<iframe src="${embed}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            : `<div class="no-trailer">🚫 No hay trailer disponible</div>`
          }
        </div>
      </section>
    `;

    // Relacionados (mismo tipo o género)
    const relacionados = catalogo.filter(x =>
      x.id !== item.id && (
        x.tipo === item.tipo ||
        (x.generos||[]).some(g => (item.generos||[]).includes(g))
      )
    ).slice(0, 6);

    const relContainer = document.getElementById('relacionados');
    if (relacionados.length) {
      relContainer.innerHTML = relacionados.map(r => {
        const img = r.imagen
          ? `<img class="poster" src="${r.imagen}" alt="${r.titulo}" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'poster-placeholder\\'>${iconos[r.tipo]||'🎬'}</div>'">`
          : `<div class="poster-placeholder">${iconos[r.tipo]||'🎬'}</div>`;
        return `
          <a href="detail.html?id=${r.id}" class="tarjeta">
            ${img}
            <div class="info">
              <h3>${r.titulo}</h3>
              <div class="meta">${iconos[r.tipo]||'🎬'} ${r.tipo} • ${r.año}</div>
            </div>
          </a>
        `;
      }).join('');
    } else {
      relContainer.innerHTML = '<p style="color:#888; grid-column:1/-1;">No hay recomendaciones disponibles.</p>';
    }

  } catch (e) {
    document.getElementById('detalleContainer').innerHTML = `
      <div style="text-align:center; padding:80px 20px;">
        <h2 style="font-size:2rem; margin-bottom:12px;">⚠️ Error</h2>
        <p style="color:#888;">${e.message}</p>
        <a href="index.html" class="btn btn-primary" style="margin-top:20px;">← Volver al inicio</a>
      </div>`;
  }
}

cargarDetalle();
