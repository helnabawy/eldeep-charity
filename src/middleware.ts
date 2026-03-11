import createMiddleware from 'next-intl/middleware';

export const locales = ['ar', 'en'] as const;

export default createMiddleware({
  locales,
  defaultLocale: 'ar',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)']
};
