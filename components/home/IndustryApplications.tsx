import { 
  Building, 
  Truck, 
  Mountain, 
  Anchor, 
  Zap, 
  Home 
} from 'lucide-react'

const applications = [
  {
    icon: Building,
    title: 'Construction',
    description: 'Dump trucks and concrete mixer trucks provide reliable solutions for infrastructure and building projects worldwide',
  },
  {
    icon: Truck,
    title: 'Logistics & Transportation',
    description: 'Tractor heads and cargo trucks deliver efficient long-haul and distribution services across global supply chains',
  },
  {
    icon: Mountain,
    title: 'Mining',
    description: 'Heavy-duty mining trucks and dump trucks engineered for extreme conditions in mining operations globally',
  },
  {
    icon: Anchor,
    title: 'Port Operations',
    description: 'Specialized terminal tractors and container handlers optimize cargo movement in ports and logistics hubs',
  },
  {
    icon: Zap,
    title: 'Energy Sector',
    description: 'Fuel tankers and specialized vehicles support oil, gas, and renewable energy projects across diverse terrains',
  },
  {
    icon: Home,
    title: 'Municipal Services',
    description: 'Garbage trucks, sweepers, and firefighting vehicles enhance urban maintenance and public safety services',
  },
]

export default function IndustryApplications() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-900 inline-block pb-4">
            Industry Applications
          </h2>
          <p className="section-subtitle">
            Widely used in various industries to create maximum value for customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-8 text-center hover:bg-primary hover:text-white transition-all duration-300 group"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <app.icon className="w-10 h-10 text-primary group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors">
                {app.title}
              </h3>
              <p className="text-gray-600 group-hover:text-white/90 transition-colors text-sm leading-relaxed">
                {app.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
