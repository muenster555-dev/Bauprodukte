import './style.css';
import { categories, products } from './data/products.js';
import { knowledgeCategories, knowledgeItems } from './data/knowledge.js';

// === State ===
let state = { view: 'categories', categoryId: null, productId: null };

// === Template Downloads Mapping ===
const documentTemplates = {
  "ÜE Fachunternehmer": "downloads/ue-fachunternehmer.html",
  "ÜE Errichter": "downloads/ue-fachunternehmer.html",
  "Montagebescheinigung": "downloads/montagebescheinigung.html"
};

// === DOM refs ===
const $ = (s) => document.querySelector(s);
const heroSection = $('#hero-section');
const catGrid = $('#categories-grid');
const productsView = $('#products-view');
const detailView = $('#detail-view');
const knowledgeView = $('#knowledge-view');
const knowledgeDetailView = $('#knowledge-detail-view');
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
        ${p.docs.map(d => {
          const dlLink = documentTemplates[d];
          if (dlLink) {
            return `<li class="has-download">
              <span class="doc-name">${d}</span>
              <a href="${dlLink}" class="download-btn" target="_blank" title="${d} Muster ansehen/drucken">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Muster
              </a>
            </li>`;
          }
          return `<li>${d}</li>`;
        }).join('')}
      </ul>
    </div>

    ${p.mvvtbZusatz && p.mvvtbZusatz.length > 0 ? `<div class="mvvtb-section">
      <h4>📋 MVV TB Zusatzanforderungen</h4>
      <ul class="mvvtb-list">
        ${p.mvvtbZusatz.map(z => `<li>${z}</li>`).join('')}
      </ul>
      ${p.mvvtbRef ? `<div class="mvvtb-ref">Regelwerk: ${p.mvvtbRef}</div>` : ''}
    </div>` : ''}

    ${p.hinweis ? `<div class="hinweis-box">
      <div class="hw-label">⚠ Praxis-Hinweis</div>
      ${p.hinweis}
    </div>` : ''}

    ${(() => {
      const relKnow = knowledgeItems.filter(k => k.related && k.related.includes(p.id));
      if (relKnow.length > 0) {
        return `<div class="mvvtb-section knowledge-links-section" style="border-color: #8b5cf6;">
          <h4 style="color: #a78bfa;">📘 Brandschutz-Wissen</h4>
          <ul class="mvvtb-list">
            ${relKnow.map(k => `<li style="cursor:pointer; text-decoration:underline; color:#c4b5fd;" onclick="window.__nav('knowledge-detail', null, '${k.id}')">${k.name}</li>`).join('')}
          </ul>
        </div>`;
      }
      return '';
    })()}

    ${p.ref ? `<div class="ref-box">
      <strong>Regelwerk:</strong> ${p.ref}
    </div>` : ''}
  `;
}

// === Render Knowledge ===
function renderKnowledge() {
  $('#knowledge-breadcrumb').innerHTML = `<span class="current">📘 Brandschutz-Wissen</span>`;

  $('#knowledge-grid').innerHTML = knowledgeCategories.map(c => {
    const items = knowledgeItems.filter(i => i.cat === c.id);
    return `
      <div class="knowledge-cat-section">
        <h3 class="knowledge-cat-title" style="color:#a78bfa; margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:1px solid rgba(139, 92, 246, 0.3);"><span style="margin-right:0.5rem;">${c.icon}</span> ${c.name}</h3>
        <p style="color:var(--text-muted); margin-bottom:1.5rem; font-size:0.95rem;">${c.desc}</p>
        <div class="knowledge-items-list" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:1rem;">
          ${items.map(i => `
            <div class="knowledge-item" data-id="${i.id}" style="background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.2); padding:1rem; border-radius:8px; cursor:pointer; transition:all 0.2s;">
              <span class="k-name" style="color:var(--text-bright); font-weight:500;">${i.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('<div style="height:3rem;"></div>');

  $('#knowledge-grid').querySelectorAll('.knowledge-item').forEach(item => {
    item.addEventListener('mouseenter', () => item.style.background = 'rgba(139,92,246,0.2)');
    item.addEventListener('mouseleave', () => item.style.background = 'rgba(139,92,246,0.1)');
    item.addEventListener('click', () => navigateTo('knowledge-detail', null, item.dataset.id));
  });
}

// === Render Knowledge Detail ===
function renderKnowledgeDetail(itemId) {
  const item = knowledgeItems.find(i => i.id === itemId);
  const cat = knowledgeCategories.find(c => c.id === item.cat);

  $('#knowledge-detail-breadcrumb').innerHTML = `
    <a onclick="window.__nav('knowledge')">📘 Brandschutz-Wissen</a>
    <span class="sep">›</span>
    <span class="current">${item.name}</span>`;

  $('#knowledge-detail-card').innerHTML = `
    <div class="detail-header">
      <h3 style="color:#a78bfa;">${item.name}</h3>
      <div class="detail-badges"><span class="badge" style="background:rgba(139,92,246,0.2); color:#c4b5fd; border:1px solid rgba(139,92,246,0.3);">${cat.name}</span></div>
    </div>
    
    <div class="detail-grid knowledge-detail-grid" style="grid-template-columns: 1fr;">
      <div class="info-block full-width">
        <div class="label" style="color:#a78bfa;">Definition</div>
        <div class="value" style="font-size:1.05rem; line-height:1.6;">${item.definition}</div>
      </div>
      <div class="info-block full-width" style="margin-top:1rem;">
        <div class="label" style="color:#a78bfa;">Kontext & Anwendungsbereich</div>
        <div class="value" style="line-height:1.6;">${item.context}</div>
      </div>
      <div class="info-block full-width" style="margin-top:1rem; background:rgba(255,255,255,0.02); padding:1rem; border-radius:8px; border-left:3px solid #8b5cf6;">
        <div class="label" style="color:#a78bfa;">Prüfung & Messgrößen</div>
        <div class="value accent" style="line-height:1.6;">${item.testing}</div>
      </div>
    </div>
    
    <div class="ref-box" style="margin-top:2rem; border-color:#8b5cf6;">
      <strong>Regelwerk / Normen:</strong> ${item.norms}
    </div>

    ${item.related && item.related.length > 0 ? `
    <div class="mvvtb-section" style="margin-top:2rem; border-color: rgba(255,255,255,0.1);">
      <h4>🔗 Verbundene Bauprodukte & Bauarten</h4>
      <div class="related-list" style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:1rem;">
        ${item.related.map(rId => {
          const relProd = products.find(p => p.id === rId);
          if (!relProd) return '';
          return `<div class="badge" style="cursor:pointer; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:0.5rem 0.8rem;" onclick="window.__nav('detail','${relProd.cat}','${relProd.id}')">${relProd.name}</div>`;
        }).join('')}
      </div>
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
  knowledgeView.classList.toggle('hidden', state.view !== 'knowledge');
  knowledgeDetailView.classList.toggle('hidden', state.view !== 'knowledge-detail');

  if (state.view === 'products' && state.categoryId) {
    renderProducts(state.categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (state.view === 'detail' && state.productId) {
    renderDetail(state.productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (state.view === 'knowledge') {
    renderKnowledge();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (state.view === 'knowledge-detail' && state.productId) {
    renderKnowledgeDetail(state.productId);
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

      const resultsProds = products.filter(p => {
        const searchable = [p.name, p.din, p.en, p.nachweis, p.hinweis || ''].join(' ').toLowerCase();
        return q.split(/\s+/).every(term => searchable.includes(term));
      }).map(p => ({ ...p, type: 'product' }));

      const resultsKnow = knowledgeItems.filter(k => {
        const searchable = [k.name, k.definition, k.testing].join(' ').toLowerCase();
        return q.split(/\s+/).every(term => searchable.includes(term));
      }).map(k => ({ ...k, type: 'knowledge' }));

      const results = [...resultsProds, ...resultsKnow].slice(0, 10);

      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-item">Keine Ergebnisse</div>';
      } else {
        searchResults.innerHTML = results.map(item => {
          if (item.type === 'product') {
            const cat = categories.find(c => c.id === item.cat);
            return `<div class="search-item" data-id="${item.id}" data-cat="${item.cat}" data-type="product">
              ${item.name}
              <span class="cat-label">${cat.icon} ${cat.name}</span>
            </div>`;
          } else {
            return `<div class="search-item" data-id="${item.id}" data-type="knowledge">
              <span style="color:#a78bfa;">📘 ${item.name}</span>
              <span class="cat-label" style="color:#a78bfa;">Wissen</span>
            </div>`;
          }
        }).join('');

        searchResults.querySelectorAll('.search-item[data-id]').forEach(item => {
          item.addEventListener('click', () => {
             if (item.dataset.type === 'product') {
               navigateTo('detail', item.dataset.cat, item.dataset.id);
             } else {
               navigateTo('knowledge-detail', null, item.dataset.id);
             }
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
