import fs from 'node:fs'

type AuditBlock = {
  slug: string
  category: string
  subcategory: string
  title: string
  recommendedSpecifications: Record<string, string>
  sourceDetailedRows: string[][]
  safeGalleryImages: string[]
}

const report = fs.readFileSync('docs/research/2026-08-02-remaining-product-launch-audit.md', 'utf8')
const blocks = [...report.matchAll(/```json\s*([\s\S]*?)```/g)].map((match) => JSON.parse(match[1]) as AuditBlock)

const unsafeDetailedSources = new Set([
  'howo-pure-electric-tractor-truck',
  'howo-pure-electric-single-side-dock-tractor-truck',
])

function vehicleType(block: AuditBlock) {
  const name = block.title.toLowerCase()
  if (name.includes('single side dock')) return 'Pure electric dock tractor'
  if (name.includes('pure electric tractor')) return 'Pure electric tractor truck'
  if (name.includes('pure electric dump')) return 'Pure electric dump truck'
  if (name.includes('fuel tanker trailer')) return 'Fuel tanker semi-trailer'
  if (name.includes('fence semi')) return 'Fence semi-trailer'
  if (name.includes('sidewall semi')) return 'Sidewall semi-trailer'
  if (name.includes('flatbed semi')) return 'Flatbed semi-trailer'
  if (name.includes('low bed semi')) return 'Low-bed semi-trailer'
  if (name.includes('dump semi')) return 'Dump semi-trailer'
  if (name.includes('water tanker')) return 'Water tanker'
  if (name.includes('oil tanker')) return 'Oil tanker'
  if (name.includes('bitumen')) return 'Bitumen distributor truck'
  if (name.includes('garbage')) return 'Refuse compactor truck'
  if (name.includes('crane')) return 'Truck-mounted crane'
  if (name.includes('mixer')) return 'Concrete mixer truck'
  if (name.includes('pickup')) return 'Pickup'
  if (block.subcategory === 'suv') return 'SUV'
  if (name.includes('refrigerator')) return 'Refrigerated cargo truck'
  if (name.includes('wing van')) return 'Wing van cargo truck'
  if (name.includes('box van')) return 'Box van cargo truck'
  if (name.includes('stake')) return 'Stake cargo truck'
  if (name.includes('tipper') || name.includes('dump')) return 'Dump truck'
  if (name.includes('tractor')) return 'Tractor truck'
  if (name.includes('cargo')) return 'Cargo truck'
  return block.title
}

