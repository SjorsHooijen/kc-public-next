import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CountdownBanner from '@/components/CountdownBanner'
import { ALL_RACES, MONTHS, type CalendarRace } from '@/lib/calendar'

export const metadata: Metadata = {
  title: 'Wedstrijden 2026',
  description: 'De volledige wedstrijdkalender van de KempenCup 2026 — negen koersen door de mooiste dorpen van de Kempen.',
}

// ── Sub-components ───────────────────────────────────────────────────────────

function MonthDivider({ label, kcCount, totalCount }: { label: string; kcCount: number; totalCount: number }) {
  return (
    <div className="flex items-center gap-5 mt-14 mb-7 first:mt-0">
      <div className="flex items-baseline gap-3">
        <h2 className="font-heading font-bold text-4xl uppercase tracking-tighter text-dark leading-none">{label}</h2>
        <span className="font-heading font-bold text-xs uppercase tracking-widest text-primary px-2.5 py-1 bg-primary/10 rounded-full">
          {kcCount} KC
        </span>
        {totalCount > kcCount && (
          <span className="font-heading font-bold text-xs uppercase tracking-widest text-gray-400 px-2.5 py-1 bg-gray-100 rounded-full">
            +{totalCount - kcCount}
          </span>
        )}
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
    </div>
  )
}

