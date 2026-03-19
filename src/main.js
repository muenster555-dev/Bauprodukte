import './style.css';
import { categories, products } from './data/products.js';

// === State ===
let state = { view: 'categories', categoryId: null, productId: null };

// === DOM refs ===
const $ = (s) => document.querySelector(s);
const heroSection = $('#hero-section');
const catGrid = $('#categories-grid');
const productsView = $('#products-view');
const detailView = $('#detail-view');
const searchInput = $('#global-search');
const searchResults = $('#search-results');

// === Init ===
function init() {
  renderCategories();
  setupSearch();
  window.addEventListener('popstate', handlePopState);
}

// === Render Categories ===
function renderCategories() {
  catGrid.innerHTML = categories.map(c => {
    const count = products.filter(p => p.cat === c.id).length;
    return `<div class="cat-card" data-cat="${c.id}">
      <span class="cat-icon">${c.icon}</span>
      <div class="cat-name">${c.name}</div>
      <div class="cat-desc">${c.desc}</div>
      <div class="cat-count">${count} Produkte / Bauarten</div>
    </div>`;
  }).join('');

  catGrid.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      navigateTo('products', card.dataset.cat);
    });
  });
}

// === Render Products List ===
function renderProducts(catId) {
  const cat = categories.find(c => c.id === catId);
  const prods = products.filter(p => p.cat === catId);

  $('#breadcrumb').innerHTML = `
    <a onclick="window.__nav('categories')">Kategorien</a>
    <span class="sep">›</span>
    <span class="current">${cat.icon} ${cat.name}</span>`;

  $('#products-list').innerHTML = prods.map(p => `
    <div class="product-item" data-id="${p.id}">
      <span class="p-name">${p.name}</span>
      <div class="p-meta">
        ${p.hen === true ? '<span class="badge badge-ce">CE</span>' : '<span class="badge badge-no-hen">Keine hEN</span>'}
        ${p.nachweis.includes('abZ') ? '<span class="badge badge-abz">abZ</span>' : ''}
        ${p.nachweis.includes('abP') && !p.nachweis.includes('abZ') ? '<span class="badge badge-abp">abP</span>' : ''}
        ${p.nachweis.includes('aBG') ? '<span class="badge badge-abz">aBG</span>' : ''}
      </div>
    </div>`).join('');

  $('#products-list').querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', () => {
      navigateTo('detail', catId, item.dataset.id);
    });
  });
}

// === Render Detail ===
function renderDetail(productId) {
  const p = products.find(pr => pr.id === productId);
  const cat = categories.find(c => c.id === p.cat);

  $('#detail-breadcrumb').innerHTML = `
    <a onclick="window.__nav('categories')">Kategorien</a>
    <span class="sep">›</span>
    <a onclick="window.__nav('products','${p.cat}')">${cat.icon} ${cat.name}</a>
    <span class="sep">›</span>
    <span class="current">${p.name}</span>`;

  const henBadge = p.hen === true
    ? `<span class="badge badge-ce">CE-Kennzeichnung</span>${p.henNorm ? `<span class="badge badge-ce">${p.henNorm}</span>` : ''}`
    : '<span class="badge badge-no-hen">Keine hEN – nicht harmonisiert</span>';

  $('#detail-card').innerHTML = `
    <div class="detail-header">
      <h3>${p.name}</h3>
      <div class="detail-badges">${henBadge}</div>
    </div>

    <div class="detail-grid">
      ${p.din && p.din !== '–' ? `<div class="info-block">
        <div class="label">DIN 4102 Klassifizierung</div>
        <div class="value">${p.din}</div>
      </div>` : ''}
      ${p.en && p.en !== '–' ? `<div class="info-block">
        <div class="label">EN 13501 Klassifizierung</div>
        <div class="value">${p.en}</div>
      </div>` : ''}
      <div class="info-block">
        <div class="label">Verwendbarkeitsnachweis</div>
        <div class="value accent">${p.nachweis}</div>
      </div>
    </div>

    <div class="docs-section">
      <h4>✅ Erforderliche Dokumente auf der Baustelle</h4>
      <ul class="docs-list">
        ${p.docs.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>

    ${p.hinweis ? `<div class="hinweis-box">
      <div class="hw-label">⚠ Praxis-Hinweis</div>
      ${p.hinweis}
    </div>` : ''}

    ${p.ref ? `<div class="ref-box">
      <strong>Regelwerk:</strong> ${p.ref}
    </div>` : ''}
  `;
}

// === Navigation ===
function navigateTo(view, catId = null, productId = null) {
  state = { view, categoryId: catId, productId };
  history.pushState(state, '', '');
  applyState();
}

window.__nav = (view, catId) => navigateTo(view, catId);

function handlePopState(e) {
  if (e.state) { state = e.state; }
  else { state = { view: 'categories', categoryId: null, productId: null }; }
  applyState();
}

function applyState() {
  heroSection.classList.toggle('hidden', state.view !== 'categories');
  catGrid.classList.toggle('hidden', state.view !== 'categories');
  productsView.classList.toggle('hidden', state.view !== 'products');
  detailView.classList.toggle('hidden', state.view !== 'detail');

  if (state.view === 'products' && state.categoryId) {
    renderProducts(state.categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (state.view === 'detail' && state.productId) {
    renderDetail(state.productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// === Search ===
function setupSearch() {
  let debounce;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const q = searchInput.value.trim().toLowerCase();
      if (q.length < 2) { searchResults.classList.remove('active'); return; }

      const results = products.filter(p => {
        const searchable = [p.name, p.din, p.en, p.nachweis, p.hinweis || ''].join(' ').toLowerCase();
        return q.split(/\s+/).every(term => searchable.includes(term));
      }).slice(0, 10);

      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-item">Keine Ergebnisse</div>';
      } else {
        searchResults.innerHTML = results.map(p => {
          const cat = categories.find(c => c.id === p.cat);
          return `<div class="search-item" data-id="${p.id}" data-cat="${p.cat}">
            ${p.name}
            <span class="cat-label">${cat.icon} ${cat.name}</span>
          </div>`;
        }).join('');

        searchResults.querySelectorAll('.search-item[data-id]').forEach(item => {
          item.addEventListener('click', () => {
            navigateTo('detail', item.dataset.cat, item.dataset.id);
            searchInput.value = '';
            searchResults.classList.remove('active');
          });
        });
      }
      searchResults.classList.add('active');
    }, 200);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) searchResults.classList.remove('active');
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length >= 2) searchResults.classList.add('active');
  });
}

// === Boot ===
init();
