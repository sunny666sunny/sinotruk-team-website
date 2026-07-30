import ServicePageLayout from '@/components/service/ServicePageLayout';

export default function AfterSalesServicePage() {
  return <ServicePageLayout title="After-sales Service" description="Maintenance guidance, technical training and parts-support information for commercial-truck operations." sections={[
    { title: 'Maintenance & Repair', description: 'Scheduled maintenance helps reduce unplanned downtime, extend service intervals and keep each vehicle operating reliably. Driver-operation guides and repair instructions support faster, more consistent service decisions.', image: '/images/reference/After-sales-service-3.webp', imageAlt: 'Truck maintenance support' },
    { title: 'Technical Training', description: 'Driver and repair training can help operators understand vehicle handling, fault diagnosis and maintenance procedures. Training can cover vehicle structure, operating principles and service-safe working practices.', image: '/images/reference/After-sales-service-4.webp', imageAlt: 'Technical training for commercial truck service', bullets: ['Driver operation training', 'Driver safety training', 'Fuel-efficient driving training', 'Vehicle fault-diagnosis training'] },
    { title: 'Parts & Accessories', description: 'Use the correct parts information to maintain fitment and vehicle performance. Share a part number, vehicle model or VIN when compatibility needs confirmation.', image: '/images/reference/Parts-Accessories-1.webp', imageAlt: 'Commercial truck parts and accessories' },
  ]} />;
}
