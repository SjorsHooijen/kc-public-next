import SeasonNav from '@/components/SeasonNav'
import StandingsTable from '@/components/StandingsTable'

interface Props {
  year: number
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

export default async function KlassementPageContent({ year }: Props) {
  const standings = await getStandings(year)

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
              Klassement
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
            {standings.length > 0
              ? `${standings.length} renner${standings.length !== 1 ? 's' : ''}`
              : 'Nog geen klassement beschikbaar'}
          </p>
        </div>
      </section>

      {/* Season nav + content */}
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <SeasonNav currentYear={year} />
      </div>

      {/* Standings content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {standings.length > 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <h2 className="font-heading font-bold text-2xl uppercase tracking-tight text-dark mb-6">
              Algemeen Klassement {year}
            </h2>
            <StandingsTable standings={standings} />
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="font-heading font-bold text-3xl uppercase tracking-tight text-dark mb-2">Geen klassement</p>
            <p className="font-body text-gray-400">Geen klassement beschikbaar voor dit seizoen.</p>
          </div>
        )}
      </div>
    </>
  )
}
