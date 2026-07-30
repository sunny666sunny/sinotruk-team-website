import AboutPageLayout from '@/components/about/AboutPageLayout';

const facilityImages = ['Axle-Assy-Line.webp', 'Cabin-Hoisting-Line.webp', 'Chassis-Assy-Line.webp', 'Engine-Hoisting-Line.webp', 'Mining-Truck-Assy-Line.webp', 'Quality-Gate.webp', 'Testing-Machine.webp', 'Truck-Chassis-.webp', 'Truck-TestLine.webp', 'Bending-Machine.webp', 'Painting-Line.webp', 'Painting-Room.webp', 'Testing-Machine-1.webp', 'Welding-Machine.webp', 'Welding-Robot.webp'].map((name) => ({ src: `/images/reference/${name}`, alt: `Manufacturing facility: ${name.replace('.webp', '').replaceAll('-', ' ')}`, label: name.replace('.webp', '').replaceAll('-', ' ') }));

export default function OurFacilitiesPage() {
  return <AboutPageLayout title="Our Facilities" description="A visual look at assembly, manufacturing, inspection and testing operations." gallery={facilityImages}><section className="max-w-3xl"><h2 className="text-3xl font-extrabold text-[var(--color-ink)]">Manufacturing and quality processes</h2><p className="mt-5 leading-8 text-[var(--color-steel)]">The facilities gallery presents the assembly, machining, welding, painting, inspection and vehicle-testing images used by the reference site.</p></section></AboutPageLayout>;
}
