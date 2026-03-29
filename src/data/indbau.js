// === IndBauRL Abschnitt 7 – Daten, Tabellen & Berechnungen ===
// Basiert auf MIndBauRL (Stand Mai 2019) und DIN 18230-1 (2010-09)

// ───────────────────────────────────────────
// HEIZWERT-DATENBANK (häufige Stoffe)
// ───────────────────────────────────────────
export const heizwerte = [
  { name: 'Holz (lufttrocken)',        Hu: 4.9,  m: 0.8,  gruppe: 'Holz' },
  { name: 'Holzkrippen (Prüfnorm)',    Hu: 4.9,  m: 1.0,  gruppe: 'Holz' },
  { name: 'Spanplatten',               Hu: 4.9,  m: 0.8,  gruppe: 'Holz' },
  { name: 'Papier / Pappe (gestapelt)',Hu: 4.5,  m: 0.9,  gruppe: 'Papier' },
  { name: 'Papier (lose)',             Hu: 4.5,  m: 1.0,  gruppe: 'Papier' },
  { name: 'Textilien (Baumwolle)',     Hu: 4.5,  m: 0.9,  gruppe: 'Textil' },
  { name: 'Polyethylen (PE)',          Hu: 12.3, m: 1.0,  gruppe: 'Kunststoff' },
  { name: 'Polypropylen (PP)',         Hu: 12.0, m: 1.0,  gruppe: 'Kunststoff' },
  { name: 'Polystyrol (PS)',           Hu: 11.3, m: 1.0,  gruppe: 'Kunststoff' },
  { name: 'PVC',                       Hu: 5.0,  m: 1.0,  gruppe: 'Kunststoff' },
  { name: 'Gummi / Reifen',           Hu: 9.0,  m: 1.0,  gruppe: 'Kunststoff' },
  { name: 'Mineralöl / Diesel',       Hu: 11.9, m: 1.0,  gruppe: 'Flüssigkeit' },
  { name: 'Benzin',                    Hu: 12.0, m: 1.0,  gruppe: 'Flüssigkeit' },
  { name: 'Ethanol',                   Hu: 7.4,  m: 1.0,  gruppe: 'Flüssigkeit' },
  { name: 'Stroh / Heu',              Hu: 4.7,  m: 0.5,  gruppe: 'Natürlich' },
  { name: 'Getreide',                  Hu: 4.7,  m: 0.5,  gruppe: 'Natürlich' },
  { name: 'Benutzerdefiniert',         Hu: 0,    m: 1.0,  gruppe: 'Sonstige' },
];

// ───────────────────────────────────────────
// TABELLE 1 DIN 18230-1: Umrechnungsfaktor c
// ───────────────────────────────────────────
export const cWerte = [
  { label: 'Leichtbau (Stahl, Glas, Sandwichpaneele)', c: 0.25, desc: 'Geringe Wärmespeicherung – Wärme bleibt im Raum' },
  { label: 'Mischkonstruktion (Stahl + Mauerwerk/Beton)', c: 0.20, desc: 'Mittlere Wärmespeicherung' },
  { label: 'Massivbau (Beton/Mauerwerk allseitig)', c: 0.15, desc: 'Hohe Wärmespeicherung – Wärme wird absorbiert' },
  { label: 'Schwerer Massivbau (dicker Beton)', c: 0.09, desc: 'Sehr hohe Wärmespeicherung' },
];

// ───────────────────────────────────────────
// TABELLE 3 IndBauRL: Höhenfaktor FH
// ───────────────────────────────────────────
// Formel für lineare Interpolation: FH = 1.0 + (Höhe / 50)
export function getFH(abstand, unterBezugsniveau = false) {
  const absAbstand = Math.abs(abstand || 0);
  let fh = 1.0 + (absAbstand / 50.0);
  fh = Math.min(1.4, Math.max(1.0, fh)); // Begrenzung zwischen 1.0 und 1.4
  return unterBezugsniveau ? fh * 2 : fh;
}

