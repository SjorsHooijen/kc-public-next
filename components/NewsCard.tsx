import Image from 'next/image'
import Link from 'next/link'

interface Article {
  id: number
  slug: string
  title: string
  summary: string | null
  image_url: string | null
  published_at: string
}

interface Props {
  article: Article
}

function formatDutchDate(dateStr: string): string {
  const months = [
    'jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
    'jul', 'aug', 'sep', 'okt', 'nov', 'dec',
  ]
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export default function NewsCard({ article }: Props) {
  const imageUrl = article.image_url ?? '/images/general/actie-1.jpg'

  return (
    <article className="card-lift group overflow-hidden bg-white">
      {/* Image container */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark/60 to-transparent" />
        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-primary text-dark text-xs font-heading font-bold uppercase tracking-wide px-2 py-0.5">
          {formatDutchDate(article.published_at)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-dark mb-2 leading-tight line-clamp-2">
          {article.title}
        </h3>
        {article.summary && (
          <p className="font-body text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        )}
        <Link
          href={`/nieuws/${article.slug}`}
          className="inline-flex items-center gap-1 text-primary font-body font-medium text-sm hover:text-primary-dark transition-colors"
        >
          Lees meer{' '}
          <span
            aria-hidden="true"
            className="inline-block group-hover:translate-x-1 transition-transform duration-200"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  )
}
