export const itemsFeuerwiderstand = [
  {
    id: 'feuerwiderstand-r',
    cat: 'feuerwiderstand',
    name: 'R - Tragfähigkeit (Résistance)',
    definition: 'Gibt die Zeit (R 15, 30, 60, 90, 120, 180 min) an, in der ein Bauteil bei Vollbrand (ETK) seine strukturelle **Tragfähigkeit** (ohne Einsturz oder unzulässige Verformung) behält.',
    context: 'Wichtigstes Merkmal für das Tragwerk (Stützen, Träger). Ohne Tragfähigkeit kollabiert das Gebäude, Fluchtwege werden verschüttet und Löscharbeiten der Feuerwehr unmöglich.',
    testing: 'EN 1365-1 (Wände), -2 (Decken), -3 (Träger), -4 (Stützen) u.w.',
    testingSetup: 'Das Bauteil wird in einen normierten Ofen eingebaut, vollflächig der Einheits-Temperatur-Zeit-Kurve (ETK) ausgesetzt und gleichzeitig mit der vorgesehenen Nennlast mechanisch belastet (z.B. hydraulische Stempel drücken mit X Tonnen Dauerlast auf die Stütze).',
    testingCriteria: 'Prüfabbruch, wenn das Bauteil bricht oder die zulässigen Verformungsgeschwindigkeiten/Absolutverformungen (z.B. L/30 oder L/20 Biegung) überschrritt.',
    norms: 'DIN EN 13501-2',
    related: ['brandschutzfarben', 'mörtel', 'manschetten']
  },
  {
    id: 'feuerwiderstand-e',
    cat: 'feuerwiderstand',
    name: 'E - Raumabschluss (Étanchéité)',
    definition: 'Gibt die Zeit (E 30...120 min) an, in der ein raumabschließendes Bauteil (Türen, Wände, Schottungen) dem Durchtritt von Flammen und heißen Gasen auf die brandabgekehrte Seite widersteht.',
    context: 'Essentiell für die Unterteilung eines Gebäudes in Brandabschnitte. Der Raumabschluss verhindert, dass das Feuer sofort in den nächsten Raum überschlägt.',
    testing: 'Vollbrand-Prüfofen (z.B. EN 1364-1 für Wände, EN 1634-1 für Türen, EN 1366-3 für Abschottungen)',
    testingSetup: 'Das Bauteil trennt den heißen Ofen (ETK) vom kühlen Laborraum. Über dem Bauteil herrscht ein leichter Überdruck (+20 Pa), um Flammen förmlich durch jede Ritze "pressen" zu wollen.',
    testingCriteria: 'Drei strikte Kriterien für \'E\': 1. Kein Riss/Öffnung darf klaffen, durch den eine genormte Messsonde (D=6mm bzw. D=25mm) passt. 2. Flammen dürfen auf der kalten Seite nicht länger als 10 Sekunden kontinuierlich lodern. 3. Ein an den Riss gehaltenes Wattebausch-Pad darf sich nicht entzünden.',
    norms: 'DIN EN 13501-2, EN 1363-1',
    related: ['fst-innen', 'fst-vorhaenge', 'abschottungen']
  },
  {
    id: 'feuerwiderstand-i',
    cat: 'feuerwiderstand',
    name: 'I - Wärmeisolation (Isolation)',
    definition: 'Gibt die Zeit (I 30...120 min) an, in der ein raumabschließendes Bauteil einen massiven Temperaturanstieg auf der brandabgewandten (kalten) Seite verhindert.',
    context: 'Wenn eine Stahl-Trennwand "nur E" hat, kommen zwar keine Flammen durch, aber der Stahl wird drüben z.B. 600 °C glühend heiß. In 20cm Abstand würde sich davor platziertes Papier oder Holz (B2) von selbst entzünden ("Strahlungszündung"). Daher ist in Deutschland meist EI gefordert – die Trennwände und Türen blocken nicht nur Flammen, sondern auch die Hitze.',
    testing: 'Gleicher Versuch wie bei "E" (z.B. EN 1634-1).',
    testingSetup: 'Auf der brandabgewandten (kühlen) Seite des Bauteils werden zahlreiche Thermoelemente fest angebracht (Mitte, Ecken, Ränder, Fugen).',
    testingCriteria: 'I ist bestanden, solange der Temperaturanstieg im Mittel max. 140 K (Kelvin) und an absolut keinem einzigen Messpunkt max. 180 K beträgt. Da die Raumtemperatur addiert wird, darf die Oberfläche im Flur auf der Fluchtseite (bei Start = 20°C) also zu keiner Zeit über 200°C wandern. Das Bauteil darf man fast noch mit der Hand berühren (bzw. ist man von einem Verbrennen beim Fliehend-Vorbeistreifen weit entfernt).',
    norms: 'DIN EN 13501-2',
    related: ['fst-innen', 'abschottungen']
  },
  {
    id: 'feuerwiderstand-w',
    cat: 'feuerwiderstand',
    name: 'W - Strahlungsminderung (Radiation)',
    definition: 'Gibt die Zeit (W 30...120 min) an, für die das Bauteil die Wärmestrahlung auf einen zulässigen Maximalwert drosselt.',
    context: 'Typisch bei Brandschutzverglasungen, die keine volle Isolation "I" leisten können/sollen, aber die enorme infrarote Hitzestrahlung des Feuers so dämpfen, dass sich benachbarte Materialien nicht unkontrolliert entzünden. Ist in D bauaufsichtlich seltener, dort dominiert oft "EI".',
    testing: 'Wie bei "E".',
    testingSetup: 'Aufstellung eines Wärmestrom-Strahlungsmessers exakt 1,0 m vor dem Fensterauge (kalte Seite).',
    testingCriteria: 'Die gemessene Durchstrahlung auf der brandabgekehrten Seite darf 15 kW/m² nicht überschreiten.',
    norms: 'DIN EN 13501-2',
    related: ['fst-innen']
  },
  {
    id: 'feuerwiderstand-m',
    cat: 'feuerwiderstand',
    name: 'M - Stoßbeanspruchung (Mechanical)',
    definition: 'Dieses Bauteil (meist Brandwände) widersteht einer extremen mechanischen Stoßbelastung während (oder direkt nach) des Vollbrandes.',
    context: 'Eine Brandwand trennt ganze Gebäudeteil-Cluster (REI 90-M gefordert). Wenn in einer Fabrikhalle auf der Seite A alles lichterloh brennt, stürzen dort Dachträger ein. Diese reißen an der Wand oder schmettern gegen die Wand. Die Brandwand (oft zweischalig) darf unter keinen Umständen umkippen.',
    testing: 'Z.B. EN 1364-1 Wandversuch.',
    testingSetup: 'Nach Ende des Standard-Beflammungstests im Ofen wird sofort – dreimal hintereinander – ein 200 kg schweres Stahlrohr-Leinensack-Pendel aus beträchtlicher Höhe stumpf gegen die Wand geknallt (3.000 Nm Energie!).',
    testingCriteria: 'Das Bauteil darf dabei seine E- (Raumabschluss) und I-Kriterien (Isolation) nicht aufgeben, d.h. es darf nicht durchbrechen. Es muss unerschütterlich stehen bleiben.',
    norms: 'DIN EN 13501-2',
    related: []
  },
  {
    id: 'feuerwiderstand-c',
    cat: 'feuerwiderstand',
    name: 'C - Selbstschließend (Closing)',
    definition: 'Das C (oft gefolgt von der Ziffer C0 bis C5 für Dauerhaftigkeit) bedeutet, dass bewegliche Bauteile (Türen, Tore, Vorhänge) im Brandfall exakt und zuverlässig von selbst zufallen und einrasten.',
    context: 'Eine hochsichere T90 (EI2 90) Tür bringt null Sicherheit, wenn sie im Brandfall aufsteht. Brandschutztüren sind immer selbstschließend (C). Meist kombiniert mit Feststellanlagen, die bei Rauch Alarm schlagen und das C auslösen.',
    testing: 'EN 1191 (für Fenster/Türen).',
    testingSetup: 'Test der Dauerfunktionsfähigkeit. Ein industrieller Roboter öffnet und der Türschließer schließt die Tür kontinuierlich. Zyklus für Zyklus.',
    testingCriteria: 'C0 = 1 bis 199.999 Zyklen. C5 = mind. 200.000 verschleißfreie Zyklen. (Sehr hoch).',
    norms: 'DIN EN 13501-2, EN 1191',
    related: ['fst-innen', 'feststellanlagen', 'fst-vorhaenge']
  },
  {
    id: 'feuerwiderstand-sm',
    cat: 'feuerwiderstand',
    name: 'S - Rauchdichtheit (Smoke)',
    definition: 'Gibt an, dass ein Feuerschutzabschluss (Tür) auch spezifisch für Rauchdichtigkeit ausgelegt und getestet ist. "Sm" (medium smoke / kalter und warmer Rauch) oder "Sa" (ambient smoke / nur kalter Rauch).',
    context: 'Rauchschutz (RS) Türen sind lebenswichtig in Rettungswegen. Oft reicht dort der Rauchschutz (dass man flüchten kann), und es wird gar nicht zwingend voller Temperatur-Feuer-Schutz "EI" gefordert, sondern "E 30-Sa".',
    testing: 'Brandofen ist hier völlig uninteressant. Getestet in einer Druck-Prüfkammer (EN 1634-3).',
    testingSetup: 'Die Tür wird eingebaut. Dann wird in der Kammer ein permanenter Überdruck (bis max. 50 Pa) aufgebaut und das Medium Luft (Sa) oder heißgasbeschlagene 200°C heiße Luft (Sm) hindurchgedrückt.',
    testingCriteria: 'Sm: Die Leckage-Rate (wie viel Gas pfeift in der Zeiteinheit m³/h durch die Türritzen?) darf max. 20 m³/h (bei einflügelig) und 30 m³/h (bei zweiflügelig) betragen.',
    norms: 'DIN EN 13501-2, EN 1634-3',
    related: ['fst-innen', 'feststellanlagen']
  }
];
