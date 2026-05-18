import type { Metadata } from 'next'
import KlassementPageContent from '@/components/KlassementPageContent'

export const metadata: Metadata = {
  title: 'Klassement 2022',
  description: 'Algemeen klassement van de KempenCup 2022.',
}

export default function KlassementPage() {
  return <KlassementPageContent year={2022} />
}
