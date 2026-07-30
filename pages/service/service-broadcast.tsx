import ServicePageLayout from '@/components/service/ServicePageLayout';

export default function ServiceBroadcastPage() {
  return <ServicePageLayout title="Service Broadcast" description="Service guidance and support topics that help fleets plan maintenance, repair and operating checks." sections={[
    { title: 'Planned Maintenance', description: 'Regular inspection and maintenance are essential for dependable vehicle availability. Follow the applicable maintenance schedule and use the correct procedures for each vehicle configuration.', image: '/images/reference/After-sales-service-3.webp', imageAlt: 'Planned truck maintenance service' },
    { title: 'Diagnostics & Repair Support', description: 'A structured service process helps technicians identify faults efficiently and organise repair work around the vehicle’s actual configuration and condition.', image: '/images/reference/After-sales-service-4.webp', imageAlt: 'Truck diagnostics and repair support', bullets: ['Engine and cooling system checks', 'Transmission and axle inspections', 'Brake and pneumatic system checks', 'Electrical and air-conditioning checks'] },
    { title: 'Parts Identification', description: 'Accurate parts identification is the starting point for a reliable repair. Include the relevant vehicle details when submitting a parts or compatibility enquiry.', image: '/images/reference/Parts-Accessories-1.webp', imageAlt: 'Truck spare parts identification' },
  ]} />;
}
