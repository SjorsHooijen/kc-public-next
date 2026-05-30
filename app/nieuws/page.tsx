import type { Metadata } from 'next'
import { unstable_noStore as noStore } from 'next/cache'
import NewsCard from '@/components/NewsCard'

export const metadata: Metadata = {
  title: 'Nieuws',
  description: 'Alle nieuwsberichten van de KempenCup wielerklassering.',
}

async function getAllNews() {
  noStore()
  try {
    const sql = (await import('@/lib/db')).default
    const rows = await sql`
      SELECT * FROM news
      ORDER BY published_at DESC
    `
    return rows
  } catch {
    return []
  }
}

export default async function NieuwsPage() {
  const news = await getAllNews()

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
        <div className="max-w-7xl mx-auto relative z-10 pt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary flex-shrink-0" />
            <span className="text-primary font-heading font-bold text-sm uppercase tracking-[0.25em]">
              Actueel
            </span>
          </div>
          <h1 className="font-heading font-bold uppercase tracking-tighter leading-none mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            <span className="text-white">LAATSTE </span>
            <span className="gradient-text">NIEUWS</span>
          </h1>
          <p className="font-body text-white/60 text-lg max-w-2xl">
            Alle nieuwsberichten en updates van de KempenCup.
          </p>
        </div>
      </section>

      {/* News grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {news.map((article: any, i: number) => {
              const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500']
              const delay = delays[i % delays.length]
              return (
                <div key={article.id} className={`opacity-0 animate-fade-in-up ${delay}`}>
                  <NewsCard article={article} />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="font-body text-gray-500 text-lg">
              Geen nieuws beschikbaar.
            </p>
            <p className="font-body text-gray-400 text-sm mt-2">
              Kom later terug voor de laatste updates.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
