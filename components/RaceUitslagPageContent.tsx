import { unstable_noStore as noStore } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'
import { ALL_RACES } from '@/lib/calendar'
import IMAGES from '@/config/images'

interface RaceResult {
  position: number
  rugnr: number | null
  voornaam: string | null
  tussenaam: string | null
  achternaam: string | null
  rider_name: string | null
  finish_time: string | null
  points: number | null
  sprint1: number | null
  sprint2: number | null
  total_points: number | null
}

interface Props {
  year: number
  raceId: number
}

async function getRaceResults(raceId: number, year: number) {
  noStore()
  try {
    const sql = (await import('@/lib/db')).default

    // First get race info from races table if it exists, or create from results data
    const raceInfo = await sql`
      SELECT
        ${raceId}::int as id,
        COALESCE(r.name, '') as name,
        COALESCE(r.date::text, '') as date,
        COALESCE(r.location, '') as location
      FROM races r
      WHERE r.id = ${raceId}
      UNION ALL
      SELECT
        ${raceId}::int as id,
        '' as name,
        '' as date,
        '' as location
      WHERE NOT EXISTS (SELECT 1 FROM races WHERE id = ${raceId})
      LIMIT 1
    `

    const race = raceInfo[0] || {
      id: raceId,
      name: '',
      date: '',
      location: ''
    }

    const results = await sql`
      SELECT
        position, rider_name, points, sprint1, sprint2, total_points
      FROM results
      WHERE race_id = ${raceId} AND season = ${year}
      ORDER BY position ASC
    `

    if (results.length === 0) {
      return { race: null, results: [] }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedResults = results.map((r: any) => {
      const nameParts = (r.rider_name as string ?? '').split(' ').filter((p: string) => p.trim())
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
        rugnr: null,
        voornaam: voornaam,
        tussenaam: tussenaam,
        achternaam: achternaam,
        rider_name: (r.rider_name as string | null) ?? null,
        finish_time: null,
        points: (r.points as number | null) ?? null,
        sprint1: (r.sprint1 as number | null) ?? null,
        sprint2: (r.sprint2 as number | null) ?? null,
        total_points: (r.total_points as number | null) ?? null,
      }
    })

    return { race, results: parsedResults }
  } catch (error) {
    console.error('Error fetching race results:', error)
    return { race: null, results: [] }
  }
}

function formatFullDate(dateStr: string): string {
  const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
  const d = new Date(dateStr)
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

function PositionBadge({ pos }: { pos: number }) {
  const base = 'w-8 h-8 rounded-full font-heading font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm'
  if (pos === 99) return <span className="px-2 h-6 inline-flex items-center justify-center rounded-md font-heading font-bold text-xs uppercase tracking-wide text-gray-400 bg-gray-100 flex-shrink-0">DNF</span>
  if (pos === 1) return <span className={`${base} bg-gradient-to-br from-yellow-300 to-yellow-500 text-dark`}>1</span>
  if (pos === 2) return <span className={`${base} bg-gradient-to-br from-gray-200 to-gray-400 text-dark`}>2</span>
  if (pos === 3) return <span className={`${base} bg-gradient-to-br from-amber-500 to-amber-700 text-white`}>3</span>
  return <span className="w-8 h-8 flex items-center justify-center font-body text-sm text-gray-400 flex-shrink-0 tabular-nums">{pos}</span>
}

export default async function RaceUitslagPageContent({ year, raceId }: Props) {
  const { race, results } = await getRaceResults(raceId, year)

  if (!race) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="font-heading font-bold text-3xl uppercase tracking-tight text-dark mb-2">Wedstrijd niet gevonden</p>
          <p className="font-body text-gray-400">De wedstrijd die je zoekt bestaat niet of heeft geen uitslagen.</p>
          <Link href={`/uitslagen-${year}`} className="mt-6 inline-flex items-center gap-1 text-primary font-heading font-bold text-sm uppercase tracking-wide hover:text-primary-dark transition-colors">
            Terug naar uitslagen <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    )
  }

  const calendarMatch = ALL_RACES.find(r =>
    (race.name as string).toLowerCase().includes(r.shortName.toLowerCase())
  )
  const imageUrl = calendarMatch?.imageUrl ?? IMAGES.general.actie1

  return (
    <>
      {/* Hero with race image */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={imageUrl}
          alt={race.name}
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/50 to-dark/10" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="max-w-4xl mx-auto w-full relative z-10">
            <Link href={`/uitslagen-${year}`} className="inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors mb-6 font-body text-sm">
              <span aria-hidden="true">&larr;</span> Terug naar uitslagen
            </Link>
            <h1
              className="font-heading font-bold uppercase tracking-tighter leading-none mb-4"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
            >
              <span className="text-white">{race.name}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatFullDate(race.date as string)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{race.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {results.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="font-heading font-bold text-3xl uppercase tracking-tight text-dark mb-2">Geen uitslagen</p>
            <p className="font-body text-gray-400">Geen uitslagen beschikbaar voor deze wedstrijd.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="p-6">
              <h2 className="font-heading font-bold text-2xl uppercase tracking-tight text-dark mb-6">
                Uitslagen
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-dark text-white">
                      <th className="font-heading font-bold text-xs uppercase tracking-widest px-3 sm:px-4 py-3 text-center w-12 rounded-tl-xl">Uitslag</th>
                      <th className="font-heading font-bold text-xs uppercase tracking-widest px-3 sm:px-4 py-3 text-left">Naam</th>
                      <th className="font-heading font-bold text-xs uppercase tracking-widest px-3 sm:px-4 py-3 text-right text-primary">KC Punten</th>
                      <th className="font-heading font-bold text-xs uppercase tracking-widest px-3 sm:px-4 py-3 text-right hidden sm:table-cell">Sprint 1</th>
                      <th className="font-heading font-bold text-xs uppercase tracking-widest px-3 sm:px-4 py-3 text-right hidden md:table-cell">Sprint 2</th>
                      <th className="font-heading font-bold text-xs uppercase tracking-widest px-3 sm:px-4 py-3 text-right hidden lg:table-cell">Totaal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => {
                      const fullName = [r.voornaam, r.tussenaam, r.achternaam].filter(Boolean).join(' ') || r.rider_name || '—'
                      return (
                        <tr key={r.position} className={`transition-colors hover:bg-primary/5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}>
                          <td className="px-3 sm:px-4 py-3 text-center">
                            <PositionBadge pos={r.position} />
                          </td>
                          <td className={`px-3 sm:px-4 py-3 font-body ${r.position <= 3 ? 'font-semibold text-dark' : 'text-gray-700'}`}>
                            {fullName}
                          </td>
                          <td className={`px-3 sm:px-4 py-3 font-heading font-bold text-right tabular-nums ${r.position <= 3 ? 'text-primary' : 'text-gray-600'}`}>
                            {r.points ?? '—'}
                          </td>
                          <td className="px-3 sm:px-4 py-3 font-body text-gray-500 text-right tabular-nums hidden sm:table-cell">
                            {r.sprint1 ?? '—'}
                          </td>
                          <td className="px-3 sm:px-4 py-3 font-body text-gray-500 text-right tabular-nums hidden md:table-cell">
                            {r.sprint2 ?? '—'}
                          </td>
                          <td className={`px-3 sm:px-4 py-3 font-heading font-bold text-right tabular-nums hidden lg:table-cell ${r.position <= 3 ? 'text-primary' : 'text-gray-600'}`}>
                            {r.total_points ?? '—'}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
