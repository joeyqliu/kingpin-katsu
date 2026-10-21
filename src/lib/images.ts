import type { ImageMetadata } from 'astro';

const food = import.meta.glob<{ default: ImageMetadata }>('../assets/food/*.{jpg,png}', { eager: true });
const events = import.meta.glob<{ default: ImageMetadata }>('../assets/events/*.jpg', { eager: true });

function pick(map: Record<string, { default: ImageMetadata }>, dir: string, name: string): ImageMetadata {
  const hit = map[`../assets/${dir}/${name}.png`] ?? map[`../assets/${dir}/${name}.jpg`];
  if (!hit) throw new Error(`Missing image src/assets/${dir}/${name}.png or .jpg`);
  return hit.default;
}

export const foodImage = (name: string) => pick(food, 'food', name);
export const eventImage = (name: string) => pick(events, 'events', name);
