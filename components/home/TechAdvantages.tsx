import { Zap, Brain, Shield, Thermometer, Leaf, Globe } from 'lucide-react'

const advantages = [
  {
    icon: Zap,
    title: 'Power System',
    description: 'Equipped with self-developed high-power energy-saving engines that deliver excellent fuel economy while meeting both China VI and Euro VI emission standards.',
  },
  {
    icon: Brain,
    title: 'Intelligent Driving',
    description: 'Develops L4 autonomous driving trucks utilizing multi-sensor fusion and dual-mode positioning systems for specific highway operations.',
  },
  {
    icon: Shield,
    title: 'Safety Technology',
    description: 'Incorporates high-strength steel structures with multiple active and passive safety systems to ensure comprehensive driving protection.',
  },
  {
    icon: Thermometer,
    title: 'Extreme Environment Adaptation',
    description: 'Vehicles undergo extensive real-world testing to ensure reliable operation in extreme cold conditions and high-altitude regions worldwide.',
  },
  {
    icon: Leaf,
    title: 'Emission Control',
    description: 'Advanced emission control systems utilizing SCR technology to meet global environmental standards with high fuel efficiency.',
  },
  {
    icon: Globe,
    title: 'Global Service Network',
    description: 'Comprehensive worldwide service coverage with extensive support points along major international logistics routes.',
  },
]

export default function TechAdvantages() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-900 inline-block pb-4">
            Technology Advantages
          </h2>
          <p className="section-subtitle">
            Innovative technology creates excellent products and wins world recognition
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <advantage.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
              <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
