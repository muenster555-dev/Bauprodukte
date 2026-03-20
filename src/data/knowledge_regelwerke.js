export const itemsRegelwerke = [
  {
    id: 'mbo',
    cat: 'regelwerke',
    name: 'Musterbauordnung (MBO) / Landesbauordnung (LBO)',
    definition: 'Das zentrale, ordnungsrechtliche Gesetzeswerk für das Bauwesen in Deutschland.',
    context: 'Brandschutz ist Ländersache: Jedes Bundesland hat seine eigene LBO, aber sie orientieren sich zumeist stark an der MBO. Hierin werden die abstrakten Schutzziele (z.B. "leichtentflammbare Baustoffe dürfen nicht verwendet werden") und die groben Anforderungen (z.B. "Treppenraumwände müssen feuerhemmend sein") verbindlich rechtlich definiert. Dies ist das WARUM (Gesetz), noch nicht das WIE (Technik).',
    testing: 'Nicht zutreffend (Gesetz).',
    testingSetup: '',
    testingCriteria: '',
    norms: '',
    related: []
  },
  {
    id: 'mvv-tb',
    cat: 'regelwerke',
    name: 'Muster-Verwaltungsvorschrift Technische Baubestimmungen (MVV TB)',
    definition: 'Die MVV TB ist das zentrale Werkzeug in Deutschland, um die Brücke vom Gesetz (MBO) zur europäischen, zersplitterten Normenwelt (CE/DoP) zu schlagen. Sie ist das absolut primäre Handwerkszeug des Bauüberwachers.',
    context: 'Wenn die MBO (Gesetz) z.B. für einen Flur einen "schwerentflammbaren Baustoff" fordert, ordnet nur die MVV TB an, was das faktisch bedeutet. Man blickt nach der europäischen CE-Deklaration auf die DoP: Ist das Produkt dort beispielsweise mit "B-s1,d0" angegeben, schaut man in die MVV TB. Im "Anhang 4 - Tabelle 1" wird dieses europäische Merkmal präzise in die nationale Bauaufischts-Sprache zurückübersetzt ("schwerentflammbar"). Wichtig: "C-s2,d1" ist nach MVV TB oft *nicht* mehr schwerentflammbar!',
    testing: 'Nicht zutreffend (Vorschrift)',
    testingSetup: '',
    testingCriteria: '',
    norms: 'MVV TB',
    related: ['baustoffe']
  },
  {
    id: 'ue',
    cat: 'regelwerke',
    name: 'Übereinstimmungserklärung (ÜE / Fachunternehmererklärung)',
    definition: 'Ein amtliches Bestätigungs-Dokument. Der einbauende Handwerker (Monteur) unterschreibt rechtlich bindend, dass er das Produkt oder die Bauart haargenau exakt so eingebaut hat, wie es im zugehörigen Nachweis (abZ, aBG, abP, ETA) gefordert ist.',
    context: 'Das Produkt kann im Labor beim DIBt die T90-Tests großartigst bestanden haben – wenn der Handwerker auf der Baustelle den Türrahmen mit Bauschaum statt mit zugelassenem Brandschutzmörtel in die Wand klatscht, ist jede Zulassung wertlos. Das Gebäude fackelt ab. Die ÜE ist das zwingend nötige, rechtsschaffende Glied zur Bauabnahme. Darin wird explizit die Nummer der eingesetzten Zulassung/Genehmigung zitiert. Sie wird vom Objektüberwacher penibel geprüft.',
    testing: '',
    testingSetup: 'Keine Laborprüfung – sondern gewissenhafter Einbau auf der Live-Baustelle nach detaillierter Einbauanleitung.',
    testingCriteria: 'Abgabe an den Bauherrn gemeinsam mit Abnahme und Dokumentation.',
    norms: 'MBO §16a',
    related: ['fst-innen', 'abschottungen', 'fst-vorhaenge', 'feststellanlagen']
  }
];
