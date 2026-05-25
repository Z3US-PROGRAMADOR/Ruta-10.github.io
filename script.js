/* ============================================================
   RUTA 10 — script.js
   ============================================================

   CÓMO AGREGAR PRODUCTOS:
   ─────────────────────────────────────────────────────────────
   Cada producto es un objeto dentro del array PRODUCTS o
   NEW_PRODUCTS. Copia uno existente y cambia los valores:

   { id: 13,                          ← número único (no repetir)
     name: 'Nombre del producto',
     brand: 'Marca',
     price: 350000,                   ← precio en COP sin puntos
     oldPrice: 420000,                ← precio tachado (null = sin tachado)
     cat: 'cascos',                   ← categoría (ver lista abajo)
     img: 'Imagenes/foto.jpg',        ← ruta de la imagen ('' = emoji)
     icon: '🪖',                      ← emoji de respaldo si no hay imagen
     badge: 'hot',                    ← 'hot' | 'new' | 'sale' | null
     stars: 5,                        ← 1 a 5
     reviews: 88 }                    ← número de reseñas

   CATEGORÍAS DISPONIBLES:
   cascos | guantes | chaquetas | botas |
   accesorios | protecciones | mochilas | mantenimiento

   CÓMO AGREGAR TALLAS Y COLORES:
   ─────────────────────────────────────────────────────────────
   SIZES: Agrega un array de tallas dentro del producto:
   sizes: [
     { s: 'S', out: false },  ← s = etiqueta de la talla, out = si está agotada
     { s: 'M', out: true },
     { s: 'L', out: false }
   ]
    COLORS: Agrega un array de colores dentro del producto:
    colors: [ 'Negro Mate', 'Blanco Perla', 'Rojo Racing', 'Morado Racing' ]

   STOCK: TRUE = DISPONIBLE
   STOCK: FALSE = AGOTADO
   ============================================================ */

const ALL_PRODUCTS = [
{ id: 1,  name: 'Casco Integral HRO 506', brand: 'HRO', price: 300000,  oldPrice: null,
    cat: 'cascos',    img: 'Imagenes/Productos/Casco HRO 506 Negro visor rojo.jpg', icon: '🪖', badge: 'hot',  stars: 5, reviews: 128, stock: true,
    sizes: [{s:'S',out:false},{s:'M',out:false},{s:'L',out:false},{s:'XL',out:true}],
    colors: ['Negro Mate','Blanco Brillante','Gris Brillante'] },

];

