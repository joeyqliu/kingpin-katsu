# Editing the Kingpin Katsu site

You don't need to code. Everything you'll want to change lives in three files
in `src/data/`. Edit them right on GitHub:

1. Open the file on github.com (e.g. `src/data/popups.yaml`).
2. Click the ✏️ pencil icon.
3. Make your change. **Keep the spacing/indentation exactly like the examples.**
4. Click **Commit changes**.
5. The site updates by itself in about 2 minutes (watch the **Actions** tab).

If something breaks, the Actions tab shows a red ❌ and the live site stays on
the last good version. Click into the failed run: the error usually names the
problem (e.g. `popups.yaml entry 1: date must look like '2026-11-07'`). Fix
it or undo your edit.

**Nightly rebuild:** the site rebuilds itself every night so past pop-ups drop
off. GitHub switches that off if the repo has no activity for 60 days. If you
get an email saying the scheduled workflow was disabled, open **Actions →
Deploy to GitHub Pages → Enable workflow**.

---

## Add a pop-up — `src/data/popups.yaml`

Replace the `[]` line with one block per event:

```yaml
- date: '2026-11-07'
  start: '5pm'
  end: '10pm'
  name: Alameda Night Market
  venue: Park Street
  address: 1400 Park St, Alameda, CA
  mapUrl: https://maps.google.com/?q=1400+Park+St+Alameda
  link: https://www.instagram.com/p/...
  note: Bento sells out fast!

- date: '2026-11-14'
  name: Faction Brewing
  venue: Faction Brewing, Alameda
```

- `date`, `name`, and `venue` are required. Everything else is optional.
- Dates are `'YYYY-MM-DD'` with quotes.
- Past pop-ups disappear by themselves (the site rebuilds every night).
- With no pop-ups listed, the site shows "Pop-ups coming up!" automatically.

## Phone number, ordering link, Kickstarter — `src/data/site.yaml`

- **Phone** (adds "Call" buttons everywhere): `phone: '(510) 555-0123'`
- **Online ordering** (adds "Order" buttons): `orderUrl: 'https://kingpin-katsu.square.site/'`
  Leave as `''` while the Square store is out of stock.
- **Kickstarter pledged amount** (shows a progress bar): `pledged: 4295`
- **Kickstarter result** after it ends: `status: funded` shows a "We did it!" message.
  Otherwise it switches to a neutral "thank you" message by itself after the deadline.
- **Past venues** shown on the Pop-ups page: edit the `pastVenues` list.

## Menu — `src/data/menu.yaml`

- Change a name or description: just edit the text.
- **Add prices:** add a line under the item, e.g. `price: '$18'`
- **Add labels:** `tags: [Vegetarian, Gluten free]`
- **New dish:** copy an existing item block. The `image` must match a photo
  file name in `src/assets/food/` (without `.jpg`). To add a new photo, upload
  it to that folder first (square, on a black background works best).
