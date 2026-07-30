import ServicePageLayout from '@/components/service/ServicePageLayout';

export default function MaintenanceManualPage() {
  return <ServicePageLayout title="Maintenance Manual" description="A practical starting point for maintenance planning, operating checks and parts-support enquiries." sections={[
    { title: 'Routine Checks', description: 'Establish a consistent pre-operation and scheduled-maintenance routine for the truck’s operating environment. Confirm the relevant manual and configuration details before performing service work.', image: '/images/reference/After-sales-service-3.webp', imageAlt: 'Routine commercial truck maintenance checks', bullets: ['Fluids, tyres and visible-condition checks', 'Brake, steering and lighting checks', 'Scheduled lubrication and replacement items', 'Configuration-specific service requirements'] },
    { title: 'Repair Preparation', description: 'Prepare the vehicle identification and fault information before seeking repair support. Clear model, VIN and symptom details help ensure the appropriate process and parts are considered.', image: '/images/reference/After-sales-service-4.webp', imageAlt: 'Commercial truck repair preparation' },
    { title: 'Parts Support', description: 'For replacement parts, use the available part number or vehicle identification details to confirm compatibility before ordering.', image: '/images/reference/Parts-Accessories-1.webp', imageAlt: 'Commercial truck replacement parts' },
  ]} />;
}
