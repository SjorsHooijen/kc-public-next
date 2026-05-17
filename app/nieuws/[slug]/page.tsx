import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

async function getArticle(slug: string) {
  try {
    const sql = (await import('@/lib/db')).default
    const rows = await sql`
      SELECT * FROM news WHERE slug = ${slug} LIMIT 1
    `
    return rows[0] ?? null
  } catch {
    return null
  }
}

async function getAllSlugs() {
  try {
    const sql = (await import('@/lib/db')).default
    const rows = await sql`SELECT slug FROM news`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rows.map((r: any) => r.slug as string)
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug: string) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return { title: 'Artikel niet gevonden' }
  return {
    title: article.title,
    description: article.summary ?? undefined,
  }
}

function formatDutchDate(dateStr: string): string {
  const months = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december',
  ]
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export default async function NewsArticlePage({ params }: Props) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const imageUrl = article.image_url ?? '/images/general/actie-1.jpg'

  return (
    <>
      {/* Article hero image */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
          <span className="inline-block bg-primary text-dark font-heading font-bold text-xs uppercase tracking-[0.2em] px-2 py-0.5 mb-3">
            {formatDutchDate(article.published_at)}
          </span>
          <h1 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/nieuws"
          className="inline-flex items-center gap-1 text-gray-500 font-body text-sm hover:text-primary transition-colors mb-8"
        >
          <span aria-hidden="true">&larr;</span> Terug naar nieuws
        </Link>

        {/* Summary */}
        {article.summary && (
          <p className="font-body text-lg text-gray-600 mb-8 leading-relaxed border-l-4 border-primary pl-5">
            {article.summary}
          </p>
        )}

        {/* Content */}
        {article.content && (
          <div
            className="prose prose-lg max-w-none font-body
              prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-dark
              prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-dark
              prose-img:rounded prose-img:w-full"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}

        {/* Footer */}
        <div className="mt-14 pt-8 border-t border-gray-200">
          <Link
            href="/nieuws"
            className="inline-flex items-center gap-1 text-primary font-heading font-bold text-sm uppercase tracking-wide hover:text-primary-dark transition-colors"
          >
            <span aria-hidden="true">&larr;</span> Alle nieuwsberichten
          </Link>
        </div>
      </article>
    </>
  )
}
