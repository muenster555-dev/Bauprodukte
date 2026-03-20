export const itemsNachweise = [
  {
    id: 'abz',
    cat: 'nachweise',
    name: 'Allgemeine bauaufsichtliche Zulassung (abZ)',
    definition: 'Ein reiner Produktnachweis. Eine abZ wird vom Deutschen Institut für Bautechnik (DIBt) erteilt. Sie ist erforderlich für Bauprodukte, für die es keine anerkannte technische Regel (DIN/EN-Norm) gibt oder die wesentlich davon abweichen (nicht geregelte Bauprodukte).',
    context: 'Gilt ausschließlich für das *Bauprodukt* an sich (die materiellen Eigenschaften), nicht für den Einbau in die konstruktive Umgebung. Sie dokumentiert die bauaufsichtliche Verwendbarkeit in Deutschland.',
    testing: 'Prüfungen erfolgen auf Basis vom DIBt festgelegter Prüfpläne. Durchgeführt von akkreditierten Materialprüfämtern.',
    testingSetup: 'Abhängig vom spezifischen Produkt. Bei einem Brandschutzanstrich z.B. Brandschachtprüfungen (DIN 4102-16) auf standardisierten Untergründen.',
    testingCriteria: 'Die vom Hersteller beantragten und vom DIBt geprüften Dauerhaftigkeits- und Materialkenngrößen müssen statistisch sicher erreicht werden.',
    norms: 'Musterbauordnung (MBO) §18',
    related: ['fst-innen', 'fst-vorhaenge']
  },
  {
    id: 'abg',
    cat: 'nachweise',
    name: 'Allgemeine Bauartgenehmigung (aBG)',
    definition: 'Der Verwendbarkeitsnachweis für das Zusammenfügen von Bauprodukten zu baulichen Anlagen (die sogenannte *Bauart*).',
    context: 'Gilt für Bauarten, die wesentlich von den Technischen Baubestimmungen abweichen. Wird ebenfalls vom DIBt erteilt. Beispiel: Ein Rauchmelder (Gerät) hat CE, ein Haftmagnet hat CE, aber das funktionale Zusammenwirken als "Feststellanlage" ist nicht genormt und benötigt als *Bauart* eine aBG.',
    testing: 'Fokus liegt auf dem funktionalen Zusammenwirken der Einzelteile.',
    testingSetup: 'Funktionsprüfungen im Systemaufbau. Bei Feststellanlagen z.B. das korrekte Auslösen bei Raucherkennung und das sichere Schließen (Haltekraftabbau).',
    testingCriteria: 'System darf unter Extrembedingungen (Brand, Stromausfall) nicht in einen unsicheren Zustand geraten (Fail-Safe Prinzip).',
    norms: 'Musterbauordnung (MBO) §16a',
    related: ['fst-innen', 'feststellanlagen']
  },
  {
    id: 'kombi-bescheid',
    cat: 'nachweise',
    name: 'Kombi-Bescheid (abZ + aBG)',
    definition: 'Oft werden abZ (für das Produkt) und aBG (für den Einbau) vom DIBt in einem einzigen Dokument zusammengefasst.',
    context: 'Sehr häufig bei Feuerschutzabschlüssen für den Innenbereich (z.B. T30 Türen). Die Zulassung regelt das Türblatt (Material), die Genehmigung regelt, wie dieses Türblatt in z.B. eine Trockenbauwand eingebaut werden darf.',
    testing: 'Kombinierte System- und Materialprüfungen.',
    testingSetup: 'Einbau der Tür (Bauart) in reale Wandkonstruktionen (Massivwand, Leichtbau) und anschließende Beflammung im Vollbrandofen (ETK).',
    testingCriteria: 'Erfüllung der Feuerwiderstandsklasse (Integrität und Isolation für 30/90 Minuten).',
    norms: 'MBO §16a und §18',
    related: ['fst-innen']
  },
  {
    id: 'abp',
    cat: 'nachweise',
    name: 'Allgemeines bauaufsichtliches Prüfzeugnis (abP)',
    definition: 'Ein "kleiner" Verwendbarkeitsnachweis für Bauprodukte/Bauarten, deren Beurteilung nach *allgemein anerkannten* standardisierten Prüfverfahren erfolgen kann.',
    context: 'Wird NICHT vom DIBt, sondern direkt von anerkannten Materialprüfämtern ausgestellt. Es ist günstiger und schneller als eine Zulassung. Es darf nur angewendet werden, wenn die MVV TB ein solches Standard-Prüfverfahren erlaubt (z.B. für Baustoffklasse B2, Kabelabschottungen oder einfache Brandschutzverglasungen).',
    testing: 'Streng anwendungsspezifisch nach bestehenden Prüfnormen.',
    testingSetup: 'Beispiel Rohrabschottung (DIN 4102-11): Einbau eines Rohres durch eine Testwand, Installation der Manschette, Beflammung im Ofen.',
    testingCriteria: 'Kein Feuerdurchschlag (E) und kein unzulässiger Temperaturanstieg (I) auf der Rückseite.',
    norms: 'MVV TB Teil C',
    related: ['abschottungen', 'b2']
  },
  {
    id: 'ce-dop',
    cat: 'nachweise',
    name: 'CE-Kennzeichnung & Leistungserklärung (DoP)',
    definition: 'CE (Conformité Européenne) zeigt an, dass das Produkt den anwendbaren harmonisierten europäischen Normen (hEN) entspricht. Die DoP (Declaration of Performance) ist das zentrale Dokument, auf dem der Hersteller die geprüften Leistungswerte deklariert.',
    context: 'Wenn es eine hEN gibt, MUSS das Produkt CE-gekennzeichnet werden ("Recht, am Binnenmarkt teilzunehmen"). Ein nationaler Nachweis (abZ) darf dann nicht mehr gefordert/ausgestellt werden. WICHTIG: Das CE-Zeichen sagt nichts darüber aus, ob das Produkt in einem konkreten deutschen Projekt eingebaut werden darf. Entscheidend sind hier die in der DoP deklarierten Werte im Abgleich mit der MVV TB.',
    testing: 'Erstprüfung (ITT) durch notifizierte europäische Stellen.',
    testingSetup: 'Streng an die Vorgaben der spezifischen, harmonisierten Europäischen Norm (hEN) gebunden.',
    testingCriteria: 'Erreichen der europäischen Leistungsklassen (z.B. EI 30 für Außentüren, E für Baustoffe).',
    norms: 'BauPVo (EU Nr. 305/2011)',
    related: ['fst-aussen']
  },
  {
    id: 'eta',
    cat: 'nachweise',
    name: 'Europäische Technische Bewertung (ETA)',
    definition: 'Freiwilliger europäischer Bewertungsnachweis zur CE-Kennzeichnung von Bauprodukten, die nicht (oder nicht vollständig) von einer harmonisierten Norm erfasst sind.',
    context: 'Wird auf Basis eines EAD (Europäisches Bewertungsdokument) erstellt. Ersetzt oft auf EU-Ebene die Funktion der deutschen abZ. Wichtig: Eine ETA regelt in Deutschland meist nur das "Bauprodukt". Für die Gesamtkonstruktion ist oft zusätzlich noch eine nationale aBG (Bauart) zwingend nötig!',
    testing: 'Prüfungen anhand der Festlegungen im jeweiligen EAD.',
    testingSetup: 'Je nach Europäischem Bewertungsdokument spezifiziert.',
    testingCriteria: 'Bestimmung der maßgebenden Wesentlichen Merkmale für die Leistungserklärung.',
    norms: 'BauPVo (EU Nr. 305/2011)',
    related: ['fst-innen']
  },
  {
    id: 'zie',
    cat: 'nachweise',
    name: 'Zustimmung im Einzelfall (ZiE) / vorhabenbezogene Bauartgenehmigung (vBG)',
    definition: 'Nachweis für ein einziges, konkretes Bauvorhaben. Wird gefordert, wenn wesentliche Abweichungen von existierenden technischen Regelwerken oder Zulassungen/Genehmigungen bestehen.',
    context: 'Wenn z.B. eine T90-Tür deutlich größer gebaut werden soll als in der abZ erlaubt, verliert die abZ ihre Gültigkeit. Dann muss für dieses eine Vorhaben bei der Obersten Bauaufsichtsbehörde (Landesbauministerium) eine ZiE beantragt werden. Eine vBG betrifft dann das Zusammenfügen (die Bauart) im Einzelfall.',
    testing: 'Individuelle Beurteilung.',
    testingSetup: 'Normalerweise Verzicht auf erneute große Brandversuche – stattdessen Beiziehung eines gutachterlichen Statements ("Gutachtliche Stellungnahme") eines Materialprüfamts, basierend auf Interpolation von bekannten Versuchsdaten.',
    testingCriteria: 'Die Obere Bauaufsicht muss überzeugt werden, dass das gesetzliche Schutzniveau trotzdem erreicht wird.',
    norms: 'MBO §16a / §20',
    related: ['fst-sonder']
  }
];