/* ── PRODUCTOS MÁS VENDIDOS ── */
const PRODUCTS = [
  { id: 100,  name: 'Casco Integral AGV K6 S',       brand: 'AGV',        price: 850000,  oldPrice: 1100000,
    cat: 'cascos',    img: '', icon: '🪖', badge: 'hot',  stars: 5, reviews: 128, stock: true,
    sizes: [{s:'S',out:false},{s:'M',out:false},{s:'L',out:true},{s:'XL',out:false}],
    colors: ['Negro Mate','Blanco Perla','Rojo Racing'] },

  { id: 2,  name: 'Casco Modular Shoei Neotec 3',  brand: 'Shoei',      price: 1350000, oldPrice: null,
    cat: 'cascos',    img: '', icon: '🪖', badge: 'new',  stars: 5, reviews: 89,  stock: false,
    sizes: [], colors: [] },

  { id: 3,  name: 'Guantes Alpinestars GP Pro R3', brand: 'Alpinestars', price: 280000,  oldPrice: 350000,
    cat: 'guantes',   img: '', icon: '🧤', badge: 'sale', stars: 4, reviews: 203, stock: true,
    sizes: [{s:'S',out:false},{s:'M',out:false},{s:'L',out:true},{s:'XL',out:false}],
    colors: ['Negro/Rojo','Negro/Blanco'] },

  { id: 4,  name: 'Chaqueta Dainese Veloce D-Dry', brand: 'Dainese',    price: 720000,  oldPrice: null,
    cat: 'chaquetas', img: '', icon: '🧥', badge: 'new',  stars: 5, reviews: 57,  stock: true,
    sizes: [{s:'S',out:false},{s:'M',out:false},{s:'L',out:false},{s:'XL',out:false}],
    colors: ['Negro','Gris Oscuro'] },

  { id: 5,  name: 'Casco Arai RX-7V Evo',          brand: 'Arai',       price: 2100000, oldPrice: null,
    cat: 'cascos',    img: '', icon: '🪖', badge: null,   stars: 5, reviews: 44,  stock: false,
    sizes: [], colors: [] },

  { id: 6,  name: 'Botas Sidi Canyon Gore-Tex',    brand: 'Sidi',       price: 490000,  oldPrice: 620000,
    cat: 'botas',     img: '', icon: '👢', badge: 'sale', stars: 4, reviews: 76,  stock: true,
    sizes: [{s:'39',out:false},{s:'40',out:false},{s:'41',out:true},{s:'42',out:false}],
    colors: [] },

  { id: 7,  name: 'Intercomunicador Sena 50S',     brand: 'Sena',       price: 680000,  oldPrice: null,
    cat: 'accesorios',img: '', icon: '📡', badge: 'hot',  stars: 5, reviews: 312, stock: true,
    sizes: [], colors: ['Negro','Gris Plata'] },

  { id: 8,  name: 'Casco LS2 FF900 Valiant II',    brand: 'LS2',        price: 430000,  oldPrice: 520000,
    cat: 'cascos',    img: '', icon: '🪖', badge: 'sale', stars: 4, reviews: 95,  stock: true,
    sizes: [{s:'XS',out:false},{s:'S',out:false},{s:'M',out:true},{s:'L',out:false}],
    colors: ['Blanco Brillante','Negro Mate'] },
];

/* ── NUEVOS INGRESOS ── */
const NEW_PRODUCTS = [
  { id: 1,  name: 'Casco Integral HRO 506', brand: 'HRO', price: 300000,  oldPrice: null,
    cat: 'cascos',    img: 'Imagenes/Productos/Casco HRO 506 Negro visor rojo.jpg', icon: '🪖', badge: 'hot',  stars: 5, reviews: 128, stock: true,
    sizes: [{s:'S',out:false},{s:'M',out:false},{s:'L',out:false},{s:'XL',out:true}],
    colors: ['Negro Mate','Blanco Brillante','Gris Brillante'] },

];

/* ── ESTADO GLOBAL ── */
let cart         = JSON.parse(localStorage.getItem('ruta10_cart') || '[]');
let currentSlide = 0;
let activeFilter = 'all';

/* ============================================================
   RENDER DE TARJETAS DE PRODUCTO
   ============================================================ */
function renderCard(p) {
  const badgeMap  = { hot: '🔥 Popular', new: '✨ Nuevo', sale: '🏷️ Oferta' };
  const isAgotado = p.stock === false;

  // Badge: si está agotado siempre muestra "Agotado", si no usa el badge normal
  const badgeHtml = isAgotado
    ? `<div class="product-badge badge-agotado">⛔ Agotado</div>`
    : (p.badge ? `<div class="product-badge badge-${p.badge}">${badgeMap[p.badge]}</div>` : '');

  const oldHtml = p.oldPrice ? `<s>$${p.oldPrice.toLocaleString('es-CO')}</s>` : '';
  const stars   = '★'.repeat(p.stars) + '☆'.repeat(5 - p.stars);
  const imgHtml = p.img
    ? `<img src="${p.img}" alt="${p.name}" class="product-img-real">`
    : `<div class="product-img-emoji">${p.icon}</div>`;

  // Botón: deshabilitado si está agotado
  const btnHtml = isAgotado
    ? `<button class="btn-cart btn-agotado" disabled>Sin stock</button>`
    : `<div style="display:flex;gap:6px;align-items:center;">
  <button class="btn-cart" onclick="event.stopPropagation(); openProductModal(${p.id})">+ Agregar</button>
</div>`;

  return `
    <div class="product-card ${isAgotado ? 'card-agotado' : ''}" data-cat="${p.cat}" id="product-${p.id}"
         style="cursor:pointer;"
         onclick="window.location.href='producto.html?id=${p.id}'">
      <div class="product-img">${imgHtml}</div>
      ${badgeHtml}
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name ${isAgotado ? 'nombre-agotado' : ''}">${p.name}</div>
        <div class="product-stars">${stars} <span>(${p.reviews})</span></div>
        <div class="product-footer">
          <div class="product-price ${isAgotado ? 'precio-agotado' : ''}">
            $${p.price.toLocaleString('es-CO')} ${oldHtml}
          </div>
          ${btnHtml}
        </div>
      </div>
    </div>`;
}

