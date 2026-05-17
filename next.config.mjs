/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // news article images stored in the Neon DB still point to kempencup.nl
      { protocol: 'https', hostname: 'kempencup.nl' },
    ],
  },
}
export default nextConfig
