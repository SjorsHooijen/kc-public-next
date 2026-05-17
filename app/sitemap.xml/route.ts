const BASE_URL = 'https://kempencup.nl'

const staticPages = [
  '',
  '/wedstrijden',
  '/reglement',
  '/nieuws',
  '/contact',
]

const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]

export async function GET() {
  const urls: string[] = [
    ...staticPages.map((path) => `${BASE_URL}${path}`),
    ...years.map((year) => `${BASE_URL}/uitslagen-${year}`),
  ]

  let slugs: string[] = []
  try {
    const sql = (await import('@/lib/db')).default
    const rows = await sql`SELECT slug FROM news`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slugs = rows.map((r: any) => r.slug as string)
  } catch {
    // ignore DB errors during sitemap generation
  }

  const newsUrls = slugs.map((slug) => `${BASE_URL}/nieuws/${slug}`)
  const allUrls = [...urls, ...newsUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
    .map(
      (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
