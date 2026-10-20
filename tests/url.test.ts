import { describe, it, expect } from 'vitest';
import { url } from '../src/lib/url';

describe('url', () => {
  it('adds a trailing slash to page paths (avoids a 301 on GitHub Pages)', () => {
    expect(url('menu')).toMatch(/\/menu\/$/);
    expect(url('/about')).toMatch(/\/about\/$/);
  });
  it('leaves file paths alone', () => {
    expect(url('og.jpg')).toMatch(/\/og\.jpg$/);
    expect(url('sitemap-index.xml')).toMatch(/\.xml$/);
  });
  it('returns the base for home', () => {
    expect(url()).toMatch(/\/$/);
  });
});
