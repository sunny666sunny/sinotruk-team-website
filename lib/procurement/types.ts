export interface ProductFilterState {
  category?: string;
  drive: string[];
  applications: string[];
  powerMin?: number;
  powerMax?: number;
}

export interface FilterableProduct {
  id: string;
  category?: string;
  drive?: string;
  applicationTags: string[];
  normalizedSpecs: Record<string, string>;
}
