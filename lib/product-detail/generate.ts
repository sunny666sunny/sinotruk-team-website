import type { Product } from '@/data/products'
import type { ProductApplicationArea, ProductDetailContent, ProductFaq, ProductGalleryItem, ProductPerformanceItem, ProductSolution } from './types'

type ProductFacts = Product & { normalizedSpecs?: Record<string, string>; applicationTags?: string[]; marketTags?: string[] }
type ContentSeed = { title: string; description: string; bullets: string[]; image: string }

const powerPatterns = [/motor power/i, /engine power/i, /^power$/i, /horsepower/i, /rated power/i, /engine model/i]

const ref = {
  logistics: '/images/reference/Logistics-Transportation.webp',
  construction: '/images/reference/Construction.webp',
  mining: '/images/reference/Mining.webp',
  municipal: '/images/reference/Municipal-Services.webp',
  port: '/images/reference/Port-Operations.webp',
  energy: '/images/reference/Energy-Sector.webp',
  chassis: '/images/reference/Truck-Chassis-.webp',
  quality: '/images/reference/Quality-Gate.webp',
  parts: '/images/reference/Parts-Accessories-1.webp',
} as const

function specs(product: ProductFacts): Array<[string, string]> {
  return Object.entries({ ...(product.specifications || {}), ...(product.detailedFeatures || {}), ...(product.normalizedSpecs || {}) })
    .filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()))
}

function fact(product: ProductFacts, patterns: RegExp[], fallback: string): string {
  const entries = specs(product)
  for (const pattern of patterns) {
    const match = entries.find(([key]) => pattern.test(key))
    if (match) return `${match[0]}: ${match[1]}`
  }
  return fallback
}

function images(product: ProductFacts): string[] {
  return [...new Set([product.image, product.bannerImage, ...(product.galleryImages || [])].filter((value): value is string => Boolean(value)))]
}

function galleryImages(product: ProductFacts): string[] {
  return [...new Set([product.image, ...(product.galleryImages || [])].filter((value): value is string => Boolean(value) && value !== product.bannerImage))]
}

function family(product: ProductFacts): string {
  const category = product.category.toLowerCase()
  const key = `${category} ${product.subcategory}`.toLowerCase()
  if (category.includes('new-energy') || /electric|hybrid|hydrogen/.test(key)) return 'new-energy'
  if (category.includes('semi-trailer')) return 'semi-trailer'
  if (category.includes('light-vehicle') || /pickup|suv/.test(key)) return 'light-vehicle'
  if (category.includes('special-vehicle') || /water|oil|mixer|fire|mining|other-truck/.test(key)) return 'special-vehicle'
  if (category.includes('light-truck') || /light-cargo|light-tipper/.test(key)) return 'light-truck'
  return 'heavy-truck'
}

