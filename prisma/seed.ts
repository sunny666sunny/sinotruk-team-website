import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createIfMissing, runSeedCli } from '../scripts/seed-preservation.mjs'

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL || 'file:admin.db' })
const prisma = new PrismaClient({ adapter })

const categories = [
  { id: 'heavy-truck', name: 'Heavy Truck', description: 'SINOTRUK heavy-duty trucks are engineered for the toughest jobs.', image: '/images/Heavy-Truck.webp', bannerImage: '/images/Heavy-Truck.webp', subcategories: [{ id: 'dump-truck', name: 'Dump Truck' }, { id: 'tractor-truck', name: 'Tractor Truck' }, { id: 'cargo-truck', name: 'Cargo Truck' }, { id: 'light-tipper', name: 'Light Tipper' }, { id: 'light-cargo', name: 'Light Cargo' }, { id: 'water-tanker', name: 'Water Tanker' }, { id: 'oil-tanker', name: 'Oil Tanker' }, { id: 'mixer-truck', name: 'Mixer Truck' }, { id: 'other-special', name: 'Other Special Vehicles' }] },
  { id: 'light-truck', name: 'Light Truck', description: 'SINOTRUK light-duty trucks for efficient urban and regional logistics.', image: '/images/products/Light-Truck.webp', bannerImage: '/images/products/Light-Truck.webp', subcategories: [{ id: 'cargo-truck', name: 'Cargo Truck' }, { id: 'tipper-truck', name: 'Tipper Truck' }] },
  { id: 'light-vehicle', name: 'Light Vehicle', description: 'SINOTRUK light vehicles for urban delivery.', image: '/images/light-car.webp', bannerImage: '/images/light-car.webp', subcategories: [{ id: 'pickup', name: 'Pickup' }, { id: 'suv', name: 'SUV' }, { id: 'van', name: 'Van' }, { id: 'light-truck', name: 'Light Truck' }, { id: 'light-tipper', name: 'Light Tipper' }, { id: 'light-cargo', name: 'Light Cargo' }, { id: 'cargo-truck', name: 'Cargo Truck' }, { id: 'passenger', name: 'Passenger Vehicle' }] },
  { id: 'special-vehicle', name: 'Special Vehicle', description: 'SINOTRUK special vehicles for critical operations.', image: '/images/Truck-Head.webp', bannerImage: '/images/Truck-Head.webp', subcategories: [{ id: 'fire-truck', name: 'Fire Truck' }, { id: 'military', name: 'Military Vehicle' }, { id: 'airport', name: 'Airport Equipment' }, { id: 'mining', name: 'Mining Vehicle' }, { id: 'water-tanker', name: 'Water Tanker' }, { id: 'oil-tanker', name: 'Oil Tanker' }, { id: 'mixer-truck', name: 'Mixer Truck' }, { id: 'other-truck', name: 'Other Special Vehicles' }] },
  { id: 'semi-trailer', name: 'Semi-Trailer', description: 'SINOTRUK semi-trailers for cargo.', image: '/images/Trailer.webp', bannerImage: '/images/Trailer.webp', subcategories: [{ id: 'flatbed', name: 'Flatbed Trailer' }, { id: 'lowbed', name: 'Lowbed Trailer' }, { id: 'tanker', name: 'Tanker Trailer' }, { id: 'container', name: 'Container Trailer' }, { id: 'semi-trailer', name: 'Semi-Trailer' }] },
  { id: 'new-energy-vehicle', name: 'New Energy Vehicle', description: 'SINOTRUK new energy vehicles.', image: '/images/products/New-Energy-Vehicle.webp', bannerImage: '/images/products/New-Energy-Vehicle.webp', subcategories: [{ id: 'electric-truck', name: 'Electric Truck' }, { id: 'hybrid', name: 'Hybrid Vehicle' }, { id: 'electric-bus', name: 'Electric Bus' }, { id: 'hydrogen', name: 'Hydrogen Vehicle' }, { id: 'new-energy', name: 'New Energy' }] },
]

// Map product data categories to DB category IDs
const categoryMap: Record<string, string> = {}

// Map product data subcategories to DB subcategory IDs (context-aware: depends on category)
const subcategoryMap: Record<string, string> = {}

