export const SHORTLIST_KEY = 'sinotruk-team-shortlist-v1';

const isBrowser = () => typeof window !== 'undefined';

export function addToShortlist(items: string[], itemId: string) {
  return items.includes(itemId) ? items : [...items, itemId];
}

export function removeFromShortlist(items: string[], itemId: string) {
  return items.filter((item) => item !== itemId);
}

export function readShortlist() {
  if (!isBrowser()) return [];

  try {
    const value = window.localStorage.getItem(SHORTLIST_KEY);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) && parsed.every((item) => typeof item === 'string') ? parsed : [];
  } catch {
    return [];
  }
}

export function saveShortlist(items: string[]) {
  if (!isBrowser()) return;

  window.localStorage.setItem(SHORTLIST_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('sinotruk-shortlist-change', { detail: items }));
}
