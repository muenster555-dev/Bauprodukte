// Wissensdatenbank – Brandschutz-Grundlagen
// Enthält Erklärungen zu Begriffen, Nachweisen und Prüfverfahren

export const knowledgeCategories = [
  { id: 'nachweise', name: 'Verwendbarkeitsnachweise', icon: '📝', desc: 'abZ, aBG, abP, CE-Kennzeichnung und mehr erklärt.' },
  { id: 'brandverhalten', name: 'Brandverhalten (Baustoffe)', icon: '🔥', desc: 'A1, A2, B1, B2, s- und d-Klassen, Glimmen.' },
  { id: 'feuerwiderstand', name: 'Feuerwiderstand (Bauteile)', icon: '🧱', desc: 'R, E, I, M, S, C Klassen und Prüfverfahren.' },
  { id: 'normen', name: 'Wichtige Normen & Regeln', icon: '📚', desc: 'DIN 4102, EN 13501, MVV TB, MBO.' },
  { id: 'dokumente', name: 'Dokumentation & Überwachung', icon: '📋', desc: 'ÜE, Montagebescheinigung, ÜZ.' },
];

export const knowledgeItems = [
  // === Nachweise ===
  {
    id: 'abz',
    cat: 'nachweise',
    name: 'Allgemeine bauaufsichtliche Zulassung (abZ)',
    definition: 'Eine allgemeine bauaufsichtliche Zulassung (abZ) ist ein nationaler Verwendbarkeitsnachweis für Bauprodukte, für die es keine anerkannte technische Regel (wie z.B. eine DIN-Norm) gibt oder die wesentlich davon abweichen.',
    context: 'Wird vom Deutschen Institut für Bautechnik (DIBt) erteilt. Sie ist erforderlich für nicht geregelte Bauprodukte, um deren Verwendbarkeit im Hinblick auf die bauaufsichtlichen Anforderungen (wie Brandschutz, Standsicherheit) in Deutschland nachzuweisen.',
    testing: 'Die Prüfung erfolgt durch anerkannte/notifizierte Prüfstellen (Materialprüfungsämter, etc.) im Vorfeld des Zulassungsverfahrens auf Basis von Prüfplänen des DIBt.',
    norms: 'Rechtsgrundlage: Landesbauordnungen (z.B. §18 MBO).',
    related: ['fst-innen', 'fst-vorhaenge', 'feststellanlagen']
  },
  {
    id: 'abg',
    cat: 'nachweise',
    name: 'Allgemeine Bauartgenehmigung (aBG)',
    definition: 'Die allgemeine Bauartgenehmigung (aBG) ist der Verwendbarkeitsnachweis für das Zusammenfügen von Bauprodukten zu baulichen Anlagen (Bauart), für die es keine Technischen Baubestimmungen gibt oder die wesentlich davon abweichen.',
    context: 'Früher gab es nur die abZ. Seit 2017 wird streng zwischen Bauprodukt (abZ) und Bauart (aBG) getrennt. Ein Feuerschutzabschluss als Ganzes in der Wand ist eine Bauart (daher aBG). Sehr oft werden vom DIBt "Kombi-Bescheide" (abZ/aBG) ausgestellt.',
    testing: 'Prüfungen der Kompatibilität der Einzelprodukte und Funktion der Gesamtbauart durch anerkannte Prüfstellen.',
    norms: 'Rechtsgrundlage: Landesbauordnungen (z.B. §16a MBO).',
    related: ['fst-innen', 'feststellanlagen', 'fst-sonder']
  },
  {
    id: 'abp',
    cat: 'nachweise',
    name: 'Allgemeines bauaufsichtliches Prüfzeugnis (abP)',
    definition: 'Das abP ist ein Verwendbarkeitsnachweis für Bauprodukte, deren Verwendung bzw. Bauarten, deren Ausführung nicht der Erfüllung erheblicher Anforderungen an die Sicherheit baulicher Anlagen dienen oder die nach allgemein anerkannten Prüfverfahren beurteilt werden.',
    context: 'Wird durch anerkannte Prüfstellen (nicht das DIBt) ausgestellt. Oft genutzt für Installationsteile (Rohr- und Kabelabschottungen), normalentflammbare Baustoffe (B2) oder bestimmte Brandschutzverglasungen, wenn ein zugrundeliegendes, standardisiertes Prüfverfahren nach MVV TB existiert.',
    testing: 'Zusammenspiel aus nach standardisieren genormten Verfahren (z.B. DIN 4102-11 für Rohrabschottungen).',
    norms: 'MVV TB Teil C.',
    related: ['abschottungen', 'b2']
  },
  {
    id: 'ce-dop',
    cat: 'nachweise',
    name: 'CE-Kennzeichnung & Leistungserklärung (DoP)',
    definition: 'Die CE-Kennzeichnung dokumentiert, dass ein Bauprodukt den harmonisierten europäischen Normen (hEN) oder Europäischen Technischen Bewertungen (ETA) entspricht. Die Leistungserklärung (Declaration of Performance, DoP) beschreibt die Leistung.',
    context: 'Pflicht für Bauprodukte, die von einer harmonisierten Norm erfasst sind (z.B. Außentüren nach EN 16034). Ein CE-gekennzeichnetes Produkt darf europaweit gehandelt werden, bedarf jedoch in Deutschland oft zusätzlicher bauordnungsrechtlicher Vorgaben laut MVV TB (z.B. C5-Prüfung).',
    testing: 'Abhängig von der anwendbaren europäischen Norm (hEN).',
    norms: 'BauPVo (EU Nr. 305/2011), EN-Normen.',
    related: ['fst-aussen', 'rst']
  },
  
  // === Brandverhalten ===
  {
    id: 'nichtbrennbar',
    cat: 'brandverhalten',
    name: 'Nichtbrennbar (A1 / A2)',
    definition: 'Produkte der Klassen A1 und A2 sind nichtbrennbar. A1-Produkte haben keinerlei brennbare Anteile. A2-Produkte dürfen geringe Mengen gebundener brennbarer Stoffe enthalten (z.B. Papierreste auf Gipskarton).',
    context: 'Gefordert häufig für Flucht- und Rettungswege, Hochhäuser und in sicherheitsrelevanten Bauteilen.',
    testing: 'Nationale Prüfung (DIN 4102-1): Ofenprüfung bei 750°C. Für A2 zusätzlich Brandschachtprüfung. Europäische Prüfung (EN 13501-1): EN ISO 1182 (Ofentest bei 750°C) sowie EN ISO 1716 (Bestimmung der Bruttoverbrennungswärme im Bombenkalorimeter).',
    norms: 'DIN 4102-1 (A1, A2), EN 13501-1 (A1, A2).',
    related: ['baustoffe', 'fassade']
  },
  {
    id: 'b1',
    cat: 'brandverhalten',
    name: 'Schwerentflammbar (B1 / B, C)',
    definition: 'Schwerentflammbare Baustoffe dürfen brennen, solange die externe Zündquelle vorhält, müssen jedoch bei Wegnahme der Zündquelle rasch selbst verlöschen. Flammen dürfen sich auf dem Baustoff nicht unbegrenzt ausbreiten.',
    context: 'Standardanforderung für viele Baustoffe in notwendigen Fluren und Treppenräumen (ggf. auch A), Bodenbelägen und Fassaden (Standard). Europäisch entsprechen dem ungefähr die Klassen B und C, jedoch nur in fest definierten Kombinationen mit s und d Einstufungen nach MVV TB (z.B. B-s1,d0).',
    testing: 'Nationale Prüfung: DIN 4102-15 und -16 ("Brandschachttest"). Ein Probekörper (1000mm lang) wird 10 Minuten lang wie in einem Kamin schlotartig beflammt; Durchschnittsgastemperatur und Restlänge werden bewertet. Europäische Prüfung: EN 13823 (SBI-Test; "Single Burning Item"). Ein 30-kW-Sandbrenner beflammt in der Zimmerecke (L-Form), Rauch, Wärmeentwicklung (FIGRA/THR) und Abtropfen werden gemessen.',
    norms: 'DIN 4102-1 (B1), EN 13501-1 (Euroklassen B, C).',
    related: ['baustoffe', 'bekleidungen', 'fassade']
  },
  {
    id: 'b2',
    cat: 'brandverhalten',
    name: 'Normalentflammbar (B2 / D, E)',
    definition: 'Normalentflammbare Baustoffe lassen sich leicht von einer Flamme entzünden und brennen von alleine weiter (z.B. normales Holz).',
    context: 'Dürfen im Bauwesen verwendet werden, wo keine höheren Anforderungen bestehen. Leichtentflammbare Baustoffe (B3) sind grundsätzlich verboten. Europäisch entsprechen B2 in etwa D und E.',
    testing: 'Sowohl in DIN 4102-1 als auch nach EN ISO 11925-2 ("Kleinbrennertest"): Prüfung mit einer 20-mm Propangasflamme für 15 Sekunden (Kanten- und Oberflächenbeflammung) bzw. 30 Sekunden. Flamme darf eine vorgegebene Marke innerhalb einer gewissen Zeit nicht erreichen.',
    norms: 'DIN 4102-1 (B2), EN 13501-1 (Euroklassen D, E).',
    related: ['baustoffe']
  },
  {
    id: 'Rauch-s',
    cat: 'brandverhalten',
    name: 'Rauchentwicklung (s-Klassen)',
    definition: 'Gibt die Rauchentwicklung im Brandfall an. Gilt nur nach europäischem System (EN 13501-1). s1 = gering, s2 = mittel, s3 = hoch/unbegrenzt.',
    context: 'Wichtig für Wege der Rettung. In Fluren wird meist s1 gefordert (z.B. C-s1,d0 für Bodenbeläge oder B-s1,d0 für Wände). DIN 4102 klassifiziert Rauch nicht separat – dort ist s1 bei B1 implizit integriert oder als unzureichend nicht zugelassen.',
    testing: 'Gemessen fast ausschließlich beim SBI-Test (EN 13823) über Lichtmessstrecken in der Abgasleitung. Berücksichtigt wird "SMOGRA" (Rauchwachstumsrate) und Gesamtrauchproduktion.',
    norms: 'EN 13501-1, EN 13823.',
    related: ['bekleidungen']
  },
  {
    id: 'abtropfen-d',
    cat: 'brandverhalten',
    name: 'Brennendes Abtropfen (d-Klassen)',
    definition: 'Bewertet, ob brennende Teile oder Tropfen des Baustoffs abfallen. d0 = kein Abtropfen, d1 = begrenztes Abtropfen (Tropfen verlöschen schnell), d2 = starkes/unbegrenztes Abtropfen.',
    context: 'Brennendes Abtropfen trägt maßgeblich zur Brandausbreitung (Sekundärbrände) bei. In Flucht- und Rettungswegen ist in der Regel d0 gefordert.',
    testing: 'Wird im SBI-Test (EN 13823) beobachtet sowie beim Kleinbrenner-Test (Bodenprüfstand mit Filterpapier zur Feststellung der Entzündung des Tropfens).',
    norms: 'EN 13501-1.',
    related: ['baustoffe']
  },
  {
    id: 'glimmen',
    cat: 'brandverhalten',
    name: 'Glimmen / andauerndes Schwelen',
    definition: 'Glimmen (Schwelen) ist eine flammenlose Verbrennung eines Baustoffs, häufig tief im Material, und macht den Brand schwer entdeck- und löschbar.',
    context: 'Besonders relevant bei Dämmstoffen pflanzlicher oder tierischer Herkunft (Holzfaser, Zellulose) im Gegensatz zu Mineralwolle. Darf sich bspw. im Holzbinderbau nicht unsichtbar ausbreiten.',
    testing: 'Neue, spezifische Norm: DIN EN 16733 definiert das Prüfverfahren zur "Bestimmung der Neigung eines Bauprodukts zu andauerndem Schwelen". Indirekt wird Glimmen auch im Ofentest nach DIN 4102-1 / EN ISO 1182 (Nichtbrennbarkeit) erfasst.',
    norms: 'DIN EN 16733, MVV TB Anhang 4.',
    related: ['baustoffe']
  },

  // === Feuerwiderstand ===
  {
    id: 'f-klasse-rei',
    cat: 'feuerwiderstand',
    name: 'R/E/I/M/S/C - Feuerwiderstandsklassen',
    definition: 'Bewerten den Widerstand von kompletten Bauteilen (nicht nur Baustoffen) gegen Feuer. Das System aus EN 13501-2 teilt auf in: R (Tragfähigkeit), E (Raumabschluss/Integrität), I (Wärmedämmung), M (Stoßwiderstand), S (Rauchdichtung), C (Selbstschließung).',
    context: 'Ersetzt weitgehend das alte nationale System mit "F30 / F90" (Brandschutz), "T30/T90" (Türen). Ein klassisches F90 entspricht oft REI 90. C5 gibt z.B. bei Türen die Schließ-Zyklen (C5 = 200.000) an.',
    testing: 'Bauteil wird einem simulierten Vollbrand (meist nach Einheitstemperaturzeitkurve ETK – bis über 1000°C) im Brennofen ausgesetzt. Bewertet wird die Dauer in Minuten (15, 30, 45, 60, 90, 120, etc.). Prüfnormen z.B. EN 1363 (Allg.), EN 1364 (nichttragend), EN 1365 (tragend).',
    norms: 'EN 13501-2, EN 1363 bis 1366.',
    related: ['tragende_bauteile', 'fst-innen']
  },

  // === Normen ===
  {
    id: 'mvv-tb',
    cat: 'normen',
    name: 'MVV TB (Muster-Verwaltungsvorschrift Technische Baubestimmungen)',
    definition: 'Eine Sammlung aller technischen Regelwerke, die bauaufsichtlich (als Konkretisierung der Landesbauordnung) zwingend einzuhalten sind.',
    context: 'Sie konkretisiert die unbestimmten Rechtsbegriffe der MBO (z.B. "Gebäude sind so anzuordnen, dass..."). Äußerst wichtig: Anhang 4 der MVV TB enthält die Übersetzungs-Tabelle ("Schlüssel") zwischen den von der MBO geforderten Benennungen (z.B. "schwerentflammbar") und den Euroklassen nach EN 13501.',
    testing: 'Ist eine Vorschrift, kein Prüfverfahren.',
    norms: 'Erlassen von der DIBt/Bauministerkonferenz, umgesetzt in VV TB der Länder.',
    related: ['nachweise']
  },

  // === Dokumente ===
  {
    id: 'ue',
    cat: 'dokumente',
    name: 'Übereinstimmungserklärung (ÜE)',
    definition: 'Es gibt die ÜE des Herstellers (ÜH) und die ÜE des Fachunternehmers / Verarbeiters (ÜF). Sie bestätigen formell, dass das Produkt / die Bauart exakt so gefertigt/eingebaut wurde, wie in Zulassung, Genehmigung oder Prüfzeugnis verlangt.',
    context: 'Die ÜE des Fachunternehmers (Übereinstimmungserklärung des Errichters) ist zwingend, bspw. nach Einbau einer T30-Tür nach abZ/aBG. Fehlt sie, ist der Einbau bauaufsichtlich wertlos und das Gebäude hat keine Abnahmebasis.',
    testing: 'Wird am Ende der Ausführung nach Überprüfung der Einbauvorschriften und ggf. Montageanleitungen ausgefüllt.',
    norms: 'MBO §16a, Verwendbarkeitsnachweise (abZ/aBG).',
    related: ['fst-innen', 'abschottungen']
  }
];
