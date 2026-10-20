import type { Popup, Site } from './types';

/** Validate popups.yaml with messages a non-developer can act on. */
export function normalizePopups(raw: unknown): Popup[] {
  if (raw == null) return [];
  if (!Array.isArray(raw)) throw new Error('popups.yaml must be a list of pop-ups (each starting with "- date:")');
  return raw.map((entry: Record<string, unknown>, i) => {
    const label = `popups.yaml entry ${i + 1}${entry?.name ? ` "${entry.name}"` : ''}`;
    const date = entry?.date == null ? '' : String(entry.date);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
      throw new Error(`${label}: date must look like '2026-11-07' (got '${date}')`);
    if (!entry.name) throw new Error(`${label}: name is required`);
    if (!entry.venue) throw new Error(`${label}: venue is required`);
    return { ...entry, date } as Popup;
  });
}

const blank = (v: unknown) => (v == null ? '' : String(v).trim());

/** Coerce common YAML slips in site.yaml (unquoted phone, "$4,295"). */
export function normalizeSite(raw: Record<string, any>): Site {
  const ks = raw.kickstarter ?? {};
  const pledgedRaw = blank(ks.pledged).replace(/[^\d.]/g, '');
  return {
    ...raw,
    phone: blank(raw.phone),
    orderUrl: blank(raw.orderUrl),
    kickstarter: { ...ks, pledged: pledgedRaw ? Number(pledgedRaw) : undefined },
  } as Site;
}
