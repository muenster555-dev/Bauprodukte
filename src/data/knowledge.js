import { itemsNachweise } from './knowledge_nachweise.js';
import { itemsBrandverhaltenDIN } from './knowledge_din.js';
import { itemsBrandverhaltenEN } from './knowledge_en.js';
import { itemsZusatzSonder } from './knowledge_zusatz.js';
import { itemsFeuerwiderstand } from './knowledge_feuerwiderstand.js';
import { itemsRegelwerke } from './knowledge_regelwerke.js';

export const knowledgeCategories = [
  { id: 'nachweise', name: 'Zulassungen & Nachweise', icon: '📝', desc: 'abZ, aBG, abP, CE, ETA, ZiE' },
  { id: 'brandverhalten-din', name: 'Brandverhalten (DIN)', icon: '🔥', desc: 'Nationale Baustoffklassen A1 bis B3 (DIN 4102)' },
  { id: 'brandverhalten-en', name: 'Brandverhalten (EN)', icon: '🇪🇺', desc: 'Europäische Euroklassen A1 bis F (EN 13501-1)' },
  { id: 'zusatz-sonder', name: 'Zusatz- & Sonderkriterien', icon: '💨', desc: 'Rauch (s), Abtropfen (d), Glimmen, Bodenbeläge' },
  { id: 'feuerwiderstand', name: 'Feuerwiderstand', icon: '🛡️', desc: 'Bauteileigenschaften R, E, I, W, M, C, S' },
  { id: 'regelwerke', name: 'Regelwerke & Dokumente', icon: '⚖️', desc: 'MBO, MVV TB, Übereinstimmungserklärungen' }
];

export const knowledgeItems = [
  ...itemsNachweise,
  ...itemsBrandverhaltenDIN,
  ...itemsBrandverhaltenEN,
  ...itemsZusatzSonder,
  ...itemsFeuerwiderstand,
  ...itemsRegelwerke
];
