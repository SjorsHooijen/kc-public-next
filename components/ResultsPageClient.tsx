'use client'

import { useState, useCallback, useRef } from 'react'
import Image from 'next/image'

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

function fullName(r: RaceResult): string {
  if (r.voornaam || r.achternaam) {
    return [r.voornaam, r.tussenaam, r.achternaam].filter(Boolean).join(' ')
  }
  return r.rider_name ?? ''
}

function displayPoints(r: RaceResult): number | null {
  return r.totaal ?? r.points
}

interface RaceWithResults {
  race: { id: number; name: string; date: string; location: string; imageUrl: string }
  results: RaceResult[]
}

interface Standing {
  position: number
  rider_name: string
  total_points: number
  races_entered: number
}

interface Props {
  year: number
  racesWithResults: RaceWithResults[]
  standings: Standing[]
}

function formatShortDate(dateStr: string): string {
  const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
  const d = new Date(dateStr)
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

function formatFullDate(dateStr: string): string {
  const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
  const d = new Date(dateStr)
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

function PositionBadge({ pos }: { pos: number }) {
  const base = 'w-8 h-8 rounded-full font-heading font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm'
  if (pos === 1) return <span className={`${base} bg-gradient-to-br from-yellow-300 to-yellow-500 text-dark`}>1</span>
  if (pos === 2) return <span className={`${base} bg-gradient-to-br from-gray-200 to-gray-400 text-dark`}>2</span>
  if (pos === 3) return <span className={`${base} bg-gradient-to-br from-amber-500 to-amber-700 text-white`}>3</span>
  return <span className="w-8 h-8 flex items-center justify-center font-body text-sm text-gray-400 flex-shrink-0 tabular-nums">{pos}</span>
}

// ── Standings collapsible (full-width) ─────────────────────────────────────

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
            {standings.length === 0 ? (
              <p className="font-body text-gray-400 text-center py-8">Geen klassement beschikbaar.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-dark text-white">
                      <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-left rounded-tl-xl w-14">#</th>
                      <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-left">Naam</th>
                      <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-right text-primary">Punten</th>
                      <th className="font-heading font-bold text-xs uppercase tracking-widest px-4 py-3 text-right rounded-tr-xl">Wedstrijden</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((s, i) => (
                      <tr key={s.position} className={`transition-colors hover:bg-primary/5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}>
                        <td className="px-4 py-3"><PositionBadge pos={s.position} /></td>
                        <td className={`px-4 py-3 font-body ${s.position <= 3 ? 'font-semibold text-dark' : 'text-gray-700'}`}>{s.rider_name}</td>
                        <td className={`px-4 py-3 font-heading font-bold text-right tabular-nums ${s.position <= 3 ? 'text-primary' : 'text-gray-600'}`}>{s.total_points}</td>
                        <td className="px-4 py-3 font-body text-gray-400 text-right tabular-nums">{s.races_entered}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Race summary card (image-backed, 3-col grid) ───────────────────────────

function RaceSummaryCard({
  index, race, results, isActive, onClick,
}: {
  index: number
  race: RaceWithResults['race']
  results: RaceResult[]
  isActive: boolean
  onClick: () => void
}) {
  const winner = results.find(r => r.position === 1)
  const second = results.find(r => r.position === 2)
  const third  = results.find(r => r.position === 3)
  const top3   = [winner, second, third].filter(Boolean) as RaceResult[]

  return (
    <button
      onClick={onClick}
      className={`group relative w-full text-left rounded-2xl overflow-hidden h-72 border block transition-all duration-300 focus:outline-none ${
        isActive
          ? 'border-primary ring-2 ring-primary/20 shadow-xl shadow-primary/15 scale-[1.02]'
          : 'border-white/10 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1'
      }`}
      aria-pressed={isActive}
    >
      {/* Background image */}
      <Image
        src={race.imageUrl}
        alt={race.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/60 to-dark/20" />
      {isActive && <div className="absolute inset-0 bg-primary/10" />}

      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-300 ${isActive ? 'bg-primary' : 'bg-white/10 group-hover:bg-primary/60'}`} />

      {/* Round badge */}
      <span className={`absolute top-4 right-4 font-heading font-bold text-xs uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm transition-colors ${isActive ? 'bg-primary text-dark' : 'bg-white/10 text-white/60'}`}>
        R{index + 1}
      </span>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
        {/* Race info */}
        <p className={`font-heading font-bold text-xs uppercase tracking-[0.2em] mb-1.5 transition-colors ${isActive ? 'text-primary' : 'text-white/50'}`}>
          {formatShortDate(race.date)} · {race.location}
        </p>
        <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-white leading-tight mb-3">
          {race.name}
        </h3>

        {/* Top-3 results */}
        {top3.length > 0 ? (
          <div className="space-y-1.5 mb-3">
            {top3.map((r) => (
              <div key={r.position} className="flex items-center gap-2">
                <PositionBadge pos={r.position} />
                <span className={`font-body text-sm flex-1 truncate ${r.position === 1 ? 'font-semibold text-white' : 'text-white/70'}`}>
                  {fullName(r)}
                </span>
                <span className={`font-heading font-bold text-xs tabular-nums flex-shrink-0 ${r.position === 1 ? 'text-primary' : 'text-white/40'}`}>
                  {displayPoints(r) != null ? `${displayPoints(r)}ptn` : '—'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-xs text-white/40 italic mb-3">Geen resultaten</p>
        )}

        {/* Footer */}
        <div className={`pt-3 border-t flex items-center justify-between transition-colors ${isActive ? 'border-primary/30' : 'border-white/10'}`}>
          <span className="font-heading font-bold text-xs uppercase tracking-widest text-white/40">
            {results.length} renners
          </span>
          <span className={`font-heading font-bold text-xs uppercase tracking-widest flex items-center gap-1 transition-all ${isActive ? 'text-primary' : 'text-white/50 group-hover:text-primary group-hover:gap-2'}`}>
            {isActive ? 'Sluiten' : 'Volledige uitslag'}
            <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  )
}

// ── Detail panel (full-width, below grid) ──────────────────────────────────

function DetailPanel({ raceWithResults, onClose }: { raceWithResults: RaceWithResults; onClose: () => void }) {
  const { race, results } = raceWithResults
  const podium = ([1, 2, 3] as const).map(p => results.find(r => r.position === p)).filter(Boolean) as RaceResult[]

  return (
    <div className="animate-fade-in-up rounded-2xl border border-primary/30 bg-white overflow-hidden shadow-2xl shadow-primary/10">
      {/* Panel header */}
      <div className="bg-dark px-6 py-5 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-xs uppercase tracking-[0.25em] text-primary mb-1">{formatFullDate(race.date)} · {race.location}</p>
          <h3 className="font-heading font-bold text-3xl uppercase tracking-tight text-white leading-none">{race.name}</h3>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-dark text-white flex items-center justify-center flex-shrink-0 transition-colors duration-200"
          aria-label="Sluiten"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6">
        {/* Podium strip */}
        {podium.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {podium.map(r => (
              <div
                key={r.position}
                className={`rounded-xl p-4 text-center border-2 relative overflow-hidden ${
                  r.position === 1
                    ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300'
                    : r.position === 2
                    ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300'
                    : 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300'
                }`}
              >
                {r.position === 1 && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300" />
                )}
                <div className="flex justify-center mb-2">
                  <PositionBadge pos={r.position} />
                </div>
                <p className="font-body font-semibold text-sm text-dark leading-tight">{fullName(r)}</p>
                {r.finish_time && <p className="font-body text-xs text-gray-500 mt-0.5">{r.finish_time}</p>}
                <p className="font-heading font-bold text-lg text-primary mt-1">
                  {displayPoints(r) != null ? displayPoints(r) : '—'}
                  <span className="text-xs font-body text-gray-400 font-normal"> ptn</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Full 9-column results table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="text-sm border-separate border-spacing-0" style={{ minWidth: '800px', width: '100%' }}>
            <thead>
              <tr className="bg-dark text-white">
                <th className="font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-3.5 text-center rounded-tl-xl w-14">Uitslag</th>
                <th className="font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-3.5 text-center w-16">Rugnr.</th>
                <th className="font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-3.5 text-left">Voornaam</th>
                <th className="font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-3.5 text-left">Tussenaam</th>
                <th className="font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-3.5 text-left">Achternaam</th>
                <th className="font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-3.5 text-right text-primary">KC Punten</th>
                <th className="font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-3.5 text-right">Sprint 1</th>
                <th className="font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-3.5 text-right">Sprint 2</th>
                <th className="font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-3.5 text-right text-primary rounded-tr-xl">Totaal</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => {
                const isTop3 = i < 3
                return (
                  <tr
                    key={r.position}
                    className={`transition-colors hover:bg-primary/5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'} ${isTop3 ? 'border-l-[3px] border-primary' : ''}`}
                  >
                    <td className="px-3 py-3 text-center"><PositionBadge pos={r.position} /></td>
                    <td className="px-3 py-3 text-center font-body text-sm text-gray-500 tabular-nums">
                      {r.rugnr ?? '—'}
                    </td>
                    <td className={`px-3 py-3 font-body text-sm ${isTop3 ? 'font-semibold text-dark' : 'text-gray-700'}`}>
                      {r.voornaam ?? (r.rider_name ? r.rider_name.split(' ')[0] : '—')}
                    </td>
                    <td className="px-3 py-3 font-body text-sm text-gray-400">
                      {r.tussenaam ?? ''}
                    </td>
                    <td className={`px-3 py-3 font-body text-sm ${isTop3 ? 'font-semibold text-dark' : 'text-gray-700'}`}>
                      {r.achternaam ?? (r.rider_name ? r.rider_name.split(' ').slice(1).join(' ') : '—')}
                    </td>
                    <td className={`px-3 py-3 font-heading font-bold text-right tabular-nums ${isTop3 ? 'text-primary' : 'text-gray-500'}`}>
                      {r.kc_punten ?? r.points ?? '—'}
                    </td>
                    <td className="px-3 py-3 font-body text-sm text-right tabular-nums text-gray-400">
                      {r.sprint1 != null ? r.sprint1 : <span className="text-gray-200">—</span>}
                    </td>
                    <td className="px-3 py-3 font-body text-sm text-right tabular-nums text-gray-400">
                      {r.sprint2 != null ? r.sprint2 : <span className="text-gray-200">—</span>}
                    </td>
                    <td className={`px-3 py-3 font-heading font-bold text-right tabular-nums ${isTop3 ? 'text-primary' : 'text-gray-600'}`}>
                      {r.totaal ?? r.points ?? '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Root ───────────────────────────────────────────────────────────────────

export default function ResultsPageClient({ year, racesWithResults, standings }: Props) {
  const [activeRaceId, setActiveRaceId] = useState<number | null>(null)
  const [standingsNavOpen, setStandingsNavOpen] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)

  const selectRace = useCallback((id: number) => {
    setActiveRaceId(prev => {
      if (prev === id) return null
      // Scroll to detail panel after state update
      setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
      return id
    })
  }, [])

  const activeRace = racesWithResults.find(r => r.race.id === activeRaceId) ?? null
  const isEmpty = racesWithResults.length === 0 && standings.length === 0

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24">
      {/* ── Sticky quick-jump nav ── */}
      <div className="sticky top-16 z-30 mb-8 -mx-4 px-4 pt-2">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm px-4 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {standings.length > 0 && (
            <a
              href="#standings"
              onClick={() => setStandingsNavOpen(true)}
              className="flex-shrink-0 text-xs font-heading font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full transition-all bg-primary/10 text-primary hover:bg-primary hover:text-dark"
            >
              Klassement
            </a>
          )}
          <div className="w-px h-4 bg-gray-200 flex-shrink-0" />
          {racesWithResults.map(({ race }, i) => (
            <button
              key={race.id}
              onClick={() => selectRace(race.id)}
              className={`flex-shrink-0 text-xs font-heading font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full transition-all ${
                activeRaceId === race.id
                  ? 'bg-primary text-dark shadow-sm'
                  : 'bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              R{i + 1}
            </button>
          ))}
          {activeRaceId !== null && (
            <button
              onClick={() => setActiveRaceId(null)}
              className="ml-auto flex-shrink-0 text-xs font-body text-gray-400 hover:text-primary transition-colors whitespace-nowrap pl-3 border-l border-gray-200"
            >
              Sluiten ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Empty state ── */}
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

      {/* ── Standings ── */}
      {standings.length > 0 && (
        <div id="standings" className="mb-10 scroll-mt-28">
          <StandingsCard standings={standings} year={year} />
        </div>
      )}

      {/* ── Race grid ── */}
      {racesWithResults.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary flex-shrink-0" />
            <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.25em]">Per wedstrijd</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {racesWithResults.map(({ race, results }, i) => (
              <RaceSummaryCard
                key={race.id}
                index={i}
                race={race}
                results={results}
                isActive={activeRaceId === race.id}
                onClick={() => selectRace(race.id)}
              />
            ))}
          </div>

          {/* ── Detail panel ── */}
          <div ref={detailRef}>
            {activeRace && (
              <DetailPanel
                key={activeRace.race.id}
                raceWithResults={activeRace}
                onClose={() => setActiveRaceId(null)}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
