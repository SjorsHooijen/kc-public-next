import SeasonNav from '@/components/SeasonNav'
import ResultsPageClient from '@/components/ResultsPageClient'
import { ALL_RACES } from '@/lib/calendar'
import IMAGES from '@/config/images'

interface Props {
  year: number
}

async function getResultsByRace(year: number) {
  try {
    const sql = (await import('@/lib/db')).default
    // Query off results.season so we find data even when the races table
    // season column doesn't perfectly match.
    const races = await sql`
      SELECT
        res.race_id                           AS id,
        COALESCE(r.name, '')                  AS name,
        COALESCE(r.date::text, '')            AS date,
        COALESCE(r.location, '')              AS location
      FROM results res
      LEFT JOIN races r ON r.id = res.race_id
      WHERE res.season = ${year}
      GROUP BY res.race_id, r.name, r.date, r.location
      ORDER BY MIN(r.date) ASC NULLS LAST
    `
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const racesWithResults = await Promise.all(
      races.map(async (race: any) => {
        const results = await sql`
          SELECT
            position, rugnr,
            voornaam, tussenaam, achternaam, rider_name,
            finish_time,
            kc_punten, sprint1, sprint2, totaal, points
          FROM results
          WHERE race_id = ${race.id} AND season = ${year}
          ORDER BY position ASC
        `
        const calendarMatch = ALL_RACES.find(r =>
          (race.name as string).toLowerCase().includes(r.shortName.toLowerCase())
        )
        const imageUrl = calendarMatch?.imageUrl ?? IMAGES.general.actie1

        return {
          race: {
            id: race.id as number,
            name: race.name as string,
            date: String(race.date),
            location: race.location as string,
            imageUrl,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          results: results.map((r: any) => ({
            position:   r.position as number,
            rugnr:      (r.rugnr   as number  | null) ?? null,
            voornaam:   (r.voornaam  as string | null) ?? null,
            tussenaam:  (r.tussenaam as string | null) ?? null,
            achternaam: (r.achternaam as string | null) ?? null,
            rider_name: (r.rider_name as string | null) ?? null,
            finish_time:(r.finish_time as string | null) ?? null,
            kc_punten:  (r.kc_punten as number | null) ?? null,
            sprint1:    (r.sprint1   as number | null) ?? null,
            sprint2:    (r.sprint2   as number | null) ?? null,
            totaal:     (r.totaal    as number | null) ?? null,
            points:     (r.points    as number | null) ?? null,
          })),
        }
      })
    )
    return racesWithResults
  } catch {
    return []
  }
}

async function getStandings(year: number) {
  try {
    const sql = (await import('@/lib/db')).default
    const rows = await sql`
      SELECT position, rider_name, total_points, races_entered
      FROM standings
      WHERE season = ${year}
      ORDER BY position ASC
    `
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rows.map((r: any) => ({
      position: r.position as number,
      rider_name: r.rider_name as string,
      total_points: r.total_points as number,
      races_entered: r.races_entered as number,
    }))
  } catch {
    return []
  }
}

export default async function ResultsPageContent({ year }: Props) {
  const [racesWithResults, standings] = await Promise.all([
    getResultsByRace(year),
    getStandings(year),
  ])

  return (
    <>
      {/* Page hero */}
      <section
        className="relative bg-dark py-28 px-6 overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(139,201,58,0.3) 40px, rgba(139,201,58,0.3) 41px)',
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10 pt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary flex-shrink-0" />
            <span className="text-primary font-heading font-bold text-sm uppercase tracking-[0.25em]">
              Uitslagen
            </span>
          </div>
          <h1
            className="font-heading font-bold uppercase tracking-tighter leading-none mb-2"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            <span className="text-white">SEIZOEN </span>
            <span className="gradient-text">{year}</span>
          </h1>
          <p className="font-body text-white/50 text-sm mt-4">
            {racesWithResults.length > 0
              ? `${racesWithResults.length} wedstrijd${racesWithResults.length !== 1 ? 'en' : ''} met uitslagen`
              : 'Nog geen uitslagen beschikbaar'}
          </p>
        </div>
      </section>

      {/* Season nav + interactive cards */}
      <div className="max-w-4xl mx-auto px-4 pt-10 mb-6">
        <SeasonNav currentYear={year} />
      </div>

      <ResultsPageClient
        year={year}
        racesWithResults={racesWithResults}
        standings={standings}
      />
    </>
  )
}
