import type { groupSpecifications } from '@/lib/procurement/group-specifications';

export type KeySpecClusterProps = {
  groups: ReturnType<typeof groupSpecifications>;
  maxItems?: number;
};

export function KeySpecCluster({ groups, maxItems = 5 }: KeySpecClusterProps) {
  const specifications = Object.values(groups).flatMap((group) => Object.entries(group)).slice(0, maxItems);

  if (!specifications.length) {
    return (
      <p className="border-y border-[var(--industrial-line)] py-5 text-sm text-[var(--industrial-muted)]">
        Key specifications not published — confirm requirements in the RFQ.
      </p>
    );
  }

  return (
    <dl className="grid border-l border-t border-[var(--industrial-line)] md:grid-cols-2">
      {specifications.map(([label, value]) => (
        <div key={label} className="min-w-0 border-b border-r border-[var(--industrial-line)] p-4">
          <dt className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[var(--industrial-muted)]">{label}</dt>
          <dd className="mt-2 break-words text-lg font-bold text-[var(--industrial-text)]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
