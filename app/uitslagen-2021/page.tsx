import type { Metadata } from 'next'
import ResultsPageContent from '@/components/ResultsPageContent'

export const metadata: Metadata = {
  title: 'Uitslagen 2021',
  description: 'Wedstrijduitslagen en klassement van de KempenCup 2021.',
}

export default function Page() {
  return <ResultsPageContent year={2021} />
}
