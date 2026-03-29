import './style.css';
import { categories, products } from './data/products.js';
import { knowledgeCategories, knowledgeItems } from './data/knowledge.js';
import { productExamples } from './data/examples.js';
import {
  heizwerte, cWerte, faOptionen, sicherheitskategorien, alphaLFaktoren, tabelle6,
  getFH, getZulAbew, getTab7, getGamma, calcAlphaL, getTabelle6,
  calcQR, calcW, calcTae, calcErfTF, calcBewFlaeche, calcBewFlaecheDetailed,
  calcEbenenNachweis, erklaerungen
} from './data/indbau.js';

// === State ===
let state = { view: 'landing', categoryId: null, productId: null };

// === IndBauRL Wizard State ===
let indbauState = {
  step: 0,
  // Step 0: Gebäude
  bauweise: 'eingeschossig', // eingeschossig | mehrgeschossig | ebenen
  grundflaeche: 5000,
  hoehe: 6,
  ebenen: [],
  // Step 1: Brandbelastung
  qrMode: 'direkt', // direkt | stoffe
  qrDirekt: 50,
  stoffe: [],
  // Step 2: Wärmeabzug
  wMode: 'direkt',
  wDirekt: 1.0,
  av: 200,
  ah: 100,
  // Step 3: tä + c
  cIndex: 0,
  // Step 4: Sicherheit
  kategorie: 'K1',
  alphaLSelected: [],
  // Ergebnisse
  results: null,
};

// === Template Downloads Mapping ===
const documentTemplates = {
  "ÜE Fachunternehmer": "downloads/ue-fachunternehmer.html",
  "ÜE Errichter": "downloads/ue-fachunternehmer.html",
  "Montagebescheinigung": "downloads/montagebescheinigung.html"
};

// === DOM refs ===
const $ = (s) => document.querySelector(s);
const landingView = $('#landing-view');
const landingGrid = $('#landing-grid');
const heroSection = $('#hero-section');
const catGrid = $('#categories-grid');
const productsView = $('#products-view');
const detailView = $('#detail-view');
const knowledgeView = $('#knowledge-view');
const knowledgeDetailView = $('#knowledge-detail-view');
const indbauView = $('#indbau-view');
const searchInput = $('#global-search');
const searchResults = $('#search-results');

// === Init ===
function init() {
  renderLanding();
  renderCategories();
  setupSearch();
  window.addEventListener('popstate', handlePopState);
}

// === Tool Definitions ===
const tools = [
  {
    id: 'bauprodukte',
    name: 'Bauprodukte Nachweismanager',
    desc: 'Verwendbarkeitsnachweise für Bauprodukte & Bauarten im Brandschutz. Finden Sie schnell die richtige abZ, abP oder das aBG für Ihr Bauvorhaben.',
    icon: 'tool-bauprodukte.png',
    status: 'available',
    statusLabel: 'Verfügbar',
    cta: 'Starten'
  },
  {
    id: 'indbau',
    name: 'IndBauRL Prüftool',
    desc: 'Nachweis nach Abschnitt 7 der Industriebaurichtlinie: Äquivalente Branddauer, Feuerwiderstandsdauer und zulässige Flächen berechnen.',
    icon: 'tool-indbau.png',
    status: 'available',
    statusLabel: 'Verfügbar',
    cta: 'Starten'
  }
];