function applicationSeeds(product: ProductFacts): ContentSeed[] {
  const type = family(product)
  const subtype = product.subcategory.toLowerCase()
  if (type === 'new-energy') return [
    { title: 'Fixed-route urban logistics', description: 'Route length, charging access and daily duty cycle can be reviewed together before configuration.', bullets: ['Urban distribution', 'Depot-based fleets', 'Repeatable duty cycles'], image: ref.logistics },
    { title: 'Port and industrial parks', description: 'Closed or semi-closed operating areas allow route and charging planning around the actual shift pattern.', bullets: ['Port transfer', 'Plant logistics', 'Yard movements'], image: ref.port },
    { title: 'Fleet energy transition', description: 'Vehicle selection starts with the current route, payload requirement and available charging conditions.', bullets: ['Route assessment', 'Charging planning', 'Configuration review'], image: ref.energy },
  ]
  if (type === 'semi-trailer') return [
    { title: subtype.includes('tanker') ? 'Liquid transport preparation' : 'Regional freight transport', description: 'Trailer structure and equipment are reviewed against the intended cargo and operating route.', bullets: ['Cargo definition', 'Route conditions', 'Tractor compatibility'], image: subtype.includes('tanker') ? ref.energy : ref.logistics },
    { title: subtype.includes('lowbed') ? 'Equipment movement' : 'Port and terminal logistics', description: 'Axle arrangement, loading method and connection details are confirmed for the planned operation.', bullets: ['Loading method', 'Axle arrangement', 'Connection review'], image: ref.port },
    { title: 'Fleet specification projects', description: 'Published dimensions provide a starting point for aligning multiple trailers to one operating standard.', bullets: ['Standardized configuration', 'Documentation review', 'Delivery coordination'], image: ref.chassis },
  ]
  if (type === 'light-vehicle') return [
    { title: 'Business and crew mobility', description: 'Cabin, seating and cargo requirements can be balanced for mixed daily use.', bullets: ['Team transport', 'Daily business travel', 'Light cargo support'], image: ref.logistics },
    { title: 'Mixed-road operations', description: 'Drive form, tyres and destination requirements should be checked against the expected road environment.', bullets: ['Urban roads', 'Regional routes', 'Unpaved access roads'], image: ref.construction },
    { title: 'Field service support', description: 'The vehicle can be configured around tools, personnel and the service route after requirements are confirmed.', bullets: ['Service teams', 'Site inspection', 'Equipment support'], image: ref.municipal },
  ]
  if (type === 'special-vehicle') {
    const lead = subtype.includes('water')
      ? { title: 'Water transport and site support', description: 'Tank, pump and spraying requirements should be confirmed for the intended non-potable water operation.', bullets: ['Dust suppression', 'Site water support', 'Municipal operations'], image: ref.municipal }
      : subtype.includes('mixer')
        ? { title: 'Concrete transport operations', description: 'Chassis and mixer-body requirements are reviewed together for the intended construction workflow.', bullets: ['Ready-mix transport', 'Construction sites', 'Batching plant routes'], image: ref.construction }
        : subtype.includes('oil')
          ? { title: 'Liquid logistics preparation', description: 'Tank medium, local rules and safety equipment must be confirmed before a transport configuration is selected.', bullets: ['Medium confirmation', 'Route review', 'Compliance documentation'], image: ref.energy }
          : { title: 'Purpose-built site operations', description: 'The chassis and upper body are reviewed as one working system for the specified task.', bullets: ['Duty definition', 'Upper-body matching', 'Site conditions'], image: ref.construction }
    return [lead,
      { title: 'Construction and industrial sites', description: 'Drive form, axle configuration and working equipment are matched to the declared site conditions.', bullets: ['Site access', 'Working cycle', 'Configuration confirmation'], image: ref.construction },
      { title: 'Municipal and fleet projects', description: 'Documentation, repeatable specifications and delivery coordination support multi-vehicle procurement.', bullets: ['Project requirements', 'Fleet consistency', 'Delivery planning'], image: ref.municipal },
    ]
  }
  if (type === 'light-truck') return [
    { title: 'Urban distribution', description: 'Cargo body, route access and daily delivery pattern guide the final light-truck configuration.', bullets: ['Retail distribution', 'Warehouse transfer', 'Last-mile operations'], image: ref.logistics },
    { title: 'Regional short-haul transport', description: 'Powertrain and cargo dimensions can be reviewed for repeated routes between cities and depots.', bullets: ['Regional routes', 'Depot transfer', 'General cargo'], image: ref.logistics },
    { title: subtype.includes('tipper') ? 'Light construction support' : 'Body configuration projects', description: 'The chassis can be reviewed with the intended body and loading method before quotation.', bullets: ['Body matching', 'Loading access', 'Destination requirements'], image: ref.construction },
  ]
  if (subtype.includes('dump') || subtype.includes('tipper')) return [
    { title: 'Construction material transport', description: 'Drive form, body volume and axle configuration are reviewed for the declared material and route.', bullets: ['Earth and aggregate', 'Construction sites', 'Short-cycle transport'], image: ref.construction },
    { title: 'Quarry and site logistics', description: 'Road gradient, surface condition and loading cycle should be supplied for configuration confirmation.', bullets: ['Quarry roads', 'Loading cycles', 'Site access'], image: ref.mining },
    { title: 'Infrastructure projects', description: 'Fleet specifications can be aligned around project conditions and destination requirements.', bullets: ['Road projects', 'Site preparation', 'Fleet procurement'], image: ref.construction },
  ]
  if (subtype.includes('tractor')) return [
    { title: 'Long-haul freight', description: 'Powertrain, axle ratio and cab requirements can be reviewed for the intended route and trailer.', bullets: ['Intercity routes', 'General freight', 'Driver accommodation'], image: ref.logistics },
    { title: 'Container and port transport', description: 'Tractor and trailer connection details are confirmed around terminal access and route conditions.', bullets: ['Container haulage', 'Port transfer', 'Trailer matching'], image: ref.port },
    { title: 'Fleet replacement projects', description: 'Published configurations support comparison before a common fleet specification is agreed.', bullets: ['Configuration comparison', 'Fleet standardization', 'Documentation review'], image: ref.quality },
  ]
  return [
    { title: 'Regional cargo transport', description: 'Cargo body, powertrain and route conditions can be reviewed for regular freight operations.', bullets: ['General cargo', 'Regional distribution', 'Depot transfer'], image: ref.logistics },
    { title: 'Industrial supply routes', description: 'Vehicle configuration is matched to cargo type, loading access and destination requirements.', bullets: ['Plant logistics', 'Supplier routes', 'Scheduled transport'], image: ref.construction },
    { title: 'Fleet procurement', description: 'Key specifications can be standardized after the operating profile and order requirements are confirmed.', bullets: ['Specification alignment', 'Document preparation', 'Delivery coordination'], image: ref.quality },
  ]
}

