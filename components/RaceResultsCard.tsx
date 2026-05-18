'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface RaceResult {
  position: number
  rugnr: number | null
  voornaam: string | null
  tussenaam: string | null
  achternaam: string | null
  rider_name: string | null
  finish_time: string | null
  kc_punten: number | null
  sprint1: number | null
  sprint2: number | null
  totaal: number | null
  points: number | null
}

interface Props {
  raceId: number
  raceName: string
  raceDate: string
  raceLocation: string
  imageUrl: string
  results: RaceResult[]
  index: number
}

function formatFullDate(dateStr: string): string {
  const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
  const d = new Date(dateStr)
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

function fullName(r: RaceResult): string {
  if (r.voornaam || r.achternaam) {
    return [r.voornaam, r.tussenaam, r.achternaam].filter(Boolean).join(' ')
  }
  return r.rider_name ?? ''
}

function PositionBadge({ pos }: { pos: number }) {
  const base = 'w-8 h-8 rounded-full font-heading font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm'
  if (pos === 1) return <span className={`${base} bg-gradient-to-br from-yellow-300 to-yellow-500 text-dark`}>1</span>
  if (pos === 2) return <span className={`${base} bg-gradient-to-br from-gray-200 to-gray-400 text-dark`}>2</span>
  if (pos === 3) return <span className={`${base} bg-gradient-to-br from-amber-500 to-amber-700 text-white`}>3</span>
  return <span className="w-8 h-8 flex items-center justify-center font-body text-sm text-gray-400 flex-shrink-0 tabular-nums">{pos}</span>
}

export default function RaceResultsCard({
  raceId,
  raceName,
  raceDate,
  raceLocation,
  imageUrl,
  results,
  index,
}: Props) {
  const [expanded, setExpanded] = useState(false)
  const winner = results.find(r => r.position === 1)
  const second = results.find(r => r.position === 2)
  const third = results.find(r => r.position === 3)
  const top3 = [winner, second, third].filter(Boolean) as RaceResult[]

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-300 scroll-mt-28 ${
        expanded
          ? 'border-0 shadow-xl shadow-primary/20 bg-white'
          : 'border border-gray-200 bg-white hover:border-primary/30 hover:shadow-lg'
      }`}
    >
      {/* Header with background image */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left group relative h-48 overflow-hidden focus:outline-none"
        aria-expanded={expanded}
      >
        {/* Background image */}
        <Image
          src={imageUrl}
          alt={raceName}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/50 to-dark/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-dark/30" />

        {/* Green accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
          <div className="flex flex-col justify-between h-full">
            {/* Top section - race label */}
            <div className="flex items-start justify-between">
              <span className="font-heading font-bold text-xs uppercase tracking-widest px-2.5 py-1 rounded bg-primary/20 text-primary border border-primary/30">
                Race {index + 1}
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  expanded ? 'rotate-180 text-primary' : 'text-white/60'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Bottom section - race info */}
            <div>
              <h3 className="font-heading font-bold text-2xl uppercase tracking-tight text-white leading-tight mb-2">
                {raceName}
              </h3>
              <div className="flex items-center gap-2 text-xs text-white/70 mb-3">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatFullDate(raceDate)}</span>
              </div>
              {!expanded && top3.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap">
                  {top3.map(r => (
                    <span key={r.position} className="flex items-center gap-1.5 text-xs font-body text-white/80">
                      <PositionBadge pos={r.position} />
                      <span className={r.position === 1 ? 'font-semibold text-white' : 'text-white/70'}>
                        {fullName(r)}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded body */}
      <div className={`collapsible ${expanded ? 'is-open' : ''}`}>
        <div>
          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
            {results.length === 0 ? (
              <p className="font-body text-gray-400 text-center py-8">Geen resultaten beschikbaar.</p>
            ) : (
              <div className="space-y-4">
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-sm border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-dark text-white">
                        <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-center w-12 rounded-tl-xl">Uitslag</th>
                        <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-center w-16">Rugnr.</th>
                        <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-left">Voornaam</th>
                        <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-left">Tussenaam</th>
                        <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-left">Achternaam</th>
                        <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-right text-primary">KC Punten</th>
                        <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-right">Sprint 1</th>
                        <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-right">Sprint 2</th>
                        <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-right rounded-tr-xl">Totaal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, i) => (
                        <tr key={r.position} className={`transition-colors hover:bg-primary/5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}>
                          <td className="px-4 py-3 text-center">
                            <PositionBadge pos={r.position} />
                          </td>
                          <td className="px-4 py-3 font-body text-gray-500 text-center tabular-nums">
                            {r.rugnr ?? '—'}
                          </td>
                          <td className={`px-4 py-3 font-body ${r.position <= 3 ? 'font-semibold text-dark' : 'text-gray-700'}`}>
                            {r.voornaam ?? '—'}
                          </td>
                          <td className={`px-4 py-3 font-body ${r.position <= 3 ? 'font-semibold text-dark' : 'text-gray-700'}`}>
                            {r.tussenaam ?? '—'}
                          </td>
                          <td className={`px-4 py-3 font-body ${r.position <= 3 ? 'font-semibold text-dark' : 'text-gray-700'}`}>
                            {r.achternaam ?? '—'}
                          </td>
                          <td className={`px-4 py-3 font-heading font-bold text-right tabular-nums ${r.position <= 3 ? 'text-primary' : 'text-gray-600'}`}>
                            {r.kc_punten ?? r.points ?? '—'}
                          </td>
                          <td className="px-4 py-3 font-body text-gray-500 text-right tabular-nums">
                            {r.sprint1 ?? '—'}
                          </td>
                          <td className="px-4 py-3 font-body text-gray-500 text-right tabular-nums">
                            {r.sprint2 ?? '—'}
                          </td>
                          <td className={`px-4 py-3 font-heading font-bold text-right tabular-nums ${r.position <= 3 ? 'text-primary' : 'text-gray-600'}`}>
                            {r.totaal ?? r.points ?? '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
