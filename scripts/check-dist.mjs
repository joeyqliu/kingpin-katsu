// Sanity checks on the built site (run after `npm run build`).
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const BASE = '/kingpin-katsu/';
const errors = [];
const fail = (msg) => errors.push(msg);

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

// 1. Required pages
for (const page of ['index.html', 'menu/index.html', 'popups/index.html', 'catering/index.html', 'about/index.html', '404.html']) {
  if (!existsSync(join(DIST, page))) fail(`missing page: ${page}`);
}

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  const rel = file.slice(DIST.length + 1);

  // 2. Internal links/assets must carry the base path
  for (const [, attr, val] of html.matchAll(/\b(href|src|srcset)="([^"]*)"/g)) {
    for (const u of attr === 'srcset' ? val.split(',').map((s) => s.trim().split(/\s+/)[0]) : [val]) {
      if (!u || /^(https?:|mailto:|tel:|#|data:)/.test(u)) continue;
      if (!u.startsWith(BASE)) fail(`${rel}: ${attr}="${u}" is missing base ${BASE}`);
    }
  }
  // 3. No empty tel: links
  if (/href="tel:"/.test(html)) fail(`${rel}: empty tel: link`);
  // 4. No dead Square ordering links while orderUrl is empty
  if (html.includes('square.site')) fail(`${rel}: links to square.site`);
  // 5. No external JS bundles
  if (/<script[^>]*\ssrc=/.test(html)) fail(`${rel}: has <script src>`);
}

// 6. Legacy hash redirect present where expected
for (const page of ['index.html', '404.html']) {
  const html = readFileSync(join(DIST, page), 'utf8');
  if (!html.includes("'#/menu'") || !html.includes('location.replace')) fail(`${page}: legacy hash redirect missing`);
}

// 7. Home HTML + CSS stays small
const index = readFileSync(join(DIST, 'index.html'), 'utf8');
let bytes = Buffer.byteLength(index);
for (const [, href] of index.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)) {
  bytes += statSync(join(DIST, href.slice(BASE.length))).size;
}
if (bytes > 80_000) fail(`home HTML+CSS is ${bytes} bytes (> 80 KB)`);

if (errors.length) {
  console.error(`check-dist: ${errors.length} problem(s)\n - ` + errors.join('\n - '));
  process.exit(1);
}
console.log(`check-dist: OK (${htmlFiles(DIST).length} pages, home HTML+CSS ${Math.round(bytes / 1024)} KB)`);
