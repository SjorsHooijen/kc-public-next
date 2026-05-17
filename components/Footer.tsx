import Link from 'next/link'

const footerLinks = [
  { href: '/wedstrijden', label: 'Wedstrijden' },
  { href: '/uitslagen-2026', label: 'Uitslagen' },
  { href: '/reglement', label: 'Reglement' },
  { href: '/nieuws', label: 'Nieuws' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      className="bg-dark text-gray-400 relative"
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.01) 40px, rgba(255,255,255,0.01) 80px)',
      }}
    >
      {/* Green gradient top border */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-primary" />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <span className="inline-block w-2 h-2 bg-primary rotate-45 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-heading text-2xl font-bold uppercase tracking-wide text-white">
                KEMPEN<span className="text-primary">CUP</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              De KempenCup is de wielrenklassering voor recreatieve renners in de Kempen, georganiseerd door tien lokale wielerverenigingen. Wedstrijden worden gereden in de FUN-klasse onder KNWU-licentie, van mei tot september door de mooiste dorpen van Noord-Brabant.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase text-white mb-4 tracking-[0.2em]">
              Navigatie
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase text-white mb-4 tracking-[0.2em]">
              Contact &amp; Info
            </h4>
            <p className="text-sm mb-2">
              <a
                href="mailto:info@kempencup.nl"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                info@kempencup.nl
              </a>
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              KNWU licentiehouders verplicht.
              <br />
              Deelname op eigen risico.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <span>&copy; {new Date().getFullYear()} KempenCup. Alle rechten voorbehouden.</span>
          <span className="text-gray-700">Wielerklassering de Kempen &bull; Noord-Brabant</span>
          <span>
            Website door{' '}
            <a
              href="https://kempensoft.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              KempenSoft
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
