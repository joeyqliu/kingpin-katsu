# kingpinkatsu.com

Static marketing site for **Kingpin Katsu**: Bay Area pop-ups, catering, and the
road to our first restaurant. Built with [Astro](https://astro.build), hosted on
GitHub Pages.

- Live (preview): https://joeyqliu.github.io/kingpin-katsu/
- Content editing for non-developers: **[EDITING.md](EDITING.md)**

## Develop

```sh
npm install
npm run dev        # http://localhost:4321/kingpin-katsu/
npm test           # unit tests (pop-up dates, Kickstarter state)
npm run build && npm run check   # build + sanity checks on dist/
```

Requires Node 22.12+.

## How it fits together

- `src/data/*.yaml` — all editable content (pop-ups, menu, phone, Kickstarter).
- `src/lib/` — data loading, Pacific-time date logic, base-path `url()` helper.
- `src/components/`, `src/pages/` — Astro components; plain CSS in `src/styles/global.css`.
- Zero client-side JavaScript except two tiny inline scripts (legacy `/#/` URL
  redirect). The mobile menu is a `<details>` element.
- Images in `src/assets/` are optimized to AVIF/WebP at build time.

## Deploy

`.github/workflows/deploy.yml` builds and deploys on every push to `main`, on
demand, and **daily at ~3–4 AM Pacific** so past pop-ups drop off and the
Kickstarter block flips after the deadline.

One-time setup: GitHub repo → **Settings → Pages → Source: GitHub Actions**.

GitHub disables scheduled workflows after 60 days without repo activity; if
that happens, re-enable it under Actions → Deploy to GitHub Pages.

## Moving to www.kingpinkatsu.com

1. `astro.config.mjs`: `site: 'https://www.kingpinkatsu.com'`, `base: '/'`.
2. `scripts/check-dist.mjs`: `BASE = '/'`.
3. Add `public/CNAME` containing `www.kingpinkatsu.com`; push.
4. Repo → Settings → Pages → Custom domain: `www.kingpinkatsu.com`.
5. Cloudflare DNS: `CNAME www → joeyqliu.github.io`, **DNS only (grey cloud)**
   until GitHub shows the HTTPS certificate as issued; then optionally re-enable
   the proxy with SSL mode **Full**.
6. Apex `kingpinkatsu.com`: Cloudflare redirect rule → `https://www.kingpinkatsu.com/$1`
   (or GitHub's apex A records 185.199.108–111.153).
7. Old links like `kingpinkatsu.com/#/menu` redirect to the new pages automatically.
