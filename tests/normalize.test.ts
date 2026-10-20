import { describe, it, expect } from 'vitest';
import { normalizePopups, normalizeSite } from '../src/lib/normalize';

describe('normalizePopups', () => {
  it('accepts a valid entry', () => {
    expect(normalizePopups([{ date: '2026-11-07', name: 'N', venue: 'V' }])).toEqual([
      { date: '2026-11-07', name: 'N', venue: 'V' },
    ]);
  });
  it('treats null/empty file as no pop-ups', () => {
    expect(normalizePopups(null)).toEqual([]);
  });
  it('rejects an un-padded date with a friendly message', () => {
    expect(() => normalizePopups([{ date: '2026-11-7', name: 'Night Market', venue: 'V' }])).toThrow(
      /Night Market.*'2026-11-07'/,
    );
  });
  it('rejects a missing name or venue', () => {
    expect(() => normalizePopups([{ date: '2026-11-07', venue: 'V' }])).toThrow(/name/);
    expect(() => normalizePopups([{ date: '2026-11-07', name: 'N' }])).toThrow(/venue/);
  });
});

describe('normalizeSite', () => {
  const base = {
    phone: '',
    orderUrl: '',
    kickstarter: { url: 'u', endsAt: '2026-11-16T22:13:00-08:00', goal: 25000, status: 'live' },
  };
  it('coerces an unquoted phone number to a string', () => {
    expect(normalizeSite({ ...base, phone: 5105550123 }).phone).toBe('5105550123');
  });
  it('treats a missing phone/orderUrl as empty', () => {
    const s = normalizeSite({ ...base, phone: null, orderUrl: undefined });
    expect(s.phone).toBe('');
    expect(s.orderUrl).toBe('');
  });
  it('parses pledged written with commas or a dollar sign', () => {
    expect(normalizeSite({ ...base, kickstarter: { ...base.kickstarter, pledged: '$4,295' } }).kickstarter.pledged).toBe(4295);
  });
  it('leaves pledged undefined when blank', () => {
    expect(normalizeSite({ ...base, kickstarter: { ...base.kickstarter, pledged: null } }).kickstarter.pledged).toBeUndefined();
  });
});

import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

describe('popups.yaml example', () => {
  it('produces valid YAML when the comment instructions are followed literally', () => {
    const src = readFileSync('src/data/popups.yaml', 'utf8');
    // Instructions: delete the [] line; drop the leading "#" from example lines.
    const edited = src
      .split('\n')
      .filter((l) => l.trim() !== '[]')
      .map((l) => (/^#(- | {2}\w)/.test(l) ? l.slice(1) : l))
      .join('\n');
    const list = normalizePopups(parse(edited));
    expect(list).toHaveLength(1);
    expect(list[0]!.date).toBe('2026-11-07');
  });
});
