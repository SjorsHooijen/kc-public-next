'use client'

import { useState } from 'react'
import StandingsTable from './StandingsTable'
import RaceResultsCard from './RaceResultsCard'

interface RaceResult {
  position:   number
  rugnr:      number | null
  voornaam:   string | null
  tussenaam:  string | null
  achternaam: string | null
  rider_name: string | null   // legacy fallback
  finish_time:string | null
  kc_punten:  number | null
  sprint1:    number | null
  sprint2:    number | null
  totaal:     number | null
  points:     number | null   // legacy fallback
}

interface RaceWithResults {
  race: { id: number; name: string; date: string; location: string; imageUrl: string }
  results: RaceResult[]
}

interface Standing {
  position: number
  voornaam: string | null
  tussenaam: string | null
  achternaam: string | null
  rider_name: string
  total_points: number
  races_entered: number
}

interface Props {
  year: number
  racesWithResults: RaceWithResults[]
  standings: Standing[]
}

function StandingsCard({ standings, year }: { standings: Standing[]; year: number }) {
  const [open, setOpen] = useState(false)
  const top3 = standings.slice(0, 3)

  return (
    <div
      id="standings"
      className={`rounded-2xl border overflow-hidden transition-all duration-300 scroll-mt-28 ${
        open
          ? 'border-primary/40 shadow-xl shadow-primary/10 bg-white'
          : 'border-gray-200 bg-white hover:border-primary/30 hover:shadow-lg'
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left group"
        aria-expanded={open}
      >
        <div className="flex items-stretch">
          {/* Left accent bar */}
          <div className={`w-1.5 flex-shrink-0 transition-colors duration-300 ${open ? 'bg-primary' : 'bg-gray-200 group-hover:bg-primary/60'}`} />

          <div className="flex-1 px-6 py-5 flex items-center gap-4">
            {/* Trophy icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${open ? 'bg-primary text-dark' : 'bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <span className="font-heading font-bold text-2xl uppercase tracking-tight text-dark leading-none">
                  Algemeen Klassement {year}
                </span>
                <span className="text-xs font-heading font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {standings.length} renners
                </span>
              </div>
              {!open && top3.length > 0 && (
                <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                  {top3.map(s => (
                    <span key={s.position} className="flex items-center gap-1.5 text-xs font-body text-gray-500">
                      <span className={`w-4 h-4 rounded-full inline-flex items-center justify-center text-[9px] font-heading font-bold ${
                        s.position === 1 ? 'bg-yellow-400 text-dark' :
                        s.position === 2 ? 'bg-gray-300 text-dark' :
                        'bg-amber-600 text-white'
                      }`}>{s.position}</span>
                      {s.rider_name}
                      <span className="text-primary font-semibold">{s.total_points}ptn</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <svg
              className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-180 text-primary' : 'text-gray-400'}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Body */}
      <div className={`collapsible ${open ? 'is-open' : ''}`}>
        <div>
          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
            <StandingsTable standings={standings} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPageClient({ year, racesWithResults, standings }: Props) {
  const isEmpty = racesWithResults.length === 0 && standings.length === 0

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24">
      {/* Empty state */}
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

      {/* Standings */}
      {standings.length > 0 && (
        <div id="standings" className="mb-10 scroll-mt-28">
          <StandingsCard standings={standings} year={year} />
        </div>
      )}

      {/* Race results cards */}
      {racesWithResults.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary flex-shrink-0" />
            <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.25em]">Per wedstrijd</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {racesWithResults.map(({ race, results }, i) => (
              <RaceResultsCard
                key={race.id}
                raceId={race.id}
                raceName={race.name}
                raceDate={race.date}
                raceLocation={race.location}
                imageUrl={race.imageUrl}
                results={results}
                index={i}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
