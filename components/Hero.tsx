import Image from 'next/image'
import Link from 'next/link'
import IMAGES from '@/config/images'

const stats = [
  { value: '9', label: 'Wedstrijden' },
  { value: 'FUN', label: 'Klasse' },
  { value: 'KNWU', label: 'Licentie' },
  { value: '2026', label: 'Seizoen' },
]

export default function Hero() {
  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '100svh', clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}
      >
        {/* Background image */}
        <Image
          src={IMAGES.hero.peloton}
          alt="KempenCup wielrennen"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col justify-center min-h-screen max-w-7xl mx-auto px-6 pt-20 pb-32"
          style={{ minHeight: '100svh' }}
        >
          {/* Season label */}
          <span className="opacity-0 animate-slide-left inline-block text-primary font-heading font-bold text-sm uppercase tracking-[0.3em] mb-6">
            Wielerklassering Kempen &bull; Seizoen 2026
          </span>

          {/* Main heading */}
          <h1
            className="opacity-0 animate-fade-in-up delay-100 font-heading font-bold uppercase leading-none tracking-tighter mb-6"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
          >
            <span className="text-white">KEMPEN</span>
            <br />
            <span className="gradient-text">CUP</span>
          </h1>

          {/* Subtitle */}
          <p className="opacity-0 animate-fade-in-up delay-200 text-white/70 font-body text-lg md:text-xl max-w-lg mb-8">
            Tien wielerorganisaties uit de Kempen bundelen hun krachten in één grote wielrenklassering. Van mei tot september strijden honderden KNWU-licentiehouders door de mooiste dorpen van Noord-Brabant om de felbegeerde KempenCup-titel.
          </p>

          {/* CTA row */}
          <div className="opacity-0 animate-fade-in-up delay-300 flex flex-wrap gap-4">
            <Link
              href="/wedstrijden"
              className="bg-primary text-dark font-heading font-bold text-lg uppercase tracking-wide px-8 py-3 hover:bg-primary-dark transition-all hover:-translate-y-0.5 inline-block"
            >
              Bekijk wedstrijden &rarr;
            </Link>
            <Link
              href="/uitslagen-2026"
              className="border border-white/30 text-white font-body px-8 py-3 hover:bg-white/10 transition-all inline-block"
            >
              Klassement 2026
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip — outside the clipped section so it's never cut off */}
      <div className="bg-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-8 md:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-heading font-bold text-2xl text-primary leading-none">
                  {stat.value}
                </span>
                <span className="font-body text-xs text-white/60 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
