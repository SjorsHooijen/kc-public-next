'use client'

import { useState, useMemo } from 'react'

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
  standings: Standing[]
}

type SortKey = 'position' | 'voornaam' | 'achternaam' | 'total_points' | 'races_entered'
type SortDir = 'asc' | 'desc'

function getDisplayName(s: Standing): string {
  if (s.voornaam || s.achternaam) {
    return [s.voornaam, s.tussenaam, s.achternaam].filter(Boolean).join(' ')
  }
  return s.rider_name
}

function PositionBadge({ pos }: { pos: number }) {
  const base = 'w-8 h-8 rounded-full font-heading font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm'
  if (pos === 1) return <span className={`${base} bg-gradient-to-br from-yellow-300 to-yellow-500 text-dark`}>1</span>
  if (pos === 2) return <span className={`${base} bg-gradient-to-br from-gray-200 to-gray-400 text-dark`}>2</span>
  if (pos === 3) return <span className={`${base} bg-gradient-to-br from-amber-500 to-amber-700 text-white`}>3</span>
  return <span className="w-8 h-8 flex items-center justify-center font-body text-sm text-gray-400 flex-shrink-0 tabular-nums">{pos}</span>
}

function SortIcon({ isActive, direction }: { isActive: boolean; direction?: SortDir }) {
  if (!isActive) {
    return <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" /></svg>
  }
  return (
    <svg className={`w-3.5 h-3.5 text-primary transition-transform ${direction === 'desc' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 16l4-4 4 4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export default function StandingsTable({ standings }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('position')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return standings

    const term = searchTerm.toLowerCase()
    return standings.filter(s => {
      const name = getDisplayName(s).toLowerCase()
      const voornaam = (s.voornaam ?? '').toLowerCase()
      const achternaam = (s.achternaam ?? '').toLowerCase()
      return name.includes(term) || voornaam.includes(term) || achternaam.includes(term)
    })
  }, [standings, searchTerm])

  const sorted = useMemo(() => {
    const copy = [...filtered]
    copy.sort((a, b) => {
      let aVal: any = a[sortKey]
      let bVal: any = b[sortKey]

      if (sortKey === 'voornaam' || sortKey === 'achternaam') {
        aVal = sortKey === 'voornaam' ? (a.voornaam ?? '') : (a.achternaam ?? '')
        bVal = sortKey === 'voornaam' ? (b.voornaam ?? '') : (b.achternaam ?? '')
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return copy
  }, [filtered, sortKey, sortDir])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Zoeken op naam..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-body text-sm"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr className="bg-dark text-white">
              <th
                onClick={() => toggleSort('position')}
                className="font-heading font-bold text-xs uppercase tracking-widest px-3 sm:px-4 py-3 text-left w-16 cursor-pointer hover:bg-dark/80 transition-colors rounded-tl-xl"
              >
                <div className="flex items-center gap-2">
                  Uitslag
                  <SortIcon isActive={sortKey === 'position'} direction={sortKey === 'position' ? sortDir : undefined} />
                </div>
              </th>
              <th
                onClick={() => toggleSort('voornaam')}
                className="font-heading font-bold text-xs uppercase tracking-widest px-3 sm:px-4 py-3 text-left cursor-pointer hover:bg-dark/80 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Naam
                  <SortIcon isActive={sortKey === 'voornaam'} direction={sortKey === 'voornaam' ? sortDir : undefined} />
                </div>
              </th>
              <th
                onClick={() => toggleSort('total_points')}
                className="font-heading font-bold text-xs uppercase tracking-widest px-3 sm:px-4 py-3 text-right cursor-pointer hover:bg-dark/80 transition-colors text-primary"
              >
                <div className="flex items-center justify-end gap-2">
                  Punten
                  <SortIcon isActive={sortKey === 'total_points'} direction={sortKey === 'total_points' ? sortDir : undefined} />
                </div>
              </th>
              <th
                onClick={() => toggleSort('races_entered')}
                className="font-heading font-bold text-xs uppercase tracking-widest px-3 sm:px-4 py-3 text-right cursor-pointer hover:bg-dark/80 transition-colors rounded-tr-xl hidden sm:table-cell"
              >
                <div className="flex items-center justify-end gap-2">
                  Wedstrijden
                  <SortIcon isActive={sortKey === 'races_entered'} direction={sortKey === 'races_entered' ? sortDir : undefined} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 sm:px-4 py-8 text-center text-gray-400 font-body">
                  {standings.length === 0 ? 'Geen klassement beschikbaar.' : 'Geen resultaten gevonden.'}
                </td>
              </tr>
            ) : (
              sorted.map((s) => (
                <tr key={`${s.position}-${s.rider_name}`} className={`transition-colors hover:bg-primary/5 ${s.position % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}>
                  <td className="px-3 sm:px-4 py-3">
                    <PositionBadge pos={s.position} />
                  </td>
                  <td className={`px-3 sm:px-4 py-3 font-body ${s.position <= 3 ? 'font-semibold text-dark' : 'text-gray-700'}`}>
                    {getDisplayName(s)}
                  </td>
                  <td className={`px-3 sm:px-4 py-3 font-heading font-bold text-right tabular-nums ${s.position <= 3 ? 'text-primary' : 'text-gray-600'}`}>
                    {s.total_points}
                  </td>
                  <td className="px-3 sm:px-4 py-3 font-body text-gray-400 text-right tabular-nums hidden sm:table-cell">
                    {s.races_entered}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Results info */}
      <p className="text-xs text-gray-500 text-center">
        {sorted.length === filtered.length
          ? `${sorted.length} renner${sorted.length !== 1 ? 's' : ''}`
          : `${sorted.length} van ${filtered.length} renner${filtered.length !== 1 ? 's' : ''}`}
      </p>
    </div>
  )
}
