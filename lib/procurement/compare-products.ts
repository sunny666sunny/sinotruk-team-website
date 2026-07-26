export const MAX_COMPARISON_PRODUCTS = 4;

export function createComparison(productIds: string[]) {
  const ids = [...new Set(productIds)];
  if (ids.length > MAX_COMPARISON_PRODUCTS) throw new Error('最多 4 个产品可同时比较');
  return ids;
}

export interface ComparableProduct { id: string; name: string; normalizedSpecs: Record<string, string>; }

export function buildComparisonRows(products: ComparableProduct[]) {
  const labels = [...new Set(products.flatMap((product) => Object.keys(product.normalizedSpecs)))].sort();
  return labels.map((label) => ({
    label,
    values: products.map((product) => product.normalizedSpecs[label] || 'Not specified'),
  }));
}
