export function buildSelectionPayload(ids: string[]) {
  return [...new Set(ids.filter((id) => typeof id === 'string' && id.trim()))];
}

export function readRfqSelection(value: string | null) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) && parsed.every((item) => typeof item === 'string') ? buildSelectionPayload(parsed) : [];
  } catch {
    return [];
  }
}
