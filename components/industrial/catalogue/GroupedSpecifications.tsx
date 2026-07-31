import type { groupSpecifications } from '@/lib/procurement/group-specifications';

export type GroupedSpecificationsProps = {
  groups: ReturnType<typeof groupSpecifications>;
};

const headings = {
  power: 'Powertrain',
  chassis: 'Chassis',
  dimensions: 'Dimensions',
  capacity: 'Capacity',
  other: 'Other specifications',
} as const;

export function GroupedSpecifications({ groups }: GroupedSpecificationsProps) {
  return (
    <div className="grid gap-px bg-[var(--industrial-line)] lg:grid-cols-2">
      {(Object.keys(groups) as Array<keyof typeof groups>).map((group) => {
        const specifications = Object.entries(groups[group]);
        if (group === 'other' && !specifications.length) return null;

        return (
          <section key={group} className="bg-[var(--industrial-panel)] p-5 sm:p-6">
            <h3 className="text-2xl font-bold uppercase text-[var(--industrial-text)]">{headings[group]}</h3>
            {specifications.length ? (
              <dl className="mt-4 divide-y divide-[var(--industrial-line)]">
                {specifications.map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-3 text-sm sm:grid-cols-[minmax(8rem,.85fr)_minmax(0,1.15fr)] sm:gap-5">
                    <dt className="text-[var(--industrial-muted)]">{label}</dt>
                    <dd className="break-words font-semibold text-[var(--industrial-text)] sm:text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 text-sm text-[var(--industrial-muted)]">
                Not published — mark for Data review and confirm in the RFQ.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}