// === Render Landing ===
function renderLanding() {
  landingGrid.innerHTML = tools.map(t => `
    <div class="tool-card ${t.status === 'coming-soon' ? 'tool-card--coming-soon' : ''}" data-tool="${t.id}">
      <div class="tool-card-inner">
        <img class="tool-icon" src="${t.icon}" alt="${t.name}" />
        <div class="tool-info">
          <h3 class="tool-name">${t.name}</h3>
          <p class="tool-desc">${t.desc}</p>
          <div class="tool-footer">
            <span class="tool-status tool-status--${t.status}">${t.statusLabel}</span>
            <button class="tool-cta ${t.status === 'coming-soon' ? 'tool-cta--disabled' : ''}">${t.cta}</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  landingGrid.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
      const toolId = card.dataset.tool;
      if (toolId === 'bauprodukte') {
        navigateTo('categories');
      } else if (toolId === 'indbau') {
        navigateTo('indbau');
      }
    });
  });
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
    <a onclick="window.__nav('landing')">Home</a>
    <span class="sep">›</span>
    <a onclick="window.__nav('categories')">Bauprodukte</a>
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
    <a onclick="window.__nav('landing')">Home</a>
    <span class="sep">›</span>
    <a onclick="window.__nav('categories')">Bauprodukte</a>
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

    ${(() => {
      if (typeof productExamples !== 'undefined' && productExamples[p.id] && productExamples[p.id].length > 0) {
        const exs = productExamples[p.id];
        return `<div class="mvvtb-section examples-section" style="margin-top: 2.5rem; border-color: #3b82f6;">
          <h4 style="color: #60a5fa; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(59, 130, 246, 0.3);">💡 Praxis-Beispiele (Verwendbarkeitsnachweise)</h4>
          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:1.2rem;">
            ${exs.map(ex => `
              <div class="example-card" style="display:block; background:rgba(59,130,246,0.05); border:1px solid rgba(59,130,246,0.2); padding:1.2rem; border-radius:8px; color:inherit; transition:all 0.2s;">
                <div style="color:#ffffff; font-weight:600; font-size:1.1rem; margin-bottom:0.25rem;">${ex.manufacturer}</div>
                <div style="color:#e2e8f0; font-size:0.95rem; margin-bottom:1rem;">${ex.productName}</div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem; padding-top:0.75rem; border-top:1px solid rgba(59,130,246,0.15);">
                  <span class="badge" style="background:rgba(59,130,246,0.15); color:#93c5fd; border:none; padding:0.3rem 0.6rem; font-size:0.8rem;">${ex.docType}</span>
                  <span style="color:#94a3b8; font-size:0.85rem;" title="Gültig bis">⏳ ${ex.validUntil}</span>
                </div>
                <div style="margin-top:0.75rem; text-align:right;">
                  <a href="${ex.link}" target="_blank" style="color:#60a5fa; font-size:0.85rem; text-decoration:none; display:inline-block; padding:0.3rem 0.6rem; border:1px solid rgba(96,165,250,0.3); border-radius:4px; transition:background 0.2s; background:rgba(96,165,250,0.05);" onmouseover="this.style.background='rgba(96,165,250,0.15)'" onmouseout="this.style.background='rgba(96,165,250,0.05)'">${ex.docNumber} 📄 ↗</a>
                </div>
                ${ex.note ? `<div style="margin-top:0.75rem; padding:0.6rem 0.8rem; background:rgba(245,158,11,0.1); border-left:3px solid #f59e0b; color:#fbbf24; font-size:0.82rem; border-radius:4px; line-height:1.4;"><strong>Hinweis:</strong> ${ex.note}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>`;
      }
      return '';
    })()}

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
      const relKnow = knowledgeItems.filter(k => (k.related && k.related.includes(p.id)) || (p.knowledge && p.knowledge.includes(k.id)));
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

  const relatedProds = products.filter(p => (item.related && item.related.includes(p.id)) || (p.knowledge && p.knowledge.includes(item.id)));

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

    ${relatedProds.length > 0 ? `
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

window.__nav = (view, catId, productId) => navigateTo(view, catId, productId);

function handlePopState(e) {
  if (e.state) { state = e.state; }
  else { state = { view: 'landing', categoryId: null, productId: null }; }
  applyState();
}

function applyState() {
  // Globaler Passwortschutz für das IndBauRL Tool
  if (state.view === 'indbau') {
    if (!sessionStorage.getItem('indbauAuth')) {
      const pw = prompt('🔒 Dieses Tool ist passwortgeschützt.\nBitte Passwort eingeben:');
      if (pw && pw.trim().toLowerCase() === 'hafenweg') {
        sessionStorage.setItem('indbauAuth', 'true');
      } else {
        if (pw !== null) alert('❌ Falsches Passwort.');
        // Abbrechen und zurück zur Startseite ohne den State "indbau" zu übernehmen
        state = { view: 'landing', categoryId: null, productId: null };
        history.replaceState(state, '', '');
      }
    }
  }

  landingView.classList.toggle('hidden', state.view !== 'landing');
  heroSection.classList.toggle('hidden', state.view !== 'categories');
  catGrid.classList.toggle('hidden', state.view !== 'categories');
  productsView.classList.toggle('hidden', state.view !== 'products');
  detailView.classList.toggle('hidden', state.view !== 'detail');
  knowledgeView.classList.toggle('hidden', state.view !== 'knowledge');
  knowledgeDetailView.classList.toggle('hidden', state.view !== 'knowledge-detail');
  indbauView.classList.toggle('hidden', state.view !== 'indbau');

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
  } else if (state.view === 'indbau') {
    renderIndbau();
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

// =================================================================
// === IndBauRL WIZARD ===
// =================================================================
const STEP_TITLES = [
  '🏭 Gebäude-Konfiguration',
  '🔥 Rechnerische Brandbelastung',
  '💨 Wärmeabzugsfaktor',
  '⏱️ Äquivalente Branddauer',
  '🛡️ Sicherheitskategorie & Infrastruktur',
  '📊 Ergebnis & Nachweis',
];

function renderIndbau() {
  $('#indbau-breadcrumb').innerHTML = `
    <a onclick="window.__nav('landing')">Home</a>
    <span class="sep">›</span>
    <span class="current">IndBauRL Prüftool</span>`;

  const wiz = $('#indbau-wizard');
  wiz.innerHTML = `
    <div class="wiz-header">
      <h2>IndBauRL Abschnitt 7 – Nachweisverfahren</h2>
      <p>Schritt-für-Schritt-Berechnung nach MIndBauRL & DIN 18230-1</p>
    </div>
    <div class="wiz-stepper">
      ${STEP_TITLES.map((t, i) => `
        <div class="wiz-step ${i === indbauState.step ? 'active' : ''} ${i < indbauState.step ? 'done' : ''}" data-step="${i}">
          <div class="wiz-step-num">${i < indbauState.step ? '✓' : i + 1}</div>
          <div class="wiz-step-label">${t}</div>
        </div>
      `).join('')}
    </div>
    <div class="wiz-body" id="wiz-body"></div>
    <div class="wiz-actions">
      ${indbauState.step > 0 ? '<button class="wiz-btn wiz-btn-back" id="wiz-back">← Zurück</button>' : '<span></span>'}
      ${indbauState.step < 5
        ? '<button class="wiz-btn wiz-btn-next" id="wiz-next">Weiter →</button>'
        : '<button class="wiz-btn wiz-btn-next wiz-btn-reset" id="wiz-reset">🔄 Neuer Nachweis</button>'
      }
    </div>
  `;

  // Stepper click
  wiz.querySelectorAll('.wiz-step').forEach(el => {
    el.addEventListener('click', () => {
      const s = +el.dataset.step;
      if (s <= indbauState.step) {
        indbauState.step = s;
        renderIndbau();
      }
    });
  });

  // Navigation
  const backBtn = $('#wiz-back');
  const nextBtn = $('#wiz-next');
  const resetBtn = $('#wiz-reset');
  if (backBtn) backBtn.addEventListener('click', () => { indbauState.step--; renderIndbau(); });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    readStepInputs();
    if (indbauState.step === 4) calculateResults();
    indbauState.step++;
    renderIndbau();
  });
  if (resetBtn) resetBtn.addEventListener('click', () => {
    indbauState = { step: 0, bauweise: 'eingeschossig', grundflaeche: 5000, hoehe: 6, ebenen: [],
      qrMode: 'direkt', qrDirekt: 50, stoffe: [], wMode: 'direkt', wDirekt: 1.0, av: 200, ah: 100,
      cIndex: 0, kategorie: 'K1', alphaLSelected: [], results: null, ebenenExpanded: {} };
    renderIndbau();
  });

  // Render current step
  const body = $('#wiz-body');
  switch (indbauState.step) {
    case 0: renderStep0(body); break;
    case 1: renderStep1(body); break;
    case 2: renderStep2(body); break;
    case 3: renderStep3(body); break;
    case 4: renderStep4(body); break;
    case 5: renderStep5(body); break;
  }
}

// === Tooltip helper ===
function infoTip(key) {
  const e = erklaerungen[key];
  if (!e) return '';
  return `<div class="wiz-info-tip">
    <div class="wiz-info-header">${e.titel}</div>
    <div class="wiz-info-text">${e.text}</div>
    ${e.beispiel ? `<div class="wiz-info-example">💡 ${e.beispiel}</div>` : ''}
  </div>`;
}

function explain(symbol, fullName, unit, desc) {
  return `<div class="wiz-explain">
    <span class="wiz-sym">${symbol}</span>
    <span class="wiz-fullname">${fullName}</span>
    ${unit ? `<span class="wiz-eunit">[${unit}]</span>` : ''}
    ${desc ? `<span class="wiz-edesc">– ${desc}</span>` : ''}
  </div>`;
}

function fieldRow(label, inputHtml, unit = '', explainHtml = '') {
  return `<div class="wiz-field">
    <label class="wiz-label">${label}</label>
    <div class="wiz-input-row">${inputHtml}${unit ? `<span class="wiz-unit">${unit}</span>` : ''}</div>
    ${explainHtml}
  </div>`;
}

// ──── STEP 0: Gebäude ────
function renderStep0(el) {
  el.innerHTML = `
    ${infoTip('fh')}
    ${fieldRow('Bauweise', `
      <select id="inp-bauweise" class="wiz-select">
        <option value="eingeschossig" ${indbauState.bauweise === 'eingeschossig' ? 'selected' : ''}>Eingeschossig (1 OG, ohne Ebenen)</option>
        <option value="ebenen" ${indbauState.bauweise === 'ebenen' ? 'selected' : ''}>Eingeschossig mit Ebenen</option>
        <option value="mehrgeschossig" ${indbauState.bauweise === 'mehrgeschossig' ? 'selected' : ''}>Mehrgeschossig</option>
      </select>
    `, '',
      explain('Bauweise', 'Gebäudetyp nach IndBauRL Abschnitt 7', '', 'Bestimmt ob Globalnachweis allein reicht oder zusätzlich ein Teilflächennachweis erforderlich ist')
    )}
    ${fieldRow('Grundfläche A<sub>G</sub>', `<input type="number" id="inp-ag" class="wiz-input" value="${indbauState.grundflaeche}" min="100" step="100">`, 'm²',
      explain('A<sub>G</sub>', 'Grundfläche des Brandabschnitts (Bruttogrundfläche)', 'm²', 'Fläche, die von Außen-/Brandwänden umschlossen wird. <strong>Nicht berücksichtigt:</strong> Flächen begehbarer Einbauten/Ebenen ≤ 100 m² (in Summe max. 500 m²), brandschutztechnisch abgetrennte Treppenräume und Schächte.')
    )}
    ${fieldRow('Mittlere lichte Höhe h', `<input type="number" id="inp-hoehe" class="wiz-input" value="${indbauState.hoehe}" min="3" step="0.5">`, 'm',
      explain('h', 'Mittlere lichte Raumhöhe', 'm', 'Bauvolumen geteilt durch Grundfläche (V/A). Bei geneigten Dächern: arithmetisches Mittel aus Trauf- und Firsthöhe abzüglich Dachaufbaudicke. Beeinflusst den Höhenfaktor α<sub>w</sub>.')
    )}
    <div id="ebenen-container" class="${indbauState.bauweise === 'eingeschossig' ? 'hidden' : ''}">
      <div class="wiz-field">
        <label class="wiz-label">Weitere Ebenen / Geschosse (ab 1. OG)</label>
        ${explain('Ebene', 'Geschossebene innerhalb des Brandabschnitts', '', 'Jede Ebene wird mit Fläche, Höhe über Bezugsniveau und Öffnungsverschluss bewertet. FH = Höhenfaktor (Tab. 3), FA = Öffnungsfaktor (Tab. 4). Die Grundfläche (Ebene 1) erhält immer FA=1.0.')}
        <div id="ebenen-list">${renderEbenen()}</div>
        <button class="wiz-btn-small" id="add-ebene">+ Ebene/Geschoss hinzufügen</button>
      </div>
    </div>
  `;
  // Events
  const bauweiseEl = $('#inp-bauweise');
  bauweiseEl.addEventListener('change', () => {
    indbauState.bauweise = bauweiseEl.value;
    $('#ebenen-container').classList.toggle('hidden', indbauState.bauweise === 'eingeschossig');
  });
  $('#add-ebene')?.addEventListener('click', () => {
    indbauState.ebenen.push({
      flaeche: 1000, hoehe: 5, fa: 0.4, unterBezugsniveau: false,
      qrMode: 'direkt', qrDirekt: 50, stoffe: [],
      wMode: 'direkt', wDirekt: 1.0, av: 0, ah: 0
    });
    $('#ebenen-list').innerHTML = renderEbenen();
    attachEbenenEvents();
  });
  attachEbenenEvents();
}

function renderEbenen() {
  if (indbauState.ebenen.length === 0) return '<p class="wiz-muted">Keine Ebenen definiert.</p>';
  if (!indbauState.ebenenExpanded) indbauState.ebenenExpanded = {};
  return indbauState.ebenen.map((e, i) => {
    const expanded = indbauState.ebenenExpanded[i] || false;
    return `
    <div class="ebene-row" data-idx="${i}">
      <div class="ebene-header">
        <strong>Ebene ${i + 2} (${i + 1}. OG)</strong>
        <button class="wiz-btn-del" data-del="${i}">✕</button>
      </div>
      <div class="ebene-fields">
        <div class="ebene-field">
          <span class="ebene-label">Fläche A<sub>i</sub></span>
          <input type="number" class="wiz-input ebene-flaeche" value="${e.flaeche}" min="100"> m²
        </div>
        <div class="ebene-field">
          <span class="ebene-label">Lichte Höhe h<sub>i</sub></span>
          <input type="number" class="wiz-input ebene-hoehe" value="${e.hoehe}" min="0" step="0.5"> m
        </div>
        <div class="ebene-field">
          <span class="ebene-label">Öffnungsverschluss</span>
          <select class="wiz-select ebene-fa">
            ${faOptionen.map(o => `<option value="${o.fa}" ${e.fa === o.fa ? 'selected' : ''}>${o.label}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="ebene-info">FH = ${getFH(e.hoehe, e.unterBezugsniveau).toFixed(2)} · FA = ${e.fa}</div>
      <details class="ebene-details" ${expanded ? 'open' : ''}>
        <summary class="ebene-details-summary">🔥 Brandlast & Öffnungen für diese Ebene</summary>
        <div class="ebene-detail-block">
          <div class="ebene-field">
            <span class="ebene-label">Brandbelastung q<sub>R</sub></span>
            <input type="number" class="wiz-input ebene-qr" value="${e.qrDirekt || 50}" min="15" step="5"> kWh/m²
          </div>
          <div class="ebene-field">
            <span class="ebene-label">Vertikale Öffnungen A<sub>v</sub></span>
            <input type="number" class="wiz-input ebene-av" value="${e.av || 0}" min="0"> m²
          </div>
          <div class="ebene-field">
            <span class="ebene-label">Horizontale Öffnungen A<sub>h</sub></span>
            <input type="number" class="wiz-input ebene-ah" value="${e.ah || 0}" min="0"> m²
          </div>
        </div>
      </details>
    </div>
  `}).join('');
}

function attachEbenenEvents() {
  document.querySelectorAll('.ebene-row').forEach(row => {
    const i = +row.dataset.idx;
    row.querySelector('.ebene-flaeche')?.addEventListener('input', e => { indbauState.ebenen[i].flaeche = +e.target.value; });
    row.querySelector('.ebene-hoehe')?.addEventListener('input', e => { indbauState.ebenen[i].hoehe = +e.target.value; });
    row.querySelector('.ebene-fa')?.addEventListener('change', e => { indbauState.ebenen[i].fa = +e.target.value; });
    row.querySelector('.ebene-qr')?.addEventListener('input', e => { indbauState.ebenen[i].qrDirekt = +e.target.value; });
    row.querySelector('.ebene-av')?.addEventListener('input', e => { indbauState.ebenen[i].av = +e.target.value; });
    row.querySelector('.ebene-ah')?.addEventListener('input', e => { indbauState.ebenen[i].ah = +e.target.value; });
    row.querySelector('.ebene-details')?.addEventListener('toggle', e => {
      if (!indbauState.ebenenExpanded) indbauState.ebenenExpanded = {};
      indbauState.ebenenExpanded[i] = e.target.open;
    });
    row.querySelector('.wiz-btn-del')?.addEventListener('click', () => {
      indbauState.ebenen.splice(i, 1);
      $('#ebenen-list').innerHTML = renderEbenen();
      attachEbenenEvents();
    });
  });
}

// ──── STEP 1: Brandbelastung ────
function renderStep1(el) {
  el.innerHTML = `
    ${infoTip('qR')}
    ${fieldRow('Eingabemodus', `
      <select id="inp-qrmode" class="wiz-select">
        <option value="direkt" ${indbauState.qrMode === 'direkt' ? 'selected' : ''}>qR direkt eingeben</option>
        <option value="stoffe" ${indbauState.qrMode === 'stoffe' ? 'selected' : ''}>Aus Stoffliste berechnen</option>
      </select>
    `, '',
      explain('q<sub>R</sub>', 'Rechnerische Brandbelastung', 'kWh/m²', 'Wärmemenge je m² Grundfläche, die im Brandfall freigesetzt wird. Berechnung: q<sub>R</sub> = Σ(M<sub>i</sub> × H<sub>ui</sub> × m<sub>i</sub>) / A<sub>G</sub>')
    )}
    <div id="qr-direkt" class="${indbauState.qrMode === 'direkt' ? '' : 'hidden'}">
      ${fieldRow('Brandbelastung q<sub>R</sub>', `<input type="number" id="inp-qr" class="wiz-input" value="${indbauState.qrDirekt}" min="15" step="5">`, 'kWh/m²',
        explain('q<sub>R</sub>', 'Mindestens 15 kWh/m² gemäß DIN 18230-1', '', 'Typische Werte: Büro 100–200, Lager 200–1.200, Maschinenhalle 50–100')
      )}
    </div>
    <div id="qr-stoffe" class="${indbauState.qrMode === 'stoffe' ? '' : 'hidden'}">
      ${explain('Formel', 'q<sub>R</sub> = Σ(M<sub>i</sub> × H<sub>ui</sub> × m<sub>i</sub>) / A<sub>G</sub>', '', 'M = Masse [kg], H<sub>u</sub> = Unterer Heizwert [kWh/kg], m = Abbrandfaktor [-]')}
      <div id="stoffe-list">${renderStoffe()}</div>
      <button class="wiz-btn-small" id="add-stoff">+ Stoff hinzufügen</button>
      <div class="wiz-result-mini" id="qr-calc-result"></div>
    </div>
  `;
  $('#inp-qrmode').addEventListener('change', e => {
    indbauState.qrMode = e.target.value;
    $('#qr-direkt').classList.toggle('hidden', indbauState.qrMode !== 'direkt');
    $('#qr-stoffe').classList.toggle('hidden', indbauState.qrMode !== 'stoffe');
  });
  $('#add-stoff')?.addEventListener('click', () => {
    indbauState.stoffe.push({ name: 'Holz (lufttrocken)', masse: 1000, heizwert: 4.9, abbrandfaktor: 0.8, geschuetzt: false, psi: 1.0 });
    $('#stoffe-list').innerHTML = renderStoffe();
    attachStoffeEvents();
    updateQrCalc();
  });
  attachStoffeEvents();
  updateQrCalc();
}

function renderStoffe() {
  if (indbauState.stoffe.length === 0) return '<p class="wiz-muted">Keine Stoffe hinzugefügt.</p>';
  return indbauState.stoffe.map((s, i) => `
    <div class="stoff-row" data-idx="${i}">
      <select class="wiz-select stoff-name">
        ${heizwerte.map(h => `<option value="${h.name}" ${s.name === h.name ? 'selected' : ''}>${h.name} (Hu=${h.Hu}, m=${h.m})</option>`).join('')}
      </select>
      <div class="stoff-fields">
        <div class="ebene-field"><span class="ebene-label">Masse</span><input type="number" class="wiz-input stoff-masse" value="${s.masse}" min="1"> kg</div>
        <div class="ebene-field"><span class="ebene-label">Hu</span><input type="number" class="wiz-input stoff-hu" value="${s.heizwert}" min="0.1" step="0.1"> kWh/kg</div>
        <div class="ebene-field"><span class="ebene-label">m</span><input type="number" class="wiz-input stoff-m" value="${s.abbrandfaktor}" min="0.1" step="0.1" max="2"></div>
        <button class="wiz-btn-del" data-sdel="${i}">✕</button>
      </div>
    </div>
  `).join('');
}

function attachStoffeEvents() {
  document.querySelectorAll('.stoff-row').forEach(row => {
    const i = +row.dataset.idx;
    row.querySelector('.stoff-name')?.addEventListener('change', e => {
      const sel = heizwerte.find(h => h.name === e.target.value);
      if (sel) {
        indbauState.stoffe[i].name = sel.name;
        indbauState.stoffe[i].heizwert = sel.Hu;
        indbauState.stoffe[i].abbrandfaktor = sel.m;
        row.querySelector('.stoff-hu').value = sel.Hu;
        row.querySelector('.stoff-m').value = sel.m;
      }
      updateQrCalc();
    });
    row.querySelector('.stoff-masse')?.addEventListener('input', e => { indbauState.stoffe[i].masse = +e.target.value; updateQrCalc(); });
    row.querySelector('.stoff-hu')?.addEventListener('input', e => { indbauState.stoffe[i].heizwert = +e.target.value; updateQrCalc(); });
    row.querySelector('.stoff-m')?.addEventListener('input', e => { indbauState.stoffe[i].abbrandfaktor = +e.target.value; updateQrCalc(); });
    row.querySelector('[data-sdel]')?.addEventListener('click', () => {
      indbauState.stoffe.splice(i, 1);
      $('#stoffe-list').innerHTML = renderStoffe();
      attachStoffeEvents();
      updateQrCalc();
    });
  });
}

function updateQrCalc() {
  const el = $('#qr-calc-result');
  if (!el || indbauState.stoffe.length === 0) { if (el) el.innerHTML = ''; return; }
  const qr = calcQR(indbauState.stoffe, indbauState.grundflaeche);
  el.innerHTML = `<strong>qR = ${qr.toFixed(1)} kWh/m²</strong> (Minimum: 15 kWh/m²)`;
}

// ──── STEP 2: Wärmeabzug ────
function renderStep2(el) {
  el.innerHTML = `
    ${infoTip('w')}
    ${fieldRow('Eingabemodus', `
      <select id="inp-wmode" class="wiz-select">
        <option value="direkt" ${indbauState.wMode === 'direkt' ? 'selected' : ''}>w direkt eingeben</option>
        <option value="oeffnungen" ${indbauState.wMode === 'oeffnungen' ? 'selected' : ''}>Aus Öffnungsflächen berechnen</option>
      </select>
    `, '',
      explain('w', 'Wärmeabzugsfaktor (dimensionslos)', '', 'Berücksichtigt die Wärmeabfuhr durch Öffnungen. Je mehr Öffnungen → mehr Wärme entweicht → kleineres w → niedrigere tä')
    )}
    <div id="w-direkt" class="${indbauState.wMode === 'direkt' ? '' : 'hidden'}">
      ${fieldRow('Wärmeabzugsfaktor w', `<input type="number" id="inp-w" class="wiz-input" value="${indbauState.wDirekt}" min="0.5" max="3" step="0.1">`, '',
        explain('w', 'Wert zwischen 0,5 und ca. 2,5 nach DIN 18230-1 Tabelle 2', '', 'Minimum w = 0,5 (viele Öffnungen). Ohne Öffnungen: ca. 1,5–2,5')
      )}
    </div>
    <div id="w-oeffnungen" class="${indbauState.wMode === 'oeffnungen' ? '' : 'hidden'}">
      ${fieldRow('Vertikale Öffnungen A<sub>v</sub>', `<input type="number" id="inp-av" class="wiz-input" value="${indbauState.av}" min="0" step="10">`, 'm²',
        explain('A<sub>v</sub>', 'Vertikale Öffnungsfläche', 'm²', 'Summe aller Fenster, Tore und seitlichen Öffnungen in den Außenwänden des Brandabschnitts')
      )}
      ${fieldRow('Horizontale Öffnungen A<sub>h</sub>', `<input type="number" id="inp-ah" class="wiz-input" value="${indbauState.ah}" min="0" step="10">`, 'm²',
        explain('A<sub>h</sub>', 'Horizontale Öffnungsfläche', 'm²', 'Summe aller Dachöffnungen inkl. RWA (Rauch- und Wärmeabzugsanlagen), Lichtkuppeln etc.')
      )}
      <div class="wiz-result-mini" id="w-calc-result"></div>
    </div>
  `;
  $('#inp-wmode').addEventListener('change', e => {
    indbauState.wMode = e.target.value;
    $('#w-direkt').classList.toggle('hidden', indbauState.wMode !== 'direkt');
    $('#w-oeffnungen').classList.toggle('hidden', indbauState.wMode !== 'oeffnungen');
  });
  ['inp-av', 'inp-ah'].forEach(id => {
    $(`#${id}`)?.addEventListener('input', () => updateWCalc());
  });
  updateWCalc();
}

function updateWCalc() {
  const el = $('#w-calc-result');
  if (!el) return;
  const av = +($('#inp-av')?.value || indbauState.av);
  const ah = +($('#inp-ah')?.value || indbauState.ah);
  const wResult = calcW(av, ah, indbauState.grundflaeche, indbauState.hoehe);
  el.innerHTML = `<strong>w = ${wResult.w.toFixed(3)}</strong> (Minimum: 0,5 – A<sub>v</sub>/A<sub>G</sub> = ${(av/indbauState.grundflaeche).toFixed(3)}, A<sub>h</sub>/A<sub>G</sub> = ${(ah/indbauState.grundflaeche).toFixed(3)})`;
}

// ──── STEP 3: Äquivalente Branddauer ────
function renderStep3(el) {
  const qr = getQR();
  const w = getW().w;
  const c = cWerte[indbauState.cIndex].c;
  const tae = calcTae(qr, c, w);

  el.innerHTML = `
    ${infoTip('tae')}
    ${infoTip('c')}
    ${fieldRow('Umrechnungsfaktor c', `
      <select id="inp-c" class="wiz-select">
        ${cWerte.map((cv, i) => `<option value="${i}" ${indbauState.cIndex === i ? 'selected' : ''}>${cv.label} → c = ${cv.c}</option>`).join('')}
      </select>
    `, '',
      explain('c', 'Umrechnungsfaktor nach DIN 18230-1, Tabelle 1', 'min·m²/kWh', cv => `Beschreibt die Wärmespeicherung der Umfassungsbauteile. ${cWerte[indbauState.cIndex].desc}`)
    )}
    <div class="wiz-formula-box">
      <div class="wiz-formula">t<sub>ä</sub> = q<sub>R</sub> × c × w</div>
      <div class="wiz-formula-values">
        ${explain('q<sub>R</sub>', `= ${qr.toFixed(1)} kWh/m²`, '', 'Rechnerische Brandbelastung (Schritt 1)')}
        ${explain('c', `= ${c}`, '', 'Umrechnungsfaktor (Tabelle 1 DIN 18230-1)')}
        ${explain('w', `= ${w.toFixed(3)}`, '', 'Wärmeabzugsfaktor (Schritt 2)')}
        <div class="wiz-calc-line">t<sub>ä</sub> = ${qr.toFixed(1)} × ${c} × ${w.toFixed(3)} = <strong>${tae.toFixed(1)} min</strong></div>
      </div>
    </div>
    ${tae >= 90 ? '<div class="wiz-warning">⚠️ t<sub>ä</sub> ≥ 90 min – Nachweis ohne Bemessung (Tabelle 7) ist NICHT möglich!</div>' : ''}
  `;
  $('#inp-c').addEventListener('change', e => {
    indbauState.cIndex = +e.target.value;
    renderStep3(el);
  });
}

// ──── STEP 4: Sicherheitskategorie ────
function renderStep4(el) {
  const mehrgeschossig = indbauState.bauweise !== 'eingeschossig';
  el.innerHTML = `
    ${infoTip('gamma')}
    ${fieldRow('Sicherheitskategorie', `
      <select id="inp-kat" class="wiz-select">
        ${sicherheitskategorien.map(k => `<option value="${k.id}" ${indbauState.kategorie === k.id ? 'selected' : ''}>${k.label} – ${k.desc}</option>`).join('')}
      </select>
    `, '',
      explain('K 1–K 4', 'Sicherheitskategorien nach IndBauRL Abschnitt 6', '', 'Bestimmen die zulässige Brandabschnittsfläche (Tab. 5) und ob Tabelle 7 (ohne Bemessung) anwendbar ist')
    )}
    ${explain('γ', 'Sicherheitsbeiwert nach DIN 18230-1, Tabelle 2', '', `Hängt ab von Fläche (${indbauState.grundflaeche.toLocaleString('de-DE')} m²) und Bauweise (${mehrgeschossig ? 'mehrgeschossig' : 'eingeschossig'}). Aktuell: γ<sub>SKb3</sub> = ${getGamma('SKb3', indbauState.grundflaeche, mehrgeschossig).toFixed(3)}`)}
    ${infoTip('alphaL')}
    <div class="wiz-field">
      <label class="wiz-label">Zusatzbeiwert α<sub>L</sub> – Infrastrukturmaßnahmen</label>
      ${explain('α<sub>L</sub>', 'Zusatzbeiwert für brandschutztechnische Infrastruktur', '', 'Produkt aller ausgewählten Faktoren. Reduziert erf t<sub>F</sub> wenn Anlagen vorhanden. α<sub>L</sub> = 1,0 ohne Maßnahmen.')}
      <div class="wiz-checkboxes">
        ${alphaLFaktoren.map(f => `
          <label class="wiz-checkbox">
            <input type="checkbox" value="${f.id}" ${indbauState.alphaLSelected.includes(f.id) ? 'checked' : ''}>
            <span>${f.label} <em>(× ${f.faktor})</em></span>
          </label>
        `).join('')}
      </div>
      <div class="wiz-result-mini" id="alphaL-result">α<sub>L</sub> = ${calcAlphaL(indbauState.alphaLSelected).toFixed(3)}</div>
    </div>
  `;
  $('#inp-kat').addEventListener('change', e => { indbauState.kategorie = e.target.value; });
  el.querySelectorAll('.wiz-checkboxes input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => {
      indbauState.alphaLSelected = [...el.querySelectorAll('.wiz-checkboxes input:checked')].map(c => c.value);
      $('#alphaL-result').innerHTML = `α<sub>L</sub> = ${calcAlphaL(indbauState.alphaLSelected).toFixed(3)}`;
    });
  });
}

