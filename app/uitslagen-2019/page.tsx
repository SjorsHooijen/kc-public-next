import type { Metadata } from 'next'
import ResultsPageContent from '@/components/ResultsPageContent'

export const metadata: Metadata = {
  title: 'Uitslagen 2019',
  description: 'Wedstrijduitslagen en klassement van de KempenCup 2019.',
}

export default function Page() {
  return <ResultsPageContent year={2019} />
}
