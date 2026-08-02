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

export function mergePublishedSelections(storedIds: string[], queryValues: Array<string | string[] | undefined>, publishedIds: string[]) {
  const requestedIds = queryValues.flatMap((value) => Array.isArray(value) ? value : value ? [value] : []);
  const published = new Set(publishedIds);
  return buildSelectionPayload([...storedIds, ...requestedIds]).filter((id) => published.has(id));
}

type RfqInput = Record<string, unknown>;
const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';

export function normalizeRfqSubmission(input: RfqInput) {
  const data = {
    name: text(input.name), phone: text(input.phone), email: text(input.email), country: text(input.country), message: text(input.message),
    selectionPayload: buildSelectionPayload(Array.isArray(input.selections) ? input.selections as string[] : []),
    quantity: input.quantity === '' || input.quantity === undefined ? undefined : Number(input.quantity),
    useCase: text(input.useCase) || undefined, destinationPort: text(input.destinationPort) || undefined, consent: input.consent === true,
  };
  if (!data.name || !data.phone || !data.email || !data.country || !data.message || !data.consent || (data.quantity !== undefined && (!Number.isInteger(data.quantity) || data.quantity < 1))) return { ok: false as const, error: 'Please complete all required fields and agree to be contacted.' };
  return { ok: true as const, data };
}
