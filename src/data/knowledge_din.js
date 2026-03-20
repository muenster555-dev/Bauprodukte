export const itemsBrandverhaltenDIN = [
  {
    id: 'din-a1',
    cat: 'brandverhalten-din',
    name: 'A1 - Nichtbrennbar (ohne organische Bestandteile)',
    definition: 'Baustoffe der Klasse A1 dürfen in keinem Brandstadium brennen oder zur Brandlast/Brandausbreitung beitragen. Sie enthalten keine brennbaren Bestandteile (Massenanteil ≤ 1%). Beispiele: Beton, mineralische Putze, Stahl, Glas, Mineralwolle.',
    context: 'Die sicherste Baustoffklasse im nationalen System. Streng gefordert in Rettungswegen von Sonderbauten, Hochhausschächten oder Brandwänden.',
    testing: 'DIN 4102-1 Ofenprüfung',
    testingSetup: 'Zylindrischer Röhrenofen (Vollbrand-Bedingung), elektrisch beheizt auf 750 °C konstanter Temperatur. Probengröße: zylindrisch, ca. 45x50 mm. Ein Thermoelement misst im Ofenraum, ein weiteres auf der Oberfläche, ein drittes im Zentrum der Probe.',
    testingCriteria: '1. Temperatur im Ofenraum darf um nicht mehr als 50 K (Kelvin) ansteigen.\n2. Oberflächentemperatur darf Ofentemperatur um nicht mehr als 50 K übersteigen.\n3. Keine sichtbaren Flammen.\n4. Gewichtsverlust max. 50%.',
    norms: 'DIN 4102-1, Abschnitt 5',
    related: ['baustoffe']
  },
  {
    id: 'din-a2',
    cat: 'brandverhalten-din',
    name: 'A2 - Nichtbrennbar (mit brennbaren Bestandteilen)',
    definition: 'Baustoffe der Klasse A2 gelten bauaufsichtlich ebenfalls als nichtbrennbar, dürfen aber einen definierten, eng begrenzten Anteil brennbarer, organischer Stoffe besitzen. Beispiel: Gipskartonplatten (die Kartonummantelung ist Papier).',
    context: 'Dürfen bauaufsichtlich an all den Stellen verwendet werden, wo "A" (nichtbrennbar) gefordert ist. Der Unterschied in der Praxis ist für Architekten oft vernachlässigbar, für Zulassungen jedoch essentiell.',
    testing: 'DIN 4102-1 Ofenprüfung + zwingender Brandschachttest',
    testingSetup: '1. Der selbe Ofentest wie bei A1.\n2. Zusätzlich müssen die Proben zwingend den Brandschachttest (wie bei B1) durchlaufen.\n3. Ggf. Messung von Toxizität (Rauchgase).',
    testingCriteria: '1. Ofentest: Flammenbildung darf 20 Sekunden nicht überschreiten.\n2. Brandschacht: Darf nicht brennend abtropfen, keine komplette Zerstörung, mittlere Ofengastemperatur max. 125 °C.',
    norms: 'DIN 4102-1',
    related: ['baustoffe']
  },
  {
    id: 'din-b1',
    cat: 'brandverhalten-din',
    name: 'B1 - Schwerentflammbar',
    definition: 'Ein B1 Baustoff darf brennen, solange das Feuer durch eine starke externe Zündquelle gespeist wird. Nimmt man das Feuer (die Wärmequelle) aber weg, muss der Baustoff zügig von selbst verlöschen. Flammen dürfen sich also auf der Oberfläche nicht selbstständig und unbegrenzt weiterfressen.',
    context: 'Der Gold-Standard für Innenausbau in Flucht- und Rettungswegen in D und für WDVS Fassadendämmungen (EPS-Platten). Beispiele: brandhemmend behandelte MDF-Platten, mineralisierte Holzwolle, schwer entflammbarer EPS-Dämmstoff.',
    testing: 'DIN 4102-15 (Prüfgerät) und DIN 4102-16 (Durchführung). Der berüchtigte "Brandschachttest".',
    testingSetup: 'Vier vertikale Probeplatten (jeweils 100 cm hoch) werden zu einem Kamin (Schlot) quadratisch zusammengebaut. Unten wird für exakt 10 Minuten ein quadratischer Ringbrenner (Gas) entzündet. Ein Luftstrom bläst von unten nach oben. Der Test imitiert einen hoch lodernden Papierkorbbrand in einem Eck oder Flur.',
    testingCriteria: '1. Unzerstörte Restlänge der Proben muss im Mittel mindestens 150 mm betragen (das Feuer darf also nicht bis ganz oben alles weggebrannt haben).\n2. Keine Einzelprobe darf eine Restlänge von 0 mm haben.\n3. Die mittlere Rauchgastemperatur über dem Schacht darf maximal 200 °C betragen.\n4. Zusätzlich muss der Baustoff zwingend auch den kleinen Test für B2 bestehen.',
    norms: 'DIN 4102-15, DIN 4102-16',
    related: ['baustoffe', 'bekleidungen', 'fassade']
  },
  {
    id: 'din-b2',
    cat: 'brandverhalten-din',
    name: 'B2 - Normalentflammbar',
    definition: 'Baustoffe, die durch eine kleine, aber definierte Zündquelle entzündet werden können und dann von selbst fortschreitend brennen. Die Ausbreitungsgeschwindigkeit ist jedoch moderat.',
    context: 'Typisch verwandt in Standard-Räumen von Wohngebäuden. B2 ist die absolute Mindestanforderung für jeden Stoff, der als Bauprodukt ins Gebäude verbaut werden soll. Alles, was B2 nicht erreicht, ist bauseits verboten (leichtentflammbar). Beispiele: Normales Massivholz, handelsübliche Spanplatten.',
    testing: 'DIN 4102-1 Abschnitt 6: Der "Kleinbrenner-Test".',
    testingSetup: 'Probe hängt senkrecht in einem zugfreien Kasten. Eine kleine, leicht geneigte Propangasflamme (Flammenhöhe 20 mm – "Streichholz"-Größe) wird für exakt 15 Sekunden angelegt. Zwei Varianten: Kantenbeflammung (an der unteren Kante) und Oberflächenbeflammung.',
    testingCriteria: 'Die Flammenspitze der Flammen am Baustoff darf in den ersten 20 Sekunden eine Höhen-Markierung von 150 mm (über dem Aufsetzpunkt) nicht erreichen. Dabei wird beobachtet, ob brennende Stücke (brennendes Abtropfen) auf ein Filterpapier auf dem Boden fallen.',
    norms: 'DIN 4102-1',
    related: ['baustoffe']
  },
  {
    id: 'din-b3',
    cat: 'brandverhalten-din',
    name: 'B3 - Leichtentflammbar',
    definition: 'Baustoffe, die sich wie Zunder entzünden (rasant) und den B2-Test (Kleinbrenner-Test) nicht bestehen. Sie brennen rasend schnell ab.',
    context: 'Der Einbau in Bauwerken (selbst in Einfamilienhäusern) ist bauordnungsrechtlich **absolut verboten**, da das Brandrisiko unkalkulierbar ist. Ausnahme: Ein B3 Baustoff darf in Kombination mit anderen Stoffen (als Verbund-Bauteil) angewandt werden, wenn der gesamte Verbund im Test dann mind. als B2 nachgewiesen wurde.',
    testing: 'Kein eigenes Testverfahren.',
    testingSetup: 'Es gilt: Fällt ein Stoff beim DIN 4102-1 B2 Kleinbrenner-Test durch, wird er automatisch als B3 klassifiziert.',
    testingCriteria: 'Das sofortige Versagen beim Kleinbrenner-Test (Flamme erreicht die Marke in < 20 Sekunden).',
    norms: 'MBO §14',
    related: []
  }
];
