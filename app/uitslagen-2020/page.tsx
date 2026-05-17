import type { Metadata } from 'next'
import ResultsPageContent from '@/components/ResultsPageContent'

export const metadata: Metadata = {
  title: 'Uitslagen 2020',
  description: 'Wedstrijduitslagen en klassement van de KempenCup 2020.',
}

export default function Page() {
  return <ResultsPageContent year={2020} />
}
