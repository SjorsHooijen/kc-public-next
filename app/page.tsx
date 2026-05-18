import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import StandingsTable from '@/components/StandingsTable'
import NewsCard from '@/components/NewsCard'
import Link from 'next/link'
import Image from 'next/image'
import { ALL_RACES } from '@/lib/calendar'

export const metadata: Metadata = {
  title: 'Homepage',
  description: 'De officiële website van de KempenCup wielerklassering in de Kempen.',
}

function getUpcomingRaces() {
  const today = new Date().toISOString().slice(0, 10)
  return ALL_RACES
    .filter(r => r.isKC && r.date >= today)
    .slice(0, 3)
}

async function getStandings() {
  try {
    const sql = (await import('@/lib/db')).default
    const rows = await sql`
      SELECT position, rider_name, total_points, races_entered
      FROM standings
      WHERE season = 2026
      ORDER BY position ASC
      LIMIT 10
    `
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rows.map((r: any) => {
      const nameParts = (r.rider_name as string).split(' ').filter((p: string) => p.trim())
      let voornaam: string | null = null
      let tussenaam: string | null = null
      let achternaam: string | null = null

      if (nameParts.length === 1) {
        achternaam = nameParts[0]
      } else if (nameParts.length === 2) {
        voornaam = nameParts[0]
        achternaam = nameParts[1]
      } else if (nameParts.length >= 3) {
        voornaam = nameParts[0]
        tussenaam = nameParts.slice(1, -1).join(' ')
        achternaam = nameParts[nameParts.length - 1]
      }

      return {
        position: r.position as number,
        voornaam,
        tussenaam,
        achternaam,
        rider_name: r.rider_name as string,
        total_points: r.total_points as number,
        races_entered: r.races_entered as number,
      }
    })
  } catch {
    return []
  }
}

async function getLatestNews() {
  try {
    const sql = (await import('@/lib/db')).default
    const rows = await sql`
      SELECT * FROM news
      ORDER BY published_at DESC
      LIMIT 6
    `
    return rows
  } catch {
    return []
  }
}

