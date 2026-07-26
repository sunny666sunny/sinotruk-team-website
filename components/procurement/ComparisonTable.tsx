import { buildComparisonRows, type ComparableProduct } from '@/lib/procurement/compare-products';

export default function ComparisonTable({ products }: { products: ComparableProduct[] }) {
  const rows = buildComparisonRows(products);
  return <div className="overflow-x-auto"><table className="min-w-full border-collapse text-left text-sm"><thead><tr><th className="border border-[var(--color-line)] bg-[var(--color-canvas)] p-3 font-bold text-[var(--color-ink)]">Specification</th>{products.map((product) => <th key={product.id} className="min-w-48 border border-[var(--color-line)] bg-[var(--color-canvas)] p-3 font-bold text-[var(--color-ink)]">{product.name}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label}><th className="border border-[var(--color-line)] bg-white p-3 font-semibold text-[var(--color-steel)]">{row.label}</th>{row.values.map((value, index) => <td key={`${row.label}-${index}`} className="border border-[var(--color-line)] bg-white p-3 text-[var(--color-ink)]">{value}</td>)}</tr>)}</tbody></table></div>;
}
