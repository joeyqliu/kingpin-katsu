import { describe, it, expect } from 'vitest';
import { pacificDate, upcomingPopups, kickstarterState, formatDeadline } from '../src/lib/time';
import type { Popup, Kickstarter } from '../src/lib/types';

const p = (date: string, name = date): Popup => ({ date, name, venue: 'V' });

describe('pacificDate', () => {
  it('uses Pacific time, not UTC', () => {
    expect(pacificDate(new Date('2026-10-21T05:00:00Z'))).toBe('2026-10-20');
  });
});

describe('upcomingPopups', () => {
  const now = new Date('2026-10-21T05:00:00Z'); // 22:00 PT Oct 20
  it('keeps an event dated today (PT) after UTC midnight', () => {
    expect(upcomingPopups([p('2026-10-20')], now).map((x) => x.date)).toEqual(['2026-10-20']);
  });
  it('drops past events', () => {
    expect(upcomingPopups([p('2026-10-19')], now)).toEqual([]);
  });
  it('sorts ascending', () => {
    expect(upcomingPopups([p('2026-12-01'), p('2026-10-25')], now).map((x) => x.date)).toEqual([
      '2026-10-25',
      '2026-12-01',
    ]);
  });
  it('handles empty', () => {
    expect(upcomingPopups([], now)).toEqual([]);
  });
});

describe('kickstarterState', () => {
  const ks: Kickstarter = {
    url: 'u',
    endsAt: '2026-11-16T22:13:00-08:00',
    goal: 25000,
    status: 'live',
  };
  it('is live one minute before the deadline', () => {
    expect(kickstarterState(ks, new Date('2026-11-17T06:12:00Z'))).toBe('live');
  });
  it('is ended one minute after the deadline', () => {
    expect(kickstarterState(ks, new Date('2026-11-17T06:14:00Z'))).toBe('ended');
  });
  it('status funded overrides', () => {
    expect(kickstarterState({ ...ks, status: 'funded' }, new Date('2026-10-20T00:00:00Z'))).toBe('funded');
  });
  it('status ended overrides', () => {
    expect(kickstarterState({ ...ks, status: 'ended' }, new Date('2026-10-20T00:00:00Z'))).toBe('ended');
  });
});

describe('formatDeadline', () => {
  it('shows the full Pacific deadline date without a countdown', () => {
    expect(formatDeadline('2026-11-16T22:13:00-08:00')).toBe('Monday, November 16, 2026');
  });
});
