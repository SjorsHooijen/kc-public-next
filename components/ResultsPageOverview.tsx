'use client'

import Image from 'next/image'
import Link from 'next/link'

interface Race {
  id: number
  name: string
  date: string
  location: string
  imageUrl: string
}

interface Props {
  year: number
  races: Race[]
  hasStandings: boolean
  racesCount: number
}

function formatFullDate(dateStr: string): string {
  const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
  const d = new Date(dateStr)
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

export default function ResultsPageOverview({
  year,
  races,
  hasStandings,
  racesCount,
}: Props) {
  const isEmpty = racesCount === 0 && !hasStandings

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24">
      {isEmpty && (
        <div className="text-center py-28 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="font-heading font-bold text-3xl uppercase tracking-tight text-dark mb-2">Geen uitslagen</p>
          <p className="font-body text-gray-400">Geen uitslagen beschikbaar voor dit seizoen.</p>
        </div>
      )}

      {/* Standings link */}
      {hasStandings && (
        <div className="mb-12">
          <Link
            href={`/klassement-${year}`}
            className="block rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <div className="px-6 py-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary text-dark flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-dark group-hover:text-primary transition-colors">
                    Algemeen Klassement {year}
                  </h3>
                  <p className="font-body text-sm text-gray-600 mt-1">
                    Bekijk het volledige klassement
                  </p>
                </div>
              </div>
              <svg className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      )}

      {/* Race results cards */}
      {races.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary flex-shrink-0" />
            <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.25em]">Per wedstrijd</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {races.map(({ id, name, date, location, imageUrl }, i) => (
              <Link
                key={id}
                href={`/uitslagen/${year}/${id}`}
                className={`group rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white opacity-0 animate-fade-in-up delay-${Math.min((i + 1) * 100, 500)}`}
              >
                {/* Card header with image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
                  {/* Race number badge */}
                  <div className="absolute top-3 left-4">
                    <span className="inline-block bg-primary text-dark font-heading font-bold text-xs uppercase tracking-widest px-2.5 py-1 rounded-lg">
                      Uitslag
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-dark leading-tight mb-3 group-hover:text-primary transition-colors">
                    {name}
                  </h3>
                  <div className="space-y-2 text-sm font-body text-gray-500">
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatFullDate(date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{location}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="font-heading font-bold text-xs uppercase tracking-widest text-gray-400">
                    KempenCup {year}
                  </span>
                  <span className="font-heading font-bold text-xs uppercase tracking-widest text-primary group-hover:gap-2 flex items-center gap-1 transition-all">
                    Bekijk <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