function performance(product: ProductFacts): ProductPerformanceItem[] {
  const sourceImages = galleryImages(product)
  const fallbackImages = images(product).filter((image) => image !== product.bannerImage)
  const imageAt = (index: number) => sourceImages[index] || fallbackImages[index % fallbackImages.length] || product.image
  const drive = fact(product, [/drive/i], 'drive form to be confirmed')
  const power = fact(product, powerPatterns, 'powertrain to be confirmed')
  const transmission = fact(product, [/transmission|gearbox/i], 'transmission to be confirmed')
  const axle = fact(product, [/rear axle|front axle|axle/i], 'axle configuration to be confirmed')
  const body = fact(product, [/body|volume|capacity|tank|cargo|wheelbase|dimension|cab/i], 'body and cab configuration to be confirmed')
  return [
    { title: 'Powertrain configuration', description: `${product.name} is published with ${power.toLowerCase()} and ${drive.toLowerCase()}. The final combination is reviewed against the intended route and duty cycle.`, image: imageAt(0) },
    { title: 'Transmission and axle matching', description: `For ${product.name}, the available record lists ${transmission.toLowerCase()} and ${axle.toLowerCase()}. These values provide the basis for configuration confirmation before quotation.`, image: imageAt(1) },
    { title: 'Working configuration', description: `For ${product.name}, ${body.toLowerCase()}. Provide cargo, operating conditions and destination requirements for a complete review.`, image: imageAt(2) },
  ]
}

function gallery(product: ProductFacts): ProductGalleryItem[] {
  return galleryImages(product).slice(0, 6).map((image, index) => ({ image, alt: `${product.name}, published product view ${index + 1}`, title: `${product.name} view ${index + 1}`, description: `Published image ${index + 1} for ${product.name}. Use this view as a visual reference and confirm the final exterior, body and optional equipment in the quotation specification.` }))
}

function solutions(product: ProductFacts): ProductSolution[] {
  const drive = fact(product, [/drive/i], 'Drive configuration to be confirmed')
  const power = fact(product, powerPatterns, 'Powertrain configuration to be confirmed')
  const transmission = fact(product, [/transmission|gearbox/i], 'Transmission configuration to be confirmed')
  const body = fact(product, [/body|volume|capacity|tank|cargo|wheelbase|dimension/i], 'Body or working equipment to be confirmed')
  return [
    { title: 'Duty-matched powertrain', description: `The published ${product.name} record lists ${power.toLowerCase()} and ${transmission.toLowerCase()}. Final matching follows the route and operating requirement.`, bullets: ['Route and gradient review', 'Powertrain comparison', 'Destination emission confirmation'], image: product.bannerImage || product.image },
    { title: 'Chassis and body coordination', description: `${product.name} lists ${drive.toLowerCase()} and ${body.toLowerCase()}, providing the starting facts for reviewing chassis, body and loading requirements together.`, bullets: ['Chassis configuration', 'Body or equipment matching', 'Loading method review'], image: ref.chassis },
    { title: 'Parts and maintenance preparation', description: `For ${product.name}, the vehicle reference, configuration list and destination should be recorded so parts identification and published maintenance information remain traceable.`, bullets: ['Product reference record', 'Parts identification inputs', 'Published maintenance documents'], image: ref.parts },
  ]
}

function faqItems(product: ProductFacts): ProductFaq[] {
  const drive = fact(product, [/drive/i], 'Drive form is confirmed per quotation')
  const power = fact(product, powerPatterns, 'Powertrain is confirmed per quotation')
  const transmission = fact(product, [/transmission|gearbox/i], 'Transmission is confirmed per quotation')
  const body = fact(product, [/body|volume|capacity|tank|cargo|wheelbase|dimension|cab/i], 'Body and cab details are confirmed per quotation')
  const category = product.subcategory.replaceAll('-', ' ')
  return [
    { question: `What drive and power options are published for the ${product.name}?`, answer: `The current ${product.name} catalogue record lists ${drive.toLowerCase()} and ${power.toLowerCase()}. Availability can vary by destination, so these values should be confirmed in the signed configuration sheet.` },
    { question: `How should the ${product.name} be configured for its intended work?`, answer: `Start with the planned cargo or task, route surface, gradient, daily distance and destination rules. The published product information identifies the ${product.name} as a ${category}; the final body, axle and powertrain combination is confirmed from those operating inputs.` },
    { question: `Which transmission and working configuration are listed for the ${product.name}?`, answer: `For the ${product.name}, the published details state ${transmission.toLowerCase()} and ${body.toLowerCase()}. Treat them as the configuration review baseline rather than a statement that every combination is available in every market.` },
    { question: `What information is needed to request a quote for the ${product.name}?`, answer: `Provide the ${product.name} model name, required quantity, intended cargo or application, road conditions, destination country or port, preferred emission level and any body or optional-equipment requirements.` },
    { question: `How are maintenance information and replacement parts identified for the ${product.name}?`, answer: `Keep the ${product.name} product reference, final configuration sheet and vehicle identification details together. For a parts enquiry, provide the VIN when available, the existing part number, clear photos and required quantity so compatibility can be reviewed.` },
  ]
}

