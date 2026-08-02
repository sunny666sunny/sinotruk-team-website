import type { Product } from '@/data/products'
import { auditedProductCorrections } from './audited-corrections'

type ProductCorrection = {
  description?: string
  image?: string
  bannerImage?: string
  specifications: Readonly<Record<string, string>>
  galleryImages?: readonly string[]
}

const corrections: Record<string, ProductCorrection> = {
  ...auditedProductCorrections,
  'howo-6x4-cargo-truck': {
    description: 'HOWO 6×4 cargo truck platform published for regional and long-distance freight body configurations. Final cab, axle and body specification is confirmed for the intended route and load.',
    specifications: {
      'Vehicle type': 'Cargo truck',
      'Drive type': '6×4',
      Cab: 'HW76 single bunk or HW79 double bunk',
      'Emission standard': 'Euro II–Euro V',
      'Engine power': '266–430 PS',
      Transmission: '10F, 12F, 16F',
      'Front axle': '7–9.5 t',
      'Rear axle': '13–16 t per axle',
      Tyre: '12.00R20, 12R22.5, 315/80R22.5',
    },
    galleryImages: [
      '/images/products/Howo-6X4-Cargo-Truck-2.jpg',
      '/images/products/Howo-6X4-Cargo-Truck-1.jpg',
    ],
  },
  'howo-tx-6x4-dump-truck': {
    specifications: {
      'Vehicle type': 'Dump truck',
      'Drive type': '6×4',
      Cab: 'TX-M (525 mm single bunk), TX-F (749 mm single bunk)',
      'Emission standard': 'Euro II–Euro V',
      'Engine power': '266–440 PS',
      Transmission: '9F, 10F, 12F',
      'Front axle': '9.5 t + 9.5 t',
      'Rear axle': '16 t + 16 t',
      Tyre: '12.00R20, 315/80 R22.5, 13R22.5',
      'Body volume': '18–28 m³',
    },
  },
  'howo-cargo-truck': {
    specifications: {
      'Vehicle type': 'Cargo truck',
      'Drive type': '4×2',
      Cab: '1760 mm or 1880 mm cab width',
      'Emission standard': 'Euro II–Euro III',
      'Engine power': '102–116 hp',
      Transmission: '5F, 6F',
      'Front axle': '2.4 t / 2.7 t',
      'Rear axle': '4.2 t / 7.2 t',
      Tyre: '7.00R16, 7.50R16',
      'Payload capacity': '5 t',
      'Cargo body length': '4.2–5.15 m',
    },
    galleryImages: [
      '/images/products/1-Howo-Cargo-Truck-1.jpg',
      '/images/products/1-Howo-Cargo-Truck-6.jpg',
    ],
  },
  'sinotruck-howo-water-tanker': {
    description: 'HOWO water tanker configuration published for non-potable water transport, road washing, dust suppression and site water support. Final tank and equipment scope requires quotation confirmation.',
    specifications: {
      'Vehicle type': 'Water tanker',
      Cab: 'HW76 cab, one bunk, air conditioning',
      'Overall dimensions': '11,690 × 2,496 × 3,300 mm',
      Wheelbase: '1,800 + 4,600 + 1,350 mm',
      'Wheel track': 'Front 2,022 mm / rear 1,830 mm',
      'Approach / departure angle': '16° / 19°',
      'Tare weight': '14,000 kg',
      'Payload capacity': '13,750 kg',
      'Front axle capacity': '2 × 9,000 kg',
      'Rear axle capacity': '2 × 16,000 kg',
      'Engine brand': 'SINOTRUK',
      'Engine model': 'WD615.69',
      'Engine power': '336 HP',
      'Emission standard': 'Euro II; Euro III/IV optional',
      Transmission: '10 forward + 2 reverse',
      Steering: 'ZF8098 power steering',
      Tyre: '12.00-20 bias tyre (optional)',
      'Tank volume': '15,000–25,000 L',
    },
  },
  'sinotruck-pickup-off-road-version': {
    description: 'SINOTRUK pickup off-road version combines a four-wheel-drive chassis with the published WP2H diesel powertrain and off-road suspension configuration.',
    specifications: {
      'Vehicle type': 'Pickup',
      Version: 'Off-road version',
      'Drive type': '4×4',
      'Overall dimensions': '5,400 × 1,965 × 1,898 mm',
      'Cargo bed dimensions': '1,520 × 1,520 × 530 mm',
      Wheelbase: '3,230 mm',
      'Engine model': 'WP2H 2.0T',
      'Engine type': 'High-pressure common rail, turbocharged and intercooled diesel',
      'Emission standard': 'China VI',
      'Engine power': '140 kW at 4,000 rpm',
      'Maximum torque': '420 N·m at 1,750–2,500 rpm',
      Transmission: '8AT',
      Steering: 'Electric power steering',
      Braking: 'Ventilated disc',
      Suspension: 'Double wishbone front / multi-link integral rear axle',
      Tyre: '265/65 R18',
    },
    galleryImages: [
      '/images/products/3-Pickup-Off-road-1.jpg',
      '/images/products/3-Pickup-Off-road-2.jpg',
      '/images/products/3-Pickup-Off-road-5.jpg',
      '/images/products/3-Pickup-Off-road-4.jpg',
    ],
  },
  'sinotruck-dump-semi-trailer-truck': {
    description: 'SINOTRUK dump semi-trailer configuration published for bulk material transport. Payload, axle, lifting system and body specification must be confirmed together for the intended route.',
    specifications: {
      'Vehicle type': 'Dump semi-trailer',
      'Overall dimensions': '11,700 × 2,500 × 3,800 mm',
      'Payload capacity': 'Up to 80 t',
      'Lifting system': 'HYVA 202 oil cylinder',
      'Main beam': 'Q345B carbon steel, H type',
      'Frame beam': '500 mm high; 16/18 mm flange plates; 10 + 10 mm web',
      'Body plate thickness': '8 mm floor / 6 mm side',
      Axle: '4 × 16 t, BPW or FUWA',
      'Landing gear': 'JOST 28 t, two speed',
      'King pin': '2.0 or 3.5 in',
      Suspension: 'Reinforced mechanical suspension',
      'Leaf spring': '90 × 16 mm, 10 layers',
      Tyre: '12R22.5 or 315/80R22.5',
    },
    galleryImages: [
      '/images/products/1-Dump-Semi-Trailer-Truck-3.jpg',
      '/images/products/1-Dump-Semi-Trailer-Truck-4.jpg',
      '/images/products/1-Dump-Semi-Trailer-Truck-5.jpg',
      '/images/products/1-Dump-Semi-Trailer-Truck-6.jpg',
    ],
  },
  'howo-pure-electric-light-truck': {
    description: 'HOWO pure electric light truck platform published for city distribution, commerce, intercity and cold-chain body configurations. Battery and axle combinations vary by model.',
    specifications: {
      'Vehicle type': 'Pure electric light truck',
      'Drive type': '4×2',
      'Market segments': 'City distribution, commerce, intercity, cold chain',
      'Cargo box dimensions': '4,150 × 2,100 × 2,100 mm',
      'Overall dimensions': '5,990 × 2,170 × 3,100 mm',
      Wheelbase: '3,280–3,360 mm',
      'Gross vehicle mass': '4,494–4,495 kg',
      Braking: 'Hydraulic or air brake, model dependent',
      'Drive axle': 'SINOTRUK or Hande electric drive axle',
      Suspension: '3/3+2 or 3/5+3',
      Tyre: '7.00 R16 / R16LT',
      'Motor power': '120–140 kW',
      Battery: 'LFP battery; CATL or Fudi depending on model',
      'Battery energy': '86.55–131.98 kWh',
      'Maximum speed': '90 km/h',
      'Maximum gradeability': '20%',
    },
    galleryImages: [
      '/images/products/Howo-Pure-electric-light-truck-1.jpg',
      '/images/products/Howo-Pure-electric-light-truck-2.jpg',
    ],
  },
}