// ──── STEP 5: Ergebnis (Vollständiger Berechnungsnachweis) ────
function renderStep5(el) {
  const r = indbauState.results;
  if (!r) { el.innerHTML = '<p>Keine Ergebnisse berechnet.</p>'; return; }

  const tab6 = getTabelle6(r.erfTF_SKb3);
  const isEingeschossig = indbauState.bauweise === 'eingeschossig';
  const hatEbenen = indbauState.bauweise === 'ebenen';
  const tab7 = isEingeschossig ? getTab7(indbauState.kategorie, r.tae) : null;
  const ohneBemessungMoeglich = isEingeschossig && r.tae < 90 && tab7;

  el.innerHTML = `
    <div class="wiz-results">
      <div class="calc-report-header">
        <h3>📋 Vollständiger Berechnungsnachweis</h3>
        <p class="wiz-muted">nach MIndBauRL (Mai 2019) &amp; DIN 18230-1 (2010-09)</p>
        <button class="wiz-btn wiz-btn-pdf" id="btn-pdf">📄 Als PDF herunterladen</button>
      </div>

      <!-- A: Eingangsdaten -->
      <div class="calc-section">
        <h4>A. Eingangsdaten</h4>
        <table class="calc-table">
          <tr><td>Bauweise</td><td><strong>${indbauState.bauweise === 'eingeschossig' ? 'Eingeschossig ohne Ebenen' : indbauState.bauweise === 'ebenen' ? 'Eingeschossig mit Ebenen' : 'Mehrgeschossig'}</strong></td></tr>
          <tr><td>Grundfläche A<sub>G</sub></td><td><strong>${indbauState.grundflaeche.toLocaleString('de-DE')} m²</strong></td><td class="calc-desc">Grundfläche des Brandabschnitts</td></tr>
          <tr><td>Lichte Höhe h</td><td><strong>${indbauState.hoehe} m</strong></td><td class="calc-desc">Mittlere lichte Raumhöhe</td></tr>
          <tr><td>Sicherheitskategorie</td><td><strong>${indbauState.kategorie}</strong></td><td class="calc-desc">${sicherheitskategorien.find(k => k.id === indbauState.kategorie)?.desc || ''}</td></tr>
          <tr><td>Umrechnungsfaktor c</td><td><strong>${r.c}</strong></td><td class="calc-desc">${cWerte[indbauState.cIndex].label} (DIN 18230-1 Tab. 1)</td></tr>
        </table>
      </div>

      <!-- B: Brandbelastung -->
      <div class="calc-section">
        <h4>B. Schritt 1 – Rechnerische Brandbelastung q<sub>R</sub></h4>
        ${explain('q<sub>R</sub>', 'Rechnerische Brandbelastung', 'kWh/m²', 'Wärmemenge je m² Grundfläche, die im Brandfall aus den brennbaren Stoffen freigesetzt wird')}
        ${indbauState.qrMode === 'stoffe' && indbauState.stoffe.length > 0 ? `
          <div class="wiz-formula-box">
            <div class="wiz-formula">q<sub>R</sub> = Σ(M<sub>i</sub> × H<sub>ui</sub> × m<sub>i</sub>) / A<sub>G</sub></div>
            <table class="calc-table">
              <tr><th>Stoff</th><th>M<sub>i</sub> [kg]</th><th>H<sub>ui</sub> [kWh/kg]</th><th>m<sub>i</sub> [-]</th><th>= Q<sub>i</sub> [kWh]</th></tr>
              ${indbauState.stoffe.map(s => `
                <tr><td>${s.name}</td><td>${s.masse.toLocaleString('de-DE')}</td><td>${s.heizwert}</td><td>${s.abbrandfaktor}</td><td>${(s.masse * s.heizwert * s.abbrandfaktor).toLocaleString('de-DE', {maximumFractionDigits:1})}</td></tr>
              `).join('')}
              <tr class="calc-sum"><td colspan="4">Σ Q<sub>i</sub></td><td>${indbauState.stoffe.reduce((s,st) => s + st.masse * st.heizwert * st.abbrandfaktor, 0).toLocaleString('de-DE', {maximumFractionDigits:1})} kWh</td></tr>
            </table>
            <div class="wiz-calc-line">q<sub>R</sub> = ${indbauState.stoffe.reduce((s,st) => s + st.masse * st.heizwert * st.abbrandfaktor, 0).toLocaleString('de-DE', {maximumFractionDigits:1})} / ${indbauState.grundflaeche.toLocaleString('de-DE')} = <strong>${r.qr.toFixed(1)} kWh/m²</strong> ${r.qr <= 15 ? '(Mindestwert: 15 kWh/m²)' : ''}</div>
          </div>
        ` : `
          <div class="wiz-formula-box">
            <div class="wiz-calc-line">q<sub>R</sub> = <strong>${r.qr.toFixed(1)} kWh/m²</strong> (direkte Eingabe${r.qr <= 15 ? ', Mindestwert: 15 kWh/m²' : ''})</div>
          </div>
        `}
      </div>

      <!-- C: Wärmeabzug -->
      <div class="calc-section">
        <h4>C. Schritt 2 – Wärmeabzugsfaktor w</h4>
        ${explain('w', 'Wärmeabzugsfaktor (dimensionslos)', '', 'Beschreibt den Wärmeabzug durch Öffnungen in Wänden und Dach. Minimum 0,5.')}
        <div class="wiz-formula-box">
          ${indbauState.wMode === 'oeffnungen' ? `
            <table class="calc-table">
              <tr><td>A<sub>v</sub></td><td>${indbauState.av} m²</td><td class="calc-desc">Vertikale Öffnungsfläche</td></tr>
              <tr><td>A<sub>h</sub></td><td>${indbauState.ah} m²</td><td class="calc-desc">Horizontale Öffnungsfläche</td></tr>
              <tr><td>A<sub>v</sub>/A<sub>G</sub></td><td>${(indbauState.av/indbauState.grundflaeche).toFixed(4)}</td><td class="calc-desc">Vertikales Öffnungsverhältnis</td></tr>
              <tr><td>A<sub>h</sub>/A<sub>G</sub></td><td>${(indbauState.ah/indbauState.grundflaeche).toFixed(4)}</td><td class="calc-desc">Horizontales Öffnungsverhältnis</td></tr>
              <tr><td>β<sub>w</sub></td><td>${typeof r.wObj?.betaW === 'number' ? r.wObj.betaW.toFixed(2) : '-'}</td><td class="calc-desc">Beiwert Wandöffnungen</td></tr>
              <tr><td>w<sub>0</sub></td><td>${typeof r.wObj?.w0 === 'number' ? r.wObj.w0.toFixed(2) : '-'}</td><td class="calc-desc">Basis-Wärmeabzugsfaktor</td></tr>
              <tr><td>α<sub>w</sub></td><td>${typeof r.wObj?.alphaW === 'number' ? r.wObj.alphaW.toFixed(2) : '-'}</td><td class="calc-desc">Höhenfaktor (6,0/h)<sup>0,3</sup></td></tr>
            </table>
          ` : ''}
          <div class="wiz-calc-line">w = <strong>${r.w.toFixed(3)}</strong> ${indbauState.wMode === 'direkt' ? '(direkte Eingabe)' : '(w<sub>0</sub> × α<sub>w</sub>, min. 0,5)'}</div>
        </div>
      </div>

      <!-- D: tä -->
      <div class="calc-section">
        <h4>D. Schritt 3 – Äquivalente Branddauer t<sub>ä</sub></h4>
        ${explain('t<sub>ä</sub>', 'Äquivalente Branddauer', 'min', 'Zeitdauer im Normbrand-Versuch (ETK), die die gleiche thermische Belastung erzeugt wie der reale Brand')}
        <div class="wiz-formula-box">
          <div class="wiz-formula">t<sub>ä</sub> = q<sub>R</sub> × c × w</div>
          ${explain('q<sub>R</sub>', `= ${r.qr.toFixed(1)} kWh/m²`, '', 'Rechnerische Brandbelastung → Abschnitt B')}
          ${explain('c', `= ${r.c}`, '', `Umrechnungsfaktor → ${cWerte[indbauState.cIndex].label}`)}
          ${explain('w', `= ${r.w.toFixed(3)}`, '', 'Wärmeabzugsfaktor → Abschnitt C')}
          <div class="wiz-calc-line">t<sub>ä</sub> = ${r.qr.toFixed(1)} × ${r.c} × ${r.w.toFixed(3)} = <strong>${r.tae.toFixed(1)} min</strong></div>
        </div>
        ${r.tae >= 90 ? '<div class="wiz-warning">⚠️ t<sub>ä</sub> ≥ 90 min – Nachweis ohne Bemessung (Tabelle 7) ist NICHT möglich!</div>' : ''}
      </div>

      <!-- E: γ -->
      <div class="calc-section">
        <h4>E. Schritt 4 – Sicherheitsbeiwert γ</h4>
        ${explain('γ', 'Sicherheitsbeiwert nach DIN 18230-1, Tabelle 2', '', `Abhängig von Brandabschnittsfläche (${indbauState.grundflaeche.toLocaleString('de-DE')} m²) und Bauweise (${r.mehrgeschossig ? 'mehrgeschossig' : 'eingeschossig'})`)}
        <div class="wiz-formula-box">
          <table class="calc-table">
            <tr><th>Sicherheitsklasse</th><th>Beschreibung</th><th>γ</th></tr>
            <tr><td><strong>SKb 3</strong></td><td>Tragende + raumabschließende Bauteile</td><td><strong>${r.gamma_SKb3.toFixed(3)}</strong></td></tr>
            <tr><td><strong>SKb 2</strong></td><td>Tragende Bauteile (nichtraumabschließend)</td><td><strong>${r.gamma_SKb2.toFixed(3)}</strong></td></tr>
            <tr><td><strong>SKb 1</strong></td><td>Sekundärbauteile</td><td><strong>${r.gamma_SKb1.toFixed(3)}</strong></td></tr>
          </table>
          ${explain('Tabelle', `DIN 18230-1 Tabelle 2, Spalte „${r.mehrgeschossig ? 'mehrgeschossig' : 'eingeschossig'}"`, '', `Interpoliert für A<sub>G</sub> = ${indbauState.grundflaeche.toLocaleString('de-DE')} m²`)}
        </div>
      </div>

      <!-- F: erf tF -->
      <div class="calc-section">
        <h4>F. Schritt 5 – Erforderliche Feuerwiderstandsdauer erf t<sub>F</sub></h4>
        ${explain('erf t<sub>F</sub>', 'Erforderliche Feuerwiderstandsdauer', 'min', 'Mindest-Standzeit der Bauteile im Normbrand. Ergibt sich aus tä, γ und αL.')}
        ${explain('α<sub>L</sub>', `= ${r.alphaL.toFixed(3)}`, '', r.alphaL < 1 ? `Reduktion durch: ${indbauState.alphaLSelected.map(id => alphaLFaktoren.find(f => f.id === id)?.label).join(', ')}` : 'Keine brandschutztechnische Infrastruktur gewählt')}

        ${r.ebenenResults && r.ebenenResults.length > 1 ? `
          <div class="wiz-formula-box">
            <div class="wiz-formula">Übersicht: Berechnung pro Ebene</div>
            <table class="calc-table">
              <tr><th>Ebene</th><th>q<sub>R</sub> [kWh/m²]</th><th>w [-]</th><th>t<sub>ä</sub> [min]</th><th>erf t<sub>F</sub> (SKb3) [min]</th></tr>
              ${r.ebenenResults.map(e => `
                <tr class="${e.erfTF_SKb3 === r.erfTF_SKb3 ? 'calc-row-active' : ''}">
                  <td>${e.name}</td>
                  <td>${e.qr.toFixed(1)}</td>
                  <td>${e.w.toFixed(3)}</td>
                  <td>${e.tae.toFixed(1)}</td>
                  <td><strong>${e.erfTF_SKb3.toFixed(1)}</strong></td>
                </tr>
              `).join('')}
            </table>
            <div class="wiz-calc-line">🔺 Maßgebend: <strong>${r.massgebendEbene}</strong> → erf t<sub>F</sub> = <strong>${r.erfTF_SKb3.toFixed(1)} min</strong> (SKb3)</div>
          </div>

          ${r.ebenenResults.map(e => `
            <details class="calc-ebene-detail">
              <summary>📐 Detailberechnung: ${e.name}</summary>
              <div class="calc-ebene-detail-body">
                <table class="calc-table">
                  <tr><td>Fläche A<sub>i</sub></td><td>${e.flaeche.toLocaleString('de-DE')} m²</td></tr>
                  <tr><td>Lichte Höhe h<sub>i</sub></td><td>${e.hoehe} m</td></tr>
                  <tr><td>q<sub>R</sub></td><td>${e.qr.toFixed(1)} kWh/m²</td></tr>
                  ${typeof e.wObj?.betaW === 'number' ? `
                    <tr><td>β<sub>w</sub></td><td>${e.wObj.betaW.toFixed(2)}</td></tr>
                    <tr><td>w<sub>0</sub></td><td>${e.wObj.w0.toFixed(4)}</td></tr>
                    <tr><td>α<sub>w</sub></td><td>${e.wObj.alphaW.toFixed(4)}</td></tr>
                  ` : ''}
                  <tr><td>w</td><td><strong>${e.w.toFixed(3)}</strong></td></tr>
                  <tr><td>t<sub>ä</sub> = ${e.qr.toFixed(1)} × ${r.c} × ${e.w.toFixed(3)}</td><td><strong>${e.tae.toFixed(1)} min</strong></td></tr>
                </table>
                <table class="calc-table" style="margin-top:6px;">
                  <tr><th>SKb</th><th>Rechnung</th><th>erf t<sub>F</sub></th></tr>
                  <tr><td>SKb 3</td><td>${e.tae.toFixed(1)} × ${r.gamma_SKb3.toFixed(3)} × ${r.alphaL.toFixed(3)}</td><td><strong>${e.erfTF_SKb3.toFixed(1)} min</strong></td></tr>
                  <tr><td>SKb 2</td><td>${e.tae.toFixed(1)} × ${r.gamma_SKb2.toFixed(3)} × ${r.alphaL.toFixed(3)}</td><td><strong>${e.erfTF_SKb2.toFixed(1)} min</strong></td></tr>
                  <tr><td>SKb 1</td><td>${e.tae.toFixed(1)} × ${r.gamma_SKb1.toFixed(3)} × ${r.alphaL.toFixed(3)}</td><td><strong>${e.erfTF_SKb1.toFixed(1)} min</strong></td></tr>
                </table>
              </div>
            </details>
          `).join('')}
        ` : `
          <div class="wiz-formula-box">
            <div class="wiz-formula">erf t<sub>F</sub> = t<sub>ä</sub> × γ × α<sub>L</sub></div>
            <table class="calc-table">
              <tr><th>SKb</th><th>Rechnung</th><th>erf t<sub>F</sub></th></tr>
              <tr><td>SKb 3</td><td>${r.tae.toFixed(1)} × ${r.gamma_SKb3.toFixed(3)} × ${r.alphaL.toFixed(3)}</td><td><strong>${r.erfTF_SKb3.toFixed(1)} min</strong></td></tr>
              <tr><td>SKb 2</td><td>${r.tae.toFixed(1)} × ${r.gamma_SKb2.toFixed(3)} × ${r.alphaL.toFixed(3)}</td><td><strong>${r.erfTF_SKb2.toFixed(1)} min</strong></td></tr>
              <tr><td>SKb 1</td><td>${r.tae.toFixed(1)} × ${r.gamma_SKb1.toFixed(3)} × ${r.alphaL.toFixed(3)}</td><td><strong>${r.erfTF_SKb1.toFixed(1)} min</strong></td></tr>
            </table>
          </div>
        `}
        ${r.erfTF_SKb3 > 90 ? `<div class="wiz-warning">🚨 erf t<sub>F</sub> (SKb3) > 90 min → Verfahren nach Abschnitt 7 ist <strong>NICHT zulässig</strong>!</div>` : ''}
      </div>

      <!-- G: Globaler Flächennachweis -->
      <div class="calc-section">
        <h4>G. Globaler Flächennachweis</h4>
        ${explain('A<sub>bew</sub>', 'Bewertete Brandabschnittsfläche', 'm²', 'Summe aller Teilflächen multipliziert mit ihren Faktoren FH (Höhe) und FA (Öffnungen)')}
        ${explain('zul A<sub>bew</sub>', `= ${r.zulAbew.toLocaleString('de-DE')} m²`, '', `Zulässige bewertete Fläche nach IndBauRL Tabelle 5 für ${indbauState.kategorie} bei t<sub>ä</sub> = ${r.tae.toFixed(1)} min`)}
        <div class="wiz-formula-box">
          <div class="wiz-formula">A<sub>bew</sub> = Σ(A<sub>i</sub> × FH<sub>i</sub> × FA<sub>i</sub>)</div>
          <table class="calc-table">
            <tr><th>Fläche</th><th>A<sub>i</sub> [m²]</th><th>FH<sub>i</sub></th><th>FA<sub>i</sub></th><th>= Beitrag</th></tr>
            ${r.bewSteps.map(s => `
              <tr><td>${s.name}</td><td>${s.flaeche.toLocaleString('de-DE')}</td><td>${s.fh.toFixed(2)}</td><td>${s.fa.toFixed(1)}</td><td>${s.beitrag.toLocaleString('de-DE')} m²</td></tr>
            `).join('')}
            <tr class="calc-sum"><td colspan="4">A<sub>bew</sub></td><td><strong>${r.bewFlaeche.toLocaleString('de-DE')} m²</strong></td></tr>
          </table>
        </div>
        <div class="wiz-check ${r.bewFlaeche <= r.zulAbew ? 'wiz-check--pass' : 'wiz-check--fail'}">
          ${r.bewFlaeche <= r.zulAbew
            ? `✅ Globalnachweis erfüllt: A<sub>bew</sub> = ${r.bewFlaeche.toLocaleString('de-DE')} m² ≤ zul A<sub>bew</sub> = ${r.zulAbew.toLocaleString('de-DE')} m²`
            : `❌ Globalnachweis NICHT erfüllt: A<sub>bew</sub> = ${r.bewFlaeche.toLocaleString('de-DE')} m² > zul A<sub>bew</sub> = ${r.zulAbew.toLocaleString('de-DE')} m²`
          }
        </div>
      </div>

      <!-- H: Teilflächennachweis -->
      ${indbauState.bauweise !== 'eingeschossig' && r.teilNachweis ? `
      <div class="calc-section">
        <h4>H. Teilflächennachweis (75%-Regel nach MIndBauRL 7.4)</h4>
        ${explain('Regel', 'Grundfläche jedes einzelnen Geschosses / Ebene darf max. 75% der zul A<sub>bew</sub> betragen', '', 'Bei Brandabschnitten mit Ebenen oder in mehrgeschossiger Bauweise muss JEDES Geschoss einzeln geprüft werden. Bewertungsfaktoren (FH, FA) spielen hierbei keine Rolle.')}
        <div class="wiz-formula-box">
          <div class="wiz-formula">A<sub>i</sub> ≤ 0,75 × zul A<sub>bew</sub> = ${r.teilNachweis.grenzwert.toLocaleString('de-DE')} m²</div>
          <table class="calc-table">
            <tr><th>Ebene / Geschoss</th><th>Nachweisberechnung</th><th>Ergebnis</th></tr>
            ${r.teilNachweis.ergebnisse.map(e => `
              <tr class="${e.bestanden ? '' : 'calc-row-fail'}">
                <td>${e.name}</td>
                <td>A<sub>i</sub> = ${e.tatsaechlicheFlaeche.toLocaleString('de-DE')} m² ≤ ${r.teilNachweis.grenzwert.toLocaleString('de-DE')} m²</td>
                <td>${e.bestanden ? '✅ Bestanden' : '❌ Zu groß'}</td>
              </tr>
            `).join('')}
          </table>
        </div>
        <div class="wiz-check ${r.teilNachweis.allesBestanden ? 'wiz-check--pass' : 'wiz-check--fail'}">
          ${r.teilNachweis.allesBestanden
            ? '✅ Teilflächennachweis (75%-Regel) erfüllt: Alle Ebenen liegen unter dem Grenzwert.'
            : '❌ Teilflächennachweis NICHT erfüllt: Mindestens eine Ebene ist zu groß.'
          }
        </div>
      </div>
      ` : ''}

      <!-- I: Tabelle 6 -->
      <div class="calc-section">
        <h4>${hatEbenen || indbauState.bauweise === 'mehrgeschossig' ? 'I' : 'H'}. Anforderungen an Bauteile (IndBauRL Tabelle 6)</h4>
        ${explain('erf t<sub>F</sub>', `= ${r.erfTF_SKb3.toFixed(1)} min (SKb3)`, '', `Bestimmt die Zeile in Tabelle 6: "${tab6.range} min"`)}
        <div class="result-table">
          <div class="result-table-header">
            <span>erf t<sub>F</sub></span><span>Spalte 2: Trennende Bauteile</span><span>Spalte 3: SKb 3</span><span>Spalte 4: SKb 2+1</span>
          </div>
          <div class="result-table-row result-table-row--active">
            <span>${tab6.range} min</span>
            <span>${tab6.spalte2}</span>
            <span>${tab6.spalte3}</span>
            <span>${tab6.spalte4}</span>
          </div>
        </div>
      </div>

      ${ohneBemessungMoeglich ? `
        <div class="calc-section">
          <h4>${hatEbenen || indbauState.bauweise === 'mehrgeschossig' ? 'J' : 'I'}. Alternative: Ohne Bemessung (IndBauRL Tabelle 7)</h4>
          ${explain('Tab. 7', 'Nachweis ohne Bemessung', '', 'Eingeschossig, ohne Ebenen, tä < 90 min → Alternativnachweis über Flächenbegrenzung möglich')}
          <div class="result-grid">
            <div class="result-card">
              <div class="result-label">Max. Fläche (${indbauState.kategorie})</div>
              <div class="result-value">${tab7.maxFlaeche.toLocaleString('de-DE')} m²</div>
            </div>
            <div class="result-card">
              <div class="result-label">Mindest-Wärmeabzug</div>
              <div class="result-value">${tab7.waermeabzug} %</div>
            </div>
            <div class="result-card">
              <div class="result-label">Max. Breite</div>
              <div class="result-value">${tab7.maxBreite} m</div>
            </div>
          </div>
          <div class="wiz-check wiz-check--info">ℹ️ Wenn Fläche und Breite eingehalten werden: <strong>Keine Anforderungen an Feuerwiderstandsfähigkeit der tragenden Bauteile!</strong></div>
        </div>
      ` : ''}

      <!-- Gesamtergebnis -->
      <div class="calc-section calc-section--final">
        <h4>⚖️ Gesamtergebnis</h4>
        <div class="wiz-check ${r.gesamtBestanden ? 'wiz-check--pass' : 'wiz-check--fail'}" style="font-size:1.1rem">
          ${r.gesamtBestanden
            ? '✅ Alle Nachweise erfüllt – Brandabschnitt nach IndBauRL Abschnitt 7 zulässig'
            : '❌ Nachweis nicht erfüllt – Maßnahmen zur Reduzierung erforderlich'
          }
        </div>
      </div>
    </div>
  `;

  // PDF button
  $('#btn-pdf')?.addEventListener('click', () => generatePDF());
}

// ──── PDF Export ────
function generatePDF() {
  const content = document.querySelector('.wiz-results');
  if (!content) return;
  const printWin = window.open('', '_blank');
  const dateStr = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  printWin.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>IndBauRL Nachweis – ${dateStr}</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px 40px; color: #1a1a2e; font-size: 11pt; line-height: 1.5; }
      h3 { font-size: 16pt; margin-bottom: 8px; border-bottom: 2px solid #4361ee; padding-bottom: 4px; color: #1a1a2e; }
      h4 { font-size: 12pt; margin: 16px 0 8px; color: #4361ee; }
      .calc-report-header p { color: #666; font-size: 10pt; }
      .calc-report-header button { display: none; }
      .calc-section { margin-bottom: 14px; padding: 10px; border: 1px solid #e0e0e0; border-radius: 6px; break-inside: avoid; }
      .calc-section--final { border: 2px solid #4361ee; background: #f0f4ff; }
      .calc-table { width: 100%; border-collapse: collapse; margin: 8px 0; font-size: 10pt; }
      .calc-table th, .calc-table td { border: 1px solid #ddd; padding: 4px 8px; text-align: left; }
      .calc-table th { background: #f5f5f5; font-weight: 600; }
      .calc-sum td { font-weight: 700; border-top: 2px solid #333; }
      .calc-row-fail { background: #fff0f0; }
      .calc-desc { color: #666; font-size: 9pt; font-style: italic; }
      .wiz-explain { display: flex; gap: 6px; align-items: baseline; padding: 3px 0; font-size: 9.5pt; color: #555; flex-wrap: wrap; }
      .wiz-sym { font-weight: 700; color: #4361ee; min-width: 30px; }
      .wiz-fullname { color: #333; }
      .wiz-eunit { color: #888; }
      .wiz-edesc { color: #666; }
      .wiz-formula-box { background: #f8f9ff; border: 1px solid #c7d2fe; border-radius: 6px; padding: 10px 14px; margin: 8px 0; }
      .wiz-formula { font-size: 13pt; font-weight: 700; color: #4361ee; margin-bottom: 6px; }
      .wiz-calc-line { font-size: 11pt; margin-top: 6px; padding-top: 6px; border-top: 1px dashed #c7d2fe; }
      .wiz-check { padding: 8px 12px; border-radius: 6px; margin: 8px 0; font-weight: 600; }
      .wiz-check--pass { background: #d4edda; color: #155724; }
      .wiz-check--fail { background: #f8d7da; color: #721c24; }
      .wiz-check--info { background: #e8f0ff; color: #004085; }
      .wiz-warning { background: #fff3cd; color: #856404; padding: 8px 12px; border-radius: 6px; margin: 8px 0; }
      .wiz-muted { color: #888; }
      .result-table { border: 1px solid #ddd; border-radius: 6px; overflow: hidden; margin: 8px 0; font-size: 10pt; }
      .result-table-header, .result-table-row { display: grid; grid-template-columns: 80px 1fr 1fr 1fr; gap: 1px; }
      .result-table-header span { background: #f5f5f5; padding: 6px; font-weight: 600; }
      .result-table-row span { padding: 6px; border-top: 1px solid #ddd; }
      .result-table-row--active { background: #f0f4ff; }
      .result-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 8px 0; }
      .result-card { background: #f8f9ff; border: 1px solid #e0e0e0; border-radius: 6px; padding: 10px; text-align: center; }
      .result-label { font-size: 9pt; color: #666; }
      .result-value { font-size: 14pt; font-weight: 700; color: #1a1a2e; }
      @page { margin: 20mm 15mm; }
      .print-footer { margin-top: 30px; padding-top: 10px; border-top: 1px solid #ccc; font-size: 8pt; color: #999; text-align: center; }
    </style></head><body>
    ${content.innerHTML}
    <div class="print-footer">Erstellt am ${dateStr} mit IndBauRL Prüftool | Berechnungsgrundlage: MIndBauRL (Mai 2019) &amp; DIN 18230-1 (2010-09)</div>
    </body></html>`);
  printWin.document.close();
  setTimeout(() => { printWin.print(); }, 400);
}