// ───────────────────────────────────────────
// TABELLE 4 IndBauRL: Öffnungsfaktor FA
// ───────────────────────────────────────────
export const faOptionen = [
  { label: 'Öffnungen durch Bauteile nach SKb3 geschlossen', fa: 0.4, desc: 'Höchste Qualität: Feuerwiderstandsfähige Verschlüsse verhindern Brandausbreitung.' },
  { label: 'Durch nichtbrennbare Baustoffe geschlossen (≤ 10% der Ebenenfläche)', fa: 0.7, desc: 'Nichtbrennbare Verschlüsse, aber max. 10% der Ebenenfläche. Darüber gilt FA = 1,7.' },
  { label: 'Ohne Verschluss (offene Deckenöffnungen)', fa: 1.7, desc: 'Keine Verschlüsse – ungehinderte vertikale Brandausbreitung möglich.' },
];

// ───────────────────────────────────────────
// TABELLE 5 IndBauRL: Zulässige bewertete Fläche zul Abew
// ───────────────────────────────────────────
// Stützstellen: tä = 0, 15, 30, 60, 90 min
const tab5Stuetzstellen = [0, 15, 30, 60, 90];
const tab5Werte = {
  'K1':   [40000, 20000, 12000, 6000,  4000],
  'K2':   [60000, 30000, 18000, 9000,  6000],
  'K3.1': [72000, 36000, 21600, 10800, 7200],
  'K3.2': [80000, 40000, 24000, 12000, 8000],
  'K3.3': [92000, 46000, 27600, 13800, 9200],
  'K3.4': [100000, 50000, 30000, 15000, 10000],
  'K4':   [140000, 70000, 42000, 21000, 14000],
};

export function getZulAbew(kategorie, tae) {
  const werte = tab5Werte[kategorie];
  if (!werte) return null;
  const clampedTae = Math.max(0, Math.min(90, tae));
  // Finde Interpolationsbereich
  let lIdx = 0;
  for (let i = 0; i < tab5Stuetzstellen.length - 1; i++) {
    if (clampedTae >= tab5Stuetzstellen[i]) lIdx = i;
  }
  const uIdx = Math.min(lIdx + 1, tab5Stuetzstellen.length - 1);
  if (lIdx === uIdx) return werte[lIdx];
  const t = (clampedTae - tab5Stuetzstellen[lIdx]) / (tab5Stuetzstellen[uIdx] - tab5Stuetzstellen[lIdx]);
  return Math.round(werte[lIdx] + t * (werte[uIdx] - werte[lIdx]));
}

// ───────────────────────────────────────────
// TABELLE 7 IndBauRL: Ohne Bemessung (eingeschossig)
// ───────────────────────────────────────────
const tab7Stuetzstellen = [15, 30, 60, 90];
const tab7Werte = {
  'K1':   [9000,  5500,  2700,  1800],
  'K2':   [13500, 8000,  4000,  2700],
  'K3.1': [16000, 10000, 5000,  3200],
  'K3.2': [18000, 11000, 5400,  3600],
  'K3.3': [20700, 12500, 6200,  4200],
  'K3.4': [22500, 13500, 6800,  4500],
  'K4':   [30000, 20000, 10000, 10000],
};
const tab7Waermeabzug = [1, 2, 3, 4]; // % bezogen auf Fläche
const tab7MaxBreite = [80, 60, 50, 40]; // m

export function getTab7(kategorie, tae) {
  const werte = tab7Werte[kategorie];
  if (!werte || tae >= 90) return null;
  const clampedTae = Math.max(15, Math.min(90, tae));
  let lIdx = 0;
  for (let i = 0; i < tab7Stuetzstellen.length - 1; i++) {
    if (clampedTae >= tab7Stuetzstellen[i]) lIdx = i;
  }
  const uIdx = Math.min(lIdx + 1, tab7Stuetzstellen.length - 1);
  if (lIdx === uIdx) return { maxFlaeche: werte[lIdx], waermeabzug: tab7Waermeabzug[lIdx], maxBreite: tab7MaxBreite[lIdx] };
  const t = (clampedTae - tab7Stuetzstellen[lIdx]) / (tab7Stuetzstellen[uIdx] - tab7Stuetzstellen[lIdx]);
  return {
    maxFlaeche: Math.round(werte[lIdx] + t * (werte[uIdx] - werte[lIdx])),
    waermeabzug: +(tab7Waermeabzug[lIdx] + t * (tab7Waermeabzug[uIdx] - tab7Waermeabzug[lIdx])).toFixed(1),
    maxBreite: Math.round(tab7MaxBreite[lIdx] + t * (tab7MaxBreite[uIdx] - tab7MaxBreite[lIdx])),
  };
}