const aliases: Array<[RegExp, string]> = [
  [/^vehicle model$/i, 'Vehicle model'],
  [/^(?:drive type|driving form|drive mode)$/i, 'Drive type'],
  [/^(?:engine horse power|horse power(?:\s*（?hp\)?)?|engine power|engine power\s*\(kw\))$/i, 'Engine power'],
  [/^net power\s*\(kw\)\s*\/\s*speed\s*\(r\/min\)$/i, 'Rated engine power / speed'],
  [/^maximum torque\s*\(n(?:·|\.)?m\)\s*\/\s*speed\s*\(r\/min\)$/i, 'Maximum torque / speed'],
  [/^(?:gearbox|transmission type)$/i, 'Transmission'],
  [/^cabin$/i, 'Cab'],
  [/^wheel[ -]?base(?:\s*\(mm\))?$/i, 'Wheelbase'],
  [/^(?:tyres?|tires?|tire specification)$/i, 'Tyre'],
  [/^(?:load capacity|loading capacity|payload)$/i, 'Payload capacity'],
  [/^max load(?:\s*\(kg\))?$/i, 'Payload capacity'],
  [/^axles$/i, 'Axle'],
  [/^(?:max(?:imum)? torque|torque)$/i, 'Maximum torque'],
  [/^up-body (?:configuration|volume)$/i, 'Body volume'],
  [/^fuel tank(?:\s*\(l\))?$/i, 'Fuel tank capacity'],
  [/^(?:engine emission(?: standerd)?|emission|emission standard)$/i, 'Emission standard'],
  [/^front axle$/i, 'Front axle'],
  [/^rear axle$/i, 'Rear axle'],
  [/^(?:dimension|dimension \(mm\)|vehicle main dimensions|overall dimensions \(mm\))$/i, 'Overall dimensions'],
  [/^wheel track\s*\(\s*front\/rear\s*\)\s*\(mm\)$/i, 'Wheel track'],
  [/^approach\s*\/\s*departure angle\s*\(°\)$/i, 'Approach / departure angle'],
  [/^curb weight\s*\(kg\)$/i, 'Curb weight'],
  [/^full loaded mass\s*\(kg\)$/i, 'Gross vehicle mass'],
  [/^maximum speed\s*km\/h$/i, 'Maximum speed'],
  [/^max\.grade ability\s*\(%\)$/i, 'Maximum gradeability'],
  [/^number of seats$/i, 'Seating capacity'],
]

