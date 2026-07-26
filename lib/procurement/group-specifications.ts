type SpecificationGroups = Record<'power' | 'chassis' | 'dimensions' | 'capacity' | 'other', Record<string, string>>;

const groups: Array<[keyof SpecificationGroups, RegExp]> = [
  ['power', /engine|power|emission|transmission/i],
  ['chassis', /drive|axle|cab|tyre|tire|suspension/i],
  ['dimensions', /length|width|height|wheelbase|dimension/i],
  ['capacity', /payload|load|volume|capacity|weight|tank/i],
];

export function groupSpecifications(specifications: Record<string, string>): SpecificationGroups {
  const result: SpecificationGroups = { power: {}, chassis: {}, dimensions: {}, capacity: {}, other: {} };
  for (const [label, value] of Object.entries(specifications)) {
    const group = groups.find(([, matcher]) => matcher.test(label))?.[0] || 'other';
    result[group][label] = value;
  }
  return result;
}
