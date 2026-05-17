import Link from 'next/link'

interface Props {
  currentYear: number
}

const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]

export default function SeasonNav({ currentYear }: Props) {
  return (
    <nav className="flex flex-wrap gap-2 mb-8">
      {years.map((year) => (
        <Link
          key={year}
          href={`/uitslagen-${year}`}
          className={`relative px-4 py-1.5 font-heading font-bold text-sm uppercase tracking-wide transition-all hover:-translate-y-0.5 ${
            year === currentYear
              ? 'bg-primary text-dark shadow-md shadow-primary/30'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {year}
        </Link>
      ))}
    </nav>
  )
}
