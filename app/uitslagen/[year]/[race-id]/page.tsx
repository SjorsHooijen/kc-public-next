import type { Metadata } from 'next'
import RaceUitslagPageContent from '@/components/RaceUitslagPageContent'

export const metadata: Metadata = {
  title: 'Wedstrijduitslag',
  description: 'Uitslag van een wedstrijd in de KempenCup.',
}

interface Props {
  params: {
    year: string
    raceId: string
  }
}

export async function generateStaticParams() {
  try {
    const sql = (await import('@/lib/db')).default
    const races = await sql`
      SELECT DISTINCT season, res.race_id
      FROM results res
      LEFT JOIN races r ON r.id = res.race_id
      ORDER BY season DESC, res.race_id ASC
    `
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return races.map((r: any) => ({
      year: String(r.season),
      raceId: String(r.race_id),
    }))
  } catch {
    return []
  }
}

export default function RaceUitslagPage({ params }: Props) {
  const year = parseInt(params.year, 10)
  const raceId = parseInt(params.raceId, 10)
  return <RaceUitslagPageContent year={year} raceId={raceId} />
}
