import { groupSpecifications } from '@/lib/procurement/group-specifications';
import { GroupedSpecifications } from '@/components/industrial/catalogue/GroupedSpecifications';

export default function SpecificationTable({ specifications }: { specifications: Record<string, string> }) {
  const groups = groupSpecifications(specifications);
  return <GroupedSpecifications groups={groups} />;
}
