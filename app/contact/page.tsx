import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met de KempenCup organisatie.',
}

export default function ContactPage() {
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
              Neem contact op
            </span>
          </div>
          <h1 className="font-heading font-bold uppercase tracking-tighter leading-none mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            <span className="gradient-text">CONTACT</span>
          </h1>
          <p className="font-body text-white/60 text-lg max-w-xl">
            Heeft u vragen over de KempenCup? Neem gerust contact met ons op.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: info panel — dark bg with green accents */}
          <div className="bg-dark text-white p-8 rounded-sm relative overflow-hidden">
            {/* Subtle texture */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(139,201,58,0.4) 40px, rgba(139,201,58,0.4) 41px)',
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6 bg-primary flex-shrink-0" />
                <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em]">
                  Informatie
                </span>
              </div>
              <h2 className="font-heading font-bold text-3xl uppercase tracking-tight text-white mb-8">
                Contactgegevens
              </h2>

              <div className="space-y-6 font-body text-gray-400">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm uppercase tracking-wide text-white mb-0.5">E-mail</p>
                    <a
                      href="mailto:info@kempencup.nl"
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      info@kempencup.nl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm uppercase tracking-wide text-white mb-0.5">Regio</p>
                    <p>De Kempen, Noord-Brabant</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm uppercase tracking-wide text-white mb-0.5">KNWU</p>
                    <p>Licentiehouders verplicht bij deelname</p>
                  </div>
                </div>
              </div>

              {/* Info box */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-white mb-3">
                  Over de KempenCup
                </h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">
                  De KempenCup is een wielerwedstrijdklassering die jaarlijks wordt georganiseerd in de regio de Kempen, in de provincie Noord-Brabant. De klassering bestaat uit een reeks rondekoersen die voor en door lokale wielrenners worden georganiseerd.
                </p>
                <p className="font-body text-sm text-gray-500 leading-relaxed mt-3">
                  Wilt u meewerken aan de organisatie van een wedstrijd, of heeft u interesse in sponsoring? Neem dan contact met ons op via bovenstaand e-mailadres.
                </p>
              </div>
            </div>
          </div>

          {/* Right: contact form — white bg */}
          <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-primary flex-shrink-0" />
              <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em]">
                Formulier
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl uppercase tracking-tight text-dark mb-8">
              Stuur een bericht
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
