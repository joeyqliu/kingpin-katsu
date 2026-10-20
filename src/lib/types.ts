export interface Popup {
  /** YYYY-MM-DD, Pacific time */
  date: string;
  start?: string;
  end?: string;
  name: string;
  venue: string;
  address?: string;
  mapUrl?: string;
  link?: string;
  note?: string;
}

export interface Kickstarter {
  url: string;
  /** ISO timestamp with offset */
  endsAt: string;
  goal: number;
  pledged?: number;
  status: 'live' | 'funded' | 'ended';
}

export interface MenuItem {
  name: string;
  description: string;
  image: string;
  price?: string;
  tags?: string[];
}

export interface MenuSection {
  title: string;
  blurb?: string;
  items: MenuItem[];
}

export interface Site {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  orderUrl: string;
  instagram: { handle: string; url: string };
  facebook: { handle: string; url: string };
  kickstarter: Kickstarter;
  pastVenues: string[];
}
