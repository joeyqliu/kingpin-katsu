/**
 * Prefix an internal path with the site base (e.g. /kingpin-katsu/).
 * Page paths get a trailing slash so GitHub Pages serves them without a 301;
 * file paths (anything with an extension) are left as-is.
 */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '').replace(/\/$/, '');
  if (!clean) return `${base}/`;
  const isFile = /\.[a-z0-9]+$/i.test(clean.split('/').pop() ?? '');
  return `${base}/${clean}${isFile ? '' : '/'}`;
}
