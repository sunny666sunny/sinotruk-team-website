import { SlidersHorizontal } from 'lucide-react';

export type CatalogueToolbarProps = {
  count: number;
  onOpenFilters(): void;
  sort: string;
  onSort(value: string): void;
};

export function CatalogueToolbar({ count, onOpenFilters, sort, onSort }: CatalogueToolbarProps) {
  return (
    <div className="flex flex-col gap-4 border-y border-[var(--industrial-line)] py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-[var(--industrial-text)]" aria-live="polite">
          Showing {count} vehicles
        </p>
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex min-h-11 items-center gap-2 border border-[var(--industrial-line)] px-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-text)] lg:hidden"
          aria-label="Open product filters"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
        </button>
      </div>
      <label className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-muted)]">
        Sort
        <select
          aria-label="Sort products"
          value={sort}
          onChange={(event) => onSort(event.target.value)}
          className="min-h-11 border border-[var(--industrial-line)] bg-[var(--industrial-panel)] px-3 text-sm font-semibold normal-case tracking-normal text-[var(--industrial-text)]"
        >
          <option value="featured">Featured</option>
          <option value="name-asc">Name: A–Z</option>
          <option value="name-desc">Name: Z–A</option>
        </select>
      </label>
    </div>
  );
}
