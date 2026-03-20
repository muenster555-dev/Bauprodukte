export const itemsBrandverhaltenEN = [
  {
    id: 'en-a1',
    cat: 'brandverhalten-en',
    name: 'A1 - Nichtbrennbar (Euroklasse)',
    definition: 'Nach europäischem System: Baustoffe, die unter keinen Umständen zur Brandausbreitung (Flash-over) beitragen. Entspricht der nationalen Klasse A1.',
    context: 'Da Bauprodukte heute europäisch harmonisiert werden (CE-Zeichen), ist das System EN 13501-1 der entscheidende Maßstab anstelle der DIN 4102. Die Klasse A1 ist die Höchstwertung und hat im EN-System per Definition keine Ausprägungen für Rauch (s) oder Abtropfen (d).',
    testing: 'EN ISO 1182 (Ofentest) UND EN ISO 1716 (Bombenkalorimeter)',
    testingSetup: '1. Röhrenofen bei strömend 750 °C.\n2. Zusätzlich wird im Bombenkalorimeter unter reinem Sauerstoff mit max. Druck eine kleine pulverisierte Probe (ca. 0,5 g) zentrisch zur Detonation entflammt. Ein Wasserbad misst den Brennwert.',
    testingCriteria: '1. Ofentest: Temperaturerhöhung (Thermoelement) ≤ 30 K, Massenverlust ≤ 50 %, Flammenbildung ≤ 0 Sekunden.\n2. Bombenkalorimeter: Die Bruttoverbrennungswärme (Brennwert PCS) muss absolut minimal sein: ≤ 2,0 MJ/kg.',
    norms: 'EN 13501-1, EN ISO 1182, EN ISO 1716',
    related: ['baustoffe']
  },
  {
    id: 'en-a2',
    cat: 'brandverhalten-en',
    name: 'A2 - Nichtbrennbar mit geringen Anteilen (Euroklasse)',
    definition: 'Baustoffe, die ebenfalls beim Flash-over keine tragende Rolle spielen, aber im Ofen test moderat höhere Verbrennungswärmen liefern als A1. Das Produkt ist sicher, hat aber winzige organische Zusätze (Beispiel: Mineralwollmatten mit organischem Kleber).',
    context: 'Wird in Deutschland bauaufsichtlich wie A1 behandelt (z.B. in der BauO gefordert als "nichtbrennbar"). WICHTIG: Im europäischen System müssen für A2 immer auch Rauch- und Abtropfklassen (s, d) getestet werden, z.B. A2-s1, d0.',
    testing: 'EN ISO 1182 (Ofentest) ODER EN ISO 1716 (Bombenkalorimeter) PLUS EN 13823 (SBI) + EN ISO 11925-2',
    testingSetup: 'Statt Zwang für Ofen UND Bombe, reicht das Bestehen einer Variante (mit leicht lockereren Werten als A1). Dafür MUSS der SBI-Test durchlaufen werden (SBI = Single Burning Item = Verbrennung eines Müllkorbs in der Raumecke).',
    testingCriteria: 'Bombenkalorimeter (sofern gewählt): PCS ≤ 3,0 MJ/kg (im Vergleich zu 2,0 bei A1). Beim SBI-Test: Höchst restriktive Wärmeabgabe FIGRA ≤ 120 W/s und Gesamt-Hitze-Entwicklung THR_600s ≤ 7,5 MJ.',
    norms: 'EN 13501-1',
    related: ['baustoffe']
  },
  {
    id: 'en-b',
    cat: 'brandverhalten-en',
    name: 'B - Schwerentflammbar (Höchste brennbare Klasse)',
    definition: 'Die beste Einstufung für grundlegend brennbare Baustoffe im EU-System. Besitzt eine extrem begrenzte seitliche Flammenausbreitung und sehr geringe Wärmefreisetzung beim Brand.',
    context: 'Viel restriktiver im SBI-Test als Klasse C. Oft gefordert in Rettungswegen kombiniert mit -s1,d0.',
    testing: 'EN 13823 (SBI-Test) PLUS EN ISO 11925-2 (Einzelflammen)',
    testingSetup: 'SBI (Single Burning Item – Maßgebliche Prüfung für EU-Klassen B,C,D): In einer Prüfkammer wird eine L-förmige Raumecke aus dem Bauprodukt geformt (Schenkel 1m x 1,5m hoch und 0,5m x 1,5m hoch). Unten in der Ecke sitzt ein dreieckiger Sandbrenner (30 kW). Beflammung für 21 Minuten. Eine Gashaube saugt den entstehenden Rauch direkt ab und analysiert im Kamin kontinuierlich Sauerstoffverlust und CO2-Zunahme (Hitze-Entwicklung).',
    testingCriteria: 'Einzelflamme: Keine Entzündung oberhalb 150 mm in 60s.\nSBI: Wachstum der Wärmefreisetzungsrate (FIGRA) ≤ 120 W/s. Kantenflammen dürfen den langen Flügel nicht unbegrenzt erreichen (LFS). Gesamthitze (THR_600s) ≤ 7,5 MJ.',
    norms: 'EN 13823',
    related: ['fassade', 'bekleidungen']
  },
  {
    id: 'en-c',
    cat: 'brandverhalten-en',
    name: 'C - Schwerentflammbar (Klasse der Mittellage)',
    definition: 'Auch Klasse C gilt oft noch als bauaufsichtlich "schwerentflammbar" (nationales Äquivalent i.d.R. der alte B1), wenn bestimmte s/d-Werte eingehalten werden (siehe MVV TB). Sie hat jedoch schlechtere Werte beim Wärmeabgabe-Test (SBI) als Klasse B.',
    context: 'Zusammen mit "B" die Hauptklasse für Bauprodukte in Rettungsfluren (Tapeten, Farben, Wandverkleidungen).',
    testing: 'EN 13823 (SBI-Test) PLUS EN ISO 11925-2 (Einzelflammen)',
    testingSetup: 'Gleicher L-Eck-Test (30kW Müllkorb) wie Klasse B.',
    testingCriteria: 'SBI: FIGRA ≤ 250 W/s (bei B war es 120 W/s). THR_600s ≤ 15 MJ (bei B 7,5 MJ). Flammen dürfen ebenfalls den langen Flügel nicht vorzeitig komplett seitlich erreichen (LFS < Rand).',
    norms: 'EN 13823',
    related: ['bekleidungen']
  },
  {
    id: 'en-d',
    cat: 'brandverhalten-en',
    name: 'D - Normalentflammbar (Klasse mit Flash-over Beitrag)',
    definition: 'Baustoffe, die eine hohe Hitzeentwicklung haben und stark zu einem Flash-over (Durchzündung eines ganzen Raumes) beitragen. Entspricht sehr grob der DIN 4102-1 B2 Klasse (Holz und Holzwerkstoffe).',
    context: 'Dürfen im EU-Sinne legal im Standard-Bauwesen verkauft werden. In D oft als "normalentflammbar" übersetzt.',
    testing: 'EN 13823 (SBI-Test) PLUS EN ISO 11925-2 (Einzelflamme)',
    testingSetup: 'Ebenfalls L-Eck-Test SBI und Kleinbrenner.',
    testingCriteria: 'SBI: FIGRA hier gelockert auf ≤ 750 W/s.',
    norms: 'EN 13501-1',
    related: ['baustoffe']
  },
  {
    id: 'en-e',
    cat: 'brandverhalten-en',
    name: 'E - Normalentflammbar (Akzeptables Kleinbrand-Verhalten)',
    definition: 'Diese Baustoffe überstehen den Kleinbrennertest, fallen aber für alle restriktiveren Tests komplett durch bzw. werden erst gar nicht im großen SBI-Test geprüft. Das Brandverhalten ist also nur für den ersten Kontakt mit einer kleinen Flamme nachgewiesen.',
    context: 'In Deutschland ebenfalls dem B2 zugeordnet.',
    testing: 'NUR EN ISO 11925-2 (Einzelflamme)',
    testingSetup: 'Kein großer SBI-Eckenbrand! Nur die 20-mm ("Feuerzeug") Flamme in einer Kammer, direkt auf das Material gehalten.',
    testingCriteria: 'Beflammung für nur 15 Sekunden. Die Flammenspitze der Baustoff-Reaktion darf dann in 20 Sekunden nicht die 150-mm-Markise überschreiten.',
    norms: 'EN ISO 11925-2',
    related: ['baustoffe']
  },
  {
    id: 'en-f',
    cat: 'brandverhalten-en',
    name: 'F - Leichtentflammbar (Verboten)',
    definition: 'Diese Baustoffe sind leichtentflammbar, haben keine nachgewiesene Feuer-Leistung und bestehen selbst den harmlosen 15-Sekunden-Kleinbrennertest nicht.',
    context: 'Wie B3 in Deutschland: Die bauliche Nutzung als isolierter Stoff ist aus gutem Grund fast ausnahmslos **verboten**.',
    testing: 'Ohne oder negativ',
    testingSetup: 'Die Probe brennt zu schnell ab oder reines "nicht getestet".',
    testingCriteria: 'Keine Leistung festgestellt (NPD = No Performance Determined) oder EN ISO 11925-2 massiv bestanden (brennt wie Zunder).',
    norms: 'EN 13501-1',
    related: []
  }
];
