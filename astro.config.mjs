// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Hosted on GitHub Pages at the custom domain (see public/CNAME).
export default defineConfig({
  site: 'https://www.kingpinkatsu.com',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
