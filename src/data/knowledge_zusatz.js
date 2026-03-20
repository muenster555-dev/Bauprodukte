export const itemsZusatzSonder = [
  {
    id: 'rauch-s',
    cat: 'zusatz-sonder',
    name: 'Rauchentwicklung (s1, s2, s3)',
    definition: 'Das s steht für *smoke* (Rauch). Bewertet, wie viel Rauchgas in den frühen Stadien eines Brandes generiert wird. s1 = kaum Rauch, s2 = mittlere Menge, s3 = unbegrenzte, sichtbehindernde Entwicklung.',
    context: 'Rauch ist die Todesursache #1 im Brandfall, daher wird s1 extrem hart in Rettungswegen der Landesbauordnungen gefordert. WICHTIG: Die nationale DIN 4102-1 prüfte Rauch nicht getrennt! Daher musste mit dem europäischen System EN 13501-1 diese getrennte s-Klasse zur Standardanforderung (z.B. C-s1,d0) hinzutreten.',
    testing: 'Integral-gemessen im SBI-Test (EN 13823)',
    testingSetup: 'Im L-förmigen Ecken-Abzugsrohr des SBI-Tests ist eine weiße Lichtstrecke installiert. Wenn dunkler Rauch aufsteigt, verringert sich die Lichtdurchlässigkeit zwischen Sender und Empfänger. Der Prüfcomputer errechnet daraus die optische Dichte des Rauchs sekündlich.',
    testingCriteria: 's1: SMOGRA (Smoke Growth Rate / Geschwindigkeit des Rauchens) ≤ 30 m²/s² UND Gesamt-Rauch innerhalb 10 Minuten (TSP_600s) ≤ 50 m².\ns2: SMOGRA ≤ 180 m²/s² UND TSP ≤ 200 m².\ns3: Alles, was schlechter als s2 ist.',
    norms: 'EN 13823, EN 13501-1',
    related: ['baustoffe', 'fassade']
  },
  {
    id: 'abtropfen-d',
    cat: 'zusatz-sonder',
    name: 'Brennendes Abtropfen (d0, d1, d2)',
    definition: 'Das d steht für *droplets* (Tröpfchen). Bewertet die Gefahr der Brandausbreitung durch herabfallende, brennende Bestandteile. d0 = kein Abtropfen, d1 = Tröpfchen verlöschen schnell wieder, d2 = massiver Schmelz- und Tropfenregen mit andauerndem Brand.',
    context: 'Ein abfallender, brennender (Kunststoff-)Tropfen setzt sofort tiefere Stockwerke oder Teppiche in Brand. Daher ist d0 meist Pflicht.',
    testing: 'Wird am Rande der Groß- und Kleinbrandtests menschlich (!) observiert.',
    testingSetup: 'SBI-Test (EN 13823): Beobachtung mit laufender Stoppuhr über die vollen 21 Minuten durch das Prüfpersonal. Kein Messgerät!\nKleinbrenner (EN 11925-2): Unter der Test-Stoffkante liegt zudem ein Standard-Filterpapier auf dem Bodenboden.',
    testingCriteria: 'd0: Weder innerhalb der 600s Auswertungsperiode des SBI noch beim Kleinbrenner kommt es (in den erlaubten Intervallen) überhaupt zum Phänomen des "brennenden" Abtropfens.\nd1: Brennende Teile fallen, aber erlöschen beiSBI-Test in unter 10 Sekunden.\nd2: Brennendes Abtropfen, das länger als 10s anhält oder das Filterpapier beim Kleinbrenner entzündet.',
    norms: 'EN 13823, EN ISO 11925-2',
    related: ['baustoffe', 'fassade']
  },
  {
    id: 'glimmen',
    cat: 'zusatz-sonder',
    name: 'Glimmen / andauerndes Schwelen',
    definition: 'Flammenlose Verbrennung eines Bauprodukts mit sichtbarem Glutnest oder massivem, heimlichen Materialabbau („Schwelbrand“), aber im Gegensatz zur Flamme keine Gasphasen-Verbrennung.',
    context: 'In Deutschland bauaufsichtlich höchst relevant! Holzfaserdämmstoffe dürfen an bestimmten Stellen verbaut werden, müssen aber explizit getestet sein, dass nach dem Erlöschen einer Primärflamme kein heimliches, andauerndes Glimmen die Holzkonstruktion im Verborgenen fortschwelend zerstört.',
    testing: 'Spezialnorm: DIN EN 16733 (Neigung zu andauerndem Schwelen)',
    testingSetup: 'Ein Materialblock (800mm x 300mm x 100mm) wird in einen Kasten gesperrt. Eine kleine definierte Gasflamme an die freie Kante gesetzt (z.B. für 15 Min). Dann Abstellen der Flamme und Freigabe zur natürlichen Konvektionsströmung z.B. mittels Ventilatoren (Wind).',
    testingCriteria: 'Während der sehr langen Beobachtungszeit (inkl. Überprüfung der Innentemperatur in der Probe) und nach Beendigung darf kein "andauerndes Schwelen" gemeldet werden. Glutnester im Zentrum bedeuten Prüfabbruch.',
    norms: 'DIN EN 16733',
    related: ['baustoffe']
  },
  {
    id: 'bodenbelag-fl',
    cat: 'zusatz-sonder',
    name: 'Bodenbeläge (A1fl bis Ffl)',
    definition: 'Bodenbeläge (Tapeten, Teppiche, Laminate, Beschichtungen) verhalten sich im Brand extrem abweichend zu Wänden: Die Hitze strahlt meist als riesige heiße Schicht von der Decke vertikal auf sie herab, während die Flamme horizontal "kriecht". Die Euroklassen werden mit dem Suffix "fl" (für flooring) versehen.',
    context: 'Auf Bodenbelägen (im Flur) steht und flüchtet man. Cfl-s1 ist hier der bauaufsichtliche "Heilige Gral" in D (anstelle des für Wände geforderten normalen C). Für Böden entfallen die Abtropf-Klassen (d), logischerweise kann ein Boden schwerlich brennend abtropfen.',
    testing: 'Strahlungspaneel-Test nach EN ISO 9239-1',
    testingSetup: 'Ein 1-Meter langes Test-Band des Bodenbelags liegt horizontal in einer Box. Von schräg oben strahlt ein Hitze-Paneel (vergleichbar einem riesigen Gas-Heiz-Strahler) auf den Belag. Da es schräg angebracht ist, ist es am Anfang (Null-Punkt) viel heißer als am Ende (100 cm). Dort am Null-Punkt lodert zudem eine konstante Pilot-Zündflamme.',
    testingCriteria: 'Die Hitze vom Paneel strahlt den Belag vollflächig an, die Pilotflamme zündet ihn. Man misst, wie weit die Flamme auf dem Belag "kriecht", bevor sie erlischt. Die Distanz korreliert direkt mit dem Critical Heat Flux (CHF) – also dem Temperatur/Wärme-Gradienten an genau dem Punkt, wo das Feuer von sich aus stopte. Bfl = Flamme stoppt früh (CHF ≥ 8,0 kW/m²). Cfl = Flamme kriecht weiter (CHF ≥ 4,5 kW/m²).',
    norms: 'EN ISO 9239-1',
    related: ['bekleidungen']
  }
];
