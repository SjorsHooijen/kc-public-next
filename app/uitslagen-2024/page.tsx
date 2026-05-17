import type { Metadata } from 'next'
import ResultsPageContent from '@/components/ResultsPageContent'

export const metadata: Metadata = {
  title: 'Uitslagen 2024',
  description: 'Wedstrijduitslagen en klassement van de KempenCup 2024.',
}

export default function Page() {
  return <ResultsPageContent year={2024} />
}