// ───────────────────────────────────────────
// TABELLE 2 DIN 18230-1: Sicherheitsbeiwert γ
// ───────────────────────────────────────────
// Eingeschossig ohne Ebenen
const gammaStuetzstellenFlaeche = [2500, 5000, 10000, 20000, 60000, 120000];
const gammaEingeschossig = {
  SKb3: [1.00, 1.05, 1.10, 1.20, 1.35, 1.50],
  SKb2: [0.60, 0.60, 0.70, 0.80, 1.00, 1.10],
  SKb1: [0.50, 0.50, 0.50, 0.50, 0.55, 0.60],
};
// Mehrgeschossig / mit Ebenen
const gammaMehrgeschossig = {
  SKb3: [1.25, 1.30, 1.35, 1.45, 1.60, 1.75],
  SKb2: [0.80, 0.80, 0.85, 0.95, 1.15, 1.30],
  SKb1: [0.55, 0.55, 0.55, 0.55, 0.60, 0.65],
};

export function getGamma(skb, flaeche, mehrgeschossig = false) {
  const tabelle = mehrgeschossig ? gammaMehrgeschossig : gammaEingeschossig;
  const werte = tabelle[skb];
  if (!werte) return 1.0;
  const clampedA = Math.max(2500, Math.min(120000, flaeche));
  let lIdx = 0;
  for (let i = 0; i < gammaStuetzstellenFlaeche.length - 1; i++) {
    if (clampedA >= gammaStuetzstellenFlaeche[i]) lIdx = i;
  }
  const uIdx = Math.min(lIdx + 1, gammaStuetzstellenFlaeche.length - 1);
  if (lIdx === uIdx) return werte[lIdx];
  const t = (clampedA - gammaStuetzstellenFlaeche[lIdx]) / (gammaStuetzstellenFlaeche[uIdx] - gammaStuetzstellenFlaeche[lIdx]);
  return +(werte[lIdx] + t * (werte[uIdx] - werte[lIdx])).toFixed(3);
}

// ───────────────────────────────────────────
// αL – Zusatzbeiwert Infrastruktur
// ───────────────────────────────────────────
export const alphaLFaktoren = [
  { id: 'bma',       label: 'Automatische Brandmeldeanlage (BMA)',              faktor: 0.90 },
  { id: 'halbloesch', label: 'Halbstationäre Feuerlöschanlage',                 faktor: 0.95 },
  { id: 'sprinkler', label: 'Selbsttätige Feuerlöschanlage (z. B. Sprinkler)', faktor: 0.60 },
  { id: 'wf1nb',     label: 'Werkfeuerwehr – 1 Staffel (nebenberuflich)',       faktor: 0.95 },
  { id: 'wf1hb',     label: 'Werkfeuerwehr – 1 Staffel (hauptberuflich)',       faktor: 0.90 },
  { id: 'wfgruppe',  label: 'Werkfeuerwehr – Gruppenstärke',                   faktor: 0.85 },
  { id: 'wf2',       label: 'Werkfeuerwehr – 2 Staffeln',                      faktor: 0.75 },
  { id: 'wf3',       label: 'Werkfeuerwehr – 3 Staffeln',                      faktor: 0.70 },
  { id: 'wf4',       label: 'Werkfeuerwehr – 4 Staffeln',                      faktor: 0.60 },
];

export function calcAlphaL(selectedIds) {
  if (!selectedIds || selectedIds.length === 0) return 1.0;
  let result = 1.0;
  selectedIds.forEach(id => {
    const f = alphaLFaktoren.find(a => a.id === id);
    if (f) result *= f.faktor;
  });
  return +result.toFixed(4);
}