function canonicalLabel(raw: string) {
  const label = raw.replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim()
  const rules: Array<[RegExp, string]> = [
    [/^(?:vehicle model|model number|announcement model|model)$/i, 'Vehicle model'],
    [/^(?:vehicle type|product name)$/i, 'Vehicle type'],
    [/^(?:version|configuration name)$/i, 'Version'],
    [/^(?:drive type|driving type|driving form|drive mode)$/i, 'Drive type'],
    [/engine.*brand|^engine brand$/i, 'Engine brand'],
    [/engine.*model|^engines? model$/i, 'Engine model'],
    [/engine.*type|^type$/i, 'Engine type'],
    [/emission/i, 'Emission standard'],
    [/net power.*speed|rated.*power/i, 'Rated engine power / speed'],
    [/motor power/i, 'Motor power'],
    [/max(?:imum)? power|horse ?power|^power$/i, 'Engine power'],
    [/maximum torque.*speed|max torque|maximum output torque|^torque$/i, 'Maximum torque'],
    [/displacement/i, 'Displacement'],
    [/transmission|gearbox type|gearbox model|^gearbox$/i, 'Transmission'],
    [/^cab(?:in)?$|dump truck cab|tipper truck cab/i, 'Cab'],
    [/^front axle$|front axles loading capacity/i, 'Front axle'],
    [/^rear axle$|rear axles loading capacity/i, 'Rear axle'],
    [/rear axle model/i, 'Rear axle model'],
    [/rear axle.*ratio/i, 'Rear axle ratio'],
    [/^axle$|^axles$/i, 'Axle'],
    [/suspension/i, 'Suspension'],
    [/tyre no|tire no|number of tire/i, 'Tyre count'],
    [/tyre|tire/i, 'Tyre'],
    [/steering/i, 'Steering'],
    [/brak/i, 'Braking'],
    [/overall.*dimension|overall size|length.*width.*height|external size|^dimension/i, 'Overall dimensions'],
    [/wheel.?base/i, 'Wheelbase'],
    [/wheel track/i, 'Wheel track'],
    [/approach.*departure/i, 'Approach / departure angle'],
    [/cargo (?:box|bed|compartment).*size|internal size of cargo|carriage internal dimensions/i, 'Cargo body dimensions'],
    [/cargo body length/i, 'Cargo body length'],
    [/curb|kerb|tare weight/i, 'Curb weight'],
    [/full(?:y)? loaded mass|gross vehicle|total mass/i, 'Gross vehicle mass'],
    [/payload|loading weight|loading capacity|max load|rated loading weight/i, 'Payload capacity'],
    [/cubage|volume of body|body volume/i, 'Body volume'],
    [/tank volume|volume of the body/i, 'Tank volume'],
    [/fuel tank|oil tank/i, 'Fuel tank capacity'],
    [/battery.*(?:energy|power)|power ?\(kwh\)/i, 'Battery energy'],
    [/^battery$/i, 'Battery'],
    [/maximum speed|max\. speed|maxi- mum speed|max speed/i, 'Maximum speed'],
    [/grade ability|maximum grade|maxi- mum grade/i, 'Maximum gradeability'],
    [/economic speed/i, 'Economic speed'],
    [/turning (?:radius|circle)/i, 'Turning radius'],
    [/number of seats|^seats$/i, 'Seating capacity'],
    [/market segments/i, 'Market segments'],
    [/main beam/i, 'Main beam'],
    [/side beam/i, 'Side beam'],
    [/frame beam|frame section/i, 'Frame'],
    [/platform (?:plate|thickness)/i, 'Platform'],
    [/body thickness|box thickness|steel thickness/i, 'Body plate thickness'],
    [/king pin|traction\/king pin/i, 'King pin'],
    [/landing gear|laning gear/i, 'Landing gear'],
    [/leaf spring/i, 'Leaf spring'],
    [/lifting system/i, 'Lifting system'],
    [/crane type/i, 'Crane type'],
    [/max\. lifting height/i, 'Maximum lifting height'],
    [/max lifting capacity|rated loading capacity/i, 'Lifting capacity'],
    [/rated lifting moment/i, 'Rated lifting moment'],
    [/^span$/i, 'Outrigger span'],
    [/mixer body/i, 'Mixer body'],
    [/hydraulic/i, 'Hydraulic system'],
    [/spraying width/i, 'Spraying width'],
    [/spraying rate/i, 'Spraying rate'],
    [/asphalt pump/i, 'Asphalt pump'],
    [/material of the asphalt tank/i, 'Tank material'],
    [/fuel consumption/i, 'Fuel consumption'],
    [/^automatic grade$/i, 'Control mode'],
    [/^product capacity$/i, 'Production capacity'],
    [/^trunk capacity/i, 'Cargo volume'],
    [/^weight\s*\(kg\)$/i, 'Gross vehicle mass'],
    [/^gvw\s*\(kg\)$/i, 'Gross vehicle mass'],
    [/chassis number/i, 'Chassis model'],
    [/^chassis brand$/i, 'Chassis model'],
    [/^chassis$/i, 'Chassis'],
  ]
  return rules.find(([pattern]) => pattern.test(label))?.[1]
}

function addUnit(label: string, rawLabel: string, rawValue: string) {
  const value = rawValue.trim()
  if (!value || /^(?:●|○|-|N\/A)$/i.test(value)) return ''
  if (/[a-wyzA-WYZ%³]/.test(value) || /(?:kg|kw|hp|mm|km|ton|lit)/i.test(value)) return value
  if (/\(mm\)/i.test(rawLabel)) return `${value} mm`
  if (/\(kg\)/i.test(rawLabel)) return `${value} kg`
  if (/\(kw\)/i.test(rawLabel)) return `${value} kW`
  if (/\(kwh\)/i.test(rawLabel)) return `${value} kWh`
  if (/\(l\)/i.test(rawLabel)) return `${value} L`
  if (/\(%\)/i.test(rawLabel) || label === 'Maximum gradeability') return `${value}%`
  if (/km\/h/i.test(rawLabel)) return `${value} km/h`
  return value
}

