export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: https://kempencup.nl/sitemap.xml`,
    {
      headers: { 'Content-Type': 'text/plain' },
    }
  )
}
