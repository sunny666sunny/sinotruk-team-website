import type { FilterableProduct, ProductFilterState } from './types';

const powerOf = (product: FilterableProduct) => {
  const value = product.normalizedSpecs.power || product.normalizedSpecs.Power || '';
  const match = value.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : undefined;
};

export function filterProducts<T extends FilterableProduct>(products: T[], filters: ProductFilterState) {
  return products.filter((product) => {
    const drive = product.drive || product.normalizedSpecs.drive || product.normalizedSpecs.Drive || '';
    const power = powerOf(product);
    return (!filters.category || product.category === filters.category)
      && (!filters.drive.length || filters.drive.includes(drive))
      && (!filters.applications.length || filters.applications.some((application) => product.applicationTags.includes(application)))
      && (filters.powerMin === undefined || (power !== undefined && power >= filters.powerMin))
      && (filters.powerMax === undefined || (power !== undefined && power <= filters.powerMax));
  });
}
