export const MAX_COMPARISON_PRODUCTS = 4;

export function createComparison(productIds: string[]) {
  const ids = [...new Set(productIds)];
  if (ids.length > MAX_COMPARISON_PRODUCTS) throw new Error('最多 4 个产品可同时比较');
  return ids;
}

export interface ComparableProduct { id: string; name: string; normalizedSpecs: Record<string, string>; }

const specificationOrder = [
  'Vehicle type', 'Vehicle model', 'Version', 'Drive type', 'Market segments',
  'Engine brand', 'Engine manufacturer', 'Engine model', 'Engine type', 'Displacement', 'Emission standard',
  'Engine power', 'Rated engine power / speed', 'Motor power', 'Maximum torque', 'Transmission', 'Transmission control',
  'Cab', 'Chassis', 'Chassis model', 'Control mode', 'Steering', 'Braking',
  'Front axle', 'Rear axle', 'Rear axle model', 'Rear axle ratio', 'Axle', 'Drive axle', 'Suspension', 'Tyre', 'Tyre count',
  'Overall dimensions', 'Cargo box dimensions', 'Cargo bed dimensions', 'Cargo body length', 'Wheelbase', 'Wheel track', 'Approach / departure angle',
  'Cargo body dimensions', 'Turning radius',
  'Curb weight', 'Gross vehicle mass', 'Tare weight', 'Payload capacity', 'Cargo volume', 'Body volume', 'Tank volume', 'Fuel tank capacity',
  'Battery', 'Battery energy', 'Maximum speed', 'Economic speed', 'Maximum gradeability', 'Fuel consumption',
  'Production capacity', 'Lifting capacity', 'Rated lifting moment', 'Maximum lifting height', 'Outrigger span', 'Crane type',
  'Lifting system', 'Mixer body', 'Hydraulic system', 'Main beam', 'Side beam', 'Frame', 'Frame beam', 'Platform',
  'Body plate thickness', 'Landing gear', 'King pin', 'Leaf spring', 'Tank material', 'Asphalt pump', 'Spraying width', 'Spraying rate',
]

const orderOf = (label: string) => {
  const index = specificationOrder.indexOf(label)
  return index === -1 ? Number.MAX_SAFE_INTEGER : index
}

export function buildComparisonRows(products: ComparableProduct[]) {
  const labels = [...new Set(products.flatMap((product) => Object.keys(product.normalizedSpecs)))]
    .filter((label) => label !== 'drive' && label !== 'power')
    .sort((a, b) => orderOf(a) - orderOf(b) || a.localeCompare(b));
  return labels.map((label) => ({
    label,
    values: products.map((product) => product.normalizedSpecs[label] || 'Not specified'),
  }));
}
