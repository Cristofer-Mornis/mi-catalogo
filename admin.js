
// ============================================
// ⚙️ ADMIN.JS — Panel de administración
// ============================================

const isGitHub = location.hostname.includes('github.io');
let DATA_URL = 'data.json';
let API_URL = '';
let GITHUB_USER = '';
let GITHUB_REPO = '';

if (isGitHub) {
  const parts = location.pathname.split('/').filter(Boolean);
  GITHUB_REPO = parts[0] || '';
  GITHUB_USER = location.hostname.split('.')[0];
  DATA_URL = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main/data.json`;
  API_URL = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/data.json`;
} else {
  // Local: no hay API, solo simulación
  API_URL = '';
}

let token = localStorage.getItem('gh_token') || '';
let catalogo = [];
let shaActual = ''; // SHA de data.json para commits

const iconos = { pelicula:'🎬', serie:'📺', novela:'📖', documental:'🌍' };

// ---------- UTILIDADES ----------
function mostrarToast(msg, tipo='success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + tipo;
  setTimeout(() => t.classList.remove('show'), 3500);
}

function youtubeEmbed(url) {
  if (!url) return '';
  let m = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0`;
  m = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0`;
  m = url.match(/embed\/([a-zA-Z0-9_-]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0`;
  return url; // si ya es embed o no reconocido, devolver tal cual
}

// ---------- AUTH ----------
function guardarToken() {
  const val = document.getElementById('githubToken').value.trim();
  if (!val) { mostrarToast('Ingresa un token válido', 'error'); return; }
  token = val;
  localStorage.setItem('gh_token', token);
  verificarToken();
}

function cerrarSesion() {
  token = '';
  localStorage.removeItem('gh_token');
  document.getElementById('loginBox').classList.remove('hidden');
  document.getElementById('crudPanel').classList.add('hidden');
  mostrarToast('Sesión cerrada');
}

async function verificarToken() {
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: { 'Authorization': 'token ' + token }
    });
    if (!res.ok) throw new Error('Token inválido');
    const user = await res.json();
    document.getElementById('loginBox').classList.add('hidden');
    document.getElementById('crudPanel').classList.remove('hidden');
    document.getElementById('userStatus').textContent = `✅ Conectado como ${user.login}`;
    mostrarToast('Conectado correctamente');
    await cargarCatalogoAdmin();
  } catch (e) {
    mostrarToast('Token inválido o sin permisos: ' + e.message, 'error');
    cerrarSesion();
  }
}

// ---------- CARGAR CATÁLOGO ----------
async function cargarCatalogoAdmin() {
  try {
    const res = await fetch(DATA_URL + '?t=' + Date.now());
    if (!res.ok) throw new Error('No se pudo cargar');
    catalogo = await res.json();
    if (!Array.isArray(catalogo)) catalogo = [];
    renderizarListaAdmin();
  } catch (e) {
    mostrarToast('Error cargando catálogo: ' + e.message, 'error');
  }
}

// ---------- RENDER LISTA ----------
function renderizarListaAdmin() {
  const box = document.getElementById('listaAdmin');
  if (!catalogo.length) {
    box.innerHTML = '<p style="color:#888;">Tu catálogo está vacío. Agrega tu primer contenido.</p>';
    return;
  }
  box.innerHTML = catalogo.map(item => {
    const img = item.imagen ? `<img src="${item.imagen}" alt="">` : `<div style="width:50px;height:70px;background:#222;display:flex;align-items:center;justify-content:center;border-radius:4px;">${iconos[item.tipo]||'🎬'}</div>`;
    return `
      <div class="item-admin">
        ${img}
        <div class="txt">
          <h4>${item.titulo}</h4>
          <small>${iconos[item.tipo]||'🎬'} ${item.tipo} • ${item.año} • ${(item.generos||[]).join(', ')}</small>
        </div>
        <div class="actions">
          <button class="edit" onclick="editarItem(${item.id})">✏️ Editar</button>
          <button class="delete" onclick="eliminarItem(${item.id})">🗑️ Eliminar</button>
        </div>
      </div>
    `;
  }).join('');
}

// ---------- FORMULARIO ----------
function mostrarFormulario() {
  document.getElementById('formBox').classList.remove('hidden');
  document.getElementById('formTitle').textContent = 'Agregar nuevo contenido';
  document.getElementById('editId').value = '';
  ['fTitulo','fAño','fImagen','fTrailer','fSinopsis'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fTipo').value = 'pelicula';
  document.getElementById('fCalificacion').value = '5';
  document.getElementById('fDestacado').checked = false;
  document.querySelectorAll('#fGeneros input').forEach(ch => ch.checked = false);
  window.scrollTo({ top: document.getElementById('formBox').offsetTop - 80, behavior: 'smooth' });
}

function cancelarFormulario() {
  document.getElementById('formBox').classList.add('hidden');
}

function editarItem(id) {
  const item = catalogo.find(x => x.id === id);
  if (!item) return;
  document.getElementById('formBox').classList.remove('hidden');
  document.getElementById('formTitle').textContent = 'Editar: ' + item.titulo;
  document.getElementById('editId').value = item.id;
  document.getElementById('fTitulo').value = item.titulo || '';
  document.getElementById('fTipo').value = item.tipo || 'pelicula';
  document.getElementById('fAño').value = item.año || '';
  document.getElementById('fCalificacion').value = item.calificacion || 5;
  document.getElementById('fImagen').value = item.imagen || '';
  document.getElementById('fTrailer').value = item.trailer || '';
  document.getElementById('fSinopsis').value = item.sinopsis || '';
  document.getElementById('fDestacado').checked = !!item.destacado;
  document.querySelectorAll('#fGeneros input').forEach(ch => {
    ch.checked = (item.generos||[]).includes(ch.value);
  });
  window.scrollTo({ top: document.getElementById('formBox').offsetTop - 80, behavior: 'smooth' });
}

// ---------- GUARDAR (CREATE / UPDATE) ----------
async function guardarItem() {
  const editId = document.getElementById('editId').value;
  const titulo = document.getElementById('fTitulo').value.trim();
  const tipo = document.getElementById('fTipo').value;
  const año = parseInt(document.getElementById('fAño').value) || 0;
  const calificacion = parseInt(document.getElementById('fCalificacion').value) || 0;
  const imagen = document.getElementById('fImagen').value.trim();
  const trailerRaw = document.getElementById('fTrailer').value.trim();
  const sinopsis = document.getElementById('fSinopsis').value.trim();
  const destacado = document.getElementById('fDestacado').checked;

  const generos = [];
  document.querySelectorAll('#fGeneros input:checked').forEach(ch => generos.push(ch.value));

  if (!titulo || !año || !sinopsis || !generos.length) {
    mostrarToast('Completa los campos obligatorios (*)', 'error'); return;
  }

  const trailer = youtubeEmbed(trailerRaw) || trailerRaw;

  if (editId) {
    // UPDATE
    const idx = catalogo.findIndex(x => x.id === parseInt(editId));
    if (idx === -1) { mostrarToast('No se encontró el item', 'error'); return; }
    catalogo[idx] = { ...catalogo[idx], titulo, tipo, año, calificacion, imagen, trailer, sinopsis, destacado, generos };
  } else {
    // CREATE
    const newId = catalogo.length ? Math.max(...catalogo.map(x => x.id)) + 1 : 1;
    catalogo.push({ id: newId, titulo, tipo, año, calificacion, imagen, trailer, sinopsis, destacado, generos });
  }

  await persistir();
}

// ---------- ELIMINAR ----------
async function eliminarItem(id) {
  if (!confirm('¿Seguro que quieres eliminar este contenido?')) return;
  catalogo = catalogo.filter(x => x.id !== id);
  await persistir();
}

// ---------- PERSISTIR EN GITHUB ----------
async function persistir() {
  if (!isGitHub) {
    mostrarToast('Modo local: los cambios no se guardan en GitHub. Sube data.json manualmente.', 'error');
    renderizarListaAdmin();
    return;
  }

  if (!token) { mostrarToast('No hay token. Inicia sesión primero.', 'error'); return; }

  mostrarToast('Guardando en GitHub...');

  try {
    // 1. Obtener SHA actual
    const infoRes = await fetch(API_URL, {
      headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github.v3+json' }
    });
    if (!infoRes.ok) throw new Error('No se pudo obtener info del archivo');
    const info = await infoRes.json();
    shaActual = info.sha;

    // 2. Subir nuevo contenido
    const contenido = JSON.stringify(catalogo, null, 2);
    const base64 = btoa(unescape(encodeURIComponent(contenido)));

    const putRes = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Authorization': 'token ' + token,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Actualizar catálogo desde panel admin',
        content: base64,
        sha: shaActual
      })
    });

    if (!putRes.ok) {
      const err = await putRes.json();
      throw new Error(err.message || 'Error al guardar');
    }

    mostrarToast('✅ Guardado correctamente en GitHub');
    renderizarListaAdmin();
    cancelarFormulario();
  } catch (e) {
    mostrarToast('Error guardando: ' + e.message, 'error');
    console.error(e);
  }
}

// ---------- INICIO ----------
if (token && isGitHub) {
  verificarToken();
} else if (token && !isGitHub) {
  // Local: mostrar panel sin verificar
  document.getElementById('loginBox').classList.add('hidden');
  document.getElementById('crudPanel').classList.remove('hidden');
  cargarCatalogoAdmin();
}