export function canonicalizeSpecifications(specifications: Readonly<Record<string, string>>, _category?: string): Record<string, string> {
  const normalized: Record<string, string> = {}
  for (const [rawLabel, value] of Object.entries(specifications)) {
    if (!value?.trim()) continue
    const sourceLabel = rawLabel.trim()
    const sourceValue = value.trim()
    let label: string
    if (/^power$/i.test(sourceLabel)) {
      label = _category === 'new-energy-vehicle' ? 'Motor power' : 'Engine power'
    } else if (/^engine$/i.test(sourceLabel)) {
      label = /euro|national|china\s*(?:vi|iv|v)/i.test(sourceValue)
        ? 'Emission standard'
        : /(?:ps|hp|kw)|^\d+(?:[-/]\d+)+$/i.test(sourceValue)
          ? 'Engine power'
          : 'Engine model'
    } else {
      label = aliases.find(([matcher]) => matcher.test(sourceLabel))?.[1] || sourceLabel
    }
    if (!(label in normalized)) normalized[label] = sourceValue
  }
  return normalized
}

export function hasPublishedProductCorrection(id: string): boolean {
  return Boolean(corrections[id])
}

export function preparePublishedProduct<T extends Product>(product: T): T {
  const correction = corrections[product.id]
  const specifications = canonicalizeSpecifications(correction?.specifications || product.specifications, product.category)
  return {
    ...product,
    ...(correction?.description ? { description: correction.description } : {}),
    ...(correction?.image ? { image: correction.image } : {}),
    ...(correction?.bannerImage ? { bannerImage: correction.bannerImage } : {}),
    specifications,
    detailedFeatures: correction ? {} : product.detailedFeatures,
    galleryImages: correction?.galleryImages ? [...correction.galleryImages] : product.galleryImages,
  }
}
