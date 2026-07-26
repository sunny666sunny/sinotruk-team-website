import { groupSpecifications } from '@/lib/procurement/group-specifications';

const headings = { power: 'Powertrain', chassis: 'Chassis & cab', dimensions: 'Dimensions', capacity: 'Capacity', other: 'Other specifications' };

export default function SpecificationTable({ specifications }: { specifications: Record<string, string> }) {
  const groups = groupSpecifications(specifications);
  return <div className="space-y-6">{(Object.keys(groups) as Array<keyof typeof groups>).map((group) => Object.keys(groups[group]).length ? <section key={group}><h3 className="text-sm font-bold uppercase tracking-[.1em] text-[var(--color-steel)]">{headings[group]}</h3><div className="mt-3 overflow-x-auto"><table className="min-w-full border-collapse text-sm"><tbody>{Object.entries(groups[group]).map(([label, value]) => <tr key={label}><th scope="row" className="border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3 text-left font-semibold text-[var(--color-steel)]">{label}</th><td className="border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-[var(--color-ink)]">{value}</td></tr>)}</tbody></table></div></section> : null)}</div>;
}
