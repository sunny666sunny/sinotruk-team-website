interface Identifiable { id: string; name: string; }
export function resolveShortlist<T extends Identifiable, U extends Identifiable>(ids: string[], products: T[], parts: U[]) {
  const records = new Map([...products, ...parts].map((item) => [item.id, item]));
  return ids.flatMap((id) => records.has(id) ? [records.get(id)!] : []);
}
