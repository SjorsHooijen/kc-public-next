import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reglement',
  description: 'Het officiële reglement van de KempenCup wielerklassering.',
}

const sections = [
  {
    id: 'algemeen',
    title: 'Artikel 1 – Algemeen',
    content: `De KempenCup is een wielerklassering voor amateurs in de regio de Kempen. De klassering bestaat uit een reeks wielerwedstrijden die gedurende het seizoen (april t/m september) worden verreden. Het doel van de KempenCup is het bevorderen van de wielersport in de regio en het bieden van een toegankelijke competitie voor actieve wielrenners.

De organisatie van de KempenCup berust bij de KempenCup stichting, in samenwerking met de afzonderlijke lokale organiserende verenigingen per wedstrijd. De stichting stelt het reglement vast en is eindverantwoordelijk voor de klassering.`,
  },
  {
    id: 'deelname',
    title: 'Artikel 2 – Deelname',
    content: `Deelname aan de KempenCup is uitsluitend voorbehouden aan houders van een geldige KNWU-licentie (FUN-klasse of hoger). Bij inschrijving dient de deelnemer in het bezit te zijn van een geldig legitimatiebewijs en een geldige KNWU-licentie.

Deelnemers dienen minimaal 18 jaar oud te zijn op het moment van deelname, tenzij de plaatselijke organisatie anders bepaalt. De deelnemer is verplicht deel te nemen op een verkeersrechtelijk goedgekeurd rijwiel dat voldoet aan de KNWU-technische voorschriften.

Aanmelding geschiedt via het online inschrijfsysteem op de website van de KempenCup, of ter plaatse bij de wedstrijdorganisatie, tot uiterlijk 30 minuten voor de start. Het inschrijfgeld bedraagt €5,- per wedstrijd en dient contant of via PIN te worden voldaan.`,
  },
  {
    id: 'klassering',
    title: 'Artikel 3 – Klassering en Puntentelling',
    content: `De KempenCup wordt beslist op basis van een puntensysteem. Per wedstrijd worden punten toegekend aan de best geklasseerde deelnemers als volgt:

1e plaats: 25 punten
2e plaats: 20 punten
3e plaats: 16 punten
4e plaats: 13 punten
5e plaats: 11 punten
6e – 10e plaats: 10, 9, 8, 7, 6 punten
11e – 20e plaats: 5, 4, 3, 2, 1 punten

Alle overige finishers ontvangen 0 punten voor de klassering, maar worden wel geregistreerd als deelnemer.

Voor de eindklassering telt het beste resultaat van elke wedstrijd die een deelnemer heeft gereden. Er wordt geen wedstrijd afgetrokken. Bij gelijke puntenstand beslist het hoogste aantal behaalde overwinningen; daarna de meeste tweede plaatsen, enzovoort.`,
  },
  {
    id: 'finale',
    title: 'Artikel 4 – Finale',
    content: `De laatste wedstrijd van het seizoen heeft de status "Finale". Voor de Finale worden dubbele punten uitgedeeld. Deelname aan de Finale is vrij voor alle KNWU-licentiehouders; het is niet verplicht om in de voorafgaande wedstrijden te hebben deelgenomen.

De KempenCup winnaar wordt bekendgemaakt na de afloop van de Finale. De prijsuitreiking vindt dezelfde dag plaats.`,
  },
  {
    id: 'gedrag',
    title: 'Artikel 5 – Gedragsregels',
    content: `Van deelnemers wordt sportief en respectvol gedrag verwacht jegens medewerkers, officials en andere deelnemers. Agressief rijgedrag, het bewust hinderen van andere rijders en het negeren van verkeersregels leiden tot directe diskwalificatie.

Het gebruik van doping is ten strengste verboden. Op de wedstrijden kan willekeurig dopingcontrole plaatsvinden conform de KNWU-regels. Bij een positieve dopingtest wordt de deelnemer gediskwalificeerd en uitgesloten van verdere deelname aan de KempenCup in het lopende seizoen.

Elke rijder dient een helm te dragen die voldoet aan de geldende KNWU-normen. Deelnemen zonder helm leidt tot uitsluiting van de start.`,
  },
  {
    id: 'veiligheid',
    title: 'Artikel 6 – Veiligheid en Aansprakelijkheid',
    content: `Deelname geschiedt op eigen risico. De KempenCup stichting, de plaatselijke organisatie en de betrokken vrijwilligers aanvaarden geen aansprakelijkheid voor persoonlijk letsel of materiële schade, tenzij er sprake is van opzet of grove nalatigheid van de organisatie.

Deelnemers zijn verplicht een geldige WA-verzekering te hebben. De KNWU-licentie voorziet in een basisverzekering; deelnemers dienen zelf na te gaan of deze dekking toereikend is.

De koersdirecteur heeft te allen tijde het recht een wedstrijd te neutraliseren of te staken bij onveilige omstandigheden. In dat geval worden de uitstaande punten niet toegekend, tenzij meer dan 50% van de geplande afstand is afgelegd.`,
  },
  {
    id: 'protest',
    title: 'Artikel 7 – Protest en Bezwaar',
    content: `Een protest kan worden ingediend door de deelnemer zelf, of namens hem/haar door een aangewezen begeleider, bij de wedstrijdleider. Protesten dienen schriftelijk te worden ingediend binnen 15 minuten na de officiële uitslag, vergezeld van een borgsom van €25,-. Bij een gegrond protest wordt de borgsom terugbetaald.

De wedstrijdcommissaris beslist zo spoedig mogelijk, doch uiterlijk binnen één uur na indiening. Zijn beslissing is bindend voor het betreffende evenement. Beroep is mogelijk bij het KempenCup bestuur binnen 7 dagen na de wedstrijd.`,
  },
  {
    id: 'prijzen',
    title: 'Artikel 8 – Prijzen',
    content: `Per wedstrijd worden prijzen uitgereikt aan de top 3 finishers. De exacte aard van de prijzen wordt bepaald door de plaatselijke organisatie.

Aan het einde van het seizoen worden de volgende klassementsprijzen uitgereikt:
- KempenCup winnaar (1e in het eindklassement): wisseltrofee + individuele prijs
- 2e in het eindklassement: individuele prijs
- 3e in het eindklassement: individuele prijs

De prijsuitreiking voor het eindklassement vindt plaats tijdens of direct na de Finale wedstrijd.`,
  },
  {
    id: 'wijzigingen',
    title: 'Artikel 9 – Wijzigingen en Slotbepalingen',
    content: `Het KempenCup bestuur behoudt zich het recht voor dit reglement tussentijds te wijzigen. Wijzigingen worden ten minste 14 dagen voor hun inwerkingtreding bekendgemaakt via de website van de KempenCup.

In gevallen waarin dit reglement niet voorziet, beslist het KempenCup bestuur. Op alle geschillen is Nederlands recht van toepassing.

Dit reglement is vastgesteld door het KempenCup bestuur en van kracht per seizoen 2025.`,
  },
]

