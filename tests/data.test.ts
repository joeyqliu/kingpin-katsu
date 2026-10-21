import { describe, it, expect } from 'vitest';
import { site, popups, menu } from '../src/lib/data';
import { existsSync } from 'node:fs';

describe('data files', () => {
  it('site has Kickstarter settings from the spec', () => {
    expect(site.kickstarter.endsAt).toBe('2026-11-16T22:13:00-08:00');
    expect(site.kickstarter.goal).toBe(25000);
    expect(site.kickstarter.url).toContain('help-bring-kingpin-katsu-to-its-permanent-home');
    expect(site.orderUrl).toBe('');
  });
  it('popups parse to an array', () => {
    expect(Array.isArray(popups)).toBe(true);
  });
  it('every menu image exists and no prices ship', () => {
    for (const s of menu.sections)
      for (const i of s.items) {
        const hasImage = ['png', 'jpg'].some((extension) => existsSync(`src/assets/food/${i.image}.${extension}`));
        expect(hasImage, i.image).toBe(true);
        expect(i.price).toBeUndefined();
      }
  });
});
