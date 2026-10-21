# kingpinkatsu.com

Static marketing site for **Kingpin Katsu**: Bay Area pop-ups, catering, and the
road to our first restaurant. Built with [Astro](https://astro.build), hosted on
GitHub Pages.

- Live: https://www.kingpinkatsu.com/
- Content editing for non-developers: **[EDITING.md](EDITING.md)**

## Develop

```sh
npm install
npm run dev        # http://localhost:4321/
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

## Domain

Served from GitHub Pages at `www.kingpinkatsu.com` (`public/CNAME`; repo
Settings → Pages → Custom domain). DNS lives in Cloudflare, **DNS only (grey
cloud)**:

| Type  | Name | Value |
|-------|------|-------|
| CNAME | www  | joeyqliu.github.io |
| A     | @    | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 |
| AAAA  | @    | 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153 |

GitHub redirects the bare `kingpinkatsu.com` to `www`. Leave the MX records
(Cloudflare Email Routing) and the Brevo TXT records alone.

Old links like `kingpinkatsu.com/#/menu` redirect to the new pages automatically.
