import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com', 'drive.google.com', 'utfs.io' , 'images.unsplash.com' , 'cdn.prod.website-files.com'],
  },
};

const analyzeBundleConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default analyzeBundleConfig(withNextIntl(nextConfig));