// ───────────────────────────────────────────
// SICHERHEITSKATEGORIEN K1–K4
// ───────────────────────────────────────────
export const sicherheitskategorien = [
  { id: 'K1',   label: 'K 1', desc: 'Keine besonderen Maßnahmen für Brandmeldung und Brandbekämpfung.' },
  { id: 'K2',   label: 'K 2', desc: 'Automatische Brandmeldeanlage (BMA) vorhanden.' },
  { id: 'K3.1', label: 'K 3.1', desc: 'BMA + Werkfeuerwehr in mind. Staffelstärke (hauptberuflich).' },
  { id: 'K3.2', label: 'K 3.2', desc: 'BMA + Werkfeuerwehr in mind. Gruppenstärke.' },
  { id: 'K3.3', label: 'K 3.3', desc: 'BMA + Werkfeuerwehr mit mind. 2 Staffeln.' },
  { id: 'K3.4', label: 'K 3.4', desc: 'BMA + Werkfeuerwehr mit mind. 3 Staffeln.' },
  { id: 'K4',   label: 'K 4', desc: 'Selbsttätige Feuerlöschanlage (z. B. Sprinkleranlage) vorhanden.' },
];

// ───────────────────────────────────────────
// TABELLE 6: Anforderungen Baustoffe/Bauteile
// ───────────────────────────────────────────
export const tabelle6 = [
  {
    range: '≤ 15',
    min: 0, max: 15,
    spalte2: 'Feuerhemmend (F 30) und aus nichtbrennbaren Baustoffen',
    spalte3: 'Keine Anforderungen an die Feuerwiderstandsfähigkeit',
    spalte4: 'Keine Anforderungen an die Feuerwiderstandsfähigkeit',
  },
  {
    range: '> 15 bis ≤ 30',
    min: 15, max: 30,
    spalte2: 'Feuerhemmend (F 30) und aus nichtbrennbaren Baustoffen',
    spalte3: 'Feuerhemmend (F 30) und in wesentlichen Teilen aus nichtbrennbaren Baustoffen',
    spalte4: 'Feuerhemmend (F 30)',
  },
  {
    range: '> 30 bis ≤ 60',
    min: 30, max: 60,
    spalte2: 'Hochfeuerhemmend (F 60) und aus nichtbrennbaren Baustoffen',
    spalte3: 'Hochfeuerhemmend (F 60) und in wesentlichen Teilen aus nichtbrennbaren Baustoffen',
    spalte4: 'Hochfeuerhemmend (F 60), brennbare Baustoffe zulässig',
  },
  {
    range: '> 60',
    min: 60, max: Infinity,
    spalte2: 'Feuerbeständig (F 90) und aus nichtbrennbaren Baustoffen',
    spalte3: 'Feuerbeständig (F 90)',
    spalte4: 'Feuerbeständig (F 90), brennbare Baustoffe zulässig',
  },
];

export function getTabelle6(erfTF) {
  return tabelle6.find(row => erfTF > row.min && erfTF <= row.max)
    || tabelle6.find(row => erfTF <= row.max)
    || tabelle6[tabelle6.length - 1];
}

// ───────────────────────────────────────────
// BERECHNUNGSFUNKTIONEN
// ───────────────────────────────────────────

/** Rechnerische Brandbelastung qR aus Stoffliste */
export function calcQR(stoffe, grundflaeche) {
  if (!stoffe || stoffe.length === 0 || grundflaeche <= 0) return 0;
  let summe = 0;
  stoffe.forEach(s => {
    const base = s.masse * s.heizwert * s.abbrandfaktor;
    summe += s.geschuetzt ? base * s.psi : base;
  });
  const qr = summe / grundflaeche;
  return Math.max(qr, 15); // Mindest-qR = 15 kWh/m²
}

