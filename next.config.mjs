import { newsRedirects } from './data/news.ts'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return Object.entries(newsRedirects).map(([source, destination]) => ({
      source: `/news/${source}`,
      destination: `/news/${destination}`,
      permanent: true,
    }))
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