function renderGrids() {
  document.getElementById('productsGrid').innerHTML = PRODUCTS.map(renderCard).join('');
  document.getElementById('newGrid').innerHTML      = NEW_PRODUCTS.map(renderCard).join('');
  renderAllProductsPaged(1);
  applyFilter(activeFilter);
}

/* ============================================================
   PAGINADO — SECCIÓN "TODOS LOS PRODUCTOS"
   20 productos por página. Cambia ITEMS_PER_PAGE para ajustar.
   ============================================================ */
const ITEMS_PER_PAGE = 20;
let   currentPageAll = 1;

function renderAllProductsPaged(page) {
  const grid    = document.getElementById('allProductsGrid');
  const section = document.getElementById('all-products');
  if (!grid || !section) return;

  const total      = ALL_PRODUCTS.length;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const safePage   = Math.min(Math.max(page, 1), totalPages);
  const start      = (safePage - 1) * ITEMS_PER_PAGE;
  const end        = Math.min(start + ITEMS_PER_PAGE, total);
  currentPageAll   = safePage;

  // Elimina paginación anterior
  section.querySelectorAll('.pagination').forEach(el => el.remove());

  // Inyecta tarjetas de la página actual
  grid.innerHTML = ALL_PRODUCTS.slice(start, end).map(renderCard).join('');

  // Sin paginación si solo hay 1 página
  if (totalPages <= 1) return;

  // Construye botones
  const r1  = Math.max(1, safePage - 2);
  const r2  = Math.min(totalPages, safePage + 2);
  let   btn = '<div class="pagination">';

  btn += `<button class="page-btn" onclick="renderAllProductsPaged(${safePage - 1})"
           ${safePage === 1 ? 'disabled' : ''}>‹ Anterior</button>`;

  if (r1 > 1) {
    btn += `<button class="page-btn" onclick="renderAllProductsPaged(1)">1</button>`;
    if (r1 > 2) btn += `<span class="page-dots">…</span>`;
  }

  for (let i = r1; i <= r2; i++) {
    btn += `<button class="page-btn ${i === safePage ? 'active' : ''}"
             onclick="renderAllProductsPaged(${i})">${i}</button>`;
  }

  if (r2 < totalPages) {
    if (r2 < totalPages - 1) btn += `<span class="page-dots">…</span>`;
    btn += `<button class="page-btn" onclick="renderAllProductsPaged(${totalPages})">${totalPages}</button>`;
  }

  btn += `<button class="page-btn" onclick="renderAllProductsPaged(${safePage + 1})"
           ${safePage === totalPages ? 'disabled' : ''}>Siguiente ›</button>`;

  btn += `<span class="page-info">Mostrando ${start + 1}–${end} de ${total} productos</span>`;
  btn += '</div>';

  grid.insertAdjacentHTML('afterend', btn);

  // Scroll solo al cambiar de página (no en la carga inicial)
  if (page > 1) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

renderGrids();


/* ============================================================
   BANNER / SLIDER AUTOMÁTICO
   ============================================================ */
function changeBanner(dir) {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + dir + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
function goToSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
setInterval(() => changeBanner(1), 6000);

/* ============================================================
   FILTRO POR CATEGORÍA
   ============================================================ */
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

function getSearchTerms(text, category) {
  const raw = normalizeText(text);
  const catName = normalizeText(category);
  const withoutCat = raw.replace(new RegExp(`\\b${catName}\\b`, 'g'), '').trim();
  const singular = withoutCat.replace(/es$/, '').replace(/s$/, '').trim();
  return [...new Set([withoutCat, singular].filter(Boolean))];
}

function applyFilter(cat, subterm = '') {
  activeFilter = cat;
  const terms = subterm ? getSearchTerms(subterm, cat) : [];
  let orderIndex = 0;

  document.querySelectorAll('.product-card').forEach(card => {
    const matchesCat = cat === 'all' || card.dataset.cat === cat;
    let matchesSub = true;

    if (terms.length) {
      const name = normalizeText(card.querySelector('.product-name')?.textContent || '');
      const brand = normalizeText(card.querySelector('.product-brand')?.textContent || '');
      const badge = normalizeText(card.querySelector('.product-badge')?.textContent || '');
      matchesSub = terms.some(term => name.includes(term) || brand.includes(term) || badge.includes(term));
    }

    if (matchesCat && matchesSub) {
      card.style.display = '';
      card.style.order = orderIndex++;
    } else {
      card.style.display = 'none';
      card.style.order = 'unset';
    }
  });

  // Barra de filtro activo
  const bar = document.getElementById('filterBar');
  if (cat === 'all' && !subterm) {
    bar.style.display = 'none';
  } else {
    bar.style.display = 'flex';
    document.getElementById('filterLabel').textContent = subterm
      ? `${cat.charAt(0).toUpperCase() + cat.slice(1)} / ${subterm}`
      : cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  // Resaltar botón activo en filtros rápidos
  document.querySelectorAll('.qf-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`.qf-btn[onclick*="'${cat}'"]`);
  if (activeBtn) activeBtn.classList.add('active');
}

function quickFilter(cat, btn) {
  document.querySelectorAll('.qf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilter(cat);
}

function filterAndClose(cat, subterm) {
  if (!subterm) {
    const evt = window.event || {};
    let target = evt.target || evt.srcElement;
    if (!target || !target.classList) {
      target = document.activeElement;
    }
    if (target && target.classList && target.classList.contains('megamenu-chip')) {
      const text = target.textContent.trim();
      const normalizedText = normalizeText(text);
      if (!normalizedText.startsWith('ver todos')) {
        subterm = normalizedText;
      }
    }
  }

  closeMegaMenu();
  applyFilter(cat, subterm || '');
  setTimeout(() => {
    document.getElementById('mas-vendidos').scrollIntoView({ behavior: 'smooth' });
  }, 200);
}

function clearFilter() {
  applyFilter('all');
}

/* ============================================================
   BUSCADOR EN TIEMPO REAL
   ============================================================ */
function handleSearch(val) {
  const bar   = document.getElementById('searchResultsBar');
  const clear = document.getElementById('searchClear');
  const q     = val.trim().toLowerCase();

  clear.style.display = q ? 'block' : 'none';

  if (!q) { bar.classList.remove('visible'); return; }

  const all     = [...PRODUCTS, ...NEW_PRODUCTS, ...ALL_PRODUCTS];
  const results = all.filter(p =>
    p.name.toLowerCase().includes(q)  ||
    p.brand.toLowerCase().includes(q) ||
    p.cat.toLowerCase().includes(q)
  );

  if (!results.length) {
    bar.innerHTML = `<span class="search-no-results">Sin resultados para "<strong>${val}</strong>"</span>`;
    bar.classList.add('visible');
    return;
  }

  bar.innerHTML =
    `<span class="search-count">${results.length} resultado(s) para "<strong>${val}</strong>":</span> ` +
    results.map(p =>
      `<span class="search-result-item" onclick="goToProduct(${p.id})">${p.icon} ${p.name} <small>$${p.price.toLocaleString('es-CO')}</small></span>`
    ).join('');
  bar.classList.add('visible');
}

function goToProduct(id) {
  // Quita todos los filtros para que el producto sea visible
  applyFilter('all');
  const el = document.getElementById('product-' + id);
  if (!el) return;
  setTimeout(() => {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('highlight');
    setTimeout(() => el.classList.remove('highlight'), 2500);
  }, 100);
  document.getElementById('searchResultsBar').classList.remove('visible');
}

function searchKeydown(e) {
  if (e.key === 'Escape') clearSearch();
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResultsBar').classList.remove('visible');
  document.getElementById('searchClear').style.display = 'none';
}

/* ============================================================
   MEGA MENÚ
   ============================================================ */
function toggleMegaMenu() {
  const menu    = document.getElementById('megamenu');
  const overlay = document.getElementById('megamenuOverlay');
  const btn     = document.getElementById('catMenuBtn');
  const isOpen  = menu.classList.contains('open');
  if (isOpen) {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    btn.classList.remove('active');
  } else {
    menu.classList.add('open');
    overlay.classList.add('open');
    btn.classList.add('active');
    // Limpiar búsqueda interna al abrir
    document.getElementById('megamenuSearchInput').value = '';
    filterMegaMenu('');
  }
}

function closeMegaMenu() {
  document.getElementById('megamenu').classList.remove('open');
  document.getElementById('megamenuOverlay').classList.remove('open');
  document.getElementById('catMenuBtn').classList.remove('active');
}

function showPanel(panelId) {
  document.querySelectorAll('.megamenu-list-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.megamenu-panel').forEach(p => p.classList.remove('active'));
  const item  = document.querySelector(`.megamenu-list-item[data-panel="${panelId}"]`);
  const panel = document.getElementById('panel-' + panelId);
  if (item)  item.classList.add('active');
  if (panel) panel.classList.add('active');
}

function filterMegaMenu(val) {
  const items = document.querySelectorAll('.megamenu-list-item');
  const q     = val.trim().toLowerCase();
  let first   = null;

  items.forEach(item => {
    const label    = item.querySelector('.item-label');
    const coincide = !q || (label && label.textContent.toLowerCase().includes(q));
    item.style.display = coincide ? '' : 'none';
    if (coincide && !first) first = item;
  });

  if (first) showPanel(first.dataset.panel);
}

/* ============================================================
   CARRITO DE COMPRAS
   ============================================================ */
function saveCart()  { localStorage.setItem('ruta10_cart', JSON.stringify(cart)); }

function updateCartCount() {
  document.getElementById('cartCount').textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const empty     = document.getElementById('cartEmpty');

  if (cart.length === 0) {
    empty.style.display = 'flex';
    document.getElementById('cartTotal').textContent = '$0';
    return;
  }
  empty.style.display = 'none';

  const all   = [...PRODUCTS, ...NEW_PRODUCTS, ...ALL_PRODUCTS];
  let total   = 0;
  const html  = cart.map(item => {
    const p = all.find(x => x.id === item.id);
    if (!p) return '';
    total += p.price * item.qty;
    return `
      <div class="cart-item">
        <div class="cart-item-img">${p.icon}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">$${p.price.toLocaleString('es-CO')}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${p.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${p.id})">×</button>
      </div>`;
  }).join('');

  container.innerHTML = '<div class="cart-empty" id="cartEmpty" style="display:none;"></div>' + html;
  document.getElementById('cartTotal').textContent = '$' + total.toLocaleString('es-CO');
}

function addToCart(id) {
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, qty: 1 });
  saveCart(); updateCartCount(); renderCart();
  showToast('✅', 'Producto agregado al carrito');
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); updateCartCount(); renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(); renderCart(); updateCartCount();
}

function toggleCart() {
  document.getElementById('cartPanel').classList.toggle('open');
  renderCart();
}

function checkout() {
  if (!cart.length) return showToast('⚠️', 'Tu carrito está vacío');
  showToast('🎉', '¡Gracias por tu compra! Procesando…');
  cart = [];
  saveCart(); updateCartCount(); renderCart();
  setTimeout(() => document.getElementById('cartPanel').classList.remove('open'), 1500);
}

updateCartCount();

/* ============================================================
   MODAL LOGIN / REGISTRO
   ============================================================ */
function openModal()  { document.getElementById('authModal').classList.add('open'); }
function closeModal() { document.getElementById('authModal').classList.remove('open'); }
function closeModalOutside(e) { if (e.target.id === 'authModal') closeModal(); }

function switchTab(tab, btn) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('loginForm').style.display    = tab === 'login'    ? '' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? '' : 'none';
}

function handleLogin() {
  closeModal();
  showToast('👋', '¡Bienvenido de vuelta!');
  document.getElementById('btnLogin').textContent = 'Mi cuenta';
  document.getElementById('adminBar').classList.add('visible');
}

function handleRegister() {
  closeModal();
  showToast('🎉', 'Cuenta creada exitosamente');
}

function exitAdmin() {
  document.getElementById('adminBar').classList.remove('visible');
  document.getElementById('btnLogin').textContent = 'Ingresar';
}

/* ============================================================
   MODO CLARO / OSCURO
   ============================================================ */
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  document.getElementById('themeIcon').textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('ruta10_theme', isLight ? 'light' : 'dark');
}

