import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_RACES } from '@/lib/calendar'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return ALL_RACES.map(r => ({ slug: r.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const race = ALL_RACES.find(r => r.id === params.slug)
  if (!race) return { title: 'Wedstrijd niet gevonden' }
  return {
    title: race.name,
    description: race.description.slice(0, 155),
  }
}

function formatFullDate(dateStr: string): string {
  const months = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december']
  const d = new Date(dateStr)
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

export default function RaceDetailPage({ params }: Props) {
  const race = ALL_RACES.find(r => r.id === params.slug)
  if (!race) notFound()

  const today = new Date(); today.setHours(0, 0, 0, 0)
  const isPast   = new Date(race.date) < today
  const isToday  = new Date(race.date).toDateString() === today.toDateString()
  const raceIndex = ALL_RACES.filter(r => r.isKC).findIndex(r => r.id === race.id)
  const prevRace  = ALL_RACES.filter(r => r.isKC)[raceIndex - 1] ?? null
  const nextRace  = ALL_RACES.filter(r => r.isKC)[raceIndex + 1] ?? null

  return (
    <>
      {/* Hero image */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(280px, 45vw, 480px)' }}>
        <Image
          src={race.imageUrl}
          alt={race.name}
          fill
          className={`object-cover ${isPast ? 'grayscale brightness-75' : 'brightness-90'}`}
          priority
          sizes="100vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/50 to-transparent" />

        {/* Gold line for finale */}
        {race.isFinale && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent z-10" />
        )}

        {/* Breadcrumb */}
        <div className="absolute top-20 left-0 right-0 z-10">
          <div className="max-w-5xl mx-auto px-6">
            <Link href="/wedstrijden" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white font-body text-xs transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Wedstrijdkalender
            </Link>
          </div>
        </div>

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-5xl mx-auto px-6 pb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {race.isFinale && (
              <span className="font-heading font-bold text-xs uppercase tracking-[0.25em] text-yellow-400 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Grote Finale
              </span>
            )}
            {race.isKC && !race.isFinale && (
              <span className="font-heading font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 bg-primary text-dark rounded">
                KempenCup 2026
              </span>
            )}
            {!race.isKC && (
              <span className="font-heading font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 bg-gray-700/80 text-white/60 rounded backdrop-blur-sm">
                Geen KempenCup
              </span>
            )}
            {isPast && (
              <span className="font-heading font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 bg-white/10 text-white/50 rounded backdrop-blur-sm">
                Afgelopen
              </span>
            )}
            {isToday && (
              <span className="font-heading font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 bg-primary text-dark rounded animate-pulse">
                Vandaag!
              </span>
            )}
          </div>
          <h1
            className="font-heading font-bold uppercase tracking-tighter text-white leading-none"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            {race.name}
          </h1>
          <p className={`font-body text-sm mt-2 ${isPast ? 'text-white/40' : 'text-white/60'}`}>
            {race.day} {formatFullDate(race.date)}
            {race.startTime && ` · Start: ${race.startTime}`}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-10">

            {/* Description */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary flex-shrink-0" />
                <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.25em]">Over deze wedstrijd</span>
              </div>
              <p className="font-body text-gray-600 leading-relaxed text-base">{race.description}</p>
            </section>

            {/* Results link (if past KC race) */}
            {isPast && race.isKC && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-primary flex-shrink-0" />
                  <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.25em]">Uitslagen</span>
                </div>
                <Link
                  href="/uitslagen-2026"
                  className="inline-flex items-center gap-3 bg-dark text-white font-heading font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-xl hover:bg-dark/80 transition-all hover:-translate-y-0.5 group"
                >
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Bekijk uitslagen 2026
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </section>
            )}

            {/* KC season navigation */}
            {race.isKC && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-primary flex-shrink-0" />
                  <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.25em]">Andere manches</span>
                </div>
                <div className="flex gap-3">
                  {prevRace && (
                    <Link href={`/wedstrijden/${prevRace.id}`} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-primary/40 hover:bg-primary/5 transition-all group">
                      <div className="text-xs font-heading font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Vorige
                      </div>
                      <div className="font-heading font-bold text-sm uppercase tracking-tight text-dark group-hover:text-primary transition-colors">{prevRace.shortName}</div>
                      <div className="font-body text-xs text-gray-400 mt-0.5">{prevRace.dateDay} {prevRace.dateMonth}</div>
                    </Link>
                  )}
                  {nextRace && (
                    <Link href={`/wedstrijden/${nextRace.id}`} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-primary/40 hover:bg-primary/5 transition-all group text-right">
                      <div className="text-xs font-heading font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center justify-end gap-1">
                        Volgende
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </div>
                      <div className="font-heading font-bold text-sm uppercase tracking-tight text-dark group-hover:text-primary transition-colors">{nextRace.shortName}</div>
                      <div className="font-body text-xs text-gray-400 mt-0.5">{nextRace.dateDay} {nextRace.dateMonth}</div>
                    </Link>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Race info card */}
            <div className="bg-dark rounded-2xl overflow-hidden">
              <div className="h-0.5 bg-gradient-to-r from-primary via-primary-dark to-primary" />
              <div className="p-6 space-y-4">
                <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-white">
                  Wedstrijdinfo
                </h3>
                {[
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    ),
                    label: 'Datum',
                    value: `${race.day}, ${formatFullDate(race.date)}`,
                  },
                  race.startTime ? {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ),
                    label: 'Starttijd',
                    value: race.startTime,
                  } : null,
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    ),
                    label: 'Locatie',
                    value: race.location,
                  },
                  race.distanceKm ? {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                    ),
                    label: 'Afstand',
                    value: `± ${race.distanceKm} km`,
                  } : null,
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    ),
                    label: 'Klasse',
                    value: 'FUN · KNWU licentie',
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    ),
                    label: 'Klassement',
                    value: race.isKC ? 'KempenCup 2026' : 'Geen KempenCup',
                  },
                ].filter(Boolean).map((item) => {
                  const { icon, label, value } = item!
                  return (
                    <div key={label} className="flex items-start gap-3">
                      <div className="text-primary mt-0.5 flex-shrink-0">{icon}</div>
                      <div>
                        <div className="font-body text-xs text-white/40 uppercase tracking-widest">{label}</div>
                        <div className="font-body text-sm text-white/80 mt-0.5">{value}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <div className={`rounded-2xl p-6 border ${race.isFinale ? 'bg-yellow-950/30 border-yellow-400/20' : 'bg-primary/5 border-primary/20'}`}>
              <p className="font-heading font-bold text-sm uppercase tracking-wide text-dark mb-3">
                {race.isFinale ? '🏆 Grote Finale 2026' : 'Deelnemen?'}
              </p>
              <p className="font-body text-xs text-gray-500 mb-4 leading-relaxed">
                KNWU-licentiehouders kunnen deelnemen aan alle KempenCup-wedstrijden. Aanmelden via je wielervereniging.
              </p>
              <Link
                href="/contact"
                className="block text-center bg-primary text-dark font-heading font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Meer informatie
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