export default function ReglementPage() {
  return (
    <>
      {/* Page hero */}
      <section
        className="relative bg-dark py-28 px-6 overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(139,201,58,0.3) 40px, rgba(139,201,58,0.3) 41px)',
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10 pt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary flex-shrink-0" />
            <span className="text-primary font-heading font-bold text-sm uppercase tracking-[0.25em]">
              Officieel document
            </span>
          </div>
          <h1 className="font-heading font-bold uppercase tracking-tighter leading-none mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            <span className="gradient-text">REGLEMENT</span>
            <br />
            <span className="text-white">KEMPENCUP</span>
          </h1>
          <p className="font-body text-white/60 text-lg">
            Versie 2025 — vastgesteld door het KempenCup bestuur
          </p>
        </div>
      </section>

      {/* Content with sidebar */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky sidebar — table of contents */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24 bg-dark text-white p-6 rounded-sm">
              <h2 className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-primary mb-4">
                Inhoudsopgave
              </h2>
              <ol className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="font-body text-sm text-gray-400 hover:text-primary transition-colors leading-snug block"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* Article content */}
          <div className="flex-1 min-w-0">
            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-6 bg-primary flex-shrink-0" />
                    <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em]">
                      Reglement
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-3xl uppercase tracking-tight text-dark mb-4 pb-2 border-b-2 border-primary">
                    {section.title}
                  </h2>
                  <div className="font-body text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-14 p-5 bg-primary/10 border-l-4 border-primary">
              <p className="font-body text-sm text-gray-700">
                Voor vragen over het reglement kunt u contact opnemen via{' '}
                <a href="mailto:info@kempencup.nl" className="text-primary hover:underline font-medium">
                  info@kempencup.nl
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
