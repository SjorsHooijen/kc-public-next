import type { Metadata } from 'next'
import RaceUitslagPageContent from '@/components/RaceUitslagPageContent'

export const metadata: Metadata = {
  title: 'Wedstrijduitslag',
  description: 'Uitslag van een wedstrijd in de KempenCup.',
}

// Always render on demand so newly added/updated race results show up
// immediately (the data layer uses noStore()).
export const dynamic = 'force-dynamic'

interface Props {
  params: {
    year: string
    'race-id': string
  }
}

export default function RaceUitslagPage({ params }: Props) {
  const year = parseInt(params.year, 10)
  const raceId = parseInt(params['race-id'], 10)
  return <RaceUitslagPageContent year={year} raceId={raceId} />
}
