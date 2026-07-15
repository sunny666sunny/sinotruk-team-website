const stats = [
  { value: '150+', label: 'Countries & Regions Sold' },
  { value: '30000+', label: 'Vehicles Operating Worldwide' },
  { value: '1500+', label: 'Global Dealer Networks' },
  { value: '3770+', label: 'Global Service Networks' },
]

export default function GlobalBusiness() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          <path
            d="M100,250 Q250,100 400,200 T700,180 T950,220"
            fill="none"
            stroke="#26807d"
            strokeWidth="2"
          />
          <path
            d="M50,300 Q200,400 350,320 T650,350 T950,300"
            fill="none"
            stroke="#26807d"
            strokeWidth="2"
          />
          <circle cx="200" cy="200" r="15" fill="#26807d" />
          <circle cx="400" cy="220" r="12" fill="#26807d" />
          <circle cx="600" cy="180" r="15" fill="#26807d" />
          <circle cx="800" cy="250" r="12" fill="#26807d" />
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-primary inline-block pb-4">
            Global Sales Layout
          </h2>
          <p className="section-subtitle">
            Complete service network nationwide providing timely and professional support
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-primary text-white text-center py-10 px-6 rounded-md shadow-lg"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-primary-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
