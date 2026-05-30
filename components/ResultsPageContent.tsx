import { unstable_noStore as noStore } from 'next/cache'
import SeasonNav from '@/components/SeasonNav'
import ResultsPageOverview from '@/components/ResultsPageOverview'
import { ALL_RACES } from '@/lib/calendar'
import IMAGES from '@/config/images'

interface Props {
  year: number
}

async function getRaces(year: number) {
  noStore()
  try {
    const sql = (await import('@/lib/db')).default
    const races = await sql`
      SELECT
        res.race_id                      AS id,
        COALESCE(r.name, '')                  AS name,
        COALESCE(r.date::text, '')            AS date,
        COALESCE(r.location, '')              AS location
      FROM (
        SELECT DISTINCT ON (race_id) race_id, season FROM results WHERE season = ${year}
      ) res
      LEFT JOIN races r ON r.id = res.race_id
      ORDER BY res.race_id, r.date ASC NULLS LAST
    `
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return races.map((race: any) => {
      const calendarMatch = ALL_RACES.find(r =>
        (race.name as string).toLowerCase().includes(r.shortName.toLowerCase())
      )
      const imageUrl = calendarMatch?.imageUrl ?? IMAGES.general.actie1

      return {
        id: race.id as number,
        name: race.name as string,
        date: String(race.date),
        location: race.location as string,
        imageUrl,
      }
    })
  } catch (error) {
    console.error('Error fetching races:', error)
    return []
  }
}

async function hasStandings(year: number) {
  noStore()
  try {
    const sql = (await import('@/lib/db')).default
    const result = await sql`
      SELECT COUNT(*) as count FROM standings WHERE season = ${year}
    `
    return (result[0]?.count ?? 0) > 0
  } catch {
    return false
  }
}

export default async function ResultsPageContent({ year }: Props) {
  const [races, standingsExist] = await Promise.all([
    getRaces(year),
    hasStandings(year),
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
            {races.length > 0
              ? `${races.length} wedstrijd${races.length !== 1 ? 'en' : ''} met uitslagen`
              : 'Nog geen uitslagen beschikbaar'}
          </p>
        </div>
      </section>

      {/* Season nav + overview */}
      <div className="max-w-4xl mx-auto px-4 pt-10 mb-6">
        <SeasonNav currentYear={year} />
      </div>

      <ResultsPageOverview
        year={year}
        races={races}
        hasStandings={standingsExist}
        racesCount={races.length}
      />
    </>
  )
}