// ──── Helpers ────
function getQR() {
  if (indbauState.qrMode === 'direkt') return Math.max(indbauState.qrDirekt, 15);
  return calcQR(indbauState.stoffe, indbauState.grundflaeche);
}

function getW() {
  if (indbauState.wMode === 'direkt') return { w0: '-', alphaW: '-', betaW: '-', w: Math.max(indbauState.wDirekt, 0.5) };
  return calcW(indbauState.av, indbauState.ah, indbauState.grundflaeche, indbauState.hoehe);
}

function readStepInputs() {
  switch (indbauState.step) {
    case 0:
      indbauState.bauweise = $('#inp-bauweise')?.value || indbauState.bauweise;
      indbauState.grundflaeche = +($('#inp-ag')?.value || indbauState.grundflaeche);
      indbauState.hoehe = +($('#inp-hoehe')?.value || indbauState.hoehe);
      break;
    case 1:
      indbauState.qrMode = $('#inp-qrmode')?.value || indbauState.qrMode;
      if (indbauState.qrMode === 'direkt') indbauState.qrDirekt = +($('#inp-qr')?.value || indbauState.qrDirekt);
      break;
    case 2:
      indbauState.wMode = $('#inp-wmode')?.value || indbauState.wMode;
      if (indbauState.wMode === 'direkt') indbauState.wDirekt = +($('#inp-w')?.value || indbauState.wDirekt);
      else {
        indbauState.av = +($('#inp-av')?.value || indbauState.av);
        indbauState.ah = +($('#inp-ah')?.value || indbauState.ah);
      }
      break;
    case 3:
      indbauState.cIndex = +($('#inp-c')?.value ?? indbauState.cIndex);
      break;
    case 4:
      indbauState.kategorie = $('#inp-kat')?.value || indbauState.kategorie;
      indbauState.alphaLSelected = [...document.querySelectorAll('.wiz-checkboxes input:checked')].map(c => c.value);
      break;
  }
}

