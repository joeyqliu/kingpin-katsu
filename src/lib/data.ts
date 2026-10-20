import { parse } from 'yaml';
import siteRaw from '../data/site.yaml?raw';
import popupsRaw from '../data/popups.yaml?raw';
import menuRaw from '../data/menu.yaml?raw';
import { normalizePopups, normalizeSite } from './normalize';
import type { MenuSection } from './types';

export const site = normalizeSite(parse(siteRaw));
export const popups = normalizePopups(parse(popupsRaw));
export const menu = parse(menuRaw) as {
  sections: MenuSection[];
  comingSoon: { drinks: string[]; testing: string[] };
};
