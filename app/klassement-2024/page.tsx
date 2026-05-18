import type { Metadata } from 'next'
import KlassementPageContent from '@/components/KlassementPageContent'

export const metadata: Metadata = {
  title: 'Klassement 2024',
  description: 'Algemeen klassement van de KempenCup 2024.',
}

export default function KlassementPage() {
  return <KlassementPageContent year={2024} />
}
