interface FilterablePart { id: string; category: string; partNumber: string; name: string; specifications: Record<string, string>; }

export function filterParts<T extends FilterablePart>(parts: T[], { category, query }: { category?: string; query?: string }) {
  const keyword = query?.trim().toLowerCase();
  return parts.filter((part) => {
    const searchable = [part.partNumber, part.name, ...Object.values(part.specifications)].join(' ').toLowerCase();
    return (!category || part.category === category) && (!keyword || searchable.includes(keyword));
  });
}