export default async function HomePage() {
  const upcomingRaces = getUpcomingRaces()
  const [standings, news] = await Promise.all([
    getStandings(),
    getLatestNews(),
  ])

  return (
    <>
      {/* Hero — full width, no container */}
      <Hero />

      {/* Upcoming races section */}
      <section
        className="py-20 px-4 bg-gray-light/50"
        style={{ clipPath: 'polygon(0 4%, 100% 0, 100% 100%, 0 100%)' }}
      >
        <div className="max-w-7xl mx-auto pt-8">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary flex-shrink-0" />
            <span className="text-primary font-heading font-bold text-sm uppercase tracking-[0.25em]">
              Seizoen 2026
            </span>
          </div>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-heading font-bold text-5xl md:text-6xl uppercase tracking-tighter text-dark">
              Wedstrijden
            </h2>
            <Link
              href="/wedstrijden"
              className="hidden md:inline-flex items-center gap-1 text-primary font-heading font-bold text-sm uppercase tracking-wide hover:text-primary-dark transition-colors"
            >
              Alle wedstrijden <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {upcomingRaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingRaces.map((race, i) => (
                <Link
                  key={race.id}
                  href={`/wedstrijden/${race.id}`}
                  className={`group opacity-0 animate-fade-in-up delay-${(i + 1) * 100} block rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white`}
                >
                  {/* Race image */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={race.imageUrl}
                      alt={race.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
                    {/* Date badge */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <div className="bg-primary text-dark font-heading font-bold text-center leading-none px-2.5 py-1.5 rounded-lg">
                        <div className="text-lg">{race.dateDay}</div>
                        <div className="text-[10px] uppercase tracking-widest">{race.dateMonth}</div>
                      </div>
                      {race.isFinale && (
                        <span className="bg-accent text-white font-heading font-bold text-xs uppercase tracking-wide px-2 py-1 rounded">
                          Finale
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-dark leading-tight mb-3 group-hover:text-primary transition-colors">
                      {race.name}
                    </h3>
                    <div className="space-y-1.5 text-sm font-body text-gray-500">
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{race.location}</span>
                      </div>
                      {race.startTime && (
                        <div className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Start: {race.startTime}</span>
                        </div>
                      )}
                      {race.distanceKm && (
                        <div className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          <span>{race.distanceKm} km</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-heading font-bold text-xs uppercase tracking-widest text-gray-400">
                      KempenCup 2026
                    </span>
                    <span className="font-heading font-bold text-xs uppercase tracking-widest text-primary group-hover:gap-2 flex items-center gap-1 transition-all">
                      Meer info <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 font-body">
              Geen aankomende wedstrijden meer in 2026.{' '}
              <Link href="/wedstrijden" className="text-primary hover:underline">
                Bekijk het volledige schema
              </Link>
              .
            </p>
          )}

          <div className="mt-6 md:hidden">
            <Link
              href="/wedstrijden"
              className="inline-flex items-center gap-1 text-primary font-heading font-bold text-sm uppercase tracking-wide"
            >
              Alle wedstrijden <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Standings section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start gap-10">
            {/* Left decorative column */}
            <div className="hidden md:flex flex-col items-center">
              <div className="w-1 h-16 bg-primary" />
              <div className="w-1 flex-1 bg-primary/20" />
            </div>

            <div className="flex-1">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-primary flex-shrink-0" />
                <span className="text-primary font-heading font-bold text-sm uppercase tracking-[0.25em]">
                  Seizoen 2026
                </span>
              </div>
              <div className="flex items-end justify-between mb-10">
                <h2 className="font-heading font-bold text-5xl md:text-6xl uppercase tracking-tighter text-dark">
                  Algemeen Klassement
                </h2>
                <Link
                  href="/uitslagen-2026"
                  className="hidden md:inline-flex items-center gap-1 text-primary font-heading font-bold text-sm uppercase tracking-wide hover:text-primary-dark transition-colors"
                >
                  Volledige uitslagen <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>

              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <StandingsTable standings={standings as any} />

              <div className="mt-6 md:hidden">
                <Link
                  href="/uitslagen-2026"
                  className="inline-flex items-center gap-1 text-primary font-heading font-bold text-sm uppercase tracking-wide"
                >
                  Volledige uitslagen <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News section — dark background */}
      <section className="py-20 px-4 bg-dark">
        <div className="max-w-7xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary flex-shrink-0" />
            <span className="text-primary font-heading font-bold text-sm uppercase tracking-[0.25em]">
              Actueel
            </span>
          </div>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-heading font-bold text-5xl md:text-6xl uppercase tracking-tighter">
              <span className="text-white">Laatste </span>
              <span className="gradient-text">Nieuws</span>
            </h2>
            <Link
              href="/nieuws"
              className="hidden md:inline-flex items-center gap-1 text-primary font-heading font-bold text-sm uppercase tracking-wide hover:text-primary-dark transition-colors"
            >
              Alle nieuwsberichten <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {news.map((article: any, i: number) => (
                <div
                  key={article.id}
                  className={`opacity-0 animate-fade-in-up delay-${Math.min((i + 1) * 100, 500)}`}
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/50 font-body">Geen nieuws beschikbaar.</p>
          )}

          <div className="mt-6 md:hidden">
            <Link
              href="/nieuws"
              className="inline-flex items-center gap-1 text-primary font-heading font-bold text-sm uppercase tracking-wide"
            >
              Alle nieuwsberichten <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 px-4 bg-primary text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-4xl md:text-5xl uppercase tracking-tighter text-dark mb-4">
            Meld je aan voor de KempenCup 2026
          </h2>
          <p className="font-body text-dark/70 mb-8 text-lg">
            KNWU-licentiehouders welkom. Seizoen loopt van april t/m september.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-dark text-white font-heading font-bold uppercase tracking-wide text-lg px-10 py-4 hover:bg-dark/80 transition-all hover:-translate-y-0.5"
          >
            Meer informatie
          </Link>
        </div>
      </section>
    </>
  )
}