function RaceCard({ race, isPast, isNext }: { race: CalendarRace; isPast: boolean; isNext: boolean }) {
  return (
    <Link
      href={`/wedstrijden/${race.id}`}
      className={`group relative rounded-2xl overflow-hidden h-80 border block transition-all duration-300 focus:outline-none ${
        race.isFinale
          ? 'border-yellow-400/40'
          : isNext
          ? 'border-primary/50 ring-2 ring-primary/20 shadow-xl shadow-primary/15'
          : isPast
          ? 'border-white/5 opacity-70 hover:opacity-90'
          : race.isKC
          ? 'border-white/10 hover:border-primary/30 hover:shadow-xl hover:shadow-black/20'
          : 'border-white/5 hover:border-gray-400/20 hover:shadow-xl hover:shadow-black/20'
      }`}
    >
      {/* Background image */}
      <Image
        src={race.imageUrl}
        alt={race.name}
        fill
        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
          isPast || !race.isKC ? 'grayscale brightness-75' : 'brightness-90'
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/50 to-dark/10" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-dark/30" />

      {/* Green accent line */}
      {race.isKC && !isPast && !race.isFinale && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
      )}

      {/* Top badges */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between">
        <div className="flex items-center gap-2">
          {isNext && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
          <span className={`font-heading font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded backdrop-blur-sm ${
            isPast ? 'bg-white/10 text-white/40' :
            isNext ? 'bg-primary/20 text-primary border border-primary/30' :
            race.isKC ? 'bg-primary/20 text-primary border border-primary/30' :
            'bg-white/10 text-white/50'
          }`}>
            {isNext ? `Volgende · ${race.day}` : race.day}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          {race.isKC && (
            <span className={`font-heading font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 rounded ${
              isPast ? 'bg-white/10 text-white/30' : 'bg-primary text-dark'
            }`}>KC</span>
          )}
          {!race.isKC && (
            <span className="font-heading font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-gray-700/80 text-white/50 backdrop-blur-sm">
              Geen KC
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
        {/* Large date */}
        <div className={`mb-3 ${isPast ? 'text-white/25' : 'text-white'}`}>
          <div className="font-heading font-bold leading-none" style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)' }}>
            {race.dateDay}
          </div>
          <div className="font-heading font-bold text-2xl -mt-1 tracking-widest">{race.dateMonth}</div>
        </div>

        <div className={`h-px mb-3 ${isPast ? 'bg-white/10' : race.isKC ? 'bg-primary/40' : 'bg-white/15'}`} />

        <div>
          <h3 className={`font-heading font-bold text-lg uppercase tracking-tight leading-tight mb-1 ${isPast ? 'text-white/45' : 'text-white'}`}>
            {race.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className={`font-body text-xs flex items-center gap-1 ${isPast ? 'text-white/25' : 'text-white/55'}`}>
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {race.location}
            </p>
            <span className={`font-heading font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1 group-hover:gap-1.5 transition-all ${
              isPast ? 'text-white/20' : race.isKC ? 'text-primary' : 'text-white/30'
            }`}>
              Details
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function FinaleCard({ race, isPast }: { race: CalendarRace; isPast: boolean }) {
  return (
    <Link
      href={`/wedstrijden/${race.id}`}
      className="col-span-full group relative rounded-2xl overflow-hidden border border-yellow-400/30 shadow-2xl shadow-yellow-900/20 mt-2 block focus:outline-none"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 z-20 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <div className="relative h-72 md:h-80">
        <Image
          src={race.imageUrl}
          alt={race.name}
          fill
          className={`object-cover transition-transform duration-1000 group-hover:scale-105 ${isPast ? 'grayscale brightness-50' : 'brightness-75'}`}
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/75 to-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/30 to-transparent" />
        {!isPast && <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/20 to-transparent" />}
      </div>

      <div className="absolute inset-0 flex items-center z-10">
        <div className="w-full px-8 md:px-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          {/* Trophy */}
          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 ${isPast ? 'bg-white/5 border-white/10' : 'bg-yellow-400/10 border-yellow-400/40'}`}>
            <svg className={`w-10 h-10 md:w-12 md:h-12 ${isPast ? 'text-white/20' : 'text-yellow-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`font-heading font-bold text-xs uppercase tracking-[0.3em] ${isPast ? 'text-white/30' : 'text-yellow-400'}`}>
                Grote Finale
              </span>
              <span className={`font-heading font-bold text-xs uppercase tracking-widest px-2.5 py-1 rounded-full border ${isPast ? 'border-white/10 text-white/25 bg-white/5' : 'border-yellow-400/30 text-yellow-300 bg-yellow-400/10'}`}>
                {race.day} · {race.dateDay} {race.dateMonth} 2026
              </span>
            </div>
            <h3 className={`font-heading font-bold uppercase tracking-tighter leading-none ${isPast ? 'text-white/30' : 'text-white'}`} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              {race.name}
            </h3>
            <p className={`font-body text-sm mt-2 flex items-center gap-1.5 ${isPast ? 'text-white/25' : 'text-white/55'}`}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {race.location}
            </p>
          </div>

          {/* CTA */}
          <div className={`hidden md:flex items-center gap-2 flex-shrink-0 font-heading font-bold text-sm uppercase tracking-widest transition-all group-hover:gap-3 ${isPast ? 'text-white/20' : 'text-yellow-400'}`}>
            Bekijk details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function WedstrijdenPage() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const races = ALL_RACES.map(r => ({ ...r, isPast: new Date(r.date) < today }))
  const nextKCRace = races.find(r => !r.isPast && r.isKC) ?? null
  const kcCount   = races.filter(r => r.isKC).length
  const pastCount = races.filter(r => r.isPast && r.isKC).length

  return (
    <div className="bg-dark">
      {/* Live countdown */}
      {nextKCRace && (
        <CountdownBanner
          raceName={nextKCRace.name}
          raceDate={nextKCRace.date}
          raceLocation={nextKCRace.location}
          isFinale={nextKCRace.isFinale}
        />
      )}

      {/* Hero — matches /uitslagen style */}
      <section
        className="relative bg-dark py-28 px-6 overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(139,201,58,0.4) 40px, rgba(139,201,58,0.4) 41px)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10 pt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary flex-shrink-0" />
            <span className="text-primary font-heading font-bold text-sm uppercase tracking-[0.25em]">
              Seizoen 2026
            </span>
          </div>
          <h1
            className="font-heading font-bold uppercase tracking-tighter leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            <span className="text-white">WEDSTRIJD</span>
            <span className="gradient-text">KALENDER</span>
          </h1>
          <p className="font-body text-white/50 text-sm mt-2 max-w-xl">
            Negen KempenCup-manches door de Kempen, van mei tot september.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            {[
              { value: String(kcCount),             label: 'KempenCup manches' },
              { value: String(pastCount),            label: 'Afgelopen' },
              { value: String(kcCount - pastCount),  label: 'Aankomend' },
              { value: 'FUN',                        label: 'KNWU klasse' },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-3xl text-white">{value}</span>
                <span className="font-body text-sm text-white/40">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar */}
      <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 pb-24 pt-10">
        {/* Month sections */}
        {MONTHS.map(month => {
          const monthRaces = month.ids.map(id => races.find(r => r.id === id)!)
          const kcInMonth  = monthRaces.filter(r => r.isKC).length
          return (
            <div key={month.key}>
              <MonthDivider label={month.label} kcCount={kcInMonth} totalCount={monthRaces.length} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {monthRaces.map(race => {
                  const isNext = nextKCRace?.id === race.id
                  if (race.isFinale) return <FinaleCard key={race.id} race={race} isPast={race.isPast} />
                  return <RaceCard key={race.id} race={race} isPast={race.isPast} isNext={isNext} />
                })}
              </div>
            </div>
          )
        })}

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <p className="font-body text-sm text-gray-400">
            Alle KempenCup-wedstrijden staan onder KNWU-licentie in de FUN-klasse.
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}