/** Wärmeabzugsfaktor w (nach DIN 18230-1) */
export function calcW(av, ah, grundflaeche, hoehe) {
  if (grundflaeche <= 0) return { w0: 1.0, alphaW: 1.0, betaW: 0, w: 1.0 };
  
  // Flächenverhältnisse
  let avRatio = av / grundflaeche;
  const ahRatio = ah / grundflaeche;

  // Für die Exponenten-Berechnungen von w0 und beta_w zwingend min 0.025 ansetzen
  // (DIN 18230-1 / Excel Referenz: "mit av >= 0,025")
  const avCalc = Math.max(avRatio, 0.025);
  
  // βw = 20,0 * (1 + 10*av - 64*av²)
  const betaW = 20.0 * (1 + 10 * avCalc - 64 * Math.pow(avCalc, 2));
  
  // w0 = 1,0 + 145,0 * (0,4 - av)⁴ / (1,6 + βw*ah)
  // Begrenzung für (0.4 - av)^4 Term: theoretisch nicht für av > 0.4 vorgesehen, aber avCalc ist idR in diesem Rahmen.
  const cappedAv = Math.min(avCalc, 0.4); 
  const w0 = 1.0 + 145.0 * Math.pow((0.4 - cappedAv), 4) / (1.6 + betaW * ahRatio);
  
  // αw = (6,0 / h)^0,3
  const alphaW = Math.pow(6.0 / Math.max(hoehe, 3), 0.3);
  
  // Endwert w = w0 * αw (mindestens 0,5)
  const w = Math.max(w0 * alphaW, 0.5);

  return { w0, alphaW, betaW, w };
}

/** Äquivalente Branddauer tä */
export function calcTae(qR, c, w) {
  return qR * c * w;
}

/** Erforderliche Feuerwiderstandsdauer erf tF */
export function calcErfTF(tae, gamma, alphaL) {
  return tae * gamma * alphaL;
}

/** Bewertete Fläche nach Abschnitt 7.4 – mit Details für Nachweis */
export function calcBewFlaeche(ebenen) {
  if (!ebenen || ebenen.length === 0) return 0;
  
  let bewFlaeche = 0;
  // Finde die größte Fläche für die Ausnahme FA = 1.0
  const maxFlaeche = Math.max(...ebenen.map(e => e.flaeche));

  ebenen.forEach(e => {
    const fhi = getFH(e.hoehe, e.unterBezugsniveau);
    let fai = e.fa;
    // Die Ebene mit der größten Ausdehnung (oder die Grundfläche, Index 0) erhält immer FA = 1.0
    if (e.flaeche === maxFlaeche || e === ebenen[0]) {
      fai = 1.0;
    }
    bewFlaeche += e.flaeche * fhi * fai;
  });

  return Math.round(bewFlaeche);
}

/** Detaillierte bewertete Fläche mit Zwischenschritten */
export function calcBewFlaecheDetailed(ebenen) {
  const steps = [];
  let bewFlaeche = 0;

  if (!ebenen || ebenen.length === 0) return { bewFlaeche: 0, steps: [] };

  const maxFlaeche = Math.max(...ebenen.map(e => e.flaeche));

  ebenen.forEach((e, i) => {
    const fhi = getFH(e.hoehe, e.unterBezugsniveau);
    let fai = e.fa || 1.0;
    
    // MIndBauRL 7.4: Grundfläche bzw. Ebene mit der größten Ausdehnung erhält immer FA = 1.0
    let fa_note = '';
    if (e.flaeche === maxFlaeche || i === 0) {
      fai = 1.0;
      if (i > 0) fa_note = ' (Regel: Größte Ausdehnung FA=1.0)';
    }

    const beitrag = e.flaeche * fhi * fai;
    bewFlaeche += beitrag;
    
    steps.push({
      name: i === 0 ? `Ebene 1 (Grundfläche, h=${e.hoehe}m)` : `Ebene ${i + 1} (h=${e.hoehe}m)`,
      flaeche: e.flaeche,
      fh: fhi,
      fa: fai,
      fa_note,
      beitrag: Math.round(beitrag),
    });
  });

  return { bewFlaeche: Math.round(bewFlaeche), steps };
}

/** Ebenennachweis / Teilflächennachweis nach Abschnitt 7.4 (75%-Regel) */
export function calcEbenenNachweis(ebenen, zulAbew) {
  const grenzwert = Math.round(zulAbew * 0.75);
  const ergebnisse = [];

  if (ebenen && ebenen.length > 0) {
    ebenen.forEach((e, i) => {
      ergebnisse.push({
        name: i === 0 ? `Ebene 1 (Grundfläche)` : `Ebene ${i + 1}`,
        tatsaechlicheFlaeche: e.flaeche,
        grenzwert,
        bestanden: e.flaeche <= grenzwert,
      });
    });
  }

  return {
    ergebnisse,
    grenzwert,
    allesBestanden: ergebnisse.every(e => e.bestanden),
  };
}