function calculateResults() {
  readStepInputs();
  const c = cWerte[indbauState.cIndex].c;
  const mehrgeschossig = indbauState.bauweise !== 'eingeschossig';
  const flaeche = indbauState.grundflaeche;
  const alphaL = calcAlphaL(indbauState.alphaLSelected);
  
  const gamma_SKb3 = getGamma('SKb3', flaeche, mehrgeschossig);
  const gamma_SKb2 = getGamma('SKb2', flaeche, mehrgeschossig);
  const gamma_SKb1 = getGamma('SKb1', flaeche, mehrgeschossig);

  // ── Ebene 1 (EG) ── Berechnung aus globalen Inputs
  const qr = getQR();
  const wObj = getW();
  const w = wObj.w;
  const tae = calcTae(qr, c, w);
  const erfTF_SKb3 = calcErfTF(tae, gamma_SKb3, alphaL);
  const erfTF_SKb2 = calcErfTF(tae, gamma_SKb2, alphaL);
  const erfTF_SKb1 = calcErfTF(tae, gamma_SKb1, alphaL);

  // ── Per-Level Berechnung ──
  const ebenenResults = [];
  // Ebene 1 = EG (globale Werte)
  ebenenResults.push({
    name: 'Ebene 1 (EG)',
    flaeche: flaeche,
    hoehe: indbauState.hoehe,
    qr, wObj, w, tae,
    erfTF_SKb3, erfTF_SKb2, erfTF_SKb1,
  });

  // Weitere Ebenen mit eigenen Brandlasten
  if (mehrgeschossig && indbauState.ebenen) {
    indbauState.ebenen.forEach((eb, i) => {
      const eQr = Math.max(eb.qrDirekt || 50, 15);
      const eWObj = calcW(eb.av || 0, eb.ah || 0, eb.flaeche, eb.hoehe);
      const eW = eWObj.w;
      const eTae = calcTae(eQr, c, eW);
      const eErfSKb3 = calcErfTF(eTae, gamma_SKb3, alphaL);
      const eErfSKb2 = calcErfTF(eTae, gamma_SKb2, alphaL);
      const eErfSKb1 = calcErfTF(eTae, gamma_SKb1, alphaL);
      ebenenResults.push({
        name: `Ebene ${i + 2} (${i + 1}. OG)`,
        flaeche: eb.flaeche,
        hoehe: eb.hoehe,
        qr: eQr, wObj: eWObj, w: eW, tae: eTae,
        erfTF_SKb3: eErfSKb3, erfTF_SKb2: eErfSKb2, erfTF_SKb1: eErfSKb1,
      });
    });
  }

  // Maßgebend = Maximum aller Ebenen
  const massgebendSKb3 = Math.max(...ebenenResults.map(e => e.erfTF_SKb3));
  const massgebendSKb2 = Math.max(...ebenenResults.map(e => e.erfTF_SKb2));
  const massgebendSKb1 = Math.max(...ebenenResults.map(e => e.erfTF_SKb1));
  const massgebendTae = Math.max(...ebenenResults.map(e => e.tae));
  const massgebendEbene = ebenenResults.find(e => e.erfTF_SKb3 === massgebendSKb3)?.name || 'EG';

  // Kombiniertes Ebenen-Array für Flächennachweis (Grundfläche = Index 0 = Ebene 1)
  const calcEbenen = [{ flaeche: flaeche, hoehe: 0, fa: 1.0, unterBezugsniveau: false }];
  if (mehrgeschossig && indbauState.ebenen) {
    calcEbenen.push(...indbauState.ebenen);
  }

  // Detaillierter Globaler Flächennachweis
  const bewDetailed = calcBewFlaecheDetailed(calcEbenen);
  const zulAbew = getZulAbew(indbauState.kategorie, massgebendTae);

  // Teilflächennachweis / 75%-Regel
  let teilNachweis = null;
  if (mehrgeschossig) {
    teilNachweis = calcEbenenNachweis(calcEbenen, zulAbew);
  }

  // Gesamtergebnis
  const globalOk = bewDetailed.bewFlaeche <= zulAbew;
  const teilOk = teilNachweis ? teilNachweis.allesBestanden : true;
  const gesamtBestanden = globalOk && teilOk && massgebendSKb3 <= 90;

  indbauState.results = {
    qr, w, wObj, c, tae, mehrgeschossig,
    gamma_SKb3, gamma_SKb2, gamma_SKb1, alphaL,
    erfTF_SKb3: massgebendSKb3, erfTF_SKb2: massgebendSKb2, erfTF_SKb1: massgebendSKb1,
    ebenenResults, massgebendEbene,
    bewFlaeche: bewDetailed.bewFlaeche,
    bewSteps: bewDetailed.steps,
    zulAbew, teilNachweis, gesamtBestanden,
  };
}

// === Boot ===
init();
