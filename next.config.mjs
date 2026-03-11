import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use 'export' for GitHub Pages static hosting
  output: 'export',
  // GitHub Pages serves from repo name subpath (change if using custom domain)
  basePath: process.env.GITHUB_PAGES ? '/eldeep-charity' : '',
  // Required for static export with next-intl
  trailingSlash: true,
  images: {
    // Disable image optimization for static export
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