function extractDetailed(block: AuditBlock) {
  if (unsafeDetailedSources.has(block.slug)) return {}
  const result: Record<string, string> = {}
  let section = ''
  for (const row of block.sourceDetailedRows) {
    if (row.length < 2) {
      section = row[0] || section
      continue
    }
    const composite = `${row[0]} ${row[1]}`
    let sourceLabel = row[0]
    let values = row.slice(1)
    let label: string | undefined
    if (/engine parameter/i.test(section) && /^model$/i.test(row[0])) label = 'Engine model'
    else if (/engine parameter/i.test(section) && /^manufacturer$/i.test(row[0])) label = 'Engine manufacturer'
    else if (/transmission/i.test(section) && /^gear shift$/i.test(row[0])) label = 'Transmission'
    else if (/transmission/i.test(section) && /^control type$/i.test(row[0])) label = 'Transmission control'
    else if (/^tyre$/i.test(section) && /^type$/i.test(row[0])) label = 'Tyre'
    else if (/^cab$/i.test(section) && /^type$/i.test(row[0])) label = 'Cab'
    else if (/synchronous chip sealer/i.test(section) && /^volume$/i.test(row[0])) label = 'Tank volume'
    if (!label) label = canonicalLabel(composite)
    if (label && /^(?:brand|model|type|horsepower|external size|curb mass|max\.speed|loading weight|axle)/i.test(row[1])) {
      sourceLabel = composite
      values = row.slice(2)
    } else if (!label) {
      label = canonicalLabel(row[0])
      if (!label && row.length > 2) {
        label = canonicalLabel(row[1])
        sourceLabel = row[1]
        values = row.slice(2)
      }
    }
    if (!label || !values.length) continue
    const sourceColumn = block.slug === 'howo-6x4-dump-truck' ? 0 : block.slug === 'howo-8x4-dump-truck' ? 1 : null
    if (sourceColumn !== null && values.length > 1) values = values.slice(sourceColumn, sourceColumn + 1)
    const clean = [...new Set(values.map((value) => addUnit(label!, sourceLabel, value)).filter(Boolean))]
    if (!clean.length) continue
    const joined = clean.join(' / ')
    if (!result[label] || joined.length > result[label].length) result[label] = joined
  }
  return result
}

const categoryArg = process.argv.indexOf('--category')
const subcategoryArg = process.argv.indexOf('--subcategory')
const selectedBlocks = blocks.filter((block) =>
  (categoryArg === -1 || block.category === process.argv[categoryArg + 1])
  && (subcategoryArg === -1 || block.subcategory === process.argv[subcategoryArg + 1]))

const corrections = Object.fromEntries(selectedBlocks.map((block) => {
  const recommended = Object.fromEntries(Object.entries(block.recommendedSpecifications).map(([label, value]) => {
    let normalizedLabel = canonicalLabel(label) || label
    if (/^engine$/i.test(label)) {
      normalizedLabel = /euro|national|china\s*(?:iv|v|vi)/i.test(value)
        ? 'Emission standard'
        : /(?:ps|hp|kw)|^\d+(?:[-/]\d+)+$/i.test(value)
          ? 'Engine power'
          : 'Engine model'
    }
    if (/^volume$/i.test(label)) {
      normalizedLabel = ['water-tanker', 'oil-tanker'].includes(block.subcategory) || /bitumen|tanker/i.test(block.title)
        ? 'Tank volume'
        : 'Body volume'
    }
    const normalizedValue = normalizedLabel === 'Drive type' ? value.replace(/x/i, '×') : value
    return [normalizedLabel, normalizedValue]
  }))
  const titleDrive = block.title.match(/\b([468])X([24])\b/i)
  const specifications = {
    ...recommended,
    ...extractDetailed(block),
    'Vehicle type': vehicleType(block),
    ...(titleDrive ? { 'Drive type': `${titleDrive[1]}×${titleDrive[2]}` } : {}),
  }
  const gallery = [...new Set(block.safeGalleryImages)]
  const replaceBanner = new Set(['howo-n-6x4-cargo-truck', 'sinotruck-howo-water-tanker-2']).has(block.slug)
  return [block.slug, {
    specifications,
    ...(gallery.length ? { image: gallery[0], ...(replaceBanner ? { bannerImage: gallery[0] } : {}), galleryImages: gallery } : {}),
  }]
}))

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(corrections))
} else {
  console.log(`const corrections = ${JSON.stringify(corrections, null, 2)} as const\n\nexport default corrections`)
}