export function generateProductDetailContent(product: ProductFacts): ProductDetailContent {
  const drive = fact(product, [/drive/i], 'its published drive configuration')
  const power = fact(product, powerPatterns, 'its published powertrain range')
  const href = `/products/${product.category}/${product.subcategory}`
  return {
    performanceSummary: `${product.name} combines ${drive.toLowerCase()} with ${power.toLowerCase()}. The published values provide a factual starting point for matching the vehicle to route, cargo, body and destination requirements.`,
    performanceItems: performance(product),
    gallery: gallery(product),
    applicationAreas: applicationSeeds(product).slice(0, 4).map((item): ProductApplicationArea => ({ ...item, description: `${product.name}: ${item.description}`, href })),
    solutions: solutions(product),
    faqs: faqItems(product),
  }
}

const nonEmpty = (value: unknown): value is string => typeof value === 'string' && Boolean(value.trim())
const validArray = <T>(value: unknown, predicate: (item: unknown) => item is T): value is T[] => Array.isArray(value) && value.length > 0 && value.every(predicate)
const performanceItem = (value: unknown): value is ProductPerformanceItem => { const item = value as Partial<ProductPerformanceItem>; return Boolean(item && nonEmpty(item.title) && nonEmpty(item.description) && nonEmpty(item.image)) }
const galleryItem = (value: unknown): value is ProductGalleryItem => { const item = value as Partial<ProductGalleryItem>; return Boolean(item && nonEmpty(item.image) && nonEmpty(item.alt) && nonEmpty(item.title) && nonEmpty(item.description)) }
const application = (value: unknown): value is ProductApplicationArea => { const item = value as Partial<ProductApplicationArea>; return Boolean(item && nonEmpty(item.title) && nonEmpty(item.description) && nonEmpty(item.image) && nonEmpty(item.href) && Array.isArray(item.bullets) && item.bullets.every(nonEmpty)) }
const solution = (value: unknown): value is ProductSolution => { const item = value as Partial<ProductSolution>; return Boolean(item && nonEmpty(item.title) && nonEmpty(item.description) && nonEmpty(item.image) && Array.isArray(item.bullets) && item.bullets.every(nonEmpty)) }
const faq = (value: unknown): value is ProductFaq => { const item = value as Partial<ProductFaq>; return Boolean(item && nonEmpty(item.question) && nonEmpty(item.answer)) }

export function normalizeProductDetailContent(value: unknown, product: ProductFacts): ProductDetailContent {
  const fallback = generateProductDetailContent(product)
  const candidate = value && typeof value === 'object' ? value as Partial<ProductDetailContent> : {}
  const allowedImages = new Set(galleryImages(product))
  const hasOnlyProductImages = (items: Array<{ image: string }>) => items.every((item) => allowedImages.has(item.image))
  return {
    performanceSummary: nonEmpty(candidate.performanceSummary) ? candidate.performanceSummary.trim() : fallback.performanceSummary,
    performanceItems: validArray(candidate.performanceItems, performanceItem) && hasOnlyProductImages(candidate.performanceItems) ? candidate.performanceItems : fallback.performanceItems,
    gallery: validArray(candidate.gallery, galleryItem) && hasOnlyProductImages(candidate.gallery) ? candidate.gallery : fallback.gallery,
    applicationAreas: validArray(candidate.applicationAreas, application) && candidate.applicationAreas.length >= 2 && candidate.applicationAreas.length <= 4 ? candidate.applicationAreas : fallback.applicationAreas,
    solutions: validArray(candidate.solutions, solution) && candidate.solutions.length >= 2 && candidate.solutions.length <= 4 ? candidate.solutions : fallback.solutions,
    faqs: validArray(candidate.faqs, faq) && candidate.faqs.length >= 4 && candidate.faqs.length <= 6 ? candidate.faqs : fallback.faqs,
  }
}
