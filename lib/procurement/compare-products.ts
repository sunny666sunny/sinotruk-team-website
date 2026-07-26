export const MAX_COMPARISON_PRODUCTS = 4;

export function createComparison(productIds: string[]) {
  const ids = [...new Set(productIds)];
  if (ids.length > MAX_COMPARISON_PRODUCTS) throw new Error('最多 4 个产品可同时比较');
  return ids;
}