// ───────────────────────────────────────────
// PARAMETER-ERKLÄRUNGEN
// ───────────────────────────────────────────
export const erklaerungen = {
  qR: {
    titel: 'Rechnerische Brandbelastung qR',
    text: 'Die im Brandfall je m² Grundfläche freigesetzte Wärmemenge. Ermittelt aus den brennbaren Stoffen im Raum (Masse × Heizwert × Abbrandfaktor). Mindestens 15 kWh/m².',
    einheit: 'kWh/m²',
    beispiel: 'Holzlager: ~200 kWh/m², Maschinenhalle: ~50 kWh/m², Leeres Stahllager: ~15 kWh/m²',
  },
  c: {
    titel: 'Umrechnungsfaktor c',
    text: 'Berücksichtigt, wie viel Wärme die Umfassungsbauteile (Wände, Decke) aufnehmen. Je schwerer/massiver die Bauteile, desto mehr Wärme wird absorbiert → kleineres c → niedrigere tä.',
    einheit: 'min·m²/kWh',
    beispiel: 'Stahlhalle: 0,25 / Massivbau: 0,15',
  },
  w: {
    titel: 'Wärmeabzugsfaktor w',
    text: 'Berücksichtigt die kühlende Wirkung von Öffnungen (Fenster, Tore, RWA im Dach). Je mehr Öffnungsfläche, desto mehr Wärme entweicht → niedrigeres w. Mindestens 0,5.',
    einheit: '(dimensionslos)',
    beispiel: 'Viele Dachöffnungen: ~0,5 / Geschlossene Halle: ~1,5',
  },
  tae: {
    titel: 'Äquivalente Branddauer tä',
    text: 'Gibt an, nach wie vielen Minuten bei einem Normbrand (ETK) die gleiche thermische Belastung erreicht wird wie beim realen Brand in diesem Raum.',
    einheit: 'Minuten',
    beispiel: 'tä = 40 min → vergleichbar mit 40 min Normbrand',
  },
  gamma: {
    titel: 'Sicherheitsbeiwert γ',
    text: 'Berücksichtigt die Versagenswahrscheinlichkeit von Bauteilen und die flächenabhängige Brandwahrscheinlichkeit. Steigt mit der Fläche und bei mehrgeschossigen Bauten.',
    einheit: '(dimensionslos)',
    beispiel: 'SKb3, 5.000 m², eingeschossig: γ = 1,05',
  },
  alphaL: {
    titel: 'Zusatzbeiwert αL',
    text: 'Reduziert die rechnerische Anforderung, wenn brandschutztechnische Infrastruktur vorhanden ist (BMA, Werkfeuerwehr, Löschanlagen). Produkt der einzelnen Faktoren.',
    einheit: '(dimensionslos)',
    beispiel: 'BMA (0,9) + 2 Staffeln (0,75) → αL = 0,675',
  },
  erfTF: {
    titel: 'Erforderliche Feuerwiderstandsdauer erf tF',
    text: 'Die brandschutztechnisch erforderliche Standzeit der Bauteile. Wenn erf tF > 90 min für SKb3-Bauteile, darf Abschnitt 7 NICHT verwendet werden!',
    einheit: 'Minuten',
    beispiel: 'erf tF = 30 min → Bauteile müssen mind. 30 min standhalten',
  },
  fh: {
    titel: 'Höhenfaktor FH',
    text: 'Bewertet die Erschwernis der Brandbekämpfung in höher gelegenen Ebenen. Je höher über Bezugsniveau, desto größer FH. Unter Bezugsniveau: doppelter Wert.',
    einheit: '(dimensionslos)',
    beispiel: '10 m über Bezugsniveau → FH = 1,2',
  },
  fa: {
    titel: 'Öffnungsfaktor FA',
    text: 'Berücksichtigt die Gefahr der vertikalen Brandausbreitung über Deckenöffnungen. Geschlossen nach SKb3 = 0,4, offen = 1,7. Für die Grundfläche gilt FA = 1,0.',
    einheit: '(dimensionslos)',
    beispiel: 'Offene Decke → FA = 1,7 (hohe Brandgefahr)',
  },
};
