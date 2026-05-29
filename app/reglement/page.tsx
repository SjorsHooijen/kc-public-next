import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reglement',
  description: 'Het officiële reglement van het Kempen Cup Klassement.',
}

const documents = [
  {
    title: 'Reglement 2026',
    description: 'Reglement Kempen Cup Klassement (V12)',
    href: '/documents/Reglement-Kempen-Cup-Klassement-2026.pdf',
  },
  {
    title: 'Toelatingsformulier 2026',
    description: 'Toelatingsformulier Kempen Cup Klassement (V12)',
    href: '/documents/Toelatingsformulier-Kempen-Cup-Klassement-2026.pdf',
  },
]

const sections = [
  { id: 'doelstelling', title: 'Doelstelling' },
  { id: 'deelname', title: 'Deelname' },
  { id: 'prijzen', title: 'Prijzen' },
  { id: 'reglement', title: 'Reglement' },
  { id: 'inschrijving', title: 'Inschrijving en kosten' },
  { id: 'documenten', title: 'Documenten' },
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
            <span className="text-white">KEMPEN CUP</span>
          </h1>
          <p className="font-body text-white/60 text-lg">
            Reglement Kempen Cup Klassement — versie V12
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
              {/* Doelstelling */}
              <section id="doelstelling" className="scroll-mt-24">
                <SectionHeading title="Doelstelling" />
                <div className="font-body text-gray-700 leading-relaxed text-sm md:text-base space-y-4">
                  <p>
                    Het Kempen Cup Klassement is een overkoepelend klassement van meerdere lokale
                    wielerorganisaties. Deelnemende organisaties staan vermeld op onze site{' '}
                    <a href="https://www.kempencup.nl" className="text-primary hover:underline">www.kempencup.nl</a>.
                    Dit klassement wordt verreden in de FUN-klasse onder licentie van de KNWU en biedt de
                    mogelijkheid aan lokale recreatieve renners om zich op een competitieve veilige manier te
                    meten met renners in de regio. Het doel is om de instroom van onderaf laagdrempelig te
                    houden en het wielrennen te stimuleren. Om de doelstellingen ook op lange termijn te
                    waarborgen zijn onderstaande voorwaarde van deelname opgenomen in het reglement. Daardoor
                    blijft het Kempen Cup Klassement van Funklasse niveau waardoor nieuwe recreatieve renners
                    niet worden afgeschrikt om deel te nemen.
                  </p>
                </div>
              </section>

              {/* Deelname */}
              <section id="deelname" className="scroll-mt-24">
                <SectionHeading title="Deelname" />
                <div className="font-body text-gray-700 leading-relaxed text-sm md:text-base space-y-4">
                  <p>Deelname is mogelijk als aan onderstaande voorwaarden wordt voldaan:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>U bent 15 jaar of ouder.</li>
                    <li>U heeft de laatste 3 jaar geen wedstrijd licentie gehad.</li>
                    <li>
                      Deelname enkel voor renners woonachtig binnen een straal van 25 km van onze wedstrijden
                      ofwel u bent gelieerd aan een bedrijf binnen deze straal of U bent op vakantie in de
                      Kempen.
                    </li>
                    <li>
                      U hebt dit jaar NIET deelgenomen aan wedstrijden van de KNWU of wedstrijden van
                      nevenbonden in Nederland of België van een hoger niveau.
                    </li>
                  </ol>
                  <p>
                    Indien een renner niet voldoet aan de regels van deelname maar toch vindt dat hij behoord
                    tot de doelgroep van het Kempen Cup Klassement kan hij door middel van een motivatie
                    dispensatie aanvragen om toch deel te mogen nemen. De motivatie zal door een commissie
                    worden getoetst.
                  </p>
                  <p>
                    Bij twijfel kunt u tot 10 dagen voor de eerste wedstrijd van het klassement contact opnemen
                    met de organisatie en uw motivatie toelichten. U krijgt dan uitsluitsel voor aanvang van de
                    eerste wedstrijd. Gebruik hiervoor het contactformulier op onze site{' '}
                    <a href="https://www.kempencup.nl" className="text-primary hover:underline">www.kempencup.nl</a>
                  </p>
                </div>
              </section>

              {/* Prijzen */}
              <section id="prijzen" className="scroll-mt-24">
                <SectionHeading title="Prijzen" />
                <div className="font-body text-gray-700 leading-relaxed text-sm md:text-base">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>De top 3 van het eindklassement krijgt als extra prijs een KNWU amateur licentie aangeboden</li>
                    <li>Voor het eindklassement krijgt de top 10 een prijs uitgekeerd</li>
                    <li>De prijzen van de lokale wedstrijden conform prijzenschema R van de KNWU</li>
                  </ul>
                </div>
              </section>

              {/* Reglement */}
              <section id="reglement" className="scroll-mt-24">
                <SectionHeading title="Reglement" />
                <div className="font-body text-gray-700 leading-relaxed text-sm md:text-base">
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>Het Kempen Cup Klassement wordt verreden over meerdere op zichzelf staande wedstrijden.</li>
                    <li>
                      Aan het Kempen Cup Klassement is maar één klassement verbonden namelijk: Algemeen
                      Individueel Klassement.
                    </li>
                    <li>
                      De leider in het klassement is herkenbaar aan de Leiderstrui van het Kempen Cup
                      Klassement en is deze verplicht te dragen.
                    </li>
                    <li>
                      Bij alle wedstrijden worden aan alle geklasseerde renners punten toegekend volgens de
                      schaal 1-20. De nummer 1 krijgt 20 punten, de nummer 2 krijgt 19 punten…..de nummer 20,
                      21 enz. krijgen 1 punt mits geklasseerd.
                    </li>
                    <li>Bij de laatste wedstrijd gelden dubbele punten.</li>
                    <li>
                      Tevens worden per wedstrijd 2 sprints gehouden: De eerste 3 geklasseerde renners krijgen
                      3, 2, resp. 1 punt.
                    </li>
                    <li>
                      Het klassement wordt vastgesteld door per renner de som der behaalde punten van alle
                      wedstrijden op te tellen. De tussensprints worden hierbij opgeteld
                      <br />
                      In geval van gelijkheid geldt:
                      <ul className="list-disc pl-6 mt-1">
                        <li>Hoogste plaatsingscijfer en aantal ervan</li>
                      </ul>
                      Bij nog geen beslissing:
                      <ul className="list-disc pl-6 mt-1">
                        <li>Hoogste plaatsingscijfer laatste wedstrijd van de agenda</li>
                      </ul>
                    </li>
                    <li>
                      De prijsuitreiking van het klassement zal plaatsvinden op de laatste wedstrijd van de
                      agenda (prijzen worden niet opgestuurd)
                    </li>
                    <li>Maximaal 80 deelnemers per wedstrijd</li>
                    <li>In alle gevallen waarin dit reglement niet voorziet, beslist de organisatie</li>
                    <li>Wedstrijd duur is 40 km.</li>
                  </ol>
                </div>
              </section>

              {/* Inschrijving en kosten */}
              <section id="inschrijving" className="scroll-mt-24">
                <SectionHeading title="Inschrijving en kosten" />
                <div className="font-body text-gray-700 leading-relaxed text-sm md:text-base space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Deelnemers moeten in bezit zijn van een KNWU ID nummer.</li>
                    <li>
                      Inschrijfkosten: € 10,-
                      <br />
                      Dit zijn de kosten van een dag-startlicentie.
                    </li>
                    <li>
                      Inschrijfkosten gratis voor deelnemers in bezit van een KNWU wedstrijdlicentie 15+ (plus)
                      en 15+ (premium).
                    </li>
                  </ul>
                  <p>
                    Alleen bij vertoning van uw KNWU wedstrijdlicentie is deelname aan het Kempen Cup
                    Klassement GRATIS!
                  </p>
                  <p>Het rugnummer hoeft NIET te worden teruggebracht.</p>
                </div>
              </section>

              {/* Documenten / downloads */}
              <section id="documenten" className="scroll-mt-24">
                <SectionHeading title="Documenten" />
                <div className="grid sm:grid-cols-2 gap-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.href}
                      className="border-2 border-dark/10 hover:border-primary transition-colors p-5 rounded-sm flex flex-col"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 flex items-center justify-center rounded-sm">
                          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-heading font-bold text-dark text-lg leading-tight">{doc.title}</h3>
                          <p className="font-body text-gray-500 text-sm">{doc.description}</p>
                        </div>
                      </div>
                      <div className="mt-auto flex gap-2">
                        <a
                          href={doc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center font-heading font-bold text-xs uppercase tracking-[0.15em] bg-dark text-white px-4 py-2.5 rounded-sm hover:bg-primary transition-colors"
                        >
                          Bekijken
                        </a>
                        <a
                          href={doc.href}
                          download
                          className="flex-1 text-center font-heading font-bold text-xs uppercase tracking-[0.15em] border-2 border-dark text-dark px-4 py-2.5 rounded-sm hover:bg-dark hover:text-white transition-colors"
                        >
                          Downloaden
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer note */}
            <div className="mt-14 p-5 bg-primary/10 border-l-4 border-primary">
              <p className="font-body text-sm text-gray-700">
                Voor vragen over het reglement kunt u contact opnemen via het contactformulier op onze site{' '}
                <a href="https://www.kempencup.nl" className="text-primary hover:underline font-medium">
                  www.kempencup.nl
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

function SectionHeading({ title }: { title: React.ReactNode }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-6 bg-primary flex-shrink-0" />
        <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em]">
          Reglement
        </span>
      </div>
      <h2 className="font-heading font-bold text-3xl uppercase tracking-tight text-dark mb-4 pb-2 border-b-2 border-primary">
        {title}
      </h2>
    </>
  )
}