async function importCategories() {
  process.stdout.write('Importing categories...\n')
  for (const cat of categories) {
    // Existing catalog records are immutable during seed; only create missing defaults.
    await createIfMissing(
      prisma.category,
      { id: cat.id },
      { id: cat.id, name: cat.name, description: cat.description, image: cat.image, bannerImage: cat.bannerImage },
    )
    // Missing subcategories may be added, but existing relationships are preserved.
    for (const sub of cat.subcategories) {
      const scopedSubcategoryId = `${cat.id}:${sub.id}`
      await createIfMissing(
        prisma.subcategory,
        { id: scopedSubcategoryId },
        { id: scopedSubcategoryId, name: sub.name, categoryId: cat.id },
      )
    }
  }
  process.stdout.write('  ' + categories.length + ' categories imported\n')
}

async function importProducts() {
  process.stdout.write('Importing products...\n')
  const { dumpTrucks, tractorTrucks, cargoTrucks, lightCargoTrucks, lightTipperTrucks, waterTankers, oilTankers, mixerTrucks, otherSpecialVehicles, lightVehicles, semiTrailers, newEnergyVehicles } = require('../data/products')
  const all = [...dumpTrucks, ...tractorTrucks, ...cargoTrucks, ...lightCargoTrucks, ...lightTipperTrucks, ...waterTankers, ...oilTankers, ...mixerTrucks, ...otherSpecialVehicles, ...lightVehicles, ...semiTrailers, ...newEnergyVehicles]
  for (const p of all) {
    const mappedCategory = categoryMap[p.category] || p.category
    const subMapKey = p.category + ':' + p.subcategory
    const mappedSubcategory = subcategoryMap[subMapKey] || p.subcategory
    const scopedSubcategory = `${mappedCategory}:${mappedSubcategory}`
    await createIfMissing(prisma.product, { id: p.id }, {
      id: p.id, name: p.name, categoryId: mappedCategory, subcategoryId: scopedSubcategory,
      description: p.description, image: p.image, bannerImage: p.bannerImage || '',
      specifications: JSON.stringify(p.specifications || {}),
      features: JSON.stringify(p.features || []),
      detailedFeatures: JSON.stringify(p.detailedFeatures || {}),
      galleryImages: JSON.stringify(p.galleryImages || []),
      isActive: true, sortOrder: 0,
    })
  }
  process.stdout.write('  ' + all.length + ' products checked\n')
}

async function importNews() {
  process.stdout.write('Importing news...\n')
  const { newsItems } = require('../data/news')
  for (const n of newsItems) {
    await createIfMissing(prisma.news, { slug: n.slug }, {
      slug: n.slug, title: n.title, excerpt: n.excerpt || '', content: n.content || '',
      image: n.image || '', category: n.category || 'news',
      tags: JSON.stringify(n.tags || []),
      keywords: '[]', internalLinks: '[]', externalLinks: '[]',
      seoTitle: n.seoTitle || n.title, seoDescription: n.seoDescription || n.excerpt || '',
      isPublished: true, date: n.date || '2025-01-01',
    })
  }
  process.stdout.write('  ' + newsItems.length + ' news articles checked\n')
}

async function importParts() {
  process.stdout.write('Importing parts...\n')
  const { parts } = require('../data/parts')
  for (const p of parts) {
    await createIfMissing(prisma.part, { id: 'part-' + p.id }, {
      id: 'part-' + p.id, name: p.name, partNumber: p.partNumber, category: p.category,
      description: p.description || '', image: p.image || '',
      specifications: JSON.stringify(p.specifications || {}), isActive: true, sortOrder: 0,
    })
  }
  process.stdout.write('  ' + parts.length + ' parts checked\n')
}

async function importSettings() {
  process.stdout.write('Importing settings...\n')
  await createIfMissing(prisma.setting, { key: 'site_name' }, { key: 'site_name', value: 'SINOTRUK' })
  await createIfMissing(prisma.setting, { key: 'site_description' }, { key: 'site_description', value: 'SINOTRUK International Trade' })
  await createIfMissing(prisma.setting, { key: 'database_initialized' }, { key: 'database_initialized', value: new Date().toISOString() })
  process.stdout.write('  Settings imported\n')
}

async function main() {
  process.stdout.write('\n=== SINOTRUK Seed ===\n\n')
  await importSettings()
  await importCategories()
  await importNews()
  await importParts()
  await importProducts()
  process.stdout.write('\n=== Seed Complete ===\n\n')
}

runSeedCli(main, () => prisma.$disconnect()).then((exitCode) => {
  process.exitCode = exitCode
})
