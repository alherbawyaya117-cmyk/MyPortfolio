import { defineConfig } from 'astro/config';

// Set SITE_URL in the hosting environment (e.g. https://ayaalherbawy.com) so
// canonical and hreflang URLs point at the real domain.
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
