// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Hosted on GitHub Pages under the repo path for now.
// At domain cut-over: site -> 'https://www.kingpinkatsu.com', base -> '/', add public/CNAME.
export default defineConfig({
  site: 'https://joeyqliu.github.io',
  base: '/kingpin-katsu',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