(function initTheme() {
  if (localStorage.getItem('ruta10_theme') === 'light') {
    document.body.classList.add('light-mode');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.textContent = '🌙';
  }
})();

/* ============================================================
   TOAST DE NOTIFICACIONES
   ============================================================ */
function showToast(icon, msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastMsg').textContent  = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ============================================================
   UTILIDADES
   ============================================================ */
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* ============================================================
   MODAL DE SELECCIÓN DE TALLA Y COLOR
   openProductModal(id) → abre el modal con tallas y colores del producto
   selectSize(el)       → selecciona una talla (resalta el botón)
   selectColor(el)      → selecciona un color (resalta el botón)
   confirmAddToCart()   → valida selección y agrega al carrito
============================================================ */
function openProductModal(id) {
  const all = [...NEW_PRODUCTS, ...PRODUCTS, ...ALL_PRODUCTS];
  const p   = all.find(x => x.id === id);
  if (!p) return;

  // Guarda el id activo para usarlo al confirmar
  document.getElementById('productModal').dataset.productId = id;

  // Nombre del producto en el modal
  document.getElementById('pmProductName').textContent = p.name;

  // TALLAS
  const sizesWrap = document.getElementById('pmSizesWrap');
  if (p.sizes && p.sizes.length > 0) {
    sizesWrap.style.display = '';
    document.getElementById('pmSizes').innerHTML = p.sizes.map(s => `
      <button class="pm-option ${s.out ? 'out-of-stock' : ''}"
              onclick="selectSize(this)"
              ${s.out ? 'disabled' : ''}
              title="${s.out ? 'Agotado' : s.s}">
        ${s.s}
      </button>`).join('');
  } else {
    sizesWrap.style.display = 'none';
  }

  // COLORES
  const colorsWrap = document.getElementById('pmColorsWrap');
  if (p.colors && p.colors.length > 0) {
    colorsWrap.style.display = '';
    document.getElementById('pmColors').innerHTML = p.colors.map(c => `
      <button class="pm-option pm-color-option" onclick="selectColor(this)">
        ${c}
      </button>`).join('');
  } else {
    colorsWrap.style.display = 'none';
  }

  // Abre el modal
  document.getElementById('productModal').classList.add('open');
}

function selectSize(el) {
  document.querySelectorAll('#pmSizes .pm-option').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function selectColor(el) {
  document.querySelectorAll('#pmColors .pm-option').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
}

function confirmAddToCart() {
  const modal   = document.getElementById('productModal');
  const id      = parseInt(modal.dataset.productId);
  const all     = [...NEW_PRODUCTS, ...PRODUCTS, ...ALL_PRODUCTS];
  const p       = all.find(x => x.id === id);

  // Valida talla si el producto la tiene
  const sizesWrap = document.getElementById('pmSizesWrap');
  if (sizesWrap.style.display !== 'none') {
    const selSize = document.querySelector('#pmSizes .pm-option.selected');
    if (!selSize) { showToast('⚠️', 'Selecciona una talla'); return; }
  }

  // Valida color si el producto lo tiene
  const colorsWrap = document.getElementById('pmColorsWrap');
  if (colorsWrap.style.display !== 'none') {
    const selColor = document.querySelector('#pmColors .pm-option.selected');
    if (!selColor) { showToast('⚠️', 'Selecciona un color'); return; }
  }

  // Agrega al carrito
  addToCart(id);
  closeProductModal();
}