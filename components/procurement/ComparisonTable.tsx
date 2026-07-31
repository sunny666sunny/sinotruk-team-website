import { buildComparisonRows, type ComparableProduct } from '@/lib/procurement/compare-products';

export default function ComparisonTable({ products }: { products: ComparableProduct[] }) {
  const rows = buildComparisonRows(products);
  return (
    <div className="overflow-x-auto border border-[var(--industrial-line)]">
      <table className="min-w-full border-collapse text-left text-sm">
        <caption className="sr-only">Published specification comparison for selected vehicles</caption>
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 z-10 min-w-40 border-b border-r border-[var(--industrial-line)] bg-[var(--industrial-surface)] p-4 font-bold uppercase text-[var(--industrial-muted)]">Specification</th>
            {products.map((product) => (
              <th key={product.id} scope="col" className="min-w-52 border-b border-r border-[var(--industrial-line)] bg-[var(--industrial-surface)] p-4 text-lg font-bold text-[var(--industrial-text)]">{product.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="sticky left-0 z-10 border-b border-r border-[var(--industrial-line)] bg-[var(--industrial-panel)] p-4 font-semibold text-[var(--industrial-muted)]">{row.label}</th>
              {row.values.map((value, index) => (
                <td key={`${row.label}-${index}`} className="border-b border-r border-[var(--industrial-line)] bg-[var(--industrial-panel)] p-4 text-[var(--industrial-text)]">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <p className="p-6 text-sm text-[var(--industrial-muted)]">No published specifications are available for comparison.</p>}
    </div>
  );
}
