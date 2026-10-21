import type { Kickstarter, Popup } from './types';

const TZ = 'America/Los_Angeles';

/** Calendar date (YYYY-MM-DD) of `d` in Pacific time. */
export function pacificDate(d: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

/** Pop-ups dated today (Pacific) or later, soonest first. */
export function upcomingPopups(list: Popup[], now: Date): Popup[] {
  const today = pacificDate(now);
  return list.filter((p) => p.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export function kickstarterState(ks: Kickstarter, now: Date): 'live' | 'ended' | 'funded' {
  if (ks.status === 'funded' || ks.status === 'ended') return ks.status;
  return now.getTime() < new Date(ks.endsAt).getTime() ? 'live' : 'ended';
}

/** "Sat, Nov 7" for a YYYY-MM-DD date. */
export function formatPopupDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${date}T00:00:00Z`));
}

/** "Monday, November 16, 2026" for an ISO timestamp, in Pacific time. */
export function formatDeadline(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso));
}
